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
    
    if (commands.isArray) {
        commands.forEach((command) => execCommand(command));
    } else {
        execCommand(command);
    }    
    
    console.info('\n');
}

module.exports = {
    getInput,
    setFailed,
    execStep
};
