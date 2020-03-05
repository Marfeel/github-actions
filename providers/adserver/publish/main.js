const utils = require('../../../utils');

try {
    const ghToken = utils.getInput('gh-token');
    const awsKey = utils.getInput('aws-key');
    const awsSecret = utils.getInput('aws-secret');

    utils.execStep(
        'npm publish',
        '🚀Publishing adserver 📦Package📦...'
    );
    utils.execStep(
        `npx adserver-providers playground:publish --gh-token ${ghToken}`,
        '🚀Publishing adserver 🕹Playground🕹...'
    );
    utils.execStep(
        `npx adserver-providers publish:s3 --aws-key ${awsKey} --aws-secret ${awsSecret}`,
        '🚀Publishing adserver { schema }...'
    );
} catch (error) {
    utils.setFailed(error.message);
}