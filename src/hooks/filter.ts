import { writable } from 'svelte/store';

export const types = [
	{ id: 'museum', name: 'Museum' },
	{ id: 'library', name: 'Library' },
	{ id: 'night_club', name: 'Night Club' },
	{ id: 'park', name: 'Park' },
	{ id: 'campground', name: 'Campground' },
	{ id: 'art_gallery', name: 'Art Gallery' },
	{ id: 'aquarium', name: 'Aquarium' },
	{ id: 'zoo', name: 'Zoo' },
	{ id: 'amusement_park', name: 'Amusement Park' },
	{ id: 'florist', name: 'Florist' },
	{ id: 'tourist_attraction', name: 'Tourist Attraction' },
	{ id: 'bowling_alley', name: 'Bowling Alley' },
	{ id: 'spa', name: 'Spa' },
];

export const filter = writable(new Set<string>(types.map(type => type.id)));
