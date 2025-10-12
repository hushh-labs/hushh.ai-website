'use client'
import React, { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'

export default function UserDetailsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    countryCode: '+91',
    phoneNumber: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // E.164 format without + (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/
    return phoneRegex.test(phone)
  }

  const validateFullName = (name) => {
    return name.trim().length >= 2
  }

  const validateCountryCode = (code) => {
    const codeRegex = /^\+[0-9]{1,4}$/
    return codeRegex.test(code)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (!validateFullName(formData.fullName)) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    if (!formData.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required'
    } else if (!validateCountryCode(formData.countryCode)) {
      newErrors.countryCode = 'Please enter a valid country code (e.g., +91)'
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (10-15 digits, no spaces or symbols)'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before continuing',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    setIsSubmitting(true)
    try {
      await onSubmit?.(formData)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to analyze profile',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxW="container.md" py={{ base: 8, md: 12 }}>
      <Box
        bg="rgba(255, 255, 255, 0.03)"
        borderRadius="24px"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        p={{ base: 6, md: 10 }}
        shadow="xl"
      >
        <VStack spacing={6} align="stretch">
          <VStack spacing={3} align="center" textAlign="center">
            <Heading
              as="h1"
              className="form-header"
              sx={{
                fontSize: '2.5rem',
                fontWeight: 800,
                margin: '0 0 15px 0',
                background: 'linear-gradient(90deg, #06C270, #FF0080, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              INTELLIGENCE PORTAL
            </Heading>
            <Text color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
            Unlock comprehensive user insights with advanced AI-powered data analysis
            </Text>
            
            {/* Step indicator for mobile */}
            <HStack spacing={2} pt={2} display={{ base: 'flex', md: 'none' }}>
              <Box w={8} h={1} bg="green.400" borderRadius="full" />
              <Box w={8} h={1} bg="gray.700" borderRadius="full" />
              <Box w={8} h={1} bg="gray.700" borderRadius="full" />
            </HStack>
          </VStack>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel fontWeight="600" color="gray.300">
                  Email Address
                </FormLabel>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  size="lg"
                  borderRadius="12px"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)', borderColor: 'green.400' }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.fullName}>
                <FormLabel fontWeight="600" color="gray.300">
                  Full Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  size="lg"
                  borderRadius="12px"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)', borderColor: 'green.400' }}
                />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.countryCode}>
                <FormLabel fontWeight="600" color="gray.300">
                  Country Code
                </FormLabel>
                <Input
                  type="text"
                  placeholder="+91"
                  value={formData.countryCode}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === '' || value === '+' || /^\+[0-9]{0,4}$/.test(value)) {
                      handleChange('countryCode', value)
                    }
                  }}
                  size="lg"
                  borderRadius="12px"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)', borderColor: 'green.400' }}
                  maxLength={5}
                />
                <FormErrorMessage>{errors.countryCode}</FormErrorMessage>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Country calling code (e.g., +91 for India, +1 for USA)
                </Text>
              </FormControl>

              <FormControl isInvalid={!!errors.phoneNumber}>
                <FormLabel fontWeight="600" color="gray.300">
                  Phone Number
                </FormLabel>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                  size="lg"
                  borderRadius="12px"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)', borderColor: 'green.400' }}
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Enter phone number without country code (e.g., 9876543210)
                </Text>
              </FormControl>

              <Button
                type="submit"
                width="100%"
                size="lg"
                bg="green.500"
                color="white"
                _hover={{ bg: 'green.600' }}
                _active={{ bg: 'green.700' }}
                borderRadius="12px"
                fontWeight="600"
                isLoading={isSubmitting}
                loadingText="Analyzing Profile..."
                mt={4}
              >
                🚀 Analyze Profile
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}

