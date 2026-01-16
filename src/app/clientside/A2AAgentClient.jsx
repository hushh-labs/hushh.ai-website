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
  brand: [
    {
      label: 'Lookup user state by phone',
      text: 'Can you get the state of Sundar Pichai with phone +1 6505559001?'
    },
    {
      label: 'Fetch full brand profile',
      text: 'Can you fetch all the details of Sundar Pichai with phone +1 6505559001?'
    },
    {
      label: 'Retrieve user wants and desires',
      text: 'Can you fetch all the wants and desires of Sundar Pichai with phone +1 6505559001?'
    },
    {
      label: 'Check lifestyle preference',
      text: 'Does Sundar Pichai with phone +1 6505559001 like tea or coffee?'
    },
  ],
  hushh: [
    {
      label: 'Fetch Supabase user profile',
      text: 'Can you fetch all the details of Sundar Pichai with phone +1 6505559001?',
    },
    {
      label: 'Retrieve user intentions',
      text: 'Can you fetch all the intentions of Sundar Pichai with phone +1 6505559001?',
    },
    {
      label: 'Get user wants data',
      text: 'Can you fetch all the wants of Sundar Pichai with phone +1 6505559001?',
    },
    {
      label: 'Surface user desires',
      text: 'Can you fetch all the desires of Sundar Pichai with phone +1 6505559001?',
    },
  ],
  'supabase-profile-creation-agent': [
    {
      label: 'Create a profile with full details',
      text:
        'Can you create a user profile with the details below? {"fullName":"Sundar Pichai","phone":"+1 6505559001","email":"sundar.pichai@example.com","address":{"street":"1600 Amphitheatre Parkway","city":"Mountain View","state":"CA","postalCode":"94043","country":"USA"},"age":51,"gender":"Male","maritalStatus":"Married","householdSize":4,"childrenCount":2,"educationLevel":"Masters Degree","occupation":"CEO","incomeBracket":"High","homeOwnership":"Owned","cityTier":"Tier 1","transport":"Car","dietPreference":"Vegetarian","favoriteCuisine":"Indian","coffeeOrTeaChoice":"Tea","fitnessRoutine":"Walking","gymMembership":"No","shoppingPreference":"Online and In-Store","groceryStoreType":"Supermarket","fashionStyle":"Classic","techAffinity":"High","primaryDevice":"Smartphone","favoriteSocialPlatform":"LinkedIn","socialMediaUsageTime":"1-2 hours/day","contentPreference":"News and Technology","sportsInterest":"Cricket","gamingPreference":"None","travelFrequency":"2-3 times a year","ecoFriendliness":"High","sleepChronotype":"Morning Person","needs":["Innovation","Efficiency","Privacy"],"wants":["AI Tools","Leadership Insights"],"desires":["Sustainable Impact","Global Reach"],"intents":{"24h":{"category":"Work","budget":"N/A","timeWindow":"Today","confidence":"High"},"48h":{"category":"Family","budget":"Medium","timeWindow":"Weekend","confidence":"Medium"},"72h":{"category":"Travel","budget":"High","timeWindow":"Next Month","confidence":"Low"}}}',
    },
    {
      label: 'Onboard Sundar Pichai',
      text:
        'Please create a profile for Sundar Pichai with email sundar.pichai@example.com, phone +1 6505559001, occupation CEO, city Mountain View, and country USA.',
    },
  ],
  'hushh-profile-update': [
    {
      label: 'Update state for an existing record',
      text:
        'Can you update the state to CA for the user with phone +1 6505559001?',
    },
    {
      label: 'Correct Sundar Pichai contact info',
      text:
        'Please update Sundar Pichai city to Mountain View and email to sundar.pichai@example.com for phone +1 6505559001.',
    },
  ],
  gemini: [
    {
      label: 'Enrich via Gemini Public Data Agent',
      text:
        "Using the Gemini Public Data Agent, provide a detailed JSON profile for Sundar Pichai with phone +1 6505559001 and email sundar.pichai@example.com. Include every possible field such as full name, phone, email, address, age, gender, marital status, household size, children count, education level, occupation, income bracket, home ownership, city tier, transport, diet preference, favorite cuisine, coffee or tea choice, fitness routine, gym membership, shopping preference, grocery store type, fashion style, tech affinity, primary device, favorite social platform, social media usage time, content preference, sports interest, gaming preference, travel frequency, eco-friendliness, sleep chronotype, needs, wants, desires, and intents for 24h, 48h, and 72h with category, budget, time window, and confidence.",
    },
    {
      label: 'Compose Gemini JSON-RPC request',
      text: `{
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
          "text": "Can you enrich this lead with a comprehensive userProfile JSON using their name, email, and phone number via the Gemini Public Data Agent?"
        }
      ]
    }
  }
}`,
    },
    {
      label: 'Summarize Gemini integration steps',
      text:
        'Summarize the workflow for the GeminiAI Public Data Agent from the user entering basic identifiers in Hushh through MuleSoft orchestration, enrichment, storage, and dashboard visualization.',
    },
  ],
  public: [
    {
      label: 'Enrich Sundar Pichai public profile',
      text:
        "Can you provide me with a detailed JSON profile of Sundar Pichai with phone +1 6505559001 and email sundar.pichai@example.com that includes every available field such as full name, phone, email, address, age, gender, marital status, household size, children count, education level, occupation, income bracket, home ownership, city tier, transport, diet preference, favorite cuisine, coffee or tea choice, fitness routine, gym membership, shopping preference, grocery store type, fashion style, tech affinity, primary device, favorite social platform, social media usage time, content preference, sports interest, gaming preference, travel frequency, eco-friendliness, sleep chronotype, needs, wants, desires, and intents for 24h, 48h, and 72h with category, budget, time window, and confidence?",
    },
    {
      label: 'Draft JSON-RPC request payload',
      text: `{
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
          "text": "Generate a comprehensive userProfile JSON for a new lead using their name, email, and phone number."
        }
      ]
    }
  }
}`,
    },
    {
      label: 'Summarize integration workflow',
      text:
        'Outline the step-by-step workflow for how the OpenAI Public Data Agent enriches a profile inside Hushh, starting from the user input and ending with dashboard visualization.',
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

function normalizePhoneInText(value) {
  if (!value || typeof value !== 'string') return value
  const phonePattern = /(\+?\d[\d\s().-]{7,}\d)/g
  return value.replace(phonePattern, (match) => {
    const digits = match.replace(/[^\d]/g, '')
    if (!digits) return match
    const hasPlus = match.trim().startsWith('+')
    return hasPlus ? `+${digits}` : digits
  })
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

  const findAgentIdFromValue = useCallback((value) => {
    if (!value || typeof value !== 'string') return null
    const normalized = value.replace(/^#/, '').trim().toLowerCase()
    if (!normalized) return null
    const match = AGENT_OPTIONS.find((option) => {
      const optionId = option.id?.toLowerCase()
      const slug = option.slug?.toLowerCase()
      return optionId === normalized || (slug && slug === normalized)
    })
    return match?.id || null
  }, [])

  const syncUrlWithAgent = useCallback((nextId) => {
    if (typeof window === 'undefined') return
    const searchParams = new URLSearchParams(window.location.search)
    if (nextId) {
      searchParams.set('agent', nextId)
    } else {
      searchParams.delete('agent')
    }
    const queryString = searchParams.toString()
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${nextId ? `#${nextId}` : ''}`
    window.history.replaceState(null, '', newUrl)
  }, [])

  const handleAgentSelect = useCallback((nextId) => {
    if (!nextId) return
    const match = getAgentOptionById(nextId)
    if (!match) return
    setAgent(nextId)
    syncUrlWithAgent(nextId)
  }, [syncUrlWithAgent])

  useEffect(() => {
    const applyUrlAgent = () => {
      if (typeof window === 'undefined') return
      const searchParams = new URLSearchParams(window.location.search)
      const queryAgent = findAgentIdFromValue(searchParams.get('agent'))
      const hashAgent = findAgentIdFromValue(window.location.hash)
      const targetAgent = queryAgent || hashAgent
      if (targetAgent) {
        setAgent((prev) => prev === targetAgent ? prev : targetAgent)
      }
    }

    applyUrlAgent()
    window.addEventListener('hashchange', applyUrlAgent)
    window.addEventListener('popstate', applyUrlAgent)

    return () => {
      window.removeEventListener('hashchange', applyUrlAgent)
      window.removeEventListener('popstate', applyUrlAgent)
    }
  }, [findAgentIdFromValue])

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
        if (typeof v === 'string' && ['text', 'content', 'output', 'answer'].includes(k) && v.trim()) return v
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
    const shouldNormalizePhone = ['brand', 'hushh', 'supabase-profile-creation-agent', 'hushh-profile-update'].includes(agent)
    const normalizedText = shouldNormalizePhone ? normalizePhoneInText(trimmed) : trimmed
    const userMsg = { role: 'user', content: normalizedText, id: `u-${Date.now()}` }
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
        body: JSON.stringify({ text: normalizedText }),
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
                      onChange={(e) => handleAgentSelect(e.target.value)}
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
                <AgentSidebar selected={agent} onSelect={handleAgentSelect} />
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
                                    Ready prompt
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



