const utils = require('../../../utils');

try {
    const userEmail = 'tech@marfeel.com';
    const userName = 'Github Action';

    utils.execStep(
        [
            `git config --local user.email '${userEmail}'`,
            `git config --local user.name '${userName}'`,
            `npm npm config set strict-ssl false`,
            'npm publish'
        ],
        '🚀Publishing adserver 📦Package📦...'
    );
} catch (error) {
    utils.setFailed(error.message);
}
