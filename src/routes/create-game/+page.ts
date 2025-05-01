import { db } from '$lib/db';
import type { PageLoad } from './$types';
export const ssr = false;
export const load = (async () => {
	const count = await db.games.count();
	return { count };
}) satisfies PageLoad;
