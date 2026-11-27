// Cloudflare Turnstile: proves a booking came from a person, not a script
// (AUD-H01). Invisible: the guest sees nothing unless Cloudflare is unsure,
// and then only a small box to tick, at the bottom of the screen.
//
// The site key is public (it is in every page Cloudflare protects). The
// secret that checks the token lives only on the backend. With no site key
// set, no token is sent and the booking goes through as before; the
// backend decides whether a token is required.
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const WAIT_MS = 20000;

let scriptPromise = null;

function loadScript() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile did not load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

// Called when the booking page opens, so the check is ready by the time
// the guest presses Book.
export function preloadTurnstile() {
  if (SITE_KEY) loadScript().catch(() => {});
}

// A fresh, single-use token for one booking, or null when the check is off
// or couldn't run (the backend then decides).
export async function getTurnstileToken() {
  if (!SITE_KEY) return null;
  let turnstile;
  try {
    turnstile = await loadScript();
  } catch {
    return null;
  }
  const holder = document.createElement("div");
  holder.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483647;";
  document.body.appendChild(holder);
  let widgetId;
  try {
    return await new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), WAIT_MS);
      const done = (token) => {
        clearTimeout(timer);
        resolve(token || null);
      };
      widgetId = turnstile.render(holder, {
        sitekey: SITE_KEY,
        action: "booking",
        appearance: "interaction-only",
        callback: done,
        "error-callback": () => done(null),
        "expired-callback": () => done(null),
      });
    });
  } finally {
    try {
      if (widgetId !== undefined) turnstile.remove(widgetId);
    } catch {
      /* already gone */
    }
    holder.remove();
  }
}
