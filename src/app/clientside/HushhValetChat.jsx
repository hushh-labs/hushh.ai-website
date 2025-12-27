"use client";
import React from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import extendedTheme from "../theme";
import Image from "next/image";
import DirectionLine from "../_components/svg/icons/directionLine.svg";
import BarIcon from "../_components/svg/icons/barIcon.svg";
import FrameCard2 from "../_components/svg/card/buttonvoucherCard.svg";
import FramCard1 from "../_components/svg/card/frameCardHushhButton.svg";
import { useRouter } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";
import ManageFinanceBox from "../_components/svg/managefinanceBox.svg";
import ValetIntegrationBox from "../_components/svg/valetIntegrationBox.svg";
import ValetChatFaq from "../_components/features/faq/valetChatFaq";
import ContactForm from "../_components/features/contactForm";
import BgAnimation from "../../../public/Gif/bgAnimation.gif";
import { useState, useEffect } from "react";
import ValetChatGif from "../../../public/Gif/valeTChatBg.gif";
import "next-cloudinary/dist/cld-video-player.css";
import dynamic from "next/dynamic";

const CldVideoPlayer = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldVideoPlayer),
  { ssr: false }
);

const ClientHushhValetChat = () => {
  const gradient = "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)";
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = () => {
    scroll.scrollTo(850);
  };

  const scrollInMobile = () => {
    scroll.scrollTo(450);
  };

  const learnMoreScroll = () => {
    scroll.scrollTo(1500);
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
            src={ValetChatGif}
            alt="ValetChatGif"
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
            src={ValetChatGif}
            alt="ValetChatGif"
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
            as={"h1"}
          >
            Hushh Valet Chat
          </Heading>
          <Text
            px={{ md: "17.8rem" }}
            mb={{ base: "1rem", md: "4rem" }}
            textAlign={"center"}
            color={"#656565"}
          >
            Lets you collect all your receipts from mail and manage them to help
            you better understand your spending habits and finance
          </Text>
          <Button
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "16rem", base: "10rem" }}
            color={extendedTheme.colors._white}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={learnMoreScroll}
          >
            LEARN MORE
          </Button>
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
              border: "none",
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
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
            onClick={scrollInMobile}
            w={"12rem"}
            color={extendedTheme.colors._white}
            lineHeight={"32.4px"}
            background={"transparent"}
            letterSpacing={"0.29rem"}
            _hover={{
              border: "none",
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
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
            Manage your receipts in one place, gaining insights into your
            finances
          </Text>
          <Text
            mt={"1rem"}
            color={"#656565"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
          >
            Tired of? all the receipts at your mail and don't know how to manage
            them ? Valet chat is your one stop solution to find and manage all
            your receipts at one place and also get useful insights from us to
            better manage your finance
          </Text>
          <Box
            mt={"1.5rem"}
            display={{ md: "none", base: "flex" }}
            justifyContent={"center"}
            w={"100%"}
            h={"100%"}
            mb={"2rem"}
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
              alt="Hushh Valet Chat Guide"
              title="Hushh Valet Chat walkthrough"
              controls="true"
              width="440"
              height="250"
              src="Valet_Chat_Hushh_Research_and_Labs_pfjt3j"
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
              alt="Hushh Valet Guide"
              title="Hushh Valet Chat walkthrough"
              width="1620"
              height="1080"
              src="Valet_Chat_Hushh_Research_and_Labs_pfjt3j"
            />
            <Image
              className="frameCard1"
              alt="HushhButtonframeCard4"
              src={FramCard1}
              style={{ position: "absolute", right: "16rem", bottom: "0rem" }}
            />
          </Box>
        </HStack>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          display={{ base: "flex" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"} flex={1}>
            <Text
              className="default-gradient"
              letterSpacing={"0.255rem"}
              lineHeight={"1rem"}
              fontWeight={"600"}
              fontSize={{ md: "1rem", base: "0.75rem" }}
            >
              HUSHH
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"400"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}
            >
              Valet chat helps you{" "}
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"700"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}
            >
              Manage Finance
            </Text>
            <Box
              position="relative"
              fontSize={{ base: "1.25rem", md: "1.75rem" }}
              fontWeight="700"
              css={{
                "&::before": {
                  content: '"–"',
                  display: "inline-block",
                  width: "22px",
                  height: "1em",
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  border: "0 solid",
                  borderImageSource: gradient,
                  borderImageSlice: 1,
                },
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Track your recipts
            </Box>
            <Box
              fontSize={{ md: "1.25rem", base: "0.75rem" }}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={"30.04px"}
              color={"#ABACB0"}
              gap={{ md: "1rem", base: "0rem" }}
            >
              <Text>Sync all your receipts automatically </Text>
              <Text>Chat with our AI to understand your Finances better</Text>
              <Text>Manage and categories receipts for easy access</Text>
              <Text>Share your receipts with people and receive insights</Text>
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"} flex={1} gap={"1rem"}>
            <Image src={ManageFinanceBox} alt="ManageFinanceBox" />
            <Text
              fontSize={{ md: "1rem", base: "0.75rem" }}
              color={"#ABABAB"}
              lineHeight={{ md: "36px", base: "18px" }}
            >
              See all the different spending habits you have from your receipts
              to better understand your spending habits. Manage and gain
              insightful data on your finance
            </Text>
            <Button
              borderRadius={"3.3rem"}
              w={"fit-content"}
              p={"1rem 2rem"}
              _hover={{
                border: "none",
                color: "white",
                bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              }}
              onClick={() =>
                router.push(
                  "https://sites.google.com/hush1one.com/drops/mlds#h.phjv03hn3bq",
                )
              }
            >
              Explore
            </Button>
          </Box>
        </HStack>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          gap={{ md: "2rem", base: "0.25rem" }}
          display={"flex"}
          flexDirection={{ md: "row", base: "column" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            flex={1}
            gap={{ md: "2rem", base: "1rem" }}
          >
            <Image src={ValetIntegrationBox} alt="ValetIntegrationBox" />
            {/* <Text fontSize={{ md:'1rem', base:'0.75rem'}} color={'#ABABAB'} lineHeight={{md:'36px', base:'18px'}}>See exactly what data is being collected about you, including search queries, brand interactions, interests, preferences, likes, and clicks. Gain insights into your online behavior and understand what shapes your digital footprint</Text> */}
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={"2rem"} flex={1}>
            <Text
              className="default-gradient"
              letterSpacing={"0.255rem"}
              lineHeight={"1rem"}
              fontWeight={"600"}
              fontSize={"1rem"}
            >
              Convenient
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"400"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}
            >
              Wallet Integration
            </Text>
            <Box
              position="relative"
              fontSize={{ base: "1.25rem", md: "1.75rem" }}
              fontWeight="700"
              css={{
                "&::before": {
                  content: '"–"',
                  display: "inline-block",
                  width: "22px",
                  height: "1em",
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  border: "0 solid",
                  borderImageSource: gradient,
                  borderImageSlice: 1,
                },
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Streamlined Integration via Valet Chat
            </Box>
            <Box
              fontSize={"1rem"}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={"36px"}
              color={"#ABABAB"}
              gap={"1rem"}
            >
              <Text>
                Hushh Valet chat also enables users to share their Reciepts in
                their Hushh Wallet. This makes it easy to organize and access
                important information, such as receipts, warranty details, and
                more, all in one secure place.
              </Text>
            </Box>
            <Button
              border={"3px solid #606060"}
              borderRadius={"2px"}
              w={"16rem"}
              color={extendedTheme.colors._white}
              lineHeight={"28px"}
              background={"transparent"}
              letterSpacing={"0.4rem"}
              _hover={{
                border: "none",
                background:
                  "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              }}
              onClick={() =>
                router.push(
                  "https://sites.google.com/hush1one.com/drops/mlds#h.phjv03hn3bq",
                )
              }
            >
              REQUEST ACCESS
            </Button>
          </Box>
        </HStack>

        <Stack margin={{ md: "10rem", base: "3.5rem" }} position={"relative"}>
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
              Intelligent Finance and Receipts <br></br> Management
            </Text>
            <Text
              mt={{ md: "2rem", base: "1rem" }}
              color={"white"}
              textAlign={"center"}
              fontWeight={"400"}
              lineHeight={{ md: "31.5px", base: "20px" }}
              fontSize={{ md: "1.125rem", base: "0.75rem" }}
            >
              The Valet chat app utilizes advanced algorithms and AI technology
              to analyze the captured data and generate brilliant insights.
              Users receive personalized Insights on receipts, Manage their
              Receipts and receive intelligent insights on their spendings and
              Finance
            </Text>
          </VStack>
        </Stack>
        <ValetChatFaq />
      </Box>
      <ContactForm />
    </>
  );
};

export default ClientHushhValetChat;
