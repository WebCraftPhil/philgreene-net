import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.philgreene.net' }],
        destination: 'https://philgreene.net/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
