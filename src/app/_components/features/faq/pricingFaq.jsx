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
      question:
        "How Does Hushh Intend to Overcome User Privacy Concerns While Monetizing Personal Data ?",
      answer:
        "At Hushh, our core philosophy is that user privacy isn't just paramount; it's non-negotiable. We're pioneering a model where monetization and privacy coexist by leveraging AI and blockchain technologies. Our platform anonymizes and encrypts personal data, ensuring that users retain complete control over their information. Users can opt-in to share anonymized data insights with trusted brands, creating a consent-based ecosystem. This approach not only addresses privacy concerns but also fosters a transparent, ethical environment for data sharing, setting a new standard for how personal data is treated.",
    },
    {
      question:
        "With Tech Giants Dominating the Data and AI Space, How Will Hushh Differentiate Itself and Capture Market Share?",
      answer:
        "While it's true that tech giants have laid the groundwork in data and AI, Hushh is not just entering the space; we're redefining it. Our differentiation lies in our user-centric approach—turning personal data into personal wealth. Unlike platforms that treat user data as their asset, we empower users to own, manage, and monetize their data. This isn’t just a product; it’s a movement towards data democracy. Furthermore, our partnerships with academic institutions and cutting-edge technology use, such as edge AI for real-time insights and blockchain for secure transactions, place us at the forefront of the personal data revolution. We’re not just competing; we’re changing the rules of the game.",
    },
    {
      question:
        "How Does Hushh Plan to Achieve Scalability and Sustain Long-term Growth, Especially Considering the Rapidly Evolving Tech Landscape?",
      answer:
        "Scalability and sustained growth are at the heart of Hushh’s strategy. We're leveraging cloud infrastructure and AI to ensure our platform can scale globally while maintaining high performance and security standards. Our growth strategy encompasses a broad spectrum of users—from everyday consumers to influencers and brands—creating a diverse ecosystem. We're also investing in continuous innovation, staying ahead of technological advancements to ensure Hushh remains at the cutting edge. Our model is designed to adapt and thrive amidst changes in the tech landscape, ensuring long-term relevance and growth. Moreover, by fostering a community of developers around Hushh’s API ecosystem, we're ensuring continuous innovation and engagement, driving the platform’s evolution and adoption. These responses aim to highlight Hushh's unique value proposition, its innovative approach to privacy and data monetization, and its strategic plans for scalability and sustainability in the fast-paced tech environment.",
    },
  ],
  " About Product": [
    {
      question: "What is hushh for students?",
      answer:
        "Hushh for students is a revolutionary software designed to empower students by allowing them to assign a value to their data. It facilitates a secure and seamless data exchange between students and businesses.",
    },
    {
      question: "How does hushh for students empower students?",
      answer:
        "Hushh for students empowers students by giving them control over their data. They can set a value for their data, securely exchange it with businesses, and earn rewards for each successful transaction.",
    },
    {
      question: "What problem does hushh for students solve?",
      answer:
        "Hushh for students addresses the lack of awareness among students regarding the value of their data. It also helps students capitalize on their interactions with businesses and receive benefits in return.",
    },
    {
      question: "What are the key features of hushh for students?",
      answer:
        "The key features include data value setting, secure data exchange, and a rewards and points system. These features empower students to control their data, facilitate secure transactions, and earn rewards.",
    },
    {
      question: "How does hushh for students benefit students?",
      answer:
        "Hushh for students benefits students by empowering them through control over their data and providing opportunities to earn rewards. It also fosters a mutually beneficial relationship between students and businesses.",
    },
    {
      question: "How does hushh for students benefit businesses?",
      answer:
        "Hushh for students benefits businesses by providing access to valuable student data for targeted initiatives. It also ensures a seamless and secure data exchange process, fostering trust and transparency.",
    },
    {
      question: "What sets hushh for students apart from other platforms?",
      answer:
        "Hushh for students stands out by prioritizing user privacy, data control, and transparency. Unlike other platforms, it empowers students to realize the value of their data and rewards them for their participation.",
    },
    {
      question: "What are the success metrics for hushh for students?",
      answer:
        "Key metrics include the number of successful data transactions per month, increase in student engagement, reduction in friction points during transactions, and percentage increase in user downloads.",
    },
    {
      question: "What is the purpose of Hushh Wallet App?",
      answer:
        "Hushh Wallet App is designed to empower users by putting them in control of their digital identity and personal data. It allows users to aggregate and manage data from various sources, including phone data, data companies, and shopping brands. Users can personalize their experiences, get rewarded for sharing data, and sell data to trusted brands and agencies.",
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
      question: "What sets hushh for students apart from other platforms?",
      answer:
        "Hushh for students stands out by prioritizing user privacy, data control, and transparency. Unlike other platforms, it empowers students to realize the value of their data and rewards them for their participation.",
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

export default function PricingFaq() {
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
