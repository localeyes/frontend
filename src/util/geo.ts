const EARTH_RADIUS = 6371e3;

export function calculateDistance(one: [number, number], two: [number, number]): number {
	const φ1 = one[1] * Math.PI / 180;
	const φ2 = two[1] * Math.PI / 180;
	const Δφ = (two[1] - one[1]) * Math.PI / 180;
	const Δλ = (two[0] - one[0]) * Math.PI / 180;

	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) *
		Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return EARTH_RADIUS * c;
}

export function formatDistance(meters: number) {
	if (meters > 1_000) {
		return `${(meters / 1000).toFixed(1)}km`;
	}

	return `${Math.round(meters)}m`;
}
