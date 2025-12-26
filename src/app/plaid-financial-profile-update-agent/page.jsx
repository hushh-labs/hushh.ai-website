"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FiRepeat, FiServer, FiShield } from "react-icons/fi";
import ContentWrapper from "../_components/layout/ContentWrapper";
import { useEffect } from "react";

const AGENT_ENDPOINT = "https://hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/plaid-agent";
const MCP_ENDPOINT = "https://hushh-plaid-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/mcp";

const docSessionId = "session456";
const docTaskId = "task124";
const docPrompt =
  "Can you update the account name to Savings for the user with user id: 9346661428 and account Id 5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1?";

const defaultUpdatePayload = {
  user_id: "9346661428",
  account_id: "5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1",
  updates: {
    account_name: "Savings",
    balance_current: 12000,
    balance_available: 12000,
  },
  note: "Natural language input can be paired with this structured payload.",
};

const defaultMcpRequest = {
  method: "tools/call",
  params: {
    name: "update_user",
    arguments: {
      user_id: "9346661428",
      account_id: "5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1",
      account_name: "Savings",
    },
  },
};

const workflowSteps = [
  {
    title: "User input",
    detail: "Natural language asks for a correction or data change (balances, names, investments, etc).",
  },
  {
    title: "Agent invocation",
    detail: "MuleSoft sends JSON-RPC 2.0 POST to the Plaid Update Agent endpoint.",
  },
  {
    title: "Intent extraction",
    detail: "LLM identifies user/account IDs, fields to update, and target values.",
  },
  {
    title: "MCP + Supabase",
    detail: "MCP executes update_user to apply changes in Supabase.",
  },
  {
    title: "Confirmation",
    detail: "Agent returns a structured success payload with timestamps.",
  },
];

const errorMatrix = [
  { code: "400", label: "Invalid JSON-RPC format", resolution: "Ensure request structure matches schema." },
  { code: "401", label: "Unauthorized", resolution: "Validate MuleSoft or API credentials." },
  { code: "404", label: "User not found", resolution: "Confirm user_id and account_id exist in Supabase." },
  { code: "500", label: "Internal Agent Error", resolution: "Retry or contact support." },
  { code: "TIMEOUT", label: "MCP server delay", resolution: "Increase timeout or retry the request." },
];

const inputStyles = {
  bg: "white",
  color: "gray.800",
  borderColor: "gray.200",
  _placeholder: { color: "gray.500" },
  _hover: { borderColor: "#0C8CE9" },
  _focus: { borderColor: "#0C8CE9", boxShadow: "0 0 0 1px #0C8CE9" },
};

export default function PlaidFinancialProfileUpdateAgentPage() {
  const toast = useToast();
  const [sessionId, setSessionId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [updateJson, setUpdateJson] = useState("");
  const [mcpJson, setMcpJson] = useState("");
  const [log, setLog] = useState([]);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingMcp, setIsLoadingMcp] = useState(false);

  // Populate defaults once so the form is immediately usable and remains editable.
  useEffect(() => {
    setSessionId(docSessionId);
    setTaskId(docTaskId);
    setPrompt(docPrompt);
    setUpdateJson(JSON.stringify(defaultUpdatePayload, null, 2));
    setMcpJson(JSON.stringify(defaultMcpRequest, null, 2));
  }, []);

  const applyDocPreset = () => {
    setSessionId(docSessionId);
    setTaskId(docTaskId);
    setPrompt(docPrompt);
    setUpdateJson(JSON.stringify(defaultUpdatePayload, null, 2));
    setLog([]);
    toast({
      title: "Loaded update sample",
      status: "info",
      duration: 2000,
    });
  };

  const applyMcpPreset = () => {
    setMcpJson(JSON.stringify(defaultMcpRequest, null, 2));
    setLog([]);
    toast({
      title: "Loaded MCP update_user sample",
      status: "info",
      duration: 2000,
    });
  };

  const applyMinimalPreset = () => {
    setUpdateJson(
      JSON.stringify(
        {
          user_id: "user-demo",
          account_id: "account-demo",
          updates: {
            account_name: "Demo Checking",
            balance_current: 2500,
          },
        },
        null,
        2
      )
    );
    setPrompt("Update demo account balance to 2500 USD.");
    setSessionId("session-demo");
    setTaskId("task-demo");
    setLog([]);
    toast({
      title: "Loaded minimal test payload",
      status: "info",
      duration: 2000,
    });
  };

  const agentRequestPreview = useMemo(() => {
    if (!updateJson) {
      return "Add or load an update payload to preview the request.";
    }
    try {
      const parsed = JSON.parse(updateJson);
      return JSON.stringify(
        {
          jsonrpc: "2.0",
          id: taskId || "task-id",
          method: "tasks/send",
          params: {
            sessionId: sessionId || "session-id",
            message: {
              role: "user",
              parts: [
                {
                  type: "text",
                  text: `${prompt}\n${JSON.stringify(parsed)}`,
                },
              ],
            },
          },
        },
        null,
        2
      );
    } catch (error) {
      return "Invalid JSON in update payload.";
    }
  }, [updateJson, prompt, sessionId, taskId]);

  const addLog = (title, payload) => {
    setLog((prev) => [{ title, timestamp: new Date().toISOString(), payload }, ...prev].slice(0, 12));
  };

  const callProxy = async ({ title, endpoint, payload }) => {
    try {
      const response = await fetch("/api/plaid/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, method: "POST", payload }),
      });
      const json = await response.json();
      addLog(title, json);
      return json;
    } catch (error) {
      addLog(title, { error: error.message || "Unknown error" });
      toast({
        title: `${title} failed`,
        status: "error",
        duration: 3000,
      });
      return null;
    }
  };

  const sendAgentRequest = async () => {
    setIsLoadingAgent(true);
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(updateJson);
    } catch (error) {
      toast({
        title: "Update JSON invalid",
        description: "Fix the JSON payload before sending.",
        status: "error",
        duration: 3000,
      });
      setIsLoadingAgent(false);
      return;
    }

    const payload = {
      jsonrpc: "2.0",
      id: taskId || "task-id",
      method: "tasks/send",
      params: {
        sessionId: sessionId || "session-id",
        message: {
          role: "user",
          parts: [
            {
              type: "text",
              text: `${prompt}\n${JSON.stringify(parsedPayload)}`,
            },
          ],
        },
      },
    };

    await callProxy({
      title: "Agent update request",
      endpoint: AGENT_ENDPOINT,
      payload,
    });
    setIsLoadingAgent(false);
  };

  const sendMcpRequest = async () => {
    setIsLoadingMcp(true);
    let parsed;
    try {
      parsed = JSON.parse(mcpJson);
    } catch (error) {
      toast({
        title: "MCP JSON invalid",
        description: "Fix the JSON payload before sending.",
        status: "error",
        duration: 3000,
      });
      setIsLoadingMcp(false);
      return;
    }

    await callProxy({
      title: "MCP update_user",
      endpoint: MCP_ENDPOINT,
      payload: parsed,
    });
    setIsLoadingMcp(false);
  };

  return (
    <ContentWrapper>
      <Box bg="#0a0f1e" color="white" minH="100vh">
        <Box bg="linear-gradient(135deg, rgba(12,140,233,0.12) 0%, rgba(94,92,230,0.08) 50%, rgba(15,185,177,0.08) 100%)">
          <Container maxW="7xl" py={{ base: 10, md: 16 }}>
            <VStack spacing={6} align="stretch">
              <Tag w="fit-content" colorScheme="white" bg="whiteAlpha.200" borderRadius="full" px={4} py={2}>
                Hushh Plaid Financial Profile Update Agent
              </Tag>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} lineHeight="1.1">
                Update Plaid-linked financial profiles in Supabase with natural language.
              </Heading>
              <Text color="gray.200" maxW="3xl">
                This page operationalizes the update agent flow: capture a user instruction, extract fields to change,
                and call MCP to persist updates across Supabase and downstream CRM, analytics, and personalization
                systems.
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {[
                  { icon: <FiRepeat />, label: "Use case", value: "Corrections + field-level updates" },
                  { icon: <FiServer />, label: "Transport", value: "JSON-RPC 2.0 via MuleSoft" },
                  { icon: <FiShield />, label: "Data store", value: "Supabase via MCP update_user" },
                ].map((item) => (
                  <Flex
                    key={item.label}
                    bg="whiteAlpha.100"
                    border="1px solid rgba(255,255,255,0.08)"
                    borderRadius="lg"
                    p={4}
                    align="center"
                    gap={3}
                  >
                    <Box w="10" h="10" borderRadius="md" bg="whiteAlpha.100" display="grid" placeItems="center">
                      {item.icon}
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.300">
                        {item.label}
                      </Text>
                      <Text fontWeight="700">{item.value}</Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        <Container maxW="7xl" py={{ base: 10, md: 14 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
            <Box bg="white" color="gray.900" borderRadius="2xl" p={6} shadow="2xl">
              <Heading size="md" mb={3}>
                Overview
              </Heading>
              <Text color="gray.700">
                An AI-powered automation layer that corrects or updates Plaid-sourced financial data in Supabase using
                natural language. It keeps CRM, analytics, and personalization modules aligned with the latest user
                state.
              </Text>
              <Stack mt={4} spacing={2}>
                {["Account + contact fixes", "Balances, investments, liabilities", "Timestamped confirmations"].map(
                  (point) => (
                    <Flex key={point} align="center" gap={2} color="gray.800">
                      <CheckCircleIcon color="green.500" />
                      <Text>{point}</Text>
                    </Flex>
                  )
                )}
              </Stack>
            </Box>
            <Box bg="white" color="gray.900" borderRadius="2xl" p={6} shadow="2xl">
              <Heading size="md" mb={3}>
                Integration Flow
              </Heading>
              <Stack spacing={3} color="gray.700">
                <Text>1) MuleSoft crafts JSON-RPC from user/back-end instruction.</Text>
                <Text>2) Agent parses fields to change and targets.</Text>
                <Text>3) MCP update_user applies changes in Supabase.</Text>
                <Text>4) Structured confirmation returns to Hushh UI.</Text>
              </Stack>
            </Box>
          </SimpleGrid>

          <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl" mb={10}>
            <Heading size="md" mb={4}>
              Functional Workflow
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {workflowSteps.map((step, idx) => (
                <Box
                  key={step.title}
                  border="1px solid rgba(12,140,233,0.15)"
                  borderRadius="lg"
                  p={4}
                  bg="linear-gradient(135deg, rgba(12,140,233,0.06) 0%, rgba(94,92,230,0.05) 100%)"
                >
                  <Flex align="center" justify="space-between" mb={2}>
                    <Tag colorScheme="blue" borderRadius="full">
                      Step {idx + 1}
                    </Tag>
                    <Text fontWeight="700" color="#0C8CE9">
                      {step.title}
                    </Text>
                  </Flex>
                  <Text color="gray.700">{step.detail}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl" mb={10}>
            <Flex
              justify="space-between"
              align={{ base: "stretch", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={4}
              mb={3}
            >
              <Heading size="md">Quick testing presets</Heading>
              <Text color="gray.600">Load doc-based samples to instantly test the update flow.</Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
              <Button
                variant="outline"
                colorScheme="blue"
                type="button"
                onClick={applyDocPreset}
              >
                Load update sample
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                type="button"
                onClick={applyMcpPreset}
              >
                Load MCP update_user sample
              </Button>
              <Button
                variant="ghost"
                colorScheme="gray"
                type="button"
                onClick={applyMinimalPreset}
              >
                Minimal test payload
              </Button>
            </SimpleGrid>
          </Box>

          <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={6} mb={10}>
            <GridItem>
              <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl">
                <Flex
                  justify="space-between"
                  align={{ base: "stretch", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={4}
                >
                  <Heading size="md">Update Request Builder</Heading>
                  <Button size="sm" variant="ghost" onClick={() => setUpdateJson(JSON.stringify(defaultUpdatePayload, null, 2))}>
                    Reset payload
                  </Button>
                </Flex>
                <Text color="gray.700" mt={3}>
                  Mirror the MuleSoft JSON-RPC call to the agent. Combine a natural language instruction with structured
                  fields so the agent can route precise updates through MCP.
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={5}>
                <Box>
                  <Text fontWeight="600" color="gray.800" mb={1}>
                    Session ID
                  </Text>
                  <Input
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    placeholder="session456"
                    {...inputStyles}
                  />
                </Box>
                <Box>
                  <Text fontWeight="600" color="gray.800" mb={1}>
                    Task ID
                  </Text>
                  <Input
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="task124"
                    {...inputStyles}
                  />
                </Box>
              </SimpleGrid>

              <Box mt={4}>
                <Text fontWeight="600" color="gray.800" mb={1}>
                  User prompt
                </Text>
                <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} {...inputStyles} />
              </Box>

                <Box mt={4}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="600" color="gray.800">
                      Update payload (optional JSON context)
                    </Text>
                    <Button size="xs" variant="outline" onClick={() => navigator.clipboard.writeText(updateJson)}>
                      Copy JSON
                    </Button>
                  </Flex>
                  <Textarea
                    value={updateJson}
                    onChange={(e) => setUpdateJson(e.target.value)}
                    minH="240px"
                    fontFamily="mono"
                    {...inputStyles}
                  />
                </Box>

                <Button
                  mt={5}
                  bgGradient="linear(135deg, #0C8CE9 0%, #5E5CE6 100%)"
                  color="white"
                  _hover={{ opacity: 0.92 }}
                  onClick={sendAgentRequest}
                  isLoading={isLoadingAgent}
                >
                  Send to Update Agent
                </Button>

                <Divider my={6} />
                <Text fontWeight="600" color="gray.800" mb={2}>
                  Request preview
                </Text>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  p={4}
                  borderRadius="lg"
                  bg="gray.900"
                  color="green.100"
                  w="full"
                  overflowX="auto"
                  wordBreak="break-word"
                >
                  {agentRequestPreview}
                </Code>
              </Box>
            </GridItem>

            <GridItem>
              <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl">
                <Flex
                  justify="space-between"
                  align={{ base: "stretch", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={4}
                >
                  <Heading size="md">Direct MCP call (update_user)</Heading>
                  <Button size="sm" variant="ghost" onClick={() => setMcpJson(JSON.stringify(defaultMcpRequest, null, 2))}>
                    Reset MCP payload
                  </Button>
                </Flex>
                <Text color="gray.700" mt={3}>
                  Validate how MCP ingests structured update arguments when bypassing the agent layer. Use the same
                  request object your MuleSoft flow would POST.
                </Text>

                <Box mt={4}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="600" color="gray.800">
                      tools/call payload
                    </Text>
                    <Button size="xs" variant="outline" onClick={() => navigator.clipboard.writeText(mcpJson)}>
                      Copy JSON
                    </Button>
                  </Flex>
                  <Textarea
                    value={mcpJson}
                    onChange={(e) => setMcpJson(e.target.value)}
                    minH="300px"
                    fontFamily="mono"
                    {...inputStyles}
                  />
                </Box>

                <Button
                  mt={5}
                  bg="#111827"
                  color="white"
                  _hover={{ bg: "#0b0f1a" }}
                  onClick={sendMcpRequest}
                  isLoading={isLoadingMcp}
                >
                  Call MCP update_user
                </Button>
              </Box>
            </GridItem>
          </Grid>

          <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl" mb={10}>
            <Flex
              justify="space-between"
              align={{ base: "stretch", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={4}
            >
              <Heading size="md">Response console</Heading>
              <Button size="sm" variant="ghost" onClick={() => setLog([])}>
                Clear log
              </Button>
            </Flex>
            <Text color="gray.600" mt={2}>
              Responses from the Update Agent and MCP are captured here for quick debugging and demo purposes.
            </Text>
            <Divider my={4} />
            <Stack spacing={4}>
              {log.length === 0 && <Text color="gray.500">No calls yet. Trigger a request to see responses.</Text>}
              {log.map((entry, idx) => (
                <Box key={`${entry.title}-${idx}`} borderWidth="1px" borderRadius="lg" p={4} bg="gray.900">
                  <Flex justify="space-between" align="center" mb={2}>
                    <Tag colorScheme="yellow">{entry.title}</Tag>
                    <Text color="gray.400" fontSize="xs">
                      {entry.timestamp}
                    </Text>
                  </Flex>
                  <Code
                    display="block"
                    whiteSpace="pre-wrap"
                    bg="transparent"
                    color="green.100"
                    w="full"
                    overflowX="auto"
                    wordBreak="break-word"
                  >
                    {JSON.stringify(entry.payload, null, 2)}
                  </Code>
                </Box>
              ))}
            </Stack>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
            <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl">
              <Heading size="md" mb={4}>
                Error handling
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {errorMatrix.map((item) => (
                  <Box key={item.code} borderWidth="1px" borderRadius="lg" p={4} borderColor="rgba(12,140,233,0.15)">
                    <Flex align="center" justify="space-between" mb={2}>
                      <Tag colorScheme="red">{item.code}</Tag>
                      <Text fontWeight="700">{item.label}</Text>
                    </Flex>
                    <Text color="gray.700">{item.resolution}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Stack spacing={4}>
              <Box bg="white" borderRadius="xl" p={6} shadow="2xl">
                <Heading size="sm" mb={2}>
                  Sundhar Pichai use case
                </Heading>
                <Text color="gray.700" mb={2}>
                  Example update: "Please update Sundhar Pichai’s bank balance to 12000 USD having their UserId xxxx and
                  account id xxxxx."
                </Text>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  bg="gray.900"
                  color="green.100"
                  p={4}
                  borderRadius="lg"
                  w="full"
                  overflowX="auto"
                  wordBreak="break-word"
                >
                  {`{
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
          "text": "Please update Sundhar Pichai’s bank balance to 12000 USD having their UserId xxxx and account id xxxxx."
        }
      ]
    }
  }
}`}
                </Code>
              </Box>
              <Box bg="white" borderRadius="xl" p={6} shadow="2xl">
                <Heading size="sm" mb={2}>
                  Security & privacy
                </Heading>
                <Stack spacing={2} color="gray.700">
                  <Text>• HTTPS enforced for agent and MCP endpoints.</Text>
                  <Text>• Only authorized MuleSoft flows can trigger updates.</Text>
                  <Text>• Supabase credentials stay inside the MCP environment.</Text>
                  <Text>• No sensitive data exposed beyond intended updates.</Text>
                </Stack>
              </Box>
              <Box bg="white" borderRadius="xl" p={6} shadow="2xl">
                <Heading size="sm" mb={2}>
                  Versioning
                </Heading>
                <Text color="gray.700">v1.0.0 — Initial Hushh Plaid Financial Profile Update Agent release.</Text>
              </Box>
            </Stack>
          </Grid>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
