const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run adserver-providers build',
        '⛏️ Building adserver source code...'
    );
    utils.execStep(
        'npm run adserver-providers playground:build',
        '🕹 Building playground...'
    );
    utils.execStep(
        'npm run adserver-providers prepare-schema',
        '{} Preparing schemas...'
    );
} catch (error) {
    utils.setFailed(error.message);
}