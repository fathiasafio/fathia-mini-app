/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirect any old paths if needed
      {
        source: '/chatgpt',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
