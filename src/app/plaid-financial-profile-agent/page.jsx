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
import { FiServer, FiShield, FiZap } from "react-icons/fi";
import ContentWrapper from "../_components/layout/ContentWrapper";
import { useEffect } from "react";

const AGENT_ENDPOINT = "https://hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/plaid-agent";
const MCP_ENDPOINT = "https://hushh-plaid-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/mcp";

const docSessionId = "session456";
const docTaskId = "task124";
const docPrompt = "Can you create a user financial profile with the details below?";

const defaultProfileData = {
  plaid_item_id: "qwLMWRkeLr65rqw5ziBVgkAZqN6udgmDgAA",
  user_id: "93589999",
  account_id: "5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1",
  account_name: "Plaid Saving",
  account_subtype: "loan",
  official_name: "Plaid Gold Standard 0.1% Interest Saving",
  institution_id: "ins_20",
  institution_name: "Citizens Bank",
  balance_available: 200,
  balance_current: 210,
  iso_currency_code: "USD",
  identity_name: "Alberta Bobbeth Charleson",
  identity_email: "accountholder0@example.com",
  identity_phone: { mobile: "9457889788" },
  identity_address: {
    city: "Malakoff",
    country: "US",
    postal_code: "14236",
    region: "NY",
    street: "2992 Cameron Road",
  },
  account_number: null,
  statement_id: null,
  asset_report_id: ["a15a520c-34aa-4ce7-af55-8c9199aace49"],
  total_user_assets: null,
  net_worth: 299999999,
  investments: [],
  liability_type: ["credit", "mortgage", "student"],
  total_user_liabilities: "0",
  transactions: [
    {
      account_id: "5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1",
      recent_transaction_id: "XPy6q8JMy7fzRnDgKADqUwKmDRlA8pU1pvzLl",
      recent_transaction_date: "2025-10-16",
      recent_transaction_name: "CREDIT CARD 3333 PAYMENT",
      recent_transaction_amount: 25,
      recent_transaction_merchant: null,
      recent_transaction_is_pending: false,
      recent_transaction_payment_channel: "other",
      recent_transaction_primary_category: "LOAN_PAYMENTS",
      recent_transaction_detailed_category: "LOAN_PAYMENTS_CREDIT_CARD_PAYMENT",
    },
    {
      account_id: "5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1",
      recent_transaction_id: "D7P6p8XWPbi93BzLaWzRUldm4kp1gKf4mL9J9",
      recent_transaction_date: "2025-10-11",
      recent_transaction_name: "INTRST PYMNT",
      recent_transaction_amount: -4.22,
      recent_transaction_merchant: null,
      recent_transaction_is_pending: false,
      recent_transaction_payment_channel: "other",
      recent_transaction_primary_category: "INCOME",
      recent_transaction_detailed_category: "INCOME_WAGES",
    },
    {
      account_id: "5pvR3o8Nvefz5gDv17DKUBKaBW7JVGu5oePz1",
      recent_transaction_id: "6lR5xgDPRQfmnrEoybEvU44RMglgq7tbQg9Gb",
      recent_transaction_date: "2025-09-16",
      recent_transaction_name: "CREDIT CARD 3333 PAYMENT",
      recent_transaction_amount: 25,
      recent_transaction_merchant: null,
      recent_transaction_is_pending: false,
      recent_transaction_payment_channel: "other",
      recent_transaction_primary_category: "LOAN_PAYMENTS",
      recent_transaction_detailed_category: "LOAN_PAYMENTS_CREDIT_CARD_PAYMENT",
    },
  ],
  student_liabilities_total: "0",
  mortgage_liabilities_total: "0",
  credit_liabilities_total: "0",
  student_liabilities: [],
  mortgage_liabilities: [],
  credit_liabilities: [],
  holder_category: "personal",
  net_worth_score: "positive",
  account_assets: 2890900,
  account_liabilities: 200000,
};

const defaultMcpRequest = {
  method: "tools/call",
  params: {
    name: "insert_user",
    arguments: {
      plaid_item_id: "qwLMWRkeLrfB865rqw5ziBVgkAZqN6udgmDgG",
      institution_id: "ins_20",
      institution_name: "Citizens Bank",
      identity_name: "Alberta Bobbeth Charleson",
      identity_email: "accountholder0@example.com",
      identity_phone: {
        mobile: "1112225555",
        work: "1112224444",
        home: "1112223333",
      },
      identity_address: {
        city: "Malakoff",
        country: "US",
        postal_code: "14236",
        region: "NY",
        street: "2992 Cameron Road",
      },
      account_id: "31yozK5ayjHgPjAkZdAWhElPEnmGwVSZpK1Gx",
      account_name: "Plaid Cash Management",
      account_subtype: "cash management",
      holder_category: null,
      iso_currency_code: "USD",
      official_name: "Plaid Growth Cash Management",
      balance_available: 12060,
      balance_current: 12060,
      asset_report_id: ["a15a520c-34aa-4ce7-af55-8c9199aace49"],
      transactions: [],
      investments: [],
      credit_liabilities: [],
      mortgage_liabilities: [],
      student_liabilities: [],
      liability_type: ["credit", "mortgage", "student"],
      credit_liabilities_total: 0,
      mortgage_liabilities_total: 0,
      student_liabilities_total: 0,
      total_user_assets: 253165.35325,
      total_user_liabilities: 457936.13,
      account_liabilities: 0,
      net_worth: -204770.77675,
      net_worth_score: "Negative",
    },
  },
};

const workflowSteps = [
  {
    title: "User input",
    detail: "Natural language prompt (or backend trigger) containing raw financial profile details.",
  },
  {
    title: "Agent invocation",
    detail: "MuleSoft crafts a JSON-RPC 2.0 POST to the Plaid Financial Profile Creation Agent.",
  },
  {
    title: "Intent extraction",
    detail: "LLM parses account, contact, transactions, investments, and liability data points.",
  },
  {
    title: "MCP + Supabase",
    detail: "MCP server executes insert_user to persist the unified record in Supabase.",
  },
  {
    title: "Confirmation",
    detail: "Agent returns a structured success payload with timestamps and tracking IDs.",
  },
];

const errorMatrix = [
  { code: "400", label: "Invalid JSON-RPC format", resolution: "Validate request schema and required keys." },
  { code: "401", label: "Unauthorized", resolution: "Check MuleSoft credentials and headers." },
  { code: "404", label: "Required fields missing", resolution: "Provide mandatory profile parameters." },
  { code: "409", label: "Duplicate user", resolution: "Verify user identity before retrying." },
  { code: "500", label: "Internal Agent Error", resolution: "Retry or escalate to the platform team." },
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

export default function PlaidFinancialProfileAgentPage() {
  const toast = useToast();
  const [sessionId, setSessionId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [profileJson, setProfileJson] = useState("");
  const [mcpJson, setMcpJson] = useState("");
  const [log, setLog] = useState([]);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingMcp, setIsLoadingMcp] = useState(false);

  // Populate defaults once so the form is ready-to-run and inputs stay editable.
  useEffect(() => {
    setSessionId(docSessionId);
    setTaskId(docTaskId);
    setPrompt(docPrompt);
    setProfileJson(JSON.stringify(defaultProfileData, null, 2));
    setMcpJson(JSON.stringify(defaultMcpRequest, null, 2));
  }, []);

  const applyDocPreset = () => {
    setSessionId(docSessionId);
    setTaskId(docTaskId);
    setPrompt(docPrompt);
    setProfileJson(JSON.stringify(defaultProfileData, null, 2));
    setLog([]);
    toast({
      title: "Loaded creation sample",
      status: "info",
      duration: 2000,
    });
  };

  const applyMcpPreset = () => {
    setMcpJson(JSON.stringify(defaultMcpRequest, null, 2));
    setLog([]);
    toast({
      title: "Loaded MCP insert_user sample",
      status: "info",
      duration: 2000,
    });
  };

  const applyMinimalPreset = () => {
    setProfileJson(
      JSON.stringify(
        {
          plaid_item_id: "sample-item-id",
          user_id: "user-demo",
          account_id: "account-demo",
          account_name: "Demo Savings",
          iso_currency_code: "USD",
          balance_current: 500,
          identity_email: "demo@example.com",
        },
        null,
        2
      )
    );
    setPrompt("Create a profile with the lightweight demo payload.");
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
    if (!profileJson) {
      return "Add or load a profile JSON payload to preview the request.";
    }
    try {
      const parsed = JSON.parse(profileJson);
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
                  text: `${prompt} ${JSON.stringify(parsed)}`,
                },
              ],
            },
          },
        },
        null,
        2
      );
    } catch (error) {
      return "Invalid JSON in profile payload.";
    }
  }, [profileJson, prompt, sessionId, taskId]);

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
    let parsedProfile;
    try {
      parsedProfile = JSON.parse(profileJson);
    } catch (error) {
      toast({
        title: "Profile JSON invalid",
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
              text: `${prompt} ${JSON.stringify(parsedProfile)}`,
            },
          ],
        },
      },
    };

    await callProxy({
      title: "Agent request",
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
      title: "MCP insert_user",
      endpoint: MCP_ENDPOINT,
      payload: parsed,
    });
    setIsLoadingMcp(false);
  };

  return (
    <ContentWrapper>
      <Box bg="#050b19" color="white" minH="100vh">
        <Box bg="linear-gradient(135deg, rgba(12,140,233,0.12) 0%, rgba(94,92,230,0.08) 50%, rgba(15,185,177,0.08) 100%)">
          <Container maxW="7xl" py={{ base: 10, md: 16 }}>
            <VStack spacing={6} align="stretch">
              <Tag w="fit-content" colorScheme="white" bg="whiteAlpha.200" borderRadius="full" px={4} py={2}>
                Hushh Plaid Financial Profile Creation Agent
              </Tag>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} lineHeight="1.1">
                Create and sync Plaid financial profiles with MCP + Supabase in one flow.
              </Heading>
              <Text color="gray.200" maxW="3xl">
                This page wraps the end-to-end JSON-RPC flow described in the platform docs: capture a user instruction,
                let the agent extract structured fields, and push a new financial profile into Supabase through the MCP
                server.
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {[
                  { icon: <FiZap />, label: "LLM model", value: "OpenAI GPT-4.0 mini" },
                  { icon: <FiServer />, label: "Transport", value: "JSON-RPC 2.0 via MuleSoft" },
                  { icon: <FiShield />, label: "Data store", value: "Supabase via MCP insert_user" },
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
                    <Box
                      w="10"
                      h="10"
                      borderRadius="md"
                      bg="whiteAlpha.100"
                      display="grid"
                      placeItems="center"
                    >
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
                An AI-driven automation agent that converts natural language or semi-structured financial inputs into
                new Supabase user profiles. It keeps personalization, analytics, and recommendations in sync with
                Plaid-sourced data.
              </Text>
              <Stack mt={4} spacing={2}>
                {["Account + contact enrichment", "Transactions, investments, liabilities", "Timestamped confirmations"].map(
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
                <Text>1) MuleSoft crafts JSON-RPC from a user or backend instruction.</Text>
                <Text>2) Agent parses fields and calls the MCP server.</Text>
                <Text>3) MCP insert_user writes to Supabase.</Text>
                <Text>4) Structured confirmation returns to the Hushh interface.</Text>
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
              <Text color="gray.600">Load sample values from the documentation to test the flow in one click.</Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
              <Button
                variant="outline"
                colorScheme="blue"
                type="button"
                onClick={applyDocPreset}
              >
                Load creation sample
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                type="button"
                onClick={applyMcpPreset}
              >
                Load MCP insert_user sample
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
                <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                  <Heading size="md">Agent Request Builder</Heading>
                  <Button size="sm" variant="ghost" onClick={() => setProfileJson(JSON.stringify(defaultProfileData, null, 2))}>
                    Reset payload
                  </Button>
                </Flex>
                <Text color="gray.700" mt={3}>
                  Compose the JSON-RPC request the same way MuleSoft does. The agent consumes your natural language
                  prompt plus the embedded profile JSON and then calls MCP for insertion.
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
                      Financial profile payload
                    </Text>
                    <Button size="xs" variant="outline" onClick={() => navigator.clipboard.writeText(profileJson)}>
                      Copy JSON
                    </Button>
                  </Flex>
                  <Textarea
                    value={profileJson}
                    onChange={(e) => setProfileJson(e.target.value)}
                    minH="260px"
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
                  Send to Agent
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
                <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                  <Heading size="md">Direct MCP call (insert_user)</Heading>
                  <Button size="sm" variant="ghost" onClick={() => setMcpJson(JSON.stringify(defaultMcpRequest, null, 2))}>
                    Reset MCP payload
                  </Button>
                </Flex>
                <Text color="gray.700" mt={3}>
                  Validate how MCP ingests structured arguments without the agent layer. Use the same request object your
                  MuleSoft flow would POST.
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
                    minH="320px"
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
                  Call MCP insert_user
                </Button>
              </Box>
            </GridItem>
          </Grid>

          <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="2xl" mb={10}>
            <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
              <Heading size="md">Response console</Heading>
              <Button size="sm" variant="ghost" onClick={() => setLog([])}>
                Clear log
              </Button>
            </Flex>
            <Text color="gray.600" mt={2}>
              Responses from the agent and MCP are captured here for quick debugging and demo purposes.
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
                  Security & privacy
                </Heading>
                <Stack spacing={2} color="gray.700">
                  <Text>• HTTPS enforced across agent and MCP endpoints.</Text>
                  <Text>• Only authorized MuleSoft flows can initiate profile creation.</Text>
                  <Text>• Supabase credentials remain isolated inside MCP.</Text>
                </Stack>
              </Box>
              <Box bg="white" borderRadius="xl" p={6} shadow="2xl">
                <Heading size="sm" mb={2}>
                  Versioning
                </Heading>
                <Text color="gray.700">v1.0.0 — Initial Hushh Plaid Financial Profile Creation Agent release.</Text>
              </Box>
              <Box bg="white" borderRadius="xl" p={6} shadow="2xl">
                <Heading size="sm" mb={2}>
                  API endpoints
                </Heading>
                <Stack spacing={2} color="gray.700">
                  <Text>
                    Agent: <Code>{AGENT_ENDPOINT}</Code>
                  </Text>
                  <Text>
                    MCP Server: <Code>{MCP_ENDPOINT}</Code>
                  </Text>
                  <Text>
                    Method: <Code>POST</Code> with <Code>Content-Type: application/json</Code>
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
