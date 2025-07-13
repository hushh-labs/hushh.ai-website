"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Avatar,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiEdit3, 
  FiShield, 
  FiClock, 
  FiCheck,
  FiSettings,
  FiLogOut,
  FiSave,
  FiX
} from "react-icons/fi";
import { BiUser, BiMale, BiFemale } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdWork, MdOutlineWorkOutline } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";
import HushhLogo from "../_components/svg/hushhLogoS.svg";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// API configuration - Using the same API configuration as UserRegistration
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const API_BASE_URL = "https://hushh-api-53407187172.us-central1.run.app";
const API_HEADERS = {
  'api_key': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

const UserProfile = () => {
  const router = useRouter();
  const { user, session, loading: authLoading, signOut } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form fields for editing
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  const [investorType, setInvestorType] = useState("");
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

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    if (user?.email) {
      fetchUserProfile(user.email);
    }
  }, [user, authLoading, router]);

  const fetchUserProfile = async (email) => {
    try {
      setIsLoadingProfile(true);
      console.log('Fetching user profile:', email);
      
      const response = await fetch(
        `https://hushh-api-53407187172.us-central1.run.app/api/check-user?email=${email}`,
        { headers: API_HEADERS }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Profile API Response:', data);
        
        if (data && data.length > 0) {
          const profileData = data[0];
          setUserData(profileData);
          
          // Populate form fields for editing
          setFirstName(profileData.first_name || "");
          setLastName(profileData.last_name || "");
          setPhoneNumber(profileData.phone_number || "");
          setUserCoins(profileData.user_coins || 0);
          setInvestorType(profileData.investor_type || "");
          setGender(profileData.gender || "");
          setCountry(profileData.country || "");
          setCity(profileData.city || "");
          setDateOfBirth(profileData.dob || "");
          setReasonForUsingHushh(profileData.reason_for_using || "");
        } else {
          // User not found in database, redirect to registration
          router.push('/user-registration');
        }
      } else {
        console.error('Profile API request failed:', response.status, response.statusText);
        toast({
          title: "Error Loading Profile",
          description: "Failed to load your profile. Please try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast({
        title: "Profile Error",
        description: `Failed to load profile: ${error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!investorType) newErrors.investorType = "Investor type is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
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
      const updateData = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        user_coins: userCoins,
        investor_type: investorType,
        gender: gender,
        country: country,
        city: city,
        dob: dateOfBirth,
        reason_for_using: reasonForUsingHushh,
      };

      const response = await fetch(
        `${API_BASE_URL}/users?hushh_id=eq.${userData.hushh_id}`,
        {
          method: 'PATCH',
          headers: API_HEADERS,
          body: JSON.stringify(updateData)
        }
      );
      
      if (response.ok) {
        toast({
          title: "✅ Profile Updated",
          description: "Your profile has been updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Refresh user data
        setUserData({ ...userData, ...updateData });
        setIsEditing(false);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (err) {
      console.error("Profile update error:", err);
      setError(`An unexpected error occurred. Please try again later.`);
      toast({
        title: "Update Error",
        description: "There was an error updating your profile. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      toast({
        title: "✅ Signed out successfully",
        description: "You have been signed out of your account.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out error",
        description: "There was an error signing out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Add utility function to format date
  const formatAccountCreationDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  if (authLoading || isLoadingProfile) {
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
            Loading your profile...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={6} mt={5}>
          <Icon as={FiUser} fontSize="4xl" color="gray.400" />
          <Text fontSize="lg" color="gray.600">
            Profile not found
          </Text>
          <Button onClick={() => router.push('/user-registration')} colorScheme="blue">
            Complete Registration
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="6xl" mt={10}>
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
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <HStack spacing={6}>
                <Avatar
                  size="xl"
                  name={`${userData.first_name} ${userData.last_name}`}
                  src={user?.user_metadata?.avatar_url}
                  bg="blue.500"
                  color="white"
                />
                <VStack align="start" spacing={2}>
                  <Heading
                    size="lg"
                    color="gray.800"
                    fontFamily="Inter, sans-serif"
                    fontWeight="700"
                  >
                    {userData.first_name} {userData.last_name}
                  </Heading>
                  <Text color="gray.600" fontSize="md">
                    {user?.email}
                  </Text>
                  <Badge colorScheme="blue" size="lg" borderRadius="full">
                    {userData.investor_type === 'individual' ? 'Individual Investor' : 'Institutional Investor'}
                  </Badge>
                  {/* Add Hushh ID in header */}
                  <Text color="gray.500" fontSize="sm" fontFamily="mono">
                    ID: {userData.hushh_id || 'N/A'}
                  </Text>
                </VStack>
              </HStack>
              
              <HStack spacing={3}>
                {!isEditing ? (
                  <>
                    {/* <Button
                      onClick={() => setIsEditing(true)}
                      colorScheme="blue"
                      leftIcon={<FiEdit3 />}
                      size="lg"
                    >
                      Edit Profile
                    </Button> */}
                    <Button
                      onClick={() => router.push('/')}
                      variant="outline"
                      colorScheme="blue"
                      leftIcon={<FiLogOut />}
                      size="lg"
                    >
                      Go to Home
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      colorScheme="green"
                      leftIcon={<FiSave />}
                      size="lg"
                      isLoading={isLoading}
                      loadingText="Saving..."
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setErrors({});
                        // Reset form fields
                        setFirstName(userData.first_name || "");
                        setLastName(userData.last_name || "");
                        setPhoneNumber(userData.phone_number || "");
                        setInvestorType(userData.investor_type || "");
                      }}
                      variant="outline"
                      leftIcon={<FiX />}
                      size="lg"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </HStack>
            </Flex>
          </MotionCard>

          {/* Profile Details */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            {/* Main Profile Information */}
            <GridItem>
              <MotionCard
                variants={childVariants}
                bg="white"
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
              >
                <CardBody p={{ base: 6, md: 8 }}>
                  <VStack spacing={6} align="stretch">
                    <Flex justify="space-between" align="center">
                      <Heading size="md" color="gray.800" fontFamily="Inter, sans-serif">
                        Personal Information
                      </Heading>
                      {!isEditing && (
                        <Badge colorScheme="green" variant="subtle">
                          <Icon as={FiCheck} mr={1} />
                          Complete
                        </Badge>
                      )}
                    </Flex>

                    {error && (
                      <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Error!</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Box>
                      </Alert>
                    )}

                    <VStack spacing={6} align="stretch">
                      {/* Name Fields */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                        <GridItem>
                          <FormControl isInvalid={errors.firstName}>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={FiUser} mr={2} />
                              First Name
                            </FormLabel>
                            {isEditing ? (
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
                            ) : (
                              <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                                {userData.first_name || "Not provided"}
                              </Text>
                            )}
                            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={errors.lastName}>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={FiUser} mr={2} />
                              Last Name
                            </FormLabel>
                            {isEditing ? (
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
                            ) : (
                              <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                                {userData.last_name || "Not provided"}
                              </Text>
                            )}
                            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Contact Information */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={FiMail} mr={2} />
                              Email Address
                            </FormLabel>
                            <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.100" borderRadius="md">
                              {user?.email}
                            </Text>
                            <Text fontSize="xs" color="gray.500" mt={1}>
                              Email cannot be changed here
                            </Text>
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={errors.phoneNumber}>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={FiPhone} mr={2} />
                              Phone Number
                            </FormLabel>
                            {isEditing ? (
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
                            ) : (
                              <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                                {userData.phone_number || "Not provided"}
                              </Text>
                            )}
                            <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Investor Type */}
                      <FormControl isInvalid={errors.investorType}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={MdOutlineWorkOutline} mr={2} />
                          Investor Type
                        </FormLabel>
                        {isEditing ? (
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
                            <option value="individual">Individual Investor</option>
                            <option value="institutional">Institutional / Corporate Investor</option>
                          </Select>
                        ) : (
                          <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                            {userData.investor_type === 'individual' ? 'Individual Investor' : 'Institutional / Corporate Investor'}
                          </Text>
                        )}
                        <FormErrorMessage>{errors.investorType}</FormErrorMessage>
                      </FormControl>

                      {/* Add Hushh ID below investor type */}
                      <FormControl>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiShield} mr={2} />
                          Hushh ID
                        </FormLabel>
                        <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.100" borderRadius="md" fontFamily="mono">
                          {userData.hushh_id || "Not available"}
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          Your unique Hushh identifier
                        </Text>
                      </FormControl>

                      {/* Additional Information */}
                      <Divider />
                      <Text fontSize="lg" fontWeight="600" color="gray.700">
                        Additional Information
                      </Text>

                      {/* Location and Personal Details */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={BiUser} mr={2} />
                              Gender
                            </FormLabel>
                            {isEditing ? (
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
                                <option value="prefer-not-to-say">Prefer not to say</option>
                              </Select>
                            ) : (
                              <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                                {userData.gender || "Not provided"}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={IoLocationOutline} mr={2} />
                              Country
                            </FormLabel>
                            {isEditing ? (
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
                            ) : (
                              <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                                {userData.country || "Not provided"}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={FiMapPin} mr={2} />
                              City
                            </FormLabel>
                            {isEditing ? (
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
                            ) : (
                              <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                                {userData.city || "Not provided"}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Date of Birth */}
                      <FormControl>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiCalendar} mr={2} />
                          Date of Birth
                        </FormLabel>
                        {isEditing ? (
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
                        ) : (
                          <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md">
                            {userData.dob ? new Date(userData.dob).toLocaleDateString() : "Not provided"}
                          </Text>
                        )}
                      </FormControl>

                      {/* Reason for using Hushh */}
                      <FormControl>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiEdit3} mr={2} />
                          Reason for using Hushh
                        </FormLabel>
                        {isEditing ? (
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
                        ) : (
                          <Text fontSize="md" color="gray.700" py={2} px={3} bg="gray.50" borderRadius="md" minH="80px">
                            {userData.reason_for_using || "Not provided"}
                          </Text>
                        )}
                      </FormControl>
                    </VStack>
                  </VStack>
                </CardBody>
              </MotionCard>
            </GridItem>

            {/* Sidebar */}
            <GridItem>
              <VStack spacing={6}>
                {/* Account Stats */}
                <MotionCard
                  variants={childVariants}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="xl"
                  w="full"
                >
                  <CardBody p={6}>
                    <VStack spacing={4} align="stretch">
                      <Heading size="sm" color="gray.800" fontFamily="Inter, sans-serif">
                        Account Stats
                      </Heading>
                      
                      <HStack justify="space-between">
                        <Text color="gray.600">User Coins</Text>
                        <Badge colorScheme="yellow" variant="solid" borderRadius="full" px={3}>
                          {userData.user_coins || 0}
                        </Badge>
                      </HStack>
                      
                      {/* Update Member Since to use accountCreation */}
                      <HStack justify="space-between">
                        <Text color="gray.600">Member Since</Text>
                        <Text fontSize="sm" color="gray.700">
                          {formatAccountCreationDate(userData.accountCreation)}
                        </Text>
                      </HStack>
                      
                      <HStack justify="space-between">
                        <Text color="gray.600">Profile Status</Text>
                        <Badge colorScheme="green" variant="solid" borderRadius="full">
                          Complete
                        </Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </MotionCard>

                {/* Quick Actions */}
                <MotionCard
                  variants={childVariants}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="xl"
                  w="full"
                >
                  <CardBody p={6}>
                    <VStack spacing={4} align="stretch">
                      <Heading size="sm" color="gray.800" fontFamily="Inter, sans-serif">
                        Quick Actions
                      </Heading>
                      
                      <Button
                        // leftIcon={<FiSettings />}
                        variant="outline"
                        size="sm"
                        w="full"
                        onClick={() => router.push('/')}
                      >
                        Explore our products
                      </Button>
                      
                      <Button
                        // leftIcon={<HushhLogo/>}
                        variant="outline"
                        size="sm"
                        w="full"
                        onClick={() => router.push('/about-us')}
                      >
                        🤫 Know About Hushh
                      </Button>
                      
                      <Button
                        leftIcon={<FiLogOut />}
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        w="full"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </VStack>
                  </CardBody>
                </MotionCard>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>

      {/* Sign Out Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Sign Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to sign out of your account?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserProfile; 