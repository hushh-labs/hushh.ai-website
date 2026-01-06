"use client";
import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    Button,
    Box,
    HStack,
    PinInput,
    PinInputField,
    useToast,
    Image,
    Divider,
    Code,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner,
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircleIcon, CopyIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const MFAEnrollmentModal = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState(1); // 1: QR Code, 2: Verify OTP
    const [qrCode, setQrCode] = useState(null);
    const [secret, setSecret] = useState('');
    const [factorId, setFactorId] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(true);
    const [copied, setCopied] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            initializeEnrollment();
        }
    }, [isOpen]);

    const initializeEnrollment = async () => {
        setIsEnrolling(true);
        try {
            // Import dynamically to avoid SSR issues
            const { default: authentication } = await import('../../../lib/auth/authentication');

            // First, check if there are any existing factors (verified or unverified)
            const { data: existingFactors } = await authentication.mfa.getMFAFactors();

            // Remove any unverified factors to allow re-enrollment
            if (existingFactors && existingFactors.length > 0) {
                console.log('Found existing factors:', existingFactors);

                for (const factor of existingFactors) {
                    if (factor.status !== 'verified') {
                        console.log('Removing unverified factor:', factor.id);
                        await authentication.mfa.unenrollMFA(factor.id);
                    }
                }
            }

            const { data, error } = await authentication.mfa.enrollMFA();

            if (error) {
                toast({
                    title: 'Enrollment Failed',
                    description: error.message || 'Failed to initialize MFA enrollment',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
                onClose();
                return;
            }

            setQrCode(data.totp.uri);
            setSecret(data.totp.secret);
            setFactorId(data.id);
            setStep(1);
        } catch (error) {
            console.error('Enrollment initialization error:', error);
            toast({
                title: 'Error',
                description: 'Failed to start MFA enrollment',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            onClose();
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleCopySecret = () => {
        navigator.clipboard.writeText(secret);
        setCopied(true);
        toast({
            title: 'Copied!',
            description: 'Secret key copied to clipboard',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            toast({
                title: 'Invalid Code',
                description: 'Please enter a 6-digit code',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        setIsLoading(true);
        try {
            const { default: authentication } = await import('../../../lib/auth/authentication');

            const { data, error } = await authentication.mfa.verifyMFAEnrollment(factorId, otp);

            if (error) {
                toast({
                    title: 'Verification Failed',
                    description: error.message || 'Invalid code. Please try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
                setOtp('');
                return;
            }

            toast({
                title: 'Success! 🎉',
                description: 'Two-factor authentication is now enabled',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });

            onSuccess && onSuccess(data);
            onClose();
        } catch (error) {
            console.error('Verification error:', error);
            toast({
                title: 'Error',
                description: 'Failed to verify code',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
            setOtp('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            closeOnOverlayClick={false}
            isCentered
            scrollBehavior="inside"
        >
            <ModalOverlay
                bg="blackAlpha.600"
                backdropFilter="blur(10px)"
            />
            <ModalContent
                bg="#ffffff"
                borderRadius="2xl"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.15)"
                border="1px solid #e5e5ea"
                overflow="hidden"
                my="auto"
            >
                <ModalHeader
                    bg="linear-gradient(135deg, #0071E3 0%, #BB62FC 100%)"
                    color="white"
                    py={4}
                    fontSize="xl"
                    fontWeight={800}
                    textAlign="center"
                >
                    🔐 Enable 2FA
                </ModalHeader>
                <ModalCloseButton color="white" top={3} right={3} />

                <ModalBody py={4} px={5}>
                    {isEnrolling ? (
                        <VStack spacing={4} py={8}>
                            <Spinner size="lg" color="#0071E3" thickness="3px" />
                            <Text color="#6e6e73" fontSize="sm">
                                Setting up...
                            </Text>
                        </VStack>
                    ) : (
                        <VStack spacing={3} animation={`${fadeIn} 0.5s ease-out`}>
                            {/* Step Indicator - Compact */}
                            <HStack spacing={3} w="full" justify="center">
                                <HStack spacing={1}>
                                    <Box
                                        w="24px"
                                        h="24px"
                                        borderRadius="full"
                                        bg={step >= 1 ? "#0071E3" : "#e5e5ea"}
                                        color="white"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontWeight={700}
                                        fontSize="xs"
                                    >
                                        {step > 1 ? <CheckCircleIcon boxSize={3} /> : "1"}
                                    </Box>
                                    <Text color="#1d1d1f" fontWeight={600} fontSize="xs">Scan</Text>
                                </HStack>
                                <Box w="20px" h="1px" bg={step >= 2 ? "#0071E3" : "#e5e5ea"} />
                                <HStack spacing={1}>
                                    <Box
                                        w="24px"
                                        h="24px"
                                        borderRadius="full"
                                        bg={step >= 2 ? "#0071E3" : "#e5e5ea"}
                                        color="white"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontWeight={700}
                                        fontSize="xs"
                                    >
                                        2
                                    </Box>
                                    <Text color="#1d1d1f" fontWeight={600} fontSize="xs">Verify</Text>
                                </HStack>
                            </HStack>

                            <Divider borderColor="#e5e5ea" />

                            {step === 1 && (
                                <VStack spacing={3} w="full">
                                    <Text color="#6e6e73" fontSize="xs" textAlign="center">
                                        Use Google Authenticator or similar to scan:
                                    </Text>

                                    {/* QR Code - Compact */}
                                    <Box
                                        p={3}
                                        bg="white"
                                        borderRadius="lg"
                                        border="1px solid #e5e5ea"
                                        boxShadow="0 2px 8px rgba(0, 0, 0, 0.04)"
                                    >
                                        {qrCode && (
                                            <QRCodeSVG
                                                value={qrCode}
                                                size={130}
                                                level="H"
                                                includeMargin={true}
                                            />
                                        )}
                                    </Box>

                                    {/* Manual Entry - Compact */}
                                    <VStack spacing={1} w="full">
                                        <Text color="#6e6e73" fontSize="xs" fontWeight={500}>
                                            Or enter code manually:
                                        </Text>
                                        <HStack
                                            w="full"
                                            p={2}
                                            bg="#f5f5f7"
                                            borderRadius="md"
                                            border="1px solid #e5e5ea"
                                            justify="space-between"
                                            h="36px"
                                        >
                                            <Code
                                                colorScheme="gray"
                                                fontSize="sm"
                                                fontWeight={600}
                                                bg="transparent"
                                                color="#1d1d1f"
                                            >
                                                {secret}
                                            </Code>
                                            <Button
                                                size="xs"
                                                leftIcon={copied ? <CheckCircleIcon /> : <CopyIcon />}
                                                onClick={handleCopySecret}
                                                colorScheme={copied ? "green" : "blue"}
                                                variant="ghost"
                                            >
                                                {copied ? 'Copied' : 'Copy'}
                                            </Button>
                                        </HStack>
                                    </VStack>

                                    <Button
                                        w="full"
                                        h="44px"
                                        bg="#0071E3"
                                        color="white"
                                        fontSize="sm"
                                        fontWeight={600}
                                        borderRadius="lg"
                                        _hover={{ bg: "#0051B3" }}
                                        _active={{ bg: "#003D8F" }}
                                        onClick={() => setStep(2)}
                                        mt={1}
                                    >
                                        Continue
                                    </Button>
                                </VStack>
                            )}

                            {step === 2 && (
                                <VStack spacing={6} w="full">
                                    <Text color="#1d1d1f" fontSize="lg" fontWeight={700} textAlign="center">
                                        Step 2: Enter the 6-digit code
                                    </Text>
                                    <Text color="#6e6e73" fontSize="md" textAlign="center">
                                        Open your authenticator app and enter the code shown for Hushh
                                    </Text>

                                    {/* OTP Input */}
                                    <HStack spacing={3} justify="center" py={4}>
                                        <PinInput
                                            value={otp}
                                            onChange={setOtp}
                                            size="lg"
                                            otp
                                            autoFocus
                                            onComplete={handleVerifyOTP}
                                        >
                                            <PinInputField
                                                bg="#f5f5f7"
                                                border="2px solid #e5e5ea"
                                                borderRadius="xl"
                                                fontSize="2xl"
                                                fontWeight={700}
                                                color="#1d1d1f"
                                                w="56px"
                                                h="64px"
                                                _focus={{
                                                    borderColor: "#0071E3",
                                                    boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                                }}
                                            />
                                            <PinInputField
                                                bg="#f5f5f7"
                                                border="2px solid #e5e5ea"
                                                borderRadius="xl"
                                                fontSize="2xl"
                                                fontWeight={700}
                                                color="#1d1d1f"
                                                w="56px"
                                                h="64px"
                                                _focus={{
                                                    borderColor: "#0071E3",
                                                    boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                                }}
                                            />
                                            <PinInputField
                                                bg="#f5f5f7"
                                                border="2px solid #e5e5ea"
                                                borderRadius="xl"
                                                fontSize="2xl"
                                                fontWeight={700}
                                                color="#1d1d1f"
                                                w="56px"
                                                h="64px"
                                                _focus={{
                                                    borderColor: "#0071E3",
                                                    boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                                }}
                                            />
                                            <PinInputField
                                                bg="#f5f5f7"
                                                border="2px solid #e5e5ea"
                                                borderRadius="xl"
                                                fontSize="2xl"
                                                fontWeight={700}
                                                color="#1d1d1f"
                                                w="56px"
                                                h="64px"
                                                _focus={{
                                                    borderColor: "#0071E3",
                                                    boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                                }}
                                            />
                                            <PinInputField
                                                bg="#f5f5f7"
                                                border="2px solid #e5e5ea"
                                                borderRadius="xl"
                                                fontSize="2xl"
                                                fontWeight={700}
                                                color="#1d1d1f"
                                                w="56px"
                                                h="64px"
                                                _focus={{
                                                    borderColor: "#0071E3",
                                                    boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                                }}
                                            />
                                            <PinInputField
                                                bg="#f5f5f7"
                                                border="2px solid #e5e5ea"
                                                borderRadius="xl"
                                                fontSize="2xl"
                                                fontWeight={700}
                                                color="#1d1d1f"
                                                w="56px"
                                                h="64px"
                                                _focus={{
                                                    borderColor: "#0071E3",
                                                    boxShadow: "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                                }}
                                            />
                                        </PinInput>
                                    </HStack>

                                    <HStack spacing={3} w="full">
                                        <Button
                                            flex={1}
                                            h="56px"
                                            variant="outline"
                                            borderColor="#d2d2d7"
                                            color="#1d1d1f"
                                            fontSize="lg"
                                            fontWeight={700}
                                            borderRadius="xl"
                                            _hover={{ bg: "#f5f5f7" }}
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            flex={2}
                                            h="56px"
                                            bg="#0071E3"
                                            color="white"
                                            fontSize="lg"
                                            fontWeight={700}
                                            borderRadius="xl"
                                            _hover={{ bg: "#0051B3" }}
                                            _active={{ bg: "#003D8F" }}
                                            onClick={handleVerifyOTP}
                                            isLoading={isLoading}
                                            loadingText="Verifying..."
                                            isDisabled={otp.length !== 6}
                                        >
                                            Verify & Enable
                                        </Button>
                                    </HStack>
                                </VStack>
                            )}
                        </VStack>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MFAEnrollmentModal;
