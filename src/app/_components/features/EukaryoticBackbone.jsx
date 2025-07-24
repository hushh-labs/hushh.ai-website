"use client";
import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const EukaryoticBackbone = () => {
  const router = useRouter();

  const components = [
    {
      title: "Vault",
      description: "Secure data schema, encryption utils",
      placeholder: "vault-visualization"
    },
    {
      title: "Link", 
      description: "Identity + permission contracts",
      placeholder: "link-visualization"
    },
    {
      title: "Agent Kit",
      description: "Scaffolded dev templates",
      placeholder: "agent-kit-visualization"
    },
    {
      title: "Flow",
      description: "Monetization & marketplace functions",
      placeholder: "flow-visualization",
      isBottomRow: true
    }
  ];

  const ComponentCard = ({ component }) => (
    <Card
      bg="white"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
      borderRadius="20px"
      border="1px solid rgba(0, 0, 0, 0.06)"
      h="full"
      minH={{ base: "280px", md: "320px", lg: "340px" }}
      w="full"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
      }}
      transition="all 0.3s ease"
    >
      <CardBody p={{ base: 6, md: 8 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="center" textAlign="center" h="full">
          {/* Component Title */}
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontFamily="Inter"
            fontWeight={700}
            color="#1A1A1A"
            letterSpacing="-0.01em"
          >
            {component.title}
          </Heading>

          {/* Component Description */}
          <Text
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontFamily="Inter"
            fontWeight={400}
            color="#6B7280"
            lineHeight="1.5"
            letterSpacing="-0.005em"
          >
            {component.description}
          </Text>

          {/* Visual Placeholder Area */}
          <Box
            flex="1"
            w="full"
            minH={{ base: "120px", md: "140px", lg: "160px" }}
            bg="linear-gradient(135deg, #F8F9FA 0%, #E2E8F0 100%)"
            borderRadius="16px"
            border="2px dashed #CBD5E0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            {/* Placeholder Text */}
            <Text
              fontSize="xs"
              color="#A0AEC0"
              fontWeight={500}
              textAlign="center"
              px={4}
            >
              {component.placeholder}
            </Text>
            
            {/* Visual indicator */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="32px"
              h="32px"
              bg="#E2E8F0"
              borderRadius="50%"
              opacity={0.6}
            />
          </Box>

          {/* Learn More Button */}
          {/* <Button
            bg="linear-gradient(135deg, #667EEA 0%, #764BA2 100%)"
            color="white"
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontFamily="Inter"
            fontWeight={600}
            h={{ base: "40px", md: "44px", lg: "48px" }}
            px={{ base: 6, md: 8, lg: 10 }}
            borderRadius="full"
            border="none"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
            transition="all 0.3s ease"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button> */}
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box
      minH="100vh"
      bg="#F8F9FA"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{ base: 16, md: 24 }}
    >
      <Container maxW="full" px={{ base: 4, md: 8, lg: 16 }}>
        <VStack 
          spacing={{ base: 12, md: 16, lg: 20 }} 
          align="center" 
          textAlign="center"
          w="full"
          maxW="1400px"
          mx="auto"
        >
          {/* Main Heading */}
          <VStack spacing={{ base: 4, md: 6, lg: 8 }} w="full">
            <Heading
              as="h2"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl", xl: "8xl" }}
              fontFamily="Inter"
              fontWeight={700}
              letterSpacing="-0.02em"
              lineHeight={{ base: "1.1", md: "1.05" }}
              color="#1A1A1A"
              maxW="full"
            >
              Eukaryotic Backbone
            </Heading>
            
            {/* Subtitle */}
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
              fontFamily="Inter"
              fontWeight={400}
              letterSpacing="-0.01em"
              lineHeight={{ base: "1.4", md: "1.3" }}
              color="#6B7280"
              maxW={{ base: "full", md: "4xl" }}
            >
              Structured coordination for platform-level orchestration
            </Text>
          </VStack>

          {/* Cards Layout - Exact Figma Structure */}
          <Box w="full" maxW="1200px">
            {/* Mobile: All cards in vertical stack */}
            <VStack spacing={{ base: 6, md: 8 }} display={{ base: "flex", lg: "none" }}>
              {components.map((component, index) => (
                <Box key={index} w="full" maxW="400px">
                  <ComponentCard component={component} />
                </Box>
              ))}
            </VStack>

            {/* Desktop: 2-Row Layout exactly like Figma */}
            <VStack spacing={{ lg: 10, xl: 12 }} display={{ base: "none", lg: "flex" }}>
              {/* Row 1: Vault + Link + Agent Kit (3 boxes horizontally) */}
              <Box w="full" maxW="1200px">
                <SimpleGrid 
                  columns={3} 
                  spacing={{ lg: 8, xl: 10 }}
                  w="full"
                >
                  <ComponentCard component={components[0]} />
                  <ComponentCard component={components[1]} />
                  <ComponentCard component={components[2]} />
                </SimpleGrid>
              </Box>

              {/* Row 2: Flow (1 box centered) */}
              <Box w="full" display="flex" justifyContent="center">
                <Box w="full" maxW="400px">
                  <ComponentCard component={components[3]} />
                </Box>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default EukaryoticBackbone; 