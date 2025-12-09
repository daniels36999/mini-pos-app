// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export', // ← IMPORTANTE: Genera archivos estáticos
  images: {
    unoptimized: true, // Necesario para export
  }
};
  
export default nextConfig;
