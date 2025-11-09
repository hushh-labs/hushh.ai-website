'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, Stack, FormControl, FormLabel, Textarea, HStack, Button } from '@chakra-ui/react'
import { FiSend, FiRotateCcw } from 'react-icons/fi'

export default function JsonRpcComposer({ value, onChange, onSubmit, onReset, disabled }) {
  const [text, setText] = useState(value || '')

  // Sync internal state with prop value (resets when parent clears it)
  useEffect(() => {
    setText(value || '')
  }, [value])

  const handleSubmit = useCallback(() => {
    if (!disabled && text.trim()) {
      onSubmit?.(text)
      // Don't clear here - let parent handle it via value prop
    }
  }, [text, onSubmit, disabled])

  return (
    <Box>
      <FormControl>
        <FormLabel
          fontWeight="600"
          fontSize="sm"
          color="gray.700"
          mb={2}
          display={{ base: 'none', md: 'block' }}
        >
          Your message
        </FormLabel>
        <Stack spacing={3}>
          <Textarea
            placeholder="Type your message here…"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              onChange?.(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (!disabled && text.trim()) handleSubmit()
              }
            }}
            rows={4}
            bg="gray.50"
            borderRadius="16px"
            borderWidth="1px"
            borderColor="gray.200"
            _focus={{
              borderColor: 'gray.900',
              bg: 'white',
              boxShadow: '0 0 0 1px #1a202c',
            }}
            fontSize={{ base: 'sm', md: 'md' }}
            resize="none"
            minH={{ base: '80px', md: '110px' }}
            shadow="inner"
          />
          <HStack justify="flex-start" spacing={3}>
            <Button
              onClick={() => {
                setText('')
                onChange?.('')
                onReset?.()
              }}
              variant="outline"
              leftIcon={<FiRotateCcw />}
              borderRadius="14px"
              size={{ base: 'sm', md: 'md' }}
            >
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              isDisabled={disabled || !text.trim()}
              bg="gray.900"
              color="white"
              _hover={{ bg: 'black' }}
              _disabled={{ bg: 'gray.300', cursor: 'not-allowed' }}
              _active={{ bg: 'black' }}
              borderRadius="14px"
              px={{ base: 6, md: 7 }}
              h={{ base: '44px', md: '48px' }}
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="600"
              leftIcon={<FiSend />}
            >
              {disabled ? 'Sending…' : 'Send message'}
            </Button>
          </HStack>
        </Stack>
      </FormControl>
    </Box>
  )
}
