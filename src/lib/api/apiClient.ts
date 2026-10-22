/**
 * lib/api/apiClient.ts
 * A thin wrapper around fetch that automatically attaches the stored
 * JWT token as an Authorization Bearer header for authenticated requests.
 */

const TOKEN_KEY = "bj_token";

/** Retrieve the stored JWT from localStorage (client-side only). */
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  const local = localStorage.getItem(TOKEN_KEY);
  if (local) return local;

  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`));
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

/** Build headers for an authenticated JSON request. */
export function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getStoredToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra ?? {}),
  };
}

/**
 * Authenticated fetch helper.
 * Usage: authFetch("/api/articles", { method: "POST", body: JSON.stringify(data) })
 */
export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: authHeaders(init.headers as HeadersInit | undefined),
  });
}
