const { getInput, execStep, setFailed } = require('../../../utils');

try{
    const npmNexusAuth = getInput('nexus-token');

    execStep(
        [
            `npm config set //repositories.mrf.io/nexus/repository/npm-internal/:_authToken ${npmNexusAuth}`,
            'npm config set registry https://repositories.mrf.io/nexus/repository/npm-internal/',
            'npm config set strict-ssl false'
        ],
        '🔐Config access to marfeel packages...'
    );
    execStep(
        'npm ci',
        '📦Installing packages...'
    );
} catch (error) {
    setFailed(error.message);
}