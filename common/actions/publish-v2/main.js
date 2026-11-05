const fs = require('fs');
const os = require('os');
const path = require('path');
const {
	getInput,
	execStep,
	setFailed
} = require('../../../utils');

const NEXUS_AUTH_KEY = '//repositories.mrf.io/nexus/repository/npm-internal/:_authToken';
const SEMVER = /^v?(\d+\.\d+\.\d+)(?:-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;

const usesPnpm = () => fs.existsSync(path.resolve(process.cwd(), 'pnpm-lock.yaml'));

const configureNpmAuth = (token) => {
	execStep(
		[
			`npm config set ${NEXUS_AUTH_KEY} ${token}`,
			'npm config set strict-ssl false'
		],
		'🔐Config access to marfeel packages...'
	);
};

const configurePnpmAuth = (token) => {
	console.info('🔐Config access to marfeel packages...');
	fs.appendFileSync(path.join(os.homedir(), '.npmrc'), `\n${NEXUS_AUTH_KEY}=${token}\n`);
};

const detectIndent = (content) => {
	const match = /^([ \t]+)"/m.exec(content);

	if (!match) {
		return 2;
	}

	return match[1];
};

const setSnapshotVersion = (buildNumber, prereleaseTag) => {
	if (!buildNumber) {
		throw new Error('No build number supplied.');
	}

	const packageJsonPath = path.resolve(process.cwd(), 'package.json');
	const content = fs.readFileSync(packageJsonPath, 'utf8');
	const packageJson = JSON.parse(content);
	const match = SEMVER.exec(packageJson.version || '');

	if (!match) {
		throw new Error(`Could not parse version "${packageJson.version}" from package.json`);
	}

	packageJson.version = `${match[1]}-${prereleaseTag}.${buildNumber}${match[2] || ''}`;

	fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, detectIndent(content))}\n`);
	console.info(`Version set to ${packageJson.version}`);
};

const publishWithNpm = (buildNumber, prereleaseTag, distTag, message) => {
	execStep(
		[
			`npx npm-snapshot ${buildNumber} ${prereleaseTag}`,
			`npm publish --tag ${distTag}`
		],
		message
	);
};

const publishWithPnpm = (buildNumber, prereleaseTag, distTag, message) => {
	setSnapshotVersion(buildNumber, prereleaseTag);
	execStep(`pnpm publish --tag ${distTag} --no-git-checks`, message);
};

try {
	const npmNexusAuth = getInput('nexus-token');
	const buildNumber = getInput('build-number');
	const isPR = getInput('is-pr') === 'true';
	const pnpm = usesPnpm();

	if (npmNexusAuth && pnpm) {
		configurePnpmAuth(npmNexusAuth);
	} else if (npmNexusAuth) {
		configureNpmAuth(npmNexusAuth);
	}

	const prereleaseTag = isPR ? 'pr-snapshot' : 'snapshot';
	const distTag = isPR ? 'canary' : 'latest';
	const message = isPR ? '🚀 Publishing 📦 PR Package 📦...' : '🚀 Publishing 📦 Package 📦...';

	if (pnpm) {
		publishWithPnpm(buildNumber, prereleaseTag, distTag, message);
	} else {
		publishWithNpm(buildNumber, prereleaseTag, distTag, message);
	}

} catch (error) {
	setFailed(error.message);
}
