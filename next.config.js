const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const { i18n } = require('./next-i18next.config');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  connect-src 'self' https://formspree.io/;
  img-src 'self';
`

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Download-Options',
            value: 'noopen'
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin'
          }
        ],
      }
    ]
  },
  webpack(config) {
    config.output.crossOriginLoading = "anonymous";
    config.plugins.push(
        new SubresourceIntegrityPlugin()
    );
    return config;
  },
}

module.exports = nextConfig
