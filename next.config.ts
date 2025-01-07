import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',  // 静的エクスポート用
  images: {
    unoptimized: true,  // GitHub Pages用の設定
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/thumbnail', // サムネイル用パス
      },
    ],
  },
  // 本番環境（GitHub Pages）用のパス設定
  basePath: process.env.NODE_ENV === 'production' ? '/paper-repository' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/paper-repository/' : '',
};

export default nextConfig;