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

const profileUpdateRequest = `{
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
          "text": "can you update the state to AP for the details of user with phone: +919346661428 and user id d6f5fca9-924b-492e-95f6-55e81d405174 ??"
        }
      ]
    }
  }
}`

const profileUpdateResponse = `{
  "jsonrpc": "2.0",
  "id": "task124",
  "result": {
    "id": "1b50fdaf-e643-48b4-9ca6-10f85c0f42fe",
    "sessionId": "session456",
    "status": {
      "state": "completed",
      "message": {
        "role": "agent",
        "parts": [
          {
            "type": "text",
            "text": "The account has been updated successfully. If you need any further assistance, feel free to ask!"
          }
        ]
      },
      "timestamp": "2025-10-07T08:56:29Z"
    },
    "artifacts": [
      {
        "name": "Answer",
        "index": 0,
        "parts": [
          {
            "type": "text",
            "text": "The account has been updated successfully. If you need any further assistance, feel free to ask!"
          }
        ]
      }
    ]
  }
}`

const mcpUpdateRequest = `{
  "method": "tools/call",
  "params": {
    "name": "update_user",
    "arguments": {
      "user_id": "d6f5fca9-924b-492e-95f6-55e81d405174",
      "state": "AP"
    }
  }
}`

const mcpUpdateResponse = `{
  "content": [
    {
      "type": "text",
      "text": "\"Account updated successfully\"",
      "audience": [
        "assistant"
      ],
      "priority": 1
    }
  ],
  "isError": false
}`

const sundarUpdateRequest = `{
  "jsonrpc": "2.0",
  "id": "task200",
  "method": "tasks/send",
  "params": {
    "sessionId": "sessionSP001",
    "message": {
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "Please update Sundhar Pichai’s city to Mountain View and email to sundar.pichai@google.com in the database having their +52 334i33 and UserId d72882hgdt7889."
        }
      ]
    }
  }
}`

const sundarUpdateResponse = `{
  "jsonrpc": "2.0",
  "id": "task200",
  "result": {
    "sessionId": "sessionSP001",
    "status": {
      "state": "completed",
      "message": {
        "role": "agent",
        "parts": [
          {
            "type": "text",
            "text": "Sundhar Pichai’s record has been successfully updated in Supabase with the new city and email details."
          }
        ]
      },
      "timestamp": "2025-10-07T09:15:42Z"
    }
  }
}`

export default function ProfileUpdateDoc() {
  return (
    <Box
      bg="white"
      borderRadius={{ base: '12px', md: '16px' }}
      borderWidth="1px"
      borderColor="gray.200"
      p={{ base: 3, md: 5 }}
      shadow="sm"
    >
      <Stack spacing={4}>
        <Heading size="md" color="gray.900">
          Hushh Supabase Profile Update Agent Documentation
        </Heading>
        <Text fontSize="sm" color="gray.700">
          The Profile Update Agent keeps user records in Supabase accurate by accepting natural language instructions and translating them into precise database update operations executed through MuleSoft and the MCP Server.
        </Text>

        <Divider />

        <Heading size="sm" color="gray.900">
          1. Overview
        </Heading>
        <Text fontSize="sm" color="gray.700">
          This agent parses instructions such as correcting addresses or changing preferences, identifies the target user, and issues an update call to Supabase. It maintains alignment across CRM, analytics, and personalization flows running on the Hushh platform.
        </Text>
        <UnorderedList fontSize="sm" color="gray.700" spacing={2} pl={6}>
          <ListItem>AI-powered intent understanding backed by OpenAI GPT-4.0 mini.</ListItem>
          <ListItem>Automatic Supabase update execution via MuleSoft + MCP tooling.</ListItem>
          <ListItem>Guaranteed data consistency across customer touchpoints.</ListItem>
        </UnorderedList>

        <Heading size="sm" color="gray.900">
          2. Functional Workflow
        </Heading>
        <OrderedList fontSize="sm" color="gray.700" spacing={2} pl={6}>
          <ListItem>
            <Text as="span">User Input — Operators or backend automations request a change using natural language.</Text>
          </ListItem>
          <ListItem>
            <Text as="span">Agent Invocation — MuleSoft sends the request to the Supabase Update Agent endpoint using JSON-RPC 2.0.</Text>
          </ListItem>
          <ListItem>
            <Text as="span">Intent Parsing — The agent extracts identifiers (user ID, phone) and fields to modify.</Text>
          </ListItem>
          <ListItem>
            <Text as="span">MCP Integration — The MCP Server runs the <Code>update_user</Code> tool to apply the changes in Supabase.</Text>
          </ListItem>
          <ListItem>
            <Text as="span">Response — A confirmation payload returns with timestamps and tracking metadata.</Text>
          </ListItem>
        </OrderedList>

        <Divider />

        <Heading size="sm" color="gray.900">
          3. API Specification
        </Heading>
        <Stack fontSize="sm" color="gray.700" spacing={2}>
          <Text>
            <Text as="span" fontWeight="600">Endpoint:</Text> <Code>POST https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent</Code>
          </Text>
          <Text>
            <Text as="span" fontWeight="600">Headers:</Text> <Code>Content-Type: application/json</Code>
          </Text>
        </Stack>
        <Text fontSize="sm" color="gray.700" fontWeight="600">Sample Request</Text>
        <Box bg="gray.900" color="green.100" fontFamily="mono" fontSize="xs" p={3} borderRadius="md" overflowX="auto">
          <pre>{profileUpdateRequest}</pre>
        </Box>
        <Text fontSize="sm" color="gray.700" fontWeight="600">Sample Response</Text>
        <Box bg="gray.900" color="green.100" fontFamily="mono" fontSize="xs" p={3} borderRadius="md" overflowX="auto">
          <pre>{profileUpdateResponse}</pre>
        </Box>

        <Heading size="sm" color="gray.900">
          4. Backend MCP Server Integration
        </Heading>
        <Text fontSize="sm" color="gray.700">
          Valid update requests invoke the MCP Server endpoint at <Code>https://hushh-supabase-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/mcp</Code>. The <Code>update_user</Code> tool performs field-level updates inside Supabase.
        </Text>
        <Text fontSize="sm" color="gray.700" fontWeight="600">Sample MCP Request</Text>
        <Box bg="gray.900" color="green.100" fontFamily="mono" fontSize="xs" p={3} borderRadius="md" overflowX="auto">
          <pre>{mcpUpdateRequest}</pre>
        </Box>
        <Text fontSize="sm" color="gray.700" fontWeight="600">Sample MCP Response</Text>
        <Box bg="gray.900" color="green.100" fontFamily="mono" fontSize="xs" p={3} borderRadius="md" overflowX="auto">
          <pre>{mcpUpdateResponse}</pre>
        </Box>

        <Heading size="sm" color="gray.900">
          5. Integration Flow in Hushh
        </Heading>
        <OrderedList fontSize="sm" color="gray.700" spacing={2} pl={6}>
          <ListItem>Trigger — A user or automation raises an update request.</ListItem>
          <ListItem>MuleSoft formats a JSON-RPC payload targeting the update agent.</ListItem>
          <ListItem>The agent interprets the instruction and prepares structured parameters.</ListItem>
          <ListItem>The MCP Server applies the modifications inside Supabase.</ListItem>
          <ListItem>A confirmation message is returned to the UI or calling service.</ListItem>
        </OrderedList>

        <Heading size="sm" color="gray.900">
          6. Error Handling
        </Heading>
        <Table variant="simple" size="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th>Error Code</Th>
              <Th>Description</Th>
              <Th>Resolution</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><Code>400</Code></Td>
              <Td>Invalid JSON-RPC format</Td>
              <Td>Ensure request schema and required fields are correct.</Td>
            </Tr>
            <Tr>
              <Td><Code>401</Code></Td>
              <Td>Unauthorized</Td>
              <Td>Verify MuleSoft or API credentials.</Td>
            </Tr>
            <Tr>
              <Td><Code>404</Code></Td>
              <Td>User not found</Td>
              <Td>Confirm <Code>user_id</Code> and phone exist in Supabase.</Td>
            </Tr>
            <Tr>
              <Td><Code>500</Code></Td>
              <Td>Internal agent error</Td>
              <Td>Retry or escalate to the platform team.</Td>
            </Tr>
            <Tr>
              <Td><Code>TIMEOUT</Code></Td>
              <Td>MCP server delay</Td>
              <Td>Increase timeout or retry the request.</Td>
            </Tr>
          </Tbody>
        </Table>

        <Heading size="sm" color="gray.900">
          7. Example Use Case — Sundhar Pichai Profile Correction
        </Heading>
        <Text fontSize="sm" color="gray.700">
          After onboarding through the Public Data Agent, operators can refine Sundhar Pichai’s profile with a single natural language command.
        </Text>
        <Text fontSize="sm" color="gray.700" fontWeight="600">Sample Update Request</Text>
        <Box bg="gray.900" color="green.100" fontFamily="mono" fontSize="xs" p={3} borderRadius="md" overflowX="auto">
          <pre>{sundarUpdateRequest}</pre>
        </Box>
        <Text fontSize="sm" color="gray.700" fontWeight="600">Agent Response</Text>
        <Box bg="gray.900" color="green.100" fontFamily="mono" fontSize="xs" p={3} borderRadius="md" overflowX="auto">
          <pre>{sundarUpdateResponse}</pre>
        </Box>

        <Heading size="sm" color="gray.900">
          8. Security &amp; Privacy
        </Heading>
        <UnorderedList fontSize="sm" color="gray.700" spacing={2} pl={6}>
          <ListItem>All communication flows through HTTPS.</ListItem>
          <ListItem>Only authorized MuleSoft integrations may trigger updates.</ListItem>
          <ListItem>Supabase credentials remain secured within the MCP environment.</ListItem>
          <ListItem>No unintended personal data exposure beyond requested fields.</ListItem>
        </UnorderedList>

        <Heading size="sm" color="gray.900">
          9. Versioning
        </Heading>
        <Badge colorScheme="purple" fontSize="0.7rem" p={1} borderRadius="md" w="fit-content">
          v1.0.0 — Initial Hushh Supabase Profile Update Agent documentation
        </Badge>
      </Stack>
    </Box>
  )
}
