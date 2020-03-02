const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run adserver-providers test',
        '✅Checking unit tests...'
    );
    utils.execStep(
        'npm run adserver-providers acid-test',
        '📋Checking acid tests...'
    );
    utils.execStep(
        'npm run adserver-providers lint',
        '🔦Cheking lint...'
    );
} catch (error) {
    utils.setFailed(error.message);
}