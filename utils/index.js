const { execSync } = require('child_process');

function createSnapShotVersion() {
	const { version } = require(`${process.cwd()}/package.json`);
	const buildNumber = getInput('build-number');

	return `${version}-snapshot.${buildNumber}`
}

function getPackageName() {
	const { name } = require(`${process.cwd()}/package.json`);

	return name;
}


function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';

    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }

    return val.trim();
}

function setFailed(message) {
    process.exitCode = 1;
    console.error(message);
}

function execStep(commands, message) {
    console.info(message);
    const execCommand = (command) => execSync(command, {stdio: 'inherit'});
    
    if (Array.isArray(commands)) {
        commands.forEach((command) => execCommand(command));
    } else {
        execCommand(commands);
    }    
    
    console.info('\n');
}

function checkVersionBump() {
    console.info(`Verifying that current version has not been published already.\n`);

    const { name, version } = require(`${process.cwd()}/package.json`);

    let result;
    try {
        result = execSync(`npm view ${name} --json --silent`).toString();
    } catch (error) {
        if (error.stdout) {
            const { error: { code } } = JSON.parse(error.stdout.toString());
            if (code === 'E404') {
                // Package has not been published
                return;
            }
        }

        throw error;
    }
    const { versions } = JSON.parse(result);

    if (versions.includes(version)) {
        throw new Error(`ERR Version ${version} already exists. Remember to bump the version:\nERR npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]`);
    }
}

module.exports = {
    getInput,
    setFailed,
    execStep,
	checkVersionBump,
	createSnapShotVersion,
	getPackageName
};
