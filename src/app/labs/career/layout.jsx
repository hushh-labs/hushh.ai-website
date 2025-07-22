import { Metadata } from 'next';

export const metadata = {
  title: 'Careers at Hushh Labs - Join Our AI Research Team | 10 Open Positions',
  description: 'Join Hushh Labs elite AI research team. 10 open positions including Principal AI Research Scientist ($220K-$500K), ML Engineer, Data Engineer, Product Manager. Partnership with Stanford, Purdue, IIT. Apply now.',
  keywords: 'Hushh Labs careers, AI research scientist jobs, machine learning engineer, AI safety researcher, MLOps engineer, data engineer, product manager AI, Stanford AI jobs, Purdue AI careers, IIT research positions, artificial intelligence careers, ML jobs San Francisco, AI researcher positions',
  openGraph: {
    title: 'Careers at Hushh Labs - Join Our AI Research Team | 10 Open Positions',
    description: 'Join our elite AI research team building superintelligent AI systems. 10 open positions with competitive salaries up to $500K. Partnership with Stanford, Purdue, and IIT.',
    type: 'website',
    url: 'https://hushh.ai/labs/career',
    images: [
      {
        url: '/Images/Logo/hushh-logo.png',
        width: 1200,
        height: 630,
        alt: 'Hushh Labs Careers - AI Research Jobs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Hushh Labs - Join Our AI Research Team',
    description: '10 open positions in AI research and engineering. Salaries up to $500K. Apply now.',
    images: ['/Images/Logo/hushh-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://hushh.ai/labs/career',
  },
  other: {
    'job-posting': 'true',
    'hiring-organization': 'Hushh Labs',
    'employment-type': 'FULL_TIME',
    'job-location': 'San Francisco, CA; Palo Alto, CA',
    'salary-range': '$140,000 - $500,000',
  },
};

export default function CareersLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Multiple AI Research and Engineering Positions",
            "description": "Join Hushh Labs elite AI research team. 10 open positions including Principal AI Research Scientist, ML Engineer, Data Engineer, and more.",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Hushh Labs",
              "sameAs": "https://hushh.ai"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "addressCountry": "US"
              }
            },
            "employmentType": "FULL_TIME",
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": 140000,
                "maxValue": 500000,
                "unitText": "YEAR"
              }
            },
            "datePosted": new Date().toISOString().split('T')[0],
            "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "industry": "Artificial Intelligence Research",
            "qualifications": "Advanced degree in AI/ML, Computer Science, or related field. Strong programming skills. Research experience preferred."
          })
        }}
      />
      {children}
    </>
  );
} 