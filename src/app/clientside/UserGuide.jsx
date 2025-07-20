"use client";
import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ContentWrapper from "../_components/layout/ContentWrapper";
import { useState } from "react";
import AttachingCards from "../_components/userGuide/attachingCards";
import BrandCardPreferences from "../_components/userGuide/brandCardPreferences";
import ExpandingHushh from "../_components/userGuide/expandingHushh";
import EnhancingHushh from "../_components/userGuide/enhancingHushh";
import HushhAccount from "../_components/userGuide/hushhAccount";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BrandCards from "../_components/userGuide/brandCards";
import GeneralCards from "../_components/userGuide/generalCards";
import CardFeatures from "../_components/userGuide/cardFeatures";
import ReceiptRadar from "../_components/userGuide/receiptRadar";
import HushhBot from "../_components/userGuide/hushhBot";
import ProfileSettings from "../_components/userGuide/profileSettings";
import DiscoverySettings from "../_components/userGuide/discoverySettings";
import SendFeedback from "../_components/userGuide/sendFeedback";
import ContactForm from "../_components/features/contactForm";
import AboutFaq from "../_components/features/faq/aboutFaq";

const guideContent = [
  {
    subheadings: [
      {
        title: "Create a Hushh Account",
        component: <HushhAccount />,
      },
      {
        title: "Brand Cards - Tailor Your Luxury Experiences",
        component: <BrandCards />,
      },
      {
        title: "General Cards - Customize Your Everyday Interactions",
        component: <GeneralCards />,
      },
      {
        title:
          "Card Features: Share Your Vibe and Manage Your Card - Optimize Your Hushh Card Experience",
        component: <CardFeatures/>,
      },
      {
        title:
          "Attaching Cards for Enhanced Experiences - Link Your Preference and Brand cards",
        component: <AttachingCards />,
      },
      {
        title: "Receipt Radar - Effortlessly Organize Your Transactions",
        component: <ReceiptRadar />,
      },
      {
        title: "Hushh Bot - Your Personal Data and Understanding Valet",
        component: <HushhBot />,
      },
      {
        title: "Profile and Account Settings - Manage Your Hushh Experience",
        component: <ProfileSettings />,
      },




      // {
      //   title: "Expanding the Hushh Ecosystem — The Innovation Beyond",
      //   component: <ExpandingHushh/>,
      // },
      // {
      //   title:
      //     "Enhancing the Core of Hushh — The Convergence of Luxury and Technology",
      //   component: <EnhancingHushh />,
      // },
      
      // {
      //   title:
      //     "Attaching Cards for Enhanced Experiences - Link Your Preferences and Brands for Unforgettable Interactions",
      //   component: <BrandCardPreferences />,
      // },
      // {
      //   title: "Discovery Settings - Adjust Your Visibility and Connectivity",
      //   component: <DiscoverySettings />,
      // },
      // {
      //   title: "Send feedback",
      //   component: <SendFeedback />,
      // },
    ],
  },
];

const UserGuide = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleSubheadingClick = (component) => {
    // setSelectedContent(content);
    setSelectedComponent(component);
  };
  
  useEffect(() => {
    if (selectedComponent) {
      // Push state only if a component is selected
      window.history.pushState({ selectedComponent: true }, '');
    }

    // Event listener to handle browser navigation
    const handlePopState = (event) => {
      if (event.state?.selectedComponent) {
        // If the popstate event was triggered by our pushState, reset the selectedComponent
        setSelectedComponent("");
      }
    };

    // Add event listener on mount
    window.addEventListener('popstate', handlePopState);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedComponent]);


  const handleBackClick = () => {
    setSelectedComponent(""); // Reset to show the list of titles
  };

  return (
  <>  
    <ContentWrapper>
      <Box p={6} w={"100%"}>
        {!selectedComponent ? (
          <Stack px={{ md: "2rem", base: "0" }}>
          <Heading
            as="h1"
            mb={{md:6,base:0}}
            fontWeight={"700"}
            fontSize={{ md: "5rem", base: "2.25rem" }}
            lineHeight={{ md: "76px", base: "40px" }}
            className="gradient"
          >
            A Guide To Our {" "}<span className="new-gradient">Hushh</span> 
          </Heading>
          <VStack
            align="start"
            spacing={6} // Increase spacing between elements
            p={{md:4,base:0}} // Padding for the VStack
          >
            {guideContent.map((section, index) => (
              <Box key={index} p={4}>
                {" "}
                {/* Add padding to each section */}
                {section.subheadings.map((sub, subIndex) => (
                  <>
                  
                    <Text
                      key={subIndex}
                      cursor="pointer"
                      color={"white"}
                      fontSize={{ md: "1.25rem", base: "0.8rem" }}
                      fontWeight={"400"}
                      py={{ md: 3, base: 1 }} // Padding below the text
                      onClick={() => handleSubheadingClick(sub.component)} // Event handler for clicks
                      _hover={{
                        background:
                          "linear-gradient(263.99deg, #e54d60 71.61%, #a342ff 99.22%)",
                        color: "transparent",
                        bgClip: "text",
                      }}
                    >
                      {sub.title}
                    </Text>
                      <Divider
                        borderColor="gray.400"
                        opacity={0.3}
                        my={{ md: 4, base: 2 }}
                      />
                  </>
                ))}
              </Box>
            ))}
          </VStack>
        </Stack>
      ) : (
        <>
          {selectedComponent && (
            <Box
              onClick={handleBackClick}
              mt={{ md: "4rem", base: "3rem" }}
              p={{ md: "0.25rem", base: "0.15rem" }}
              align={"center"}
              w={{ md: "8rem", base: "4rem" }}
              fontWeight={"400"}
              ml={{md:'-40px',base:'-30px'}}
              fontSize={{ md: "1.15rem", base: "0.75rem" }}
              className="color-gradient"
              lineHeight={{ md: "32.4px", base: "20px" }}
              letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
              _hover={{
                color: "transparent",
              }}
              cursor={"pointer"}
            >
              <ArrowBackIcon stroke={"white"} boxSize={'2rem'} w={'100%'} /> 
            </Box>
          )}
          {selectedComponent}
        </>
      )}
      </Box>
    </ContentWrapper>
    <AboutFaq/>
    <ContactForm/>
  </>  
  );
};

export default UserGuide;
