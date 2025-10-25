'use client';

import { useState } from 'react';
import { Button, useToast, Icon, HStack, Text } from '@chakra-ui/react';
import { FaApple } from 'react-icons/fa';

/**
 * Apple Wallet Button Component
 * Generates and downloads a Hushh Social Card for Apple Wallet
 */
export default function AppleWalletButton({ userData, variant = 'solid', size = 'md', fullWidth = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleAddToAppleWallet = async () => {
    try {
      setIsLoading(true);

      // Prepare user data
      const fullName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
      const handle = userData.hushh_id || userData.email?.split('@')[0];
      const uid = userData.uid || userData.id;

      if (!fullName) {
        toast({
          title: 'Missing Information',
          description: 'Please complete your profile before generating a pass.',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Show loading toast
      const loadingToast = toast({
        title: 'Generating Pass',
        description: 'Creating your Hushh Social Card...',
        status: 'info',
        duration: null,
        isClosable: false,
      });

      // Call API to generate pass
      const response = await fetch('/api/wallet/apple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          handle,
          uid,
        }),
      });

      // Close loading toast
      toast.close(loadingToast);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate pass');
      }

      // Get the pass file
      const blob = await response.blob();
      const filename = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'hushh-card.pkpass';

      // Download the pass
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Show success message
      toast({
        title: 'Pass Ready!',
        description: 'Your Hushh Social Card has been downloaded. Open it to add to Apple Wallet.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Error generating Apple Wallet pass:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate Apple Wallet pass. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToAppleWallet}
      isLoading={isLoading}
      loadingText="Generating..."
      variant={variant}
      size={size}
      width={fullWidth ? 'full' : 'auto'}
      bg="black"
      color="white"
      _hover={{
        bg: 'gray.800',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      _active={{
        bg: 'gray.900',
        transform: 'translateY(0)',
      }}
      transition="all 0.2s"
      borderRadius="lg"
      fontWeight="600"
      px={6}
      py={size === 'lg' ? 7 : 6}
    >
      <HStack spacing={2}>
        <Icon as={FaApple} boxSize={size === 'lg' ? 6 : 5} />
        <Text>Add to Apple Wallet</Text>
      </HStack>
    </Button>
  );
}

