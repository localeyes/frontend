<script lang="ts">
	import Geolocation from 'svelte-geolocation';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import { onMount } from 'svelte';

	import type { PlaceWithDistance } from '$/app';
	import { calculateDistance } from '$/util/geo';
	import PlaceCard from '$/components/PlaceCard.svelte';

	let loading = true;
	let error = false;
	let more = true;
	let coords: [number, number];
	let places: PlaceWithDistance[];

	let page = 0;
	const limit = 10;

	$: {
		if (coords && places) {
			for (const place of places) {
				place.distance = calculateDistance(coords, place.point.coordinates);
			}

			places.sort((a, b) => a.distance - b.distance);
			places = places;
		}
	}

	onMount(() => {
		navigator.geolocation.getCurrentPosition(
			async position => {
				coords = [position.coords.longitude, position.coords.latitude];
				error = false;

				await fetchPlaces();

				loading = false;
			},
			() => {
				error = true;
				loading = false;
			}
		);
	});

	async function fetchPlaces() {
		const response = await fetch(
			`https://api.localey.es/place/search?lat=${coords[1]}&lng=${
				coords[0]
			}&skip=${page++ * limit}&limit=${limit}`
		);

		if (response.ok) {
			const newPlaces = (await response.json()).data;

			if (!places) {
				places = newPlaces;
			} else {
				places.push(...newPlaces);
				places = places;
			}

			more = newPlaces.length === limit;
		} else {
			more = false;
		}
	}
</script>

<Geolocation getPosition bind:coords />

<div
	class="{(loading || error) && !places
		? 'w-screen h-screen'
		: ''} grid place-items-center p-16"
>
	{#if loading && !places}
		<div
			class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status"
		/>
	{:else if error && !places}
		<p>Allow location and refresh the page.</p>
	{:else}
		<div class="grid gap-8 grid-cols-1 md:grid-cols-2">
			{#each places as place}
				<a
					href="/place/{place.id}"
					class="btn btn-ghost p-0 w-full h-full text-left font-normal hover:bg-transparent"
				>
					<PlaceCard {place} />
				</a>
			{/each}

			{#if loading}
				<div
					class="place-self-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				/>
			{:else if more}
				<InfiniteScroll threshold={1_000} on:loadMore={fetchPlaces} window />
			{/if}
		</div>
	{/if}
</div>
