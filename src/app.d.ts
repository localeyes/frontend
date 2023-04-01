// See https://kit.svelte.dev/docs/types#app

import type { PlaceType } from "./util/type";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export type Question = {
	question: string;
	answers: string[];
}

export type Place = {
	id: string;
	name: string;
	icon: string;
	address: string;
	placeId: string;
	types: PlaceType[];
	about: string;
	point: {
		type: 'Point';
		coordinates: [number, number];
	};
	image: string;
	rating: number;
	ratings: number;
};

export type PlaceWithDistance = Place & {
	distance: number;
};
