const { execSync } = require('child_process');

function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';

    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }

    return val.trim();
}

function setFailed(message) {
    process.exitCode = 1;
    console.error(message);
}

function execStep(commands, message) {
    console.info(message);
    const execCommand = (command) => execSync(command, {stdio: 'inherit'});
    
    if (Array.isArray(commands)) {
        commands.forEach((command) => execCommand(command));
    } else {
        execCommand(commands);
    }    
    
    console.info('\n');
}

function checkVersionBump() {
    console.info('Verifying that current version has not been published already.');

    const { name, version } = require(`${process.cwd()}/package.json`);
    
    const result = execSync(`npm view ${name}@${version}`);

    if (result.length !== 0) {
        throw new Error(`⚠️ Version ${version} already exists. Remember to bump the version:\nnpm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]`);
    }
}

module.exports = {
    getInput,
    setFailed,
    execStep,
    checkVersionBump
};
