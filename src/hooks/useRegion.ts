import { useLocation } from "react-router";

export type Region = "CO" | "ES" | "EN" | "FR" | "IT";

export function useRegion(): Region {
  const { pathname } = useLocation();
  if (pathname.startsWith("/en/en")) return "EN";
  if (pathname.startsWith("/en/fr")) return "FR";
  if (pathname.startsWith("/en/it")) return "IT";
  if (pathname.startsWith("/en"))   return "ES";
  return "CO";
}

export function getRegionFromPath(pathname: string): Region {
  if (pathname.startsWith("/en/en")) return "EN";
  if (pathname.startsWith("/en/fr")) return "FR";
  if (pathname.startsWith("/en/it")) return "IT";
  if (pathname.startsWith("/en"))   return "ES";
  return "CO";
}
