<script lang="ts">
	import { addGameToDb } from '$lib/db';
	import XCircle from 'phosphor-svelte/lib/XCircle';
	import { onMount } from 'svelte';
	import { type PageData } from './$types';
	let players = $state<string[]>([]);
	let player = $state('');
	let cardCount = $state(8);
	let gameNameInput: HTMLInputElement;
	let playerInput: HTMLInputElement;
	let { data }: { data: PageData } = $props();
	const defaultGameName = $derived(`Game ${data.count + 1}`);
	let gameName = $state('');
	let pointsGiven = $state<5 | 10>(5);
	let startFromLow = $state(false);
	const canAddPlayer = $derived(player.trim().length >= 3);
	const maxCardCount = $derived(players.length > 0 ? Math.max(2, Math.floor(52 / players.length)) : 52);

	$effect(() => {
		if (cardCount > maxCardCount) {
			cardCount = maxCardCount;
		}
		if (cardCount < 2) {
			cardCount = 2;
		}
	});

	onMount(() => {
		gameName = defaultGameName;
		gameNameInput.focus();
	});
	function onAddPlayer(event: SubmitEvent) {
		event.preventDefault();
		const normalizedPlayerName = player.trim();
		if (normalizedPlayerName.length < 3) return;
		players.push(normalizedPlayerName);
		player = '';
		playerInput?.focus();
	}

	async function createGame() {
		if (!cardCount) return;
		if (players.length < 3) return;
		const date = new Date();
		const trimmedGameName = gameName.trim();
		const normalizedCardCount = Math.min(Math.max(2, Math.floor(cardCount)), maxCardCount);
		await addGameToDb(
			trimmedGameName || `Game ${date.toDateString()}`,
			normalizedCardCount,
			players,
			pointsGiven,
			startFromLow
		);
	}
</script>

<div class="container mx-auto flex justify-center">
	<div class="card bg-base-100 card-md w-96 shadow-sm">
		<div class="card-body">
			<h2 class="card-title">Create Game</h2>

			<fieldset class="fieldset">
				<legend class="fieldset-legend">Game name</legend>
				<input
					tabindex="0"
					type="text"
					bind:this={gameNameInput}
					bind:value={gameName}
					class="input"
					placeholder="Game One"
				/>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Points</legend>
				<div class="flex items-center gap-1">
					<button
						type="button"
						class={pointsGiven === 5 ? 'btn btn-neutral w-12' : 'btn btn-outline w-12'}
						onclick={() => (pointsGiven = 5)}
					>
						5
					</button>
					<button
						type="button"
						class={pointsGiven === 10 ? 'btn btn-neutral w-12' : 'btn btn-outline w-12'}
						onclick={() => (pointsGiven = 10)}
					>
						10
					</button>
				</div>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Card count</legend>
				<input
					type="number"
					min="2"
					max={maxCardCount}
					bind:value={cardCount}
					class="input"
					placeholder="Cards"
				/>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Round order</legend>
				<div class="flex items-center gap-1">
					<button
						type="button"
						aria-pressed={!startFromLow}
						class={startFromLow ? 'btn btn-outline' : 'btn btn-neutral'}
						onclick={() => (startFromLow = false)}
					>
						High to low
					</button>
					<button
						type="button"
						aria-pressed={startFromLow}
						class={startFromLow ? 'btn btn-neutral' : 'btn btn-outline'}
						onclick={() => (startFromLow = true)}
					>
						Low to high
					</button>
				</div>
			</fieldset>
			<form onsubmit={(e) => onAddPlayer(e)}>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Add player</legend>
					<input
						type="text"
						bind:value={player}
						bind:this={playerInput}
						minlength="3"
						required
						class="input"
						placeholder="Name"
					/>
				</fieldset>
				<button type="submit" class="btn btn-soft btn-primary" disabled={!canAddPlayer}>Add Player</button>
			</form>
			{#if players.length > 0}
				<div class="mt-2">
					<p class=" mb-4 text-xs font-medium">Players</p>
					{#each players as player, i}
						<div class="mb-1 flex w-fit items-center gap-2 rounded">
							<button
								class="btn btn-ghost btn-sm"
								tabindex="-1"
								type="button"
								onclick={() => {
									if (i === 0) {
										players.shift();
										return;
									}

									players = [...players.slice(0, i), ...players.slice(i + 1)];
								}}
							>
								<XCircle size={20} />
							</button>
							<p class="w-20">{player}</p>
						</div>
					{/each}
				</div>
			{/if}
			<div class="card-actions justify-end">
				<button
					type="button"
					disabled={!cardCount || players.length < 3}
					onclick={createGame}
					class="btn btn-primary col-span-2 mt-2 max-w-80"
				>
					Create
				</button>
			</div>
		</div>
	</div>
</div>
