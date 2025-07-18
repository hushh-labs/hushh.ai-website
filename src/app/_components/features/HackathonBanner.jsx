'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  Button,
  Flex
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
      py={{ base: 2, md: 2.5 }}
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