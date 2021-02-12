const utils = require('../../../utils');

try {
    utils.execStep(
        'npx provider-cli test:schema',
        '🔦 Checking Json Schemas...'
    );

    utils.execStep(
        'npm run lint',
        '🔦 Checking lint...'
    );

    utils.execStep(
        'npm test',
        '✅ Checking unit tests...'
    );

} catch (error) {
    utils.setFailed(error.message);
}
