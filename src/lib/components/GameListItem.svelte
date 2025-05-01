<script lang="ts">
	import type { Game, Player } from '$lib/types';
	import Crown from 'phosphor-svelte/lib/Crown';

	let { game, players }: { game: Game; players: Player[] } = $props();

	let winner = $derived(players.find((p) => p.id === game.winnerId));
</script>

<a href="/games/{game.id}">
	<li class="list-row hover:bg-base-200 border-base-content items-center border shadow">
		<div class="text-4xl font-thin tabular-nums opacity-30">{game.cardCount}</div>
		<div class="list-col-grow">
			<div>{game.name}</div>
			<div class="text-xs font-semibold opacity-60">{game.date.toDateString()}</div>
		</div>
		{#if game.finished && game.winnerId}
			<p class="flex items-center gap-1">
				<Crown weight="fill" class="translate-y-px text-yellow-500" />
				Winner: {winner?.name}
			</p>
		{/if}
	</li>
</a>
