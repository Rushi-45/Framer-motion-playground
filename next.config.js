/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [320, 480, 560, 600, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: "vendor-framer",
              priority: 10,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "vendor-react",
              priority: 10,
            },
            matter: {
              test: /[\\/]node_modules[\\/]matter-js[\\/]/,
              name: "vendor-matter",
              priority: 10,
            },
            icons: {
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              name: "vendor-icons",
              priority: 10,
            },
            default: {
              minChunks: 2,
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
