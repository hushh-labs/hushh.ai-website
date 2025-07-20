import React from "react";
import ClientHushhWallet from "../../clientside/HushhWallet";
import { siteMetadata } from "../../sitemetadata";
import ContentWrapper from "../../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh Wallet App | World's First AI-Powered Data Wallet",
  description:
    "Take control of your digital identity with Hushh Wallet App. Aggregate, curate and monetize your personal data while maintaining complete privacy and control.",
  keywords:
    "Hushh Wallet App, AI-Powered Data Wallet, Personal Data Control, Digital Identity Management, Data Monetization, Personal Data Ownership, Data Privacy, Data Aggregation, User-Controlled Data, Data Value, Personalized Experiences, Rewarded Interactions, Transparent Data Sharing, Data Control, Unified Digital Identity, Data Curation, Personal Data Marketplace, Data Cards, Privacy-First Technology, Data Sharing Control, Consumer Data Rights, Personal Data Economy, AI Data Assistant, Data Income, Privacy Innovation",
  canonical: "https://www.hushh.ai/products/hushh-wallet-app",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-wallet-app",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-wallet-app',
    },
  },
  openGraph: {
    title: "Hushh Wallet App | World's First AI-Powered Data Wallet",
    description:
      "Take control of your digital identity with Hushh Wallet App. Aggregate, curate and monetize your personal data while maintaining complete privacy and control.",
    url: "https://www.hushh.ai/products/hushh-wallet-app",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Wallet App - AI-Powered Data Wallet",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Wallet App | World's First AI-Powered Data Wallet",
    description: "Take control of your digital identity with Hushh Wallet App. Your personal data, your own business.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data for Wallet App
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Hushh Wallet App",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "iOS, Android",
  "description": "Take control of your digital identity with Hushh Wallet App. Aggregate, curate and monetize your personal data while maintaining complete privacy and control.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-wallet-app",
    "priceCurrency": "USD",
    "price": "0",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Hushh AI",
    "logo": {
      "@type": "ImageObject",
      "url": siteMetadata.socialBanner
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "325"
  },
  "featureList": "Data aggregation, Personal data monetization, Privacy controls, Data curation, Identity management",
  "screenshot": siteMetadata.socialBanner
};

const hushhWalletApp = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientHushhWallet />
      </ContentWrapper>
    </>
  );
};

export default hushhWalletApp;