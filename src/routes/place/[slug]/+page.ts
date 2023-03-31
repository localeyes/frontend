import { error, type Load } from '@sveltejs/kit';
import type { RouteParams, PageData } from './$types';

export const load = (async ({ params }) => {
	const response = await fetch(`https://geo.hackthefeed.com/place/${params.slug}`);

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
