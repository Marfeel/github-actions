const utils = require('../../../utils');

try {
	const ghToken = utils.getInput('gh-token');
    const snapshotVersion = utils.createSnapShotVersion();
    const packageName = utils.getPackageName();

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
	`npm publish --tag ${snapshotVersion}`,
        '🚀Publishing widget 📦Package📦...'
    );
    utils.execStep(
	`npm dist-tag add ${packageName}@${snapshotVersion} latest`,
    );
} catch (error) {
    utils.setFailed(error.message);
}
