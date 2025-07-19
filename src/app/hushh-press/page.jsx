import React from 'react'
import HushhPress from '../_components/hushhPress/hushhPress'
import ContentWrapper from '../_components/layout/ContentWrapper'

export const metadata = {
  title: "Hushh | Empowering Your Data Journey",
  description:
    "Discover Hushh's mission to empower individuals with data control, privacy, and wealth creation. Learn about our vision for a human-centered world, our core values, and the innovative services we offer to transform personal data into financial rewards.",
  keywords:
    "Hushh, Data Empowerment, Privacy, Personal Data, Wealth Creation, Business Growth, Mission, Vision, Core Values, Data Control, Financial Rewards, Technology, Innovation, Privacy-First, Data Monetization",
  canonical: "https://hushh.ai/hushh-press",
  alternates: {
    canonical: "https://hushh.ai/hushh-press",
  },
  openGraph: {
    title: "Hushh | Empowering Your Data Journey",
    description:
      "Discover Hushh's mission to empower individuals with data control, privacy, and wealth creation. Learn about our vision for a human-centered world, our core values, and the innovative services we offer to transform personal data into financial rewards.",
    url: "https://hushh.ai/hushh-press",
  },
};
const hushhPress = () => {
  return (
    <ContentWrapper>
      <HushhPress/>
    </ContentWrapper>
  )
}

export default hushhPress