import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import config from "../config/config"; // Make sure this contains supabaseClient
import { useApiKey } from "../../context/apiKeyContext";
import { useAuth } from "../../context/AuthContext";

// Clean animations for Apple-like design
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const GenerateApiKey = () => {
  const { apiKey, saveApiKey, isLoading, setIsLoading, hasApiKey } = useApiKey();
  const { isAuthenticated, user, loading } = useAuth();
  const toast = useToast();

  const handleGenerateApiKey = async () => {
    if (!isAuthenticated || !user?.email) {
      toast({
        title: "Authentication Required",
        description: "Please sign in before generating an API key.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const userMail = user.email;

    try {
      // Log userMail for debugging
      console.log("User email:", userMail);
      console.log("Authenticated user:", user);

      const response = await fetch(
        `https://hushh-api-53407187172.us-central1.run.app/generateapikey?mail=${userMail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token || 'no-token'}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error response:", errorMessage);
        throw new Error(`API error: ${response.status} - ${errorMessage}`);
      }

      const result = await response.json();

      if (!result.api_key) {
        throw new Error("API key missing in response");
      }

      // Save the API key to context (which also saves to localStorage)
      saveApiKey(result.api_key);

      // Save the API key to Supabase database
      try {
        const { error: updateError } = await config.supabaseClient
          .from('dev_api_userprofile')
          .upsert([
            {
              mail: userMail,
              api_key: result.api_key,
            }
          ], { 
            onConflict: 'mail' 
          });

        console.log('API key saved to database successfully');
      } catch (dbError) {
        console.error('Database error:', dbError);
      }

      toast({
        title: "API Key Generated",
        description: "Store this key securely. It won't be shown again.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error generating API key:", error);
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast({
        title: "Copied to Clipboard",
        description: "Your API key has been copied.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
            Generate API Key
          </Text>
          <Text
            fontSize="md"
            color="rgba(0, 0, 0, 0.6)"
            lineHeight="1.5"
            maxW="400px"
            fontFamily="system-ui, -apple-system"
            fontWeight={400}
          >
            Generate your secure API key to access Hushh Developer APIs
          </Text>
        </VStack>

        {/* Authentication Status */}
        {!isAuthenticated && (
          <Box
            p={4}
            borderRadius="12px"
            bg="rgba(255, 193, 7, 0.1)"
            border="1px solid rgba(255, 193, 7, 0.2)"
            w="full"
          >
            <Text
              fontSize="sm"
              color="rgba(0, 0, 0, 0.8)"
              fontFamily="system-ui, -apple-system"
              textAlign="center"
            >
              ⚠️ Please sign in first to generate your API key
            </Text>
          </Box>
        )}

        {/* User Info Display */}
        {isAuthenticated && user && (
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
              Generating API key for: <Text as="span" fontWeight={500} color="black">{user?.email}</Text>
            </Text>
          </Box>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerateApiKey}
          disabled={isLoading || !isAuthenticated}
          w="full"
          h="52px"
          bg="black"
          color="white"
          borderRadius="12px"
          fontSize="md"
          fontWeight={500}
          fontFamily="system-ui, -apple-system"
          isLoading={isLoading}
          loadingText="Generating API Key..."
          _hover={{
            bg: "rgba(0, 0, 0, 0.8)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
          _active={{
            transform: "translateY(0px)",
            bg: "rgba(0, 0, 0, 0.9)",
          }}
          _disabled={{
            bg: "rgba(0, 0, 0, 0.3)",
            cursor: "not-allowed",
            transform: "none",
            boxShadow: "none",
          }}
          transition="all 0.2s ease"
        >
          {loading ? "Loading..." : isLoading ? "Generating..." : !isAuthenticated ? "Please Sign In First" : "Generate New API Key"}
        </Button>

        {/* API Key Display */}
        {hasApiKey() && (
          <Box w="full">
            <VStack spacing={4}>
              <Text
                fontSize="md"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                textAlign="center"
              >
                Your API Key
              </Text>
              
              <Box
                p={4}
                borderRadius="12px"
                bg="rgba(0, 0, 0, 0.02)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                w="full"
                display="flex"
                alignItems="center"
                gap={3}
              >
                <Input
                  value={apiKey}
                  isReadOnly
                  flex={1}
                  bg="white"
                  border="1px solid rgba(0, 0, 0, 0.12)"
                  borderRadius="8px"
                  fontSize="sm"
                  fontFamily="Monaco, 'Courier New', monospace"
                  _focus={{
                    borderColor: "rgba(0, 0, 0, 0.3)",
                    boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Button
                  onClick={copyToClipboard}
                  size="md"
                  bg="white"
                  color="black"
                  border="1px solid rgba(0, 0, 0, 0.12)"
                  borderRadius="8px"
                  fontWeight={500}
                  fontSize="sm"
                  fontFamily="system-ui, -apple-system"
                  _hover={{
                    bg: "rgba(0, 0, 0, 0.04)",
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  }}
                  _active={{
                    bg: "rgba(0, 0, 0, 0.08)",
                  }}
                  transition="all 0.2s ease"
                >
                  Copy
                </Button>
              </Box>

              <Text
                fontSize="xs"
                color="rgba(0, 0, 0, 0.5)"
                textAlign="center"
                fontFamily="system-ui, -apple-system"
                fontWeight={400}
              >
                Store this key securely. It won't be shown again.
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default GenerateApiKey;
