const { execSync } = require('child_process');
const core = require('@actions/core');

try {
    const ghToken = core.getInput('gh-token');
    const awsKey = core.getInput('aws-key');
    const awsSecret = core.getInput('aws-secret');

    console.info('🚀Publishing adserver 📦Package📦...');
    execSync('npm publish', {stdio: 'inherit'});

    console.info('\n');
    console.info('🚀Publishing adserver 🕹Playground🕹...');
    execSync(`npm run adserver-providers playground:publish -- --gh-token ${ghToken}`, {stdio: 'inherit'});

    console.info('\n');
    console.info('🚀Publishing adserver { schema }...');
    execSync(`npm run adserver-providers publish:s3 -- --aws-key ${awsKey} --aws-secret ${awsSecret}`, {stdio: 'inherit'});
} catch (error) {
    core.setFailed(error.message);
}