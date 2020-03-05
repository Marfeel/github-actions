const utils = require('../../../utils');

try {
    const ghToken = utils.getInput('gh-token');
    const awsKey = utils.getInput('aws-key');
    const awsSecret = utils.getInput('aws-secret');

    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';

    utils.execStep(
        'npm publish',
        '🚀Publishing adserver 📦Package📦...'
    );
    utils.execStep(
        [
            `git config --local user.email '${userEmail}'`,
            `git config --local user.name '${userName}'`,
            `npx adserver-providers playground:publish --gh-token ${ghToken}`
        ],
        '🚀Publishing adserver 🕹Playground🕹...'
    );
    utils.execStep(
        `npx adserver-providers publish:s3 --aws-key ${awsKey} --aws-secret ${awsSecret}`,
        '🚀Publishing adserver { schema }...'
    );
} catch (error) {
    utils.setFailed(error.message);
}