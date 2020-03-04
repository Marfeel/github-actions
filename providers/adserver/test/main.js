const utils = require('../../../utils');

try{
    utils.execStep(
        'npx adserver-providers test',
        '✅Checking unit tests...'
    );
    utils.execStep(
        'npx adserver-providers acid-test',
        '📋Checking acid tests...'
    );
    utils.execStep(
        'npx adserver-providers lint',
        '🔦Cheking lint...'
    );
} catch (error) {
    utils.setFailed(error.message);
}