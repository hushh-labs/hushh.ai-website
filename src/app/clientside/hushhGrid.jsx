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
import ContactForm from '../_components/features/contactForm';




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
        {/* Mobile Layout - Keep existing mobile design */}
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

            {/* Mobile Cards - Keep existing mobile cards */}
            <VStack spacing={8} w="full">
              {/* Real-Time Ops Card - Mobile */}
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
                      <Box mt={4}alignItems={'center'} display={'flex'} justifyContent={'center'}>
                        <Image 
                          src="/realtime.svg" 
                          alt="Real-Time Operations" 
                          width={250}
                          height={180}
                          style={{ 
                            borderRadius: '10px',
                            filter: 'grayscale(100%)',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>

              {/* Other mobile cards with grayscale filters */}
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
                        w="full"
                        maxW="300px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image 
                          src="/empherelsession.svg" 
                          alt="Ephemeral Sessions" 
                          width={250}
                          height={180}
                          style={{ 
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }}
                        />
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>

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
                        w="full"
                        maxW="280px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image 
                          src="/consentboundaries.svg" 
                          alt="Consent Boundaries" 
                          width={250}
                          height={180}
                          style={{ 
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }}
                        />
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>

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
                      <Box
                        w="full"
                        maxW="300px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image 
                          src="/aimodules.svg" 
                          alt="AI Modules Integration" 
                          width={250}
                          height={180}
                          style={{ 
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }}
                        />
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>
            </VStack>
          </Container>
        </Box>

        {/* Desktop Layout - New Bento Grid Design */}
        <Box display={{ base: "none", lg: "block" }}>
          <Container maxW="100%" px={{ lg: 4, xl: 8 }}>
            <Box w="full" mx="auto">
              <Flex direction="row" gap={0} w="full" align="stretch">
                {/* Left Column - Grid Capabilities Title */}
                <Box
                  w={{ lg: "400px", xl: "500px", "2xl": "575px" }}
                  display="flex"
                  alignItems="flex-start"
                  flex={0.35}
                  justifyContent="flex-start"
                  // pr={{ lg: "40px", xl: "60px", "2xl": "81px" }}
                  py={{ lg: "40px", xl: "51px" }}
                  flexShrink={0}
                >
                  <MotionBox {...fadeInLeft}>
                    <Heading
                      as="h2"
                      fontSize={{ lg: "48px", xl: "56px", "2xl": "64px" }}
                      fontWeight="bold"
                      color="white"
                      fontFamily="Inter, sans-serif"
                      letterSpacing={{ lg: "-0.96px", xl: "-1.12px", "2xl": "-1.28px" }}
                      lineHeight={{ lg: "44px", xl: "48px", "2xl": "52px" }}
                      textAlign="left"
                      maxW={{ lg: "350px", xl: "450px", "2xl": "500px" }}
                    >
                      Grid<br />Capabilities
                    </Heading>
                  </MotionBox>
                </Box>

                {/* Right Column - Bento Grid */}
                <Box 
                  flex="0.65" 
                  py={{ lg: "40px", xl: "51px" }}
                  pr={{ lg: 4, xl: 8 }}
                  // maxW={{ lg: "900px", xl: "1100px", "2xl": "1284px" }}
                >
                  <MotionBox {...fadeInRight}>
                    <VStack spacing={{ lg: "20px", xl: "24px" }} w="full">
                      {/* Row 1: Real-Time Ops (wide) + Micro VM-style Envs (square) */}
                      <Flex gap={{ lg: "20px", xl: "24px" }} w="full">
                        {/* Real-Time Ops Card - Wide */}
                        <Box
                          w={{ lg: "400px", xl: "440px", "2xl": "480px" }}
                          h={{ lg: "400px", xl: "440px", "2xl": "480px" }}
                          bgGradient="linear(to-b, #3e3e3e 0%, rgba(164, 164, 164, 0.18) 65.952%)"
                          borderRadius="16px"
                          border="1px solid #ffffff"
                          position="relative"
                          overflow="hidden"
                          flexShrink={0} 
                        >
                          <Flex direction="column" h="full" pt={{ lg: "24px", xl: "28px", "2xl": "32px" }} px={{ lg: "24px", xl: "28px", "2xl": "32px" }}>
                            {/* Text Content */}
                            <Box mb="0px">
                              <Heading
                                as="h3"
                                fontSize={{ lg: "24px", xl: "26px", "2xl": "28px" }}
                                fontWeight="bold"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                letterSpacing="-0.28px"
                                lineHeight="32px"
                                mb="8px"
                              >
                                Real-Time Ops
                              </Heading>
                              <Text
                                fontSize={{ lg: "18px", xl: "19px", "2xl": "20px" }}
                                fontWeight="400"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                lineHeight="24px"
                              >
                                Agents execute operations instantly via signed instructions
                              </Text>
                            </Box>
                            
                            {/* Image Container */}
                            <Box flex="1" position="relative" borderRadius={'10px'} w="full">
                              
                                <Image 
                                  src="/realtime.svg" 
                                  alt="Real-Time Operations" 
                                  fill
                                  style={{ 
                                    // border: '1px solid #ffffff',
                                    filter: 'grayscale(100%)',
                                    borderRadius: '10px'
                                  }}
                                />
                              {/* </Box> */}
                            </Box>
                          </Flex>
                        </Box>

                        {/* Micro VM-style Envs Card - Square */}
                        <Box
                         

                          flex="1"
                          h={{ lg: "400px", xl: "440px", "2xl": "480px" }}
                          bgGradient="linear(to-b, #3e3e3e 0%, rgba(164, 164, 164, 0.18) 65.952%)"
                          borderRadius="16px"
                          border="1px solid #ffffff"
                          position="relative"
                          overflow="hidden"
                        >
                          <Flex direction="column" h="full" pt={{ lg: "24px", xl: "28px", "2xl": "32px" }} px={{ lg: "24px", xl: "28px", "2xl": "32px" }}>
                            {/* Text Content */}
                            <Box mb="20px">
                              <Heading
                                as="h3"
                                fontSize={{ lg: "24px", xl: "26px", "2xl": "28px" }}
                                fontWeight="bold"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                letterSpacing="-0.28px"
                                lineHeight="32px"
                                mb="8px"
                              >
                                Micro VM-style Envs
                              </Heading>
                              <Text
                                fontSize={{ lg: "18px", xl: "19px", "2xl": "20px" }}
                                fontWeight="400"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                lineHeight="24px"
                              >
                                Run ephemeral, secure sessions for each agent task
                              </Text>
                            </Box>
                            
                            {/* Ephemeral Sessions Container */}
                            <Box flex="1" position="relative" w="full">
                              <Box      
                                bgGradient="linear(to-b, #000000 0%, rgba(102, 102, 102, 0.16) 100%)"
                                borderRadius="16px"
                                p={{ lg: "20px", xl: "24px", "2xl": "28px" }}
                                boxShadow="15px 128px 36px 0px rgba(0,0,0,0), 10px 82px 33px 0px rgba(0,0,0,0.01), 5px 46px 28px 0px rgba(0,0,0,0.04), 2px 20px 21px 0px rgba(0,0,0,0.06), 1px 5px 11px 0px rgba(0,0,0,0.08)"
                              >
                                <Image
                                  src="/empherelsession.svg"
                                  alt="Ephemeral Sessions"
                                  fill
                                  style={{ borderRadius: '10px', objectFit: 'contain' , filter: 'grayscale(100%)'}}
                                />
                              </Box>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>

                      {/* Row 2: Consent Boundaries (square) + Plug-in AI Modules (wide) */}
                      <Flex gap={{ lg: "20px", xl: "24px" }} w="full">
                        {/* Consent Boundaries Card - Square */}
                        <Box
                          w={{ lg: "400px", xl: "440px", "2xl": "480px" }}
                          h={{ lg: "400px", xl: "440px", "2xl": "480px" }}
                            bgGradient="linear(to-b, #000000 0%, rgba(102, 102, 102, 0.69) 100%)"
                          borderRadius="16px"
                          border="1px solid #ffffff"
                          position="relative"
                          overflow="hidden"
                          flexShrink={0}
                        >
                          <Flex direction="column" h="full" pt={{ lg: "24px", xl: "28px", "2xl": "32px" }} px={{ lg: "24px", xl: "28px", "2xl": "32px" }}>
                            {/* Text Content */}
                            <Box mb="20px">
                              <Heading
                                as="h3"
                                fontSize={{ lg: "24px", xl: "26px", "2xl": "28px" }}
                                fontWeight="bold"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                letterSpacing="-0.28px"
                                lineHeight="32px"
                                mb="8px"
                              >
                                Consent Boundaries
                              </Heading>
                              <Text
                                fontSize={{ lg: "18px", xl: "19px", "2xl": "20px" }}
                                fontWeight="400"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                lineHeight="24px"
                              >
                                Every compute call passes hushh.link.verifyConsent()
                              </Text>
                            </Box>
                            
                            {/* Complex UI Container */}
                            <Box flex="1" position="relative" w="full">
                              {/* Main Container */}
                              <Box
                                position="absolute"
                                top={{ lg: "25px", xl: "30px", "2xl": "33px" }}
                                left="50%"
                                transform="translateX(-50%)"
                                w={{ lg: "240px", xl: "270px", "2xl": "296px" }}
                                h={{ lg: "320px", xl: "360px", "2xl": "404px" }}
                                bgGradient="linear(to-b, #000000 0%, rgba(102, 102, 102, 0.69) 100%)"
                                borderRadius="16px"
                                border="1px solid #ffffff"
                                overflow="hidden"
                                boxShadow="15px 128px 36px 0px rgba(0,0,0,0), 10px 82px 33px 0px rgba(0,0,0,0.01), 5px 46px 28px 0px rgba(0,0,0,0.04), 2px 20px 21px 0px rgba(0,0,0,0.06), 1px 5px 11px 0px rgba(0,0,0,0.08)"
                              >
                                {/* Header section */}
                                <Box
                                  position="absolute"
                                  top={{ lg: "20px", xl: "24px", "2xl": "28px" }}
                                  left={{ lg: "20px", xl: "24px", "2xl": "28px" }}
                                  w={{ lg: "110px", xl: "125px", "2xl": "142px" }}
                                  h={{ lg: "25px", xl: "28px", "2xl": "32px" }}
                                  bg="rgba(255, 255, 255, 0.2)"
                                  borderRadius="8px"
                                />
                                
                                {/* Primary section */}
                                <Box
                                  position="absolute"
                                  top={{ lg: "60px", xl: "70px", "2xl": "80px" }}
                                  left={{ lg: "20px", xl: "24px", "2xl": "28px" }}
                                  right={{ lg: "20px", xl: "24px", "2xl": "28px" }}
                                  bottom={{ lg: "20px", xl: "24px", "2xl": "28px" }}
                                  bg="rgba(255, 255, 255, 0.2)"
                                  borderRadius="8px"
                                  opacity="0.5"
                                />
                                
                                {/* Background image effect */}
                                <Box
                                  // position="absolute"
                                  // left="-300px"
                                  // top="-250px"
                                  w="800px"
                                  h="800px"
                                  backgroundImage="url('/consentboundaries.svg')"
                                  // backgroundSize="cover"
                                  backgroundPosition="center"
                                  filter="grayscale(100%)"
                                />
                              </Box>

                              {/* Compute Call Container */}
                              <Box
                                position="absolute"
                                top={{ lg: "130px", xl: "145px", "2xl": "158px" }}
                                left={{ lg: "calc(50% + 120px)", xl: "calc(50% + 135px)", "2xl": "calc(50% + 146.5px)" }}
                                transform="translateX(-50%)"
                                w={{ lg: "185px", xl: "210px", "2xl": "231px" }}
                                h={{ lg: "60px", xl: "66px", "2xl": "72px" }}
                                bgGradient="linear(to-b, #000000 0%, rgba(102, 102, 102, 0.69) 100%)"
                                borderRadius="16px"
                                border="1px solid #ffffff"
                                boxShadow="15px 128px 36px 0px rgba(0,0,0,0), 10px 82px 33px 0px rgba(0,0,0,0.01), 5px 46px 28px 0px rgba(0,0,0,0.04), 2px 20px 21px 0px rgba(0,0,0,0.06), 1px 5px 11px 0px rgba(0,0,0,0.08)"
                                display="flex"
                                alignItems="center"
                                pl={{ lg: "50px", xl: "60px", "2xl": "69px" }}
                              >
                                <Text
                                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                                  fontWeight="400"
                                  color="white"
                                  fontFamily="Inter, sans-serif"
                                  lineHeight="24px"
                                >
                                  Compute Call
                                </Text>
                              </Box>

                              {/* Consent Verification Container */}
                              <Box
                                position="absolute"
                                top={{ lg: "140px",md:'0px', xl: "265px", "2xl": "289px" }}
                                left={{ lg: "calc(50% - 85px)", xl: "calc(50% - 95px)", "2xl": "calc(50% - 104px)" }}
                                transform="translateX(-50%)"
                                w={{ lg: "250px", xl: "280px", "2xl": "310px" }}
                                h={{ lg: "60px", xl: "66px", "2xl": "72px" }}
                                bgGradient="linear(to-b, #000000 0%, rgba(102, 102, 102, 0.69) 100%)"
                                borderRadius="16px"
                                border="1px solid #ffffff"
                                boxShadow="15px 128px 36px 0px rgba(0,0,0,0), 10px 82px 33px 0px rgba(0,0,0,0.01), 5px 46px 28px 0px rgba(0,0,0,0.04), 2px 20px 21px 0px rgba(0,0,0,0.06), 1px 5px 11px 0px rgba(0,0,0,0.08)"
                                display="flex"
                                alignItems="center"
                                pl={{ lg: "50px", xl: "60px", "2xl": "69px" }}
                              >
                                <Text
                                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                                  fontWeight="400"
                                  color="white"
                                  fontFamily="Inter, sans-serif"
                                  lineHeight="24px"
                                >
                                  Consent Verification
                                </Text>
                              </Box>
                            </Box>
                          </Flex>
                        </Box>

                        {/* Plug-in AI Modules Card - Wide */}
                        <Box
                          flex="1"
                          h={{ lg: "400px", xl: "440px", "2xl": "480px" }}
                          bgGradient="linear(to-b, #000000 0%, rgba(102, 102, 102, 0.69) 100%)"
                          borderRadius="16px"
                          border="1px solid #ffffff"
                          position="relative"
                          overflow="hidden"
                        >
                          <Flex direction="column" h="full" pt={{ lg: "24px", xl: "28px", "2xl": "32px" }} px={{ lg: "32px", xl: "40px", "2xl": "48px" }}>
                            {/* Text Content */}
                            <Box mb={{ lg: "20px", xl: "22px", "2xl": "24px" }}>
                              <Heading
                                as="h3"
                                fontSize={{ lg: "24px", xl: "26px", "2xl": "28px" }}
                                fontWeight="bold"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                letterSpacing="-0.28px"
                                lineHeight="32px"
                                mb="6px"
                              >
                                Plug-in AI Modules
                              </Heading>
                              <Text
                                fontSize={{ lg: "18px", xl: "19px", "2xl": "20px" }}
                                fontWeight="400"
                                color="white"
                                fontFamily="Inter, sans-serif"
                                lineHeight="24px"
                              >
                                Bring your own OpenAI, Gemini, Claude, Mistral endpoints
                              </Text>
                              <Box 
                              flex="1" 
                              borderRadius="13px" 
                              overflow="hidden"
                              display="flex"
                              my={{md:'5rem',base:'0'}}
                              alignItems="center"
                              justifyContent="center"
                              bg="rgba(255, 255, 255, 0.05)"
                            >
                              <Image 
                                src="/aimodules.svg" 
                                alt="AI Modules Integration" 
                                width={500}
                                height={300}
                                style={{ 
                                  objectFit: 'contain',
                                  filter: 'grayscale(100%)',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                              />
                              </Box>
                            </Box>
                            
                           
                           
                              
                            
                          </Flex>
                        </Box>
                      </Flex>
                    </VStack>
                  </MotionBox>
                </Box>
              </Flex>
            </Box>
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
        py={{ base: "40px", md: "80px", lg: "100px", xl: "120px" }}
        overflow="hidden"
        mt={{ base: 0, md: 0, lg: 0, xl: 0 }}
      >
        <Container 
          maxW="8xl" 
          px={{ base: "16px", md: "40px", lg: "60px", xl: "80px" }}
          position="relative" 
          zIndex={2}
        >
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign={{ base: "center", md: "left" }}
            mb={{ base: "32px", md: "64px", lg: "80px", xl: "96px" }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "32px", sm: "40px", md: "48px", lg: "64px", xl: "80px" }}
              fontWeight="bold"
              color="#333333"
              letterSpacing="tight"
              lineHeight={{ base: "1.1", md: "1.0" }}
              fontFamily="Inter, sans-serif"
              maxW="6xl"
              mx={{ base: "auto", md: "0" }}
            >
              Sample Usecase
            </Heading>
          </MotionBox>

          {/* Use Case Cards */}
          <VStack
            spacing={{ base: "20px", md: "24px" }}
            align="stretch"
            display={{ base: "flex", lg: "none" }}
            w="full"
          >
            {/* Mobile Card 1 */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              w="full"
            >
              <Box
                position="relative"
                w="full"
                h="200px"
                borderRadius="20px"
                overflow="hidden"
                backgroundImage="/usecasebggrid1.svg"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
                _active={{
                  transform: "scale(0.98)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
                }}
                transition="all 0.2s ease"
              >
                {/* Mobile Text Overlay */}
                <Box
                  position="absolute"
                  top="16px"
                  left="16px"
                  right="16px"
                  zIndex={1}
                  display="flex"
                  alignItems="flex-start"
                  h="calc(100% - 32px)"
                >
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color="#FFFFFF"
                    lineHeight="1.3"
                    letterSpacing="-0.02em"
                    fontFamily="Inter, sans-serif"
                    textShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
                    maxW="280px"
                  >
                    Run my daily summary at 7am with updated calendar + email context
                  </Text>
                </Box>
              </Box>
            </MotionBox>

            {/* Mobile Card 2 */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              w="full"
            >
              <Box
                position="relative"
                w="full"
                h="200px"
                borderRadius="20px"
                overflow="hidden"
                backgroundImage="/usecasebggrid2.svg"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
                _active={{
                  transform: "scale(0.98)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
                }}
                transition="all 0.2s ease"
              >
                {/* Mobile Text Overlay */}
                <Box
                  position="absolute"
                  top="16px"
                  left="16px"
                  right="16px"
                  zIndex={1}
                  display="flex"
                  alignItems="flex-start"
                  h="calc(100% - 32px)"
                >
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color="#FFFFFF"
                    lineHeight="1.3"
                    letterSpacing="-0.02em"
                    fontFamily="Inter, sans-serif"
                    textShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
                    maxW="280px"
                  >
                    Query Vault for spending over ₹10,000 in last 30 days, trigger flow if true
                  </Text>
                </Box>
              </Box>
            </MotionBox>

            {/* Mobile Card 3 */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              w="full"
            >
              <Box
                position="relative"
                w="full"
                h="200px"
                borderRadius="20px"
                overflow="hidden"
                backgroundImage="/usecasebggrid3.svg"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                cursor="pointer"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
                _active={{
                  transform: "scale(0.98)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
                }}
                transition="all 0.2s ease"
              >
                {/* Mobile Text Overlay */}
                <Box
                  position="absolute"
                  top="16px"
                  left="16px"
                  right="16px"
                  zIndex={1}
                  display="flex"
                  alignItems="flex-start"
                  h="calc(100% - 32px)"
                >
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color="#FFFFFF"
                    lineHeight="1.3"
                    letterSpacing="-0.02em"
                    fontFamily="Inter, sans-serif"
                    textShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
                    maxW="280px"
                  >
                    Match friend's Spotify mood to my saved music tags — suggest meet-up song
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          </VStack>

          {/* Desktop Cards Layout */}
          <Flex
            direction="row"
            justify="center"
            align="stretch"
            gap={{ md: "32px", lg: "24px" }}
            maxW="7xl"
            mx="auto"
            display={{ base: "none", lg: "flex" }}
          >
            {/* Desktop Card 1 */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              flex="1"
              maxW="sm"
            >
              <Box
                position="relative"
                w="full"
                h={{ md: "md", lg: "md" }}
                borderRadius="29px"
                overflow="hidden"
                backgroundImage="/usecasebggrid1.svg"
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
                {/* Desktop Text Overlay */}
                <Box
                  position="absolute"
                  top={{ md: 5, lg: 6 }}
                  left={{ md: 5, lg: 6 }}
                  right={{ md: 5, lg: 6 }}
                  zIndex={1}
                >
                  <Text
                    fontSize={{ md: "2xl", lg: "3xl" }}
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

            {/* Desktop Card 2 */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              flex="1"
              maxW="sm"
            >
              <Box
                position="relative"
                w="full"
                h={{ md: "md", lg: "md" }}
                borderRadius="29px"
                overflow="hidden"
                backgroundImage="/usecasebggrid2.svg"
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
                {/* Desktop Text Overlay */}
                <Box
                  position="absolute"
                  top={{ md: 5, lg: 6 }}
                  left={{ md: 5, lg: 6 }}
                  right={{ md: 5, lg: 6 }}
                  zIndex={1}
                >
                  <Text
                    fontSize={{ md: "2xl", lg: "3xl" }}
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

            {/* Desktop Card 3 */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              flex="1"
              maxW="sm"
            >
              <Box
                position="relative"
                w="full"
                h={{ md: "md", lg: "md" }}
                borderRadius="29px"
                overflow="hidden"
                backgroundImage="/usecasebggrid3.svg"
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
                {/* Desktop Text Overlay */}
                <Box
                  position="absolute"
                  top={{ md: 5, lg: 6 }}
                  left={{ md: 5, lg: 6 }}
                  right={{ md: 5, lg: 6 }}
                  zIndex={1}
                >
                  <Text
                    fontSize={{ md: "2xl", lg: "3xl" }}
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
                            fontSize={{ base: "16px", md: "18px", lg: "24px" }}
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
                            fontSize={{ base: "16px", md: "18px", lg: "24px" }}
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
                            fontSize={{ base: "16px", md: "18px", lg: "24px" }}
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
                            fontSize={{ base: "16px", md: "18px", lg: "24px" }}
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
                          fontSize={{ base: "18px", md: "28px", lg: "32px" }}
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
                          fontSize={{ base: "18px", md: "28px", lg: "32px" }}
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
                          fontSize={{ base: "18px", md: "28px", lg: "32px" }}
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
                          fontSize={{ base: "18px", md: "28px", lg: "32px" }}
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
      <ContactForm/>
    </>
  )
}



export default HushhGrid