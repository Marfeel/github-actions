const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building widget source code...'
    );
    utils.execStep(
        'npm run build:catalog',
        '🕹 Building catalog...'
    );
    utils.execStep(
        'npm run generate:schema',
        '{} Preparing schemas...'
    );

    utils.checkVersionBump();
    
} catch (error) {
    utils.setFailed(error.message);
}