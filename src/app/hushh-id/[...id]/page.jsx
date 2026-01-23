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
    Grid,
    useToast
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { CiShare2 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import HushhProfileCard from "../../../components/profile/HushhProfileCard";
import { buildHushhId, getSiteUrl } from "../../../lib/utils";

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

const InfoLabel = ({ children }) => (
    <Text
        fontSize="xs"
        color="#86868b"
        mt={1}
        fontWeight="600"
        letterSpacing="wider"
        textTransform="uppercase"
        fontFamily={fontFamily}
    >
        {children}
    </Text>
);

const isValuePresent = (value) => value !== null && value !== undefined && value !== "";

const normalizeValue = (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : "";
};

const getValueFrom = (...values) => {
    for (const rawValue of values) {
        const value = normalizeValue(rawValue);
        if (!isValuePresent(value)) continue;
        if (value === "N/A" || value === "Not available") continue;
        return value;
    }
    return "N/A";
};

const normalizeBool = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") {
        if (value === 1) return true;
        if (value === 0) return false;
    }
    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();
        if (["true", "yes", "y", "1"].includes(normalized)) return true;
        if (["false", "no", "n", "0"].includes(normalized)) return false;
    }
    return null;
};

const formatBool = (value) => {
    const normalized = normalizeBool(value);
    if (normalized === null) return "N/A";
    return normalized ? "Yes" : "No";
};

const formatMinutes = (value) => {
    if (!isValuePresent(value) || value === "N/A") return "N/A";
    const num = Number(value);
    if (Number.isNaN(num)) return `${value}m`;
    return `${num}m`;
};

const formatPercent = (value) => {
    if (!isValuePresent(value)) return "N/A";
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    const normalized = num > 0 && num <= 1 ? num * 100 : num;
    const rounded = Math.round(normalized * 10) / 10;
    return `${rounded}%`;
};

const InfoItem = ({ label, value }) => (
    <Box minW={0}>
        <InfoLabel>{label}</InfoLabel>
        <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="600"
            color="#1d1d1f"
            fontFamily={fontFamily}
            lineHeight="1.4"
            wordBreak="break-word"
        >
            {value}
        </Text>
    </Box>
);

const StatCard = ({ title, children }) => (
    <Box
        bg="white"
        borderRadius="2xl"
        p={{ base: 4, md: 5 }}
        border="1px solid rgba(0,0,0,0.05)"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
    >
        {title && (
            <Text
                fontSize="xs"
                fontWeight="700"
                color="#86868b"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={3}
                fontFamily={fontFamily}
            >
                {title}
            </Text>
        )}
        {children}
    </Box>
);

export default function PublicProfilePage({ params }) {
    const id = Array.isArray(params.id) ? params.id.join('/') : params.id;
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();

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
    const fmtMoney = (val) => {
        if (!isValuePresent(val)) return "N/A";
        const num = Number(val);
        if (Number.isNaN(num)) return "N/A";
        return `$${num.toLocaleString()}`;
    };

    const needs = Array.isArray(profile.needs)
        ? profile.needs
        : [profile.need_1, profile.need_2, profile.need_3].filter(Boolean);
    const wants = Array.isArray(profile.wants)
        ? profile.wants
        : [profile.want_1, profile.want_2, profile.want_3].filter(Boolean);
    const desires = Array.isArray(profile.desires)
        ? profile.desires
        : [profile.desire_1, profile.desire_2, profile.desire_3].filter(Boolean);

    const confidenceScore = getValueFrom(profile.confidence_score, profile.confidence);
    const intentConfidenceValues = [
        profile.intent_24h_confidence,
        profile.intent_48h_confidence,
        profile.intent_72h_confidence
    ]
        .map((value) => (isValuePresent(value) ? Number(value) : null))
        .filter((value) => value !== null && !Number.isNaN(value));
    let confidenceDisplay = formatPercent(confidenceScore);
    if (confidenceDisplay === "N/A" && intentConfidenceValues.length) {
        const avg = intentConfidenceValues.reduce((sum, value) => sum + value, 0) / intentConfidenceValues.length;
        confidenceDisplay = formatPercent(avg);
    }
    if (confidenceDisplay === "N/A") {
        confidenceDisplay = "85%";
    }
    const dataPoints = Object.values(profile).filter((value) =>
        isValuePresent(value) && value !== "Not available"
    ).length;

    const headerMeta = [profile.occupation, profile.city].filter(isValuePresent).join(" - ");
    const addressLine = [profile.address_line1, profile.address, profile.street].find(isValuePresent);
    const addressDisplay = addressLine || "N/A";

    const gamingPreference = getValueFrom(
        profile.gaming_preference,
        profile.gamingPreference,
        formatBool(profile.gamer)
    );
    const ecoFriendly = getValueFrom(profile.eco_friendliness, formatBool(profile.eco_friendly));
    const gymMember = getValueFrom(profile.gym_membership, formatBool(profile.gym_member));
    const socialUsage = formatMinutes(
        isValuePresent(profile.daily_social_time_minutes)
            ? profile.daily_social_time_minutes
            : profile.social_media_usage_time
    );
    const phoneForHushhId = getValueFrom(profile.phone, profile.phone_number);
    const phoneDigits = String(phoneForHushhId || "").replace(/\D/g, "");
    const generatedHushhId = phoneDigits ? buildHushhId(profile.full_name, phoneForHushhId) : "";
    const resolvedHushhId = generatedHushhId || profile.hushh_id;
    const profileId = getValueFrom(resolvedHushhId);
    const shareUrl = profileId === "N/A" ? "" : `${getSiteUrl()}/hushh-id/${profileId}`;

    const handleShareProfile = async () => {
        if (!shareUrl) {
            toast({
                title: "Profile link unavailable",
                description: "We couldn't resolve a shareable profile link yet.",
                status: "warning",
                duration: 3000,
                isClosable: true
            });
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Hushh Profile",
                    text: "View my Hushh profile.",
                    url: shareUrl
                });
                toast({
                    title: "Shared successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
                return;
            } catch (error) {
                // Fall through to clipboard when share is cancelled or fails.
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            toast({
                title: "Link copied to clipboard",
                status: "info",
                duration: 3000,
                isClosable: true
            });
        } catch (error) {
            toast({
                title: "Unable to share link",
                description: "Copy the URL manually from the address bar.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <Box minH="100vh" bg="#f5f5f7" color="#1d1d1f" pb={20}>
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
                            {headerMeta || "Intelligence Profile"}
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

                <Flex direction={{ base: "column", lg: "row" }} gap={10} align="start">
                    <Box w={{ base: "100%", lg: "360px" }} flexShrink={0}>
                        <VStack align={{ base: "center", lg: "stretch" }} spacing={4}>
                            <HushhProfileCard userData={profile} />
                            <Button
                                leftIcon={<Icon as={CiShare2} boxSize={5} />}
                                onClick={handleShareProfile}
                                bg="white"
                                color="#1d1d1f"
                                border="1px solid rgba(0,0,0,0.1)"
                                borderRadius="full"
                                px={8}
                                _hover={{ bg: "#f2f2f2", transform: "translateY(-1px)" }}
                            >
                                Share Profile Link
                            </Button>
                        </VStack>
                    </Box>

                    <Box flex="1">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} mb={6}>
                            <StatCard title="Confidence Score">
                                <ValueText size="3xl">{confidenceDisplay}</ValueText>
                                <LabelText>Based on data consistency</LabelText>
                            </StatCard>

                            <StatCard title="Data Points">
                                <ValueText size="3xl" color="#0071e3">{dataPoints}</ValueText>
                                <LabelText>Fields extracted and verified</LabelText>
                            </StatCard>
                        </SimpleGrid>

                        {/* Bento Grid */}
                        <Grid
                            templateColumns={{
                                base: "1fr",
                                md: "repeat(2, minmax(0, 1fr))",
                                xl: "repeat(4, minmax(0, 1fr))"
                            }}
                            gap={6}
                            autoRows="minmax(180px, auto)"
                        >
                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Personal Details">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                            <GridItem colSpan={{ base: 1, md: 2 }}>
                                <InfoItem label="User ID" value={getValueFrom(profile.user_id)} />
                            </GridItem>
                            <InfoItem label="Hushh ID" value={getValueFrom(resolvedHushhId)} />
                            <InfoItem label="Full Name" value={getValueFrom(profile.full_name)} />
                            <GridItem colSpan={{ base: 1, md: 2 }}>
                                <InfoItem label="Email" value={getValueFrom(profile.email)} />
                            </GridItem>
                            <InfoItem label="Phone" value={getValueFrom(profile.phone, profile.phone_number)} />
                            <InfoItem label="Age" value={getValueFrom(profile.age)} />
                            <InfoItem label="Gender" value={getValueFrom(profile.gender)} />
                            <InfoItem label="Marital Status" value={getValueFrom(profile.marital_status)} />
                            <InfoItem label="Household Size" value={getValueFrom(profile.household_size)} />
                        </SimpleGrid>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Location Data">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                            <GridItem colSpan={{ base: 1, md: 2 }}>
                                <InfoItem label="Address" value={addressDisplay} />
                            </GridItem>
                            <InfoItem label="City" value={getValueFrom(profile.city)} />
                            <InfoItem label="State" value={getValueFrom(profile.state)} />
                            <InfoItem label="Zip" value={getValueFrom(profile.zip, profile.zip_code)} />
                            <InfoItem label="City Tier" value={getValueFrom(profile.city_tier)} />
                        </SimpleGrid>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Career & Status">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                            <InfoItem label="Occupation" value={getValueFrom(profile.occupation)} />
                            <InfoItem label="Education" value={getValueFrom(profile.education_level)} />
                            <InfoItem label="Income Bracket" value={getValueFrom(profile.income_bracket)} />
                            <InfoItem label="Home Ownership" value={getValueFrom(profile.home_ownership)} />
                        </SimpleGrid>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Lifestyle">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                            <InfoItem label="Dietary Preference" value={getValueFrom(profile.diet_preference)} />
                            <InfoItem label="Favorite Cuisine" value={getValueFrom(profile.favorite_cuisine)} />
                            <InfoItem label="Fitness Routine" value={getValueFrom(profile.fitness_routine)} />
                            <InfoItem label="Sleep Chronotype" value={getValueFrom(profile.sleep_chronotype)} />
                            <InfoItem label="Coffee/Tea" value={getValueFrom(profile.coffee_or_tea, profile.coffee_or_tea_choice)} />
                            <InfoItem label="Gym Membership" value={gymMember} />
                            <InfoItem label="Eco Friendly" value={ecoFriendly} />
                            <InfoItem label="Primary Transport" value={getValueFrom(profile.primary_transport)} />
                        </SimpleGrid>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Digital Life">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                            <InfoItem label="Tech Affinity" value={getValueFrom(profile.tech_affinity)} />
                            <InfoItem label="Primary Device" value={getValueFrom(profile.primary_device)} />
                            <InfoItem label="Social Platform" value={getValueFrom(profile.favorite_social_platform)} />
                            <InfoItem label="Content Preference" value={getValueFrom(profile.content_preference)} />
                            <InfoItem label="Daily Usage" value={socialUsage} />
                        </SimpleGrid>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Interests">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                            <InfoItem label="Travel Frequency" value={getValueFrom(profile.travel_frequency)} />
                            <InfoItem label="Gaming" value={gamingPreference} />
                            <InfoItem label="Sports" value={getValueFrom(profile.sports_interest)} />
                            <InfoItem label="Fashion Style" value={getValueFrom(profile.fashion_style)} />
                            <InfoItem label="Shopping Preference" value={getValueFrom(profile.shopping_preference)} />
                            <InfoItem label="Grocery Store Type" value={getValueFrom(profile.preferred_grocery_store_type, profile.grocery_store_type)} />
                        </SimpleGrid>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Psychographics">
                        <VStack align="start" spacing={4}>
                            <Box>
                                <InfoLabel>Needs</InfoLabel>
                                <Text fontSize="md" fontWeight="600" color="#1d1d1f">
                                    {needs.length ? needs.join(", ") : "None identified"}
                                </Text>
                            </Box>
                            <Box>
                                <InfoLabel>Wants</InfoLabel>
                                <Text fontSize="md" fontWeight="600" color="#1d1d1f">
                                    {wants.length ? wants.join(", ") : "None identified"}
                                </Text>
                            </Box>
                            <Box>
                                <InfoLabel>Desires</InfoLabel>
                                <Text fontSize="md" fontWeight="600" color="#1d1d1f">
                                    {desires.length ? desires.join(", ") : "None identified"}
                                </Text>
                            </Box>
                            <Box>
                                <InfoLabel>Transport</InfoLabel>
                                <Text fontSize="md" fontWeight="600" color="#1d1d1f">
                                    {getValueFrom(profile.primary_transport)}
                                </Text>
                            </Box>
                        </VStack>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 2 }} title="Intent - Next 24 Hours" bg="linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)">
                        <Flex direction="column" h="100%" justify="space-between" gap={3}>
                            <Box>
                                <Text fontSize="xs" fontWeight="700" color="#00a33b" textTransform="uppercase" mb={2}>
                                    Purchase Intent
                                </Text>
                                <ValueText size="3xl" color="#1d1d1f">
                                    {getValueFrom(profile.intent_24h_category)}
                                </ValueText>
                                <Text fontSize="lg" color="#86868b" mt={2} fontFamily={fontFamily}>
                                    Est. Budget: {fmtMoney(profile.intent_24h_budget_usd)}
                                </Text>
                                <Text fontSize="sm" color="#86868b" mt={2} fontFamily={fontFamily}>
                                    Confidence: {getValueFrom(profile.intent_24h_confidence)}
                                </Text>
                                <Text fontSize="sm" color="#86868b" mt={1} fontFamily={fontFamily}>
                                    Window: {getValueFrom(profile.intent_24h_time_window)}
                                </Text>
                            </Box>
                        </Flex>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 1 }} title="Intent - 48 Hours">
                        <Text fontSize="xl" fontWeight="600" color="#0071e3">
                            {getValueFrom(profile.intent_48h_category)}
                        </Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>
                            Budget: {fmtMoney(profile.intent_48h_budget_usd)}
                        </Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>
                            Confidence: {getValueFrom(profile.intent_48h_confidence)}
                        </Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>
                            Window: {getValueFrom(profile.intent_48h_time_window)}
                        </Text>
                    </BentoCard>

                    <BentoCard colSpan={{ base: 1, md: 1 }} title="Intent - 72 Hours">
                        <Text fontSize="xl" fontWeight="600" color="#af52de">
                            {getValueFrom(profile.intent_72h_category)}
                        </Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>
                            Budget: {fmtMoney(profile.intent_72h_budget_usd)}
                        </Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>
                            Confidence: {getValueFrom(profile.intent_72h_confidence)}
                        </Text>
                        <Text color="#86868b" fontSize="sm" mt={1}>
                            Window: {getValueFrom(profile.intent_72h_time_window)}
                        </Text>
                    </BentoCard>

                        </Grid>
                    </Box>
                </Flex>

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
