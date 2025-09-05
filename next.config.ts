import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  // Domain-level redirects are handled by the hosting platform to
  // avoid redirect loops between `www` and the apex domain.
};

export default nextConfig;
