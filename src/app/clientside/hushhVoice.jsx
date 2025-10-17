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
  Grid,
  GridItem,
  Icon,
  Flex,
  SimpleGrid,
  Badge,
  Link
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaApple, FaGlobe, FaEnvelope, FaCalendar, FaHeartbeat, FaBrain, FaLock, FaEye, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ContentWrapper from '../_components/layout/ContentWrapper';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HushhVoice = () => {
  const router = useRouter();

  // Animation variants
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

  // Feature Card Component
  const FeatureCard = ({ icon, title, description, delay = 0 }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      bg="rgba(59, 130, 246, 0.05)"
      borderRadius="16px"
      p={6}
      borderWidth="1px"
      borderColor="rgba(59, 130, 246, 0.2)"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "0 8px 25px rgba(0, 113, 227, 0.2)",
        borderColor: "#0071E3"
      }}
      h="full"
    >
      <VStack align="start" spacing={4}>
        <Box
          bg="#0071E3"
          borderRadius="12px"
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} color="white" boxSize={6} />
        </Box>
        <Text
          fontSize={{ base: "18px", md: "20px" }}
          fontWeight="bold"
          color="#000000"
          fontFamily="Inter, sans-serif"
          lineHeight="1.3"
        >
          {title}
        </Text>
        <Text
          fontSize={{ base: "14px", md: "16px" }}
          color="#666666"
          fontFamily="Inter, sans-serif"
          lineHeight="1.6"
        >
          {description}
        </Text>
      </VStack>
    </MotionBox>
  );

  return (
    <ContentWrapper>
      {/* Hero Section */}
      <Box
        minH="100vh"
        bg="#f5f5f7"
        display="flex"
        alignItems="center"
        position="relative"
        overflow="hidden"
        pt={{ base: "90px", md: "90px" }}
      >
        {/* Background Pattern */}
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
          <VStack 
            spacing={{ base: 8, md: 12, lg: 16 }}
            textAlign="center"
            maxW="5xl"
            mx="auto"
          >
            {/* Badge */}
            <MotionBox {...fadeInUp}>
              <Badge
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                fontWeight="600"
                px={6}
                py={3}
                borderRadius="full"
                bg="rgba(0, 113, 227, 0.1)"
                color="#0071E3"
                fontFamily="Inter, sans-serif"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                 Available Now
              </Badge>
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
              Meet HushhVoice
            </MotionHeading>

            {/* Tagline */}
            <MotionText
              {...fadeInDelay}
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              fontWeight="600"
              bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 50%, hsla(354, 88%, 61%, 1) 100%)"
              bgClip="text"
              letterSpacing="-0.02em"
              fontFamily="Inter, sans-serif"
            >
              Think. Plan. Act.
            </MotionText>

            {/* Subtitle */}
            <MotionText
              {...fadeInDelay}
              fontSize={{ base: "18px", md: "22px", lg: "26px" }}
              color="#666666"
              fontWeight="400"
              maxW="900px"
              lineHeight="1.6"
              fontFamily="Inter, sans-serif"
            >
              Your consent-first AI copilot that works only with the data you choose to share.
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
                  onClick={() => window.open("https://hushhvoice-2.onrender.com", "_blank")}
                  px={{ base: 8, md: 10 }}
                  py={{ base: 6, md: 6 }}
                  borderRadius="60px"
                  fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                  fontWeight="500"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.02em"
                  minW={{ base: "250px", md: "280px" }}
                  h={{ base: "50px", md: "60px" }}
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
                  Try Live Demo
                </MotionButton>

                {/* <MotionButton
                  size="lg"
                  bg="transparent"
                  color="#0071E3"
                  px={{ base: 8, md: 10 }}
                  py={{ base: 6, md: 6 }}
                  borderRadius="60px"
                  fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                  fontWeight="500"
                  onClick={() => window.open("https://youtu.be/HushhVoice", "_blank")}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.02em"
                  minW={{ base: "250px", md: "280px" }}
                  h={{ base: "50px", md: "60px" }}
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
                  Watch Demo Video
                </MotionButton> */}
              </HStack>
            </MotionBox>

            {/* Tagline */}
            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              fontSize={{ base: "16px", md: "18px" }}
              color="#999999"
              fontWeight="500"
              fontStyle="italic"
              maxW="700px"
              fontFamily="Inter, sans-serif"
            >
              "Your AI copilot — powered by consent, not compromise."
            </MotionText>
          </VStack>
        </Container>
      </Box>

      {/* Availability Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack spacing={{ base: 12, md: 16 }} align="center">
            {/* Section Title */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="#000000"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
                lineHeight="1.1"
                mb={4}
              >
                 Available Now
              </Heading>
              <Text
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                color="#666666"
                maxW="800px"
                mx="auto"
                fontFamily="Inter, sans-serif"
              >
                Access HushhVoice anywhere, anytime — on web or iOS
              </Text>
            </MotionBox>

            {/* Platform Cards */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={8}
              w="full"
              maxW="1000px"
            >
              {/* Web App Card */}
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  bg="#0071E3"
                  borderRadius="24px"
                  p={8}
                  h="full"
                  position="relative"
                  overflow="hidden"
                >
                  <VStack align="start" spacing={4}>
                    <Icon as={FaGlobe} color="white" boxSize={12} />
                    <Text
                      fontSize={{ base: "28px", md: "32px" }}
                      fontWeight="bold"
                      color="white"
                      fontFamily="Inter, sans-serif"
                    >
                      Web App
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      color="rgba(255, 255, 255, 0.9)"
                      fontFamily="Inter, sans-serif"
                      lineHeight="1.6"
                    >
                      Accessible from anywhere. No installation required. Works on any browser.
                    </Text>
                  </VStack>
                </MotionBox>
              </GridItem>

              {/* iOS App Card */}
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  bg="rgba(204, 204, 204, 0.15)"
                  borderRadius="24px"
                  p={8}
                  h="full"
                  borderWidth="2px"
                  borderColor="#0071E3"
                >
                  <VStack align="start" spacing={4}>
                    <Icon as={FaApple} color="#0071E3" boxSize={12} />
                    <Text
                      fontSize={{ base: "28px", md: "32px" }}
                      fontWeight="bold"
                      color="#000000"
                      fontFamily="Inter, sans-serif"
                    >
                      iOS App
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      color="#333333"
                      fontFamily="Inter, sans-serif"
                      lineHeight="1.6"
                    >
                      Fully integrated with Siri. Just say:{" "}
                      <Text as="span" fontWeight="600" color="#0071E3">
                        "Hey Siri, open HushhVoice"
                      </Text>
                      {" "}...and boom, your copilot's ready to go.
                    </Text>
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      color="#666666"
                      fontFamily="Inter, sans-serif"
                      fontStyle="italic"
                      mt={2}
                    >
                      Acts as the frontend brain, connecting all Hushh backend systems and MuleSoft endpoints.
                    </Text>
                  </VStack>
                </MotionBox>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* What It Does Section */}
      <Box
        bg="#f5f5f7"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack spacing={{ base: 12, md: 16 }}>
            {/* Section Title */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="#000000"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
                lineHeight="1.1"
              >
                What It Does
              </Heading>
            </MotionBox>

            {/* Feature Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              <FeatureCard
                icon={FaEnvelope}
                title="Email Intelligence"
                description="Drafts & replies to emails before you hit send. Understands context and tone."
                delay={0.1}
              />
              <FeatureCard
                icon={FaCalendar}
                title="Smart Scheduling"
                description="Plans meetings around your schedule & energy levels. No more double bookings."
                delay={0.2}
              />
              <FeatureCard
                icon={FaHeartbeat}
                title="Health Insights"
                description="Analyzes health & screen time trends for better balance and wellbeing."
                delay={0.3}
              />
              <FeatureCard
                icon={FaBrain}
                title="Smart Summaries"
                description="Summarizes long threads, docs, and notifications into actionable insights."
                delay={0.4}
              />
              <FeatureCard
                icon={FaPuzzlePiece}
                title="Habit Learning"
                description="Learns your habits (privately) to give smarter, more contextual support."
                delay={0.5}
              />
              <FeatureCard
                icon={FaShieldAlt}
                title="Privacy First"
                description="All processing happens with your explicit consent. Your data, your rules."
                delay={0.6}
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Privacy by Design Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            {/* Left Column */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <VStack spacing={6} align="start">
                  <Heading
                    as="h2"
                    fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                    fontWeight="bold"
                    color="#000000"
                    letterSpacing="-0.02em"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.1"
                  >
                    🔒 Privacy by Design
                  </Heading>
                  <Text
                    fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                    color="#666666"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.6"
                  >
                    Think of it as ChatGPT with boundaries — smart enough to help, respectful enough to ask first.
                  </Text>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Privacy Features */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  bg="rgba(34, 197, 94, 0.1)"
                  borderRadius="16px"
                  p={6}
                  borderLeft="4px solid #22C55E"
                >
                  <HStack spacing={4} align="start">
                    <Icon as={FaLock} color="#22C55E" boxSize={6} />
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="600" fontSize="18px" color="#000000" fontFamily="Inter, sans-serif">
                        Always in Control
                      </Text>
                      <Text fontSize="16px" color="#666666" fontFamily="Inter, sans-serif">
                        Toggle access to any data source anytime. You decide what HushhVoice can see.
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  bg="rgba(59, 130, 246, 0.1)"
                  borderRadius="16px"
                  p={6}
                  borderLeft="4px solid #0071E3"
                >
                  <HStack spacing={4} align="start">
                    <Icon as={FaEye} color="#0071E3" boxSize={6} />
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="600" fontSize="18px" color="#000000" fontFamily="Inter, sans-serif">
                        Transparent Actions
                      </Text>
                      <Text fontSize="16px" color="#666666" fontFamily="Inter, sans-serif">
                        See exactly what data was used and why. Full transparency, always.
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  bg="rgba(168, 85, 247, 0.1)"
                  borderRadius="16px"
                  p={6}
                  borderLeft="4px solid #A855F7"
                >
                  <HStack spacing={4} align="start">
                    <Icon as={FaShieldAlt} color="#A855F7" boxSize={6} />
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="600" fontSize="18px" color="#000000" fontFamily="Inter, sans-serif">
                        Safe by Default
                      </Text>
                      <Text fontSize="16px" color="#666666" fontFamily="Inter, sans-serif">
                        HushhVoice never acts without your explicit consent. Private, modular, adaptive.
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box
        bg="#f5f5f7"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="6xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack spacing={{ base: 12, md: 16 }} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="#000000"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
                lineHeight="1.1"
                mb={6}
              >
                 How It Works
              </Heading>
            </MotionBox>

            <VStack spacing={8} maxW="800px">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Text
                  fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                  color="#333333"
                  fontFamily="Inter, sans-serif"
                  lineHeight="1.8"
                >
                  HushhVoice connects securely to your personal sources like{" "}
                  <Text as="span" fontWeight="600" color="#0071E3">
                    Gmail, Calendar, and Health
                  </Text>
                  .
                </Text>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Text
                  fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                  color="#333333"
                  fontFamily="Inter, sans-serif"
                  lineHeight="1.8"
                >
                  It gathers insights, processes them through its{" "}
                  <Text as="span" fontWeight="600" color="#0071E3">
                    private AI engine
                  </Text>
                  , and then helps you act — all while keeping your data locked under your control.
                </Text>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                bg="rgba(0, 113, 227, 0.1)"
                borderRadius="16px"
                p={6}
                mt={4}
              >
                <Text
                  fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                  fontWeight="600"
                  color="#0071E3"
                  fontFamily="Inter, sans-serif"
                  fontStyle="italic"
                >
                  "Think of it as ChatGPT with boundaries — smart enough to help, respectful enough to ask first."
                </Text>
              </MotionBox>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Why You'll Love It Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack spacing={{ base: 12, md: 16 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="#000000"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
                lineHeight="1.1"
              >
                Why You'll Love It
              </Heading>
            </MotionBox>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={{ base: 6, md: 8 }}
              w="full"
            >
              {[
                { title: "Chaos into Clarity", desc: "Your digital life, simplified and organized." },
                { title: "Feels Like Magic", desc: "But it's 100% explainable and transparent." },
                { title: "Talks & Listens", desc: "Acts in your voice, understands your intent." },
                { title: "Modular & Expandable", desc: "Connect new data sources as you grow." },
                { title: "Enterprise Ready", desc: "Integrates with MuleSoft for data connectivity." },
                { title: "Smart Support", desc: "Contextual assistance that learns your preferences." }
              ].map((item, index) => (
                <GridItem key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    bg="transparent"
                    borderRadius="12px"
                    p={{ base: 4, md: 5 }}
                    h="full"
                    borderWidth="1px"
                    borderColor="rgba(0, 0, 0, 0.1)"
                    _hover={{
                      borderColor: "rgba(0, 0, 0, 0.2)",
                      bg: "rgba(0, 0, 0, 0.02)"
                    }}
                  >
                    <VStack align="start" spacing={{ base: 2, md: 3 }}>
                      <Text
                        fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                        fontWeight="600"
                        color="#000000"
                        fontFamily="Inter, sans-serif"
                        letterSpacing="-0.01em"
                        lineHeight="1.2"
                      >
                        {item.title}
                      </Text>
                      <Text
                        fontSize={{ base: "14px", md: "15px", lg: "16px" }}
                        color="#666666"
                        fontFamily="Inter, sans-serif"
                        lineHeight="1.5"
                      >
                        {item.desc}
                      </Text>
                    </VStack>
                  </MotionBox>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        bg="#0071E3"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="6xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack spacing={8} textAlign="center">
            <MotionHeading
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              as="h2"
              fontSize={{ base: "36px", md: "48px", lg: "56px" }}
              fontWeight="bold"
              color="white"
              letterSpacing="-0.02em"
              fontFamily="Inter, sans-serif"
              lineHeight="1.1"
            >
              Ready to Experience AI with Boundaries?
            </MotionHeading>

            <MotionText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              fontSize={{ base: "18px", md: "20px", lg: "24px" }}
              color="rgba(255, 255, 255, 0.9)"
              maxW="700px"
              fontFamily="Inter, sans-serif"
            >
              Smart. Private. Effortless.
            </MotionText>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HStack 
                spacing={{ base: 4, md: 6 }}
                justify="center"
                flexDir={{ base: "column", sm: "row" }}
              >
                <Button
                  size="lg"
                  bg="white"
                  color="#0071E3"
                  onClick={() => window.open("https://hushhvoice-2.onrender.com/", "_blank")}
                  px={10}
                  py={6}
                  borderRadius="60px"
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  minW={{ base: "250px", md: "280px" }}
                  h={{ base: "50px", md: "60px" }}
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.9)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)"
                  }}
                  _active={{
                    transform: "translateY(0)"
                  }}
                  transition="all 0.3s ease"
                >
                  Try Live Demo
                </Button>

                {/* <Button
                  size="lg"
                  bg="transparent"
                  color="white"
                  px={10}
                  py={6}
                  borderRadius="60px"
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight="600"
                  onClick={() => router.push("/contact-us")}
                  fontFamily="Inter, sans-serif"
                  minW={{ base: "250px", md: "280px" }}
                  h={{ base: "50px", md: "60px" }}
                  border="3px solid white"
                  _hover={{
                    bg: "white",
                    color: "#0071E3",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)"
                  }}
                  _active={{
                    transform: "translateY(0)"
                  }}
                  transition="all 0.3s ease"
                >
                  Contact Us
                </Button> */}
              </HStack>
            </MotionBox>

            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              fontSize={{ base: "14px", md: "16px" }}
              color="rgba(255, 255, 255, 0.8)"
              fontStyle="italic"
              mt={6}
              fontFamily="Inter, sans-serif"
            >
              "Think faster. Live calmer. Hushh smarter."
            </MotionText>
          </VStack>
        </Container>
      </Box>
    </ContentWrapper>
  );
};

export default HushhVoice;

