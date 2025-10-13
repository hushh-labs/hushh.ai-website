'use client'
import React, { useState, useCallback } from 'react'
import { Box, Stack, FormControl, FormLabel, Input, Textarea, HStack, Button } from '@chakra-ui/react'

export default function EmailComposer({ onSubmit, disabled }) {
  // Default values for easier testing
  const [to, setTo] = useState('maheshkmarreddysabbella@gmail.com')
  const [subject, setSubject] = useState('Profile Incomplete – Action Required ‼️')
  const [body, setBody] = useState(`<html>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<style>
body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
.container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
h1 { color: #333333; }
p { color: #555555; line-height: 1.5; }
.button { display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007bff; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-weight: bold; }
.footer { margin-top: 30px; font-size: 12px; color: #888888; text-align: center; }
</style>
</head>
<body>
<div class='container'>
<h1>Hi Mahesh kumar reddy sabbella,</h1>
<p>We noticed that some fields in your profile are missing. To enjoy a complete experience, please update your profile by clicking the button below:</p>
<a href='https://example.com/update-profile' class='button'>Update Profile</a>
<p>If you have already updated your profile, you can ignore this message.</p>
<div class='footer'>&copy; 2025 Hushh AI. All rights reserved.</div>
</div>
</body>
</html>`)

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


