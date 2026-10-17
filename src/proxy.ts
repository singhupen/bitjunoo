import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-refresh-jwt-key-change-this-in-production";

// Admin protected routes (Editorial & Console pages)
const ADMIN_PROTECTED_ROUTES = [
  "/dashboard",
  "/articles",
  "/add-articles",
  "/analytics",
  "/categories",
  "/profile",
  "/settings",
];

// Admin auth routes
const ADMIN_AUTH_ROUTES = ["/login", "/signup"];

// Public website routes that should live on the root domain
const PUBLIC_WEBSITE_ROUTES = [
  "/about",
  "/services",
  "/portfolio",
  "/blog",
  "/contact",
];

function isAdminProtectedRoute(pathname: string): boolean {
  return ADMIN_PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAdminAuthRoute(pathname: string): boolean {
  return ADMIN_AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isPublicWebsiteRoute(pathname: string): boolean {
  return PUBLIC_WEBSITE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/** Check if current hostname is on the admin subdomain */
function checkIsAdminSubdomain(req: NextRequest): boolean {
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host ||
    "";
  const hostname = host.split(":")[0].toLowerCase();
  return hostname === "admin.localhost" || hostname.startsWith("admin.");
}

/** Construct admin subdomain URL preserving protocol and port */
function getAdminSubdomainUrl(req: NextRequest, targetPathname?: string): URL {
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host ||
    "";
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (req.url.startsWith("https") ? "https" : "http");

  let adminHost = host;
  const [hostname, port] = adminHost.split(":");
  const portSuffix = port ? `:${port}` : "";

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    adminHost = `admin.localhost${portSuffix}`;
  } else if (!hostname.startsWith("admin.")) {
    adminHost = `admin.${hostname}${portSuffix}`;
  }

  const pathname = targetPathname ?? req.nextUrl.pathname;
  const search = req.nextUrl.search;
  return new URL(`${proto}://${adminHost}${pathname}${search}`);
}

/** Construct root domain URL preserving protocol and port */
function getRootPublicUrl(req: NextRequest, targetPathname?: string): URL {
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host ||
    "";
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (req.url.startsWith("https") ? "https" : "http");

  let rootHost = host;
  const [hostname, port] = rootHost.split(":");
  const portSuffix = port ? `:${port}` : "";

  if (hostname.startsWith("admin.")) {
    const baseDomain = hostname.slice(6);
    rootHost = `${baseDomain}${portSuffix}`;
  }

  const pathname = targetPathname ?? req.nextUrl.pathname;
  const search = req.nextUrl.search;
  return new URL(`${proto}://${rootHost}${pathname}${search}`);
}

/** Verify JWT token using jose (Edge/Node-compatible) */
async function isValidSession(token?: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return Boolean(payload && payload.userId);
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip API routes, Next.js internal files, and static assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|woff|woff2|ttf|eot|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const isAdminSubdomain = checkIsAdminSubdomain(req);
  const token = req.cookies.get("bj_token")?.value;
  const authenticated = await isValidSession(token);

  // ─── ADMIN SUBDOMAIN (admin.localhost) ──────────────────────────────────
  if (isAdminSubdomain) {
    // A. Root path on admin subdomain:
    // If authenticated -> go to /dashboard
    // If unauthenticated -> go to /login
    if (pathname === "/") {
      if (authenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // B. Admin Auth Routes (/login, /signup):
    if (isAdminAuthRoute(pathname)) {
      if (authenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // C. Protected Admin Routes (/dashboard, /articles, etc.):
    if (isAdminProtectedRoute(pathname)) {
      if (authenticated) {
        return NextResponse.next();
      }
      // Not authenticated -> redirect to admin login
      const loginUrl = new URL("/login", req.url);
      const response = NextResponse.redirect(loginUrl);
      if (token) {
        // Clear invalid or expired cookie
        response.cookies.delete("bj_token");
      }
      return response;
    }

    // D. Public website routes accessed on admin subdomain (e.g. /about, /blog, /contact):
    // Redirect to public root domain using client redirect to prevent Next.js loop
    if (isPublicWebsiteRoute(pathname)) {
      const rootUrl = getRootPublicUrl(req, pathname).toString();
      return new Response(
        `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${rootUrl}"><title>Redirecting...</title></head><body><script>window.location.href="${rootUrl}";</script></body></html>`,
        {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Allow other admin paths through
    return NextResponse.next();
  }

  // ─── PUBLIC ROOT DOMAIN (localhost:3000) ─────────────────────────────────
  // A. If someone accesses protected admin routes on public domain:
  // Redirect to admin subdomain (which will then enforce auth)
  if (isAdminProtectedRoute(pathname)) {
    return NextResponse.redirect(getAdminSubdomainUrl(req, pathname));
  }

  // B. If someone accesses admin auth routes on public domain:
  // Redirect to admin subdomain
  if (isAdminAuthRoute(pathname)) {
    return NextResponse.redirect(getAdminSubdomainUrl(req, pathname));
  }

  // C. Public website routes (/, /about, /services, /portfolio, /blog, /contact):
  // 100% accessible to the public, no authentication required
  return NextResponse.next();
}

// Export default and proxy for Next.js 16 Proxy convention
export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (.svg, .png, .jpg, .jpeg, .gif, .webp, .woff2, .ico)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2|ico)$).*)",
  ],
};
