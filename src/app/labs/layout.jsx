import { Metadata } from 'next';

export const metadata = {
  title: 'Hushh Labs - Advanced AI Research & Development | Careers',
  description: 'Join Hushh Labs, an elite AI research organization partnering with Stanford, Purdue, and IIT. 10 open positions in AI research, engineering, and product development. Build superintelligent AI systems that benefit humanity.',
  keywords: 'Hushh Labs, AI research, machine learning jobs, AI careers, Stanford AI, Purdue AI, IIT AI, artificial intelligence jobs, ML engineer, AI researcher, data scientist, MLOps, AI safety',
  openGraph: {
    title: 'Hushh Labs - Advanced AI Research & Development | Careers',
    description: 'Join our elite team of AI researchers and engineers building superintelligent AI systems. Partnership with Stanford, Purdue, and IIT.',
    type: 'website',
    url: 'https://hushh.ai/labs',
    images: [
      {
        url: '/Images/Logo/hushh-logo.png',
        width: 1200,
        height: 630,
        alt: 'Hushh Labs - AI Research & Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hushh Labs - Advanced AI Research & Development | Careers',
    description: 'Join our elite team of AI researchers and engineers building superintelligent AI systems.',
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
    canonical: 'https://hushh.ai/labs',
  },
};

export default function LabsLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
} 