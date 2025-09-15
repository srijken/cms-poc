/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for minimal JS
  output: 'export',
  
  // Disable runtime JS where possible
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Optimize for static generation
  distDir: 'out',
  trailingSlash: true,
  
  // Configure CSP headers for development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: will be stricter in production
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  },
  
  // Configure for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/cms-poc' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cms-poc/' : '',
  
  // Webpack configuration to minimize bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  }
}

module.exports = nextConfig