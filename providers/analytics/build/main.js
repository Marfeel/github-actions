const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building analytics source code and extractor...'
    );
    utils.execStep(
        'npm run build:playground',
        '🕹 Building Playground...'
    );

} catch (error) {
    utils.setFailed(error.message);
}
