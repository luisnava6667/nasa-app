/** @type {import('next').NextConfig} */
require('dotenv').config({ path: './config/.env.local' })
const nextConfig = {
  env: {
    NASA_API_KEY: process.env.NASA_API_KEY
  },
  reactStrictMode: true,
  images: {
    domains: ['apod.nasa.gov', 'images-assets.nasa.gov']
  }
}

module.exports = nextConfig
