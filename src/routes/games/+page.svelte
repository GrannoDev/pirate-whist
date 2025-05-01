<script lang="ts">
	import GameListItem from '$lib/components/GameListItem.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto">
	<ul class="list bg-base-100 rounded-box w-full gap-1 p-4 shadow-md">
		{#if data.games.length === 0}
			<li>
				<p>You have no previous games.</p>
				<a href="/create-game" class="btn btn-sm btn-soft btn-primary">Create one now</a>
			</li>
		{:else}
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Your games</li>
		{/if}
		{#each data.games as game}
			<GameListItem {game} players={data.players.filter((p) => p.gameId === game.id)} />
		{/each}
	</ul>
</div>
