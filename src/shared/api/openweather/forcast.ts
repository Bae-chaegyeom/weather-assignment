const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export interface OpenWeatherForecast {
	list: {
		dt: number;
		dt_txt: string;
		main: {
			temp: number;
			feels_like: number;
			humidity: number;
		};
		weather: { description: string; icon: string }[];
	}[];
}

export async function fetchForecast(lat: number, lon: number) {
	if (!API_KEY) throw new Error("Missing VITE_OPENWEATHER_API_KEY");

	const url =
		`https://api.openweathermap.org/data/2.5/forecast` +
		`?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

	const res = await fetch(url);
	if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);

	return (await res.json()) as OpenWeatherForecast;
}
