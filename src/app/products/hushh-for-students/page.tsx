import React from "react";
import { siteMetadata } from "../../sitemetadata";
import ClientHushhForStudents from "../../clientside/HFS";
import ContentWrapper from "../../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh For Students | Empower Your Academic Journey with Data Control",
  description:
    "Hushh For Students rewards and empowers students with complete data control, unlocking the true potential of your personal information while maintaining privacy.",
  keywords:
    "data privacy, data monetization, user-controlled data, privacy-preserving technology, ethical data practices, student data control, academic data management, privacy-conscious students, student rewards, digital engagement, secure data exchange, data value setting, educational technology, student privacy",
  canonical: "https://www.hushh.ai/products/hushh-for-students",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-for-students",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-for-students',
    },
  },
  openGraph: {
    title: "Hushh For Students | Empowering Student Data Control",
    description:
      "Hushh For Students empowers students to take control of their data, earn rewards, and navigate digital life safely and securely.",
    url: "https://www.hushh.ai/products/hushh-for-students",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh For Students - Data Control for Academic Success",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh For Students | Empower Your Academic Journey with Data Control",
    description: "Rewards & empowers students with data control and unlocks the true potential of your data.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hushh For Students",
  "applicationCategory": "EducationApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "Rewards & empowers students with data control and unlocks the true potential of your data.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-for-students",
    "priceCurrency": "USD",
    "price": "0",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156"
  },
  "featureList": [
    "Complete data control for students",
    "Rewards for responsible data sharing",
    "Privacy-preserving technology",
    "Academic data management",
    "Ethical data practices"
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

const hushhForStudents = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientHushhForStudents />
      </ContentWrapper>
    </>
  );
};

export default hushhForStudents;
