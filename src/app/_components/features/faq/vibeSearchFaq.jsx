"use client";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { Text } from "@chakra-ui/react";

const faqData = {
  General: [
    {
      question: "What is the mission of your company?",
      answer:
        "Our company, focused on user data API (Visa for Data), aims to empower users to organize, manage, and extract meaningful value from their data. We prioritize ownership, observability, and control of user data and privacy preferences. Our mission is to help users understand the power of their personal data and turn it into a personal asset",
    },
    {
      question: "What core products and experiences does Hushh offer?",
      answer:
        "Hushh offers a range of core products and experiences, including 1-click data sharing and selling, search, chatbots, and human-assisted concierge services. These services are powered by the Hushh private on-device cloud, enabling seamless data sharing and consent management. Additionally, Hushh provides a co-branded digital magazine and private data cloud wallet with personal concierge services",
    },
    {
      question: "How does Hushh prioritize user privacy and data control?",
      answer:
        "Hushh prioritizes user privacy and data control by enabling users to hushh their data away into a secure private on-device cloud. Users can control their preferences and choices with trusted AI assistants, ensuring that their data remains secure and only accessible to authorized parties. Additionally, Hushh empowers users to monetize their data while prioritizing their privacy preferences",
    },
  ],
  " About Product": [
    {
      question: "What is VIBE Search, and how does it revolutionize shopping?",
      answer:
        "VIBE Search is a groundbreaking shopping assistant that helps users discover products matching their unique Vibe. Using AI technology, it enables users to find similar products by uploading images or providing text descriptions, simplifying the shopping experience.",
    },
    {
      question: "How does VIBE Search work without signing in?",
      answer:
        "Users can utilize VIBE Search without signing in by simply installing the app and starting to use it. They can upload images or provide text descriptions to initiate personalized product searches effortlessly.",
    },
    {
      question:
        "What options does VIBE Search offer for personalized searches?",
      answer:
        "VIBE Search allows users to provide preferences such as sizing, color choices, and images for more tailored search results. These prompts are used for personalized searches, ensuring users find products that resonate with their unique style and preferences.",
    },
    
    {
      question: "How does VIBE Search ensure user privacy and data security?",
      answer:
        "VIBE Search prioritizes user privacy by not capturing personal data, even with user consent. It employs advanced security measures such as encrypting data during transmission and storage, removing user identity from shared data, and not storing uploaded images.",
    },
    {
      question:
        "What features does VIBE Search offer for product discovery and comparison?",
      answer:
        "VIBE Search provides users with options to explore products from various brands, compare different products and brands, and filter results based on pricing and preferences. It also offers budget options to help users find products within their budget range.",
    },
    {
      question: "How can users get started with VIBE Search?",
      answer:
        "Users can get started with VIBE Search by signing up for an account, providing basic information, and optionally connecting their Hushh Wallet App. Once set up, they can upload images or provide text descriptions to initiate personalized product searches and enjoy the benefits of instant shopping satisfaction.",
    },
  ],
  "Pricing Plan": [
    {
      question: "Pro",
      answer:
        "More advanced features including comprehensive data organization and management tools. Expanded API access for seamless integration with CRM systems or apps. Increased transaction volume and user consent APIs. Priority support and assistance. Suitable for growing agents or businesses requiring more robust data management and integration capabilities.",
    },
    {
      question: "Premium",
      answer:
        "All features included in the Pro Plan. Enhanced analytics tools for deeper insights into user data and preferences. Advanced marketing solutions such as consent-based ads and personalized recommendations. Expanded transaction volume and user consent APIs. Customizable options for tailored solutions. Priority support and dedicated account management. Suitable for established agents or businesses looking to optimize their data monetization strategies and improve customer engagement.",
    },
    {
      question: "Ultra",
      answer:
        "All features included in the Premium Plan. Bespoke enterprise solutions tailored to specific business needs. Unlimited transaction volume and user consent APIs. Advanced security features and compliance tools for maximum data protection. Access to exclusive updates and new features. Personalized training sessions and workshops. Dedicated technical support team. Suitable for large enterprises or businesses with complex data monetization requirements.",
    },
  ],
  Services: [
    {
      question: "What are the primary services offered by Hushh?",
      answer:
        "Hushh offers a range of services including Hushh Browser Companion for tracking and managing online activity, Hushh Wallet App for controlling personal data and monetization, Hushh Button for seamless personalization, Hushh Developer APIs for secure data integration, Valet Chat for financial management, Hushh Concierge App for luxury experiences, and Hushh Jobs for recruitment innovation.",
    },
    {
      question: "What are the benefits of signing in to VIBE Search?",
      answer:
        "By signing in, users can connect their Hushh Wallet App to VIBE Search, enabling access to personalized results based on their stored VIBE data. They can also create wishlists, send data to the Hushh Wallet App for monetization, and enjoy enhanced features for a more customized shopping experience.",
    },
    {
      question: "How does Hushh Browser Companion protect user privacy?",
      answer:
        "Hushh Browser Companion protects user privacy by allowing users to track their own browsing activity without sharing data with third-party trackers. It gives users complete control over what data to collect and ensures transparency in data sharing practices.",
    },
    {
      question: "What is the purpose of Hushh Wallet App?",
      answer:
        "Hushh Wallet App is designed to empower users by putting them in control of their digital identity and personal data. It allows users to aggregate and manage data from various sources, including phone data, data companies, and shopping brands. Users can personalize their experiences, get rewarded for sharing data, and sell data to trusted brands and agencies.",
    },
    {
      question: "How does the Hushh Button benefit both customers and brands?",
      answer:
        "The Hushh Button facilitates seamless personalization for both customers and brands. For customers, it syncs preferences, past purchases, and sizing information with brands, offering a personalized shopping experience. For brands, it provides access to valuable data from Hushh users who opt-in, allowing for personalized product recommendations and marketing campaigns.",
    },
    {
      question: "What role do Hushh Developer APIs play in data integration?",
      answer:
        "Hushh Developer APIs enable secure, trusted, and incentivized data integration for businesses and organizations. They empower developers to seamlessly integrate customers’ data into CRM systems and applications, ensuring compliance with privacy laws and regulations. With Hushh APIs, developers can create personalized services aligned with user preferences and consent.",
    },
  ],
  Contact: [
    {
      question: "How you can reach out to us ?",
      answer: "info@hush1one.com",
    },
    {
      question: "Contact Number",
      answer: "call (888) 462-1726",
    },
    {
      question:"Headquarters",
      answer:"Kirkland, WA"
    }
  ],
};

export default function vibeSearchFaq() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    setActiveAccordionIndex(null);
  };

  const handleToggle = (index) => {
    setActiveAccordionIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
  };

  const handleAccordionChange = (index) => {
    setActiveAccordionIndex((activeIndex) =>
      activeIndex === index ? null : index,
    );
  };

  return (
    <Box py={{ md: 10, base: "2rem" }} px={{ md: "10rem", base: "2rem" }}>
      <Text
        className={"gradient"}
        fontWeight={"400"}
        fontSize={{ md: "3.75rem", base: "2rem" }}
        lineHeight={{ md: "75px", base: "46px" }}
        mb={8}
        textAlign="left"
      >
        Frequently Asked Questions
      </Text>
      <Box display={"flex"} w={"100%"}>
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          variant="soft-rounded"
          colorScheme="purple"
        >
          <TabList mb="1em" display={{ base: "block", md: "flex" }}>
            {Object.keys(faqData).map((category, index) => (
              <Tab
                key={category}
                color={"white"}
                className={index === tabIndex ? "gradientText" : ""}
                _selected={{
                  color: "transparent",
                  sx: {
                    backgroundImage:
                      "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                  _after: {
                    content: '""',
                    display: "block",
                    height: "2px",
                    background:
                      "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                    borderRadius: "2px",
                  },
                }}
              >
                {category}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {Object.keys(faqData).map((category, index) => (
              <TabPanel p={4} key={category}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                  {faqData[category].map((faq, faqIndex) => (
                    <Accordion
                      allowToggle
                      key={faqIndex}
                      index={activeAccordionIndex === faqIndex ? 0 : null}
                      onChange={() => handleAccordionChange(faqIndex)}
                    >
                      <AccordionItem
                        key={faqIndex}
                        borderRadius={"8px"}
                        border={0}
                        bg={"#141414"}
                        mb={4}
                      >
                        {({ isExpanded }) => (
                          <>
                            <div>
                              <AccordionButton _expanded={{ bg: "#27272a" }}>
                                <Box
                                  as="span"
                                  color={"#CFD3D7"}
                                  flex="1"
                                  textAlign="left"
                                >
                                  {faq.question}
                                </Box>
                                {isExpanded ? (
                                  <MinusIcon fontSize="12px" />
                                ) : (
                                  <AddIcon fontSize="12px" />
                                )}
                              </AccordionButton>
                            </div>
                            <AccordionPanel pb={4} color={"#A2A9B0"}>
                              {faq.answer}
                            </AccordionPanel>
                          </>
                        )}
                      </AccordionItem>
                    </Accordion>
                  ))}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
