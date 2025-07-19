"use client";
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHushhIdFlow } from "../../hooks/useHushhIdFlow";

// Reverting to user's original import paths
import ecosystemPhone from "../svg/join_the_eco.svg";
import vaultImage from "../svg/vault.svg";
import linkImage from "../svg/link.svg";
import agentKitImage from "../svg/agent_kit.svg";
import flowImage from "../svg/flow.svg";
import verifiedUserImage from "../svg/for_verified_ios.svg";
import consentCookieImage from "../svg/consent_is_the_new_cookie.png";
import appleIcon from "../../_components/svg/icons/appleIconLogo.svg";
import IosIcon from "../../_components/svg/icons/iOS.svg";
import cloudIcon from "../../_components/svg/icons/cloudIcon.svg";
import fingerprintIcon from "../../_components/svg/icons/fingerprintIcon.svg";

const VerifiediOSUserSection = () => {
  const router = useRouter();
  
  // Use the reusable authentication flow hook
  const { 
    handleGetHushhId, 
    isLoading, 
    isCheckingUser, 
    authLoading 
  } = useHushhIdFlow();

  const verifiedFeatures = [
    { icon: appleIcon, text: "Apple Verified" },
    { icon: IosIcon, text: "iOS", subtext: "Mobile First" },
    { icon: cloudIcon, text: "Cloud Ready" },
  ];

  const FeatureCard = ({ title, description, image, variant = "default" }) => {
    const cardContent = {
      default: (
        <VStack spacing={4} align="center" h="full" justifyContent="space-between">
          <VStack align="center" spacing={2}>
            <Heading 
              as="h4" 
              color="#000" 
              textAlign="center" 
              fontFamily="Inter" 
              fontSize={{md:'2.5rem',base:'1.5rem'}} 
              fontStyle="normal" 
              fontWeight="800" 
              lineHeight="normal"
            >
              {title}
            </Heading>
            <Text 
              color="#585858" 
              textAlign="center" 
              fontFamily="Inter" 
              fontSize={{md:'1.5rem',base:'1rem'}}
              fontWeight="500" 
              lineHeight="normal"
            >
              {description}
            </Text>
          </VStack>
          <Box w="full" h="250px" position="relative" alignSelf="center">
            <Image src={image} alt={title} layout="fill" objectFit="contain" />
          </Box>
        </VStack>
      ),
      background: (
        <HStack h="full" w="full" borderRadius={'30px'} spacing={0} align="stretch" position={'relative'}>
          <VStack
            w="60%"
            p={{ base: 6, md: 14 }}
            align="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Heading as="h4" textAlign={'left'} fontSize={{md:'2.5rem',base:'1.5rem'}} fontWeight="bold" color='hsla(0, 0%, 0%, 1)'>{title}</Heading>
            <Text color={'hsla(0, 0%, 35%, 1)'}  fontSize={{md:'1.5rem',base:'1rem'}} fontWeight="medium" textAlign="left">{description}</Text>
          </VStack>
          <Box w="40%" h="full" position="absolute" right={0} top={0}>
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </Box>
        </HStack>
      ),
      horizontal: (
         <HStack w="full" spacing={4} borderRadius={'30px'} align="center" h="full" p={{ base: 6, md: 8 }}>
            <Box w="40%" h="100px" position="relative">
                <Image src={image}  alt={title} layout="fill" objectFit="contain" objectPosition="left" />
            </Box>
            <VStack align="right" w="60%">
                <Heading as="h4" textAlign={'right'} fontSize={{md:'2.5rem',base:'1.5rem'}}  fontWeight="bold" color='hsla(0, 0%, 0%, 1)'>{title}</Heading>
                <Text color={'hsla(0, 0%, 35%, 1)'}  fontSize={{md:'1.5rem',base:'1rem'}} fontWeight="medium" textAlign="right">{description}</Text>
            </VStack>
        </HStack>
      )
    };

    // Mobile-specific layout
    const mobileLayout = (
      <HStack w="full" spacing={4} align="center" h="full" p={6} borderRadius="30px">
        <Box w="30%" h="80px" position="relative">
          <Image src={image} alt={title} layout="fill" objectFit="contain" objectPosition="left" />
        </Box>
        <VStack align="flex-start" w="70%" spacing={1}>
          <Heading as="h4" fontSize={'1.5rem'} fontWeight="bold" color='hsla(0, 0%, 0%, 1)'>{title}</Heading>
          <Text color={'hsla(0, 0%, 35%, 1)'} fontSize={'1rem'} fontWeight="medium">{description}</Text>
        </VStack>
      </HStack>
    );

    return (
      <Box
        bg="white"
        p={(variant === 'background' || variant === 'horizontal') ? 0 : { base: 6, md: 8 }}
        borderRadius="30px"
        h="full"
        boxShadow="0px 10px 4px 0px rgba(0, 0, 0, 0.25)"
        overflow="hidden"
      >
        {/* Show mobile layout on small screens, regular layout on larger screens */}
        <Box display={{ base: 'block', md: 'none' }}>
          {mobileLayout}
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          {cardContent[variant]}
        </Box>
      </Box>
    );
  };

  return (
    <Box bg="#F8F9FA" py={{ base: 12, md: 24 }}>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 16, md: 10 }}>

          {/* Section 1: Join the Ecosystem */}
          <VStack w="full" spacing={8}>
            {/* Desktop Layout */}
            <Flex w="full" justify="space-between" align="center" display={{ base: "none", lg: "flex" }}>
              <VStack w="30%" align="flex-start" spacing={6}>
                 <Image src={fingerprintIcon} alt="Ecosystem Icon" width={80} height={80} />
                 <Heading as="h2" fontSize="5xl" fontWeight="bold">Join the Ecosystem Today</Heading>
                 <Button 
                   bg="black" 
                   color="white" 
                   borderRadius="full" 
                   px={8} 
                   h="60px" 
                   fontSize="xl" 
                   _hover={{ bg: "#333" }} 
                   onClick={handleGetHushhId}
                   isLoading={isLoading}
                   loadingText={isCheckingUser ? "Checking..." : "Loading..."}
                   isDisabled={isLoading}
                 >
                   Get Your Hushh Id
                 </Button>
              </VStack>
              <Box position="relative" w="320px" transform="rotate(-8deg)"  borderRadius="40px">
                 <Image src={ecosystemPhone} alt="Ecosystem Phone" borderRadius="40px" />
              </Box>
              <VStack w="30%" align="flex-end" spacing={4} textAlign="right">
                <Heading as="h3" fontSize="5xl" fontWeight="bold" sx={{ background: "linear-gradient(90deg, #0071e3, #bb62fc, #da4b7a, #f44f22)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>A Eukaryotic Backbone</Heading>
                <Text fontSize="xl" color="gray.600">Structured coordination for platform-level orchestration</Text>
              </VStack>
            </Flex>
            {/* Mobile Layout */}
            <VStack w="full" spacing={8} display={{ base: "flex", lg: "none" }} textAlign="center">
              <Image src={fingerprintIcon} alt="Ecosystem Icon" width={60} height={60} />
              <Heading as="h2" fontSize="4xl" fontWeight="bold">Join the Ecosystem Today</Heading>
              <Box w="80%" maxW="280px" my={4}>
                 <Image src={ecosystemPhone} alt="Ecosystem Phone" borderRadius="30px" />
              </Box>
              <Button 
                bg="black" 
                color="white" 
                borderRadius="full" 
                px={8} 
                h="50px" 
                fontSize="lg" 
                _hover={{ bg: "#333" }} 
                onClick={handleGetHushhId}
                isLoading={isLoading}
                loadingText={isCheckingUser ? "Checking..." : "Loading..."}
                isDisabled={isLoading}
              >
                Get Your Hushh Id
              </Button>
               <VStack spacing={4} pt={8}>
                <Heading as="h3" fontSize="4xl" fontWeight="bold" sx={{ background: "linear-gradient(90deg, #0071e3, #bb62fc, #da4b7a, #f44f22)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>A Eukaryotic Backbone</Heading>
                <Text fontSize="lg" color="gray.600">Structured coordination for platform-level orchestration</Text>
              </VStack>
            </VStack>
          </VStack>
          
          {/* Section 2: Feature Cards */}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)"}}
            gap={6}
            w="full"
            mt={{base: 0, md: -12}}
            alignItems="stretch"
          >
            <GridItem borderRadius={'30px'}>
                 <FeatureCard
                    title="Vault"
                    description="Secure data schema, encryption utils"
                    image={vaultImage}
                    variant="default"
                 />
            </GridItem>
            <GridItem>
                <VStack spacing={6} h="full" display={{ base: "none", md: "flex" }}>
                    <FeatureCard
                        title="Link"
                        description="Identity + permission contracts"
                        image={linkImage}
                        variant="background"
                    />
                    <FeatureCard
                        title="Flow"
                        description="Monetization & marketplace functions"
                        image={flowImage}
                        variant="horizontal"
                    />
                </VStack>
                {/* Mobile-only versions of Link and Flow cards */}
                <VStack spacing={6} h="full" display={{ base: "flex", md: "none" }}>
                    <Box
                      bg="white"
                      borderRadius="30px"
                      h="full"
                      boxShadow="0px 10px 4px 0px rgba(0, 0, 0, 0.25)"
                      overflow="hidden"
                    >
                      <HStack w="full" spacing={4} align="center" h="full" p={6} borderRadius="30px">
                        <Box w="30%" h="80px" position="relative">
                          <Image src={linkImage} alt="Link" layout="fill" objectFit="contain" objectPosition="left" />
                        </Box>
                        <VStack align="flex-start" w="70%" spacing={1}>
                          <Heading as="h4" fontSize={'1.5rem'} fontWeight="bold" color='hsla(0, 0%, 0%, 1)'>Link</Heading>
                          <Text color={'hsla(0, 0%, 35%, 1)'} fontSize={'1rem'} fontWeight="medium">Identity + permission contracts</Text>
                        </VStack>
                      </HStack>
                    </Box>
                    <Box
                      bg="white"
                      borderRadius="30px"
                      h="full"
                      boxShadow="0px 10px 4px 0px rgba(0, 0, 0, 0.25)"
                      overflow="hidden"
                    >
                      <HStack w="full" spacing={4} align="center" h="full" p={6} borderRadius="30px">
                        <Box w="35%" h="100px" position="relative">
                          <Image src={flowImage} alt="Flow" layout="fill" objectFit="contain" objectPosition="left" />
                        </Box>
                        <VStack align="flex-start" w="65%" spacing={1}>
                          <Heading as="h4" fontSize={'1.5rem'} fontWeight="bold" color='hsla(0, 0%, 0%, 1)'>Flow</Heading>
                          <Text color={'hsla(0, 0%, 35%, 1)'} fontSize={'1rem'} fontWeight="medium">Monetization & marketplace functions</Text>
                        </VStack>
                      </HStack>
                    </Box>
                </VStack>
            </GridItem>
            <GridItem borderRadius={'30px'}>
                 <FeatureCard
                    title="Agent Kit"
                    description="Scaffolded dev templates"
                    image={agentKitImage}
                    variant="default"
                 />
            </GridItem>
          </Grid>

          {/* Section 3: Verified iOS User */}
          <Box bg="#F5F5F7" borderRadius="45px" p={{ base: 6, md: 12 }} w="full">
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 10, lg: 16 }} alignItems="center">
               <Flex direction={{ base: "column", md: "row" }} align="center" gap={8}>
               <VStack spacing={10} align={{ base: "center", md: "flex-start" }}>
                  {verifiedFeatures.map((item, index) => (
                    <HStack key={index} spacing={4}>
                      <Image src={item.icon} alt="" width={40} height={40} />
                      <VStack align="flex-start" spacing={0}>
                         <Text fontSize="xl" fontWeight="medium" whiteSpace="nowrap">{item.text}</Text>
                         {item.subtext && <Text fontSize="lg" color="gray.500">{item.subtext}</Text>}
                      </VStack>
                    </HStack>
                  ))}
                 </VStack>
                 <Image src={verifiedUserImage} alt="Verified iOS User" borderRadius="30px" w={{ base: "100%", md: "50%" }} maxW="300px"/>
                
               </Flex>
              <VStack spacing={6} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                <Heading as="h2" fontSize={{ base: "4xl", sm: "5xl" }} fontWeight="bold" color="black">For the Verified iOS User</Heading>
                <Heading as="h3" fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="bold" color="gray.500">How we work?</Heading>
                <Text fontSize={{ base: "lg", md: "xl" }} color="black">
                  You initiate a smart request; your personal agent then privately checks your data, not algorithms. Trusted brand agents respond through your agent, enabling you to choose products securely and effortlessly from curated options.
                </Text>
                <Button bg="black" color="white" borderRadius="full" px={8} h="60px" _hover={{ bg: "#333" }} onClick={() => router.push("https://calendly.com/hushh/30min?month=2025-07")}>
                  Learn More
                </Button>
              </VStack>
            </Grid>
          </Box>

          {/* Section 4: Consent is the New Cookie */}
          <Box bg="#F5F5F7" borderRadius="45px" p={{ base: 6, md: 12 }} w="full">
             <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 10, lg: 16 }} alignItems="center">
                <Image src={consentCookieImage} alt="Consent is the new cookie" borderRadius="30px" />
                <VStack spacing={6} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                    <Heading as="h2" fontSize={{ base: "4xl", sm: "5xl" }} fontWeight="bold" color="black">Consent is the New Cookie</Heading>
                    <Text fontSize={{ base: "lg", md: "xl" }} color="black">
                        Hushh helps brands engage users with trust-first intelligence. Personal data agents become your best sales reps — always aligned with customer needs
                    </Text>
                    <HStack spacing={4} wrap="wrap" justify="center">
                         <Button bg="black" color="white" borderRadius="full" px={8} h="60px" _hover={{ bg: "#333" }} onClick={() => router.push("/contact-us")}>Become a Partner</Button>
                         <Button variant="outline" borderColor="black" color="black" borderRadius="full" px={8} h="60px" _hover={{ bg: "gray.100" }} onClick={() => router.push("https://calendly.com/hushh/30min?month=2025-07")}>Book a Demo</Button>
                    </HStack>
                </VStack>
             </Grid>
          </Box>

        </VStack>
      </Container>
    </Box>
  );
};

export default VerifiediOSUserSection; 