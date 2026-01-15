import React from 'react';
import { Box, Flex, Text, VStack, Button, Image, useToast, Icon, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { FaApple } from 'react-icons/fa';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { WalletService } from '../../services/walletService';

const MotionBox = motion(Box);

export default function HushhProfileCard({ userData }) {
    const toast = useToast();
    // Fallback if userData is missing specific fields
    const fullName = userData?.fullName || 'Hushh User';
    const role = userData?.occupation || 'Digital Citizen';
    const userId = userData?.user_id || userData?.id || 'demo-user';
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
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            w="100%"
            maxW="400px" // Mobile friendly width
            mx="auto"
            fontFamily="'Outfit', sans-serif"
        >
            {/* Glassmorphism Card Container */}
            <Box
                position="relative"
                borderRadius="3xl"
                overflow="hidden"
                bg="rgba(255, 255, 255, 0.1)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                backdropFilter="blur(12px)"
                p={6}
                color="white"
            >
                {/* Background Gradients */}
                <Box
                    position="absolute"
                    top="-50%"
                    left="-50%"
                    w="200%"
                    h="200%"
                    bgGradient="radial(circle at 50% 50%, rgba(94, 92, 230, 0.2), transparent 70%)"
                    zIndex={-1}
                />
                <Box
                    position="absolute"
                    top="0"
                    right="0"
                    w="150px"
                    h="150px"
                    bg="rgba(12, 140, 233, 0.3)"
                    filter="blur(60px)"
                    borderRadius="full"
                    zIndex={-1}
                />

                {/* Header / Brand */}
                <Flex justify="space-between" align="center" mb={6}>
                    <HStack>
                        <Icon as={CheckCircleIcon} color="green.400" />
                        <Text fontSize="xs" letterSpacing="widest" textTransform="uppercase" fontWeight="bold" color="gray.300">
                            Verified Identity
                        </Text>
                    </HStack>
                    <Text fontWeight="900" fontSize="lg" letterSpacing="tighter">HUSHH USB</Text>
                </Flex>

                {/* Profile Content */}
                <VStack spacing={4} align="center">
                    {/* Avatar Ring */}
                    <Box
                        p="3px"
                        borderRadius="full"
                        bgGradient="linear(45deg, #0C8CE9, #5E5CE6)"
                        boxShadow="0 0 20px rgba(94, 92, 230, 0.5)"
                    >
                        <Image
                            src={userData?.avatar || "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + fullName}
                            alt={fullName}
                            w="80px"
                            h="80px"
                            borderRadius="full"
                            border="3px solid black"
                        />
                    </Box>

                    <VStack spacing={0}>
                        <Text fontSize="2xl" fontWeight="bold">{fullName}</Text>
                        <Text fontSize="sm" color="gray.400">{role}</Text>
                    </VStack>

                    {/* QR Code Section */}
                    <Box
                        bg="white"
                        p={3}
                        borderRadius="xl"
                        boxShadow="0 4px 20px rgba(0,0,0,0.3)"
                    >
                        <QRCode
                            value={profileUrl}
                            size={140}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                        />
                    </Box>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                        Scan to view verified public profile <br />
                        <Text as="span" color="blue.400">{profileUrl.replace('https://', '')}</Text>
                    </Text>
                </VStack>

                {/* Footer Actions */}
                <VStack mt={6} spacing={3} w="100%">
                    <Button
                        leftIcon={<FaApple fontSize="1.2em" />}
                        bg="black"
                        color="white"
                        w="100%"
                        h="50px"
                        borderRadius="xl"
                        border="1px solid rgba(255,255,255,0.2)"
                        _hover={{ bg: "gray.900", transform: "scale(1.02)" }}
                        _active={{ transform: "scale(0.98)" }}
                        onClick={handleAddToWallet}
                        fontWeight="medium"
                    >
                        Add to Apple Wallet
                    </Button>
                    <Button
                        variant="ghost"
                        color="whiteAlpha.700"
                        size="sm"
                        fontSize="xs"
                        _hover={{ color: "white" }}
                        onClick={() => window.open(profileUrl, '_blank')}
                    >
                        View Public Page &rarr;
                    </Button>
                </VStack>

            </Box>
        </MotionBox>
    );
}
