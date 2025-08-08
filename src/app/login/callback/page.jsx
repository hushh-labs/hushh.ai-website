"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  VStack,
  Text,
  Spinner,
  useToast,
  Container,
  HStack,
  Button,
  Icon,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ArrowBackIcon, CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { createClient } from '@supabase/supabase-js';
import config from '../../../lib/config/config.js';

// Animation keyframes
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Apple Icon Component
const AppleIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
    />
  </Icon>
);

const AppleCallbackContent = () => {
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [message, setMessage] = useState('Processing Apple authentication...');
  const [errorDetails, setErrorDetails] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  useEffect(() => {
    const handleAppleCallback = async () => {
      try {
        console.log('Apple callback received, processing...');
        
        // Get the current URL with all parameters
        const currentUrl = window.location.href;
        console.log('Callback URL:', currentUrl);

        // Check for error in URL parameters
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (error) {
          console.error('Apple OAuth Error:', error, errorDescription);
          setStatus('error');
          setMessage('Apple authentication failed');
          setErrorDetails({
            error,
            description: errorDescription || 'Authentication was declined or failed'
          });
          
          // toast({
          //   title: "Apple Sign-In Failed",
          //   description: errorDescription || "Authentication was declined or failed",
          //   status: "error",
          //   duration: 5000,
          //   isClosable: true,
          //   position: "top",
          // });
          
          return;
        }

        // Check for authorization code
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        if (!code) {
          console.error('No authorization code received from Apple');
          setStatus('error');
          setMessage('No authorization code received');
          setErrorDetails({
            error: 'missing_code',
            description: 'No authorization code was provided by Apple'
          });
          
          // toast({
          //   title: "Authentication Error",
          //   description: "No authorization code received from Apple",
          //   status: "error",
          //   duration: 5000,
          //   isClosable: true,
          //   position: "top",
          // });
          
          return;
        }

        console.log('Authorization code received, processing...');
        // Skip loading message for faster UX
        
        // Create Supabase client
        const supabase = config.supabaseClient || createClient(
          config.SUPABASE_URL, 
          config.SUPABASE_ANON_KEY,
          {
            auth: {
              autoRefreshToken: true,
              persistSession: true,
              detectSessionInUrl: true
            }
          }
        );

        // Exchange the authorization code for a session using Supabase Auth
        const { data, error: callbackError } = await supabase.auth.exchangeCodeForSession(code);

        if (callbackError) {
          console.error('Apple callback processing error:', callbackError);
          setStatus('error');
          setMessage('Failed to process Apple authentication');
          setErrorDetails({
            error: 'callback_processing_failed',
            description: callbackError.message || 'Failed to process the authentication callback'
          });
          
          toast({
            title: "Authentication Processing Failed",
            description: callbackError.message || "Failed to process Apple authentication",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          
          return;
        }

        console.log('Apple authentication successful:', data);
        setStatus('success');
        setMessage('Apple authentication successful!');
        
        // Handle successful authentication - store user profile if needed
        if (data?.user) {
          try {
            // Optional: Store user profile in your database
            const userData = {
              user_id: data.user.id,
              mail: data.user.email,
              firstname: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
              lastname: '', // Apple doesn't provide separate last name
              avatar_url: data.user.user_metadata?.avatar_url || null,
              provider: 'apple',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };

            // Upsert user profile to database
            await supabase
              .from('dev_api_userprofile')
              .upsert([userData], { 
                onConflict: 'mail',
                ignoreDuplicates: false 
              });
          } catch (profileError) {
            console.warn('Failed to update user profile:', profileError);
            // Don't fail the auth process if profile update fails
          }
        }
        
        // Store success state for instant redirect detection
        localStorage.setItem('apple_auth_success', 'true');
        
        // Immediate redirect to home page (no toast delay)
        const redirectTo = searchParams.get('redirect') || '/';
        
        // Use window.location for fastest possible redirect
        if (typeof window !== 'undefined') {
          window.location.href = redirectTo;
        } else {
          router.replace(redirectTo);
        }

      } catch (error) {
        console.error('Unexpected error in Apple callback:', error);
        setStatus('error');
        setMessage('An unexpected error occurred');
        setErrorDetails({
          error: 'unexpected_error',
          description: error.message || 'An unexpected error occurred during authentication'
        });
        
        // toast({
        //   title: "Unexpected Error",
        //   description: "An unexpected error occurred during authentication",
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "top",
        // });
      }
    };

    // Only process callback if we have search parameters
    if (searchParams.toString()) {
      handleAppleCallback();
    } else {
      // If no parameters, redirect back to login
      router.push('/login');
    }
  }, [searchParams, router, toast]);

  const handleRetryLogin = () => {
    router.push('/login');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  // Minimal content rendering for faster UX
  const renderContent = () => {
    if (status === 'error' && errorDetails) {
      return (
        <VStack spacing={6} textAlign="center">
          <Box fontSize="4xl">⚠️</Box>
          <VStack spacing={3}>
            <Text fontSize="xl" fontWeight={600} color="white">
              Sign-in Failed
            </Text>
            <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
              {errorDetails.description}
            </Text>
          </VStack>
        </VStack>
      );
    }
    
    // Show minimal loading for processing state
    return (
      <VStack spacing={4} textAlign="center">
        <Box fontSize="4xl">🍃</Box>
        <Text fontSize="lg" fontWeight={500} color="white">
          Signing you in...
        </Text>
      </VStack>
    );
  };

  return (
    <Box
      minH="100vh"
      bg="radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Background Elements */}
      <Box position="absolute" top="0" left="0" w="100%" h="100%" zIndex={0}>
        <Box
          position="absolute"
          top="20%"
          left="10%"
          w="300px"
          h="300px"
          bg="radial-gradient(circle, rgba(0, 113, 227, 0.1) 0%, transparent 70%)"
          borderRadius="50%"
          filter="blur(60px)"
          animation={`${bounce} 8s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          w="250px"
          h="250px"
          bg="radial-gradient(circle, rgba(187, 98, 252, 0.1) 0%, transparent 70%)"
          borderRadius="50%"
          filter="blur(60px)"
          animation={`${bounce} 10s ease-in-out infinite reverse`}
        />
      </Box>

      <Container maxW="lg" position="relative" zIndex={1}>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default function AppleCallbackPage() {
  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          bg="radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={6}>
            <Spinner size="xl" color="white" />
            <Text color="white" fontSize="lg" fontWeight={500}>
              Loading...
            </Text>
          </VStack>
        </Box>
      }
    >
      <AppleCallbackContent />
    </Suspense>
  );
} 