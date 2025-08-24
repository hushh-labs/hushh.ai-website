import "./globals.css";
import "./_styles/blog.css";
import "../app/_styles/syntax-highlight.css";
import React from "react";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { figtree } from "./_utilities/fonts";
import { Providers } from "./provider";
import ResponsiveSizeProvider from "./context/responsive";
import HeaderComponent from "./_components/features/HeaderComponent";
import FundingBanner from "./_components/features/FundingBanner";
import { siteMetadata } from "./sitemetadata";
import { AuthProvider } from "./context/AuthContext";
import { BannerHeightProvider } from "./context/BannerHeightContext";
import HushhBot from "./_components/HushhBot";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | Hushh`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  generator: 'Next.js',
  applicationName: 'Hushh',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  publisher: 'Hushh',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: 'Hushh',
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: 'Hushh - Your Data Your Business',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: '@hushh_ai',
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: 'Hushh - Your Data Your Business',
      },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  verification: {
    google: "2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable} ${figtree.className}`}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1PDGMHH7CL"
        strategy={'afterInteractive' }
      />
      <Script src="https://analytics.ahrefs.com/analytics.js" strategy={'lazyOnload' } data-key="yInBsXwcX1jmHJpmJk0QSQ" async />
      <Script
          type="text/javascript"
          strategy={'lazyOnload' }
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        />
      <GoogleTagManager gtmId="G-1PDGMHH7CL" />
      <meta
        name="google-site-verification"
        content="2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
      />
      <head>
        {/* Font Preloading for instant loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
            rel="stylesheet"
          />
        </noscript>
      </head>

      <body
        style={{
          backgroundColor: "black",
          padding: "0 !important",
          paddingInlineStart: "0px !important",
          paddingInlineEnd: "0px !important",
        }}
        className={figtree.className}
      >
        <NextTopLoader
            color="#007AFF"
            initialPosition={0.08}
            crawlSpeed={300}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={500}
            shadow="0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(94, 92, 230, 0.4)"
            template='
                      <div class="bar" role="bar" style="background: linear-gradient(135deg, #007AFF 0%, #5E5CE6 50%, #7C3AED 100%); box-shadow: 0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(94, 92, 230, 0.4);">
                        <div class="peg" style="background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8) 100%); box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);">
                        </div>
                      </div>
                      '
            zIndex={99999}
            showAtBottom={false}
          />
        <link rel="icon" href="./favicon.ico" />
        
        {/* <div className="relative z-50">
          <HushhButtonFromLib />
        </div> */}
        <ResponsiveSizeProvider>
          <AuthProvider>
            <BannerHeightProvider>
              <div className={`${figtree.variable} w-full`}>
                <Providers>
                  {/* Funding Banner - top priority */}
                  <FundingBanner />
                  {/* Header positioned dynamically after banners */}
                  <HeaderComponent />
                  {children}
                  {/* Hushh Bot Chatbot */}
                  <HushhBot />
                </Providers>
              </div>
            </BannerHeightProvider>
          </AuthProvider>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
