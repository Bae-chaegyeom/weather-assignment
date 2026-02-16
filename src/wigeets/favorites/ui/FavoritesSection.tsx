import { useQueries } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../../../shared/api";
import FavoriteCard from "./FavoriteCard";
import { useFavoritesStore } from "../../../entities/favorites";
import { getCoordsByKey } from "../../../shared/lib/districts";

export default function FavoritesSection() {
	const favorites = useFavoritesStore((s) => s.favorites);

	const favoritesWithCoords = favorites.map((f) => ({
		...f,
		coords: getCoordsByKey(f.key), // {lat, lon} | null
	}));

	//즐겨찾기 추가한 지역 날씨 받아오기
	const results = useQueries({
		queries: favoritesWithCoords.map((f) => {
			const coords = f.coords;

			return {
				queryKey: ["currentWeather", coords?.lat, coords?.lon],
				queryFn: () => fetchCurrentWeather(coords!.lat, coords!.lon),
				enabled: coords !== null,
				staleTime: 1000 * 60 * 5,
			};
		}),
	});

	//즐겨찾기 없는 경우에
	if (favorites.length === 0) {
		return (
			<div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
				즐겨찾기가 아직 없어요. ⭐ 버튼으로 추가해보세요.
			</div>
		);
	}

	return (
		<div className="mb-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="text-base font-semibold text-gray-900">
					⭐ Favorites
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{favoritesWithCoords.map((f, idx) => {
					const q = results[idx];

					// coords 없는 케이스
					if (!f.coords) {
						return (
							<FavoriteCard
								key={f.key}
								name={f.alias}
								subtitle={f.key.replaceAll("-", " ")}
								state="unsupported"
							/>
						);
					}

					if (q.isLoading) {
						return (
							<FavoriteCard
								key={f.key}
								name={f.alias}
								subtitle={f.key.replaceAll("-", " ")}
								state="loading"
							/>
						);
					}

					if (q.isError || !q.data) {
						return (
							<FavoriteCard
								key={f.key}
								name={f.alias}
								subtitle={f.key.replaceAll("-", " ")}
								state="error"
							/>
						);
					}

					const data = q.data;
					return (
						<FavoriteCard
							key={f.key}
							name={f.alias}
							subtitle={f.key.replaceAll("-", " ")}
							state="ok"
							temp={Math.round(data.main.temp)}
							min={Math.round(data.main.temp_min)}
							max={Math.round(data.main.temp_max)}
							status={data.weather?.[0]?.description ?? ""}
							icon={data.weather?.[0]?.icon}
						/>
					);
				})}
			</div>
		</div>
	);
}
