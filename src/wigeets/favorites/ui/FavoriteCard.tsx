import Card from "../../../shared/ui/Card";

interface Props {
	name: string;
	subtitle?: string;
	status?: string;
	temp?: number;
	min?: number;
	max?: number;
	icon?: string;
	state?: "ok" | "loading" | "error" | "unsupported";
}

export default function FavoriteCard({
	name,
	subtitle,
	status,
	temp,
	min,
	max,
	state,
	icon,
}: Props) {
	const renderTemp = () => {
		if (state === "loading") return "...";
		if (state === "error") return "에러";
		if (state === "unsupported") return "제공되지 않음";
		if (temp !== undefined) return `${temp}°`;
		return "--";
	};

	return (
		<Card className="p-4">
			<div className="flex items-start justify-between">
				<div>
					<div className="text-sm font-semibold text-gray-900">
						{name}
					</div>

					{subtitle && (
						<div className="mt-1 text-[10px] font-semibold text-gray-400">
							{subtitle}
						</div>
					)}

					{state === "ok" && status && (
						<div className="mt-1 text-[10px] font-semibold text-gray-400">
							{status}
						</div>
					)}

					{/* ✅ 최저/최고 표시 */}
					{state === "ok" &&
						min !== undefined &&
						max !== undefined && (
							<div className="mt-1 text-[10px] font-semibold text-gray-400">
								H: {max}° L: {min}°
							</div>
						)}
				</div>

				<div className="text-lg">
					{state === "ok" && icon ? (
						<img
							src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
							alt="weather icon"
							className="h-10 w-10"
						/>
					) : (
						"⭐"
					)}
				</div>
			</div>

			<div className="mt-4 text-3xl font-extrabold text-gray-900">
				{renderTemp()}
			</div>
		</Card>
	);
}
