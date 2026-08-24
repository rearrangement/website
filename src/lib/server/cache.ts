interface Entry<T> {
	value: T;
	expires: number;
}

const store = new Map<string, Entry<unknown>>();

export async function cached<T>(
	key: string,
	ttlMs: number,
	load: () => Promise<T>,
): Promise<T> {
	const hit = store.get(key) as Entry<T> | undefined;
	if (hit && hit.expires > Date.now()) return hit.value;

	const value = await load();
	store.set(key, { value, expires: Date.now() + ttlMs });
	return value;
}

export async function fetchJson<T>(
	url: string,
	init?: RequestInit,
): Promise<T | null> {
	try {
		const res = await fetch(url, {
			...init,
			signal: AbortSignal.timeout(6000),
			headers: { accept: "application/json", ...init?.headers },
		});
		if (!res.ok) {
			console.warn(`[fetch] ${res.status} ${res.statusText} — ${url}`);
			return null;
		}
		return (await res.json()) as T;
	} catch (err) {
		console.warn(`[fetch] failed — ${url}`, err);
		return null;
	}
}
