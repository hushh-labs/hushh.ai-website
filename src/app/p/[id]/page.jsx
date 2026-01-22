"use client";
import React, { useEffect, useState } from "react";
import { UserProfileService } from "../../../services/userProfileService";
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
    GridItem,
    Button,
    Grid
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

// Font stack
const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const BentoCard = ({ title, children, colSpan = 1, bg = "white" }) => (
    <GridItem colSpan={colSpan}>
        <Box
            bg={bg}
            borderRadius="3xl"
            p={6}
            h="100%"
            border="1px solid rgba(0,0,0,0.05)"
            transition="all 0.3s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
        >
            {title && (
                <Text
                    fontSize="xs"
                    fontWeight="700"
                    color="#86868b"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={4}
                    fontFamily={fontFamily}
                >
                    {title}
                </Text>
            )}
            {children}
        </Box>
    </GridItem>
);

const ValueText = ({ children, size = "2xl", color = "#1d1d1f", gradient }) => (
    <Text
        fontSize={size}
        fontWeight="700"
        color={color}
        bgGradient={gradient}
        bgClip={gradient ? "text" : undefined}
        fontFamily={fontFamily}
        letterSpacing="tight"
        lineHeight="1.1"
    >
        {children}
    </Text>
);

const LabelText = ({ children }) => (
    <Text fontSize="sm" color="#86868b" mt={1} fontWeight="500" fontFamily={fontFamily}>
        {children}
    </Text>
);

export default function PublicProfilePage({ params }) {
    const id = params.id; // Single ID param for /p/[id]
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadProfile() {
            if (id) {
                const decodedId = decodeURIComponent(id);
                const data = await UserProfileService.getUserProfile(decodedId);
                setProfile(data);
            }
            setLoading(false);
        }
        loadProfile();
    }, [id]);

    if (loading) {
        return (
            <Flex minH="100vh" align="center" justify="center" bg="#f5f5f7">
                <Spinner size="xl" color="#0071e3" thickness="2px" />
            </Flex>
        );
    }

    if (!profile) {
        return (
            <Flex minH="100vh" align="center" justify="center" bg="#f5f5f7" direction="column">
                <Text fontSize="xl" color="#1d1d1f" fontWeight="600" fontFamily={fontFamily}>Profile not found</Text>
                <Button mt={4} variant="link" color="#0071e3" onClick={() => router.push('/')}>Go Home</Button>
            </Flex>
        );
    }

    // Helper to format currency
    const fmtMoney = (val) => val ? `$${val.toLocaleString()}` : "N/A";

    // Safely extract arrays
    const needs = [profile.need_1, profile.need_2, profile.need_3].filter(Boolean);
    const wants = [profile.want_1, profile.want_2, profile.want_3].filter(Boolean);
    const desires = [profile.desire_1, profile.desire_2, profile.desire_3].filter(Boolean);

    return (
        <Box minH="100vh" bg="#f5f5f7" color="#1d1d1f" pb={20}>
            {/* Nav / Home Button */}
            <Box position="fixed" top={6} left={6} zIndex={100}>
                <Button
                    size="sm"
                    variant="ghost"
                    color="#1d1d1f"
                    _hover={{ bg: "rgba(0,0,0,0.05)" }}
                    onClick={() => router.push('/')}
                    borderRadius="full"
                    backdropFilter="blur(10px)"
                    bg="rgba(255,255,255,0.7)"
                >
                    Hushh.ai
                </Button>
            </Box>

            <Container maxW="6xl" pt={{ base: 24, md: 32 }}>

                {/* Header Section */}
                <Flex direction={{ base: "column", md: "row" }} align="center" mb={16} gap={8}>
                    <Avatar
                        size="2xl"
                        src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.full_name}&background=0071e3&color=fff`}
                        w={{ base: "120px", md: "160px" }}
                        h={{ base: "120px", md: "160px" }}
                        boxShadow="0 20px 40px -10px rgba(0,0,0,0.2)"
                    />
                    <VStack align={{ base: "center", md: "start" }} spacing={1}>
                        <Heading
                            size="3xl"
                            fontWeight="700"
                            letterSpacing="tight"
                            fontFamily={fontFamily}
                            color="#1d1d1f"
                        >
                            {profile.full_name}
                        </Heading>
                        <Text fontSize="xl" color="#86868b" fontWeight="400" fontFamily={fontFamily}>
                            {profile.occupation} • {profile.city}
                        </Text>
                        <Badge
                            mt={2}
                            px={3}
                            py={1}
                            borderRadius="full"
                            bg="rgba(0,113,227,0.1)"
                            color="#0071e3"
                            textTransform="none"
                            fontSize="sm"
                            fontWeight="500"
                        >
                            Verified Intelligence Profile
                        </Badge>
                    </VStack>
                </Flex>

                {/* Bento Grid */}
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                    gap={6}
                    autoRows="minmax(180px, auto)"
                >
                    {/* Key Stats */}
                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Core Demographics">
                        <SimpleGrid columns={2} spacing={8} mt={2}>
                            <Box>
                                <ValueText>{profile.age}</ValueText>
                                <LabelText>Age</LabelText>
                            </Box>
                            <Box>
                                <ValueText>{profile.gender}</ValueText>
                                <LabelText>Gender</LabelText>
                            </Box>
                            <Box>
                                <ValueText>{profile.household_size}</ValueText>
                                <LabelText>Household Size</LabelText>
                            </Box>
                            <Box>
                                <ValueText size="xl">{profile.education_level}</ValueText>
                                <LabelText>Education</LabelText>
                            </Box>
                        </SimpleGrid>
                    </BentoCard>

                    {/* High Confidence Intent (Hero Card) */}
                    <BentoCard colSpan={{ base: 1, md: 2 }} bg="linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)">
                        <Flex direction="column" h="100%" justify="space-between">
                            <Box>
                                <Text fontSize="xs" fontWeight="700" color="#00a33b" textTransform="uppercase" mb={2}>
                                    Top 24h Purchase Intent
                                </Text>
                                <ValueText size="3xl" color="#1d1d1f">
                                    {profile.intent_24h_category || "Analyzing..."}
                                </ValueText>
                                <Text fontSize="lg" color="#86868b" mt={2} fontFamily={fontFamily}>
                                    Est. Budget: {fmtMoney(profile.intent_24h_budget_usd)}
                                </Text>
                            </Box>
                            <Box mt={4}>
                                <Badge bg="#dcfce7" color="#166534" px={2} borderRadius="md">High Confidence</Badge>
                            </Box>
                        </Flex>
                    </BentoCard>

                    {/* Needs & Wants */}
                    <BentoCard colSpan={1} title="Needs">
                        <VStack align="start" spacing={3}>
                            {needs.slice(0, 3).map((need, i) => (
                                <Text key={i} color="#1d1d1f" fontWeight="500" fontSize="md">{need}</Text>
                            ))}
                            {needs.length === 0 && <Text color="#86868b">None identified</Text>}
                        </VStack>
                    </BentoCard>

                    <BentoCard colSpan={1} title="Wants">
                        <VStack align="start" spacing={3}>
                            {wants.slice(0, 3).map((want, i) => (
                                <Text key={i} color="#1d1d1f" fontWeight="500" fontSize="md">{want}</Text>
                            ))}
                            {wants.length === 0 && <Text color="#86868b">None identified</Text>}
                        </VStack>
                    </BentoCard>

                    {/* Lifestyle */}
                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Lifestyle DNA">
                        <SimpleGrid columns={2} spacing={6}>
                            <Box>
                                <LabelText>Dietary Preference</LabelText>
                                <Text fontSize="lg" fontWeight="600" color="#1d1d1f">{profile.diet_preference}</Text>
                            </Box>
                            <Box>
                                <LabelText>Fitness</LabelText>
                                <Text fontSize="lg" fontWeight="600" color="#1d1d1f">{profile.fitness_routine}</Text>
                            </Box>
                            <Box>
                                <LabelText>Daily Coffee/Tea</LabelText>
                                <Text fontSize="lg" fontWeight="600" color="#1d1d1f">{profile.coffee_or_tea}</Text>
                            </Box>
                            <Box>
                                <LabelText>Transport</LabelText>
                                <Text fontSize="lg" fontWeight="600" color="#1d1d1f">{profile.primary_transport}</Text>
                            </Box>
                        </SimpleGrid>
                    </BentoCard>

                    {/* Tech Profile */}
                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Digital Life">
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <Box p={4} bg="#f5f5f7" borderRadius="xl">
                                <LabelText>Primary Device</LabelText>
                                <ValueText size="lg">{profile.primary_device}</ValueText>
                            </Box>
                            <Box p={4} bg="#f5f5f7" borderRadius="xl">
                                <LabelText>Social Platform</LabelText>
                                <ValueText size="lg">{profile.favorite_social_platform}</ValueText>
                            </Box>
                            <Box p={4} bg="#f5f5f7" borderRadius="xl">
                                <LabelText>Daily Usage</LabelText>
                                <ValueText size="lg">{profile.daily_social_time_minutes}m</ValueText>
                            </Box>
                        </SimpleGrid>
                    </BentoCard>

                    {/* Future Intents */}
                    <BentoCard colSpan={1} title="48h Plan">
                        <Text fontSize="xl" fontWeight="600" color="#0071e3">{profile.intent_48h_category || "N/A"}</Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>{fmtMoney(profile.intent_48h_budget_usd)}</Text>
                    </BentoCard>
                    <BentoCard colSpan={1} title="72h Plan">
                        <Text fontSize="xl" fontWeight="600" color="#af52de">{profile.intent_72h_category || "N/A"}</Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>{fmtMoney(profile.intent_72h_budget_usd)}</Text>
                    </BentoCard>

                    {/* Desires */}
                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Desires" bg="linear-gradient(to right, #ffffff, #f5f5f7)">
                        <Flex wrap="wrap" gap={3} mt={2}>
                            {desires.map((d, i) => (
                                <Badge key={i} px={4} py={2} borderRadius="full" bg="#e8e8ed" color="#1d1d1f" textTransform="none" fontSize="md" fontWeight="400">
                                    ✨ {d}
                                </Badge>
                            ))}
                        </Flex>
                    </BentoCard>

                </Grid>

                {/* Footer */}
                <Flex mt={24} justify="center" direction="column" align="center" gap={4}>
                    <Icon as={StarIcon} color="yellow.500" />
                    <Text fontSize="sm" color="#86868b" fontFamily={fontFamily}>
                        Securely Hosted by Hushh Intelligence Portal
                    </Text>
                    <Text fontSize="xs" color="#86868b" fontFamily={fontFamily}>
                        ID: {profile.user_id}
                    </Text>
                </Flex>

            </Container>
        </Box>
    );
}
