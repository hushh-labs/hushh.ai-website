'use client'
import React from 'react'
import { Box, VStack, Text, Button, HStack, useColorModeValue } from '@chakra-ui/react'

const AGENTS = [
  { id: 'brand', name: 'Brand Agent', description: 'CRM user intelligence' },
  { id: 'hushh', name: 'Hushh Agent', description: 'Supabase data query agent' },
  { id: 'public', name: 'Public Data Agent', description: 'OpenAI data enrichment' },
  { id: 'gemini', name: 'Gemini Agent', description: 'Gemini AI data enrichment' },
  { id: 'whatsapp', name: 'WhatsApp CRM Agent', description: 'Send WhatsApp messages' },
  { id: 'email', name: 'Email Integration Agent', description: 'Send transactional emails' },
]

export default function AgentSidebar({ selected, onSelect }) {
  const activeBg = useColorModeValue('gray.900', 'gray.100')
  const activeColor = useColorModeValue('white', 'gray.900')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      w={{ base: '100%', md: '280px' }}
      flexShrink={0}
      bg="white"
      borderRadius="16px"
      p={4}
      height="fit-content"
      shadow="sm"
    >
      <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase" mb={3} px={2}>
        Select Agent
      </Text>
      <VStack align="stretch" spacing={2} role="tablist" aria-label="Agents">
        {AGENTS.map(a => {
          const isActive = selected === a.id
          return (
            <Button
              key={a.id}
              onClick={() => onSelect?.(a.id)}
              justifyContent="flex-start"
              variant="ghost"
              borderRadius="12px"
              px={3}
              py={3}
              bg={isActive ? activeBg : 'transparent'}
              color={isActive ? activeColor : 'inherit'}
              _hover={{ bg: isActive ? activeBg : hoverBg }}
              role="tab"
              aria-selected={isActive}
            >
              <VStack align="start" spacing={0}>
                <Text fontWeight="700" fontSize="sm">{a.name}</Text>
                <Text fontSize="xs" opacity={0.7}>{a.description}</Text>
              </VStack>
            </Button>
          )
        })}
      </VStack>
    </Box>
  )
}


