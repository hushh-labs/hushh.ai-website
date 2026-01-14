"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Spinner,
  Grid,
  GridItem,
  Card,
  CardBody,
  Divider,
  Image,
  Flex,
  Icon,
  Badge,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiShield, FiClock, FiCheck } from "react-icons/fi";
import { BiUser, BiMale, BiFemale } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdWork, MdOutlineWorkOutline } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";
import config from "../../lib/config/config";
import ContentWrapper from "../_components/layout/ContentWrapper";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// Force this page to be dynamic to handle OAuth parameters
export const dynamic = 'force-dynamic';

// API configuration - Updated to use new Hushh API
const API_BASE_URL = "https://hushh-api-53407187172.us-central1.run.app/api";
const API_HEADERS = {
  'Content-Type': 'application/json'
};

const REGISTRATION_STORAGE_KEY = "hushh-demo-profile:last-submission";

const UserRegistrationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const toast = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  // const [initialEmail, setInitialEmail] = useState(""); // Store the initial email for comparison - COMMENTED OUT FOR UPDATE MODE
  // const [isUpdateMode, setIsUpdateMode] = useState(false); // COMMENTED OUT FOR UPDATE MODE
  // const [userId, setUserId] = useState(null); // COMMENTED OUT FOR UPDATE MODE
  const [mounted, setMounted] = useState(false);
  
  // Form fields - Only the ones that can be updated
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [userCoins, setUserCoins] = useState(0); // COMMENTED OUT FOR UPDATE MODE
  const [investorType, setInvestorType] = useState("");
  
  // Form fields - Read-only for display purposes in update mode
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [reasonForUsingHushh, setReasonForUsingHushh] = useState("");

  // Form validation states
  const [errors, setErrors] = useState({});

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle OAuth authentication tokens on page load
  useEffect(() => {
    if (!mounted) return;

    const handleOAuthCallback = async () => {
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');
      const error = searchParams.get('error');
      
      if (error) {
        console.error('OAuth error:', error);
        toast({
          title: "Authentication Error",
          description: "There was an error during authentication. Please try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      
      if (accessToken && refreshToken) {
        setIsProcessingAuth(true);
        try {
          console.log('Processing OAuth tokens...');
          
          // Set the session with Supabase
          const { error: sessionError } = await config.supabaseClient.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            toast({
              title: "Authentication Error",
              description: "Failed to establish session. Please try again.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
            return;
          }
          
          console.log('OAuth authentication successful');
          toast({
            title: "🎉 Welcome to Hushh!",
            description: "Successfully signed in! Please complete your profile.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          // Clean up the URL by removing the auth parameters
          if (typeof window !== 'undefined') {
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
          
        } catch (error) {
          console.error('OAuth processing error:', error);
          toast({
            title: "Authentication Error",
            description: "An unexpected error occurred. Please try again.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } finally {
          setIsProcessingAuth(false);
        }
      }
    };
    
    handleOAuthCallback();
  }, [searchParams, toast, mounted]);

  useEffect(() => {
    if (authLoading || isProcessingAuth || !mounted) return;

    if (user?.email) {
      setUserEmail(user.email);
      // setInitialEmail(user.email); // Store the initial email - COMMENTED OUT FOR UPDATE MODE
      checkExistingUser(user.email);
    }
  }, [user?.email, authLoading, isProcessingAuth, mounted]);

  const checkExistingUser = async (email) => {
    try {
      console.log('Checking if user exists:', email);
      setIsCheckingUser(true);
      
      // Use the new Hushh API endpoint to check if user already exists
      const response = await fetch(
        `https://hushh-api-53407187172.us-central1.run.app/api/check-user?email=${email}`,
        { 
          method: 'GET',
          headers: API_HEADERS 
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        // Check if user exists based on the API response structure
        if (data && data.exists) {
          // User already exists, redirect to profile page instead of update mode
          console.log('User found, redirecting to profile page:', data);
          
          toast({
            title: "Welcome back!",
            description: "Your profile already exists. Redirecting to your profile page.",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
          
          setTimeout(() => {
            router.push('/user-profile');
          }, 1500);
          
          /* COMMENTED OUT UPDATE MODE LOGIC
          setIsUpdateMode(true);
          setUserId(userData.hushh_id);
          
          // Populate form fields with existing data - Only updatable fields
          setFirstName(userData.first_name || "");
          setLastName(userData.last_name || "");
          setPhoneNumber(userData.phone_number || "");
          setUserCoins(userData.user_coins || 0);
          setInvestorType(userData.investor_type || "");
          
          // Store read-only fields for display purposes
          setGender(userData.gender || "");
          setCountry(userData.country || "");
          setCity(userData.city || "");
          setDateOfBirth(userData.dob || "");
          setReasonForUsingHushh(userData.reason_for_using || "");
          
          console.log('User found, switched to update mode:', userData);
          */
        } else {
          console.log('User not found, staying in registration mode');
        }
      } else {
        console.error('API request failed:', response.status, response.statusText);
        const errorData = await response.json().catch(() => null);
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      // Continue with registration form even if API check fails
    } finally {
      setIsCheckingUser(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userEmail.trim()) newErrors.email = "Email is required";
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!investorType) newErrors.investorType = "Investor type is required";
    
    // Validate all fields for registration mode only
    if (!gender) newErrors.gender = "Gender is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!reasonForUsingHushh.trim()) newErrors.reasonForUsingHushh = "Reason for using Hushh is required";
    
    /* COMMENTED OUT UPDATE MODE VALIDATION
    // Only validate these fields if NOT in update mode
    if (!isUpdateMode) {
      if (!gender) newErrors.gender = "Gender is required";
      if (!country.trim()) newErrors.country = "Country is required";
      if (!city.trim()) newErrors.city = "City is required";
      if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!reasonForUsingHushh.trim()) newErrors.reasonForUsingHushh = "Reason for using Hushh is required";
    }
    */
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create user data object for registration only
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        phone_number: phoneNumber,
        investor_type: investorType,
        gender: gender,
        country: country,
        city: city,
        dob: dateOfBirth,
        reason_for_using: reasonForUsingHushh,
      };

      if (typeof window !== "undefined") {
        const storedUserData = {
          ...userData,
          savedAt: new Date().toISOString(),
        };

        window.localStorage.setItem(
          REGISTRATION_STORAGE_KEY,
          JSON.stringify(storedUserData),
        );
      }

      /* COMMENTED OUT UPDATE MODE LOGIC
      // Create user data object with only updatable fields - exact same as tech version
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        phone_number: phoneNumber,
        investor_type: investorType,
      };

      // If updating, include user_coins
      if (isUpdateMode) {
        userData.user_coins = userCoins;
      } else {
        // For new users, include all required fields
        userData.gender = gender;
        userData.country = country;
        userData.city = city;
        userData.dob = dateOfBirth;
        userData.reason_for_using = reasonForUsingHushh;
      }

      let response;
      
      if (isUpdateMode && userId) {
        // Update existing user with PATCH request - only updatable fields
        response = await fetch(
          `https://ibsisfnjxeowvdtvgzff.supabase.co/rest/v1/users?hushh_id=eq.${userId}`,
          {
            method: 'PATCH',
            headers: API_HEADERS,
            body: JSON.stringify(userData)
          }
        );
        
        // If email has been changed, update the Supabase auth email as well
        if (userEmail !== initialEmail && config.supabaseClient) {
          try {
            await config.supabaseClient.auth.updateUser({ email: userEmail });
            toast({
              title: "Email Update",
              description: "Your email has been updated. Please check your new email for a confirmation link.",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
          } catch (emailError) {
            console.error("Error updating email in auth:", emailError);
            toast({
              title: "Warning",
              description: "Your profile was updated, but there was an issue updating your email. Please try again later.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: "🎉 Profile Updated",
            description: "Your profile has been updated successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        // Create new user with POST request
        response = await fetch(
          "https://ibsisfnjxeowvdtvgzff.supabase.co/rest/v1/users",
          {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(userData)
          }
        );
        
        toast({
          title: "🎉 Registration Complete",
          description: "Your profile has been created successfully! Welcome to Hushh.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      */

      // Registration mode only - POST request using new API
      const response = await fetch(
        `https://hushh-api-53407187172.us-central1.run.app/api/hushhtech-wrapper`,
        {
          method: 'POST',
          headers: API_HEADERS,
          body: JSON.stringify(userData)
        }
      );
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Registration successful:', responseData);
        
        toast({
          title: "🎉 Registration Complete",
          description: "Your profile has been created successfully! Welcome to Hushh.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Dispatch custom event to trigger UserAvatar refresh
        console.log('🔥 Dispatching user registration complete event');
        window.dispatchEvent(new CustomEvent('userRegistrationComplete', {
          detail: { email: userEmail }
        }));
      } else {
        const errorData = await response.json().catch(() => null);
        console.error('Registration failed:', response.status, errorData);
        throw new Error(`Registration failed: ${response.status}`);
      }

    } catch (err) {
      console.error("Registration error:", err);
      setError(`An unexpected error occurred. Please try again later. Registration failed.`);
      toast({
        title: "Registration Error",
        description: "There was an error saving your profile. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      router.push("/user-profile");
    }
  };

  if (!mounted || authLoading || isProcessingAuth) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="lg" color="gray.600">
            {isProcessingAuth ? "Processing authentication..." : "Loading your account..."}
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <ContentWrapper includeHeaderSpacing={true}>
      <Box
        minH="100vh"
        bg="gray.50"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        <Container maxW="4xl">
        <MotionBox
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Header */}
          <MotionCard
            variants={childVariants}
            bg="white"
            boxShadow="lg"
            borderRadius="xl"
            p={{ base: 6, md: 8 }}
            mb={8}
          >
            <VStack spacing={4} textAlign="center">
              <Box
                w="80px"
                h="80px"
                bg="blue.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="lg"
              >
                <Icon as={FiUser} fontSize="2xl" color="white" />
              </Box>
              <VStack spacing={2}>
                <Heading
                  size="lg"
                  color="gray.800"
                  fontFamily="Inter, sans-serif"
                  fontWeight="700"
                >
                  Complete Your Profile
                </Heading>
                <Text color="gray.600" fontSize="md" maxW="500px">
                  Welcome to Hushh! Please provide the following information to complete your registration
                </Text>
              </VStack>
              {isCheckingUser && (
                <Badge colorScheme="blue" size="lg" borderRadius="full">
                  <Spinner size="sm" mr={2} />
                  Checking user status...
                </Badge>
              )}
              {!isCheckingUser && (
                <Badge colorScheme="purple" size="lg" borderRadius="full">
                  <Icon as={FiUser} mr={1} />
                  New User Registration
                </Badge>
              )}
            </VStack>
          </MotionCard>

          {/* Form */}
          <MotionCard
            variants={childVariants}
            bg="white"
            boxShadow="lg"
            borderRadius="xl"
            overflow="hidden"
          >
            <CardBody p={{ base: 6, md: 8 }}>
              {error && (
                <Alert status="error" mb={6} borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Box>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  {/* Investor Type Field - At the top */}
                  <FormControl isInvalid={errors.investorType}>
                    <FormLabel color="gray.700" fontWeight="600">
                      <Icon as={MdOutlineWorkOutline} mr={2} />
                      What type of investor are you?
                    </FormLabel>
                    <Select
                      value={investorType}
                      onChange={(e) => setInvestorType(e.target.value)}
                      placeholder="Select investor type"
                      bg="gray.50"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                    >
                      <option value="Individual Investor">Individual Investor</option>
                      <option value="Institutional / Corporate Investor">Institutional / Corporate Investor</option>
                    </Select>
                    <FormErrorMessage>{errors.investorType}</FormErrorMessage>
                  </FormControl>

                  {/* Name Fields */}
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                    <GridItem>
                      <FormControl isInvalid={errors.firstName}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiUser} mr={2} />
                          First Name
                        </FormLabel>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.lastName}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiUser} mr={2} />
                          Last Name
                        </FormLabel>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter your last name"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Contact Fields */}
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                    <GridItem>
                      <FormControl isInvalid={errors.email}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiMail} mr={2} />
                          Email Address
                        </FormLabel>
                        <Input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="Enter your email"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.phoneNumber}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiPhone} mr={2} />
                          Phone Number
                        </FormLabel>
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Additional Information */}
                  <Divider />
                  <Text fontSize="lg" fontWeight="600" color="gray.700" textAlign="center">
                    Additional Information
                  </Text>

                  {/* Gender and Location */}
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4} w="full">
                    <GridItem>
                      <FormControl isInvalid={errors.gender}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={BiUser} mr={2} />
                          Gender
                        </FormLabel>
                        <Select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          placeholder="Select gender"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </Select>
                        <FormErrorMessage>{errors.gender}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.country}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={IoLocationOutline} mr={2} />
                          Country
                        </FormLabel>
                        <Input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Enter your country"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.country}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.city}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiMapPin} mr={2} />
                          City
                        </FormLabel>
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Enter your city"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.city}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Date of Birth */}
                  <FormControl isInvalid={errors.dateOfBirth}>
                    <FormLabel color="gray.700" fontWeight="600">
                      <Icon as={FiCalendar} mr={2} />
                      Date of Birth
                    </FormLabel>
                    <Input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      bg="gray.50"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                    />
                    <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                  </FormControl>

                  {/* Reason for using Hushh */}
                  <FormControl isInvalid={errors.reasonForUsingHushh}>
                    <FormLabel color="gray.700" fontWeight="600">
                      <Icon as={FiEdit3} mr={2} />
                      Reason for using Hushh
                    </FormLabel>
                    <Textarea
                      value={reasonForUsingHushh}
                      onChange={(e) => setReasonForUsingHushh(e.target.value)}
                      placeholder="Tell us why you're interested in using Hushh"
                      bg="gray.50"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                      rows={4}
                    />
                    <FormErrorMessage>{errors.reasonForUsingHushh}</FormErrorMessage>
                  </FormControl>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    fontWeight="600"
                    w="full"
                    h="56px"
                    borderRadius="xl"
                    isLoading={isLoading}
                    loadingText="Completing Registration..."
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                  >
                    Complete Registration
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </MotionCard>

          {/* Footer */}
          <MotionBox
            variants={childVariants}
            textAlign="center"
            mt={8}
            py={6}
            px={4}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
          >
            <Text fontSize="sm" color="gray.600">
              By completing your profile, you agree to our{" "}
              <Link href="/legal/termsofuse">
                <Text as="span" color="blue.500" fontWeight="600" _hover={{ textDecoration: "underline" }}>
                  Terms of Service
                </Text>
              </Link>
              {" "}and{" "}
              <Link href="/legal/privacypolicy">
                <Text as="span" color="blue.500" fontWeight="600" _hover={{ textDecoration: "underline" }}>
                  Privacy Policy
                </Text>
              </Link>
            </Text>
          </MotionBox>
                  </MotionBox>
        </Container>
      </Box>
    </ContentWrapper>
    );
  };

// Main component with Suspense boundary
const UserRegistration = () => {
  return (
    <Suspense fallback={
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="lg" color="gray.600">
            Loading registration form...
          </Text>
        </VStack>
      </Box>
    }>
      <UserRegistrationContent />
    </Suspense>
  );
};

export default UserRegistration; 
