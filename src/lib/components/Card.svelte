<script lang="ts">
	import Spade from 'phosphor-svelte/lib/Spade';
	import Club from 'phosphor-svelte/lib/Club';
	import Heart from 'phosphor-svelte/lib/Heart';
	import Diamond from 'phosphor-svelte/lib/Diamond';
	import type { CardRank, CardSuit } from '$lib/types';

	const { rank, suit, className }: { rank: CardRank; suit: CardSuit; className: string } = $props();
</script>

<div
	class={[
		'bg-base-100 border-base-300 flex aspect-[2/3] flex-col justify-between rounded border p-2',
		className
	]}
>
	<!-- Header -->
	{@render CardTitle()}
	<div
		class={[
			'grid grow place-items-center',
			suit === 'Diamonds' || suit === 'Hearts' ? 'fill-red-500 text-red-500' : 'text-black'
		]}
	>
		{#if suit === 'Clubs'}
			<Club size="50%" weight="fill" />
		{:else if suit === 'Diamonds'}
			<Diamond size="50%" weight="fill" />
		{:else if suit === 'Hearts'}
			<Heart size="50%" weight="fill" />
		{:else}
			<Spade size="50%" weight="fill" />
		{/if}
	</div>
	<!-- Footer -->
	{@render CardTitle(true)}
</div>

{#snippet CardTitle(reverse: boolean = false)}
	<div
		class={[
			'flex items-center justify-between',
			suit === 'Diamonds' || suit === 'Hearts' ? 'fill-red-500 text-red-500' : 'text-black',
			reverse ? 'flex-row-reverse' : ''
		]}
	>
		<span class="text-3xl font-semibold">{rank}</span>

		{#if suit === 'Clubs'}
			<Club weight="fill" />
		{:else if suit === 'Diamonds'}
			<Diamond weight="fill" />
		{:else if suit === 'Hearts'}
			<Heart size="32px" weight="fill" />
		{:else}
			<Spade weight="fill" />
		{/if}
	</div>
{/snippet}
