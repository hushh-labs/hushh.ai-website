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
            size="lg"
            closeOnOverlayClick={false}
            isCentered
        >
            <ModalOverlay
                bg="blackAlpha.700"
                backdropFilter="blur(12px)"
            />
            <ModalContent
                bg="#ffffff"
                borderRadius="3xl"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.2)"
                border="1px solid #e5e5ea"
                overflow="hidden"
            >
                <ModalHeader
                    bg="linear-gradient(135deg, #0071E3 0%, #5E5CE6 100%)"
                    color="white"
                    py={6}
                    fontSize="xl"
                    fontWeight={800}
                    textAlign="center"
                >
                    <VStack spacing={2}>
                        <Box fontSize="3xl">🔐</Box>
                        <Text>Two-Factor Authentication</Text>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton color="white" top={4} right={4} />

                <ModalBody py={10} px={8}>
                    <VStack spacing={8} animation={`${fadeIn} 0.5s ease-out`}>
                        {/* Instructions */}
                        <Alert
                            status="info"
                            borderRadius="xl"
                            bg="#f0f9ff"
                            border="1px solid #bfdbfe"
                        >
                            <AlertIcon color="#0071E3" />
                            <AlertDescription color="#1d1d1f" fontSize="sm">
                                Open your authenticator app and enter the 6-digit code for Hushh
                            </AlertDescription>
                        </Alert>

                        {/* Title */}
                        <VStack spacing={2}>
                            <Text color="#1d1d1f" fontSize="2xl" fontWeight={800} textAlign="center">
                                Enter Verification Code
                            </Text>
                            <Text color="#6e6e73" fontSize="md" textAlign="center">
                                This adds an extra layer of security to your account
                            </Text>
                        </VStack>

                        {/* OTP Input */}
                        <VStack spacing={4} w="full">
                            <HStack
                                spacing={3}
                                justify="center"
                                animation={error ? `${shake} 0.5s ease-in-out` : 'none'}
                            >
                                <PinInput
                                    value={otp}
                                    onChange={(value) => {
                                        setOtp(value);
                                        setError('');
                                    }}
                                    size="lg"
                                    otp
                                    autoFocus
                                    onComplete={handleVerifyOTP}
                                    isInvalid={!!error}
                                >
                                    <PinInputField
                                        bg="#f5f5f7"
                                        border="2px solid"
                                        borderColor={error ? "#FF3B30" : "#e5e5ea"}
                                        borderRadius="xl"
                                        fontSize="2xl"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="56px"
                                        h="64px"
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
                                        borderRadius="xl"
                                        fontSize="2xl"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="56px"
                                        h="64px"
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
                                        borderRadius="xl"
                                        fontSize="2xl"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="56px"
                                        h="64px"
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
                                        borderRadius="xl"
                                        fontSize="2xl"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="56px"
                                        h="64px"
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
                                        borderRadius="xl"
                                        fontSize="2xl"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="56px"
                                        h="64px"
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
                                        borderRadius="xl"
                                        fontSize="2xl"
                                        fontWeight={700}
                                        color="#1d1d1f"
                                        w="56px"
                                        h="64px"
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
                                    fontSize="sm"
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                    {error}
                                </Text>
                            )}

                            {/* Attempts Warning */}
                            {attempts >= 3 && (
                                <Alert
                                    status="warning"
                                    borderRadius="xl"
                                    bg="#fff9e6"
                                    border="1px solid #ffd60a"
                                >
                                    <AlertIcon color="#ffd60a" />
                                    <AlertDescription color="#1d1d1f" fontSize="sm">
                                        Multiple failed attempts. Please check your authenticator app.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </VStack>

                        {/* Action Buttons */}
                        <VStack spacing={3} w="full">
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
                                onClick={handleVerifyOTP}
                                isLoading={isLoading}
                                loadingText="Verifying..."
                                isDisabled={otp.length !== 6}
                                leftIcon={<LockIcon />}
                            >
                                Verify Code
                            </Button>

                            <Button
                                w="full"
                                h="48px"
                                variant="ghost"
                                color="#6e6e73"
                                fontSize="md"
                                fontWeight={600}
                                borderRadius="xl"
                                _hover={{ bg: "#f5f5f7" }}
                                onClick={handleSkip}
                            >
                                Cancel
                            </Button>
                        </VStack>

                        {/* Help Text */}
                        <Box
                            p={4}
                            bg="#f5f5f7"
                            borderRadius="xl"
                            border="1px solid #e5e5ea"
                            w="full"
                        >
                            <Text color="#6e6e73" fontSize="sm" textAlign="center" lineHeight="1.6">
                                💡 <strong>Tip:</strong> Codes refresh every 30 seconds. If a code doesn't work, wait for the next one.
                            </Text>
                        </Box>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MFAVerificationModal;
