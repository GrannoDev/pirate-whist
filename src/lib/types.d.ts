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

export interface Game {
	id: number;
	name: string;
	players: Player[];
	rounds: Round[];
	winner: Player | undefined;
	date: Date;
	finished: boolean;
}

export interface Player {
	name: string;
	scores: PlayerScore[];
	total: number;
}

export interface Round {
	id: number;
	cardCount: number;
}
export interface PlayerScore {
	roundId: number;
	score: number | undefined;
}
