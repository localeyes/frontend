import { error, type Load } from '@sveltejs/kit';
import type { RouteParams, PageData } from './$types';

export const load = (async ({ params }) => {
	const response = await fetch(`https://api.localey.es/place/${params.slug}`);

	if (response.ok) {
		const place = await response.json();

		return {
			props: {
				place: place.data
			}
		};
	}

	throw error(404, 'Not found');
}) satisfies Load<RouteParams, PageData>;
