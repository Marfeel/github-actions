const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building paywall source code...'
    );

} catch (error) {
    utils.setFailed(error.message);
}
