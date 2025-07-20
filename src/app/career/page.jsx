import React from 'react'
import CareerPage from '../_components/career/carrer';
import { siteMetadata } from '../sitemetadata';
import ContentWrapper from '../_components/layout/ContentWrapper';
export const metadata = {
  title: "Careers at Hushh | Join Our Data Privacy Revolution",
  description:
    "Join Hushh and build AI that advances personalized data experiences while respecting privacy. Explore career opportunities and be part of our innovative team.",
  keywords:
    "data privacy careers, data monetization jobs, privacy-preserving technology careers, AI-powered personalization jobs, ethical data practices careers, data sovereignty jobs, privacy-conscious technology, Hushh careers, data privacy jobs, personalized data experiences, ethical AI jobs, Kirkland tech jobs, Washington tech careers",
  canonical: "https://www.hushh.ai/career",
  alternates: {
    canonical: "https://www.hushh.ai/career",
    languages: {
      'en-US': 'https://www.hushh.ai/career',
    },
  },
  robots: "index, follow", 
  openGraph: {
    title: "Careers at Hushh | Join Our Data Privacy Revolution",
    description:
      "Join Hushh and build AI that advances personalized data experiences while respecting privacy. Explore career opportunities and be part of our innovative team.",
    url: "https://www.hushh.ai/career",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Careers at Hushh - Join Our Team",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Hushh | Join Our Data Privacy Revolution",
    description: "Join Hushh and build AI that advances personalized data experiences while respecting privacy.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// JobPosting JSON-LD structured data
const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hushh AI",
  "url": "https://www.hushh.ai/career",
  "logo": "https://www.hushh.ai/logo.png",
  "description": "Hushh is revolutionizing how individuals control and monetize their personal data through innovative technology solutions.",
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1021 5th St W.",
      "addressLocality": "Kirkland",
      "addressRegion": "WA",
      "postalCode": "98033",
      "addressCountry": "US"
    }
  },
  "industry": "Technology, Information, and Internet",
  "employmentType": "Full-time",
  "jobBenefits": "Competitive salary, Health insurance, Flexible work hours, Remote work options"
};

const Career = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <ContentWrapper>
        <CareerPage />
      </ContentWrapper>
    </>
  )
}

export default Career