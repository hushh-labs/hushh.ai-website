import React from "react";
import ClientHushhValetChat from "../../clientside/HushhValetChat";
import { siteMetadata } from "../../sitemetadata";
import ContentWrapper from "../../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh Valet Chat | AI-Powered Receipt & Finance Management",
  description:
    "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your spending habits and take control of your finances effortlessly.",
  keywords:
    "Valet Chat, Receipt Management, AI Finance Management, Receipt Organizer, Digital Receipts, Expense Tracking, Finance Insights, Spending Analytics, Receipt Storage, AI Financial Assistant, Financial Management, Warranty Tracking, Purchase History, Receipt Categorization, Spending Habits Analysis, data privacy, data monetization, user-controlled data, privacy-preserving technology, ethical data practices",
  canonical: "https://www.hushh.ai/products/hushh-valet-chat",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-valet-chat",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-valet-chat',
    },
  },
  openGraph: {
    title: "Hushh Valet Chat | AI-Powered Personalized Customer Support",
    description:
      "Experience truly personalized customer support with Hushh Valet Chat, powered by AI and your personal data preferences.",
    url: "https://www.hushh.ai/products/hushh-valet-chat",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Valet Chat - AI-Powered Receipt Management",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Valet Chat | AI-Powered Receipt & Finance Management",
    description: "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your spending habits.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hushh Valet Chat",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your spending habits and take control of your finances effortlessly.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-valet-chat",
    "priceCurrency": "USD",
    "price": "0",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "178"
  },
  "featureList": [
    "AI-powered receipt management",
    "Spending analytics and insights",
    "Warranty tracking",
    "Purchase history organization",
    "Privacy-first financial management"
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

const hushhValetChat = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientHushhValetChat />
      </ContentWrapper>
    </>
  );
};

export default hushhValetChat;
