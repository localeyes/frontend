<script lang="ts">
	import { onMount } from 'svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';

	type User = {
		id: string;
		username: string;
		points: number;
	};

	const limit = 50;

	let page = 0;
	let loading = true;
	let more = true;

	let users: User[] | undefined;

	onMount(() => {
		fetchUsers();
	});

	async function fetchUsers() {
		const response = await fetch(
			`https://api.localey.es/leaderboard?skip=${page++ * limit}&limit=${limit}`
		);

		if (response.ok) {
			const data = await response.json();

			if (users) {
				users.push(...data.data);
				users = users;
			} else {
				users = data.data;
			}

			more = data.data.length === limit;
		}

		loading = false;
	}
</script>

<div
	class="min-h-screen grid min-w-screen p-8 md:p-12 lg:p-16 {users
		? ''
		: 'place-items-center'}"
>
	{#if loading || !users}
		<div
			class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status"
		/>
	{:else}
		<div class="overflow-x-auto w-full">
			<h1 class="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
				Users with the most points
			</h1>

			<table class="table table-zebra text-3xl w-full">
				<thead>
					<tr>
						<th />
						<th class="text-xl">Username</th>
						<th class="text-xl">Points</th>
					</tr>
				</thead>

				{#if users.length}
					<tbody>
						{#each users as user, i}
							<tr>
								<th>{i + 1}</th>
								<td>{user.username}</td>
								<td>{user.points}</td>
							</tr>
						{/each}
					</tbody>
				{/if}
			</table>
		</div>

		{#if users.length === 0}
			<div class="grid min-w-screen place-items-center">
				<p>No users found.</p>
			</div>
		{/if}

		{#if loading}
			<div class="grid min-w-screen">
				<div
					class="place-self-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				/>
			</div>
		{:else if more}
			<InfiniteScroll threshold={1_000} on:loadMore={fetchUsers} window />
		{/if}
	{/if}
</div>
