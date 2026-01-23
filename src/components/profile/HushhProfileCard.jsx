import React from 'react';
import { Box, Flex, Text, VStack, Button, HStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { FaApple } from 'react-icons/fa';
import { WalletService } from '../../services/walletService';
import HushhHeaderLogo from '../../app/_components/svg/hushhHeaderLogo';
import { buildHushhId, getSiteUrl } from '../../lib/utils';

const MotionBox = motion(Box);

export default function HushhProfileCard({ userData }) {
    const toast = useToast();
    // Fallback if userData is missing specific fields
    // Helper for Title Case (User requested "Camel Case", but Title Case is standard for Names)
    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    const rawName = userData?.fullName || userData?.full_name || 'Hushh User';
    const fullName = toTitleCase(rawName);
    const role = userData?.occupation || userData?.role || 'Member';
    // Prefer short Hushh ID for public profile lookup
    const rawPhone = userData?.phone || userData?.phoneNumber || '';
    const phoneDigits = rawPhone.replace(/\D/g, '');
    const generatedHushhId = phoneDigits ? buildHushhId(rawName, rawPhone) : '';
    const hushhId = generatedHushhId || userData?.hushh_id || userData?.hushhId || null;
    const displayId = hushhId || 'pending';
    const baseUrl = getSiteUrl();
    const profileId = hushhId;
    const profileUrl = profileId ? `${baseUrl}/hushh-id/${profileId}` : '';
    const hasProfileUrl = Boolean(profileId);
    const hasPublicId = Boolean(hushhId);

    const handleAddToWallet = async () => {
        if (!hasPublicId) {
            toast({
                title: "Missing profile ID",
                description: "We need a confirmed Hushh ID before generating the wallet pass.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        toast({
            title: "Generating Wallet Pass...",
            description: "Request sent to Hushh Wallet API.",
            status: "info",
            duration: 2000,
        });

        try {
            const passBlob = await WalletService.generatePass(userData);

            // Create download link
            const url = window.URL.createObjectURL(passBlob);
            const link = document.createElement('a');
            link.href = url;
            const fileName = `Hushh-ID-${fullName.replace(/\s+/g, '-')}.pkpass`;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast({
                title: "Pass Downloaded",
                description: "Open the file to add to Apple Wallet.",
                status: "success",
                duration: 4000,
                isClosable: true,
            })
        } catch (e) {
            console.error("Pass generation error:", e);
            toast({
                title: "Error generating pass",
                description: "Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    return (
        <VStack spacing={6} w="100%">
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                w="100%"
                maxW="340px" // Standard ID Card width
                mx="auto"
                fontFamily="'Outfit', sans-serif"
            >
                {/* Premium Golden Card Container */}
                <Box
                    position="relative"
                    borderRadius="3xl"
                    overflow="hidden"
                    bgGradient="linear(to-br, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)" // Luxurious Gold Gradient
                    border="1px solid rgba(255, 255, 255, 0.4)"
                    boxShadow="0 25px 50px -12px rgba(180, 140, 60, 0.6)" // Golden Glow
                    p={6}
                    color="#1d1d1f" // Dark text for contrast on gold
                    pt={8}
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                        pointerEvents: 'none'
                    }}
                >
                    {/* Header: Logo */}
                    <Box mb={8} filter="invert(1) brightness(0.2)"> {/* Make logo dark */}
                        <Box transform="scale(0.8)" transformOrigin="left top">
                            <HushhHeaderLogo />
                        </Box>
                    </Box>

                    {/* Primary Info: Name, Email, Phone */}
                    <VStack align="stretch" spacing={4} mb={6}>
                        <Box>
                            <Text fontSize="xs" fontWeight="800" color="rgba(0,0,0,0.5)" letterSpacing="widest" mb={1}>
                                NAME
                            </Text>
                            <Text fontSize="2xl" fontWeight="800" lineHeight="1.1" color="#1d1d1f" letterSpacing="-0.5px">
                                {fullName}
                            </Text>
                        </Box>
                        <HStack spacing={6}>
                            <Box flex="1">
                                <Text fontSize="xx-small" fontWeight="800" color="rgba(0,0,0,0.5)" letterSpacing="widest" mb={1}>
                                    EMAIL
                                </Text>
                                <Text fontSize="xs" fontWeight="700" color="#333" isTruncated>
                                    {userData?.email || 'N/A'}
                                </Text>
                            </Box>
                            <Box flex="1">
                                <Text fontSize="xx-small" fontWeight="800" color="rgba(0,0,0,0.5)" letterSpacing="widest" mb={1}>
                                    PHONE
                                </Text>
                                <Text fontSize="xs" fontWeight="700" color="#333">
                                    {userData?.phone || userData?.phoneNumber || 'N/A'}
                                </Text>
                            </Box>
                        </HStack>
                    </VStack>

                    {/* Secondary Info: ID & Role */}
                    <Flex justify="space-between" align="flex-start" mb={8}>
                        <Box>
                            <Text fontSize="xx-small" fontWeight="800" color="rgba(0,0,0,0.5)" letterSpacing="widest" mb={1}>
                                HUSHH ID
                            </Text>
                            <Text fontSize="xs" color="#333" fontFamily="monospace" fontWeight="600" maxW="150px" noOfLines={2}>
                                {displayId}
                            </Text>
                        </Box>
                        <Box textAlign="right">
                            <Text fontSize="xx-small" fontWeight="800" color="rgba(0,0,0,0.5)" letterSpacing="widest" mb={1}>
                                ROLE
                            </Text>
                            <Text fontSize="sm" fontWeight="900" color="#1d1d1f" textTransform="uppercase">
                                {role}
                            </Text>
                        </Box>
                    </Flex>

                    {/* QR Code Section */}
                    <Flex justify="center" mb={6}>
                        <Box
                            bg="white"
                            p={3}
                            borderRadius="xl"
                            boxShadow="md"
                        >
                            {hasProfileUrl ? (
                                <QRCode
                                    value={profileUrl}
                                    size={160}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                />
                            ) : (
                                <Box px={4} py={6}>
                                    <Text fontSize="xs" color="gray.700" textAlign="center">
                                        Hushh ID not ready yet
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Flex>

                </Box>
            </MotionBox>

            {/* Actions Outside Card */}
            <Button
                leftIcon={<FaApple fontSize="1.2em" />}
                bg="black"
                color="white"
                size="lg"
                w="full"
                maxW="340px"
                borderRadius="xl"
                border="1px solid rgba(255,255,255,0.2)"
                _hover={{ bg: "gray.900", transform: "translateY(-2px)", boxShadow: "lg" }}
                _active={{ transform: "scale(0.98)" }}
                onClick={handleAddToWallet}
                isDisabled={!hasProfileUrl}
                fontWeight="medium"
            >
                Add to Apple Wallet
            </Button>
        </VStack>
    );
}
