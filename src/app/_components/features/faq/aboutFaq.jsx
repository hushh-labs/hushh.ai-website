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
import { Text } from "@chakra-ui/react";
import { useState } from "react";

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
      question: "What services does Hushh Browser Companion offer?",
      answer:
        "Hushh Browser Companion empowers users to take control of their digital footprint by providing tools to track, manage, and monetize their browsing activity. It allows users to track their browsing activity, choose what data to collect, track interests over time, export data, and sell data responsibly",
    },
    {
      question: "How does Hushh Browser Companion work?",
      answer:
        "Hushh Browser Companion works by giving users complete control over their online data. It tracks browsing activity, allows users to select the data they want to capture, tracks interests over time, and provides options to export and monetize data. Additionally, it ensures user privacy and transparency in data sharing practices.",
    },
    {
      question: "How does Hushh Browser Companion protect user privacy?",
      answer:
        "Hushh Browser Companion protects user privacy by allowing users to track their own browsing activity without sharing data with third-party trackers. It gives users complete control over what data to collect and ensures transparency in data sharing practices.",
    },
    {
      question: "What are the key features of Hushh Browser Companion?",
      answer:
        "The key features of Hushh Browser Companion include tracking browsing activity, choosing what data to collect, tracking interests over time, exporting data, and selling data responsibly. It empowers users to take control of their digital footprint and make informed choices about their online behavior.",
    },
    {
      question:
        "How does Hushh Browser Companion help users gain insights into their online behavior?",
      answer:
        "Hushh Browser Companion helps users gain insights into their online behavior by providing tools to track and analyze browsing activity. Users can see exactly what data is being collected about them, including search queries, brand interactions, interests, preferences, likes, and clicks.",
    },
    {
      question:
        "What sets Hushh Browser Companion apart from other tracking tools?",
      answer:
        "Hushh Browser Companion stands out from other tracking tools by prioritizing user privacy and data control. Unlike third-party trackers that exploit user data for targeted advertising, Hushh gives users complete control over their data and enables them to track their own browsing activity for their own benefit.",
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
    {
      question:
        "What sets Hushh Browser Companion apart from other tracking tools?",
      answer:
        "Hushh Browser Companion stands out from other tracking tools by prioritizing user privacy and data control. Unlike third-party trackers that exploit user data for targeted advertising, Hushh gives users complete control over their data and enables them to track their own browsing activity for their own benefit.",
    },
  ],
  Contact: [
    {
      question: "How you can reach out to us ?",
      answer: "sales@hushh.ai",
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

export default function AboutFaq() {
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
    <Box
      py={{ md: "6.5rem", base: "2rem" }}
      px={{ md: "10rem", base: "2rem" }}
      bg={"#060606"}
    >
      <Box display={"flex"} w={"100%"}>
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          variant="soft-rounded"
          colorScheme="purple"
          width={"full"}
        >
          <div className="md:flex items-end justify-between w-full mb-4 md:mb-[3.125rem] md:px-4">
            <div className="mb-8 md:mb-0 md:w-[29rem]">
              <Text
                className={"gradient"}
                fontWeight={"400"}
                fontSize={{ md: "3.75rem", base: "2rem" }}
                lineHeight={{ md: "75px", base: "46px" }}
                textAlign="left"
              >
                Frequently Asked Questions
              </Text>
            </div>
            <div className=" md:pb-8">
              <TabList display={{ base: "block", md: "flex" }}>
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
            </div>
          </div>

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
