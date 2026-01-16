'use client'
import React from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Progress,
  Badge,
  useColorModeValue,
  Flex
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, TimeIcon, SettingsIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

export default function AnalyzingLoader({ progress = 0, currentAgent = '' }) {
  // Five profile fetching agents (4 discovery + 1 profile creation)
  const agents = [
    { id: 'brand', name: 'Brand Identity Agent', description: 'Analyzing brand affinity & loyalty', status: progress > 0 ? 'completed' : 'pending' },
    { id: 'hushh', name: 'Hushh Core Agent', description: 'Retrieving secure user intent data', status: progress > 20 ? 'completed' : progress > 0 ? 'processing' : 'pending' },
    { id: 'public', name: 'Public Data Agent', description: 'Scanning public records & footprint', status: progress > 40 ? 'completed' : progress > 20 ? 'processing' : 'pending' },
    { id: 'gemini', name: 'Gemini Intelligence', description: 'Analysis of public intelligence', status: progress > 60 ? 'completed' : progress > 40 ? 'processing' : 'pending' },
    { id: 'supabase-profile-creation-agent', name: 'Supabase Profile Creation', description: 'Finalizing and securing identity', status: progress > 80 ? 'completed' : progress > 60 ? 'processing' : 'pending' },
  ]

  // Calculate current active agent index for display
  const activeAgentIndex = agents.findIndex(a => a.status === 'processing');
  const activeAgent = agents[activeAgentIndex] || (progress >= 100 ? { name: 'Identity Secured', description: 'Finalizing dashboard...' } : agents[0]);

  return (
    <Container maxW="container.md" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} w="full">

        {/* Central visualizer */}
        <Box position="relative" w="200px" h="200px" display="flex" alignItems="center" justifyContent="center">
          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <MotionBox
              key={i}
              position="absolute"
              w="100%"
              h="100%"
              borderRadius="full"
              border="2px solid"
              borderColor="blue.500"
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{
                opacity: [0.5, 0],
                scale: [0.8, 1.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Center Core */}
          <Box
            w="120px"
            h="120px"
            borderRadius="full"
            bg="black"
            border="1px solid white"
            boxShadow="0 0 20px blue"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={2}
          >
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {Math.round(progress)}%
            </Text>
          </Box>
        </Box>

        <VStack spacing={2} textAlign="center">
          <Heading size="lg" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
            {activeAgent.name}
          </Heading>
          <Text color="gray.400" fontSize="md">
            {activeAgent.description}
          </Text>
        </VStack>

        {/* Progress Bar */}
        <Box w="full" maxW="400px">
          <Progress
            value={progress}
            size="xs"
            colorScheme="blue"
            borderRadius="full"
            hasStripe
            isAnimated
            bg="gray.800"
          />
        </Box>

        {/* Agent Status List */}
        <VStack spacing={3} w="full" maxW="500px">
          <AnimatePresence>
            {agents.map((agent, index) => (
              <MotionHStack
                key={agent.id}
                w="full"
                p={4}
                bg="rgba(255, 255, 255, 0.03)"
                border="1px solid"
                borderColor={agent.status === 'processing' ? 'blue.500' : 'rgba(255,255,255,0.1)'}
                borderRadius="xl"
                justify="space-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <HStack spacing={4}>
                  <Box
                    p={2}
                    borderRadius="lg"
                    bg={agent.status === 'completed' ? 'green.500' : agent.status === 'processing' ? 'blue.500' : 'gray.700'}
                    color="white"
                  >
                    {agent.status === 'completed' ? <CheckCircleIcon /> :
                      agent.status === 'processing' ? <SettingsIcon className="spin" /> : <TimeIcon />}
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="md" color={agent.status === 'pending' ? 'gray.500' : 'white'}>
                      {agent.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {agent.status === 'completed' ? 'Analysis Complete' :
                        agent.status === 'processing' ? 'Processing Data...' : 'Waiting in Queue'}
                    </Text>
                  </VStack>
                </HStack>

                {agent.status === 'processing' && (
                  <Badge colorScheme="blue" variant="solid" borderRadius="full" px={2}>ACTIVE</Badge>
                )}
              </MotionHStack>
            ))}
          </AnimatePresence>
        </VStack>
      </VStack>

      <style jsx global>{`
        .spin {
            animation: spin 2s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  )
}

