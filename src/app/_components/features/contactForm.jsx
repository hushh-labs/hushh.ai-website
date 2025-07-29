'use client'
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Text,
  Grid,
  GridItem,
  useToast,
  Select,
  Link as ChakraLink,
  Container,
  Icon,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import FooterComponent from "./FooterComponent";
const MotionBox = motion(Box);

const ContactForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Please fill in all required fields correctly.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiData = {
        full_name: formData.name,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        subject: formData.subject || 'General Inquiry',
        message: formData.message
      };

      const response = await fetch('https://hushh-api-53407187172.us-central1.run.app/send-email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Box bg="white" w="100%" py={{ base: 16, md: 24 }}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 12, md: 16 }}
        >
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            fontWeight="700"
            bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
            bgClip="text"
            letterSpacing="-0.02em"
            fontFamily="Inter, sans-serif"
            mb={4}
          >
            Get in Touch
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            maxW="2xl"
            mx="auto"
            lineHeight={1.6}
          >
            Ready to take control of your data? Let's start a conversation about how Hushh can empower your digital journey.
          </Text>
        </MotionBox>

        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 12, lg: 16 }}
          alignItems="start"
        >
          {/* Contact Form */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              boxShadow="0 20px 60px rgba(0, 0, 0, 0.1)"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading size="lg" mb={6} color="gray.800" fontFamily="Inter, sans-serif">
                Send us a Message
              </Heading>
              
              <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                    <FormControl isRequired isInvalid={errors.name}>
                      <FormLabel fontWeight="600" color="gray.700">Full Name</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        size="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                        borderRadius="lg"
                      />
                      {errors.name && (
                        <Text color="red.500" fontSize="sm" mt={1}>{errors.name}</Text>
                      )}
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.email}>
                      <FormLabel fontWeight="600" color="gray.700">Email Address</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        size="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                        borderRadius="lg"
                      />
                      {errors.email && (
                        <Text color="red.500" fontSize="sm" mt={1}>{errors.email}</Text>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                    <FormControl>
                      <FormLabel fontWeight="600" color="gray.700">Company</FormLabel>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                        size="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                        borderRadius="lg"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="600" color="gray.700">Phone Number</FormLabel>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number (optional)"
                        size="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                        borderRadius="lg"
                      />
                    </FormControl>
                  </Grid>

                  <FormControl>
                    <FormLabel fontWeight="600" color="gray.700">Subject</FormLabel>
                    <Select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Select a subject"
                      size="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                      borderRadius="lg"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Demo">Product Demo</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Support">Support</option>
                      <option value="Investment">Investment</option>
                      <option value="Media">Media</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired isInvalid={errors.message}>
                    <FormLabel fontWeight="600" color="gray.700">Message</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or how we can help..."
                      size="lg"
                      rows={5}
                      borderColor="gray.300"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                      borderRadius="lg"
                    />
                    {errors.message && (
                      <Text color="red.500" fontSize="sm" mt={1}>{errors.message}</Text>
                    )}
                  </FormControl>

                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                    color="white"
                    fontWeight="600"
                    borderRadius="lg"
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    _hover={{
                      bg: "linear-gradient(135deg, #005bb5, #9a4fd1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 113, 227, 0.4)"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>
          </MotionBox>

          {/* Contact Information */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VStack spacing={8} align="stretch">
              {/* Contact Details */}
              <Box
                bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                color="white"
              >
                <Heading size="lg" mb={6} fontFamily="Inter, sans-serif">
                  Contact Information
                </Heading>
                
                <VStack spacing={6} align="stretch">
                  <HStack spacing={4}>
                    <Box
                      bg="rgba(255, 255, 255, 0.2)"
                      p={3}
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                    >
                      <Icon as={FiMail} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium" color="rgba(255,255,255,0.8)" fontSize="sm">Email</Text>
                      <ChakraLink href="mailto:sales@hushh.ai">
                        <Text 
                          fontWeight="medium"
                          _hover={{ textDecoration: "underline" }}
                        >
                          sales@hushh.ai
                        </Text>
                      </ChakraLink>
                    </VStack>
                  </HStack>

                  <HStack spacing={4}>
                    <Box
                      bg="rgba(255, 255, 255, 0.2)"
                      p={3}
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                    >
                      <Icon as={FiPhone} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium" color="rgba(255,255,255,0.8)" fontSize="sm">Phone</Text>
                      <ChakraLink href="tel:+18884621726">
                        <Text 
                          fontWeight="medium"
                          _hover={{ textDecoration: "underline" }}
                        >
                          +1 (888) 462-1726
                        </Text>
                      </ChakraLink>
                    </VStack>
                  </HStack>

                  <HStack spacing={4}>
                    <Box
                      bg="rgba(255, 255, 255, 0.2)"
                      p={3}
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                    >
                      <Icon as={FiMapPin} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium" color="rgba(255,255,255,0.8)" fontSize="sm">Address</Text>
                      <Text fontWeight="medium">
                        1021 5th St W<br />
                        Kirkland, WA 98033<br />
                        United States
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4}>
                    <Box
                      bg="rgba(255, 255, 255, 0.2)"
                      p={3}
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                    >
                      <Icon as={FiClock} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium" color="rgba(255,255,255,0.8)" fontSize="sm">Business Hours</Text>
                      <Text fontWeight="medium">
                        Monday - Friday<br />
                        9:00 AM - 6:00 PM PST
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>

              {/* Additional Info */}
              <Box
                bg="gray.50"
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.200"
              >
                <Heading size="md" mb={4} color="gray.800" fontFamily="Inter, sans-serif">
                  Ready to Get Started?
                </Heading>
                <Text color="gray.600" mb={4} lineHeight={1.6}>
                  Schedule a personalized demo to see how Hushh can transform your data strategy and empower your digital experiences.
                </Text>
                <Button
                  as={ChakraLink}
                  href="/demoBookingPage"
                  size="md"
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{
                    borderColor: "#0071E3",
                    color: "#0071E3",
                    transform: "translateY(-1px)"
                  }}
                  borderRadius="lg"
                  fontWeight="600"
                  w="full"
                  textDecoration="none !important"
                >
                  Schedule a Demo
                </Button>
              </Box>
            </VStack>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
    <FooterComponent />
    </>
  );
};

export default ContactForm; 