<script context="module" lang="ts">
	export type LoginResponse =
		| {
				success: false;
				message: string;
		  }
		| {
				success: true;
				data: string;
		  };
</script>

<script lang="ts">
	import { user } from '$/hooks/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error: string | undefined;

	async function logIn() {
		const response = await fetch('https://api.localey.es/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				username: email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data: LoginResponse = await response.json();
		if (!data.success) return (error = data.message);

		error = undefined;
		localStorage.setItem('token', `Bearer ${data.data}`);
		$user = `Bearer ${data.data}`;

		goto('/');
	}
</script>

<div class="w-96 w-max-1/2 mx-auto h-screen grid place-items-center">
	<form class="flex flex-col gap-6 w-full">
		<h1 class="text-center text-5xl font-bold">Log in</h1>
		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email address or username</span>
			</label>
			<input
				type="email"
				id="email"
				placeholder="hello@localey.es"
				class="input input-bordered w-full {error
					? 'input-error'
					: 'input-primary'}"
				bind:value={email}
			/>

			{#if error}
				<label class="label" for="email">
					<span class="label-text-alt text-error">{error}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				id="password"
				placeholder="•••••••••"
				class="input input-bordered w-full {error
					? 'input-error'
					: 'input-primary'}"
				bind:value={password}
			/>

			{#if error}
				<label class="label" for="password">
					<span class="label-text-alt text-error">{error}</span>
				</label>
			{/if}
		</div>

		<div class="grid gap-2">
			<button type="submit" on:click={logIn} class="btn btn-primary">
				Log in
			</button>

			<span class="mx-auto">
				<a href="/register">
					<p class="hover:underline hover:cursor-pointer text-sm">
						No account? Register here.
					</p>
				</a>
			</span>
		</div>
	</form>
</div>
