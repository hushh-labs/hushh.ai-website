'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  FormControl,
  FormLabel,
  Tag,
  Tooltip,
} from '@chakra-ui/react'
import { FiCopy, FiEyeOff, FiRotateCcw, FiZap } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import ContentWrapper from '../_components/layout/ContentWrapper'
import AgentSidebar from './agents/AgentSidebar'
import ChatThread from './agents/ChatThread'
import JsonRpcComposer from './agents/JsonRpcComposer'
import EmailComposer from './agents/EmailComposer'
import WhatsappComposer from './agents/WhatsappComposer'
import { AGENT_OPTIONS, CHAT_ENABLED_AGENT_IDS, getAgentOptionById } from './agents/agentOptions'

const PROMPT_TEMPLATES = {
  'hushh-profile': [
    {
      label: 'Create a profile with full details',
      text:
        'Can you create a user profile with the details below? {"fullName":"Amitabh Bachchan","phone":"+91 8266272888","email":"amitabh.bachchan@example.com","address":{"street":"Juhu Circle","city":"Mumbai","state":"Maharashtra","postalCode":"400049","country":"India"},"age":80,"gender":"Male","maritalStatus":"Married","householdSize":4,"childrenCount":2,"educationLevel":"Master\'s Degree","occupation":"Actor","incomeBracket":"High","homeOwnership":"Owned","cityTier":"Tier 1","transport":"Car","dietPreference":"Vegetarian","favoriteCuisine":"Indian","coffeeOrTeaChoice":"Tea","fitnessRoutine":"Yoga and Walking","gymMembership":"No","shoppingPreference":"Online and Local Markets","groceryStoreType":"Supermarket","fashionStyle":"Formal and Traditional","techAffinity":"Moderate","primaryDevice":"Smartphone","favoriteSocialPlatform":"Twitter","socialMediaUsageTime":"1-2 hours/day","contentPreference":"Movies and News","sportsInterest":"Cricket","gamingPreference":"Casual Gaming","travelFrequency":"2-3 times a year","ecoFriendliness":"High","sleepChronotype":"Morning Person","needs":["Health","Recognition","Quality Time"],"wants":["Luxury Travel","New Gadgets"],"desires":["Creative Expression","Social Impact"],"intents":{"24h":{"category":"Health","budget":"Low","timeWindow":"Today","confidence":"High"},"48h":{"category":"Entertainment","budget":"Medium","timeWindow":"This Weekend","confidence":"Medium"},"72h":{"category":"Travel","budget":"High","timeWindow":"Next Month","confidence":"Low"}}}',
    },
    {
      label: 'Onboard Sundhar Pichai',
      text:
        'Please create a profile for Sundhar Pichai with email sundar.pichai@google.com, phone +1 4085551234, occupation CEO, city Mountain View, and country USA.',
    },
  ],
  'hushh-profile-update': [
    {
      label: 'Update state for an existing record',
      text:
        'Can you update the state to AP for the user with phone +919346661428 and user ID d6f5fca9-924b-492e-95f6-55e81d405174?',
    },
    {
      label: 'Correct Sundhar Pichai\'s contact info',
      text:
        'Please update Sundhar Pichai’s city to Mountain View and email to sundar.pichai@google.com in the database having their +52 334i33 and user id d72882hgdt7889.',
    },
  ],
}

// Derive initials from an email address (first + last letter from local-part tokens)
function initialsFromEmail(email) {
  if (!email || typeof email !== 'string') return 'YO'
  const local = email.split('@')[0] || ''
  const cleaned = local.replace(/[^a-zA-Z._-]+/g, ' ')
  const parts = cleaned.split(/[._-]+|\s+/).filter(Boolean)
  if (parts.length === 0) return (local.slice(0, 2) || 'YO').toUpperCase()
  const first = parts[0]?.[0] || ''
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1]) || ''
  return (first + last).toUpperCase().slice(0, 2) || 'YO'
}

export default function A2AAgentClient() {
  const [agent, setAgent] = useState('brand')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()
  const [messages, setMessages] = useState([]) // { id, role: 'user'|'agent', content, agent? }
  const { user } = useAuth()
  const [showPromptPanel, setShowPromptPanel] = useState(true)

  const activeAgent = useMemo(() => getAgentOptionById(agent) || AGENT_OPTIONS[0], [agent])
  const accent = activeAgent?.accent || {}
  const promptColumns = useBreakpointValue({ base: 1, md: 2 })
  const hasAssistantReply = useMemo(() => messages.some((m) => m.role === 'agent'), [messages])
  const hasPrompts = Boolean(PROMPT_TEMPLATES[agent]?.length)

  const userInitials = useMemo(() => initialsFromEmail(user?.email || 'you@hushh.ai'), [user?.email])

  useEffect(() => {
    const defaultTemplate = PROMPT_TEMPLATES[agent]?.[0]?.text || ''
    setPrompt(defaultTemplate)
    setShowPromptPanel(Boolean(PROMPT_TEMPLATES[agent]?.length))
  }, [agent])

  const extractText = useCallback((payload) => {
    if (!payload || typeof payload !== 'object') return ''
    const tryPaths = [
      ['result', 'message', 'content'],
      ['result', 'message', 'text'],
      ['result', 'output'],
      ['result', 'content'],
      ['message', 'content'],
      ['message', 'text'],
      ['output', 'text'],
      ['output'],
      ['content'],
      ['text'],
    ]
    for (const path of tryPaths) {
      let node = payload
      for (const key of path) {
        if (node && typeof node === 'object' && key in node) node = node[key]
        else { node = undefined; break }
      }
      if (typeof node === 'string' && node.trim()) return node
    }
    const parts = payload?.result?.message?.parts || payload?.message?.parts || payload?.parts
    if (Array.isArray(parts)) {
      const texts = parts.map(p => (typeof p?.text === 'string' ? p.text : (typeof p === 'string' ? p : ''))).filter(Boolean)
      if (texts.length) return texts.join('\n')
    }
    const choices = payload?.choices
    if (Array.isArray(choices) && choices[0]?.message?.content) return choices[0].message.content
    const stack = [payload]
    while (stack.length) {
      const node = stack.pop()
      if (!node || typeof node !== 'object') continue
      for (const [k, v] of Object.entries(node)) {
        if (typeof v === 'string' && ['text','content','output','answer'].includes(k) && v.trim()) return v
        if (v && typeof v === 'object') stack.push(v)
      }
    }
    return ''
  }, [])

  const onCopy = useCallback(() => {
    const lastAssistant = [...messages].reverse().find(m => m.role === 'agent')
    if (!lastAssistant?.content) return
    navigator.clipboard.writeText(lastAssistant.content).then(() => {
      toast({ title: 'Copied response to clipboard', status: 'success', duration: 2000 })
    })
  }, [messages, toast])

  const reset = useCallback(() => {
    setMessages([])
    setError('')
    setLoading(false)
    setPrompt(PROMPT_TEMPLATES[agent]?.[0]?.text || '')
    setShowPromptPanel(Boolean(PROMPT_TEMPLATES[agent]?.length))
  }, [agent])

  const sendText = useCallback(async (text) => {
    const trimmed = (text || '').trim()
    if (!trimmed || loading) return
    const userMsg = { role: 'user', content: trimmed, id: `u-${Date.now()}` }
    setMessages(prev => [...prev, userMsg])
    setPrompt('')
    setShowPromptPanel(false)
    setLoading(true)
    setError('')
    try {
      // Call via Next.js API proxy
      const res = await fetch(`/api/a2a/${agent}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmed }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'Request failed')
        toast({ title: 'Request failed', status: 'error', duration: 3000 })
      }
      const content = extractText(json?.data) || extractText(json)
      const asstMsg = { role: 'agent', content: content || (json?.error ? `Error: ${json.error}` : 'No response'), agent, id: `a-${Date.now()}` }
      setMessages(prev => [...prev, asstMsg])
    } catch (e) {
      setError(e?.message || 'Network error')
      const asstMsg = { role: 'agent', content: 'Network error. Please try again.', agent, id: `a-${Date.now()}` }
      setMessages(prev => [...prev, asstMsg])
      toast({ title: 'Network error', status: 'error', duration: 3000 })
    } finally {
      setLoading(false)
    }
  }, [agent, loading, toast, extractText])

  const sendPayload = useCallback(async (payload, previewText) => {
    if (!payload || loading) return
    const preview = typeof previewText === 'string' && previewText.trim() ? previewText.trim() : JSON.stringify(payload, null, 2)
    const userMsg = { role: 'user', content: preview, id: `u-${Date.now()}` }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    setError('')
    setShowPromptPanel(false)
    try {
      // Call via Next.js API proxy with custom payload
      const res = await fetch(`/api/a2a/${agent}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'Request failed')
        toast({ title: 'Request failed', status: 'error', duration: 3000 })
      }
      const content = extractText(json?.data) || extractText(json)
      const asstMsg = { role: 'agent', content: content || (json?.error ? `Error: ${json.error}` : 'No response'), agent, id: `a-${Date.now()}` }
      setMessages(prev => [...prev, asstMsg])
    } catch (e) {
      setError(e?.message || 'Network error')
      const asstMsg = { role: 'agent', content: 'Network error. Please try again.', agent, id: `a-${Date.now()}` }
      setMessages(prev => [...prev, asstMsg])
      toast({ title: 'Network error', status: 'error', duration: 3000 })
    } finally {
      setLoading(false)
    }
  }, [agent, loading, toast, extractText])

  return (
    <ContentWrapper>
      <Box
        bgGradient="linear(180deg, #f4f6fb 0%, #eef2ff 100%)"
        color="gray.900"
        minH="100vh"
        py={{ base: 6, lg: 8 }}
      >
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Flex direction="column" gap={{ base: 6, lg: 8 }} minH="full">
            <Box
              bg="white"
              borderRadius={{ base: '16px', lg: '20px' }}
              shadow="xl"
              px={{ base: 5, md: 8 }}
              py={{ base: 6, md: 8 }}
            >
              <Stack spacing={{ base: 5, md: 6 }}>
                <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between" gap={{ base: 5, lg: 8 }}>
                  <Box flex="1">
                    <Text fontSize="xs" letterSpacing="widest" textTransform="uppercase" fontWeight="700" color="gray.500">
                      Agent Control Center
                    </Text>
                    <Heading
                      as="h1"
                      size={{ base: 'lg', lg: 'xl' }}
                      color="gray.900"
                      fontWeight="700"
                    >
                      Orchestrate every Hushh automation from one place
                    </Heading>
                    <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }} mt={3} maxW="3xl">
                      Choose an agent, drop in a natural language request, and receive Supabase-ready responses in seconds. Craft
                      new profiles, update existing records, or enrich your customer view without leaving this workspace.
                    </Text>
                  </Box>
                  <Box
                    borderRadius="18px"
                    p={{ base: 4, md: 5 }}
                    w={{ base: 'full', lg: '320px' }}
                    bgGradient={accent?.gradient || 'linear(135deg, #111827 0%, #1F2937 100%)'}
                    color="white"
                    shadow="lg"
                  >
                    <Stack spacing={4}>
                      <HStack spacing={3} align="center">
                        <Flex
                          align="center"
                          justify="center"
                          w={{ base: 12, md: 12 }}
                          h={{ base: 12, md: 12 }}
                          borderRadius="full"
                          bg="white"
                          color="gray.900"
                          shadow="sm"
                        >
                          {activeAgent?.icon ? <Icon as={activeAgent.icon} boxSize={6} /> : null}
                        </Flex>
                        <Box>
                          <Text fontSize="xs" textTransform="uppercase" fontWeight="700" opacity={0.75}>
                            Active Agent
                          </Text>
                          <Text fontWeight="700" fontSize={{ base: 'lg', md: 'xl' }}>
                            {activeAgent?.name}
                          </Text>
                        </Box>
                      </HStack>
                      <Box bg="white" borderRadius="16px" px={4} py={3} color={accent?.softText || '#1F2937'} shadow="sm">
                        <Text fontSize="sm" fontWeight="600" mb={1}>
                          {activeAgent?.description}
                        </Text>
                        <Text fontSize="xs" opacity={0.85}>
                          {activeAgent?.tagline}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                </Flex>
                <Divider borderColor="gray.100" />
                <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 4 }} align={{ base: 'flex-start', md: 'center' }}>
                  <FormControl display={{ base: 'block', md: 'none' }}>
                    <FormLabel fontSize="sm" fontWeight="600" color="gray.700" mb={2}>
                      Select Agent
                    </FormLabel>
                    <Select
                      value={agent}
                      onChange={(e) => setAgent(e.target.value)}
                      bg="gray.50"
                      borderColor="gray.200"
                      borderRadius="12px"
                      fontSize="sm"
                      fontWeight="500"
                      _focus={{
                        borderColor: 'gray.900',
                        bg: 'white',
                        boxShadow: '0 0 0 1px #1a202c',
                      }}
                    >
                      {AGENT_OPTIONS.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} — {a.description}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <HStack spacing={3} flexWrap="wrap">
                    <Tooltip
                      label={hasAssistantReply ? 'Copy the most recent agent message' : 'Send a prompt first to enable copying'}
                      hasArrow
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<FiCopy />}
                        borderRadius="12px"
                        onClick={onCopy}
                        isDisabled={!hasAssistantReply}
                      >
                        Copy last response
                      </Button>
                    </Tooltip>
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<FiRotateCcw />}
                      borderRadius="12px"
                      onClick={reset}
                    >
                      Reset conversation
                    </Button>
                    {hasPrompts && !showPromptPanel && (
                      <Button
                        size="sm"
                        leftIcon={<FiZap />}
                        borderRadius="12px"
                        onClick={() => setShowPromptPanel(true)}
                      >
                        Show prompt suggestions
                      </Button>
                    )}
                  </HStack>
                </Flex>
              </Stack>
            </Box>

            <Flex
              flex="1"
              minH={0}
              gap={{ base: 6, lg: 8 }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box
                display={{ base: 'none', lg: 'block' }}
                position="sticky"
                top={6}
                alignSelf="flex-start"
                minW="280px"
                maxW="300px"
              >
                <AgentSidebar selected={agent} onSelect={setAgent} />
              </Box>

              <Flex direction="column" flex="1" minH={0} gap={{ base: 4, md: 5 }}>
                {CHAT_ENABLED_AGENT_IDS.includes(agent) && (
                  <Flex direction="column" flex="1" minH={0} gap={{ base: 4, md: 5 }}>
                    {hasPrompts && (
                      <Collapse in={showPromptPanel} animateOpacity unmountOnExit>
                        <Box
                          bg="white"
                          borderRadius={{ base: '14px', md: '18px' }}
                          borderWidth="1px"
                          borderColor="gray.100"
                          shadow="lg"
                          p={{ base: 4, md: 5 }}
                        >
                          <Stack spacing={{ base: 4, md: 5 }}>
                            <HStack justify="space-between" align="flex-start">
                              <Box>
                                <HStack spacing={2}>
                                  <Tag size="sm" bg={accent?.tagBg || 'gray.100'} color={accent?.tagColor || 'gray.700'}>
                                    Supabase-ready prompt
                                  </Tag>
                                  <Badge colorScheme="gray" borderRadius="full" px={2} py={1} fontSize="0.6rem">
                                    {PROMPT_TEMPLATES[agent].length} templates
                                  </Badge>
                                </HStack>
                                <Text fontWeight="700" fontSize={{ base: 'md', md: 'lg' }} color="gray.800" mt={2}>
                                  Quick start prompts
                                </Text>
                                <Text fontSize={{ base: 'sm', md: 'sm' }} color="gray.500" mt={1}>
                                  Load a curated message to start your Supabase workflow faster. Edit anything in the composer before
                                  you send.
                                </Text>
                              </Box>
                              <Button
                                size="sm"
                                variant="ghost"
                                leftIcon={<FiEyeOff />}
                                onClick={() => setShowPromptPanel(false)}
                              >
                                Hide
                              </Button>
                            </HStack>
                            <SimpleGrid columns={promptColumns} spacing={{ base: 4, md: 5 }}>
                              {PROMPT_TEMPLATES[agent].map(({ label, text }) => (
                                <Box
                                  key={label}
                                  borderRadius="16px"
                                  borderWidth="1px"
                                  borderColor="gray.100"
                                  bg={accent?.softBg || 'gray.50'}
                                  shadow="sm"
                                  p={{ base: 4, md: 5 }}
                                  display="flex"
                                  flexDirection="column"
                                  gap={4}
                                >
                                  <Stack spacing={2}>
                                    <Text fontWeight="700" fontSize="sm" color={accent?.softText || 'gray.700'}>
                                      {label}
                                    </Text>
                                    <Box
                                      fontSize={{ base: 'sm', md: 'sm' }}
                                      color="gray.700"
                                      bg="white"
                                      borderRadius="12px"
                                      borderWidth="1px"
                                      borderColor="gray.100"
                                      p={3}
                                      maxH={{ base: '220px', md: '240px' }}
                                      overflowY="auto"
                                      sx={{
                                        '&::-webkit-scrollbar': {
                                          width: '6px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#CBD5F5',
                                          borderRadius: '8px',
                                        },
                                      }}
                                    >
                                      <Text whiteSpace="pre-wrap" fontSize="xs" lineHeight="1.6">
                                        {text}
                                      </Text>
                                    </Box>
                                  </Stack>
                                  <Button
                                    size="sm"
                                    leftIcon={<FiZap />}
                                    borderRadius="12px"
                                    onClick={() => {
                                      setPrompt(text)
                                      setShowPromptPanel(false)
                                    }}
                                  >
                                    Use this prompt
                                  </Button>
                                </Box>
                              ))}
                            </SimpleGrid>
                          </Stack>
                        </Box>
                      </Collapse>
                    )}

                    <Box flex="1" minH={0}>
                      <ChatThread messages={messages} loading={loading} error={error} userInitials={userInitials} />
                    </Box>
                  </Flex>
                )}

                <Box
                  bg="white"
                  borderRadius={{ base: '16px', md: '18px' }}
                  p={{ base: 4, md: 5 }}
                  shadow="xl"
                  flexShrink={0}
                >
                  {agent === 'email' ? (
                    <EmailComposer
                      disabled={loading}
                      onSubmit={(payload) => sendPayload(payload, `Send email to ${payload.to}`)}
                    />
                  ) : agent === 'whatsapp' ? (
                    <WhatsappComposer
                      disabled={loading}
                      onSubmit={(payload) => sendPayload(payload, `WhatsApp to ${payload.to} using template ${payload.template?.name}`)}
                    />
                  ) : (
                    <JsonRpcComposer
                      value={prompt}
                      disabled={loading}
                      onChange={setPrompt}
                      onSubmit={(text) => sendText(text)}
                      onReset={reset}
                    />
                  )}
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </ContentWrapper>
  )
}


