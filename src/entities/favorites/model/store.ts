import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddFavoriteResult, FavoriteLocation } from './typs'


export interface FavoritesState {
  favorites: FavoriteLocation[];

  addFavorite: (key: string, alias?: string) => AddFavoriteResult;
  removeFavorite: (key: string) => void;
  updateAlias: (key: string, alias: string) => void;
  isFavorite: (key: string) => boolean;

  clearFavorites: () => void;
}

const MAX_FAVORITES = 6;

//동단위로 기본이름 설정
function defaultAliasFromKey(key: string) {
  const parts = key.split("-").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : key;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (key, alias) => {
        const { favorites } = get();

        // 중복 방지
        if (favorites.some((f) => f.key === key)) return "duplicate";

        // 최대 6개 제한
        if (favorites.length >= MAX_FAVORITES) return "limit";

        const next: FavoriteLocation = {
          key,
          alias: (alias ?? defaultAliasFromKey(key)).trim(),
          createdAt: Date.now(),
        };

        set({ favorites: [...favorites, next] });
        return "added";
      },

      removeFavorite: (key) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.key !== key),
        }));
      },

      updateAlias: (key, alias) => {
        const nextAlias = alias.trim();
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.key === key ? { ...f, alias: nextAlias || f.alias } : f
          ),
        }));
      },

      isFavorite: (key) => {
        return get().favorites.some((f) => f.key === key);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "weather_favorites_v1", // localStorage key
      // 선택: favorites만 저장
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);