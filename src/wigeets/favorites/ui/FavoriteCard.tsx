import Card from "../../../shared/ui/Card";

export default function FavoriteCard({
  name,
  status,
  temp,
}: {
  name: string;
  status: string;
  temp: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          <div className="mt-1 text-[10px] font-semibold text-gray-400">{status}</div>
        </div>
        <div className="text-lg">☁️</div>
      </div>
      <div className="mt-4 text-3xl font-extrabold text-gray-900">{temp}°</div>
    </Card>
  );
}