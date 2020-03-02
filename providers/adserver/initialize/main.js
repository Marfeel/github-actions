const { execSync } = require('child_process');
const core = require('@actions/core');

try{
    const ghToken = core.getInput('gh-token');

    console.info('🔐Config access to marfeel packages...');
    execSync(`npm config set //npm.pkg.github.com/:_authToken ${ghToken}`, {stdio: 'inherit'});

    console.info('\n');
    console.info('📦Installing packages...');
    execSync('npm ci', {stdio: 'inherit'});
} catch (error) {
    core.setFailed(error.message);
}