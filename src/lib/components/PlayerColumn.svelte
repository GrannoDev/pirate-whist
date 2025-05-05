<script lang="ts">
	import { updatePlayerScore } from '$lib/db';
	import type { PlayerWithScores } from '$lib/types';
	import { Popover } from 'bits-ui';

	let {
		player,
		finished,
		gameId,
		points
	}: { player: PlayerWithScores; finished: boolean; gameId: number; points: number } = $props();

	let total = $derived(player.total);

	function handleScoreUpdate(roundId: number, newScore: number) {
		if (!player.id) return;

		updatePlayerScore(gameId, player.id, roundId, newScore);

		const scoreEntry = player.scores.find((s) => s.roundId === roundId);
		if (scoreEntry) {
			scoreEntry.score = newScore;
			total = player.scores.reduce((acc, curr) => acc + (curr.score ?? 0), 0);
		}
	}
</script>

<div
	class="border-primary {finished &&
		'pointer-events-none'} flex min-w-20 grow flex-col border-r border-l-0 last:rounded-r-lg last:border-r-0"
>
	<span class="border-b-primary grid h-16 place-items-center border-b text-center font-semibold">
		<p class="truncate text-2xl font-bold max-md:text-lg">
			{player.name}
		</p>
		<p class={` text-lg font-bold ${total > 0 ? 'text-success' : total < 0 ? 'text-error' : ''}`}>
			{total}
		</p>
	</span>
	{#each player.scores as score}
		<Popover.Root>
			<Popover.Trigger
				disabled={finished}
				class={`border-base-300 lg:hover:bg-base-200 h-12 border-b px-2  last:border-b-0 md:h-20  ${score.score > 0 ? 'bg-success lg:hover:bg-success text-white' : score.score < 0 ? 'bg-error lg:hover:bg-error text-white' : ''}`}
			>
				<span class="text-lg font-semibold max-md:text-base">
					{score.score}
				</span>
			</Popover.Trigger>
			<Popover.Content class="bg-base-100 shadow-popover z-30 w-full max-w-80 rounded-lg border p-4" sideOffset={0}>
				<div class="flex flex-col">
					<span class="mb-2 text-center text-xl font-bold">{player.name}</span>
					<span class="mb-2 grid place-items-center text-center text-xl font-semibold">
						{score.score}
					</span>

					{#if !finished}
						<div class="flex items-center justify-center gap-1">
							<button
								type="button"
								tabindex="-1"
								onclick={() => handleScoreUpdate(score.roundId, score.score - 1)}
								class="btn btn-sm btn-dash btn-error w-fit"
							>
								-1
							</button>
							<button
								type="button"
								tabindex="-1"
								onclick={() => handleScoreUpdate(score.roundId, score.score - points)}
								class="btn btn-sm btn-dash btn-error w-fit"
							>
								-{points}
							</button>
							<button
								type="button"
								onclick={() => handleScoreUpdate(score.roundId, score.score + points)}
								class="btn btn-sm btn-dash btn-success"
							>
								+{points}
							</button>
							<button
								type="button"
								onclick={() => handleScoreUpdate(score.roundId, score.score + 1)}
								class="btn btn-sm btn-dash btn-success"
							>
								+1
							</button>
						</div>
					{/if}
				</div>
			</Popover.Content>
		</Popover.Root>
	{/each}
</div>
