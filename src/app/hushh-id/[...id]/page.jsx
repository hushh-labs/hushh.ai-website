"use client";
import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    VStack,
    Heading,
    Text,
    Spinner,
    Avatar,
    SimpleGrid,
    Badge,
    Flex,
    Icon,
    useColorModeValue,
    Divider,
} from "@chakra-ui/react";
import { CheckCircleIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { UserProfileService } from "../../../services/userProfileService";
import ContentWrapper from "../../_components/layout/ContentWrapper";

export default function PublicProfilePage({ params }) {
    // With catch-all route [...id], id will be an array of segments
    const id = Array.isArray(params.id) ? params.id.join('/') : params.id;
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            if (id) {
                const data = await UserProfileService.getUserProfile(id);
                setProfile(data);
            }
            setLoading(false);
        }
        loadProfile();
    }, [id]);

    const bg = useColorModeValue("black", "gray.900");
    const cardBg = useColorModeValue("gray.900", "gray.800");
    const textColor = "white";
    const labelColor = "gray.400";

    if (loading) {
        return (
            <Flex minH="100vh" align="center" justify="center" bg={bg}>
                <Spinner size="xl" color="blue.500" thickness="4px" />
            </Flex>
        );
    }

    if (!profile) {
        return (
            <Flex minH="100vh" align="center" justify="center" bg={bg} direction="column">
                <Heading size="lg" color="gray.500">
                    User Not Found
                </Heading>
                <Text mt={2} color="gray.400">
                    The Hushh ID "{id}" does not match any verified profile.
                </Text>
            </Flex>
        );
    }

    const InfoSection = ({ title, data }) => {
        // Filter out null/empty values for display
        const validData = Object.entries(data).filter(([_, value]) => value !== null && value !== "" && value !== "N/A");

        if (validData.length === 0) return null;

        return (
            <Box w="100%" mb={8}>
                <Heading size="xs" textTransform="uppercase" letterSpacing="widest" color="blue.400" mb={4} borderBottom="1px solid" borderColor="gray.800" pb={2}>
                    {title}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {validData.map(([key, value]) => (
                        <Box key={key} p={4} bg="rgba(255,255,255,0.05)" borderRadius="lg" backdropFilter="blur(5px)">
                            <Text fontSize="xs" color={labelColor} textTransform="uppercase" fontWeight="bold">
                                {key}
                            </Text>
                            <Text fontSize="md" fontWeight="medium" mt={1} color={textColor}>
                                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        );
    };

    // --- MAPPING DATA TO SCHEMA ---

    const basicInfo = {
        "Full Name": profile.full_name,
        "Age": profile.age,
        "Gender": profile.gender,
        "Marital Status": profile.marital_status,
        "Household Size": profile.household_size,
        "Children": profile.children_count,
    };

    const contactLocation = {
        "Email": profile.email,
        "Phone": profile.phone, // Consider masking for public view privacy
        "Address": profile.address_line1,
        "City": profile.city,
        "State": profile.state,
        "Zip": profile.zip,
        "City Tier": profile.city_tier,
    };

    const professionalInfo = {
        "Occupation": profile.occupation,
        "Role": profile.occupation, // Duplicate for emphasis if needed
        "Education": profile.education_level,
        "Income Bracket": profile.income_bracket,
        "Home Ownership": profile.home_ownership,
    };

    const lifestyleInfo = {
        "Diet": profile.diet_preference,
        "Favorite Cuisine": profile.favorite_cuisine,
        "Coffee/Tea": profile.coffee_or_tea,
        "Transport": profile.primary_transport,
        "Fitness Routine": profile.fitness_routine,
        "Gym Member": profile.gym_member,
        "Shopping Preference": profile.shopping_preference,
        "Grocery Store": profile.preferred_grocery_store_type,
        "Fashion Style": profile.fashion_style,
        "Eco Friendly": profile.eco_friendly,
        "Sleep Type": profile.sleep_chronotype,
    };

    const techInfo = {
        "Tech Affinity": profile.tech_affinity,
        "Primary Device": profile.primary_device,
        "Fav Social Platform": profile.favorite_social_platform,
        "Daily Social Usage": profile.daily_social_time_minutes ? `${profile.daily_social_time_minutes} mins` : null,
        "Content Preference": profile.content_preference,
        "Gamer": profile.gamer,
        "Sports Interest": profile.sports_interest,
        "Travel Frequency": profile.travel_frequency,
    };

    // Arrays need special handling
    const desires = {
        "Need 1": profile.need_1,
        "Need 2": profile.need_2,
        "Need 3": profile.need_3,
        "Want 1": profile.want_1,
        "Want 2": profile.want_2,
        "Want 3": profile.want_3,
        "Desire 1": profile.desire_1,
        "Desire 2": profile.desire_2,
        "Desire 3": profile.desire_3,
    };

    const intents = {
        "24h Category": profile.intent_24h_category,
        "24h Budget": profile.intent_24h_budget_usd ? `$${profile.intent_24h_budget_usd}` : null,
        "48h Category": profile.intent_48h_category,
        "48h Budget": profile.intent_48h_budget_usd ? `$${profile.intent_48h_budget_usd}` : null,
        "72h Category": profile.intent_72h_category,
        "72h Budget": profile.intent_72h_budget_usd ? `$${profile.intent_72h_budget_usd}` : null,
    };

    return (
        <ContentWrapper>
            <Box minH="100vh" bg="black" color="white" py={10}>
                <Container maxW="4xl">
                    {/* Header Card */}
                    <Box
                        borderRadius="2xl"
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid rgba(255,255,255,0.1)"
                        p={{ base: 6, md: 10 }}
                        mb={10}
                        textAlign="center"
                        position="relative"
                        overflow="hidden"
                    >
                        <Box position="absolute" top="-50%" left="-50%" w="200%" h="200%" bgGradient="radial(circle at 50% 10%, rgba(12, 140, 233, 0.2), transparent 60%)" zIndex={0} />
                        <Box position="relative" zIndex={1}>
                            <Avatar
                                size="2xl"
                                src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.full_name}&background=0C8CE9&color=fff`}
                                loading="lazy"
                                showBorder
                                borderWidth="4px"
                                borderColor="rgba(255,255,255,0.2)"
                                mb={4}
                                boxShadow="0 0 20px rgba(12, 140, 233, 0.6)"
                            />
                            <Heading size="xl" mb={2} bgGradient="linear(to-r, white, gray.400)" bgClip="text">
                                {profile.full_name}
                            </Heading>
                            <Flex justify="center" align="center" gap={2} mb={4}>
                                <Icon as={CheckCircleIcon} color="blue.400" />
                                <Text fontWeight="bold" color="blue.400" fontSize="sm" letterSpacing="widest">VERIFIED HUSHH IDENTITY</Text>
                            </Flex>
                            <Badge colorScheme="purple" px={3} py={1} borderRadius="full" fontSize="xs">
                                {profile.occupation || "Verified User"}
                            </Badge>

                            <Flex justify="center" mt={6} gap={6} color="gray.500" fontSize="sm">
                                {profile.city && <Text>📍 {profile.city}, {profile.state}</Text>}
                                <Text>🆔 {profile.user_id}</Text>
                            </Flex>
                        </Box>
                    </Box>

                    {/* Details Sections */}
                    <VStack spacing={2} align="stretch" pb={20}>
                        <InfoSection title="Basic Information" data={basicInfo} />
                        <InfoSection title="Contact & Location" data={contactLocation} />
                        <InfoSection title="Professional" data={professionalInfo} />
                        <InfoSection title="Lifestyle & Preferences" data={lifestyleInfo} />
                        <InfoSection title="Technology" data={techInfo} />
                        <InfoSection title="Needs & Desires" data={desires} />
                        <InfoSection title="Purchase Intents" data={intents} />
                    </VStack>

                    <Divider borderColor="gray.800" mb={6} />

                    <Flex direction="column" align="center" gap={2}>
                        <Text textAlign="center" color="gray.500" fontSize="xs">
                            Last Updated: {new Date(profile.profile_updated_utc).toLocaleString()}
                        </Text>
                        <Text textAlign="center" color="gray.600" fontSize="xs">
                            Powered by Hushh.ai • Secure Digital Identity
                        </Text>
                    </Flex>

                </Container>
            </Box>
        </ContentWrapper>
    );
}
