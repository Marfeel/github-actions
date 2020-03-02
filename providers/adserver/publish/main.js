const utils = require('../../../utils');

try {
    const ghToken = core.getInput('gh-token');
    const awsKey = core.getInput('aws-key');
    const awsSecret = core.getInput('aws-secret');

    utils.execStep(
        'npm publish',
        '🚀Publishing adserver 📦Package📦...'
    );
    utils.execStep(
        `npm run adserver-providers playground:publish -- --gh-token ${ghToken}`,
        '🚀Publishing adserver 🕹Playground🕹...'
    );
    utils.execStep(
        `npm run adserver-providers publish:s3 -- --aws-key ${awsKey} --aws-secret ${awsSecret}`,
        '🚀Publishing adserver { schema }...'
    );
} catch (error) {
    utils.setFailed(error.message);
}