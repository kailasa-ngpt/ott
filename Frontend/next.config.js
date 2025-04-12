/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-67940a2fbfa149ebb363693bbb5df7f0.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ea4b278dc87ae2346b7f5b8f453c97c4.r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-ott.koogle.sk',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'pub-67940a2fbfa149ebb363693bbb5df7f0.r2.dev',
      'ntv-ott.ea4b278dc87ae2346b7f5b8f453c97c4.r2.cloudflarestorage.com',
      'ea4b278dc87ae2346b7f5b8f453c97c4.r2.cloudflarestorage.com',
      'r2-rmn.ntv-ott.r2.dev',
      'cms-ott.koogle.sk'
    ],
  },
};

module.exports = nextConfig;