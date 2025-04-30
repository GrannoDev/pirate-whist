import { goto } from '$app/navigation';
import type { Game } from '$lib/types';
import Dexie, { type Table } from 'dexie';
export const db = new Dexie('piratwhist') as Dexie & {
	games: Table<Game, number>;
};

db.version(1).stores({
	games: 'id'
});

export async function addGameToDb(game: Game) {
	try {
		const count = await db.games.count();
		const id = count + 1;
		return db.games.add({ ...game, id }).then((id) => goto(`/game/${id}`));
	} catch (e) {
		console.log('error creating game', e);
	}
}

export async function deleteGame(id: number) {
	try {
		return db.games.delete(id).then(() => goto('/'));
	} catch (e) {
		console.error("Couldn't delete game", e);
	}
}
