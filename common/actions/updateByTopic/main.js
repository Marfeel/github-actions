const {
	getInput,
	execStep,
	setFailed
} = require('../../../utils');

try {
	const topic = getInput('topic');

	execStep(
		[
			`curl --request POST https://githubci.mrf.io/api/update-manager/topic -d '${JSON.stringify({ topic })}'`
		],
		`Triggering update manager with topic: ${topic}...`
	)
} catch (error) {
	setFailed(error.message);
}
