const utils = require('../../utils/index.js');

try{
    const ghToken = utils.getInput('gh-token');

    utils.execStep(
        `npm config set //npm.pkg.github.com/:_authToken ${ghToken}`,
        '🔐Config access to marfeel packages...'
    );
    utils.execStep(
        'npm ci',
        '📦Installing packages...'
    );
} catch (error) {
    utils.setFailed(error.message);
}