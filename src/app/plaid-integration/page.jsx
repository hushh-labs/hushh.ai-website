"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Tag,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Code,
  SimpleGrid,
  Flex,
  Divider,
  useToast,
} from "@chakra-ui/react";
import ContentWrapper from "../_components/layout/ContentWrapper";

const ENDPOINTS = {
  createPublicToken:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/sandbox/public_token/create",
  exchangePublicToken:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/item/public_token/exchange",
  createLinkToken:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/link/create/token",
  getUserFinancialData:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/userFinancialData",
  pushUserFinancialData:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/userFinancialData",
};

const defaultPayload = {
  client_id: "",
  secret: "",
  access_token: "",
  public_token: "",
};

export default function PlaidIntegrationPage() {
  const [credentials, setCredentials] = useState(defaultPayload);
  const [linkToken, setLinkToken] = useState("");
  const [responseLog, setResponseLog] = useState([]);
  const toast = useToast();

  const updateField = (key, value) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const pushLog = (title, payload) => {
    setResponseLog((prev) => [
      { title, timestamp: new Date().toISOString(), payload },
      ...prev,
    ]);
  };

  const callPlaidApi = async ({ title, endpoint, method = "POST", body }) => {
    if (!credentials.client_id || !credentials.secret) {
      toast({
        title: "Credentials required",
        description: "Please enter client_id and secret before calling the API.",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    const payload = {
      client_id: credentials.client_id,
      secret: credentials.secret,
      ...body,
    };
    const normalizedMethod = method?.toUpperCase() || "POST";

    try {
      const res = await fetch("/api/plaid/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, method: normalizedMethod, payload }),
      });
      const json = await res.json();
      pushLog(title, json);
      return json;
    } catch (error) {
      pushLog(title, { error: error?.message || "Unknown error" });
      toast({
        title: `${title} failed`,
        status: "error",
        duration: 3000,
      });
      return null;
    }
  };

  const handleCreatePublicToken = async () => {
    const data = await callPlaidApi({
      title: "Create Public Token",
      endpoint: ENDPOINTS.createPublicToken,
    });
    if (data?.public_token) {
      updateField("public_token", data.public_token);
    }
  };

  const handleExchangePublicToken = async () => {
    if (!credentials.public_token) {
      toast({
        title: "Missing public token",
        description: "Create a public token first.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    const data = await callPlaidApi({
      title: "Exchange Public Token",
      endpoint: ENDPOINTS.exchangePublicToken,
      body: { public_token: credentials.public_token },
    });
    if (data?.access_token) {
      updateField("access_token", data.access_token);
    }
  };

  const handleCreateLinkToken = async () => {
    const data = await callPlaidApi({
      title: "Create Link Token",
      endpoint: ENDPOINTS.createLinkToken,
    });
    if (data?.link_token) {
      setLinkToken(data.link_token);
    }
  };

  const handleFetchFinancialData = async () => {
    if (!credentials.access_token) {
      toast({
        title: "Missing access token",
        description: "Exchange the public token before fetching data.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    await callPlaidApi({
      title: "Fetch Consolidated Financial Data",
      endpoint: ENDPOINTS.getUserFinancialData,
      method: "GET",
      body: { access_token: credentials.access_token },
    });
  };

  const handlePushToSupabase = async () => {
    if (!credentials.access_token) {
      toast({
        title: "Missing access token",
        status: "info",
        duration: 3000,
      });
      return;
    }
    await callPlaidApi({
      title: "Push Data to Supabase",
      endpoint: ENDPOINTS.pushUserFinancialData,
      method: "POST",
      body: { access_token: credentials.access_token },
    });
  };

  return (
    <ContentWrapper>
      <Box bg="#F5F7FE" minH="100vh" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <VStack spacing={4} textAlign="center" mb={10}>
            <Tag colorScheme="blue" borderRadius="full" px={4} py={2}>
              Hushh Plaid Integration Console
            </Tag>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>
              Execute the Full Plaid Workflow
            </Heading>
            <Text color="gray.600" maxW="3xl">
              Use this sandbox console to create tokens, retrieve aggregated financial data, and synchronize it with
              Supabase—exactly how the production MuleSoft integration operates.
            </Text>
          </VStack>

          <Stack spacing={10}>
            <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="xl">
              <Heading size="md" mb={4}>
                Functional Workflow
              </Heading>
              <Stack spacing={4}>
                {[
                  {
                    step: "1",
                    title: "User Initiation",
                    description:
                      "Hushh or a partner app calls the MuleSoft CloudHub REST interface to request Plaid data.",
                  },
                  {
                    step: "2",
                    title: "Token Generation",
                    description:
                      "Public, access, and link tokens are created so the user can connect accounts securely.",
                  },
                  {
                    step: "3",
                    title: "Data Retrieval",
                    description:
                      "With the access token, the API fetches accounts, transactions, and asset data from Plaid.",
                  },
                  {
                    step: "4",
                    title: "Data Synchronization",
                    description:
                      "Responses are transformed into a unified schema and persisted inside Supabase.",
                  },
                  {
                    step: "5",
                    title: "Confirmation Response",
                    description:
                      "The MuleSoft API returns a structured JSON payload confirming the sync.",
                  },
                ].map((item) => (
                  <Box
                    key={item.step}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="rgba(12, 140, 233, 0.2)"
                    p={4}
                    bg="linear-gradient(135deg, rgba(12,140,233,0.08) 0%, rgba(94,92,230,0.05) 100%)"
                  >
                    <Text fontWeight="600" color="#0C8CE9">
                      Step {item.step} — {item.title}
                    </Text>
                    <Text color="gray.600">{item.description}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="xl">
              <Heading size="md" mb={4}>
                Step 1 — Configure Credentials
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl>
                  <FormLabel>Client ID</FormLabel>
                  <Input
                    value={credentials.client_id}
                    onChange={(e) => updateField("client_id", e.target.value)}
                    placeholder="Plaid client_id"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Secret</FormLabel>
                  <Input
                    type="password"
                    value={credentials.secret}
                    onChange={(e) => updateField("secret", e.target.value)}
                    placeholder="Plaid secret"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Public Token</FormLabel>
                  <Input
                    value={credentials.public_token}
                    onChange={(e) => updateField("public_token", e.target.value)}
                    placeholder="Will auto-fill after creation"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Access Token</FormLabel>
                  <Input
                    value={credentials.access_token}
                    onChange={(e) => updateField("access_token", e.target.value)}
                    placeholder="Will auto-fill after exchange"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Link Token</FormLabel>
                  <Input
                    value={linkToken}
                    onChange={(e) => setLinkToken(e.target.value)}
                    placeholder="Optional - generated for Link flow"
                  />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="xl">
              <Heading size="md" mb={4}>
                Step 2 — Run the Workflow
              </Heading>
              <Stack spacing={5}>
                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.1 Generate a Plaid public token for account linking
                  </Text>
                  <Button
                    bgGradient="linear(135deg, #0C8CE9 0%, #5E5CE6 100%)"
                    color="white"
                    _hover={{ opacity: 0.9 }}
                    onClick={handleCreatePublicToken}
                  >
                    Create Public Token
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.2 Exchange the public token for a secure access token
                  </Text>
                  <Button
                    variant="outline"
                    borderColor="#0C8CE9"
                    color="#0C8CE9"
                    _hover={{ bg: "rgba(12,140,233,0.08)" }}
                    onClick={handleExchangePublicToken}
                  >
                    Exchange Public Token for Access Token
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.3 Create the link token for Plaid Link onboarding
                  </Text>
                  <Button
                    bg="#0C8CE9"
                    color="white"
                    _hover={{ bg: "#0B7BD1" }}
                    onClick={handleCreateLinkToken}
                  >
                    Create Link Token
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.4 Fetch consolidated financial data using the access token
                  </Text>
                  <Button
                    bg="#1CB5A3"
                    color="white"
                    _hover={{ bg: "#13a291" }}
                    onClick={handleFetchFinancialData}
                  >
                    Fetch User Financial Data
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.5 Push the unified payload to Supabase for storage
                  </Text>
                  <Button
                    bg="#111827"
                    color="white"
                    _hover={{ bg: "#000000" }}
                    onClick={handlePushToSupabase}
                  >
                    Push Data to Supabase
                  </Button>
                </VStack>
              </Stack>
              <Text mt={4} color="gray.500" fontSize="sm">
                Follow the buttons in order (1 → 5) to mirror the exact Plaid + MuleSoft flow. You can repeat steps with
                fresh tokens at any time.
              </Text>
            </Box>

            <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="xl">
              <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }}>
                <Heading size="md">Step 3 — Response Console</Heading>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setResponseLog([])}
                  mt={{ base: 4, md: 0 }}
                >
                  Clear log
                </Button>
              </Flex>
              <Divider my={4} />
              <Stack spacing={6}>
                {responseLog.length === 0 && (
                  <Text color="gray.500">No API calls yet. Trigger an action to see responses.</Text>
                )}
                {responseLog.map((entry, idx) => (
                  <Box key={idx} borderWidth="1px" borderRadius="lg" p={4} bg="gray.900">
                    <Flex justify="space-between" align="center" mb={2}>
                      <Tag colorScheme="yellow">{entry.title}</Tag>
                      <Text color="gray.400" fontSize="xs">
                        {entry.timestamp}
                      </Text>
                    </Flex>
                    <Code display="block" whiteSpace="pre-wrap" color="green.100" bg="transparent">
                      {JSON.stringify(entry.payload, null, 2)}
                    </Code>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
