"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Container,
    VStack,
    HStack,
    Heading,
    Text,
    Button,
    Spinner,
    Grid,
    GridItem,
    Card,
    CardBody,
    Flex,
    Icon,
    Badge,
    Avatar,
    useToast,
} from "@chakra-ui/react";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiShield,
    FiArrowLeft,
    FiShare2
} from "react-icons/fi";
import { motion } from "framer-motion";
import { UserProfileService } from "../../../services/userProfileService";

const MotionBox = motion(Box);

const PublicProfilePage = () => {
    const params = useParams();
    const router = useRouter();
    const toast = useToast();
    const userId = params?.id;

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) return;

            try {
                setIsLoading(true);
                console.log(`🔍 Fetching public profile for UUID: ${userId}`);
                const data = await UserProfileService.getUserProfile(userId);

                if (data) {
                    setUserData(data);
                } else {
                    console.warn("Profile not found");
                }
            } catch (err) {
                console.error("Error loading profile:", err);
                toast({ title: "Error", description: "Could not load user profile.", status: "error" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Hushh Profile: ${userData?.full_name}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({ title: "Link copied!", status: "success" });
        }
    };

    if (isLoading) {
        return (
            <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center">
                <Spinner size="xl" color="white" />
            </Box>
        );
    }

    if (!userData) {
        return (
            <Box minH="100vh" bg="black" color="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Heading mb={4}>Profile Not Found</Heading>
                <Text mb={8} color="gray.400">The user you are looking for does not exist.</Text>
                <Button leftIcon={<FiArrowLeft />} onClick={() => router.push('/')} variant="outline" colorScheme="whiteAlpha" color="white">
                    Go Home
                </Button>
            </Box>
        );
    }

    return (
        <Box minH="100vh" bg="black" color="white" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
            <Container maxW="5xl">
                <Button leftIcon={<FiArrowLeft />} variant="ghost" color="gray.400" mb={6} onClick={() => router.push('/')} _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                    Back to Home
                </Button>

                <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card bg="#1B1B1B" border="1px solid rgba(255,255,255,0.1)" borderRadius="2xl" p={{ base: 6, md: 10 }} mb={8} position="relative" overflow="hidden">
                        <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'center', md: 'start' }} justify="space-between" gap={8}>
                            <HStack spacing={6} align={{ base: 'center', md: 'start' }} flexDir={{ base: 'column', md: 'row' }}>
                                <Avatar size="2xl" name={userData.full_name} src={userData.avatar_url} bgGradient="linear(to-br, #0071E3, #BB62FC)" border="4px solid #1B1B1B" />
                                <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                                    <Heading size="xl" fontWeight="700">{userData.full_name}</Heading>
                                    <Text color="gray.400" fontSize="lg">{userData.occupation || 'Hushh Member'}</Text>
                                    <HStack mt={2} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                                        {userData.city && <Badge colorScheme="purple"><Icon as={FiMapPin} mr={1} /> {userData.city}</Badge>}
                                        <Badge colorScheme="blue"><Icon as={FiShield} mr={1} /> {userData.user_id}</Badge>
                                    </HStack>
                                </VStack>
                            </HStack>
                            <Button leftIcon={<FiShare2 />} onClick={handleShare} bg="white" color="black" borderRadius="full">Share</Button>
                        </Flex>
                    </Card>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                            <Card bg="#1B1B1B" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl">
                                <CardBody>
                                    <Heading size="md" mb={4} color="gray.200">About</Heading>
                                    <Text color="gray.400">{userData.bio || "Member of Hushh Intelligence Portal."}</Text>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card bg="#1B1B1B" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl">
                                <CardBody>
                                    <Heading size="md" mb={4} color="gray.200">Contact & Info</Heading>
                                    <VStack align="start" spacing={3}>
                                        {userData.email && <HStack><Icon as={FiMail} color="gray.500" /><Text color="gray.300">{userData.email}</Text></HStack>}
                                        {userData.phone && <HStack><Icon as={FiPhone} color="gray.500" /><Text color="gray.300">{userData.phone}</Text></HStack>}
                                        <HStack><Text color="gray.500">Hushh ID:</Text><Text color="gray.300">{userData.hushh_id}</Text></HStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                </MotionBox>
            </Container>
        </Box>
    );
};

export default PublicProfilePage;
