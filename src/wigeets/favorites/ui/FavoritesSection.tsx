import FavoriteCard from "./FavoriteCard";
import { useFavoritesStore } from "../../../entities/favorites";

export default function FavoritesSection() {
  const favorites = useFavoritesStore((s) => s.favorites);
  
  //즐겨찾기 없는 경우에
  if (favorites.length === 0) {
    return (
      <div className="mb-4 rounded-2xl bg-white p-4 text-sm text-gray-600">
        즐겨찾기가 아직 없어요. ⭐ 버튼으로 추가해보세요.
      </div>
    );
  }


  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-base font-semibold text-gray-900">⭐ Favorites</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {favorites.map((f) => (
          <FavoriteCard
            key={f.key}
            name={f.alias}
            subtitle={f.key.replaceAll("-", " ")}
          />
        ))}
      </div>
    </div>
  );
}