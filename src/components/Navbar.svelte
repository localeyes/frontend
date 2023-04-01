<script lang="ts">
	import { user } from '$/hooks/auth';
	import Filter from './Filter.svelte';
</script>

<div class="navbar bg-transparent p-12 md:p-16 lg:px-20 pt-10 absolute top-0">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="-1" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</label>
			<ul
				tabindex="-1"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/leaderboard">Leaderboard</a></li>
			</ul>
		</div>

		<a class="btn btn-ghost normal-case text-xl" href="/">
			<span class="text-primary">Local</span>Eyes
		</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/leaderboard">Leaderboard</a></li>
		</ul>
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
