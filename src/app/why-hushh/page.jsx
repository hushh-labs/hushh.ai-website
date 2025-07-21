'use client'
import React from 'react'
import { Container, VStack, Heading, Text, HStack, Button, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import NextImage from 'next/image'
// import BlackLockIcon from '@/public/images/black-lock-icon.png'
import ContentWrapper from '../_components/layout/ContentWrapper'

const page = () => {
  return (
    <Box bg="#f5f5f7">
    <ContentWrapper>
    <Container maxW="container.xl" pb={{ base: 20, md: 24, lg: 32 }}>
        <VStack spacing={{ base: 8, md: 12, lg: 16 }} align="center" maxW="6xl" mx={{base:4,md:6,lg:0}}>
          
          {/* Why Hushh? Badge */}
          <Box pt={{ base: 16, md: 20, lg: 24 }}>
            <Text
              fontSize={{ base: "lg", md: "2xl", lg: "2xl" }}
              fontWeight="700"
              textAlign="center"
              bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
              bgClip="text"
              letterSpacing="-0.02em"
              fontFamily="Inter, sans-serif"
            >
              Why Hushh?
            </Text>
          </Box>
          
          {/* Main Headline */}
          <VStack spacing={6} align="center">
            <Heading
              as="h1"
              fontSize={{ base: "40px", md: "64px", lg: "80px", xl: "96px" }}
              fontWeight="bold"
              textAlign="center"
              lineHeight={{ base: 1.1, md: 1.0, lg: 0.95 }}
              letterSpacing={{ base: "-1px", md: "-2px", lg: "-3px" }}
              color="black"
              fontFamily="Inter, sans-serif"
            //   maxW={{ base: "100%", md: "90%", lg: "85%", xl: "80%" }}
            >
              We're building
              <br />
              the Internet's trust layer.
            </Heading>
          </VStack>

          {/* Description Text */}
          <Text
            fontSize={{ base: "18px", md: "20px", lg: "24px" }}
            textAlign="center"
            lineHeight={{ base: 1.6, md: 1.5, lg: 1.4 }}
            color="#1d1d1d"
            fontWeight="400"
            maxW={{ base: "100%", md: "85%", lg: "75%", xl: "70%" }}
            px={{ base: 4, md: 6, lg: 0 }}
            fontFamily="Inter, sans-serif"
            letterSpacing="-0.01em"
          >
            Your data is sacred. We treat it that way. hushh was born to bring integrity, 
            clarity, and consent to every interaction between you and the digital world. 
            Our mission is to rearchitect the user-brand relationship — starting with you, the 
            iOS-verified human. We aim to replace surveillance-based business models with 
            aligned agent-to-agent trust protocols that respect the individual
          </Text>

        </VStack>
      </Container>

      {/* Our Philosophy Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
        <Box maxW="6xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          
          {/* Our Philosophy Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "36px", md: "48px", lg: "56px" }}
            fontWeight="bold"
            color="black"
            fontFamily="Inter, sans-serif"
            letterSpacing="-0.02em"
            lineHeight={1.1}
            mb={{ base: 8, md: 10, lg: 12 }}
          >
            Our Philosophy
          </Heading>

          {/* Opening Questions */}
          <Text
            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
            color="#1d1d1d"
            fontFamily="Inter, sans-serif"
            lineHeight={1.6}
            letterSpacing="-0.01em"
            mb={{ base: 6, md: 8 }}
            fontWeight="400"
          >
            In a world racing toward agentic automation, we slow down and ask:<br />
            Who owns the agent? Who owns the data? Who gets the upside?
          </Text>

          {/* Our Answer */}
          <Text
            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
            color="black"
            fontFamily="Inter, sans-serif"
            lineHeight={1.6}
            letterSpacing="-0.01em"
            mb={{ base: 6, md: 8 }}
            fontWeight="700"
          >
            Our answer: You do. We believe
          </Text>

          {/* Philosophy Points */}
          <VStack spacing={{ base: 4, md: 5 }} align="start" mb={{ base: 8, md: 10, lg: 12 }}>
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Box
                w="6px"
                h="6px"
                bg="black"
                borderRadius="50%"
                mt="10px"
                flexShrink={0}
              />
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                Consent is not a checkbox — it's a contract.
              </Text>
            </Box>

            <Box display="flex" alignItems="flex-start" gap={3}>
              <Box
                w="6px"
                h="6px"
                bg="black"
                borderRadius="50%"
                mt="10px"
                flexShrink={0}
              />
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                AI should serve the user — not the system.
              </Text>
            </Box>

            <Box display="flex" alignItems="flex-start" gap={3}>
              <Box
                w="6px"
                h="6px"
                bg="black"
                borderRadius="50%"
                mt="10px"
                flexShrink={0}
              />
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                Privacy is a design principle — not a feature.
              </Text>
            </Box>
          </VStack>

          {/* Blue Highlighted Statement */}
          <Text
            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
            color="#0071E3"
            fontFamily="Inter, sans-serif"
            lineHeight={1.6}
            letterSpacing="-0.01em"
            fontWeight="600"
          >
            We don't sell user data. We help users create value with it — on their terms.
          </Text>

        </Box>
      </Container>

      {/* Privacy Manifesto Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
        <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="center" maxW="4xl" mx="auto">
          
          {/* Privacy Manifesto Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "36px", md: "48px", lg: "56px" }}
            fontWeight="bold"
            color="black"
            fontFamily="Inter, sans-serif"
            letterSpacing="-0.02em"
            lineHeight={1.1}
            textAlign="center"
          >
            Privacy Manifesto
          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: "20px", md: "24px", lg: "28px" }}
            color="#1d1d1d"
            fontFamily="Inter, sans-serif"
            lineHeight={1.4}
            letterSpacing="-0.01em"
            fontWeight="400"
            textAlign="center"
          >
            We honor the human right to digital agency
          </Text>

          {/* Privacy Principles */}
          <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="center">
            <Text
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              color="black"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
            >
              No silent data collection
            </Text>

            <Text
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              color="black"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
            >
              No shadow inference
            </Text>

            <Text
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              color="black"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
            >
              Every function auditable, every action revocable
            </Text>

            <Text
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              color="black"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
            >
              Built for India DPDP, GDPR, and California CPRA from day zero
            </Text>
          </VStack>

          {/* Blue Highlighted Paragraph */}
          <Text
            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
            color="#0071E3"
            fontFamily="Inter, sans-serif"
            lineHeight={1.6}
            letterSpacing="-0.01em"
            fontWeight="500"
            textAlign="center"
            maxW={{ base: "100%", md: "90%", lg: "85%" }}
            px={{ base: 4, md: 0 }}
          >
            We believe that privacy isn't just about compliance — it's about respect, autonomy, and long-term trust. Our Consent AI Protocol enforces that belief in code.
          </Text>

          {/* CTA Button */}
          <Button
            size="lg"
            bg="transparent"
            color="#0071E3"
            border="2px solid #0071E3"
            borderRadius="full"
            px={{ base: 6, md: 8 }}
            py={{ base: 4, md: 5 }}
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="500"
            fontFamily="Inter, sans-serif"
            _hover={{ 
              bg: "#0071E3", 
              color: "white",
              transform: "translateY(-1px)",
              boxShadow: "0 10px 25px rgba(0, 113, 227, 0.3)"
            }}
            _active={{ 
              bg: "#005bb5",
              transform: "translateY(0px)"
            }}
            transition="all 0.2s ease"
          >
            View Privacy Manifesto
          </Button>

        </VStack>
      </Container>
    </ContentWrapper>

    {/* Consent Protocol Section - Dark */}
    <Box bg="black" color="white">
      <ContentWrapper>
        <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
          <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="center" maxW="4xl" mx="auto">
            
            {/* Consent Protocol Heading */}
            <Heading
              as="h2"
              fontSize={{ base: "36px", md: "48px", lg: "56px" }}
              fontWeight="bold"
              color="white"
              fontFamily="Inter, sans-serif"
              letterSpacing="-0.02em"
              lineHeight={1.1}
              textAlign="center"
            >
              Consent Protocol
            </Heading>

            {/* Protocol Description */}
            <Text
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              color="white"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
              maxW={{ base: "100%", md: "90%", lg: "85%" }}
              px={{ base: 4, md: 0 }}
            >
              We designed the Consent Protocol as the cryptographic handshake between agents, brands, and users
            </Text>

            {/* Protocol Features */}
            <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="center">
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="white"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
              >
                Every data flow is signed, scoped, timestamped
              </Text>

              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="white"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
              >
                Every interaction is logged and human-readable
              </Text>

              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="white"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
              >
                Revoke, replay, or limit any consent — at any time
              </Text>

              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="white"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
              >
                Compatible with OAuth2, Apple Sign-in, Google Auth, and beyond
              </Text>
            </VStack>

            {/* Blue Highlighted Statement */}
            <Text
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              color="#0071E3"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="500"
              textAlign="center"
              maxW={{ base: "100%", md: "90%", lg: "85%" }}
              px={{ base: 4, md: 0 }}
            >
              This protocol is our north star — and it's fully open
            </Text>

            {/* CTA Button */}
            <Button
              size="lg"
              bg="#0071E3"
              color="white"
              borderRadius="full"
              px={{ base: 6, md: 8 }}
              py={{ base: 4, md: 5 }}
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="500"
              fontFamily="Inter, sans-serif"
              _hover={{ 
                bg: "#005bb5",
                transform: "translateY(-1px)",
                boxShadow: "0 10px 25px rgba(0, 113, 227, 0.4)"
              }}
              _active={{ 
                bg: "#004494",
                transform: "translateY(0px)"
              }}
              transition="all 0.2s ease"
            >
              View Consent Protocol
            </Button>

          </VStack>
        </Container>
      </ContentWrapper>
    </Box>
    </Box>
  )
}

export default page