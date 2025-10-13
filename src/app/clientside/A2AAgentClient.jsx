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
} from '@chakra-ui/react'
import { CopyIcon, RepeatIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'
import ContentWrapper from '../_components/layout/ContentWrapper'
import AgentSidebar from './agents/AgentSidebar'
import ChatThread from './agents/ChatThread'
import JsonRpcComposer from './agents/JsonRpcComposer'
import EmailComposer from './agents/EmailComposer'
import WhatsappComposer from './agents/WhatsappComposer'
import { getAgentUrl, buildJsonRpcPayload } from '../../lib/config/agentConfig'

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
  const { user, isAuthenticated } = useAuth()

  const userInitials = useMemo(() => initialsFromEmail(user?.email || 'you@hushh.ai'), [user?.email])

  const canSend = prompt.trim().length > 0 && !loading

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
      // Get the direct agent URL and build payload
      const agentUrl = getAgentUrl(agent)
      const payload = buildJsonRpcPayload(trimmed)
      
      // Call the agent API directly (no proxy)
      const res = await fetch(agentUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'Request failed')
        toast({ title: 'Request failed', status: 'error', duration: 3000 })
      }
      const content = extractText(json?.result) || extractText(json?.data) || extractText(json)
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
      // Get the direct agent URL
      const agentUrl = getAgentUrl(agent)
      
      // Call the agent API directly (no proxy) with custom payload
      const res = await fetch(agentUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'Request failed')
        toast({ title: 'Request failed', status: 'error', duration: 3000 })
      }
      const content = extractText(json?.result) || extractText(json?.data) || extractText(json)
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
    <Box bg="#f5f5f7" color="gray.900" minH="calc(100vh - 2rem)">
      <Container minW="100%" py={{ base: 6, md: 8 }}>
        <Flex direction="column" gap={4} height="calc(100vh - 8rem)">
          <Flex align={{ base: 'flex-start', md: 'center' }} justify="space-between" wrap="wrap" gap={3}>
            <Box>
              <Heading as="h1" size="lg" color="gray.900" fontWeight="700" fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">A2A Agents</Heading>
              <Text color="gray.600" fontSize="sm">Ask the Brand or Hushh agents. Only the main answer text is shown.</Text>
            </Box>
            <HStack>
              <Button as="a" href="https://a2a-interaction-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/ui/index.html" target="_blank" rel="noopener noreferrer" variant="outline" borderRadius="12px">Interaction Agent UI</Button>
            </HStack>
          </Flex>

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
                <Text mb={2}>• Agent URL — Hushh: https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent</Text>
                <Text mb={2}>• Agent Type — mulesoft ai chain</Text>
                <Text>2) Save and verify by sending a simple query from the UI.</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> */}

          <Flex flex="1" minH={0} gap={3} direction={{ base: 'column', md: 'row' }}>
            <AgentSidebar selected={agent} onSelect={setAgent} />
            <Flex direction="column" flex="1" minH={0} gap={3}>
              {(agent === 'brand' || agent === 'hushh' || agent === 'public') && (
                <ChatThread messages={messages} loading={loading} error={error} userInitials={userInitials} />
              )}
              <Box>
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
                  />
                )}
                <HStack mt={2} justify="flex-end">
                  <Button onClick={reset} variant="outline" leftIcon={<RepeatIcon />} borderRadius="12px">Reset</Button>
                  <IconButton aria-label="Copy last response" icon={<CopyIcon />} onClick={onCopy} variant="ghost" />
                </HStack>
              </Box>
            </Flex>
          </Flex>

          {/* Composer moved into right content column so sidebar remains visible */}

          <Divider />
          <Text color="gray.500" fontSize="sm">Requests are proxied server-side using the required JSON-RPC body.</Text>
        </Flex>
      </Container>
    </Box>
    </ContentWrapper>
  )
}


