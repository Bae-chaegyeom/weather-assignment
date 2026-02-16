import coordsMap from "../../assets/korea_districts_coords.json"

interface CoordRow {
    lat: number | null;
    lon: number | null;
}
interface CoordsMap {
    [key: string]: CoordRow;
}

const COORDS: CoordsMap = coordsMap
const isDongLevel = (key: string) => key.split("-").length >= 3;

export function findNearestDistrictKey(lat: number, lon: number): string | null {
  let bestKey: string | null = null;
  let best = Number.POSITIVE_INFINITY;

  for (const [key, c] of Object.entries(COORDS)) {
    //동단위를 우선으로 찾기
    if (!isDongLevel(key)) continue; 
    if (c.lat == null || c.lon == null) continue;

    const dLat = lat - c.lat;
    const dLon = lon - c.lon;
    const d = dLat * dLat + dLon * dLon;

    if (d < best) {
      best = d;
      bestKey = key;
    }
  }

  return bestKey;
}

export function formatDistrictKey(key: string): string {
  const parts = key.split("-").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : key;
}