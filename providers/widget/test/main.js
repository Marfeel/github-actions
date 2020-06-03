const utils = require('../../../utils');

try{
    utils.execStep(
        'npx provider-cli test --configs-path=@marfeel/widgets-config',
        '✅Checking unit tests...'
    );
    utils.execStep(
        'npx provider-cli lint',
        '🔦Checking lint...'
    );

} catch (error) {
    utils.setFailed(error.message);
}