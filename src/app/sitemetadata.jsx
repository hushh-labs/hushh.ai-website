import HushhHeaderLogo from "../app/_components/svg/hushhHeaderLogo";

// Core SEO Keywords Clusters for Topical Authority
export const seoKeywordClusters = {
  // Primary Cluster: Data Privacy & Control
  dataPrivacy: [
    'data privacy', 'user-controlled data', 'data sovereignty', 'personal data control',
    'privacy-first technology', 'decentralized data', 'data autonomy', 'privacy by design',
    'granular data consent', 'data ownership rights', 'privacy-preserving technology',
    'ethical data practices', 'data protection standards', 'GDPR compliance tools'
  ],
  
  // Secondary Cluster: Data Monetization
  dataMonetization: [
    'monetize my data', 'data monetization platform', 'personal data marketplace',
    'data revenue sharing', 'ethical data monetization', 'user data value',
    'data as an asset', 'personal data economy', 'data equity platform',
    'transparent data pricing', 'data value extraction', 'data dividend payments'
  ],
  
  // Tertiary Cluster: AI & Personalization
  aiPersonalization: [
    'AI-powered personalization', 'ethical AI recommendations', 'privacy-conscious AI',
    'human-AI interaction', 'personalized AI experiences', 'AI without surveillance',
    'consent-driven AI', 'on-device AI processing', 'private AI analytics',
    'AI transparency tools', 'explainable AI systems', 'AI privacy protection'
  ],
  
  // Quaternary Cluster: Digital Identity
  digitalIdentity: [
    'digital identity management', 'verifiable credentials', 'self-sovereign identity',
    'decentralized identity', 'digital identity verification', 'identity privacy',
    'secure digital identity', 'identity data control', 'digital identity platform',
    'biometric privacy protection', 'identity authentication', 'digital identity rights'
  ],
  
  // Product-Specific Keywords
  products: [
    'Hushh Wallet app', 'Hushh Button widget', 'browser companion privacy',
    'vibe search AI', 'concierge app AI', 'valet chat assistant',
    'receipt radar app', 'brand wallet loyalty', 'Hushh for students',
    'personal data agent', 'privacy browser extension', 'AI shopping assistant'
  ],
  
  // Industry & Target Audience
  industry: [
    'luxury brand personalization', 'premium customer data', 'high-net-worth personalization',
    'enterprise data privacy', 'developer privacy APIs', 'privacy-conscious consumers',
    'tech-savvy millennials', 'Gen Z privacy tools', 'executive data protection',
    'luxury retail technology', 'premium customer experience', 'boutique data solutions'
  ],
  
  // Technical & Developer Keywords
  technical: [
    'privacy API development', 'data privacy SDK', 'consent management API',
    'privacy-first architecture', 'zero-knowledge protocols', 'encrypted data storage',
    'privacy engineering', 'data minimization techniques', 'privacy by design development',
    'secure data protocols', 'privacy compliance tools', 'data governance platform'
  ],
  
  // Long-tail Keywords for Topical Authority
  longTail: [
    'how to monetize personal data ethically', 'best privacy-first personalization tools',
    'personal data control vs data brokers', 'ethical advertising without tracking',
    'AI personalization without privacy loss', 'user-controlled data monetization platform',
    'privacy-preserving customer analytics', 'consent-driven marketing automation',
    'decentralized data marketplace benefits', 'personal AI assistant privacy protection'
  ]
};

// Generate combined keywords string for metadata
const generateKeywordsString = () => {
  const allKeywords = Object.values(seoKeywordClusters).flat();
  return allKeywords.slice(0, 50).join(', '); // Limit to top 50 for meta keywords
};

// Enhanced Site Metadata with Advanced SEO
export const siteMetadata = {
  // Core Identity
  title: 'Hushh | Your Data Your Business - Privacy-First AI & Data Monetization Platform',
  author: 'Manish Sainani',
  headerTitle: 'Hushh',
  description: 'Control your data, monetize your insights, and enjoy personalized experiences with Hushh. The leading privacy-first platform for data sovereignty, ethical AI personalization, and user-controlled data monetization.',
  tagline: 'Your Data, Your Business, Your Control',
  
  // Technical SEO
  language: 'en-us',
  locale: 'en-US',
  theme: 'system',
  charset: 'UTF-8',
  
  // URLs & Domains
  siteUrl: 'https://www.hushh.ai',
  canonicalUrl: 'https://www.hushh.ai',
  alternateUrls: {
    'en-US': 'https://www.hushh.ai',
    'en-GB': 'https://www.hushh.ai/en-gb',
  },
  
  // Visual Assets
  siteLogo: '/images/hushh-logo-high-res.png',
  socialBanner: '/images/hushh-social-banner-1200x630.png',
  favicon: '/favicon.ico',
  appleTouchIcon: '/apple-touch-icon.png',
  
  // Contact Information
  email: 'info@hushh.ai',
  supportEmail: 'support@hushh.ai',
  salesEmail: 'sales@hushh.ai',
  phoneNumber: '(888) 462-1726',
  
  // Social Media
  social: {
    twitter: 'https://x.com/hushh_ai',
    twitterHandle: '@hushh_ai',
    linkedin: 'https://www.linkedin.com/company/hushh-ai/',
    youtube: 'https://www.youtube.com/@hushhai',
    github: 'https://github.com/hushh-labs',
    facebook: '',
    instagram: 'https://www.instagram.com/hushh.ai',
    discord: 'https://discord.gg/hushh-ai',
  },
  
  // SEO Keywords
  keywords: generateKeywordsString(),
  keywordClusters: seoKeywordClusters,
  
  // Analytics & Tracking
  analytics: {
    googleAnalyticsId: 'G-1PDGMHH7CL',
    googleTagManagerId: 'GTM-XXXXXXX',
    ahrefs: 'yInBsXwcX1jmHJpmJk0QSQ',
    hotjar: '',
    mixpanel: '',
  },
  
  // Organization Schema
  organization: {
    '@type': 'Organization',
    name: 'Hushh AI',
    legalName: 'Hushh Technologies Inc.',
    url: 'https://www.hushh.ai',
    logo: 'https://www.hushh.ai/images/hushh-logo-high-res.png',
    foundingDate: '2022-01-01',
    description: 'Leading privacy-first platform for data sovereignty, ethical AI personalization, and user-controlled data monetization.',
    industry: 'Privacy Technology',
    employees: '10-50',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1021 5th St W.',
      addressLocality: 'Kirkland',
      addressRegion: 'WA',
      postalCode: '98033',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-888-462-1726',
      contactType: 'customer service',
      email: 'support@hushh.ai',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.linkedin.com/company/hushh-ai/',
      'https://twitter.com/hushh_ai',
      'https://www.youtube.com/@hushhai',
      'https://github.com/hushh-labs'
    ],
    founders: [
      {
        '@type': 'Person',
        name: 'Manish Sainani',
        jobTitle: 'CEO & Co-Founder',
        url: 'https://www.linkedin.com/in/manish-sainani'
      },
      {
        '@type': 'Person',
        name: 'Justin Donaldson',
        jobTitle: 'CTO & Co-Founder',
        url: 'https://www.linkedin.com/in/justin-donaldson'
      }
    ]
  },
  
  // Products for Schema
  products: [
    {
      name: 'Hushh Wallet',
      description: 'Personal data wallet for secure data storage and monetization',
      category: 'Privacy Software',
      url: 'https://www.hushh.ai/products/hushh-wallet-app'
    },
    {
      name: 'Hushh Button',
      description: 'Privacy-first widget for ethical data collection',
      category: 'Developer Tools',
      url: 'https://www.hushh.ai/products/hushh-button'
    },
    {
      name: 'Browser Companion',
      description: 'Privacy-focused browser extension for data control',
      category: 'Browser Extension',
      url: 'https://www.hushh.ai/products/browser-companion'
    },
    {
      name: 'Vibe Search',
      description: 'AI-powered private search with personalization',
      category: 'AI Search',
      url: 'https://www.hushh.ai/products/hushh-vibe-search'
    }
  ],
  
  // Content Strategy
  contentStrategy: {
    primaryTopics: ['Data Privacy', 'Ethical AI', 'Data Monetization', 'Digital Identity'],
    contentTypes: ['Blog Posts', 'Case Studies', 'Whitepapers', 'API Documentation'],
    updateFrequency: 'Weekly',
    languageTargets: ['en-US', 'en-GB'],
  },
  
  // Technical SEO Settings
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  
  // Open Graph Defaults
  openGraph: {
    type: 'website',
    siteName: 'Hushh AI',
    locale: 'en_US',
    title: 'Hushh | Privacy-First AI & Data Monetization Platform',
    description: 'Control your data, monetize your insights, and enjoy personalized experiences with Hushh. Leading platform for data sovereignty and ethical AI.',
    images: [
      {
        url: 'https://www.hushh.ai/images/hushh-social-banner-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Hushh - Your Data Your Business',
      }
    ],
  },
  
  // Twitter Defaults
  twitter: {
    card: 'summary_large_image',
    site: '@hushh_ai',
    creator: '@hushh_ai',
    title: 'Hushh | Privacy-First AI & Data Monetization Platform',
    description: 'Control your data, monetize your insights, and enjoy personalized experiences with privacy-first technology.',
    images: ['https://www.hushh.ai/images/hushh-social-banner-1200x630.png'],
  },
  
  // Additional SEO Enhancement
  verification: {
    google: '2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M',
    bing: '',
    yandex: '',
    pinterest: '',
  },
  
  // Structured Data Templates
  structuredData: {
    website: {
      '@type': 'WebSite',
      name: 'Hushh AI',
      url: 'https://www.hushh.ai',
      description: 'Privacy-first platform for data sovereignty and ethical AI personalization',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.hushh.ai/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    softwareApplication: {
      '@type': 'SoftwareApplication',
      name: 'Hushh Platform',
      applicationCategory: 'Privacy Software',
      operatingSystem: 'Web, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }
}

// module.exports = siteMetadata