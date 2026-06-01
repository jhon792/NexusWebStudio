import { useState, useEffect, useCallback } from "react";

export interface ConsentPreferences {
  necessary: true;       // siempre true, no editable
  analytics: boolean;    // Google Analytics, GA4
  marketing: boolean;    // redes sociales, píxeles de marketing
}

interface ConsentState {
  consented: boolean;
  preferences: ConsentPreferences;
}

const STORAGE_KEY = "cookie-consent-v1";

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readStorage(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeStorage(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage no disponible (modo privado extremo)
  }
}

export function useConsent() {
  const [state, setState] = useState<ConsentState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setLoaded(true);
  }, []);

  const acceptAll = useCallback(() => {
    const next: ConsentState = {
      consented: true,
      preferences: { necessary: true, analytics: true, marketing: true },
    };
    writeStorage(next);
    setState(next);
  }, []);

  const rejectAll = useCallback(() => {
    const next: ConsentState = {
      consented: true,
      preferences: { necessary: true, analytics: false, marketing: false },
    };
    writeStorage(next);
    setState(next);
  }, []);

  const savePreferences = useCallback((prefs: Omit<ConsentPreferences, "necessary">) => {
    const next: ConsentState = {
      consented: true,
      preferences: { necessary: true, ...prefs },
    };
    writeStorage(next);
    setState(next);
  }, []);

  const resetConsent = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
    setState(null);
  }, []);

  return {
    loaded,
    needsBanner: loaded && !state?.consented,
    preferences: state?.preferences ?? DEFAULT_PREFERENCES,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  };
}
