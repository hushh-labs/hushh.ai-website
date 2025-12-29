"use client";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Stack,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import extendedTheme from "../theme";
import FramCard1 from "../_components/svg/card/frameCardHushhButton.svg";
import FrameCard2 from "../_components/svg/card/buttonvoucherCard.svg";
import Image from "next/image";
import BarIcon from "../_components/svg/icons/barIcon.svg";
import DirectionLine from "../_components/svg/icons/directionLine.svg";
import { useState, useEffect } from "react";
import { useResponsiveSizes } from "../context/responsive";
import HushhEmoji from "../_components/svg/card/hushhCircleEmoji.svg";
import HushhBrandCard from "../_components/svg/card/hushhBrandCard.svg";
import HushhButtonBg from "../_components/svg/hushhButtonBg.svg";
import HushhButtonWin from "../_components/svg/hushhButtonWin.svg";
import { useRouter } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";
import HushhButtonFaq from "../_components/features/faq/hushhButtonFaq";
import ContactForm from "../_components/features/contactForm";
import BgAnimation from "../../../public/Gif/bgAnimation.gif";
import DataRetrievalMade from "../../../public/Gif/dataRetrievalMade.gif";
import Slogo from "../../../public/Gif/slogo.gif";
import VibeSearchGif from "../../../public/Gif/vibeSearchGIf.gif";
import "next-cloudinary/dist/cld-video-player.css";
import dynamic from "next/dynamic";

const CldVideoPlayer = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldVideoPlayer),
  { ssr: false }
);

const ClientHushhButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = () => {
    scroll.scrollTo(850); // Scrolling to 100px from the top of the page.
  };

  const scrollInMobile = () => {
    scroll.scrollTo(450);
  };

  return (
    <>
      <Box
        maxW={"100%"}
        minW={"100%"}
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Box display={{ base: "none", md: "block" }}>
          <Image
            src={VibeSearchGif}
            alt="VibeSearchGif1"
            style={{
              position: "absolute",
              transform: "rotate(-95deg)",
              opacity: "0.5",
              top: "0px",
              left: "30%",
              zIndex: "-10",
              filter: "grayscale(100%)",
            }}
            unoptimized
          />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Image
            src={VibeSearchGif}
            alt="VibeSearchGif1"
            style={{
              position: "absolute",
              transform: "rotate(-95deg)",
              opacity: "0.5",
              top: "0px",
              left: "30%",
              zIndex: "-10",
              width: "10rem",
              height: "16rem",
              filter: "grayscale(100%)",
            }}
            unoptimized
          />
        </Box>
        <Box
          alignItems={"center"}
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          mt={{ base: "3rem" }}
        >
          <Heading
            fontWeight={"700"}
            lineHeight={{ md: "255.6px", base: "60px" }}
            textAlign={"center"}
            fontSize={{ md: "8.8rem", base: "2.5rem" }}
            pt={{ md: "10rem", base: "3rem" }}
            className="gradient"
            px={{ base: "0.5rem" }}
            mb={{ base: "0.5rem" }}
            as="h1"
          >
            Hushh Button
          </Heading>
          <Text
            px={{ md: "17.8rem" }}
            mb={{ base: "1rem", md: "4rem" }}
            textAlign={"center"}
            color={"#656565"}
            fontSize={{ md: "1rem", base: "1rem" }}
          >
            Imagine a world where shopping feels effortless and tailored just
            for you. Hushh Button, a powerful plugin, bridges the gap between
            your preferences/choices/needs/likes and your favourite brands with
            GenAI
          </Text>
          <Box display={"flex"} gap={{ md: "4rem", base: "1rem" }}>
            {/* <Button
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "16.25rem", base: "auto" }}
            h={{ md: "3.75rem", base: "2.5rem" }}
            color={extendedTheme.colors._white}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            fontWeight={'400'}
            fontSize={{base:'0.75rem', md:'1rem'}}
            letterSpacing={{ md: "0.5rem", base: "0.1rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={() =>
              router.push(
                "https://hushh-button.vercel.app/",
              )
            }
          >
            LEARN MORE
          </Button> */}
            <Button
              as="a"
              href="https://www.npmjs.com/package/hushh-button-sdk"
              target="_blank"
              rel="noopener noreferrer"
              border={"1px solid #606060"}
              borderRadius={"2px"}
              fontWeight={"400"}
              w={{ md: "16.25rem", base: "auto" }}
              h={{ md: "3.75rem", base: "2.5rem" }}
              color={extendedTheme.colors._white}
              fontSize={{ base: "0.75rem", md: "1rem" }}
              lineHeight={{ md: "28px", base: "14px" }}
              background="linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)"
              letterSpacing={{ md: "0.5rem", base: "0.1rem" }}
              _hover={{
                background: "white",
                color: "black",
              }}
            >
              HUSHH SDK
            </Button>
          </Box>
        </Box>
        <HStack
          mt={"2rem"}
          gap={"3rem"}
          px={"4rem"}
          display={"flex"}
          flexDirection={{ base: "row", md: "row" }}
          justifyContent="flex-end"
          mr={"3rem"}
        >
          <Button
            display={{ md: "flex", base: "none" }}
            border={"1px solid #606060"}
            borderRadius={"4rem"}
            w={"9rem"}
            color={extendedTheme.colors._white}
            lineHeight={"28px"}
            background={"transparent"}
            letterSpacing={"0.2rem"}
            onClick={scrollTo}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            padding={"15px 68px 15px 68px"}
          >
            PLAY DEMO
          </Button>
        </HStack>

        <Box
          display={{ base: "flex", md: "none" }}
          mt={"2rem"}
          justifyContent={"center"}
        >
          <Button
            ml={{ md: "55rem" }}
            display={"flex"}
            border={"1px solid #606060"}
            borderRadius={"4rem"}
            w={"9rem"}
            color={extendedTheme.colors._white}
            lineHeight={"28px"}
            background={"transparent"}
            letterSpacing={"0.2rem"}
            onClick={scrollInMobile}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            padding={"15px 68px 15px 68px"}
          >
            PLAY DEMO
          </Button>
        </Box>

        <HStack
          position={"relative"}
          mt={"4rem"}
          px={{ md: "15rem", base: "0" }}
          minW={"100%"}
          bg={"#FFFFFF"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          py={{ md: "3rem", base: "1rem" }}
        >
          <Text
            color={"#0D0D25"}
            fontWeight={"700"}
            fontSize={{ md: "3.5rem", base: "1.5rem" }}
            as={"h2"}
          >
            Seamless Data Sharing for Personalized Experiences
          </Text>
          <Text
            mt={"1rem"}
            color={"#656565"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
          >
            Hushh is your one-stop solution for seamless data sharing between
            you and your favorite websites. With Hushh, you can effortlessly
            share your personal data with brands to enhance your browsing
            experience and receive tailored recommendations with Gen AI.
          </Text>
          <Box
            mt={"1.5rem"}
            display={{ md: "none", base: "flex" }}
            justifyContent={"center"}
            w={"100%"}
            h={"100%"}
            mb={"2rem"}
            p={{ md: "0rem", base: "2rem" }}
          >
            <Image
              alt="directionLine"
              className="hushhbuttonFrame3"
              style={{
                position: "absolute",
                height: "4rem",
                left: "-20%",
                bottom: "0",
              }}
              src={DirectionLine}
            />
            <CldVideoPlayer
              alt="Hushh Button Guide"
              title="Hushh button developer walkthrough"
              controls="true"
              width="440"
              height="250"
              src="Hushh_button_-_developer_walkthrough_uwwiy0"
            />
          </Box>
          <Box
            mt={"3rem"}
            display={{ md: "flex", base: "none" }}
            justifyContent={"center"}
            w={"100%"}
            h={"100%"}
            mb={"2rem"}
          >
            <Image
              src={BarIcon}
              alt="barIcon"
              style={{
                position: "absolute",
                left: "2%",
                top: "2%",
                transform: "rotate(35deg)",
              }}
              className="hushhbuttonFrame1"
            />
            <Image
              alt="hushhButtonCard2"
              style={{ position: "absolute", left: "12%" }}
              src={FrameCard2}
              className="hushhbuttonFrame2"
            />
            <Image
              alt="directionLine"
              className="hushhbuttonFrame3"
              style={{
                position: "absolute",
                left: "8%",
                bottom: "0",
              }}
              src={DirectionLine}
            />
            <CldVideoPlayer
              alt="Hushh Button Guide"
              title="Hushh button developer walkthrough"
              width="1620"
              height="1080"
              src="Hushh_button_-_developer_walkthrough_uwwiy0"
            />
            <Image
              className="frameCard1"
              alt="HushhButtonframeCard4"
              src={FramCard1}
              style={{ position: "absolute", right: "16rem", bottom: "0rem" }}
            />
          </Box>
        </HStack>
        <Stack
          fontWeight={"700"}
          mt={{ md: "9rem", base: "3.5rem" }}
          px={{ md: "15rem", base: "2rem" }}
          display={"flex"}
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ md: "6rem", base: "2rem" }}
        >
          <VStack
            display={"flex"}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box display={{ base: "flex", md: "none" }} gap={"1rem"}>
              <Text className="gradient">
                <Text fontSize={{ md: "2rem", base: "1.5rem" }}>
                  Hushh Button For
                </Text>
                <Text fontSize={{ md: "3.75rem", base: "2rem" }}>
                  Customers
                </Text>
              </Text>
              <Image
                src={HushhEmoji}
                alt="hushhButtonCircle"
                style={{ width: "30%" }}
              />
            </Box>

            <Text
              className="gradient"
              display={{ md: "flex", base: "none" }}
              flexDirection={"column"}
            >
              <Text fontSize={{ md: "2rem", base: "1.5rem" }}>
                Hushh Button For
              </Text>
              <Text fontSize={{ md: "3.75rem", base: "2rem" }}>Customers</Text>
            </Text>

            <UnorderedList
              mb={"1rem"}
              mt={{ base: "0.75rem", md: "1.5rem" }}
              fontWeight={"400"}
              fontSize={"1rem"}
              lineHeight={{ md: "28.8px" }}
              color={extendedTheme.colors.secondary}
            >
              <ListItem mb={{ md: "1rem", base: "0.5rem" }}>
                Sync your preferences, past purchases, sizing information to
                brands with a single click
              </ListItem>
              <ListItem mb={{ md: "1rem", base: "0.5rem" }}>
                Get your brand-specific data sent directly to your Hushh Wallet
                for secure storage and management
              </ListItem>
              <ListItem mb={{ md: "1rem", base: "0.5rem" }}>
                Brands can offer products and services based on your unique
                profile, leading to a more relevant shopping experience
              </ListItem>
            </UnorderedList>
            <Button
              border={"1px solid #606060"}
              borderRadius={"2px"}
              w={{ md: "16.25rem", base: "10rem" }}
              h={{ md: "3.75rem", base: "2.5rem" }}
              color={extendedTheme.colors._white}
              lineHeight={{ md: "28px", base: "14px" }}
              background={"transparent"}
              letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
              _hover={{
                background:
                  "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                border: "none",
              }}
              onClick={() =>
                router.push(
                  "https://www.npmjs.com/package/hushh-button-sdk"
                )
              }
            >
              LEARN MORE
            </Button>
          </VStack>
          <VStack
            display={{ base: "none", md: "flex" }}
            w={{ md: "60%", base: "50%" }}
          >
            <Image src={HushhEmoji} alt="hushhButtonCircle" />
          </VStack>
        </Stack>

        <Stack
          fontWeight={"700"}
          mt={{ md: "9rem", base: "5rem" }}
          mb={{ md: "4rem", base: "2rem" }}
          px={{ md: "15rem", base: "2rem" }}
          display={"flex"}
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ md: "6rem", base: "2rem" }}
        >
          <VStack display={{ md: "flex", base: "none" }} mt={"3rem"} w={"40%"}>
            <Image src={HushhBrandCard} alt="hushhButtonCircle" />
          </VStack>
          <VStack
            w={{ md: "50%" }}
            display={"flex"}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <HStack display={{ md: "none", base: "flex" }} gap={"1.5rem"}>
              <Image
                src={HushhBrandCard}
                style={{ width: "40%" }}
                alt="hushhButtonCircle"
              />
              <Text className="gradient">
                <Text fontSize={{ md: "2rem", base: "1.5rem" }}>
                  Hushh Button For
                </Text>
                <Text fontSize={{ md: "3.75rem", base: "2rem" }}>Brands</Text>
              </Text>
            </HStack>
            <Text
              className="gradient"
              display={{ md: "flex", base: "none" }}
              flexDirection={{ md: "column" }}
            >
              <Text fontSize={{ md: "2rem", base: "1.5rem" }}>
                Hushh Button For
              </Text>
              <Text fontSize={{ md: "3.75rem", base: "2rem" }}>Brands</Text>
            </Text>
            <UnorderedList
              mt={{ base: "0.75rem", md: "1.5rem" }}
              mb={"1rem"}
              fontWeight={"400"}
              fontSize={"1rem"}
              lineHeight={{ md: "28.8px" }}
              color={extendedTheme.colors.secondary}
            >
              <ListItem mb={"1rem"}>
                Access authentic data from Hushh users who opt-in, allowing for
                personalized product recommendations and marketing campaigns
              </ListItem>
              <ListItem mb={"1rem"}>
                Simplified data collection and ensures compliance with user
                privacy preferences
              </ListItem>
              <ListItem mb={"1rem"}>
                Create a more personalized and rewarding shopping experience
                that drives loyalty and sales
              </ListItem>
            </UnorderedList>
            <Button
              border={"1px solid #606060"}
              borderRadius={"2px"}
              w={{ md: "16.25rem", base: "10rem" }}
              h={{ md: "3.75rem", base: "2.5rem" }}
              color={extendedTheme.colors._white}
              lineHeight={{ md: "28px", base: "14px" }}
              background={"transparent"}
              letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
              _hover={{
                background:
                  "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                border: "none",
              }}
              onClick={() =>
                router.push(
                  "https://www.npmjs.com/package/hushh-button-sdk"
                )
              }
            >
              GET IT NOW
            </Button>
          </VStack>
        </Stack>

        <Stack
          bg={"white"}
          pos={"relative"}
          display={{ md: "flex", base: "none" }}
          flexDirection={"row"}
        >
          <Image src={HushhButtonBg} alt="hushhbuttonBg" />
          <VStack
            gap={{ md: "2.5rem", base: "1rem" }}
            mt={{ md: "10rem" }}
            mr={{ md: "50%" }}
            alignItems="flex-start"
            justifyContent="flex-start"
            pl={{ md: "3rem" }}
            pos={"absolute"}
          >
            <Box
              fontWeight={"400"}
              lineHeight={{ md: "60.6px", base: "30.3px" }}
              fontSize={{ md: "3.75rem", base: "1.5rem" }}
            >
              <Text color={"#0D0D25"}>
                The <br></br> Hushh Button{" "}
                <span style={{ fontWeight: "700" }}> is a </span>{" "}
              </Text>
              <Text className="hushh-gradient" fontWeight={"700"}>
                win-win
              </Text>
            </Box>
            <Text
              color={"#0D0D25"}
              fontWeight={"400"}
              fontSize={{ md: "1.25rem", base: "0.75rem" }}
              lineHeight={{ base: "", md: "27px" }}
            >
              Customers enjoy a seamless and personalized shopping experience,
              while brands gain valuable insights and build stronger
              relationships with their audience
            </Text>
            <Button
              pos={"relative"}
              border={"3px solid"}
              borderLeftColor={"#E54D60"}
              borderRightColor={"#A342FF"}
              borderTopColor={"#E54D60"}
              borderBottomColor={"#A342FF"}
              borderEndColor={"#E54D60"}
              borderStartColor={"#A342FF"}
              borderRadius={"2px"}
              w={"16rem"}
              h={"3.75rem"}
              className="hushh-gradient"
              lineHeight={"28px"}
              background={"transparent"}
              letterSpacing={"0.5rem"}
              _hover={{
                background:
                  "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                color: "white",
                border: "none",
              }}
              onClick={() =>
                router.push(
                  "https://www.npmjs.com/package/hushh-button-sdk"
                )
              }
            >
              GET IT NOW
            </Button>
          </VStack>
          <VStack
            right={0}
            display={{ md: "flex", base: "none" }}
            alignItems="flex-end"
            justifyContent="flex-end"
            pr={"1rem"}
            pos={"absolute"}
          >
            <Image src={HushhButtonWin} alt="hushhButtonUser" />
          </VStack>
        </Stack>

        <Stack
          display={{ lg: "none", base: "flex" }}
          bg="white"
          direction="row"
          pb={"4rem"}
          align="left"
          justify="left"
          position={"relative"}
        >
          <Image
            src={HushhButtonBg}
            alt="hushhbuttonBg"
            style={{ boxSizing: "content-box", height: "20rem" }}
          />
          <VStack
            gap="1rem"
            mt="2rem"
            alignItems="left"
            justifyContent="flex-start"
            pl="1rem"
            mr={"50%"}
            pos="absolute"
            top="0"
            left="0"
            right="0"
            textAlign="left"
          >
            <Box
              fontWeight={"400"}
              lineHeight={{ md: "60.6px", base: "30.3px" }}
              fontSize={{ md: "3.75rem", base: "1.5rem" }}
            >
              <Text color={"#0D0D25"}>
                The Hushh Button{" "}
                <span style={{ fontWeight: "700" }}> is a </span>{" "}
              </Text>
              <Text className="hushh-gradient" fontWeight={"700"}>
                win-win
              </Text>
            </Box>
            <Text
              color={"#0D0D25"}
              fontWeight={"400"}
              fontSize={{ md: "1.25rem", base: "0.75rem" }}
              lineHeight={{ base: "", md: "27px" }}
            >
              Customers enjoy a seamless and personalized shopping experience,
              while brands gain valuable insights and build stronger
              relationships with their audience
            </Text>
            <Button
              pos={"relative"}
              border={"2px solid"}
              borderLeftColor={"#E54D60"}
              borderRightColor={"#A342FF"}
              borderTopColor={"#E54D60"}
              borderBottomColor={"#A342FF"}
              borderEndColor={"#E54D60"}
              borderStartColor={"#A342FF"}
              borderRadius={"2px"}
              w={"8rem"}
              h={"2.25rem"}
              fontSize={"0.75rem"}
              className="hushh-gradient"
              lineHeight={"28px"}
              background={"transparent"}
              letterSpacing={"0.1rem"}
              _hover={{
                background:
                  "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                color: "white",
                border: "none",
              }}
              onClick={() =>
                router.push(
                  "https://www.npmjs.com/package/hushh-button-sdk"
                )
              }
            >
              GET IT NOW
            </Button>
          </VStack>

          <VStack
            right={0}
            bottom={0}
            display={{ md: "none", base: "flex" }}
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Image
              src={HushhButtonWin}
              alt="HushhButtonOnlyUser"
              style={{ height: "100%", position: "absolute", width: "50%" }}
            />
          </VStack>
        </Stack>

        <Stack
          mx={{ md: "10rem", base: "3.5rem" }}
          mt={{ base: "3.5rem", md: "10rem" }}
          mb={{ base: "2.5rem", md: "15rem" }}
          position={"relative"}
        >
          <Box display={{ base: "none", md: "block" }}>
            <Image
              src={BgAnimation}
              alt="BgAnimation"
              style={{
                position: "absolute",
                top: "-15px",
                zIndex: "-10",
                width: "100%",
                height: "40rem",
                filter: "grayscale(100%)",
              }}
              unoptimized
            />
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <Image
              src={BgAnimation}
              alt="BgAnimation"
              style={{
                position: "absolute",
                top: "-15px",
                zIndex: "-10",
                width: "100%",
                height: "13rem",
                filter: "grayscale(100%)",
              }}
              unoptimized
            />
          </Box>

          <VStack px={{ md: "10rem", base: "0rem" }}>
            <Text
              textAlign={"center"}
              className="gradient"
              fontWeight={"400"}
              fontSize={{ md: "3.75rem", base: "1.25rem" }}
              lineHeight={{ base: "45px", md: "75px" }}
            >
              Transformed Shopping <br></br> Experience
            </Text>
            <Text
              mt={{ md: "2rem", base: "1rem" }}
              color={"white"}
              textAlign={"center"}
              fontWeight={"400"}
              lineHeight={{ md: "31.5px", base: "20px" }}
              fontSize={{ md: "1.125rem", base: "0.75rem" }}
            >
              With the Hushh Widget, websites and apps seamlessly change to
              showcase products that align with the user's preferences. It's
              like having a personalized shopping assistant that curates
              recommendations based on their unique style.
            </Text>
          </VStack>
        </Stack>
        <HStack
          pb={{ base: "3rem", md: "6rem" }}
          px={{ md: "10rem", base: "1rem" }}
          gap={{ md: "5rem", base: "1.25rem" }}
          mt={{ md: "5rem", base: "2rem" }}
        >
          <VStack
            gap={{ md: "2rem", base: "0.5rem" }}
            alignItems={"flex-start"}
            textAlign={"left"}
          >
            <Box display={{ md: "block", base: "none" }}>
              <Image
                src={Slogo}
                alt="sLogo"
                style={{ width: "120px", height: "160px" }}
                unoptimized
              />
            </Box>
            <Box display={{ md: "none", base: "block" }}>
              <Image
                src={Slogo}
                alt="sLogo"
                style={{ width: "90px", height: "110px" }}
                unoptimized
              />
            </Box>

            <Text
              fontWeight={"400"}
              fontSize={{ md: "3.75rem", base: "1.25rem" }}
              lineHeight={{ md: "75px", base: "30px" }}
              className="gradient"
            >
              Hushh Button <br></br> Magic
            </Text>
            <Text
              lineHeight={{ md: "31.5px" }}
              color={"white"}
              fontSize={{ md: "1.125rem", base: "0.56rem" }}
            >
              The widget allows users to create their cookies and control what
              information they want to share with different websites. This gives
              users complete control over their data privacy while enjoying a
              personalized shopping experience.
            </Text>
          </VStack>
          <VStack
            alignItems={"flex-start"}
            textAlign={"left"}
            gap={{ md: "2rem", base: "0.5rem" }}
          >
            <Box display={{ md: "block", base: "none" }}>
              <Image
                src={DataRetrievalMade}
                alt="DataRetrievalMade"
                style={{ width: "120px", height: "160px" }}
                unoptimized
              />
            </Box>
            <Box display={{ md: "none", base: "block" }}>
              <Image
                src={DataRetrievalMade}
                alt="DataRetrievalMade"
                style={{ width: "90px", height: "110px" }}
                unoptimized
              />
            </Box>
            <Text
              fontWeight={"400"}
              fontSize={{ md: "3.75rem", base: "1.25rem" }}
              lineHeight={{ md: "75px", base: "30px" }}
              className="gradient"
            >
              Data Retrieval Made Easy
            </Text>
            <Text
              lineHeight={{ md: "31.5px" }}
              color={"white"}
              fontSize={{ md: "1.125rem", base: "0.56rem" }}
            >
              The widget allows users to retieve their data and control what
              information they want to share with different websites. This gives
              users complete control over their data privacy while enjoying a
              personalized shopping experience.
            </Text>
          </VStack>
        </HStack>
        <HushhButtonFaq />
      </Box>
      <ContactForm />
    </>
  );
};

export default ClientHushhButton;
