import { useQuery } from "@tanstack/react-query";
import { Container } from "../../../shared/ui";
import { TopBar, SearchBarRow, HeroWeatherCard, ForecastCard, FavoritesSection } from "../../../wigeets";
import { getCurrentPosition } from "../../../features/detect-location";
import { fetchCurrentWeather } from "../../../shared/api";
import { useState } from "react";
import { getCoordsByKey, isCoordsMapReady } from "../../../shared/lib/districts/getCoordsByKey";

export default function HomePage() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  
  const location = getCurrentPosition();
  const selectedCoords = selectedKey ? getCoordsByKey(selectedKey) : null;
  const geoCoords = location.coordinates ?? null;

  const coordsMapReady = isCoordsMapReady();
  const hasSelection = selectedKey !== null;

  const waitingMap = hasSelection && !coordsMapReady;
  const notProvided = hasSelection && coordsMapReady && selectedCoords === null;

  const coords = selectedCoords ?? geoCoords;
  const hasCoords = coords !== null;
  const canFetchWeather = hasCoords && !waitingMap && !notProvided;
  
  const currentWeatherQuery = useQuery({
    queryKey: ["currentWeather", coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather(coords!.lat, coords!.lon),
    enabled: canFetchWeather,
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

        {location.loaded && !location.error && waitingMap && (
          <div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
            🗺️ 지역 좌표 데이터 준비중...
          </div>
        )}

        {location.loaded && !location.error && notProvided && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            해당 장소의 정보가 제공되지 않습니다.
          </div>
        )}


        {location.loaded && !location.error && !waitingMap && !notProvided && currentWeatherQuery.isLoading && (
          <div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
            ☁️ 날씨 불러오는 중...
          </div>
        )}

        {location.loaded && !location.error && !waitingMap && !notProvided && currentWeatherQuery.isError && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            날씨 조회에 실패했습니다.
          </div>
        )}
        {location.loaded && !location.error && !waitingMap && !notProvided && currentWeatherQuery.data && (
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