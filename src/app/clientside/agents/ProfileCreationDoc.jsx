'use client'

import React from 'react'
import {
  Box,
  Heading,
  Text,
  Stack,
  ListItem,
  OrderedList,
  UnorderedList,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Code,
  Badge,
} from '@chakra-ui/react'

const profileCreationRequest = `{
  "jsonrpc": "2.0",
  "id": "task124",
  "method": "tasks/send",
  "params": {
    "sessionId": "session456",
    "message": {
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "Can you create a user profile with the details below? {\"fullName\":\"Amitabh Bachchan\",\"phone\":\"+91 8266272888\",\"email\":\"amitabh.bachchan@example.com\",\"address\":{\"street\":\"Juhu Circle\",\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"postalCode\":\"400049\",\"country\":\"India\"},\"age\":80,\"gender\":\"Male\",\"maritalStatus\":\"Married\",\"householdSize\":4,\"childrenCount\":2,\"educationLevel\":\"Master's Degree\",\"occupation\":\"Actor\",\"incomeBracket\":\"High\",\"homeOwnership\":\"Owned\",\"cityTier\":\"Tier 1\",\"transport\":\"Car\",\"dietPreference\":\"Vegetarian\",\"favoriteCuisine\":\"Indian\",\"coffeeOrTeaChoice\":\"Tea\",\"fitnessRoutine\":\"Yoga and Walking\",\"gymMembership\":\"No\",\"shoppingPreference\":\"Online and Local Markets\",\"groceryStoreType\":\"Supermarket\",\"fashionStyle\":\"Formal and Traditional\",\"techAffinity\":\"Moderate\",\"primaryDevice\":\"Smartphone\",\"favoriteSocialPlatform\":\"Twitter\",\"socialMediaUsageTime\":\"1-2 hours/day\",\"contentPreference\":\"Movies and News\",\"sportsInterest\":\"Cricket\",\"gamingPreference\":\"Casual Gaming\",\"travelFrequency\":\"2-3 times a year\",\"ecoFriendliness\":\"High\",\"sleepChronotype\":\"Morning Person\",\"needs\":[\"Health\",\"Recognition\",\"Quality Time\"],\"wants\":[\"Luxury Travel\",\"New Gadgets\"],\"desires\":[\"Creative Expression\",\"Social Impact\"],\"intents\":{\"24h\":{\"category\":\"Health\",\"budget\":\"Low\",\"timeWindow\":\"Today\",\"confidence\":\"High\"},\"48h\":{\"category\":\"Entertainment\",\"budget\":\"Medium\",\"timeWindow\":\"This Weekend\",\"confidence\":\"Medium\"},\"72h\":{\"category\":\"Travel\",\"budget\":\"High\",\"timeWindow\":\"Next Month\",\"confidence\":\"Low\"}}}"
        }
      ]
    }
  }
}`

const profileCreationResponse = `{
  "jsonrpc": "2.0",
  "id": "task124",
  "result": {
    "id": "d1f16150-b5b0-4dcc-a58b-9ce2b253f685",
    "sessionId": "session456",
    "status": {
      "state": "completed",
      "message": {
        "role": "agent",
        "parts": [
          {
            "type": "text",
            "text": "Account created successfully with the provided details for Amitabh Bachchan. If you need any further assistance or additional user profiles, feel free to ask."
          }
        ]
      },
      "timestamp": "2025-10-07T09:45:11Z"
    },
    "artifacts": [
      {
        "name": "Answer",
        "index": 0,
        "parts": [
          {
            "type": "text",
            "text": "Account created successfully with the provided details for Amitabh Bachchan. If you need any further assistance or additional user profiles, feel free to ask."
          }
        ]
      }
    ]
  }
}`

const mcpRequest = `{
  "method": "tools/call",
  "params": {
    "name": "insert_user",
    "arguments": {
      "full_name": "Amitabh Bachchan",
      "phone": "+91 8266272888",
      "email": "amitabh.bachchan@example.com",
      "address": {
        "street": "Juhu Circle",
        "city": "Mumbai",
        "state": "Maharashtra",
        "postalCode": "400049",
        "country": "India"
      },
      "age": 80,
      "gender": "Male",
      "maritalStatus": "Married",
      "householdSize": 4,
      "childrenCount": 2,
      "educationLevel": "Master's Degree",
      "occupation": "Actor",
      "incomeBracket": "High",
      "homeOwnership": "Owned",
      "cityTier": "Tier 1",
      "transport": "Car",
      "dietPreference": "Vegetarian",
      "favoriteCuisine": "Indian",
      "coffeeOrTeaChoice": "Tea",
      "fitnessRoutine": "Yoga and Walking",
      "gymMembership": "No",
      "shoppingPreference": "Online and Local Markets",
      "groceryStoreType": "Supermarket",
      "fashionStyle": "Formal and Traditional",
      "techAffinity": "Moderate",
      "primaryDevice": "Smartphone",
      "favoriteSocialPlatform": "Twitter",
      "socialMediaUsageTime": "1-2 hours/day",
      "contentPreference": "Movies and News",
      "sportsInterest": "Cricket",
      "gamingPreference": "Casual Gaming",
      "travelFrequency": "2-3 times a year",
      "ecoFriendliness": "High",
      "sleepChronotype": "Morning Person",
      "needs": ["Health", "Recognition", "Quality Time"],
      "wants": ["Luxury Travel", "New Gadgets"],
      "desires": ["Creative Expression", "Social Impact"],
      "intents": {
        "24h": {
          "category": "Health",
          "budget": "Low",
          "timeWindow": "Today",
          "confidence": "High"
        },
        "48h": {
          "category": "Entertainment",
          "budget": "Medium",
          "timeWindow": "This Weekend",
          "confidence": "Medium"
        },
        "72h": {
          "category": "Travel",
          "budget": "High",
          "timeWindow": "Next Month",
          "confidence": "Low"
        }
      }
    }
  }
}`

const mcpResponse = `{
  "content": [
    {
      "type": "text",
      "text": "\"Account created successfully\"",
      "priority": 1
    }
  ],
  "isError": false
}`

const sundarRequest = `{
  "jsonrpc": "2.0",
  "id": "taskSP001",
  "method": "tasks/send",
  "params": {
    "sessionId": "sessionSP001",
    "message": {
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "Please create a profile for Sundhar Pichai with email sundar.pichai@google.com, phone +1 4085551234, occupation CEO, city Mountain View, and country USA."
        }
      ]
    }
  }
}`

const sundarResponse = `{
  "jsonrpc": "2.0",
  "id": "taskSP001",
  "result": {
    "sessionId": "sessionSP001",
    "status": {
      "state": "completed",
      "message": {
        "role": "agent",
        "parts": [
          {
            "type": "text",
            "text": "Profile for Sundhar Pichai has been successfully created in Supabase with the provided details."
          }
        ]
      },
      "timestamp": "2025-10-07T09:52:33Z"
    }
  }
}`

const errorCodes = [
  { code: '400', description: 'Invalid JSON-RPC format', resolution: 'Ensure proper request schema' },
  { code: '401', description: 'Unauthorized', resolution: 'Validate API credentials in MuleSoft' },
  { code: '409', description: 'Duplicate user', resolution: 'Check if user (email/phone) already exists' },
  { code: '404', description: 'Required fields missing', resolution: 'Verify input contains mandatory parameters' },
  { code: '500', description: 'Internal Agent Error', resolution: 'Retry or contact system administrator' },
  { code: 'TIMEOUT', description: 'MCP server delay', resolution: 'Increase request timeout or retry' },
]

function CodeBlock({ value }) {
  return (
    <Box
      as="pre"
      bg="gray.900"
      color="green.100"
      borderRadius="12px"
      p={4}
      fontSize="xs"
      overflowX="auto"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
    >
      <Code whiteSpace="pre-wrap">{value}</Code>
    </Box>
  )
}

export default function ProfileCreationDoc() {
  return (
    <Box
      bg="white"
      borderRadius={{ base: '12px', md: '16px' }}
      borderWidth="1px"
      borderColor="gray.200"
      shadow="sm"
      p={{ base: 4, md: 6 }}
      maxH={{ base: '60vh', md: '65vh' }}
      overflowY="auto"
    >
      <Stack spacing={6}>
        <Box>
          <Badge colorScheme="purple" mb={2}>Documentation</Badge>
          <Heading size="md">Hushh Supabase Profile Creation Agent</Heading>
          <Text mt={3} fontSize="sm" color="gray.700">
            The Hushh Supabase Profile Creation Agent lets you onboard rich customer profiles into Supabase using natural language
            instructions. It interprets structured or conversational inputs, extracts every relevant attribute, and stores the
            record via MuleSoft and the MCP server.
          </Text>
          <Text mt={3} fontSize="sm" color="gray.700">
            <strong>LLM Model:</strong> OpenAI GPT-4.0 mini
          </Text>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Functional Workflow</Heading>
          <OrderedList spacing={2} fontSize="sm" color="gray.700">
            <ListItem>
              <strong>User Input:</strong> Capture structured or free-form profile details from the Hushh UI or an automated system.
            </ListItem>
            <ListItem>
              <strong>Agent Invocation:</strong> MuleSoft sends a JSON-RPC <Code fontSize="xs">tasks/send</Code> request to the
              Supabase Profile Creation endpoint.
            </ListItem>
            <ListItem>
              <strong>Intent Extraction:</strong> The agent parses personal, contact, demographic, behavioral, and intent data from the message.
            </ListItem>
            <ListItem>
              <strong>MCP Integration:</strong> The agent invokes the MCP server&apos;s <Code fontSize="xs">insert_user</Code> tool.
            </ListItem>
            <ListItem>
              <strong>Response Generation:</strong> A success message with timestamps and tracking IDs confirms the insert.
            </ListItem>
          </OrderedList>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>API Specification</Heading>
          <Stack spacing={3} fontSize="sm" color="gray.700">
            <Text><strong>Endpoint:</strong> <Code fontSize="xs">POST https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent</Code></Text>
            <Text><strong>Headers:</strong> <Code fontSize="xs">Content-Type: application/json</Code></Text>
            <Text><strong>Method:</strong> JSON-RPC 2.0 <Code fontSize="xs">tasks/send</Code></Text>
            <Box>
              <Text fontWeight="600" mb={2}>Sample Request</Text>
              <CodeBlock value={profileCreationRequest} />
            </Box>
            <Box>
              <Text fontWeight="600" mb={2}>Sample Response</Text>
              <CodeBlock value={profileCreationResponse} />
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Heading size="sm" mb={2}>Backend MCP Server Integration</Heading>
          <Text fontSize="sm" color="gray.700" mb={3}>
            A validated profile request triggers the MCP server to insert a user record through the <Code fontSize="xs">insert_user</Code> tool at
            <Code fontSize="xs"> https://hushh-supabase-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/mcp</Code>.
          </Text>
          <Stack spacing={3}>
            <Box>
              <Text fontWeight="600" fontSize="sm">Sample MCP Request</Text>
              <CodeBlock value={mcpRequest} />
            </Box>
            <Box>
              <Text fontWeight="600" fontSize="sm">MCP Response</Text>
              <CodeBlock value={mcpResponse} />
            </Box>
          </Stack>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Integration Flow</Heading>
          <OrderedList spacing={2} fontSize="sm" color="gray.700">
            <ListItem>Trigger profile creation from the Hushh interface or a backend workflow.</ListItem>
            <ListItem>MuleSoft builds the JSON-RPC payload and posts to the Profile Creation endpoint.</ListItem>
            <ListItem>The agent extracts and maps fields to the Supabase schema.</ListItem>
            <ListItem>The MCP server inserts the new profile into Supabase.</ListItem>
            <ListItem>A confirmation response returns to the originating interface.</ListItem>
          </OrderedList>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Error Handling</Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Code</Th>
                <Th>Description</Th>
                <Th>Resolution</Th>
              </Tr>
            </Thead>
            <Tbody>
              {errorCodes.map(row => (
                <Tr key={row.code}>
                  <Td fontWeight="600">{row.code}</Td>
                  <Td>{row.description}</Td>
                  <Td>{row.resolution}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Example Use Case — Sundhar Pichai Onboarding</Heading>
          <Stack spacing={3} fontSize="sm" color="gray.700">
            <Text>
              Combine insights from the Public Data Agent with the Profile Creation Agent to instantly onboard users discovered via
              enrichment workflows.
            </Text>
            <Box>
              <Text fontWeight="600">Sample Request</Text>
              <CodeBlock value={sundarRequest} />
            </Box>
            <Box>
              <Text fontWeight="600">Agent Response</Text>
              <CodeBlock value={sundarResponse} />
            </Box>
          </Stack>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Security &amp; Privacy</Heading>
          <UnorderedList spacing={2} fontSize="sm" color="gray.700">
            <ListItem>End-to-end HTTPS encryption for every call.</ListItem>
            <ListItem>Only authorized MuleSoft flows can create or mutate user profiles.</ListItem>
            <ListItem>Supabase credentials stay isolated within the MCP environment.</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Versioning</Heading>
          <Text fontSize="sm" color="gray.700">
            <strong>1.0.0</strong> — Initial release of the Hushh Supabase Profile Creation Agent documentation.
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}
