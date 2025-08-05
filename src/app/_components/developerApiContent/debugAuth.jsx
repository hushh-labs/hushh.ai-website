"use client";
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Text, 
  VStack, 
  HStack,
  Badge,
  Code,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast
} from "@chakra-ui/react";
import { devApiSupabase } from './supabaseAuth';

const DebugAuth = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [testing, setTesting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getDebugInfo = async () => {
      const info = {
        supabaseUrl: "https://rpmzykoxqnbozgdoqbpc.supabase.co",
        redirectUrl: typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? "http://localhost:3000/developer-Api/on-boarding"
          : "https://hushh.ai/developer-Api/on-boarding",
        currentUrl: typeof window !== 'undefined' ? window.location.href : 'Server-side',
        timestamp: new Date().toISOString(),
      };

      // Check session
      try {
        const { data: { session }, error } = await devApiSupabase.auth.getSession();
        info.currentSession = session ? 'Active' : 'None';
        info.sessionError = error?.message || 'None';
      } catch (err) {
        info.currentSession = 'Error';
        info.sessionError = err.message;
      }

      setDebugInfo(info);
    };

    getDebugInfo();
  }, []);

  const testConnection = async () => {
    setTesting(true);
    try {
      // Test Supabase connection
      const { data, error } = await devApiSupabase.auth.getSession();
      
      if (error) {
        toast({
          title: "Connection Test Failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Connection Test Successful",
          description: "Supabase connection is working properly",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Connection Test Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setTesting(false);
    }
  };

  const clearSession = async () => {
    try {
      await devApiSupabase.auth.signOut();
      toast({
        title: "Session Cleared",
        description: "Any existing session has been cleared",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      
      // Refresh debug info
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast({
        title: "Clear Session Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={6}
      borderRadius="16px"
      bg="rgba(255, 165, 0, 0.05)"
      border="2px solid rgba(255, 165, 0, 0.2)"
      mb={6}
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="600" color="orange.600">
            🔍 Authentication Debug Panel
          </Text>
          <Badge colorScheme="orange" variant="subtle">
            Troubleshooting Mode
          </Badge>
        </HStack>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="500">Configuration Details</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={3} align="stretch">
                <HStack>
                  <Text fontWeight="500" minW="120px">Supabase URL:</Text>
                  <Code fontSize="sm">{debugInfo.supabaseUrl}</Code>
                </HStack>
                <HStack>
                  <Text fontWeight="500" minW="120px">Redirect URL:</Text>
                  <Code fontSize="sm">{debugInfo.redirectUrl}</Code>
                </HStack>
                <HStack>
                  <Text fontWeight="500" minW="120px">Current URL:</Text>
                  <Code fontSize="sm">{debugInfo.currentUrl}</Code>
                </HStack>
                <HStack>
                  <Text fontWeight="500" minW="120px">Session Status:</Text>
                  <Badge colorScheme={debugInfo.currentSession === 'Active' ? 'green' : 'red'}>
                    {debugInfo.currentSession}
                  </Badge>
                </HStack>
                {debugInfo.sessionError !== 'None' && (
                  <HStack>
                    <Text fontWeight="500" minW="120px">Session Error:</Text>
                    <Code fontSize="sm" colorScheme="red">{debugInfo.sessionError}</Code>
                  </HStack>
                )}
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="500">Required Supabase Settings</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={2} align="stretch">
                <Text fontSize="sm" fontWeight="600" color="red.600">
                  🚨 CRITICAL - Google Console Setup:
                </Text>
                <Text fontSize="sm">1. Go to Google Cloud Console → APIs & Services → Credentials</Text>
                <Text fontSize="sm">2. Find OAuth 2.0 Client ID and add this to Authorized redirect URIs:</Text>
                <Code fontSize="xs" display="block" p={2} mt={1} bg="red.50" borderColor="red.200">
                  https://rpmzykoxqnbozgdoqbpc.supabase.co/auth/v1/callback
                </Code>
                <Text fontSize="xs" color="red.600" fontWeight="600">
                  Without this Supabase callback URL in Google Console, OAuth will fail!
                </Text>
                
                <Text fontSize="sm" fontWeight="600" color="orange.600" mt={3}>
                  In your Supabase Dashboard → Authentication → Providers:
                </Text>
                <Text fontSize="sm">✅ Google provider must be ENABLED</Text>
                <Text fontSize="sm">✅ "Allow new users to sign up" must be ENABLED</Text>
                <Text fontSize="sm">✅ Client ID: 53407187172-t1ojln3gadj5pvd10bga2gjevvnt93lq.apps.googleusercontent.com</Text>
                <Text fontSize="sm">✅ Client Secret: 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</Text>
                <Text fontSize="sm" fontWeight="600" color="orange.600" mt={3}>
                  In Authentication → Settings:
                </Text>
                <Text fontSize="sm">✅ Site URL: http://localhost:3000</Text>
                <Text fontSize="sm">✅ Additional Redirect URLs should include:</Text>
                <Code fontSize="xs" display="block" p={2} mt={1}>
                  http://localhost:3000/developer-Api/on-boarding
                </Code>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <HStack spacing={3} flexWrap="wrap">
          <Button 
            size="sm" 
            colorScheme="blue" 
            onClick={testConnection}
            isLoading={testing}
            loadingText="Testing..."
          >
            Test Connection
          </Button>
          <Button 
            size="sm" 
            colorScheme="orange" 
            variant="outline"
            onClick={clearSession}
          >
            Clear Session
          </Button>
          <Button 
            size="sm" 
            colorScheme="red" 
            variant="outline"
            onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}
          >
            Open Google Console
          </Button>
        </HStack>

        <Text fontSize="sm" color="gray.600">
          💡 If you're still getting "User not found" errors, the Google OAuth provider is likely not properly configured in your Supabase project settings.
        </Text>
      </VStack>
    </Box>
  );
};

export default DebugAuth;