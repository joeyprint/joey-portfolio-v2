export function getDeviceOS(): string {
	const userAgentData = (navigator as any).userAgentData;
	if (userAgentData?.platform) {
		const platform = userAgentData.platform.toLowerCase();
		if (platform.includes('win')) return 'Windows';
		if (platform.includes('mac')) return 'MacOS';
		if (platform.includes('linux')) return 'Linux';
		if (platform.includes('android')) return 'Android';
	}

	const agent = navigator.userAgent.toLowerCase();
	if (agent.includes('win')) return 'Windows';
	if (agent.includes('android')) return 'Android';
	if (agent.includes('linux')) return 'Linux';
	if (/ipad|iphone|ipod/.test(agent)) return 'iOS';
	if (
		agent.includes('macintosh') &&
		'maxTouchPoints' in navigator &&
		navigator.maxTouchPoints > 1
	) {
		return 'iOS';
	}
	if (agent.includes('mac')) return 'MacOS';

	return 'Unknown';
}
