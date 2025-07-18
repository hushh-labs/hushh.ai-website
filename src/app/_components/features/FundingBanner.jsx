'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  Flex,
  keyframes
} from '@chakra-ui/react';

const FundingBanner = () => {
  // Subtle fade-in animation
  const fadeIn = keyframes`
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  `;

  // Continuous infinite slider for mobile
  const slideLeft = keyframes`
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  `;

  return (
    <Box
      bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
      color="white"
      py={{ base: 1.5, md: 2 }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10000}
      boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      animation={`${fadeIn} 0.8s ease-out`}
    >
      {/* Mobile Continuous Slider Version */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        height="32px"
        overflow="hidden"
        position="relative"
      >
        <Flex
          align="center"
          height="100%"
          position="absolute"
          whiteSpace="nowrap"
          animation={`${slideLeft} 25s linear infinite`}
        >
          <Text
            fontSize="xs"
            fontWeight="600"
            fontFamily="Figtree"
            px={4}
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            💰 <Text as="span" color="#10b981">FUNDING NEWS:</Text> Hushh.ai Secures $5 Million Strategic Investment from hushhTech.com's Evergreen Renaissance AI Fund
          </Text>
          
          {/* Spacer */}
          <Box width="100px" />
          
          <Text
            fontSize="xs"
            fontWeight="600"
            fontFamily="Figtree"
            px={4}
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            💰 <Text as="span" color="#10b981">FUNDING NEWS:</Text> Hushh.ai Secures $5 Million Strategic Investment from hushhTech.com's Evergreen Renaissance AI Fund
          </Text>
        </Flex>
      </Box>

      {/* Desktop Version */}
      <Container 
        maxW="container.xl" 
        px={{ base: 4, md: 8 }}
        display={{ base: 'none', lg: 'block' }}
      >
        <Flex
          align="center"
          justify="center"
          textAlign="center"
        >
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="600"
            fontFamily="Figtree"
            lineHeight="1.3"
          >
            💰 <Text as="span" color="#10b981" fontWeight="700">FUNDING NEWS:</Text>{' '}
            <Text as="span">Hushh.ai Secures $5 Million Strategic Investment from hushhTech.com's Evergreen Renaissance AI Fund</Text>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default FundingBanner; 