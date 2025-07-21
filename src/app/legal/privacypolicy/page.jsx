import React from "react";
import { Heading, Box, Container, VStack, Text } from "@chakra-ui/react";
import ContactForm from "../../_components/features/contactForm";
import ContentWrapper from "../../_components/layout/ContentWrapper";

export const metadata = {
  title: "Hushh | Privacy Policy - Your Data, Your Rights",
  description:
    "Explore Hushh's Privacy Policy to understand how we protect your data, ensure privacy, and uphold your rights. Learn about our commitment to secure and transparent data practices.",
  keywords:
    "Hushh, Privacy Policy, Data Protection, Security, User Rights, Data Privacy, Secure Data, Transparent Practices, Data Security",
  canonical: "https://hushh.ai/legal/privacypolicy",
  alternates: {
    canonical: "https://hushh.ai/legal/privacypolicy",
  },
  openGraph: {
    title: "Hushh | Privacy Policy - Your Data, Your Rights",
    description:
      "Explore Hushh's Privacy Policy to understand how we protect your data, ensure privacy, and uphold your rights. Learn about our commitment to secure and transparent data practices.",
    url: "https://hushh.ai/legal/privacypolicy",
  }
};

const PrivacyPolicy = () => {
  return (
    <>
    <Box bg="#f5f5f7">
      <ContentWrapper includeHeaderSpacing={true}>
        {/* Hero Section */}
        <Container maxW="container.xl" py={{ base: 20, md: 24, lg: 32 }}>
          <VStack spacing={{ base: 8, md: 12, lg: 16 }} align="center" maxW="4xl" mx="auto">
            
            {/* Main Heading */}
            <VStack spacing={6} align="center" pt={{ base: 8, md: 12 }}>
              <Heading
                as="h1"
                fontSize={{ base: "48px", md: "72px", lg: "96px" }}
                fontWeight="bold"
                textAlign="center"
                lineHeight={{ base: 1.1, md: 1.0, lg: 0.95 }}
                letterSpacing={{ base: "-1px", md: "-2px", lg: "-3px" }}
                color="black"
                fontFamily="Inter, sans-serif"
                // maxW={{ base: "100%", md: "90%", lg: "85%" }}
              >
                Privacy Policy
              </Heading>
            </VStack>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "20px", md: "24px", lg: "28px" }}
              textAlign="center"
              lineHeight={{ base: 1.5, md: 1.4 }}
              color="#1d1d1d"
              fontWeight="400"
              maxW={{ base: "100%", md: "85%", lg: "75%" }}
              px={{ base: 4, md: 0 }}
              fontFamily="Inter, sans-serif"
              letterSpacing="-0.01em"
            >
              Our Privacy Policy explains how we collect and use your personal data
            </Text>

            {/* Last Updated */}
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              color="#666"
              fontWeight="500"
              fontFamily="Inter, sans-serif"
              textAlign="center"
            >
              Last updated: March 17, 2025
            </Text>

          </VStack>
        </Container>

        {/* Main Content */}
        <Container maxW="container.xl" pb={{ base: 16, md: 20, lg: 24 }}>
          <Box maxW="4xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
            
            {/* Introduction */}
            <VStack spacing={{ base: 6, md: 8 }} align="start" mb={{ base: 12, md: 16 }}>
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                In addition to this Privacy Policy, we provide data and privacy information embedded in our products and certain features that request your personal data. This product-specific information is marked with our Data & Privacy Icon.
              </Text>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                You will have the opportunity to review this product-specific information before using these features. You can also access this information at any time, either in Settings related to those features and/or online at hushh.ai/legal/privacy/data.
              </Text>
            </VStack>

            {/* What Is Personal Data Section */}
            <VStack spacing={{ base: 6, md: 8 }} align="start" mb={{ base: 12, md: 16 }}>
              <Heading
                as="h2"
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
              >
                What Is Personal Data at Hushh?
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                At Hushh, we believe in fundamental privacy rights that should remain consistent regardless of geographical location. We regard any data that identifies or can identify an individual directly or is linked to them by Hushh as "personal data," irrespective of the individual's location.
              </Text>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                This encompasses data that directly identifies you, like your name, as well as data that might not directly identify you but can reasonably be used to do so, such as your device's serial number.
              </Text>
            </VStack>

            {/* Your Privacy Rights Section */}
            <VStack spacing={{ base: 6, md: 8 }} align="start" mb={{ base: 12, md: 16 }}>
              <Heading
                as="h2"
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
              >
                Your Privacy Rights at Hushh
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                Hushh respects your rights to know, access, correct, transfer, restrict the processing of, and delete your personal data. We extend these rights globally to our customers, and exercising these rights will not result in discriminatory treatment or a diminished level of service from Hushh.
              </Text>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#0071E3"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="500"
              >
                You also have the right to withdraw your consent at any time where consent is the basis of processing your personal data by Hushh.
              </Text>
            </VStack>

            {/* Data Collection Section */}
            <VStack spacing={{ base: 6, md: 8 }} align="start" mb={{ base: 12, md: 16 }}>
              <Heading
                as="h2"
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
              >
                Personal Data Hushh Collects from You
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                Believing in the synergy of great products and robust privacy, Hushh aims to collect only the personal data necessary for our services. We may collect various information including:
              </Text>

              {/* Data Types List */}
              <VStack spacing={{ base: 3, md: 4 }} align="start" pl={{ base: 4, md: 6 }}>
                {[
                  "Account Information: Your Hushh ID, account details such as email address, device registrations, account status, and age.",
                  "Device Information: Data that could identify your device like its serial number or information about your device such as browser type.",
                  "Contact Information: Name, email address, physical address, phone number, or other contact details.",
                  "Payment Information: Details about your billing address and payment method, including bank details and card information.",
                  "Transaction Information: Details on purchases of Hushh products or services.",
                  "Usage Data: Information on your interaction with our offerings, including app usage, browsing and search history.",
                  "Location Information: Precise or general location data for services like Find My or region-specific services.",
                  "Health and Fitness Information: Data on your health and fitness where you opt to share with us."
                ].map((item, index) => (
                  <Box key={index} display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="black"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      {item}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>

            {/* How We Use Data Section */}
            <VStack spacing={{ base: 6, md: 8 }} align="start" mb={{ base: 12, md: 16 }}>
              <Heading
                as="h2"
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
              >
                How We Use Your Information
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                Hushh uses personal data to power our services, process transactions, communicate, enhance security and fraud prevention, and comply with legal requirements. This includes:
              </Text>

              <VStack spacing={{ base: 3, md: 4 }} align="start" pl={{ base: 4, md: 6 }}>
                {[
                  "To Operate Our Services: Necessary personal data collection enables us to provide our services, including for improvement, auditing, and troubleshooting purposes.",
                  "Transaction Processing: Personal data like your name and payment details are essential for processing transactions.",
                  "Communication: We use your personal data to communicate about transactions, accounts, and provide relevant information.",
                  "Security and Fraud Prevention: To protect you, Hushh, and our user base, we employ your data for loss prevention and fraud detection.",
                  "Personalization: With your permission, we personalize services and communications based on collected data.",
                  "Legal Compliance: Personal data is used to meet legal obligations, including tax, reporting, and governmental request compliance."
                ].map((item, index) => (
                  <Box key={index} display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="black"
                      borderRadius="50%"
                      mt="10px"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                      color="#1d1d1d"
                      fontFamily="Inter, sans-serif"
                      lineHeight={1.6}
                      letterSpacing="-0.01em"
                      fontWeight="400"
                    >
                      {item}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>

            {/* Contact Section */}
            <VStack spacing={{ base: 6, md: 8 }} align="start" mb={{ base: 12, md: 16 }}>
              <Heading
                as="h2"
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                fontWeight="bold"
                color="black"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
                lineHeight={1.2}
              >
                Contact Us
              </Heading>
              
              <Text
                fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                color="#1d1d1d"
                fontFamily="Inter, sans-serif"
                lineHeight={1.6}
                letterSpacing="-0.01em"
                fontWeight="400"
              >
                If you have questions or concerns about our Privacy Policy or data practices, please contact us at:
              </Text>

              <VStack spacing={{ base: 2, md: 3 }} align="start" pl={{ base: 4, md: 6 }}>
                <Text
                  fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  color="#0071E3"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="500"
                >
                  Email: privacy@hushh.ai
                </Text>
                <Text
                  fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  color="#1d1d1d"
                  fontFamily="Inter, sans-serif"
                  lineHeight={1.6}
                  letterSpacing="-0.01em"
                  fontWeight="400"
                >
                  1021 5th St W, Kirkland, WA 98033, United States of America (USA)
                </Text>
              </VStack>
            </VStack>

          </Box>
        </Container>
      </ContentWrapper>
    </Box>
    <ContactForm />
    </>
  );
};

export default PrivacyPolicy;
         