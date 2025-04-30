import type { Round, PlayerScore, Player, Game } from './types';

const hardcodedRounds: Round[] = [
	{ id: 0, cardCount: 3 },
	{ id: 1, cardCount: 2 },
	{ id: 2, cardCount: 1 },
	{ id: 3, cardCount: 2 },
	{ id: 4, cardCount: 3 }
];

// Hardcoded PlayerScore data for Player 1 (Alice)
const aliceScores: PlayerScore[] = [
	{ roundId: 0, score: 13 }, // Bid 3, Won 3 (10 + 3)
	{ roundId: 1, score: 11 }, // Bid 1, Won 1 (10 + 1)
	{ roundId: 2, score: 10 }, // Bid 0, Won 0 (10 + 0)
	{ roundId: 3, score: 9 }, // Bid 2, Won 1 (-1)
	{ roundId: 4, score: 15 } // Bid 3, Won 5 (-2)
];
const aliceTotal = aliceScores.reduce(
	(sum, score) => sum + (score.score !== undefined ? score.score : 0),
	0
);

// Hardcoded PlayerScore data for Player 2 (Bob)
const bobScores: PlayerScore[] = [
	{ roundId: 0, score: 8 }, // Bid 2, Won 0 (-2)
	{ roundId: 1, score: 12 }, // Bid 2, Won 2 (10 + 2)
	{ roundId: 2, score: 9 }, // Bid 1, Won 0 (-1)
	{ roundId: 3, score: 12 }, // Bid 2, Won 2 (10 + 2)
	{ roundId: 4, score: 7 } // Bid 3, Won 0 (-3)
];
const bobTotal = bobScores.reduce(
	(sum, score) => sum + (score.score !== undefined ? score.score : 0),
	0
);

// Hardcoded PlayerScore data for Player 3 (Charlie)
const charlieScores: PlayerScore[] = [
	{ roundId: 0, score: 12 }, // Bid 2, Won 2 (10 + 2)
	{ roundId: 1, score: 10 }, // Bid 0, Won 0 (10 + 0)
	{ roundId: 2, score: 11 }, // Bid 1, Won 1 (10 + 1)
	{ roundId: 3, score: 8 }, // Bid 1, Won 0 (-1)
	{ roundId: 4, score: 13 } // Bid 3, Won 3 (10 + 3)
];
const charlieTotal = charlieScores.reduce(
	(sum, score) => sum + (score.score !== undefined ? score.score : 0),
	0
);

// Hardcoded PlayerScore data for Player 4 (Rikke)
const rikkeScores: PlayerScore[] = [
	{ roundId: 0, score: 12 }, // Bid 2, Won 2 (10 + 2)
	{ roundId: 1, score: 10 }, // Bid 0, Won 0 (10 + 0)
	{ roundId: 2, score: 11 }, // Bid 1, Won 1 (10 + 1)
	{ roundId: 3, score: 8 }, // Bid 1, Won 0 (-1)
	{ roundId: 4, score: 13 } // Bid 3, Won 3 (10 + 3)
];
const rikkeTotal = rikkeScores.reduce(
	(sum, score) => sum + (score.score !== undefined ? score.score : 0),
	0
);
const lauritsScores: PlayerScore[] = [
	{ roundId: 0, score: 12 }, // Bid 2, Won 2 (10 + 2)
	{ roundId: 1, score: 10 }, // Bid 0, Won 0 (10 + 0)
	{ roundId: 2, score: 11 }, // Bid 1, Won 1 (10 + 1)
	{ roundId: 3, score: 8 }, // Bid 1, Won 0 (-1)
	{ roundId: 4, score: 13 } // Bid 3, Won 3 (10 + 3)
];
const lauritsTotal = lauritsScores.reduce(
	(sum, score) => sum + (score.score !== undefined ? score.score : 0),
	0
);
// Hardcoded Player data
const hardcodedPlayers: Player[] = [
	{ name: 'Alice', scores: aliceScores, total: aliceTotal },
	{ name: 'Bob', scores: bobScores, total: bobTotal },
	{ name: 'Charlie', scores: charlieScores, total: charlieTotal },
	{ name: 'Rikke', scores: rikkeScores, total: rikkeTotal },
	{
		name: 'Laurits',
		scores: lauritsScores,
		total: lauritsTotal
	},
	{
		name: 'Laurits',
		scores: lauritsScores,
		total: lauritsTotal
	},
	{
		name: 'Laurits',
		scores: lauritsScores,
		total: lauritsTotal
	},
	{
		name: 'Laurits',
		scores: lauritsScores,
		total: lauritsTotal
	}
];

// Determine the winner (based on the hardcoded totals)
const winner: Player | undefined = hardcodedPlayers.reduce(
	(prev, current) => {
		if (prev === undefined) return current;
		return current.total > prev.total ? current : prev;
	},
	undefined as Player | undefined
); // Initial value needs type assertion

// Hardcoded Game data
export const hardcodedGame: Game = {
	id: 1,
	name: 'Example Pirate Whist Game',
	players: hardcodedPlayers,
	rounds: hardcodedRounds,
	winner: winner,
	finished: false,
	date: new Date('2023-10-27T10:00:00Z') // Example date
};
