export default function TopBar() {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-sky-400" />
        <div className="text-lg font-semibold text-gray-900">WeatherDash</div>
      </div>
      <div className="mt-1 text-xs text-gray-500">Regional Weather Insights • South Korea</div>
    </div>
  );
}