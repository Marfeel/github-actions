const { execSync } = require('child_process');

try{
    console.info('⛏️ Building adserver source code...');
    execSync('npm run adserver-providers build', {stdio: 'inherit'});

    console.info('\n');
    console.info('🕹 Building playground...');
    execSync('npm run adserver-providers playground:build', {stdio: 'inherit'});

    console.info('\n');
    console.info('{} Preparing schemas...');
    execSync('npm run adserver-providers prepare-schema', {stdio: 'inherit'});
} catch (error) {
    core.setFailed(error.message);
}