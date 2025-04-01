import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // https://nextjs.org/docs/pages/api-reference/config/next-config-js
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
}

export default nextConfig;
