import React from 'react'
import OutBoundService from '../clientside/OutBoundService';
import ContentWrapper from '../_components/layout/ContentWrapper';

export const metadata = {
  title: "Hushh | Expert Advisory Services for AI and Data Technologies",
  description:
    "Explore Hushh's outbound services offering expert advisory consultations in AI, data architecture, and related technologies. Get the guidance you need for business growth and innovation.",
  keywords:
    "Hushh, Outbound Services, Expert Advisory, AI, Data Technologies, Business Growth, Innovation, Consultation, Data Architecture, Manish Sainani, Justin Donaldson",
  canonical: "https://hushh.ai/outbound-services",
  alternates: {
    canonical: "https://hushh.ai/outbound-services",
  },
  openGraph: {
    title: "Hushh | Expert Advisory Services for AI and Data Technologies",
    description:
      "Explore Hushh's outbound services offering expert advisory consultations in AI, data architecture, and related technologies. Get the guidance you need for business growth and innovation.",
    url: "https://hushh.ai/outbound-services",
    // images: [
    //   {
    //     url: "/path/to/outbound-services-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Outbound Services Image",
    //   },
    // ],
  },
};


const outBoundServie = () => {
  return (
    <ContentWrapper includeHeaderSpacing={true}>
      <OutBoundService/> 
    </ContentWrapper>
  )
}

export default outBoundServie