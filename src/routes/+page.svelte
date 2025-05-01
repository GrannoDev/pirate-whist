<script>
	import Card from '$lib/components/Card.svelte';
</script>

<div class="hero bg-base-100 min-h-[calc(100dvh_-_81px)] grow max-md:place-items-start">
	<div class="hero-content flex-col items-center justify-center max-md:justify-start lg:flex-row">
		<Card className="w-60 max-md:w-28  bg-white" suit="Spades" rank="A" />
		<div>
			<h1 class="max-w-lg text-center text-5xl font-bold max-md:text-3xl">
				Master the Tides of Fortune in Pirate Whist!
			</h1>
			<p class="max-w-lg py-6 text-center">
				Set sail on a card game adventure unlike any other! Pirate Whist is a fast-paced trick-taking game where
				predicting your hand is just as crucial as playing it. Deal the cards, make your daring bids, and navigate the
				challenging rounds from single-card duels to full-hand battles. Will you sink or swim?
			</p>
			<div class="flex flex-wrap justify-center gap-2">
				<a href="/create-game" class="btn btn-primary">Start Your Voyage</a>
				<a href="/rules" class="btn btn-secondary btn-outline">Rules of Engagement</a>
			</div>
		</div>
	</div>
</div>
