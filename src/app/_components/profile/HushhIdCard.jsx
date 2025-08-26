"use client";
import React, { useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";

const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || "";
  return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
};

const buildPassUrl = ({ hushhId, name }) => {
  const params = new URLSearchParams();
  if (hushhId) params.set("hushh_id", hushhId);
  if (name) params.set("name", name);
  return `/api/wallet/pass?${params.toString()}`;
};

const HushhIdCard = ({ fullName, hushhId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const passUrl = useMemo(() => buildPassUrl({ hushhId, name: fullName }), [hushhId, fullName]);

  const handleAddToAppleWallet = () => {
    if (isIOS()) {
      window.location.href = passUrl;
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Box
        borderRadius={{ base: "16px", md: "20px" }}
        bg="white"
        color="#111"
        p={{ base: 4, md: 6 }}
        w="full"
        border="1px solid rgba(0,0,0,0.06)"
        boxShadow="sm"
      >
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="center">
            <Heading size={{ base: "sm", md: "md" }} color="#111">Hushh ID</Heading>
            <Badge bg="rgba(0,122,255,0.12)" color="#007AFF" borderRadius="full" px={3} py={1} fontSize="xs">Private by Design</Badge>
          </HStack>

          <Box
            borderRadius="14px"
            bg="#F2F2F7"
            p={{ base: 3, md: 4 }}
          >
            <VStack align="stretch" spacing={3}>
              <Text fontSize={{ base: "sm", md: "md" }} color="rgba(0,0,0,0.6)">Name</Text>
              <Heading size={{ base: "md", md: "lg" }} color="#111">
                {fullName || "User"}
              </Heading>
              <HStack spacing={2}>
                <Text fontSize="sm" color="rgba(0,0,0,0.6)">Hushh ID:</Text>
                <Badge bg="white" border="1px solid rgba(0,0,0,0.08)" color="#111" fontFamily="mono" fontSize="xs" px={2} py={1}>
                  {hushhId || "N/A"}
                </Badge>
              </HStack>
            </VStack>
          </Box>

          <HStack align="center" justify="space-between">
            <Text fontSize="xs" color="rgba(0,0,0,0.6)">Scan to verify</Text>
            <Box bg="white" p={2} borderRadius="md" border="1px solid rgba(0,0,0,0.06)">
              <QRCode value={hushhId || ""} size={72} fgColor="#000000" bgColor="#ffffff" />
            </Box>
          </HStack>

          <Button
            onClick={handleAddToAppleWallet}
            bg="#007AFF"
            color="white"
            _hover={{ bg: "#0070F3" }}
            borderRadius="full"
            size={{ base: "md", md: "lg" }}
            w="full"
          >
            Add to Apple Wallet
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add on your iPhone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Scan this QR with your iPhone camera to add your Hushh ID to Apple Wallet.
              </Text>
              <Box bg="white" p={4} borderRadius="md" border="1px solid #eee">
                <QRCode value={passUrl} size={180} fgColor="#000000" bgColor="#ffffff" />
              </Box>
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Or open this page on iOS Safari and tap the button.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HushhIdCard;


