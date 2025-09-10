'use client';

import React from 'react';
import { Box, Container, Flex, Heading, Text, Grid, GridItem, Button, Image, VStack, HStack, Divider, Link, SimpleGrid } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import extendedTheme from '../theme';
import './solutions.css';
import Head from "next/head";
import { siteMetadata } from "../sitemetadata";

const SolutionsPage = () => {
  return (
    <>
      <Box bg="#f5f5f7">
        {/* Hero Section */}
        <Container maxW="container.xl" py={{ base: 20, md: 24, lg: 32 }}>
          <VStack spacing={{ base: 8, md: 12, lg: 16 }} align="center" maxW="6xl" mx="auto">
            
            {/* Solutions Badge */}
            <Box pt={{ base: 16, md: 20, lg: 24 }}>
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight="700"
                textAlign="center"
                bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
                bgClip="text"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
              >
                Enterprise Solutions
              </Text>
            </Box>
            
            {/* Main Headline */}
            <VStack spacing={6} align="center">
              <Heading
                as="h1"
                fontSize={{ base: "40px", md: "64px", lg: "80px", xl: "96px" }}
                fontWeight="bold"
                textAlign="center"
                lineHeight={{ base: 1.1, md: 1.0, lg: 0.95 }}
                letterSpacing={{ base: "-1px", md: "-2px", lg: "-3px" }}
                color="black"
                fontFamily="Inter, sans-serif"
                maxW={{ base: "100%", md: "90%", lg: "85%", xl: "80%" }}
              >
                Enterprise Grade
                <br />
                Solutions for a{" "}
                <Text as="span" bgGradient="linear(to-r, #0071E3, #BB62FC)" bgClip="text">
                  Connected Future
                </Text>
              </Heading>
            </VStack>

            {/* Description Text */}
            <Text
              fontSize={{ base: "18px", md: "20px", lg: "24px" }}
              textAlign="center"
              lineHeight={{ base: 1.6, md: 1.5, lg: 1.4 }}
              color="#1d1d1d"
              fontWeight="400"
              maxW={{ base: "100%", md: "85%", lg: "75%", xl: "70%" }}
              px={{ base: 4, md: 6, lg: 0 }}
              fontFamily="Inter, sans-serif"
              letterSpacing="-0.01em"
            >
              At Hushh Technologies, we specialise in delivering tailored IT services and supplying 
              enterprise hardware that meets the rigorous demands of modern business across the 
              GCC. From infrastructure setup to performance computing and display solutions — we 
              make your operations smarter, faster, and more secure.
            </Text>

          </VStack>
        </Container>

        {/* IT Services Section */}
        <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
          <Box maxW="6xl" mx="auto">
            
            {/* Section Header */}
            <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 12, md: 16 }}>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                textAlign="center"
                color="#666"
                letterSpacing="0.08em"
                textTransform="uppercase"
                fontFamily="Inter, sans-serif"
              >
                Enterprise Services
              </Text>
              
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
                textAlign="center"
              >
                IT Services Built for Scale
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
                maxW="800px"
              >
                We support your business at every stage of growth with secure, agile, and scalable services:
              </Text>
            </VStack>

            {/* Services Grid */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }} maxW="5xl" mx="auto">
              
              {/* Server Architecture & Virtualisation */}
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="20px"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  mb={4}
                  lineHeight={1.3}
                >
                  Server Architecture & Virtualisation
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="400"
                >
                  Design and deploy high-performance, multi-environment server 
                  infrastructure that supports your workloads, whether on-premises or 
                  hybrid.
                </Text>
              </Box>

              {/* Cloud Computing & Migration */}
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="20px"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  mb={4}
                  lineHeight={1.3}
                >
                  Cloud Computing & Migration
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="400"
                >
                  Transition to AWS, Microsoft Azure, or hybrid cloud with expert-led 
                  planning and data security at the core.
                </Text>
              </Box>

              {/* Enterprise IT Support & Maintenance */}
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="20px"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  mb={4}
                  lineHeight={1.3}
                >
                  Enterprise IT Support & Maintenance
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="400"
                >
                  SLA-driven on-site and remote support covering server upkeep, compute 
                  operations, and display systems.
                </Text>
              </Box>

              {/* Data Centre Setup & Consulting */}
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="20px"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  mb={4}
                  lineHeight={1.3}
                >
                  Data Centre Setup & Consulting
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="400"
                >
                  End-to-end design and implementation of server rooms, cooling systems, 
                  and power distribution tailored to your business.
                </Text>
              </Box>

            </SimpleGrid>
          </Box>
        </Container>

        {/* Hardware Solutions Section */}
        <Box bg="white">
          <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
            <Box maxW="6xl" mx="auto">
              
              {/* Section Header */}
              <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 12, md: 16 }}>
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="600"
                  textAlign="center"
                  color="#666"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  fontFamily="Inter, sans-serif"
                >
                  Hardware Solutions
                </Text>
                
                <Heading
                  as="h2"
                  fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                  fontWeight="bold"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.02em"
                  lineHeight={1.2}
                  textAlign="center"
                >
                  Hardware That Performs
                </Heading>
                
                <Text
                  fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                  color="#1d1d1d"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="400"
                  textAlign="center"
                  maxW="800px"
                >
                  We retail and support best-in-class computing and display products from leading global brands. All 
                  solutions include warranty, expert installation, and post-sale support.
                </Text>
              </VStack>

              {/* Hardware Categories Grid */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={{ base: 8, md: 10 }} maxW="6xl" mx="auto">
                
                {/* Servers */}
                <GridItem>
                  <VStack align="start" spacing={{ base: 6, md: 8 }}>
                    <Heading 
                      as="h3" 
                      fontSize={{ base: "24px", md: "28px" }}
                      fontWeight="bold"
                      bgGradient="linear(to-r, #0071E3, #BB62FC)"
                      bgClip="text"
                      fontFamily="Inter, sans-serif"
                    >
                      Servers
                    </Heading>
                    
                    <VStack align="start" spacing={{ base: 4, md: 6 }} w="full">
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Rack Servers / Tower Servers
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          From entry-level to high-density servers designed 
                          for scalability and uptime.
                        </Text>
                      </Box>
                      
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Blade Servers
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          Space-saving, high-compute solutions for data-
                          intensive applications.
                        </Text>
                      </Box>
                      
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Edge Servers
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          Designed for remote or industrial deployments with 
                          compact power efficiency.
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </GridItem>

                {/* Computing Products */}
                <GridItem>
                  <VStack align="start" spacing={{ base: 6, md: 8 }}>
                    <Heading 
                      as="h3" 
                      fontSize={{ base: "24px", md: "28px" }}
                      fontWeight="bold"
                      bgGradient="linear(to-r, #0071E3, #BB62FC)"
                      bgClip="text"
                      fontFamily="Inter, sans-serif"
                    >
                      Computing Products
                    </Heading>
                    
                    <VStack align="start" spacing={{ base: 4, md: 6 }} w="full">
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Workstations
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          High-performance systems built for engineering, 
                          video editing, 3D rendering, and data modelling.
                        </Text>
                      </Box>
                      
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Mini PCs & Compute Nodes
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          Compact solutions for specific use cases like kiosks, 
                          IoT, or point-of-sale environments.
                        </Text>
                      </Box>
                      
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          GPU-powered Machines
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          AI-ready, ML/Deep Learning compatible systems 
                          with NVIDIA-certified configurations.
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </GridItem>

                {/* Screens & Displays */}
                <GridItem>
                  <VStack align="start" spacing={{ base: 6, md: 8 }}>
                    <Heading 
                      as="h3" 
                      fontSize={{ base: "24px", md: "28px" }}
                      fontWeight="bold"
                      bgGradient="linear(to-r, #0071E3, #BB62FC)"
                      bgClip="text"
                      fontFamily="Inter, sans-serif"
                    >
                      Screens & Displays
                    </Heading>
                    
                    <VStack align="start" spacing={{ base: 4, md: 6 }} w="full">
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Professional Monitors
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          Colour-calibrated displays for design, broadcast, and 
                          financial sectors.
                        </Text>
                      </Box>
                      
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Large Format Displays
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          Commercial-grade screens for command centres, 
                          boardrooms, and collaboration spaces.
                        </Text>
                      </Box>
                      
                      <Box>
                        <Heading 
                          as="h4" 
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight="600"
                          color="black"
                          fontFamily="Inter, sans-serif"
                          mb={2}
                        >
                          Interactive Touch Displays
                        </Heading>
                        <Text
                          fontSize={{ base: "14px", md: "16px" }}
                          color="#666"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1.6}
                          letterSpacing="-0.01em"
                          fontWeight="400"
                        >
                          Education, retail, and training-focused solutions with 
                          robust interactivity and clarity.
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </GridItem>

              </Grid>
            </Box>
          </Container>
        </Box>

        {/* Why Hushh Technologies */}
        <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
          <Box maxW="6xl" mx="auto">
            
            {/* Section Header */}
            <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 12, md: 16 }}>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                textAlign="center"
                color="#666"
                letterSpacing="0.08em"
                textTransform="uppercase"
                fontFamily="Inter, sans-serif"
              >
                Our Advantages
              </Text>
              
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
                textAlign="center"
              >
                Why Hushh Technologies?
              </Heading>
            </VStack>

            {/* Advantages Grid */}
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
              gap={{ base: 8, md: 12 }}
              maxW="5xl" 
              mx="auto"
            >
              <VStack align="flex-start" spacing={{ base: 6, md: 8 }}>
                <VStack spacing={{ base: 3, md: 4 }} align="start">
                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="#0071E3"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Trusted partner for Fortune 500 clients in the GCC
                    </Text>
                  </Box>
                </VStack>
                
                <VStack spacing={{ base: 3, md: 4 }} align="start">
                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="#0071E3"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Certified technical team with deep deployment experience
                    </Text>
                  </Box>
                </VStack>
                
                <VStack spacing={{ base: 3, md: 4 }} align="start">
                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="#0071E3"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Authorised reseller of HP, Dell, Apple, Lenovo, Acer, and NVIDIA
                    </Text>
                  </Box>
                </VStack>
              </VStack>
              
              <VStack align="flex-start" spacing={{ base: 6, md: 8 }}>
                <VStack spacing={{ base: 3, md: 4 }} align="start">
                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="#0071E3"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Fast regional delivery and local installation
                    </Text>
                  </Box>
                </VStack>
                
                <VStack spacing={{ base: 3, md: 4 }} align="start">
                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="#0071E3"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      End-to-end lifecycle support from consultation to maintenance
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </Grid>
          </Box>
        </Container>

        {/* CTA Section */}
        <Box bg="white">
          <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
            <VStack spacing={{ base: 8, md: 12, lg: 16 }} align="center" maxW="4xl" mx="auto">
              
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                textAlign="center"
                color="#666"
                letterSpacing="0.08em"
                textTransform="uppercase"
                fontFamily="Inter, sans-serif"
              >
                Get Started
              </Text>
              
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
                textAlign="center"
              >
                Let's Build Your Infrastructure
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
                maxW="700px"
              >
                Need help selecting the right server or computing solution? We're just a call or message away.
              </Text>
              
              <Button
                size="lg"
                bg="#0071E3"
                color="white"
                borderRadius="full"
                onClick={() => window.open("/contact-us", "_blank")}
                px={{ base: 8, md: 10 }}
                py={{ base: 6, md: 7 }}
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="500"
                fontFamily="Inter, sans-serif"
                _hover={{
                  bg: "#0056B3",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 113, 227, 0.3)"
                }}
                _active={{
                  transform: "translateY(0)"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Contact Us for a Consultation
              </Button>

            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SolutionsPage;