import MetricCard from "./MetricCard";

interface Props {
  city: string;
  temp: number;
  min: number;
  max: number;
  description: string;
}

export default function HeroWeatherCard({city, temp, min, max, description}:Props) {
  const minMax = `H: ${max}°  L: ${min}°`;
  // // mock데이터
  // const city = "Seoul, South Korea";
  // const date = "Monday, 23 October";
  // const temp = "14";
  // const desc = "Partly Cloudy";
  // const minMax = "H: 16°  L: 9°";


  return (
    <div className="mb-4 rounded-3xl bg-gradient-to-b from-sky-500 to-cyan-600 p-5 text-white shadow-sm">
      <div className="text-sm font-semibold opacity-95">📍 {city}</div>
      <div className="mt-1 text-xs text-white/80">{new Date().toLocaleDateString("ko-KR", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</div>

      <div className="mt-5 flex items-end justify-between">
        <div className="text-6xl font-extrabold leading-none">{temp}°</div>
        <div className="text-right">
          <div className="text-sm font-semibold">{description}</div>
          <div className="mt-1 text-xs text-white/80">{minMax}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MetricCard label="습도" value="62" unit="%" />
        <MetricCard label="풍속" value="12" unit="km/h" />
        <MetricCard label="체감온도" value="13" unit="°" />
        <MetricCard label="자외선 지수" value="Low 2" />
      </div>
    </div>
  );
}