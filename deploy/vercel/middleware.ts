/**
 * OPTIONAL basic-auth gate for Vercel. NOT active by default (it lives in /deploy, not the project root).
 *
 * To use: copy this file to the project ROOT as `middleware.ts`, run `npm i @vercel/functions`,
 * set env vars DEMO_USER and DEMO_PASSWORD in Vercel, and make sure the project's Framework Preset is
 * "Other" with Output Directory `out` (see README). UNTESTED in this repo - check the current Vercel
 * Routing Middleware docs before relying on it. For a stronger option use Vercel's built-in
 * Deployment Protection instead (see README).
 */
import { next } from "@vercel/functions";

export const config = { matcher: "/:path*" };

export default function middleware(request: Request) {
  const user = process.env.DEMO_USER;
  const pass = process.env.DEMO_PASSWORD;
  if (!user || !pass) return next(); // not configured -> open

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const [u, ...rest] = atob(header.slice(6)).split(":");
    if (u === user && rest.join(":") === pass) return next();
  }
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Private concept demo", charset="UTF-8"' },
  });
}
