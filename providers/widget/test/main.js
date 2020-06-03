const utils = require('../../../utils');

try{
    utils.execStep(
        'npm test',
        '✅Checking unit tests...'
    );
    utils.execStep(
        'npm run lint',
        '🔦Checking lint...'
    );

} catch (error) {
    utils.setFailed(error.message);
}