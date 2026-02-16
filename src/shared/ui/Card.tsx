export default function Card({
	children,
	className = "",
	onClick,
}: {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className={`rounded-2xl bg-white shadow-sm ring-1 ring-[var(--border)] ${className}`}>
			{children}
		</div>
	);
}
