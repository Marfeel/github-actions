const { execSync } = require('child_process');

try{
    console.info('✅Checking unit tests...');
    execSync('npm run adserver-providers test', {stdio: 'inherit'});

    console.info('\n');
    console.info('📋Checking acid tests...');
    execSync('npm run adserver-providers acid-test', {stdio: 'inherit'});

    console.info('\n');
    console.info('🔦Cheking lint...');
    execSync('npm run adserver-providers lint', {stdio: 'inherit'});
} catch (error) {
    core.setFailed(error.message);
}