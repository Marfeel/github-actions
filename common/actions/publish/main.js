const {
    getInput,
    execStep,
    setFailed
} = require('../../../utils');

try {
    const npmNexusAuth = getInput('nexus-token');
    const buildNumber = getInput('build-number');
    const isPR = getInput('is-pr');

    if (npmNexusAuth) {
        execStep(
            [
                `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${npmNexusAuth}`,
                'npm config set strict-ssl false'
            ],
            '🔐Config access to marfeel packages...'
        );
    }

    if (isPR === 'true') {
        execStep(
            [
                `npx npm-snapshot ${buildNumber} pr-snapshot`,
                `npm publish --tag canary`
            ],
            '🚀 Publishing 📦 PR Package 📦...'
        );
        return;
    }

    execStep(
        [
            `npx npm-snapshot ${buildNumber} snapshot`,
            `npm publish`
        ],
        '🚀 Publishing 📦 Package 📦...'
    );

} catch (error) {
    setFailed(error.message);
}
