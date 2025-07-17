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
import { FaApple, FaFolder, FaLink, FaShieldAlt } from 'react-icons/fa';
import HushhLinkBox from '../_components/svg/hushhLink/hushhLinkBox.svg'
import Image from 'next/image';
import HushhTrail from '../_components/svg/hushhLink/audit-trail.svg'
import ConsentBasedIcon from '../_components/svg/hushhFlow/consentBasedIcon.svg'
import TransparentRevenueIcon from '../_components/svg/hushhFlow/transparentRevenueIcon.svg'
import ReplaceIcon from '../_components/svg/hushhFlow/replacesIcon.svg'

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HushhFlow = () => {
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
                  Hushh Flow
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
                Earn with Integrity. Share with Consent.
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
 Hushh Flow powers fair, transparent monetization between users, agents, and the brands that serve them — all with trust at the core.
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
                    Join Flow Pilot
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
                    View Revenue Plans
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

      {/* What Is the Hushh Flow Section */}
      <Box
        position="relative"
        minH={{ base: "auto", lg: "100vh" }}
        overflow="hidden"
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          minH={{ base: "auto", lg: "100vh" }}
        >
          {/* Left Side - White Background */}
          <GridItem
            bg="#ffffff"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            py={{ base: 16, md: 20, lg: 24 }}
            px={{ base: 6, md: 8, lg: 12, xl: 16 }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              maxW="2xl"
              w="full"
            >
              <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="start">
                {/* Main Title */}
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "5xl" }}
                  fontWeight="bold"
                  color="#000000"
                  lineHeight="shorter"
                  letterSpacing="tight"
                  fontFamily="Inter, sans-serif"
                >
                  What Is the Hushh Flow?
                </Heading>

                {/* Description */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <Text
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    fontWeight="medium"
                    color="#000000"
                    lineHeight="relaxed"
                    fontFamily="Inter, sans-serif"
                    maxW="lg"
                  >
                    Hushh Flow powers fair, transparent monetization between users, agents, and brands. No privacy violations—consent is at the core.
                  </Text>
                </MotionBox>

                {/* Feature Boxes */}
                <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="start" w="full" maxW="2xl">
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
                      p={{ base: 4, md: 5, lg: 6 }}
                      gap={{ base: 3, md: 4, lg: 5 }}
                      minH={{ base: 12, md: 14, lg: 16 }}
                    >
                      <Box flexShrink={0}>
                        <Image 
                          src={ConsentBasedIcon}
                          alt=""
                          style={{ 
                            width: '32px', 
                            height: '32px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                        fontWeight="medium"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="relaxed"
                      >
                        Consent-based data sharing = clean, high-quality intent
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
                      p={{ base: 4, md: 5, lg: 6 }}
                      gap={{ base: 3, md: 4, lg: 5 }}
                      minH={{ base: 12, md: 14, lg: 16 }}
                    >
                      <Box flexShrink={0}>
                        <Image 
                          src={TransparentRevenueIcon}
                          alt=""
                          style={{ 
                            width: '32px', 
                            height: '32px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                        fontWeight="medium"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="relaxed"
                      >
                        Transparent revenue models between user + brand + agent
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
                      p={{ base: 4, md: 5, lg: 6 }}
                      gap={{ base: 3, md: 4, lg: 5 }}
                      minH={{ base: 12, md: 14, lg: 16 }}
                    >
                      <Box flexShrink={0}>
                        <Image 
                          src={ReplaceIcon}
                          alt=""
                          style={{ 
                            width: '32px', 
                            height: '32px',
                            display: 'block'
                          }} 
                        />
                      </Box>
                      <Text
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                        fontWeight="medium"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        lineHeight="relaxed"
                      >
                        Replaces ad surveillance with opt-in performance loops
                      </Text>
                    </Flex>
                  </MotionBox>
                </VStack>

                {/* Bottom Gradient Text */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  mt={{ base: 8, md: 10, lg: 12 }}
                >
                  <Text
                    fontSize={{ base: "md", md: "xl", lg: "2xl", xl: "3xl" }}
                    fontWeight="semibold"
                    bgGradient="linear(90deg, #0071E3 1.72%, #BB62FC 26.87%, #DA4B7A 69.77%, #F44F22 102.1%)"
                    bgClip="text"
                    lineHeight="shorter"
                    fontFamily="Inter, sans-serif"
                    maxW="lg"
                  >
                    Data is valuable. But only when shared with dignity
                  </Text>
                </MotionBox>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Right Side - Dark Background with Flow Visual */}
          <GridItem
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={{ base: 16, md: 20, lg: 24 }}
            px={{ base: 6, md: 8, lg: 12 }}
            backgroundImage={`url('http://localhost:3845/assets/991641cebbdf9714c0f3475eda96acc252a83cce.png')`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            // _before={{
            //   content: '""',
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            //   bg: "rgba(0, 0, 0, 0.3)",
            //   zIndex: 1
            // }}
          >
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              position="relative"
              zIndex={2}
              textAlign="center"
              maxW="xl"
            >
              <Text
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "5xl" }}
                fontWeight="extrabold"
                bgGradient="linear(to-b, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 60%, 1) 100%)"
                bgClip="text"
                lineHeight="shorter"
                letterSpacing="tight"
                fontFamily="Inter, sans-serif"
                textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
              >
                Privacy earns loyalty.
                <br />
                Consent earns value.
                <br />
                Agents earn trust
              </Text>
            </MotionBox>
          </GridItem>
        </Grid>
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
                      "user": "hushhID_1983",
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "agent": "nike_preference_agent",
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "brand": "Nike",
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "scope": ["purchase_history",
                    </Text>
                    <Text color="#22c55e" ml={8}>
                      "size_preferences"],
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      "payment": {'{'}
                    </Text>
                    <Text color="#22c55e" ml={8}>
                      "user_share": "$3.20",
                    </Text>
                    <Text color="#22c55e" ml={8}>
                      "agent_fee": "$0.80",
                    </Text>
                    <Text color="#22c55e" ml={8}>
                      "brand_total": "$4.00"
                    </Text>
                    <Text color="#22c55e" ml={4}>
                      {'}'}
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
                    Every transaction is cryptographically logged and distributed via Hushh Flow.
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
                  What You Can Earn
                </Heading>

                {/* Philosophy Points */}
                <VStack spacing={{ base: 6, md: 8 }} align="start" w="full">
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg="#22c55e"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        color="white"
                        lineHeight="relaxed"
                        fontFamily="Inter, sans-serif"
                      >
                        Brand rewards
                      </Text>
                    </HStack>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg="#22c55e"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        color="white"
                        lineHeight="relaxed"
                        fontFamily="Inter, sans-serif"
                      >
                        Credit toward subscriptions, cloud credits, or gift cards
                      </Text>
                    </HStack>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg="#22c55e"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        color="white"
                        lineHeight="relaxed"
                        fontFamily="Inter, sans-serif"
                      >
                        Direct payments via Stripe, Apple Pay, UPI
                      </Text>
                    </HStack>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg="#22c55e"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        color="white"
                        lineHeight="relaxed"
                        fontFamily="Inter, sans-serif"
                      >
                        Access to premium AI features via Flow Credits
                      </Text>
                    </HStack>
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
                borderRadius="29px"
                overflow="hidden"
                backgroundImage="url('/nikebg.svg')"
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
                    color="#000000"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Allow Nike to see purchase and sizing data from the last 6 months" → Earn ₹250
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
                borderRadius={'29px'}
                overflow="hidden"
                // boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                backgroundImage={'/courseraBg.svg'} 
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
                    color="#000000"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Approve Coursera to recommend learning paths based on browsing” → 3 free courses
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
                backgroundImage={'/spotifyBg.svg'}
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
                    color="#000000"
                    lineHeight="shorter"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                  >
                    Share concert interest profile with Spotify” → Premium trial
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          </Flex>

          
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
                          fontWeight="600"
                          color="#383737"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.5"
                        >
                          Add flow.recordTransaction() to your operons
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
                          Add flow.splitRevenue() into agents and apps
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
                          Respect hussh.link.verifyConsent() for every transaction
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
                          Integrates with Stripe, Coinbase, Razorpay, Apple Pay
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
                    Trust & Regulation Built In
                    {/* <Text as="span" display="block">
                      (Premium Layer)
                    </Text> */}
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
                          KYC + hushhID onboarding
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
                          Tax-resilient payout ledgers (receipts + logs)
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
                          Consent receipts on every transaction
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 4 */}
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
                          GDPR and India DPDP compliance-ready
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

export default HushhFlow