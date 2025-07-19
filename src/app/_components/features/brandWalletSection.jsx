"use client";
import {
  Box,
  Grid,
  HStack,
  Text,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import BrandWalletMobile from "../../../../public/Images/BrandWalletMobile.png";
import NextImage from "next/image";
import React from "react";
import SendReceiveIcon from "../svg/icons/sendReceive";
import ChartIcon from "../svg/icons/chartIcon";
import RefreshIcon from "../svg/icons/refreshIcon";
import WalletIcon from "../svg/icons/walletIcon";
import { useRouter } from "next/navigation";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import { QRCode } from "react-qrcode-logo";
import { useState } from "react";
import extendedTheme from "../../theme";
import Image from "next/image";
import theme from "../../theme";
import DownloadModal from "../primitives/downloadModal";

const BrandWalletSection = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");

  const handleOpenModal = (link) => {
    setCurrentQRLink(link);
    setIsModalOpen(true);
  };

  const handleDownloadClick = () => {
    window.location.href = "https://apps.apple.com/in/app/hushh-app/id6498471189";
  };

  return (
    <>
      <VStack mt={{ md: "8rem", base: "5rem" }}>
        <Text
          className="gradient"
          fontSize={{ md: "3.75rem", base: "1.5rem" }}
          mx={"0.5rem"}
          textAlign={"center"}
          as={'h3'}
        >
          Build your own brand wallet
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{ md: "1rem" }}
          px={{ md: "30rem", base: "3rem" }}
          color={extendedTheme.colors.secondary}
          lineHeight={{ md: "36px", base: "22px" }}
          mb={"1rem"}
        >
          Take control of your digital identity with our innovative "Build Your
          Own Brand Wallet" gen AI feature.
        </Text>
        <Grid
          templateColumns={{ md: "1fr 2fr 1fr", base: "repeat(1, 1fr)" }}
          gap={{ md: "2rem", base: "1rem" }}
          mt={{ md: "2rem", base: "1rem" }}
          px={{ md: "8rem", base: "1rem" }}
          alignItems="start"
          w="full"
          maxW="1400px"
          mx="auto"
        >
          {/* Left column */}
          <VStack
            w="full"
            display={{ md: "flex", base: "none" }}
            gap="2rem"
            alignItems="stretch"
          >
            <VStack
              align={"flex-start"}
              bg="#1C1C1C"
              px={{ md: "1.5rem", base: "1rem" }}
              py={{ md: "2rem", base: "1rem" }}
              gap={"1rem"}
              borderRadius={"2rem"}
              flex="1"
              minH="200px"
              justifyContent="flex-start"
            >
              <SendReceiveIcon />
              <Text
                fontSize={{ md: "1.25rem", base: "1rem" }}
                color={extendedTheme.colors._white}
              >
                HUSHH Bot
              </Text>
              <Text color={extendedTheme.colors._white}>
                Your personal AI, learning from you. Get things done, find
                answers, and live smarter
              </Text>
            </VStack>
            <VStack
              align={"flex-start"}
              bg="#1C1C1C"
              px={{ md: "1.5rem", base: "1rem" }}
              py={{ md: "2rem", base: "1rem" }}
              gap={"1rem"}
              borderRadius={"2rem"}
              flex="1"
              minH="200px"
              justifyContent="flex-start"
            >
              <ChartIcon />
              <Text
                fontSize={{ md: "1.25rem", base: "1rem" }}
                color={extendedTheme.colors._white}
              >
                SEAMLESS INTEGRATION
              </Text>
              <Text color={extendedTheme.colors._white}>
                We offer robust APIs and developer tools for effortless
                integration with trusted brands.
              </Text>
            </VStack>
          </VStack>

          {/* Center column */}
          <Box
            borderRadius={"2rem"}
            w={"full"}
            gridColumnStart={{ base: 1, md: 2 }}
            gridRowStart={{ base: 2, md: 1 }}
            className="gradient-bg"
            position="relative"
            overflow="hidden"
            minH={{ md: "550px", base: "450px" }}
          >
            {/* Content Container */}
            <VStack
              spacing={{ md: 6, base: 4 }}
              align="center"
              justify="flex-start"
              h="full"
              p={{ md: "2rem", base: "1.5rem" }}
              position="relative"
              zIndex={2}
            >
              {/* Header Section */}
              <VStack spacing={{ md: 3, base: 2 }} align="center" textAlign="center">
                <Text 
                  fontSize={{ md: "20px", base: "16px" }} 
                  color={extendedTheme.colors._white}
                  fontWeight="700"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  iOS & ANDROID APP
                </Text>
                <Text 
                  color={extendedTheme.colors._white}
                  fontSize={{ md: "16px", base: "14px" }}
                  lineHeight={{ md: "1.6", base: "1.5" }}
                  maxW={{ md: "320px", base: "280px" }}
                  opacity={0.9}
                >
                  Experience the convenience of managing your digital life with
                  Hushh, available on both iOS and Android.
                </Text>
              </VStack>

              {/* Mobile Image Container */}
              <Box
                position="relative"
                w="full"
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={{ md: 1, base: 2 }}
              >
                {/* Desktop Mobile Image */}
                <Box
                  display={{ md: "block", base: "none" }}
                  position="relative"
                  w="full"
                  // maxW="280px"
                  // h="auto"
                >
                  <NextImage
                    src='/svgs/mobilescreen1.svg'
                    alt="Hushh Mobile App"
                    width={480}
                    height={250}
                    style={{
                      width: "100%",
                      height: "420px",

                    }}
                    priority
                  />
                </Box>

                {/* Mobile Image */}
                <Box
                  display={{ md: "none", base: "block" }}
                  position="relative"
                  w="full"
                  maxW="200px"
                  // h="auto"
                >
                  <NextImage
                    src='/svgs/mobilescreen1.svg'
                    alt="Hushh Mobile App"
                    width={200}
                    height={100}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.4))",
                      transform: "scale(1.02)"
                    }}
                    priority
                  />
                </Box>

                {/* Background Glow Effect */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w={{ md: "300px", base: "220px" }}
                  h={{ md: "300px", base: "220px" }}
                  bgGradient="radial(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)"
                  borderRadius="50%"
                  filter="blur(20px)"
                  zIndex={1}
                />
              </Box>
            </VStack>

            {/* Enhanced Background Gradient Overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)"
              borderRadius={"2rem"}
              zIndex={1}
            />
          </Box>

          {/* Right column */}
          <VStack
            w="full"
            display={{ md: "flex", base: "none" }}
            gap="2rem"
            alignItems="stretch"
          >
            <VStack
              align={"flex-start"}
              bg="#1C1C1C"
              px={{ md: "1.5rem", base: "1rem" }}
              py={{ md: "2rem", base: "1rem" }}
              gap={"1rem"}
              borderRadius={"2rem"}
              flex="1"
              minH="200px"
              justifyContent="flex-start"
            >
              <WalletIcon />
              <Text
                fontSize={{ md: "1.25rem", base: "1rem" }}
                color={extendedTheme.colors._white}
              >
                OPTIMIZED DATA SHARING
              </Text>
              <Text color={extendedTheme.colors._white}>
                Effortlessly share and manage your data with our solutions to
                control and monitor data access
              </Text>
            </VStack>
            <VStack
              align={"flex-start"}
              bg="#1C1C1C"
              px={{ md: "1.5rem", base: "1rem" }}
              py={{ md: "2rem", base: "1rem" }}
              gap={"1rem"}
              borderRadius={"2rem"}
              flex="1"
              minH="200px"
              justifyContent="flex-start"
            >
              <RefreshIcon />
              <Text
                fontSize={{ md: "1.25rem", base: "1rem" }}
                color={extendedTheme.colors._white}
              >
                RECEIPT RADAR
              </Text>
              <Text color={extendedTheme.colors._white}>
                With automatic scanning, smart categorization, and customizable
                options, managing expenses becomes a breeze.
              </Text>
            </VStack>
          </VStack>

          <HStack
            spacing="1rem"
            w={"full"}
            display={{ base: "flex", md: "none" }}
            justifyContent="center"
          >
            <VStack
              align={"left"}
              bg="#1C1C1C"
              px="0.5rem"
              py="0.5rem"
              gap={"0.5rem"}
              borderRadius={"1rem"}
            >
              <ChartIcon width={20} height={20} />
              <Text fontSize={"0.875rem"} color={extendedTheme.colors._white}>
                Seamless Integration
              </Text>
              <Text
                fontSize={"0.75rem"}
                color={extendedTheme.colors._white}
                textAlign="center"
              >
                We offer robust APIs and developer tools for effortless
                integration with trusted brands.
              </Text>
            </VStack>
            <VStack
              align={"left"}
              bg="#1C1C1C"
              px="0.5rem"
              py="0.5rem"
              gap={"0.5rem"}
              borderRadius={"1rem"}
            >
              <RefreshIcon width={20} height={20} />
              <Text fontSize={"0.875rem"} color={extendedTheme.colors._white}>
                Optimized Data Sharing
              </Text>
              <Text
                fontSize={"0.75rem"}
                color={extendedTheme.colors._white}
                textAlign="center"
              >
                Effortlessly share and manage your data with our solutions to
                control and monitor data access
              </Text>
            </VStack>
          </HStack>
        </Grid>
        <Box
          mt={{ md: "2rem", base: "1rem" }}
          display={"flex"}
          gap={{ md: "2rem", base: "1rem" }}
          flexDirection={{ md: "row", base: "column" }}
          zIndex={"9"}
        >
          <Button
            border="1px solid #606060"
            borderRadius="2px"
            color={theme.colors._white}
            lineHeight="28px"
            background="transparent"
            onClick={() => router.push("https://apps.apple.com/in/app/hushh-app/id6498471189")}
            px="21px"
            py="15px"
            fontSize={{ md: "1rem", base: "0.75rem" }}
            fontWeight="400"
            letterSpacing={{ md: "0.1rem", base: "0.1rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            w={{ md: "18rem", base: "14rem" }}
          >
            Download Hushh Wallet App
          </Button>
        </Box>
      </VStack>
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  );
};

export default BrandWalletSection;
