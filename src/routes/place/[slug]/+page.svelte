<script lang="ts">
	import Geolocation from 'svelte-geolocation';
	import { Map, Marker } from '@beyonk/svelte-mapbox/components';

	import { calculateDistance, formatDistance } from '$/util/geo';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import type { Question } from '$/app';
	import { user } from '$/hooks/auth';
	import Rating from '$/components/Rating.svelte';

	// This is a hack to get around the fact that the Marker's typing is wrong
	const youColor = 'red' as unknown as number;
	const formatter = new Intl.NumberFormat();

	export let data: PageData;

	let coords: [number, number];
	let distance: number | null;
	let claimedPoints = false;
	let manualClose = false;
	let deniedLocation = false;
	let showQuestionModal = false;
	let questions: Promise<{
		id: string;
		questions: Question[];
	}>;
	let answers: number[] = [];
	let correctAnswers: number[];
	let answersLoading = false;

	$: {
		showQuestionModal =
			distance !== null && distance < 1_000 && !claimedPoints && !manualClose;

		if (showQuestionModal && !questions) {
			questions = fetch(
				`https://api.localey.es/place/${data.props.place.id}/questions`
			)
				.then(res => res.json())
				.then(res => res.data);
		}
	}

	$: {
		distance =
			coords && (coords[0] !== -1 || coords[1] !== -1)
				? calculateDistance(coords, data.props.place.point.coordinates)
				: null;

		if (distance !== null && distance < 100 && !claimedPoints) {
			claimedPoints = true;

			fetch(`https://api.localey.es/place/${data.props.place.id}/claim`);
		}
	}

	const useDark = browser && matchMedia('(prefers-color-scheme: dark)').matches;
</script>

<Geolocation getPosition bind:coords on:error={() => (deniedLocation = true)} />

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal" class:modal-open={showQuestionModal}>
	<div class="modal-box relative">
		<label
			for="my-modal-3"
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => {
				manualClose = true;
				showQuestionModal = false;
			}}
			on:keydown
		>
			✕
		</label>

		<h3 class="text-lg font-bold">You're getting close!</h3>
		<p class="py-4">
			Since you're almost there, we've prepared a few multiple-choice questions
			for you about <span class="font-bold">{data.props.place.name}</span>.
		</p>

		{#if questions}
			{#await questions}
				<div class="grid w-full place-items-center h-48">
					<div
						class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					/>
				</div>
			{:then questions}
				{#if questions.questions.length}
					<form>
						<div class="flex flex-col gap-6">
							{#each questions.questions as question, i}
								<h2 class="text-md font-bold">{i + 1}. {question.question}</h2>
								<div class="flex flex-col gap-4">
									{#each { length: 4 } as _, j}
										<label class="flex flex-row gap-2 cursor-pointer">
											<input
												type="radio"
												name={correctAnswers === undefined
													? `radio-${i}`
													: `radio-${i}-${j}`}
												class="radio {correctAnswers === undefined
													? 'checked:bg-primary'
													: correctAnswers[i] === j
													? 'checked:bg-success'
													: 'checked:bg-error'}"
												disabled={correctAnswers !== undefined &&
													answers[i] !== j}
												checked={answers[i] === j ||
													(correctAnswers !== undefined &&
														correctAnswers[i] === j)}
												on:click={() => (answers[i] = j)}
											/>
											<span class="label-text">{question.answers[j]}</span>
										</label>
									{/each}
								</div>
							{/each}
						</div>

						{#if answers.length === questions.questions.length && answers.length > 0 && correctAnswers === undefined}
							<div class="modal-action">
								<button
									class="btn btn-success"
									class:loading={answersLoading}
									on:click|preventDefault={async () => {
										answersLoading = true;

										const response = await fetch(
											`https://api.localey.es/place/${data.props.place.id}/questions/${questions.id}`,
											{
												method: 'POST',
												body: JSON.stringify(answers),
												headers: $user
													? {
															'Content-Type': 'application/json',
															Authorization: $user,
													  }
													: {
															'Content-Type': 'application/json',
													  },
											}
										);

										const json = await response.json();

										answersLoading = false;
										correctAnswers = json.data;
									}}
								>
									Submit
								</button>
							</div>
						{/if}
					</form>
				{:else}
					<div class="grid w-full place-items-center h-48">
						<p>Could not generate questions.</p>
					</div>
				{/if}
			{/await}
		{:else}
			<div class="grid w-full place-items-center h-48">
				<div
					class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				/>
			</div>
		{/if}
	</div>
</div>

<div
	class="min-h-screen min-w-screen bg-cover bg-no-repeat"
	style="background-image: url({data.props.place.image});"
>
	<div class="">
		<div class="hero-overlay backdrop-blur-sm bg-opacity-75">
			<div
				class="w-full h-full px-8 pt-8 md:px-12 md:pt-12 lg:px-16 lg:pt-16 flex lg:flex-row flex-col gap-16 lg:gap-8"
			>
				<div
					class="place-self-center lg:place-self-start flex flex-col gap-8 max-w-prose-xl"
				>
					<span class="place-self-start">
						<h1 class="text-5xl font-bold text-primary">
							{data.props.place.name}
						</h1>
						<p class="text-lg text-gray-300">{data.props.place.address}</p>
					</span>

					<div
						class="whitespace-pre-line max-w-prose a-underline text-xl text-gray-300 truncate text-justify"
					>
						{@html data.props.place.about}
					</div>
				</div>

				<span
					class="flex flex-wrap flex-col md:flex-row mx-auto lg:mx-0 gap-16 lg:flex-grow lg:place-self-start lg:h-screen lg:grid lg:content-between lg:-mt-32"
				>
					<span class="text-right lg:mt-32">
						{#if distance}
							<p
								class="text-8xl font-bold -mt-3 {distance < 100
									? 'text-accent'
									: 'text-primary'}"
							>
								{formatDistance(distance)}
							</p>
						{:else if !deniedLocation}
							<div
								class="text-primary inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
								role="status"
							/>
						{:else}
							<p class="text-8xl font-bold -mt-3 text-primary">Unknown</p>
						{/if}

						<p class="text-3xl">from your location</p>
					</span>

					<span class="lg:place-self-end text-right">
						<p class="text-3xl">
							with {formatter.format(data.props.place.ratings)} rating{data
								.props.place.ratings === 1
								? ''
								: 's'}
						</p>

						<Rating rating={data.props.place.rating} />
					</span>
				</span>
			</div>

			<div class="sticky bottom-0 p-8 flex flex-col">
				<a
					class="btn btn-ghost w-16 h-16 p-0 rounded-full place-self-center"
					href="#map"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 0 24 24"
						width="24"
						class="fill-current w-10 h-10"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>

<div id="map" class="min-w-screen min-h-screen relative grid">
	<a
		class="btn absolute top-8 place-self-center w-16 h-16 p-0 rounded-full hover:-mb-1 transition-all duration-300 z-10"
		href="#top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			class="fill-current w-10 h-10"
		>
			<path d="M0 0h24v24H0V0z" fill="none" /><path
				d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
			/>
		</svg>
	</a>

	<Map
		accessToken="pk.eyJ1IjoiZ29vZ2xlc2l0ZXMiLCJhIjoiY2xmdnE1bmcxMDluMDNxc2F2cDJ6eHhhaSJ9.l8vrvPpPfL6ikBNW6GGSqA"
		center={data.props.place.point.coordinates}
		style={useDark
			? 'mapbox://styles/mapbox/dark-v11'
			: 'mapbox://styles/mapbox/light-v11'}
		zoom={15}
	>
		<Marker
			lat={data.props.place.point.coordinates[1]}
			lng={data.props.place.point.coordinates[0]}
			label={data.props.place.name}
		/>

		{#if coords}
			<Marker
				lat={coords[1]}
				lng={coords[0]}
				label="You are here"
				color={youColor}
			/>
		{/if}
	</Map>
</div>

<style global>
	.a-underline a {
		text-decoration: underline;
	}
</style>
