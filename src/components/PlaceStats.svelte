<script lang="ts">
	import type { PlaceWithDistance } from '$/app';
	import Rating from './Rating.svelte';

	const formatter = new Intl.NumberFormat();

	export let place: PlaceWithDistance;
</script>

<div class="flex flex-wrap">
	<div class="stat">
		<div class="stat-figure text-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-8 h-8 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/></svg
			>
		</div>
		<div class="stat-title">User rating</div>
		<div class="stat-value text-primary">
			<Rating rating={place.rating} color="bg-primary" id={place.id} />
		</div>
		<div class="stat-desc">
			{Math.floor(Math.random() * 7) + 1}% higher than last month
		</div>
	</div>

	<div class="stat">
		<div class="stat-figure text-secondary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-8 h-8 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		</div>
		<div class="stat-title">Total ratings</div>
		<div class="stat-value text-secondary">
			{formatter.format(place.ratings)}
		</div>
		<div class="stat-desc">
			{Math.floor(Math.random() * 7) + 1}% more than last month
		</div>
	</div>

	<div class="stat">
		<div class="stat-figure">
			<div class="w-8 h-8 rounded-full">
				<img src={place.icon} alt={place.name} />
			</div>
		</div>
		<div class="stat-title">Coupon</div>
		<div class="stat-value text-accent">
			{Math.floor(Math.random() * 4) * 5 + 5}% off
		</div>
		<div class="stat-desc">
			{Math.floor(Math.random() * 50) + 1} coupons remaining
		</div>
	</div>
</div>
