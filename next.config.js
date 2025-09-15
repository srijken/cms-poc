/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only for production deployment, not during development
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Disable runtime JS where possible
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Optimize for static generation (only when exporting)
  ...(process.env.NODE_ENV === 'production' && {
    distDir: 'out',
    trailingSlash: true,
  }),
  
  // Configure CSP headers for development only (not compatible with export)
  ...(process.env.NODE_ENV !== 'production' && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for TinaCMS
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: blob:",
                "font-src 'self'",
                "connect-src 'self' ws: wss:", // Allow WebSocket connections for TinaCMS
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
  }),
  
  // Configure for GitHub Pages only in production
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/cms-poc',
    assetPrefix: '/cms-poc/',
  }),
  
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