import React from "react";
import ClientConciergeApp from "../../clientside/ConciergeApp";
import ContentWrapper from "../../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh | Concierge App - get luxury experience",
  description:
    "Speak Your Wish Get Transformed Luxury Redefined Experiences with our GenAI product",
  keywords:
    "HUSHH, Experience Luxury, Redefined , transforms luxury experiences through the power of voice, AI and Real time data, traditional concierge services,  prioritizes your needs, not just your preferences with Gen AI, Effortless Service​, Personalized Recommendations​​​, Real-Time Responses, Discretion and Privacy​​​, Exclusive Opportunities​, Travel, Events, Lifestyle, VIP access to high-profile events, private viewings, red carpet experiences, Personal shopping, home management, day-to-day errands, specialized requests, Bespoke itineraries, private jet charters, exclusive tours, Receipt Radar revolutionizes the way you handle receipts, automatic scanning, smart categorization, customizable options, managing expenses",
    canonical: "https://hushh.ai/products/concierge-app",
    alternates: {
      canonical: "https://hushh.ai/concierge-app",
    },
    openGraph: {
      title: "Hushh | Concierge App - Get Luxury Experience",
      description:
        "Speak Your Wish and Get Transformed Luxury Redefined Experiences with our GenAI product.",
      url: "https://hushh.ai/products/concierge-app",
      type: "website",
      // images: [
      //   {
      //     url: "/path/to/concierge-app-og-image.jpg",
      //     width: 800,
      //     height: 600,
      //     alt: "Hushh Concierge App Image",
      //   },
      // ],
    },  
};

const conciergeApp = () => {
  return (
    <>
      <ContentWrapper includeHeaderSpacing={true}>
        <ClientConciergeApp />
      </ContentWrapper>
    </>
  );
};

export default conciergeApp;
