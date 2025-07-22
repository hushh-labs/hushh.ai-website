'use client'
import React from 'react'
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  HStack, 
  Icon,
  Grid,
  GridItem,
  List,
  ListItem,
  ListIcon,
  Image,
  SimpleGrid,
  Flex,
  useToast
} from '@chakra-ui/react'
import NextImage from 'next/image'
// SVG imports from the correct newLandingsvg folder
import IntelligentShoppingAssistantSvg from '../_components/svg/newLandingsvg/intelligent_shopping.svg'
import BuildForTrustSectionSvg from '../_components/svg/newLandingsvg/build_for_trust_section.svg'
import UnifiedDataSvg from '../_components/svg/newLandingsvg/unified_data.svg'
import PrivacyFirstIntegrationSvg from '../_components/svg/newLandingsvg/privacy_first_integration.svg'
import AutomatedBusinessSvg from '../_components/svg/newLandingsvg/automated_business.svg'
import HushhAgentBgSvg from '../_components/svg/newLandingsvg/hushh_agent_bg.svg'
import HushhVaultBgSvg from '../_components/svg/newLandingsvg/hushh_valut_bg.svg'
import HushhLinkBgSvg from '../_components/svg/newLandingsvg/hushh_link_bg.svg'
import HushhFlowBgSvg from '../_components/svg/newLandingsvg/hushh_flow_bg.svg'
import HushhGridBgSvg from '../_components/svg/newLandingsvg/hushh_grid_bg.svg'
import OpenSourceRightImageSvg from '../_components/svg/newLandingsvg/open_source_right_image.svg'
// Icons from react-icons for checkmarks and basic elements
import { HiCheck, HiLightningBolt } from 'react-icons/hi'
import AgenticImageLayout from '../_components/svg/newLandingsvg/agenticImage.png'
import consentCookieImage from "../_components/svg/consent_is_the_new_cookie.png";
import BlackLockIcon from "../_components/svg/newLandingsvg/blackLockIcon.svg";
import FooterComponent from '../_components/features/FooterComponent';
import AppleStoreIcon from '../_components/svg/newLandingsvg/icons/appStoreIcon.svg';
import GoogleCloudIcon from '../_components/svg/newLandingsvg/icons/googleCloudIcon.svg';
import GptStoreIcon from '../_components/svg/newLandingsvg/icons/gptStore.svg';
import HuggingFaceIcon from '../_components/svg/newLandingsvg/icons/huggingfaceIcon.svg';
import SalesforceIcon from '../_components/svg/newLandingsvg/icons/salesforceIcon.svg';
import { useRouter } from 'next/navigation';
import ContentWrapper from '../_components/layout/ContentWrapper';
import ContactForm from '../_components/features/contactForm'


const NewLandingPage = () => {
  const toast = useToast()
  const router = useRouter()

  const handleComingSoonToast = () => {
    toast({
      title: "Coming Soon!",
      description: "Launch on hushh.ai will be available soon. Stay tuned!",
      status: "info",
      duration: 4000,
      isClosable: true,
      position: "top"
    })
  }

  return (
    <Box bg="white">
      <ContentWrapper>
        {/* Hero Section */}
        <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <VStack spacing={{ base: 12, md: 14 }} align="center">
          {/* Lock Icon */}
          {/* <Box
            w={16}
            h={16}
            bg="gray.100"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="3xl"
          > */}
            <NextImage src={BlackLockIcon} alt="Lock Icon" width={{md:54,base:24}} height={{md:54,base:24}} />
          {/* </Box> */}
          
          {/* Main Headline */}
          <VStack spacing={3} align="center">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="bold"
              textAlign="center"
              lineHeight={{ base: 1.1, md: 1.0 }}
              letterSpacing={{ base: "-1px", md: "-2px" }}
              color="black"
            >
              Your Data.
              <br />
              Your Business.
            </Heading>
          </VStack>

          {/* Subtitle */}
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            textAlign="center"
            lineHeight={1.5}
            color="#1d1d1d"
            maxW={{ base: "full", md: "4xl" }}
            px={{ base: 4, md: 0 }}
          >
            Meet the world's first personal data agent platform — built with trust, privacy, and power at the core. 
            Automate your digital life with consent-first AI designed to work for you
          </Text>

          {/* CTA Buttons */}
          <HStack spacing={5} flexWrap="wrap" justify="center">
            <Button
              size="lg"
              bg="#0071e3"
              color="white"
              borderRadius="full"
              display="flex"
              h="72px"
              px="28px"
              onClick={() => router.push("/products/personal-data-agent")}
              py="15px"
              justifyContent="center"
              alignItems="center"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              _hover={{ bg: "#005bb5" }}
              _active={{ bg: "#004494" }}
            >
              Start with Your Agent
            </Button>
            
            <Button
              size="lg"
              bg="black"
              color="white"
              borderRadius="full"
              display="flex"
              h="72px"
              px="28px"
              py="15px"
              justifyContent="center"
              onClick={() => router.push("https://apps.apple.com/in/app/hushh-app/id6498471189")}
              alignItems="center"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              _hover={{ bg: "gray.800" }}
              _active={{ bg: "gray.900" }}
            >
              Get Early Access
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Built for Trust Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 12, lg: 16 }}
          alignItems="center"
        >
          {/* Left Content */}
          <GridItem>
            <VStack align={{ base: "center", lg: "start" }} spacing={8}>
              {/* Section Label */}
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="2.4px"
                bgGradient="linear(to-r, #e91e63, #9c27b0)"
                bgClip="text"
                textAlign={{ base: "center", lg: "left" }}
              >
                Why Hushh?
              </Text>

              {/* Main Heading */}
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                lineHeight={{ base: 1.2, md: 1.25 }}
                letterSpacing={{ base: "-0.5px", md: "-1.3px" }}
                color="black"
                textAlign={{ base: "center", lg: "left" }}
                maxW={{ base: "full", lg: "2xl" }}
              >
                Built for Trust.
                <br />
                Designed for Control.
              </Heading>

              {/* Description */}
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                lineHeight={1.8}
                color="#4e4e4e"
                textAlign={{ base: "center", lg: "left" }}
                maxW={{ base: "full", lg: "2xl" }}
              >
                Every interaction starts with consent. Every decision is yours. With Hushh, you get a personal AI agent that works for you — not the algorithm.
              </Text>

              {/* Feature List */}
              <List spacing={4} w="full" maxW={{ base: "full", lg: "2xl" }}>
                <ListItem
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  lineHeight={1.8}
                  color="black"
                  display="flex"
                  alignItems="center"
                  textAlign={{ base: "center", lg: "left" }}
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  <Icon 
                    as={HiCheck}
                    color="#0071e3" 
                    fontSize={{ base: "lg", md: "xl" }}
                    mr={3}
                  />
                  iOS Verified Apple iOS Users Only
                </ListItem>
                
                <ListItem
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  lineHeight={1.8}
                  color="black"
                  display="flex"
                  alignItems="center"
                  textAlign={{ base: "center", lg: "left" }}
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  <Icon 
                    as={HiCheck}
                    color="#0071e3" 
                    fontSize={{ base: "lg", md: "xl" }}
                    mr={3}
                  />
                  Consent-Native Infrastructure
                </ListItem>
                
                <ListItem
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  lineHeight={1.8}
                  color="black"
                  display="flex"
                  alignItems="center"
                  textAlign={{ base: "center", lg: "left" }}
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  <Icon 
                    as={HiCheck}
                    color="#0071e3" 
                    fontSize={{ base: "lg", md: "xl" }}
                    mr={3}
                  />
                  Open Source & Secure
                </ListItem>
                
                <ListItem
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  lineHeight={1.8}
                  color="black"
                  display="flex"
                  alignItems="center"
                  textAlign={{ base: "center", lg: "left" }}
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  <Icon 
                    as={HiCheck}
                    color="#0071e3" 
                    fontSize={{ base: "lg", md: "xl" }}
                    mr={3}
                  />
                  Designed by Ex-Google AI Infra Leaders
                </ListItem>
              </List>
            </VStack>
          </GridItem>

          {/* Right Illustration */}
          <GridItem>
            <Box
              w="full"
              h={{ base: "400px", md: "500px", lg: "600px" }}
              borderRadius="70px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              overflow="hidden"
            >
              <NextImage
                src={BuildForTrustSectionSvg}
                alt="Privacy-First AI Agent"
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>

      {/* What It Does Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <VStack spacing={{ base: 12, md: 16 }} align="center">
          {/* Section Header */}
          <VStack spacing={4} align="center" textAlign="center">
            {/* Section Label */}
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="2.4px"
              bgGradient="linear(to-r, #e91e63, #9c27b0)"
              bgClip="text"
              textAlign={{ base: "center", lg: "left" }}
            >
              What It Does
            </Text>

            {/* Main Heading */}
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              lineHeight={{ base: 1.2, md: 1.25 }}
              letterSpacing={{ base: "-0.5px", md: "-1.3px" }}
              color="black"
              maxW={{ base: "full", md: "4xl" }}
            >
              Your Agent. Your World. Seamlessly Synced.
            </Heading>

            {/* Description */}
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              lineHeight={1.8}
              color="#4e4e4e"
              maxW={{ base: "full", md: "4xl" }}
            >
              Hushh Agents connect to your cloud, inbox, apps, and favorite brands to automate your digital life — with total transparency.
            </Text>
          </VStack>

          {/* Feature Cards */}
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={{ base: 6, md: 8 }}
            w="full"
            maxW="1200px"
          >
            {/* Unified Data Management */}
            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              border="1px solid"
              borderColor="#e2e8f0"
              position="relative"
              _hover={{ 
                shadow: "lg",
                transform: "translateY(-4px)",
                transition: "all 0.3s ease"
              }}
              minH={{ base: "200px", md: "240px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack align="start" spacing={4} flex="1">
                <Flex
                  w={{ base: 12, md: 14 }}
                  h={{ base: 12, md: 14 }}
                  bg="#e6f3ff"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <NextImage
                    src={UnifiedDataSvg}
                    alt="Track Data"
                    width={24}
                    height={24}
                  />
                </Flex>
                <VStack align="start" spacing={2} flex="1">
                  <Heading
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    color="#1a202c"
                    lineHeight={1.3}
                  >
                    Unified Data Management
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="#64748b"
                    lineHeight={1.4}
                  >
                    Organize your data across Gmail, Drive, iCloud, and more
                  </Text>
                </VStack>
              </VStack>
            </Box>

            {/* Privacy-First Integrations - Highlighted */}
            <Box
              bg="#007aff"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              position="relative"
              shadow="lg"
              _hover={{ 
                transform: "translateY(-4px)",
                transition: "all 0.3s ease",
                shadow: "xl"
              }}
              minH={{ base: "200px", md: "240px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack align="start" spacing={4} flex="1">
                <Flex
                  w={{ base: 12, md: 14 }}
                  h={{ base: 12, md: 14 }}
                  bg="rgba(255,255,255,0.2)"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <NextImage
                    src={PrivacyFirstIntegrationSvg}
                    alt="Secure"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Flex>
                <VStack align="start" spacing={2} flex="1">
                  <Heading
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    color="white"
                    lineHeight={1.3}
                  >
                    Privacy-First Integrations
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="rgba(255,255,255,0.9)"
                    lineHeight={1.4}
                  >
                    Consent-aware personal API for every app
                  </Text>
                </VStack>
              </VStack>
            </Box>

            {/* Intelligent Shopping Assistant */}
            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              border="1px solid"
              borderColor="#e2e8f0"
              position="relative"
              _hover={{ 
                shadow: "lg",
                transform: "translateY(-4px)",
                transition: "all 0.3s ease"
              }}
              minH={{ base: "200px", md: "240px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack align="start" spacing={4} flex="1">
                <Flex
                  w={{ base: 12, md: 14 }}
                  h={{ base: 12, md: 14 }}
                  bg="#e6f3ff"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <NextImage
                    src={IntelligentShoppingAssistantSvg}
                    alt="Choose"
                    width={24}
                    height={24}
                  />
                </Flex>
                <VStack align="start" spacing={2} flex="1">
                  <Heading
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    color="#1a202c"
                    lineHeight={1.3}
                  >
                    Intelligent Shopping Assistant
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="#64748b"
                    lineHeight={1.4}
                  >
                    Smart shopping with agents that know your style and budget
                  </Text>
                </VStack>
              </VStack>
            </Box>

            {/* Automated Business Workflows */}
            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              border="1px solid"
              borderColor="#e2e8f0"
              position="relative"
              _hover={{ 
                shadow: "lg",
                transform: "translateY(-4px)",
                transition: "all 0.3s ease"
              }}
              minH={{ base: "200px", md: "240px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack align="start" spacing={4} flex="1">
                <Flex
                  w={{ base: 12, md: 14 }}
                  h={{ base: 12, md: 14 }}
                  bg="#e6f3ff"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <NextImage
                    src={AutomatedBusinessSvg}
                    alt="Automated Business"
                    width={24}
                    height={24}
                  />
                </Flex>
                <VStack align="start" spacing={2} flex="1">
                  <Heading
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    color="#1a202c"
                    lineHeight={1.3}
                  >
                    Automated Business Workflows
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="#64748b"
                    lineHeight={1.4}
                  >
                    Automate business tasks without handing over your life
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Five Pillars Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <Heading
          as="h2"
          color="black"
          textAlign="center"
          fontFamily="Inter"
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
          fontWeight="bold"
          lineHeight={{ base: 1.2, md: 1.25, lg: "84px" }}
          letterSpacing={{ base: "-0.5px", md: "-1px", lg: "-1.344px" }}
          mb={4}
        >
          One Agent. Five Pillars of Power.
        </Heading>
        <Text
          color="#667085"
          textAlign="center"
          fontFamily="Inter"
          fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}
          fontStyle="normal"
          fontWeight="400"
          lineHeight={{ base: "28px", md: "32px", lg: "39.2px" }}
          mb={{md:8,base:4}}
        >
          Behind every Hushh agent is a secure, modular stack engineered to serve humans first.
        </Text>
        <VStack spacing={{ base: 12, md: 16 }} align="center">
          {/* Main Grid Layout */}
          <Grid
            templateColumns={{ base: "1fr", lg: "400px 1fr" }}
            gap={{ base: 8, lg: 12 }}
            w="full"
            maxW="1400px"
            justifyItems="center"
          >
            {/* Hushh Agent - Large Vertical Card */}
            <GridItem>
              <Box
                borderRadius="xl"
                h={{ base: "500px", md: "600px", lg: "830px" }}
                w={{ base: "full", md: "400px" }}
                maxW="400px"
                position="relative"
                onClick={() => {
                  router.push("/products/personal-data-agent");
                }}
                cursor={"pointer"}
                border="1px solid"
                borderColor="#eaecf0"
                _hover={{ transform: "translateY(-2px)", transition: "all 0.3s ease" }}
                overflow="hidden"
              >
                {/* Background Image filling entire box */}
                <NextImage
                  src={HushhAgentBgSvg}
                  alt="Hushh Agent"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    zIndex: 0
                  }}
                />
                
                {/* Content Overlay */}
                <VStack align="start" spacing={6} h="full" position="relative" zIndex={1} p={{ base: 8, md: 10 }}>
                  {/* Product Name */}
                  <Heading
                    as="h3"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="semibold"
                    color="white"
                    lineHeight={1.25}
                    mt={6}
                  >
                    Hushh Agent
                  </Heading>

                  {/* Description */}
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="white"
                    lineHeight={1.35}
                    fontWeight="medium"
                  >
                    Your intelligent companion. Acts with context and consent.
                  </Text>

                  {/* Spacer */}
                  <Box flex="1" />
                  
                  {/* Explore Now Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/products/personal-data-agent");
                    }}
                    size="md"
                    px={6}
                    py={3}
                    fontSize="sm"
                    fontWeight="600"
                    borderRadius="8px"
                    bg="white"
                    color="black"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    backdropFilter="blur(10px)"
                    _hover={{
                      bg: "#0071E3",
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      transform: "translateY(-1px)",
                    }}
                    _active={{
                      transform: "scale(0.98)",
                    }}
                    transition="all 0.2s ease"
                  >
                    Explore now
                  </Button>
                </VStack>

                {/* Arrow Icon */}
                <Box
                  position="absolute"
                  bottom={6}
                  right={6}
                  color="white"
                  opacity={0.4}
                  fontSize="xl"
                  transform="rotate(315deg)"
                  zIndex={2}
                >
                  ↗
                </Box>
              </Box>
            </GridItem>

            {/* Right Grid - 2x2 Cards */}
            <GridItem w="full">
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={{ base: 6, md: 8 }}
                w="full"
              >
                {/* Hushh Vault */}
                <Box
                  borderRadius="xl"
                  h={{ base: "250px", md: "300px", lg: "415px" }}
                  position="relative"
                  border="1px solid"
                  borderColor="#eaecf0"
                  _hover={{ transform: "translateY(-2px)", transition: "all 0.3s ease" }}
                  overflow="hidden"
                  onClick={() => {
                    router.push("/hushh-vault");
                  }}  
                  cursor={"pointer"}
                >
                  {/* Background Image filling entire box */}
                  <NextImage
                    src={HushhVaultBgSvg}
                    alt="Hushh Vault"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <VStack align="start" spacing={6} h="full" position="relative" zIndex={1} p={{ base: 8, md: 10 }}>
                    {/* Product Name */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="semibold"
                      color="white"
                      lineHeight={1.25}
                      mt={6}
                    >
                      Hushh Vault
                    </Heading>

                    {/* Description */}
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color="white"
                      lineHeight={1.35}
                      fontWeight="medium"
                    >
                      Secure, encrypted storage for your personal data.
                    </Text>

                    {/* Spacer */}
                    <Box flex="1" />
                    
                    {/* Explore Now Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/hushh-vault");
                      }}
                      size="sm"
                      px={5}
                      py={2}
                      fontSize="xs"
                      fontWeight="600"
                      borderRadius="6px"
                      bg="white"
                      color="black"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      backdropFilter="blur(10px)"
                      _hover={{
                        bg: "#0071E3",
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-1px)",
                      }}
                      _active={{
                        transform: "scale(0.98)",
                      }}
                      transition="all 0.2s ease"
                    >
                      Explore now
                    </Button>
                  </VStack>

                  <Box
                    position="absolute"
                    bottom={6}
                    right={6}
                    color="white"
                    opacity={0.4}
                    fontSize="xl"
                    transform="rotate(315deg)"
                    zIndex={2}
                  >
                    ↗
                  </Box>
                </Box>

                {/* Hushh Link */}
                <Box
                  borderRadius="xl"
                  h={{ base: "250px", md: "300px", lg: "415px" }}
                  position="relative"
                  border="1px solid"
                  borderColor="#eaecf0"
                  _hover={{ transform: "translateY(-2px)", transition: "all 0.3s ease" }}
                  overflow="hidden"
                  onClick={() => {
                    router.push("/hushh-link");
                  }}
                  cursor={"pointer"}
                >
                  {/* Background Image filling entire box */}
                  <NextImage
                    src={HushhLinkBgSvg}
                    alt="Hushh Link"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <VStack align="start" spacing={6} h="full" position="relative" zIndex={1} p={{ base: 8, md: 10 }}>
                    {/* Product Name */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="semibold"
                      color="white"
                      lineHeight={1.25}
                      mt={6}
                    >
                      Hushh Link
                    </Heading>

                    {/* Description */}
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color="white"
                      lineHeight={1.35}
                      fontWeight="medium"
                    >
                      Identity and permissions layer, seamlessly integrated.
                    </Text>

                    {/* Spacer */}
                    <Box flex="1" />
                    
                    {/* Explore Now Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/hushh-link");
                      }}
                      size="sm"
                      px={5}
                      py={2}
                      fontSize="xs"
                      fontWeight="600"
                      borderRadius="6px"
                      bg="white"
                      color="black"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      backdropFilter="blur(10px)"
                      _hover={{
                        bg: "#0071E3",
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-1px)",
                      }}
                      _active={{
                        transform: "scale(0.98)",
                      }}
                      transition="all 0.2s ease"
                    >
                      Explore now
                    </Button>
                  </VStack>

                  <Box
                    position="absolute"
                    bottom={6}
                    right={6}
                    color="white"
                    opacity={0.4}
                    fontSize="xl"
                    transform="rotate(315deg)"
                    zIndex={2}
                  >
                    ↗
                  </Box>
                </Box>

                {/* Hushh Flow */}
                <Box
                  borderRadius="xl"
                  h={{ base: "250px", md: "300px", lg: "415px" }}
                  position="relative"
                  border="1px solid"
                  borderColor="#eaecf0"
                  _hover={{ transform: "translateY(-2px)", transition: "all 0.3s ease" }}
                  overflow="hidden"
                  onClick={() => {
                    router.push("/products/hushh-flow");
                  }}
                  cursor={"pointer"}
                >
                  {/* Background Image filling entire box */}
                  <NextImage
                    src={HushhFlowBgSvg}
                    alt="Hushh Flow"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <VStack align="start" spacing={6} h="full" position="relative" zIndex={1} p={{ base: 8, md: 10 }}>
                    {/* Product Name */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="semibold"
                      color="white"
                      lineHeight={1.25}
                      mt={6}
                    >
                      Hushh Flow
                    </Heading>

                    {/* Description */}
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color="white"
                      lineHeight={1.35}
                      fontWeight="medium"
                    >
                      APIs and monetization tools for brands & developers.
                    </Text>

                    {/* Spacer */}
                    <Box flex="1" />
                    
                    {/* Explore Now Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/products/hushh-flow");
                      }}
                      size="sm"
                      px={5}
                      py={2}
                      fontSize="xs"
                      fontWeight="600"
                      borderRadius="6px"
                      bg="white"
                      color="black"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      backdropFilter="blur(10px)"
                      _hover={{
                        bg: "#0071E3",
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-1px)",
                      }}
                      _active={{
                        transform: "scale(0.98)",
                      }}
                      transition="all 0.2s ease"
                    >
                      Explore now
                    </Button>
                  </VStack>

                  <Box
                    position="absolute"
                    bottom={6}
                    right={6}
                    color="white"
                    opacity={0.4}
                    fontSize="xl"
                    transform="rotate(315deg)"
                    zIndex={2}
                  >
                    ↗
                  </Box>
                </Box>

                {/* Hushh Grid */}
                <Box
                  borderRadius="xl"
                  h={{ base: "250px", md: "300px", lg: "415px" }}
                  position="relative"
                  border="1px solid"
                  borderColor="#eaecf0"
                  _hover={{ transform: "translateY(-2px)", transition: "all 0.3s ease" }}
                  overflow="hidden"
                  onClick={() => {
                    router.push("/products/hushh-grid");
                  }}
                  cursor={"pointer"}
                  >
                  {/* Background Image filling entire box */}
                  <NextImage
                    src={HushhGridBgSvg}
                    alt="Hushh Grid"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <VStack align="start" spacing={6} h="full" position="relative" zIndex={1} p={{ base: 8, md: 10 }}>
                    {/* Product Name */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="semibold"
                      color="white"
                      lineHeight={1.25}
                      mt={6}
                    >
                      Hushh Grid
                    </Heading>

                    {/* Description */}
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color="white"
                      lineHeight={1.35}
                      fontWeight="medium"
                    >
                      The compute engine built for agentic AI
                    </Text>

                    {/* Spacer */}
                    <Box flex="1" />
                    
                    {/* Explore Now Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/products/hushh-grid");
                      }}
                      size="sm"
                      px={5}
                      py={2}
                      fontSize="xs"
                      fontWeight="600"
                      borderRadius="6px"
                      bg="white"
                      color="black"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      backdropFilter="blur(10px)"
                      _hover={{
                        bg: "#0071E3",
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-1px)",
                      }}
                      _active={{
                        transform: "scale(0.98)",
                      }}
                      transition="all 0.2s ease"
                    >
                      Explore now
                    </Button>
                  </VStack>

                  <Box
                    position="absolute"
                    bottom={6}
                    right={6}
                    color="white"
                    opacity={0.4}
                    fontSize="xl"
                    transform="rotate(315deg)"
                    zIndex={2}
                  >
                    ↗
                  </Box>
                </Box>
              </Grid>
            </GridItem>
          </Grid>

          {/* Explore the Stack */}
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="2.4px"
            color="gray.600"
            textAlign="center"
            mt={8}
          >
            Explore the Stack
          </Text>
        </VStack>
      </Container>

      {/* Open Source DNA Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 12, lg: 16 }}
          alignItems="center"
        >
          {/* Left Content */}
          <GridItem>
            <VStack align={{ base: "center", lg: "start" }} spacing={8}>
              {/* Main Heading */}
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                lineHeight={{ base: 1.2, md: 1.25 }}
                letterSpacing={{ base: "-0.5px", md: "-1.3px" }}
                color="black"
                textAlign={{ base: "center", lg: "left" }}
                maxW={{ base: "full", lg: "2xl" }}
              >
                Open Source DNA.
                <br />
                Built Like Nature.
              </Heading>

              {/* Description */}
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                lineHeight={1.8}
                color="#4e4e4e"
                textAlign={{ base: "center", lg: "left" }}
                maxW={{ base: "full", lg: "xl" }}
              >
                Inspired by how bacteria share DNA, Hushh Protocol lets developers copy, paste, and remix consent modules ("operons") that run anywhere — Safari, iOS, GCP
              </Text>

              {/* CTA Buttons */}
              <HStack 
                spacing={5} 
                flexWrap="wrap" 
                justify={{ base: "center", lg: "flex-start" }}
                w="full"
              >
                <Button
                  size="lg"
                  bg="black"
                  onClick={() => router.push("/consent-ai-protocol")}
                  color="white"
                  borderRadius="full"
                  px={{md:'15px',base:'10px'}}
                  py={{md:'28px',base:'15px'}}
                  h={{ base: 16, md: 18 }}
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="semibold"
                  _hover={{ bg: "gray.800" }}
                  _active={{ bg: "gray.900" }}
                >
                  View the Consent Protocol
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  color="black"
                  borderRadius="100px"
                  display="flex"
                  h="72px"
                  px={{ base: "15px", md: "28px" }}
                  py="15px"
                  justifyContent="center"
                  alignItems="center"
                  gap="16px"
                  onClick={() => window.open("https://github.com/hushh-labs/Hushh-PDA-Hackathon-Starting-Repository", "_blank")}
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="semibold"
                  leftIcon={
                    <Box
                      w={8}
                      h={8}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="black"
                      borderRadius="full"
                      color="white"
                      fontSize="lg"
                    >
                      <Icon as={HiLightningBolt} />
                    </Box>
                  }
                  _hover={{ bg: "gray.100" }}
                  _active={{ bg: "gray.200" }}
                >
                  Contribute on GitHub
                </Button>
              </HStack>
            </VStack>
          </GridItem>

          {/* Right Illustration */}
          <GridItem>
            <Box
              w="full"
              h={{ base: "400px", md: "500px", lg: "600px" }}
              borderRadius="70px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              overflow="hidden"
            >
              <NextImage
                src={OpenSourceRightImageSvg}
                alt="Open Source DNA - Bacteria Sharing"
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>

      {/* Agentic Intelligence in Action Section */}
      <Box minW={'100%'} mx={0} py={{ base: 16, md: 20 }}>
        {/* 
        <Box
          bg="gray.50"
          borderRadius="3xl"
          p={{ base: 8, md: 12, lg: 16 }}
          mx="auto"
          maxW="1200px"
        >
          <VStack spacing={{ base: 12, md: 16 }} align="center">
            <VStack spacing={4} align="center" textAlign="center">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="black"
                textAlign="center"
              >
                Agentic Intelligence in Action
              </Heading>

              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="gray.600"
                textAlign="center"
              >
                Real outcomes. One tap. Zero effort.
              </Text>
            </VStack>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={{ base: 8, md: 6, lg: 8 }}
              w="full"
              alignItems="center"
              justifyItems="center"
            >
              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    w={{ base: "200px", md: "180px", lg: "200px" }}
                    h={{ base: "400px", md: "360px", lg: "400px" }}
                    position="relative"
                  >
                    <NextImage
                      src={AgenticMobile1}
                      alt="Smart Request Interface"
                      fill
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </Box>

                  <Text
                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                    fontWeight="medium"
                    color="black"
                    textAlign="center"
                    maxW="180px"
                  >
                    You send one smart request.
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    w={{ base: "120px", md: "100px", lg: "120px" }}
                    h={{ base: "120px", md: "100px", lg: "120px" }}
                    position="relative"
                  >
                    <NextImage
                      src={AgenticEmoji2}
                      alt="Hushh Agent Processing"
                      fill
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </Box>

                  <Text
                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                    fontWeight="medium"
                    color="black"
                    textAlign="center"
                    maxW="180px"
                  >
                    Your agent checks your data, not the algorithm's.
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    w={{ base: "200px", md: "180px", lg: "200px" }}
                    h={{ base: "400px", md: "360px", lg: "400px" }}
                    position="relative"
                  >
                    <NextImage
                      src={AgenticMobile2}
                      alt="Brand Agents Response"
                      fill
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </Box>

                  <Text
                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                    fontWeight="medium"
                    color="black"
                    textAlign="center"
                    maxW="180px"
                  >
                    Trusted brand agents respond to your agent — not your inbox.
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    w={{ base: "200px", md: "180px", lg: "200px" }}
                    h={{ base: "400px", md: "360px", lg: "400px" }}
                    position="relative"
                  >
                    <NextImage
                      src={AgenticMobile3}
                      alt="Secure Purchase Interface"
                      fill
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </Box>

                  <Text
                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                    fontWeight="medium"
                    color="black"
                    textAlign="center"
                    maxW="180px"
                  >
                    You choose, securely and effortlessly.
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Box>
        */}

        <Box
          w="full"
          h={{ base: "400px", md: "600px", lg: "800px" }}
          position="relative"
        >
          <NextImage
            src={AgenticImageLayout}
            alt="Agentic Intelligence in Action"
            fill
            style={{
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </Box>
      </Box>
      <Box bg="#F5F5F7" borderRadius="45px" p={{ base: 6, md: 12 }} w="full">
             <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 10, lg: 16 }} alignItems="center">
                <Box
                  w="full"
                  h={{ base: "400px", md: "500px", lg: "600px" }}
                  borderRadius="30px"
                  position="relative"
                  overflow="hidden"
                >
                  <NextImage
                    src={consentCookieImage}
                    alt="Consent is the new cookie"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </Box>
                <VStack spacing={6} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                    <Heading as="h2" fontSize={{ base: "4xl", sm: "5xl" }} fontWeight="bold" color="black">Consent is the New Cookie</Heading>
                    <Text fontSize={{ base: "lg", md: "xl" }} color="black">
                        Hushh helps brands engage users with trust-first intelligence. Personal data agents become your best sales reps — always aligned with customer needs
                    </Text>
                    <HStack spacing={4} wrap="wrap" justify="center">
                         <Button bg="black" color="white" borderRadius="full" px={8} h="60px" _hover={{ bg: "#333" }} onClick={() => router.push("/contact-us")}>Become a Partner</Button>
                         <Button variant="outline" borderColor="black" color="black" borderRadius="full" px={8} h="60px" _hover={{ bg: "gray.100" }} onClick={() => router.push("https://calendly.com/hushh/30min?month=2025-07")}>Book a Demo</Button>
                    </HStack>
                </VStack>
             </Grid>
          </Box>

      {/* Marketplace Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <VStack spacing={{ base: 12, md: 16 }} align="center">
          {/* Section Tag */}
          <Box
            bg="#1778f0"
            borderRadius="21px"
            px={4}
            py={2}
            display="inline-block"
          >
            <Text
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="normal"
              color="white"
              textTransform="uppercase"
              letterSpacing="1.33px"
              textAlign="center"
            >
              Our Marketplace Reach Will Be
            </Text>
          </Box>

          {/* Main Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="semibold"
            lineHeight={{ base: 1.2, md: 1.25 }}
            letterSpacing={{ base: "-1px", md: "-1.6px" }}
            color="black"
            textAlign="center"
            maxW={{ base: "full", md: "5xl" }}
          >
            Everywhere Users Already Are
          </Heading>

          {/* Description */}
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            lineHeight={1.8}
            color="black"
            textAlign="center"
            maxW={{ base: "full", md: "4xl" }}
          >
            Seamlessly accessible across major marketplaces — from the iOS App Store to Hugging Face — ensuring your users can discover, integrate, and launch effortlessly within their existing ecosystems.
          </Text>

          {/* Marketplace Icons */}
          <Flex
            direction={{ base: "column", md: "row" }}
            wrap={{ base: "wrap", md: "nowrap" }}
            gap={{ base: 6, md: 8, lg: 12 }}
            align="center"
            justify="center"
            w="full"
            maxW="1000px"
          >
            {/* Apple App Store */}
            <Box
              w={{ base: "80px", md: "70px" }}
              h={{ base: "80px", md: "70px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              _hover={{ 
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
              }}
            >
              <NextImage
                src={AppleStoreIcon}
                alt="Apple App Store"
                width={70}
                height={70}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>

            {/* Google Cloud Marketplace */}
            <Box
              w={{ base: "140px", md: "120px" }}
              h={{ base: "80px", md: "65px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              _hover={{ 
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
              }}
            >
              <NextImage
                src={GoogleCloudIcon}
                alt="Google Cloud Marketplace"
                width={120}
                height={65}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>

            {/* Salesforce AppExchange */}
            <Box
              w={{ base: "100px", md: "85px" }}
              h={{ base: "80px", md: "65px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              _hover={{ 
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
              }}
            >
              <NextImage
                src={SalesforceIcon}
                alt="Salesforce AppExchange"
                width={85}
                height={65}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>

            {/* OpenAI GPT Store */}
            <Box
              w={{ base: "120px", md: "100px" }}
              h={{ base: "80px", md: "65px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              _hover={{ 
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
              }}
            >
              <NextImage
                src={GptStoreIcon}
                alt="OpenAI GPT Store"
                width={100}
                height={65}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>

            {/* Hugging Face */}
            <Box
              w={{ base: "200px", md: "160px" }}
              h={{ base: "60px", md: "50px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              _hover={{ 
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
              }}
            >
              <NextImage
                src={HuggingFaceIcon}
                alt="Hugging Face"
                width={160}
                height={50}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>
          </Flex>

          {/* CTA Button */}
          {/* <Button
            size="lg"
            bg="black"
            color="white"
            borderRadius="100px"
            px={{ base: "20px", md: "28px" }}
            py={{ base: "10px", md: "15px" }}
            h={{ base: "56px", md: "72px" }}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
            _hover={{ bg: "gray.800" }}
            _active={{ bg: "gray.900" }}
            mt={4}
            onClick={handleComingSoonToast}
          >
            Launch on hushh.ai
          </Button> */}
        </VStack>
      </Container>
      </ContentWrapper>

         <ContactForm/>
    </Box>
  )
}

export default NewLandingPage