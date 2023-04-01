<script lang="ts">
	import type { PlaceWithDistance } from '$/app';
	import { formatDistance } from '$/util/geo';
	import { TYPE_TO_PRETTY } from '$/util/type';

	export let place: PlaceWithDistance;

	console.log(place.image);
</script>

<div class="card bg-base-100 shadow-lg hover:shadow-2xl w-full h-full">
	<figure
		class="relative h-64 lg:h-96 w-full bg-cover"
		style="background-image: url({place.image})"
	>
		<div class="absolute top-0 left-0 w-full h-full">
			<div class="grid p-4 w-full h-full content-between">
				<p class="place-self-end badge badge-lg font-bold text-2xl p-6">
					{formatDistance(place.distance)}
				</p>
			</div>
		</div>
	</figure>

	{#if place.types.length}
		<div class="flex flex-row flex-wrap gap-2 px-8 pt-4">
			{#each place.types as type}
				{#if TYPE_TO_PRETTY.has(type)}
					<p class="badge badge-lg text-lg">
						{TYPE_TO_PRETTY.get(type)}
					</p>
				{/if}
			{/each}
		</div>
	{/if}

	<div class="stats shadow">
  
		<div class="stat">
		  <div class="stat-figure text-primary">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
		  </div>
		  <div class="stat-title">Rating (out of 5)</div>
		  <div class="stat-value text-primary">{place.rating}</div>
		  <div class="stat-desc">{Math.floor(Math.random() * 5)}% higher than last month</div>
		</div>
		
		<div class="stat">
		  <div class="stat-figure text-secondary">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
		  </div>
		  <div class="stat-title">Total Ratings</div>
		  <div class="stat-value text-secondary">{place.ratings}</div>
		  <div class="stat-desc">{Math.floor(Math.random() * 10)}% more than last month</div>
		</div>
		
		<div class="stat">
		  <div class="stat-figure text-secondary">
			<div class="avatar online">
			  <div class="w-16 rounded-full">
				<img src={place.icon} />
			  </div>
			</div>
		  </div>
		  <div class="stat-value">{Math.floor(Math.random() * 4) * 5 + 5}% Off</div>
		  <div class="stat-title">Coupon</div>
		  <div class="stat-desc text-secondary">{Math.floor(Math.random() * 100) + 1} coupons remaining</div>
		</div>
	  </div>
	<div class="card-body overflow-hidden pt-4">
		<h2 class="card-title line-clamp-1 text-3xl font-bold">
			{place.name}
		</h2>

		<p class="truncate whitespace-pre-line line-clamp-6 text-lg">
			{place.about}
		</p>
		<div class="card-actions justify-end grid" />
	</div>
</div>
