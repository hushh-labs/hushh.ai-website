import React from 'react';
import { Box, Flex, Text, VStack, Button, HStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { FaApple } from 'react-icons/fa';
import { WalletService } from '../../services/walletService';
import HushhHeaderLogo from '../../app/_components/svg/hushhHeaderLogo';

const MotionBox = motion(Box);

export default function HushhProfileCard({ userData }) {
    const toast = useToast();
    // Fallback if userData is missing specific fields
    const fullName = userData?.fullName || userData?.full_name || 'Hushh User';
    const role = userData?.occupation || userData?.role || 'Member';
    const userId = userData?.user_id || userData?.id || 'hushh-id';
    // Public profile URL
    const profileUrl = `https://hushh.ai/hushh-id/${userId}`;

    const handleAddToWallet = async () => {
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
                {/* Premium Black Card Container */}
                <Box
                    position="relative"
                    borderRadius="3xl"
                    overflow="hidden"
                    bg="black"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    boxShadow="0 20px 40px -10px rgba(0,0,0,0.8)"
                    p={6}
                    color="white"
                    pt={8}
                >
                    {/* Header: Logo */}
                    <Box mb={8}>
                        <Box transform="scale(0.8)" transformOrigin="left top">
                            <HushhHeaderLogo />
                        </Box>
                    </Box>

                    {/* Primary Info: Name */}
                    <Box mb={6}>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500" letterSpacing="widest" mb={1}>
                            NAME
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" lineHeight="1.1" color="white">
                            {fullName}
                        </Text>
                    </Box>

                    {/* Secondary Info: ID & Role */}
                    <Flex justify="space-between" align="flex-start" mb={8}>
                        <Box>
                            <Text fontSize="xx-small" fontWeight="bold" color="gray.500" letterSpacing="widest" mb={1}>
                                HUSHH ID
                            </Text>
                            <Text fontSize="xs" color="gray.300" fontFamily="monospace" maxW="150px" noOfLines={2}>
                                {userId}
                            </Text>
                        </Box>
                        <Box textAlign="right">
                            <Text fontSize="xx-small" fontWeight="bold" color="gray.500" letterSpacing="widest" mb={1}>
                                ROLE
                            </Text>
                            <Text fontSize="sm" fontWeight="bold" color="white" textTransform="uppercase">
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
                        >
                            <QRCode
                                value={profileUrl}
                                size={160}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 256 256`}
                            />
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
                fontWeight="medium"
            >
                Add to Apple Wallet
            </Button>
        </VStack>
    );
}
