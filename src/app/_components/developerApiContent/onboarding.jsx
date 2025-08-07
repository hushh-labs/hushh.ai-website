"use client";
import React, { useState, useRef, useEffect } from "react";
import { useApiKey } from "../../context/apiKeyContext";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { 
  Box, 
  Button, 
  Text, 
  useToast, 
  VStack, 
  HStack,
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import '../../../../pages/fonts.css'
import { ChevronRightIcon } from '@chakra-ui/icons';
import config from "../config/config";
// Clean, subtle animations for professional design
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const subtlePulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const gentleHover = keyframes`
  0% { transform: translateY(0px); }
  100% { transform: translateY(-2px); }
`;

const Onboarding = () => {
  const { data: session, status } = useSession();
  const [apiKey, setApiKey] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [copySuccess, setCopySuccess] = useState('Copy');
  const [isInsertingUser, setIsInsertingUser] = useState(false);
  const textAreaRef = useRef(null);
  const toast = useToast();

  // Function to insert user data to Supabase
  const insertUserToSupabase = async (userData) => {
    console.log('🚀 ===== STARTING USER DATA INSERTION =====');
    console.log('📋 User data to insert:', userData);
    
    setIsInsertingUser(true);
    
    try {
      // Check if user already exists
      console.log('🔍 Checking if user already exists in database...');
      const { data: existingUser, error: fetchError } = await config.supabaseClient
        .from('dev_api_userprofile')
        .select('mail, user_id, firstname')
        .eq('mail', userData.email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('❌ Error checking existing user:', fetchError);
        throw fetchError;
      }

      if (existingUser) {
        console.log('👤 User already exists in database:', existingUser);
        toast({
          title: "Welcome Back! 👋",
          description: `User found in database. Complete your profile if needed.`,
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      // Prepare user data for insertion - only basic info from session
      const userProfileData = {
        mail: userData.email,
        user_id: userData.id || userData.sub,
        firstname: userData.name || userData.given_name || 'User'
      };

      console.log('📝 Prepared user profile data:', userProfileData);

      // Insert new user to Supabase
      console.log('💾 Inserting new user to database...');
      const { data: insertedData, error: insertError } = await config.supabaseClient
        .from('dev_api_userprofile')
        .insert([userProfileData])
        .select();

      if (insertError) {
        console.error('❌ Error inserting user:', insertError);
        throw insertError;
      }

      console.log('✅ User successfully inserted to database:', insertedData);
      
      toast({
        title: "Basic Profile Created! 🎉",
        description: `Welcome ${userData.name}! Please complete your profile setup next.`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

    } catch (error) {
      console.error('🚫 Error in user insertion process:', error);
      toast({
        title: "Basic Profile Setup Error",
        description: "There was an issue creating your basic profile. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsInsertingUser(false);
      console.log('🏁 ===== USER DATA INSERTION COMPLETE =====');
    }
  };

  useEffect(() => {
    console.log('🔄 Onboarding useEffect triggered');
    console.log('Session status:', status);
    console.log('Session data:', session);
    
    if (session?.user) {
      console.log('👤 User session detected:', {
        email: session.user.email,
        name: session.user.name,
        id: session.user.id || session.id,
        image: session.user.image
      });

      toast({
        title: "Welcome! 🎉",
        description: `Successfully signed in as ${session.user.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Auto-insert user data to Supabase after successful sign-in
      const userData = {
        email: session.user.email,
        name: session.user.name,
        id: session.user.id || session.id || session.token?.sub,
        image: session.user.image
      };

      console.log('🔄 Triggering automatic user data insertion...');
      insertUserToSupabase(userData);
    }
  }, [session, toast]);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;
    
    console.log('🔗 ===== STARTING GOOGLE SIGN-IN PROCESS =====');
    console.log('🔗 User initiated Google sign-in...');
    
    setIsSigningIn(true);
    try {
      console.log('🔗 Calling NextAuth signIn with Google provider...');
      const result = await signIn('google', { 
        callbackUrl: '/developer-Api/on-boarding',
        redirect: false 
      });
      
      console.log('🔗 Google sign-in result:', result);
      
      if (result?.error) {
        console.error('❌ Google sign-in error:', result.error);
        throw new Error(result.error);
      }
      
      if (result?.ok) {
        console.log('✅ Google sign-in successful!');
        // The session callback will handle the user data insertion
      }
      
    } catch (error) {
      console.error('❌ Error in Google sign-in process:', error);
      toast({
        title: "Authentication Error",
        description: "There was an error signing in. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setIsSigningIn(false);
    }
    console.log('🏁 ===== GOOGLE SIGN-IN PROCESS COMPLETE =====');
  };

  const handleLogout = async () => {
    console.log('🚪 ===== STARTING LOGOUT PROCESS =====');
    console.log('🚪 User initiated logout...');
    
    try {
      console.log('🚪 Calling NextAuth signOut...');
      await signOut({ 
        callbackUrl: '/developer-Api/on-boarding' 
      });
      
      console.log('✅ Logout successful!');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    console.log('🏁 ===== LOGOUT PROCESS COMPLETE =====');
  };



  if (status === "loading" || isInsertingUser) {
    console.log('⏳ Loading state - Status:', status, 'Inserting User:', isInsertingUser);
    
    return (
      <Box
        p={12}
        borderRadius="24px"
        bg="white"
        border="1px solid rgba(0, 0, 0, 0.06)"
        boxShadow="0 4px 24px rgba(0, 0, 0, 0.04)"
        textAlign="center"
        maxW="500px"
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
            {isInsertingUser ? 'Setting up your profile...' : 'Loading...'}
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
      maxW="540px"
      mx="auto"
      animation={`${fadeIn} 0.6s ease-out`}
    >
      <VStack spacing={8}>
        {session?.user ? (
          <>
            {/* Authenticated State - Clean Apple Style */}
            <VStack spacing={6} textAlign="center" w="full">
              <Box
                p={6}
                borderRadius="16px"
                bg="rgba(0, 0, 0, 0.02)"
                border="1px solid rgba(0, 0, 0, 0.06)"
                w="full"
              >
                <VStack spacing={3}>
                  <Box
                    w="48px"
                    h="48px"
                    borderRadius="50%"
                    bg="rgba(0, 0, 0, 0.08)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="24px"
                  >
                    ✓
                  </Box>
                  <Text 
                    fontSize="xl" 
                    fontFamily="system-ui, -apple-system"
                    fontWeight={600} 
                    color="black"
                    mb={1}
                  >
                    Successfully Signed In
                  </Text>
                  <Text 
                    fontSize="md" 
                    color="rgba(0, 0, 0, 0.6)"
                    fontWeight={400}
                  >
                    Welcome back, {session?.user?.email}
                  </Text>
                  <Text 
                    fontSize="sm" 
                    color="rgba(0, 0, 0, 0.5)"
                    fontWeight={400}
                  >
                    Name: {session?.user?.name} | ID: {session?.user?.id || session?.id || 'Auto-generated'}
                  </Text>
                </VStack>
              </Box>
              
              <Button 
                onClick={handleLogout} 
                size="lg"
                h="52px"
                px={8}
                bg="white"
                color="black"
                border="1px solid rgba(0, 0, 0, 0.12)"
                borderRadius="12px"
                fontWeight={500}
                fontSize="md"
                fontFamily="system-ui, -apple-system"
                _hover={{
                  bg: "rgba(0, 0, 0, 0.04)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                }}
                _active={{
                  transform: "translateY(0px)",
                  bg: "rgba(0, 0, 0, 0.08)",
                }}
                transition="all 0.2s ease"
              >
                Sign Out
      </Button>
            </VStack>
          </>
        ) : (
          <>
            {/* Unauthenticated State - Professional Apple Style */}
            <VStack spacing={6} textAlign="center">
              <VStack spacing={3}>
                <Text
                  fontSize="2xl"
                  fontWeight={600}
                  color="black"
                  letterSpacing="-0.02em"
                  fontFamily="system-ui, -apple-system"
                  lineHeight="1.2"
                >
                  Sign In to Get Started
                </Text>
                <Text
                  fontSize="md"
                  color="rgba(0, 0, 0, 0.6)"
                  lineHeight="1.5"
                  maxW="380px"
                  fontFamily="system-ui, -apple-system"
                  fontWeight={400}
                >
                  Access your Developer API credentials and start building with Hushh
                </Text>
              </VStack>
            </VStack>

            <VStack spacing={3} w="full">
              {/* Professional Google Sign In Button */}
              <Button
                onClick={handleGoogleSignIn}
                isLoading={isSigningIn}
                loadingText="Signing in..."
                w="full"
                h="52px"
                bg="white"
                color="black"
                border="1px solid rgba(0, 0, 0, 0.12)"
                borderRadius="12px"
                fontSize="md"
                fontWeight={500}
                fontFamily="system-ui, -apple-system"
                _hover={{
                  bg: "rgba(0, 0, 0, 0.04)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                  borderColor: "rgba(0, 0, 0, 0.16)",
                }}
                _active={{
                  transform: "translateY(0px)",
                  bg: "rgba(0, 0, 0, 0.08)",
                }}
                transition="all 0.2s ease"
                leftIcon={
                  !isSigningIn && (
                    <Box w="18px" h="18px">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </Box>
                  )
                }
              >
                Continue with Google
      </Button>

              {/* Apple Sign-In coming soon */}
              <Text
                fontSize="sm"
                color="rgba(0, 0, 0, 0.4)"
                textAlign="center"
                fontFamily="system-ui, -apple-system"
                fontWeight={400}
              >
                Apple Sign-In coming soon
              </Text>

              {/* Clean Divider */}
              <Box
                w="full"
                h="1px"
                bg="rgba(0, 0, 0, 0.08)"
                my={2}
              />

              {/* Minimal Security Info */}
              <Text
                fontSize="sm"
                color="rgba(0, 0, 0, 0.5)"
                textAlign="center"
                lineHeight="1.4"
                fontFamily="system-ui, -apple-system"
                fontWeight={400}
              >
                Secure authentication powered by the same system used across Hushh
              </Text>
            </VStack>
          </>
  )}
</VStack> 
    </Box>
  );
};

export default Onboarding;