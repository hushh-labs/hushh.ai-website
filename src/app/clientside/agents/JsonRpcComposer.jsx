'use client'
import React, { useState, useCallback } from 'react'
import { Box, Stack, FormControl, FormLabel, Textarea, HStack, Button } from '@chakra-ui/react'

export default function JsonRpcComposer({ value, onChange, onSubmit, disabled }) {
  const [text, setText] = useState(value || '')

  const handleSubmit = useCallback(() => {
    if (!disabled) onSubmit?.(text)
  }, [text, onSubmit, disabled])

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="16px" p={4} bg="white">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="flex-end">
        <FormControl>
          <FormLabel fontWeight="600">Your message</FormLabel>
          <Textarea
            placeholder="Message A2A Agent…"
            value={text}
            onChange={(e) => { setText(e.target.value); onChange?.(e.target.value) }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (!disabled && text.trim()) handleSubmit()
              }
            }}
            rows={2}
            bg="white"
            borderRadius="12px"
          />
        </FormControl>
        <HStack spacing={2}>
          <Button onClick={handleSubmit} isDisabled={disabled || !text.trim()} bg="gray.900" color="white" _hover={{ bg: 'black' }} borderRadius="12px">Send</Button>
        </HStack>
      </Stack>
    </Box>
  )
}


