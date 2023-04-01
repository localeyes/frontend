<script lang="ts">
	import { filter, types } from '$/hooks/filter';

	function toggle(id: string) {
		if ($filter.has(id)) {
			filter.update(s => {
				s.delete(id);
				return s;
			});
		} else {
			filter.update(s => s.add(id));
		}
	}
</script>

<div title="Filter Places" class="dropdown dropdown-end">
	<div tabindex="-1" class="btn gap-1 normal-case btn-ghost">
		<svg
			focusable="false"
			aria-hidden="true"
			viewBox="0 0 24 24"
			tabindex="-1"
			class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6 fill-current"
		>
			<path
				d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"
			/>
		</svg>

		<span class="hidden md:inline">Filter</span>
		<svg
			width="12px"
			height="12px"
			class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"
		>
			<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
		</svg>
	</div>
	<div
		class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16"
	>
		<div class="grid grid-cols-1 gap-3 p-3" tabindex="-1">
			<label class="label cursor-pointer">
				<span class="label-text">Wheelchair accessible</span>
				<input
					type="checkbox"
					checked={$filter.has('wheelchair')}
					class="checkbox checkbox-success"
					on:change={() => toggle('wheelchair')}
				/>
			</label>

			<hr class="h-px border bg-neutral-content border-0" />

			{#each types as { id, name }}
				<label class="label cursor-pointer">
					<span class="label-text">{name}</span>
					<input
						type="checkbox"
						checked={$filter.has(id)}
						class="checkbox checkbox-primary"
						on:change={() => toggle(id)}
					/>
				</label>
			{/each}
		</div>
	</div>
</div>
