"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

/**
 * Custom hook for handling the complete Get Your Hushh Id authentication flow
 * This hook can be used in any component that needs the authentication flow
 * 
 * @returns {Object} - Returns handler function, loading states, and utilities
 */
export const useHushhIdFlow = () => {
  const router = useRouter();
  const toast = useToast();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState(null); // null = loading, true = exists, false = doesn't exist
  const [lastCheckedEmail, setLastCheckedEmail] = useState(null); // Cache to prevent repeated API calls

  // API configuration for checking user registration status
  const API_BASE_URL = "https://hushh-api-53407187172.us-central1.run.app/api";
  const API_HEADERS = {
    'Content-Type': 'application/json'
  };

  /**
   * Function to check if user is already registered
   * @param {string} email - User's email address
   * @param {boolean} updateState - Whether to update the centralized state (default: true)
   * @returns {boolean} - Whether user is registered or not
   */
  const checkUserRegistrationStatus = async (email, updateState = true) => {
    try {
      // If we're checking the same email and already have a result, return cached result
      if (email === lastCheckedEmail && userExists !== null && !updateState) {
        console.log('Using cached user existence result:', userExists);
        return userExists;
      }

      console.log('🔍 Checking if user is registered:', email);
      
      if (updateState) {
        setIsCheckingUser(true);
      }
      
      const response = await fetch(
        `${API_BASE_URL}/check-user?email=${email}`,
        { 
          method: 'GET',
          headers: API_HEADERS 
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ User registration check response:', data);
        
        // Check if user exists and is registered
        // API returns { "message": "User exists" } when user is found
        const exists = data && (data.exists === true || data.message === "User exists");
        
        if (updateState) {
          setUserExists(exists);
          setLastCheckedEmail(email);
          console.log('📝 Updated userExists state to:', exists);
        }
        
        return exists;
      } else {
        console.error('❌ Failed to check user registration status:', response.status);
        if (updateState) {
          setUserExists(false);
          setLastCheckedEmail(email);
        }
        return false;
      }
    } catch (error) {
      console.error('💥 Error checking user registration status:', error);
      if (updateState) {
        setUserExists(false);
        setLastCheckedEmail(email);
      }
      return false;
    } finally {
      if (updateState) {
        setIsCheckingUser(false);
      }
    }
  };

  // Automatically check user existence when user changes
  useEffect(() => {
    if (user?.email && user.email !== lastCheckedEmail) {
      console.log('👤 User changed, checking registration status for:', user.email);
      checkUserRegistrationStatus(user.email, true);
    } else if (!user?.email) {
      // Reset state when user logs out
      setUserExists(null);
      setLastCheckedEmail(null);
      console.log('🚪 User logged out, resetting state');
    }
  }, [user?.email]);

  /**
   * Main handler for the Get Your Hushh Id flow
   * Handles all authentication stages with proper redirects and notifications
   */
  const handleGetHushhId = async () => {
    try {
      // Stage 1: Check authentication status
      if (authLoading) {
        toast({
          title: "🔄 Loading...",
          description: "Please wait while we check your authentication status.",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      // Stage 2: Allow anyone to proceed directly to the registration flow when no session exists
      if (!user?.email) {
        toast({
          title: "📝 Let's set up your profile",
          description: "Complete the form to instantly generate your demo Hushh ID.",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        setTimeout(() => {
          router.push('/user-registration');
        }, 500);
        return;
      }

      // Stage 3: Check user registration status for authenticated users

      // If we don't have user existence data yet, check it first
      if (userExists === null) {
        setIsCheckingUser(true);
        toast({
          title: "🔍 Checking Profile...",
          description: "Please wait while we check your registration status.",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        // Check user registration status and wait for it
        const isUserRegistered = await checkUserRegistrationStatus(user.email, true);
        
        if (isUserRegistered) {
          // Stage 4: User is registered - redirect to profile page
          toast({
            title: "🎉 Welcome Back!",
            description: "You already have a Hushh ID! Redirecting to your profile page...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          
          setTimeout(() => {
            router.push('/user-profile');
          }, 1500);
        } else {
          // Stage 5: User is authenticated but not registered - redirect to registration
          toast({
            title: "📝 Complete Your Profile",
            description: "Just one more step! Please complete your registration to get your Hushh ID.",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          
          setTimeout(() => {
            router.push('/user-registration');
          }, 1500);
        }
        return;
      }

      // Use cached user existence data
      if (userExists) {
        // Stage 4: User is registered - redirect to profile page
        toast({
          title: "🎉 Welcome Back!",
          description: "You already have a Hushh ID! Redirecting to your profile page...",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        
        setTimeout(() => {
          router.push('/user-profile');
        }, 1500);
      } else {
        // Stage 5: User is authenticated but not registered - redirect to registration
        toast({
          title: "📝 Complete Your Profile",
          description: "Just one more step! Please complete your registration to get your Hushh ID.",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        
        setTimeout(() => {
          router.push('/user-registration');
        }, 1500);
      }

    } catch (error) {
      console.error('Error in Get Hushh ID flow:', error);
      
      toast({
        title: "❌ Something Went Wrong",
        description: "An unexpected error occurred. Please try again or contact support.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsCheckingUser(false);
    }
  };

  /**
   * Quick authentication status check without redirects
   * Useful for conditional rendering
   * @returns {Object} - Current authentication state
   */
  const getAuthStatus = () => {
    return {
      isAuthenticated,
      user,
      authLoading,
      hasEmail: user?.email ? true : false,
    };
  };

  /**
   * Direct navigation helpers for specific scenarios
   */
  const navigateToLogin = () => {
    toast({
      title: "🔐 Redirecting to Login",
      description: "Taking you to the login page...",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => router.push('/login'), 500);
  };

  const navigateToRegistration = () => {
    toast({
      title: "📝 Redirecting to Registration",
      description: "Complete your profile to get your Hushh ID...",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => router.push('/user-registration'), 500);
  };

  const navigateToProfile = () => {
    toast({
      title: "👤 Redirecting to Profile",
      description: "Taking you to your profile page...",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => router.push('/user-profile'), 500);
  };

  // Return all necessary functions and states
  return {
    // Main handler
    handleGetHushhId,
    
    // Loading states
    isCheckingUser,
    authLoading,
    
    // Auth status
    isAuthenticated,
    user,
    
    // User existence state (centralized)
    userExists,
    lastCheckedEmail,
    
    // Utility functions
    getAuthStatus,
    checkUserRegistrationStatus,
    
    // Direct navigation helpers
    navigateToLogin,
    navigateToRegistration,
    navigateToProfile,
    
    // Combined loading state for button disabled state
    isLoading: authLoading || isCheckingUser,
  };
};

export default useHushhIdFlow; 