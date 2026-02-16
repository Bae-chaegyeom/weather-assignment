import Card from "../../../shared/ui/Card";

interface Props {
  name: string;
  subtitle?: string;
  status?: string;
  temp?: number;
}

export default function FavoriteCard({name, subtitle, status, temp}:Props) {

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          {subtitle && (
            <div className="mt-1 text-[10px] font-semibold text-gray-400">
              {subtitle}
            </div>
          )}
          {status && (
            <div className="mt-1 text-[10px] font-semibold text-gray-400">
              {status}
            </div>
          )}
        </div>

        <div className="text-lg">{status ? "☁️" : "⭐"}</div>
      </div>
      <div className="mt-4 text-3xl font-extrabold text-gray-900">
        {temp !== undefined ? `${temp}°` : "--"}
      </div>
    </Card>
  );
}