import { getGameWithData } from '$lib/db';
import type { PageLoad } from './$types';
import { goto } from '$app/navigation';
import type { GameData } from '$lib/types';
export const ssr = false;
export const load = (async ({ params }) => {
	const game = await getGameWithData(+params.id);
	if (!game) {
		goto('/');
	}
	return { game: game as Required<GameData> };
}) satisfies PageLoad;
