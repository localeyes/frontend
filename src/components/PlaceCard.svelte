<script lang="ts">
	import type { PlaceWithDistance } from '$/app';
	import { formatDistance } from '$/util/geo';
	import { TYPE_TO_PRETTY } from '$/util/type';
	import PlaceStats from './PlaceStats.svelte';

	export let place: PlaceWithDistance;
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

	<div class="card-body overflow-hidden pt-4">
		<h2 class="card-title line-clamp-1 text-3xl font-bold">
			{place.name}
		</h2>

		<p class="truncate whitespace-pre-line line-clamp-6 text-lg">
			{place.about}
		</p>

		<PlaceStats {place} />

		<div class="card-actions justify-end grid" />
	</div>
</div>
