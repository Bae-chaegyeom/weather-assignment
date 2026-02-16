import Card from "../../../shared/ui/Card";

export default function MetricCard({
	label,
	value,
	unit,
}: {
	label: string;
	value: number | string;
	unit?: string;
}) {
	return (
		<Card className="bg-white/10 p-4 text-white ring-white/15">
			<div className="text-[14px] font-semibold tracking-wide text-white/80">
				{label}
			</div>
			<div className="mt-2 text-2xl font-bold">
				{value}
				{unit ? (
					<span className="ml-1 text-sm font-semibold text-white/80">
						{unit}
					</span>
				) : null}
			</div>
		</Card>
	);
}
