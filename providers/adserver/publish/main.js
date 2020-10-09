const utils = require('../../../utils');

try {
    const ghToken = utils.getInput('gh-token');
    const awsKey = utils.getInput('aws-key');
    const awsSecret = utils.getInput('aws-secret');
    const npmNexusAuth = utils.getInput('nexus-token');

    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';

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
    
    if (npmNexusAuth) {
        execStep(
            [
                `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${npmNexusAuth}`,
                'npm config set strict-ssl false'
            ],
            '🔐Config access to marfeel packages...'
        );
    }
    
    utils.execStep(
        'npm publish',
        '🚀Publishing adserver 📦Package📦...'
    );
} catch (error) {
    utils.setFailed(error.message);
}
