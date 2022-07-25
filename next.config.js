const { createSecureHeaders } = require("next-secure-headers");
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [
                "'self'",
              ],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'"],
              baseUri: "self",
              formAction: "self",
              frameAncestors: true
            }
          },
          frameGuard: "deny",
          noopen: "noopen",
          nosniff: "nosniff",
          xssProtection: "sanitize",
          forceHTTPSRedirect: [
            true,
            { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
          ],
          referrerPolicy: "same-origin"
        })
      }
    ];
  },
  webpack(config) {
    config.output.crossOriginLoading = "anonymous";
    config.plugins.push(
        new SubresourceIntegrityPlugin()
    );
    return config;
  },
  i18n
}

module.exports = nextConfig
