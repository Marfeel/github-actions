const { setFailed } = require('../../../utils');
const { execSync } = require('child_process');

try{
    const { name, version } = require(`${process.cwd()}/package.json`);
    const result = execSync(`npm view ${name}@${version}`);

    if (result.length !== 0) {
        setFailed(`Version ${version} already exists`);
    }
} catch (error) {
    setFailed(error.message);
}