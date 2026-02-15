import coordsMap from '../../assets/korea_districts_coords.json'

export interface Coords {
    lat: number;
    lon: number;
}
const COORDS = coordsMap as Record<string, { lat?: number | null; lon?: number | null }>;

export function getCoordsByKey(key: string): Coords | null {
    const row = COORDS[key];
    if(!row) {
        return null;
    }

    const lat = row.lat
    const lon = row.lon

    if (lat == null || lon == null) {
        return null;
    }

    return {lat, lon}

}

export function isCoordsMapReady(): boolean {
    return true
}