"use client";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
  List,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import extendedTheme from "../theme";
import { useRouter } from "next/navigation";
import ContactForm from "../_components/features/contactForm";
import Marquee from "react-fast-marquee";

const HushhPDA = () => {
  const router = useRouter();
  
  // Center detection for gradient effect - independent of scrolling
  useEffect(() => {
    let animationFrame;
    
    const handleMarqueeCenter = () => {
      const nameElements = document.querySelectorAll('.marquee-name');
      const centerY = window.innerHeight / 2;
      
      nameElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(centerY - elementCenterY);
        
        // Apply center styling if element is within 30px of center
        if (distanceFromCenter < 30) {
          element.style.background = 'linear-gradient(90deg, #0071E3, #BB62FC, #F34556, #F44F22)';
          element.style.webkitBackgroundClip = 'text';
          element.style.backgroundClip = 'text';
          element.style.webkitTextFillColor = 'transparent';
          element.style.fontSize = 'clamp(1.5rem, 4vw, 3rem)';
          element.style.fontWeight = 'bold';
          element.style.transform = 'scale(1.1)';
          element.style.transition = 'all 0.3s ease';
        } else {
          element.style.background = 'none';
          element.style.webkitBackgroundClip = 'initial';
          element.style.backgroundClip = 'initial';
          element.style.webkitTextFillColor = '#4a5568';
          element.style.color = '#4a5568';
          element.style.fontSize = 'clamp(1rem, 2.5vw, 2rem)';
          element.style.fontWeight = 'normal';
          element.style.transform = 'scale(1)';
          element.style.transition = 'all 0.3s ease';
        }
      });
      
      // Continue the animation loop independently
      animationFrame = requestAnimationFrame(handleMarqueeCenter);
    };

    // Start the animation loop
    const timeout = setTimeout(() => {
      handleMarqueeCenter();
    }, 100); // Small delay to ensure elements are rendered
     
    return () => {
      clearTimeout(timeout);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []); // Empty dependency array - runs once and continues independently

  return (
    <Box w="100%" maxW="100vw" overflow="hidden" position="relative">

      {/* Product Page 1 - Hero Section */}
      <Box
        minH="100vh"
        bg="white"
        color="black"
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="100%" h="full" px={0}>
          <VStack
            spacing={{ base: 6, md: 8 }}
            align="center"
            justify="center"
            h="full"
            py={{ base: "4vh", md: "8vh" }}
            px={{ base: 4, md: 0 }}
          >
            {/* Powered by Hushh.ai */}
            <Box textAlign="center" w="full" mt={{ base: 4, md: 10 }}>
              <Text
                fontSize={{ base: "lg", sm: "lg", md: "xl", lg: "2xl" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="0"
                lineHeight="shorter"
                sx={{
                  background: "linear-gradient(to right, #0071E3, #BB62FC, #F34556, #F44F22)",
                  webkitBackgroundClip: "text",
                  backgroundClip: "text",
                  webkitTextFillColor: "transparent",
                  color: "transparent",
                }}
                textAlign="center"
              >
                Powered by{" "}
                <Box as="span" display="inline-flex" alignItems="center" mx={1}>
                  <Image
                    src="/svgs/hushhEmoji.svg"
                    alt="Hushh Logo"
                    boxSize={{ base: "1rem", md: "1.5rem" }}
                    display="inline"
                  />
                </Box>{" "}
                Hushh.ai
              </Text>
            </Box>

            {/* Main Title */}
            <Box textAlign="center" maxW={{ base: "95%", md: "90%", lg: "80%" }}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "3xl", md: "5xl", lg: "6xl" }}
                fontFamily="Poppins"
                fontWeight={700}
                letterSpacing="0"
                lineHeight={{ base: "1.2", md: "shorter" }}
                color={'#222224'}
                textAlign="center"
              >
                Personal Data Agent
              </Heading>
            </Box>

            {/* Tagline */}
            <Box textAlign="center" maxW={{ base: "90%", md: "full" }}>
              <Text
                fontSize={{ base: "lg", sm: "xl", md: "3xl", lg: "4xl" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0"
                lineHeight={{ base: "1.3", md: "base" }}
                color="#4e4e4e"
                textAlign="center"
              >
                Your Agent. Your data. Your business. Your vibe
              </Text>
            </Box>

            {/* Product Image Container - Mobile optimized */}
            <Box
              position="relative"
              w={{ base: "100%", sm: "80%", md: "70vw", lg: "80vw" }}
              h={{ base: "40vh", sm: "50vh", md: "70vh", lg: "80vh" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              {/* Gradient Shadow Background */}
              <Box
                position="absolute"
                w={{ base: "80%", md: "95%" }}
                h={{ base: "80%", md: "95%" }}
                bgGradient="radial(circle, rgba(0, 113, 227, 0.1) 0%, rgba(187, 98, 252, 0.08) 40%, transparent 70%)"
                borderRadius="50%"
                filter="blur(3rem)"
                zIndex={0}
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              />

              {/* Mobile Phone Image - Mobile optimized */}
              <Box
                position="relative"
                zIndex={1}
                w={{ base: "60%", sm: "70%", md: "80%" }}
                h={{ base: "80%", md: "60%" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/svgs/PdaMobile.svg"
                  alt="Personal Data Agent Mobile"
                  w={'auto'}
                  h="auto"
                  maxH="full"
                  maxW="full"
                  objectFit="contain"
                  filter="drop-shadow(0 1rem 3rem rgba(179, 69, 217, 0.6))"
                />
              </Box>

              {/* CTA Buttons - Mobile optimized positioning */}
              <VStack
                position="absolute"
                bottom={{ base: "-10vh", sm: "-10vh", md: "-2vh" }}
                left="50%"
                transform="translateX(-50%)"
                spacing={{ base: 3, md: 4 }}
                zIndex={3}
                w={{ base: "90%", sm: "80%", md: "auto" }}
              >
                {/* Mobile: Stack buttons vertically, Desktop: Side by side */}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 3, md: "12rem" }}
                  w="full"
                  align="center"
                >
                  {/* Learn More Button */}
                  {/* <Button
                    bg="linear-gradient(135deg, #da4b7a 0%, #b345d9 100%)"
                    borderRadius="20px"
                    w={{ base: "full", sm: "12rem", md: "18rem" }}
                    h={{ base: "3rem", md: "3.5rem" }}
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontFamily="Figtree"
                    fontWeight={600}
                    color="white"
                    border="none"
                    boxShadow="0 0.25rem 1.25rem rgba(218, 75, 122, 0.3)"
                    _hover={{
                      transform: "translateY(-0.125rem)",
                      boxShadow: "0 0.375rem 1.5rem rgba(218, 75, 122, 0.5)",
                    }}
                    transition="all 0.3s ease"
                    onClick={() => router.push("/about")}
                  >
                    Learn More
                  </Button> */}

                  {/* Get Early Access Button */}
                  <Button
                    bg="#0071e3"
                    borderRadius="full"
                    w={{ base: "13rem", sm: "13rem", md: "18rem" }}
                    h={{ base: "3rem", md: "3.5rem" }}
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontFamily="Figtree"
                    fontWeight={600}
                    color="white"
                    border="none"
                    boxShadow="0 0.25rem 1.25rem rgba(0, 113, 227, 0.3)"
                    _hover={{
                      bg: "#005bb5",
                      transform: "translateY(-0.125rem)",
                      boxShadow: "0 0.375rem 1.5rem rgba(0, 113, 227, 0.4)",
                    }}
                    transition="all 0.3s ease"
                    onClick={() => router.push("/contact-us")}
                  >
                    Get Early Access
                  </Button>
                </Stack>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 2 - Full Height Carousel Section */}
      <Box
        minH="100vh"
        bg="gray.50"
        // mx={{ md: '5vh', base: '0' }}
        color="black"
        overflow="hidden"
        position="relative"
        py={{ base: 8, md: 0 }}
      >
        {/* Background Grid Effect */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          className="grid-background"
        />

        {/* Main Carousel Container */}
        <Container maxW="100%" minH="100vh" display="flex" alignItems="center" px={{ base: 2, md: 4 }} overflow="hidden">
          {/* Mobile Layout - Vertical Stack */}
          <VStack
            spacing={8}
            w="100%"
            h="full"
            justify="center"
            display={{ base: "flex", lg: "none" }}
          >
            {/* Target Audience - Mobile */}
            <Box textAlign="center" w="full">
              <Heading
                as="h2"
                fontSize={{ base: "24px", sm: "28px", md: "32px" }}
                fontFamily="Poppins"
                fontWeight={700}
                letterSpacing="0px"
                lineHeight={{ base: "30px", sm: "34px", md: "40px" }}
                color="black"
                maxW="100%"
                px={2}
              >
                Top 1024 Leaders we want to onboard onto our platform
              </Heading>
            </Box>

            {/* Mobile Carousel - Optimized height */}
            <Box
              w="100%"
              h="60vh"
              overflow="hidden"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* Minimal Top Gradient Mask */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="3vh"
                bgGradient="linear(to-b, #f7fafc 0%, rgba(247,250,252,0.6) 80%, transparent 100%)"
                zIndex={2}
                pointerEvents="none"
              />

              {/* Minimal Bottom Gradient Mask */}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                h="3vh"
                bgGradient="linear(to-t, #f7fafc 0%, rgba(247,250,252,0.6) 80%, transparent 100%)"
                zIndex={2}
                pointerEvents="none"
              />

              {/* CSS-based Infinite Marquee - Mobile optimized */}
              <Box
                position="relative"
                w="100%"
                h="60vh"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  background="linear-gradient(to bottom, rgba(247,250,252,0.7) 0%, rgba(247,250,252,0.2) 15%, rgba(247,250,252,0) 30%, rgba(247,250,252,0) 70%, rgba(247,250,252,0.2) 85%, rgba(247,250,252,0.7) 100%)"
                  pointerEvents="none"
                  zIndex="2"
                />

                <Box
                  position="relative"
                  w="100%"
                  h="60vh"
                  css={{
                    '@keyframes scrollUp': {
                      '0%': {
                        transform: 'translateY(0)'
                      },
                      '100%': {
                        transform: 'translateY(-50%)'
                      }
                    }
                  }}
                >
                  <Box
                    position="absolute"
                    w="100%"
                    css={{
                      animation: 'scrollUp 25s linear infinite'
                    }}
                    style={{
                      transform: 'translateY(-25%)',
                    }}
                  >
                    {/* First set of names - Mobile optimized */}
                    <Box>
                      {[
                        "Satya Nadella",
                        "Tim Cook",
                        "Andy Jassy",
                        "Sundar Pichai",
                        "Mark Zuckerberg",
                        "Jensen Huang",
                        "Elon Musk",
                        "Manish Sainani",
                        "Larry Fink",
                        "Jamie Dimon",
                        "Warren Buffett",
                        "Bernard Arnault",
                        "Pat Gelsinger",
                        "Shantanu Narayen",
                        "Mary Barra",
                        "Daniel Ek",
                        "Albert Bourla",
                        "Michael Dell",
                        "Reed Hastings",
                        "Doug McMillon",
                        "Cristiano Amon",
                        "Lisa Su",
                        "Arvind Krishna",
                        "Ginni Rometty",
                        "Safra Catz",
                        "Stéphane Bancel",
                        "Alex Gorsky",
                        "Bill Gates",
                        "Jeff Bezos"
                      ].map((name, index) => (
                        <Text
                          key={`first-${index}`}
                          className="marquee-name"
                          textAlign="center"
                          fontFamily="Figtree"
                          fontWeight="normal"
                          py="3px"
                          style={{
                            fontSize: 'clamp(0.9rem, 4vw, 1.2rem)',
                            color: '#4a5568',
                            transition: 'all 0.3s ease',
                            lineHeight: '1.2'
                          }}
                        >
                          {name}
                        </Text>
                      ))}
                    </Box>

                    {/* Second set of names for seamless loop */}
                    <Box>
                      {[
                        "Satya Nadella",
                        "Tim Cook",
                        "Andy Jassy",
                        "Sundar Pichai",
                        "Mark Zuckerberg",
                        "Jensen Huang",
                        "Elon Musk",
                        "Manish Sainani",
                        "Larry Fink",
                        "Jamie Dimon",
                        "Warren Buffett",
                        "Bernard Arnault",
                        "Pat Gelsinger",
                        "Shantanu Narayen",
                        "Mary Barra",
                        "Daniel Ek",
                        "Albert Bourla",
                        "Michael Dell",
                        "Reed Hastings",
                        "Doug McMillon",
                        "Cristiano Amon",
                        "Lisa Su",
                        "Arvind Krishna",
                        "Ginni Rometty",
                        "Safra Catz",
                        "Stéphane Bancel",
                        "Alex Gorsky",
                        "Bill Gates",
                        "Jeff Bezos"
                      ].map((name, index) => (
                        <Text
                          key={`second-${index}`}
                          className="marquee-name"
                          textAlign="center"
                          fontFamily="Figtree"
                          fontWeight="normal"
                          py="3px"
                          style={{
                            fontSize: 'clamp(0.9rem, 4vw, 1.2rem)',
                            color: '#4a5568',
                            transition: 'all 0.3s ease',
                            lineHeight: '1.2'
                          }}
                        >
                          {name}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* About Content - Mobile */}
            <VStack spacing={6} align="center" textAlign="center" w="full" px={4}>
              <Heading
                as="h2"
                fontSize={{ base: "36px", sm: "42px", md: "48px" }}
                fontFamily="Poppins"
                fontWeight={700}
                letterSpacing="0px"
                lineHeight={{ base: "42px", sm: "48px", md: "56px" }}
                color="black"
              >
                About
              </Heading>

              <Text
                fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0px"
                lineHeight="1.5"
                color="#4e4e4e"
                maxW="100%"
              >
                Meet Your Personal Data Agent called 🤫 until you give it your personal hushhname like mani$h for our founder and ceo, Manish Sainani
              </Text>

              <Text
                fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0px"
                lineHeight="1.5"
                color="#4e4e4e"
                maxW="100%"
              >
                AI that organizes your life, protects your privacy, and helps your data work for you — not the other way around.
              </Text>

              {/* Feature Tags - Mobile optimized */}
              <VStack spacing={4} align="flex-start" mx={'auto'} w="full" mt={4}>
                <HStack spacing={3} justify="center">
                  <Image
                    src="/svgs/privay-first.svg"
                    alt="Privacy-first"
                    w="24px"
                    h="24px"
                  />
                  <Text
                    fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                    fontFamily="Figtree"
                    fontWeight={500}
                    letterSpacing="0px"
                    lineHeight="1.4"
                    color="black"
                  >
                    Privacy-first
                  </Text>
                </HStack>

                <HStack spacing={3} justify="center">
                  <Image
                    src="/svgs/ai-driven.svg"
                    alt="AI-Driven"
                    w="24px"
                    h="24px"
                  />
                  <Text
                    fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                    fontFamily="Figtree"
                    fontWeight={500}
                    letterSpacing="0px"
                    lineHeight="1.4"
                    color="black"
                  >
                    AI-Driven
                  </Text>
                </HStack>

                <HStack spacing={3} justify="center">
                  <Image
                    src="/svgs/monetize.svg"
                    alt="Monetized by You"
                    w="24px"
                    h="24px"
                  />
                  <Text
                    fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                    fontFamily="Figtree"
                    fontWeight={500}
                    letterSpacing="0px"
                    lineHeight="1.4"
                    color="black"
                  >
                    Monetized by You
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>

          {/* Desktop Layout - Keep existing */}
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
            gap={{ base: 0, lg: 16 }}
            w="100%"
            h="100%"
            alignItems="center"
            display={{ base: "none", lg: "grid" }}
          >
            {/* Left Side - Target Audience */}
            <GridItem>
              <VStack spacing={8} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                            <Heading
              as="h2"
              fontSize={{ base: "32px", md: "40px", lg: "48px" }}
              fontFamily="Poppins"
              fontWeight={700}
              letterSpacing="0px"
              lineHeight={{ base: "40px", md: "48px", lg: "56px" }}
              color="black"
              maxW={{ base: "100%", lg: "400px" }}
            >
                  Top 1024 Leaders we want to onboard onto our platform
                </Heading>
              </VStack>
            </GridItem>

            {/* Center - Full Height Leader Names Carousel */}
            <GridItem>
              <Box 
                w="100%"
                minH="100vh"
                h="100vh"
                overflow="hidden"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Top Gradient Mask */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h="25vh"
                  bgGradient="linear(to-b, #f7fafc 0%, rgba(247,250,252,0.8) 50%, transparent 100%)"
                  zIndex={2}
                  pointerEvents="none"
                />
                
                {/* Bottom Gradient Mask */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="25vh"
                  bgGradient="linear(to-t, #f7fafc 0%, rgba(247,250,252,0.8) 50%, transparent 100%)"
                  zIndex={2}
                  pointerEvents="none"
                />

                {/* CSS-based Infinite Marquee */}
                <Box
                  position="relative"
                  w="100%"
                  h="100vh"
                  overflow="hidden"
                >
                  {/* Softer gradient overlay for better visibility */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    background="linear-gradient(to bottom, rgba(247,250,252,0.9) 0%, rgba(247,250,252,0.4) 25%, rgba(247,250,252,0.1) 40%, rgba(247,250,252,0) 50%, rgba(247,250,252,0.1) 60%, rgba(247,250,252,0.4) 75%, rgba(247,250,252,0.9) 100%)"
                    pointerEvents="none"
                    zIndex="2"
                  />
                  
                  {/* Infinite Scrolling Container */}
                  <Box
                    position="relative"
                    w="100%"
                    h="100vh"
                    css={{
                      '@keyframes scrollUp': {
                        '0%': {
                          transform: 'translateY(0)'
                        },
                        '100%': {
                          transform: 'translateY(-50%)'
                        }
                      }
                    }}
                  >
                    <Box
                      position="absolute"
                      w="100%"
                      css={{
                        animation: 'scrollUp 30s linear infinite'
                      }}
                      style={{
                        transform: 'translateY(-25%)', // Start from center
                      }}
                    >
                      {/* First set of names */}
                      <Box>
                        {[
                          "Satya Nadella",
                          "Tim Cook", 
                          "Andy Jassy",
                          "Sundar Pichai",
                          "Mark Zuckerberg",
                          "Jensen Huang",
                          "Elon Musk",
                          "Manish Sainani",
                          "Larry Fink",
                          "Jamie Dimon",
                          "Warren Buffett",
                          "Bernard Arnault",
                          "Pat Gelsinger",
                          "Shantanu Narayen",
                          "Mary Barra",
                          "Daniel Ek",
                          "Albert Bourla",
                          "Michael Dell",
                          "Reed Hastings",
                          "Doug McMillon",
                          "Cristiano Amon",
                          "Lisa Su",
                          "Arvind Krishna",
                          "Ginni Rometty",
                          "Safra Catz",
                          "Stéphane Bancel",
                          "Alex Gorsky",
                          "Bill Gates",
                          "Jeff Bezos"
                        ].map((name, index) => (
                          <Text 
                            key={`first-${index}`} 
                            className="marquee-name"
                            textAlign="center"
                            fontFamily="Figtree"
                            fontWeight="normal"
                            py="6px"
                            style={{ 
                              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                              color: '#4a5568',
                              transition: 'all 0.3s ease',
                              lineHeight: '1.2'
                            }}
                          >
                            {name}
                          </Text>
                        ))}
                      </Box>
                      
                      {/* Second set of names for seamless loop */}
                      <Box>
                        {[
                          "Satya Nadella",
                          "Tim Cook", 
                          "Andy Jassy",
                          "Sundar Pichai",
                          "Mark Zuckerberg",
                          "Jensen Huang",
                          "Elon Musk",
                          "Manish Sainani",
                          "Larry Fink",
                          "Jamie Dimon",
                          "Warren Buffett",
                          "Bernard Arnault",
                          "Pat Gelsinger",
                          "Shantanu Narayen",
                          "Mary Barra",
                          "Daniel Ek",
                          "Albert Bourla",
                          "Michael Dell",
                          "Reed Hastings",
                          "Doug McMillon",
                          "Cristiano Amon",
                          "Lisa Su",
                          "Arvind Krishna",
                          "Ginni Rometty",
                          "Safra Catz",
                          "Stéphane Bancel",
                          "Alex Gorsky",
                          "Bill Gates",
                          "Jeff Bezos"
                        ].map((name, index) => (
                          <Text 
                            key={`second-${index}`} 
                            className="marquee-name"
                            textAlign="center"
                            fontFamily="Figtree"
                            fontWeight="normal"
                            py="6px"
                            style={{ 
                              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                              color: '#4a5568',
                              transition: 'all 1s ease',
                              lineHeight: '1.2'
                            }}
                          >
                            {name}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>

            {/* Right Side - About Content */}
            <GridItem >
              <VStack  spacing={8} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                <Heading
                  as="h2"
                  fontSize={{ base: "48px", md: "56px", lg: "64px" }}
                  fontFamily="Poppins"
                  fontWeight={700}
                  letterSpacing="0px"
                  lineHeight={{ base: "56px", md: "64px", lg: "72px" }}
                  color="black"
                >
                  About
                </Heading>

                <Text
                  fontSize={{ base: "18px", sm: "20px", md: "24px", lg: "28px" }}
                  fontFamily="Figtree"
                  fontWeight={400}
                  letterSpacing="0px"
                  lineHeight="normal"
                  color="#4e4e4e"
                  maxW={{ base: "100%", lg: "500px" }}
                >
                  Meet Your Personal Data Agent called 🤫 until you give it your personal hushhname like mani$h for our founder and ceo, Manish Sainani
                  
                </Text>
                <Text
                  fontSize={{ base: "18px", sm: "20px", md: "24px", lg: "28px" }}
                  fontFamily="Figtree"
                  fontWeight={400}
                  letterSpacing="0px"
                  lineHeight="normal"
                  color="#4e4e4e"
                  maxW={{ base: "100%", lg: "500px" }}
                >                
                AI that organizes your life, protects your privacy, and helps your data work for you — not the other way around.
                </Text>

                {/* Feature Tags */}
                <VStack spacing={6} align={{ base: "center", lg: "flex-start" }} w="full">
                  <HStack spacing={4}>
                    <Image
                      src="/svgs/privay-first.svg"
                      alt="Privacy-first"
                      w="40px"
                      h="40px"
                    />
                    <Text
                      fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                      color="black"
                    >
                      Privacy-first
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Image
                      src="/svgs/ai-driven.svg"
                      alt="AI-Driven"
                      w="40px"
                      h="40px"
                    />
                    <Text
                      fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                      color="black"
                    >
                      AI-Driven
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Image
                      src="/svgs/monetize.svg"
                      alt="Monetized by You"
                      w="40px"
                      h="40px"
                    />
                    <Text
                      fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                      color="black"
                    >
                      Monetized by You
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 3 - Problem/Solution Section */}
      <Box
        minH={'100vh'}
        bg="white"
        color="black"
        py={{ base: 12, md: 24 }}
        display="flex"
        alignItems="center"
      >
        <Container maxW="100%" my={'4rem'} px={{ base: 2, md: 4 }} overflow="hidden">
          {/* Mobile Layout - Vertical Stack */}
          <VStack spacing={10} align="flex-start" display={{ base: "flex", lg: "none" }}>
            {/* Problem Section */}
            <Box w="full" textAlign={{ base: "center", sm: "left" }}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontFamily="Inter"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight="1.2"
                color="#4a5568"
                mb={4}
              >
                Problem
              </Heading>
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0px"
                lineHeight="1.6"
                color="#4e4e4e"
              >
                The most powerful companies in the world are built on your data. But you don't control it. You don't profit from it. You can't even see it. We built hushh to change that — forever.
              </Text>
            </Box>

            {/* Solution Section */}
            <Box w="full" textAlign={{ base: "center", sm: "left" }}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="0px"
                lineHeight="1.2"
                bgGradient="linear(135deg, #BB62FC 0%, #F34556 100%)"
                bgClip="text"
                _webkitTextFillColor="transparent"
                mb={4}
              >
                Solution
              </Heading>

              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0px"
                lineHeight="1.6"
                color="#4e4e4e"
                mb={6}
              >
                A smart AI that lives on your device, learns your preferences, and acts on your behalf
              </Text>

              {/* Solution Bullet Points */}
              <VStack spacing={4} textAlign="left" align="flex-start">
                <HStack align="flex-start" spacing={3}>
                  <Box
                    w="2"
                    h="2"
                    bg="#0071e3"
                    borderRadius="50%"
                    mt="1"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="1.5"
                    color="#4e4e4e"
                  >
                    Collects and organizes your data (email, docs, receipts, habits)
                  </Text>
                </HStack>

                <HStack align="flex-start" spacing={3}>
                  <Box
                    w="2"
                    h="2"
                    bg="#0071e3"
                    borderRadius="50%"
                    mt="1"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="1.5"
                    color="#4e4e4e"
                  >
                    Answers your questions before you ask
                  </Text>
                </HStack>

                <HStack align="flex-start" spacing={3}>
                  <Box
                    w="2"
                    h="2"
                    bg="#0071e3"
                    borderRadius="50%"
                    mt="1"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="1.5"
                    color="#4e4e4e"
                  >
                    Buys things for you. Sells things you permit.
                  </Text>
                </HStack>

                <HStack align="flex-start" spacing={3}>
                  <Box
                    w="2"
                    h="2"
                    bg="#0071e3"
                    borderRadius="50%"
                    mt="1"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="1.5"
                    color="#4e4e4e"
                  >
                    Tracks your spend, tasks, and life — across services
                  </Text>
                </HStack>

                <HStack align="flex-start" spacing={3}>
                  <Box
                    w="2"
                    h="2"
                    bg="#0071e3"
                    borderRadius="50%"
                    mt="1"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="1.5"
                    color="#4e4e4e"
                  >
                    Finds offers you'll love and pays you when you share your data with consent
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Desktop Layout - Two Column Grid */}
          <Grid
            templateColumns="1fr 2fr"
            gap={20}
            alignItems="start"
            w="full"
            display={{ base: "none", lg: "grid" }}
          >
            {/* Left Column - Headings */}
            <GridItem>
              <VStack spacing={24} align="flex-start">
                {/* Problem Heading */}
                <Heading
                  as="h2"
                  fontSize={{ lg: "7xl", xl: "8xl" }}
                fontFamily="Inter"
                fontWeight={600}
                letterSpacing="0px"
                  lineHeight="normal"
                  color="#4a5568"
                >
                  Problem
                </Heading>

                {/* Solution Heading */}
                <Heading
                  as="h2"
                  fontSize={{ lg: "7xl", xl: "8xl" }}
                  fontFamily="Inter"
                  fontWeight={700}
                  letterSpacing="0px"
                  lineHeight="normal"
                  bgGradient="linear(135deg, #BB62FC 0%, #F34556 100%)"
                  bgClip="text"
                  _webkitTextFillColor="transparent"
                >
                  Solution
                </Heading>
              </VStack>
            </GridItem>

            {/* Right Column - Content */}
            <GridItem>
              <VStack spacing={24} align="flex-start">
                {/* Problem Content */}
                <Box>
                  <Text
                    fontSize={{ lg: "3xl" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="normal"
                color="#4e4e4e"
                    // maxW="600px"
              >
                    The most powerful companies in the world are built on your data. But you don't control it. You don't profit from it. You can't even see it. We built hushh to change that — forever.
              </Text>
                </Box>

                {/* Solution Content */}
                <Box>
                  <Text
                    fontSize={{ lg: "3xl" }}
                    fontFamily="Figtree"
                    fontWeight={400}
                    letterSpacing="0px"
                    lineHeight="normal"
                    color="#4e4e4e"
                    // maxW="600px"
                    mb={6}
                  >
                    A smart AI that lives on your device, learns your preferences, and acts on your behalf
                  </Text>

                  {/* Solution Bullet Points */}
                  <VStack spacing={4} align="flex-start" maxW="600px">
                    <HStack align="flex-start" spacing={3}>
                      <Box
                        w="1"
                        h="1"
                        bg="#0071e3"
                        borderRadius="50%"
                        mt="3"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ lg: "3xl" }}
                        fontFamily="Figtree"
                        fontWeight={400}
                        letterSpacing="0px"
                        lineHeight="normal"
                        color="#4e4e4e"
                      >
                        Collects and organizes your data (email, docs, receipts, habits)
                      </Text>
                    </HStack>

                    <HStack align="flex-start" spacing={3}>
                      <Box
                        w="1"
                        h="1"
                        bg="#0071e3"
                        borderRadius="50%"
                        mt="3"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ lg: "3xl" }}
                        fontFamily="Figtree"
                        fontWeight={400}
                        letterSpacing="0px"
                        lineHeight="normal"
                        color="#4e4e4e"
                      >
                        Answers your questions before you ask
                      </Text>
                    </HStack>

                    <HStack align="flex-start" spacing={3}>
                      <Box
                        w="1"
                        h="1"
                        bg="#0071e3"
                        borderRadius="50%"
                        mt="3"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ lg: "3xl" }}
                        fontFamily="Figtree"
                        fontWeight={400}
                        letterSpacing="0px"
                        lineHeight="normal"
                        color="#4e4e4e"
                      >
                        Buys things for you. Sells things you permit.
                      </Text>
                    </HStack>

                    <HStack align="flex-start" spacing={3}>
                      <Box
                        w="1"
                        h="1"
                        bg="#0071e3"
                        borderRadius="50%"
                        mt="3"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ lg: "3xl" }}
                        fontFamily="Figtree"
                        fontWeight={400}
                        letterSpacing="0px"
                        lineHeight="normal"
                        color="#4e4e4e"
                      >
                        Tracks your spend, tasks, and life — across services
                      </Text>
                    </HStack>

                    <HStack align="flex-start" spacing={3}>
                      <Box
                        w="1"
                        h="1"
                        bg="#0071e3"
                        borderRadius="50%"
                        mt="3"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ lg: "3xl" }}
                        fontFamily="Figtree"
                        fontWeight={400}
                        letterSpacing="0px"
                        lineHeight="normal"
                        color="#4e4e4e"
                      >
                        Finds offers you'll love and pays you when you share your data with consent
                      </Text>
                    </HStack>
            </VStack>
                </Box>
          </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 4 - Use Cases Section */}
      <Box
        minH={{ base: "100vh", md: "100vh" }}
        bg="gray.50"
        color="black"
        py={{ base: 12, md: 24 }}
        display="flex"
        alignItems="center"
      >
        <Container maxW="100%" px={{ base: 2, md: 4 }} overflow="hidden">
          <VStack spacing={{ base: 8, md: 16 }} align="center" w="full">
            {/* Section Header */}
            <VStack spacing={{ base: 2, md: 4 }} align="center" textAlign="center">
              <HStack spacing={{ base: 2, md: 8 }} align="baseline" justify="center" w="full" flexWrap="wrap">
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
                  fontFamily="Inter"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight="1.2"
                  color="#4a5568"
                >
                  Old vs.
                </Heading>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
                  fontFamily="Inter"
                  fontWeight={700}
                  letterSpacing="0px"
                  lineHeight="1.2"
                  bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) -3.01%, hsla(275, 96%, 69%, 1) 28.55%, hsla(354, 88%, 61%, 1) 62.13%, hsla(13, 91%, 55%, 1) 88.35%)"
                  bgClip="text"
                  _webkitBackgroundClip="text"  
                  _webkitTextFillColor="transparent"
                >
                  New
                </Heading>
              </HStack>
            </VStack>

            {/* Use Cases Grid */}
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 6, md: 12 }}
              w="full"
              maxW="1300px"
            >
              {/* Left Card - Usecase */}
              <GridItem>
                <Box
                  background={'linear-gradient(180deg, #252525 0%, #505050 52.88%, #8F8E8E 100%)'}
                  borderRadius={{ base: "25px", md: "50px" }}
                  p={{ base: 4, sm: 6, md: 8 }}
                  w="full"
                  minH={{ base: "300px", sm: "350px", md: "510px" }}
                  border={{ base: "2px solid #FFFFFF", md: "3px solid #FFFFFF" }}
                  boxShadow="0px 21px 24.2px 10px rgba(0, 0, 0, 0.30)"
                  position="relative"
                >
                  {/* Card Header */}
                  <Heading
                    as="h3"
                    fontSize={{ base: "xl", sm: "2xl", md: "4xl", lg: "5xl" }}
                    fontFamily="Inter"
                    fontWeight={600}
                    letterSpacing="0px"
                    lineHeight="1.2"
                    color="#ffffff"
                    mb={{ base: 4, md: 6 }}
                    textAlign="center"
                  >
                    Usecase
                  </Heading>

                  {/* Card Content */}
                  <VStack spacing={{ base: 3, md: 8 }} align="flex-start">
                    {[
                      { text: "Track my monthly subscriptions", opacity: 1 },
                      { text: "Book my next massage when I have time & credits", opacity: 0.8 },
                      { text: "Share my coffee preferences with Blue Bottle", opacity: 0.6 },
                      { text: "Sell my fitness data to a verified wellness brand", opacity: 0.4 },
                    ].map((item, index) => (
                      <HStack key={index} spacing={{ base: 3, md: 6 }} align="flex-start" w="full">
                        <Box
                          w={{ base: "2", sm: "3", md: "8" }}
                          h={{ base: "2", sm: "3", md: "8" }}
                          borderRadius="50%"
                          bg="#ffffff"
                          opacity={item.opacity}
                          flexShrink={0}
                          mt={1}
                        />
                        <Text
                          fontSize={{ base: "sm", sm: "md", md: "24px", lg: "32px" }}
                          fontFamily="Figtree"
                          fontWeight={500}
                          letterSpacing="0px"
                          lineHeight={{ base: "1.4", md: "36px" }}
                          color="#ffffff"
                        >
                          {item.text}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </GridItem>

              {/* Right Card - Agentic Action */}
              <GridItem>
                <Box
                  background="linear-gradient(178deg, #F1F1F1 24.36%, #FCF6E0 91.73%, #0071E3 194.98%, #474747 266.6%)"
                  borderRadius={{ base: "25px", md: "50px" }}
                  p={{ base: 4, sm: 6, md: 8 }}
                  w="full"
                  minH={{ base: "300px", sm: "350px", md: "510px" }}
                  border={{ base: "2px solid #DA4B7A", md: "3px solid #DA4B7A" }}
                  borderImage="linear-gradient(135deg, #0071e3, #bb62fc, #f34556, #f44f22) 1"
                  position="relative"
                  boxShadow="0px 21px 24.2px 10px rgba(0, 0, 0, 0.30)"
                >
                  {/* Card Header */}
                  <Heading
                    as="h3"
                    fontSize={{ base: "xl", sm: "2xl", md: "4xl", lg: "5xl" }}
                    fontFamily="Inter"
                    fontWeight={700}
                    letterSpacing="0px"
                    lineHeight="1.2"
                    bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) -3.01%, hsla(275, 96%, 69%, 1) 28.55%, hsla(354, 88%, 61%, 1) 62.13%, hsla(13, 91%, 55%, 1) 88.35%)"
                    bgClip="text"
                    _webkitBackgroundClip="text"  
                    _webkitTextFillColor="transparent"
                    mb={{ base: 4, md: 6 }}
                    textAlign="center"
                  >
                    Agentic Action
                  </Heading>

                  {/* Card Content */}
                  <VStack spacing={{ base: 3, md: 8 }} align="flex-start">
                    {[
                      "Finds all recurring charges & alerts you",
                      "Schedules, confirms, and logs it for you",
                      "Sends only what's necessary—with your consent",
                      "You choose who sees it. You earn.",
                    ].map((text, index) => (
                      <Text
                        key={index}
                        fontSize={{ base: "sm", sm: "md", md: "24px", lg: "32px" }}
                        fontFamily="Inter"
                        fontWeight={500}
                        letterSpacing="0px"
                        lineHeight={{ base: "1.4", md: "36px" }}
                        color="#000000"
                      >
                        {text}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              </GridItem>
            </Grid>

            {/* Arrow Flow - Mobile optimized */}
            <Box w="full" maxW={{ base: "90vw", md: "900px" }} position="relative" overflow="hidden">
              <HStack spacing={0} justify="center" align="center">
                {/* Arrow sequence */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Box
                    key={index}
                    w={{ base: "6", sm: "8", md: "12" }}
                    h={{ base: "3", sm: "4", md: "6" }}
                    bg={index < 2 ? "#0071e3" : index < 4 ? "#888888" : "#444444"}
                    clipPath="polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%, 6px 50%)"
                    opacity={index < 2 ? 1 : index < 4 ? 0.7 : 0.4}
                  />
                ))}
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 5 - Why Different Section with iPhone Mockups */}
      <Box
        minH={{ base: "100vh", md: "100vh" }}
        bg="white"
        color="black"
        py={{ base: 12, md: 24 }}
      >
        <Container maxW="100%" px={{ base: 2, md: 4 }} overflow="hidden">
          {/* Mobile Layout - Vertical Stack */}
          <VStack spacing={2} display={{ base: "flex", lg: "none" }} w="full" align="center">
            {/* Why Different Content - Mobile */}
            <VStack spacing={4} align="center" textAlign="center" w="full">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontFamily="Inter"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight="1.2"
                color={'#000000'}
              >
                Why is hushh Different
              </Heading>

              <Text
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                fontFamily="Figtree"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight="1.4"
                color="#4e4e4e"
                maxW="100%"
              >
                We're not just another AI app.
              </Text>
              
              <Text 
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                fontFamily="Figtree"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight="1.4"
                background="linear-gradient(267deg, #DA4B7A 41.68%, #B345D9 65.02%)"
                bgClip="text"
                _webkitBackgroundClip="text"
                _webkitTextFillColor="transparent"
                maxW="100%"
              >
                We're a movement for data sovereignty.
              </Text>

              <List spacing={3} mt={6} fontSize={{ base: "sm", md: "md" }} w="full" maxW="400px">
                <ListItem display="flex" alignItems="flex-start">
                  <Text color="#0071e3" mr={3} fontSize={{ base: "md", md: "lg" }}>✓</Text>
                  <Text textAlign="left" color="black">Built by former Google AI & Cloud leaders</Text>
                </ListItem>
                <ListItem display="flex" alignItems="flex-start">
                  <Text color="#0071e3" mr={3} fontSize={{ base: "md", md: "lg" }}>✓</Text>
                  <Text textAlign="left" color="black">Runs on consent-first infrastructure</Text>
                </ListItem>
                <ListItem display="flex" alignItems="flex-start">
                  <Text color="#0071e3" mr={3} fontSize={{ base: "md", md: "lg" }}>✓</Text>
                  <Text textAlign="left" color="black">Designed with human psychology, not just tech</Text>
                </ListItem>
                <ListItem display="flex" alignItems="flex-start">
                  <Text color="#0071e3" mr={3} fontSize={{ base: "md", md: "lg" }}>✓</Text>
                  <Text textAlign="left" color="black">Monetization powered by you, not advertisers</Text>
                </ListItem>
                <ListItem display="flex" alignItems="flex-start">
                  <Text color="#0071e3" mr={3} fontSize={{ base: "md", md: "lg" }}>✓</Text>
                  <Text textAlign="left" color="black">Powered by open protocols like A2A, MCP, and ADK</Text>
                </ListItem>
              </List>
            </VStack>

            {/* iPhone Mockups - Mobile Optimized */}
            <Box
              position="relative"
              w="100%"
              h={{ base: "650px", sm: "750px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* Main Mobile Screen (Center) - Much Bigger */}
              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                zIndex={3}
              >
                <Image
                  src="/svgs/mobilescreen1.svg"
                  alt="Mobile Screen 1"
                  w={{ base: "300px", sm: "320px" }}
                  h="auto"
                  filter="drop-shadow(0 25px 50px rgba(0,0,0,0.7))"
                />
              </Box>

              {/* Upper Mobile Screen (Left Top) - Much Bigger */}
              <Box
                position="absolute"
                left="-10%"
                top="12%"
                zIndex={2}
              >
                <Image
                  src="/svgs/mobilescreenbottom.svg"
                  alt="Mobile Screen Bottom"
                  w={{ base: "280px", sm: "280px" }}
                  h="400px"
                  filter="drop-shadow(0 20px 40px rgba(0,0,0,0.6))"
                  opacity={0.95}
                />
              </Box>

              {/* Lower Mobile Screen (Right Bottom) - Much Bigger */}
              <Box
                position="absolute"
                right="5%"
                bottom="0"
                zIndex={2}
              >
                <Image
                  src="/svgs/mobilescreenupper.svg"
                  alt="Mobile Screen Upper"
                  w={{ base: "280px", sm: "280px" }}
                  h="320px"
                  filter="drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
                  opacity={0.95}
                />
              </Box>

              {/* Enhanced Background Gradient Effect */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: "450px", sm: "500px" }}
                h={{ base: "450px", sm: "500px" }}
                bgGradient="radial(circle, rgba(0, 113, 227, 0.1) 0%, rgba(187, 98, 252, 0.08) 40%, transparent 70%)"
                borderRadius="50%"
                filter="blur(60px)"
                zIndex={0}
              />
            </Box>
          </VStack>

          {/* Desktop Layout - Keep existing */}
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={16}
            align="center"
            h="full"
            display={{ base: "none", lg: "grid" }}
          >
            {/* Left Column - iPhone Mockups */}
            <GridItem>
              <Box
                position="relative"
                w="full"
                h={{ base: "500px", md: "700px", lg: "800px" }}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                {/* Main Mobile Screen (Left) - mobilescreen1.svg */}
                <Box
                  position="absolute"
                  left={{ base: "5%", md: "-10%", lg: "-5%" }}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={3}
                >
                  <Image
                    src="/svgs/mobilescreen1.svg"
                    alt="Mobile Screen 1"
                    w={{ base: "220px", md: "440px", lg: "480px" }}
                    h="auto"
                    filter="drop-shadow(0 25px 50px rgba(0,0,0,0.5))"
                  />
                </Box>

                {/* Upper Mobile Screen (Right Top) - mobilescreenbottom.svg */}
                <Box
                  position="absolute"
                  right={{ base: "0%", md: "10%", lg: "-10%" }}
                  top={{ base: "5%", md: "0%", lg: "-5%" }}
                  zIndex={3}
                >
                  <Image
                    src="/svgs/mobilescreenbottom.svg"
                    alt="Mobile Screen Bottom"
                    w={{ base: "180px", md: "500px", lg: "560px" }}
                    h="auto"
                    filter="drop-shadow(0 20px 40px rgba(0,0,0,0.4))"
                  />
                </Box>

                {/* Lower Mobile Screen (Right Bottom) - mobilescreenupper.svg */}
                <Box
                  position="absolute"
                  right={{ base: "10%", md: "2%", lg: "2%" }}
                  bottom={{ base: "5%", md: "-2%", lg: "-5%" }}
                  zIndex={3}
                >
                  <Image
                    src="/svgs/mobilescreenupper.svg"
                    alt="Mobile Screen Upper"
                    w={{ base: "160px", md: "500px", lg: "560px" }}
                    h="auto"
                    filter="drop-shadow(0 15px 35px rgba(0,0,0,0.3))"
                  />
                </Box>

                {/* Background Gradient Effect */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w={{ base: "400px", md: "600px", lg: "800px" }}
                  h={{ base: "400px", md: "600px", lg: "800px" }}
                  bgGradient="radial(circle, rgba(0, 113, 227, 0.1) 0%, rgba(187, 98, 252, 0.08) 40%, transparent 70%)"
                  borderRadius="50%"
                  filter="blur(60px)"
                  zIndex={0}
                />
              </Box>
            </GridItem>

            {/* Right Column - Why Different Content */}
            <GridItem>
              <VStack spacing={4} align="flex-start">
                <Heading
                  as="h2"
                  fontSize={{ base: "64px", md: "96px" }}
                  fontFamily="Inter"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={{ base: "55px", md: "90px" }}
                 color={'#000000'}
                >
                  Why is hushh
                   
                </Heading>
                <Text fontSize={{ base: "64px", md: "96px" }}
                  fontFamily="Inter"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={{ base: "55px", md: "90px" }}
                 color={'#000000'}>
                  Different</Text>

                <Text
                  fontSize={{ base: "28px", md: "36px" }}
                  fontFamily="Figtree"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={'normal'}
                  color="#4e4e4e"
                  maxW="893px"
                >
                  We're not just another AI app.
                  
                </Text>
                <Text fontSize={{ base: "28px", md: "36px" }}
                  fontFamily="Figtree"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={'normal'}
                  background="linear-gradient(267deg, #DA4B7A 41.68%, #B345D9 65.02%)"
                  bgClip="text"
                  _webkitBackgroundClip="text"
                  _webkitTextFillColor="transparent"
                  maxW="893px"
                  >
                We're a movement for data sovereignty.
                </Text>
                <List spacing={2} mt={4} fontSize={{base:"16px",md:"24px",lg:"32px"}}>
                    <ListItem display="flex" alignItems="center">
                      <Text color="#0071e3" mr={3} fontSize={{base:"20px",md:"2rem",lg:"2.5rem"}}>✓</Text>
                      <Text color="black">Built by former Google AI & Cloud leaders</Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <Text color="#0071e3" mr={3} fontSize={{base:"20px",md:"2rem",lg:"2.5rem"}}>✓</Text>
                      <Text color="black">Runs on consent-first infrastructure</Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <Text color="#0071e3" mr={3} fontSize={{base:"20px",md:"2rem",lg:"2.5rem"}}>✓</Text>
                      <Text color="black">Designed with human psychology, not just tech</Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <Text color="#0071e3" mr={3} fontSize={{base:"20px",md:"2rem",lg:"2.5rem"}}>✓</Text>
                      <Text color="black">Monetization powered by you, not advertisers</Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <Text color="#0071e3" mr={3} fontSize={{base:"20px",md:"2rem",lg:"2.5rem"}}>✓</Text>
                      <Text color="black">Powered by open protocols like A2A, MCP, and ADK</Text>
                    </ListItem>
                  </List>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 6 - Trust & Privacy First */}
      <Box minH="100vh" bg="gray.50" color="black" py={0}>
        <Container maxW="100%" px={0} overflow="hidden">
          <Grid
            templateColumns={{ base: "1fr", lg: "2fr 1.5fr",md:"2fr 1.7fr" }}
            minH="100vh"
            w="full"
          >
            {/* Left: White background, centered content */}
            <GridItem
              bg="white"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={8}
            >
              <VStack spacing={{ base: 8, md: 12 }} w="full" maxW="500px" align="center">
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", sm: "3xl", md: "6xl", lg: "7xl" }}
                  fontWeight={700}
                  color="black"
                  textAlign="center"
                  mb={{ base: 4, md: 8 }}
                  lineHeight={1.1}
                >
                  Trust and Privacy First
                </Heading>
                {/* Features: 2x2 grid desktop, 1 column mobile */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={10} spacingX={8} w="full">
                  {/* Feature 1 */}
                  <VStack spacing={3} align="center">
                    <svg width="32" height="36" viewBox="0 0 40 45" fill="none"><path d="M16.25 29.25H23.75L22.3125 21.9937C23.1458 21.6187 23.8021 21.075 24.2812 20.3625C24.7604 19.65 25 18.8625 25 18C25 16.7625 24.5104 15.7031 23.5312 14.8219C22.5521 13.9406 21.375 13.5 20 13.5C18.625 13.5 17.4479 13.9406 16.4688 14.8219C15.4896 15.7031 15 16.7625 15 18C15 18.8625 15.2396 19.65 15.7188 20.3625C16.1979 21.075 16.8542 21.6187 17.6875 21.9937L16.25 29.25ZM20 45C14.2083 43.6875 9.42708 40.6969 5.65625 36.0281C1.88542 31.3594 0 26.175 0 20.475V6.75L20 0L40 6.75V20.475C40 26.175 38.1146 31.3594 34.3438 36.0281C30.5729 40.6969 25.7917 43.6875 20 45ZM20 40.275C24.3333 39.0375 27.9167 36.5625 30.75 32.85C33.5833 29.1375 35 25.0125 35 20.475V9.84375L20 4.78125L5 9.84375V20.475C5 25.0125 6.41667 29.1375 9.25 32.85C12.0833 36.5625 15.6667 39.0375 20 40.275Z" fill="#0071e3"/></svg>
                    <Text fontSize={{base:"md",md:'xl',lg:'2xl'}} color="black" textAlign="center" fontWeight={400}>
                      End-to-end encrypted<br/>personal data vault
                    </Text>
                  </VStack>
                  {/* Feature 2 */}
                  <VStack spacing={3} align="center">
                    <svg width="36" height="36" viewBox="0 0 45 45" fill="none"><path d="M3.75 16.875V9.375C3.75 8.34375 4.11719 7.46094 4.85156 6.72656C5.58594 5.99219 6.46875 5.625 7.5 5.625H37.5C38.5312 5.625 39.4141 5.99219 40.1484 6.72656C40.8828 7.46094 41.25 8.34375 41.25 9.375V16.875H37.5V9.375H7.5V16.875H3.75ZM7.5 33.75C6.46875 33.75 5.58594 33.3828 4.85156 32.6484C4.11719 31.9141 3.75 31.0312 3.75 30V20.625H7.5V30H37.5V20.625H41.25V30C41.25 31.0312 40.8828 31.9141 40.1484 32.6484C39.4141 33.3828 38.5312 33.75 37.5 33.75H7.5ZM1.875 39.375V35.625H43.125V39.375H1.875ZM3.75 20.625V16.875H15C15.3437 16.875 15.6719 16.9688 15.9844 17.1562C16.2969 17.3438 16.5312 17.5938 16.6875 17.9062L18.8906 22.2656L24.6562 12.1875C24.8125 11.9062 25.0312 11.6797 25.3125 11.5078C25.5937 11.3359 25.9062 11.25 26.25 11.25C26.5937 11.25 26.9219 11.3359 27.2344 11.5078C27.5469 11.6797 27.7812 11.9375 27.9375 12.2812L30.2344 16.875H41.25V20.625H29.0625C28.7187 20.625 28.3906 20.5391 28.0781 20.3672C27.7656 20.1953 27.5312 19.9375 27.375 19.5938L26.1562 17.1094L20.3906 27.1875C20.2344 27.5 20 27.7344 19.6875 27.8906C19.375 28.0469 19.0469 28.125 18.7031 28.125C18.3594 28.125 18.0391 28.0312 17.7422 27.8438C17.4453 27.6562 17.2187 27.4062 17.0625 27.0938L13.8281 20.625H3.75Z" fill="#0071e3"/></svg>
                    <Text fontSize={{base:"md",md:'xl',lg:'2xl'}} color="black" textAlign="center" fontWeight={400}>
                      On-device preference<br/>learning
                    </Text>
                  </VStack>
                  {/* Feature 3 */}
                  <VStack spacing={3} align="center">
                    <svg width="36" height="36" viewBox="0 0 45 45" fill="none"><path d="M7.5 37.5V16.875H15V37.5H7.5ZM18.75 37.5V18.75L26.25 26.25V37.5H18.75ZM26.25 20.9063L18.75 13.4063V7.5H26.25V20.9063ZM37.5 32.1563L30 24.6563V24.375H37.5V32.1563ZM37.0781 42.4219L2.57812 7.92188L5.25 5.25L39.75 39.75L37.0781 42.4219Z" fill="#0071e3"/></svg>
                    <Text fontSize={{base:"md",md:'xl',lg:'2xl'}} color="black" textAlign="center" fontWeight={400}>
                      No data is shared without<br/>your opt-in
                    </Text>
                  </VStack>
                  {/* Feature 4 */}
                  <VStack spacing={3} align="center">
                    <svg width="36" height="36" viewBox="0 0 45 45" fill="none"><path d="M22.5 41.25C17.6562 41.25 13.4531 39.6406 9.89062 36.4219C6.32812 33.2031 4.3125 29.1875 3.84375 24.375H7.64062C8.10938 28.1562 9.75781 31.2891 12.5859 33.7734C15.4141 36.2578 18.7188 37.5 22.5 37.5C26.6875 37.5 30.2344 36.0469 33.1406 33.1406C36.0469 30.2344 37.5 26.6875 37.5 22.5C37.5 18.3125 36.0469 14.7656 33.1406 11.8594C30.2344 8.95312 26.6875 7.5 22.5 7.5C19.8125 7.5 17.3203 8.16406 15.0234 9.49219C12.7266 10.8203 10.9062 12.6562 9.5625 15H15V18.75H4.125C5.03125 14.375 7.20312 10.7812 10.6406 7.96875C14.0781 5.15625 18.0312 3.75 22.5 3.75C25.0938 3.75 27.5312 4.24219 29.8125 5.22656C32.0938 6.21094 34.0781 7.54688 35.7656 9.23438C37.4531 10.9219 38.7891 12.9062 39.7734 15.1875C40.7578 17.4688 41.25 19.9062 41.25 22.5C41.25 25.0938 40.7578 27.5312 39.7734 29.8125C38.7891 32.0938 37.4531 34.0781 35.7656 35.7656C34.0781 37.4531 32.0938 38.7891 29.8125 39.7734C27.5312 40.7578 25.0938 41.25 22.5 41.25ZM27.75 30.375L20.625 23.25V13.125H24.375V21.75L30.375 27.75L27.75 30.375Z" fill="#0071e3"/></svg>
                      <Text fontSize={{base:"md",md:'xl',lg:'2xl'}} color="black" textAlign="center" fontWeight={400}>
                      Clear audit logs for every action
                    </Text>
                  </VStack>
                </SimpleGrid>
                {/* Bottom message */}
                <Text
                  fontSize={{base:"md",md:'xl',lg:'2xl'}}
                  color="black"
                  textAlign="center"
                  mt={10}
                  fontWeight={400}
                >
                  You decide what gets shared, when,<br/>and why
                </Text>
              </VStack>
            </GridItem>
            {/* Right: Phone mockup - clean layout matching image */}
            <GridItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="relative"
              bg="linear-gradient(135deg, #8B7355 0%, #A0926B 50%, #B8A882 100%)"
              p={8}
            >
              <VStack spacing={6} align="center" w="full" maxW="500px">
                {/* Heading at top */}
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", sm: "3xl", md: "6xl", lg: "7xl" }}
                  fontWeight={500}
                  color="white"
                  textAlign="center"
                  lineHeight={1.2}
                >
                  Hushh Personal Data Agent
                </Heading>
                
                {/* Phone mockup image - responsive and larger */}
                <Box
                  w="full"
                  maxW={{ base: "280px", sm: "320px", md: "400px", lg: "480px", xl: "520px" }}
                  h={{ base: "400px", sm: "450px", md: "550px", lg: "650px", xl: "700px" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flex={1}
                >
                  <Image
                    src="/svgs/phonemockup.svg"
                    alt="Hushh Personal Data Agent Mobile"
                    w="100%"
                    h="100%"
                    maxW={{ base: "280px", sm: "320px", md: "400px", lg: "480px", xl: "520px" }}
                    maxH={{ base: "400px", sm: "450px", md: "550px", lg: "650px", xl: "700px" }}
                    objectFit="contain"
                    filter="drop-shadow(0 8px 32px rgba(0,0,0,0.3))"
                  />
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 7 - Developer CTA Section */}
      <Box
        minH={{ base: "100vh", md: "976px" }}
        bg="white"
        color="black"
        py={{ base: 12, md: 24 }}
      >
        <Container maxW="100%" px={{ base: 2, md: 4 }} overflow="hidden">
          <VStack spacing={{ base: 8, md: 16 }} align="center" textAlign="center" h="full" justify="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
              fontFamily="Inter"
              fontWeight={600}
              letterSpacing="0px"
              lineHeight="1.2"
              color="black"
              maxW="100%"
            >
              Developer and Partner CTA
            </Heading>

            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
              fontFamily="Figtree"
              fontWeight={600}
              letterSpacing="0px"
              lineHeight="1.3"
              bgGradient="linear(43.68deg, #b345d9 0%, #da4b7a 100%)"
              bgClip="text"
              maxW="100%"
            >
              Build with hushhKit.
            </Text>

            <VStack spacing={4} maxW="100%">
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                fontFamily="Figtree"
                fontWeight={300}
                letterSpacing="0px"
                lineHeight="1.5"
                color="#4e4e4e"
                textAlign="center"
              >
                Are you a dev, creator, or data agent architect?
              </Text>
              
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                fontFamily="Figtree"
                fontWeight={300}
                letterSpacing="0px"
                lineHeight="1.5"
                color="#4e4e4e"
                textAlign="center"
              >
                Use our open tools to build AI agents that plug into hushh's consent-first data vault, <br/> memory graph, and monetization APIs.
              </Text>
            </VStack>

            {/* Horizontal Sliding Text Marquee */}
            <Box w="100%" maxW="100vw" overflow="hidden">
              <Marquee 
                pauseOnHover={false}
                speed={40}
                gradient={false}
                style={{ 
                  position: "relative", 
                  overflow: "hidden",
                  height: "auto"
                }}
              >
                {/* Multiple repetitions for smoother continuous flow */}
                {[...Array(4)].map((_, index) => (
                  <Box 
                    key={index}
                    display="flex" 
                    alignItems="center" 
                    gap={{ base: "3rem", md: "4rem", lg: "5rem" }}
                    mr={{ base: "3rem", md: "4rem", lg: "5rem" }}
                  >
                    <Text
                    fontSize={{ base: "lg", sm: "lg", md: "2xl", lg: "2xl" }}
                    fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight="1.4"
                      bgGradient="linear(to-r, #da4b7a 0%, #bb62fc 100%)"
                      bgClip="text"
                      _webkitBackgroundClip="text"
                      _webkitTextFillColor="transparent"
                      whiteSpace="nowrap"
                    >
                      Agents that work with people, not against them
                    </Text>
                    
                    <Text
                      fontSize={{ base: "lg", sm: "lg", md: "2xl", lg: "2xl" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight="1.4"
                      bgGradient="linear(to-r, #da4b7a 0%, #bb62fc 100%)"
                      bgClip="text"
                      _webkitBackgroundClip="text"
                      _webkitTextFillColor="transparent"
                      whiteSpace="nowrap"
                    >
                      HushhLink trust tokens for identity
                    </Text>
                    
                    <Text
                      fontSize={{ base: "lg", sm: "lg", md: "2xl", lg: "2xl" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight="1.4"
                      bgGradient="linear(to-r, #da4b7a 0%, #bb62fc 100%)"
                      bgClip="text"
                      _webkitBackgroundClip="text"
                      _webkitTextFillColor="transparent"
                      whiteSpace="nowrap"
                    >
                      HushhFlow for monetization
                    </Text>
                  </Box>
                ))}
              </Marquee>
            </Box>

            <Button
              bg="linear-gradient(to-r, #da4b7a 0%, #b345d9 100%)"
              border="1px solid #ffffff"
              borderRadius="20px"
              w={{ base: "280px", sm: "320px", md: "341px" }}
              h={{ base: "35px", md: "55px" }}
              fontSize={{ base: "md", sm: "lg", md: "2xl", lg: "2xl" }}
              fontFamily="Figtree"
              fontWeight={600}
              letterSpacing="0.96px"
              lineHeight="1.2"
              color="white"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(218, 75, 122, 0.4)",
                background: "linear-gradient(90deg, #DA4B7A 0%, #B345D9 100%)",
                color: "white",
                border: "1px solid #ffffff"
              }}
              transition="all 0.3s ease"
              onClick={() => router.push("/contact-us")}
              mt={4}
            >
              Launch Your Agent
            </Button>
          </VStack>
        </Container>
      </Box>

      <ContactForm />
    </Box>
  );
};

export default HushhPDA;