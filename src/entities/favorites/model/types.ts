export interface FavoriteLocation {
    key: string;
    alias: string;
    createdAt: number;
}

export type AddFavoriteResult = "added" | "duplicate" | "limit";