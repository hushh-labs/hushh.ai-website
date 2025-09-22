import "./globals.css";
import "./_styles/blog.css";
import "../app/_styles/syntax-highlight.css";
import React from "react";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { figtree } from "./_utilities/fonts";
import { Providers } from "./provider";
import ResponsiveSizeProvider from "./context/responsive";
import HeaderComponent from "./_components/features/HeaderComponent";
import FundingBanner from "./_components/features/FundingBanner";
import { siteMetadata } from "./sitemetadata";
import { AuthProvider } from "./context/AuthContext";
import { BannerHeightProvider } from "./context/BannerHeightContext";
import HushhBot from "./_components/HushhBot";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | Hushh AI - Privacy-First Data Platform`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  
  // Enhanced Technical Metadata
  generator: 'Next.js 14',
  applicationName: 'Hushh AI Platform',
  referrer: 'origin-when-cross-origin',
  authors: [
    { name: siteMetadata.author, url: `${siteMetadata.siteUrl}/about` },
    { name: 'Hushh AI Team', url: siteMetadata.siteUrl }
  ],
  creator: siteMetadata.author,
  publisher: 'Hushh Technologies Inc.',
  
  // Content Classification
  category: 'Privacy Technology',
  classification: 'Business Software',
  
  // Enhanced Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
    url: false,
  },
  
  // Language and Localization
  alternates: {
    canonical: siteMetadata.canonicalUrl,
    languages: siteMetadata.alternateUrls,
  },
  
  // Enhanced Open Graph
  openGraph: {
    title: siteMetadata.openGraph.title,
    description: siteMetadata.openGraph.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.openGraph.siteName,
    images: siteMetadata.openGraph.images,
    locale: siteMetadata.openGraph.locale,
    type: siteMetadata.openGraph.type,
    emails: [siteMetadata.email],
    phoneNumbers: [siteMetadata.phoneNumber],
    countryName: 'United States',
    region: 'Washington',
    ttl: 604800, // 1 week cache
  },
  
  // Enhanced Robots Configuration
  robots: {
    ...siteMetadata.robots,
    googleBot: {
      ...siteMetadata.robots,
      'notranslate': false,
      'noimageindex': false,
      'noarchive': false,
      'nosnippet': false,
      'indexifembedded': true,
    },
    bingbot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  
  // Enhanced Twitter Cards
  twitter: {
    ...siteMetadata.twitter,
    app: {
      name: 'Hushh AI',
      id: {
        iphone: 'hushhAI',
        ipad: 'hushhAI',
        googleplay: 'ai.hushh.app',
      },
      url: {
        iphone: 'hushh://app',
        ipad: 'hushh://app', 
        googleplay: 'https://play.google.com/store/apps/details?id=ai.hushh.app',
      },
    },
  },
  
  // Enhanced Viewport Configuration
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  
  // Enhanced Theme Color
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-reduced-motion: no-preference)', color: '#007AFF' },
  ],
  
  // Enhanced Verification
  verification: siteMetadata.verification,
  
  // Apple Specific
  appleWebApp: {
    capable: true,
    title: 'Hushh AI',
    statusBarStyle: 'default',
  },
  
  // Additional Meta Tags
  other: {
    // Business Information
    'business:contact_data:country_name': 'United States',
    'business:contact_data:region': 'Washington',
    'business:contact_data:locality': 'Kirkland',
    'business:contact_data:phone_number': siteMetadata.phoneNumber,
    'business:contact_data:email': siteMetadata.email,
    
    // App Information
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    
    // Content Security
    'Content-Security-Policy': "upgrade-insecure-requests",
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    
    // Performance
    'dns-prefetch': 'true',
    'preconnect': 'https://fonts.googleapis.com',
    'preconnect-crossorigin': 'https://fonts.gstatic.com',
    
    // SEO Enhancement
    'og:updated_time': new Date().toISOString(),
    'article:publisher': 'https://www.linkedin.com/company/hushh-ai/',
    'article:author': 'https://www.linkedin.com/in/manish-sainani',
    
    // Schema.org Breadcrumbs
    'breadcrumb': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': siteMetadata.siteUrl
        }
      ]
    }),
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#007AFF' },
    ],
  },
};

export default function RootLayout({ children }) {
  // Generate comprehensive structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...siteMetadata.organization,
    url: siteMetadata.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      width: 400,
      height: 400
    },
    image: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
    description: siteMetadata.description,
    knowsAbout: [
      'Data Privacy',
      'AI Personalization', 
      'Data Monetization',
      'Digital Identity',
      'Privacy Technology',
      'Ethical AI',
      'Decentralized Data'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hushh AI Products',
      itemListElement: siteMetadata.products.map((product, index) => ({
        '@type': 'Offer',
        name: product.name,
        description: product.description,
        category: product.category,
        url: product.url,
        position: index + 1
      }))
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...siteMetadata.structuredData.website,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
      }
    },
    author: {
      '@type': 'Person',
      name: siteMetadata.author
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl
      }
    ]
  };

  return (
    <html lang="en" className={`${figtree.variable} ${figtree.className}`}>
      <head>
        {/* Comprehensive Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
        
        {/* Enhanced Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Business Schema Meta */}
        <meta name="geo.region" content="US-WA" />
        <meta name="geo.placename" content="Kirkland" />
        <meta name="geo.position" content="47.6815;-122.2087" />
        <meta name="ICBM" content="47.6815, -122.2087" />
        
        {/* Enhanced Dublin Core */}
        <meta name="DC.title" content={siteMetadata.title} />
        <meta name="DC.creator" content={siteMetadata.author} />
        <meta name="DC.subject" content="Data Privacy, AI Personalization, Data Monetization" />
        <meta name="DC.description" content={siteMetadata.description} />
        <meta name="DC.publisher" content="Hushh Technologies Inc." />
        <meta name="DC.contributor" content="Hushh AI Team" />
        <meta name="DC.date" content={new Date().toISOString()} />
        <meta name="DC.type" content="Text" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content={siteMetadata.siteUrl} />
        <meta name="DC.language" content="en-US" />
        <meta name="DC.coverage" content="Worldwide" />
        <meta name="DC.rights" content="Copyright © 2024 Hushh Technologies Inc." />
      </head>
      
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1PDGMHH7CL"
        strategy={'afterInteractive' }
      />
      <Script src="https://analytics.ahrefs.com/analytics.js" strategy={'lazyOnload' } data-key="yInBsXwcX1jmHJpmJk0QSQ" async />
      <Script
          type="text/javascript"
          strategy={'lazyOnload' }
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        />
      <GoogleTagManager gtmId="G-1PDGMHH7CL" />
      <meta
        name="google-site-verification"
        content="2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
      />
      <head>
        {/* Font Preloading for instant loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
            rel="stylesheet"
          />
        </noscript>
      </head>

      <body
        style={{
          backgroundColor: "black",
          padding: "0 !important",
          paddingInlineStart: "0px !important",
          paddingInlineEnd: "0px !important",
        }}
        className={figtree.className}
      >
        <NextTopLoader
            color="#007AFF"
            initialPosition={0.08}
            crawlSpeed={300}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={500}
            shadow="0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(94, 92, 230, 0.4)"
            template='
                      <div class="bar" role="bar" style="background: linear-gradient(135deg, #007AFF 0%, #5E5CE6 50%, #7C3AED 100%); box-shadow: 0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(94, 92, 230, 0.4);">
                        <div class="peg" style="background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8) 100%); box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);">
                        </div>
                      </div>
                      '
            zIndex={99999}
            showAtBottom={false}
          />
        <link rel="icon" href="./favicon.ico" />
        
        {/* <div className="relative z-50">
          <HushhButtonFromLib />
        </div> */}
        <ResponsiveSizeProvider>
          <AuthProvider>
            <BannerHeightProvider>
              <div className={`${figtree.variable} w-full`}>
                <Providers>
                  {/* Funding Banner - top priority */}
                  <FundingBanner />
                  {/* Header positioned dynamically after banners */}
                  <HeaderComponent />
                  {children}
                  {/* Hushh Bot Chatbot */}
                  <HushhBot />
                </Providers>
              </div>
            </BannerHeightProvider>
          </AuthProvider>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
