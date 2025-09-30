'use client'
import React, { useState, useCallback } from 'react'
import { Box, Stack, FormControl, FormLabel, Input, Textarea, HStack, Button } from '@chakra-ui/react'

export default function EmailComposer({ onSubmit, disabled }) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = useCallback(() => {
    const payload = {
      to,
      subject,
      body,
      mimeType: 'text/html',
    }
    onSubmit?.(payload)
  }, [to, subject, body, onSubmit])

  const isValid = to.trim() && subject.trim() && body.trim()

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="16px" p={4} bg="white">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="600">To</FormLabel>
          <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@example.com" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="600">Subject</FormLabel>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="600">Body (HTML supported)</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} placeholder="<html>...</html>" />
        </FormControl>
        <HStack>
          <Button onClick={handleSubmit} isDisabled={disabled || !isValid} bg="gray.900" color="white" _hover={{ bg: 'black' }} borderRadius="12px">Send Email</Button>
        </HStack>
      </Stack>
    </Box>
  )
}


