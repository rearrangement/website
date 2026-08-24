import { env } from "$env/dynamic/private";
import { location } from "$lib/config";
import { cached, fetchJson } from "./cache";

const TTL = 20 * 60 * 1000; // 20m

export interface Weather {
	temperature: number;
	feelsLike: number;
	code: number;
	isDay: boolean;
	description: string;
}

interface OpenMeteoResponse {
	current?: {
		temperature_2m: number;
		apparent_temperature: number;
		weather_code: number;
		is_day: number;
	};
}

const WMO: Record<number, string> = {
	0: "clear",
	1: "mostly clear",
	2: "partly cloudy",
	3: "overcast",
	45: "fog",
	48: "rime fog",
	51: "light drizzle",
	53: "drizzle",
	55: "heavy drizzle",
	56: "freezing drizzle",
	57: "freezing drizzle",
	61: "light rain",
	63: "rain",
	65: "heavy rain",
	66: "freezing rain",
	67: "freezing rain",
	71: "light snow",
	73: "snow",
	75: "heavy snow",
	77: "snow grains",
	80: "light showers",
	81: "showers",
	82: "violent showers",
	85: "snow showers",
	86: "heavy snow showers",
	95: "thunderstorm",
	96: "thunderstorm, hail",
	99: "thunderstorm, hail",
};

export async function getWeather(): Promise<Weather | null> {
	const latitude = Number(env.WEATHER_LAT);
	const longitude = Number(env.WEATHER_LON);
	if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

	return cached(`weather:${latitude},${longitude}`, TTL, async () => {
		const url =
			"https://api.open-meteo.com/v1/forecast" +
			`?latitude=${latitude}&longitude=${longitude}` +
			"&current=temperature_2m,apparent_temperature,weather_code,is_day" +
			`&timezone=${encodeURIComponent(location.timezone)}`;

		const res = await fetchJson<OpenMeteoResponse>(url);
		if (!res?.current) return null;

		return {
			temperature: Math.round(res.current.temperature_2m),
			feelsLike: Math.round(res.current.apparent_temperature),
			code: res.current.weather_code,
			isDay: res.current.is_day === 1,
			description: WMO[res.current.weather_code] ?? "unknown",
		};
	});
}
