'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  Button,
  Flex,
  VStack
} from '@chakra-ui/react';
import { HiExternalLink } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const HackathonBanner = () => {
  const router = useRouter();

  const handleHackathonClick = () => {
    router.push('/pda/iithackathon');
  };

  return (
    <Box
      bg="linear-gradient(90deg, #007BFF 0%, #E91E63 100%)"
      color="white"
      py={{ base: 3, md: 4 }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={9999}
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Flex
          align="center"
          justify="center"
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 4 }}
        >
          <Flex
            align="center"
            justify="center"
            flex={1}
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 2, sm: 4 }}
            textAlign="center"
          >
            <VStack spacing={1} align="center">
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight="bold"
                fontFamily="Figtree"
                lineHeight="1.4"
              >
                🚀 Announcing the Hackathon for Our Open Source Protocol Project
              </Text>
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                opacity={0.9}
                fontFamily="Figtree"
                lineHeight="1.3"
              >
                Hushh Modular Consent Protocol for Agent to Agent Personal Data Agent Scenarios
              </Text>
            </VStack>

            <Button
              size={{ base: 'sm', md: 'md' }}
              bg="white"
              color="blue.600"
              _hover={{
                bg: 'gray.100',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              fontWeight="bold"
              borderRadius="md"
              onClick={handleHackathonClick}
              rightIcon={<HiExternalLink />}
              transition="all 0.2s ease"
              minW={{ base: 'auto', md: '140px' }}
            >
              Join Hackathon
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default HackathonBanner; 