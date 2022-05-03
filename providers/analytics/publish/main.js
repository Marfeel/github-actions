const {
    getInput,
    execStep,
    setFailed
} = require('../../../utils');

try {
    const ghToken = getInput('gh-token');
    const npmNexusAuth = getInput('nexus-token');
    const buildNumber = getInput('build-number');
    const awsKey = getInput('aws-key');
    const awsSecret = getInput('aws-secret');

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
            `npx provider-cli docs:publish --gh-token ${ghToken}`
        ],
        '🚀 Publishing Analytics 🕹Playground 🕹...'
    );

    execStep(
        [
            `npm run deploy -- -k ${awsKey} -s ${awsSecret} -f dist/extractor.js`,
            `npm run deploy -- -k ${awsKey} -s ${awsSecret} -f schema/index.json`
        ],
        '🚀 Publishing Analytics to Alexandria...'
    );

    execStep(
        [
            `npx npm-snapshot ${buildNumber} snapshot`,
            `npm publish`
        ],
        '🚀 Publishing Analytics 📦 Package 📦...'
    );

} catch (error) {
    setFailed(error.message);
}
