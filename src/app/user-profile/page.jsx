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
import ContentWrapper from "../_components/layout/ContentWrapper";

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
      console.log('🔍 Fetching user profile for:', email);
      
      // Use the check-user API which returns both existence and full user data
      const response = await fetch(
        `https://hushh-api-53407187172.us-central1.run.app/api/check-user?email=${email}`,
        { headers: API_HEADERS }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Profile API Response:', data);
        
        // Check if user exists and has data
        if (data && (data.message === "User exists" || data.exists) && data.user) {
          const profileData = data.user;
          console.log('📝 User profile data found:', profileData);
          setUserData(profileData);
          
          // Populate form fields for editing using the correct field names
          setFirstName(profileData.first_name || "");
          setLastName(profileData.last_name || "");
          setPhoneNumber(profileData.phone_number || profileData.phone || "");
          setUserCoins(profileData.user_coins || 0);
          setInvestorType(profileData.investor_type || "");
          setGender(profileData.gender || "");
          setCountry(profileData.country || "");
          setCity(profileData.city || "");
          setDateOfBirth(profileData.dob || "");
          setReasonForUsingHushh(profileData.reason_for_using_hushhTech);
          
          console.log('✅ Profile loaded successfully');
        } else {
          // User not found in database, redirect to registration
          console.log('❌ User profile not found, redirecting to registration');
          toast({
            title: "Profile Not Found",
            description: "Please complete your registration first.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          router.push('/user-registration');
        }
      } else {
        console.error('❌ Profile API request failed:', response.status, response.statusText);
        toast({
          title: "Error Loading Profile",
          description: "Failed to load your profile. Please try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("💥 Error fetching user profile:", error);
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
    <ContentWrapper includeHeaderSpacing={true}>
      <Box
        minH="100vh"
        bg="white"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        <Container maxW="6xl">
        <MotionBox
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Header */}
          <MotionCard
            variants={childVariants}
            bg="linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)"
            boxShadow="0px 10px 30px rgba(0, 0, 0, 0.1)"
            borderRadius={{ base: "20px", md: "30px" }}
            border="1px solid rgba(0, 0, 0, 0.05)"
            p={{ base: 4, md: 8 }}
            mb={8}
          >
            {/* Desktop Layout */}
            <Flex 
              justify="space-between" 
              align="center" 
              wrap="wrap" 
              gap={4}
              display={{ base: "none", lg: "flex" }}
            >
              <HStack spacing={6}>
                <Avatar
                  size="xl"
                  name={`${userData.first_name} ${userData.last_name}`}
                  src={user?.user_metadata?.avatar_url}
                  bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                  color="white"
                  border="3px solid rgba(255, 255, 255, 0.2)"
                />
                <VStack align="start" spacing={2}>
                  <Heading
                    size="lg"
                    color="black"
                    fontFamily="Inter, sans-serif"
                    fontWeight="700"
                  >
                    {userData.first_name} {userData.last_name}
                  </Heading>
                  <Text color="rgba(0, 0, 0, 0.7)" fontSize="md">
                    {user?.email}
                  </Text>
                  <Badge 
                    bg="linear-gradient(135deg, #0071E3, #BB62FC)" 
                    color="white" 
                    size="lg" 
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    {userData.investor_type === 'individual' ? 'Individual Investor' : 'Institutional Investor'}
                  </Badge>
                  <Text color="rgba(0, 0, 0, 0.6)" fontSize="sm" fontFamily="mono">
                    <HStack spacing={2} align="center">
                      <Icon as={FiShield} color="#0071E3" />
                      <Text fontWeight="bold" color="#BB62FC" fontSize="sm">
                        Hushh ID:
                      </Text>
                      <Badge 
                        bg="linear-gradient(135deg, #0071E3, #BB62FC)" 
                        color="white"
                        variant="solid" 
                        px={3} 
                        py={1} 
                        borderRadius="md"
                        fontFamily="mono"
                        fontSize="xs"
                      >
                        {userData.hushh_id || 'N/A'}
                      </Badge>
                    </HStack>
                  </Text>
                </VStack>
              </HStack>
              
              <HStack spacing={3}>
                {!isEditing ? (
                  <>
                    {/* <Button
                      onClick={() => setIsEditing(true)}
                      bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                      color="white"
                      leftIcon={<FiEdit3 />}
                      size="lg"
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      _hover={{
                        bg: "linear-gradient(135deg, #005bb5, #9a4fd1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0, 113, 227, 0.4)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Edit Profile
                    </Button> */}
                    <Button
                      onClick={() => router.push('/')}
                      variant="outline"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      color="rgba(255, 255, 255, 0.8)"
                      leftIcon={<FiLogOut />}
                      size="lg"
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      _hover={{ 
                        bg: "rgba(255, 255, 255, 0.1)", 
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        transform: "translateY(-2px)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Go to Home
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      bg="linear-gradient(135deg, #4CAF50, #45A049)"
                      color="white"
                      leftIcon={<FiSave />}
                      size="lg"
                      isLoading={isLoading}
                      loadingText="Saving..."
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      _hover={{
                        bg: "linear-gradient(135deg, #45A049, #3d8b40)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setErrors({});
                        setFirstName(userData.first_name || "");
                        setLastName(userData.last_name || "");
                        setPhoneNumber(userData.phone_number || "");
                        setInvestorType(userData.investor_type || "");
                      }}
                      variant="outline"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      color="rgba(255, 255, 255, 0.8)"
                      leftIcon={<FiX />}
                      size="lg"
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      _hover={{ 
                        bg: "rgba(255, 255, 255, 0.1)", 
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        transform: "translateY(-2px)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </HStack>
            </Flex>

            {/* Mobile Layout */}
            <VStack 
              spacing={6} 
              align="stretch" 
              display={{ base: "flex", lg: "none" }}
            >
              {/* User Info Section */}
              <VStack spacing={4} align="center" textAlign="center">
                <Avatar
                  size={{ base: "lg", sm: "xl" }}
                  name={`${userData.first_name} ${userData.last_name}`}
                  src={user?.user_metadata?.avatar_url}
                  bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                  color="white"
                  border="3px solid rgba(255, 255, 255, 0.2)"
                />
                <VStack spacing={2} align="center">
                  <Heading
                    size={{ base: "md", sm: "lg" }}
                    color="black"
                    fontFamily="Inter, sans-serif"
                    fontWeight="700"
                  >
                    {userData.first_name} {userData.last_name}
                  </Heading>
                  <Text 
                    color="rgba(0, 0, 0, 0.7)" 
                    fontSize={{ base: "sm", sm: "md" }}
                    wordBreak="break-word"
                  >
                    {user?.email}
                  </Text>
                  <Badge 
                    bg="linear-gradient(135deg, #0071E3, #BB62FC)" 
                    color="white" 
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                  >
                    {userData.investor_type === 'individual' ? 'Individual Investor' : 'Institutional Investor'}
                  </Badge>
                  {/* Hushh ID - Mobile */}
                  <VStack spacing={1} align="center">
                    <HStack spacing={2} align="center">
                      <Icon as={FiShield} color="#0071E3" size="sm" />
                      <Text fontWeight="bold" color="#BB62FC" fontSize="xs">
                        Hushh ID:
                      </Text>
                    </HStack>
                    <Badge 
                      bg="linear-gradient(135deg, #0071E3, #BB62FC)" 
                      color="white"
                      variant="solid" 
                      px={2} 
                      py={1} 
                      borderRadius="md"
                      fontFamily="mono"
                      fontSize="xs"
                    >
                      {userData.hushh_id || 'N/A'}
                    </Badge>
                  </VStack>
                </VStack>
              </VStack>
              
              {/* Action Buttons - Mobile */}
              <VStack spacing={3} w="full">
                {!isEditing ? (
                  <>
                    {/* <Button
                      onClick={() => setIsEditing(true)}
                      bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                      color="white"
                      leftIcon={<FiEdit3 />}
                      size="md"
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      w="full"
                      _hover={{
                        bg: "linear-gradient(135deg, #005bb5, #9a4fd1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0, 113, 227, 0.4)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Edit Profile
                    </Button> */}
                    <Button
                      onClick={() => router.push('/')}
                      variant="outline"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      color="rgba(255, 255, 255, 0.8)"
                      leftIcon={<FiLogOut />}
                      size="md"
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      w="full"
                      _hover={{ 
                        bg: "rgba(255, 255, 255, 0.1)", 
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        transform: "translateY(-2px)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Go to Home
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      bg="linear-gradient(135deg, #4CAF50, #45A049)"
                      color="white"
                      leftIcon={<FiSave />}
                      size="md"
                      isLoading={isLoading}
                      loadingText="Saving..."
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      w="full"
                      _hover={{
                        bg: "linear-gradient(135deg, #45A049, #3d8b40)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setErrors({});
                        setFirstName(userData.first_name || "");
                        setLastName(userData.last_name || "");
                        setPhoneNumber(userData.phone_number || "");
                        setInvestorType(userData.investor_type || "");
                      }}
                      variant="outline"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      color="rgba(255, 255, 255, 0.8)"
                      leftIcon={<FiX />}
                      size="md"
                      borderRadius="full"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      w="full"
                      _hover={{ 
                        bg: "rgba(255, 255, 255, 0.1)", 
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        transform: "translateY(-2px)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </VStack>
            </VStack>
          </MotionCard>

          {/* Profile Details */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr", md:'1fr 2fr' }} gap={{ base: 6, lg: 8 }}>
             {/* Sidebar */}
             <GridItem order={{ base: 2, lg: 1 }}>
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
                        onClick={() => router.push('/about')}
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
            
            {/* Main Profile Information */}
            <GridItem order={{ base: 1, lg: 2 }}>
              <MotionCard
                variants={childVariants}
                bg="linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)"
                boxShadow="0px 10px 30px rgba(0, 0, 0, 0.08)"
                borderRadius={{ base: "20px", md: "30px" }}
                border="1px solid rgba(0, 0, 0, 0.05)"
                overflow="hidden"
              >
                <CardBody p={{ base: 4, sm: 6, md: 8 }}>
                  <VStack spacing={6} align="stretch">
                    <Flex justify="space-between" align="center">
                      <Heading size="md" color="black" fontFamily="Inter, sans-serif">
                        Personal Information
                      </Heading>
                      {!isEditing && (
                        <Badge bg="linear-gradient(135deg, #4CAF50, #45A049)" color="white" variant="solid">
                          <Icon as={FiCheck} mr={1} />
                          Complete
                        </Badge>
                      )}
                    </Flex>

                    {error && (
                      <Alert status="error" bg="rgba(255, 82, 82, 0.1)" borderRadius="md" border="1px solid rgba(255, 82, 82, 0.3)">
                        <AlertIcon color="#FF5252" />
                        <Box>
                          <AlertTitle color="#FF5252">Error!</AlertTitle>
                          <AlertDescription color="#FF5252">{error}</AlertDescription>
                        </Box>
                      </Alert>
                    )}

                    <VStack spacing={6} align="stretch">
                      {/* Name Fields */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                        <GridItem>
                          <FormControl isInvalid={errors.firstName}>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={FiUser} mr={2} color="#0071E3" />
                              First Name
                            </FormLabel>
                            {isEditing ? (
                              <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                bg="rgba(0, 0, 0, 0.03)"
                                border="1px"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                color="black"
                                _placeholder={{ color: "rgba(0, 0, 0, 0.5)" }}
                                _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                                _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                                borderRadius="lg"
                              />
                            ) : (
                              <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                                {userData.first_name || "Not provided"}
                              </Text>
                            )}
                            <FormErrorMessage color="#FF5252">{errors.firstName}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={errors.lastName}>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={FiUser} mr={2} color="#0071E3" />
                              Last Name
                            </FormLabel>
                            {isEditing ? (
                              <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                                bg="rgba(0, 0, 0, 0.03)"
                                border="1px"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                color="black"
                                _placeholder={{ color: "rgba(0, 0, 0, 0.5)" }}
                                _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                                _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                                borderRadius="lg"
                              />
                            ) : (
                              <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                                {userData.last_name || "Not provided"}
                              </Text>
                            )}
                            <FormErrorMessage color="#FF5252">{errors.lastName}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Contact Information */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={FiMail} mr={2} color="#BB62FC" />
                              Email Address
                            </FormLabel>
                            <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.05)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.1)">
                              {user?.email}
                            </Text>
                            <Text fontSize="xs" color="rgba(0, 0, 0, 0.5)" mt={1}>
                              Email cannot be changed here
                            </Text>
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={errors.phoneNumber}>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={FiPhone} mr={2} color="#0071E3" />
                              Phone Number
                            </FormLabel>
                            {isEditing ? (
                              <Input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                bg="rgba(0, 0, 0, 0.03)"
                                border="1px"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                color="black"
                                _placeholder={{ color: "rgba(0, 0, 0, 0.5)" }}
                                _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                                _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                                borderRadius="lg"
                              />
                            ) : (
                              <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                                {userData.phone_number || "Not provided"}
                              </Text>
                            )}
                            <FormErrorMessage color="#FF5252">{errors.phoneNumber}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Investor Type */}
                      <FormControl isInvalid={errors.investorType}>
                        <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                          <Icon as={MdOutlineWorkOutline} mr={2} color="#BB62FC" />
                          Investor Type
                        </FormLabel>
                        {isEditing ? (
                          <Select
                            value={investorType}
                            onChange={(e) => setInvestorType(e.target.value)}
                            placeholder="Select investor type"
                            bg="rgba(0, 0, 0, 0.03)"
                            border="1px"
                            borderColor="rgba(0, 0, 0, 0.1)"
                            color="black"
                            _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                            _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                            borderRadius="lg"
                          >
                            <option value="individual" style={{backgroundColor: '#ffffff', color: 'black'}}>Individual Investor</option>
                            <option value="institutional" style={{backgroundColor: '#ffffff', color: 'black'}}>Institutional / Corporate Investor</option>
                          </Select>
                        ) : (
                          <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                            {userData.investor_type === 'individual' ? 'Individual Investor' : 'Institutional / Corporate Investor'}
                          </Text>
                        )}
                        <FormErrorMessage color="#FF5252">{errors.investorType}</FormErrorMessage>
                      </FormControl>

                      {/* Add Hushh ID below investor type */}
                      <FormControl>
                        <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                          <Icon as={FiShield} mr={2} color="#0071E3" />
                          Hushh ID
                        </FormLabel>
                        <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.05)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.1)" fontFamily="mono">
                          {userData.hushh_id || "Not available"}
                        </Text>
                        <Text fontSize="xs" color="rgba(0, 0, 0, 0.5)" mt={1}>
                          Your unique Hushh identifier
                        </Text>
                      </FormControl>

                      {/* Additional Information */}
                      <Divider borderColor="rgba(0, 0, 0, 0.1)" />
                      <Text fontSize="lg" fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                        Additional Information
                      </Text>

                      {/* Location and Personal Details */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4}>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={BiUser} mr={2} color="#0071E3" />
                              Gender
                            </FormLabel>
                            {isEditing ? (
                              <Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                placeholder="Select gender"
                                bg="rgba(0, 0, 0, 0.03)"
                                border="1px"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                color="black"
                                _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                                _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                                borderRadius="lg"
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                              </Select>
                            ) : (
                              <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                                {userData.gender || "Not provided"}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={IoLocationOutline} mr={2} color="#0071E3" />
                              Country
                            </FormLabel>
                            {isEditing ? (
                              <Input
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Enter your country"
                                bg="rgba(0, 0, 0, 0.03)"
                                border="1px"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                color="black"
                                _placeholder={{ color: "rgba(0, 0, 0, 0.5)" }}
                                _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                                _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                                borderRadius="lg"
                              />
                            ) : (
                              <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                                {userData.country || "Not provided"}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl>
                            <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                              <Icon as={FiMapPin} mr={2} color="#0071E3" />
                              City
                            </FormLabel>
                            {isEditing ? (
                              <Input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter your city"
                                bg="rgba(0, 0, 0, 0.03)"
                                border="1px"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                color="black"
                                _placeholder={{ color: "rgba(0, 0, 0, 0.5)" }}
                                _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                                _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                                borderRadius="lg"
                              />
                            ) : (
                              <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                                {userData.city || "Not provided"}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Date of Birth */}
                      <FormControl>
                        <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                          <Icon as={FiCalendar} mr={2} color="#BB62FC" />
                          Date of Birth
                        </FormLabel>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            bg="rgba(0, 0, 0, 0.03)"
                            border="1px"
                            borderColor="rgba(0, 0, 0, 0.1)"
                            color="black"
                            _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                            _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                            borderRadius="lg"
                          />
                        ) : (
                          <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)">
                            {userData.dob ? new Date(userData.dob).toLocaleDateString() : "Not provided"}
                          </Text>
                        )}
                      </FormControl>

                      {/* Reason for using Hushh */}
                      <FormControl>
                        <FormLabel color="rgba(0, 0, 0, 0.9)" fontWeight="600">
                          <Icon as={FiEdit3} mr={2} color="#0071E3" />
                          Reason for using Hushh
                        </FormLabel>
                        {isEditing ? (
                          <Textarea
                            value={reasonForUsingHushh}
                            onChange={(e) => setReasonForUsingHushh(e.target.value)}
                            placeholder="Tell us why you're interested in using Hushh"
                            bg="rgba(0, 0, 0, 0.03)"
                            border="1px"
                            borderColor="rgba(0, 0, 0, 0.1)"
                            color="black"
                            _placeholder={{ color: "rgba(0, 0, 0, 0.5)" }}
                            _hover={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                            _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                            borderRadius="lg"
                            rows={4}
                          />
                        ) : (
                          <Text fontSize="md" color="rgba(0, 0, 0, 0.8)" py={2} px={3} bg="rgba(0, 0, 0, 0.03)" borderRadius="lg" border="1px solid rgba(0, 0, 0, 0.08)" minH="80px">
                            {userData.reason_for_using || "Not provided"}
                          </Text>
                        )}
                      </FormControl>
                    </VStack>
                  </VStack>
                </CardBody>
              </MotionCard>
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
    </ContentWrapper>
  );
};

export default UserProfile; 