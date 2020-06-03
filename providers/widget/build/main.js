const utils = require('../../../utils');

try{
    utils.execStep(
        'npx provider-cli build -p --configs-path=@marfeel/widgets-config && tsc --emitDeclarationOnly',
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