"use client";
import React, { useEffect, useState, Suspense } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Image,
  Container,
  useToast,
  Spinner,
  HStack,
  Grid,
  Flex,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useAuth } from '../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import AppleSignInButton from './components/AppleSignInButton.jsx';
import ContentWrapper from '../_components/layout/ContentWrapper';

// Advanced Keyframe Animations 
const float = keyframes`
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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const LoginPageContent = () => {
  const { signIn, isAuthenticated, loading } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [redirecting, setRedirecting] = useState(false);

  // Separate effect for immediate authentication redirect
  useEffect(() => {
    // Check for Apple auth success flag for instant redirect
    if (typeof window !== 'undefined') {
      const appleAuthSuccess = localStorage.getItem('apple_auth_success');
      if (appleAuthSuccess === 'true') {
        console.log('Apple auth success detected, redirecting immediately...');
        setRedirecting(true); // Hide form immediately
        localStorage.removeItem('apple_auth_success'); // Clean up
        router.replace(redirectTo);
        return;
      }
    }

    if (isAuthenticated && !loading) {
      console.log('User authenticated, redirecting immediately...');
      setRedirecting(true); // Hide form immediately
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
      await signIn();
      // The OAuth process will redirect to Google, and success will be handled when user returns
    } catch (error) {
      console.error('Error signing in:', error);
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
  };

  if (loading || !mounted) {
    return (
      <Box
        minH="100vh"
        bg="radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={6}>
          <Box position="relative">
            <Box
              w="80px"
              h="80px"
              border="3px solid transparent"
              borderRadius="50%"
              sx={{
                background: "linear-gradient(45deg, #0071E3, #BB62FC, #F34556, #F44F22) border-box",
                mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
              animation={`${rotate} 2s linear infinite`}
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="60px"
              h="60px"
              borderRadius="50%"
              sx={{
                background: "linear-gradient(45deg, #0071E3, #BB62FC, #F34556, #F44F22)",
              }}
              animation={`${pulse} 2s ease-in-out infinite`}
            />
          </Box>
          <Text color="white" fontSize="lg" fontWeight={500}>
            Loading your experience...
          </Text>
        </VStack>
      </Box>
    );
  }

  // Show minimal redirecting state when redirecting
  if (redirecting) {
    return (
      <Box
        minH="100vh"
        bg="radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Box fontSize="3xl">🚀</Box>
          <Text color="white" fontSize="lg" fontWeight={500}>
            Redirecting...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <ContentWrapper includeHeaderSpacing={true}>
      <Box
        // minH="100vh"
        position="relative"
        overflow="hidden"
        sx={{
          background: "radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)",
        }}
      >
      {/* Interactive Background Elements */}
      <Box position="absolute" top="0" left="0" w="100%" h="100%" zIndex={0}>
        {/* Main Animated Gradient Orbs */}
        <Box
          position="absolute"
          top="15%"
          left="10%"
          w="500px"
          h="500px"
          sx={{
            background: "radial-gradient(circle, rgba(0, 113, 227, 0.12) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          borderRadius="50%"
          filter="blur(80px)"
          animation={`${float} 20s ease-in-out infinite, ${gradientShift} 8s ease infinite`}
        />
        <Box
          position="absolute"
          top="50%"
          right="5%"
          w="400px"
          h="400px"
          sx={{
            background: "radial-gradient(circle, rgba(187, 98, 252, 0.12) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          borderRadius="50%"
          filter="blur(80px)"
          animation={`${float} 25s ease-in-out infinite reverse, ${gradientShift} 12s ease infinite`}
        />
        <Box
          position="absolute"
          bottom="20%"
          left="50%"
          w="350px"
          h="350px"
          sx={{
            background: "radial-gradient(circle, rgba(243, 69, 86, 0.1) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          borderRadius="50%"
          filter="blur(60px)"
          animation={`${float} 30s ease-in-out infinite, ${gradientShift} 15s ease infinite`}
        />

        {/* Floating Particles with Mouse Interaction */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            w="4px"
            h="4px"
            sx={{
              background: `linear-gradient(45deg, #0071E3, #BB62FC, #F34556, #F44F22)`,
              backgroundSize: "400% 400%",
            }}
            borderRadius="50%"
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            animation={`${float} ${15 + Math.random() * 10}s ease-in-out infinite, ${gradientShift} ${5 + Math.random() * 5}s ease infinite`}
            opacity="0.7"
            transform={mounted ? `translate(${(mousePosition.x - windowSize.width / 2) * 0.01}px, ${(mousePosition.y - windowSize.height / 2) * 0.01}px)` : 'translate(0px, 0px)'}
            transition="transform 0.3s ease"
          />
        ))}

        {/* Grid Pattern Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          opacity="0.03"
          sx={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </Box>

      {/* Main Content Layout */}
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        minH="100vh"
        position="relative"
        zIndex={1}
      >
        {/* Left Side - Hero Section */}
        <Flex
          direction="column"
          justify="center"
          align={{ base: "center", lg: "flex-start" }}
          px={{ base: 6, lg: 16 }}
          py={{ base: 12, lg: 0 }}
          textAlign={{ base: "center", lg: "left" }}
          position="relative"
        >
          {/* Back Button */}
          <HStack
            spacing={3}
            cursor="pointer"
            onClick={() => router.push('/')}
            _hover={{ 
              opacity: 0.8, 
              transform: "translateX(-4px)",
              color: "#0071E3"
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            mb={10}
            alignSelf={{ base: "center", lg: "flex-start" }}
            p={3}
            borderRadius="lg"
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
          >
            <ArrowBackIcon color="rgba(255, 255, 255, 0.8)" />
            <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm" fontWeight={500}>
              Back to Home
            </Text>
          </HStack>

          <VStack
            spacing={10}
            align={{ base: "center", lg: "flex-start" }}
            animation={`${slideInUp} 0.8s ease-out`}
            w="full"
            maxW="600px"
          >
            {/* Enhanced Brand Section */}
            <VStack spacing={8} align={{ base: "center", lg: "flex-start" }}>
              <HStack spacing={6} align="center">
                <Box position="relative">
                  {/* Animated Glow Ring */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="120px"
                    h="120px"
                    sx={{
                      background: "conic-gradient(from 0deg, #0071E3, #BB62FC, #F34556, #F44F22, #0071E3)",
                    }}
                    borderRadius="50%"
                    filter="blur(20px)"
                    animation={`${rotate} 8s linear infinite, ${pulse} 4s ease-in-out infinite`}
                    opacity="0.6"
                  />
                  <Image
                    src="/svgs/hushhEmoji.svg"
                    alt="Hushh Logo"
                    w="100px"
                    h="100px"
                    position="relative"
                    zIndex={1}
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>
                
                {/* <VStack spacing={2} align={{ base: "center", lg: "flex-start" }}>
                  <Text
                    fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
                    fontFamily="Inter"
                    fontWeight={900}
                    letterSpacing="-0.03em"
                    lineHeight="0.85"
                    sx={{
                      background: "linear-gradient(135deg, #0071E3 0%, #BB62FC 30%, #F34556 70%, #F44F22 100%)",
                      backgroundSize: "300% 300%",
                      webkitBackgroundClip: "text",
                      backgroundClip: "text",
                      webkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                    animation={`${gradientShift} 6s ease infinite`}
                  >
                    Hushh
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color="rgba(255, 255, 255, 0.6)"
                    fontWeight={600}
                    letterSpacing="3px"
                    textTransform="uppercase"
                  >
                    Personal Data Agent
                  </Text>
                </VStack> */}
              </HStack>

              <VStack spacing={6} maxW="550px" align={{ base: "center", lg: "flex-start" }}>
                <Text
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight={800}
                  lineHeight="1.1"
                  color="white"
                  letterSpacing="-0.02em"
                >
                  Welcome to the Future of{" "}
                  <Text
                    as="span"
                    sx={{
                      background: "linear-gradient(90deg, #BB62FC 0%, #F34556 100%)",
                      backgroundSize: "200% 200%",
                      webkitBackgroundClip: "text",
                      backgroundClip: "text",
                      webkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                    animation={`${gradientShift} 4s ease infinite`}
                  >
                    Data Sovereignty
                  </Text>
                </Text>
                
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  color="rgba(255, 255, 255, 0.85)"
                  lineHeight="1.6"
                  fontWeight={400}
                >
                  Sign in to unlock your personal AI agent, take complete control of your data, and monetize your digital footprint on your own terms.
                </Text>
              </VStack>
            </VStack>

            {/* Enhanced Features Grid */}
            <Grid
              templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
              gap={4}
              w="full"
              maxW="550px"
            >
              {[
                { 
                  icon: "🛡️", 
                  title: "Privacy First", 
                  desc: "End-to-end encrypted vault",
                  gradient: "linear-gradient(135deg, #0071E3 0%, #00A3FF 100%)"
                },
                { 
                  icon: "🤖", 
                  title: "AI Powered", 
                  desc: "Intelligent automation",
                  gradient: "linear-gradient(135deg, #BB62FC 0%, #D478FF 100%)"
                },
                { 
                  icon: "💰", 
                  title: "Monetize Data", 
                  desc: "Earn from your information",
                  gradient: "linear-gradient(135deg, #F34556 0%, #FF6B7D 100%)"
                },
                { 
                  icon: "⚡", 
                  title: "Lightning Fast", 
                  desc: "Instant insights & actions",
                  gradient: "linear-gradient(135deg, #F44F22 0%, #FF7A4A 100%)"
                },
              ].map((feature, i) => (
                <Box
                  key={i}
                  p={5}
                  borderRadius="2xl"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(30px)"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.08)",
                    transform: "translateY(-4px) scale(1.02)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  animation={`${slideInUp} ${0.8 + i * 0.1}s ease-out`}
                  cursor="pointer"
                >
                  {/* Shimmer Effect */}
                  <Box
                    position="absolute"
                    top="0"
                    left="-100%"
                    w="100%"
                    h="100%"
                    sx={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    }}
                    animation={`${shimmer} 3s ease infinite`}
                    animationDelay={`${i * 0.5}s`}
                  />
                  
                  <VStack spacing={3} align="start" position="relative" zIndex={1}>
                    <HStack spacing={3}>
                      <Box
                        fontSize="2xl"
                        p={2}
                        borderRadius="lg"
                        sx={{ background: feature.gradient }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {feature.icon}
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="md" fontWeight={700} color="white">
                          {feature.title}
                        </Text>
                        <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
                          {feature.desc}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Flex>

        {/* Right Side - Advanced Login Form */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          px={{ base: 6, lg: 16 }}
          py={{ base: 12, lg: 0 }}
          position="relative"
        >
          {/* Glassmorphism Background */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="rgba(0, 0, 0, 0.2)"
            backdropFilter="blur(30px)"
            borderLeft={{ base: "none", lg: "1px solid rgba(255, 255, 255, 0.1)" }}
          />

          <VStack
            spacing={10}
            w="full"
            maxW="450px"
            animation={`${slideInUp} 1s ease-out`}
            position="relative"
            zIndex={1}
          >
            {/* Premium Login Card */}
            <Box
              w="full"
              p={10}
              borderRadius="3xl"
              bg="rgba(255, 255, 255, 0.08)"
              border="2px solid rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(40px)"
              boxShadow="0 40px 80px rgba(0, 0, 0, 0.4)"
              position="relative"
              overflow="hidden"
            >
              {/* Animated Border Glow */}
              <Box
                position="absolute"
                top="-2px"
                left="-2px"
                right="-2px"
                bottom="-2px"
                borderRadius="3xl"
                sx={{
                  background: "conic-gradient(from 0deg, #0071E3, #BB62FC, #F34556, #F44F22, #0071E3)",
                  backgroundSize: "400% 400%",
                }}
                animation={`${rotate} 8s linear infinite, ${gradientShift} 6s ease infinite`}
                opacity="0.6"
                zIndex={-1}
              />

              <VStack spacing={8} position="relative" zIndex={1}>
                <VStack spacing={4} textAlign="center">
                  <Text
                    fontSize="3xl"
                    fontWeight={800}
                    color="white"
                    letterSpacing="-0.02em"
                    sx={{
                      background: "linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)",
                      webkitBackgroundClip: "text",
                      backgroundClip: "text",
                      webkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    Sign In to Continue
                  </Text>
                  <Text
                    fontSize="md"
                    color="rgba(255, 255, 255, 0.75)"
                    lineHeight="1.6"
                    maxW="300px"
                  >
                    Access your personalized data dashboard and AI-powered insights in seconds
                  </Text>
                </VStack>

                {/* Premium Google Sign In Button */}
                <Button
                  onClick={handleGoogleSignIn}
                  isLoading={isSigningIn}
                  loadingText="Signing in..."
                  w="full"
                  h="64px"
                  bg="white"
                  color="#1a1a1a"
                  borderRadius="2xl"
                  fontSize="lg"
                  fontWeight={700}
                  border="2px solid transparent"
                  position="relative"
                  overflow="hidden"
                  boxShadow="0 10px 30px rgba(255, 255, 255, 0.1)"
                  _hover={{
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 40px rgba(255, 255, 255, 0.2)",
                    bg: "#f8f9fa",
                    _before: {
                      opacity: 1,
                    },
                  }}
                  _active={{
                    transform: "translateY(-1px)",
                  }}
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    background: "linear-gradient(45deg, #0071E3, #BB62FC, #F34556, #F44F22)",
                    borderRadius: "2xl",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    zIndex: -1,
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  leftIcon={
                    !isSigningIn && (
                      <Box w="24px" h="24px">
                        <svg viewBox="0 0 24 24" width="24" height="24">
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
                  rightIcon={
                    !isSigningIn && <ChevronRightIcon fontSize="xl" />
                  }
                >
                  Continue with Google
                </Button>

                {/* Premium Apple Sign In Button */}
                <AppleSignInButton 
                  isDisabled={isSigningIn}
                  onSuccess={(data) => {
                    console.log('Apple Sign-In Success:', data);
                    toast({
                      title: "🍎 Apple Sign-In Successful!",
                      description: "Welcome to Hushh! Redirecting you now...",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom",
                    });
                  }}
                  onError={(error) => {
                    console.error('Apple Sign-In Error:', error);
                    toast({
                      title: "Apple Sign-In Failed",
                      description: error.message || "Failed to sign in with Apple. Please try again.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom",
                    });
                  }}
                />

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
                </VStack> */}
              </VStack>
            </Box>

            {/* Legal Notice with Enhanced Styling */}
            <Box
              p={6}
              borderRadius="xl"
              bg="rgba(255, 255, 255, 0.03)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              backdropFilter="blur(20px)"
            >
              <Text
                fontSize="sm"
                color="rgba(255, 255, 255, 0.6)"
                textAlign="center"
                lineHeight="1.6"
              >
                By signing in, you agree to our{" "}
                <Link href="/legal/termsofuse">
                  <Text
                    as="span"
                    color="#0071E3"
                    textDecoration="underline"
                    fontWeight={600}
                    _hover={{ 
                      color: "#BB62FC",
                      textShadow: "0 0 8px rgba(0, 113, 227, 0.4)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Terms of Service
                  </Text>
                </Link>
                {" "}and{" "}
                <Link href="/legal/privacypolicy">
                  <Text
                    as="span"
                    color="#0071E3"
                    textDecoration="underline"
                    fontWeight={600}
                    _hover={{ 
                      color: "#BB62FC",
                      textShadow: "0 0 8px rgba(0, 113, 227, 0.4)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Privacy Policy
                  </Text>
                </Link>
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Grid>
      </Box>
    </ContentWrapper>
  );
};

export default function LoginPage() {
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
      <LoginPageContent />
    </Suspense>
  );
} 