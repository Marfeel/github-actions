const utils = require('../../../utils');

try{
    utils.execStep(
        'npx adserver-providers test',
        '✅Checking unit tests...'
    );
    utils.execStep(
        'npx adserver-providers acid-test',
        '📋Checking acid tests...'
    );
    utils.execStep(
        'npx adserver-providers lint',
        '🔦Checking lint...'
    );

    const { name, version } = require(`${process.cwd()}/package.json`);
    
    const result = utils.execSync(
        `npm view ${name}@${version}`, 
        '🧐 Checking if version already exists'
    );

    if (result.length !== 0) {
        throw `⚠️ Version ${version} already exists. Remember to bump the version:\nnpm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]`;
    }

} catch (error) {
    utils.setFailed(error.message);
}