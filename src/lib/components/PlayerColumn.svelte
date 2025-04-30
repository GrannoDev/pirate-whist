<script lang="ts">
	import type { Player, PlayerScore } from '$lib/types';
	import { Popover } from 'bits-ui';
	let { player, finished }: { player: Player; finished: boolean } = $props();
	let scores = $state<PlayerScore[]>([]);
	$effect(() => {
		scores = player.scores;
	});
	let total = $derived(
		scores.reduce((acc, curr) => acc + (curr.score ?? 0), 0)
	);
</script>

<div
	class="border-base-300 flex min-w-20 grow flex-col border-t border-b border-l first:rounded-tl last:rounded-r last:border-r"
>
	<span class="grid h-16 place-items-center text-center font-semibold">
		<p class="truncate text-2xl font-bold max-md:text-xl">
			{player.name}
		</p>
		<p class="text-secondary text-lg font-bold">
			{total}
		</p>
	</span>
	{#each scores as score}
		<Popover.Root>
			<Popover.Trigger
				disabled={finished}
				class="border-base-300 h-12 border-t  px-2 last:border-b-0 md:hidden "
			>
				<span class="text-2xl font-semibold max-md:text-xl">{score.score}</span>
			</Popover.Trigger>
			<Popover.Content
				class="bg-base-100 shadow-popover z-30 w-full max-w-80 rounded border p-4"
				sideOffset={0}
			>
				<div class="flex flex-col">
					<span class="mb-2 text-center text-xl font-bold">{player.name}</span>
					<span
						class="grid place-items-center text-center text-2xl font-semibold"
					>
						{score.score}
					</span>

					{#if !finished}
						<div class="flex items-center justify-center gap-1">
							<button
								type="button"
								tabindex="-1"
								onclick={() => (score.score = (score.score ?? 0) - 1)}
								class="btn btn-sm btn-dash btn-error w-fit"
							>
								-1
							</button>
							<button
								type="button"
								onclick={() => (score.score = (score.score ?? 0) + 10)}
								class="btn btn-sm btn-dash btn-success"
							>
								+10
							</button>
							<button
								type="button"
								onclick={() => (score.score = (score.score ?? 0) + 1)}
								class="btn btn-sm btn-dash btn-success"
							>
								+1
							</button>
						</div>
					{/if}
				</div>
			</Popover.Content>
		</Popover.Root>
		<div
			class="border-base-300 hidden h-20 flex-col content-center justify-evenly border-t px-2 last:border-b-0 md:flex"
		>
			<span class="grid place-items-center text-center text-lg font-semibold">
				{score.score}
			</span>

			{#if !finished}
				<div class="flex items-center justify-center gap-1">
					<button
						type="button"
						onclick={() => (score.score = (score.score ?? 0) - 1)}
						class="btn btn-sm btn-dash btn-error w-fit"
					>
						-1
					</button>
					<button
						type="button"
						onclick={() => (score.score = (score.score ?? 0) + 10)}
						class="btn btn-sm btn-dash btn-success"
					>
						+10
					</button>
					<button
						type="button"
						onclick={() => (score.score = (score.score ?? 0) + 1)}
						class="btn btn-sm btn-dash btn-success"
					>
						+1
					</button>
				</div>
			{/if}
		</div>
	{/each}
</div>
