'use client'
import React from 'react'
import { Box, VStack, Text, Button, HStack, useColorModeValue } from '@chakra-ui/react'

const AGENTS = [
  { id: 'brand', name: 'Brand Agent', description: 'CRM user intelligence' },
  { id: 'hushh', name: 'Hushh Agent', description: 'Headless Supabase agent' },
  { id: 'public', name: 'Public Data Agent', description: 'Open data enrichment' },
  { id: 'whatsapp', name: 'WhatsApp CRM Agent', description: 'Send WhatsApp messages' },
  { id: 'email', name: 'Email Integration Agent', description: 'Send transactional emails' },
]

export default function AgentSidebar({ selected, onSelect }) {
  const activeBg = useColorModeValue('gray.900', 'gray.100')
  const activeColor = useColorModeValue('white', 'gray.900')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      w={{ base: '100%', md: 72 }}
      flexShrink={0}
      borderRightWidth={{ base: 0, md: '1px' }}
      borderColor="gray.200"
      bg="white"
      borderRadius={{ base: '16px', md: '20px' }}
      p={3}
      height={{ base: 'auto', md: '100%' }}
      position={{ base: 'relative', md: 'sticky' }}
      top={{ base: 0, md: 0 }}
      overflowY={{ base: 'visible', md: 'auto' }}
    >
      <VStack align="stretch" spacing={1} role="tablist" aria-label="Agents">
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


