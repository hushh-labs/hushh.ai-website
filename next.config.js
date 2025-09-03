/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  standalone: false,
});

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
        hostname: 'rpmzykoxqnbozgdoqbpc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
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