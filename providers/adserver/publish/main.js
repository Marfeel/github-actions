const {
    getInput,
    execStep,
    setFailed
} = require('../../../utils');

try {
    const ghToken = getInput('gh-token');
    const awsKey = getInput('aws-key');
    const awsSecret = getInput('aws-secret');
    const npmNexusAuth = getInput('nexus-token');

    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';

    if (npmNexusAuth) {
        execStep(
            [
                `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${npmNexusAuth}`,
                'npm config set strict-ssl false'
            ],
            '🔐Config access to marfeel packages...'
        );
    }
    
    execStep(
        [
            `git config --local user.email '${userEmail}'`,
            `git config --local user.name '${userName}'`,
            `npx adserver-providers playground:publish --gh-token ${ghToken}`
        ],
        '🚀Publishing adserver 🕹Playground🕹...'
    );
    execStep(
        `npx adserver-providers publish:s3 --aws-key ${awsKey} --aws-secret ${awsSecret}`,
        '🚀Publishing adserver { schema }...'
    );
    
    execStep(
        'npm publish',
        '🚀Publishing adserver 📦Package📦...'
    );
} catch (error) {
    setFailed(error.message);
}
