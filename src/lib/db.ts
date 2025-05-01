import { goto } from '$app/navigation';
import type { Game, GameData, Player, PlayerScore, Round } from '$lib/types';
import Dexie, { type Table } from 'dexie';
export const db = new Dexie('piratwhist') as Dexie & {
	games: Table<Game, number>;
	players: Table<Player, number>;
	rounds: Table<Round, number>;
	playerScores: Table<PlayerScore, number>;
};

db.version(1).stores({
	games: '++id, name, winnerId, finished', // Add indexes for common queries
	players: '++id, gameId, name, total',
	rounds: '++id, gameId, roundNumber',
	playerScores: '++id, gameId, playerId, roundId, [gameId+playerId+roundId]'
});

export async function addGameToDb(gameName: string, maxCardCount: number, playerNames: string[]) {
	try {
		// Start a transaction for atomicity (ensure all related data is saved or none)
		return await db
			.transaction(
				'rw', // Readwrite transaction
				db.games,
				db.players,
				db.rounds,
				db.playerScores,
				async () => {
					// 1. Add the game
					const gameId = await db.games.add({
						name: gameName,
						cardCount: maxCardCount,
						winnerId: undefined, // Initially no winner
						date: new Date(),
						finished: false
					});

					// 2. Generate and add rounds
					const roundsData = generateRounds(maxCardCount, gameId); // Assuming generateRounds still exists
					const addedRounds: Round[] = [];
					for (const round of roundsData) {
						const roundId = await db.rounds.add(round);
						addedRounds.push({ ...round, id: roundId }); // Store the newly generated ID
					}

					// Store the newly generated ID

					// 3. Add players and initial scores
					const addedPlayers: Player[] = [];
					for (const playerName of playerNames) {
						const playerId = await db.players.add({
							gameId: gameId,
							name: playerName,
							total: 0 // Start with 0 total score
						});
						addedPlayers.push({ name: playerName, id: playerId, gameId: gameId, total: 0 }); // Add ID and gameId

						// Add initial scores for each player for each round
						for (const round of addedRounds) {
							if (!round.id) continue;
							await db.playerScores.add({
								gameId: gameId,
								playerId: playerId,
								roundId: round.id,
								score: 0, // Or undefined if you prefer
								bid: undefined, // You might want to store bid
								tricksWon: undefined // And tricks won
							});
						}
					}

					// Transaction will commit automatically if no errors occurred

					return gameId;
				}
			)
			.then((id) => goto(`/games/${id}`));
	} catch (e) {
		console.error('Error creating game:', e);
		// Handle error appropriately
		return undefined;
	}
}
export async function getGameWithData(gameId: number): Promise<GameData | undefined> {
	try {
		return await db.transaction(
			'r', // Readonly transaction
			db.games,
			db.players,
			db.rounds,
			db.playerScores,
			async () => {
				const game = await db.games.get(gameId);
				if (!game) return undefined;

				const players = await db.players.where({ gameId: gameId }).toArray();
				const rounds = await db.rounds.where({ gameId: gameId }).toArray();
				const playerScores = await db.playerScores.where({ gameId: gameId }).toArray();

				// Reconstruct the data structure for use in your Svelte components
				const playersWithScores = players.map((player) => {
					const scores = playerScores
						.filter((score) => score.playerId === player.id)
						.map((score) => ({ roundId: score.roundId, score: score.score })); // Adapt based on your PlayerScore interface

					// Recalculate total score from fetched scores (optional, but good practice)
					const calculatedTotal = scores.reduce((acc, curr) => acc + (curr.score ?? 0), 0);

					return {
						...player,
						scores: scores,
						total: calculatedTotal // Use calculated total
					};
				});

				// Find the winner based on the retrieved players
				const winner = playersWithScores.reduce(
					(prev, current) => {
						if (prev === undefined) return current;
						return current.total > prev.total ? current : prev;
					},
					undefined as Player | undefined
				); // Initial value needs type assertion

				return {
					...game,
					players: playersWithScores,
					rounds: rounds, // Use the fetched rounds
					winner: winner // Use the calculated winner
				};
			}
		);
	} catch (e) {
		console.error("Couldn't get game with data:", e);
		return undefined;
	}
}

// Function to update a player's score for a specific round
export async function updatePlayerScore(gameId: number, playerId: number, roundId: number, newScore: number) {
	try {
		// Find the specific playerScore entry
		const scoreEntry = await db.playerScores.where({ gameId, playerId, roundId }).first();
		if (scoreEntry) {
			await db.playerScores.update(scoreEntry.id!, { score: newScore });

			// Optionally, update the player's total score
			// This could also be done when fetching the game data, but updating here keeps total in sync
			const playerScoreEntries = await db.playerScores.where({ playerId: playerId }).toArray();
			const newTotal = playerScoreEntries.reduce((acc, curr) => acc + (curr.score ?? 0), 0);
			await db.players.update(playerId, { total: newTotal });
		} else {
			console.warn(`PlayerScore entry not found for Game ${gameId}, Player ${playerId}, Round ${roundId}`);
		}
	} catch (e) {
		console.error("Couldn't update player score:", e);
	}
}
// Function to delete a game and all related data
export async function deleteGame(id: number | undefined) {
	if (id === undefined) return;
	try {
		await db.transaction('rw', db.games, db.players, db.rounds, db.playerScores, async () => {
			await db.games.delete(id);
			await db.players.where({ gameId: id }).delete();
			await db.rounds.where({ gameId: id }).delete();
			await db.playerScores.where({ gameId: id }).delete();
		});
		goto('/games');
	} catch (e) {
		console.error("Couldn't delete game and related data:", e);
		// Handle error
	}
}

function generateRounds(maxCardCount: number, gameId: number) {
	const rounds: Round[] = [];
	let idCounter = 0;

	for (let i = maxCardCount; i >= 1; i--) {
		rounds.push({
			roundNumber: idCounter++,
			gameId,
			cardCount: i
		});
	}

	for (let i = 2; i <= maxCardCount; i++) {
		rounds.push({
			roundNumber: idCounter++,
			gameId,
			cardCount: i
		});
	}

	return rounds;
}
export async function handleFinishGame(gameId: number) {
	if (gameId === undefined) {
		console.error('Cannot finish game without an ID.');
		return;
	}

	try {
		// Start a transaction to ensure atomicity of finishing the game
		await db.transaction('rw', db.games, db.players, async () => {
			// 1. Fetch the players for the game
			const players = await db.players.where({ gameId: gameId }).toArray();

			if (players.length === 0) {
				console.warn(`No players found for game ${gameId}. Cannot determine a winner.`);
				// Still mark as finished even without players if desired, or throw error
				await db.games.update(gameId, { finished: true, winnerId: undefined });
				return; // Exit transaction if no players
			}

			// 2. Determine the winner based on total scores
			const winner = players.reduce(
				(prev, current) => {
					if (prev === undefined) return current; // Handle the first player
					return current.total > prev.total ? current : prev;
				},
				undefined as Player | undefined
			); // Initial value with type assertion

			const winnerId = winner ? winner.id : undefined; // Get the winner's ID

			// 3. Update the game entry in the database
			await db.games.update(gameId, {
				finished: true,
				winnerId: winnerId
			});

			// Transaction will commit automatically if no errors
		});

		// 4. Navigate back to the games page after the transaction commits
		goto('/games');
	} catch (e) {
		console.error(`Error finishing game ${gameId}:`, e);
		// Handle error appropriately, e.g., show an error message to the user
	}
}
