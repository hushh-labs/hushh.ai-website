'use client'
import React, { useEffect, useRef } from 'react'
import { Box, VStack, HStack, Text, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import HushhLogoS from '../../_components/svg/hushhLogoS.svg'

export default function ChatThread({ messages, loading, error, userInitials }) {
  const listRef = useRef(null)

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  return (
    <Box ref={listRef} bg="white" borderRadius="20px" borderWidth="1px" borderColor="gray.200" p={{ base: 3, md: 4 }} flex="1" overflowY="auto" aria-live="polite">
      <VStack align="stretch" spacing={3}>
        {messages.length === 0 && !loading && (
          <Text color="gray.500">Start by asking a question below.</Text>
        )}
        {messages.map(m => (
          <HStack key={m.id} align="flex-start" spacing={3}>
            {m.role === 'user' ? (
              <Box w={8} h={8} borderRadius="full" bg="gray.800" color="white" display="flex" alignItems="center" justifyContent="center" fontWeight="600" fontSize="xs">
                {userInitials}
              </Box>
            ) : (
              <Box w={8} h={8} borderRadius="full" overflow="hidden" bg="gray.900">
                <Image src={HushhLogoS} alt="Hushh Agent" width={32} height={32} />
              </Box>
            )}
            <Box flex="1" bg={m.role === 'user' ? 'white' : 'gray.50'} borderWidth="1px" borderColor="gray.200" borderRadius="14px" px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
              <Text fontSize="sm" color="gray.500" mb={1}>{m.role === 'user' ? 'You' : (m.agent === 'hushh' ? 'Hushh Agent' : m.agent === 'brand' ? 'Brand Agent' : m.agent === 'public' ? 'Public Data Agent' : m.agent === 'whatsapp' ? 'WhatsApp Agent' : m.agent === 'email' ? 'Email Agent' : 'Agent')}</Text>
              <Text whiteSpace="pre-wrap" lineHeight="1.7">{m.content}</Text>
            </Box>
          </HStack>
        ))}
        {loading && (
          <HStack align="center" spacing={3}>
            <Box w={8} h={8} borderRadius="full" overflow="hidden" bg={'gray.900'}>
              <Image src={HushhLogoS} alt="Hushh Agent" width={32} height={32} />
            </Box>
            <HStack bg="gray.50" borderWidth="1px" borderColor="gray.200" borderRadius="12px" px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
              <Spinner size="sm" />
              <Text color="gray.600">Waiting for agent…</Text>
            </HStack>
          </HStack>
        )}
        {error && !loading && (
          <Text color="red.600">{error}</Text>
        )}
      </VStack>
    </Box>
  )
}


