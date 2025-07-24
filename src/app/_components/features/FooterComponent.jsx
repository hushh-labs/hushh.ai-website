'use client'
import React, { useState } from "react";
import HushhFooterLogo from "../svg/hushhFooterLogo";
import Link from "next/link";
import { AndroidIcon } from "../svg/icons/androidIcon";
import { IosIcon } from "../svg/icons/iosIcon";
import { useResponsiveSizes } from "../../context/responsive";
import "../../globals.css";
import HushhMobileFooterLogo from "../svg/hushhMobileFooterLogo";
import { animateScroll as scroll } from "react-scroll";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import UnicodeQR from "../../_components/svg/onelinkQrdownload.svg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import Image from "next/image";
import DownloadModal from "../primitives/downloadModal";
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";

const FooterComponent = () => {
  // const isMobile = useResponsiveSizes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");
  const router = useRouter();
  const scrollTo = () => {
    scroll.scrollTo(4250);
  };

  const handleOpenModal = (link) => {
    setCurrentQRLink(link);
    setIsModalOpen(true);
  };

  const handleDownloadClick = () => {
    window.location.href = "https://apps.apple.com/in/app/hushh-app/id6498471189";
  };

  const scrollInMobile = () => {
    scroll.scrollTo(3350);
  };

  return (
    <>
      {/* Main Footer */}
      <Box bg="white" w="100%" m={0} p={0}>
        <Box py={{ base: 16, md: 16 }} px={{ base: 8, md: 8 }}>
          <Box maxW="1200px" mx="auto">
            {/* Footer Logo Section */}
            <Box mb={{ base: 16, md: 16 }} textAlign={{ base: "left", md: "left" }}>
              <Box display={{ base: "none", md: "block" }}>
                <HushhFooterLogo />
              </Box>
              <Box display={{ base: "block", md: "none" }}>
                <HushhMobileFooterLogo />
              </Box>
            </Box>

            {/* Main Footer Content */}
            <Grid
              templateColumns={{ 
                base: "1fr", 
                sm: "1fr",
                md: "repeat(4, 1fr)",
                lg: "2fr repeat(4, 1fr)" 
              }}
              gap={{ base: 8, sm: 10, md: 12, lg: 8 }}
              alignItems="start"
              fontFamily={'Inter'}
            >
              {/* Company Info Section - Desktop Only */}
              <GridItem display={{ base: "none", lg: "block" }}>
                <VStack align="start" spacing={6} pr={4}>
                  <Box textAlign={'left'}>
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="600"
                      color="black"
                      lineHeight={1.4}
                      mb={3}
                    >
                      Future of Digital Identity & Personalised Experiences
                    </Heading>
                    <Text fontSize="md" color="gray.500" fontWeight="400" mb={4}>
                      Manish Sainani, 2025
                    </Text>
                  </Box>
                  
                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm" color="black" fontWeight="500" textTransform="uppercase" letterSpacing="0.5px">
                      Contact
                    </Text>
                    <ChakraLink 
                      href="tel:(888) 462-1726" 
                      fontSize="md"
                      fontWeight="400"
                      color="gray.700"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                    >
                      (888) 462-1726
                    </ChakraLink>
                    <ChakraLink 
                      href="mailto:sales@hushh.ai" 
                      fontSize="md"
                      fontWeight="400"
                      color="gray.700"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                    >
                      sales@hushh.ai
                    </ChakraLink>
                  </VStack>

                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm" color="black" fontWeight="500" textTransform="uppercase" letterSpacing="0.5px">
                      Address 
                    </Text>
                    
                   <VStack spacing={1} textAlign={'left'} alignItems={'flex-start'}>
                   <Text fontSize="sm" color="gray.500" fontWeight="400">
                      Hushh.ai
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="400" >
                      1021 5th St W
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="400" >
                      Kirkland, WA 98033
                    </Text>
                   </VStack>
                  </VStack>
                </VStack>
              </GridItem>

              {/* Products Section */}
              <GridItem>
                <VStack align={{ base: "start", md: "start" }} spacing={{ base: 5, md: 4 }}>
                  <Box w="full" pb={{ base: 2, md: 0 }}>
                    <Text 
                      fontSize={{ base: "md", md: "sm" }}
                      fontWeight="600" 
                      color="black"
                      textTransform="uppercase" 
                      letterSpacing="0.5px"
                      textAlign="left"
                      mb={{ base: 1, md: 0 }}
                    >
                      Products
                    </Text>
                    <Box 
                      w="40px" 
                      h="2px" 
                      bg="black" 
                      display={{ base: "block", md: "none" }}
                      mt={2}
                    />
                  </Box>
                  <VStack 
                    align="start"
                    spacing={{ base: 1, md: 3 }}
                    w="full"
                  >
                    <Link href="/products/personal-data-agent">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Personal Data Agent (PDA)
                      </Text>
                    </Link>

                    <Link href="/consent-ai-protocol">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Consent AI Protocol
                      </Text>
                    </Link>

                    <Link href="/hushh-vault">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Hushh Vault
                      </Text>
                    </Link>
                    <Link href="/products/hushh-grid">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Hushh Grid
                      </Text>
                    </Link>
                    <Link href="/hushh-link">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                       Hushh Link
                      </Text>
                    </Link>
                    <Link href="/developerApi">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Developer API
                      </Text>
                    </Link>
                    
                  </VStack>
                </VStack>
              </GridItem>

              {/* Company Section */}
              <GridItem>
                <VStack align="start" spacing={{ base: 5, md: 4 }}>
                  <Box w="full" pb={{ base: 2, md: 0 }}>
                    <Text 
                      fontSize={{ base: "md", md: "sm" }}
                      fontWeight="600" 
                      color="black"
                      textTransform="uppercase" 
                      letterSpacing="0.5px"
                      textAlign="left"
                      mb={{ base: 1, md: 0 }}
                    >
                      Company
                    </Text>
                    <Box 
                      w="40px" 
                      h="2px" 
                      bg="black" 
                      display={{ base: "block", md: "none" }}
                      mt={2}
                    />
                  </Box>
                  <VStack 
                    align="start"
                    spacing={{ base: 1, md: 3 }}
                    w="full"
                  >
                    <Link href="/about-us">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        About Us
                      </Text>
                    </Link>
                    <Link href="/solutions">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                       Solutions
                      </Text>
                    </Link>
                    <Link href="https://hushhtech.com" target="_blank">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                       Hushh Tech (Investor Relations)
                      </Text>
                    </Link>
                    <Link href="/why-hushh">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                       Our Philosophy (Why Hushh ?)
                      </Text>
                    </Link>
                    <ChakraLink 
                      href="/hushhBlogs"
                      fontSize={{ base: "sm", md: "sm" }}
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black", transform: "translateX(4px)" }}
                      transition="all 0.2s ease"
                      isExternal
                      textAlign="left"
                      py={{ base: 1, md: 0 }}
                      display="block"
                      w="full"
                    >
                      Blog
                    </ChakraLink>
                    <ChakraLink 
                      href="/career"
                      fontSize={{ base: "sm", md: "sm" }}
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black", transform: "translateX(4px)" }}
                      transition="all 0.2s ease"
                      isExternal
                      textAlign="left"
                      py={{ base: 1, md: 0 }}
                      display="block"
                      w="full"
                    >
                      Careers
                    </ChakraLink>
                    <ChakraLink 
                      href="https://github.com/hushh-labs/consent-protocol/blob/main/docs/faq.md"
                      fontSize={{ base: "sm", md: "sm" }}
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black", transform: "translateX(4px)" }}
                      transition="all 0.2s ease"
                      isExternal
                      textAlign="left"
                      py={{ base: 1, md: 0 }}
                      display="block"
                      w="full"
                    >
                      FAQ
                    </ChakraLink>
                    <Text
                      fontSize={{ base: "sm", md: "sm" }}
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black", transform: "translateX(4px)" }}
                      transition="all 0.2s ease"
                      cursor="pointer"
                      onClick={()=>{
                        router.push('/contact-us')
                      }}
                      textAlign="left"
                      py={{ base: 1, md: 0 }}
                      display="block"
                      w="full"
                    >
                      Contact Us
                    </Text>
                  </VStack>
                </VStack>
              </GridItem>

               {/* Social Section */}
               <GridItem>
                <VStack align="start" spacing={{ base: 5, md: 4 }}>
                  <Box w="full" pb={{ base: 2, md: 0 }}>
                    <Text 
                      fontSize={{ base: "md", md: "sm" }}
                      fontWeight="600" 
                      color="black"
                      textTransform="uppercase" 
                      letterSpacing="0.5px"
                      textAlign="left"
                      mb={{ base: 1, md: 0 }}
                    >
                      Social
                    </Text>
                    <Box 
                      w="40px" 
                      h="2px" 
                      bg="black" 
                      display={{ base: "block", md: "none" }}
                      mt={2}
                    />
                  </Box>
                  <VStack 
                    align="start"
                    spacing={{ base: 1, md: 3 }}
                    w="full"
                  >
                    <Link href="https://www.linkedin.com/company/hushh-ai/" target="_blank">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Linkedin
                      </Text>
                    </Link>
                    <Link href="https://x.com/hushh_ai" target="_blank">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                       X (Twitter)
                      </Text>
                    </Link>
                    <Link href="https://github.com/hushh-labs" target="_blank">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                       Github
                      </Text>
                    </Link>
                    <ChakraLink 
                      href=""
                      fontSize={{ base: "sm", md: "sm" }}
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black", transform: "translateX(4px)" }}
                      transition="all 0.2s ease"
                      isExternal
                      textAlign="left"
                      py={{ base: 1, md: 0 }}
                      display="block"
                      w="full"
                    >
                     Instagram
                    </ChakraLink>
                    
                    
                  </VStack>
                </VStack>
              </GridItem>

              {/* Support Section */}
              <GridItem>
                <VStack align="start" spacing={{ base: 5, md: 4 }}>
                  <Box w="full" pb={{ base: 2, md: 0 }}>
                    <Text 
                      fontSize={{ base: "md", md: "sm" }}
                      fontWeight="600" 
                      color="black"
                      textTransform="uppercase" 
                      letterSpacing="0.5px"
                      textAlign="left"
                      mb={{ base: 1, md: 0 }}
                    >
                      Support
                    </Text>
                    <Box 
                      w="40px" 
                      h="2px" 
                      bg="black" 
                      display={{ base: "block", md: "none" }}
                      mt={2}
                    />
                  </Box>
                  <VStack 
                    align="start"
                    spacing={{ base: 1, md: 3 }}
                    w="full"
                  >
                    <Link href="/demoBookingPage">
                      <Text 
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black", transform: "translateX(4px)" }} 
                        transition="all 0.2s ease"
                        textAlign="left"
                        py={{ base: 1, md: 0 }}
                        display="block"
                        w="full"
                      >
                        Live Demo
                      </Text>
                    </Link>
                    {/* <ChakraLink 
                      href="https://hushh-labs.github.io/hushh-labs-blog/"
                      fontSize={{ base: "sm", md: "sm" }}
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black", transform: "translateX(4px)" }}
                      transition="all 0.2s ease"
                      isExternal
                      textAlign="left"
                      py={{ base: 1, md: 0 }}
                      display="block"
                      w="full"
                    >
                      Documentation
                    </ChakraLink> */}
                  </VStack>
                </VStack>
              </GridItem>

              {/* Download Section */}
              <GridItem>
                <VStack align="start" spacing={{ base: 5, md: 4 }}>
                  <Box w="full" pb={{ base: 2, md: 0 }}>
                    <Text 
                      fontSize={{ base: "md", md: "sm" }}
                      fontWeight="600" 
                      color="black"
                      textTransform="uppercase" 
                      letterSpacing="0.5px"
                      textAlign="left"
                      mb={{ base: 1, md: 0 }}
                    >
                      Download
                    </Text>
                    <Box 
                      w="40px" 
                      h="2px" 
                      bg="black" 
                      display={{ base: "block", md: "none" }}
                      mt={2}
                    />
                  </Box>
                  <VStack 
                    align="start"
                    spacing={{ base: 1, md: 3 }}
                    w="full"
                  >
                    <Button
                      onClick={() => window.open("https://apps.apple.com/in/app/hushh-app/id6498471189", '_blank')}
                      size={{ base: "md", md: "sm" }}
                      bg="black"
                      color="white"
                      borderRadius="lg"
                      px={{ base: 6, md: 4 }}
                      py={{ base: 3, md: 2 }}
                      fontSize={{ base: "sm", md: "xs" }}
                      fontWeight="500"
                      _hover={{
                        bg: "gray.800",
                        transform: "translateY(-1px)",
                        shadow: "md"
                      }}
                      _active={{
                        bg: "gray.900",
                        transform: "translateY(0)"
                      }}
                      transition="all 0.2s ease"
                      minW={{ base: "160px", md: "120px" }}
                      w={{ base: "100%", sm: "auto", md: "auto" }}
                      maxW={{ base: "200px", md: "none" }}
                    >
                      Download App
                    </Button>
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>

            {/* Mobile Company Info */}
            <Box display={{ base: "block", lg: "none" }} mt={{ base: 16, md: 12 }} pt={{ base: 10, md: 8 }} borderTop="2px solid" borderColor="gray.100">
              <VStack spacing={{ base: 8, md: 6 }} textAlign="left" align="start">
                <VStack spacing={4} align="start" w="full">
                  <Box>
                    <Text
                      fontSize="md"
                      fontWeight="600"
                      color="black"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                      mb={2}
                    >
                      Contact
                    </Text>
                    <Box w="40px" h="2px" bg="black" />
                  </Box>
                  
                  <Heading
                    as="h3"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="600"
                    color="black"
                    lineHeight={1.4}
                    textAlign="left"
                  >
                    Future of Digital Identity & Personalised Experiences
                  </Heading>
                  <Text fontSize="sm" color="gray.500" fontWeight="400" textAlign="left">
                    Manish Sainani, 2025
                  </Text>
                </VStack>
                
                <VStack spacing={4} align="start" w="full">
                  <ChakraLink 
                    href="tel:(888) 462-1726" 
                    fontSize="sm"
                    fontWeight="400"
                    color="gray.600"
                    _hover={{ color: "black", transform: "translateX(4px)" }}
                    transition="all 0.2s ease"
                    py={1}
                    display="block"
                  >
                    📞 (888) 462-1726
                  </ChakraLink>
                  <ChakraLink 
                    href="mailto:sales@hushh.ai" 
                    fontSize="sm"
                    fontWeight="400"
                    color="gray.600"
                    _hover={{ color: "black", transform: "translateX(4px)" }}
                    transition="all 0.2s ease"
                    py={1}
                    display="block"
                  >
                    ✉️ sales@hushh.ai
                  </ChakraLink>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Box bg="gray.50" w="100%" m={0} p={0}>
        <Box py={{ base: 8, md: 6 }} px={{ base: 8, md: 8 }}>
          <Box maxW="1200px" mx="auto">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "start", md: "center" }}
              gap={{ base: 6, md: 4 }}
            >
              <VStack spacing={1} align={{ base: "start", md: "flex-start" }}>
                <Text fontSize={{ base: "sm", md: "xs" }} color="gray.500" fontWeight="400">
                  © 2025 HushOne Inc. All rights reserved.
                </Text>
              </VStack>
              
              <Flex
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
                gap={{ base: 3, md: 4 }}
                w={{ base: "full", md: "auto" }}
                flexWrap="nowrap"
              >
                <Link href="/legal/termsofuse">
                  <Text 
                    fontSize={{ base: "sm", md: "xs" }}
                    color="gray.500" 
                    _hover={{ color: "black", transform: "translateX(2px)" }} 
                    transition="all 0.2s ease"
                    fontWeight="400"
                    py={{ base: 1, md: 0 }}
                    whiteSpace="nowrap"
                  >
                    Terms of Service
                  </Text>
                </Link>
                <Text fontSize={{ base: "sm", md: "xs" }} color="gray.400" fontWeight="400" display={{ base: "none", md: "block" }}>
                  |
                </Text>
                <Link href="/legal/privacypolicy">
                  <Text 
                    fontSize={{ base: "sm", md: "xs" }}
                    color="gray.500" 
                    _hover={{ color: "black", transform: "translateX(2px)" }} 
                    transition="all 0.2s ease"
                    fontWeight="400"
                    py={{ base: 1, md: 0 }}
                    whiteSpace="nowrap"
                  >
                    Privacy Policy
                  </Text>
                </Link>
                <Text fontSize={{ base: "sm", md: "xs" }} color="gray.400" fontWeight="400" display={{ base: "none", md: "block" }}>
                  |
                </Text>
                <Text fontSize={{ base: "sm", md: "xs" }} color="gray.400" fontWeight="400" whiteSpace="nowrap">
                  Duns # 119019629
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FooterComponent;
