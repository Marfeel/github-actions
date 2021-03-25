const {
	getInput,
	execStep,
	setFailed
} = require('../../../utils');

try {
	const serviceId = getInput('service-id');
	const fastlyKey = getInput('fastly-key');

	execStep(
		[
			`curl -XPOST https://api.fastly.com/service/${serviceId}/purge_all -H "Fastly-Key:${fastlyKey}" -H "Accept:application/json"`
		],
		'🚽 Purging Fastly CDN...'
	)
} catch (error) {
	setFailed(error.message);
}
