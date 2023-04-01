<script context="module" lang="ts">
	type RegisterResponse =
		| {
				success: true;
				data: string;
		  }
		| {
				success: false;
				message: string;
		  };
</script>

<script lang="ts">
	import { user } from '$/hooks/auth';
	import { goto } from '$app/navigation';

	let username = '';
	let email = '';
	let password = '';
	let error: string | undefined;

	async function register() {
		const response = await fetch('https://api.localey.es/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data: RegisterResponse = await response.json();

		if (data.success) {
			error = undefined;

			localStorage.setItem('token', `Bearer ${data.data}`);
			$user = `Bearer ${data.data}`;

			goto('/');
		} else {
			error = data.message;
		}
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="w-96 w-max-1/2 mx-auto h-screen grid place-items-center">
	<form class="flex flex-col gap-6 w-full">
		<h1 class="text-center text-4xl font-bold">Create an account</h1>
		<div class="form-control w-full">
			<label class="label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				type="text"
				id="username"
				placeholder="localeyes"
				required
				class="input input-bordered w-full input-primary"
				bind:value={username}
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email address</span>
			</label>
			<input
				type="email"
				id="email"
				placeholder="hello@localey.es"
				required
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
				required
				class="input input-bordered w-full input-primary"
				bind:value={password}
			/>
		</div>

		<div class="grid gap-2">
			<button
				type="submit"
				on:click={register}
				color="green"
				class="btn btn-accent">Register</button
			>

			<span class="mx-auto">
				<a href="/login">
					<p class="hover:underline hover:cursor-pointer text-sm">
						Already registered? Log in.
					</p>
				</a>
			</span>
		</div>
	</form>
</div>
