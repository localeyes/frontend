<script lang="ts">
	export let rating: number;
	export let color = 'bg-yellow-400';
	export let id: string = 'default';
</script>

<div class="rating rating-lg rating-half">
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-1"
		disabled
		checked={rating > 0 && rating < 0.75}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-2"
		disabled
		checked={rating >= 0.75 && rating < 1.25}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-1"
		disabled
		checked={rating >= 1.25 && rating < 1.75}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-2"
		disabled
		checked={rating >= 1.75 && rating < 2.25}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-1"
		disabled
		checked={rating >= 2.25 && rating < 2.75}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-2"
		disabled
		checked={rating >= 2.75 && rating < 3.25}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-1"
		disabled
		checked={rating >= 3.25 && rating < 3.75}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-2"
		disabled
		checked={rating >= 3.75 && rating < 4.25}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-1"
		disabled
		checked={rating >= 4.25 && rating < 4.75}
	/>
	<input
		type="radio"
		name="rating-{id}"
		class="{color} mask mask-star-2 mask-half-2"
		disabled
		checked={rating >= 4.75}
	/>
</div>
