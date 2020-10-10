const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building widget source code...'
    );
    utils.execStep(
        'npx provider-cli docs:build --configs-path=@marfeel/widget-providers-catalog --statics-path=node_modules/@marfeel/widget-providers-frame/runtime/assets,./dist',
        '🕹 Building catalog...'
    );
    utils.execStep(
        'npx provider-cli generate:schema',
        '{} Preparing schemas...'
    );

} catch (error) {
    utils.setFailed(error.message);
}