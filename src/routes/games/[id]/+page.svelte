<script lang="ts">
	import type { PageData } from '../../game/[id]/$types';
	import { deleteGame, handleFinishGame } from '$lib/db';
	import PlayerColumn from '$lib/components/PlayerColumn.svelte';
	import { type GameData } from '$lib/types';
	import Crown from 'phosphor-svelte/lib/Crown';
	import Spade from 'phosphor-svelte/lib/Spade';

	let { data }: { data: PageData } = $props();
	let game = $state<Required<GameData>>(data.game);

	let winner = $derived(game?.players.find((p) => p?.id === game.winnerId));

	function finishGame() {
		if (!game.id) return;
		handleFinishGame(game.id);
	}
</script>

{#if game}
	<div class="card bg-base-100 card-md w-full shrink-0 shadow-sm">
		<div class="card-body p-0">
			<div class="container mx-auto flex w-full flex-wrap items-center justify-between gap-2 p-2 max-md:justify-center">
				<div class="flex flex-col gap-2">
					<h2 class="card-title w-fit text-2xl">
						{game.name}
					</h2>
					{#if winner}
						<p class="flex grow-0 items-center gap-2">
							Winner: {winner?.name}
							<Crown weight="fill" class="text-yellow-500" />
						</p>
					{/if}
				</div>

				<div class="flex flex-wrap items-center justify-center gap-2 max-md:w-full md:ml-auto">
					{#if !game.finished}
						<button type="button" onclick={finishGame} class="btn max-md:btn-sm btn-primary">Finish game</button>
					{/if}
					<button class="btn btn-error btn-outline max-md:btn-sm" type="button" onclick={() => deleteGame(game?.id)}>
						Delete game
					</button>
				</div>
			</div>

			<div class="border-primary flex rounded-md border">
				<!-- Rounds -->
				<div class="flex flex-col">
					<div
						class=" border-primary grid size-16 place-items-center rounded-tl border-r border-b text-center max-md:w-10"
					>
						<Spade size={32} />
					</div>
					{#each game.rounds as round}
						<div
							class="border-primary grid h-12 place-items-center border-r border-b border-l-0 font-bold first:rounded-tl last:rounded-bl last:border-b-0 md:h-20"
						>
							{round.cardCount}
						</div>
					{/each}
				</div>
				<!-- Rounds -->
				<div class="flex w-full overflow-x-auto">
					{#each game.players as player}
						<PlayerColumn gameId={game.id} {player} finished={game.finished} />
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else}
	<span class="loading loading-spinner text-primary"></span>
{/if}
