import { useEffect } from "react";
import { useConsent } from "./useConsent";

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function injectGA4(id: string) {
  if (document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
  });
}

function disableGA4(id: string) {
  // Deshabilitar rastreo si el usuario revoca el consentimiento
  (window as Record<string, unknown>)[`ga-disable-${id}`] = true;
}

export function useAnalytics() {
  const { preferences, loaded } = useConsent();

  useEffect(() => {
    if (!loaded || !GA4_ID) return;

    if (preferences.analytics) {
      injectGA4(GA4_ID);
    } else {
      disableGA4(GA4_ID);
    }
  }, [preferences.analytics, loaded]);
}
