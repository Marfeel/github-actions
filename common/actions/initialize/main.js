const {
    execStep,
    setFailed
} = require('../../../utils');

try {
    execStep(
        'npm ci',
        '📦Installing packages...'
    );
} catch (error) {
    setFailed(error.message);
}