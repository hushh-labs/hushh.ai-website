"use client";
import {
  VStack,
  Text,
  Box,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  GridItem,
  Heading,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import linkedln from "../svg/icons/linkedIn.svg";
import Image from "next/image";
import LinkedinIcon from "../svg/icons/linkedinIcon.svg";
import Link from "next/link";
import { teamImages } from "./teamImages";
import { useState } from "react";
import { advisorsData } from "../advisorsBioData/advisorsData";
import locationIcon from "../svg/icons/locationIcon.svg";
import jobIcon from "../svg/icons/jobIcon.svg";
import { useMediaQuery } from "react-responsive";

const TeamSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 769 });

  const openModal = (advisor) => {
    setSelectedAdvisor(advisor);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAdvisor(null);
    setIsOpen(false);
  };

  return (
    <>
      <Box w="full" py={{ base: 16, md: 20, lg: 24 }}>
        
        {/* Founders Section */}
        <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="6xl" mx="auto">
          
          {/* Section Header */}
          <VStack spacing={{ base: 6, md: 8 }} align="center">
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight="600"
              textAlign="center"
              color="#666"
              letterSpacing="0.08em"
              textTransform="uppercase"
              fontFamily="Inter, sans-serif"
            >
              Meet the Founders
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
              Our Team Leaders
            </Heading>
            
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              color="#1d1d1d"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
              maxW="500px"
            >
              Leadership isn't a title, it's an action. Thank you for leading by example.
            </Text>
          </VStack>

          {/* Founders Grid */}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={{ base: 8, md: 12, lg: 16 }}
            maxW="5xl"
            w="full"
          >
            {/* Manish Sainani */}
            <VStack spacing={6}>
              <Box
                borderRadius="20px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                bg="white"
                p={3}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Image
                  alt="Manish Sainani"
                  src={teamImages.Manish}
                  width={260}
                  height={276}
                  style={{ borderRadius: '16px' }}
                />
              </Box>
              
              <VStack spacing={3} textAlign="center">
                <Heading
                  as="h3"
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="bold"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.02em"
                >
                  Manish Sainani
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  Founder and CEO
                </Text>
                <Link href="https://www.linkedin.com/in/manishsainani/">
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="50%"
                    bg="#0071E3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: "#0056B3",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Image
                      alt="LinkedIn"
                      src={linkedln}
                      width={20}
                      height={20}
                    />
                  </Box>
                </Link>
              </VStack>
            </VStack>

            {/* Justin Donaldson */}
            <VStack spacing={6}>
              <Box
                borderRadius="20px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                bg="white"
                p={3}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Image
                  alt="Justin Donaldson"
                  src={teamImages.Justin}
                  width={260}
                  height={276}
                  style={{ borderRadius: '16px' }}
                />
              </Box>
              
              <VStack spacing={3} textAlign="center">
                <Heading
                  as="h3"
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="bold"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.02em"
                >
                  Justin Donaldson
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  Co-founder and Chief Data Scientist
                </Text>
                <Link href="https://www.linkedin.com/in/jjustindonaldson/">
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="50%"
                    bg="#0071E3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: "#0056B3",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Image
                      alt="LinkedIn"
                      src={linkedln}
                      width={20}
                      height={20}
                    />
                  </Box>
                </Link>
              </VStack>
            </VStack>
          </Grid>


        </VStack>

        {/* Team Section */}
        <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="6xl" mx="auto" mt={{ base: 20, md: 24, lg: 32 }}>
          
          {/* Section Header */}
          <VStack spacing={{ base: 6, md: 8 }} align="center">
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight="600"
              textAlign="center"
              color="#666"
              letterSpacing="0.08em"
              textTransform="uppercase"
              fontFamily="Inter, sans-serif"
            >
              The Team
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
              Our Team
            </Heading>
            
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              color="#1d1d1d"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
              maxW="600px"
            >
              The Hushh team: Disrupting the status quo, one line of code at a time
            </Text>
          </VStack>

          {/* Team Grid */}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={{ base: 8, md: 10, lg: 8 }}
            w="full"
          >
        {/* Neelesh Meena */}
        <VStack spacing={4}>
              <Box
                borderRadius="16px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                bg="white"
                p={2}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Image
                  alt="Neelesh Meena"
                  src={teamImages.NeeleshMeena}
                  width={260}
                  height={276}
                  style={{ borderRadius: '12px' }}
                />
              </Box>
              
              <VStack spacing={2} textAlign="center">
                <Heading
                  as="h4"
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Neelesh Meena
                </Heading>
                <Text
                  fontSize={{ base: "14px", md: "15px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  Software Engineer - Full Stack
                </Text>
                <Link href="https://www.linkedin.com/in/neelesh-meena-73b07b1a0/">
                  <Box
                    w="32px"
                    h="32px"
                    borderRadius="50%"
                    bg="#0071E3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: "#0056B3",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Image
                      alt="LinkedIn"
                      src={linkedln}
                      width={16}
                      height={16}
                    />
                  </Box>
                </Link>
              </VStack>
            </VStack>

            {/* Ankit Kumar Singh */}
            <VStack spacing={4}>
              <Box
                borderRadius="16px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                bg="white"
                p={2}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Image
                  alt="Ankit Kumar Singh"
                  src={teamImages.AnkitKumarSingh}
                  width={260}
                  height={276}
                  style={{ borderRadius: '12px' }}
                />
              </Box>
              
              <VStack spacing={2} textAlign="center">
                <Heading
                  as="h4"
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Ankit Kumar Singh
                </Heading>
                <Text
                  fontSize={{ base: "14px", md: "15px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  Customer Engineer - Full Stack
                </Text>
                <Link href="https://www.linkedin.com/in/ankit-kumar-singh-69305a22a/">
                  <Box
                    w="32px"
                    h="32px"
                    borderRadius="50%"
                    bg="#0071E3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: "#0056B3",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Image
                      alt="LinkedIn"
                      src={linkedln}
                      width={16}
                      height={16}
                    />
                  </Box>
                </Link>
              </VStack>
            </VStack>

            {/* Adil Khan */}
            <VStack spacing={4}>
              <Box
                borderRadius="16px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                bg="white"
                p={2}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Image
                  alt="Adil Khan"
                  src={teamImages.YashMakan}
                  width={260}
                  height={276}
                  style={{ borderRadius: '12px' }}
                />
              </Box>
              
              <VStack spacing={2} textAlign="center">
                <Heading
                  as="h4"
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Adil Khan
                </Heading>
                <Text
                  fontSize={{ base: "14px", md: "15px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  UI/UX Designer
                </Text>
                <Link href="https://www.linkedin.com/in/adil-k/">
                  <Box
                    w="32px"
                    h="32px"
                    borderRadius="50%"
                    bg="#0071E3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: "#0056B3",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Image
                      alt="LinkedIn"
                      src={linkedln}
                      width={16}
                      height={16}
                    />
                  </Box>
                </Link>
              </VStack>
            </VStack>
 {/* Adil Khan */}
 <VStack spacing={4}>
              <Box
                borderRadius="16px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                bg="white"
                p={2}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                }}
                transition="all 0.3s ease"
              >
                <Image
                    alt="Sani Patel"
                    src={teamImages.SatyamArora}
                  width={260}
                  height={276}
                  style={{ borderRadius: '12px' }}
                />
              </Box>
              
              <VStack spacing={2} textAlign="center">
                <Heading
                  as="h4"
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight="600"
                  color="black"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.01em"
                >
                 Sani Patel
                </Heading>
                <Text
                  fontSize={{ base: "14px", md: "15px" }}
                  color="#666"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  Software Engineer - Full Stack
                </Text>
              </VStack>
            </VStack>
            
          </Grid>

        </VStack>

        {/* Advisors Section */}
        <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="6xl" mx="auto" mt={{ base: 20, md: 24, lg: 32 }}>
          
          {/* Section Header */}
          <VStack spacing={{ base: 6, md: 8 }} align="center">
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight="600"
              textAlign="center"
              color="#666"
              letterSpacing="0.08em"
              textTransform="uppercase"
              fontFamily="Inter, sans-serif"
            >
              Meet Our Advisors
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
              Wisdom in Action
            </Heading>
            
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              color="#1d1d1d"
              fontFamily="Inter, sans-serif"
              lineHeight={1.6}
              letterSpacing="-0.01em"
              fontWeight="400"
              textAlign="center"
              maxW="500px"
            >
              Hushh Advisors: Leading with expertise, shaping tomorrow's decisions today
            </Text>
          </VStack>

          {/* Advisors Grid */}
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)"
            }}
            gap={{ base: 4, md: 6, lg: 8 }}
            w="full"
          >
            {advisorsData.map((advisor, index) => (
              <GridItem
                key={index}
                colSpan={{
                  base: 1,
                  md: (index < 2 || index >= advisorsData.length - 2) ? 2 : 1
                }}
              >
                <VStack spacing={4}>
                  <Box
                    borderRadius="16px"
                    overflow="hidden"
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                    bg="white"
                    p={2}
                    cursor="pointer"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
                    }}
                    transition="all 0.3s ease"
                    onClick={() => openModal(advisor)}
                  >
                    <Image
                      alt={advisor.name}
                      src={advisor.avatar}
                      width={260}
                      height={276}
                      style={{ borderRadius: '12px' }}
                    />
                  </Box>
                  
                  <VStack spacing={2} textAlign="center">
                    <Heading
                      as="h4"
                      fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                      fontWeight="600"
                      color="black"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-0.01em"
                    >
                      {advisor.name}
                    </Heading>
                    <Text
                      fontSize={{ base: "12px", md: "14px", lg: "15px" }}
                      color="#666"
                      fontFamily="Inter, sans-serif"
                      fontWeight="400"
                      textAlign="center"
                    >
                      {advisor.position}
                    </Text>
                    <HStack spacing={3} justify="center">
                      <Link href={advisor.linkedin}>
                        <Box
                          w="28px"
                          h="28px"
                          borderRadius="50%"
                          bg="#0071E3"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          _hover={{
                            bg: "#0056B3",
                            transform: "translateY(-2px)"
                          }}
                          transition="all 0.3s ease"
                        >
                          <Image
                            alt="LinkedIn"
                            src={linkedln}
                            width={14}
                            height={14}
                          />
                        </Box>
                      </Link>
                      <Button
                        size="sm"
                        bg="#0071E3"
                        color="white"
                        borderRadius="full"
                        fontSize={{ base: "10px", md: "12px" }}
                        fontWeight="500"
                        px={4}
                        py={2}
                        h="auto"
                        _hover={{
                          bg: "#0056B3",
                          transform: "translateY(-1px)"
                        }}
                        transition="all 0.3s ease"
                        onClick={() => openModal(advisor)}
                      >
                        Know More
                      </Button>
                    </HStack>
                  </VStack>
                </VStack>
              </GridItem>
            ))}
          </Grid>

        </VStack>

      </Box>

      {/* Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          minW={{ md: "30rem", base: "90vw" }}
          maxW={{ base: "90vw", md: "35rem" }}
          borderRadius="2rem"
          p={{ md: "1rem", base: "1rem" }}
          bg="white"
          mx={{ base: 4, md: 0 }}
          my={{ base: 4, md: 0 }}
        >
          {selectedAdvisor && (
            <>
              <ModalCloseButton />
              <ModalBody bg="transparent">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src={selectedAdvisor.imageSrc}
                    alt={selectedAdvisor.name}
                    style={{
                      width: isTabletOrMobile ? "100px" : "200px",
                      height: isTabletOrMobile ? "100px" : "200px",
                      borderRadius: "50%"
                    }}
                  />
                </Box>
                <HStack
                  spacing={4}
                  my={{ md: "0.75rem", base: "0.5rem" }}
                  justify="center"
                  align="center"
                >
                  <Heading
                    as="h3"
                    fontSize={{ md: "2rem", base: "1rem" }}
                    color="black"
                    fontFamily="Inter, sans-serif"
                  >
                    {selectedAdvisor.name}
                  </Heading>
                  <Link href={selectedAdvisor.linkedin} target="_blank">
                    <Box
                      w={{ base: "20px", md: "28px" }}
                      h={{ base: "20px", md: "28px" }}
                      borderRadius="50%"
                      bg="#0071E3"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{
                        bg: "#0056B3"
                      }}
                    >
                      <Image
                        alt="linkedin"
                        src={LinkedinIcon}
                        width={isTabletOrMobile ? 12 : 16}
                        height={isTabletOrMobile ? 12 : 16}
                      />
                    </Box>
                  </Link>
                </HStack>
                <VStack spacing={3} align="flex-start">
                  <HStack spacing={2}>
                    <Text
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      color="black"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                    >
                      🤫 Role at Hushh:
                    </Text>
                    <Text
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      color="#666"
                      fontFamily="Inter, sans-serif"
                    >
                      {selectedAdvisor.position}
                    </Text>
                  </HStack>
                  <HStack spacing={2} align="flex-start">
                    <Image
                      src={jobIcon}
                      alt="jobIcon"
                      style={{ marginTop: "2px" }}
                    />
                    <Text
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      color="black"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                    >
                      Working:
                    </Text>
                    <Text
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      color="#666"
                      fontFamily="Inter, sans-serif"
                    >
                      {selectedAdvisor.currentWork}
                    </Text>
                  </HStack>
                  <HStack spacing={2} align="flex-start">
                    <Image
                      src={locationIcon}
                      alt="locationIcon"
                      style={{ marginTop: "2px" }}
                    />
                    <Text
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      color="black"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                    >
                      Locality:
                    </Text>
                    <Text
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      color="#666"
                      fontFamily="Inter, sans-serif"
                    >
                      {selectedAdvisor.currentLocation}
                    </Text>
                  </HStack>
                </VStack>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeamSection;
