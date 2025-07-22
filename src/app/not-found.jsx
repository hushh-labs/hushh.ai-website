import { Box, Container, VStack, Heading, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxW="7xl" pt={{ base: 24, md: 32 }}>
      <VStack spacing={8} textAlign="center" minH="60vh" justify="center">
        <Box>
          <Heading 
            as="h1" 
            size="4xl" 
            color="gray.900"
            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            mb={4}
          >
            404
          </Heading>
          <Heading 
            as="h2" 
            size="xl" 
            color="gray.700"
            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            mb={4}
          >
            Page Not Found
          </Heading>
          <Text 
            color="gray.600" 
            fontSize="lg"
            fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            maxW="md"
            mx="auto"
          >
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </Text>
        </Box>
        
        <Button
          as={Link}
          href="/"
          bg="blue.600"
          color="white"
          size="lg"
          borderRadius="12px"
          px={8}
          _hover={{ bg: "blue.700" }}
          fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        >
          Return Home
        </Button>
      </VStack>
    </Container>
  );
} 