'use client'
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Text, 
  useToast, 
  VStack, 
  Input,
  Textarea
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import config from '../config/config';
import { httpRequest } from '../requestHandler/requestHandler';
import { useApiKey } from '../../context/apiKeyContext';
import { useAuth } from '../../context/AuthContext';

// Clean animations for Apple-like design
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const SessionToken = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const { apiKey, hasApiKey } = useApiKey();
  const [sessionToken, setSessionToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Check if we have the required data
  useEffect(() => {
    if (isAuthenticated && !hasApiKey()) {
      setError('No API key found. Please generate an API key first.');
    } else if (isAuthenticated && hasApiKey()) {
      setError(''); // Clear any previous errors
    }
  }, [isAuthenticated, apiKey, hasApiKey]);

  // Call the session token API
  const fetchSessionToken = async () => {
    if (!isAuthenticated || !user?.email || !hasApiKey()) {
      setError('User email or API key is missing');
      toast({
        title: 'Missing Information',
        description: 'User email or API key is required to fetch session token.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Fetching session token for user:', user.email);
      
      const response = await httpRequest(
        'POST',
        `sessiontoken?mail=${user.email}&api_key=${apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status_code === 200) {
        setSessionToken(response.token);
        setError(''); // Clear any errors
        toast({
          title: 'Session Token Retrieved',
          description: 'Your session token has been successfully retrieved.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError('Failed to fetch session token');
        toast({
          title: 'Error',
          description: 'Failed to fetch session token. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching session token:', error);
      setError('Failed to fetch session token');
      toast({
        title: 'Error',
        description: 'Failed to fetch session token. Please try again.',
        status: 'error',
        duration: 3000,
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
            Generate Session Token
          </Text>
          <Text
            fontSize="md"
            color="rgba(0, 0, 0, 0.6)"
            lineHeight="1.5"
            maxW="400px"
            fontFamily="system-ui, -apple-system"
            fontWeight={400}
          >
            Generate a secure session token for API authentication
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
              ⚠️ Please sign in first to generate your session token
            </Text>
          </Box>
        )}

        {/* API Key Status */}
        {isAuthenticated && !hasApiKey() && (
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
              🔑 Please generate an API key first before creating a session token
            </Text>
          </Box>
        )}

        {/* User Info Display */}
        {isAuthenticated && user && hasApiKey() && (
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
              Generating session token for: <Text as="span" fontWeight={500} color="black">{user?.email}</Text>
            </Text>
          </Box>
        )}

        {/* Error Display */}
        {error && (
          <Box
            p={4}
            borderRadius="12px"
            bg="rgba(220, 53, 69, 0.1)"
            border="1px solid rgba(220, 53, 69, 0.2)"
            w="full"
          >
            <Text
              fontSize="sm"
              color="rgba(220, 53, 69, 0.8)"
              fontFamily="system-ui, -apple-system"
              textAlign="center"
            >
              ❌ {error}
            </Text>
          </Box>
        )}

        {/* Generate Button */}
        <Button
          onClick={fetchSessionToken}
          disabled={isLoading || !hasApiKey() || !isAuthenticated}
          w="full"
          h="52px"
          bg="black"
          color="white"
          borderRadius="12px"
          fontSize="md"
          fontWeight={500}
          fontFamily="system-ui, -apple-system"
          isLoading={isLoading}
          loadingText="Generating Session Token..."
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
          {loading ? 'Loading...' : isLoading ? 'Processing...' : !isAuthenticated ? 'Please Sign In First' : 'Get Session Token'}
        </Button>

        {/* Session Token Display */}
        {sessionToken && (
          <Box w="full">
            <VStack spacing={4}>
              <Text
                fontSize="md"
                fontWeight={500}
                color="black"
                fontFamily="system-ui, -apple-system"
                textAlign="center"
              >
                Your Session Token
              </Text>
              
              <Box
                p={4}
                borderRadius="12px"
                bg="rgba(0, 0, 0, 0.02)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                w="full"
              >
                <VStack spacing={3}>
                  <Textarea
                    value={sessionToken}
                    isReadOnly
                    bg="white"
                    border="1px solid rgba(0, 0, 0, 0.12)"
                    borderRadius="8px"
                    fontSize="sm"
                    fontFamily="Monaco, 'Courier New', monospace"
                    minH="100px"
                    resize="none"
                    _focus={{
                      borderColor: "rgba(0, 0, 0, 0.3)",
                      boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(sessionToken);
                      toast({
                        title: 'Copied to Clipboard',
                        description: 'Session token has been copied to clipboard.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: "top",
                      });
                    }}
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
                    Copy Session Token
                  </Button>
                </VStack>
              </Box>

              <Text
                fontSize="xs"
                color="rgba(0, 0, 0, 0.5)"
                textAlign="center"
                fontFamily="system-ui, -apple-system"
                fontWeight={400}
              >
                Use this token for authenticated API requests. Keep it secure.
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SessionToken;
