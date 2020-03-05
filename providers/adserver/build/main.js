const utils = require('../../../utils');

try{
    utils.execStep(
        'npx adserver-providers build',
        '⛏️ Building adserver source code...'
    );
    utils.execStep(
        'npx adserver-providers playground:build',
        '🕹 Building playground...'
    );
    utils.execStep(
        'npx adserver-providers prepare-schema',
        '{} Preparing schemas...'
    );
} catch (error) {
    utils.setFailed(error.message);
}