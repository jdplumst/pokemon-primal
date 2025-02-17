/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Netlify-CDN-Cache-Control",
            value: "no-cache",
          },
        ],
      },
    ];
  },
};

export default config;
