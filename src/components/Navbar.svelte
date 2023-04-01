<script lang="ts">
	import { user } from '$/hooks/auth';
	import Filter from './Filter.svelte';
</script>

<div class="navbar bg-transparent p-4 md:p-8 lg:px-16 pt-10 absolute top-0">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="-1" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
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

		<a class="btn btn-ghost normal-case text-xl hidden md:flex" href="/">
			<svg
				class="mr-3 w-10 h-8 fill-primary"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 -256 1850 1850"
			>
				<path
					d="M1694.372881 683.8983q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5q-185 0-316.5-131.5t-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5q234 0 434.5-121.5t333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14q20 0 34-14t14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5q-263 0-499.5-139t-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139q263 0 499.5 139t376.5 368q20 35 20 69z"
				/>
			</svg>
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
