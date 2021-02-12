const {
    getInput,
    execStep,
    setFailed
} = require('../../../utils');

try {
    const npmNexusAuth = getInput('nexus-token');
    const buildNumber = getInput('build-number');

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
            `npx npm-snapshot ${buildNumber} snapshot`,
            `npm publish`
        ],
        '🚀 Publishing Paywall 📦 Package 📦...'
    );

} catch (error) {
    setFailed(error.message);
}
