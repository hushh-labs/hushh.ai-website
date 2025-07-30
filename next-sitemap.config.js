/* eslint-disable no-undef */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.hushh.ai",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/clientside/*",
          "/api/*",
          "/_next/*",
          "/*?q=*"
        ],
      },
    ],
    additionalSitemaps: [
      "https://www.hushh.ai/server-sitemap.xml",
    ],
  },
  priority: 0.7,
  changefreq: "daily",
  sitemapSize: 7000,
  generateIndexSitemap: true,
  autoLastmod: true,
  transform: async (config, path) => {
    // Custom priority for important pages
    let priority = config.priority;
    if (path === '/') priority = 1.0;
    if (path === '/products/hushh-wallet-app') priority = 0.9;
    if (path === '/products/hushh-button') priority = 0.9;
    if (path === '/products/browser-companion') priority = 0.9;
    if (path === '/products/hushh-vibe-search') priority = 0.9;
    if (path === '/developerApi') priority = 0.9;
    if (path === '/about') priority = 0.8;
    if (path === '/contact-us') priority = 0.8;
    
    // Custom change frequency
    let changefreq = config.changefreq;
    if (path === '/') changefreq = 'daily';
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
