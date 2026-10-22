/**
 * lib/auth/clientSession.ts
 * Client-side session helper with in-flight deduplication and memory cache.
 * Prevents multiple components (Sidebar, DashboardShell, Editor) from issuing
 * duplicate /api/auth/me requests on page load.
 */

let cachedUserData: any = null;
let inFlightPromise: Promise<any> | null = null;

export async function getClientSession(forceRefresh: boolean = false): Promise<any> {
  if (typeof window === "undefined") return null;

  // If already loaded and not forced to refresh, return cached data
  if (cachedUserData !== null && !forceRefresh) {
    return cachedUserData;
  }

  // Deduplicate concurrent in-flight requests (e.g. from StrictMode or sibling components)
  if (!inFlightPromise || forceRefresh) {
    inFlightPromise = fetch("/api/auth/me", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then(async (res) => {
        if (!res.ok) {
          cachedUserData = null;
          return null;
        }
        const json = await res.json();
        cachedUserData = json?.data ?? null;
        return cachedUserData;
      })
      .catch(() => {
        cachedUserData = null;
        return null;
      })
      .finally(() => {
        inFlightPromise = null;
      });
  }

  return inFlightPromise;
}

export function clearClientSession(): void {
  cachedUserData = null;
  inFlightPromise = null;
}
