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

      
    </>
  )
}

export default HushhGrid