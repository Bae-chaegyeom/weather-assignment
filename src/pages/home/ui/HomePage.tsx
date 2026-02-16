import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../../shared/ui";
import {
	TopBar,
	SearchBarRow,
	HeroWeatherCard,
	ForecastCard,
	FavoritesSection,
} from "../../../wigeets";
import { getCurrentPosition } from "../../../features/detect-location";
import { fetchCurrentWeather, fetchForecast } from "../../../shared/api";
import {
	getCoordsByKey,
	isCoordsMapReady,
	findNearestDistrictKey,
	formatDistrictKey,
} from "../../../shared/lib/districts";
import { useFavoritesStore } from "../../../entities/favorites";

export default function HomePage() {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);

	const navigate = useNavigate();

	const location = getCurrentPosition();
	const selectedCoords = selectedKey ? getCoordsByKey(selectedKey) : null;
	const geoCoords = location.coordinates ?? null;

	const coordsMapReady = isCoordsMapReady();
	const hasSelection = selectedKey !== null;

	const waitingMap = hasSelection && !coordsMapReady;
	const notProvided =
		hasSelection && coordsMapReady && selectedCoords === null;

	const coords = selectedCoords ?? geoCoords;
	const hasCoords = coords !== null;
	const canFetchWeather = hasCoords && !waitingMap && !notProvided;

	const geoKey = useMemo(() => {
		if (!geoCoords) return null;
		return findNearestDistrictKey(geoCoords.lat, geoCoords.lon);
	}, [geoCoords?.lat, geoCoords?.lon]);

	const geoLabel = useMemo(() => {
		if (!geoKey) return "현재 위치";
		return formatDistrictKey(geoKey);
	}, [geoKey]);

	const currentWeatherQuery = useQuery({
		queryKey: ["currentWeather", coords?.lat, coords?.lon],
		queryFn: () => fetchCurrentWeather(coords!.lat, coords!.lon),
		enabled: canFetchWeather,
		staleTime: 1000 * 60 * 5,
	});

	const forecastQuery = useQuery({
		queryKey: ["forecast", coords?.lat, coords?.lon],
		queryFn: () => fetchForecast(coords!.lat, coords!.lon),
		enabled: canFetchWeather,
		staleTime: 1000 * 60 * 5,
	});

	const favorites = useFavoritesStore((s) => s.favorites);
	const showHeroExtras = favorites.length >= 4;

	//즐겨찾기 카드 이름 바꾼경우 찾기
	const selectedFavoriteAlias = useMemo(() => {
		if (!selectedKey) return null;
		const found = favorites.find((f) => f.key === selectedKey);
		return found?.alias ?? null;
	}, [favorites, selectedKey]);

	const selectedLabel = selectedKey
		? (selectedFavoriteAlias ?? formatDistrictKey(selectedKey))
		: null;
	const cityLabel = selectedLabel ?? geoLabel ?? "현재 위치";

	const addFavorite = useFavoritesStore((s) => s.addFavorite);
	const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
	const isFavorite = useFavoritesStore((s) => s.isFavorite);

	const favoriteKey = selectedKey ?? geoKey;
	const canToggleFavorite = favoriteKey !== null;
	const favoriteIsFavorite = canToggleFavorite
		? isFavorite(favoriteKey!)
		: false;

	function handleToggleFavorite() {
		if (!favoriteKey) return;

		if (isFavorite(favoriteKey)) {
			removeFavorite(favoriteKey);
			setFavoriteMessage("즐겨찾기에서 삭제했어요.");
			return;
		}

		const result = addFavorite(favoriteKey);
		if (result === "added") setFavoriteMessage("즐겨찾기에 추가했어요.");
		if (result === "duplicate")
			setFavoriteMessage("이미 즐겨찾기에 있어요.");
		if (result === "limit")
			setFavoriteMessage("즐겨찾기는 최대 6개까지 추가할 수 있어요.");
	}
	//알림이 2초뒤에 사라지게
	useEffect(() => {
		if (!favoriteMessage) return;

		const timer = setTimeout(() => {
			setFavoriteMessage(null);
		}, 2000);

		return () => clearTimeout(timer);
	}, [favoriteMessage]);

	return (
		<div className="min-h-screen bg-[var(--bg)]">
			<Container>
				<TopBar />
				<SearchBarRow onSelect={(key) => setSelectedKey(key)} />
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

				{location.loaded &&
					!location.error &&
					!waitingMap &&
					!notProvided &&
					currentWeatherQuery.isLoading && (
						<div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
							☁️ 날씨 불러오는 중...
						</div>
					)}

				{location.loaded &&
					!location.error &&
					!waitingMap &&
					!notProvided &&
					currentWeatherQuery.isError && (
						<div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
							날씨 조회에 실패했습니다.
						</div>
					)}
				{location.loaded &&
					!location.error &&
					!waitingMap &&
					!notProvided &&
					favoriteMessage && (
						<div className="mb-2 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
							{favoriteMessage}
						</div>
					)}
				{location.loaded &&
					!location.error &&
					!waitingMap &&
					!notProvided &&
					currentWeatherQuery.data && (
						<div className="md:grid md:grid-cols-[520px_1fr] md:gap-6 md:items-stretch">
							<div className="flex flex-col gap-6">
								<HeroWeatherCard
									className="flex-1"
									city={cityLabel}
									temp={Math.round(
										currentWeatherQuery.data.main.temp,
									)}
									min={Math.round(
										currentWeatherQuery.data.main.temp_min,
									)}
									max={Math.round(
										currentWeatherQuery.data.main.temp_max,
									)}
									humidity={
										currentWeatherQuery.data.main.humidity
									}
									feels_like={Math.round(
										currentWeatherQuery.data.main
											.feels_like,
									)}
									wind={Math.round(
										currentWeatherQuery.data.wind.speed *
											3.6,
									)}
									clouds={currentWeatherQuery.data.clouds.all}
									description={
										currentWeatherQuery.data.weather?.[0]
											?.description ?? ""
									}
									isFavorite={favoriteIsFavorite}
									onToggleFavorite={
										canToggleFavorite
											? handleToggleFavorite
											: undefined
									}
									pressure={
										showHeroExtras
											? currentWeatherQuery.data.main
													.pressure
											: undefined
									}
									visibilityKm={
										showHeroExtras
											? Math.round(
													(currentWeatherQuery.data
														.visibility ?? 0) /
														1000,
												)
											: undefined
									}
									sunrise={
										showHeroExtras
											? currentWeatherQuery.data.sys
													.sunrise
											: undefined
									}
									sunset={
										showHeroExtras
											? currentWeatherQuery.data.sys
													.sunset
											: undefined
									}
								/>
							</div>

							<div className="space-y-6">
								<ForecastCard
									forecast={forecastQuery.data}
									isLoading={forecastQuery.isLoading}
									isError={forecastQuery.isError}
								/>
								<FavoritesSection
									onSelect={(key) =>
										navigate(
											`/location/${encodeURIComponent(key)}`,
										)
									}
								/>
							</div>
						</div>
					)}
			</Container>
		</div>
	);
}
