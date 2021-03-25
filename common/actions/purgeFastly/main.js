const {
	getInput,
	execStep,
	setFailed
} = require('../../../utils');

try {
	const serviceId = getInput('serviceId');
	const fastlyKey = 'KIRBY_FASTLY_KEY';

	execStep(
		[
			`curl -XPOST https://api.fastly.com/service/${serviceId}/purge_all -H "Fastly-Key:${fastlyKey}" -H "Accept:application/json" wait`
		],
		'🧹 Purging Fastly CDN...'
	)
} catch (error) {
	setFailed(error.message);
}
