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
import { FaApple, FaFolder, FaLink, FaShieldAlt, FaCheckCircle, FaClipboardList, FaUsers, FaCode, FaCog, FaEye, FaHistory, FaEnvelope, FaShoppingCart, FaFileAlt } from 'react-icons/fa';
import { HiOutlineCog, HiOutlineEye, HiOutlineClipboardList, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineDocumentText, HiOutlineShoppingBag, HiOutlineMail } from 'react-icons/hi';
import HushhLinkBox from '../_components/svg/hushhLink/hushhLinkBox.svg'
import Image from 'next/image';
import HushhTrail from '../_components/svg/hushhLink/audit-trail.svg'
import ContactForm from '../_components/features/contactForm';

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
        py={{ base: "80px", md: "100px", lg: "120px", xl: "140px", "2xl": "160px" }}
        overflow="hidden"
        minH={'100vh'}
      >
                 <Container maxW="100%" minW={'100%'} px={{ base: 4, md: 6, lg: 12, xl: 16 }} position="relative" zIndex={2}>
          <Grid
            templateColumns={{ base: "1fr", md: "7fr 3fr", lg: "7fr 3fr", xl: "7fr 3fr" }}
            gap={{ base: 12, md: 16, lg: 20, xl: 24 }}
            alignItems="center"
            // minH={{ lg: "600px", xl: "700px" }}
          >
            {/* Left Column - Content */}
            <GridItem>
              <VStack 
                spacing={{ base: 6, md: 8, lg: 10, xl: 12 }} 
                align="start" 
                w="full"
                // maxW={{ lg: "800px", xl: "900px" }}
                pr={{ lg: 6, xl: 8 }}
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
                    mb={{ base: 8, md: 10, lg: 12, xl: 14 }}
                  >
                    Hushh Link is a consent validation and logging framework that acts as the trust layer between your data and any agent, brand, or system requesting it.
                  </Text>
                </MotionBox>

                {/* Feature Boxes */}
                <VStack spacing={{ base: 4, md: 5, lg: 6, xl: 7 }} align="start" w="full">
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
                        <Icon 
                          as={FaShieldAlt}
                          w={{ base: "20px", md: "40px", lg: "40px" }}
                          h={{ base: "20px", md: "40px", lg: "40px" }}
                          color="black"
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px", "2xl": "20px" }}
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
                        <Icon 
                          as={FaCheckCircle}
                          w={{ base: "20px", md: "40px", lg: "40px" }}
                          h={{ base: "20px", md: "40px", lg: "40px" }}
                          color="black"
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px", "2xl": "20px" }}
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
                        <Icon 
                          as={FaClipboardList}
                          w={{ base: "20px", md: "40px", lg: "40px" }}
                          h={{ base: "20px", md: "40px", lg: "40px" }}
                          color="black"
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px", "2xl": "20px" }}
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
                        <Icon 
                          as={FaUsers}
                          w={{ base: "20px", md: "40px", lg: "40px" }}
                          h={{ base: "20px", md: "40px", lg: "40px" }}
                          color="black"
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px", "2xl": "20px" }}
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

          {/* Desktop Table Container */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            maxW="6xl"
            mx="auto"
            display={{ base: "none", md: "block" }}
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

          {/* Mobile Component & Functionality Display */}
          <Box display={{ base: "block", md: "none" }} mt={8} px={4}>
            <VStack spacing={6} align="stretch">
              {/* Mobile Section Header */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                textAlign="center"
                mb={6}
              >
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="#86868B"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
                  mb={3}
                >
                  Link Components
                </Text>
                <Box w="60px" h="2px" bg="linear-gradient(90deg, #007AFF, #34C759)" mx="auto" borderRadius="1px" />
              </MotionBox>

              {/* Component-Functionality Pairs */}
              {[
                {
                  component: 'requestConsent()',
                  functionality: 'Shows user reason, data scope, expiration, and granularity options',
                  icon: HiOutlineShieldCheck,
                  color: 'black',
                  bgGradient: '#F5F5F7'
                },
                {
                  component: 'logDecision()',
                  functionality: 'Logs the consent hash + signature to your Vault',
                  icon: HiOutlineClipboardList,
                  color: 'black',
                  bgGradient: '#F5F5F7'
                },
                {
                  component: 'revokeConsent()',
                  functionality: 'Revokes access for that session/token immediately',
                  icon: HiOutlineCog,
                  color: 'black',
                  bgGradient: '#F5F5F7'
                },
                {
                  component: 'verifyConsent()',
                  functionality: 'All agent calls must pass this gate before data access',
                  icon: HiOutlineEye,
                  color: 'black',
                  bgGradient: '#F5F5F7'
                },
                {
                  component: 'getAuditTrail()',
                  functionality: 'Shows every call, timestamp, scope, and revocation history',
                  icon: FaHistory,
                  color: 'black',
                  bgGradient: '#F5F5F7'
                }
              ].map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.1 + (index * 0.15), 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Box
                    bg="rgba(255, 255, 255, 0.95)"
                    bgGradient={item.bgGradient}
                    borderRadius="24px"
                    p={6}
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
                    backdropFilter="blur(20px)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Top Accent Line */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      height="3px"
                      bg={item.color}
                      borderRadius="24px 24px 0 0"
                      opacity={0.8}
                    />

                    {/* Component Section */}
                    <VStack spacing={4} align="stretch">
                      {/* Icon and Component Name */}
                      <HStack spacing={4} align="center">
                        <Box
                          w="52px"
                          h="52px"
                          bg={`rgba(${item.color.replace('#', '')}, 0.15)`}
                          borderRadius="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                          border={`2px solid ${item.color}20`}
                        >
                          <Icon
                            as={item.icon}
                            w="26px"
                            h="26px"
                            color={item.color}
                          />
                        </Box>

                        <VStack align="start" spacing={1} flex={1}>
                        <Text
                            fontSize="xs"
                            fontWeight="700"
                            color={item.color}
                            textTransform="uppercase"
                            letterSpacing="0.8px"
                            fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        >
                          Component
                        </Text>
                        <Code
                            fontSize="lg"
                            fontWeight="700"
                            color="#1D1D1F"
                            fontFamily="SF Mono, Monaco, Consolas, monospace"
                            bg="rgba(29, 29, 31, 0.08)"
                            px={4}
                            py={2}
                            borderRadius="12px"
                            letterSpacing="-0.3px"
                            border="1px solid rgba(0, 0, 0, 0.06)"
                        >
                          {item.component}
                        </Code>
                        </VStack>
                      </HStack>

                      {/* Divider */}
                      <Box
                        w="full"
                        h="1px"
                        bg="linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)"
                        my={2}
                      />

                      {/* Functionality Section */}
                      <VStack align="start" spacing={3}>
                        <Text
                          fontSize="xs"
                          fontWeight="700"
                          color="#86868B"
                          textTransform="uppercase"
                          letterSpacing="0.8px"
                          fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        >
                          What it does
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="500"
                          color="#1D1D1F"
                          lineHeight="1.6"
                          fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                          letterSpacing="-0.2px"
                        >
                          {item.functionality}
                        </Text>
                    </VStack>
                    </VStack>

                    {/* Subtle Gradient Overlay */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      height="2px"
                      bg="linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent)"
                    />
                  </Box>
                </MotionBox>
              ))}

              {/* Mobile Bottom Section */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                textAlign="center"
                mt={8}
                p={6}
                bg="rgba(0, 0, 0, 0.02)"
                borderRadius="20px"
                border="1px solid rgba(0, 0, 0, 0.04)"
              >
                <VStack spacing={3}>
                  <HStack spacing={2} justify="center">
                    <Icon as={FaApple} w="20px" h="20px" color="#1D1D1F" />
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="#1D1D1F"
                      fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                      letterSpacing="-0.2px"
                    >
                      Apple Design Standards
                    </Text>
                  </HStack>
                  
                  <HStack spacing={4} fontSize="xs" color="#86868B" fontWeight="500">
                    <Text>Privacy First</Text>
                    <Box w="2px" h="2px" bg="#86868B" borderRadius="full" />
                    <Text>Human Centered</Text>
                    <Box w="2px" h="2px" bg="#86868B" borderRadius="full" />
                    <Text>Developer Friendly</Text>
                  </HStack>
                </VStack>
              </MotionBox>
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
            bg="#F5F5F7"
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
                  color="#0071E3"
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
                      color="#BDBDBD"
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
                      color="#BDBDBD"
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
                      color="#BDBDBD"
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

          {/* Desktop Use Case Cards */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="center"
            align="center"
            gap={{ base: 6, md: 8, lg: 6 }}
            maxW="7xl"
            mx="auto"
            display={{ base: "none", md: "flex" }}
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
          {/* Apple-Themed Mobile Use Cases */}
          <Box display={{ base: "block", md: "none" }} px={4}>
            <VStack spacing={6} align="stretch">
              {/* Mobile Section Header */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                textAlign="center"
                mb={4}
              >
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="#86868B"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
                  mb={3}
                >
                  Real World Examples
                </Text>
                <Box w="80px" h="2px" bg="linear-gradient(90deg, #007AFF, #5856D6)" mx="auto" borderRadius="1px" />
              </MotionBox>

              {/* Mobile Use Case Cards */}
              {[
                {
                  title: 'Notion Sync Authorization',
                  description: 'Authorize Notion sync for 48 hours with read-only access',
                  duration: '48 hours',
                  access: 'Read-only',
                  icon: HiOutlineDocumentText,
                  color: 'black',
                  bgColor: '#FFFFFF',
                  borderColor: 'rgba(0, 122, 255, 0.1)'
                },
                {
                  title: 'Amazon Shopping Personalization',
                  description: 'Approve Amazon to personalize shopping for this week only',
                  duration: '1 week',
                  access: 'Shopping data',
                  icon: HiOutlineShoppingBag,
                  color: 'black',
                  bgColor: '#FFFFFF',
                  borderColor: 'rgba(255, 149, 0, 0.1)'
                },
                {
                  title: 'Gmail Access Revocation',
                  description: 'Revoke all prior access to Gmail with one tap',
                  duration: 'Instant',
                  access: 'All revoked',
                  icon: HiOutlineMail,
                  color: 'black',
                  bgColor: '#FFFFFF',
                  borderColor: 'rgba(255, 59, 48, 0.1)'
                }
              ].map((usecase, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.2 + (index * 0.2), 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Box
                    bg={usecase.bgColor}
                    borderRadius="20px"
                    p={6}
                    border={`1px solid ${usecase.borderColor}`}
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                    position="relative"
                    overflow="hidden"
                    _hover={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                    }}
                    transition="all 0.3s ease"
                  >
                    {/* Header Section */}
                    <HStack spacing={4} align="start" mb={5}>
                      <Box
                        w="56px"
                        h="56px"
                        bg="#F2F2F7"
                        borderRadius="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        border="1px solid #E5E5EA"
                      >
                        <Icon
                          as={usecase.icon}
                          w="28px"
                          h="28px"
                          color={usecase.color}
                        />
                      </Box>

                      <VStack align="start" spacing={1} flex={1}>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color={usecase.color}
                          textTransform="uppercase"
                          letterSpacing="0.8px"
                          fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        >
                          Use Case {index + 1}
                        </Text>
                        <Text
                          fontSize="lg"
                          fontWeight="600"
                          color="#1D1D1F"
                          lineHeight="1.3"
                          fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
                          letterSpacing="-0.3px"
                        >
                          {usecase.title}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Description */}
                    <Text
                      fontSize="md"
                      fontWeight="400"
                      color="#48484A"
                      lineHeight="1.5"
                      fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                      letterSpacing="-0.2px"
                      mb={4}
                    >
                      {usecase.description}
                    </Text>

                    {/* Details Row */}
                    <HStack spacing={4} justify="space-between" align="center">
                      <VStack align="start" spacing={1}>
                        <Text
                          fontSize="xs"
                          fontWeight="500"
                          color="#8E8E93"
                          textTransform="uppercase"
                          letterSpacing="0.5px"
                          fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        >
                          Duration
                        </Text>
                        <HStack spacing={2} align="center">
                          <Box
                            w="8px"
                            h="8px"
                            bg={usecase.color}
                            borderRadius="full"
                          />
                          <Text
                            fontSize="sm"
                            fontWeight="500"
                            color="#1D1D1F"
                            fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                          >
                            {usecase.duration}
                          </Text>
                        </HStack>
                      </VStack>

                      <VStack align="end" spacing={1}>
                        <Text
                          fontSize="xs"
                          fontWeight="500"
                          color="#8E8E93"
                          textTransform="uppercase"
                          letterSpacing="0.5px"
                          fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        >
                          Access Level
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="500"
                          color={usecase.color}
                          fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        >
                          {usecase.access}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              ))}

              {/* Mobile CTA Section */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                textAlign="center"
                mt={6}
                p={6}
                bg="#FFFFFF"
                borderRadius="20px"
                border="1px solid #E5E5EA"
                boxShadow="0 2px 16px rgba(0, 0, 0, 0.06)"
              >
                <VStack spacing={4}>
                  <HStack spacing={2} justify="center">
                    <Icon as={FaApple} w="20px" h="20px" color="#1D1D1F" />
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="#1D1D1F"
                      fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                      letterSpacing="-0.2px"
                    >
                      Consent Management
                    </Text>
                  </HStack>
                  
                  <Text
                    fontSize="xs"
                    fontWeight="400"
                    color="#8E8E93"
                    fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                    textAlign="center"
                    lineHeight="1.4"
                  >
                    Granular control over your data with time-bound permissions
                  </Text>

                  {/* Explore Stack Button for Mobile */}
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    mt={3}
                  >
                    <Box
                      bg="#007AFF"
                      borderRadius="14px"
                      px={6}
                      py={3}
                      cursor="pointer"
                      _hover={{
                        bg: "#0056CC"
                      }}
                      transition="all 0.2s ease"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="white"
                        fontFamily="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif"
                        letterSpacing="-0.2px"
                      >
                        Explore the Stack
                      </Text>
                    </Box>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </VStack>
          </Box>

          {/* Desktop Explore the Stack Button */}
          <Box
            textAlign="center"
            mt={{ base: 16, md: 20, lg: 24 }}
            display={{ base: "none", md: "block" }}
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
        // bg="#f5f5f7"
        position="relative"
        py={{ base: 12, md: 16, lg: 20, xl: 24 }}
        overflow="hidden"
      >
        {/* <Container 
          maxW="8xl" 
          px={{ base: 4, md: 6, lg: 8, xl: 12 }}
          position="relative" 
          zIndex={2}
        > */}
          <Box
            position="relative"
            w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
            // borderRadius={{ base: "lg", md: "xl", lg: "2xl" }}
            overflow="hidden"
            // bg="white"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
            // p={{ base: 4, md: 6, lg: 8 }}
        >
          <Box
            position="relative"
              w="full"
              maxW={{ base: "full", md: "90%", lg: "85%", xl: "80%" }}
              mx="auto"
          >
            <Image 
              src={HushhTrail} 
                alt="Hushh Trail - Data Audit Dashboard" 
              style={{
                width: '100%',
                height: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block'
              }}
              priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
            />
          </Box>
          </Box>
        {/* </Container> */}
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
                          fontWeight="600"
                          color="#383737"
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
                          fontWeight="600"
                          color="#383737"
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
                          fontWeight="600"
                          color="#383737"
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
                          fontWeight="600"
                          color="#383737"
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
                          fontWeight="600"
                          color="#383737"
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
                          fontWeight="600"
                          color="#383737"
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
                          fontWeight="600"
                          color="#383737"
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

      <ContactForm/>
    </>
  )
}

export default HushhLink