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
  useColorModeValue,
  Flex
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { FaUser, FaGlobe } from 'react-icons/fa'
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

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

  const inputBg = 'rgba(255, 255, 255, 0.05)'
  const inputBorder = 'rgba(255, 255, 255, 0.1)'
  const inputHover = 'rgba(255, 255, 255, 0.15)'
  const inputFocus = 'blue.500'

  return (
    <Container maxW="container.xl" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Flex
        w="full"
        direction={{ base: 'column', md: 'row' }}
        gap={12}
        align="center"
        justify="center"
      >
        {/* Left Side: Hero Text */}
        <VStack flex={1} align={{ base: 'center', md: 'flex-start' }} spacing={6} textAlign={{ base: 'center', md: 'left' }} mb={{ base: 10, md: 0 }}>
          <Box
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            <Heading size="4xl" fontWeight="900" letterSpacing="tight" lineHeight="1">
              HUSHH <br />
              INTELLIGENCE
            </Heading>
          </Box>
          <Text fontSize="xl" color="gray.400" maxW="lg">
            Unlock your complete digital identity. <br />
            Our agents analyze data from multiple sources to build your comprehensive profile.
          </Text>
        </VStack>

        {/* Right Side: Glass Form */}
        <MotionBox
          flex={1}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          maxW="500px"
          w="full"
        >
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="rgba(0,0,0,0.6)"
            backdropFilter="blur(20px)"
            borderRadius="3xl"
            border="1px solid rgba(255, 255, 255, 0.1)"
            p={{ base: 8, md: 10 }}
            boxShadow="0 0 40px rgba(0,0,0,0.5)"
            position="relative"
            overflow="hidden"
          >
            {/* Decorative Top Gradient */}
            <Box position="absolute" top={0} left={0} w="full" h="4px" bgGradient="linear(to-r, blue.500, purple.500)" />

            <VStack spacing={6}>
              <FormControl isInvalid={!!errors.fullName}>
                <FormLabel color="gray.400" fontSize="sm" fontWeight="bold" letterSpacing="wide">FULL NAME</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<Icon as={FaUser} color="gray.500" />} />
                  <Input
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    bg={inputBg} borderColor={inputBorder} color="white"
                    _hover={{ borderColor: inputHover }} _focus={{ borderColor: inputFocus }}
                    borderRadius="xl" height="50px"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel color="gray.400" fontSize="sm" fontWeight="bold" letterSpacing="wide">EMAIL ADDRESS</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<Icon as={EmailIcon} color="gray.500" />} />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    bg={inputBg} borderColor={inputBorder} color="white"
                    _hover={{ borderColor: inputHover }} _focus={{ borderColor: inputFocus }}
                    borderRadius="xl" height="50px"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <HStack w="full" spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.countryCode} w="100px">
                  <FormLabel color="gray.400" fontSize="sm" fontWeight="bold" letterSpacing="wide">CODE</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaGlobe} color="gray.500" fontSize="xs" ml={1} />} />
                    <Input
                      placeholder="+91"
                      value={formData.countryCode}
                      onChange={(e) => handleChange('countryCode', e.target.value)}
                      bg={inputBg} borderColor={inputBorder} color="white"
                      _hover={{ borderColor: inputHover }} _focus={{ borderColor: inputFocus }}
                      borderRadius="xl" height="50px" px={2} pl={8}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isInvalid={!!errors.phoneNumber} flex={1}>
                  <FormLabel color="gray.400" fontSize="sm" fontWeight="bold" letterSpacing="wide">PHONE NUMBER</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={PhoneIcon} color="gray.500" />} />
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                      bg={inputBg} borderColor={inputBorder} color="white"
                      _hover={{ borderColor: inputHover }} _focus={{ borderColor: inputFocus }}
                      borderRadius="xl" height="50px"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              </HStack>

              <Button
                type="submit"
                w="full"
                h="56px"
                borderRadius="xl"
                bgGradient="linear(to-r, blue.500, purple.600)"
                _hover={{ bgGradient: "linear(to-r, blue.600, purple.700)", transform: "translateY(-2px)", boxShadow: "xl" }}
                _active={{ transform: "scale(0.98)" }}
                isLoading={isSubmitting}
                loadingText="Initializing Agents..."
                fontSize="lg"
                fontWeight="bold"
                letterSpacing="wide"
                boxShadow="lg"
              >
                START ANALYSIS
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </Flex>
    </Container>
  )
}

