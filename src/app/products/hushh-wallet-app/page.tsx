import React from "react";
import ClientHushhWallet from "../../clientside/HushhWallet";
import { siteMetadata } from "../../sitemetadata";
import { generateProductMetadata, generatePageStructuredData } from "../../../lib/seo-utils";
import ContentWrapper from "../../_components/layout/ContentWrapper";

// Product data for SEO optimization
const productData = {
  name: "Hushh Wallet App",
  tagline: "World's First AI-Powered Data Wallet",
  description: "Take control of your digital identity with Hushh Wallet App. Aggregate, curate and monetize your personal data while maintaining complete privacy and control. Transform your data into value with ethical AI personalization.",
  url: "/products/hushh-wallet-app",
  category: "Privacy Software",
  price: "0",
  rating: {
    value: "4.8",
    count: "2,847"
  },
  features: [
    "Personal Data Aggregation",
    "AI-Powered Data Curation", 
    "Ethical Data Monetization",
    "Privacy-First Architecture",
    "Digital Identity Management",
    "Granular Consent Controls",
    "Data Value Analytics",
    "Secure Data Storage"
  ],
  benefits: [
    "Monetize your data ethically",
    "Control your digital identity",
    "Enjoy privacy-first personalization",
    "Generate passive data income",
    "Transparent data sharing",
    "Enhanced privacy protection"
  ],
  targetAudience: [
    "Privacy-conscious consumers",
    "Data sovereignty advocates", 
    "Tech-savvy individuals",
    "Digital privacy enthusiasts",
    "Personal data control seekers"
  ]
};

// Generate enhanced metadata using SEO utilities
export const metadata = {
  title: `${productData.name} | ${productData.tagline} - Monetize Your Data Ethically`,
  description: `${productData.description} Download the leading privacy-first data wallet app and join over 50,000+ users who control their digital identity. Available on iOS and Android.`,
  
  keywords: [
    // Primary product keywords
    "Hushh Wallet App", "AI-powered data wallet", "personal data control app", "data monetization platform",
    "digital identity management", "privacy-first data wallet", "ethical data monetization", "user-controlled data",
    
    // Feature-based keywords
    "data aggregation app", "personal data marketplace", "privacy data storage", "data curation tools",
    "granular consent management", "data value analytics", "secure personal vault", "AI data assistant",
    
    // Benefit-focused keywords  
    "monetize my personal data", "control digital footprint", "privacy-preserving personalization", 
    "data income generation", "transparent data sharing", "personal data ownership", "data privacy protection",
    
    // Industry and competitive keywords
    "data broker alternative", "GDPR compliance app", "CCPA data rights", "data sovereignty tools",
    "privacy by design app", "zero-knowledge data storage", "decentralized identity wallet", "ethical AI personalization",
    
    // Long-tail keywords for voice search
    "how to monetize personal data safely", "best app to control my data", "privacy-first data wallet download",
    "ethical alternative to data brokers", "secure personal data storage app", "AI data curation without surveillance",
    
    // Mobile app keywords
    "iOS data privacy app", "Android personal data app", "mobile data wallet", "smartphone privacy tools",
    "personal data app download", "data control mobile app", "privacy wallet iOS Android"
  ].join(", "),
  
  canonical: `${siteMetadata.siteUrl}${productData.url}`,
  alternates: {
    canonical: `${siteMetadata.siteUrl}${productData.url}`,
    languages: {
      'en-US': `${siteMetadata.siteUrl}${productData.url}`,
      'en-GB': `${siteMetadata.siteUrl}/en-gb${productData.url}`,
    },
  },
  
  // Enhanced Open Graph for product
  openGraph: {
    title: `${productData.name} | ${productData.tagline}`,
    description: `${productData.description} Join 50,000+ users who control their data and earn from ethical personalization.`,
    url: `${siteMetadata.siteUrl}${productData.url}`,
    type: "product",
    siteName: "Hushh AI",
    images: [
      {
        url: `${siteMetadata.siteUrl}/images/products/hushh-wallet-hero-1200x630.jpg`,
        width: 1200,
        height: 630,
        alt: "Hushh Wallet App - AI-Powered Data Wallet Interface",
      },
      {
        url: `${siteMetadata.siteUrl}/images/products/hushh-wallet-features-1200x630.jpg`,
        width: 1200,
        height: 630,
        alt: "Hushh Wallet Features - Data Control Dashboard",
      },
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh AI - Privacy-First Data Platform",
      }
    ],
    locale: "en_US",
    // Product-specific OG properties
    "product:price:amount": productData.price,
    "product:price:currency": "USD",
    "product:availability": "in stock",
    "product:condition": "new",
    "product:retailer": "Hushh AI",
    "product:category": productData.category,
  },
  
  // Enhanced Twitter Cards for product
  twitter: {
    card: "summary_large_image",
    site: "@hushh_ai",
    creator: "@hushh_ai",
    title: `${productData.name} | ${productData.tagline}`,
    description: `Take control of your data and monetize it ethically. ${productData.rating.value}⭐ rated by ${productData.rating.count} users.`,
    images: [`${siteMetadata.siteUrl}/images/products/hushh-wallet-twitter-1200x675.jpg`],
    app: {
      name: productData.name,
      id: {
        iphone: "hushhwallet",
        ipad: "hushhwallet",
        googleplay: "ai.hushh.wallet",
      },
      url: {
        iphone: "hushh://wallet",
        ipad: "hushh://wallet",
        googleplay: "https://play.google.com/store/apps/details?id=ai.hushh.wallet",
      },
    },
  },
  
  // Enhanced robots for product page
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large", 
      "max-video-preview": -1,
    },
  },
  
  // Product-specific metadata
  other: {
    // App store optimization
    "apple-itunes-app": "app-id=hushhwallet",
    "google-play-app": "app-id=ai.hushh.wallet",
    
    // Product information
    "product:price:amount": productData.price,
    "product:price:currency": "USD",
    "product:availability": "in stock",
    "product:condition": "new",
    "product:brand": "Hushh AI",
    "product:category": productData.category,
    "product:retailer": "Hushh AI",
    
    // Business metadata
    "business:contact_data:phone_number": siteMetadata.phoneNumber,
    "business:contact_data:email": siteMetadata.supportEmail,
    
    // Content classification
    "content-type": "product",
    "audience": productData.targetAudience.join(", "),
    "coverage": "worldwide",
    "distribution": "global",
    
    // SEO enhancement
    "revisit-after": "7 days",
    "rating": productData.rating.value,
    "review-count": productData.rating.count,
    "download-count": "50000+",
    "last-modified": new Date().toISOString(),
    
    // Technical
    "mobile-friendly": "true",
    "amp-ready": "false",
    "pwa-ready": "true",
    "offline-capable": "true",
  },
};

// Comprehensive JSON-LD structured data for Wallet App
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": `${siteMetadata.siteUrl}${productData.url}#product`,
  "name": productData.name,
  "alternateName": "Hushh Data Wallet",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Privacy Software",
  "operatingSystem": ["iOS", "Android", "Web"],
  "description": productData.description,
  "url": `${siteMetadata.siteUrl}${productData.url}`,
  "downloadUrl": [
    "https://apps.apple.com/app/hushh-wallet/idXXXXXX",
    "https://play.google.com/store/apps/details?id=ai.hushh.wallet"
  ],
  "softwareVersion": "2.1.0",
  "datePublished": "2023-01-15",
  "dateModified": new Date().toISOString(),
  "fileSize": "45MB",
  "installUrl": "https://www.hushh.ai/download",
  "permissions": "Camera, Storage",
  "memoryRequirements": "2GB",
  "storageRequirements": "100MB",
  "processorRequirements": "ARM64",
  "screenshot": [
    `${siteMetadata.siteUrl}/images/products/hushh-wallet-screenshot-1.jpg`,
    `${siteMetadata.siteUrl}/images/products/hushh-wallet-screenshot-2.jpg`,
    `${siteMetadata.siteUrl}/images/products/hushh-wallet-screenshot-3.jpg`
  ],
  "video": {
    "@type": "VideoObject",
    "name": "Hushh Wallet App Demo",
    "description": "See how Hushh Wallet helps you control and monetize your personal data",
    "thumbnailUrl": `${siteMetadata.siteUrl}/images/products/hushh-wallet-video-thumb.jpg`,
    "uploadDate": "2024-01-15",
    "duration": "PT2M30S",
    "contentUrl": `${siteMetadata.siteUrl}/videos/hushh-wallet-demo.mp4`
  },
  "offers": {
    "@type": "Offer",
    "url": `${siteMetadata.siteUrl}${productData.url}`,
    "priceCurrency": "USD",
    "price": productData.price,
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": siteMetadata.organization.name,
      "url": siteMetadata.siteUrl
    },
    "acceptedPaymentMethod": "https://schema.org/FreeOfCharge",
    "deliveryMethod": "https://schema.org/DigitalDownload",
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": siteMetadata.organization.name,
    "url": siteMetadata.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      "width": 400,
      "height": 400
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteMetadata.phoneNumber,
      "contactType": "customer service",
      "email": siteMetadata.supportEmail
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": productData.rating.value,
    "reviewCount": productData.rating.count,
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Chen"
      },
      "reviewBody": "Finally, an app that puts me in control of my data! I love being able to see exactly what data I'm sharing and getting value back from it.",
      "datePublished": "2024-08-15"
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Michael Rodriguez"
      },
      "reviewBody": "The privacy controls are incredible. I can finally understand and control how my personal data is being used.",
      "datePublished": "2024-09-01"
    }
  ],
  "featureList": productData.features,
  "applicationSuite": "Hushh AI Platform",
  "supportingData": {
    "@type": "Dataset",
    "name": "User Privacy Preferences",
    "description": "Encrypted user privacy preferences and consent data"
  },
  "sameAs": [
    "https://apps.apple.com/app/hushh-wallet/idXXXXXX",
    "https://play.google.com/store/apps/details?id=ai.hushh.wallet"
  ],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteMetadata.siteUrl}${productData.url}`
  },
  "isAccessibleForFree": true,
  "usageInfo": `${siteMetadata.siteUrl}/legal/termsofuse`,
  "privacyPolicy": `${siteMetadata.siteUrl}/legal/privacypolicy`,
  "copyrightHolder": {
    "@type": "Organization",
    "name": siteMetadata.organization.legalName
  },
  "copyrightYear": "2024",
  "creator": {
    "@type": "Organization",
    "name": siteMetadata.organization.name,
    "founder": siteMetadata.organization.founders
  },
  "maintainer": {
    "@type": "Organization",
    "name": siteMetadata.organization.name
  },
  "potentialAction": [
    {
      "@type": "DownloadAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://apps.apple.com/app/hushh-wallet/idXXXXXX",
        "inLanguage": "en-US",
        "actionPlatform": [
          "https://schema.org/IOSPlatform"
        ]
      }
    },
    {
      "@type": "DownloadAction", 
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://play.google.com/store/apps/details?id=ai.hushh.wallet",
        "inLanguage": "en-US",
        "actionPlatform": [
          "https://schema.org/AndroidPlatform"
        ]
      }
    }
  ]
};

// Breadcrumb structured data
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteMetadata.siteUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": `${siteMetadata.siteUrl}/products`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": productData.name,
      "item": `${siteMetadata.siteUrl}${productData.url}`
    }
  ]
};

// FAQ structured data for common product questions
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Hushh Wallet App free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Hushh Wallet App is completely free to download and use. You can start controlling and monetizing your personal data without any upfront costs."
      }
    },
    {
      "@type": "Question", 
      "name": "How does Hushh Wallet protect my privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hushh Wallet uses privacy-by-design architecture with end-to-end encryption, granular consent controls, and zero-knowledge protocols to ensure your data remains secure and private."
      }
    },
    {
      "@type": "Question",
      "name": "Can I really monetize my personal data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Hushh Wallet enables ethical data monetization by allowing you to share specific data insights with brands in exchange for value, while maintaining complete control over your privacy."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms is Hushh Wallet available on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hushh Wallet is available on iOS, Android, and as a web application, ensuring you can manage your data across all your devices."
      }
    }
  ]
};

const hushhWalletApp = () => {
  return (
    <>
      {/* Product structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientHushhWallet />
      </ContentWrapper>
    </>
  );
};

export default hushhWalletApp;