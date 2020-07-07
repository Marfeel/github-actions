const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building widget source code...'
    );
    utils.execStep(
        'npx provider-cli docs:build --configs-path=@marfeel/widget-providers-catalog',
        '🕹 Building catalog...'
    );
    utils.execStep(
        'npx provider-cli generate:schema',
        '{} Preparing schemas...'
    );
    
} catch (error) {
    utils.setFailed(error.message);
}