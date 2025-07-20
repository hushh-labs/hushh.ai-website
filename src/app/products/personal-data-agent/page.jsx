import React from 'react'
import HushhPDA from '../../clientside/HushhPDA';
import ContentWrapper from '../../_components/layout/ContentWrapper';
export const metadata = {
    title: "Personal Data Agent | Hushh AI - Your Data, Your Control",
    description:
      "Reclaim, understand, and monetize your digital life with Hushh's Personal Data Agent. An AI-powered data concierge that puts privacy first and control back in your hands.",
    keywords:
      "Personal Data Agent, Data Privacy, Data Ownership, AI Data Concierge, Digital Life Control, Data Monetization, Encrypted Data Vault, Privacy-First Technology, Data Aggregation, User Consent, Data Control, Personal AI, Data Security, Digital Identity, Data Insights, Consent Management, Blockchain Tracking, Data Transparency, Ethical Data Sharing, Data Rights, Personal Data Economy, AI Assistant, Privacy Innovation",
    canonical: "https://www.hushh.ai/products/personal-data-agent",
    alternates: {
      canonical: "https://www.hushh.ai/products/personal-data-agent",
      languages: {
        'en-US': 'https://www.hushh.ai/products/personal-data-agent',
      },
    },
    openGraph: {
      title: "Personal Data Agent | Hushh AI - Your Data, Your Control",
      description:
        "Reclaim, understand, and monetize your digital life with Hushh's Personal Data Agent. An AI-powered data concierge that puts privacy first and control back in your hands.",
      url: "https://www.hushh.ai/products/personal-data-agent",
      type: "website",
      siteName: "Hushh AI",
      images: [
        {
          url: '',
          width: 1200,
          height: 630,
          alt: "Hushh Personal Data Agent - AI-Powered Privacy Solution",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Personal Data Agent | Hushh AI - Your Data, Your Control",
      description: "Your Personal Data, Your Personal AI, Under Your Control. Say goodbye to exploitation, and hello to empowerment.",
      images: [''],
      creator: "@hushh_ai",
      site: "@hushh_ai",
    },
  };

const PersonalDataAgent = () => {
  return (
   <>
   <ContentWrapper includeHeaderSpacing={true}>
   <HushhPDA />
   </ContentWrapper>
   </>  
  )
}

export default PersonalDataAgent