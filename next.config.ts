import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Both the apex and www are attached to the deployment, and the canonical
   * origin is www (see `lib/site.ts`). Without this, both hostnames answer 200
   * with identical content and only the canonical tag separates them. Send the
   * apex to www permanently instead, so the split never reaches a crawler.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "clindaddy.com" }],
        destination: "https://www.clindaddy.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
