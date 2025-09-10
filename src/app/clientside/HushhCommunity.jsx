'use client'
import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import hushhLogo from "../_components/svg/hushhCommunity/Fill5.svg";
import discordIcon from "../_components/svg/hackathon/discordIcon.svg";
import linkedIcon from "../_components/svg/hackathon/linkedInIcon.svg";
import ContactForm from "../_components/features/contactForm";
import DisconnectedLux from "../_components/svg/hushhCommunity/discoveryLuxury.svg";
import CommunicationImg from "../_components/svg/hushhCommunity/communication.svg";
import CustomerInsightsImg from "../_components/svg/hushhCommunity/customerInsights.svg";
import DiscoveryLux from "../_components/svg/hushhCommunity/discoveryLuxury.svg";
import EthicalData from "../_components/svg/hushhCommunity/ethicalData.svg";
import ValueCustomer from "../_components/svg/hushhCommunity/valueCustomer.svg";
import Ellipse from "../_components/svg/hushhCommunity/Ellipse.svg";
import LinkedIn from "../_components/svg/hushhCommunity/linkedIn.svg";
import WhatsApp from "../_components/svg/hushhCommunity/whatsapp.svg";
import Discord from "../_components/svg/hushhCommunity/discord.svg";
import AboutFaq from "../_components/features/faq/aboutFaq";
import HeaderBG from "../_components/svg/hushhCommunity/headerBG.svg";

const HushhCommunity = () => {
  return (
    <>
      <Box bg="#ffffff">
        <Image
          src={HeaderBG}
          style={{ position: "absolute", zIndex: "-1" }}
          alt="header bg"
          title="header bg"
        />
        <Stack display={"flex"} flexDirection={"column"}>
          <Box
            mt={{ md: "0rem", base: "4rem" }}
            p={{ base: 6, md: 12 }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            textAlign={"left"}
            position={"relative"}
            bg="#f5f5f7"
            overflow="hidden"
          >
            {/* Subtle pattern overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              opacity={0.02}
              backgroundImage="radial-gradient(circle at 25% 25%, #000 1px, transparent 1px)"
              backgroundSize="60px 60px"
              pointerEvents="none"
            />
            {/* Gradient label */}
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              fontWeight={"700"}
              bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 25%, hsla(354, 88%, 61%, 1) 50%, hsla(13, 91%, 55%, 1) 100%)"
              bgClip="text"
              letterSpacing={"-0.02em"}
              mb={{ base: 2, md: 3 }}
            >
              Hushh Community
            </Text>
            <Text
              fontWeight={"700"}
              fontSize={{ md: "4.635rem", base: "2rem" }}
              lineHeight={{ md: "90px", base: "40px" }}
              color="#1d1d1f"
            >
              Revolutionizing Luxury Sales:
            </Text>
            <Text
              fontWeight={"700"}
              fontSize={{ md: "4.635rem", base: "2rem" }}
              lineHeight={{ md: "90px", base: "40px" }}
              color="#1d1d1f"
            >
              Empowering Agents, Delighting Customers
            </Text>
          </Box>
        </Stack>

        <HStack
          mx={{ md: "5rem", base: "1rem" }}
          display={"flex"}
          flexDirection={{ md: "row", base: "column" }}
          gap={{ md: "6rem", base: "2rem" }}
        >
          <Box w={"100%"} display={{ md: "flex", base: "none" }}>
            <Image
              src={DisconnectedLux}
              alt="Luxury Experience"
              title="hushh disconnected luxury experience"
            />
          </Box>
          <Box
            display={{ md: "none", base: "flex" }}
            alignItems={"center"}
            justifyContent={"center"}
            alignSelf={"center"}
          >
            <Image
              src={DisconnectedLux}
              style={{ width: "70%", height: "40%" }}
              alt="Luxury Experience"
              title="hushh disconnected luxury experience"
            />
          </Box>
          <VStack
            textAlign={"left"}
            gap={{ md: "2rem", base: "1rem" }}
            alignItems={"flex-start"}
          >
            <Text
              fontWeight={"600"}
              color="#06c"
              fontSize={{ md: "1rem", base: "0.75rem" }}
              letterSpacing={"0.255rem"}
              lineHeight={"16px"}
            >
              THE CHALLENGE
            </Text>
            <Text
              fontWeight={"500"}
              fontSize={{ md: "3.75rem", base: "1.825rem" }}
              lineHeight={{ md: "63.3px", base: "38px" }}
              color="#1d1d1f"
            >
              A Disconnected Luxury Experience
            </Text>
            <Text
              fontWeight={"500"}
              color={"#6e6e73"}
              fontSize={{ md: "1rem", base: "0.65rem" }}
              lineHeight={{ md: "36px", base: "25px" }}
            >
              Luxury sales agents face a common hurdle: providing exceptional,
              personalized service to customers whose preferences are unknown.
              This often leads to awkward moments, mismatched recommendations,
              and missed opportunities for both agents and customers.
            </Text>
            {/* <Button
              bg={"white"}
              w={{ md: "18rem", base: "100%" }}
              color={"#10081F"}
              borderRadius={"54px"}
            >
              Learn More
            </Button> */}
          </VStack>
        </HStack>

        <VStack
          my={{ md: "4rem", base: "1.5rem" }}
          ml={{ md: "5rem", base: "1rem" }}
          textAlign={"left"}
          alignItems={"flex-start"}
        >
          <Text
            mr={{ md: "50%", base: "" }}
            color="#06c"
            fontWeight={"600"}
            fontSize={{ md: "1rem", base: "0.5rem" }}
            lineHeight={"16px"}
            letterSpacing={"0.255rem"}
          >
            HUSHH
          </Text>
          <Text
            mr={{ md: "50%", base: "" }}
            fontWeight={"500"}
            fontSize={{ md: "3.75rem", base: "1.8rem" }}
            lineHeight={{ md: "63.3px", base: "35px" }}
            color="#1d1d1f"
          >
            Transforming the Luxury Retail Landscape
          </Text>
          <Text
            mr={{ md: "50%", base: "" }}
            color={"#6e6e73"}
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
            lineHeight={{ md: "36px", base: "25px" }}
          >
            Hushh is a game-changing platform designed to bridge the gap between
            luxury sales agents and their customers. Here's how Hushh is
            reimagining the in-store experience:
          </Text>
          <HStack
            position={"relative"}
            mt={{ md: "1.5rem", base: "0.75rem" }}
            gap={{ md: "4rem", base: "1rem" }}
            w={"100%"}
          >
            <Box
              gap={{ md: "4rem", base: "1.5rem" }}
              flex={1}
              display={"flex"}
              flexDirection={"column"}
            >
              <Stack
                gap={{ md: "2rem", base: "1rem" }}
                textAlign={"left"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                flexDirection={"row"}
              >
                {/* <Image
                  style={{ flex: "0.1" }}
                  src={CustomerInsightsImg}
                  alt="Instant Customer Insights"
                  title="Instant Customer Insights"
                /> */}
                <VStack flex={0.9} textAlign={"left"} alignItems={"flex-start"}>
                  <Text
                    fontWeight={"600"}
                    color={"#1d1d1f"}
                    fontSize={{ md: "1.25rem", base: "0.75rem" }}
                    lineHeight={"32px"}
                    letterSpacing={"0.1rem"}
                  >
                    INSTANT CUSTOMER INSIGHTS
                  </Text>
                  <Text
                    color={"#6e6e73"}
                    fontWeight={"500"}
                    fontSize={{ md: "1rem", base: "0.625rem" }}
                    lineHeight={{ md: "36px", base: "24px" }}
                  >
                    Know your customer's style, size, and budget instantly for
                    personalized recommendations
                  </Text>
                </VStack>
              </Stack>
              <Stack
                gap={{ md: "2rem", base: "1rem" }}
                textAlign={"left"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                flexDirection={"row"}
              >
                {/* <Image
                  style={{ flex: "0.1" }}
                  src={CommunicationImg}
                  alt="Instant Customer Insights"
                  title="Instant Customer Insights"
                /> */}
                <VStack flex={0.9} textAlign={"left"} alignItems={"flex-start"}>
                  <Text
                    fontWeight={"600"}
                    color={"#1d1d1f"}
                    fontSize={{ md: "1.25rem", base: "0.75rem" }}
                    lineHeight={"32px"}
                    letterSpacing={"0.1rem"}
                  >
                    PERSONALIZED COMMUNICATOIN
                  </Text>
                  <Text
                    color={"#6e6e73"}
                    fontWeight={"500"}
                    fontSize={{ md: "1rem", base: "0.625rem" }}
                    lineHeight={{ md: "36px", base: "24px" }}
                  >
                    Know your customer's style, size, and budget instantly for
                    personalized recommendations
                  </Text>
                </VStack>
              </Stack>
              <Stack
                gap={{ md: "2rem", base: "1rem" }}
                textAlign={"left"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                flexDirection={"row"}
              >
                {/* <Image
                  style={{ flex: "0.1" }}
                  src={ValueCustomer}
                  alt="Instant Customer Insights"
                  title="Instant Customer Insights"
                /> */}
                <VStack flex={0.9} textAlign={"left"} alignItems={"flex-start"}>
                  <Text
                    fontWeight={"600"}
                    color={"#1d1d1f"}
                    fontSize={{ md: "1.25rem", base: "0.75rem" }}
                    lineHeight={"32px"}
                    letterSpacing={"0.1rem"}
                  >
                    FOCUS ON HIGH-VALUE CUSTOMERS
                  </Text>
                  <Text
                    color={"#6e6e73"}
                    fontWeight={"500"}
                    fontSize={{ md: "1rem", base: "0.625rem" }}
                    lineHeight={{ md: "36px", base: "24px" }}
                  >
                    Prioritize clients for higher commissions and effortless
                    scheduling
                  </Text>
                </VStack>
              </Stack>
              <Stack
                gap={{ md: "2rem", base: "1rem" }}
                textAlign={"left"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                flexDirection={"row"}
              >
                {/* <Image
                  style={{ flex: "0.1" }}
                  src={EthicalData}
                  alt="hushh Ethical Data Collection"
                  title="hushh Ethical Data Collection"
                /> */}
                <VStack flex={0.9} textAlign={"left"} alignItems={"flex-start"}>
                  <Text
                    fontWeight={"600"}
                    color={"#1d1d1f"}
                    fontSize={{ md: "1.25rem", base: "0.75rem" }}
                    lineHeight={"32px"}
                    letterSpacing={"0.1rem"}
                  >
                    ETHICAL DATA COLLECTION
                  </Text>
                  <Text
                    color={"#6e6e73"}
                    fontWeight={"500"}
                    fontSize={{ md: "1rem", base: "0.625rem" }}
                    lineHeight={{ md: "36px", base: "24px" }}
                  >
                    Gain customer trust with transparent, consensual data
                    practices
                  </Text>
                </VStack>
              </Stack>
            </Box>
            <Box
              w={"100%"}
              flex={0.7}
              display={{ md: "block", base: "none" }}
              position={"relative"}
            >
              <Image
                src={hushhLogo}
                style={{ zIndex: "4" }}
                title="Hushh Logo"
                alt="Hushh Logo"
              />
            </Box>
            {/* Removed dark ellipse overlay for light theme */}
          </HStack>
        </VStack>

        <VStack
          mx={{ md: "0", base: "1rem" }}
          my={{ md: "3rem", base: "1.5rem" }}
          display={"flex"}
          textAlign={"center"}
          alignItems={"center"}
        >
          <Text
            fontWeight={"400"}
            fontSize={{ md: "3.75rem", base: "1.9rem" }}
            lineHeight={{ md: "75px", base: "40px" }}
            as={"h1"}
            color="#1d1d1f"
          >
            Join the <br /> Hushh Movement
          </Text>
          <Text
            mx={{ md: "9rem", base: "1.25rem" }}
            color={"#6e6e73"}
            lineHeight={{ md: "31.5px", base: "28px" }}
            fontSize={{ md: "1.15rem", base: "0.75rem" }}
            fontWeight={"400"}
          >
            Whether you're a data-savvy customer, an empowered sales agent, or
            an innovative developer, Hushh has something for you. Let's work
            together to build a future where data empowers individuals and
            businesses alike.
          </Text>
          <HStack
            mt={{ md: "1.5rem", base: "0.75rem" }}
            gap={{ md: "9rem", base: "1.5rem" }}
            zIndex={4}
          >
            <VStack
              mt={{ md: "0.25rem" }}
              gap={{ md: "1.25rem", base: "0.75rem" }}
            >
              <Image
                src={Discord}
                alt="Discord Channel of Hushh community"
                title="Hushh Community Discord Channel"
              />
              <Text
                color={"#1d1d1f"}
                fontWeight={"600"}
                fontSize={{ md: "1.25rem", base: "0.85rem" }}
              >
                DISCORD
              </Text>
              <Button
                onClick={() =>
                  window.open("https://discord.gg/8Xyf84kdF9", "_blank")
                }
                bg="#ffffff"
                color="#0071E3"
                border="2px solid #0071E3"
                borderRadius="60px"
                fontWeight={"500"}
                fontSize={{ md: "1rem", base: "0.65rem" }}
                _hover={{ bg: "#0071E3", color: "white" }}
              >
                Join Now
              </Button>
            </VStack>
            <VStack gap={{ md: "1.25rem", base: "0.75rem" }}>
              <Image
                src={WhatsApp}
                alt="WhatsApp Channel of Hushh community"
                title="Hushh Community WhatsApp Channel"
              />
              <Text
                color={"#1d1d1f"}
                fontWeight={"600"}
                fontSize={{ md: "1.25rem", base: "0.85rem" }}
              >
                WHATSAPP
              </Text>
              <Button
                onClick={() =>
                  window.open(
                    "https://chat.whatsapp.com/CTa7ULornjfHEzVyvNN9gB",
                    "_blank"
                  )
                }
                bg="#ffffff"
                color="#0071E3"
                border="2px solid #0071E3"
                borderRadius="60px"
                fontWeight={"500"}
                fontSize={{ md: "1rem", base: "0.65rem" }}
                _hover={{ bg: "#0071E3", color: "white" }}
              >
                Join Now
              </Button>
            </VStack>
            <VStack gap={{ md: "1.25rem", base: "0.75rem" }}>
              <Image
                src={LinkedIn}
                alt="LinkedIn Channel of Hushh community"
                title="Hushh Community LinkedIn Channel"
              />
              <Text
                color={"#1d1d1f"}
                fontWeight={"600"}
                fontSize={{ md: "1.25rem", base: "0.85rem" }}
              >
                LINKEDIN
              </Text>
              <Button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/hushh-ai/",
                    "_blank"
                  )
                }
                bg="#ffffff"
                color="#0071E3"
                border="2px solid #0071E3"
                borderRadius="60px"
                fontWeight={"500"}
                fontSize={{ md: "1rem", base: "0.65rem" }}
                _hover={{ bg: "#0071E3", color: "white" }}
              >
                Join Now
              </Button>
            </VStack>
          </HStack>
        </VStack>
        <AboutFaq />
        <ContactForm />
      </Box>
    </>
  );
};

export default HushhCommunity;
