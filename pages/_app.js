import React from "react";
import ClientSideLayout from "./client";
import { SessionProvider } from "next-auth/react";
import { ApiKeyProvider } from "../src/app/context/apiKeyContext";
import './globals.css';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
    variable: '--font-figtree',
    fallback: [
      "-apple-system", 
      "BlinkMacSystemFont", 
      "Segoe UI", 
      "Roboto", 
      "Oxygen", 
      "Ubuntu", 
      "Cantarell", 
      "Fira Sans", 
      "Droid Sans", 
      "Helvetica Neue", 
      "sans-serif"
    ],
    preload: true,
    adjustFontFallback: true,
  });

export default function MyApp({ Component, pageProps }) {
    return <ClientSideLayout>
        <SessionProvider>
            <ApiKeyProvider>
            <div className={`${figtree.className} ${figtree.variable}`}>
        <Component {...pageProps}/>
        </div>
        </ApiKeyProvider>
        </SessionProvider>
        </ClientSideLayout>
}
