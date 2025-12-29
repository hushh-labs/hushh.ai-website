"use client";
import React from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Stack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useToast,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QRCode } from "react-qrcode-logo";

// New Icons for Mobile Screens
import ChromeIcon from "../_components/svg/productIcons/chromeIcon.svg";
import DeveloperIcon from "../_components/svg/productIcons/developerIcon.svg";
import VibeSearchNew from "../_components/svg/productIcons/vibeSearchIcon.svg";
import ButtonIcon from "../_components/svg/productIcons/hushhButtonIcon.svg";
import HushhAppIcon from "../_components/svg/productIcons/hushhAppIcon.svg";
import hushhLogo from "../_components/svg/productIcons/hushhLogo.svg";
import "next-cloudinary/dist/cld-video-player.css";
import AppleIcon from "../_components/svg/icons/appleIcon";
import PlayStoreIcon from "../_components/svg/icons/playStoreIcon";
import dynamic from "next/dynamic";

const CldVideoPlayer = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldVideoPlayer),
  { ssr: false }
);

export default function vivaConnect2() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isWalletOpen,
    onOpen: onWalletOpen,
    onClose: onWalletClose,
  } = useDisclosure();
  const {
    isOpen: isCompanionOpen,
    onOpen: onCompanionOpen,
    onClose: onCompanionClose,
  } = useDisclosure();
  const modalSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      <Box
        bg="black"
        p={4}
        color="white"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        fontFamily={"Poppins"}
      >
        <VStack fontFamily={"Poppins"} spacing={4} w="100%">
          <Flex
            alignItems="flex-start"
            w={"100%"}
            justifyContent="space-between"
            zIndex={"9999999999999"}
          >
        <Image style={{width:'10%'}} src={hushhLogo} alt="hushhLogo" />
            {/* <Box
              mt="1rem"
              zIndex="9"
              onClick={() => router.push("/qrCodePage")}
            >
              <QRCode
                size={29}
                fgColor="#FFFFFF"
                logoOpacity={0.5}
                bgColor="transparent"
                quietZone={0}
                logoPaddingStyle="square"
                logoPadding={0}
                value="https://www.hush1one.com/viva-connect"
              />
            </Box> */}
          </Flex>

          <VStack mb={{md:'2rem',base:'1rem'}} display={'flex'} textAlign={"center"} w={"100%"} alignItems={"center"}>
            <Text
              fontWeight="600"
              lineHeight="24.09px"
              fontSize={{ base: "0.5rem", md: "1rem" }}
              letterSpacing="0.1275rem"
              className="hushh-gradient"
              // mt="1rem"
            >
              PRODUCT SHOWCASE
            </Text>
            <Text
              p={"0"}
              m={"0"}
              lineHeight={"25.96px"}
              fontWeight={"400"}
              fontSize={{ base: "1.53rem", md: "2.25rem" }}
              className="gradient"
            >
              "Your" Data "Your" Business!
            </Text>
            <Text
              p={"0"}
              m={"0"}
              lineHeight={"14.07px"}
              color={"#484848"}
              fontSize={{ base: "0.65rem", md: "1rem" }}
              fontWeight={"500"}
            >
              Take control of your data with hushh- We help you collect,
              organize and extract meaningful value from your data.
            </Text>
          </VStack>

          <VStack w={"100%"} gap={{ md: "6rem", base: "2rem" }}>
            <HStack
              w={"100%"}
              display={"flex"}
              flexDirection={{ md: "column", base: "column" }}
            >
              <Box
                // flex={1}
                gap={{ md: "3rem", base: "1rem" }}
                minW={"100%"}
                display={"flex"}
                flexDirection={{ md: "row", base: "column" }}
              >
                <VStack
                  gap={{ md: "1rem", base: "0.5rem" }}
                  display={"flex"}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontSize={{ md: "1.5rem", base: "1rem" }}
                    className="gradient"
                    fontWeight={'700'}
                  >
                    Hushh Wallet App
                  </Text>
                  <Text
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    color={"white"}
                  >
                    Your personal data vault. Organize, control, and monetize
                    your information
                  </Text>
                  {/* <HStack
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    display={"flex"}
                    w={"100%"}
                    flexDirection={{ md: "column", base: "row" }}
                    gap={{ md: "2rem", base: "1rem" }}
                  >
                    <Button
                      p={{ md: "0.4rem", base: "" }}
                      border={"1px solid #606060"}
                      w={"50%"}
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                        border: "none",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      App Store <AppleIcon />
                    </Button>
                    <Button
                      p={{ md: "0.4rem", base: "" }}
                      border={"1px solid #606060"}
                      w={"50%"}
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                        border: "none",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      Play Store <PlayStoreIcon />
                    </Button>
                  </HStack> */}
                <HStack minW={'100%'} display={'flex'} mx={{md:'4rem',base:'0.5rem'}} gap={{md:'5rem',base:'1rem'}} alignItems={'center'}>
                  <Box flex='3' alignItems={'center'} justifyContent={'center'} minWidth={"70%"} gap={{md:'2rem',base:'1rem'}} display={{md:'flex',base:'none'}} flexDirection={{md:'column',base:'column'}}>
                  <CldVideoPlayer
                    alt="Hushh Wallet App Apple Users Live Demo"
                    title="Step by step live demo for wallet app for apple users"
                    controls="true"
                    width="480"
                    height="650"
                    src="walletApp-Ios-demo_isc5mt"
                  />
                  <Button
                      p={{ md: "0.4rem", base: "" }}
                      border={"1px solid #606060"}  
                      w={"50%"}
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                        border: "none",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      App Store <AppleIcon />
                  </Button>
                  </Box>
                  <Box  alignItems={'center'} justifyContent={'center'} flex='3' minWidth={"70%"} gap={{md:'2rem',base:'1rem'}} display={{md:'flex',base:'none'}} flexDirection={{md:'column',base:'column'}}>
                  <CldVideoPlayer
                    alt="Hushh Wallet App Android Live Demo"
                    title="Step by step live demo for wallet app for adnroid users"
                    controls="true"
                    width="480"
                    height="650"
                    src="hushhWallet_Android_demo_nffycm"
                  />
                  <Button
                      p={{ md: "0.4rem", base: "" }}
                      border={"1px solid #606060"}
                      w={"50%"}
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                        border: "none",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      Play Store <PlayStoreIcon />
                    </Button>
                </Box>
                </HStack>

                <Box gap={{md:'2rem',base:'1rem'}} w={'100%'} display={{md:'none',base:'flex'}} flexDirection={'column'}>
                  <CldVideoPlayer
                    alt="Hushh Wallet App Apple Users Live Demo"
                    title="Step by step live demo for wallet app for apple users"
                    controls="true"
                    width="380"
                    height="250"
                    // posterOptions='{ "publicId": "walletApp-Ios-demo_isc5mt", "effect": ["saturation:-100"] }'
                    src="walletApp-Ios-demo_isc5mt"
                  />
                  <CldVideoPlayer
                    alt="Hushh Wallet App Android Live Demo"
                    title="Step by step live demo for wallet app for adnroid users"
                    controls="true"
                    width="380"
                    height="250"
                    // posterOptions='{ "publicId": "hushhWallet_Android_demo_nffycm", "effect": ["saturation:-100"] }'
                    src="hushhWallet_Android_demo_nffycm"
                  />
                </Box>
                </VStack>
                
                
              </Box>
            </HStack>
            <HStack
              w={"100%"}
              display={"flex"}
              flexDirection={{ md: "column", base: "column" }}
            >
              <Box
                gap={{ md: "3rem", base: "1rem" }}
                minW={"100%"}
                display={"flex"}
                flexDirection={{ md: "row", base: "column" }}
              >
                <VStack
                  gap={{ md: "1rem", base: "0.5rem" }}
                  display={"flex"}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontSize={{ md: "1.5rem", base: "1rem" }}
                    className="gradient"
                    fontWeight={'700'}
                  >
                    Browser Companion
                  </Text>
                  <Text
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    color={"white"}
                  >
                    Your personal data vault. Organize, control, and monetize
                    your information
                  </Text>
                  <HStack display={"flex"} gap={{ md: "2rem", base: "1rem" }}>
                    <Button
                      w={{ md: "50%", base: "50%" }}
                      gap={{ md: "1rem", base: "0.5rem" }}
                      border={"1px solid #606060"}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        border: "none",
                        color: "white",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      Add Extension
                    </Button>
                  </HStack>
                </VStack>
                <Box flex={3} mt={{md:'2rem',base:'1rem'}} maxW={"40rem"} maxHeight={"40rem"}>
                  <CldVideoPlayer
                    alt="Hushh Browser Companion Guide"
                    title="Hushh browser companion walkthrough"
                    controls="true"
                    width="440"
                    height="250"
                    src="How_to_install_Browser_Companion_t4v4sj"
                  />
                </Box>
              </Box>
            </HStack>
            <HStack
              w={"100%"}
              display={"flex"}
              flexDirection={{ md: "column", base: "column" }}
            >
              <Box
                flex={1}
                gap={{ md: "3rem", base: "1rem" }}
                minW={"100%"}
                display={"flex"}
                flexDirection={{ md: "row", base: "column" }}
              >
                <VStack
                  gap={{ md: "1rem", base: "0.5rem" }}
                  display={"flex"}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontSize={{ md: "1.5rem", base: "1rem" }}
                    className="gradient"
                    fontWeight={'700'}
                  >
                    Hushh Button
                  </Text>
                  <Text
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    color={"white"}
                  >
                    Seamlessly share your preferences with brands for personalized experiences
                  </Text>
                  <HStack
                    display={"flex"}
                    w={"100%"}
                    gap={{ md: "2rem", base: "1rem" }}
                  >
                    <Button
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                      }}
                      flex={1}
                      border={'1px solid #606060'}
                      bg={"black"}
                      color={"white"}
                    >
                     COMING SOON!!
                    </Button>
                    {/* <Button
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      Play Store <PlayStoreIcon />
                    </Button> */}
                  </HStack>
                </VStack>
                {/* <Box flex={3} maxW={"40rem"} maxHeight={"40rem"}>
                  <CldVideoPlayer
                    alt="Hushh Button Guide"
                    title="Hushh button developer walkthrough"
                    controls="true"
                    width="440"
                    height="250"
                    src="Hushh_button_-_developer_walkthrough_uwwiy0"
                  />
                </Box> */}
              </Box>
            </HStack>
            <HStack
              w={"100%"}
              display={"flex"}
              flexDirection={{ md: "column", base: "column" }}
            >
              <Box
                flex={1}
                gap={{ md: "3rem", base: "1rem" }}
                minW={"100%"}
                display={"flex"}
                flexDirection={{ md: "row", base: "column" }}
              >
                <VStack
                  gap={{ md: "1rem", base: "0.5rem" }}
                  display={"flex"}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontSize={{ md: "1.5rem", base: "1rem" }}
                    className="gradient"
                    fontWeight={'700'}
                  >
                    Vibe Search App
                  </Text>
                  <Text
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    color={"white"}
                  >
                     Discover products you love with image-based search and AI recommendations
                  </Text>
                  <HStack
                    display={"flex"}
                    w={"100%"}
                    gap={{ md: "2rem", base: "1rem" }}
                  >
                     <Button
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                      }}
                      flex={1}
                      border={'1px solid #606060'}
                      bg={"black"}
                      color={"white"}
                    >
                     COMING SOON!!
                    </Button>
                    {/* <Button
                      gap={{ md: "1rem", base: "0.5rem" }}
                      _hover={{
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                        color: "white",
                      }}
                      flex={1}
                      bg={"black"}
                      color={"white"}
                    >
                      Play Store <PlayStoreIcon />
                    </Button> */}
                  </HStack>
                </VStack>
                {/* <Box flex={3} maxW={"40rem"} maxHeight={"40rem"}>
                  <CldVideoPlayer
                    alt="Hushh Wallet App Live Demo"
                    title="Step by step live demo for wallet app"
                    controls="true"
                    width="440"
                    height="250"
                    src="walletApp-Ios-demo_isc5mt"
                  />
                </Box> */}
              </Box>
            </HStack>
          </VStack>
        </VStack>
        {/* <Modal isOpen={isWalletOpen} onClose={onWalletClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent background={"#1E1E1E"}>
            <ModalHeader textAlign={"center"} color={"white"} m={"0"} p={"1"}>
              Platform Choice
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={8}
            >
              <Text mb={4} color={"white"}>
                Are you an Apple or Android user?
              </Text>
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: 4, md: 8 }}
              >
                <Button
                  border={"2px solid white"}
                  color="white"
                  _hover={{
                    color: "white",
                    bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                  }}
                  bg={"black"}
                  onClick={() =>
                    window.open("https://bit.ly/hushh-app-ios", "_blank")
                  }
                  w={{ base: "100%", md: "auto" }}
                >
                  Apple
                </Button>
                <Button
                  border={"2px solid white"}
                  color="white"
                  _hover={{
                    color: "white",
                    bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                  }}
                  bg={"black"}
                  onClick={() =>
                    window.open("https://bit.ly/hushh-app-android", "_blank")
                  }
                  w={{ base: "100%", md: "auto" }}
                >
                  Android
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isCompanionOpen}
          onClose={onCompanionClose}
          size={modalSize}
        >
          <ModalOverlay />
          <ModalContent background={"#1E1E1E"}>
            <ModalHeader textAlign={"center"} color={"white"} m={"0"} p={"1"}>
              Browser Companion
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={8}
            >
              <Text mb={4} color={"white"}>
                Do you want to download the extension zip file or access it
                directly?
              </Text>
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: 4, md: 8 }}
              >
                {" "}
                <Button
                  onClick={() =>
                    window.open(
                      "https://chromewebstore.google.com/detail/hushh-browser-companion/glmkckchoggnebfiklpbiajpmjoagjgj?hl=en&authuser=0n",
                      "_blank"
                    )
                  }
                  border={"2px solid white"}
                  color="white"
                  _hover={{
                    color: "white",
                    bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                  }}
                  bg={"black"}
                  w={{ base: "100%", md: "auto" }}
                >
                  Chrome Web Store
                </Button>
                <Button
                  border={"2px solid white"}
                  color="white"
                  _hover={{
                    color: "white",
                    bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                  }}
                  bg={"black"}
                  w={{ base: "100%", md: "auto" }}
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1xjH0oGVvrYpSfZJK-5_Kte3Ft4nF4a9n/view?usp=sharing",
                      "_blank"
                    )
                  }
                >
                  Download Zip
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal> */}
      </Box>
    </>
  );
}
