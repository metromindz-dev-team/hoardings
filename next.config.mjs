// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // ✅ required for static export
  },
  // No server-side features
  trailingSlash: true, // Optional: better for static hosting
};



export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//     domains: ["images.unsplash.com"],
//   },
// };

// export default nextConfig;




