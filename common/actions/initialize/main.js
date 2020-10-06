const {
    execStep,
    getInput,
    setFailed
} = require('../../../utils');

try {
    const ghToken = getInput('gh-token');

    if (ghToken) {
        execStep(
            `npm config set //npm.pkg.github.com/:_authToken ${ghToken}`,
            '🔐Config access to marfeel packages...'
        );
    }

    execStep(
        'npm ci',
        '📦Installing packages...'
    );
} catch (error) {
    setFailed(error.message);
}