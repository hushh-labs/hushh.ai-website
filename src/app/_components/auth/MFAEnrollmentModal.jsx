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
            size="xl"
            closeOnOverlayClick={false}
            isCentered
        >
            <ModalOverlay
                bg="blackAlpha.600"
                backdropFilter="blur(10px)"
            />
            <ModalContent
                bg="#ffffff"
                borderRadius="3xl"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.15)"
                border="1px solid #e5e5ea"
                overflow="hidden"
            >
                <ModalHeader
                    bg="linear-gradient(135deg, #0071E3 0%, #BB62FC 100%)"
                    color="white"
                    py={6}
                    fontSize="2xl"
                    fontWeight={800}
                    textAlign="center"
                >
                    🔐 Enable Two-Factor Authentication
                </ModalHeader>
                <ModalCloseButton color="white" top={4} right={4} />

                <ModalBody py={8} px={8}>
                    {isEnrolling ? (
                        <VStack spacing={6} py={10}>
                            <Spinner size="xl" color="#0071E3" thickness="4px" />
                            <Text color="#6e6e73" fontSize="lg">
                                Setting up your authenticator...
                            </Text>
                        </VStack>
                    ) : (
                        <VStack spacing={6} animation={`${fadeIn} 0.5s ease-out`}>
                            {/* Step Indicator */}
                            <HStack spacing={4} w="full" justify="center">
                                <HStack spacing={2}>
                                    <Box
                                        w="32px"
                                        h="32px"
                                        borderRadius="full"
                                        bg={step >= 1 ? "#0071E3" : "#e5e5ea"}
                                        color="white"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontWeight={700}
                                        transition="all 0.3s"
                                    >
                                        {step > 1 ? <CheckCircleIcon /> : "1"}
                                    </Box>
                                    <Text color="#1d1d1f" fontWeight={600}>Scan QR</Text>
                                </HStack>
                                <Box w="40px" h="2px" bg={step >= 2 ? "#0071E3" : "#e5e5ea"} transition="all 0.3s" />
                                <HStack spacing={2}>
                                    <Box
                                        w="32px"
                                        h="32px"
                                        borderRadius="full"
                                        bg={step >= 2 ? "#0071E3" : "#e5e5ea"}
                                        color="white"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontWeight={700}
                                        transition="all 0.3s"
                                    >
                                        2
                                    </Box>
                                    <Text color="#1d1d1f" fontWeight={600}>Verify</Text>
                                </HStack>
                            </HStack>

                            <Divider />

                            {step === 1 && (
                                <VStack spacing={6} w="full">
                                    <Alert
                                        status="info"
                                        borderRadius="xl"
                                        bg="#f0f9ff"
                                        border="1px solid #bfdbfe"
                                    >
                                        <AlertIcon color="#0071E3" />
                                        <Box>
                                            <AlertTitle color="#1d1d1f" fontSize="md">
                                                Download an Authenticator App
                                            </AlertTitle>
                                            <AlertDescription color="#6e6e73" fontSize="sm">
                                                Use Google Authenticator, Microsoft Authenticator, or any TOTP app
                                            </AlertDescription>
                                        </Box>
                                    </Alert>

                                    {/* QR Code */}
                                    <VStack spacing={4}>
                                        <Text color="#1d1d1f" fontSize="lg" fontWeight={700}>
                                            Step 1: Scan this QR Code
                                        </Text>
                                        <Box
                                            p={6}
                                            bg="white"
                                            borderRadius="2xl"
                                            border="2px solid #e5e5ea"
                                            boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
                                        >
                                            {qrCode && (
                                                <QRCodeSVG
                                                    value={qrCode}
                                                    size={220}
                                                    level="H"
                                                    includeMargin={true}
                                                />
                                            )}
                                        </Box>
                                    </VStack>

                                    {/* Manual Entry */}
                                    <VStack spacing={3} w="full">
                                        <Text color="#6e6e73" fontSize="sm" fontWeight={600}>
                                            Or enter this code manually:
                                        </Text>
                                        <HStack
                                            w="full"
                                            p={4}
                                            bg="#f5f5f7"
                                            borderRadius="xl"
                                            border="1px solid #e5e5ea"
                                            justify="space-between"
                                        >
                                            <Code
                                                colorScheme="gray"
                                                fontSize="md"
                                                fontWeight={600}
                                                bg="transparent"
                                                color="#1d1d1f"
                                                letterSpacing="2px"
                                            >
                                                {secret}
                                            </Code>
                                            <Button
                                                size="sm"
                                                leftIcon={copied ? <CheckCircleIcon /> : <CopyIcon />}
                                                onClick={handleCopySecret}
                                                bg={copied ? "#34C759" : "#0071E3"}
                                                color="white"
                                                _hover={{ opacity: 0.9 }}
                                                borderRadius="lg"
                                            >
                                                {copied ? 'Copied' : 'Copy'}
                                            </Button>
                                        </HStack>
                                    </VStack>

                                    <Button
                                        w="full"
                                        h="56px"
                                        bg="#0071E3"
                                        color="white"
                                        fontSize="lg"
                                        fontWeight={700}
                                        borderRadius="xl"
                                        _hover={{ bg: "#0051B3" }}
                                        _active={{ bg: "#003D8F" }}
                                        onClick={() => setStep(2)}
                                    >
                                        Continue to Verification
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
