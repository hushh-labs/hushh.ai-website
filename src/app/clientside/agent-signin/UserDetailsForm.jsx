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
  Icon,
  InputGroup,
  InputLeftElement,
  Flex
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { FaUser, FaGlobe } from 'react-icons/fa'
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
// Font stack similar to Apple's San Francisco
const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

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
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone)
  const validateFullName = (name) => name.trim().length >= 2
  const validateCountryCode = (code) => /^\+[0-9]{1,4}$/.test(code)

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email required'
    if (!validateFullName(formData.fullName)) newErrors.fullName = 'Valid name required'
    if (!validateCountryCode(formData.countryCode)) newErrors.countryCode = 'Valid code required (+XX)'
    if (!validatePhone(formData.phoneNumber)) newErrors.phoneNumber = 'Valid phone required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit?.(formData)
    } catch (error) {
      toast({ status: 'error', title: 'Error', description: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Apple Light Theme Input Styles
  const inputBg = '#f5f5f7' // Light gray for inputs
  const inputBorder = 'transparent'
  const inputHover = '#e8e8ed'
  const inputFocus = '#0071e3' // Apple Blue

  return (
    <Box minH="100vh" bg="#f5f5f7"> {/* Global Light Background */}
      <Container maxW="container.xl" h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Flex
          w="full"
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 12, md: 24 }}
          align="center"
          justify="center"
        >
          {/* Left Side: Hero Text - Dark text for Light Mode */}
          <VStack flex={1} align={{ base: 'center', md: 'flex-start' }} spacing={4} textAlign={{ base: 'center', md: 'left' }} mb={{ base: 10, md: 0 }}>
            <Heading
              size="3xl"
              fontWeight="700"
              letterSpacing="tight"
              lineHeight="1.1"
              color="#1d1d1f" // Apple Black
              fontFamily={fontFamily}
            >
              Intelligence. <br />
              <span style={{ color: "#86868b" }}>Refined.</span>
            </Heading>
            <Text fontSize="2xl" color="#86868b" maxW="md" fontWeight="400" lineHeight="1.4" fontFamily={fontFamily}>
              Unlock your complete digital identity through our secure, agent-driven analysis.
            </Text>
          </VStack>

          {/* Right Side: White Card Form */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            maxW="480px"
            w="full"
          >
            <Box
              as="form"
              onSubmit={handleSubmit}
              bg="white" // White Card
              borderRadius="3xl"
              border="1px solid rgba(0,0,0,0.05)"
              p={{ base: 8, md: 10 }}
              boxShadow="0 20px 40px rgba(0,0,0,0.08)" // Soft shadow
            >
              <VStack spacing={5}>
                <FormControl isInvalid={!!errors.fullName}>
                  <FormLabel color="#86868b" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wider" mb={1} fontFamily={fontFamily}>Full Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaUser} color="gray.400" />} />
                    <Input
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      bg={inputBg} borderColor={inputBorder} color="#1d1d1f"
                      _hover={{ bg: inputHover }}
                      _focus={{
                        bg: "white",
                        borderColor: inputFocus,
                        boxShadow: `0 0 0 1px #0071e3`
                      }}
                      borderRadius="xl" height="48px"
                      fontSize="lg"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel color="#86868b" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wider" mb={1} fontFamily={fontFamily}>Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={EmailIcon} color="gray.400" />} />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      bg={inputBg} borderColor={inputBorder} color="#1d1d1f"
                      _hover={{ bg: inputHover }}
                      _focus={{
                        bg: "white",
                        borderColor: inputFocus,
                        boxShadow: `0 0 0 1px #0071e3`
                      }}
                      borderRadius="xl" height="48px"
                      fontSize="lg"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <HStack w="full" spacing={3} align="flex-start">
                  <FormControl isInvalid={!!errors.countryCode} w="90px">
                    <FormLabel color="#86868b" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wider" mb={1} fontFamily={fontFamily}>Code</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="+91"
                        value={formData.countryCode}
                        onChange={(e) => handleChange('countryCode', e.target.value)}
                        bg={inputBg} borderColor={inputBorder} color="#1d1d1f"
                        _hover={{ bg: inputHover }}
                        _focus={{
                          bg: "white",
                          borderColor: inputFocus,
                          boxShadow: `0 0 0 1px #0071e3`
                        }}
                        borderRadius="xl" height="48px" px={2} textAlign="center"
                        fontSize="lg"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isInvalid={!!errors.phoneNumber} flex={1}>
                    <FormLabel color="#86868b" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wider" mb={1} fontFamily={fontFamily}>Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" children={<Icon as={PhoneIcon} color="gray.400" />} />
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                        bg={inputBg} borderColor={inputBorder} color="#1d1d1f"
                        _hover={{ bg: inputHover }}
                        _focus={{
                          bg: "white",
                          borderColor: inputFocus,
                          boxShadow: `0 0 0 1px #0071e3`
                        }}
                        borderRadius="xl" height="48px"
                        fontSize="lg"
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                </HStack>

                <Button
                  type="submit"
                  w="full"
                  h="52px"
                  mt={4}
                  borderRadius="full"
                  bg="#0071e3" // Apple Link Blue
                  color="white"
                  _hover={{ bg: "#0077ED", transform: "scale(1.02)", boxShadow: "0 5px 15px rgba(0,113,227,0.3)" }}
                  _active={{ transform: "scale(0.98)" }}
                  isLoading={isSubmitting}
                  loadingText="Connecting..."
                  fontSize="lg"
                  fontWeight="600"
                  fontFamily={fontFamily}
                  transition="all 0.2s"
                >
                  Start Analysis
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  )
}
