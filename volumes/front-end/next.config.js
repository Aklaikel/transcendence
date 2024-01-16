/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
    images: {
        domains: ['localhost','cdn.intra.42.fr','i.ibb.co'],
    },
    env: {
        BASE_URL:'http://localhost:8000',
        SOCKET_URL:'ws://localhost:8000'
      }
}

module.exports = nextConfig