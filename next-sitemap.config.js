/* eslint-disable no-undef */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.hushh.ai",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/api/*',
    '/clientside/*',
    '/_next/*',
    '/admin/*',
    '/test/*',
    '/staging/*',
    '/*?*',
    '/404',
    '/500',
    '/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/clientside/*",
          "/api/*",
          "/_next/*",
          "/admin/*",
          "/test/*",
          "/staging/*",
          "/*?q=*",
          "/*?search=*",
          "/*?utm_*",
          "/*?ref=*",
          "/*&*",
          "/404",
          "/500",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/clientside/*",
          "/api/*",
          "/_next/*",
          "/admin/*",
          "/test/*",
          "/staging/*",
          "/*?*",
          "/404",
          "/500",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot", 
        allow: "/",
        disallow: [
          "/clientside/*",
          "/api/*",
          "/_next/*",
          "/admin/*",
          "/test/*",
          "/staging/*",
          "/*?*",
          "/404",
          "/500",
        ],
        crawlDelay: 2,
      }
    ],
    additionalSitemaps: [
      "https://www.hushh.ai/server-sitemap.xml",
      "https://www.hushh.ai/blogs-sitemap.xml",
      "https://www.hushh.ai/products-sitemap.xml",
    ],
    host: "https://www.hushh.ai",
  },
  priority: 0.7,
  changefreq: "weekly",
  sitemapSize: 7000,
  autoLastmod: true,
  trailingSlash: false,
  
  transform: async (config, path) => {
    // Enhanced priority and frequency optimization
    let priority = config.priority;
    let changefreq = config.changefreq;
    let lastmod = config.autoLastmod ? new Date().toISOString() : undefined;

    // Homepage - Maximum priority, daily updates
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    
    // Main product pages - High priority, weekly updates
    else if (path.startsWith('/products/')) {
      priority = 0.9;
      changefreq = 'weekly';
      
      // Core products get higher priority
      if ([
        '/products/hushh-wallet-app',
        '/products/hushh-button', 
        '/products/browser-companion',
        '/products/hushh-vibe-search',
        '/products/concierge-app',
        '/products/hushh-valet-chat'
      ].includes(path)) {
        priority = 0.95;
        changefreq = 'weekly';
      }
    }
    
    // Developer API and documentation - High priority
    else if (path.startsWith('/developerApi') || path.startsWith('/developer-Api')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Blog posts - Medium-high priority, varies by recency
    else if (path.startsWith('/blogs/')) {
      priority = 0.8;
      changefreq = 'monthly';
      
      // Recent blog posts get higher priority (assuming path contains date or is recent)
      const now = new Date();
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
      
      // If we can determine post age, adjust priority
      priority = 0.75; // Default for older posts
      changefreq = 'yearly';
    }
    
    // About, contact, and key pages - High priority
    else if (['/about', '/contact-us', '/why-hushh'].includes(path)) {
      priority = 0.85;
      changefreq = 'monthly';
    }
    
    // Solutions and use cases - Medium priority
    else if (path.startsWith('/solutions') || path.startsWith('/use-cases')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    // Career and jobs - Medium priority, weekly updates
    else if (path.startsWith('/career') || path.startsWith('/jobs')) {
      priority = 0.7;
      changefreq = 'weekly';
    }
    
    // Legal pages - Lower priority, rarely updated
    else if (path.startsWith('/legal/')) {
      priority = 0.4;
      changefreq = 'yearly';
    }
    
    // Pricing pages - High priority for conversion
    else if (path.includes('pricing')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    // FAQ and support - Medium priority
    else if (path.includes('faq') || path.includes('support') || path.includes('help')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    
    // Community and press - Medium priority
    else if (path.includes('community') || path.includes('press') || path.includes('news')) {
      priority = 0.6;
      changefreq = 'weekly';
    }
    
    // All other pages - Default priority
    else {
      priority = 0.5;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority: Number(priority.toFixed(2)),
      lastmod,
      // Additional sitemap properties for enhanced SEO
      alternateRefs: [
        {
          href: `https://www.hushh.ai${path}`,
          hreflang: 'en',
        },
        {
          href: `https://www.hushh.ai${path}`,
          hreflang: 'en-US',
        },
        {
          href: `https://www.hushh.ai/en-gb${path}`,
          hreflang: 'en-GB',
        }
      ],
    };
  },
  
  // Additional options for enhanced SEO
  additionalPaths: async (config) => {
    const result = [];
    
    // Add dynamic product pages
    const products = [
      'hushh-wallet-app',
      'hushh-button',
      'browser-companion', 
      'hushh-vibe-search',
      'concierge-app',
      'hushh-valet-chat',
      'hushh-for-students',
      'personal-data-agent'
    ];
    
    products.forEach(product => {
      result.push({
        loc: `/products/${product}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add key landing pages
    const landingPages = [
      { path: '/monetize-your-data', priority: 0.9 },
      { path: '/privacy-first-ai', priority: 0.9 },
      { path: '/data-sovereignty', priority: 0.85 },
      { path: '/ethical-personalization', priority: 0.85 },
      { path: '/digital-identity-control', priority: 0.8 },
    ];
    
    landingPages.forEach(page => {
      result.push({
        loc: page.path,
        changefreq: 'monthly',
        priority: page.priority,
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  }
};
