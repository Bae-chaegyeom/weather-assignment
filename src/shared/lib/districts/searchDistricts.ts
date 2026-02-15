// src/shared/lib/districts/searchDistricts.ts
import { KOREA_DISTRICTS } from './districs'

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, "").replace(/-/g, "");

export function searchDistricts(keyword: string, limit = 20) {
  const q = normalize(keyword);
  if (!q) return [];

  const result: string[] = [];
  for (const item of KOREA_DISTRICTS) {
    if (normalize(item).includes(q)) {
      result.push(item);
      if (result.length >= limit) break;
    }
  }
  return result;
}