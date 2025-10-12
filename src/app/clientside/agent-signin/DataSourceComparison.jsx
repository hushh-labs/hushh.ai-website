'use client'
import React from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

const DataSourceCard = ({ agentName, agentType, result }) => {
  const isFailed = !result?.success
  const responseTime = result?.responseTime || 'N/A'
  const dataFields = result?.success && result?.data ? Object.keys(result.data).length : 0
  const endpoint = agentType

  return (
    <Box
      bg="rgba(255, 255, 255, 0.03)"
      borderWidth="2px"
      borderColor={isFailed ? 'red.500' : 'green.500'}
      borderRadius="16px"
      p={6}
      position="relative"
    >
      <HStack justify="space-between" mb={4}>
        <Heading fontSize="xl" fontWeight="700" color="white">
          {agentName}
        </Heading>
        <Badge
          colorScheme={isFailed ? 'red' : 'green'}
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="6px"
          textTransform="uppercase"
        >
          {isFailed ? 'FAILED' : 'SUCCESS'}
        </Badge>
      </HStack>

      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.400" textTransform="uppercase">
            Response Time:
          </Text>
          <Text fontSize="xl" fontWeight="700" color="white">
            {responseTime}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.400" textTransform="uppercase">
            Data Fields:
          </Text>
          <Text fontSize="xl" fontWeight="700" color="white">
            {dataFields}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.400" textTransform="uppercase">
            Endpoint:
          </Text>
          <Text fontSize="md" fontWeight="600" color="white" isTruncated maxW="250px">
            {endpoint}
          </Text>
        </HStack>

        {isFailed && (
          <HStack 
            mt={3} 
            p={3} 
            bg="rgba(255, 0, 0, 0.1)" 
            borderRadius="8px"
            spacing={2}
          >
            <Icon as={WarningIcon} color="orange.400" />
            <Text fontSize="sm" color="orange.400" fontWeight="500">
              {result?.error || 'Failed to fetch'}
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

export default function DataSourceComparison({ agentResults }) {
  const agentInfo = {
    brand: { name: 'Brand Agent', type: 'CRM Agent' },
    hushh: { name: 'Hushh Agent', type: 'Supabase Proxy' },
    public: { name: 'Public Data Agent', type: 'Public Data Agent' },
    whatsapp: { name: 'WhatsApp Agent', type: 'WhatsApp CRM' },
    email: { name: 'Email Agent', type: 'Email Integration' },
  }

  return (
    <Box bg="black" color="white" py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <Heading 
            fontSize={{ base: 'lg', md: 'xl' }} 
            fontWeight="700"
            pb={3}
            borderBottomWidth="1px"
            borderBottomColor="gray.800"
          >
            DATA SOURCE COMPARISON
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {Object.entries(agentResults).map(([agentId, result]) => {
              const info = agentInfo[agentId]
              if (!info) return null
              
              return (
                <DataSourceCard
                  key={agentId}
                  agentName={info.name}
                  agentType={info.type}
                  result={result}
                />
              )
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
