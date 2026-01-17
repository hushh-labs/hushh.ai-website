"use client";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiShare2 } from "react-icons/ci";
import { QRCode } from "react-qrcode-logo";
import { useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

const qrCodePage = () => {
  const router = useRouter();
  const toast = useToast();
  const [qrValue, setQrValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        setIsLoading(true);
        // Attempt to get user from localStorage which is set after profile creation
        const storedUser = localStorage.getItem('hushh_user_profile');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const identifier = user.user_id || user.userId;
          if (identifier) {
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            setQrValue(`${origin}/p/${identifier}`);
          }
        } else {
          // Fallback: If not in localstorage, maybe we can't show it yet
          setQrValue(window.location.origin + "/p/guest");
        }
      } catch (err) {
        console.error("Error loading QR data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleShare = () => {
    if (navigator.share && qrValue) {
      navigator
        .share({
          title: "My Hushh Profile",
          text: "Scan to view my profile!",
          url: qrValue,
        })
        .then(() => {
          toast({
            title: "Shared successfully",
            status: "success",
            duration: 3000,
          });
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(qrValue);
      toast({ title: "Link copied to clipboard", status: "info" });
    }
  };

  return (
    <>
      <Box
        fontFamily={"Poppins"}
        bg="black"
        minH="100vh"
        p={4}
        color="white"
        position={"relative"}
        mt={"1rem"}
        zIndex={"999999999"}
      >
        <Button
          onClick={() => router.push("/vivaConnect")}
          leftIcon={<ArrowBackIcon color={"#FFFFFF"} />}
          bg={"transparent"}
          color={"#FFFFFF"}
          m={0}
          _hover={{
            color: 'white',
            bg: '#1B1B1B'
          }}
        >
          Back
        </Button>
        <VStack spacing={8} mt={"4rem"}>
          <Box
            bg={"#1B1B1B"}
            p={"2rem"}
            borderRadius={"20px"}
            textAlign={"center"}
            display={"flex"}
            flexDirection={"column"}
            alignItems="center"
            boxShadow="0 10px 30px rgba(0,0,0,0.5)"
            border="1px solid rgba(255,255,255,0.1)"
          >
            {isLoading ? (
              <StackDivider h="256px" display="flex" alignItems="center"><Text>Loading...</Text></StackDivider>
            ) : qrValue ? (
              <Box p={4} bg="white" borderRadius="xl">
                <QRCode
                  value={qrValue}
                  size={200}
                  logoImage="/hushh-logo.png" // Optional
                  logoWidth={50}
                  qrStyle="dots"
                  eyeRadius={10}
                />
              </Box>
            ) : (
              <Text>No profile data found.</Text>
            )}

            <Text
              mt={"1.5rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              align={"center"}
              color={"#949494"}
              maxW="250px"
            >
              Scan to view your digital profile and network
            </Text>
          </Box>
          <Button
            leftIcon={<CiShare2 size={20} />}
            bg="white"
            color="black"
            onClick={handleShare}
            borderRadius="full"
            px={8}
            _hover={{ transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
            Share Profile Link
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default qrCodePage;
