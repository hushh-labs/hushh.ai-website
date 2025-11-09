'use client'
import React from 'react'
import { Box, VStack, Text, HStack, Icon, Tag } from '@chakra-ui/react'
import { AGENT_OPTIONS } from './agentOptions'

export default function AgentSidebar({ selected, onSelect }) {
  return (
    <Box
      w={{ base: '100%', md: '300px' }}
      flexShrink={0}
      bg="transparent"
    >
      <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase" mb={3} px={2}>
        Select Agent
      </Text>
      <VStack align="stretch" spacing={3} role="tablist" aria-label="Agents">
        {AGENT_OPTIONS.map((a) => {
          const isActive = selected === a.id
          return (
            <Box
              key={a.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => onSelect?.(a.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelect?.(a.id)
                }
              }}
              cursor="pointer"
              _focus={{ boxShadow: 'outline' }}
              transition="all 0.2s ease"
            >
              <Box
                borderRadius="18px"
                p={{ base: 4, md: 4 }}
                bg={isActive ? 'white' : 'rgba(255,255,255,0.7)'}
                borderWidth={isActive ? '2px' : '1px'}
                borderColor={isActive ? a.accent.softBg || 'gray.200' : 'gray.100'}
                boxShadow={isActive ? 'xl' : 'sm'}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
              >
                <HStack align="flex-start" spacing={4}>
                  <Box
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg={a.accent?.softBg || 'gray.100'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color={a.accent?.softText || 'gray.700'}
                  >
                    {a.icon ? <Icon as={a.icon} /> : null}
                  </Box>
                  <VStack align="stretch" spacing={1}>
                    <HStack spacing={2} align="center" justify="space-between">
                      <Text fontWeight="700" fontSize="sm" color="gray.800">
                        {a.name}
                      </Text>
                      {isActive && (
                        <Tag size="sm" bg={a.accent?.tagBg || 'gray.100'} color={a.accent?.tagColor || 'gray.700'} borderRadius="full">
                          Active
                        </Tag>
                      )}
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      {a.description}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {a.tagline}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          )
        })}
      </VStack>
    </Box>
  )
}


