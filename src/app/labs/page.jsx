'use client';

import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Image,
  Flex,
  Divider
} from '@chakra-ui/react';
import { 
  FiArrowRight, 
  FiUsers, 
  FiBriefcase,
  FiTarget,
  FiZap,
  FiGlobe,
  FiBook
} from 'react-icons/fi';
import Link from 'next/link';
import ContentWrapper from 'src/app/_components/layout/ContentWrapper';
import ContactForm from 'src/app/_components/features/contactForm';

const HushhLabsHome = () => {
  const labValues = [
    {
      icon: FiTarget,
      title: "Mission-Driven Research",
      description: "Building superintelligent AI systems that drive monumental breakthroughs for humanity"
    },
    {
      icon: FiUsers,
      title: "Elite Collaboration",
      description: "Partnership with top universities: Stanford, Purdue, and IIT for world-class research"
    },
    {
      icon: FiZap,
      title: "Breakthrough Innovation",
      description: "Pushing the boundaries of AI with next-generation models and algorithms"
    },
    {
      icon: FiGlobe,
      title: "Global Impact",
      description: "Creating AI technologies that solve real-world problems and benefit society"
    }
  ];

  const researchAreas = [
    {
      title: "Advanced AI Models",
      description: "Large-scale neural networks, multimodal systems, and foundation models",
      roles: "Principal AI Research Scientist"
    },
    {
      title: "AI Safety & Ethics",
      description: "AI alignment, safety research, and ethical AI development",
      roles: "AI Alignment Research Scientist"
    },
    {
      title: "Applied AI Systems",
      description: "Production-ready AI infrastructure and machine learning operations",
      roles: "ML Engineer, MLOps & Data Engineer"
    },
    {
      title: "AI Products",
      description: "User-facing applications powered by our superintelligent AI",
      roles: "Product Manager, Full-Stack Engineer"
    }
  ];

  return (
    <ContentWrapper>   
      <Box minH="100vh" bg="white" overflowX="hidden">
        {/* Hero Section */}
        <Container maxW="7xl" pt={{ base: 15, md: 26 }} pb={{ base: 16, md: 24 }} px={{ base: 1, sm: 2, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }} textAlign="center" mb={{ base: 16, md: 24 }}>
            <Box w="full" maxW={{ base: "100%", md: "none" }} px={{ base: 1, md: 0 }}>
              <Text 
                fontSize={{ base: "10px", xs: "12px", sm: "14px", md: "32px", lg: "32px" }}
                fontWeight="bold"
                bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 25%, hsla(354, 88%, 61%, 1) 50%, hsla(13, 91%, 55%, 1) 100%)"
                bgClip="text"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
                mb={{ base: 4, md: 6 }}
                textAlign="center"
                maxW="100%"
                wordBreak="break-word"
                whiteSpace="normal"
                lineHeight={{ base: "1.2", md: "1" }}
                overflowWrap="break-word"
                hyphens="auto"
              >
                Super Supreme Intelligence Lab
              </Text>
            </Box>
            
            <VStack spacing={6}>
              <Heading 
                fontSize={{ base: "2xl", xs: "3xl", sm: "4xl", md: "6xl", lg: "7xl" }} 
                fontWeight="700"
                color="gray.900"
                lineHeight="0.9"
                letterSpacing="-0.02em"
                fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                px={{ base: 1, md: 0 }}
                maxW="100%"
                wordBreak="break-word"
              >
                Hushh Labs
              </Heading>
              
              <Text 
                fontSize={{ base: "md", xs: "lg", sm: "xl", md: "2xl" }} 
                color="gray.600"
                maxW="4xl"
                lineHeight="1.4"
                fontWeight="400"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                px={{ base: 1, md: 0 }}
              >
                Building superintelligent AI systems that advance humanity's understanding of the universe 
                and unlock unprecedented possibilities for knowledge and discovery.
              </Text>
            </VStack>

            <VStack spacing={6} pt={8} w="full">
              <VStack spacing={{ base: 3, md: 6 }} w="full">
                <HStack spacing={3} flexWrap="wrap" justify="center">
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.700" fontWeight="500" fontSize={{ base: "sm", md: "lg" }}>Stanford Partnership</Text>
                </HStack>
                <HStack spacing={3} flexWrap="wrap" justify="center">
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.700" fontWeight="500" fontSize={{ base: "sm", md: "lg" }}>Purdue Collaboration</Text>
                </HStack>
                <HStack spacing={3} flexWrap="wrap" justify="center">
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.700" fontWeight="500" fontSize={{ base: "sm", md: "lg" }}>IIT Research</Text>
                </HStack>
              </VStack>
              
              <Flex gap={4} pt={6} flexWrap="wrap" justify="center" w="full" px={{ base: 2, md: 0 }}>
                <Link href="/labs/career">
                  <Button
                    size="lg"
                    bg="#0071E3"
                    color="white"
                    px={{ base: 4, sm: 6, md: 10 }}
                    py={{ base: 3, sm: 4, md: 6 }}
                    borderRadius="60px"
                    fontSize={{ base: "14px", sm: "16px", md: "20px", lg: "32px" }}
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="-0.02em"
                    minW={{ base: "180px", sm: "200px", md: "300px" }}
                    h={{ base: "40px", sm: "45px", md: "70px" }}
                    maxW="95%"
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
                    View Open Positions
                  </Button>
                </Link>
              </Flex>
            </VStack>
          </VStack>

          {/* Mission Statement */}
          <Box 
            mb={24} 
            bg="gray.50" 
            borderRadius="24px"
            p={{ base: 4, sm: 6, md: 12 }}
            border="1px solid"
            borderColor="gray.200"
            mx={{ base: 1, sm: 2, md: 0 }}
            maxW="100%"
            overflow="hidden"
          >
            <VStack spacing={6} textAlign="center">
              <Heading 
                size={{ base: "lg", md: "xl" }}
                color="gray.900"
                fontWeight="600"
                fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Our Mission
              </Heading>
              <Text 
                fontSize={{ base: "md", sm: "lg", md: "xl" }} 
                color="gray.600" 
                lineHeight="1.6" 
                maxW="4xl"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Hushh's Super Supreme Intelligence Lab is on a mission to develop superintelligent AI 
                systems that drive monumental breakthroughs for humanity. We are a highly driven, elite team of 
                researchers and engineers committed to pushing the boundaries of AI in a fast-paced, collaborative 
                environment where innovation and excellence are rewarded with trust and responsibility.
              </Text>
            </VStack>
          </Box>

          {/* Lab Values */}
          <VStack spacing={12} mb={24} px={{ base: 1, sm: 2, md: 0 }}>
            <VStack spacing={4} textAlign="center">
              <Heading 
                size={{ base: "lg", md: "xl" }}
                color="gray.900"
                fontWeight="600"
                fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                What Drives Us
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Our core values that shape everything we do
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 4, md: 6 }} w="full">
              {labValues.map((value, index) => (
                <Box 
                  key={index} 
                  bg="white" 
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    borderColor: "gray.300",
                    shadow: "sm"
                  }}
                  transition="all 0.2s ease"
                  borderRadius="16px"
                  p={{ base: 4, md: 6 }}
                  textAlign="center"
                >
                  <VStack spacing={4}>
                    <Box
                      bg="gray.100"
                      p={3}
                      borderRadius="12px"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={value.icon} boxSize={6} color="gray.700" />
                    </Box>
                    <Heading 
                      size={{ base: "sm", md: "md" }}
                      color="gray.900"
                      fontWeight="600"
                      fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {value.title}
                    </Heading>
                    <Text 
                      color="gray.600" 
                      lineHeight="1.5"
                      fontSize={{ base: "xs", md: "sm" }}
                      fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {value.description}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Research Areas */}
          <VStack spacing={12} mb={24} px={{ base: 1, sm: 2, md: 0 }}>
            <VStack spacing={4} textAlign="center">
              <Heading 
                size={{ base: "lg", md: "xl" }}
                color="gray.900"
                fontWeight="600"
                fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Research Areas
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Pioneering the future of artificial intelligence
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} w="full">
              {researchAreas.map((area, index) => (
                <Box 
                  key={index} 
                  bg="white" 
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="16px"
                  p={{ base: 3, sm: 4, md: 6 }}
                  _hover={{
                    borderColor: "gray.300",
                    shadow: "sm"
                  }}
                  transition="all 0.2s ease"
                  maxW="100%"
                  overflow="hidden"
                >
                  <VStack align="start" spacing={4} w="full">
                    <Heading 
                      size={{ base: "sm", md: "md" }}
                      color="gray.900"
                      fontWeight="600"
                      fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                      wordBreak="break-word"
                    >
                      {area.title}
                    </Heading>
                    <Text 
                      color="gray.600" 
                      lineHeight="1.6"
                      fontSize={{ base: "sm", md: "md" }}
                      fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                      wordBreak="break-word"
                    >
                      {area.description}
                    </Text>
                    <Box w="full" maxW="100%">
                      <Text
                        bg="blue.50" 
                        color="blue.700" 
                        borderRadius="full" 
                        px={{ base: 2, md: 3 }}
                        py={1}
                        fontSize={{ base: "9px", xs: "10px", sm: "11px", md: "xs" }}
                        fontWeight="500"
                        // display="inline-block"
                        maxW="100%"
                        // wordBreak="break-word"
                        // whiteSpace="normal"
                        lineHeight="1.3"
                        // overflowWrap="break-word"
                        // hyphens="auto"
                      >
                        {area.roles}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Career Opportunities */}
          <Box 
            bg="gray.50" 
            border="1px solid"
            borderColor="gray.200"
            borderRadius="24px"
            p={{ base: 4, sm: 6, md: 12 }}
            mx={{ base: 1, sm: 2, md: 0 }}
            maxW="100%"
            overflow="hidden"
          >
            <VStack spacing={10} textAlign="center">
              <VStack spacing={4}>
                <Heading 
                  size={{ base: "lg", md: "xl" }}
                  color="gray.900"
                  fontWeight="600"
                  fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                >
                  Join Our Elite Team
                </Heading>
                
                <Text 
                  fontSize={{ base: "md", sm: "lg", md: "xl" }} 
                  color="gray.600" 
                  lineHeight="1.6" 
                  maxW="4xl"
                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                >
                  We're looking for exceptional individuals who want to shape the future of AI. 
                  Our team operates with a flat structure where everyone is hands-on, and we reward 
                  initiative and excellence with trust and responsibility.
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 6, md: 8 }} pt={6} w="full">
                <VStack spacing={4}>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Icon as={FiBriefcase} boxSize={8} color="gray.700" />
                  </Box>
                  <Heading 
                    size={{ base: "sm", md: "md" }}
                    color="gray.900"
                    fontWeight="600"
                    fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    10 Open Positions
                  </Heading>
                  <Text 
                    color="gray.600" 
                    textAlign="center"
                    fontSize={{ base: "sm", md: "md" }}
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Research Scientists, Engineers, Product Managers, and more
                  </Text>
                </VStack>
                
                <VStack spacing={4}>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Icon as={FiUsers} boxSize={8} color="gray.700" />
                  </Box>
                  <Heading 
                    size={{ base: "sm", md: "md" }}
                    color="gray.900"
                    fontWeight="600"
                    fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    World-Class Benefits
                  </Heading>
                  <Text 
                    color="gray.600" 
                    textAlign="center"
                    fontSize={{ base: "sm", md: "md" }}
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Competitive salary, equity, comprehensive health coverage, and more
                  </Text>
                </VStack>
                
                <VStack spacing={4}>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Icon as={FiZap} boxSize={8} color="gray.700" />
                  </Box>
                  <Heading 
                    size={{ base: "sm", md: "md" }}
                    color="gray.900"
                    fontWeight="600"
                    fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Cutting-Edge Resources
                  </Heading>
                  <Text 
                    color="gray.600" 
                    textAlign="center"
                    fontSize={{ base: "sm", md: "md" }}
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    State-of-the-art compute clusters, research budget, and collaboration tools
                  </Text>
                </VStack>
              </SimpleGrid>

              <Divider borderColor="gray.300" />

              <VStack spacing={6} w="full">
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.700" 
                  fontWeight="500"
                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                >
                  Ready to advance the frontiers of artificial intelligence?
                </Text>
                
                <Box px={{ base: 2, md: 0 }} w="full" display="flex" justifyContent="center">
                  <Link href="/labs/career">
                    <Button
                      bg="#0071E3"
                      color="white"
                      px={{ base: 4, sm: 6, md: 10 }}
                      py={{ base: 3, sm: 4, md: 6 }}
                      borderRadius="60px"
                      fontSize={{ base: "14px", sm: "16px", md: "20px", lg: "32px" }}
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-0.02em"
                      minW={{ base: "180px", sm: "200px", md: "300px" }}
                      h={{ base: "40px", sm: "45px", md: "70px" }}
                      maxW="95%"
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
                      Explore Career Opportunities
                    </Button>
                  </Link>
                </Box>
                
                <Text 
                  fontSize={{ base: "xs", md: "sm" }}
                  color="gray.500" 
                  fontStyle="italic" 
                  maxW="2xl"
                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  px={{ base: 2, md: 0 }}
                >
                  Hushh's Super Supreme Intelligence Lab is an equal opportunity employer. 
                  All employment is decided on the basis of qualifications, merit, and business need.
                </Text>
              </VStack>
            </VStack>
          </Box>
        </Container>
      </Box>
      <ContactForm/>
    </ContentWrapper>
  );
};

export default HushhLabsHome; 