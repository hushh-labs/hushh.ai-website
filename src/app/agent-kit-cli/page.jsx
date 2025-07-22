'use client';

import React from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  Button,
  Flex,
  Grid,
  GridItem,
  VStack,
  HStack,
  Stack,
  Input,
  Icon,
  Tag,
  useColorModeValue,
  SimpleGrid,
  AspectRatio,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaGithub, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { BsArrowRight, BsArrowDown } from 'react-icons/bs';
import ContentWrapper from '../_components/layout/ContentWrapper';
import githubProtocol from '../_components/svg/agentKit/githubProtocol.svg';
import agentKit from '../_components/svg/agentKit/agentKit.svg';
import earnFlow from '../_components/svg/agentKit/earnFlow.svg';
import getFeatured from '../_components/svg/agentKit/getFeatured.svg';
import helpOthers from '../_components/svg/agentKit/helpOthers.svg';
import join from '../_components/svg/agentKit/join.svg';
import reachUser from '../_components/svg/agentKit/reachUser.svg';
import ContactForm from '../_components/features/contactForm';
import communityIcon from '../_components/svg/agentKit/communityIcon.svg';

  const AgentKitCliPage = () => {
    const bgGradient = 'linear(135deg, #667eea 0%, #764ba2 100%)';
    const textGradient = 'linear(90deg, #E91E63 0%, #F44336 100%)';

      return (
      <ContentWrapper>
      <Box bg="white" minH="100vh" overflowX="hidden" w="100%" maxW="100vw">
        {/* Background Pattern */}
        <Box
          position="absolute"
          top="-138px"
          left="0"
          right="0"
          h="1074px"
          opacity="0.3"
          overflow="hidden"
          zIndex="-1"
        >
          {/* Background grid pattern - simplified for performance */}
          <Box
            w="100%"
            h="100%"
            backgroundImage="url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          />
        </Box>

              {/* Hero Section */}
        <Container maxW={{ base: "95%", md: "90%", lg: "1365px" }} pt={{ base: 12, md: 20, lg: 24 }} pb={{ base: 8, md: 12 }}>
        <VStack spacing={{ base: 8, md: 12, lg: 14 }} align="center" textAlign="center">
          {/* Main Heading */}
          <VStack spacing={{ base: 2, md: 4 }}>
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl", xl: "100px" }}
              fontWeight="700"
              lineHeight={{ base: "1", md: "0.9" }}
              letterSpacing="-0.02em"
              color="#000000"
              textAlign="center"
            >
              Build
            </Heading>
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl", xl: "100px" }}
              fontWeight="700"
              lineHeight={{ base: "1", md: "0.9" }}
              letterSpacing="-0.02em"
              bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 25%, hsla(354, 88%, 61%, 1) 50%, hsla(13, 91%, 55%, 1) 100%)"
              bgClip="text"
              textAlign="center"
            >
              Personal AI
            </Heading>
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl", xl: "100px" }}
              fontWeight="700"
              lineHeight={{ base: "1", md: "0.9" }}
              letterSpacing="-0.02em"
              color="#000000"
              textAlign="center"
            >
              agents with integrity
            </Heading>
          </VStack>

          {/* Subtitle */}
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "20px" }}
            color="#333333"
            maxW={{ base: "100%", md: "80%", lg: "900px" }}
            lineHeight={{ base: "1.6", md: "1.5" }}
            textAlign="center"
            mt={{ base: 4, md: 6 }}
            px={{ base: 4, md: 0 }}
          >
            Welcome to the hushh Developer ecosystem — where open-source meets intelligent consent. 
            Whether you're contributing operons, deploying agents, or extending the Consent Protocol, 
            you're joining a movement to create privacy-first, user-owned AI infrastructure.
          </Text>

          {/* CTA Buttons */}
          <HStack 
            spacing={{ base: 4, md: 5 }} 
            flexWrap="wrap" 
            justify="center"
            mt={{ base: 6, md: 8 }}
          >
            <Button
              bg="#0c8ce9"
              color="white"
              size="lg"
              onClick={() => router.push("/consent-ai-protocol")}
              px={{ base: 6, md: 8 }}
              py={{ base: 6, md: 7 }}
              rounded="full"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              _hover={{ bg: "#0a7bd1" }}
              minW={{ base: "180px", md: "200px" }}
              h={{ base: "50px", md: "60px" }}
            >
              Build Your Agent
            </Button>
            <Button
              bg="#000000"
              color="white"
              size="lg"
              px={{ base: 6, md: 8 }}
              py={{ base: 6, md: 7 }}
              rounded="full"
              onClick={() => router.push("https://apps.apple.com/in/app/hushh-app/id6498471189", target="_blank")}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              _hover={{ bg: "#333333" }}
              minW={{ base: "180px", md: "200px" }}
              h={{ base: "50px", md: "60px" }}
            >
              Get Early Access
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* GitHub Protocol Section */}
      <Container maxW={{ base: "95%", md: "90%", lg: "1589px" }} py={{ base: 12, md: 20 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 8, md: 12, lg: 20 }}
          alignItems="center"
        >
          {/* Image */}
          <GridItem>
            <AspectRatio ratio={1}>
              <Box
                rounded="70px"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={8}
              >
                <Image
                  src={githubProtocol}
                  alt="GitHub Protocol"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
            </AspectRatio>
          </GridItem>

          {/* Content */}
          <GridItem>
            <VStack spacing={8} align="flex-start">
              {/* GitHub Icon */}
              <Icon as={FaGithub} boxSize="88px" color="gray.600" />

              {/* Heading */}
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "67px" }}
                fontWeight="bold"
                color="#344054"
                lineHeight="1.25"
                letterSpacing="-0.02em"
              >
                GitHub Protocol
              </Heading>

              {/* Description */}
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                color="#4e4e4e"
                lineHeight="1.85"
                maxW="766px"
              >
                The hushh Consent AI Protocol is our open, modular trust layer — 
                built for iOS-verified humans, inspired by the elegance of bacterial DNA 
                and the resilience of the open web.
              </Text>

              {/* Feature Tags */}
              <Flex flexWrap="wrap" gap={3} maxW="766px">
                {[
                  "Monorepo + modular plugins (operons)",
                  "Copy/paste ready microfunctions",
                  "Verified via Apple ID & GitHub",
                  "Self-documenting, versioned, and signed",
                  "Written like digital DNA: resilient, compact, remixable"
                ].map((feature, index) => (
                  <Tag
                    key={index}
                    bg="#e0edff"
                    color="gray.800"
                    px={5}
                    py={2}
                    rounded="md"
                    fontSize="lg"
                    opacity="0.8"
                  >
                    {feature}
                  </Tag>
                ))}
              </Flex>

              {/* Additional Description */}
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                color="#4e4e4e"
                lineHeight="1.85"
                maxW="766px"
              >
                Whether you're contributing a new consent operon or patching Vault schema logic, 
                every change is logged, testable, and trusted.
              </Text>

              {/* GitHub Button */}
              <Button
                bg="gray.800"
                color="white"
                size="lg"
                onClick={() => router.push("https://github.com/hushh-labs/consent-protocol", target="_blank")}
                px={8}
                py={6}
                rounded="full"
                fontSize="xl"
                fontWeight="semibold"
                rightIcon={<Icon as={FaGithub} boxSize={6} />}
                _hover={{ bg: "gray.700" }}
              >
                View on GitHub
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Agentkit CLI Section */}
      <Container maxW={{ base: "95%", md: "90%", lg: "1589px" }} py={{ base: 12, md: 20 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 8, md: 12, lg: 20 }}
          alignItems="center"
        >
          {/* Content */}
          <GridItem>
            <VStack spacing={8} align="flex-start">
              {/* Heading */}
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "67px" }}
                fontWeight="bold"
                color="#344054"
                lineHeight="1.25"
                letterSpacing="-0.02em"
              >
                Agentkit CLI
              </Heading>

              {/* Description */}
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                color="#4e4e4e"
                lineHeight="1.85"
                maxW="766px"
              >
                Deploy agents that just work. Agentkit is our developer CLI toolkit 
                that scaffolds Personal Data Agents with plug-and-play actions.
              </Text>

              {/* Feature Tags */}
              <Flex flexWrap="wrap" gap={3} maxW="766px">
                {[
                  "Built-in micro-consent templates (MCP)",
                  "Built for Apple-first developers",
                  "Scaffold voice-, shortcut-, or tap-based agents",
                  "Connect to OpenAI, iCloud, Stripe, Notion, and more",
                  "CLI + Replit + GitHub Codespaces support"
                ].map((feature, index) => (
                  <Tag
                    key={index}
                    bg="#e0edff"
                    color="gray.800"
                    px={5}
                    py={2}
                    rounded="md"
                    fontSize="lg"
                    opacity="0.8"
                  >
                    {feature}
                  </Tag>
                ))}
              </Flex>

              {/* Additional Description */}
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                color="#4e4e4e"
                lineHeight="1.85"
                maxW="766px"
              >
                Whether you're building on iOS, the web, or automating data flows across cloud tools — 
                Agentkit accelerates your development with best-practice privacy baked in.
              </Text>

              {/* Install Button */}
              <Button
                bg="gray.800"
                color="white"
                size="lg"
                px={8}
                py={6}
                onClick={() => router.push("https://github.com/hushh-labs/consent-protocol/blob/main/docs/agentcli.md", target="_blank")}
                rounded="full"
                fontSize="xl"
                fontWeight="semibold"
                rightIcon={<Icon as={BsArrowRight} boxSize={5} />}
                _hover={{ bg: "gray.700" }}
              >
                Install Agentkit
              </Button>
            </VStack>
          </GridItem>
{/* Image */}
<GridItem>
            <AspectRatio ratio={1}>
              <Box
                rounded="70px"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={8}
              >
                <Image
                  src={agentKit}
                  alt="AgentKit"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
            </AspectRatio>
          </GridItem>
        </Grid>
      </Container>

      {/* Build an Operon Section */}
      <Box
        // bg="gray.900"
        background='url(/operonBg.svg)'
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundBlendMode="overlay"
        py={{ base: 16, md: 24 }}
        position="relative"
      >
        <Container maxW={{ base: "95%", md: "90%", lg: "1275px" }}>
          <VStack spacing={8} align="center" textAlign="center">
            {/* Heading */}
            <VStack spacing={2}>
              <Heading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 25%, hsla(354, 88%, 61%, 1) 50%, hsla(13, 91%, 55%, 1) 100%)"
                bgClip="text"
                lineHeight="1.2"
              >
                Build an Operon
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} color="white" lineHeight="1.85">
                Think small. Think reusable. Think programmable DNA.
              </Text>
            </VStack>

            {/* Feature Tags */}
            <Flex flexWrap="wrap" gap={3} justify="center" maxW="full">
              {[
                "Read or write to the Vault",
                "Request or verify consent",
                "Execute logic with GPT, Claude, or Gemini"
              ].map((feature, index) => (
                <Box
                  key={index}
                  border="2px dashed"
                  borderColor="gray.400"
                  px={5}
                  py={4}
                  rounded="md"
                  minH="71px"
                  display="flex"
                  alignItems="center"
                >
                  <Text color="white" fontSize="lg">
                    {feature}
                  </Text>
                </Box>
              ))}
            </Flex>

            {/* Description */}
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              color="white"
              lineHeight="1.85"
              maxW="full"
              textAlign="center"
            >
              Write once, copy everywhere. Operons are the building blocks of the hushh ecosystem. 
              Agents are living systems — operons are their genes.
            </Text>

            {/* Community Card */}
            <Box
              bg="rgba(217,217,217,0.1)"
              backdropFilter="blur(7.5px)"
              rounded="40px"
              p={8}
              maxW="433px"
              textAlign="center"
            >
              <VStack spacing={4}>
               <Image src={communityIcon} alt="operonBg" width={100} height={100} />
                <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} color="white" lineHeight="1.85">
                  Join the community contributing to the fastest-evolving agent genome in open-source AI.
                </Text>
                <Button
                  bg="transparent"
                  color="white"
                  size="lg"
                  onClick={() => router.push("https://github.com/hushh-labs/consent-protocol/blob/main/docs/operons.md", target="_blank")}
                  px={8}
                  py={6}
                  rounded="40px"
                  fontSize="xl"
                  fontWeight="semibold"
                  border="1px solid"
                  borderColor="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  w="full"
                >
                  Read the Operon Style Guide
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Submit to Marketplace Section */}
      <Container maxW={{ base: "95%", md: "90%", lg: "1400px" }} py={{ base: 16, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }} align="center">
          {/* Heading */}
          <VStack spacing={3} textAlign="center">
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "48px" }}
              fontWeight="bold"
              color="#344054"
              lineHeight="1.2"
              letterSpacing="-0.02em"
            >
              Submit to Marketplace
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="#6B7280" 
              fontWeight="400"
            >
              Built something beautiful? Ship it to the world.
            </Text>
          </VStack>

          {/* Feature Cards */}
          <Grid 
            templateColumns={{ 
              base: "1fr", 
              sm: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)", 
              lg: "repeat(5, 1fr)" 
            }} 
            gap={{ base: 4, md: 6 }} 
            w="full"
            maxW={{ base: "100%", lg: "1200px" }}
          >
            {[
              {
                icon: reachUser,
                title: "Reach users across iOS, Web, and Android"
              },
              {
                icon: getFeatured,
                title: "Get featured in the hushh Agent Registry"
              },
              {
                icon: earnFlow,
                title: "Earn Flow Credits & badges"
              },
              {
                icon: join,
                title: "Join the 1024 founding contributors"
              },
              {
                icon: helpOthers,
                title: "Help others build with consent-first intelligence"
              }
            ].map((item, index) => (
              <Box
                key={index}
                border="1px solid"
                borderColor="#E5E7EB"
                rounded="12px"
                p={{ base: 4, md: 6 }}
                bg="white"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={4}
                minH={{ base: "180px", md: "200px" }}
                _hover={{
                  borderColor: "#3B82F6",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                }}
                transition="all 0.2s ease"
              >
                <Box 
                  w={{ base: "40px", md: "48px" }} 
                  h={{ base: "40px", md: "48px" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain" 
                    }}
                  />
                </Box>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="500"
                  color="#374151"
                  lineHeight="1.5"
                  textAlign="left"
                >
                  {item.title}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Submit Button */}
          <Button
            bg="#000000"
            color="white"
            size="md"
            px={6}
            py={3}
            rounded="full"
            fontSize="md"
            fontWeight="semibold"
            rightIcon={<Icon as={BsArrowRight} boxSize={4} />}
            _hover={{ bg: "#333333" }}
            mt={{ base: 4, md: 6 }}
          >
            Submit Your Agent →
          </Button>
        </VStack>
      </Container>

    </Box>
    <ContactForm/>
    </ContentWrapper>
  );
};

export default AgentKitCliPage;