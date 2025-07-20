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
      question:
        "What makes the Hushh Concierge App unique in the luxury service industry?",
      answer:
        "The Hushh Concierge App revolutionizes luxury experiences by combining voice commands, AI technology, and real-time data. Unlike traditional concierge services, Hushh prioritizes your needs over just your preferences, offering effortless service and personalized recommendations tailored to your specific requirements.",
    },
    {
      question:
        "How does the Hushh Concierge App simplify the process of accessing luxury services?",
      answer:
        "With the Hushh Concierge App, accessing luxury services is as simple as speaking your request. The app translates your voice commands into actionable tasks, eliminating the need for tedious searches or form-filling. Whether you're requesting bespoke itineraries, private jet charters, or exclusive tours, Hushh makes the process effortless.",
    },
    {
      question:
        "What sets Hushh apart in terms of personalized recommendations?",
      answer:
        "Hushh goes beyond traditional concierge services by analyzing not just your preferences, but your intent. By understanding your specific needs, Hushh delivers personalized recommendations that truly match your requirements, ensuring an unparalleled luxury experience tailored to you.",
    },
    {
      question:
        "How does the Hushh Concierge App ensure immediate responses to user requests?",
      answer:
        "With Hushh, you can expect real-time responses to your requests from top-tier service providers who compete for your attention. This ensures that you receive prompt and efficient service, without any delays, enhancing the overall luxury experience. ",
    },
    {
      question:
        "How does Hushh prioritize user privacy and confidentiality?        ",
      answer:
        "At Hushh, user privacy and confidentiality are paramount. Your identity and preferences are kept confidential, with requests shared anonymously with relevant service providers. This ensures discretion and peace of mind while using the app to access luxury services.",
    },
    {
      question:
        "What exclusive opportunities does the Hushh Concierge App offer to its users?        ",
      answer:
        "Hushh users gain access to exclusive deals and hidden gem recommendations that are unavailable elsewhere. By engaging with the app, users can earn Hushh coins, redeemable for exclusive benefits, further enhancing their luxury experience.",
    },
    {
      question: "In which areas does Hushh cater to its users' needs?",
      answer:
        "Hushh caters to a wide range of needs across various domains, including travel, events, and lifestyle services. Whether you require bespoke travel itineraries, VIP access to events, or personalized lifestyle services such as personal shopping and home management, Hushh has you covered.",
    },
    {
      question:
        "How does Hushh empower its users in the luxury service industry?",
      answer:
        "Unlike traditional service models where users seek services, Hushh flips the script by making services seek users. This puts users in control of their luxury experience, empowering them to access the services they desire on their terms. Powered by AI, Hushh delivers real-time matching with the right service providers, ensuring a seamless and rewarding experience for users.",
    },
    {
      question: "How does Hushh prioritize user privacy and data control?",
      answer:
        "Hushh prioritizes user privacy and data control by enabling users to hushh their data away into a secure private on-device cloud. Users can control their preferences and choices with trusted AI assistants, ensuring that their data remains secure and only accessible to authorized parties. Additionally, Hushh empowers users to monetize their data while prioritizing their privacy preferences",
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
      question:
        "What sets Browser Companion apart from other tracking tools?",
      answer:
        "Hushh Browser Companion stands out from other tracking tools by prioritizing user privacy and data control. Unlike third-party trackers that exploit user data for targeted advertising, Hushh gives users complete control over their data and enables them to track their own browsing activity for their own benefit.",
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

const ConciergeFaq = () => {
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
};

export default ConciergeFaq;
