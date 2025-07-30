'use client'
import React from "react";
import Image from "next/image";
import { Box, Avatar } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import HushhLogo from "../_components/svg/hushhLogoS.svg";

const MyLogo = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Debug: Log auth state
  console.log('🔍 MyLogo Auth State:', {
    loading,
    isAuthenticated,
    user: user?.email || 'No user',
    avatar: user?.user_metadata?.avatar_url || 'No avatar'
  });

  // Show logo while loading
  if (loading) {
    return (
      <Box display="flex" alignItems="center">
        <Image src={HushhLogo} alt="Hushh Logo" width={34} height={34} />
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center">
      {isAuthenticated && user ? (
        // Only show avatar circle without any buttons or dropdown
        <Avatar 
          src={user.user_metadata?.avatar_url} 
          name={user.email} 
          size="md"
          cursor="default"
        />
      ) : (
        // Only show Hushh logo without login button
        <Image src={HushhLogo} alt="Hushh Logo" width={34} height={34} />
      )}
    </Box>
  );
};

export default MyLogo;