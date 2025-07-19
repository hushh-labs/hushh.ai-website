import React from 'react'
import HushhCommunity from '../clientside/HushhCommunity'
import Head from 'next/head';
import ContentWrapper from '../_components/layout/ContentWrapper';


export const metadata = {
  title: "Join the Hushh Community | Revolutionizing Luxury Sales",
  description:
    "Join the Hushh Community to revolutionize luxury sales. Empower agents and delight customers with our innovative platform.",
  keywords:
    "Hushh Community, Luxury Sales, Data Empowerment, Customer Insights, Personalized Communication, Ethical Data Collection, High-Value Customers, Sales Agents, Innovative Platform",
  canonical: "https://hushh.ai/hushh-community",
  alternates: {
    canonical: "https://hushh.ai/hushh-community",
  },
  openGraph: {
    title: "Join the Hushh Community",
    description:
      "Join the Hushh Community to revolutionize luxury sales. Empower agents and delight customers with our innovative platform.",
    url: "https://hushh.ai/hushh-community",
    // images: [
    //   {
    //     url: "/path/to/community-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Community Image",
    //   },
    // ],
  },
};

const hushhCommunity = () => {

  return (
    <>
       <Head>
    <title>
      Join the Hushh Community | Revolutionizing Luxury Sales
    </title>
    <meta
      name="description"
      content="Join the Hushh Community to revolutionize luxury sales. Empower agents and delight customers with our innovative platform."
    />
    <meta
      name="keywords"
      content="Hushh Community, Luxury Sales, Data Empowerment, Customer Insights, Personalized Communication, Ethical Data Collection, High-Value Customers, Sales Agents, Innovative Platform"
    />
    <meta property="og:title" content="Join the Hushh Community" />
    <meta
      property="og:description"
      content="Join the Hushh Community to revolutionize luxury sales. Empower agents and delight customers with our innovative platform."
    />
    <meta property="og:url" content="https://hushh.ai/hushh-community" />
    <link rel="canonical" href="https://hushh.ai/hushh-community" />
  </Head>
      <ContentWrapper includeHeaderSpacing={true}>
        <HushhCommunity/>
      </ContentWrapper>
    </>
  )
}

export default hushhCommunity