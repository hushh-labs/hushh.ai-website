'use client'
import React from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Spinner,
  Progress,
  Badge,
} from '@chakra-ui/react'

export default function AnalyzingLoader({ progress = 0, currentAgent = '' }) {
  // Four profile fetching agents (removed whatsapp and email)
  const agents = [
    { id: 'brand', name: 'Brand Agent', status: progress > 0 ? 'completed' : 'pending' },
    { id: 'hushh', name: 'Hushh Agent', status: progress > 25 ? 'completed' : progress > 0 ? 'processing' : 'pending' },
    { id: 'public', name: 'Public Data Agent', status: progress > 50 ? 'completed' : progress > 25 ? 'processing' : 'pending' },
    { id: 'gemini', name: 'Gemini Agent', status: progress > 75 ? 'completed' : progress > 50 ? 'processing' : 'pending' },
  ]

  return (
    <Container maxW="container.md" py={{ base: 8, md: 12 }}>
      <Box
        bg="rgba(255, 255, 255, 0.03)"
        borderRadius="24px"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        p={{ base: 6, md: 10 }}
        shadow="xl"
      >
        <VStack spacing={8} align="stretch">
          <VStack spacing={3} align="center" textAlign="center">
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              color="green.400"
            />
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="700"
              color="white"
            >
              Analyzing Your Profile
            </Heading>
            <Text color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
              Querying all agents to gather comprehensive data about you
            </Text>
            
            {/* Step indicator for mobile */}
            <HStack spacing={2} pt={2} display={{ base: 'flex', md: 'none' }}>
              <Box w={6} h={1} bg={progress > 0 ? "green.400" : "gray.700"} borderRadius="full" />
              <Box w={6} h={1} bg={progress > 25 ? "green.400" : "gray.700"} borderRadius="full" />
              <Box w={6} h={1} bg={progress > 50 ? "green.400" : "gray.700"} borderRadius="full" />
              <Box w={6} h={1} bg={progress > 75 ? "green.400" : "gray.700"} borderRadius="full" />
            </HStack>
          </VStack>

          <Box>
            <Progress
              value={progress}
              size="sm"
              colorScheme="green"
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.1)"
            />
            <Text fontSize="xs" color="gray.400" textAlign="center" mt={2}>
              {Math.round(progress)}% Complete
            </Text>
          </Box>

          <VStack spacing={3} align="stretch">
            {agents.map((agent) => (
              <HStack
                key={agent.id}
                justify="space-between"
                p={3}
                borderWidth="1px"
                borderColor={
                  agent.status === 'completed' ? 'green.500' :
                  agent.status === 'processing' ? 'blue.500' :
                  'rgba(255, 255, 255, 0.1)'
                }
                borderRadius="12px"
                bg={
                  agent.status === 'completed' ? 'rgba(72, 187, 120, 0.1)' :
                  agent.status === 'processing' ? 'rgba(66, 153, 225, 0.1)' :
                  'rgba(255, 255, 255, 0.03)'
                }
              >
                <HStack spacing={3}>
                  {agent.status === 'processing' && <Spinner size="sm" color="blue.400" />}
                  {agent.status === 'completed' && (
                    <Box w={4} h={4} borderRadius="full" bg="green.400" />
                  )}
                  {agent.status === 'pending' && (
                    <Box w={4} h={4} borderRadius="full" bg="gray.600" />
                  )}
                  <Text fontWeight="600" fontSize="sm" color="white">{agent.name}</Text>
                </HStack>
                <Badge
                  colorScheme={
                    agent.status === 'completed' ? 'green' :
                    agent.status === 'processing' ? 'blue' :
                    'gray'
                  }
                  borderRadius="8px"
                  px={2}
                >
                  {agent.status === 'completed' ? 'Complete' :
                   agent.status === 'processing' ? 'Processing...' :
                   'Pending'}
                </Badge>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Container>
  )
}

