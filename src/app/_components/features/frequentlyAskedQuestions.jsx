'use client';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  Flex,
  Text,
  VStack,
  TabPanels,
  SimpleGrid,
  TabPanel,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import ContentWrapper from '../layout/ContentWrapper';
import ContactForm from './contactForm';

const FrequentlyAskedQuestions = () => {
  const products = [
    'Personal Data Agent',
    'Hush Vault',
    'Hush Link',
    'Hush Flow',
    'Hush Grid',
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const generalFaqs = [
    {
      question: 'Q: What core products and experiences does Hushh offer?',
      answer:
        'A: Hushh offers four core products: Vault (your encrypted personal data core), Link (cryptographic consent engine), Flow (monetization and rewards with consent), and Grid (secure agent execution). Together, they power experiences like Personal Data Agents (PDAs), trust-based data sharing, AI-powered assistants, and private data monetization — all consent-first by design.',
    },
    {
      question: 'Q. What is the mission of your company',
      answer:
        'A: Our company, focused on user data API (Visa for Data), aims to empower users to organize, manage, and extract meaningful value from their data. We prioritize ownership, observability, and control of user data and privacy preferences. Our mission is to help users understand the power of their personal data and turn it into a personal asset',
    },
    {
      question: 'Q. How does Hushh prioritise data privacy and user control?',
      answer:
        'A: Our company, focused on user data API (Visa for Data), aims to empower users to organize, manage, and extract meaningful value from their data. We prioritize ownership, observability, and control of user data and privacy preferences. Our mission is to help users understand the power of their personal data and turn it into a personal asset',
    },
  ];

  const pdaFaqs = [
    {
      question: 'Q1: What exactly is a Personal Data Agent (PDA)?',
      answer:
        'A: A PDA is your private AI — designed to work for you, not against you. It learns from your preferences, interacts on your behalf with apps and brands, and ensures that every action respects your consent through the Hushh Vault and Link.',
    },
    {
      question: 'Q2: How is it different from Siri, Alexa, or ChatGPT?',
      answer:
        'A: Unlike cloud-based assistants, your PDA lives in a consent-first environment. It doesn’t spy, sell your data, or assume permission. It connects to your life — calendar, emails, purchases — but only when you say so, and it logs everything for full visibility.',
    },
    {
      question: 'Q3: Can I customize my PDA for different roles?',
      answer:
        'A: Yes. You can run multiple agents — like a Shopping Agent, Health Agent, or Finance Agent — each with their own data scopes, memory access, and behavior rules. All are built on the same secure Vault and Grid foundation.',
    },
    {
      question: 'Q4: What platforms does the PDA support?',
      answer:
        'A: The PDA is cross-platform. It works on iOS, Android, and web, and integrates with Gmail, Apple Health, Notion, Spotify, Stripe, and more — with more integrations added regularly.',
    },
    {
      question: 'Q5: Who controls the agent’s memory and what it learns?',
      answer:
        'A: You do. All memories, insights, and logs are stored in your Hushh Vault. You can inspect, modify, export, or delete anything your agent learns — at any time, with a single tap.',
    },
  ];

  const vaultFaqs = [
    {
      question:
        'Q1: Is my data stored in the Hushh Vault accessible to Hushh or any third party?',
      answer:
        'A: No. The Hushh Vault enforces zero-trust architecture. Data is encrypted using AES-256 and only accessible with your signed consent. Even Hushh can’t access it without your approval.',
    },
    {
      question:
        'Q2: Can I use the Hushh Vault with my existing accounts like Apple Health and Gmail?',
      answer:
        'A: Yes. The Vault seamlessly integrates with iCloud, Gmail, Notion, Drive, Apple Health, and more. You choose what to connect, and all syncs require explicit consent.',
    },
    {
      question: 'What happens if I want to delete all my data?',
      answer:
        'A: You can export or delete your entire Vault with one tap. It supports full data liberation and complies with privacy laws like GDPR and India’s DPDP.',
    },
    {
      question:
        'Q4: How is this different from a password manager or cloud backup?',
      answer:
        'A: The Vault is not just secure storage — it’s a programmable, consent-native data core. It stores agent memories, user preferences, identity tokens, and enforces logic-based access boundaries.',
    },
  ];

  const servicesFaqs = [
    {
      question:
        'Q1: How does the Hushh Vault ensure encrypted, zero-trust data storage?',
      answer:
        'A: Hushh Vault uses AES-256 encryption, user-specific keys, and signed consent tokens. No access is allowed without your explicit approval, and every read/write is logged for full transparency.',
    },
    {
      question:
        'Q2: What makes Hushh Link different from traditional consent frameworks?',
      answer:
        "A: Hushh Link turns consent into code — using cryptographic tokens, real-time revocation, and detailed logs. It ensures agents and apps act only when you've explicitly agreed.",
    },
    {
      question:
        'Q3: How do agents use the Hushh Grid to run securely on any device?',
      answer:
        'A: Agents run in isolated environments — on-device, in-browser, or in the cloud. Each action passes through consent checks, ensuring secure, purpose-limited execution with full audit trails.',
    },
    {
      question: 'Q4: What can I earn by sharing data through Hushh Flow?',
      answer:
        'A: Earn rewards, credits, or cash when brands access your approved data. Every transaction is transparent, opt-in, and split fairly between you and the agent that facilitated it.',
    },
    {
      question:
        'Q5: How do Personal Data Agents customize my digital experiences?',
      answer:
        'A: PDAs learn your preferences, schedule, and interests. They help automate tasks, make recommendations, and interact with brands — always using your data with consent and keeping memory in your Vault.',
    },
    {
      question:
        'Q6: What is an MCP token, and why is it important for agent-to-agent sharing?',
      answer:
        "A: An MCP token is a signed, time-bound proof of consent. It enables agents to share specific data with one another securely — without exposing more than you've allowed.",
    },
  ];

  const linkFaqs = [
    {
      question: 'Q1: What is a consent token, and why does it matter?',
      answer:
        'A: A consent token is a cryptographically signed contract that defines who can access your data, for how long, and for why. No action can occur without one.',
    },
    {
      question: 'Q2: Can I revoke consent after I’ve granted it?',
      answer:
        'A: Absolutely. You can revoke any token in real time. As soon as you do, access is denied for that agent or app.',
    },
    {
      question:
        'Q3: What’s the difference between Hushh Link and a standard privacy toggle?',
      answer:
        'A: Standard toggles are UI-based and often vague. Hushh Link turns consent into code — a clear, enforceable digital contract between you and any accessing entity.',
    },
    {
      question: 'Q4: Do I need to approve every action manually?',
      answer:
        'A: Not necessarily. You can set granular rules like one-time access, session-based access, or specific scopes (e.g., calendar.read only). You’re always in control, but it’s designed to minimize friction.',
    },
    {
      question: 'Q5: Can developers embed Link into their own agents or apps?',
      answer:
        'A: Definitely. Link offers a developer-first API, GitHub templates, and SDKs to integrate consent validation into any app, agent, or brand workflow.',
    },
    {
      question: 'Q6: What happens if an agent tries to bypass consent?',
      answer:
        'A: It won’t work. All agent calls to the Vault or Flow must go through hushh.link.verifyConsent() — no token, no access. Every action is cryptographically enforced.',
    },
    {
      question: 'Q7: Can I see who accessed my data and when?',
      answer:
        'A: Yes. The Link logs every interaction — timestamp, agent ID, data scope, and result (success or rejection) — in a tamper-proof, user-viewable audit trail.',
    },
    {
      question: 'Q8: Is Hushh Link compliant with global privacy laws?',
      answer:
        'A: Yes. It’s built with GDPR, CCPA, and India DPDP compliance in mind. Consent is recorded, revocable, and fully auditable — giving you legal clarity and protection.',
    },
  ];

  const flowFaqs = [
    {
      question: 'Q1: How do I earn from my data using Hushh Flow?',
      answer:
        'A: Brands pay to access permissioned insights (like preferences or past purchases). You earn directly — in the form of money, credits, or rewards — each time you approve access.',
    },
    {
      question: 'Q2: Can I see exactly how much I’ve earned and why?',
      answer:
        'A: Yes. Every transaction is logged transparently, showing the brand, agent, scope of access, and your earnings — right down to the rupee or cent.',
    },
    {
      question: 'Q3: What kind of rewards or payments can I get?',
      answer:
        'A: You can earn through gift cards, premium AI features, cloud credits, direct transfers via Stripe, UPI, Apple Pay, and more — all depending on your preferences and consent.',
    },
    {
      question: 'Q4: Can I choose which brands see my data?',
      answer:
        'A: Yes. No brand gets access unless you explicitly allow it via a signed consent token. You’ll always know who’s requesting data, for what, and what you’ll earn.',
    },
    {
      question: 'Q5: Is Hushh Flow anonymous or tied to my identity?',
      answer:
        'A: You choose. Flow supports pseudonymous hushhID or named identity depending on the data and the transaction. You can even set TTLs and scope limits.',
    },
    {
      question: 'Q6: What if I no longer want to share data with a brand?',
      answer:
        'A: You can revoke that brand’s access instantly through the Hushh interface. Future requests will be blocked, and the revocation will be logged in your consent trail.',
    },
    {
      question: 'Q7: Can brands track me across apps or platforms?',
      answer:
        'A: No. Flow ends surveillance. Brands see only what you approve. There’s no cookie-based tracking or hidden analytics — just clean, consent-based insights.',
    },
    {
      question: 'Q8: How do developers and agents get paid in Flow?',
      answer:
        'A: When a user consents to share data, Flow splits the revenue transparently. Developers earn through agent fees; users earn rewards; brands pay for access — all logged on-chain-ready ledgers.',
    },
  ];

  const gridFaqs = [
    {
      question:
        'Q1: What is Hushh Grid and how is it different from running a normal app?',
      answer:
        'A: Hushh Grid is like Kubernetes for AI agents — built for consent-first execution. Each action runs in a secure sandbox, only if consent is verified via Hushh Link.',
    },
    {
      question: 'Q2: Can I deploy my own AI agent to the Grid?',
      answer:
        'A: Yes. Developers can build and deploy agents using the agentkit CLI, trigger tasks via voice or APIs, and even monetize them via marketplaces like OpenAI Agents or GCP.',
    },
    {
      question:
        'Q3: Can agents on Hushh Grid run on my device or just in the cloud?',
      answer:
        'A: Both. Hushh Grid supports edge (on-device/in-browser) and cloud (GCP, iCloud, AWS) execution. You can even move between them dynamically based on need.',
    },
    {
      question: 'Q4: Is every agent sandboxed?',
      answer:
        'A: Yes. Each agent runs in an isolated micro-environment with no persistent memory unless it explicitly writes to your Vault with consent.',
    },
    {
      question: 'Q5: How do agents interact with each other securely?',
      answer:
        'A: Agents use signed MCP (Micro Consent Protocol) tokens to share data. No agent can access another’s output without cryptographic proof of user-approved sharing.',
    },
    {
      question: 'Q6: What languages or tools can I use to build agents?',
      answer:
        'A: You can use TypeScript, Python, or Node.js. The agentkit/ CLI helps you scaffold, test, and deploy with integrated consent enforcement via Hushh Link.',
    },
    {
      question: 'Q7: How is agent execution audited?',
      answer:
        'A: Every task — from voice trigger to API response — is logged with scope, timestamp, success state, and duration. You can review exactly what each agent did and why.',
    },
    {
      question: 'Q8: Can I monetize my agents on the Grid?',
      answer:
        'A: Yes. Agents can be deployed to marketplaces like the OpenAI Agent Store or GCP Marketplace. Flow integration allows automated revenue sharing per use.',
    },
  ];

  const handleProductClick = product => {
    if (selectedProduct === product) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <>
      <ContentWrapper>
        <Box bg="#f5f5f7" py={{ base: '16', md: '28' }}>
          <VStack spacing={4} textAlign="center" mb={16}>
            <Heading
              as="h1"
              fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="1.1"
              color="black"
            >
              Frequently Asked Questions
            </Heading>
            <Text
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="700"
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
            >
              FAQs
            </Text>
          </VStack>
          <Flex justify="center" px={{ base: 4, md: 8 }}>
            <Tabs variant="unstyled" defaultIndex={1} w="full">
              <TabList
                bg="white"
                borderRadius="full"
                p={{ base: 1, md: 2 }}
                boxShadow="lg"
                border="1px solid"
                borderColor="gray.200"
                width="fit-content"
                mx="auto"
                overflowX="auto"
                scrollBehavior="smooth"
                sx={{
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <Tab
                  fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'xl' }}
                  color="gray.500"
                  fontWeight="medium"
                  py={{ base: 2, md: 3 }}
                  px={{ base: 2, sm: 3, md: 6 }}
                  whiteSpace="nowrap"
                  minW="fit-content"
                  _selected={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  General
                </Tab>
                <Tab
                  fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'xl' }}
                  color="gray.500"
                  fontWeight="medium"
                  py={{ base: 2, md: 3 }}
                  px={{ base: 2, sm: 3, md: 6 }}
                  whiteSpace="nowrap"
                  minW="fit-content"
                  _selected={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Products
                </Tab>
               
                <Tab
                  fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'xl' }}
                  color="gray.500"
                  fontWeight="medium"
                  py={{ base: 2, md: 3 }}
                  px={{ base: 2, sm: 3, md: 6 }}
                  whiteSpace="nowrap"
                  minW="fit-content"
                  _selected={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Services
                </Tab>
                <Tab
                  fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'xl' }}
                  color="gray.500"
                  fontWeight="medium"
                  py={{ base: 2, md: 3 }}
                  px={{ base: 2, sm: 3, md: 6 }}
                  whiteSpace="nowrap"
                  minW="fit-content"
                  _selected={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Contact us
                </Tab>
              </TabList>
              <TabPanels mt={12}>
                <TabPanel>
                  <Box mt={12} px={{ base: 4, md: 8 }}>
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacingX={12}
                      spacingY={8}
                    >
                      {generalFaqs.map(faq => (
                        <Box key={faq.question}>
                          <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            fontWeight="semibold"
                            color="black"
                          >
                            {faq.question}
                          </Text>
                          <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="gray.600"
                            mt={2}
                          >
                            {faq.answer}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Flex
                    wrap="wrap"
                    justify="center"
                    gap={{ base: 6, md: 10 }}
                    maxW={{ base: 'full', md: 'container.xl' }}
                    mx="auto"
                    px={{ base: 4, md: 0 }}
                  >
                    {products.map(product => (
                      <HStack
                        key={product}
                        cursor="pointer"
                        _hover={{ color: 'blue.500' }}
                        onClick={() => handleProductClick(product)}
                      >
                        <Text
                          fontSize={{ base: 'xl', md: '2xl' }}
                          fontWeight="medium"
                          color="#363636"
                        >
                          {product}
                        </Text>
                        <Icon
                          as={
                            selectedProduct === product
                              ? ChevronUpIcon
                              : ChevronDownIcon
                          }
                          w={5}
                          h={5}
                          color="gray.500"
                        />
                      </HStack>
                    ))}
                  </Flex>
                  {selectedProduct === 'Personal Data Agent' && (
                    <Box mt={12} px={{ base: 4, md: 8 }}>
                      <Heading
                        as="h3"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        // fontWeight="bold"
                        textAlign="center"
                        mb={8}
                        fontWeight="700"
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
                      >
                        Personal Data Agent (PDA)
                      </Heading>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacingX={12}
                        spacingY={8}
                      >
                        {pdaFaqs.map(faq => (
                          <Box key={faq.question}>
                            <Text
                              fontSize={{ base: 'lg', md: 'xl' }}
                              fontWeight="semibold"
                              color="black"
                            >
                              {faq.question}
                            </Text>
                            <Text
                              fontSize={{ base: 'md', md: 'lg' }}
                              color="gray.600"
                              mt={2}
                            >
                              {faq.answer}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  {selectedProduct === 'Hush Vault' && (
                    <Box mt={12} px={{ base: 4, md: 8 }}>
                      <Heading
                        as="h3"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        fontWeight="bold"
                        textAlign="center"
                        mb={8}
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
                      >
                        Hushh Vault
                      </Heading>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacingX={12}
                        spacingY={8}
                      >
                        {vaultFaqs.map(faq => (
                          <Box key={faq.question}>
                            <Text
                              fontSize={{ base: 'lg', md: 'xl' }}
                              fontWeight="semibold"
                              color="black"
                            >
                              {faq.question}
                            </Text>
                            <Text
                              fontSize={{ base: 'md', md: 'lg' }}
                              color="gray.600"
                              mt={2}
                            >
                              {faq.answer}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  {selectedProduct === 'Hush Link' && (
                    <Box mt={12} px={{ base: 4, md: 8 }}>
                      <Heading
                        as="h3"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        textAlign="center"
                        mb={8}
                        fontWeight="700"
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
                      >
                        Hushh Link
                      </Heading>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacingX={12}
                        spacingY={8}
                      >
                        {linkFaqs.map(faq => (
                          <Box key={faq.question}>
                            <Text
                              fontSize={{ base: 'lg', md: 'xl' }}
                              fontWeight="semibold"
                              color="black"
                            >
                              {faq.question}
                            </Text>
                            <Text
                              fontSize={{ base: 'md', md: 'lg' }}
                              color="gray.600"
                              mt={2}
                            >
                              {faq.answer}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  {selectedProduct === 'Hush Flow' && (
                    <Box mt={12} px={{ base: 4, md: 8 }}>
                      <Heading
                        as="h3"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        // fontWeight="bold"
                        textAlign="center"
                        mb={8}
                        fontWeight="700"
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
                      >
                        Hushh Flow
                      </Heading>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacingX={12}
                        spacingY={8}
                      >
                        {flowFaqs.map(faq => (
                          <Box key={faq.question}>
                            <Text
                              fontSize={{ base: 'lg', md: 'xl' }}
                              fontWeight="semibold"
                              color="black"
                            >
                              {faq.question}
                            </Text>
                            <Text
                              fontSize={{ base: 'md', md: 'lg' }}
                              color="gray.600"
                              mt={2}
                            >
                              {faq.answer}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  {selectedProduct === 'Hush Grid' && (
                    <Box mt={12} px={{ base: 4, md: 8 }}>
                      <Heading
                        as="h3"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        //  fontWeight="bold"
                        textAlign="center"
                        mb={8}
                        fontWeight="700"
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
                      >
                        Hushh Grid
                      </Heading>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacingX={12}
                        spacingY={8}
                      >
                        {gridFaqs.map(faq => (
                          <Box key={faq.question}>
                            <Text
                              fontSize={{ base: 'lg', md: 'xl' }}
                              fontWeight="semibold"
                              color="black"
                            >
                              {faq.question}
                            </Text>
                            <Text
                              fontSize={{ base: 'md', md: 'lg' }}
                              color="gray.600"
                              mt={2}
                            >
                              {faq.answer}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                </TabPanel>

                <TabPanel>
                  <Box mt={12} px={{ base: 4, md: 8 }}>
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacingX={12}
                      spacingY={8}
                    >
                      {servicesFaqs.map(faq => (
                        <Box key={faq.question}>
                          <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            fontWeight="semibold"
                            color="black"
                          >
                            {faq.question}
                          </Text>
                          <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="gray.600"
                            mt={2}
                          >
                            {faq.answer}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box mt={12} px={{ base: 4, md: 8 }}>
                    <Heading
                      as="h3"
                      fontSize={{ base: '2xl', md: '3xl' }}
                      textAlign="center"
                      mb={8}
                      fontWeight="700"
                      bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
                      bgClip="text"
                    >
                      Contact Information
                    </Heading>
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacingX={12}
                      spacingY={8}
                    >
                      <Box>
                        <Text
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontWeight="semibold"
                          color="black"
                        >
                          How you can reach out to us ?
                        </Text>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          color="gray.600"
                          mt={2}
                        >
                          sales@hushh.ai
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontWeight="semibold"
                          color="black"
                        >
                          Contact Number
                        </Text>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          color="gray.600"
                          mt={2}
                        >
                          call (888) 462-1726
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontWeight="semibold"
                          color="black"
                        >
                          Headquarters
                        </Text>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          color="gray.600"
                          mt={2}
                        >
                          Kirkland, WA
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </ContentWrapper>
      <ContactForm />
    </>
  );
};

export default FrequentlyAskedQuestions;