/* ============================================================================
   Países que ven la versión España/€ (/es). El resto del mundo —incluida toda
   Latinoamérica— se queda en la versión Colombia/COP (/). Fuente única de
   verdad para el enrutado (middleware + cliente) y el aviso de región.
   IMPORTANTE: el middleware del edge replica esta lista (no puede importar de
   src de forma garantizada); si cambias una, cambia la otra.
   ============================================================================ */
export const EUROPE_COUNTRIES: ReadonlySet<string> = new Set([
  // UE
  "ES", "PT", "FR", "IT", "DE", "IE", "NL", "BE", "LU", "AT", "GR", "CY",
  "MT", "PL", "CZ", "SK", "HU", "RO", "BG", "HR", "SI", "SE", "DK", "FI",
  "EE", "LV", "LT",
  // EEE + Reino Unido + microestados
  "GB", "NO", "IS", "LI", "CH", "AD", "MC", "SM", "VA",
]);

/** ¿El país debe ver la versión Europa/€? (códigos ISO 3166-1 alpha-2). */
export function isEuropean(country: string | null | undefined): boolean {
  return !!country && EUROPE_COUNTRIES.has(country.toUpperCase());
}
