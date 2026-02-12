import FavoriteCard from "./FavoriteCard";

export default function FavoritesSection() {
  const items = [
    { name: "Busan", status: "CLOUDY", temp: "18" },
    { name: "Incheon", status: "RAINY", temp: "12" },
    { name: "Daegu", status: "SUNNY", temp: "21" },
    { name: "Jeju", status: "WINDY", temp: "19" },
    { name: "Gwangju", status: "CLEAR", temp: "11" },
    { name: "Daejeon", status: "CLOUDY", temp: "14" },
  ];

  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-base font-semibold text-gray-900">⭐ Favorites</div>
        <button className="text-sm font-semibold text-sky-600">Edit List</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((x) => (
          <FavoriteCard key={x.name} name={x.name} status={x.status} temp={x.temp} />
        ))}
      </div>
    </div>
  );
}