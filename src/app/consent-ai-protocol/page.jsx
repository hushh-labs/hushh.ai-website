import React from 'react'
import ConsentAILanding from '../_components/features/ConsentAILanding';
import CodeLikeBacteriaSection from '../_components/features/CodeLikeBacteriaSection';
import ConsentAgentsAsOperons from '../_components/features/ConsentAgentsAsOperons';
import VerifiediOSUserSection from '../_components/features/VerifiediOSUserSection';
import ContactForm from '../_components/features/contactForm';

export const metadata = {
  title: 'Consent AI Protocol | Revolutionary Privacy Framework | Hushh.ai',
  description: 'Discover Hushh\'s Consent AI Protocol - a groundbreaking privacy framework that treats code like bacteria with advanced consent agents and verified user systems. Transform your data privacy approach.',
  keywords: 'consent ai protocol, privacy framework, data consent management, ai privacy, consent agents, verified user system, data protection, privacy compliance, hushh ai, consent management platform',
  
  // OpenGraph tags for social media
  openGraph: {
    title: 'Consent AI Protocol | Revolutionary Privacy Framework | Hushh.ai',
    description: 'Discover Hushh\'s Consent AI Protocol - a groundbreaking privacy framework that treats code like bacteria with advanced consent agents and verified user systems.',
    url: 'https://hushh.ai/consent-ai-protocol',
    siteName: 'Hushh.ai',
    type: 'website',
    images: [
      {
        url: '/consent-ai-logo.png',
        width: 1200,
        height: 630,
        alt: 'Consent AI Protocol - Revolutionary Privacy Framework by Hushh.ai',
      },
    ],
    locale: 'en_US',
  },
  
  // Twitter Card tags
  twitter: {
    card: 'summary_large_image',
    title: 'Consent AI Protocol | Revolutionary Privacy Framework | Hushh.ai',
    description: 'Discover Hushh\'s Consent AI Protocol - a groundbreaking privacy framework that treats code like bacteria with advanced consent agents.',
    images: ['/consent-ai-logo.png'],
    creator: '@hushhai',
    site: '@hushhai',
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://hushh.ai/consent-ai-protocol',
  },
  
  // Additional SEO metadata
  other: {
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'application-name': 'Hushh.ai',
    'apple-mobile-web-app-title': 'Hushh.ai',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
  
  // Schema.org structured data
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}


const page = () => {
  return (
    <>
     {/* New ConsentAI Landing Section */}
     <ConsentAILanding />
      
      {/* Code Like Bacteria Section */}
      <CodeLikeBacteriaSection />
      
      {/* Consent Agents as Operons Section */}
      <ConsentAgentsAsOperons />
      
      {/* Eukaryotic Backbone Section */}
      {/* <EukaryoticBackbone /> */}
      
      {/* For the Verified iOS User Section */}
      <VerifiediOSUserSection />
      
      {/* Contact Form */}
      <ContactForm />
      
    </>
  )
}

export default page