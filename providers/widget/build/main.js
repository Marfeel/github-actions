const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building widget source code...'
    );
    utils.execStep(
        'npx provider-cli docs:build --configs-path=@marfeel/widgets-catalog',
        '🕹 Building catalog...'
    );
    utils.execStep(
        'npx provider-cli generate:schema',
        '{} Preparing schemas...'
    );

    utils.checkVersionBump();
    
} catch (error) {
    utils.setFailed(error.message);
}