import React from 'react'
import { siteMetadata } from '../sitemetadata'
import A2AAgentClient from '../clientside/A2AAgentClient'

export const metadata = {
  title: 'A2A Agents',
  description: 'Query Brand and Hushh agents securely from hushh.ai',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/agents`,
  },
  openGraph: {
    title: 'A2A Agents',
    description: 'Query Brand and Hushh agents securely from hushh.ai',
    url: `${siteMetadata.siteUrl}/agents`,
    images: [siteMetadata.socialBanner],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AgentsPage() {
  return (
    <A2AAgentClient />
  )
}


