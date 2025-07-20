import React from 'react'
import HushhHackhathon from '../../clientside/HushhHackhathon'
import Image from 'next/image';
import Head from 'next/head';
import ContentWrapper from '../../_components/layout/ContentWrapper';
// import OGImage from '../../../public/OG/daraNexusOG.png';

export const metadata = {
  title: "Hushh | Data Nexus Hackathon",
  description:
    "Participate in the Hushh Data Nexus Hackathon on hushh.ai. Explore innovative solutions using emerging technologies.",
  keywords:
    "HUSHH, Hackathon Submission, Data Nexus, hushh hackathon, hushh.ai, project upload, project submission, assignment submission, hackathon submission, Hushh Data Nexus, Extended Reality, IoT, Internet of Things, Blockchain, 3D Modelling, Metaverse, AI, Emerging Technologies",
  canonical: "https://hushh.ai/pda/iithackathon",
  alternates: {
    canonical: "https://hushh.ai/pda/iithackathon",
  },
  openGraph: {
    title: "Hushh | Data Nexus Hackathon",
    description:
      "Participate in the Hushh Data Nexus Hackathon on hushh.ai. Explore innovative solutions using emerging technologies.",
    url: "https://hushh.ai/pda/iithackathon",
    // images: [
    //   {
    //     url: "/path/to/hackathon-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Hackathon Image",
    //   },
    // ],
  },
};

const page = () => {

  
  return (
    <>
    <Head>
    <title>
    Hushh | Data Nexus Hackhathon
    </title>
    <meta
      name="description"
      content="hackathon data nexus project on hushh.ai"
    />
    <meta
      name="keywords"
      content="Hushh Community, Luxury Sales, Data Empowerment, Customer Insights, Personalized Communication, Ethical Data Collection, High-Value Customers, Sales Agents, Innovative Platform"
    />
    <meta property="og:title" content="Hushh | Data Nexus Hackhathon" />
    <meta
      property="og:description"
      content="Hackathon data nexus project on hushh.ai"
    />
  </Head>
   <ContentWrapper>
     <HushhHackhathon/>
   </ContentWrapper>
   </>
  )
}

export default page