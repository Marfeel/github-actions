const {
    getInput,
    execStep,
    setFailed
} = require('../../../utils');

try {
    const ghToken = getInput('gh-token');
    const npmNexusAuth = getInput('nexus-token');
    const buildNumber = getInput('build-number');

    const userEmail = 'tech@marfeel.com';
    const userName = 'Widget Provider';

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
        '🚀Publishing widget 🕹Catalog🕹...'
    );

    execStep(
        [
            `npx npm-snapshot ${buildNumber} snapshot`,
            `npm publish`
        ],
        '🚀Publishing widget 📦Package📦...'
    );

} catch (error) {
    setFailed(error.message);
}