import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a fully static site into ./out (used for GitHub Pages).
 * Without it, this is a normal Next.js build (e.g. for Vercel), which also
 * sends the security headers below. Static hosts can't set custom headers.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
