<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Spade from 'phosphor-svelte/lib/Spade';
	import Timer from 'phosphor-svelte/lib/Timer';
	import type { PageData } from './$types';
	import UserThree from 'phosphor-svelte/lib/UsersThree';
	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto space-y-2">
	<div class="stats max-md:stats-vertical w-full shadow">
		<div class="stat">
			<div class="stat-figure text-secondary">
				<UserThree size={32} />
			</div>
			<div class="stat-title">Players</div>
			<div class="stat-value text-secondary">3 - 8</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-primary">
				<Spade size={32} />
			</div>
			<div class="stat-title">Cards</div>
			<div class="stat-value text-primary">52</div>
		</div>
		<div class="stat">
			<div class="stat-figure text-accent">
				<Timer size={32} />
			</div>
			<div class="stat-title">Playing Time</div>
			<div class="stat-value text-accent">Variable</div>
		</div>
	</div>

	<div class="grid gap-2 md:grid-cols-2">
		<div class="space-y-2">
			<div class="card bg-base-100 card-md col-span-2 w-full shadow-sm">
				<div class="card-body">
					<h2
						class="card-title text-secondary justify-center text-center text-2xl"
					>
						Setting Sail: Getting Ready to Play
					</h2>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-secondary">
						1. Choose Your Maximum Hand Size
					</h2>
					<p>
						Before you even touch the cards, the crew must agree on the maximum
						number of cards to be dealt in a round. This number will be the
						largest hand size each player receives. The only rule is that
						everyone gets the same number of cards in a given round. For
						example, if you choose 8 as your maximum, the dealing rounds will
						follow a sequence like: 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-secondary">2. Determine the Dealer</h2>
					<p>
						The first dealer can be chosen by cutting the deck (lowest card
						deals) or any other method the players agree on. The deal will
						rotate to the left after each round.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-secondary">
						3. Prepare Your Bidding Tools
					</h2>
					<p>
						Decide if you'll be using matches or fingers to show your bids. If
						using fingers, remember that your thumb is worth 5! So, a full hand
						with the thumb up means you're bidding on 9 tricks (5 + 4).
					</p>
				</div>
			</div>
		</div>
		<div class="space-y-2">
			<div class="card bg-base-100 card-md col-span-2 w-full shadow-sm">
				<div class="card-body">
					<h2
						class="card-title text-primary justify-center text-center text-2xl"
					>
						Playing the Game: From Deal to Victory
					</h2>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">1. Dealing the Cards</h2>
					<p>The dealer for the round shuffles the 52-card deck.</p>
					<p>
						Starting with the player to their left and going clockwise, the
						dealer deals the agreed-upon number of cards for that round to each
						player, one card at a time.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">
						2. Bidding for Booty (Making Your Bid)
					</h2>
					<p>Once you've received your cards, look at your hand.</p>
					<p>
						Before the first card is played in the round, each player must make
						a bid on how many sets they believe they will win in that round. The
						number of sets in a round is equal to the number of cards each
						player was dealt.
					</p>
					<p>
						Secretly show your bid using your chosen method (matches or
						fingers). Keep your bid hidden from other players until everyone is
						ready.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">3. Revealing Your Bid</h2>
					<p>
						When all players have made their bids, everyone reveals their bid
						simultaneously.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">4. Playing the Round</h2>
					<p>
						The player to the left of the dealer starts the first set by playing
						any card from their hand.
					</p>
					<p>
						Play continues clockwise. Each subsequent player must follow the
						suit of the card led if they have a card of that suit.
					</p>
					<p>
						If a player does not have a card of the led suit, they can play any
						card they wish – including a trump card (Spades) or a card of a
						different suit.
					</p>
					<p>
						Spades are always trump! This means any Spade card beats any card of
						another suit, regardless of rank.
					</p>
					<p>
						Within a suit (or if only Spades are played), the card ranks from
						highest to lowest are: Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4,
						3, 2.
					</p>
					<p>
						The player who played the highest-ranking card of the led suit, or
						the highest-ranking trump card if trumps were played, wins the set.
					</p>
					<p>The player who won the set leads the next set.</p>
					<p>
						Continue playing tricks until all cards in players' hands have been
						played. This marks the end of the round.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">
						5. Counting Your Haul (Scoring)
					</h2>
					<p>
						After all sets in the round have been played, compare the number of
						sets you won to the number of sets you bid.
					</p>
					<p>
						If you bid correctly (won exactly the number of sets you bid): You
						earn 10 points plus the number of sets you won.
					</p>
					<ul>
						<li>Bid 0, Won 0 = 10 points</li>
						<li>Bid 1, Won 1 = 11 points</li>
						<li>Bid 2, Won 2 = 12 points</li>
						<li>And so on...</li>
					</ul>
					<p>
						If you bid incorrectly (won more or fewer sets than you bid): You
						lose points equal to the difference between your bid and the number
						of sets you won.
					</p>
					<ul>
						<li>Bid 1, Won 0 = -1 points</li>
						<li>Bid 0, Won 2 = -2 points</li>
						<li>Bid 3, Won 1 = -2 points</li>
						<li>And so on...</li>
					</ul>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">
						6. Setting Sail for the Next Round
					</h2>
					<p>The deal passes to the player to the left.</p>
					<p>
						The number of cards dealt in the next round will follow the
						agreed-upon sequence (decreasing until 1, then increasing back up to
						the maximum).
					</p>
					<p>Repeat Steps 1-5 for each round.</p>
				</div>
			</div>
			<div class="card bg-base-100 card-md w-full shadow-sm">
				<div class="card-body">
					<h2 class="card-title text-primary">
						7. The Captain of the Ship (Winning the Game)
					</h2>
					<p>
						After all rounds in the full sequence have been played (from the
						maximum hand size down to 1 and back up to the maximum), the game is
						over.
					</p>
					<p>
						The player with the highest total score is the winner and is
						declared the Captain of Pirate Whist!
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
