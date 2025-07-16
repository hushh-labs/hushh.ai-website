"use client";
import React, { useState } from 'react';
import {
  Button,
  HStack,
  Text,
  Icon,
  useToast,
  Box,
  keyframes,
} from '@chakra-ui/react';
import appleAuthService from '../services/appleAuthService.js';

// Apple Logo SVG Component
const AppleIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
    />
  </Icon>
);

// Loading animation keyframes
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const AppleSignInButton = ({ 
  isDisabled = false, 
  onSuccess = null, 
  onError = null,
  variant = "default", // "default", "minimal", "icon-only"
  size = "lg",
  fullWidth = true 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Handle Apple Sign-In button click
  const handleAppleSignIn = async () => {
    if (isLoading || isDisabled) return;

    setIsLoading(true);
    
    try {
      console.log('Apple Sign-In button clicked');
      
      // Show loading toast
      const loadingToast = toast({
        title: "🍎 Connecting to Apple...",
        description: "Please wait while we redirect you to Apple Sign-In",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Initiate Apple OAuth flow
      const { data, error } = await appleAuthService.signInWithAppleOAuth();

      if (error) {
        console.error('Apple Sign-In Error:', error);
        
        // Close loading toast
        toast.close(loadingToast);
        
        // Show error toast
        // toast({
        //   title: "Apple Sign-In Error",
        //   description: error.message || "Failed to connect to Apple. Please try again.",
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "top",
        // });

        // Call error callback
        if (onError && typeof onError === 'function') {
          onError(error);
        }
        
        return;
      }

      console.log('Apple Sign-In initiated successfully:', data);
      
      // Success callback
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(data);
      }

      // Note: The user will be redirected to Apple, so we don't set loading to false here
      // The loading state will be reset when the component unmounts or when user returns

    } catch (error) {
      console.error('Unexpected Apple Sign-In error:', error);
      
      // toast({
      //   title: "Unexpected Error",
      //   description: "An unexpected error occurred. Please try again.",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "top",
      // });

      // Call error callback
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    } finally {
      // Only reset loading if we're still on the page (not redirected)
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname === '/login') {
          setIsLoading(false);
        }
      }, 1000);
    }
  };

  // Button content based on variant
  const getButtonContent = () => {
    switch (variant) {
      case "minimal":
        return (
          <HStack spacing={2}>
            <AppleIcon w="18px" h="18px" />
            <Text fontSize="sm" fontWeight={600}>
              Apple
            </Text>
          </HStack>
        );
      
      case "icon-only":
        return <AppleIcon w="20px" h="20px" />;
      
      default:
        return (
          <HStack spacing={3}>
            {isLoading ? (
              <Box
                w="20px"
                h="20px"
                border="2px solid"
                borderColor="currentColor"
                borderTopColor="transparent"
                borderRadius="50%"
                animation={`${spin} 1s linear infinite`}
              />
            ) : (
              <AppleIcon w="20px" h="20px" />
            )}
            <Text fontSize="md" fontWeight={600}>
              {isLoading ? "Connecting..." : "Continue with Apple"}
            </Text>
          </HStack>
        );
    }
  };

  // Button size configurations
  const sizeConfig = {
    sm: { h: "44px", fontSize: "sm", px: 4 },
    md: { h: "52px", fontSize: "md", px: 6 },
    lg: { h: "64px", fontSize: "lg", px: 8 },
    xl: { h: "72px", fontSize: "xl", px: 10 }
  };

  const currentSize = sizeConfig[size] || sizeConfig.lg;

  return (
    <Button
      onClick={handleAppleSignIn}
      isLoading={isLoading}
      isDisabled={isDisabled}
      w={fullWidth ? "full" : "auto"}
      h={currentSize.h}
      px={currentSize.px}
      bg="#000000"
      color="white"
      borderRadius="2xl"
      fontSize={currentSize.fontSize}
      fontWeight={700}
      border="2px solid transparent"
      position="relative"
      overflow="hidden"
      boxShadow="0 8px 24px rgba(0, 0, 0, 0.15)"
      _hover={{
        bg: "#1a1a1a",
        transform: "translateY(-2px)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
        _before: {
          opacity: 1,
        },
      }}
      _active={{
        transform: "translateY(0px)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
      }}
      _disabled={{
        bg: "#666666",
        color: "#cccccc",
        cursor: "not-allowed",
        transform: "none",
        boxShadow: "none",
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        w: "100%",
        h: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        opacity: 0,
        transition: "opacity 0.3s ease, left 0.6s ease",
        zIndex: 1,
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      sx={{
        '&:hover:before': {
          left: "100%",
          opacity: 1,
        },
        // Apple-specific styling for better brand compliance
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      <Box position="relative" zIndex={2}>
        {getButtonContent()}
      </Box>
    </Button>
  );
};

export default AppleSignInButton; 