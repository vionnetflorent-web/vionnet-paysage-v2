/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sert automatiquement les images en AVIF puis WebP selon le navigateur.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
