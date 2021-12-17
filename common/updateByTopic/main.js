const {
	getInput,
	execStep,
	setFailed
} = require('../../../utils');

try {
	const topic = getInput('topic');

	execStep(
		[
			`curl -X POST https://5fh0v4yca1.execute-api.eu-west-1.amazonaws.com/prod/update-manager-topic -H "Accept:application/json" --data-raw "{\"topic\":\"${topic}\"}"`
		],
		`Triggering update manager with topic: ${topic}...`
	)
} catch (error) {
	setFailed(error.message);
}
