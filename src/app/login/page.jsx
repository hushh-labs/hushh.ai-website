"use client";
import React, { useEffect, useState, Suspense } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Image,
  useToast,
  Spinner,
  HStack,
  Grid,
  Flex } from
'@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useAuth } from '../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import AppleSignInButton from './components/AppleSignInButton.jsx';
import ContentWrapper from '../_components/layout/ContentWrapper';

// Advanced Keyframe Animations 
const _float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-5deg); }
  75% { transform: translateY(-30px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const slideInUp = keyframes`
  0% { opacity: 0; transform: translateY(60px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const _shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const _gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const LoginPageContent = () => {
  const {
    signIn,
    isAuthenticated,
    loading
  } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [_windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      console.log('✅ User authenticated, redirecting...');
      setRedirecting(true);
      router.replace(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  useEffect(() => {
    setMounted(true);

    // Set initial window size
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      if (typeof window !== 'undefined') {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    try {
      await signIn(null, redirectTo);
      // The OAuth process will redirect to Google, and success will be handled when user returns
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Authentication Error",
        description: "There was an error signing in. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top"
      });
      setIsSigningIn(false);
    }
  };

  if (loading || !mounted) {
    return (
      <Box
        minH="100vh"
        bg="#ffffff"
        display="flex"
        alignItems="center"
        justifyContent="center">
        
        <VStack spacing={6}>
          <Box position="relative">
            <Box
              w="80px"
              h="80px"
              border="3px solid transparent"
              borderRadius="50%"
              sx={{
                background: "linear-gradient(45deg, #171b29, #8f8570, #b7a789, #171b29) border-box",
                mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude"
              }}
              animation={`${rotate} 2s linear infinite`} />
            
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="60px"
              h="60px"
              borderRadius="50%"
              sx={{
                background: "linear-gradient(45deg, #171b29, #8f8570, #b7a789, #171b29)"
              }}
              animation={`${pulse} 2s ease-in-out infinite`} />
            
          </Box>
          <Text color="#1d1d1f" fontSize="lg" fontWeight={500}>
            Loading your experience...
          </Text>
        </VStack>
      </Box>);

  }

  // Show minimal redirecting state when redirecting
  if (redirecting) {
    return (
      <Box
        minH="100vh"
        bg="#ffffff"
        display="flex"
        alignItems="center"
        justifyContent="center">
        
        <VStack spacing={4}>
          <Box fontSize="3xl">🚀</Box>
          <Text color="#1d1d1f" fontSize="lg" fontWeight={500}>
            Redirecting...
          </Text>
        </VStack>
      </Box>);

  }

  return (
    <ContentWrapper includeHeaderSpacing={true} surface="muted" className="site-auth-frame">
      <Box
      // minH="100vh"
      position="relative"
      overflow="hidden"
      sx={{
        background: "transparent"
      }}>
        
        {/* Minimal background for light theme intentionally left clean */}

        {/* Main Content Layout */}
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          minH="100vh"
          position="relative"
          zIndex={1}>
          
          {/* Left Side - Hero Section */}
          <Flex
            direction="column"
            justify="center"
            align={{ base: "center", lg: "flex-start" }}
            px={{ base: 6, lg: 16 }}
            py={{ base: 12, lg: 0 }}
            textAlign={{ base: "center", lg: "left" }}
            position="relative">
            
            {/* Back Button */}
            <HStack
              spacing={3}
              cursor="pointer"
              onClick={() => router.push('/')}
              _hover={{
                color: "#171b29"
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              mb={{ base: 10, lg: 0 }}
              alignSelf={{ base: "center", lg: "flex-start" }}
              position={{ base: "relative", lg: "absolute" }}
              top={{ lg: "0" }}
              left={{ lg: "16" }}
              p={0}>
              
              <ArrowBackIcon color="#5f5f5f" />
              <Text color="#5f5f5f" fontSize="sm" fontWeight={500}>
                Back to Home
              </Text>
            </HStack>

            <VStack
              spacing={10}
              align={{ base: "center", lg: "flex-start" }}
              animation={`${slideInUp} 0.8s ease-out`}
              w="full"
              maxW="600px">
              
              {/* Enhanced Brand Section */}
              <VStack spacing={8} align={{ base: "center", lg: "flex-start" }}>
                <HStack spacing={6} align="center">
                  <Image
                    src="/svgs/hushhEmoji.svg"
                    alt="Hushh Logo"
                    w="64px"
                    h="64px" />
                </HStack>

                <VStack spacing={6} maxW="550px" align={{ base: "center", lg: "flex-start" }}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight={800}
                    lineHeight="1.1"
                    color="#1d1d1f"
                    letterSpacing="-0.02em">
                    
                    Welcome to the Future of Data Sovereignty
                  </Text>

                  <Text
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    color="#6e6e73"
                    lineHeight="1.6"
                    fontWeight={400}>
                    
                    Sign in to unlock your personal AI agent, take complete control of your data, and monetize your digital footprint on your own terms.
                  </Text>
                </VStack>
              </VStack>

              {/* Enhanced Features Grid */}
              <Grid
                templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
                gap={4}
                w="full"
                maxW="550px">
                
                {[
                {
                  icon: "🛡️",
                  title: "Privacy First",
                  desc: "End-to-end encrypted vault"
                },
                {
                  icon: "🤖",
                  title: "AI Powered",
                  desc: "Intelligent automation"
                },
                {
                  icon: "💰",
                  title: "Monetize Data",
                  desc: "Earn from your information"
                },
                {
                  icon: "⚡",
                  title: "Lightning Fast",
                  desc: "Instant insights & actions"
                }].
                map((feature, i) =>
                <Box
                  key={i}
                  p={5}
                  borderRadius="2xl"
                  bg="#ffffff"
                  border="1px solid #e5e5ea"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    bg: "#f5f5f7",
                    borderColor: "#d2d2d7"
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  animation={`${slideInUp} ${0.8 + i * 0.1}s ease-out`}
                  cursor="pointer">
                  
                    <VStack spacing={3} align="start" position="relative" zIndex={1}>
                      <HStack spacing={3}>
                        <Box fontSize="xl">{feature.icon}</Box>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="md" fontWeight={700} color="#1d1d1f">
                            {feature.title}
                          </Text>
                          <Text fontSize="sm" color="#6e6e73">
                            {feature.desc}
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </Box>
                )}
              </Grid>
            </VStack>
          </Flex>

          {/* Right Side - Login Form */}
          <Flex
            direction="column"
            justify="center"
            align="center"
            px={{ base: 6, lg: 16 }}
            py={{ base: 12, lg: 0 }}
            position="relative">
            
            {/* No overlay needed in light theme */}

            <VStack
              spacing={10}
              w="full"
              maxW="450px"
              animation={`${slideInUp} 1s ease-out`}
              position="relative"
              zIndex={1}>
              
              {/* Login Card */}
              <Box
                w="full"
                p={10}
                borderRadius="3xl"
                bg="#ffffff"
                border="1px solid #e5e5ea"
                boxShadow="0 8px 24px rgba(0, 0, 0, 0.06)"
                position="relative"
                overflow="hidden">
                
                {/* Minimal borders, no animated glow in light theme */}

                <VStack spacing={8} position="relative" zIndex={1}>
                  <VStack spacing={4} textAlign="center">
                    <Text
                      fontSize="3xl"
                      fontWeight={800}
                      color="#1d1d1f"
                      letterSpacing="-0.02em">
                      
                      Sign In to Continue
                    </Text>
                    <Text
                      fontSize="md"
                      color="#6e6e73"
                      lineHeight="1.6"
                      maxW="300px">
                      
                      Access your personalized data dashboard and AI-powered insights in seconds
                    </Text>
                  </VStack>

                  {/* Google Sign In Button */}
                  <Button
                    onClick={handleGoogleSignIn}
                    isLoading={isSigningIn}
                    loadingText="Signing in..."
                    w="full"
                    h="64px"
                    bg="#ffffff"
                    color="#1d1d1f"
                    borderRadius="2xl"
                    fontSize="lg"
                    fontWeight={700}
                    border="1px solid #d2d2d7"
                    position="relative"
                    overflow="hidden"
                    boxShadow="none"
                    _hover={{
                      bg: "#f5f5f7",
                      borderColor: "#1d1d1f"
                    }}
                    _active={{
                      bg: "#f0f0f3"
                    }}
                    transition="all 0.2s ease"
                    leftIcon={
                    !isSigningIn &&
                    <Box w="24px" h="24px">
                          <svg viewBox="0 0 24 24" width="24" height="24">
                            <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        
                            <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        
                            <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        
                            <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        
                          </svg>
                        </Box>

                    }
                    rightIcon={
                    !isSigningIn && <ChevronRightIcon fontSize="xl" />
                    }>
                    
                    Continue with Google
                  </Button>

                  {/* Apple Sign In Button */}
                  <AppleSignInButton
                    isDisabled={isSigningIn}
                    redirectPath={redirectTo}
                    onSuccess={(data) => {
                      console.log('Apple Sign-In Success:', data);
                      toast({
                        title: "Apple Sign-In Successful",
                        description: "Welcome to Hushh. Redirecting...",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top"
                      });
                    }}
                    onError={(error) => {
                      console.error('Apple Sign-In Error:', error);
                      toast({
                        title: "Apple Sign-In failed",
                        description: error.message || "Failed to sign in with Apple. Please try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top"
                      });
                    }} />
                  

                  {/* Divider */}


                  {/* Security Badges */}
                  {/* <VStack spacing={3} w="full">
                    <HStack
                     spacing={3}
                     p={4}
                     borderRadius="xl"
                     bg="rgba(0, 113, 227, 0.15)"
                     border="1px solid rgba(0, 113, 227, 0.3)"
                     w="full"
                     justify="center"
                    >
                     <Text fontSize="lg">🔒</Text>
                     <VStack spacing={0} align="start" flex={1}>
                       <Text fontSize="sm" color="white" fontWeight={600}>
                         Enterprise-Grade Security
                       </Text>
                       <Text fontSize="xs" color="rgba(255, 255, 255, 0.7)">
                         End-to-end encrypted with Zero Trust architecture
                       </Text>
                     </VStack>
                    </HStack>
                    <HStack
                     spacing={3}
                     p={4}
                     borderRadius="xl"
                     bg="rgba(187, 98, 252, 0.15)"
                     border="1px solid rgba(187, 98, 252, 0.3)"
                     w="full"
                     justify="center"
                    >
                     <Text fontSize="lg">⚡</Text>
                     <VStack spacing={0} align="start" flex={1}>
                       <Text fontSize="sm" color="white" fontWeight={600}>
                         Instant Access
                       </Text>
                       <Text fontSize="xs" color="rgba(255, 255, 255, 0.7)">
                         Your data vault activates in under 3 seconds
                       </Text>
                     </VStack>
                    </HStack>
                    </VStack> */
                  }
                </VStack>
              </Box>

              {/* Legal Notice */}
              <Box
                p={6}
                borderRadius="xl"
                bg="#f5f5f7"
                border="1px solid #e5e5ea">
                
                <Text
                  fontSize="sm"
                  color="#6e6e73"
                  textAlign="center"
                  lineHeight="1.6">
                  
                  By signing in, you agree to our{" "}
                  <Link href="/terms">
                    <Text
                      as="span"
                      color="#171b29"
                      textDecoration="underline"
                      fontWeight={600}
                      _hover={{ color: "#8f8570" }}
                      transition="color 0.2s ease">
                      
                      Terms of Service
                    </Text>
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy">
                    <Text
                      as="span"
                      color="#171b29"
                      textDecoration="underline"
                      fontWeight={600}
                      _hover={{ color: "#8f8570" }}
                      transition="color 0.2s ease">
                      
                      Privacy Policy
                    </Text>
                  </Link>
                </Text>
              </Box>
            </VStack>
          </Flex>
        </Grid>

      </Box>
    </ContentWrapper>);

};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
      <Box minH="100vh" bg="#ffffff" display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={6}>
            <Spinner size="xl" color="#1d1d1f" />
            <Text color="#1d1d1f" fontSize="lg" fontWeight={500}>Loading...</Text>
          </VStack>
        </Box>
      }>
      
      <LoginPageContent />
    </Suspense>);

}
