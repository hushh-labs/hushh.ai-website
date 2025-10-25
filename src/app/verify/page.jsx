'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Heading, Text, VStack, Spinner, Icon } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verifyPass() {
      if (!token) {
        setError('No verification token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/wallet/verify?token=${encodeURIComponent(token)}`);
        const data = await response.json();

        if (response.ok && data.valid) {
          setVerificationData(data);
        } else {
          setError(data.reason || 'Verification failed');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('Failed to verify pass');
      } finally {
        setLoading(false);
      }
    }

    verifyPass();
  }, [token]);

  return (
    <Box 
      minH="100vh" 
      bg="white" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      py={20}
    >
      <Container maxW="container.sm">
        <VStack spacing={8} align="center" textAlign="center">
          {loading ? (
            <>
              <Spinner size="xl" color="gray.800" thickness="3px" />
              <Text fontSize="lg" color="gray.600">
                Verifying pass...
              </Text>
            </>
          ) : error ? (
            <>
              <Icon as={WarningIcon} boxSize={16} color="red.500" />
              <Heading size="xl" color="gray.800">
                Invalid Pass
              </Heading>
              <Text fontSize="lg" color="gray.600">
                {error === 'not_found' && 'This pass was not found in our system.'}
                {error === 'revoked' && 'This pass has been revoked.'}
                {error === 'missing_token' && 'No verification token provided.'}
                {!['not_found', 'revoked', 'missing_token'].includes(error) && 'Unable to verify this pass.'}
              </Text>
            </>
          ) : (
            <>
              <Icon as={CheckCircleIcon} boxSize={16} color="green.500" />
              <Heading size="xl" color="gray.800">
                Verified
              </Heading>
              
              <VStack 
                spacing={4} 
                w="full" 
                bg="gray.50" 
                p={8} 
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Box w="full">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
                    NAME
                  </Text>
                  <Text fontSize="xl" color="gray.800" fontWeight="semibold">
                    {verificationData?.name}
                  </Text>
                </Box>

                {verificationData?.handle && (
                  <Box w="full">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
                      HANDLE
                    </Text>
                    <Text fontSize="xl" color="gray.800" fontWeight="semibold">
                      @{verificationData.handle}
                    </Text>
                  </Box>
                )}

                <Box w="full">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
                    SERIAL NUMBER
                  </Text>
                  <Text fontSize="md" color="gray.600" fontFamily="mono">
                    {verificationData?.serial}
                  </Text>
                </Box>

                <Box w="full">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
                    ISSUED
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {verificationData?.issuedAt && new Date(verificationData.issuedAt).toLocaleDateString()}
                  </Text>
                </Box>
              </VStack>

              {verificationData?.message && (
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                  {verificationData.message}
                </Text>
              )}

              <Box pt={4}>
                <Text fontSize="sm" color="gray.400">
                  Hushh Social Card • HushOne, Inc.
                </Text>
              </Box>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

