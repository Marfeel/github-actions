const utils = require('../../../utils');

try {
    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';

    utils.execStep(
        [
            `git config --local user.email '${userEmail}'`,
            `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${NPM_NEXUS_AUTH} ${{ secrets.NPM_NEXUS_AUTH }}`,
            `git config --local user.name '${userName}'`,
            'npm publish'
        ],
        '🚀Publishing adserver 📦Package📦...'
    );
} catch (error) {
    utils.setFailed(error.message);
}
