export type CardRank =
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10' // Ten
	| 'J' // Jack
	| 'Q' // Queen
	| 'K' // King
	| 'A'; // Ace

export type CardSuit = 'Hearts' | 'Spades' | 'Clubs' | 'Diamonds';
// Interfaces for Database Tables
export interface Game {
	id?: number; // Optional for adding, required for updating/retrieving
	name: string;
	cardCount: number; // Maximum card count for the game
	winnerId: number | undefined; // Reference to the winning player's ID
	date: Date;
	finished: boolean;
}

export interface Player {
	id?: number; // Optional for adding, required for updating/retrieving
	gameId: number; // Foreign Key
	name: string;
	total: number; // Can be stored for performance or calculated
}

export interface Round {
	id?: number; // Optional for adding, required for updating/retrieving
	gameId: number; // Foreign Key
	roundNumber: number; // Sequential number (0-indexed)
	cardCount: number;
}

export interface PlayerScore {
	id?: number; // Optional for adding, required for updating/retrieving
	gameId: number; // Foreign Key
	playerId: number; // Foreign Key
	roundId: number; // Foreign Key
	score: number; // Score for this round for this player
	bid?: number; // Optional: Store the bid
	tricksWon?: number; // Optional: Store tricks won
}

export interface GameData extends Game {
	players: PlayerWithScores[]; // Players with their scores and total
	rounds: Round[]; // All rounds belonging to this game
}

export interface PlayerWithScores extends Player {
	scores: { roundId: number; score: number }[]; // Simplified score structure for component use
}
