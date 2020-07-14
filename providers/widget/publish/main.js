const utils = require('../../../utils');

try {
	const ghToken = utils.getInput('gh-token');
	const snapshotTag = utils.createSnapShotTag();
    const { name, version} = utils.getPackageInfo();

	const userEmail = 'tech@marfeel.com';
    const userName = 'Widget Provider';

    utils.execStep(
        [
            `git config --local user.email '${userEmail}'`,
            `git config --local user.name '${userName}'`,
            `npx provider-cli docs:publish --gh-token ${ghToken}`
        ],
        '🚀Publishing widget 🕹Catalog🕹...'
    );
    utils.execStep(
	`npm publish --tag ${snapshotTag}`,
        '🚀Publishing widget 📦Package📦...'
    );
    utils.execStep(
	`npm dist-tag add ${name}@${version}-${snapshotTag} latest`,
    );
} catch (error) {
    utils.setFailed(error.message);
}
