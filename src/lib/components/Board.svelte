<script lang="ts">
	import type { Game } from '$lib/types';
	import PlayerColumn from './PlayerColumn.svelte';
	import Crown from 'phosphor-svelte/lib/Crown';
	let { game }: { game: Game } = $props();

	function handleFinishGame() {
		game.finished = true;
	}
</script>

<div class="card bg-base-100 card-md w-full shrink-0 shadow-sm">
	<div class="card-body p-0">
		<div class="flex w-full flex-wrap items-center justify-between p-2">
			<div class="flex flex-wrap items-center gap-2">
				<h2 class="card-title w-fit text-2xl">
					{game.name}
				</h2>
				{#if !game.finished}
					<button
						type="button"
						onclick={handleFinishGame}
						class="btn max-md:btn-sm btn-secondary"
					>
						Finish game
					</button>
				{/if}
			</div>
			{#if game.winner}
				<p class="flex grow-0 items-center gap-2">
					Winner: {game.winner?.name}
					<Crown weight="fill" class="text-yellow-500" />
				</p>
			{/if}
		</div>

		<div class="flex shrink-0">
			<!-- Rounds -->
			<div class="flex flex-col">
				<span
					class="mb-px size-16 border border-transparent text-center max-md:w-10"
				></span>
				{#each game.rounds as round}
					<div
						class="border-primary bg-primary last:border-b-primary grid h-12 place-items-center rounded-l border border-b-white font-bold text-white first:rounded-tl md:h-20"
					>
						{round.cardCount}
					</div>
				{/each}
			</div>
			<!-- Rounds -->
			<div class="flex w-full overflow-x-auto">
				{#each game.players as player}
					<PlayerColumn {player} finished={game.finished} />
				{/each}
			</div>
		</div>
	</div>
</div>
