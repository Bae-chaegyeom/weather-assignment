import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../../shared/ui";
import { TopBar, SearchBarRow, HeroWeatherCard, ForecastCard, FavoritesSection } from "../../../wigeets";
import { getCurrentPosition } from "../../../features/detect-location";
import { fetchCurrentWeather } from "../../../shared/api";
import { getCoordsByKey, isCoordsMapReady, findNearestDistrictKey, formatDistrictKey } from "../../../shared/lib/districts"
import { useFavoritesStore } from "../../../entities/favorites";

export default function HomePage() {
  const count = useFavoritesStore((s) => s.favorites.length);
  const add = useFavoritesStore((s) => s.addFavorite);
  const clear = useFavoritesStore((s) => s.clearFavorites);
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

  const selectedLabel = selectedKey ? formatDistrictKey(selectedKey) : null;

  const geoLabel = useMemo(() => {
    if (!geoCoords) return null;
    const nearest = findNearestDistrictKey(geoCoords.lat, geoCoords.lon);
    return nearest ? formatDistrictKey(nearest) : "현재 위치";
  }, [geoCoords?.lat, geoCoords?.lon]);

  const cityLabel = selectedLabel ?? geoLabel ?? "현재 위치";
  
  const currentWeatherQuery = useQuery({
    queryKey: ["currentWeather", coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather(coords!.lat, coords!.lon),
    enabled: canFetchWeather,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mt-2 flex gap-2">
  <button
    className="rounded bg-black px-3 py-1 text-white"
    onClick={() => add("서울특별시-종로구-청운동")}
  >
    add test
  </button>
  <button
    className="rounded bg-gray-200 px-3 py-1"
    onClick={() => clear()}
  >
    clear
  </button>
  <div className="text-xs text-gray-500">favorites: {count}</div>
</div>
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
            city={cityLabel}
            temp={Math.round(currentWeatherQuery.data.main.temp)}
            min={Math.round(currentWeatherQuery.data.main.temp_min)}
            max={Math.round(currentWeatherQuery.data.main.temp_max)}
            humidity={currentWeatherQuery.data.main.humidity}
            feels_like={Math.round(currentWeatherQuery.data.main.feels_like)}
            wind={Math.round(currentWeatherQuery.data.wind.speed*3.6)}
            clouds={currentWeatherQuery.data.clouds.all}
            description={currentWeatherQuery.data.weather?.[0]?.description ?? ""}
          />
        )}
        <ForecastCard />
        <FavoritesSection />
      </Container>
    </div>
  );
}