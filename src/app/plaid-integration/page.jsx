"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
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
import Link from "next/link";
import Script from "next/script";
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
  createProfileAgent:
    "https://hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/plaid-agent",
};

const PLAID_ACCOUNTS_PATH = "/api/plaid/accounts";
const DEFAULT_LINK_PRODUCTS = ["transactions", "investments", "liabilities", "assets"];

const defaultPayload = {
  client_id: "",
  secret: "",
  access_token: "",
  public_token: "",
};

export default function PlaidIntegrationPage() {
  const [credentials, setCredentials] = useState(defaultPayload);
  const [linkToken, setLinkToken] = useState("");
  const [linkProducts, setLinkProducts] = useState(DEFAULT_LINK_PRODUCTS);
  const [responseLog, setResponseLog] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [isPlaidReady, setIsPlaidReady] = useState(false);
  const [isLinkOpening, setIsLinkOpening] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const loadCredentials = async () => {
      try {
        const res = await fetch("/api/plaid/credentials", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Unable to load Plaid credentials");
        }
        const data = await res.json();
        if (isMounted) {
          setCredentials((prev) => ({
            ...prev,
            client_id: data?.client_id || prev.client_id,
            secret: data?.secret || prev.secret,
          }));
        }
      } catch (error) {
        if (isMounted) {
          toast({
            title: "Credentials unavailable",
            description: "Check the Plaid values in .env.",
            status: "warning",
            duration: 3000,
          });
        }
      }
    };

    loadCredentials();
    return () => {
      isMounted = false;
    };
  }, [toast]);

  const updateField = (key, value) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const pushLog = (title, payload) => {
    setResponseLog((prev) => [
      { title, timestamp: new Date().toISOString(), payload },
      ...prev,
    ]);
  };

  const unwrapPlaidResponse = (payload) => (payload?.data !== undefined ? payload.data : payload);
  const getLinkTokenBody = () => (linkProducts.length ? { products: linkProducts } : undefined);

  const callPlaidApi = async ({
    title,
    endpoint,
    method = "POST",
    body,
    overrideMethod,
    includeCredentials = true,
  }) => {
    if (includeCredentials && (!credentials.client_id || !credentials.secret)) {
      toast({
        title: "Credentials required",
        description: "Please enter client_id and secret before calling the API.",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    const payload = includeCredentials
      ? {
          client_id: credentials.client_id,
          secret: credentials.secret,
          ...body,
        }
      : body || {};
    const normalizedMethod = method?.toUpperCase() || "POST";

    try {
      const res = await fetch("/api/plaid/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, method: normalizedMethod, payload, overrideMethod }),
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
    const result = await callPlaidApi({
      title: "Create Public Token",
      endpoint: ENDPOINTS.createPublicToken,
    });
    const data = unwrapPlaidResponse(result);
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
    const result = await callPlaidApi({
      title: "Exchange Public Token",
      endpoint: ENDPOINTS.exchangePublicToken,
      body: { public_token: credentials.public_token },
    });
    const data = unwrapPlaidResponse(result);
    if (data?.access_token) {
      updateField("access_token", data.access_token);
    }
  };

  const handleCreateLinkToken = async () => {
    const result = await callPlaidApi({
      title: "Create Link Token",
      endpoint: ENDPOINTS.createLinkToken,
      body: getLinkTokenBody(),
    });
    const data = unwrapPlaidResponse(result);
    if (data?.link_token) {
      setLinkToken(data.link_token);
    }
  };

  const ensureLinkToken = async () => {
    if (linkToken) {
      return linkToken;
    }
    const result = await callPlaidApi({
      title: "Create Link Token",
      endpoint: ENDPOINTS.createLinkToken,
      body: getLinkTokenBody(),
    });
    const data = unwrapPlaidResponse(result);
    if (data?.link_token) {
      setLinkToken(data.link_token);
      return data.link_token;
    }
    return null;
  };

  const handleLaunchPlaidLink = async () => {
    if (!isPlaidReady || typeof window === "undefined" || !window.Plaid) {
      toast({
        title: "Plaid Link not ready",
        description: "Please wait for the Plaid script to load before connecting a bank.",
        status: "info",
        duration: 3000,
      });
      return;
    }

    setIsLinkOpening(true);
    const token = await ensureLinkToken();
    if (!token) {
      setIsLinkOpening(false);
      toast({
        title: "Link token missing",
        description: "We couldn't create a link token. Please check your credentials and try again.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const handler = window.Plaid.create({
      token,
      onSuccess: async (public_token, metadata) => {
        updateField("public_token", public_token);
        pushLog("Plaid Link Success", { public_token, metadata });
        console.log("[Plaid Link] Success", { public_token, metadata });
        console.log("[Plaid Link] Institution", metadata?.institution || null);
        console.log("[Plaid Link] Accounts", metadata?.accounts || []);
        try {
          const exchangeResult = await callPlaidApi({
            title: "Exchange Public Token",
            endpoint: ENDPOINTS.exchangePublicToken,
            body: { public_token },
          });
          const exchangeData = unwrapPlaidResponse(exchangeResult);
          console.log("[Plaid Link] Token exchange result", exchangeData);
          if (exchangeData?.access_token) {
            updateField("access_token", exchangeData.access_token);
          }
        } finally {
          setIsLinkOpening(false);
          if (handler?.destroy) {
            handler.destroy();
          }
        }
      },
      onExit: (err, metadata) => {
        if (err) {
          pushLog("Plaid Link Exit", { error: err?.message || err, metadata });
        } else {
          pushLog("Plaid Link Closed", { metadata });
        }
        setIsLinkOpening(false);
        if (handler?.destroy) {
          handler.destroy();
        }
      },
    });

    handler.open();
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
    try {
      const res = await fetch(PLAID_ACCOUNTS_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: credentials.access_token }),
      });
      const json = await res.json();
      pushLog("Fetch Accounts (/accounts/get)", json);
      const data = unwrapPlaidResponse(json);
      if (data) {
        setFetchedData(data);
        console.log("[Plaid] Accounts response", data);
        if (data?.accounts) {
          console.log("[Plaid] Accounts", data.accounts);
        }
      }
    } catch (error) {
      pushLog("Fetch Accounts (/accounts/get)", { error: error?.message || "Unknown error" });
      toast({
        title: "Fetch accounts failed",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleFetchConsolidatedFinancialData = async () => {
    if (!credentials.access_token) {
      toast({
        title: "Missing access token",
        description: "Exchange the public token before fetching data.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    const result = await callPlaidApi({
      title: "Fetch Consolidated Financial Data (MuleSoft)",
      endpoint: ENDPOINTS.getUserFinancialData,
      method: "POST",
      overrideMethod: "GET",
      body: { access_token: credentials.access_token },
    });
    const data = unwrapPlaidResponse(result);
    if (data) {
      setFetchedData(data);
      console.log("[MuleSoft] Consolidated financial data", data);
    }
  };

  const handlePushToSupabase = async () => {
    if (!fetchedData) {
      toast({
        title: "No financial data",
        description: "Fetch financial data first so we can push it to Supabase.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    const agentPayload = {
      jsonrpc: "2.0",
      id: `task-${Date.now()}`,
      method: "tasks/send",
      params: {
        sessionId: `session-${Date.now()}`,
        message: {
          role: "user",
          parts: [
            {
              type: "text",
              text: `Create a user financial profile with the details below: ${JSON.stringify(fetchedData)}`,
            },
          ],
        },
      },
    };

    await callPlaidApi({
      title: "Push Data to Supabase (Creation Agent)",
      endpoint: ENDPOINTS.createProfileAgent,
      method: "POST",
      body: agentPayload,
      includeCredentials: false,
    });
  };

  return (
    <ContentWrapper>
      <Script
        src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
        strategy="afterInteractive"
        onLoad={() => setIsPlaidReady(true)}
      />
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
            <Flex gap={3} flexWrap="wrap" justify="center">
              <Button as={Link} href="/plaid-financial-profile-agent" colorScheme="blue" variant="solid">
                Profile Creation Agent
              </Button>
              <Button as={Link} href="/plaid-financial-profile-update-agent" variant="outline" colorScheme="blue">
                Profile Update Agent
              </Button>
            </Flex>
          </VStack>

          <Stack spacing={10}>
            <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} shadow="xl">
              <Heading size="md" mb={2}>
                Step 0 - Connect a Bank Account
              </Heading>
              <Text color="gray.600" mb={6}>
                Launch Plaid Link to connect a bank account. On success we capture the public token and automatically
                exchange it for an access token.
              </Text>
              <Box mb={5}>
                <Text fontSize="sm" fontWeight="600" color="gray.700" mb={2}>
                  Products requested in Link
                </Text>
                <CheckboxGroup value={linkProducts} onChange={setLinkProducts} colorScheme="blue">
                  <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                    <Checkbox value="transactions">Transactions</Checkbox>
                    <Checkbox value="investments">Investments</Checkbox>
                    <Checkbox value="liabilities">Liabilities</Checkbox>
                    <Checkbox value="assets">Assets</Checkbox>
                  </Stack>
                </CheckboxGroup>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  These should match the MuleSoft flow. Missing products can cause 400 errors downstream.
                </Text>
              </Box>
              <Flex gap={4} flexWrap="wrap">
                <Button
                  bgGradient="linear(135deg, #0C8CE9 0%, #5E5CE6 100%)"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  onClick={handleLaunchPlaidLink}
                  isLoading={isLinkOpening}
                  isDisabled={!isPlaidReady}
                >
                  Connect bank account
                </Button>
                <Button
                  variant="outline"
                  borderColor="#0C8CE9"
                  color="#0C8CE9"
                  _hover={{ bg: "rgba(12,140,233,0.08)" }}
                  onClick={handleCreateLinkToken}
                >
                  Create link token only
                </Button>
              </Flex>
              {linkToken && (
                <Box mt={4}>
                  <Text fontSize="sm" color="gray.600">
                    Current Link Token
                  </Text>
                  <Code display="block" whiteSpace="pre-wrap" mt={2}>
                    {linkToken}
                  </Code>
                </Box>
              )}
            </Box>

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
                    type="password"
                    value={credentials.client_id}
                    isReadOnly
                    placeholder="Loaded from .env"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Secret</FormLabel>
                  <Input
                    type="password"
                    value={credentials.secret}
                    isReadOnly
                    placeholder="Loaded from .env"
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
                    2.4 Fetch account details via Plaid /accounts/get
                  </Text>
                  <Button
                    bg="#1CB5A3"
                    color="white"
                    _hover={{ bg: "#13a291" }}
                    onClick={handleFetchFinancialData}
                  >
                    Fetch Account Details
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.5 Optional: fetch consolidated financial data via MuleSoft
                  </Text>
                  <Button
                    bg="#0C8CE9"
                    color="white"
                    _hover={{ bg: "#0B7BD1" }}
                    onClick={handleFetchConsolidatedFinancialData}
                  >
                    Fetch Consolidated Data (MuleSoft)
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700" textTransform="uppercase">
                    2.6 Push the unified payload to Supabase for storage
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
                Follow the buttons in order (1 to 6). Step 2.5 is optional if you want the MuleSoft consolidated flow. You can repeat steps with
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

