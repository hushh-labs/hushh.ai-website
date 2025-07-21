'use client';

import React from 'react';
import { Box, Container, Flex, Heading, Text, Grid, GridItem, Button, Image, VStack, HStack, Divider, Link, SimpleGrid } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import extendedTheme from '../theme';
import './solutions.css';
import Head from "next/head";
import { siteMetadata } from "../sitemetadata";

const SolutionsPage = () => {
  const gradient = "linear(63.68deg, #ADA785, #D6D3C2)";

  return (
    <>
      <div className="w-full">
        <Box
          w={"100%"}
          h={"100%"}
          minW={'100%'}
          pt={"8rem"}
          px={{ base: "1.5rem", md: "6.25rem" }}
          background={"black"}
          fontFamily={"Figtree"}
          mb={{ base: "2rem", md: "5rem" }}
        >
          {/* Hero Section */}
          <Box 
            className="solutions-hero"
            minH={{ base: "70vh", md: "80vh" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={{ base: "3rem", md: "5rem" }}
          >
            <Container maxW="container.xl">
              <Box maxW="900px" mx="auto" textAlign="center">
                <Heading 
                  as={"h1"}
                  fontWeight={"300"}
                  fontSize={{ base: "3rem", md: "6rem" }}
                  lineHeight={{ base: "3.5rem", md: "6rem" }}
                  letterSpacing={"-0.06em"}
                  mb={10}
                >
                  <Text color={"#ADA785"}>Enterprise Grade</Text>
                  <Text color={extendedTheme.colors._white}>Solutions</Text>
                  <Text color={extendedTheme.colors._white} mt={2}>
                    for a <Text as="span" className="hushh-gradient">Connected Future</Text>
                  </Text>
                </Heading>
                <Text 
                  fontSize={{ base: "md", md: "xl" }}
                  lineHeight="1.7"
                  className="solutions-subheading"
                  fontWeight="400"
                  color="#ABABAB"
                  mx={{ base: "0", md: "10%" }}
                >
                  At Hushh Technologies, we specialise in delivering tailored IT services and supplying 
                  enterprise hardware that meets the rigorous demands of modern business across the 
                  GCC. From infrastructure setup to performance computing and display solutions — we 
                  make your operations smarter, faster, and more secure.
                </Text>
              </Box>
            </Container>
          </Box>

          {/* IT Services Section */}
          <Box py={{ base: "3rem", md: "5rem" }}>
            <VStack mb={12}>
              <Text
                className="hushh-gradient"
                fontWeight={"600"}
                fontSize={{ md: "1rem", base: "0.75rem" }}
                lineHeight={"16px"}
                letterSpacing={"0.255rem"}
                mb={2}
              >
                ENTERPRISE SERVICES
              </Text>
              <Text
                className="gradient"
                fontWeight={"400"}
                fontSize={{ base: "2.5rem", md: "3.75rem" }}
                lineHeight={{ base: "3rem", md: "4rem" }}
                textAlign="center"
              >
                IT Services Built for Scale
              </Text>
              <Text 
                maxW="800px" 
                mx="auto" 
                fontSize="xl" 
                color="#ABABAB" 
                lineHeight="1.7"
                mt={4}
                textAlign="center"
              >
                We support your business at every stage of growth with secure, agile, and scalable services:
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="container.lg" mx="auto">
              {/* Server Architecture & Virtualisation */}
              <Box className="solution-card-dark">
                <Heading as="h3" className="card-title-dark" fontSize={{ base: "1.5rem", md: "1.75rem" }}>
                  Server Architecture & Virtualisation
                </Heading>
                <Text className="card-description-dark">
                  Design and deploy high-performance, multi-environment server 
                  infrastructure that supports your workloads, whether on-premises or 
                  hybrid.
                </Text>
              </Box>

              {/* Cloud Computing & Migration */}
              <Box className="solution-card-dark">
                <Heading as="h3" className="card-title-dark" fontSize={{ base: "1.5rem", md: "1.75rem" }}>
                  Cloud Computing & Migration
                </Heading>
                <Text className="card-description-dark">
                  Transition to AWS, Microsoft Azure, or hybrid cloud with expert-led 
                  planning and data security at the core.
                </Text>
              </Box>

              {/* Enterprise IT Support & Maintenance */}
              <Box className="solution-card-dark">
                <Heading as="h3" className="card-title-dark" fontSize={{ base: "1.5rem", md: "1.75rem" }}>
                  Enterprise IT Support & Maintenance
                </Heading>
                <Text className="card-description-dark">
                  SLA-driven on-site and remote support covering server upkeep, compute 
                  operations, and display systems.
                </Text>
              </Box>

              {/* Data Centre Setup & Consulting */}
              <Box className="solution-card-dark">
                <Heading as="h3" className="card-title-dark" fontSize={{ base: "1.5rem", md: "1.75rem" }}>
                  Data Centre Setup & Consulting
                </Heading>
                <Text className="card-description-dark">
                  End-to-end design and implementation of server rooms, cooling systems, 
                  and power distribution tailored to your business.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Hardware Solutions Section */}
          <Box py={{ base: "3rem", md: "6rem" }} borderTop="1px solid rgba(255, 255, 255, 0.1)" borderBottom="1px solid rgba(255, 255, 255, 0.1)">
            <VStack mb={12}>
              <Text
                className="hushh-gradient"
                fontWeight={"600"}
                fontSize={{ md: "1rem", base: "0.75rem" }}
                lineHeight={"16px"}
                letterSpacing={"0.255rem"}
                mb={2}
              >
                HARDWARE SOLUTIONS
              </Text>
              <Text
                className="gradient"
                fontWeight={"400"}
                fontSize={{ base: "2.5rem", md: "3.75rem" }}
                lineHeight={{ base: "3rem", md: "4rem" }}
                textAlign="center"
              >
                Hardware That Performs
              </Text>
              <Text 
                maxW="800px" 
                mx="auto" 
                fontSize="xl" 
                color="#ABABAB" 
                lineHeight="1.7"
                mt={4}
                textAlign="center"
              >
                We retail and support best-in-class computing and display products from leading global brands. All 
                solutions include warranty, expert installation, and post-sale support.
              </Text>
            </VStack>

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={10} maxW="container.xl" mx="auto" className="hardware-solution-grid">
              {/* Servers */}
              <GridItem className="hardware-solution-item">
                <Heading as="h3" className="category-heading-dark" bgGradient={gradient} bgClip="text">
                  Servers
                </Heading>
                
                <VStack align="start" spacing={8} mt={6} className="hardware-solution-content">
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Rack Servers / Tower Servers
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      From entry-level to high-density servers designed 
                      for scalability and uptime.
                    </Text>
                  </Box>
                  
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Blade Servers
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      Space-saving, high-compute solutions for data-
                      intensive applications.
                    </Text>
                  </Box>
                  
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Edge Servers
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      Designed for remote or industrial deployments with 
                      compact power efficiency.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>

              {/* Computing Products */}
              <GridItem className="hardware-solution-item">
                <Heading as="h3" className="category-heading-dark" bgGradient={gradient} bgClip="text">
                  Computing Products
                </Heading>
                
                <VStack align="start" spacing={8} mt={6} className="hardware-solution-content">
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Workstations
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      High-performance systems built for engineering, 
                      video editing, 3D rendering, and data modelling.
                    </Text>
                  </Box>
                  
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Mini PCs & Compute Nodes
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      Compact solutions for specific use cases like kiosks, 
                      IoT, or point-of-sale environments.
                    </Text>
                  </Box>
                  
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      GPU-powered Machines
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      AI-ready, ML/Deep Learning compatible systems 
                      with NVIDIA-certified configurations.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>

              {/* Screens & Displays */}
              <GridItem className="hardware-solution-item">
                <Heading as="h3" className="category-heading-dark" bgGradient={gradient} bgClip="text">
                  Screens & Displays
                </Heading>
                
                <VStack align="start" spacing={8} mt={6} className="hardware-solution-content">
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Professional Monitors
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      Colour-calibrated displays for design, broadcast, and 
                      financial sectors.
                    </Text>
                  </Box>
                  
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Large Format Displays
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      Commercial-grade screens for command centres, 
                      boardrooms, and collaboration spaces.
                    </Text>
                  </Box>
                  
                  <Box className="subcategory-box">
                    <Heading as="h4" fontSize="1.25rem" className="subcategory-heading-dark">
                      Interactive Touch Displays
                    </Heading>
                    <Text className="subcategory-description-dark" fontSize="1rem">
                      Education, retail, and training-focused solutions with 
                      robust interactivity and clarity.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>
          </Box>

          {/* Why Hushh Technologies */}
          <Box py={{ base: "3rem", md: "6rem" }}>
            <VStack mb={12}>
              <Text
                className="hushh-gradient"
                fontWeight={"600"}
                fontSize={{ md: "1rem", base: "0.75rem" }}
                lineHeight={"16px"}
                letterSpacing={"0.255rem"}
                mb={2}
              >
                OUR ADVANTAGES
              </Text>
              <Text
                className="gradient"
                fontWeight={"400"}
                fontSize={{ base: "2.5rem", md: "3.75rem" }}
                lineHeight={{ base: "3rem", md: "4rem" }}
                textAlign="center"
              >
                Why Hushh Technologies?
              </Text>
            </VStack>

            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
              gap={{ base: 6, md: 10 }}
              maxW="container.lg" 
              mx="auto"
            >
              <VStack align="flex-start" spacing={6}>
                <HStack align="flex-start" spacing={4}>
                  <Box color="#ADA785" mt={1}>
                    <CheckCircleIcon boxSize={5} />
                  </Box>
                  <Text fontSize="lg" color="#ABABAB" fontWeight="400">
                    Trusted partner for Fortune 500 clients in the GCC
                  </Text>
                </HStack>
                
                <HStack align="flex-start" spacing={4}>
                  <Box color="#ADA785" mt={1}>
                    <CheckCircleIcon boxSize={5} />
                  </Box>
                  <Text fontSize="lg" color="#ABABAB" fontWeight="400">
                    Certified technical team with deep deployment experience
                  </Text>
                </HStack>
                
                <HStack align="flex-start" spacing={4}>
                  <Box color="#ADA785" mt={1}>
                    <CheckCircleIcon boxSize={5} />
                  </Box>
                  <Text fontSize="lg" color="#ABABAB" fontWeight="400">
                    Authorised reseller of HP, Dell, Apple, Lenovo, Acer, and NVIDIA
                  </Text>
                </HStack>
              </VStack>
              
              <VStack align="flex-start" spacing={6}>
                <HStack align="flex-start" spacing={4}>
                  <Box color="#ADA785" mt={1}>
                    <CheckCircleIcon boxSize={5} />
                  </Box>
                  <Text fontSize="lg" color="#ABABAB" fontWeight="400">
                    Fast regional delivery and local installation
                  </Text>
                </HStack>
                
                <HStack align="flex-start" spacing={4}>
                  <Box color="#ADA785" mt={1}>
                    <CheckCircleIcon boxSize={5} />
                  </Box>
                  <Text fontSize="lg" color="#ABABAB" fontWeight="400">
                    End-to-end lifecycle support from consultation to maintenance
                  </Text>
                </HStack>
              </VStack>
            </Grid>
          </Box>

          {/* Let's Build the Future Section */}
          <Box py={{ base: "4rem", md: "6rem" }} className="solutions-cta-section">
            <Container maxW="container.xl">
              <Box textAlign="center" maxW="container.lg" mx="auto">
                <Text
                  className="hushh-gradient"
                  fontWeight={"600"}
                  fontSize={{ md: "1rem", base: "0.75rem" }}
                  lineHeight={"16px"}
                  letterSpacing={"0.255rem"}
                  mb={4}
                >
                  GET STARTED
                </Text>
                <Heading 
                  as="h2" 
                  className="gradient"
                  fontSize={{ base: "2.5rem", md: "3.75rem" }}
                  lineHeight={{ base: "3rem", md: "4rem" }}
                  fontWeight="400"
                  mb={6}
                >
                  Let's Build Your Infrastructure
                </Heading>
                
                <Text 
                  textAlign="center" 
                  maxW="700px" 
                  mx="auto" 
                  fontSize="xl" 
                  color="#ABABAB" 
                  mt={6}
                  mb={10}
                >
                  Need help selecting the right server or computing solution? We're just a call or message away.
                </Text>
                
                <Button 
                  className="gradient"
                  as={Link}
                  borderRadius="full"
                  href="/contact-us"
                  color="black"
                  size="lg"
                  px={10}
                  py={7}
                  _hover={{ transform: "translateY(-2px)" }}
                  fontWeight="500"
                >
                  Contact Us for a Consultation
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default SolutionsPage;