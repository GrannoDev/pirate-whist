import { db } from '$lib/db';
import type { PageLoad } from './$types';
export const ssr = false;
export const load = (async () => {
	const games = await db.games.orderBy('id').reverse().toArray();
	const players = await db.players.toArray();
	return {
		games,
		players
	};
}) satisfies PageLoad;
