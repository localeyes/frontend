<script lang="ts">
	import Geolocation from 'svelte-geolocation';
	import { Map, Marker } from '@beyonk/svelte-mapbox/components';

	import { calculateDistance, formatDistance } from '$/util/geo';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	// This is a hack to get around the fact that the Marker's typing is wrong
	const youColor = 'red' as unknown as number;
	const formatter = new Intl.NumberFormat();

	export let data: PageData;

	let coords: [number, number];
	let distance: number | null;
	let claimedPoints = false;

	$: {
		distance =
			coords && (coords[0] !== -1 || coords[1] !== -1)
				? calculateDistance(coords, data.props.place.point.coordinates)
				: null;

		if (distance !== null && distance < 100 && !claimedPoints) {
			claimedPoints = true;

			fetch(`/api/claim/${data.props.place.id}`, { method: 'POST' });
		}
	}

	const useDark = browser && matchMedia('(prefers-color-scheme: dark)').matches;
</script>

<Geolocation getPosition bind:coords />

<div
	class="hero min-h-screen min-w-screen place-items-start relative"
	style="background-image: url({data.props.place.image});"
>
	<div class="hero-overlay backdrop-blur-sm bg-opacity-75 object-cover">
		<div
			class="w-full h-full px-8 mt-8 md:px-12 md:mt-12 lg:px-16 lg:mt-16 flex lg:flex-row flex-col gap-16 lg:gap-8"
		>
			<div
				class="place-self-center lg:place-self-start flex flex-col gap-8 max-w-prose-xl z-50"
			>
				<span class="place-self-start">
					<h1 class="text-5xl font-bold text-primary">
						{data.props.place.name}
					</h1>
					<p class="text-lg text-gray-300">{data.props.place.address}</p>
				</span>

				<div
					class="whitespace-pre-line max-w-prose a-underline text-xl text-gray-300 truncate text-justify"
				>
					{@html data.props.place.about}
				</div>
			</div>

			<span
				class="flex flex-row mx-auto lg:mx-0 gap-16 lg:flex-grow lg:place-self-start lg:h-screen lg:grid lg:content-between lg:-mt-32"
			>
				<span class="text-right lg:mt-32">
					{#if distance}
						<p
							class="text-8xl font-bold -mt-3 {distance < 100
								? 'text-accent'
								: 'text-primary'}"
						>
							{formatDistance(distance)}
						</p>
					{:else}
						<p class="text-8xl font-bold -mt-3 text-primary">Unknown</p>
					{/if}

					<p class="text-3xl">from your location</p>
				</span>

				<span class="lg:place-self-end text-right z-50">
					<p class="text-3xl">
						with {formatter.format(data.props.place.ratings)} rating{data.props
							.place.ratings === 1
							? ''
							: 's'}
					</p>

					<div class="rating rating-lg rating-half float-right">
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-1"
							disabled
							checked={data.props.place.rating > 0 &&
								data.props.place.rating < 0.75}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-2"
							disabled
							checked={data.props.place.rating >= 0.75 &&
								data.props.place.rating < 1.25}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-1"
							disabled
							checked={data.props.place.rating >= 1.25 &&
								data.props.place.rating < 1.75}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-2"
							disabled
							checked={data.props.place.rating >= 1.75 &&
								data.props.place.rating < 2.25}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-1"
							disabled
							checked={data.props.place.rating >= 2.25 &&
								data.props.place.rating < 2.75}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-2"
							disabled
							checked={data.props.place.rating >= 2.75 &&
								data.props.place.rating < 3.25}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-1"
							disabled
							checked={data.props.place.rating >= 3.25 &&
								data.props.place.rating < 3.75}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-2"
							disabled
							checked={data.props.place.rating >= 3.75 &&
								data.props.place.rating < 4.25}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-1"
							disabled
							checked={data.props.place.rating >= 4.25 &&
								data.props.place.rating < 4.75}
						/>
						<input
							type="radio"
							name="rating-10"
							class="bg-yellow-400 mask mask-star-2 mask-half-2"
							disabled
							checked={data.props.place.rating >= 4.75}
						/>
					</div>
				</span>
			</span>
		</div>

		<div class="sticky bottom-8 flex flex-col z-10">
			<a
				class="btn btn-ghost w-16 h-16 p-0 rounded-full place-self-center"
				href="#map"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					class="fill-current w-10 h-10"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>

<div id="map" class="w-screen h-screen relative grid">
	<a
		class="btn btn-ghost absolute top-8 place-self-center w-16 h-16 p-0 rounded-full hover:-mb-1 transition-all duration-300 z-10"
		href="#top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			class="fill-current w-10 h-10"
		>
			<path d="M0 0h24v24H0V0z" fill="none" /><path
				d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
			/>
		</svg>
	</a>

	<Map
		accessToken="pk.eyJ1IjoiZ29vZ2xlc2l0ZXMiLCJhIjoiY2xmdnE1bmcxMDluMDNxc2F2cDJ6eHhhaSJ9.l8vrvPpPfL6ikBNW6GGSqA"
		center={data.props.place.point.coordinates}
		style={useDark
			? 'mapbox://styles/mapbox/dark-v11'
			: 'mapbox://styles/mapbox/light-v11'}
		zoom={15}
	>
		<Marker
			lat={data.props.place.point.coordinates[1]}
			lng={data.props.place.point.coordinates[0]}
			label={data.props.place.name}
		/>

		{#if coords}
			<Marker
				lat={coords[1]}
				lng={coords[0]}
				label="You are here"
				color={youColor}
			/>
		{/if}
	</Map>
</div>

<style global>
	.a-underline a {
		text-decoration: underline;
	}
</style>
