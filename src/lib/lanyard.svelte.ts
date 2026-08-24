import { browser } from "$app/environment";

const SOCKET_URL = "wss://api.lanyard.rest/socket";
const MAX_ATTEMPTS = 6;
const BASE_DELAY = 2000;

export const ActivityType = {
	Playing: 0,
	Streaming: 1,
	Listening: 2,
	Watching: 3,
	Custom: 4,
	Competing: 5,
} as const;

export interface Activity {
	id: string;
	name: string;
	type: number;
	state?: string;
	details?: string;
	emoji?: { name: string; id?: string; animated?: boolean };
	timestamps?: { start?: number; end?: number };
	assets?: {
		large_image?: string;
		large_text?: string;
		small_image?: string;
		small_text?: string;
	};
	application_id?: string;
}

export interface Spotify {
	track_id: string;
	song: string;
	artist: string;
	album: string;
	album_art_url: string;
	timestamps: { start: number; end: number };
}

export interface Presence {
	discord_user: {
		id: string;
		username: string;
		global_name: string | null;
		display_name: string | null;
		avatar: string | null;
	};
	discord_status: "online" | "idle" | "dnd" | "offline";
	activities: Activity[];
	listening_to_spotify: boolean;
	spotify: Spotify | null;
	active_on_discord_web: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
}

type Op = { op: number; t?: string; d: unknown };

export class Lanyard {
	presence = $state<Presence | null>(null);
	connected = $state(false);
	now = $state(Date.now());

	#socket: WebSocket | null = null;
	#heartbeat: ReturnType<typeof setInterval> | null = null;
	#clock: ReturnType<typeof setInterval> | null = null;
	#retry: ReturnType<typeof setTimeout> | null = null;
	#attempts = 0;
	#closed = false;
	#userId: string;

	constructor(userId: string) {
		this.#userId = userId;
	}

	start() {
		if (!browser || !this.#userId) return;
		this.#closed = false;
		this.#clock = setInterval(() => {
			this.now = Date.now();
		}, 1000);
		this.#connect();
	}

	stop() {
		this.#closed = true;
		this.#clearTimers();
		if (this.#clock) clearInterval(this.#clock);
		this.#socket?.close();
		this.#socket = null;
		this.connected = false;
	}

	#clearTimers() {
		if (this.#heartbeat) clearInterval(this.#heartbeat);
		if (this.#retry) clearTimeout(this.#retry);
		this.#heartbeat = null;
		this.#retry = null;
	}

	#connect() {
		if (this.#closed) return;

		const socket = new WebSocket(SOCKET_URL);
		this.#socket = socket;

		socket.addEventListener("message", (event) => {
			const msg: Op = JSON.parse(event.data);

			// op 1 = Hello: start heartbeating, then subscribe.
			if (msg.op === 1) {
				const { heartbeat_interval } = msg.d as { heartbeat_interval: number };
				this.#heartbeat = setInterval(() => {
					if (socket.readyState === WebSocket.OPEN) {
						socket.send(JSON.stringify({ op: 3 }));
					}
				}, heartbeat_interval);

				socket.send(
					JSON.stringify({ op: 2, d: { subscribe_to_id: this.#userId } }),
				);
				return;
			}

			// op 0 = Event: either the initial snapshot or a delta.
			if (
				msg.op === 0 &&
				(msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")
			) {
				this.presence = msg.d as Presence;
				this.connected = true;
				this.#attempts = 0;
			}
		});

		socket.addEventListener("close", () => {
			this.connected = false;
			this.#clearTimers();
			if (this.#closed || this.#attempts >= MAX_ATTEMPTS) return;

			// Exponential backoff, capped so a long outage doesn't spin forever.
			const delay = BASE_DELAY * 1.5 ** this.#attempts;
			this.#attempts += 1;
			this.#retry = setTimeout(() => this.#connect(), delay);
		});

		socket.addEventListener("error", () => socket.close());
	}

	get activity(): Activity | null {
		return (
			this.presence?.activities.find((a) => a.type !== ActivityType.Custom) ??
			null
		);
	}

	/** The custom status line, if one is set. */
	get customStatus(): Activity | null {
		return (
			this.presence?.activities.find((a) => a.type === ActivityType.Custom) ??
			null
		);
	}

	get avatarUrl(): string | null {
		const user = this.presence?.discord_user;
		if (!user?.avatar) return null;
		const ext = user.avatar.startsWith("a_") ? "gif" : "png";
		return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
	}
}

/** Discord asset refs come in a few shapes; normalise them to a real URL. */
export function activityImage(
	activity: Activity,
	key: "large_image" | "small_image" = "large_image",
): string | null {
	const raw = activity.assets?.[key];
	if (!raw) return null;

	// mp:external/... proxies an arbitrary URL through Discord's media proxy.
	if (raw.startsWith("mp:external/")) {
		return `https://media.discordapp.net/external/${raw.slice("mp:external/".length)}`;
	}
	if (raw.startsWith("spotify:")) {
		return `https://i.scdn.co/image/${raw.slice("spotify:".length)}`;
	}
	if (!activity.application_id) return null;
	return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${raw}.png`;
}

export function formatElapsed(start: number, now: number): string {
	const total = Math.max(0, Math.floor((now - start) / 1000));
	const h = Math.floor(total / 3600);
	const m = Math.floor((total % 3600) / 60);
	const s = total % 60;
	const pad = (n: number) => String(n).padStart(2, "0");
	return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
