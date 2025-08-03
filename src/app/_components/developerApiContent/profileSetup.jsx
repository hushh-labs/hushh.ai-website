import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  useToast,
  Heading,
  Divider,
  Container,
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import config from "../config/config"; // Developer API Supabase client config
import { useAuth } from "../../context/AuthContext"; // OAuth authentication

// Clean animations for Apple-like design
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const ProfileSetup = () => {
  const { isAuthenticated, user, loading } = useAuth(); // Use centralized auth
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    companyname: "",
    website: "",
    purpose: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in before setting up your profile.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }

    const userEmail = user.email;

    try {
      console.log("Checking existing profile...");

      // Step 1: Check if the user profile already exists
      const { data: existingUser, error: fetchError } = await config.supabaseClient
        .from("dev_api_userprofile")
        .select("mail")
        .eq("mail", userEmail)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      const profileData = {
        mail: userEmail,
        user_id: user.id,
        ...formData,
      };

      let error;

      if (existingUser) {
        // Step 2: Update existing user without modifying password
        console.log("Updating profile:", profileData);
        ({ error } = await config.supabaseClient
          .from("dev_api_userprofile")
          .update(profileData)
          .eq("mail", userEmail));
      } else {
        // Step 3: Insert new user profile
        console.log("Inserting profile:", profileData);
        ({ error } = await config.supabaseClient
          .from("dev_api_userprofile")
          .insert([profileData]));
      }

      if (error) throw error;

      toast({
        title: "Profile Setup Complete",
        description: "Your profile has been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error saving profile:", error.message);
      toast({
        title: "Profile Setup Failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        p={12}
        borderRadius="24px"
        bg="white"
        border="1px solid rgba(0, 0, 0, 0.06)"
        boxShadow="0 4px 24px rgba(0, 0, 0, 0.04)"
        textAlign="center"
        maxW="600px"
        mx="auto"
      >
        <VStack spacing={6}>
          <Box
            w="32px"
            h="32px"
            borderRadius="50%"
            border="2px solid rgba(0, 0, 0, 0.1)"
            borderTopColor="black"
            animation={`spin 1s linear infinite`}
            sx={{
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          />
          <Text color="rgba(0, 0, 0, 0.8)" fontSize="lg" fontWeight={500} fontFamily="system-ui, -apple-system">
            Loading...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box
        p={10}
        borderRadius="24px"
        bg="white"
        border="1px solid rgba(0, 0, 0, 0.06)"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.08)"
        textAlign="center"
        maxW="600px"
        mx="auto"
        animation={`${fadeIn} 0.6s ease-out`}
      >
        <VStack spacing={6}>
          <Text
            fontSize="2xl"
            fontWeight={600}
            color="black"
            letterSpacing="-0.02em"
            fontFamily="system-ui, -apple-system"
            lineHeight="1.2"
          >
            Authentication Required
          </Text>
          <Text
            fontSize="md"
            color="rgba(0, 0, 0, 0.6)"
            lineHeight="1.5"
            maxW="400px"
            fontFamily="system-ui, -apple-system"
            fontWeight={400}
          >
            Please sign in first to setup your developer profile
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      p={10}
      borderRadius="24px"
      bg="white"
      border="1px solid rgba(0, 0, 0, 0.06)"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.08)"
      position="relative"
      maxW="600px"
      mx="auto"
      animation={`${fadeIn} 0.6s ease-out`}
    >
      <VStack spacing={8}>
        {/* Header */}
        <VStack spacing={3} textAlign="center">
          <Text
            fontSize="2xl"
            fontWeight={600}
            color="black"
            letterSpacing="-0.02em"
            fontFamily="system-ui, -apple-system"
            lineHeight="1.2"
          >
            Complete Your Profile
          </Text>
          <Text
            fontSize="md"
            color="rgba(0, 0, 0, 0.6)"
            lineHeight="1.5"
            maxW="400px"
            fontFamily="system-ui, -apple-system"
            fontWeight={400}
          >
            Fill out the details below to access all developer features
          </Text>
        </VStack>

        {/* User Info Display */}
        <Box
          p={4}
          borderRadius="12px"
          bg="rgba(0, 0, 0, 0.02)"
          border="1px solid rgba(0, 0, 0, 0.06)"
          w="full"
        >
          <Text
            fontSize="sm"
            color="rgba(0, 0, 0, 0.6)"
            fontFamily="system-ui, -apple-system"
            textAlign="center"
          >
            Signed in as: <Text as="span" fontWeight={500} color="black">{user?.email}</Text>
          </Text>
        </Box>

        {/* Form */}
        <Box as="form" onSubmit={handleSubmit} w="full">
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                mb={2}
              >
                First Name
              </FormLabel>
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
                h="48px"
                borderRadius="12px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                bg="white"
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                }}
                _hover={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                mb={2}
              >
                Last Name
              </FormLabel>
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter your last name"
                h="48px"
                borderRadius="12px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                bg="white"
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                }}
                _hover={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                mb={2}
              >
                Mobile Number
              </FormLabel>
              <Input
                type="tel"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                h="48px"
                borderRadius="12px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                bg="white"
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                }}
                _hover={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                mb={2}
              >
                Company Name
              </FormLabel>
              <Input
                type="text"
                name="companyname"
                value={formData.companyname}
                onChange={handleChange}
                placeholder="Enter your company name"
                h="48px"
                borderRadius="12px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                bg="white"
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                }}
                _hover={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                mb={2}
              >
                Company Website
              </FormLabel>
              <Input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-website.com"
                h="48px"
                borderRadius="12px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                bg="white"
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                }}
                _hover={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                mb={2}
              >
                Purpose of Usage
              </FormLabel>
              <Input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Describe how you plan to use the API"
                h="48px"
                borderRadius="12px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                bg="white"
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                }}
                _hover={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </FormControl>

            <Button
              type="submit"
              w="full"
              h="52px"
              bg="black"
              color="white"
              borderRadius="12px"
              fontSize="md"
              fontWeight={500}
              fontFamily="system-ui, -apple-system"
              isLoading={isLoading}
              loadingText="Setting up profile..."
              _hover={{
                bg: "rgba(0, 0, 0, 0.8)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
              _active={{
                transform: "translateY(0px)",
                bg: "rgba(0, 0, 0, 0.9)",
              }}
              transition="all 0.2s ease"
            >
              Complete Profile Setup
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProfileSetup;
