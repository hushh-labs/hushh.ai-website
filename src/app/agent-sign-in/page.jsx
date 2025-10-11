import React from 'react'
import { siteMetadata } from '../sitemetadata'
import AgentSignInClient from '../clientside/AgentSignInClient'

export const metadata = {
  title: 'Agent Profile Analysis - Sign In',
  description: 'Analyze your profile across all Hushh agents securely',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/agent-sign-in`,
  },
  openGraph: {
    title: 'Agent Profile Analysis - Sign In',
    description: 'Analyze your profile across all Hushh agents securely',
    url: `${siteMetadata.siteUrl}/agent-sign-in`,
    images: [siteMetadata.socialBanner],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AgentSignInPage() {
  return (
    <AgentSignInClient />
  )
}

