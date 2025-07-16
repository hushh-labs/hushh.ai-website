'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  HStack, 
  useColorModeValue,
  Center,
  Grid,
  GridItem,
  List,
  ListItem,
  ListIcon,
  Icon,
  Flex,
  SimpleGrid,
  AspectRatio,
  Code
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaApple, FaFolder, FaLink, FaShieldAlt } from 'react-icons/fa';
import HushhLinkBox from '../_components/svg/hushhLink/hushhLinkBox.svg'
import Image from 'next/image';
import HushhTrail from '../_components/svg/hushhLink/audit-trail.svg'

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HushhLink = () => {

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
      };
    
      const fadeInDelay = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
      };
    
      const buttonAnimation = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, delay: 0.6, ease: "easeOut" }
      };
    
      const fadeInLeft = {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
      };
    
      const fadeInRight = {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
      };
    
      const staggeredFadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
      };

      
  return (
    <>
     {/* Hero Section */}
     <Box
        minH="100vh"
        bg="#f5f5f7"
        display="flex"
        alignItems="center"
        position="relative"
        overflow="hidden"
        pt={{ base: "90px", md: "90px" }} // Add padding top to account for fixed header
      >
        {/* Background subtle pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.02"
          backgroundImage="radial-gradient(circle at 25% 25%, #000 1px, transparent 1px)"
          backgroundSize="60px 60px"
          pointerEvents="none"
        />
        
        <Container 
          maxW="7xl" 
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 8, md: 12, lg: 16 }}
        >
          <Center>
            <VStack 
              spacing={{ base: 8, md: 12, lg: 16 }}
              textAlign="center"
              maxW="5xl"
            >
              {/* Gradient Title */}
              <MotionBox {...fadeInUp}>
                <Text
                  fontSize={{ base: "24px", md: "32px", lg: "32px" }}
                  fontWeight="bold"
                  bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 25%, hsla(354, 88%, 61%, 1) 50%, hsla(13, 91%, 55%, 1) 100%)"
                  bgClip="text"
                  letterSpacing="-0.02em"
                  fontFamily="Inter, sans-serif"
                  mb={{ base: 4, md: 6 }}
                >
                  Hushh Link
                </Text>
              </MotionBox>

              {/* Main Heading */}
              <MotionHeading
                {...fadeInDelay}
                as="h1"
                fontSize={{ base: "48px", md: "72px", lg: "96px" }}
                fontWeight="bold"
                lineHeight={{ base: "1.1", md: "1.15", lg: "1.2" }}
                color="#000000"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
                maxW="1400px"
                mx="auto"
              >
                Trust is programmable
              </MotionHeading>

              {/* Subtitle */}
              <MotionText
                {...fadeInDelay}
                fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                color="#666666"
                fontWeight="400"
                // maxW="800px"
                // mx="auto"
                lineHeight="1.6"
              >
 Hushh Link is the cryptographic layer that ensures every action your agent takes is explicitly approved — and easily revocable              </MotionText>

              {/* CTA Buttons */}
              <MotionBox {...buttonAnimation}>
                <HStack 
                  spacing={{ base: 4, md: 6 }}
                  justify="center"
                  flexDir={{ base: "column", md: "row" }}
                  w="full"
                >
                  <MotionButton
                    size="lg"
                    bg="#0071E3"
                    color="white"
                    px={{ base: 8, md: 10 }}
                    py={{ base: 6, md: 6 }}
                    borderRadius="60px"
                    fontSize={{ base: "18px", md: "20px", lg: "32px" }}
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    minW={{ base: "250px", md: "300px" }}
                    h={{ base: "50px", md: "70px" }}
                    _hover={{
                      bg: "#0056B3",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 113, 227, 0.3)"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Link API
                  </MotionButton>

                  <MotionButton
                    size="lg"
                    bg="transparent"
                    color="#0071E3"
                    px={{ base: 8, md: 12 }}
                    py={{ base: 6, md: 8 }}
                    borderRadius="60px"
                    fontSize={{ base: "18px", md: "20px", lg: "32px" }}
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    minW={{ base: "250px", md: "300px" }}
                    h={{ base: "50px", md: "70px" }}
                    border="3px solid #0071E3"
                    _hover={{
                      bg: "#0071E3",
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 113, 227, 0.3)"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Consent Logs
                  </MotionButton>
                </HStack>
              </MotionBox>

              {/* Additional info text */}
              <MotionText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                fontSize={{ base: "14px", md: "16px" }}
                color="#999999"
                fontWeight="400"
                maxW="600px"
                mx="auto"
                mt={{ base: 8, md: 12 }}
              >
                Built with privacy-first architecture and zero-knowledge encryption. 
                Your data remains yours, always.
              </MotionText>
            </VStack>
          </Center>
        </Container>
      </Box>

       {/* What Is the Hushh Link Section */}
      <Box
        bg="#ffffff"
        position="relative"
        py={{ base: "60px", md: "80px", lg: "100px", xl: "120px", "2xl": "140px" }}
        overflow="hidden"
    minH={'100vh'}
      >
                 <Container maxW="100%" minW={'100%'} px={{ base: 4, md: 6, lg: 12, xl: 16 }} position="relative" zIndex={2}>
          <Grid
            templateColumns={{ base: "1fr", md: "7fr 3fr", lg: "7fr 3fr", xl: "7fr 3fr" }}
            gap={{ base: 8, md: 10, lg: 14, xl: 18 }}
            alignItems="center"
            // minH={{ lg: "600px", xl: "700px" }}
          >
            {/* Left Column - Content */}
            <GridItem>
              <VStack 
                spacing={{ base: 4, md: 6, lg: 8, xl: 10 }} 
                align="start" 
                w="full"
                // maxW={{ lg: "800px", xl: "900px" }}
                pr={{ lg: 4, xl: 6 }}
              >
                {/* Main Heading */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Heading
                    as="h2"
                    fontSize={{ base: "32px", md: "48px", lg: "56px", xl: "64px", "2xl": "72px" }}
                    fontWeight="bold"
                    color="#000000"
                    letterSpacing={{ base: "-0.64px", md: "-0.96px", lg: "-1.12px", xl: "-1.28px", "2xl": "-1.44px" }}
                    lineHeight={{ base: "36px", md: "46px", lg: "50px", xl: "52px", "2xl": "56px" }}
                    fontFamily="Inter, sans-serif"
                    // maxW={{ base: "100%", md: "600px", lg: "700px", xl: "748px" }}
                  >
                    What Is the Hushh Link?
                  </Heading>
                </MotionBox>

                {/* Gradient Subtitle */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <Text
                    fontSize={{ base: "16px", md: "20px", lg: "22px", xl: "24px", "2xl": "26px" }}
                    fontWeight="bold"
                    bgGradient="linear(89.44deg, #0071E3 0.06%, #BB62FC 16.84%, #DA4B7A 39.50%, #F44F22 58.23%)"
                    bgClip="text"
                    
                        // whiteSpace="nowrap"
                        // overflow="hidden"
                        textOverflow="ellipsis"
                    letterSpacing={{ base: "-0.16px", md: "-0.20px", lg: "-0.22px", xl: "-0.24px", "2xl": "-0.26px" }}
                    lineHeight={{ base: "22px", md: "26px", lg: "28px", xl: "30px", "2xl": "32px" }}
                    fontFamily="Inter, sans-serif"
                    // maxW={{ base: "100%", md: "800px", lg: "950px", xl: "1050px" }}
                  >
                    Hushh Link is the invisible handshake that makes the data economy human again
                  </Text>
                </MotionBox>

                {/* Description */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <Text
                    fontSize={{ base: "16px", md: "20px", lg: "22px", xl: "24px", "2xl": "26px" }}
                    fontWeight="500"
                    color="#000000"
                    lineHeight={{ base: "24px", md: "28px", lg: "30px", xl: "33px", "2xl": "36px" }}
                    fontFamily="Inter, sans-serif"
                    // maxW={{ base: "100%", md: "800px", lg: "900px", xl: "967px" }}
                    mb={{ base: 6, md: 8, lg: 10, xl: 12 }}
                  >
                    Hushh Link is a consent validation and logging framework that acts as the trust layer between your data and any agent, brand, or system requesting it.
                  </Text>
                </MotionBox>

                {/* Feature Boxes */}
                <VStack spacing={{ base: 3, md: 4, lg: 5, xl: 6 }} align="start" w="full">
                  {/* Feature 1 */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    w="full"
                  >
                    <Flex
                      align="center"
                      bg="rgba(0, 113, 227, 0.19)"
                      borderRadius="lg"
                      p={{ base: 3, md: 4, lg: 4, xl: 4 }}
                      h={{ base: "44px", md: "48px", lg: "50px", xl: "53px", "2xl": "56px" }}
                    //   maxW={{ base: "100%", md: "600px", lg: "680px", xl: "722px" }}
                      gap={{ base: 3, md: 4, lg: 4, xl: 4 }}
                    >
                      <Box flexShrink={0}>
                        <img 
                          src="http://localhost:3845/assets/d7617520d612e17c1c3357c9006f8d028f96ad94.svg" 
                          alt=""
                          style={{ 
                            width: '40px', 
                            height: '40px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "9px", md: "11px", lg: "12px", xl: "14px", "2xl": "16px" }}
                        fontWeight="500"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.2"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        Issues cryptographically signed consent tokens
                      </Text>
                    </Flex>
                  </MotionBox>

                  {/* Feature 2 */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    w="full"
                  >
                    <Flex
                      align="center"
                      bg="rgba(0, 113, 227, 0.19)"
                      borderRadius="lg"
                      p={{ base: 3, md: 4, lg: 4, xl: 4 }}
                      h={{ base: "44px", md: "48px", lg: "50px", xl: "53px", "2xl": "56px" }}
                    //   maxW={{ base: "100%", md: "600px", lg: "680px", xl: "722px" }}
                      gap={{ base: 3, md: 4, lg: 4, xl: 4 }}
                    >
                      <Box flexShrink={0}>
                        <img 
                          src="http://localhost:3845/assets/ea6e3b5354ca27c91f0acb803e0044e91d2a12c1.svg" 
                          alt=""
                          style={{ 
                            width: '40px', 
                            height: '40px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "9px", md: "11px", lg: "12px", xl: "14px", "2xl": "16px" }}
                        fontWeight="500"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.2"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        Validates all read/write actions against your preferences
                      </Text>
                    </Flex>
                  </MotionBox>

                  {/* Feature 3 */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    w="full"
                  >
                    <Flex
                      align="center"
                      bg="rgba(0, 113, 227, 0.19)"
                      borderRadius="lg"
                      p={{ base: 3, md: 4, lg: 4, xl: 4 }}
                      h={{ base: "44px", md: "48px", lg: "50px", xl: "53px", "2xl": "56px" }}
                    //   maxW={{ base: "100%", md: "600px", lg: "680px", xl: "722px" }}
                      gap={{ base: 3, md: 4, lg: 4, xl: 4 }}
                    >
                      <Box flexShrink={0}>
                        <img 
                          src="http://localhost:3845/assets/779925a8b488d09bbd533b6bda951cfb6e690a5a.svg" 
                          alt=""
                          style={{ 
                            width: '40px', 
                            height: '40px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "9px", md: "11px", lg: "12px", xl: "14px", "2xl": "16px" }}
                        fontWeight="500"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.2"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        Maintains a tamper-proof audit log of every event
                      </Text>
                    </Flex>
                  </MotionBox>

                  {/* Feature 4 */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    w="full"
                  >
                    <Flex
                      align="center"
                      bg="rgba(0, 113, 227, 0.19)"
                      borderRadius="lg"
                      p={{ base: 3, md: 4, lg: 4, xl: 4 }}
                      h={{ base: "44px", md: "48px", lg: "50px", xl: "53px", "2xl": "56px" }}
                    //   maxW={{ base: "100%", md: "600px", lg: "680px", xl: "722px" }}
                      gap={{ base: 3, md: 4, lg: 4, xl: 4 }}
                    >
                      <Box flexShrink={0}>
                        <img 
                          src="http://localhost:3845/assets/925b477b3680c981c98da6d2c021623da1d0b84b.svg" 
                          alt=""
                          style={{ 
                            width: '40px', 
                            height: '40px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "9px", md: "11px", lg: "12px", xl: "14px", "2xl": "16px" }}
                        fontWeight="500"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.2"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        Supports human- and agent-readable permissions
                      </Text>
                    </Flex>
                  </MotionBox>
                </VStack>

                {/* Bottom Quote */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                //   mt={{ base: 8, md: 10, lg: 12, xl: 14 }}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", lg: "28px", xl: "32px"}}
                    fontWeight="800"
                    color="#848484"
                    letterSpacing={{ base: "-0.24px", md: "-0.32px", lg: "-0.36px", xl: "-0.4px", "2xl": "-0.44px" }}
                    lineHeight={{ base: "32px", md: "40px", lg: "44px", xl: "48px", "2xl": "52px" }}
                    fontFamily="Inter, sans-serif"
                    // maxW={{ base: "100%", md: "800px", lg: "950px", xl: "1032px" }}
                  >
                    Trust is no longer implied. It's explicitly signed
                  </Text>
                </MotionBox>
              </VStack>
            </GridItem>

            {/* Right Column - Display Mockup Image */}
            <GridItem display={{ base: "none", md: "flex" }} justifyContent="center" alignItems="center">
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                w="full"
                h="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                // minH={{ md: "400px", lg: "500px", xl: "600px" }}
              >
                <Image
                  src={HushhLinkBox}
                  alt="Hushh Link Box"
                  width={500}
                  height={500}
                />
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      {/* Link works section */}
      
      {/* How the Link Works Section */}
      <Box
        bg="#ffffff"
        position="relative"
        py={{ base: 16, md: 20, lg: 24, xl: 28 }}
        overflow="hidden"
        minH={{ base: "auto", lg: "100vh",md: "100vh" }}
      >
        <Container 
          maxW="7xl" 
          px={{ base: 4, md: 6, lg: 8, xl: 12 }}
          position="relative" 
          zIndex={2}
        >
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign="center"
            mb={{ base: 12, md: 16, lg: 20, xl: 24 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontWeight="bold"
              color="#333333"
              letterSpacing="tight"
              lineHeight="shorter"
              fontFamily="Inter, sans-serif"
              maxW="6xl"
              mx="auto"
            >
              How the Link Works
            </Heading>
          </MotionBox>

          {/* Table Container */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            maxW="6xl"
            mx="auto"
          >
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 2fr", lg: "1fr 2fr" }}
              gap={{ base: 6, md: 8, lg: 12 }}
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
            >
              {/* Left Column - Component */}
              <GridItem>
                <VStack spacing={0} align="stretch" h="full">
                  {/* Column Header */}
                  <Box
                    p={{ base: 4, md: 6, lg: 8 }}
                    borderBottom="1px solid rgba(224, 224, 224, 0.2)"
                  >
                    <HStack spacing={3} align="center">
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        color="#76767C"
                        fontFamily="Lato, sans-serif"
                      >
                        Component
                      </Text>
                      <Box w={6} h={6} flexShrink={0}>
                        <img 
                          src="http://localhost:3845/assets/24851c881cb24fe5d457d0492df2e2c122f12961.svg"
                          alt=""
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            display: 'block'
                          }} 
                        />
                      </Box>
                    </HStack>
                  </Box>

                  {/* Component Functions */}
                  {[
                    'requestConsent()',
                    'logDecision()',
                    'revokeConsent()',
                    'verifyConsent()',
                    'getAuditTrail()'
                  ].map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                    >
                      <Box
                        p={{ base: 4, md: 6, lg: 8 }}
                        borderBottom={index < 4 ? "1px solid rgba(224, 224, 224, 0.2)" : "none"}
                        _hover={{ bg: "rgba(0, 113, 227, 0.02)" }}
                        transition="background-color 0.2s ease"
                      >
                        <Code
                          fontSize={{ base: "sm", md: "md", lg: "lg", xl: "xl" }}
                          fontWeight="regular"
                          color="#333333"
                          fontFamily="Lato, sans-serif"
                          bg="transparent"
                          p={0}
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {item}
                        </Code>
                      </Box>
                    </MotionBox>
                  ))}
                </VStack>
              </GridItem>

              {/* Right Column - Functionality */}
              <GridItem>
                <VStack spacing={0} align="stretch" h="full">
                  {/* Column Header */}
                  <Box
                    p={{ base: 4, md: 6, lg: 8 }}
                    borderBottom="1px solid rgba(224, 224, 224, 0.2)"
                  >
                    <HStack spacing={3} align="center">
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        color="rgba(118, 118, 124, 0.97)"
                        fontFamily="Lato, sans-serif"
                      >
                        Functionality
                      </Text>
                      <Box w={6} h={6} flexShrink={0}>
                        <img 
                          src="http://localhost:3845/assets/3b9d3c70711011644903a5d41d88c9a9207588b2.svg"
                          alt=""
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            display: 'block'
                          }} 
                        />
                      </Box>
                    </HStack>
                  </Box>

                  {/* Functionality Descriptions */}
                  {[
                    'Shows user reason, data scope, expiration, and granularity options',
                    'Logs the consent hash + signature to your Vault',
                    'Revokes access for that session/token immediately',
                    'All agent calls must pass this gate before data access',
                    'Shows every call, timestamp, scope, and revocation history'
                  ].map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                    >
                      <Box
                        p={{ base: 4, md: 6, lg: 8 }}
                        borderBottom={index < 4 ? "1px solid rgba(224, 224, 224, 0.2)" : "none"}
                        _hover={{ bg: "rgba(0, 113, 227, 0.02)" }}
                        transition="background-color 0.2s ease"
                        minH={{ base: "auto", md: 20, lg: 24 }}
                        display="flex"
                        alignItems="center"
                      >
                        <Text
                          fontSize={{ base: "sm", md: "md", lg: "lg", xl: "xl" }}
                          fontWeight="regular"
                          color="#333333"
                          fontFamily="Lato, sans-serif"
                          lineHeight="relaxed"
                          wordBreak="break-word"
                        >
                          {item}
                        </Text>
                      </Box>
                    </MotionBox>
                  ))}
                </VStack>
              </GridItem>
            </Grid>
          </MotionBox>

          {/* Mobile Table Alternative */}
          <Box display={{ base: "block", md: "none" }} mt={8}>
            <VStack spacing={6} align="stretch">
              {[
                {
                  component: 'requestConsent()',
                  functionality: 'Shows user reason, data scope, expiration, and granularity options'
                },
                {
                  component: 'logDecision()',
                  functionality: 'Logs the consent hash + signature to your Vault'
                },
                {
                  component: 'revokeConsent()',
                  functionality: 'Revokes access for that session/token immediately'
                },
                {
                  component: 'verifyConsent()',
                  functionality: 'All agent calls must pass this gate before data access'
                },
                {
                  component: 'getAuditTrail()',
                  functionality: 'Shows every call, timestamp, scope, and revocation history'
                }
              ].map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                >
                  <Box
                    bg="white"
                    borderRadius="lg"
                    p={6}
                    boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                    border="1px solid rgba(224, 224, 224, 0.2)"
                  >
                    <VStack spacing={4} align="start">
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="#76767C"
                          fontFamily="Lato, sans-serif"
                          mb={2}
                        >
                          Component
                        </Text>
                        <Code
                          fontSize="md"
                          fontWeight="regular"
                          color="#333333"
                          fontFamily="Lato, sans-serif"
                          bg="rgba(0, 113, 227, 0.05)"
                          p={2}
                          borderRadius="md"
                        >
                          {item.component}
                        </Code>
                      </Box>
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="rgba(118, 118, 124, 0.97)"
                          fontFamily="Lato, sans-serif"
                          mb={2}
                        >
                          Functionality
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="regular"
                          color="#333333"
                          fontFamily="Lato, sans-serif"
                          lineHeight="relaxed"
                        >
                          {item.functionality}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </Container>
      </Box>
      
      {/* Consent Token Anatomy & Philosophy Section */}
      <Box
        position="relative"
        minH={{ base: "auto", md: "100vh" }}
        overflow="hidden"
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          minH={{ base: "auto", lg: "100vh" }}
        >
          {/* Left Side - Consent Token Anatomy */}
          <GridItem
            bg="#ffffff"
            position="relative"
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            py={{ base: 16, md: 20, lg: 24 }}
            px={{ base: 6, md: 8, lg: 12 }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              maxW="lg"
              w="full"
              pt={{ base: 0, lg: 8 }}
            >
              <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="start">
                {/* Title */}
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
                  fontWeight="bold"
                  color="#333333"
                  lineHeight="shorter"
                  letterSpacing="tight"
                  fontFamily="Inter, sans-serif"
                >
                  Consent Token
                  <br />
                  Anatomy
                </Heading>

                {/* JSON Code Block */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  w="full"
                >
                  <Box
                    bg="#f8f9fa"
                    borderRadius="lg"
                    p={{ base: 4, md: 6 }}
                    border="1px solid #e9ecef"
                    fontFamily="'Fira Code', 'Monaco', 'Consolas', monospace"
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    lineHeight="relaxed"
                    overflow="auto"
                  >
                    <Text color="#666">{'{'}</Text>
                    <Text color="#22c55e" ml={4}>
                      "user": "hushhID_8321",
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "scope": ["calendar.read",
                    </Text>
                    <Text color="#22c55e" ml={8}>
                      "location.once"],
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "issued_at": "2025-08-12T12:00:00Z",
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "expires_at":
                    </Text>
                    <Text color="#22c55e" ml={8}>
                      "2025-08-19T12:00:00Z",
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "signature": "0xA345...def"
                    </Text>
                    <Text color="#666">{'}'}</Text>
                  </Box>
                </MotionBox>

                {/* Description */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                  <Text
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    fontWeight="bold"
                    color="#333333"
                    lineHeight="shorter"
                    fontFamily="Inter, sans-serif"
                  >
                    Signed, verifiable, readable
                    <br />
                    by humans and agents.
                  </Text>
                </MotionBox>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Right Side - Philosophy */}
          <GridItem
            bg="#000000"
            position="relative"
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            py={{ base: 16, md: 20, lg: 24 }}
            px={{ base: 6, md: 8, lg: 12 }}
          >
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              maxW="lg"
              w="full"
              pt={{ base: 0, lg: 8 }}
            >
              <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="start">
                {/* Title */}
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
                  fontWeight="bold"
                  color="#22c55e"
                  lineHeight="shorter"
                  letterSpacing="tight"
                  fontFamily="Inter, sans-serif"
                >
                  Consent as Code
                  <br />
                  Philosophy
                </Heading>

                {/* Philosophy Points */}
                <VStack spacing={{ base: 6, md: 8 }} align="start" w="full">
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                      fontWeight="medium"
                      color="white"
                      lineHeight="relaxed"
                      fontFamily="Inter, sans-serif"
                    >
                      Consent isn't a UI toggle — it's a machine-readable contract
                    </Text>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                      fontWeight="medium"
                      color="white"
                      lineHeight="relaxed"
                      fontFamily="Inter, sans-serif"
                    >
                      Enables agent-to-agent (A2A) and agent-to-knowledge (A2K) data exchanges
                    </Text>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                      fontWeight="medium"
                      color="white"
                      lineHeight="relaxed"
                      fontFamily="Inter, sans-serif"
                    >
                      Works as the handshake between Hushh PDA and external services
                    </Text>
                  </MotionBox>
                </VStack>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>

      </Box>

      {/* Sample Usecase Section */}
      <Box
        bg="#f5f5f7"
        position="relative"
        py={{ base: 16, md: 20, lg: 24, xl: 28 }}
        overflow="hidden"
        minH={{ base: "auto", lg: "100vh" }}
      >
        <Container 
          maxW="8xl" 
          px={{ base: 4, md: 3, lg: 6, xl: 12 }}
          position="relative" 
          zIndex={2}
        >
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign="center"
            mb={{ base: 12, md: 16, lg: 20, xl: 24 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl", xl: "8xl" }}
              fontWeight="bold"
              color="#333333"
              letterSpacing="tight"
              lineHeight={{ base: "shorter", md: "none" }}
              fontFamily="Inter, sans-serif"
              maxW="6xl"
              mx="auto"
            >
              Sample Usecase
            </Heading>
          </MotionBox>

          {/* Use Case Cards */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="center"
            align="center"
            gap={{ base: 6, md: 8, lg: 6 }}
            maxW="7xl"
            mx="auto"
          >
            {/* Card 1 - Notion */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              flex="1"
              maxW={{ base: "sm", lg: "sm" }}
            >
              <Box
                position="relative"
                w="full"
                h={{ base: "xs", md: "md", lg: "md" }}
                borderRadius={{ base: "lg", md: "xl", lg: "2xl" }}
                overflow="hidden"
                // boxShadow="0 4px 6.8px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/usecasebg1.svg'}   
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-4px)",
                //   boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
                }}
                transition="all 0.3s ease"
              >
                {/* Text Overlay */}
                <Box
                  position="absolute"
                  top={{ base: 4, md: 5, lg: 6 }}
                  left={{ base: 4, md: 5, lg: 6 }}
                  right={{ base: 4, md: 5, lg: 6 }}
                  zIndex={1}
                >
                  <Text
                    fontSize={{ base: "sm", md: "2xl", lg: "3xl" }}
                    fontWeight="semibold"
                    color="#000000"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Authorize Notion sync for 48 hours with read-only access
                  </Text>
                </Box>
              </Box>
            </MotionBox>

            {/* Card 2 - Amazon */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              flex="1"
              maxW={{ base: "sm", lg: "sm" }}
            >
              <Box
                position="relative"
                w="full"
                h={{ base: "xs", md: "md", lg: "md" }}
                borderRadius={{ base: "lg", md: "xl", lg: "2xl" }}
                overflow="hidden"
                // boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/usecasebg2.svg'} 
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-4px)",
                //   boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
                }}
                transition="all 0.3s ease"
              >
                {/* Text Overlay */}
                <Box
                  position="absolute"
                  top={{ base: 4, md: 5, lg: 6 }}
                  left={{ base: 4, md: 5, lg: 6 }}
                  right={{ base: 4, md: 5, lg: 6 }}
                  zIndex={1}
                >
                  <Text
                    fontSize={{ base: "sm", md: "2xl", lg: "3xl" }}
                    fontWeight="semibold"
                    color="#000000"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Approve Amazon to personalize shopping for this week only
                  </Text>
                </Box>
              </Box>
            </MotionBox>

            {/* Card 3 - Gmail */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              flex="1"
              maxW={{ base: "sm", lg: "sm" }}
            >
              <Box
                position="relative"
                w="full"
                h={{ base: "xs", md: "md", lg: "md" }}
                borderRadius={{ base: "lg", md: "xl", lg: "2xl" }}
                overflow="hidden"
                // boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/usecasebg3.svg'}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-4px)",
                //   boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
                }}
                transition="all 0.3s ease"
              >
                {/* Text Overlay */}
                <Box
                  position="absolute"
                  top={{ base: 4, md: 5, lg: 6 }}
                  left={{ base: 4, md: 5, lg: 6 }}
                  right={{ base: 4, md: 5, lg: 6 }}
                  zIndex={1}
                >
                  <Text
                    fontSize={{ base: "sm", md: "2xl", lg: "3xl" }}
                    fontWeight="semibold"
                    color="#000000"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Revoke all prior access to Gmail with one tap
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          </Flex>

          {/* Explore the Stack Button */}
          <Box
            textAlign="center"
            mt={{ base: 16, md: 20, lg: 24 }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg", xl: "xl" }}
                fontWeight="bold"
                color="#344054"
                textAlign="center"
                letterSpacing="widest"
                textTransform="uppercase"
                fontFamily="Inter, sans-serif"
                bg="rgba(255, 255, 255, 0.8)"
                px={{ base: 6, md: 8, lg: 10 }}
                py={{ base: 3, md: 4, lg: 5 }}
                borderRadius="full"
                display="inline-block"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.3)"
                cursor="pointer"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.95)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(52, 64, 84, 0.15)"
                }}
                transition="all 0.3s ease"
              >
                Explore the Stack
              </Text>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* Audit Trail Section */}
      <Box
        minH="100vh"
        bg="black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        py={{ base: 8, md: 12, lg: 16 }}
      >
        <Container 
          maxW="8xl" 
          px={{ base: 4, md: 6, lg: 8 }}
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="relative"
            w="100%"
            h="100%"
            minH={{ base: "70vh", md: "80vh", lg: "85vh" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image 
              src={HushhTrail} 
              alt="Hushh Trail" 
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '85vh',
                objectFit: 'contain'
              }}
              priority
            />
          </Box>
        </Container>
      </Box>
      
       {/* Developer Ready Section */}
       <Box
        bg="#f5f5f7"
        position="relative"
        py={{ base: "60px", md: "80px", lg: "120px" }}
      >
        {/* White Background for Right Half */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w={{ base: "0%", lg: "50%" }}
          h="full"
          bg="#ffffff"
          zIndex={1}
        />
        
        <Container maxW="8xl" px={0} position="relative" zIndex={2}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={0}
            alignItems="start"
          >
            {/* Left Column - Developer Ready */}
            <GridItem px={{ base: "32px", md: "48px", lg: "120px" }} py={{ base: "40px", md: "60px", lg: "80px" }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: "32px", md: "40px", lg: "48px" }} align="start" w="full">
                  {/* Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                    fontWeight="bold"
                    color="#333333"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.2"
                    mb={{ base: "24px", md: "32px", lg: "40px" }}
                  >
                    Developer Ready
                  </Heading>

                  {/* Feature List */}
                  <VStack spacing={{ base: "20px", md: "24px", lg: "28px" }} align="start" w="full">
                    {/* Feature 1 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          API-first consent management
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 2 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          GitHub operon: operon.verifyConsent.ts
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 3 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          Native support for OpenAI, Firebase, Apple ID
                        </Text>
                      </Flex>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          Plug into brand systems using REST or GraphQL
                        </Text>
                      </Flex>
                    </MotionBox>
                  </VStack>

                  {/* Buttons Section */}
                  <HStack 
                    spacing={{ base: "12px", md: "16px", lg: "20px" }}
                    flexDir={{ base: "column", sm: "row" }}
                    w="full"
                    align="start"
                    mt={{ base: "32px", md: "40px", lg: "48px" }}
                  >
                    <MotionButton
                      size="lg"
                      bg="#0071E3"
                      color="white"
                      px={{ base: "24px", md: "28px", lg: "32px" }}
                      py={{ base: "12px", md: "14px", lg: "16px" }}
                      borderRadius="full"
                      fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                      h={{ base: "44px", md: "48px", lg: "52px" }}
                      minW={{ base: "180px", md: "200px", lg: "220px" }}
                      _hover={{
                        bg: "#0056B3",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0, 113, 227, 0.3)"
                      }}
                      _active={{
                        transform: "translateY(0)"
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Use Link in your Agent
                    </MotionButton>

                    <MotionButton
                      size="lg"
                      bg="transparent"
                      color="#0071E3"
                      px={{ base: "24px", md: "28px", lg: "32px" }}
                      py={{ base: "12px", md: "14px", lg: "16px" }}
                      borderRadius="full"
                      fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                      h={{ base: "44px", md: "48px", lg: "52px" }}
                      minW={{ base: "180px", md: "200px", lg: "220px" }}
                      border="2px solid #0071E3"
                      _hover={{
                        bg: "#0071E3",
                        color: "white",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0, 113, 227, 0.3)"
                      }}
                      _active={{
                        transform: "translateY(0)"
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Audit Sample Logs
                    </MotionButton>
                  </HStack>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Future Vault+ Capabilities */}
            <GridItem px={{ base: "32px", md: "48px", lg: "120px" }} py={{ base: "40px", md: "60px", lg: "80px" }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: "32px", md: "40px", lg: "48px" }} align="start" w="full">
                  {/* Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                    fontWeight="bold"
                    color="#333333"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.2"
                    mb={{ base: "24px", md: "32px", lg: "40px" }}
                  >
                    Future Link+ Capabilities{" "}
                    <Text as="span" display="block">
                      (Premium Layer)
                    </Text>
                  </Heading>

                  {/* Feature List */}
                  <VStack spacing={{ base: "20px", md: "24px", lg: "28px" }} align="start" w="full">
                    {/* Feature 1 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          consent_required: true by default on all endpoints
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 2 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          Granular scope definitions per data type
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 3 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={{ base: "12px", md: "14px", lg: "16px" }}>
                        <Box
                          w={{ base: "5px", md: "6px", lg: "7px" }}
                          h={{ base: "5px", md: "6px", lg: "7px" }}
                          bg="#333333"
                          borderRadius="full"
                          mt={{ base: "7px", md: "8px", lg: "9px" }}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "16px", md: "1.25rem", lg: "1.5rem" }}
                          fontWeight="400"
                          color="#333333"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          Easy export to CSV or JSON for transparency
                        </Text>
                      </Flex>
                    </MotionBox>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default HushhLink