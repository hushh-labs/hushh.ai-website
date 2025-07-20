import React from "react";
import CoreValues from "../clientside/hushhCoreValues"
import Head from "next/head";
import ContentWrapper from "../_components/layout/ContentWrapper";

export const metadata = {
  title: "Hushh | Core Values",
  description:
    "Explore Hushh's core values, leadership principles, and code of conduct. Learn how we prioritize data privacy, integrity, and innovation.",
  keywords:
    "Hushh, Core Values, Leadership Principles, Code of Conduct, Data Privacy, Integrity, Innovation, Ethical Practices, Business Partnerships",
  canonical: "https://hushh.ai/hushh-core-values",
  alternates: {
    canonical: "https://hushh.ai/hushh-core-values",
  },
  openGraph: {
    title: "Hushh | Core Values",
    description:
      "Explore Hushh's core values, leadership principles, and code of conduct. Learn how we prioritize data privacy, integrity, and innovation.",
    url: "https://hushh.ai/hushh-core-values",
    // images: [
    //   {
    //     url: "/path/to/core-values-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Core Values Image",
    //   },
    // ],
  },
};

const HushhCoreValues = () => {
  return (
    <>
    <Head>
    <title>
       Hushh | Core Values
    </title>
    <meta
      name="description"
      content="Explore Hushh's core values, leadership principles, and code of conduct. Learn how we prioritize data privacy, integrity, and innovation."
    />
    <meta
      name="keywords"
      content="Hushh, Core Values, Leadership Principles, Code of Conduct, Data Privacy, Integrity, Innovation, Ethical Practices, Business Partnerships"
    />
    <meta property="og:title" content="Join the Hushh Community" />
    <meta
      property="og:description"
      content="Explore Hushh's core values, leadership principles, and code of conduct. Learn how we prioritize data privacy, integrity, and innovation."
    />
    {/* <meta property="og:image" content="/path/to/community-og-image.jpg" /> */}
    <meta property="og:url" content="https://hushh.ai/hushh-core-values" />
    {/* Add canonical URL */}
    <link rel="canonical" href="https://hushh.ai/hushh-core-values" />
  </Head>
      <ContentWrapper includeHeaderSpacing={true}>
        <CoreValues/>
      </ContentWrapper>
    </>
  );
};

export default HushhCoreValues;
