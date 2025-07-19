'use client'
import {
    Box,
    VStack,
    Text,
    Heading,
    Divider,
    Link,
    UnorderedList,
    ListItem,
    Stack,
  } from "@chakra-ui/react";
import { useState } from "react";  
import FooterComponent from "../features/FooterComponent";
import ContentWrapper from "../layout/ContentWrapper";
// import Header from "../_components/header";


  
  const HushhPress = () => {
    return (
        <>
        
        <ContentWrapper includeHeaderSpacing={true}>

      <Box
        bg="black"
        color="white"
        py={{ base: 20, md: 24 }}
        px={{ base: 6, md: 24 }}
        fontFamily="Figtree, sans-serif"
        lineHeight="1.8"
      >
        <VStack spacing={{ base: 8, md: 12 }} align="start" w="full">
          
          {/* Press Release Section */}
          <VStack spacing={6} align="start" w="full">
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.400" textAlign="center" w="full">
              July 18, 2025
            </Text>
            
            <Text fontSize={{ base: "sm", md: "md" }} color="blue.400" fontWeight="bold" textAlign="center" w="full">
              FOR IMMEDIATE RELEASE
            </Text>
            
            <Heading
              fontSize={{ base: "xl", md: "3xl" }}
              textAlign="center"
              w="full"
              as={'h1'}
              lineHeight="1.4"
            >
              Hushh.ai Secures $5 Million Strategic Investment from hushhTech.com's Evergreen Renaissance AI Fund
            </Heading>
            
            <VStack spacing={4} align="start" w="full">
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                Kirkland, WA — July 18, 2025 —
              </Text>
              
              <Text fontSize={{ base: "md", md: "lg" }}>
                Hushh.ai, a consent-first infrastructure platform for personal data agents, today announced it has been fully operationally funded with a $5 million strategic investment from its founding investment partner, hushhTech.com's Flagship Fund A — The Evergreen Renaissance AI Fund.
              </Text>
              
              <Text fontSize={{ base: "md", md: "lg" }}>
                This milestone marks the official operational launch of hushh.ai, empowering the company to accelerate development of its core technology platform that helps users manage, protect, and monetize their personal data through intelligent agents built on open standards.
              </Text>
              
              <Text fontSize={{ base: "md", md: "lg" }}>
                The Evergreen Renaissance AI Fund, a multi-strategy, multi-asset hedge fund, was established to fuel breakthrough innovation at the intersection of data ownership, artificial intelligence, and privacy-first infrastructure. Its investment in hushh.ai represents a long-term commitment to building the foundational infrastructure for a consent-driven, agentic AI economy.
              </Text>
              
              <Text fontSize={{ base: "md", md: "lg" }} fontStyle="italic" borderLeft="3px solid" borderColor="blue.400" pl={4}>
                "This is not just capital—it's conviction," said Manish Sainani, Founder & CEO of hushh.ai. "We're honored to have our own strategic fund backing us with patient, aligned capital to bring our vision to life. With this investment, we're laying the rails for a world where every person can deploy intelligent agents on their behalf—with their data, their rules, and their upside."
              </Text>
              
              <Text fontSize={{ base: "md", md: "lg" }}>
                The $5 million injection ensures hushh.ai is fully capitalized to deliver its roadmap with excellence, frugality, and scale. The company is focused on bringing to market its suite of agentic products and protocols—including Hushh Agent, Grid, Vault, Flow, and Link—designed to power the next generation of AI-driven, user-controlled applications across devices and platforms.
              </Text>
              
              <Text fontSize={{ base: "md", md: "lg" }}>
                The announcement comes as hushh.ai begins onboarding early strategic partners and developers for its Agent Builder Program ahead of a public launch later this year.
              </Text>
              
              <VStack spacing={4} align="start" w="full" mt={6}>
                <Heading fontSize={{ base: "lg", md: "xl" }} color="blue.400">
                  About Hushh.ai
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }}>
                  Hushh.ai is building the foundational infrastructure for trusted, consent-first personal data agents. By combining secure personal data lakes, lightweight edge AI, and open-source consent protocols, Hushh gives every human the ability to deploy intelligent agents that work entirely on their behalf—across life, work, and commerce. Headquartered in Kirkland, WA, hushh.ai operates as a wholly owned initiative of HushOne, Inc.
                </Text>
              </VStack>
              
              <VStack spacing={4} align="start" w="full">
                <Heading fontSize={{ base: "lg", md: "xl" }} color="blue.400">
                  About the Evergreen Renaissance AI Fund
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }}>
                  Fund A — the Evergreen Renaissance AI Fund — is a multi-strategy, multi-asset fund designed to invest in enduring, alpha-generating businesses with differentiated technology, deep free cash flow, and long-term impact potential. Operated by hushhTech.com, the fund blends principles of quantitative precision, long-term value investing, and consent-first innovation to create sustainable, compounding value for its limited partners.
                </Text>
              </VStack>
              
              <VStack spacing={2} align="start" w="full" mt={6}>
                <Heading fontSize={{ base: "lg", md: "xl" }} color="blue.400">
                  Press Contact
                </Heading>
                <Link href="mailto:press@hushh.ai" color="blue.400" fontSize={{ base: "md", md: "lg" }}>
                  press@hushh.ai
                </Link>
                <Link href="https://www.hushh.ai" color="blue.400" fontSize={{ base: "md", md: "lg" }} isExternal>
                  https://www.hushh.ai
                </Link>
              </VStack>
            </VStack>
          </VStack>
          
          <Divider borderColor="gray.600" my={8} />
          
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            textAlign="center"
            w="full"
            as={'h2'}
          >
            Welcome to Hushh: Your Data. Your Business.
          </Heading>
  
          {/* Mission Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Mission</Heading>
            <Text fontSize={{ base: "md", md: "lg" }} as={'h3'}>
              At Hushh, we believe your data is one of your most valuable assets.
              In a world where personal information is often exploited without
              consent, we empower individuals to take back control, transform
              their data into real wealth, and decide how and with whom they share
              it.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Hushh is more than a platform—it's a movement to redefine how the
              world views and uses personal data.
            </Text>
          </VStack>
  
          {/* Vision Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Vision</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              To create a better, more human-centered world where technology and
              data work for you—not the other way around. By combining
              privacy-first innovation, luxury experiences, and financial
              empowerment, we're building a future where your life, your time,
              and your data are truly yours.
            </Text>
          </VStack>
  
          {/* Core Values Section */}
          
<VStack spacing={4} align="start">
  <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Core Values</Heading>
  <UnorderedList fontSize={{ base: "md", md: "lg" }} spacing={3}>
    <ListItem>
      <b>Customers Come First:</b> Every decision we make is guided by
      the people we serve: our users. We work backward from your needs
      to ensure every interaction with Hushh is effortless, rewarding,
      and trustworthy.
    </ListItem>
    <ListItem>
      <b>Simplicity is Everything:</b> Inspired by the timeless wisdom
      of Steve Jobs, we believe simplicity is the ultimate
      sophistication. Hushh is designed to be intuitive, elegant, and
      easy to use—so you can focus on what matters most in your life.
    </ListItem>
    <ListItem>
      <b>Privacy is Non-Negotiable:</b> We are committed to
      privacy-first technology. Your data belongs to you. Every action
      is governed by your consent. We use end-to-end encryption and
      on-device processing to protect your information at every step.
    </ListItem>
    <ListItem>
      <b>Turning Data into Wealth:</b> Inspired by Warren Buffett's
      value-driven principles, Hushh transforms your personal data into
      tangible financial rewards.
    </ListItem>
  </UnorderedList>
  <Link href="/hushh-core-values" color="blue.400" fontSize={{ base: "md", md: "lg" }}>
    Learn more about Hushh's core values
  </Link>
</VStack>

  
          {/* What We Offer Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>What We Offer</Heading>
            <Stack spacing={4}>
              <Text fontSize={{ base: "md", md: "lg" }}>
                <b>Control Over Your Data:</b> View your personal data in a clear,
                organized dashboard. Decide which businesses or brands can access
                your data.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>
                <b>Monetization Made Simple:</b> Earn in USD (via USDC), Euros, or
                Bitcoin. See real-time earnings from shared data streams. Get
                exclusive offers tailored to your preferences.
              </Text>
            </Stack>
          </VStack>
  
          {/* Why Hushh Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Why Hushh?</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              We're creating a better digital economy that respects privacy,
              enables financial inclusion, and bridges gaps between technology,
              people, and opportunity.
            </Text>
          </VStack>
  
          {/* Invitation Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Invitation</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              We're just getting started, and we invite you to join us in shaping
              the future of personal data empowerment. Whether you're a user, a
              creator, or a business, Hushh is here to unlock new opportunities
              for you.
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
              Your Life. Your Time. Your Data. Your Business.
            </Text>
          </VStack>
  
          {/* Media Contact Section */}
          <VStack spacing={4} align="start">
            {/* <Heading fontSize={{ base: "xl", md: "2xl" }}>Media Contact</Heading> */}
            {/* <Text fontSize={{ base: "md", md: "lg" }}>
              Email: press@hushh.ai
            </Text> */}
            {/* <Text fontSize={{ base: "md", md: "lg" }}>
              Phone: +14252969050 
            </Text> */}
            <Link
              href="https://www.hushh.ai"
              fontSize={{ base: "md", md: "lg" }}
              color="blue.400"
              isExternal
            >
              Visit hushh.ai
            </Link>
            {/* <Link
              href="https://www.hushh.ai"
              fontSize={{ base: "md", md: "lg" }}
              color="blue.400"
              isExternal
            >
              Visit hushh.ai
            </Link> */}
          </VStack>
        </VStack>
      </Box>
      </ContentWrapper>
      <FooterComponent/>
      </>
    );
  };
  
  export default HushhPress;
  