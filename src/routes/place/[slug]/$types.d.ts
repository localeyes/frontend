import type { Load } from '@sveltejs/kit';
import type { Place } from '$/app';

type RouteParams = {
	slug: string;
}

export type PageLoad = Load<RouteParams>;
export type PageData = {
	props: {
		place: Place;
	}
}
