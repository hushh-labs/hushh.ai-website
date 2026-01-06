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
    Alert,
    AlertIcon,
    AlertDescription,
    Spinner,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { LockIcon } from '@chakra-ui/icons';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const MFAVerificationModal = ({ isOpen, onClose, onSuccess, factorId, challengeId }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            setOtp('');
            setError('');
            setAttempts(0);
        }
    }, [isOpen]);

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const { default: authentication } = await import('../../../lib/auth/authentication');

            const { data, error: verifyError } = await authentication.mfa.verifyMFAChallenge(
                factorId,
                challengeId,
                otp
            );

            if (verifyError) {
                setAttempts(prev => prev + 1);
                setError(verifyError.message || 'Invalid code. Please try again.');
                setOtp('');

                toast({
                    title: 'Verification Failed',
                    description: 'Invalid code. Please check your authenticator app.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
                return;
            }

            toast({
                title: 'Verified! 🎉',
                description: 'Authentication successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });

            onSuccess && onSuccess(data);
            onClose();
        } catch (error) {
            console.error('Verification error:', error);
            setError('Failed to verify code. Please try again.');
            setOtp('');
            setAttempts(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        toast({
            title: 'Verification Cancelled',
            description: 'You can verify later from your account settings',
            status: 'info',
            duration: 4000,
            isClosable: true,
            position: 'top',
        });
        onClose();
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
                bg="blackAlpha.700"
                backdropFilter="blur(12px)"
            />
            <ModalContent
                bg="#ffffff"
                borderRadius="2xl"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.2)"
                border="1px solid #e5e5ea"
                overflow="hidden"
                my="auto"
            >
                <ModalHeader
                    bg="linear-gradient(135deg, #0071E3 0%, #5E5CE6 100%)"
                    color="white"
                    py={4}
                    fontSize="lg"
                    fontWeight={800}
                    textAlign="center"
                >
                    <HStack spacing={2} justify="center">
                        <Box fontSize="xl">🔐</Box>
                        <Text>2FA Verification</Text>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton color="white" top={3} right={3} />

                <ModalBody py={5} px={6}>
                    <VStack spacing={4} animation={`${fadeIn} 0.5s ease-out`}>
                        {/* Streamlined Header Text */}
                        <VStack spacing={1}>
                            <Text color="#1d1d1f" fontSize="lg" fontWeight={700} textAlign="center">
                                Enter Verification Code
                            </Text>
                            <Text color="#6e6e73" fontSize="xs" textAlign="center">
                                Enter the 6-digit code from your authenticator app
                            </Text>
                        </VStack>

                        {/* OTP Input - Compact */}
                        <VStack spacing={4} w="full">
                            <HStack
                                spacing={2}
                                justify="center"
                                animation={error ? `${shake} 0.5s ease-in-out` : 'none'}
                            >
                                <PinInput
                                    value={otp}
                                    onChange={(value) => {
                                        setOtp(value);
                                        setError('');
                                    }}
                                    size="md"
                                    otp
                                    autoFocus
                                    onComplete={handleVerifyOTP}
                                    isInvalid={!!error}
                                >
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="lg"
                                        fontSize="lg"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="40px"
                                        h="48px"
                                        _focus={{
                                            borderColor: error ? "#FF3B30" : "#0071E3",
                                            boxShadow: error
                                                ? "0 0 0 3px rgba(255, 59, 48, 0.1)"
                                                : "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                        }}
                                    />
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="lg"
                                        fontSize="lg"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="40px"
                                        h="48px"
                                        _focus={{
                                            borderColor: error ? "#FF3B30" : "#0071E3",
                                            boxShadow: error
                                                ? "0 0 0 3px rgba(255, 59, 48, 0.1)"
                                                : "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                        }}
                                    />
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="lg"
                                        fontSize="lg"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="40px"
                                        h="48px"
                                        _focus={{
                                            borderColor: error ? "#FF3B30" : "#0071E3",
                                            boxShadow: error
                                                ? "0 0 0 3px rgba(255, 59, 48, 0.1)"
                                                : "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                        }}
                                    />
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="lg"
                                        fontSize="lg"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="40px"
                                        h="48px"
                                        _focus={{
                                            borderColor: error ? "#FF3B30" : "#0071E3",
                                            boxShadow: error
                                                ? "0 0 0 3px rgba(255, 59, 48, 0.1)"
                                                : "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                        }}
                                    />
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="lg"
                                        fontSize="lg"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="40px"
                                        h="48px"
                                        _focus={{
                                            borderColor: error ? "#FF3B30" : "#0071E3",
                                            boxShadow: error
                                                ? "0 0 0 3px rgba(255, 59, 48, 0.1)"
                                                : "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                        }}
                                    />
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="lg"
                                        fontSize="lg"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="40px"
                                        h="48px"
                                        _focus={{
                                            borderColor: error ? "#FF3B30" : "#0071E3",
                                            boxShadow: error
                                                ? "0 0 0 3px rgba(255, 59, 48, 0.1)"
                                                : "0 0 0 3px rgba(0, 113, 227, 0.1)",
                                        }}
                                    />
                                </PinInput>
                            </HStack>

                            {/* Error Message */}
                            {error && (
                                <Text
                                    color="#FF3B30"
                                    fontSize="xs"
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                    {error}
                                </Text>
                            )}

                            {/* Action Buttons */}
                            <VStack spacing={2} w="full">
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
                                    onClick={handleVerifyOTP}
                                    isLoading={isLoading}
                                    loadingText="Verifying..."
                                    isDisabled={otp.length !== 6}
                                    leftIcon={<LockIcon boxSize={3} />}
                                >
                                    Verify Code
                                </Button>

                                <Button
                                    w="full"
                                    h="32px"
                                    variant="ghost"
                                    color="#6e6e73"
                                    fontSize="xs"
                                    fontWeight={500}
                                    borderRadius="lg"
                                    _hover={{ bg: "#f5f5f7" }}
                                    onClick={handleSkip}
                                >
                                    Cancel
                                </Button>
                            </VStack>

                            <Text color="#6e6e73" fontSize="xs" textAlign="center">
                                Codes refresh every 30 seconds
                            </Text>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MFAVerificationModal;
