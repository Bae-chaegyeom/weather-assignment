import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
	getCoordsByKey,
	formatDistrictKey,
} from "../../../shared/lib/districts";
import { fetchCurrentWeather, fetchForecast } from "../../../shared/api";
import { HeroWeatherCard } from "../../../wigeets";

export default function LocationPage() {
	const { id } = useParams<{ id: string }>();
	const key = id ? decodeURIComponent(id) : null;
	const coords = key ? getCoordsByKey(key) : null;
	const navigate = useNavigate();

	const currentWeatherQuery = useQuery({
		queryKey: ["currentWeather", coords?.lat, coords?.lon],
		queryFn: () => fetchCurrentWeather(coords!.lat, coords!.lon),
		enabled: coords !== null,
		staleTime: 1000 * 60 * 5,
	});

	const forecastQuery = useQuery({
		queryKey: ["forecast", coords?.lat, coords?.lon],
		queryFn: () => fetchForecast(coords!.lat, coords!.lon),
		enabled: coords !== null,
		staleTime: 1000 * 60 * 5,
	});

	if (!key) {
		return <div className="p-6">잘못된 접근입니다.</div>;
	}

	if (!coords) {
		return <div className="p-6">해당 장소의 정보가 제공되지 않습니다.</div>;
	}

	return (
		<div className="min-h-screen bg-[var(--bg)]">
			<div className="mx-auto w-full max-w-md px-4 py-4 md:max-w-6xl">
				<div className="mb-4 flex items-center gap-3">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-black/5"
						aria-label="뒤로가기">
						←
					</button>

					<div className="min-w-0">
						<div className="truncate text-base font-semibold text-gray-900">
							{formatDistrictKey(key.replaceAll("-", " "))}
						</div>
						<div className="text-xs text-gray-500">상세 날씨</div>
					</div>
				</div>

				{currentWeatherQuery.isLoading && (
					<div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
						☁️ 날씨 불러오는 중...
					</div>
				)}

				{currentWeatherQuery.isError && (
					<div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
						날씨 조회에 실패했습니다.
					</div>
				)}

				<div className="md:grid md:grid-cols-[520px_1fr] md:gap-6 md:items-start">
					<div className="md:min-h-[420px]">
						{currentWeatherQuery.data && (
							<HeroWeatherCard
								city={formatDistrictKey(key)}
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
									currentWeatherQuery.data.main.feels_like,
								)}
								wind={Math.round(
									currentWeatherQuery.data.wind.speed * 3.6,
								)}
								clouds={currentWeatherQuery.data.clouds.all}
								description={
									currentWeatherQuery.data.weather?.[0]
										?.description ?? ""
								}
							/>
						)}
					</div>

					<div className="space-y-6">
						{forecastQuery.isLoading && (
							<div className="rounded-2xl bg-white p-4 text-sm text-gray-600">
								🕒 시간대별 예보 불러오는 중...
							</div>
						)}

						{forecastQuery.isError && (
							<div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
								예보 조회에 실패했습니다.
							</div>
						)}

						{forecastQuery.data && (
							<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 overflow-hidden md:min-h-[210px]">
								<div className="mb-3 text-sm font-semibold text-gray-900">
									24시간 예보
								</div>

								<div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
									{currentWeatherQuery.data && (
										<div className="min-w-[72px] snap-start rounded-2xl bg-sky-100 p-3 text-center">
											<div className="text-[10px] font-semibold text-sky-700">
												Now
											</div>
											{currentWeatherQuery.data
												.weather?.[0]?.icon && (
												<img
													src={`https://openweathermap.org/img/wn/${currentWeatherQuery.data.weather[0].icon}@2x.png`}
													alt="icon"
													className="mx-auto h-10 w-10"
												/>
											)}
											<div className="text-sm font-bold text-sky-900">
												{Math.round(
													currentWeatherQuery.data
														.main.temp,
												)}
												°
											</div>
										</div>
									)}

									{forecastQuery.data.list
										.slice(0, 7)
										.map((it) => {
											const hour = new Date(
												it.dt * 1000,
											).toLocaleTimeString("ko-KR", {
												hour: "numeric",
												hour12: true,
											});
											const icon = it.weather?.[0]?.icon;
											const temp = Math.round(
												it.main.temp,
											);

											return (
												<div
													key={it.dt}
													className="min-w-[72px] snap-start rounded-2xl bg-[var(--bg)] p-3 text-center">
													<div className="text-[10px] font-semibold text-gray-500">
														{hour}
													</div>

													{icon && (
														<img
															src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
															alt="icon"
															className="mx-auto h-10 w-10"
														/>
													)}

													<div className="text-sm font-bold text-gray-900">
														{temp}°
													</div>
												</div>
											);
										})}
								</div>
							</div>
						)}

						{currentWeatherQuery.data && (
							<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
								<div className="text-sm font-semibold text-gray-900">
									Sun
								</div>

								<div className="mt-3 grid grid-cols-2 gap-3">
									<div className="rounded-2xl bg-[var(--bg)] p-4">
										<div className="text-[10px] font-semibold text-gray-500">
											일출
										</div>
										<div className="mt-2 text-lg font-bold text-gray-900">
											{new Date(
												currentWeatherQuery.data.sys
													.sunrise * 1000,
											).toLocaleTimeString("ko-KR", {
												hour: "numeric",
												minute: "2-digit",
											})}
										</div>
									</div>

									<div className="rounded-2xl bg-[var(--bg)] p-4">
										<div className="text-[10px] font-semibold text-gray-500">
											일몰
										</div>
										<div className="mt-2 text-lg font-bold text-gray-900">
											{new Date(
												currentWeatherQuery.data.sys
													.sunset * 1000,
											).toLocaleTimeString("ko-KR", {
												hour: "numeric",
												minute: "2-digit",
											})}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
