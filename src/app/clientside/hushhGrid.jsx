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
  List,
  ListItem,
  ListIcon,
  Icon,
  Flex,
  SimpleGrid,
  AspectRatio,
  Code,
  GridItem,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaApple, FaFolder, FaLink, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import HushhLinkBox from '../_components/svg/hushhLink/hushhLinkBox.svg'
import Image from 'next/image';
import HushhTrail from '../_components/svg/hushhLink/audit-trail.svg'
import ConsentBasedIcon from '../_components/svg/hushhFlow/consentBasedIcon.svg'
import TransparentRevenueIcon from '../_components/svg/hushhFlow/transparentRevenueIcon.svg'
import ReplaceIcon from '../_components/svg/hushhFlow/replacesIcon.svg'
import GlobeIcon from '../_components/svg/icons/globeIcon.svg'
import AgentRuntime from '../_components/svg/hushhGrid/agentRuntime.svg'


const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HushhGrid = () => {

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
                  Hushh Grid
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
               Run your agents. Anywhere. Securely.
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
 Hushh Grid is the scalable compute backbone for your Personal Data Agents — built for privacy-first logic and real-time, consent-native execution
</MotionText>

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
                    Deploy an Agent
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
                    Read Grid Notes
                  </MotionButton>
                </HStack>
              </MotionBox>

         
            </VStack>
          </Center>
        </Container>
      </Box> 

      {/* What Is the Hushh Grid Section */}
      <Box
        bg="white"
        py={{ base: "60px", md: "80px", lg: "100px" }}
        overflow="hidden"
      >
        <Container maxW="100%" px={0}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            minH={{ base: "auto", lg: "600px" }}
            gap={0}
          >
            {/* Left Column - Content */}
            <GridItem bg="white" position="relative">
              <Box
                px={{ base: "24px", md: "40px", lg: "94px" }}
                py={{ base: "40px", md: "60px", lg: "80px" }}
                h="full"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <MotionBox {...fadeInLeft}>
                  {/* Main Heading */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                    fontWeight="bold"
                    color="#000000"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.96px"
                    lineHeight="1.1"
                    mb={{ base: "24px", md: "32px", lg: "40px" }}
                    maxW="668px"
                  >
                    What Is the Hushh Grid?
                  </Heading>

                  {/* Description */}
                  <Text
                    fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                    fontWeight="500"
                    color="#000000"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.4"
                    mb={{ base: "32px", md: "40px", lg: "50px" }}
                    maxW="804px"
                  >
                    Hushh Grid is a distributed, agent-aware compute environment designed to run modular AI agents, enforce consent boundaries, and scale on demand across edge and cloud
                  </Text>

                  {/* Feature List */}
                  <VStack spacing={{ base: "16px", md: "20px", lg: "24px" }} align="stretch" mb={{ base: "32px", md: "40px", lg: "50px" }}>
                    <HStack spacing="16px" align="flex-start">
                      <Box
                        w="30px"
                        h="30px"
                        // bg="#0071E3"
                        // borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt="2px"
                      >
                       {/* < <Icon as={GlobeIcon} color="white" w="16px" h="16px" />> */}
                       <Image src={GlobeIcon} alt="Globe Icon" width={24} height={24} />
                      </Box>
                      <Text
                        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                        fontWeight="400"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                      >
                        Replit-style instant sandboxing
                      </Text>
                    </HStack>

                    <HStack spacing="16px" align="flex-start">
                      <Box
                        w="30px"
                        h="30px"
                        // bg="#0071E3"
                        // borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt="2px"
                      >
                          {/* <Icon as={GlobeIcon} color="white" w="16px" h="16px" /> */}
                          <Image src={GlobeIcon} alt="Globe Icon" width={24} height={24} />
                      </Box>
                      <Text
                        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                        fontWeight="400"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                      >
                        MCP (Micro Consent Protocol) handlers (extended and inspired from opensource Model Context Protocol by Anthropic team)
                      </Text>
                    </HStack>

                    <HStack spacing="16px" align="flex-start">
                      <Box
                        w="30px"
                        h="30px"
                        // bg="#0071E3"
                        // borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt="2px"
                      >
                        {/* <Icon as={GlobeIcon} color="white" w="16px" h="16px" /> */}
                        <Image src={GlobeIcon} alt="Globe Icon" width={24} height={24} />
                      </Box>
                      <Text
                        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                        fontWeight="400"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                      >
                        On-device, in-browser, and cloud-run logic
                      </Text>
                    </HStack>

                    <HStack spacing="16px" align="flex-start">
                      <Box
                        w="30px"
                        h="30px"
                        // bg="#0071E3"
                        // borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt="2px"
                      >
                        {/* <Icon as={GlobeIcon} color="white" w="16px" h="16px" /> */}
                        <Image src={GlobeIcon} alt="Globe Icon" width={24} height={24} />
                      </Box>
                      <Text
                        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                        fontWeight="400"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                      >
                        Agent-to-agent (A2A) and agent-to-knowledge (A2K) interaction support
                      </Text>
                    </HStack>
                  </VStack>

                  {/* Bottom Tagline */}
                  <Text
                    fontSize={{ base: "24px", md: "26px", lg: "30px" }}
                    fontWeight="600"
                    color="#000000"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.3"
                    maxW="600px"
                  >
                    It's like Kubernetes, but for personal AI. Consent-aware. Resource-smart. Always accountable
                  </Text>
                </MotionBox>
              </Box>
            </GridItem>

            {/* Right Column - 3D Cube with Dark Background */}
            <GridItem bg="#1a1a1a" position="relative" minH={{ base: "400px", lg: "600px" }}>
              <MotionBox {...fadeInRight} h="full" position="relative">
                {/* 3D Cube Background Image */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  backgroundImage="url('/3dcubebg.svg')"
                  backgroundSize="cover"
                //   backgroundSize="contain"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  opacity="0.7"
                />

                {/* Gradient Overlay */}
                {/* <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="linear-gradient(135deg, rgba(26,26,26,0.3) 0%, rgba(0,0,0,0.4) 100%)"
                /> */}

                {/* Text Overlay */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  width="100%"
                  transform="translate(-50%, -50%)"
                  textAlign="center"
                  zIndex={2}
                //   px={{ base: "20px", md: "40px" }}
                >
                  <Text
                    fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                    fontWeight="800"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.48px"
                    lineHeight="1.1"
                    textShadow="0 2px 10px rgba(0,0,0,0.5)"
                  >
                    Apps are static.
                    
                  </Text>
                  <Text
                    fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                    fontWeight="800"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.48px"
                    lineHeight="1.1"
                    textShadow="0 2px 10px rgba(0,0,0,0.5)"
                  >
                    Agents are alive.
                  </Text>
                  <Text
                    fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                    fontWeight="800"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.48px"
                    lineHeight="1.1"
                    textShadow="0 2px 10px rgba(0,0,0,0.5)"
                  >
                    Hushh Grid keeps them <br/> breathing
                  </Text>
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Grid Capabilities Section */}
      <Box
        bg="#000000"
        py={{ base: "40px", md: "80px", lg: "100px" }}
        overflow="hidden"
        position="relative"
      >
        {/* Mobile-Optimized Layout */}
        <Box display={{ base: "block", lg: "none" }}>
          <Container maxW="lg" px={{ base: 6, md: 8 }}>
            {/* Mobile Title - Centered and Prominent */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              textAlign="center"
              mb={{ base: 12, md: 16 }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "40px", md: "56px" }}
                fontWeight="bold"
                color="white"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight="1.1"
                mb={6}
              >
                Grid
                <br />
                Capabilities
              </Heading>
              <Box
                w="80px"
                h="4px"
                bg="white"
                borderRadius="2px"
                mx="auto"
                opacity="0.8"
              />
            </MotionBox>

            {/* Mobile Cards - Optimized Stacking */}
            <VStack spacing={8} w="full">
              {/* Real-Time Ops Card - Mobile Optimized */}
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                w="full"
              >
                <Box
                  bg="rgba(68, 68, 68, 0.9)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  borderRadius="20px"
                  p={{ base: 6, md: 8 }}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    bg: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
                  }}
                >
                  <VStack spacing={6} align="stretch">
                    <Box textAlign="center">
                      <Heading
                        as="h3"
                        fontSize={{ base: "24px", md: "28px" }}
                        fontWeight="600"
                        color="white"
                        fontFamily="Inter, sans-serif"
                        mb={3}
                      >
                        Real-Time Ops
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "18px" }}
                        color="rgba(255, 255, 255, 0.8)"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.5"
                        maxW="300px"
                        mx="auto"
                      >
                        Agents execute operations instantly via signed instructions
                      </Text>
                    </Box>

                    <Box display="flex" justifyContent="center" py={4}>
                      <Box
                        bg="rgba(255, 255, 255, 0.1)"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        borderRadius="16px"
                        p={6}
                        w="full"
                        maxW="320px"
                      >
                        <VStack spacing={4}>
                          <HStack spacing={4} w="full">
                            <Box
                              w="50px"
                              h="50px"
                              bg="rgba(255, 255, 255, 0.2)"
                              borderRadius="12px"
                              flexShrink={0}
                            />
                            <VStack spacing={3} align="stretch" flex="1">
                              <Text
                                fontSize="18px"
                                fontWeight="500"
                                color="white"
                                fontFamily="Inter, sans-serif"
                              >
                                Real-Time Execution
                              </Text>
                              <Box
                                h="8px"
                                bg="rgba(255, 255, 255, 0.2)"
                                borderRadius="4px"
                                position="relative"
                                overflow="hidden"
                              >
                                <Box
                                  h="full"
                                  w="75%"
                                  bg="rgba(255, 255, 255, 0.7)"
                                  borderRadius="4px"
                                  animation="pulse 2s infinite"
                                />
                              </Box>
                            </VStack>
                          </HStack>
                        </VStack>
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>

              {/* Other mobile cards follow the same pattern */}
              {/* Micro VM-style Envs Card - Mobile Optimized */}
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                w="full"
              >
                <Box
                  bg="rgba(68, 68, 68, 0.9)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  borderRadius="20px"
                  p={{ base: 6, md: 8 }}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    bg: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
                  }}
                >
                  <VStack spacing={6} align="stretch">
                    <Box textAlign="center">
                      <Heading
                        as="h3"
                        fontSize={{ base: "24px", md: "28px" }}
                        fontWeight="600"
                        color="white"
                        fontFamily="Inter, sans-serif"
                        mb={3}
                      >
                        Micro VM-style Envs
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "18px" }}
                        color="rgba(255, 255, 255, 0.8)"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.5"
                        maxW="300px"
                        mx="auto"
                      >
                        Run ephemeral, secure sessions for each agent task
                      </Text>
                    </Box>

                    <Box display="flex" justifyContent="center" py={4}>
                      <Box
                        bg="rgba(45, 45, 45, 0.9)"
                        border="1px solid rgba(255, 255, 255, 0.15)"
                        borderRadius="16px"
                        p={6}
                        w="full"
                        maxW="300px"
                      >
                        <VStack spacing={4}>
                          <Text
                            fontSize="16px"
                            fontWeight="500"
                            color="white"
                            fontFamily="Inter, sans-serif"
                            textAlign="center"
                          >
                            Ephemeral Sessions
                          </Text>
                          <VStack spacing={3} w="full">
                            <Box
                              h="40px"
                              bg="rgba(80, 80, 80, 0.8)"
                              borderRadius="8px"
                              w="full"
                              border="1px solid rgba(255, 255, 255, 0.1)"
                              display="flex"
                              alignItems="center"
                              px={4}
                            >
                              <Box w="8px" h="8px" bg="rgba(255, 255, 255, 0.6)" borderRadius="full" />
                              <Text ml={3} fontSize="12px" color="rgba(255, 255, 255, 0.8)">Session 1</Text>
                            </Box>
                            <Box
                              h="40px"
                              bg="rgba(80, 80, 80, 0.8)"
                              borderRadius="8px"
                              w="full"
                              border="1px solid rgba(255, 255, 255, 0.1)"
                              display="flex"
                              alignItems="center"
                              px={4}
                            >
                              <Box w="8px" h="8px" bg="rgba(255, 255, 255, 0.6)" borderRadius="full" />
                              <Text ml={3} fontSize="12px" color="rgba(255, 255, 255, 0.8)">Session 2</Text>
                            </Box>
                          </VStack>
                        </VStack>
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>

              {/* Consent Boundaries Card - Mobile Optimized */}
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                w="full"
              >
                <Box
                  bg="rgba(68, 68, 68, 0.9)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  borderRadius="20px"
                  p={{ base: 6, md: 8 }}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    bg: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
                  }}
                >
                  <VStack spacing={6} align="stretch">
                    <Box textAlign="center">
                      <Heading
                        as="h3"
                        fontSize={{ base: "24px", md: "28px" }}
                        fontWeight="600"
                        color="white"
                        fontFamily="Inter, sans-serif"
                        mb={3}
                      >
                        Consent Boundaries
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "18px" }}
                        color="rgba(255, 255, 255, 0.8)"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.5"
                        maxW="300px"
                        mx="auto"
                      >
                        Every compute call passes hushh.link.verifyConsent()
                      </Text>
                    </Box>

                    <Box display="flex" justifyContent="center" py={4}>
                      <Box
                        bg="rgba(45, 45, 45, 0.9)"
                        border="2px solid rgba(255, 255, 255, 0.2)"
                        borderRadius="20px"
                        p={4}
                        w="200px"
                        h="280px"
                        position="relative"
                      >
                        <VStack spacing={0} h="full" justify="space-between">
                          <Box w="full" mb={4}>
                            <Box
                              h="6px"
                              bg="rgba(255, 255, 255, 0.3)"
                              borderRadius="3px"
                              w="full"
                            />
                          </Box>

                          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                            <Box
                              bg="rgba(80, 80, 80, 0.8)"
                              border="1px solid rgba(255, 255, 255, 0.2)"
                              borderRadius="12px"
                              px={4}
                              py={3}
                              display="flex"
                              alignItems="center"
                              gap={3}
                            >
                              <Box
                                w="16px"
                                h="16px"
                                bg="rgba(255, 255, 255, 0.5)"
                                borderRadius="50%"
                              />
                              <Text
                                fontSize="12px"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                fontWeight="500"
                              >
                                Compute Call
                              </Text>
                            </Box>
                          </Box>

                          <Box w="full" mt={4}>
                            <Box
                              bg="rgba(80, 80, 80, 0.8)"
                              border="1px solid rgba(255, 255, 255, 0.2)"
                              borderRadius="12px"
                              px={3}
                              py={2}
                              display="flex"
                              alignItems="center"
                              gap={2}
                              justifyContent="center"
                            >
                              <Box
                                w="12px"
                                h="12px"
                                bg="rgba(255, 255, 255, 0.5)"
                                borderRadius="50%"
                              />
                              <Text
                                fontSize="11px"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                fontWeight="500"
                                textAlign="center"
                              >
                                Consent Verification
                              </Text>
                            </Box>
                          </Box>
                        </VStack>
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>

              {/* Plug-in AI Modules Card - Mobile Optimized */}
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                w="full"
              >
                <Box
                  bg="rgba(68, 68, 68, 0.9)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  borderRadius="20px"
                  p={{ base: 6, md: 8 }}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    bg: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
                  }}
                >
                  <VStack spacing={6} align="stretch">
                    <Box textAlign="center">
                      <Heading
                        as="h3"
                        fontSize={{ base: "24px", md: "28px" }}
                        fontWeight="600"
                        color="white"
                        fontFamily="Inter, sans-serif"
                        mb={3}
                      >
                        Plug-in AI Modules
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "18px" }}
                        color="rgba(255, 255, 255, 0.8)"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.5"
                        maxW="300px"
                        mx="auto"
                      >
                        Bring your own OpenAI, Gemini, Claude, Mistral endpoints
                      </Text>
                    </Box>

                    <Box display="flex" justifyContent="center" py={4}>
                      <VStack spacing={6} w="full" align="center" maxW="300px">
                        <Box
                          bg="white"
                          borderRadius="25px"
                          px={8}
                          py={3}
                        >
                          <Text
                            fontSize="16px"
                            fontWeight="600"
                            color="black"
                            fontFamily="Inter, sans-serif"
                          >
                            AI Integration
                          </Text>
                        </Box>

                        <Box
                          bg="rgba(45, 45, 45, 0.9)"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          borderRadius="16px"
                          w="full"
                          h="140px"
                          position="relative"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <VStack spacing={3}>
                            <HStack spacing={3}>
                              <Box w="40px" h="40px" bg="rgba(80, 80, 80, 0.4)" borderRadius="8px" />
                              <Box w="40px" h="40px" bg="rgba(80, 80, 80, 0.4)" borderRadius="8px" />
                            </HStack>
                            <HStack spacing={3}>
                              <Box w="40px" h="40px" bg="rgba(80, 80, 80, 0.4)" borderRadius="8px" />
                              <Box w="40px" h="40px" bg="rgba(80, 80, 80, 0.4)" borderRadius="8px" />
                            </HStack>
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>
            </VStack>
          </Container>
        </Box>

        {/* Desktop Layout */}
        <Box display={{ base: "none", lg: "block" }}>
          <Container maxW="8xl" px={{ base: 0, md: 0, lg: 0 }}>
            <Grid
              templateColumns={{ base: "1fr", lg: "300px 1fr" }}
              gap={{ base: 8, lg: 16 }}
              alignItems="start"
            >
              {/* Left Column - Title */}
              <GridItem>
                <MotionBox {...fadeInLeft}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "32px", md: "48px", lg: "64px" }}
                    fontWeight="bold"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    lineHeight="1.1"
                    maxW="300px"
                  >
                    Grid Capabilities
                  </Heading>
                </MotionBox>
              </GridItem>

              {/* Right Column - Feature Cards Grid */}
              <GridItem>
                <MotionBox {...fadeInRight}>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 6, md: 8 }}
                    w="full"
                  >
                    {/* Real-Time Ops Card */}
                    <Box
                      bg="rgba(68, 68, 68, 0.8)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      borderRadius="16px"
                      p={{ base: "24px", md: "32px" }}
                      minH="280px"
                      position="relative"
                    >
                      <VStack spacing="16px" align="stretch" h="full">
                        <Box>
                          <Heading
                            as="h3"
                            fontSize={{ base: "20px", md: "24px" }}
                            fontWeight="600"
                            color="white"
                            fontFamily="Inter, sans-serif"
                            mb="8px"
                          >
                            Real-Time Ops
                          </Heading>
                          <Text
                            fontSize={{ base: "14px", md: "16px" }}
                            color="rgba(255, 255, 255, 0.8)"
                            fontFamily="Inter, sans-serif"
                            lineHeight="1.4"
                          >
                            Agents execute operations instantly via signed instructions
                          </Text>
                        </Box>

                        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                          <Box
                            bg="rgba(255, 255, 255, 0.1)"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                            borderRadius="12px"
                            p="16px"
                            w="full"
                            maxW="300px"
                          >
                            <HStack spacing="12px" align="center">
                              <Box
                                w="40px"
                                h="40px"
                                bg="rgba(255, 255, 255, 0.2)"
                                borderRadius="8px"
                                flexShrink={0}
                              />
                              <VStack spacing="8px" align="stretch" flex="1">
                                <Text
                                  fontSize="16px"
                                  fontWeight="500"
                                  color="white"
                                  fontFamily="Inter, sans-serif"
                                >
                                  Real-Time Execution
                                </Text>
                                <Box
                                  h="6px"
                                  bg="rgba(255, 255, 255, 0.2)"
                                  borderRadius="3px"
                                  position="relative"
                                  overflow="hidden"
                                >
                                  <Box
                                    h="full"
                                    w="70%"
                                    bg="rgba(255, 255, 255, 0.6)"
                                    borderRadius="3px"
                                  />
                                </Box>
                              </VStack>
                            </HStack>
                          </Box>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Micro VM-style Envs Card */}
                    <Box
                      bg="rgba(68, 68, 68, 0.8)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      borderRadius="16px"
                      p={{ base: "24px", md: "32px" }}
                      minH="280px"
                      position="relative"
                    >
                      <VStack spacing="20px" align="stretch" h="full">
                        <Box>
                          <Heading
                            as="h3"
                            fontSize={{ base: "20px", md: "24px" }}
                            fontWeight="600"
                            color="white"
                            fontFamily="Inter, sans-serif"
                            mb="8px"
                          >
                            Micro VM-style Envs
                          </Heading>
                          <Text
                            fontSize={{ base: "14px", md: "16px" }}
                            color="rgba(255, 255, 255, 0.8)"
                            fontFamily="Inter, sans-serif"
                            lineHeight="1.4"
                          >
                            Run ephemeral, secure sessions for each agent task
                          </Text>
                        </Box>

                        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                          <Box
                            bg="rgba(45, 45, 45, 0.9)"
                            border="1px solid rgba(255, 255, 255, 0.15)"
                            borderRadius="12px"
                            p="16px"
                            w="full"
                            maxW="280px"
                          >
                            <Text
                              fontSize="14px"
                              fontWeight="500"
                              color="white"
                              fontFamily="Inter, sans-serif"
                              mb="12px"
                              textAlign="center"
                            >
                              Ephemeral Sessions
                            </Text>
                            <VStack spacing="8px">
                              <Box
                                h="32px"
                                bg="rgba(80, 80, 80, 0.8)"
                                borderRadius="6px"
                                w="full"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                              />
                              <Box
                                h="32px"
                                bg="rgba(80, 80, 80, 0.8)"
                                borderRadius="6px"
                                w="full"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                              />
                            </VStack>
                          </Box>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Consent Boundaries Card */}
                    <Box
                      bg="rgba(68, 68, 68, 0.8)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      borderRadius="16px"
                      p={{ base: "24px", md: "32px" }}
                      minH="280px"
                      position="relative"
                    >
                      <VStack spacing="20px" align="stretch" h="full">
                        <Box>
                          <Heading
                            as="h3"
                            fontSize={{ base: "20px", md: "24px" }}
                            fontWeight="600"
                            color="white"
                            fontFamily="Inter, sans-serif"
                            mb="8px"
                          >
                            Consent Boundaries
                          </Heading>
                          <Text
                            fontSize={{ base: "14px", md: "16px" }}
                            color="rgba(255, 255, 255, 0.8)"
                            fontFamily="Inter, sans-serif"
                            lineHeight="1.4"
                          >
                            Every compute call passes hushh.link.verifyConsent()
                          </Text>
                        </Box>

                        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                          <Box
                            bg="rgba(45, 45, 45, 0.9)"
                            border="2px solid rgba(255, 255, 255, 0.2)"
                            borderRadius="16px"
                            p="12px"
                            w="160px"
                            h="220px"
                            position="relative"
                          >
                            {/* Mobile Phone Interface */}
                            <VStack spacing="0" h="full" justify="space-between">
                              {/* Top Progress Bar */}
                              <Box w="full" mb="16px">
                                <Box
                                  h="4px"
                                  bg="rgba(255, 255, 255, 0.2)"
                                  borderRadius="2px"
                                  w="full"
                                />
                              </Box>

                              {/* Middle - Compute Call */}
                              <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                                <Box
                                  bg="rgba(80, 80, 80, 0.8)"
                                  border="1px solid rgba(255, 255, 255, 0.2)"
                                  borderRadius="8px"
                                  px="12px"
                                  py="8px"
                                  display="flex"
                                  alignItems="center"
                                  gap="8px"
                                >
                                  <Box
                                    w="12px"
                                    h="12px"
                                    bg="rgba(255, 255, 255, 0.4)"
                                    borderRadius="50%"
                                  />
                                  <Text
                                    fontSize="11px"
                                    color="white"
                                    fontFamily="Inter, sans-serif"
                                    fontWeight="500"
                                  >
                                    Compute Call
                                  </Text>
                                </Box>
                              </Box>

                              {/* Bottom - Consent Verification */}
                              <Box w="full" mt="16px">
                                <Box
                                  bg="rgba(80, 80, 80, 0.8)"
                                  border="1px solid rgba(255, 255, 255, 0.2)"
                                  borderRadius="8px"
                                  px="8px"
                                  py="6px"
                                  display="flex"
                                  alignItems="center"
                                  gap="6px"
                                  justifyContent="center"
                                >
                                  <Box
                                    w="10px"
                                    h="10px"
                                    bg="rgba(255, 255, 255, 0.4)"
                                    borderRadius="50%"
                                  />
                                  <Text
                                    fontSize="10px"
                                    color="white"
                                    fontFamily="Inter, sans-serif"
                                    fontWeight="500"
                                  >
                                    Consent Verification
                                  </Text>
                                </Box>
                              </Box>
                            </VStack>
                          </Box>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Plug-in AI Modules Card */}
                    <Box
                      bg="rgba(68, 68, 68, 0.8)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      borderRadius="16px"
                      p={{ base: "24px", md: "32px" }}
                      minH="280px"
                      position="relative"
                    >
                      <VStack spacing="20px" align="stretch" h="full">
                        <Box>
                          <Heading
                            as="h3"
                            fontSize={{ base: "20px", md: "24px" }}
                            fontWeight="600"
                            color="white"
                            fontFamily="Inter, sans-serif"
                            mb="8px"
                          >
                            Plug-in AI Modules
                          </Heading>
                          <Text
                            fontSize={{ base: "14px", md: "16px" }}
                            color="rgba(255, 255, 255, 0.8)"
                            fontFamily="Inter, sans-serif"
                            lineHeight="1.4"
                          >
                            Bring your own OpenAI, Gemini, Claude, Mistral endpoints
                          </Text>
                        </Box>

                        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                          <VStack spacing="20px" w="full" align="center" maxW="280px">
                            {/* AI Integration Pill */}
                            <Box
                              bg="white"
                              borderRadius="20px"
                              px="20px"
                              py="10px"
                            >
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                color="black"
                                fontFamily="Inter, sans-serif"
                              >
                                AI Integration
                              </Text>
                            </Box>

                            {/* Large Dark Container */}
                            <Box
                              bg="rgba(45, 45, 45, 0.9)"
                              border="1px solid rgba(255, 255, 255, 0.15)"
                              borderRadius="12px"
                              w="full"
                              h="120px"
                              position="relative"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              {/* Subtle pattern or placeholder */}
                              <Box
                                w="80%"
                                h="60%"
                                bg="rgba(80, 80, 80, 0.3)"
                                borderRadius="8px"
                                border="1px solid rgba(255, 255, 255, 0.08)"
                              />
                            </Box>
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </MotionBox>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Agent Runtime Principles Section */}
      <Box
        bg="white"
        py={{ base: 16, md: 20, lg: 0 }}
        overflow="hidden"
      >
        <Container maxW="100%" px={0} w="full">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            minH={{ base: "auto", lg: "100vh" }}
            gap={0}
            alignItems="stretch"
          >
            {/* Left Column - Content */}
            <GridItem 
              bg="white" 
              position="relative"
              display="flex"
              alignItems="center"
            >
              <Box
                px={{ base: 6, md: 10, lg: 16 }}
                py={{ base: 0, lg: 16 }}
                w="full"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <MotionBox {...fadeInLeft}>
                  {/* Main Heading */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "28px", md: "40px", lg: "56px", xl: "64px" }}
                    fontWeight="bold"
                    color="#333333"
                    fontFamily="Inter, sans-serif"
                    letterSpacing={{ base: "-0.56px", md: "-0.8px", lg: "-1.12px", xl: "-1.28px" }}
                    lineHeight={{ base: "1.1", md: "1.15", lg: "1.2", xl: "1.2" }}
                    mb={{ base: "24px", md: "32px", lg: "48px", xl: "64px" }}
                    maxW={{ base: "100%", md: "500px", lg: "600px", xl: "624px" }}
                  >
                    Agent Runtime Principles
                  </Heading>

                  {/* Bullet Points List */}
                  <VStack spacing={{ base: "20px", md: "24px", lg: "32px", xl: "40px" }} align="stretch" mb={{ base: "32px", md: "40px", lg: "48px", xl: "60px" }}>
                    <HStack spacing={{ base: "12px", md: "14px", lg: "16px", xl: "16px" }} align="flex-start">
                      <Box
                        w={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        h={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        bg="#333333"
                        borderRadius="50%"
                        flexShrink={0}
                        mt={{ base: "8px", md: "10px", lg: "12px", xl: "12px" }}
                      />
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px", xl: "24px" }}
                        fontWeight="400"
                        color="#333333"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                        letterSpacing={{ base: "-0.32px", md: "-0.36px", lg: "-0.4px", xl: "-0.48px" }}
                      >
                        Stateless when possible, stateful via Vault only
                      </Text>
                    </HStack>

                    <HStack spacing={{ base: "12px", md: "14px", lg: "16px", xl: "16px" }} align="flex-start">
                      <Box
                        w={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        h={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        bg="#333333"
                        borderRadius="50%"
                        flexShrink={0}
                        mt={{ base: "8px", md: "10px", lg: "12px", xl: "12px" }}
                      />
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px", xl: "24px" }}
                        fontWeight="400"
                        color="#333333"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                        letterSpacing={{ base: "-0.32px", md: "-0.36px", lg: "-0.4px", xl: "-0.48px" }}
                      >
                        Sandbox per request
                      </Text>
                    </HStack>

                    <HStack spacing={{ base: "12px", md: "14px", lg: "16px", xl: "16px" }} align="flex-start">
                      <Box
                        w={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        h={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        bg="#333333"
                        borderRadius="50%"
                        flexShrink={0}
                        mt={{ base: "8px", md: "10px", lg: "12px", xl: "12px" }}
                      />
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px", xl: "24px" }}
                        fontWeight="400"
                        color="#333333"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                        letterSpacing={{ base: "-0.32px", md: "-0.36px", lg: "-0.4px", xl: "-0.48px" }}
                      >
                        Opt-in sharing with other agents only via signed MCP token
                      </Text>
                    </HStack>

                    <HStack spacing={{ base: "12px", md: "14px", lg: "16px", xl: "16px" }} align="flex-start">
                      <Box
                        w={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        h={{ base: "6px", md: "7px", lg: "8px", xl: "8px" }}
                        bg="#333333"
                        borderRadius="50%"
                        flexShrink={0}
                        mt={{ base: "8px", md: "10px", lg: "12px", xl: "12px" }}
                      />
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px", xl: "24px" }}
                        fontWeight="400"
                        color="#333333"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.4"
                        letterSpacing={{ base: "-0.32px", md: "-0.36px", lg: "-0.4px", xl: "-0.48px" }}
                      >
                        TTLs and scope checks enforced on every execution
                      </Text>
                    </HStack>
                  </VStack>

                  {/* Bottom Description */}
                  <Text
                    fontSize={{ base: "16px", md: "18px", lg: "20px", xl: "24px" }}
                    fontWeight="400"
                    color="#333333"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.4"
                    letterSpacing={{ base: "-0.32px", md: "-0.36px", lg: "-0.4px", xl: "-0.48px" }}
                    maxW={{ base: "100%", md: "500px", lg: "550px", xl: "600px" }}
                  >
                    Every transaction is cryptographically logged and distributed via Hushh Flow.
                  </Text>
                </MotionBox>
              </Box>
            </GridItem>

            {/* Right Column - Agent Runtime Image */}
            <GridItem 
              bg="#000000" 
              position="relative"
              minH={{ base: "400px", md: "500px", lg: "100vh", xl: "100vh" }}
              display={{md:"flex",base:"none"}}
              alignItems="center"
              justifyContent="center"
            >
              <MotionBox {...fadeInRight} h="full" w="full" position="relative" display="flex" alignItems="center" justifyContent="center">
                {/* Agent Runtime Image */}
                <Box
                  py={{ base: "40px", md: "50px", lg: "0", xl: "0" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  h="full"
                  w="full"
                >
                  <Image 
                    src={AgentRuntime} 
                    alt="Agent Runtime" 
                    width={{ base: "280px", md: "350px", lg: "400px", xl: "500px" }}
                    height={{ base: "200px", md: "250px", lg: "300px", xl: "400px" }}
                    objectFit="contain"
                  />
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

       {/* Sample Usecase Section */}
       <Box
        bg="#f5f5f7"
        position="relative"
        py={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
        overflow="hidden"
        mt={{ base: 0, md: 0, lg: 0, xl: 0 }}
      >
        <Container 
          maxW="8xl" 
          px={{ base: "24px", md: "40px", lg: "60px", xl: "80px" }}
          position="relative" 
          zIndex={2}
        >
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign="left"
            mb={{ base: "48px", md: "64px", lg: "80px", xl: "96px" }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "2xl", sm: "4xl", md: "4xl", lg: "7xl", xl: "8xl" }}
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
            align={{ base: "center", lg: "stretch" }}
            gap={{ base: "24px", md: "32px", lg: "24px" }}
            maxW="7xl"
            mx="auto"
          >
            {/* Card 1 - Nike */}
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
                borderRadius={'29px'}
                overflow="hidden"
                // boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/usecasebggrid1.svg'} 
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
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
                    color="#FFFFFF"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Run my daily summary at 7am with updated calendar + email context
                  </Text>
                </Box>
              </Box>
            </MotionBox>

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
                borderRadius={'29px'}
                overflow="hidden"
                // boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/usecasebggrid2.svg'} 
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
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
                    color="#FFFFFF"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Query Vault for spending over ₹10,000 in last 30 days, trigger flow if true
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
                borderRadius={'29px'}
                overflow="hidden"
                // boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/usecasebggrid3.svg'}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
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
                    color="#FFFFFF"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Match friend's Spotify mood to my saved music tags — suggest meet-up song
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          </Flex>

          
        </Container>
      </Box>

         {/* Agent Stores + Marketplace Integration Section */}
         <Box
        bg="#f5f5f7"
        position="relative"
        py={{ base: "60px", md: "80px", lg: "120px" }}
        minH={{ base: "auto", lg: "100vh" }}
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
            {/* Left Column - Agent Stores + Marketplace Integration */}
            <GridItem px={{ base: "32px", md: "48px", lg: "120px" }} py={{ base: "40px", md: "60px", lg: "80px" }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: "32px", md: "40px", lg: "56px" }} align="start" w="full">
                  {/* Main Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                    fontWeight="bold"
                    color="#333333"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.2"
                    mb={{ base: "24px", md: "32px", lg: "40px" }}
                  >
                    Agent Stores + Marketplace Integration
                  </Heading>

                  {/* Deploy directly to Section */}
                  <VStack spacing={{ base: "20px", md: "24px", lg: "28px" }} align="start" w="full">
                    {/* Deploy Heading */}
                    <Text
                      fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                      fontWeight="medium"
                      color="#383737"
                      fontFamily="Inter, sans-serif"
                      lineHeight="35px"
                    >
                      Deploy directly to:
                    </Text>

                    {/* Marketplace List */}
                    <VStack spacing={{ base: "16px", md: "18px", lg: "20px" }} align="start" w="full" pl={{ base: "16px", md: "20px", lg: "24px" }}>
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                      >
                        <Flex align="center" gap="16px">
                          <Box
                            w="8px"
                            h="8px"
                            bg="#383737"
                            borderRadius="full"
                            flexShrink={0}
                          />
                          <Text
                            fontSize={{ base: "12px", md: "18px", lg: "24px" }}
                            fontWeight="medium"
                            color="#383737"
                            fontFamily="Inter, sans-serif"
                            lineHeight="56px"
                          >
                            OpenAI Agents store
                          </Text>
                        </Flex>
                      </MotionBox>

                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      >
                        <Flex align="center" gap="16px">
                          <Box
                            w="8px"
                            h="8px"
                            bg="#383737"
                            borderRadius="full"
                            flexShrink={0}
                          />
                          <Text
                            fontSize={{ base: "12px", md: "18px", lg: "24px" }}
                            fontWeight="medium"
                            color="#383737"
                            fontFamily="Inter, sans-serif"
                            lineHeight="56px"
                          >
                            GitHub Action templates
                          </Text>
                        </Flex>
                      </MotionBox>

                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      >
                        <Flex align="center" gap="16px">
                          <Box
                            w="8px"
                            h="8px"
                            bg="#383737"
                            borderRadius="full"
                            flexShrink={0}
                          />
                          <Text
                            fontSize={{ base: "12px", md: "18px", lg: "24px" }}
                            fontWeight="medium"
                            color="#383737"
                            fontFamily="Inter, sans-serif"
                            lineHeight="56px"
                          >
                            Salesforce AppExchange
                          </Text>
                        </Flex>
                      </MotionBox>

                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                      >
                        <Flex align="center" gap="16px">
                          <Box
                            w="8px"
                            h="8px"
                            bg="#383737"
                            borderRadius="full"
                            flexShrink={0}
                          />
                          <Text
                            fontSize={{ base: "12px", md: "18px", lg: "24px" }}
                            fontWeight="medium"
                            color="#383737"
                            fontFamily="Inter, sans-serif"
                            lineHeight="56px"
                          >
                            GCP Marketplace
                          </Text>
                        </Flex>
                      </MotionBox>
                    </VStack>
                  </VStack>

                  {/* Bottom Text */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    // mt={{ base: "40px", md: "50px", lg: "60px" }}
                  >
                    <Text
                      fontSize={{ base: "18px", md: "22px", lg: "24px" }}
                      fontWeight="medium"
                      color="#383737"
                      fontFamily="Inter, sans-serif"
                      lineHeight="1.5"
                      maxW="600px"
                    >
                      Build once, run anywhere. Sell agents like apps, backed by Grid
                    </Text>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Security & Privacy */}
            <GridItem px={{ base: "32px", md: "48px", lg: "125px" }} py={{ base: "40px", md: "60px", lg: "100px" }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: "32px", md: "40px", lg: "56px" }} align="start" w="full">
                  {/* Main Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                    fontWeight="bold"
                    color="#333333"
                    fontFamily="Inter, sans-serif"
                    lineHeight={{ base: "1.3", md: "1.4", lg: "68px" }}
                    letterSpacing="-0.96px"
                    maxW="644px"
                  >
                    Security & Privacy
                  </Heading>

                  {/* Security Features List */}
                  <VStack spacing={{ base: "28px", md: "32px", lg: "36px" }} align="start" w="full" pl={{ base: "16px", md: "20px", lg: "12px" }}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                      <Flex align="start" gap="16px">
                        <Box
                          w="8px"
                          h="8px"
                          bg="#383737"
                          borderRadius="full"
                          flexShrink={0}
                          mt="14px"
                        />
                        <Text
                          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                          fontWeight="medium"
                          color="#383737"
                          fontFamily="Inter, sans-serif"
                          lineHeight="35px"
                        >
                          Agent runs behind Vault and Link
                        </Text>
                      </Flex>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                      <Flex align="start" gap="16px">
                        <Box
                          w="8px"
                          h="8px"
                          bg="#383737"
                          borderRadius="full"
                          flexShrink={0}
                          mt="14px"
                        />
                        <Text
                          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                          fontWeight="medium"
                          color="#383737"
                          fontFamily="Inter, sans-serif"
                          lineHeight="35px"
                        >
                          Granular compute metering and user-aware rate limits
                        </Text>
                      </Flex>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                      <Flex align="start" gap="16px">
                        <Box
                          w="8px"
                          h="8px"
                          bg="#383737"
                          borderRadius="full"
                          flexShrink={0}
                          mt="14px"
                        />
                        <Text
                          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                          fontWeight="medium"
                          color="#383737"
                          fontFamily="Inter, sans-serif"
                          lineHeight="35px" 
                        >
                          Audit logs for every function, user, scope, and outcome
                        </Text>
                      </Flex>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                      <Flex align="start" gap="16px">
                        <Box
                          w="8px"
                          h="8px"
                          bg="#383737"
                          borderRadius="full"
                          flexShrink={0}
                          mt="14px"
                        />
                        <Text
                          fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                          fontWeight="medium"
                          color="#383737"
                          fontFamily="Inter, sans-serif"
                          lineHeight="35px" 
                        >
                          E2E encrypted job tokens for long-running agent logic
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



export default HushhGrid