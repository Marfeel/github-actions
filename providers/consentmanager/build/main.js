const utils = require('../../../utils');

try{
    utils.execStep(
        'npm run build',
        '⛏️ Building CMP source code...'
    );
    
    utils.checkVersionBump();
    
} catch (error) {
    utils.setFailed(error.message);
}