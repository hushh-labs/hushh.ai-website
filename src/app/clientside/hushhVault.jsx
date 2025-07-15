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

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HushhVault = () => {
  // Animation variants for fade-in effects
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

  // Feature Card Component
  const FeatureCard = ({ title, description, placeholderText, isGray = false, delay = 0, children }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      bg={isGray ? "rgba(204, 204, 204, 0.09)" : "#0071E3"}
      borderRadius="xl"
      p={0}
      h="100%"
      overflow="hidden"
      position="relative"
    >
      <VStack h="100%" align="stretch" spacing={0}>
        {/* Header Section */}
        <Box p={8} pb={4}>
          <VStack align="start" spacing={2}>
            <Text
              fontSize={{ base: "20px", md: "24px", lg: "28px" }}
              fontWeight="bold"
              color={isGray ? "#333333" : "white"}
              fontFamily="Inter, sans-serif"
              letterSpacing="-0.02em"
              lineHeight="1.2"
            >
              {title}
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              color={isGray ? "#333333" : "white"}
              fontFamily="Inter, sans-serif"
              lineHeight="1.4"
              opacity={0.9}
            >
              {description}
            </Text>
          </VStack>
        </Box>

        {/* Image Placeholder Section */}
        <Box flex={1} p={8} pt={0} position="relative">
          {children || (
            <Box
              bg="white"
              borderRadius="xl"
              h="100%"
              minH="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
              position="relative"
            >
              {placeholderText && (
                <Text
                  fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  fontWeight="600"
                  color="#666666"
                  fontFamily="Inter, sans-serif"
                >
                  {placeholderText}
                </Text>
              )}
            </Box>
          )}
        </Box>
      </VStack>
    </MotionBox>
  );

  // Capability Card Component
  const CapabilityCard = ({ title, backgroundImage, delay = 0, fontSize = "64px", width = "100%", height = "100%", textPosition = "bottom-left" }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      position="relative"
      borderRadius="30px"
      overflow="hidden"
      w={width}
      h={height}
      minH="300px"
      boxShadow="0px 4px 4px 0px rgba(0,0,0,0.25)"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "0px 8px 25px 0px rgba(0,0,0,0.3)"
      }}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage={`url('${backgroundImage}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      
      {/* Dark Overlay for better text readability */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.3)"
        opacity={0.8}
      />

      {/* Text Content */}
      <Box
        position="absolute"
        bottom={textPosition === "bottom-left" ? "8" : "auto"}
        top={textPosition === "top-left" ? "8" : "auto"}
        left="8"
        right="8"
        zIndex={2}
      >
        <Text
          fontSize={{ base: "24px", md: "32px", lg: fontSize }}
          fontWeight="bold"
          color="white"
          fontFamily="Inter, sans-serif"
          letterSpacing="-0.02em"
          lineHeight="1.2"
          maxW="90%"
        >
          {title}
        </Text>
      </Box>
    </MotionBox>
  );

  // Code Snippet Component
  const CodeSnippet = ({ children, color = "#22C55E" }) => (
    <Code
      bg="transparent"
      color={color}
      fontSize={{ base: "14px", md: "16px", lg: "18px" }}
      fontFamily="'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace"
      fontWeight="600"
      p={0}
    >
      {children}
    </Code>
  );

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
                  bgGradient="linear(90deg, #0071E3 35.39%, #BB62FC 8.0679%, #F34556 54.309%, #F44F22 90.422%)"
                  bgClip="text"
                  letterSpacing="-0.02em"
                  fontFamily="Inter, sans-serif"
                  mb={{ base: 4, md: 6 }}
                >
                  Hushh Vault
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
                Your Data. Encrypted.{" "}
                <br />
                Yours Forever.
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
                Introducing the Hushh Vault — a personal, programmable data store built to protect what matters most: your digital self.
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
                    Explore the Vault
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
                    View Consent Protocol
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

      {/* What Is the Hushh Vault Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="start"
          >
            {/* Left Column - Main Content */}
            <GridItem>
              <MotionBox {...fadeInLeft}>
                <VStack spacing={{ base: 8, md: 10 }} align="start">
                  {/* Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                    fontWeight="bold"
                    color="#000000"
                    letterSpacing="-0.02em"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.1"
                  >
                    What Is the Hushh Vault?
                  </Heading>

                  {/* Subtitle */}
                  <Text
                    fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                    color="#000000"
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.6"
                    maxW="600px"
                  >
                    A consent-native storage layer that lives inside every Personal Data Agent.
                  </Text>

                  {/* Feature List */}
                  <VStack spacing={6} align="start" w="full">
                    <Flex align="start" gap={4}>
                      <Box
                        bg="#000000"
                        borderRadius="8px"
                        p={3}
                        minW="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaApple} color="white" boxSize={6} />
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                          color="#000000"
                          fontWeight="500"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.6"
                        >
                          Built for iOS-verified humans.
                        </Text>
                      </Box>
                    </Flex>

                    <Flex align="start" gap={4}>
                      <Box
                        bg="#000000"
                        borderRadius="8px"
                        p={3}
                        minW="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaFolder} color="white" boxSize={6} />
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                          color="#000000"
                          fontWeight="500"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.6"
                        >
                          Stores your preferences, identity keys, agent memories, and data maps.
                        </Text>
                      </Box>
                    </Flex>

                    <Flex align="start" gap={4}>
                      <Box
                        bg="#000000"
                        borderRadius="8px"
                        p={3}
                        minW="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaLink} color="white" boxSize={6} />
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                          color="#000000"
                          fontWeight="500"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.6"
                        >
                          Integrates with iCloud, Gmail, Drive, Notion, Stripe,
                        </Text>
                      </Box>
                    </Flex>

                    <Flex align="start" gap={4}>
                      <Box
                        bg="#000000"
                        borderRadius="8px"
                        p={3}
                        minW="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaShieldAlt} color="white" boxSize={6} />
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                          color="#000000"
                          fontWeight="500"
                          fontFamily="Inter, sans-serif"
                          lineHeight="1.6"
                        >
                          Enforces zero-trust access to every byte.
                        </Text>
                      </Box>
                    </Flex>
                  </VStack>

                  {/* Bottom Description */}
                  <Text
                    fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                    color="#000000"
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.6"
                    maxW="600px"
                    mt={8}
                  >
                    Think of it as a personal hard drive for your AI — encrypted, inspectable, and fully under your control.
                  </Text>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Blue Accent Text */}
            <GridItem>
              <MotionBox {...fadeInRight}>
                <VStack spacing={8} align="start" pt={{ base: 0, lg: 16 }}>
                  <Text
                    fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                    fontWeight="600"
                    color="#4A90E2"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.4"
                  >
                    Your Hushh Vault is your nucleus. Your digital bodyguard. Your trusted data foundation.
                  </Text>
                  
                  <Text
                    fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                    fontWeight="600"
                    color="#4A90E2"
                    fontFamily="Inter, sans-serif"
                    lineHeight="1.4"
                  >
                    It's not just where your data lives. It's where your values live
                  </Text>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* How the Vault Works Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxW="8xl" px={{ base: 4, md: 6, lg: 8 }}>
          {/* Section Title */}
          <MotionBox {...fadeInUp} mb={{ base: 12, md: 16, lg: 20 }}>
            <Heading
              as="h2"
              fontSize={{ base: "40px", md: "56px", lg: "64px" }}
              fontWeight="bold"
              color="#333333"
              letterSpacing="-0.02em"
              fontFamily="Inter, sans-serif"
              textAlign="center"
              lineHeight="1.1"
            >
              How the Vault Works
            </Heading>
          </MotionBox>

          {/* Bento Grid Layout */}
          <Box maxW="1800px" mx="auto">
            {/* Mobile Layout */}
            <Box display={{ base: "block", lg: "none" }}>
              <SimpleGrid columns={1} spacing={5}>
                <FeatureCard
                  title="Encryption"
                  description="AES-256 and user-specific key signatures"
                  placeholderText="Security"
                  delay={0.1}
                />
                <FeatureCard
                  title="Schema Core"
                  description="Modular data structures per domain (calendar, health, commerce)"
                  placeholderText="Schema"
                  delay={0.2}
                />
                <FeatureCard
                  title="Consent Logs"
                  description="Every read/write must reference a valid signed token"
                  placeholderText="Consent"
                  delay={0.3}
                />
                <FeatureCard
                  title="Sync Engine"
                  description="Optional, user-approved syncing with cloud platforms"
                  placeholderText="Sync"
                  delay={0.4}
                />
                <FeatureCard
                  title="Audit Trails"
                  description="Inspect who accessed what and when — down to the millisecond"
                  delay={0.5}
                />
              </SimpleGrid>
            </Box>

            {/* Desktop Bento Grid Layout */}
            <Box display={{ base: "none", lg: "block" }}>
              <Grid
                templateColumns="repeat(12, 1fr)"
                templateRows="repeat(2, 480px)"
                gap={5}
                w="100%"
                maxW="1800px"
              >
                {/* Top Row - 2 Equal Cards */}
                <GridItem colSpan={6} rowSpan={1}>
                  <FeatureCard
                    title="Encryption"
                    description="AES-256 and user-specific key signatures"
                    placeholderText="Security"
                    delay={0.1}
                  />
                </GridItem>
                <GridItem colSpan={6} rowSpan={1}>
                  <FeatureCard
                    title="Schema Core"
                    description="Modular data structures per domain (calendar, health, commerce)"
                    placeholderText="Schema"
                    delay={0.2}
                  />
                </GridItem>

                {/* Middle Row - 3 Cards */}
                <GridItem colSpan={4} rowSpan={1}>
                  <FeatureCard
                    title="Consent Logs"
                    description="Every read/write must reference a valid signed token"
                    placeholderText="Consent"
                    delay={0.3}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={1}>
                  <FeatureCard
                    title="Sync Engine"
                    description="Optional, user-approved syncing with cloud platforms"
                    placeholderText="Sync"
                    delay={0.4}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={1}>
                  <FeatureCard
                    title="Audit Trails"
                    description="Inspect who accessed what and when — down to the millisecond"
                    delay={0.5}
                  />
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Vault Capabilities Section */}
      <Box
        bg="#f5f5f7"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxW="8xl" px={{ base: 4, md: 6, lg: 8 }}>
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            mb={{ base: 12, md: 16, lg: 20 }}
            textAlign="center"
          >
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              color="black"
              letterSpacing="tight"
              fontFamily="Inter, sans-serif"
              lineHeight="shorter"
            >
              Vault Capabilities
            </Heading>
          </MotionBox>

          {/* Mobile Layout */}
          <Box display={{ base: "block", lg: "none" }}>
            <SimpleGrid columns={1} spacing={5}>
              <CapabilityCard
                title="Export or delete data at will (one-tap data liberation)"
                backgroundImage="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                delay={0.1}
                fontSize="2xl"
              />
              <CapabilityCard
                title="Store structured + unstructured data"
                backgroundImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                delay={0.2}
                fontSize="2xl"
              />
              <CapabilityCard
                title="Track decisions, preferences, and revocation logs"
                backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                delay={0.3}
                fontSize="2xl"
              />
              <CapabilityCard
                title="Link identity (Apple ID, OAuth, hushhID)"
                backgroundImage="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                delay={0.4}
                fontSize="2xl"
              />
            </SimpleGrid>
          </Box>

          {/* Desktop Masonry Layout */}
          <Box display={{ base: "none", lg: "block" }} maxW="1600px" mx="auto">
            <Grid
              templateColumns="1fr 1fr 1fr"
              templateRows="auto auto"
              gap={5}
              h="auto"
            >
              {/* Large Left Card - spans 2 rows */}
              <GridItem rowSpan={2}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <CapabilityCard
                    title="Export or delete data at will (one-tap data liberation)"
                    backgroundImage="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    delay={0.1}
                    fontSize="6xl"
                    height="609px"
                  />
                </MotionBox>
              </GridItem>

              {/* Medium Top Card */}
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <CapabilityCard
                    title="Store structured + unstructured data"
                    backgroundImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    delay={0.2}
                    fontSize="4xl"
                    height="300px"
                  />
                </MotionBox>
              </GridItem>

              {/* Right Tall Card - spans 2 rows */}
              <GridItem rowSpan={2}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  <CapabilityCard
                    title="Link identity (Apple ID, OAuth, hushhID)"
                    backgroundImage="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    delay={0.3}
                    fontSize="5xl"
                    height="609px"
                  />
                </MotionBox>
              </GridItem>

              {/* Medium Bottom Card */}
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  <CapabilityCard
                    title="Track decisions, preferences, and revocation logs"
                    backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    delay={0.4}
                    fontSize="4xl"
                    height="300px"
                  />
                </MotionBox>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Built for Agents, Not Apps Section */}
      <Box
        bg="white"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="start"
          >
            {/* Left Column - Main Content */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: 6, md: 8 }} align="start">
                  {/* Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    fontWeight="bold"
                    color="gray.700"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                    lineHeight="shorter"
                  >
                    Built for Agents, Not Apps
                  </Heading>

                  {/* Description */}
                  <Text
                    fontSize={{ base: "md", md: "lg", lg: "xl" }}
                    color="gray.600"
                    fontFamily="Inter, sans-serif"
                    lineHeight="tall"
                    maxW="2xl"
                  >
                    Operons connect to the Vault automatically via{" "}
                    <Text as="span" color="green.500" fontWeight="medium" fontFamily="mono">
                      vault.read()
                    </Text>
                    , <Text as="span" color="green.500" fontWeight="medium" fontFamily="mono">
                      vault.write()
                    </Text>
                    , <Text as="span" color="green.500" fontWeight="medium" fontFamily="mono">
                      vault.query(scope)
                    </Text>
                    . All data access routes pass through{" "}
                    <Text as="span" color="green.500" fontWeight="medium" fontFamily="mono">
                      hushh.link.verifyConsent()
                    </Text>
                    . Supports agent-to-agent data sharing via signed MCP tokens.
                  </Text>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Technical Details */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: 6, md: 8 }} align="start">
                  {/* API Methods */}
                  <Box>
                    <Text
                      fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      color="gray.600"
                      fontFamily="Inter, sans-serif"
                      lineHeight="tall"
                      mb={4}
                    >
                      Operons connect to the Vault automatically via
                    </Text>
                    <VStack spacing={3} align="start">
                      <MotionBox
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <Code
                          bg="transparent"
                          color="green.500"
                          fontSize={{ base: "sm", md: "md", lg: "lg" }}
                          fontFamily="mono"
                          fontWeight="semibold"
                          p={0}
                        >
                          vault.read()
                        </Code>
                      </MotionBox>
                      <MotionBox
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Code
                          bg="transparent"
                          color="green.500"
                          fontSize={{ base: "sm", md: "md", lg: "lg" }}
                          fontFamily="mono"
                          fontWeight="semibold"
                          p={0}
                        >
                          vault.write()
                        </Code>
                      </MotionBox>
                      <MotionBox
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Code
                          bg="transparent"
                          color="green.500"
                          fontSize={{ base: "sm", md: "md", lg: "lg" }}
                          fontFamily="mono"
                          fontWeight="semibold"
                          p={0}
                        >
                          vault.query(scope)
                        </Code>
                      </MotionBox>
                    </VStack>
                  </Box>

                  {/* Consent Verification */}
                  <Box>
                    <Text
                      fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      color="gray.600"
                      fontFamily="Inter, sans-serif"
                      lineHeight="tall"
                      mb={4}
                    >
                      All data access routes pass through{" "}
                      <MotionBox
                        as="span"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        display="inline-block"
                      >
                        <Code
                          bg="transparent"
                          color="green.500"
                          fontSize={{ base: "sm", md: "md", lg: "lg" }}
                          fontFamily="mono"
                          fontWeight="semibold"
                          p={0}
                        >
                          hushh.link.verifyConsent()
                        </Code>
                      </MotionBox>
                    </Text>
                  </Box>

                  {/* Agent-to-Agent Sharing */}
                  <Box>
                    <MotionBox
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Text
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                        color="gray.600"
                        fontFamily="Inter, sans-serif"
                        lineHeight="tall"
                      >
                        Supports agent-to-agent data sharing via signed MCP tokens
                      </Text>
                    </MotionBox>
                  </Box>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>

          {/* Explore the Stack Footer */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            mt={{ base: 16, md: 20, lg: 24 }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="bold"
              color="gray.600"
              fontFamily="Inter, sans-serif"
              letterSpacing="wider"
              textTransform="uppercase"
              lineHeight="normal"
            >
              Explore the Stack
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Sample Usecase Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxW="8xl" px={{ base: 4, md: 6, lg: 8 }}>
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            mb={{ base: 12, md: 16, lg: 20 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "40px", md: "56px", lg: "64px" }}
              fontWeight="bold"
              color="#333333"
              letterSpacing="-0.02em"
              fontFamily="Inter, sans-serif"
              lineHeight="1.1"
              mb={{ base: 8, md: 12, lg: 16 }}
            >
              Sample Usecase
            </Heading>
          </MotionBox>

          {/* Three Equal Height Cards */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={{ base: 6, md: 5, lg: 6 }}
            mb={{ base: 16, md: 20, lg: 24 }}
            maxW="1600px"
            mx="auto"
          >
            {/* Card 1 - Doctor Sleep Data */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                position="relative"
                borderRadius="29px"
                overflow="hidden"
                h={{ base: "400px", md: "500px", lg: "636px" }}
                boxShadow="0px 4px 6.8px 0px rgba(0,0,0,0.25)"
                border="1px solid #000000"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0px 8px 25px 0px rgba(0,0,0,0.3)"
                }}
              >
                {/* Background Image */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  backgroundImage="url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                />
                
                {/* Dark Overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0, 0, 0, 0.4)"
                />

                {/* Text Content */}
                <Box
                  position="absolute"
                  top="8"
                  left="8"
                  right="8"
                  zIndex={2}
                  maxW="280px"
                >
                  <Text
                    fontSize={{ base: "24px", md: "28px", lg: "36px" }}
                    fontWeight="600"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    lineHeight="1.1"
                  >
                    Let my doctor view my sleep data from Apple Health for 3 days
                  </Text>
                </Box>
              </MotionBox>
            </GridItem>

            {/* Card 2 - Job Preferences */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                position="relative"
                borderRadius="29px"
                overflow="hidden"
                h={{ base: "400px", md: "500px", lg: "636px" }}
                boxShadow="0px 4px 4px 0px rgba(0,0,0,0.25)"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0px 8px 25px 0px rgba(0,0,0,0.3)"
                }}
              >
                {/* Background Image */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  backgroundImage="url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                />
                
                {/* Dark Overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0, 0, 0, 0.4)"
                />

                {/* Text Content */}
                <Box
                  position="absolute"
                  top="8"
                  left="8"
                  right="8"
                  zIndex={2}
                  maxW="320px"
                >
                  <Text
                    fontSize={{ base: "24px", md: "28px", lg: "36px" }}
                    fontWeight="600"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    lineHeight="1.1"
                  >
                    Store job preferences for AI recruiter assistant
                  </Text>
                </Box>
              </MotionBox>
            </GridItem>

            {/* Card 3 - Agent Interaction Logs */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                position="relative"
                borderRadius="29px"
                overflow="hidden"
                h={{ base: "400px", md: "500px", lg: "636px" }}
                boxShadow="0px 4px 4px 0px rgba(0,0,0,0.25)"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0px 8px 25px 0px rgba(0,0,0,0.3)"
                }}
              >
                {/* Background Image */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  backgroundImage="url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                />
                
                {/* Dark Overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0, 0, 0, 0.4)"
                />

                {/* Text Content */}
                <Box
                  position="absolute"
                  top="8"
                  left="8"
                  right="8"
                  zIndex={2}
                  maxW="280px"
                >
                  <Text
                    fontSize={{ base: "24px", md: "28px", lg: "36px" }}
                    fontWeight="600"
                    color="white"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    lineHeight="1.1"
                  >
                    Log every agent interaction with consent-based hash trails
                  </Text>
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>

          {/* Explore the Stack Footer */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            textAlign="center"
          >
            <Text
              fontSize="20px"
              fontWeight="bold"
              color="#344054"
              fontFamily="Inter, sans-serif"
              letterSpacing="4px"
              textTransform="uppercase"
              lineHeight="normal"
            >
              Explore the Stack
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Security at Core Section */}
      <Box
        bg="#ffffff"
        py={{ base: 16, md: 20, lg: 24 }}
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxW="6xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="center" textAlign="center">
            {/* Section Title */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                color="gray.700"
                letterSpacing="tight"
                fontFamily="Inter, sans-serif"
                lineHeight="shorter"
                textAlign="center"
              >
                Security at Core
              </Heading>
            </MotionBox>

            {/* Security Features List */}
            <VStack 
              spacing={{ base: 6, md: 8, lg: 10 }} 
              align="center" 
              maxW="900px"
              mx="auto"
            >
              {/* Feature 1 */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="medium"
                  color="gray.500"
                  fontFamily="Inter, sans-serif"
                  lineHeight="tall"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    color: "gray.700",
                    transform: "translateY(-0.5)"
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--chakra-colors-gray-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--chakra-colors-gray-500)";
                  }}
                >
                  Vault lives locally by default, offloaded with full encryption
                </Text>
              </MotionBox>

              {/* Feature 2 - Initially Black */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="medium"
                  color="gray.700"
                  fontFamily="Inter, sans-serif"
                  lineHeight="tall"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    color: "gray.700",
                    transform: "translateY(-0.5)"
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Consent key signature required for any external access
                </Text>
              </MotionBox>

              {/* Feature 3 */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="medium"
                  color="gray.500"
                  fontFamily="Inter, sans-serif"
                  lineHeight="tall"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    color: "gray.700",
                    transform: "translateY(-0.5)"
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--chakra-colors-gray-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--chakra-colors-gray-500)";
                  }}
                >
                  Immutable audit trails built-in
                </Text>
              </MotionBox>

              {/* Feature 4 */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="medium"
                  color="gray.500"
                  fontFamily="Inter, sans-serif"
                  lineHeight="tall"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    color: "gray.700",
                    transform: "translateY(-0.5)"
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--chakra-colors-gray-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--chakra-colors-gray-500)";
                  }}
                >
                  Ready for SOC2 and HIPAA-level compliance extensions
                </Text>
              </MotionBox>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Developer Ready Section */}
      <Box
        bg="#f5f5f7"
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {/* White Background for Right Half */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w={{ base: "0%", lg: "50%" }}
          h="full"
          bg="white"
          zIndex={1}
        />
        
        <Container maxW="8xl" px={0} position="relative" zIndex={2}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={0}
            minH="100vh"
            alignItems="center"
          >
            {/* Left Column - Developer Ready */}
            <GridItem px={{ base: 4, md: 6, lg: 8 }} py={{ base: 16, md: 20, lg: 24 }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="start" maxW="lg">
                  {/* Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    fontWeight="bold"
                    color="gray.700"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                    lineHeight="shorter"
                  >
                    Developer Ready
                  </Heading>

                  {/* Feature List */}
                  <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="start" w="full">
                    {/* Feature 1 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={3}>
                        <Box
                          w={2}
                          h={2}
                          bg="gray.700"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg", lg: "xl" }}
                          fontWeight="medium"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                          lineHeight="tall"
                        >
                          REST API + SDK integration with iOS, Firebase, Node.js
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 2 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={3}>
                        <Box
                          w={2}
                          h={2}
                          bg="gray.700"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg", lg: "xl" }}
                          fontWeight="medium"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                          lineHeight="tall"
                        >
                          Built-in JSON schema validation for your operons
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 3 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={3}>
                        <Box
                          w={2}
                          h={2}
                          bg="gray.700"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg", lg: "xl" }}
                          fontWeight="medium"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                          lineHeight="tall"
                        >
                          Data lifespan rules (TTL, purpose limitation) supported by design
                        </Text>
                      </Flex>
                    </MotionBox>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Future Vault+ Capabilities */}
            <GridItem px={{ base: 4, md: 6, lg: 8 }} py={{ base: 16, md: 20, lg: 24 }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="start" maxW="lg">
                  {/* Title */}
                  <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    fontWeight="bold"
                    color="gray.700"
                    letterSpacing="tight"
                    fontFamily="Inter, sans-serif"
                    lineHeight="shorter"
                  >
                    Future Vault+ Capabilities{" "}
                    <Text as="span" display="block" mt={1}>
                      (Premium Layer)
                    </Text>
                  </Heading>

                  {/* Feature List */}
                  <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="start" w="full">
                    {/* Feature 1 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={3}>
                        <Box
                          w={2}
                          h={2}
                          bg="gray.700"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg", lg: "xl" }}
                          fontWeight="medium"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                          lineHeight="tall"
                        >
                          Privacy-preserving federated learning
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 2 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={3}>
                        <Box
                          w={2}
                          h={2}
                          bg="gray.700"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg", lg: "xl" }}
                          fontWeight="medium"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                          lineHeight="tall"
                        >
                          Personalized AI model cache & fine-tuning
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Feature 3 */}
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                      <Flex align="start" gap={3}>
                        <Box
                          w={2}
                          h={2}
                          bg="gray.700"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg", lg: "xl" }}
                          fontWeight="medium"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                          lineHeight="tall"
                        >
                          Voting ledger + signal sharing marketplace
                        </Text>
                      </Flex>
                    </MotionBox>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>

          {/* Explore the Stack Footer */}
          {/* <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            position="absolute"
            bottom={{ base: 8, md: 12, lg: 16 }}
            left="50%"
            transform="translateX(-50%)"
            textAlign="center"
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="bold"
              color="gray.600"
              fontFamily="Inter, sans-serif"
              letterSpacing="wider"
              textTransform="uppercase"
              lineHeight="normal"
            >
              Explore the Stack
            </Text>
          </MotionBox> */}
        </Container>
      </Box>
    </>
  );
};

export default HushhVault;