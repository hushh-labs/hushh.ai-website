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
                  Hushh FLow
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
    </>
  )
}

export default HushhFlow