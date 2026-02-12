import {Card} from '../../../shared/ui'

export default function ForecastCard() {
  return (
    <Card className="mb-4 p-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold text-gray-900">24-Hour Forecast</div>
        <div className="flex gap-2">
          <button className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            Temperature
          </button>
          <button className="rounded-full px-3 py-1 text-xs font-semibold text-gray-500">
            Precipitation
          </button>
        </div>
      </div>

      <div className="mt-4 h-40 rounded-xl bg-gray-50 ring-1 ring-black/5" />
      <div className="mt-3 flex justify-between text-[10px] font-semibold text-gray-400">
        <span>12AM</span><span>3AM</span><span>6AM</span><span>9AM</span><span>12PM</span><span>3PM</span><span>6PM</span><span>9PM</span>
      </div>
    </Card>
  );
}