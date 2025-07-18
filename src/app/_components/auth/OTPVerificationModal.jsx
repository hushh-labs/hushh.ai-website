"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  PinInput,
  PinInputField,
  VStack,
  HStack,
  Icon,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FiShield, FiRefreshCw } from "react-icons/fi";

const OTPVerificationModal = ({
  isOpen,
  onClose,
  phoneNumber,
  onVerify,
  onResend,
  isLoading = false,
  isResending = false,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const toast = useToast();

  const handleVerify = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the complete 6-digit verification code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsVerifying(true);
    try {
      await onVerify(otpCode);
      setOtpCode("");
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      await onResend();
      setOtpCode("");
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your phone.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Resend error:", error);
    }
  };

  const handleClose = () => {
    setOtpCode("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={3}>
            <Icon as={FiShield} color="blue.500" />
            <Text>Verify Your Phone Number</Text>
          </HStack>
        </ModalHeader>
        
        <ModalBody>
          <VStack spacing={6}>
            <Text fontSize="md" textAlign="center" color="gray.600">
              We have sent a 6-digit verification code to:
            </Text>
            
            <Text fontSize="lg" fontWeight="600" color="gray.800">
              {phoneNumber}
            </Text>
            
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Enter the code below to verify your phone number
            </Text>
            
            <VStack spacing={4} w="full">
              <HStack spacing={3} justify="center">
                <PinInput
                  size="lg"
                  value={otpCode}
                  onChange={(value) => setOtpCode(value)}
                  onComplete={handleVerify}
                  otp
                  autoFocus
                  placeholder=""
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              
              {isVerifying && (
                <HStack spacing={2}>
                  <Spinner size="sm" />
                  <Text fontSize="sm" color="gray.500">
                    Verifying...
                  </Text>
                </HStack>
              )}
            </VStack>
          </VStack>
        </ModalBody>
        
        <ModalFooter>
          <VStack spacing={3} w="full">
            <HStack spacing={3} w="full">
              <Button variant="ghost" onClick={handleClose} flex={1}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleVerify}
                isLoading={isVerifying || isLoading}
                loadingText="Verifying"
                flex={2}
              >
                Verify Code
              </Button>
            </HStack>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleResend}
              isLoading={isResending}
              loadingText="Sending"
              leftIcon={<Icon as={FiRefreshCw} />}
              w="full"
            >
              Resend Code
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OTPVerificationModal; 