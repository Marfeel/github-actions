const { execSync } = require('child_process');

function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;

function setFailed(message) {
    process.exitCode = 1;
    console.error(message);
}
exports.setFailed = setFailed;

function execStep(command, message) {
    console.info(message);
    execSync(command, {stdio: 'inherit'});
    console.info('\n');
}
exports.execStep = execStep;