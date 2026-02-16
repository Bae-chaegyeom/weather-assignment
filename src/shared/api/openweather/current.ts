const API_key = import.meta.env.VITE_OPENWEATHER_API_KEY

interface OpenWeatherCurrent {
    name: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        feels_like: number;
    };
    wind: {
        speed: number;
    }
    clouds:{
        all: number;
    }
    weather:{
        main: string;
        description: string;
    }[];
}


export async function fetchCurrentWeather(lat:number, lon:number) {
    if(!API_key) throw new Error("API키가 없습니다.")

    const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric&lang=kr`

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`)
    return (await res.json()) as OpenWeatherCurrent;
}