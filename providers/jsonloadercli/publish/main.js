const {
    getInput,
    execStep,
    setFailed
} = require('../../../utils');

try {
    const ghToken = getInput('gh-token');
    // const npmNexusAuth = getInput('nexus-token');
    const buildNumber = getInput('build-number');

    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';

    // if (npmNexusAuth) {
    //     execStep(
    //         [
    //             `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${npmNexusAuth}`,
    //             'npm config set strict-ssl false'
    //         ],
    //         '🔐Config access to marfeel packages...'
    //     );
    // }

    execStep(
        [
            `npx github:dominguezcelada/npm-snapshot ${buildNumber} snapshot`,
            `npm publish`
        ],
        '🚀 Publishing Analytics 📦 Package 📦...'
    );

} catch (error) {
    setFailed(error.message);
}
