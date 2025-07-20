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
      question: "How does Hushh stay current with the rapidly evolving AI landscape?",
      answer:
        "Our team is committed to continuous learning and stays at the forefront of AI advancements through ongoing research, participation in industry conferences, and close relationships with key players in the AI ecosystem.",
    },
    {
      question: "We have a unique problem that doesn't seem to fit into standard AI applications. Can Hushh still help?",
      answer:
        "Yes, we specialize in tackling unique and complex challenges. Our team's diverse expertise allows us to approach problems creatively and develop custom solutions tailored to your specific needs.",
    },
    {
      question: "How quickly can Hushh start working with us?",
      answer:
        "Our response time depends on our current workload and the nature of your project. For urgent matters, we strive to provide initial consultations within a few business days. For larger projects, we'll work with you to establish a timeline that meets your needs.",
    },
    
  ],

  'Out Bound Faq': [
    {
      question: "What makes Hushh different from other AI consulting firms?",
      answer:
        "Hushh stands out due to our team's deep expertise in both the technical and strategic aspects of AI and data science. Our founders' experience at leading tech companies like Google, Splunk, Microsoft, Salesforce etc, combined with our hands-on approach and commitment to tailored solutions, allows us to provide uniquely valuable insights and practical guidance.",
    },
    {
      question: "What types of companies can benefit from Hushh's consulting services?",
      answer:
        "Hushh's services are valuable for a wide range of companies, from startups to established enterprises, that are looking to implement or optimize their AI and data strategies. We work with businesses across various industries, including tech, finance, insurance, retail, and more.",
    },
    {
      question: "How long does a typical consultation last?",
      answer:
        "Our consultations can range from short 0.5-1 hour sessions for specific queries to longer engagements for complex projects. We tailor our services to meet your specific needs and timeline.",
    },
    {
      question: "Can Hushh help us choose the right AI model for our specific use case?",
      answer:
        "Absolutely. Our team, led by Manish Sainani, has extensive experience in evaluating and selecting appropriate AI models, including LLMs and SLMs, for various applications. We consider factors such as your specific use case, performance requirements, and resource constraints to recommend the best solution",
    },
    {
      question: "We're new to AI. Can Hushh help us get started?",
      answer:
        "Yes, we specialize in helping companies at all stages of their AI journey. For those just starting, we can provide guidance on initial AI strategy, infrastructure setup, and identifying the most impactful use cases for your business",
    },
    {
      question: "Does Hushh offer ongoing support after the initial consultation?",
      answer:
        "Yes, we offer flexible engagement models, including ongoing support and advisory services. We can work with you to determine the best support structure based on your project needs and internal capabilities",
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

export default function OutboundFaq() {
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
