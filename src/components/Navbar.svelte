<script lang="ts">
	import { user } from '$/hooks/auth';
	import Filter from './Filter.svelte';
</script>

<div class="navbar bg-transparent px-20 pt-10">
	<div class="navbar-start">
		<a class="btn btn-ghost normal-case text-xl" href="/">
			<span class="text-primary">Local</span>Eyes
		</a>
	</div>

	<div class="navbar-end flex flex-row gap-2">
		<Filter />

		{#if $user === null}
			<a class="btn" href="/login">Log in</a>
		{:else}
			<a
				href="/login"
				class="btn"
				on:click={() => {
					localStorage.removeItem('token');
					$user = null;
				}}
			>
				Log out
			</a>
		{/if}
	</div>
</div>
