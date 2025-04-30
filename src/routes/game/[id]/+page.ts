import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { goto } from '$app/navigation';
export const ssr = false;
export const load = (async ({ params }) => {
	const game = await db.games.get(+params.id);
	if (!game) {
		goto('/');
	}
	return { game };
}) satisfies PageLoad;
