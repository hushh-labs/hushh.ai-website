"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  ListItem,
  OrderedList,
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
import CodeIcon from "../_components/svg/icons/codeIcon.svg";
import BusinessIcon from "../_components/svg/icons/retailBusiness.svg";
import DeveloperImg from "../_components/svg/developerApi/developerImage.svg";
import OwnedData from '../_components/svg/developerApi/userOwnedData.svg';
import CollectedData from '../_components/svg/developerApi/collectedData.svg';
import DeveloperCommunity from '../_components/svg/developerApi/developerCommunity.svg';
import { ServiceCard } from "../_components/primitives/serviceCard";
// Upcoming API's for Developers
import FashionApi from "../_components/svg/developerApi/fashionApi";
import FitnessApi from "../_components/svg/developerApi/fitnessApi";
import PiiApi from "../_components/svg/developerApi/PiiAPI";
import SocialApi from "../_components/svg/developerApi/socialAPI";
import TransactionApi from "../_components/svg/developerApi/transactionAPI"
import TravelApi from "../_components/svg/developerApi/travelAPI";
import { useToast } from "@chakra-ui/react";
import ContentWrapper from "../_components/layout/ContentWrapper";

const devloperApi = () => {
  const gradient = "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)";
  const router = useRouter();
  const toast = useToast();

  const scrollTo = () => {
    scroll.scrollTo(850);
  };

  const scrollInMobile = () => {
    scroll.scrollTo(450);
  };
  return (
    <>
    <Head>
        <title>
          Developer APIs - Hushh | Secure & Consent-Driven Data Integration
        </title>
        <meta
          name="description"
          content="Discover Hushh Developer APIs designed to empower your applications with secure, consent-driven data integration. Enhance your systems with our privacy-compliant, cutting-edge APIs."
        />
        <meta
          name="keywords"
          content="Developer APIs, Hushh, Secure APIs, Consent-Driven Data, Data Integration, Application Development, Privacy Compliance"
        />
        <meta property="og:title" content="Developer APIs - Hushh" />
        <meta
          property="og:description"
          content="Discover Hushh Developer APIs designed to empower your applications with secure, consent-driven data integration. Enhance your systems with our privacy-compliant, cutting-edge APIs."
        />
            <link rel="canonical" href="https://hushh.ai/developerApi" />

        <meta property="og:url" content="https://hushh.ai/developer-api" />
      </Head>
      <ContentWrapper includeHeaderSpacing={true}>
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

        {/* Added display none to fix the full width of the page on mobile screen as this is affecting on most of the pages  */}
        <Box display={{ base: "none", md: "none" }} pos={'relative'} minW={'100%'}>
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
            Developer APIs
          </Heading>
          <Text
            px={{ md: "17.8rem" }}
            mb={{ base: "1rem", md: "4rem" }}
            textAlign={"center"}
            color={"#656565"}
            lineHeight={{ md: "36px", base: "20px" }}
            fontSize={{ md: "1rem", base: "0.75rem" }}
          >
            Enabling a secure, trusted, and incentivized way of relaying
            valuable personal information from customers You can use the API-DOC
            in test mode, which doesn't affect your live data or interact with
            the banking networks. The API key you use to authenticate the
            request determines whether the request is live mode or test mode.
          </Text>
          <Button
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "18rem", base: "11rem" }}
            color={extendedTheme.colors._white}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
            letterSpacing={{ md: "0.29rem", base: "0.145rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={() => window.open("/developer-Api/on-boarding", "_blank")}
          >
            API DOCUMENTATION
          </Button>
        </Box>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          display={{ base: "flex" }}
          gap={{ md: "4rem", base: "2rem" }}
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
              lineHeight={{ md: "63.3px", base: "41.2px" }}
            >
              Hushh <br></br>Developer APIs
            </Text>

            <Box
              fontSize={{ md: "1rem", base: "0.5rem" }}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={{ md: "36px", base: "25px" }}
              color={"#ABACB0"}
              gap={{ md: "1rem", base: "1rem" }}
            >
              <Text>
                Enabling a secure, trusted, and incentivized way of relaying
                valuable personal information from customers You can use the
                API-DOC in test mode, which doesn't affect your live data or
                interact with the banking networks. The API key you use to
                authenticate the request determines whether the request is live
                mode or test mode.{" "}
              </Text>
              <Button
                mt={{md:'3rem',base:'1.5rem'}}
                border={"1px solid #606060"}
                borderRadius={"2px"}
                w={{ md: "18rem", base: "11rem" }}
                color={extendedTheme.colors._white}
                lineHeight={{ md: "28px", base: "14px" }}
                background={"transparent"}
                fontSize={{ md: "1rem", base: "0.75rem" }}
                letterSpacing={{ md: "0.29rem", base: "0.145rem" }}
                _hover={{
                  background:
                    "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                  border: "none",
                }}
                onClick={() =>
                  window.open("/developer-Api/on-boarding", "_blank")
                }
              >
                API DOCUMENTATION
              </Button>
            </Box>
          </Box>

          <Box display={"flex"} flexDirection={"column"} flex={1} gap={"1rem"}>
            <Image src={FindYourStyleBox} alt="FindYourStyleBox" />
            <Text
              fontSize={{ md: "1rem", base: "0.75rem" }}
              color={"#ABABAB"}
              fontWeight={"500"}
              lineHeight={{ md: "36px", base: "18px" }}
            >
              Revolutionize your data game with Hushh Developer APIs! Tailored
              for businesses and organizations of all stripes, our APIs empower
              YOUR developers to seamlessly integrate customers’ data into CRM
              systems and applications. Picture this: a new era of data driven
              excellence, where developers get consent driven, first-hand
              customer data and let personalized services take the center stage
              for their brand.{" "}
            </Text>
            <Text
              fontSize={{ md: "1rem", base: "0.75rem" }}
              color={"#ABABAB"}
              fontWeight={"500"}
              lineHeight={{ md: "36px", base: "22px" }}
            >
              Because in the world of luxury retail, the future is personalized,
              and your customers deserve nothing less!
            </Text>
          </Box>
        </HStack>

        <VStack display={"flex"} px={{ md: "7rem", base: "1.25rem" }}>
          <Text
            align={"center"}
            textAlign={"center"}
            color={"#FFFFFF"}
            letterSpacing={"0.04rem"}
            fontWeight={"500"}
            fontSize={{ md: "20px", base: "10px" }}
            lineHeight={{ md: "32px", base: "20px" }}
          >
            HUSHH
          </Text>
          <Text
            align={"center"}
            textAlign={"center"}
            mb={{ md: "2rem", base: "1rem" }}
            className="gradient"
            fontWeight={"700"}
            fontSize={{ md: "4.625rem", base: "2rem" }}
            lineHeight={{ md: "90.28px", base: "42.14px" }}
          >
            Our current main customers include
          </Text>
          <HStack
            minH={"max-content"}
            display={"flex"}
            mt={{md:'1.5rem',base:'0.75rem'}}
            gap={{ md: "4rem", base: "1rem" }}
          >
            <Box
              minH={{ md: "33rem", base: "29rem" }}
              h={"100%"}
              flex={1}
              borderRadius={"10px"}
              p={{ md: "2rem", base: "1rem" }}
              display={"flex"}
              flexDirection={"column"}
              bg={"#1A1A1A"}
            >
              <HStack
                display={"flex"}
                flexDirection={{ md: "row", base: "column" }}
                gap={{md:'2rem',base:'1rem'}}
              >
                <Image src={BusinessIcon} alt="businessIcon" title="business" />
                <Text
                  color={"#FFFFFF"}
                  fontWeight={"600"}
                  fontSize={{ md: "1.5rem", base: "0.75rem" }}
                  lineHeight={{ md: "36px", base: "20px" }}
                >
                  Retail businesses
                </Text>
              </HStack>
              <VStack
                minHeight={0}
                mt={{ md: "1.5rem", base: "0.75rem" }}
                display={"flex"}
                textAlign={"left"}
                alignItems={"flex-start"}
                gap={{ md: "2rem", base: "1rem" }}
                color={"#FFFFFF"}
                fontWeight={"400"}
                fontSize={{ md: "1rem", base: "0.5rem" }}
                lineHeight={{ md: "24px", base: "16px" }}
              >
                <Text>
                  Step into the future of retail excellence with Hush APIs- a
                  game changer for high-end luxury giants as well as e-commerce
                  businesses.
                </Text>
                <Text>
                  <b>Precision Marketing:</b> Imagine a world where marketing
                  strategies are not just targeted but finely tuned to match
                  individual customer preferences
                </Text>
                <Text>
                  <b>Another Layer of luxury:</b> Add another layer of luxury to
                  your customers’ experience by serving them with exactly what
                  they need by understanding individual preferences.
                </Text>
                <Text>
                  Because it’s not just about selling, it’s about crafting an
                  unforgettable journey for customers.
                </Text>
              </VStack>
            </Box>

            <Box
              minH={{ md: "33rem", base: "29rem" }}
              h={"100%"}
              flex={1}
              borderRadius={"10px"}
              p={{ md: "2rem", base: "1rem" }}
              display={"flex"}
              flexDirection={"column"}
              bg={"#1A1A1A"}
            >
              <HStack
                display={"flex"}
                flexDirection={{ md: "row", base: "column" }}
                gap={{md:'2rem',base:'1rem'}}
              >
                <Image src={CodeIcon} alt="CodeIcon" title="CodeIcon" />
                <Text
                  color={"#FFFFFF"}
                  fontWeight={"600"}
                  fontSize={{ md: "1.5rem", base: "0.75rem" }}
                  lineHeight={{ md: "36px", base: "20px" }}
                >
                  Application Developers
                </Text>
              </HStack>
              <VStack
                minHeight={0}
                mt={{ md: "1.5rem", base: "0.75rem" }}
                display={"flex"}
                textAlign={"left"}
                alignItems={"flex-start"}
                gap={{ md: "2rem", base: "1rem" }}
                color={"#FFFFFF"}
                fontWeight={"400"}
                fontSize={{ md: "1rem", base: "0.5rem" }}
                lineHeight={{ md: "24px", base: "16px" }}
              >
                <Text>
                  Enabling a world, where your applications not only meet but
                  exceed user expectations, all thanks to the power of Hushh.
                </Text>
                <Text>
                  It’s your key to unlocking first-hand consent driven customer
                  data without worrying about privacy laws and regulations.
                </Text>
                <Text>
                  Whether you’re crafting the next groundbreaking app or
                  enhancing your CRM system, we’ve got it covered.
                </Text>
                <Text>
                  With Hushh, developers become architects of bespoke
                  interactions, aligning applications with user preferences and
                  consent.
                </Text>
                <Text>
                  Set a new standard for excellence and help your brand build a
                  meaningful connection with the customers.
                </Text>
              </VStack>
            </Box>
          </HStack>
        </VStack>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          gap={{ md: "2rem", base: "0.5rem" }}
          display={"flex"}
          flexDirection={{ md: "row", base: "column" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            flex={1}
            gap={{ md: "2rem", base: "1rem" }}
          >
            <Image src={DeveloperImg} alt="DeveloperImg" />
            {/* <Text fontSize={{ md:'1rem', base:'0.75rem'}} color={'#ABABAB'} lineHeight={{md:'36px', base:'18px'}}>See exactly what data is being collected about you, including search queries, brand interactions, interests, preferences, likes, and clicks. Gain insights into your online behavior and understand what shapes your digital footprint</Text> */}
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={{ md: "2rem", base: "1rem" }}
            flex={1}
          >
            <Text
              className="new-gradient"
              letterSpacing={"0.255rem"}
              lineHeight={{ md: "1rem", base: "0.75rem" }}
              fontWeight={"600"}
              fontSize={"1rem"}
              mt={{ base: "1rem" }}
            >
              DEVELOPER API
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"500"}
              lineHeight={{ md: "63.3px", base: "31.2px" }}
            >
              Where do we get our <br></br> data from
            </Text>
            <Box
              fontSize={{ md: "1rem", base: "0.75rem" }}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={{ md: "36px", base: "24px" }}
              color={"#ABABAB"}
              gap={"1rem"}
            >
              <Text fontSize={{ md: "1rem", base: "0.75rem" }}>
                Wondering where we get our data from ? It’s simple- the owners
                are in control! Your data, your terms, and absolutely no cloud
                syncing without your consent.
              </Text>
              <Text fontSize={{ md: "1rem", base: "0.75rem" }}>
                Now let’s talk sources- the vital components that fuel the Hushh
                engine, right there on your device! Users have full authority
                over the data they choose to share. Data syncing to the cloud
                only occurs with the user’s explicit consent. Our API’s adhere
                to GDPR compliance standards.
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
                window.open("/developer-Api/on-boarding", "_blank")
              }
            >
              GET STARTED
            </Button>
          </Box>
        </HStack>

        <VStack px={{ md: "12rem", base: "1.25rem" }} py={{md:'4rem',base:'2rem'}}>
          <Text className="hushh-gradient" fontWeight={'600'} fontSize={{md:'1rem',base:'0.5rem'}} lineHeight={'16px'} letterSpacing={'0.255rem'}>CORE VALUE COMPANY</Text>
          <Text className="gradient" textAlign={'center'} fontWeight={'400'} fontSize={{md:'3.75rem',base:'1.75rem'}} lineHeight={{base:'40px',md:'63.3px'}}>Data Categories in Hushh</Text>
          <Text color={"#E5E5E5"} fontWeight={'400'} fontSize={{md:'1rem',base:'0.5rem'}} lineHeight={{md:'28px',base:'20px'}}>
            Building a world where data works for you, not against you.
          </Text>
          <HStack mt={{md:'3rem',base:'1.25rem'}} display={'flex'} align={'center'} gap={{ md: "4rem", base: "1rem" }}>

            <VStack gap={{md:'1.25rem',base:'0.75rem'}} flex={1} align={'flex-start'} display={'flex'} textAlign={'left'} alignItems={'flex-start'}>
              <Image src={OwnedData} alt="OwnedData" title="user owned data" />
              <Text
                color={"#E5E5E5"}
                fontWeight={"700"}
                fontSize={{ md: "1.375rem", base: "0.75rem" }}
                lineHeight={{ md: "26.4px", base: "16px" }}
              >
                User-Owned Data
              </Text>
              <OrderedList lineHeight={{md:'36px',base:'18px'}} color={'#ABABAB'} spacing={3} fontSize={{ md: "1rem", base: "0.5rem" }}>
                <ListItem>
                User’s GMAIL
                </ListItem>
                <ListItem>
                Photos access (selective)
                </ListItem>
                <ListItem>
                Folders access (selective)
                </ListItem>
                <ListItem>
                Apple Health data
                </ListItem>
                <ListItem>
                Financial data
                </ListItem>
              </OrderedList>
            </VStack>

            <VStack flex={1} gap={{md:'1.25rem',base:'0.75rem'}} alignSelf={'flex-start'} alignItems={'flex-start'}>
              <Image src={CollectedData} alt="CollectedData" title="Collected Data" />
              <Text
                color={"#E5E5E5"}
                fontWeight={"700"}
                fontSize={{ md: "1.375rem", base: "0.75rem" }}
                lineHeight={{ md: "26.4px", base: "16px" }}
              >
                Hushh-collected Data
              </Text>
              <OrderedList lineHeight={{md:'36px',base:'18px'}} color={'#ABABAB'} spacing={3} fontSize={{ md: "1rem", base: "0.5rem" }}>
                <ListItem>
                Hushh-Button Interactions
                </ListItem>
                <ListItem>
                Hushh Chrome Extension
                </ListItem>
                <ListItem>
                User surveys via Hushh app
                </ListItem>
              </OrderedList>
            </VStack>
          </HStack>
        </VStack>

       <VStack mx={{ md: "7rem", base: "1.25rem" }} gap={{ md: "2rem", base: "0.5rem" }} bg={'#1A1A1A'} borderRadius={'10px'} padding={{md:'50px',base:'25px'}} textAlign={'center'} alignContent={'center'} alignItems={'center'}>
           <Text color={'#FFFFFF'} fontSize={{md:'1rem',base:'0.5rem'}} lineHeight={{md:'24px',base:'18px'}} fontWeight={'400'}>Users retain ownership and control in both categories of data. We make use of multiple AI-based models as well as state-of-the-art techniques to efficiently and securely extract relevant information from all these diverse data sources.</Text>
           <Text color={'#FFFFFF'} fontSize={{md:'1rem',base:'0.5rem'}} lineHeight={{md:'24px',base:'18px'}} fontWeight={'400'}>We just don’t collect, we curate! Because it’s not just about coding; it’s about creating a future where applications are as unique as the individuals who use them.</Text>
       </VStack> 

       <Box
        mx={{ md: "6rem", base: "0" }}
        mb={"1rem"}
        bg={"#131414"}
        gap={{ md: "5rem", base: "1.25rem" }}
        minW={{ md: "85%", base: "100%" }}
        mt={{ md: "6rem", base: "4rem" }}
        display={"flex"}
        flexDirection={"row"}
      >
        <VStack
          ml={{ md: "2rem", base: "0" }}
          mx={{ base: "1rem" }}
          gap={{ md: "2.5rem", base: "1rem" }}
          textAlign={"left"}
          alignItems={"flex-start"}
          my={{ md: "4rem", base: "2rem" }}
        >
          <Text
            className="color-gradient"
            fontWeight={"600"}
            fontSize={{ md: "1rem", base: "1rem" }}
            lineHeight={"1rem"}
            letterSpacing={"0.255"}
          >
            HUSHH
          </Text>
          <Text
            className="gradient"
            fontSize={{ md: "3.75rem", base: "2rem" }}
            fontWeight={"600"}
            lineHeight={{ md: "63.65px", base: "45px" }}
          >
            Why hushh?
          </Text>
          <VStack
            display={{ md: "none", base: "block" }}
            alignItems={"center"}
            justify={"center"}
            align={"center"}
            alignSelf={"center"}
          >
            <Image
              src={DeveloperCommunity}
              alt="DeveloperCommunity"
              style={{ width: "100%", height: "100%" }}
            />
          </VStack>
          <Text color={'#FFFFFF'} fontWeight={'400'} fontSize={{md:'1rem',base:'0.60rem'}} lineHeight={{ md:'24px',base:'18px'}} spacing={{md:'2rem',base:'1rem'}}>We cater to developers who want to spruce up their applications designed mainly for end-users, sales agents, and influencers. hushh is for you if:</Text>
          <OrderedList color={'#FFFFFF'} fontWeight={'400'} fontSize={{md:'1rem',base:'0.60rem'}} lineHeight={{ md:'24px',base:'18px'}} spacing={{md:'2rem',base:'1rem'}}>
            <ListItem>Need direct access to granular personal user data for applications.</ListItem>
            <ListItem>Use cross-functional data points that you can't collect on your own.</ListItem>
            <ListItem>Only use consent-driven, privacy-respecting, transparent data compliant with regulations.</ListItem>
          </OrderedList>
          <Button
            mt={{md:'4rem',base:'1rem'}}
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "18rem", base: "11rem" }}
            color={extendedTheme.colors._white}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
            letterSpacing={{ md: "0.29rem", base: "0.145rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={() => window.open("/developer-Api/on-boarding", "_blank")}
          >
            API DOCUMENTATION
          </Button>
        </VStack>
        <VStack
          display={{ md: "flex", base: "none" }}
          alignContent={"flex-end"}
          alignItems={"flex-end"}
          alignSelf={"flex-end"}
          w={"100%"}
          h={"80%"}
        >
          <Image src={DeveloperCommunity} alt="DeveloperCommunity" />
        </VStack>
      </Box>


      <HStack
              pt={{ md: "8rem", base: "5rem" }}
              justify={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Text
                className="color-gradient"
                fontWeight={600}
                letterSpacing={"0.25rem"}
                fontSize={"1rem"}
                lineHeight={"1rem"}
              >
                API SHOWCASE
              </Text>
              <Box
                align={"center"}
                lineHeight={{ md: "63.3px" }}
                pl={{ md: "16rem" }}
                pr={{ md: "16rem" }}
                className="gradient"
                fontWeight={"300"}
                display={"flex"}
                flexDirection={"row"}
                fontSize={{ md: "3.75rem", base: "1.5rem" }}
              >
                Browse our APIs
                {/* <Text
                  fontWeight="700"
                  display="flex"
                  marginLeft={{ md: "1rem" }}
                >
                  {" "}
                  Everyone!
                </Text> */}
              </Box>
              <Text
                className="description"
                textAlign={"center"}
                w={"full"}
                px={{ md: "24rem", base: "2rem" }}
                color={'#ABABAB'}
                fontSize={{ base: "0.75rem", md: "1rem" }}
              >
                We have seamless data capturing capabilities, robust security with trust measures in place and in-depth insights and transparency around the value of your data.
              </Text>
              <Container
                display={"flex"}
                mb={{ md: "4rem", base: "1.75rem" }}
                pt={{ md: "2rem", base: "1rem" }}
                px={{ md: "10rem", base: "0.5rem" }}
                justifyContent={"center"}
                textAlign={"center"}
                minW={{ md: "100%", base: "100%" }}
              >
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={{ md: 20, base: 5 }}
                  justifyContent="center"
                >
                  <ServiceCard
                    icon={<PiiApi />}
                    title="PII​"
                    alignItems={"center"}
                    textAlign={"center"}
                    description="Extract, protect, and process sensitive consumer data with hushh Data Privacy Vault.​"
                    onClick={() =>
                        window.open(
                          "https://hushh.gitbook.io/hushh-docs/api-reference/pii-api",
                          '_blank'
                        )
                      }
                  />
                  <ServiceCard
                    icon={<FashionApi/>}
                    title="Fashion API​​​"
                    textAlign={"center"}
                    alignItems={"center"}
                    description="Think Legos for fashion websites & apps. Add features like product data or virtual try-on.​"
                    onClick={() =>
                        window.open(
                          "https://hushh.gitbook.io/hushh-docs/api-reference/fashion-api",
                          '_blank'
                        )
                      }                  />
                  <ServiceCard
                    icon={<TransactionApi />}
                    title="Transactions API​"
                    textAlign={"center"}
                    alignItems={"center"}
                    description="Think pipes for your finances. They move money data between apps and services."
                    onClick={() =>
                        window.open(
                          "https://hushh.gitbook.io/hushh-docs/api-reference/transactions-api",
                          '_blank'
                        )
                      }                       />
                  {/* 2nd row */}
                  <ServiceCard
                    icon={<TravelApi />}
                    title="Travel"
                    alignItems={"center"}
                    textAlign={"center"}
                    description="Travel APIs act like travel agents for your app or website."
                    onClick={() => toast({
                        title: "Coming Soon",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                      })}
                  />
                   <ServiceCard
                    icon={<SocialApi/>}
                    title="Social Media​"
                    alignItems={"center"}
                    textAlign={"center"}
                    description="Chat with social media platforms.  Lets your app post, get feeds, and more."
                    onClick={() => toast({
                        title: "Coming Soon",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                      })}                  
                    />
                  <ServiceCard
                    icon={<FitnessApi/>}
                    title="Fitness​"
                    alignItems={"center"}
                    textAlign={"center"}
                    description="Wearable device apps use APIs to collect user health data from phones and wearables."
                    onClick={() => toast({
                        title: "Coming Soon",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                      })}
                  />
                </Grid>
              </Container>
      </HStack>

        <VibeSearchFaq />
      </Box>
      <ContactForm />
      </ContentWrapper>
    </>
  );
};

export default devloperApi;
