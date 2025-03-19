import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // turboDrive: false,
  // Turbopack a son propre système de hot reload, pas besoin de configuration webpack
  // Pour activer le polling explicitement avec Turbopack
  // experimental: {
  //   turbo: {
  //     // Options spécifiques à Turbopack si nécessaires
  //   },
  // },

  // webpack: (config, { dev, isServer }) => {
  //   // Optimisations webpack
  //   if (!dev && !isServer) {
  //     config.cache = {
  //       type: 'filesystem',
  //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  //     };
  //   }
  //   return config;
  // },

  // // Activation des rewrites pour contourner les problèmes CORS
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/strapi/:path*',
  //       destination: 'http://localhost:1337/api/:path*',
  //     },
  //   ];
  // },

  // Configuration des images pour Strapi
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**/*',
      },
    ],
  },

  // // Configuration des headers pour CORS
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
  //         { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;