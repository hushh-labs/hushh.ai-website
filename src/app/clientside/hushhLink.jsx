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
    </>
  )
}

export default HushhLink