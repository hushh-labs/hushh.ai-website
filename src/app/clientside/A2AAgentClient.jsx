'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
  IconButton,
  Divider,
  Spinner,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { CopyIcon, RepeatIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'
import ContentWrapper from '../_components/layout/ContentWrapper'
import AgentSidebar from './agents/AgentSidebar'
import ChatThread from './agents/ChatThread'
import JsonRpcComposer from './agents/JsonRpcComposer'
import EmailComposer from './agents/EmailComposer'
import WhatsappComposer from './agents/WhatsappComposer'
import ProfileCreationDoc from './agents/ProfileCreationDoc'
import ProfileUpdateDoc from './agents/ProfileUpdateDoc'

// Agent configurations
const AGENTS = [
  { id: 'brand', name: 'Brand Agent', description: 'CRM user intelligence' },
  { id: 'hushh', name: 'Hushh Agent', description: 'Supabase data query agent' },
  { id: 'hushh-profile', name: 'Hushh Profile Creation Agent', description: 'Supabase profile onboarding' },
  { id: 'hushh-profile-update', name: 'Hushh Profile Update Agent', description: 'Supabase profile maintenance' },
  { id: 'public', name: 'Public Data Agent', description: 'OpenAI data enrichment' },
  { id: 'gemini', name: 'Gemini Agent', description: 'Gemini AI data enrichment' },
  { id: 'whatsapp', name: 'WhatsApp CRM Agent', description: 'Send WhatsApp messages' },
  { id: 'email', name: 'Email Integration Agent', description: 'Send transactional emails' },
]

const CHAT_ENABLED_AGENTS = ['brand', 'hushh', 'hushh-profile', 'hushh-profile-update', 'public', 'gemini']

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

  const userInitials = useMemo(() => initialsFromEmail(user?.email || 'you@hushh.ai'), [user?.email])

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
  }, [])

  const sendText = useCallback(async (text) => {
    const trimmed = (text || '').trim()
    if (!trimmed || loading) return
    const userMsg = { role: 'user', content: trimmed, id: `u-${Date.now()}` }
    setMessages(prev => [...prev, userMsg])
    setPrompt('')
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

  // Layout-only. Scrolling handled inside ChatThread.

  return (
    <ContentWrapper>
    <Box bg="#f5f5f7" color="gray.900" minH="100vh">
      <Container minW={'100%'} py={{ base: 3, md: 4 }} px={{ base: 3, md: 4 }} h="100vh">
        <Flex direction="column" gap={{ base: 3, md: 3 }} h="100%">
          {/* Header */}
          <Box
            bg="white"
            p={{ base: 4, md: 6 }}
            borderRadius={{ base: '12px', md: '16px' }}
            shadow="sm"
            flexShrink={0}
          >
            <Flex 
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'flex-start', md: 'center' }} 
              justify="space-between" 
              gap={3}
            >
              <Box>
                <Heading 
                  as="h1" 
                  size={{ base: 'md', md: 'lg' }} 
                  color="gray.900" 
                  fontWeight="700" 
                  fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                >
                  A2A Agents
                </Heading>
                <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }} mt={1}>
                  Chat with Brand, Hushh data query, Supabase profile creation, Supabase profile updates, Public Data, or Gemini agents
                </Text>
              </Box>
             
            </Flex>

            {/* Mobile Agent Selector */}
            <FormControl mt={4} display={{ base: 'block', md: 'none' }}>
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
                  boxShadow: '0 0 0 1px #1a202c'
                }}
              >
                {AGENTS.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} - {a.description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* <Accordion allowToggle borderRadius="12px" bg="white" borderWidth="1px" borderColor="gray.200">
            <AccordionItem border="0">
              <h2>
                <AccordionButton _expanded={{ bg: 'gray.50' }} borderRadius="12px">
                  <Box as="span" flex="1" textAlign="left" fontWeight="600">How to add agents (Domain Interaction Agent)</Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color="gray.700">
                <Text mb={2}>1) Open Interaction Agent UI and add agents:</Text>
                <Text mb={2}>• Agent URL — Brand: https://a2a-crm-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/crm-agent</Text>
                <Text mb={2}>• Agent URL — Hushh: https://hushh-supabase-query-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-query-agent</Text>
                <Text mb={2}>• Agent Type — mulesoft ai chain</Text>
                <Text>2) Save and verify by sending a simple query from the UI.</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> */}

          {/* Main Content */}
          <Flex flex="1" minH={0} gap={{ base: 0, md: 4 }} direction={{ base: 'column', md: 'row' }} overflow="hidden">
            {/* Desktop Sidebar - Sticky */}
            <Box 
              display={{ base: 'none', md: 'block' }}
              position={{ base: 'relative', md: 'sticky' }}
              top={0}
              alignSelf="flex-start"
              h="fit-content"
              maxH="calc(100vh - 200px)"
              overflowY="auto"
            >
              <AgentSidebar selected={agent} onSelect={setAgent} />
            </Box>

            {/* Chat Area - Full Height */}
            <Flex direction="column" flex="1" minH={0} gap={3} w="100%" h="100%">
              {CHAT_ENABLED_AGENTS.includes(agent) && (
                ['hushh-profile', 'hushh-profile-update'].includes(agent) ? (
                  <Flex direction="column" flex="1" minH={0} gap={3}>
                    {agent === 'hushh-profile' ? <ProfileCreationDoc /> : <ProfileUpdateDoc />}
                    <Box flex="1" minH={0} overflow="hidden">
                      <ChatThread messages={messages} loading={loading} error={error} userInitials={userInitials} />
                    </Box>
                  </Flex>
                ) : (
                  <Box
                    flex="1"
                    minH={0}
                    overflow="hidden"
                  >
                    <ChatThread messages={messages} loading={loading} error={error} userInitials={userInitials} />
                  </Box>
                )
              )}

              {/* Input Area - Fixed at Bottom */}
              <Box 
                bg="white" 
                borderRadius={{ base: '12px', md: '16px' }}
                p={{ base: 3, md: 4 }} 
                shadow="md"
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


