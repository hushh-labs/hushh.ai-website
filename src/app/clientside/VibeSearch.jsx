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
import VibeSearchFaq from "../_components/features/faq/vibeSearchFaq";
import FindYourStyleBox from "../_components/svg/findYourStyleBox.svg";
import VibeSearchIntegrationBox from "../_components/svg/vibeIntegrationBox.svg";
import VibeSearchBg from "../_components/svg/vibeBg.svg";
import ContactForm from "../_components/features/contactForm";
import Head from "next/head";
import BgAnimation from "../../../public/Gif/bgAnimation.gif";
import VibeSearchGif from "../../../public/Gif/vibeSearchGIf.gif";
// vibeSearchDemo_s1bdkh
import "next-cloudinary/dist/cld-video-player.css";
import dynamic from "next/dynamic";

const CldVideoPlayer = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldVideoPlayer),
  { ssr: false }
);

const ClientVibeSearch = () => {
  const gradient = "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)";
  const router = useRouter();

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
      <Head>
        <title>Vibe Search</title>
        <meta
          name="description"
          content="Find perfect items to express your individuality in just one click"
        />
        <meta
          name="keywords"
          content="Vibe Search, The vibe search app lets find and store all your favorite products that you come across by just taking a picture or by typing, Fashion, Vibe Match, Vibe search your companion for fashion and style, Find your style with your own stylist, Find products based on image and text, Save all your liked products, Get insights on your Fit and Style, Share your best Fit with Family and Friends, Find that perfect Fit and perfect look with just a click of a button, Integrate You Vibe with Vibe Search, vibe search also enables users to share your style preferences in their Hushh Wallet, easy to share and access important information, such as Your Size, FIt, Brands , Budget and Purchase history, Fit Brands and Sizes, Your Budget and purchase history track, Vibe search is more than just an app its your personal stylist on tap of a button, Share and Benefit, Search Any Style, Image based search, Save all your searches, Share curated list of products according to your vibe and fit along with your friends and family, Search any style throughout the internet, Your Personal Fashion Stylist at your Fingertips, Vibe search utilizes advanced algorithms and AI technology to analyze the captured data Find the best fit, Users receive personalized recommendations, discover new products and brands aligned with their interests, and stay up-to-date with the latest trends with Gen AI"
        />
      </Head>
      <Box
        maxW={"100"}
        minW={"100%"}
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Box display={{ base: "none", md: "block" }}>
          <Image
            src={VibeSearchGif}
            alt="VibeSearchGif"
            style={{
              position: "absolute",
              top: "-15px",
              left: "30%",
              transform: "rotate(-225deg)",
              opacity: "0.5",
              zIndex: "-10",
              height: "40rem",
              filter: "grayscale(100%)",
            }}
            unoptimized
          />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Image
            src={VibeSearchGif}
            alt="VibeSearchGif"
            style={{
              position: "absolute",
              top: "-15px",
              transform: "rotate(-225deg)",
              opacity: "0.5",
              zIndex: "-10",
              width: "100%",
              height: "13rem",
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
            Vibe Search
          </Heading>
          <Text
            px={{ md: "17.8rem" }}
            mb={{ base: "1rem", md: "4rem" }}
            textAlign={"center"}
            color={"#656565"}
          >
            The vibe search app lets find and store all your favorite products
            that you come across by just taking a picture or by typing
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
            onClick={() =>
              window.open("https://www.vibesearch.ai/", "_blank")
            }
          >
            Try Vibe Search
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
            onClick={scrollInMobile}
            w={"12rem"}
            color={extendedTheme.colors._white}
            lineHeight={"32.4px"}
            background={"transparent"}
            letterSpacing={"0.29rem"}
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
            Introducing Vibe search your companion for fashion and style
          </Text>
          <Text
            mt={"1rem"}
            color={"#656565"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
          >
            Want to know where you can buy that cute dress you saw the other
            day? don’t know what style fits you best . Don,t worry vibe search
            is all you need . VIbe search is your fashion companion that helps
            you find your style{" "}
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
              alt="Vibe Search Guide"
              title="Hushh Vibe Search walkthrough"
              controls="true"
              width="440"
              height="250"
              src="vibeSearchDemo_s1bdkh"
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
              alt="Vibe Search Guide"
              title="Hushh Vibe Search walkthrough"
              width="1620"
              height="1080"
              src="vibeSearchDemo_s1bdkh"
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
              Find Your Style with{" "}
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"700"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}
            >
              Your own Stylist
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
              Find The Style that fits you best
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
              <Text>Find products based on image and text </Text>
              <Text>Save all your liked products </Text>
              <Text>Get insights on your Fit and Style</Text>
              <Text>Share your best Fit with Family and Friends</Text>
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"} flex={1} gap={"1rem"}>
            <Image src={FindYourStyleBox} alt="FindYourStyleBox" />
            <Text
              fontSize={{ md: "1rem", base: "0.75rem" }}
              color={"#ABABAB"}
              lineHeight={{ md: "36px", base: "18px" }}
            >
              Find that perfect Fit and perfect look with just a click of a
              button. Search products with just and image and text save them for
              later to buy or create a whilst to share it with friends and
              family{" "}
            </Text>
            <Button
              borderRadius={"3.3rem"}
              w={"fit-content"}
              p={"1rem 2rem"}
              _hover={{
                color: "white",
                bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                border: "none",
              }}
              onClick={() =>
                window.open("https://www.vibesearch.ai/", "_blank")
              }
            >
              Checkout Vibe Search
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
            <Image
              src={VibeSearchIntegrationBox}
              alt="VibeSearchIntegrationBox"
            />
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
              Vibe Search Integration
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
              Integrate You Vibe with Vibe Search
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
                Hushh vibe search also enables users to share your style
                preferences in their Hushh Wallet. This makes it easy to share
                and access important information, such as Your Size, FIt, Brands
                , Budget and Purchase history.
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
                background:
                  "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                border: "none",
              }}
              onClick={() =>
                window.open(
                  "https://www.vibesearch.ai/",
                  "_blank"
                )
              }
            >
              Explore Vibe Search
            </Button>
          </Box>
        </HStack>

        <Stack
          display={"flex"}
          gap={{ md: "1rem", base: "0.5rem" }}
          textAlign={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            fontWeight={"400"}
            color={"#FFFFFF"}
            lineHeight={{ md: "25.83px", base: "16px" }}
            fontSize={{ md: "1.25rem", base: "1rem" }}
          >
            Our Uniqueness
          </Text>
          <Text
            alignItems={"center"}
            justifyContent={"center"}
            lineHeight={{ md: "88.14px", base: "44px" }}
            color={"white"}
            fontWeight={"700"}
            fontSize={{ md: "5.6rem", base: "2.5rem" }}
          >
            More Than Just{" "}
          </Text>
          <Text
            alignItems={"center"}
            justifyContent={"center"}
            lineHeight={{ md: "88.14px", base: "44px" }}
            color={"white"}
            fontWeight={"700"}
            fontSize={{ md: "5.6rem", base: "2.5rem" }}
          >
            {" "}
            An App
          </Text>
          <Text
            display={"flex"}
            color={"#ABABAB"}
            lineHeight={"25px"}
            fontSize={{ md: "0.8rem", base: "0.8rem" }}
          >
            Vibe search is more than just an app its your personal stylist on
            tap of a button
          </Text>
          <Box>
            <Image src={VibeSearchBg} alt="VibeSearchBg" />

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
              onClick={() =>
                window.open(
                  "https://www.vibesearch.ai/",
                  "_blank"
                )
              }
            >
              Checkout Vibe Search
            </Button>
          </Box>
        </Stack>

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
          <VStack
            mb={{ md: "2rem", base: "6rem" }}
            px={{ md: "10rem", base: "0rem" }}
          >
            <Text
              textAlign={"center"}
              className="gradient"
              fontWeight={"400"}
              fontSize={{ md: "3.75rem", base: "1.25rem" }}
              lineHeight={{ base: "35px", md: "75px" }}
            >
              Your Personal Fashion Stylist at <br></br> your Fingertips
            </Text>
            <Text
              mt={{ md: "2rem", base: "1rem" }}
              color={"white"}
              textAlign={"center"}
              fontWeight={"400"}
              lineHeight={{ md: "31.5px", base: "20px" }}
              fontSize={{ md: "1.125rem", base: "0.75rem" }}
            >
              The Vibe search utilizes advanced algorithms and AI technology to
              analyze the captured data Find the best fit and style for you.
              Users receive personalized recommendations, discover new products
              and brands aligned with their interests, and stay up-to-date with
              the latest trends with Gen AI.{" "}
            </Text>
          </VStack>
        </Stack>
        <VibeSearchFaq />
      </Box>
      <ContactForm />
    </>
  );
};

export default ClientVibeSearch;
