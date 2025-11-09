'use client'

import React from 'react'
import {
  Box,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  Button,
  Badge,
  Divider,
} from '@chakra-ui/react'

export default function PromptSuggestionPanel({ title, description, highlights = [], prompts = [], onUsePrompt }) {
  return (
    <Box
      bg="white"
      borderRadius={{ base: '12px', md: '16px' }}
      borderWidth="1px"
      borderColor="gray.200"
      shadow="sm"
      p={{ base: 4, md: 5 }}
    >
      <Stack spacing={{ base: 3, md: 4 }}>
        <VStack align="flex-start" spacing={{ base: 2, md: 3 }}>
          <Heading
            as="h2"
            size={{ base: 'sm', md: 'md' }}
            color="gray.900"
            fontWeight="700"
            letterSpacing="tight"
          >
            {title}
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'sm' }}>
            {description}
          </Text>
          {highlights.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {highlights.map((item) => (
                <Badge
                  key={item}
                  colorScheme="gray"
                  bg="gray.100"
                  color="gray.700"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontWeight="600"
                  fontSize="xs"
                >
                  {item}
                </Badge>
              ))}
            </HStack>
          )}
        </VStack>

        {prompts.length > 0 && (
          <Box>
            <Text fontWeight="700" fontSize="xs" textTransform="uppercase" letterSpacing="wide" color="gray.500" mb={2}>
              Suggested prompts
            </Text>
            <Stack spacing={{ base: 2, md: 3 }}>
              {prompts.map(({ label, text }) => (
                <Box
                  key={label}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="12px"
                  p={{ base: 3, md: 4 }}
                  bg="gray.50"
                >
                  <Stack spacing={{ base: 2, md: 2 }}>
                    <Text fontWeight="600" fontSize={{ base: 'sm', md: 'sm' }} color="gray.800">
                      {label}
                    </Text>
                    <Text fontSize={{ base: 'sm', md: 'sm' }} color="gray.600">
                      {text}
                    </Text>
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        borderRadius="10px"
                        onClick={() => onUsePrompt?.(text)}
                        bg="gray.900"
                        color="white"
                        _hover={{ bg: 'black' }}
                      >
                        Use prompt
                      </Button>
                    </HStack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        <Divider borderColor="gray.200" />

        <Text fontSize={{ base: 'xs', md: 'xs' }} color="gray.500">
          Tip: You can edit the prompt in the composer below before sending it to tailor the profile details or update fields.
        </Text>
      </Stack>
    </Box>
  )
}
