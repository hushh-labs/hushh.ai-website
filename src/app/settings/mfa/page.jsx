"use client";
import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Button,
    Container,
    useToast,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Badge,
    Divider,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Switch,
    useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, WarningIcon, LockIcon } from '@chakra-ui/icons';
import MFAEnrollmentModal from '../../_components/auth/MFAEnrollmentModal';
import ContentWrapper from '../../_components/layout/ContentWrapper';

const MFASettingsPage = () => {
    const { user, isAuthenticated, loading, mfaFactors, refreshMFAStatus } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const [isLoadingFactors, setIsLoadingFactors] = useState(true);
    const [factors, setFactors] = useState([]);
    const [isRemoving, setIsRemoving] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=/settings/mfa');
        }
    }, [isAuthenticated, loading, router]);

    useEffect(() => {
        if (isAuthenticated) {
            loadMFAFactors();
        }
    }, [isAuthenticated]);

    const loadMFAFactors = async () => {
        setIsLoadingFactors(true);
        try {
            const { default: authentication } = await import('../../../lib/auth/authentication');
            const { data, error } = await authentication.mfa.getMFAFactors();

            if (error) {
                console.error('Error loading MFA factors:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load MFA settings',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
                return;
            }

            setFactors(data || []);
        } catch (error) {
            console.error('Exception loading MFA factors:', error);
        } finally {
            setIsLoadingFactors(false);
        }
    };

    const handleRemoveMFA = async (factorId) => {
        if (!confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
            return;
        }

        setIsRemoving(true);
        try {
            const { default: authentication } = await import('../../../lib/auth/authentication');
            const { error } = await authentication.mfa.unenrollMFA(factorId);

            if (error) {
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to remove MFA',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
                return;
            }

            toast({
                title: 'MFA Disabled',
                description: 'Two-factor authentication has been removed from your account',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });

            await loadMFAFactors();
            await refreshMFAStatus();
        } catch (error) {
            console.error('Exception removing MFA:', error);
            toast({
                title: 'Error',
                description: 'Failed to remove MFA',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setIsRemoving(false);
        }
    };

    const handleEnrollmentSuccess = async () => {
        await loadMFAFactors();
        await refreshMFAStatus();
        onClose();
        toast({
            title: 'Success! 🎉',
            description: 'Two-factor authentication has been enabled',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
        });
    };

    if (loading || !isAuthenticated) {
        return (
            <Box minH="100vh" bg="#ffffff" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={6}>
                    <Spinner size="xl" color="#0071E3" thickness="4px" />
                    <Text color="#1d1d1f" fontSize="lg" fontWeight={500}>
                        Loading...
                    </Text>
                </VStack>
            </Box>
        );
    }

    const verifiedFactors = factors.filter(f => f.status === 'verified');
    const hasMFA = verifiedFactors.length > 0;

    return (
        <ContentWrapper includeHeaderSpacing={true}>
            <Container maxW="container.md" py={12}>
                <VStack spacing={8} align="stretch">
                    {/* Header */}
                    <VStack spacing={4} align="start">
                        <HStack spacing={3}>
                            <Box fontSize="3xl">🔐</Box>
                            <Heading size="xl" color="#1d1d1f" fontWeight={800}>
                                Two-Factor Authentication
                            </Heading>
                        </HStack>
                        <Text color="#6e6e73" fontSize="lg">
                            Add an extra layer of security to your account by requiring a verification code in addition to your password.
                        </Text>
                    </VStack>

                    {/* Status Card */}
                    <Card
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor={hasMFA ? "#34C759" : "#FF9500"}
                        bg={hasMFA ? "#f0fdf4" : "#fff9e6"}
                        boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                    >
                        <CardBody p={6}>
                            <HStack spacing={4} align="start">
                                {hasMFA ? (
                                    <CheckCircleIcon color="#34C759" fontSize="2xl" />
                                ) : (
                                    <WarningIcon color="#FF9500" fontSize="2xl" />
                                )}
                                <VStack align="start" spacing={2} flex={1}>
                                    <HStack>
                                        <Text fontSize="xl" fontWeight={700} color="#1d1d1f">
                                            {hasMFA ? 'MFA Enabled' : 'MFA Not Enabled'}
                                        </Text>
                                        <Badge
                                            colorScheme={hasMFA ? 'green' : 'orange'}
                                            fontSize="sm"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                        >
                                            {hasMFA ? 'Protected' : 'Vulnerable'}
                                        </Badge>
                                    </HStack>
                                    <Text color="#6e6e73" fontSize="md">
                                        {hasMFA
                                            ? 'Your account is protected with two-factor authentication'
                                            : 'Enable MFA to secure your account with an additional verification step'}
                                    </Text>
                                </VStack>
                            </HStack>
                        </CardBody>
                    </Card>

                    {/* MFA Factors */}
                    {isLoadingFactors ? (
                        <Box py={8} textAlign="center">
                            <Spinner size="lg" color="#0071E3" />
                        </Box>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {verifiedFactors.length > 0 ? (
                                <>
                                    <Text fontSize="lg" fontWeight={700} color="#1d1d1f">
                                        Active Authenticators
                                    </Text>
                                    {verifiedFactors.map((factor) => (
                                        <Card
                                            key={factor.id}
                                            borderRadius="xl"
                                            border="1px solid #e5e5ea"
                                            bg="#ffffff"
                                            boxShadow="0 2px 8px rgba(0, 0, 0, 0.04)"
                                        >
                                            <CardBody p={5}>
                                                <HStack justify="space-between">
                                                    <HStack spacing={4}>
                                                        <Box
                                                            w="48px"
                                                            h="48px"
                                                            borderRadius="xl"
                                                            bg="#f5f5f7"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <LockIcon color="#0071E3" fontSize="xl" />
                                                        </Box>
                                                        <VStack align="start" spacing={1}>
                                                            <Text fontSize="md" fontWeight={700} color="#1d1d1f">
                                                                {factor.friendly_name || 'Authenticator App'}
                                                            </Text>
                                                            <Text fontSize="sm" color="#6e6e73">
                                                                TOTP • Created {new Date(factor.created_at).toLocaleDateString()}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="red"
                                                        variant="outline"
                                                        onClick={() => handleRemoveMFA(factor.id)}
                                                        isLoading={isRemoving}
                                                        borderRadius="lg"
                                                    >
                                                        Remove
                                                    </Button>
                                                </HStack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </>
                            ) : (
                                <Alert
                                    status="info"
                                    borderRadius="xl"
                                    bg="#f0f9ff"
                                    border="1px solid #bfdbfe"
                                >
                                    <AlertIcon color="#0071E3" />
                                    <Box>
                                        <AlertTitle color="#1d1d1f" fontSize="md">
                                            No Authenticators Configured
                                        </AlertTitle>
                                        <AlertDescription color="#6e6e73" fontSize="sm">
                                            Set up an authenticator app to enable two-factor authentication
                                        </AlertDescription>
                                    </Box>
                                </Alert>
                            )}
                        </VStack>
                    )}

                    <Divider />

                    {/* Actions */}
                    <VStack spacing={4} align="stretch">
                        {!hasMFA && (
                            <Button
                                size="lg"
                                bg="#0071E3"
                                color="white"
                                fontSize="lg"
                                fontWeight={700}
                                borderRadius="xl"
                                h="56px"
                                _hover={{ bg: "#0051B3" }}
                                _active={{ bg: "#003D8F" }}
                                onClick={onOpen}
                                leftIcon={<LockIcon />}
                            >
                                Enable Two-Factor Authentication
                            </Button>
                        )}

                        {/* Security Tips */}
                        <Card
                            borderRadius="xl"
                            border="1px solid #e5e5ea"
                            bg="#f5f5f7"
                        >
                            <CardBody p={5}>
                                <VStack align="start" spacing={3}>
                                    <Text fontSize="md" fontWeight={700} color="#1d1d1f">
                                        💡 Security Tips
                                    </Text>
                                    <VStack align="start" spacing={2} pl={4}>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Use apps like Google Authenticator, Microsoft Authenticator, or Authy
                                        </Text>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Keep your authenticator app updated
                                        </Text>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Store backup codes in a secure location
                                        </Text>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Never share your verification codes with anyone
                                        </Text>
                                    </VStack>
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>
                </VStack>

                {/* MFA Enrollment Modal */}
                <MFAEnrollmentModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={handleEnrollmentSuccess}
                />
            </Container>
        </ContentWrapper>
    );
};

export default MFASettingsPage;
