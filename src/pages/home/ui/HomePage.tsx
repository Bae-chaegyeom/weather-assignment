import { useQuery } from "@tanstack/react-query";
import { Container } from "../../../shared/ui";
import { TopBar, SearchBarRow, HeroWeatherCard, ForecastCard, FavoritesSection } from "../../../wigeets";
import { getCurrentPosition } from "../../../features/detect-location";
import { fetchCurrentWeather } from "../../../shared/api";
import { useState } from "react";

export default function HomePage() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const location = getCurrentPosition();
  const coords = location.coordinates
    ? { lat: location.coordinates.lat, lon: location.coordinates.lon }
    : null;
  
  const currentWeatherQuery = useQuery({
    queryKey: ["currentWeather", coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather(coords!.lat, coords!.lon),
    enabled: !!coords,
    staleTime: 1000 * 60 * 5,
  });
  

  return (
    <div className="min-h-screen bg-slate-50">
      <Container>
        <TopBar />
        <SearchBarRow onSelect={(key) => setSelectedKey(key)}/>
        {!location.loaded && (
          <div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
            📍 현재 위치 불러오는 중...
          </div>
        )}

        {location.loaded && location.error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            위치 정보를 가져올 수 없습니다. ({location.error.code})
          </div>
        )}

        {location.loaded && !location.error && currentWeatherQuery.isLoading && (
          <div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
            ☁️ 날씨 불러오는 중...
          </div>
        )}

        {location.loaded && !location.error && currentWeatherQuery.isError && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            날씨 조회에 실패했습니다.
          </div>
        )}
        {location.loaded && !location.error && currentWeatherQuery.data && (
          <HeroWeatherCard
            city={currentWeatherQuery.data.name}
            temp={Math.round(currentWeatherQuery.data.main.temp)}
            min={Math.round(currentWeatherQuery.data.main.temp_min)}
            max={Math.round(currentWeatherQuery.data.main.temp_max)}
            description={currentWeatherQuery.data.weather?.[0]?.description ?? ""}
          />
        )}
        <ForecastCard />
        <FavoritesSection />
      </Container>
    </div>
  );
}