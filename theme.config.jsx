'use client'
import React from 'react'
import Link from 'next/link'
import { useConfig } from 'nextra-theme-docs'
import MDXComponents from './src/app/_components/developerApiContent/page'
import remarkGfm from 'remark-gfm'
import MyLogo from './src/app/developerApi/userLogo'

const DocsNavbar = ({ flatDirectories = [] }) => {
  const { search } = useConfig()

  return (
    <div className="docs-nav-shell">
      <div className="docs-nav">
        <div className="docs-nav-left">
          <Link href="/developerApi" className="docs-brand">
            <span className="docs-brand-mark">Hushh</span>
            <span className="docs-brand-tag">Developer Docs</span>
          </Link>
          <div className="docs-nav-links">
            <Link href="/developer-Api/on-boarding">Get started</Link>
            <Link href="/developer-Api/rootEndpoints">API reference</Link>
            <Link href="/developer-Api/use-cases">Use cases</Link>
          </div>
        </div>
        <div className="docs-nav-center">
          {search?.component && (
            <search.component className="docs-search" directories={flatDirectories} />
          )}
        </div>
        <div className="docs-nav-right">
          <Link href="/developerApi/login" className="docs-nav-link">
            Console
          </Link>
          <Link href="/developer-Api/on-boarding" className="docs-cta">
            Get API keys
          </Link>
          <MyLogo />
        </div>
      </div>
    </div>
  )
}

export default {
  logo: (
    <span className="docs-logo">
      Hushh <em>Developer Docs</em>
    </span>
  ),
  nextThemes: {
    defaultTheme: "light", // Set the default theme to light
    forcedTheme: "light",  // Force light mode regardless of system preference
    disableSwitch: true,   // Hide the theme switch option
  },
  navbar: {
    component: DocsNavbar
  },
  darkMode: false,
  primaryHue: {
    light: 204,
    dark: 204,
  },
  primarySaturation: {
    light: 90,
    dark: 90,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true,
  },
  toc: {
    float: true,
    title: "On this page",
  },
  navigation: true,
  project: {
    link: '/developerApi/login',
    icon: <MyLogo />,
  },

  footer: {
     text: null,
     Component: null,
  },

  feedback: { 
    content: "To know more about Hushh Developer API", 
    label: 'Learn More', 
    link: '/products/developerApi'
  }, 

  editLink: { text: null },

  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Hushh Developer API" />
      <meta property="og:description" content="Secure way of relaying personal information" />
    </>
  ),

  docsRepositoryBase: 'https://hushh.gitbook.io/hushh-docs',

  content: {
    components: MDXComponents,
  },

  markdown: {
    remarkPlugins: [remarkGfm],
  },
}
