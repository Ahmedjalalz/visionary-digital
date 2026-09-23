import rawData from "./pakistanMapData.json";

export interface ProvinceMapData {
  id: string;
  name: string;
  d: string;
  viewBox: string;
}

export type ProvinceKey =
  | "punjab"
  | "sindh"
  | "kpk"
  | "balochistan"
  | "gilgitBaltistan"
  | "azadKashmir"
  | "islamabad";

export const PAKISTAN_FULL_VIEWBOX = "0 0 1000 959";

export const PAKISTAN_PROVINCES: Record<ProvinceKey, ProvinceMapData> = rawData as unknown as Record<ProvinceKey, ProvinceMapData>;
