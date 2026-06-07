import { useLocation } from "react-router";

export type Region = "CO" | "ES" | "EN";

export function useRegion(): Region {
  const { pathname } = useLocation();
  if (pathname.startsWith("/en/en")) return "EN";
  if (pathname.startsWith("/en")) return "ES";
  return "CO";
}

export function getRegionFromPath(pathname: string): Region {
  if (pathname.startsWith("/en/en")) return "EN";
  if (pathname.startsWith("/en")) return "ES";
  return "CO";
}
