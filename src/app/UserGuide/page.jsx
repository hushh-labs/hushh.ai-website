import React from "react";
import ContactForm from "../_components/features/contactForm";
import AboutFaq from "../_components/features/faq/aboutFaq";
import UserGuide from "../clientside/UserGuide";
import ContentWrapper from "../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh | User Guide Walkthrough",
  description:
    "Manage your data with Hushh with ease and GenAI. Explore our comprehensive user guide to optimize your Hushh experience.",
  keywords:
    "Hushh User Guide, Data Management, GenAI, Hushh Account, Brand Cards, General Cards, Card Features, Receipt Radar, Hushh Bot, Profile Settings, Data Control, Personalized Experience",
  canonical: "https://hushh.ai/UserGuide",
  alternates: {
    canonical: "https://hushh.ai/UserGuide",
  },
  openGraph: {
    title: "Hushh | User Guide Walkthrough",
    description:
      "Manage your data with Hushh with ease and GenAI. Explore our comprehensive user guide to optimize your Hushh experience.",
    url: "https://hushh.ai/UserGuide",
    // images: [
    //   {
    //     url: "/path/to/user-guide-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh User Guide Image",
    //   },
    // ],
  },
};

const userGuide = () => {
 

  return (
  <>  
    <ContentWrapper includeHeaderSpacing={true}>
      <UserGuide/>
      <AboutFaq/>
      <ContactForm/>
    </ContentWrapper>
  </>  
  );
};

export default userGuide;
