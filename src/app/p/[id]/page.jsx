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
    Image,
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
import { UserProfileService } from "../../services/userProfileService";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const PublicProfilePage = () => {
    const params = useParams();
    const router = useRouter();
    const toast = useToast();
    const profileId = params?.id; // Can be hushh_id or user_id

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!profileId) return;

            try {
                setIsLoading(true);
                console.log(`🔍 Fetching public profile for: ${profileId}`);
                const data = await UserProfileService.getUserProfile(profileId);

                if (data) {
                    setUserData(data);
                } else {
                    // Fallback to API if service fails or table is empty locally
                    // But for now, we assume the table is populated as per our plan
                    console.warn("Profile not found in Supabase via Service");
                }
            } catch (err) {
                console.error("Error loading profile:", err);
                toast({
                    title: "Error",
                    description: "Could not load user profile.",
                    status: "error"
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [profileId]);

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
                <Text mb={8} color="gray.400">The user you are looking for does not exist or is private.</Text>
                <Button
                    leftIcon={<FiArrowLeft />}
                    onClick={() => router.push('/')}
                    variant="outline"
                    colorScheme="whiteAlpha"
                    color="white"
                >
                    Go Home
                </Button>
            </Box>
        );
    }

    return (
        <Box minH="100vh" bg="black" color="white" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
            <Container maxW="5xl">
                <Button
                    leftIcon={<FiArrowLeft />}
                    variant="ghost"
                    color="gray.400"
                    mb={6}
                    onClick={() => router.push('/')}
                    _hover={{ color: "white", bg: "whiteAlpha.200" }}
                >
                    Back to Home
                </Button>

                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header Card */}
                    <Card
                        bg="#1B1B1B" // Dark card background
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="2xl"
                        p={{ base: 6, md: 10 }}
                        mb={8}
                        overflow="hidden"
                        position="relative"
                    >
                        {/* Decorative background blur */}
                        <Box
                            position="absolute" top="-50%" left="-20%" width="140%" height="200%"
                            bgGradient="radial(circle at 50% 50%, rgba(187, 98, 252, 0.1) 0%, transparent 60%)"
                            zIndex={0} pointerEvents="none"
                        />

                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            align={{ base: 'center', md: 'start' }}
                            justify="space-between"
                            gap={8}
                            position="relative" zIndex={1}
                        >
                            <HStack spacing={6} align={{ base: 'center', md: 'start' }} flexDir={{ base: 'column', md: 'row' }}>
                                <Avatar
                                    size="2xl"
                                    name={userData.full_name || 'User'}
                                    src={userData.avatar_url} // If we have one, otherwise default
                                    bgGradient="linear(to-br, #0071E3, #BB62FC)"
                                    border="4px solid #1B1B1B"
                                    showBorder={true}
                                />

                                <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                                    <Heading size="xl" fontFamily="Inter, sans-serif" fontWeight="700">
                                        {userData.full_name}
                                    </Heading>
                                    <Text color="gray.400" fontSize="lg">
                                        {userData.occupation || 'Hushh Member'}
                                    </Text>

                                    <HStack mt={2} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                                        {userData.city && userData.country && (
                                            <Badge variant="subtle" colorScheme="purple" px={2} py={1} borderRadius="md">
                                                <Icon as={FiMapPin} mr={1} /> {userData.city}, {userData.country}
                                            </Badge>
                                        )}
                                        <Badge variant="subtle" colorScheme="blue" px={2} py={1} borderRadius="md">
                                            <Icon as={FiShield} mr={1} /> {userData.hushh_id}
                                        </Badge>
                                    </HStack>
                                </VStack>
                            </HStack>

                            <Button
                                leftIcon={<FiShare2 />}
                                onClick={handleShare}
                                bg="white" color="black"
                                _hover={{ bg: "gray.200" }}
                                borderRadius="full"
                                px={6}
                            >
                                Share
                            </Button>
                        </Flex>
                    </Card>

                    {/* Details Grid */}
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>

                        {/* About / Bio Card */}
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                            <Card bg="#1B1B1B" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl">
                                <CardBody>
                                    <Heading size="md" mb={4} color="gray.200">About</Heading>
                                    <Text color="gray.400">
                                        {userData.reason_for_using_hushh || userData.bio || "No bio available."}
                                    </Text>
                                </CardBody>
                            </Card>
                        </GridItem>

                        {/* Interests */}
                        <GridItem>
                            <Card bg="#1B1B1B" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl" h="full">
                                <CardBody>
                                    <Heading size="md" mb={4} color="gray.200">Interests</Heading>
                                    <Flex wrap="wrap" gap={2}>
                                        {/* Check bool flags or standard fields */}
                                        {userData.tech_affinity && <Badge colorScheme="cyan">Tech: {userData.tech_affinity}</Badge>}
                                        {userData.fitness_routine && <Badge colorScheme="green">{userData.fitness_routine}</Badge>}
                                        {userData.gamer && <Badge colorScheme="purple">Gamer</Badge>}
                                        {userData.eco_friendly && <Badge colorScheme="green">Eco-Friendly</Badge>}
                                        {userData.favorite_cuisine && <Badge colorScheme="orange">{userData.favorite_cuisine}</Badge>}
                                        {userData.fashion_style && <Badge colorScheme="pink">{userData.fashion_style}</Badge>}
                                    </Flex>
                                    {/* Fallback if empty */}
                                    {(!userData.tech_affinity && !userData.fitness_routine && !userData.gamer) && (
                                        <Text color="gray.500" fontSize="sm">No public interests shared.</Text>
                                    )}
                                </CardBody>
                            </Card>
                        </GridItem>

                        {/* Professional / Status */}
                        <GridItem>
                            <Card bg="#1B1B1B" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl" h="full">
                                <CardBody>
                                    <Heading size="md" mb={4} color="gray.200">Details</Heading>
                                    <VStack align="start" spacing={3}>
                                        {userData.education_level && (
                                            <HStack>
                                                <Text color="gray.500" w="100px">Education</Text>
                                                <Text color="gray.300">{userData.education_level}</Text>
                                            </HStack>
                                        )}
                                        {userData.industry && (
                                            <HStack>
                                                <Text color="gray.500" w="100px">Industry</Text>
                                                <Text color="gray.300">{userData.industry}</Text>
                                            </HStack>
                                        )}
                                        {userData.primary_transport && (
                                            <HStack>
                                                <Text color="gray.500" w="100px">Transport</Text>
                                                <Text color="gray.300">{userData.primary_transport}</Text>
                                            </HStack>
                                        )}
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
