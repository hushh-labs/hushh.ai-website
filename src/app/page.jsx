import "./globals.css"
import React from "react";
import ClientHome from "./clientside/Home";
import NewLandingPage from "./clientside/newLandingPage";

import { siteMetadata } from "./sitemetadata";

export const metadata = {
  title: "Hushh AI | Privacy-First Data Monetization & AI Personalization Platform",
  description: "Monetize your data ethically with Hushh AI. Control your digital identity, enjoy privacy-first AI personalization, and extract value from your personal data. Join the data sovereignty revolution with user-controlled data monetization.",
  keywords: [
    // Primary keywords for homepage
    "monetize my data", "data monetization platform", "privacy-first AI", "user-controlled data",
    "ethical data monetization", "personal data marketplace", "data sovereignty platform",
    "AI personalization without tracking", "privacy-preserving personalization", "data privacy tools",
    
    // Product-specific keywords
    "Hushh Wallet app", "Hushh Button widget", "browser companion privacy", "vibe search AI",
    "personal data agent", "concierge app AI", "valet chat assistant", "receipt radar app",
    
    // Industry and competitive keywords
    "data broker alternative", "ethical advertising platform", "GDPR compliance tools",
    "privacy by design", "decentralized data storage", "zero-knowledge data processing",
    "consent management platform", "data equity platform", "personal AI assistant",
    
    // Long-tail SEO keywords
    "how to monetize personal data ethically", "best privacy-first personalization tools",
    "user-controlled data vs data brokers", "ethical AI recommendations without surveillance",
    "privacy-conscious consumer tools", "luxury brand personalization platform",
    "enterprise data privacy solutions", "developer privacy APIs"
  ].join(", "),
  
  canonical: siteMetadata.canonicalUrl,
  alternates: {
    canonical: siteMetadata.canonicalUrl,
    languages: siteMetadata.alternateUrls,
  },
  
  // Enhanced Open Graph for Homepage
  openGraph: {
    title: "Hushh AI | Privacy-First Data Monetization & AI Personalization Platform",
    description: "Monetize your data ethically with Hushh AI. Control your digital identity, enjoy privacy-first AI personalization, and extract value from your personal data.",
    url: siteMetadata.canonicalUrl,
    siteName: "Hushh AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: "Hushh AI - Privacy-First Data Monetization Platform",
      },
      {
        url: `${siteMetadata.siteUrl}/images/homepage-hero-1200x630.jpg`,
        width: 1200,
        height: 630,
        alt: "Hushh AI Platform Dashboard - Control Your Data",
      }
    ],
    videos: [
      {
        url: `${siteMetadata.siteUrl}/videos/hushh-platform-demo.mp4`,
        width: 1200,
        height: 675,
        type: "video/mp4",
      }
    ],
  },
  
  // Enhanced Twitter for Homepage
  twitter: {
    card: "summary_large_image",
    site: "@hushh_ai",
    creator: "@hushh_ai",
    title: "Hushh AI | Privacy-First Data Monetization Platform",
    description: "Monetize your data ethically with privacy-first AI personalization. Join the data sovereignty revolution.",
    images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
  },
  
  // Homepage-specific robots
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
  
  // Additional homepage metadata
  other: {
    // Business/Product Information
    "product:name": "Hushh AI Platform",
    "product:category": "Privacy Technology",
    "product:price:amount": "0",
    "product:price:currency": "USD",
    
    // Content Classification
    "content-type": "website",
    "audience": "privacy-conscious consumers, enterprise clients, developers",
    "coverage": "worldwide",
    "distribution": "global",
    
    // SEO Enhancement
    "revisit-after": "1 day",
    "content-language": "en-US",
    "geo.region": "US",
    "geo.country": "US",
    
    // Social Proof
    "rating": "4.8",
    "review-count": "2500+",
    "user-count": "50000+",
    
    // Technical
    "mobile-friendly": "true",
    "schema-type": "WebPage",
    "page-type": "homepage",
  },
};

export default function Home() {
  return (
    <NewLandingPage />
  )
}
