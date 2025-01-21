import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
  },
  images: {
    domains: ['pub-67940a2fbfa149ebb363693bbb5df7f0.r2.dev'],
  },
};

// PLEASE DON'T DELETE FOLLOWING AS WE NEED THIS IN LOCAL DEPLOYMENT:

// module.exports = {
//   reactStrictMode: false,
//   images: {
//     domains: ['pub-67940a2fbfa149ebb363693bbb5df7f0.r2.dev'], // Add your image domain here
//   },
// };

export default nextConfig;
