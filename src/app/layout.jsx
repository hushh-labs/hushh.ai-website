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
import HackathonBanner from "./_components/features/HackathonBanner";
import { siteMetadata } from "./sitemetadata";
import { AuthProvider } from "./context/AuthContext";

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
    <html lang="en" className={`${figtree.variable} `}>
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
        {/* Preconnect to essential domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        style={{
          backgroundColor: "black",
          padding: "0 !important",
          paddingInlineStart: "0px !important",
          paddingInlineEnd: "0px !important",
        }}
      >
        <NextTopLoader
            color="red"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='
                      <div class="bar" role="bar">
                        <div class="peg">
                        </div>
                      </div>
                      <div class="spinner" role="spinner">
                        <div class="spinner-icon">
                        </div>
                      </div>
                      '
            zIndex={1600}
            showAtBottom={false}
          />
        <link rel="icon" href="./favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        
        {/* <div className="relative z-50">
          <HushhButtonFromLib />
        </div> */}
        <ResponsiveSizeProvider>
          <AuthProvider>
            <header className="h-[90px] w-full absolute z-50" style={{ top: '70px' }}>
              <HeaderComponent />
            </header>
            {" "}
            <div className={`${figtree.variable}  w-full`}>
              <Providers>
                {/* Hackathon Banner - appears on all pages */}
                <HackathonBanner />
                {children}
              </Providers>
            </div>
          </AuthProvider>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
