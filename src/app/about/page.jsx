import { Box, Heading, Link, Text, VStack, HStack } from "@chakra-ui/react";
import React from "react";
import TeamSection from "../_components/features/teamSection";
import AboutGroupPhoto from "../_components/svg/aboutImages/AboutGroupPhoto.svg";
import AboutOfficePhoto from "../_components/svg/aboutImages/AboutOfficePhoto.svg";
import AboutDockPhoto from "../_components/svg/aboutImages/AboutDockPhoto.svg";
import Image from "next/image";
import AboutMission from "../_components/svg/aboutImages/AboutMission.svg";
import AboutVision from "../_components/svg/aboutImages/AboutVision.svg";
import ContactForm from "../_components/features/contactForm";
import AboutFaq from "../_components/features/faq/aboutFaq";
import ImageGrid from "../_components/features/dynamicImageGrid";
import { siteMetadata } from "../sitemetadata";
import ContentWrapper from "../_components/layout/ContentWrapper";

export const metadata = {
  title: "About Hushh | Pioneering Data Empowerment & Privacy",
  description:
    "Discover Hushh's mission to empower individuals through data control and privacy. Learn about our leadership, vision, and commitment to transforming personal data into valuable assets.",
  keywords:
    "data privacy, data monetization, user-controlled data, privacy-preserving technology, decentralized data, ethical data practices, data sovereignty, Manish Sainani, Justin Donaldson, data empowerment, privacy-conscious consumers, luxury brands, AI-powered personalization, human-AI interaction, granular user consent",
  canonical: "https://hushh.ai/about",
  alternates: {
    canonical: "https://hushh.ai/about",
    languages: {
      'en-US': 'https://hushh.ai/about',
    },
  },
  openGraph: {
    title: "About Hushh | Pioneering Data Empowerment & Privacy",
    description:
      "Discover Hushh's mission to empower individuals through data control and privacy. Learn about our leadership, vision, and commitment to transforming personal data into valuable assets.",
    url: "https://hushh.ai/about",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "About Hushh - Data Empowerment & Privacy",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hushh | Pioneering Data Empowerment & Privacy",
    description: "Discover Hushh's mission to empower individuals through data control and privacy.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Organization JSON-LD structured data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hushh AI",
  "url": "https://www.hushh.ai",
  "logo": "https://www.hushh.ai/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1021 5th St W.",
    "addressLocality": "Kirkland",
    "addressRegion": "WA",
    "postalCode": "98033",
    "addressCountry": "US"
  },
  "description": "Hushh empowers individuals through data control and privacy, transforming personal data into valuable assets.",
  "foundingDate": "2022",
  "founders": [
    {
      "@type": "Person",
      "name": "Manish Sainani"
    },
    {
      "@type": "Person",
      "name": "Justin Donaldson"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/hushh-ai/",
    "https://twitter.com/hushh_ai",
    "https://www.youtube.com/@hushhai"
  ]
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <ContentWrapper>
      <Box bg="#f5f5f7" w="full">
        {/* Hero Section */}
        <Box py={{ base: 20, md: 24, lg: 32 }}>
          <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
            
            {/* About Badge */}
            <Box textAlign="center" mb={{ base: 8, md: 12, lg: 16 }}>
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight="700"
                bgGradient="linear(to-r, #0071E3, #BB62FC, #DA4B7A, #F44F22)"
                bgClip="text"
                letterSpacing="-0.02em"
                fontFamily="Inter, sans-serif"
              >
                About Hushh
              </Text>
            </Box>

            <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="6xl" mx="auto">
              
              {/* Main Headline */}
              <VStack spacing={6} align="center" textAlign="center">
                <Heading
                  as="h1"
                  fontSize={{ base: "40px", md: "64px", lg: "80px", xl: "96px" }}
                  fontWeight="bold"
                  lineHeight={{ base: 1.1, md: 1.0, lg: 0.95 }}
                  letterSpacing={{ base: "-1px", md: "-2px", lg: "-3px" }}
                  color="black"
                  fontFamily="Inter, sans-serif"
                  maxW={{ base: "100%", md: "90%", lg: "85%", xl: "80%" }}
                >
                  Building the future of{" "}
                  <Text as="span" bgGradient="linear(to-r, #0071E3, #BB62FC)" bgClip="text">
                    data sovereignty
                  </Text>
                </Heading>
              </VStack>

              {/* Description */}
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                textAlign="center"
                lineHeight={{ base: 1.6, md: 1.5, lg: 1.4 }}
                color="#1d1d1d"
                fontWeight="400"
                maxW={{ base: "100%", md: "85%", lg: "75%", xl: "70%" }}
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.01em"
              >
                At Hushh, we believe your data is your most valuable asset. That's why we're building the tools to put you back in the driver's seat. We envision a world where you have complete control over your digital identity, choosing how your data is used and deriving true benefit from it.
              </Text>

            </VStack>
          </Box>
        </Box>
        {/* Stats & Images Section */}
        <Box bg="white">
          <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 16, md: 20, lg: 24 }}>
            <Box display={{ base: "block", lg: "flex" }} gap={{ lg: 16, xl: 20 }} alignItems="flex-start">
              
              {/* Stats Column */}
              <Box flex="1" mb={{ base: 12, lg: 0 }}>
                <VStack spacing={{ base: 8, md: 10, lg: 12 }} align="flex-start">
                  
                  {/* LinkedIn Followers */}
                  <Box w="full">
                    <HStack spacing={{ base: 6, md: 8 }} align="center" mb={4}>
                      <Heading
                        fontSize={{ base: "48px", md: "64px", lg: "72px" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, #0071E3, #BB62FC)"
                        bgClip="text"
                        fontFamily="Inter, sans-serif"
                        lineHeight={1}
                        minW={{ base: "120px", md: "180px", lg: "200px" }}
                      >
                        86k+
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                        color="#1d1d1d"
                        fontFamily="Inter, sans-serif"
                        fontWeight="400"
                      >
                        LinkedIn Followers
                      </Text>
                    </HStack>
                    <Box h="1px" bg="linear-gradient(90deg, #0071E3 0%, #BB62FC 50%, transparent 100%)" />
                  </Box>

                  {/* Products */}
                  <Box w="full">
                    <HStack spacing={{ base: 6, md: 8 }} align="center" mb={4}>
                      <Heading
                        fontSize={{ base: "48px", md: "64px", lg: "72px" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, #0071E3, #BB62FC)"
                        bgClip="text"
                        fontFamily="Inter, sans-serif"
                        lineHeight={1}
                        minW={{ base: "120px", md: "180px", lg: "200px" }}
                      >
                        8+
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                        color="#1d1d1d"
                        fontFamily="Inter, sans-serif"
                        fontWeight="400"
                      >
                        Products
                      </Text>
                    </HStack>
                    <Box h="1px" bg="linear-gradient(90deg, #0071E3 0%, #BB62FC 50%, transparent 100%)" />
                  </Box>

                  {/* Team Members */}
                  <Box w="full">
                    <HStack spacing={{ base: 6, md: 8 }} align="center" mb={4}>
                      <HStack spacing={2} minW={{ base: "120px", md: "180px", lg: "200px" }}>
                        <Heading
                          fontSize={{ base: "48px", md: "64px", lg: "72px" }}
                          fontWeight="bold"
                          bgGradient="linear(to-r, #0071E3, #BB62FC)"
                          bgClip="text"
                          fontFamily="Inter, sans-serif"
                          lineHeight={1}
                        >
                          20
                        </Heading>
                        <VStack spacing={0} align="flex-start">
                          <Text
                            fontSize={{ base: "12px", md: "14px" }}
                            color="#666"
                            fontFamily="Inter, sans-serif"
                            fontWeight="400"
                          >
                            (Q4)
                          </Text>
                          <Text
                            fontSize={{ base: "12px", md: "14px" }}
                            color="#666"
                            fontFamily="Inter, sans-serif"
                            fontWeight="400"
                          >
                            2021
                          </Text>
                        </VStack>
                      </HStack>
                      <Text
                        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                        color="#1d1d1d"
                        fontFamily="Inter, sans-serif"
                        fontWeight="400"
                      >
                        Team Members and Growing
                      </Text>
                    </HStack>
                    <Box h="1px" bg="linear-gradient(90deg, #0071E3 0%, #BB62FC 50%, transparent 100%)" />
                  </Box>

                </VStack>
              </Box>

              {/* Images Column */}
              <Box flex="1">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
                  <Box
                    borderRadius="20px"
                    overflow="hidden"
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                    bg="white"
                    p={2}
                  >
                    <Image src={AboutGroupPhoto} alt="Group Photo" style={{ borderRadius: '16px' }} />
                  </Box>
                  
                  <HStack spacing={{ base: 4, md: 6 }} justify="center" w="full">
                    <Box
                      borderRadius="16px"
                      overflow="hidden"
                      boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                      bg="white"
                      p={2}
                      flex="1"
                      maxW="200px"
                    >
                      <Image src={AboutOfficePhoto} alt="Office Photo" style={{ borderRadius: '12px' }} />
                    </Box>
                    <Box
                      borderRadius="16px"
                      overflow="hidden"
                      boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                      bg="white"
                      p={2}
                      flex="1"
                      maxW="200px"
                    >
                      <Image src={AboutDockPhoto} alt="Dock Photo" style={{ borderRadius: '12px' }} />
                    </Box>
                  </HStack>
                </VStack>
              </Box>

            </Box>
          </Box>
        </Box>
        {/* History & Growing Team Section */}
        <Box py={{ base: 16, md: 20, lg: 24 }}>
          <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
            <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="6xl" mx="auto">
              
              <Box display={{ base: "block", lg: "flex" }} gap={{ lg: 16, xl: 20 }} w="full">
                
                {/* History Column */}
                <Box flex="1" mb={{ base: 12, lg: 0 }}>
                  <VStack spacing={{ base: 4, md: 6 }} align="flex-start">
                    <Heading
                      as="h2"
                      fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                      fontWeight="bold"
                      color="black"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-0.02em"
                    >
                      History
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Hushh arose from a deep understanding of the modern digital landscape. In a world where our data is constantly collected, analyzed, and often used without our full knowledge or consent, we recognized the urgent need for change.
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Our journey began with a simple question: What if individuals weren't just data points, but active owners of their digital selves? This question sparked a movement. We set out to develop the technology and tools to make this vision a reality.
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Hushh is not just about software; it's about a shift in power dynamics. We're dedicated to a future where everyone has the tools to reclaim their data, using it for their own empowerment and benefit. Our history is still being written, and we invite you to be part of the next chapter.
                    </Text>
                  </VStack>
                </Box>

                {/* Growing Team Column */}
                <Box flex="1">
                  <VStack spacing={{ base: 4, md: 6 }} align="flex-start">
                    <Heading
                      as="h2"
                      fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                      fontWeight="bold"
                      color="black"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-0.02em"
                    >
                      Growing Team
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Hushh isn't just about technology; it's about the passionate people behind it. Our team is a dynamic mix of privacy champions, skilled engineers, creative designers, and visionary thinkers. We're united by a shared belief in the power of individual data control and a relentless drive to innovate.
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      We're constantly seeking out bright minds and diverse perspectives to join our mission. If you're passionate about data privacy and empowerment, cutting-edge technology, disrupting established industries, and making a real-world impact, then Hushh might be the perfect place for you. Explore our current openings{" "}
                      <Text as="span" color="#0071E3" fontWeight="600">
                        <Link href="/career">here</Link>
                      </Text>{" "}
                      and become part of the team that's changing the data landscape, one user at a time.
                    </Text>
                  </VStack>
                </Box>

              </Box>
            </VStack>
          </Box>
        </Box>

        {/* VivaTech 2024 Section */}
        <Box bg="white">
          <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 16, md: 20, lg: 24 }}>
            
            {/* Section Header */}
            <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 12, md: 16 }}>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                textAlign="center"
                color="#666"
                letterSpacing="0.08em"
                textTransform="uppercase"
                fontFamily="Inter, sans-serif"
              >
                Hushh
              </Text>
              
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
                textAlign="center"
              >
                #VIVATECH 2024
              </Heading>
              
              <Text
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
                maxW="4xl"
              >
                VivaTech 2024 was a record-breaking Paris tech conference with 165,000+ attendees from 120+ countries. The event highlighted AI advancements, sustainable tech, and diversity in the industry. With global participation, VivaTech fostered business connections and showcased innovations shaping the future of technology.
              </Text>
            </VStack>

            {/* Image Grid */}
            <ImageGrid />
          </Box>
        </Box>

        {/* Mission and Vision Section */}
        <Box py={{ base: 16, md: 20, lg: 24 }}>
          <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
            
            {/* Section Header */}
            <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 12, md: 16 }}>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                textAlign="center"
                color="#666"
                letterSpacing="0.08em"
                textTransform="uppercase"
                fontFamily="Inter, sans-serif"
              >
                Core Value Company
              </Text>
              
              <Heading
                as="h2"
                fontSize={{ base: "36px", md: "48px", lg: "56px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
                textAlign="center"
              >
                Our Mission and Vision
              </Heading>
              
              <Text
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
                textAlign="center"
              >
                Building a world where data works for you, not against you.
              </Text>
            </VStack>

            {/* Mission & Vision Content */}
            <Box display={{ base: "block", lg: "flex" }} gap={{ lg: 16, xl: 20 }} w="full">
              
              {/* Mission Column */}
              <Box flex="1" mb={{ base: 12, lg: 0 }}>
                <VStack spacing={{ base: 6, md: 8 }} align="center">
                  <Box
                    borderRadius="20px"
                    overflow="hidden"
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                    bg="white"
                    p={2}
                  >
                    <Image src={AboutMission} alt="Our Mission" style={{ borderRadius: '16px' }} />
                  </Box>
                  
                  <VStack spacing={{ base: 4, md: 6 }} align="flex-start" w="full">
                    <Heading
                      as="h3"
                      fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                      fontWeight="bold"
                      color="black"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-0.02em"
                    >
                      Our Mission
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      Hushh's mission is to empower individuals to reclaim, understand, and harness the full potential of their personal data within a secure and privacy-centric ecosystem. We provide tools that centralize data, offer insights into its use, and create avenues for individuals to benefit from their own information while maintaining complete control over their privacy. Hushh aims to shift the balance of power, transforming data from a corporate tool into a catalyst for individual empowerment.
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              {/* Vision Column */}
              <Box flex="1">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
                  <Box
                    borderRadius="20px"
                    overflow="hidden"
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                    bg="white"
                    p={2}
                  >
                    <Image src={AboutVision} alt="Our Vision" style={{ borderRadius: '16px' }} />
                  </Box>
                  
                  <VStack spacing={{ base: 4, md: 6 }} align="flex-start" w="full">
                    <Heading
                      as="h3"
                      fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                      fontWeight="bold"
                      color="black"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-0.02em"
                    >
                      Our Vision
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      We envision a future where the responsible and ethical use of personal data leads to unprecedented levels of personalization, convenience, and self-driven opportunity, all while prioritizing individual privacy.
                    </Text>
                  </VStack>
                </VStack>
              </Box>

            </Box>
          </Box>
        </Box>

        {/* Team Section */}
        <Box bg="white">
          <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 16, md: 20, lg: 24 }}>
            <TeamSection />
          </Box>
        </Box>

        {/* FAQ Section */}
        <AboutFaq />

        {/* Contact Form */}
        <ContactForm />
      </Box>
      </ContentWrapper>
    </>
  );
}
