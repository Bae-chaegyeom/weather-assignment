import MetricCard from "./MetricCard";

interface Props {
  city: string;
  temp: number;
  min: number;
  max: number;
  humidity: number;
  wind: number;
  clouds: number;
  feels_like: number;
  description: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function HeroWeatherCard({city, temp, min, max, description,humidity,wind,clouds,feels_like,isFavorite,onToggleFavorite }:Props) {
  const minMax = `H: ${max}°  L: ${min}°`;
  return (
    <div className="relative mb-4 rounded-3xl bg-gradient-to-b from-sky-500 to-cyan-600 p-5 text-white shadow-sm">
      <div className="text-sm font-semibold opacity-95">{city}</div>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={onToggleFavorite}
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
            aria-label={isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        )}
      <div className="mt-1 text-xs text-white/80">{new Date().toLocaleDateString("ko-KR", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</div>

      <div className="mt-5 flex items-end justify-between">
        <div className="text-6xl font-extrabold leading-none">{temp}°</div>
        <div className="text-right">
          <div className="text-sm font-semibold">{description}</div>
          <div className="mt-1 text-xs text-white/80">{minMax}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MetricCard label="습도" value={humidity} unit="%" />
        <MetricCard label="풍속" value={wind} unit="km/h" />
        <MetricCard label="체감온도" value={feels_like} unit="°" />
        <MetricCard label="구름량" value={clouds} unit="%" />
      </div>
    </div>
  );
}