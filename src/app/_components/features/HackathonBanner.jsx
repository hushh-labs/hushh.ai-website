'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  Button,
  Flex,
  keyframes
} from '@chakra-ui/react';
import { HiExternalLink } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const HackathonBanner = () => {
  const router = useRouter();

  // Infinite slider animation for mobile
  const slideLeft = keyframes`
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  `;

  const handleHackathonClick = () => {
    router.push('/pda/iithackathon');
  };

  return (
    <Box
      bg="linear-gradient(90deg, #007BFF 0%, #E91E63 100%)"
      color="white"
      py={{ base: 2, md: 2.5 }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={9999}
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
    >
      {/* Mobile Infinite Slider Version */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        height={{ base: '40px', md: '45px' }}
        overflow="hidden"
        position="relative"
        cursor="pointer"
        onClick={handleHackathonClick}
        _hover={{ opacity: 0.9 }}
        transition="opacity 0.2s ease"
      >
        <Flex
          align="center"
          height="100%"
          position="absolute"
          whiteSpace="nowrap"
          animation={`${slideLeft} 20s linear infinite`}
        >
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="bold"
            fontFamily="Figtree"
            px={4}
            display="flex"
            alignItems="center"
            gap={2}
          >
            🚀 Hackathon for Our Open Source Protocol: Hushh Modular Consent Protocol for Agent to Agent Personal Data Agent Scenarios
            <Box
              as="span"
              bg="white"
              color="blue.600"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="xs"
              fontWeight="bold"
              ml={4}
            >
              Click to Join →
            </Box>
          </Text>
        </Flex>
      </Box>

      {/* Desktop Version - Keep unchanged */}
      <Container 
        maxW="container.xl" 
        px={{ base: 4, md: 8 }}
        display={{ base: 'none', lg: 'block' }}
      >
        <Flex
          align="center"
          justify="center"
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 2, lg: 4 }}
        >
          <Text
            fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            fontWeight="bold"
            fontFamily="Figtree"
            lineHeight="1.2"
            textAlign="center"
            flex={1}
          >
            🚀 <Text as="span" display={{ base: 'block', sm: 'inline' }}>Hackathon for Our Open Source Protocol:</Text>{' '}
            <Text as="span" opacity={0.9} fontWeight="normal" fontSize={{ base: '2xs', sm: 'xs', md: 'sm' }}>
              Hushh Modular Consent Protocol for Agent to Agent Personal Data Agent Scenarios
            </Text>
          </Text>

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
            minW={{ base: 'auto', lg: '120px' }}
            height={{ base: '32px', md: '36px' }}
            fontSize={{ base: 'xs', md: 'sm' }}
            flexShrink={0}
          >
            Join Now
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default HackathonBanner; 