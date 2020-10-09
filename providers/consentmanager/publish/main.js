const utils = require('../../../utils');
const npmNexusAuth = getInput('nexus-token');

try {
    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';
    
    if (npmNexusAuth) {
        utils.execStep(
            [
                `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${npmNexusAuth}`,
                'npm config set strict-ssl false'
            ],
            '🔐Config access to marfeel packages...'
        );
    }

    utils.execStep(
        [
            `git config --local user.email '${userEmail}'`,
            `git config --local user.name '${userName}'`,
            'npm publish'
        ],
        '🚀Publishing adserver 📦Package📦...'
    );
} catch (error) {
    utils.setFailed(error.message);
}
