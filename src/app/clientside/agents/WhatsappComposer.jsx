'use client'
import React, { useState, useCallback } from 'react'
import { Box, Stack, FormControl, FormLabel, Input, Select, HStack, Button, Text } from '@chakra-ui/react'

export default function WhatsappComposer({ onSubmit, disabled }) {
  const [to, setTo] = useState('')
  const [template, setTemplate] = useState('hello_world')
  const [language, setLanguage] = useState('en_US')
  
  // Three body parameters with default values
  const [customerName, setCustomerName] = useState('Mahesh')
  const [missingField1, setMissingField1] = useState('email')
  const [missingField2, setMissingField2] = useState('email')

  const handleSubmit = useCallback(() => {
    // Build parameters array based on template type
    let parametersArray = []
    
    if (template === 'profile_update') {
      // For profile_update template, include all 3 parameters
      parametersArray = [
        { type: 'text', text: customerName, parameter_name: 'customer_name' },
        { type: 'text', text: missingField1, parameter_name: 'missing_field1' },
        { type: 'text', text: missingField2, parameter_name: 'missing_field' }
      ]
    }
    // For hello_world, no parameters needed
    
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: template,
        language: { code: language },
        ...(parametersArray.length ? { 
          components: [{ 
            type: 'body', 
            parameters: parametersArray 
          }] 
        } : {}),
      },
    }
    onSubmit?.(payload)
  }, [to, template, language, customerName, missingField1, missingField2, onSubmit])

  const isValid = to.trim() && template.trim() && language.trim()

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="16px" p={4} bg="white">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="600">To (E.164 without +)</FormLabel>
          <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="919876543210" />
        </FormControl>
        
        <FormControl>
          <FormLabel fontWeight="600">Template Name</FormLabel>
          <Select value={template} onChange={(e) => setTemplate(e.target.value)} borderRadius="8px">
            <option value="hello_world">hello_world</option>
            <option value="profile_update">profile_update</option>
          </Select>
        </FormControl>
        
        <FormControl>
          <FormLabel fontWeight="600">Language</FormLabel>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en_US">en_US</option>
            <option value="en">en</option>
          </Select>
        </FormControl>

        {/* Show parameter fields only for profile_update template */}
        {template === 'profile_update' && (
          <Box borderWidth="1px" borderColor="gray.300" borderRadius="8px" p={4} bg="gray.50">
            <Text fontSize="sm" fontWeight="600" mb={3} color="gray.700">
              Body Parameters (for profile_update template)
            </Text>
            
            <Stack spacing={3}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="500">Customer Name</FormLabel>
                <Input 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  placeholder="Enter customer name"
                  bg="white"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="500">Missing Field 1</FormLabel>
                <Input 
                  value={missingField1} 
                  onChange={(e) => setMissingField1(e.target.value)} 
                  placeholder="e.g., email"
                  bg="white"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="500">Missing Field 2</FormLabel>
                <Input 
                  value={missingField2} 
                  onChange={(e) => setMissingField2(e.target.value)} 
                  placeholder="e.g., phone"
                  bg="white"
                />
              </FormControl>
            </Stack>
          </Box>
        )}

        <HStack>
          <Button onClick={handleSubmit} isDisabled={disabled || !isValid} bg="gray.900" color="white" _hover={{ bg: 'black' }} borderRadius="12px">
            Send WhatsApp Message
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}


