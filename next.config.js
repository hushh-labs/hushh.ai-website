/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  standalone: false,
});

const supabaseUrlFromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL
  || process.env.VITE_SUPABASE_URL
  || "https://ibsisfnjxeowvdtvgzff.supabase.co";

const supabaseHostname = (() => {
  try {
    return new URL(supabaseUrlFromEnv).hostname;
  } catch (error) {
    return "ibsisfnjxeowvdtvgzff.supabase.co";
  }
})();

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/hushh_id/:path*',
        destination: '/hushh-id/:path*',
        permanent: true,
      },
      {
        source: '/hushh-hackhathon',
        destination: '/pda/iithackathon',
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.hush1one.com",
          },
        ],
        destination: "https://hushh.ai/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(withNextra(nextConfig));
