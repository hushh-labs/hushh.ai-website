"use client";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import FooterComponent from "./FooterComponent";
import CircelFormShadow from "../../_components/svg/circleFormShadow.svg";
import Image from "next/image";
import BigCircleFormShadow from "../../_components/svg/BigCircleFormShadow.svg";
import emailjs from "@emailjs/browser";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from 'next/navigation';

emailjs.init("_TMzDc8Bfy6riSfzq");

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formErrors, setFormErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState("");
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const form = useRef();
  const toast = useToast();
  const businessEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();
  
  // Auth context
  const { isAuthenticated, user, loading } = useAuth();
  
  // Auto-populate email if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.email && !email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user, email]);

  const freeEmailProviders = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    // Add more free email providers if needed
  ];

  const isBusinessEmail = (email) => {
    if (!businessEmailRegex.test(email)) {
      return false;
    }
    const domain = email.split("@")[1];
    return !freeEmailProviders.includes(domain);
  };

  const validateEmail = () => {
    const newErrors = { email: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isBusinessEmail(email)) {
      newErrors.email = "Please use a business email address";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isBusinessEmail(email)) {
      newErrors.email = "Please use a business email address";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // if (!number.trim()) {
    //   newErrors.number = "Phone number is required";
    //   isValid = false;
    // }

    setFormErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await sendEmail(data);
    reset(); // This will reset the form fields after submission
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthAlert(true);
      // Redirect to login page with current page as redirect parameter
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    
    // Use authenticated user's email instead of form email
    const emailToUse = user?.email || email;
    
    if (!validateForm()) {
      return;
    }
    const previousSubmissionTime = localStorage.getItem(
      `${emailToUse}_${firstName}`
    );

    if (previousSubmissionTime) {
      const currentTime = new Date().getTime();
      const timeDifference =
        (currentTime - new Date(previousSubmissionTime).getTime()) /
        (1000 * 3600);

      if (timeDifference < 2) {
        toast({
          title: "Please try again later!",
          description:
            "You have already submitted the form. Please try again after 2-3 hours",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    localStorage.setItem(`${emailToUse}_${fullName}`, new Date().toISOString());
    console.log("local Storage", localStorage);
    const serviceId = "service_kwvlp08";
    const templateId = "template_nc0x47v";
    const user_Id = "9KjZ-7TNPYvuqx3as";

    const templateParams = {
      from_name: firstName,
      from_lname: lastName,
      from_fullName: fullName,
      from_email: emailToUse, // Use authenticated user's email
      to_name: "Manish Sainani",
      message: message,
      subject: subject,
      number: number,
    };
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        user_Id
      );

      toast({
        title: "Form Submitted.",
        description: "Thank you for reaching out to us",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setNumber("");
      setFullName("");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Sending mail FAILED...", error.text);
    }
  };

  return (
    <>
      {/* Contact Form Section */}
      <Box 
        bg="#f5f5f7" 
        w="100%" 
        m={0} 
        p={0}
        sx={{
          '& .chakra-container': {
            paddingInlineStart: '0 !important',
            paddingInlineEnd: '0 !important',
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
          }
        }}
      >
        <VStack spacing={8} align="center" textAlign="center" py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }}>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontWeight="bold"
            color="black"
            lineHeight={{ base: 1.2, md: 1.25 }}
            letterSpacing={{ base: "-0.5px", md: "-1.3px" }}
          >
            Reach out to us
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="black"
            maxW={{ base: "full", md: "2xl" }}
          >
            Have questions about Hushh? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </VStack>

        <Box w="100%" px={{ base: 4, md: 8 }} pb={{ base: 12, md: 16 }}>
          <Box
            bg="white"
            borderRadius="2xl"
            shadow="xl"
            border="1px solid"
            borderColor="#e2e8f0"
            overflow="hidden"
            maxW="container.xl"
            mx="auto"
          >
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1.5fr" }}
              minH={{ base: "auto", lg: "600px" }}
            >
              {/* Left Side - Contact Info */}
              <GridItem>
                <Box
                  p={{ base: 8, md: 12 }}
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  h="full"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Background decoration */}
                  <Box
                    position="absolute"
                    top="-50px"
                    right="-50px"
                    w="200px"
                    h="200px"
                    bg="rgba(255,255,255,0.1)"
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    bottom="-100px"
                    left="-50px"
                    w="300px"
                    h="300px"
                    bg="rgba(255,255,255,0.05)"
                    borderRadius="full"
                  />

                  <VStack align="start" spacing={8} position="relative" zIndex={1}>
                    <VStack align="start" spacing={4}>
                      <Heading
                        as="h3"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        color="white"
                        lineHeight={1.2}
                      >
                        Connect with Hushh
                      </Heading>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color="rgba(255,255,255,0.9)"
                        lineHeight={1.6}
                      >
                        Say something to reach out to us
                      </Text>
                    </VStack>

                    <VStack align="start" spacing={6} w="full">
                      <HStack spacing={4} align="start">
                        <Box
                          w={6}
                          h={6}
                          bg="rgba(255,255,255,0.2)"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt={1}
                        >
                          <Text color="white" fontSize="sm">✉</Text>
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text color="rgba(255,255,255,0.8)" fontSize="sm">Email</Text>
                          <Link href="mailto:sales@hushh.ai">
                            <Text 
                              color="white" 
                              fontWeight="medium"
                              _hover={{ textDecoration: "underline" }}
                            >
                              sales@hushh.ai
                            </Text>
                          </Link>
                        </VStack>
                      </HStack>

                      <HStack spacing={4} align="start">
                        <Box
                          w={6}
                          h={6}
                          bg="rgba(255,255,255,0.2)"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt={1}
                        >
                          <Text color="white" fontSize="sm">📞</Text>
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text color="rgba(255,255,255,0.8)" fontSize="sm">Phone</Text>
                          <Link href="tel:+14252969050">
                            <Text 
                              color="white" 
                              fontWeight="medium"
                              _hover={{ textDecoration: "underline" }}
                            >
                              +1 (425) 296-9050
                            </Text>
                          </Link>
                        </VStack>
                      </HStack>

                      <HStack spacing={4} align="start">
                        <Box
                          w={6}
                          h={6}
                          bg="rgba(255,255,255,0.2)"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt={1}
                        >
                          <Text color="white" fontSize="sm">📍</Text>
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text color="rgba(255,255,255,0.8)" fontSize="sm">Address</Text>
                          <Text color="white" fontWeight="medium" lineHeight={1.5}>
                            Hushh.ai<br />
                            1021 5th St W<br />
                            Kirkland, WA 98033
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              </GridItem>

              {/* Right Side - Contact Form */}
              <GridItem>
                <Box p={{ base: 8, md: 12 }}>
                  {/* Authentication Alert */}
                  {showAuthAlert && !isAuthenticated && (
                    <Alert 
                      status="info" 
                      bg="rgba(0, 113, 227, 0.1)" 
                      border="1px solid rgba(0, 113, 227, 0.3)"
                      borderRadius="lg"
                      mb={6}
                    >
                      <AlertIcon color="#0071e3" />
                      <Box>
                        <AlertTitle color="#0071e3" fontSize="sm">Sign in required!</AlertTitle>
                        <AlertDescription color="black" fontSize="xs">
                          Please sign in to submit the contact form. Your email will be automatically filled.
                        </AlertDescription>
                      </Box>
                    </Alert>
                  )}
                  
                  <form onSubmit={sendEmail}>
                    <VStack spacing={6} align="stretch">
                      {/* Full Name */}
                      <VStack align="start" spacing={2}>
                        <Text 
                          fontSize="sm" 
                          fontWeight="medium" 
                          color="gray.700"
                        >
                          Full Name *
                        </Text>
                        <Input
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          h={12}
                          _placeholder={{ color: "gray.400" }}
                          _focus={{
                            borderColor: "#0071e3",
                            boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                            bg: "white"
                          }}
                        />
                        {formErrors.fullName && (
                          <Text color="red.500" fontSize="xs">
                            {formErrors.fullName}
                          </Text>
                        )}
                      </VStack>

                      {/* Email */}
                      <VStack align="start" spacing={2}>
                        <Text 
                          fontSize="sm" 
                          fontWeight="medium" 
                          color="gray.700"
                        >
                          Email Address *
                        </Text>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={isAuthenticated && user?.email ? user.email : email}
                          onChange={(e) => !isAuthenticated && setEmail(e.target.value)}
                          readOnly={isAuthenticated}
                          bg={isAuthenticated ? "gray.100" : "gray.50"}
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          h={12}
                          _placeholder={{ color: "gray.400" }}
                          _focus={{
                            borderColor: "#0071e3",
                            boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                            bg: "white"
                          }}
                          opacity={isAuthenticated ? 0.8 : 1}
                        />
                        {formErrors.email && (
                          <Text color="red.500" fontSize="xs">
                            {formErrors.email}
                          </Text>
                        )}
                      </VStack>

                      {/* Subject Selection */}
                      <VStack align="start" spacing={3}>
                        <Text 
                          fontSize="sm" 
                          fontWeight="medium" 
                          color="gray.700"
                        >
                          Select Subject
                        </Text>
                        <RadioGroup
                          value={subject}
                          onChange={(value) => setSubject(value)}
                        >
                          <VStack align="start" spacing={3}>
                            <Radio value="Explore Hushh Products" colorScheme="blue">
                              <Text fontSize="sm" color="gray.700">Explore Hushh Products</Text>
                            </Radio>
                            <Radio value="Partner with Hushh" colorScheme="blue">
                              <Text fontSize="sm" color="gray.700">Partner with Hushh</Text>
                            </Radio>
                            <Radio value="Get Support" colorScheme="blue">
                              <Text fontSize="sm" color="gray.700">Get Support</Text>
                            </Radio>
                          </VStack>
                        </RadioGroup>
                        {formErrors.subject && (
                          <Text color="red.500" fontSize="xs">
                            {formErrors.subject}
                          </Text>
                        )}
                      </VStack>

                      {/* Message */}
                      <VStack align="start" spacing={2}>
                        <Text 
                          fontSize="sm" 
                          fontWeight="medium" 
                          color="gray.700"
                        >
                          Message
                        </Text>
                        <Textarea
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          minH={32}
                          resize="vertical"
                          _placeholder={{ color: "gray.400" }}
                          _focus={{
                            borderColor: "#0071e3",
                            boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                            bg: "white"
                          }}
                        />
                        {formErrors.message && (
                          <Text color="red.500" fontSize="xs">
                            {formErrors.message}
                          </Text>
                        )}
                      </VStack>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        bg="#0071e3"
                        color="white"
                        size="lg"
                        h={12}
                        borderRadius="lg"
                        fontWeight="semibold"
                        _hover={{
                          bg: "#005bb5",
                          transform: "translateY(-1px)",
                          shadow: "lg"
                        }}
                        _active={{
                          bg: "#004494",
                          transform: "translateY(0)"
                        }}
                        transition="all 0.2s"
                        onClick={sendEmail}
                      >
                        Send Message
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <FooterComponent />
    </>
  );
}
