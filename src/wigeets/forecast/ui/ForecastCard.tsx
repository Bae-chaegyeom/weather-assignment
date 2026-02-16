import { useState } from "react";
import { Card } from "../../../shared/ui";

type Mode = "temp" | "feels" | "humidity";
interface ForecastData {
	list: {
		dt: number;
		main: {
			temp: number;
			feels_like: number;
			humidity: number;
		};
	}[];
}
type Props = {
	forecast?: ForecastData;
	isLoading?: boolean;
	isError?: boolean;
};

function LineChart({ values, unit }: { values: number[]; unit: string }) {
	const width = 600;
	const height = 160;
	const padding = 24;

	if (values.length < 2) return null;

	const min = Math.min(...values);
	const max = Math.max(...values);
	const range = max - min || 1;

	const stepX = (width - padding * 2) / (values.length - 1);

	const coords = values.map((v, i) => {
		const x = padding + stepX * i;
		const y = padding + (height - padding * 2) * (1 - (v - min) / range);
		return { x, y };
	});

	const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");

	return (
		<svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full">
			<polyline
				points={polylinePoints}
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinejoin="round"
				strokeLinecap="round"
				className="text-sky-500"
			/>

			{coords.map((c, idx) => (
				<g key={idx}>
					<circle cx={c.x} cy={c.y} r="4" className="fill-sky-500" />

					<text
						x={c.x}
						y={c.y - 10}
						textAnchor="middle"
						className="fill-gray-600 text-[10px] font-semibold">
						{Math.round(values[idx])}
						{unit}
					</text>
				</g>
			))}
		</svg>
	);
}

export default function ForecastCard({ forecast, isLoading, isError }: Props) {
	const [mode, setMode] = useState<Mode>("temp");
	const points = forecast?.list.slice(0, 8) ?? [];
	const labels = points.map((p) =>
		new Date(p.dt * 1000).toLocaleTimeString("ko-KR", {
			hour: "numeric",
			hour12: true,
		}),
	);

	const values = points.map((p) => {
		if (mode === "temp") return p.main.temp;
		if (mode === "feels") return p.main.feels_like;
		return p.main.humidity;
	});

	return (
		<Card className="mb-4 p-4 w-full">
			<div className="flex items-center justify-between">
				<div className="text-base font-semibold text-gray-900">
					24-Hour Forecast
				</div>
				<div className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
					{mode === "humidity" ? "%" : "°C"}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => setMode("temp")}
						className={`rounded-full px-3 py-1 text-xs font-semibold ${
							mode === "temp"
								? "bg-sky-50 text-sky-700"
								: "text-gray-500"
						}`}>
						Temperature
					</button>

					<button
						onClick={() => setMode("humidity")}
						className={`rounded-full px-3 py-1 text-xs font-semibold ${
							mode === "humidity"
								? "bg-sky-50 text-sky-700"
								: "text-gray-500"
						}`}>
						Humidity
					</button>

					<button
						onClick={() => setMode("feels")}
						className={`rounded-full px-3 py-1 text-xs font-semibold ${
							mode === "feels"
								? "bg-sky-50 text-sky-700"
								: "text-gray-500"
						}`}>
						Feels like
					</button>
				</div>
			</div>

			<div className="mt-4 h-40 rounded-xl bg-gray-50 ring-1 ring-black/5 flex items-center justify-center">
				{isLoading ? (
					<div className="text-sm text-gray-500">불러오는 중...</div>
				) : isError ? (
					<div className="text-sm text-red-600">예보 조회 실패</div>
				) : points.length < 2 ? (
					<div className="text-sm text-gray-500">
						예보 데이터 없음
					</div>
				) : (
					<LineChart
						values={values}
						unit={mode === "humidity" ? "%" : "°"}
					/>
				)}
			</div>
			<div className="mt-3 flex justify-between text-[10px] font-semibold text-gray-400">
				{labels.map((t) => (
					<span key={t}>{t}</span>
				))}
			</div>
		</Card>
	);
}
