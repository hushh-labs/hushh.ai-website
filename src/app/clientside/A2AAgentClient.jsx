'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
  IconButton,
  Divider,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { CopyIcon, RepeatIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'
import HushhLogoS from '../_components/svg/hushhLogoS.svg'
import ContentWrapper from '../_components/layout/ContentWrapper'

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
  const listRef = useRef(null)
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

  const send = useCallback(async () => {
    if (!canSend) return
    const text = prompt.trim()
    const userMsg = { role: 'user', content: text, id: `u-${Date.now()}` }
    setMessages(prev => [...prev, userMsg])
    setPrompt('')
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/a2a/${agent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
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
  }, [agent, canSend, prompt, toast, extractText])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  return (
    <ContentWrapper>
    <Box bg="#f5f5f7" color="gray.900" minH="calc(100vh - 6rem)">
      <Container maxW="7xl" py={{ base: 6, md: 8 }}>
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

          <Flex flex="1" minH={0}>
            <Box ref={listRef} bg="white" borderRadius="20px" borderWidth="1px" borderColor="gray.200" p={{ base: 3, md: 4 }} flex="1" overflowY="auto" aria-live="polite">
              <VStack align="stretch" spacing={3}>
                {messages.length === 0 && !loading && (
                  <Text color="gray.500">Start by asking a question below.</Text>
                )}
                {messages.map(m => (
                  <HStack key={m.id} align="flex-start" spacing={3}>
                    {m.role === 'user' ? (
                      <Box w={8} h={8} borderRadius="full" bg="gray.800" color="white" display="flex" alignItems="center" justifyContent="center" fontWeight="600" fontSize="xs">
                        {userInitials}
                      </Box>
                    ) : (
                      <Box w={8} h={8} borderRadius="full" overflow="hidden" bg="gray.900">
                        <Image src={HushhLogoS} alt="Hushh Agent" width={32} height={32} />
                      </Box>
                    )}
                    <Box flex="1" bg={m.role === 'user' ? 'white' : 'gray.50'} borderWidth="1px" borderColor="gray.200" borderRadius="14px" px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
                      <Text fontSize="sm" color="gray.500" mb={1}>{m.role === 'user' ? 'You' : (m.agent === 'hushh' ? 'Hushh Agent' : 'Brand Agent')}</Text>
                      <Text whiteSpace="pre-wrap" lineHeight="1.7">{m.content}</Text>
                    </Box>
                  </HStack>
                ))}
                {loading && (
                  <HStack align="center" spacing={3}>
                    <Box w={8} h={8} borderRadius="full" overflow="hidden" bg={'gray.900'}>
                      <Image src={HushhLogoS} alt="Hushh Agent" width={32} height={32} />
                    </Box>
                    <HStack bg="gray.50" borderWidth="1px" borderColor="gray.200" borderRadius="12px" px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
                      <Spinner size="sm" />
                      <Text color="gray.600">Waiting for agent…</Text>
                    </HStack>
                  </HStack>
                )}
                {error && !loading && (
                  <Text color="red.600">{error}</Text>
                )}
              </VStack>
            </Box>
          </Flex>

          <Box position="sticky" bottom="0" bg="#f5f5f7" pb={2}>
            <Box borderWidth="1px" borderColor="gray.200" borderRadius="16px" p={4} bg="white">
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="flex-end">
                <FormControl maxW={{ md: 'xs' }}>
                  <FormLabel fontWeight="600">Agent</FormLabel>
                  <RadioGroup value={agent} onChange={setAgent} aria-label="Select agent">
                    <HStack spacing={6}>
                      <Radio value="brand">Brand</Radio>
                      <Radio value="hushh">Hushh</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600">Your message</FormLabel>
                  <Textarea
                    placeholder="Message A2A Agent…"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        if (!loading && canSend) send()
                      }
                    }}
                    rows={2}
                    bg="white"
                    borderRadius="12px"
                  />
                </FormControl>
                <HStack spacing={2}>
                  <Button onClick={send} isLoading={loading} isDisabled={!canSend} bg="gray.900" color="white" _hover={{ bg: 'black' }} borderRadius="12px">Send</Button>
                  <Button onClick={reset} variant="outline" leftIcon={<RepeatIcon />} borderRadius="12px">Reset</Button>
                  <IconButton aria-label="Copy last response" icon={<CopyIcon />} onClick={onCopy} variant="ghost" />
                </HStack>
              </Stack>
            </Box>
          </Box>

          <Divider />
          <Text color="gray.500" fontSize="sm">Requests are proxied server-side using the required JSON-RPC body.</Text>
        </Flex>
      </Container>
    </Box>
    </ContentWrapper>
  )
}


