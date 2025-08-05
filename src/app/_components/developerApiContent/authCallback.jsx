"use client";
import { useEffect } from 'react';
import { devApiSupabase } from './supabaseAuth';
import { useToast } from '@chakra-ui/react';

const AuthCallback = () => {
  const toast = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Handling auth callback...');
        
        // Handle the OAuth callback
        const { data, error } = await devApiSupabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          
          // Handle specific "User not found" error
          if (error.message?.includes('User not found') || error.message?.includes('server_error')) {
            toast({
              title: "Configuration Issue ⚠️",
              description: "Google OAuth is not properly configured in Supabase. Please check the Supabase authentication settings.",
              status: "warning",
              duration: 8000,
              isClosable: true,
              position: "top",
            });
          } else {
            toast({
              title: "Authentication Error",
              description: error.message || "Failed to complete authentication",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
          return;
        }

        if (data.session) {
          console.log('Authentication successful:', data.session.user);
          toast({
            title: "Success! 🎉",
            description: `Welcome ${data.session.user.email}! You are now signed in.`,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.error('Unexpected auth callback error:', error);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred during authentication",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };

    // Check if we're in a browser environment and handle errors from URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlHash = new URLSearchParams(window.location.hash.substring(1));
      
      const error = urlParams.get('error') || urlHash.get('error');
      const errorDescription = urlParams.get('error_description') || urlHash.get('error_description');
      const code = urlParams.get('code');
      
      if (error) {
        console.error('OAuth error from URL:', { error, errorDescription });
        
        if (error === 'server_error' && errorDescription?.includes('User not found')) {
          toast({
            title: "Setup Required 🔧",
            description: "Google OAuth needs to be configured in your Supabase project. Check the authentication providers settings.",
            status: "warning",
            duration: 10000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "OAuth Error",
            description: decodeURIComponent(errorDescription || error),
            status: "error",
            duration: 8000,
            isClosable: true,
            position: "top",
          });
        }
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      if (code) {
        handleAuthCallback();
      }
    }
  }, [toast]);

  return null; // This component doesn't render anything
};

export default AuthCallback;