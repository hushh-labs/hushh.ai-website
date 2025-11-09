'use client'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Box, VStack, HStack, Text, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import HushhLogoS from '../../_components/svg/hushhLogoS.svg'
import MarkdownIt from 'markdown-it'

export default function ChatThread({ messages, loading, error, userInitials }) {
  const listRef = useRef(null)

  const markdown = useMemo(() => {
    const md = new MarkdownIt({
      html: false,
      linkify: true,
      breaks: true,
    })

    return md.disable('image')
  }, [])

  const formatContent = useCallback((value) => {
    if (!value) return ''
    return markdown.render(value)
  }, [markdown])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  return (
    <Box 
      ref={listRef} 
      bg="white" 
      borderRadius={{ base: '12px', md: '16px' }}
      borderWidth="1px" 
      borderColor="gray.200" 
      p={{ base: 3, md: 4 }} 
      h="100%"
      overflowY="auto" 
      aria-live="polite"
      shadow="sm"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
    >
      <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
        {messages.length === 0 && !loading && (
          <Box textAlign="center" py={{ base: 6, md: 8 }}>
            <Text color="gray.500" fontSize={{ base: 'xs', md: 'sm' }}>
              Start by asking a question below.
            </Text>
          </Box>
        )}
        {messages.map(m => (
          <HStack key={m.id} align="flex-start" spacing={{ base: 2, md: 3 }} w="100%">
            {m.role === 'user' ? (
              <Box 
                w={{ base: 7, md: 8 }}
                h={{ base: 7, md: 8 }}
                minW={{ base: 7, md: 8 }}
                borderRadius="full" 
                bg="gray.800" 
                color="white" 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                fontWeight="600" 
                fontSize="xs"
              >
                {userInitials}
              </Box>
            ) : (
              <Box 
                w={{ base: 7, md: 8 }}
                h={{ base: 7, md: 8 }}
                minW={{ base: 7, md: 8 }}
                borderRadius="full" 
                overflow="hidden" 
                bg="gray.900"
              >
                <Image src={HushhLogoS} alt="Hushh Agent" width={32} height={32} />
              </Box>
            )}
            <Box
              flex="1"
              bg={m.role === 'user' ? 'white' : 'gray.50'}
              borderWidth="1px"
              borderColor={m.role === 'user' ? 'gray.200' : 'gray.300'}
              borderRadius={{ base: '12px', md: '14px' }}
              px={{ base: 3, md: 4 }}
              py={{ base: 2, md: 3 }}
              maxW="100%"
              overflow="hidden"
            >
              <Text
                fontSize="xs"
                color="gray.500"
                mb={1}
                fontWeight="600" 
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {m.role === 'user' ? 'You' : (m.agent === 'hushh' ? 'Hushh Agent' : m.agent === 'brand' ? 'Brand Agent' : m.agent === 'public' ? 'Public Data Agent' : m.agent === 'gemini' ? 'Gemini Agent' : m.agent === 'whatsapp' ? 'WhatsApp Agent' : m.agent === 'email' ? 'Email Agent' : 'Agent')}
              </Text>
              <Box
                lineHeight={{ base: '1.6', md: '1.7' }}
                fontSize={{ base: 'sm', md: 'sm' }}
                color="gray.900"
                wordBreak="break-word"
                sx={{
                  a: {
                    color: 'blue.500',
                    textDecoration: 'underline',
                    wordBreak: 'break-word',
                  },
                  'a:hover': {
                    color: 'blue.600',
                  },
                  ul: {
                    paddingInlineStart: '1.25rem',
                    marginBottom: '0.75rem',
                  },
                  ol: {
                    paddingInlineStart: '1.25rem',
                    marginBottom: '0.75rem',
                  },
                  'p:not(:last-of-type)': {
                    marginBottom: '0.75rem',
                  },
                  li: {
                    marginBottom: '0.35rem',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: formatContent(m.content || '') }}
              />
            </Box>
          </HStack>
        ))}
        {loading && (
          <HStack align="center" spacing={{ base: 2, md: 3 }}>
            <Box 
              w={{ base: 7, md: 8 }}
              h={{ base: 7, md: 8 }}
              minW={{ base: 7, md: 8 }}
              borderRadius="full" 
              overflow="hidden" 
              bg="gray.900"
            >
              <Image src={HushhLogoS} alt="Hushh Agent" width={32} height={32} />
            </Box>
            <HStack 
              bg="gray.50" 
              borderWidth="1px" 
              borderColor="gray.200" 
              borderRadius="12px" 
              px={{ base: 3, md: 4 }} 
              py={{ base: 2, md: 3 }}
            >
              <Spinner size="sm" color="gray.900" />
              <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }}>
                Waiting for agent…
              </Text>
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


