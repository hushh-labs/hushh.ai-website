'use client'
import React, { useState, useCallback } from 'react'
import { Box, Stack, FormControl, FormLabel, Input, Select, Textarea, HStack, Button } from '@chakra-ui/react'

export default function WhatsappComposer({ onSubmit, disabled }) {
  const [to, setTo] = useState('')
  const [template, setTemplate] = useState('hello_world')
  const [language, setLanguage] = useState('en_US')
  const [parameters, setParameters] = useState('')

  const handleSubmit = useCallback(() => {
    // parameters: JSON array of objects for body components
    let parsedParams = []
    try {
      parsedParams = parameters.trim() ? JSON.parse(parameters) : []
    } catch {
      parsedParams = []
    }
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: template,
        language: { code: language },
        ...(parsedParams.length ? { components: [{ type: 'body', parameters: parsedParams }] } : {}),
      },
    }
    onSubmit?.(payload)
  }, [to, template, language, parameters, onSubmit])

  const isValid = to.trim() && template.trim() && language.trim()

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="16px" p={4} bg="white">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="600">To (E.164 without +)</FormLabel>
          <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="919876543210" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="600">Template name</FormLabel>
          <Input value={template} onChange={(e) => setTemplate(e.target.value)} placeholder="hello_world" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="600">Language</FormLabel>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en_US">en_US</option>
            <option value="en">en</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="600">Body parameters (JSON array)</FormLabel>
          <Textarea value={parameters} onChange={(e) => setParameters(e.target.value)} rows={4} placeholder='[{ "type": "text", "text": "Mahesh" }]' />
        </FormControl>
        <HStack>
          <Button onClick={handleSubmit} isDisabled={disabled || !isValid} bg="gray.900" color="white" _hover={{ bg: 'black' }} borderRadius="12px">Send WhatsApp</Button>
        </HStack>
      </Stack>
    </Box>
  )
}


