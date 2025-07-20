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
        <Box py={{ base: 12, md: 16 }} px={{ base: 6, md: 8 }}>
          <Box maxW="1200px" mx="auto">
            {/* Footer Logo Section */}
            <Box mb={{ base: 12, md: 16 }} textAlign={{ base: "center", md: "left" }}>
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
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "2fr repeat(4, 1fr)" 
              }}
              gap={{ base: 10, md: 12, lg: 8 }}
              alignItems="start"
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
                      Manish Sainani, 2024
                    </Text>
                  </Box>
                  
                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm" color="gray.400" fontWeight="500" textTransform="uppercase" letterSpacing="0.5px">
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
                      href="mailto:info@hush1one.com" 
                      fontSize="md"
                      fontWeight="400"
                      color="gray.700"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                    >
                      info@hush1one.com
                    </ChakraLink>
                  </VStack>
                </VStack>
              </GridItem>

              {/* Products Section */}
              <GridItem>
                <VStack align={{ base: "center", md: "start" }} spacing={4}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    color="black"
                    textTransform="uppercase" 
                    letterSpacing="0.5px"
                    textAlign={{ base: "center", md: "left" }}
                    w="full"
                  >
                    Products
                  </Text>
                  <VStack 
                    align={{ base: "center", md: "start" }} 
                    spacing={3} 
                    w="full"
                  >
                    <Link href="/products/hushhWalletApp">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Hushh Wallet App
                      </Text>
                    </Link>
                    <Link href="/products/hushhButton">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Hushh Button
                      </Text>
                    </Link>
                    <Link href="/products/vibeSearch">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Vibe Search
                      </Text>
                    </Link>
                    <Link href="/products/browserCompanion">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Browser Companion
                      </Text>
                    </Link>
                    <Link href="/developerApi">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Developer API
                      </Text>
                    </Link>
                    <Link href="/products/hushhForStudents">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        HFS App
                      </Text>
                    </Link>
                  </VStack>
                </VStack>
              </GridItem>

              {/* Company Section */}
              <GridItem>
                <VStack align={{ base: "center", md: "start" }} spacing={4}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    color="black"
                    textTransform="uppercase" 
                    letterSpacing="0.5px"
                    textAlign={{ base: "center", md: "left" }}
                    w="full"
                  >
                    Company
                  </Text>
                  <VStack 
                    align={{ base: "center", md: "start" }} 
                    spacing={3} 
                    w="full"
                  >
                    <Link href="/demoBookingPage">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Free Demo
                      </Text>
                    </Link>
                    <ChakraLink 
                      href="https://hushh-labs.github.io/hushh-labs-blog/"
                      fontSize="sm"
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                      isExternal
                      textAlign={{ base: "center", md: "left" }}
                    >
                      Blog
                    </ChakraLink>
                    <ChakraLink 
                      href="https://www.linkedin.com/company/hushh-ai/jobs/"
                      fontSize="sm"
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                      isExternal
                      textAlign={{ base: "center", md: "left" }}
                    >
                      Careers
                    </ChakraLink>
                    <Text
                      fontSize="sm"
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                      cursor="pointer"
                      onClick={scrollTo}
                      textAlign={{ base: "center", md: "left" }}
                    >
                      Contact Us
                    </Text>
                  </VStack>
                </VStack>
              </GridItem>

              {/* Support Section */}
              <GridItem>
                <VStack align={{ base: "center", md: "start" }} spacing={4}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    color="black"
                    textTransform="uppercase" 
                    letterSpacing="0.5px"
                    textAlign={{ base: "center", md: "left" }}
                    w="full"
                  >
                    Support
                  </Text>
                  <VStack 
                    align={{ base: "center", md: "start" }} 
                    spacing={3} 
                    w="full"
                  >
                    <Link href="/demoBookingPage">
                      <Text 
                        fontSize="sm" 
                        fontWeight="400" 
                        color="gray.600" 
                        _hover={{ color: "black" }} 
                        transition="color 0.2s ease"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        Live Demo
                      </Text>
                    </Link>
                    <ChakraLink 
                      href="https://hushh-labs.github.io/hushh-labs-blog/"
                      fontSize="sm"
                      fontWeight="400"
                      color="gray.600"
                      _hover={{ color: "black" }}
                      transition="color 0.2s ease"
                      isExternal
                      textAlign={{ base: "center", md: "left" }}
                    >
                      Documentation
                    </ChakraLink>
                  </VStack>
                </VStack>
              </GridItem>

              {/* Download Section */}
              <GridItem>
                <VStack align={{ base: "center", md: "start" }} spacing={4}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    color="black"
                    textTransform="uppercase" 
                    letterSpacing="0.5px"
                    textAlign={{ base: "center", md: "left" }}
                    w="full"
                  >
                    Download
                  </Text>
                  <VStack 
                    align={{ base: "center", md: "start" }} 
                    spacing={3} 
                    w="full"
                  >
                    <Button
                      onClick={() => router.push("https://apps.apple.com/in/app/hushh-app/id6498471189")}
                      size="sm"
                      bg="black"
                      color="white"
                      borderRadius="lg"
                      px={4}
                      py={2}
                      fontSize="xs"
                      fontWeight="500"
                      _hover={{
                        bg: "gray.800",
                        transform: "translateY(-1px)",
                        shadow: "sm"
                      }}
                      _active={{
                        bg: "gray.900",
                        transform: "translateY(0)"
                      }}
                      transition="all 0.2s ease"
                      minW="120px"
                    >
                      Download App
                    </Button>
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>

            {/* Mobile Company Info */}
            <Box display={{ base: "block", lg: "none" }} mt={12} pt={8} borderTop="1px solid" borderColor="gray.100">
              <VStack spacing={6} textAlign="center">
                <VStack spacing={2}>
                  <Heading
                    as="h3"
                    fontSize="lg"
                    fontWeight="600"
                    color="black"
                    lineHeight={1.4}
                  >
                    Future of Digital Identity & Personalised Experiences
                  </Heading>
                  <Text fontSize="sm" color="gray.500" fontWeight="400">
                    Manish Sainani, 2024
                  </Text>
                </VStack>
                
                <HStack spacing={6} justify="center">
                  <ChakraLink 
                    href="tel:(888) 462-1726" 
                    fontSize="sm"
                    fontWeight="400"
                    color="gray.600"
                    _hover={{ color: "black" }}
                    transition="color 0.2s ease"
                  >
                    (888) 462-1726
                  </ChakraLink>
                  <ChakraLink 
                    href="mailto:info@hush1one.com" 
                    fontSize="sm"
                    fontWeight="400"
                    color="gray.600"
                    _hover={{ color: "black" }}
                    transition="color 0.2s ease"
                  >
                    Email Us
                  </ChakraLink>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Box bg="gray.50" w="100%" m={0} p={0}>
        <Box py={6} px={{ base: 6, md: 8 }}>
          <Box maxW="1200px" mx="auto">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
              gap={4}
            >
              <HStack spacing={1} justify={{ base: "center", md: "flex-start" }}>
                <Text fontSize="xs" color="gray.500" fontWeight="400">
                  © 2025 HushOne Inc.
                </Text>
                <Text fontSize="xs" color="gray.400">
                  All rights reserved.
                </Text>
              </HStack>
              
              <HStack 
                spacing={6} 
                justify="center"
                flexWrap="wrap"
              >
                <Link href="/legal/termsofuse">
                  <Text 
                    fontSize="xs" 
                    color="gray.500" 
                    _hover={{ color: "black" }} 
                    transition="color 0.2s ease"
                    fontWeight="400"
                  >
                    Terms of Service
                  </Text>
                </Link>
                <Link href="/legal/privacypolicy">
                  <Text 
                    fontSize="xs" 
                    color="gray.500" 
                    _hover={{ color: "black" }} 
                    transition="color 0.2s ease"
                    fontWeight="400"
                  >
                    Privacy Policy
                  </Text>
                </Link>
                <Text fontSize="xs" color="gray.400" fontWeight="400">
                  Duns # 119019629
                </Text>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Box>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FooterComponent;
