/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // WebP only — AVIF encoding is CPU-heavy and was the main cause of slow first loads.
    formats: ["image/webp"],
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      // Lookbook and Shop the Look are merged into one shoppable page.
      { source: "/lookbook", destination: "/looks", permanent: false },
    ];
  },
};

export default nextConfig;
