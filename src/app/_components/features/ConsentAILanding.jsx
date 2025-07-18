"use client";
import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import section1Phone from "../svg/section_1_phone.svg";

const ConsentAILanding = () => {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      bg="#F8F9FA"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ 
        paddingTop: 'calc(90px + var(--banner-height, 0px))' 
      }} // Account for fixed header + banner
    >
      <Container maxW="full" px={{ base: 4, md: 8, lg: 16 }}>
        <Box
          display={{ base: "block", lg: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          w="full"
          maxW="1200px"
          mx="auto"
        >
          {/* Left: Text & CTA */}
          <VStack
            spacing={{ base: 6, md: 8 }}
            align={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
            w={{ base: "full", lg: "55%" }}
            maxW="none"
            mb={{ base: 12, lg: 0 }}
          >
            {/* Beta Badge */}
            <Box>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontFamily="Inter"
                fontWeight={400}
                letterSpacing="wider"
                sx={{
                  background: "linear-gradient(90deg, #007BFF 0%, #E91E63 100%)",
                  webkitBackgroundClip: "text",
                  backgroundClip: "text",
                  webkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Now in Open Beta
              </Text>
            </Box>

            {/* Main Heading */}
            <VStack
              spacing={{ base: 4, md: 6 }}
              w="full"
              align={{ base: "center", lg: "flex-start" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="-0.02em"
                lineHeight={{ base: "1.1", md: "1.05" }}
                color="#1A1A1A"
                maxW="full"
              >
                The Consent AI Protocol
              </Heading>
            </VStack>
            {/* Subtitle */}
            <Box maxW={{ base: "full", md: "4xl", lg: "5xl" }}>
              <Text
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                fontFamily="Inter"
                fontWeight={400}
                letterSpacing="-0.01em"
                lineHeight={{ base: "1.4", md: "1.3" }}
                color="#4A5568"
                px={{ base: 2, lg: 0 }}
              >
                Empowering every verified iOS human with modular, trusted, consent-native 
                personal data agents that scale like bacteria but coordinate like complex life.
              </Text>
            </Box>
            {/* CTA Buttons */}
            <HStack
              spacing={{ base: 4, md: 8 }}
              w="full"
              justify={{ base: "center", lg: "flex-start" }}
              flexDirection={{ base: "column", sm: "row" }}
              maxW="600px"
            >
              <Button
                bg="#007BFF"
                color="white"
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontFamily="Inter"
                fontWeight={600}
                h={{ base: "50px", md: "60px", lg: "64px" }}
                px={{ base: 8, md: 12, lg: 16 }}
                borderRadius="full"
                border="none"
                _hover={{
                  bg: "#0056b3",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 123, 255, 0.3)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                w={{ base: "280px", sm: "auto" }}
                onClick={() => router.push("https://calendly.com/hushh/30min?month=2025-07")}
              >
                Learn More
              </Button>
              <Button
                bg="transparent"
                color="#007BFF"
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontFamily="Inter"
                fontWeight={600}
                h={{ base: "50px", md: "60px", lg: "64px" }}
                px={{ base: 8, md: 12, lg: 16 }}
                borderRadius="full"
                border="2px solid #007BFF"
                _hover={{
                  bg: "#007BFF",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 123, 255, 0.2)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                w={{ base: "280px", sm: "auto" }}
                onClick={() => router.push("/contact-us")}
              >
                Contact Us 
              </Button>
            </HStack>
          </VStack>
          {/* Right: Mobile SVG */}
          <Box
            display={{ base: "flex", lg: "none" }}
            w="full"
            justifyContent="center"
            mt={{ base: 8, md: 12 }}
          >
            <Image
              src={section1Phone}
              alt="Consent API Mobile Preview"
              style={{ maxWidth: "350px", height: "auto" }}
              sizes="(max-width: 767px) 80vw, 350px"
              priority
            />
          </Box>
          <Box
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            justifyContent="center"
            w={{ lg: "45%" }}
            minW={{ lg: "350px" }}
            maxW={{ lg: "500px" }}
            h="auto"
          >
            <Image
              src={section1Phone}
              alt="Consent API Mobile Preview"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 1200px) 45vw, 500px"
              priority
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ConsentAILanding; 