import { useEffect, useState } from "react";
import Card from "../../../shared/ui/Card";

interface Props {
	name: string;
	subtitle?: string;
	status?: string;
	temp?: number;
	min?: number;
	max?: number;
	icon?: string;
	onClick?: () => void;
	onRemove?: () => void;
	isEditing?: boolean;
	onChangeAlias?: (value: string) => void;
	fallbackAlias?: string;
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
	onClick,
	onRemove,
	isEditing,
	onChangeAlias,
	fallbackAlias,
}: Props) {
	const [draftAlias, setDraftAlias] = useState(name);
	// store(alias)가 바뀌면 draft도 동기화(편집 모드 토글/외부 변경 대비)
	useEffect(() => {
		setDraftAlias(name);
	}, [name]);

	const renderTemp = () => {
		if (state === "loading") return "...";
		if (state === "error") return "에러";
		if (state === "unsupported") return "제공되지 않음";
		if (temp !== undefined) return `${temp}°`;
		return "--";
	};

	return (
		<Card
			className="relative p-4 cursor-pointer hover:shadow-md transition"
			onClick={onClick}>
			<div className="flex items-start justify-between">
				<div>
					{isEditing ? (
						<input
							value={name}
							onClick={(e) => e.stopPropagation()} // 카드 클릭 방지
							onChange={(e) => onChangeAlias?.(e.target.value)}
							onBlur={() => {
								const next = draftAlias.trim();

								if (next.length === 0) {
									const fallback = (
										fallbackAlias ?? name
									).trim();
									setDraftAlias(fallback);
									onChangeAlias?.(fallback);
									return;
								}

								onChangeAlias?.(next);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.currentTarget.blur(); // Enter 누르면 저장
								}
							}}
							className="w-full rounded-md border bg-white px-2 py-1 text-sm font-semibold text-gray-900"
						/>
					) : (
						<div className="text-sm font-semibold text-gray-900">
							{name}
						</div>
					)}

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

					{state === "ok" &&
						min !== undefined &&
						max !== undefined && (
							<div className="mt-1 text-[10px] font-semibold text-gray-400">
								H: {max}° L: {min}°
							</div>
						)}
				</div>

				<div className="flex items-start gap-2">
					{onRemove && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onRemove();
							}}
							className="absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-600"
							aria-label="즐겨찾기 삭제">
							✕
						</button>
					)}
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<div className="text-3xl font-extrabold text-gray-900">
					{renderTemp()}
				</div>

				{state === "ok" && icon && (
					<img
						src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
						alt="weather icon"
						className="h-10 w-10"
					/>
				)}
			</div>
		</Card>
	);
}
