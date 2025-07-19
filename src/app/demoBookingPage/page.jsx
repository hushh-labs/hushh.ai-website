import React from "react";
import ClientDemoBooking from "../clientside/DemoBooking";
import { siteMetadata } from "../sitemetadata";
import ContentWrapper from "../_components/layout/ContentWrapper";

export const metadata = {
  title: "Schedule a Demo | See Hushh's Data Privacy Solutions in Action",
  description:
    "Book a personalized demo to experience Hushh's innovative data privacy and monetization solutions. See how our platform empowers users and brands with ethical data practices.",
  keywords:
    "Hushh demo, data privacy demo, data monetization demo, user-controlled data demo, privacy-preserving technology demo, ethical data practices demo, personalized data experiences, luxury consumer data, AI-powered personalization demo, data marketplace demo, human-AI interaction demo, granular user consent, Book a call, Appointment, Live Demo",
  canonical: "https://hushh.ai/demoBookingPage",
  alternates: {
    canonical: "https://hushh.ai/demoBookingPage",
    languages: {
      'en-US': 'https://hushh.ai/demoBookingPage',
    },
  },
  openGraph: {
    title: "Schedule a Demo | See Hushh's Data Privacy Solutions in Action",
    description:
      "Book a personalized demo to experience Hushh's innovative data privacy and monetization solutions. See how our platform empowers users and brands with ethical data practices.",
    url: "https://hushh.ai/demoBookingPage",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Demo Booking - See Our Solutions in Action",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a Demo | See Hushh's Data Privacy Solutions in Action",
    description: "Book a personalized demo to experience Hushh's innovative data privacy and monetization solutions.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Service JSON-LD structured data
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hushh Product Demonstration",
  "provider": {
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
  },
  "description": "Personalized demonstrations of Hushh's data privacy and monetization solutions for individuals and businesses.",
  "serviceType": "Product Demonstration",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "47.6740",
      "longitude": "-122.2060"
    },
    "geoRadius": "5000"
  }
};

const DemoBooking = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientDemoBooking />
      </ContentWrapper>
    </>
  );
};

export default DemoBooking;
