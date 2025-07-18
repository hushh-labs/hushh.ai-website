import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  Link,
  HStack,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Icon,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiCalendar, HiClock, HiLocationMarker, HiGift, HiCode, HiUsers, HiCheck } from 'react-icons/hi';
import FooterComponent from '../_components/features/FooterComponent';

export const metadata = {
  title: "Hushh Hackathon | Modular Consent Protocol for Agent to Agent Scenarios",
  description: "Join the Hushh hackathon focused on our open source Modular Consent Protocol for Agent to Agent Personal Data Agent scenarios. Build the future of privacy-first AI.",
  keywords: "Hushh hackathon, open source protocol, consent protocol, agent to agent, personal data agent, privacy AI, blockchain, web3, hackathon 2024",
  canonical: "https://hushh.ai/hushh-hackathon",
  alternates: {
    canonical: "https://hushh.ai/hushh-hackathon",
  },
  openGraph: {
    title: "Hushh Hackathon | Modular Consent Protocol for Agent to Agent Scenarios",
    description: "Join the Hushh hackathon focused on our open source Modular Consent Protocol for Agent to Agent Personal Data Agent scenarios. Build the future of privacy-first AI.",
    url: "https://hushh.ai/hushh-hackathon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Hackathon | Modular Consent Protocol",
    description: "Join the Hushh hackathon focused on our open source Modular Consent Protocol for Agent to Agent Personal Data Agent scenarios.",
  }
};

const HushhHackathonPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 100%)"
        pt={{ base: 24, md: 32 }}
        pb={{ base: 16, md: 20 }}
      >
        <Container maxW="container.xl">
          <VStack spacing={{ base: 8, md: 12 }} align="center" textAlign="center">
            {/* Badge */}
            <Badge
              colorScheme="blue"
              fontSize="lg"
              px={4}
              py={2}
              borderRadius="full"
              bg="linear-gradient(90deg, #007BFF 0%, #E91E63 100%)"
              color="white"
            >
              🚀 Open Source Hackathon
            </Badge>

            {/* Main Heading */}
            <VStack spacing={4}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                color="#1A1A1A"
                fontFamily="Figtree"
                lineHeight={{ base: 1.2, md: 1.1 }}
              >
                Hushh Modular Consent Protocol
                <br />
                <Text as="span" color="blue.600">
                  Hackathon 2024
                </Text>
              </Heading>
              
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="#6B7280"
                maxW="3xl"
                fontFamily="Figtree"
              >
                Build the future of Agent-to-Agent Personal Data scenarios with our 
                open source Modular Consent Protocol. Create privacy-first solutions 
                that put users in control of their data.
              </Text>
            </VStack>

            {/* CTA Buttons */}
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                size="lg"
                bg="linear-gradient(90deg, #007BFF 0%, #E91E63 100%)"
                color="white"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,123,255,0.3)'
                }}
                borderRadius="md"
                px={8}
              >
                Register Now
              </Button>
              
              <Button
                as={NextLink}
                href="https://github.com/hushh-labs"
                size="lg"
                variant="outline"
                colorScheme="blue"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}
                borderRadius="md"
                px={8}
              >
                View Protocol on GitHub
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Event Details */}
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Event Info Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <Card>
              <CardHeader>
                <HStack>
                  <Icon as={HiCalendar} boxSize={6} color="blue.500" />
                  <Heading size="md">When</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text>Coming Soon - Stay Tuned!</Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Registration opening soon
                </Text>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <HStack>
                  <Icon as={HiLocationMarker} boxSize={6} color="blue.500" />
                  <Heading size="md">Where</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text>Global Virtual Event</Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Join from anywhere in the world
                </Text>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <HStack>
                  <Icon as={HiGift} boxSize={6} color="blue.500" />
                  <Heading size="md">Prizes</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text>Exciting Rewards</Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Details to be announced
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Divider />

          {/* About the Hackathon */}
          <VStack spacing={8} align="start" w="full">
            <Heading as="h2" size="xl" color="#1A1A1A">
              About the Hackathon
            </Heading>
            
            <Text fontSize="lg" color="#4A5568" lineHeight={1.8}>
              Join us in building the next generation of privacy-first AI agents with our 
              open source Modular Consent Protocol. This hackathon focuses on creating 
              innovative solutions for Agent-to-Agent Personal Data Agent scenarios, where 
              user consent and data privacy are paramount.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="lg" color="#1A1A1A">
                  What You'll Build
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Privacy-preserving AI agent interactions
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Consent management systems
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Data sovereignty solutions
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Decentralized identity protocols
                  </ListItem>
                </List>
              </VStack>

              <VStack align="start" spacing={4}>
                <Heading as="h3" size="lg" color="#1A1A1A">
                  Why Participate
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Contribute to open source privacy tech
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Network with privacy advocates
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Win exciting prizes and recognition
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiCheck} color="green.500" />
                    Shape the future of ethical AI
                  </ListItem>
                </List>
              </VStack>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Coming Soon */}
          <VStack spacing={6} align="center" textAlign="center" w="full">
            <Heading as="h2" size="xl" color="#1A1A1A">
              More Details Coming Soon
            </Heading>
            
            <Text fontSize="lg" color="#4A5568" maxW="2xl">
              We're working on finalizing all the details for this exciting hackathon. 
              Stay tuned for registration information, detailed guidelines, mentorship 
              opportunities, and prize announcements.
            </Text>

            <Button
              size="lg"
              colorScheme="blue"
              variant="outline"
              as={NextLink}
              href="/contact-us"
            >
              Get Notified When Registration Opens
            </Button>
          </VStack>
        </VStack>
      </Container>

      {/* Footer */}
      <FooterComponent />
    </Box>
  );
};

export default HushhHackathonPage; 