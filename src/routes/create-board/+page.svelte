<script lang="ts">
	import { addGameToDb } from '$lib/db';
	import type { Game, Round } from '$lib/types';
	import XCircle from 'phosphor-svelte/lib/XCircle';
	import { onMount } from 'svelte';
	let players = $state<string[]>([]);
	let player = $state('');
	let cardCount = $state(8);
	let gameName = $state('New Game');
	let gameNameInput: HTMLInputElement;
	let playerInput: HTMLInputElement;
	const maxCardCount = $derived(players.length > 0 ? Math.floor(52 / players.length) : 16);

	onMount(() => gameNameInput.focus());
	function onAddPlayer(event: SubmitEvent) {
		event.preventDefault();
		players.push(player);
		player = '';
		playerInput?.focus();
	}

	async function createGame() {
		if (!cardCount) return;
		const date = new Date();
		await addGameToDb(gameName ?? `Game ${date.toDateString()}`, cardCount, players);
	}
</script>

<div class="container mx-auto flex justify-center">
	<div class="card bg-base-100 card-md w-96 shadow-sm">
		<div class="card-body">
			<h2 class="card-title">Create Board</h2>

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
				<legend class="fieldset-legend">Card count</legend>
				<input type="number" min="1" max={maxCardCount} bind:value={cardCount} class="input" placeholder="Cards" />
			</fieldset>
			<form onsubmit={(e) => onAddPlayer(e)}>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Add player</legend>
					<input
						type="text"
						bind:value={player}
						bind:this={playerInput}
						minlength="2"
						required
						class="input"
						placeholder="Jack"
					/>
				</fieldset>
				<button type="submit" class="btn btn-soft btn-primary" disabled={player.length < 3}>Add Player</button>
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
					Create Board
				</button>
			</div>
		</div>
	</div>
</div>
