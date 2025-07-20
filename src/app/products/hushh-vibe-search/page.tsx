import React from "react";
import ClientVibeSearch from "../../clientside/VibeSearch";
import { siteMetadata } from "../../sitemetadata";
import ContentWrapper from "../../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh Vibe Search | Find Perfect Items with One-Click Personalization",
  description:
    "Discover products that match your unique style with Hushh Vibe Search. Our AI-powered search helps you find perfect items to express your individuality with just one click.",
  keywords:
    "vibe search, AI-powered personalization, luxury consumers, user-controlled data, privacy-preserving technology, personalized shopping, ethical advertising, AI for personalized marketing, high-end consumers, personalized product discovery, style matching, visual search, outfit suggestions, fashion AI, luxury shopping",
  canonical: "https://www.hushh.ai/products/hushh-vibe-search",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-vibe-search",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-vibe-search',
    },
  },
  openGraph: {
    title: "Hushh Vibe Search | Find Perfect Items with One-Click Personalization",
    description:
      "Discover products that match your unique style with Hushh Vibe Search. Our AI-powered search helps you find perfect items to express your individuality with just one click.",
    url: "https://www.hushh.ai/products/hushh-vibe-search",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Vibe Search - One-Click Personalized Shopping",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Vibe Search | Find Perfect Items with One-Click Personalization",
    description: "Find perfect items to express your individuality in just one click with our vibe search.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hushh Vibe Search",
  "applicationCategory": "ShoppingApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "Find perfect items to express your individuality in just one click with our vibe search.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-vibe-search",
    "priceCurrency": "USD",
    "price": "0",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "203"
  },
  "featureList": [
    "One-click personalized product discovery",
    "AI-powered style matching",
    "Privacy-preserving recommendations",
    "Ethical data usage",
    "Luxury product focus"
  ],
  "screenshot": siteMetadata.socialBanner,
  "softwareVersion": "1.0",
  "author": {
    "@type": "Organization",
    "name": "Hushh AI",
    "url": "https://www.hushh.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1021 5th St W.",
      "addressLocality": "Kirkland",
      "addressRegion": "WA",
      "postalCode": "98033",
      "addressCountry": "US"
    }
  }
};

const vibeSearch = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientVibeSearch />
      </ContentWrapper>
    </>
  );
};

export default vibeSearch;