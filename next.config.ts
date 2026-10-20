import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /th/menu/ -> out/th/menu/index.html
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { inlineCss: true }, // inline the small CSS bundle: no render-blocking request
};

export default nextConfig;
