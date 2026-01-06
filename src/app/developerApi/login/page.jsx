"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Toast,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import DeveloperBg from "../../_components/svg/developerApi/developerApiLoginBg.svg";
import BgLeftCircle from "../../_components/svg/developerApi/developerLoginLCircle.svg";
import BgTopRightCircle from "../../_components/svg/developerApi/developerLoginTRCircle.svg";
import BgRightCircle from "../../_components/svg/developerApi/developerLoginRCircle.svg";
import Image from "next/image";
import { EmailIcon } from "@chakra-ui/icons";
import { FiAlertCircle, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
// import { useSession, signIn, signOut } from "next-auth/react";
import GoogelIcon from "../../_components/svg/icons/googleIcon.svg";
import GithubIcon from "../../_components/svg/icons/githubIcon.svg";
import Loading from "../../_components/features/loading";
import { useApiKey } from "../../context/apiKeyContext";
import AppleIcon from "../../_components/svg/icons/appleIconLogo.svg";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { getCountryCallingCode } from "react-phone-number-input";
import authentication from '../../_components/authentication/authentication'

export default function LoginPage() {
  const { session, loading: authLoading } = useAuth();
  // const { data: session, status } = useSession();
  const { setApiKey } = useApiKey();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
  });

  const handleGoogleLogin = async () => {
    try {
      await authentication.googleSignIn()
      toast({
        title: "Google Sign-In Successful",
        description: "You have been signed in with Google.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // router.push("/developer-Api/on-boarding");
    } catch (error) {
      toast({
        title: "Google Sign-In Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAppleLogin = async () => {
    try {
      await authentication.appleSignIn(setEmail);
      toast({
        title: "Apple Sign-In Successful",
        description: "You have been signed in with Apple.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/developer-Api/on-boarding");
    } catch (error) {
      toast({
        title: "Apple Sign-In Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // ... existing code ...

  return (
    <div className="relative" style={{ overflow: "hidden", height: "100vh" }}>
      <Image
        src={BgLeftCircle}
        alt="BgLeftCircle"
        style={{ position: "absolute" }}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANII="
      />
      <Image
        src={BgRightCircle}
        alt="BgRightCircle"
        objectFit="cover"
        style={{ position: "absolute", width: "60%", height: "100%", right: 0 }}
        width={200}
        height={200}
      />
      <Image
        src={DeveloperBg}
        alt="DeveloperBg"
        style={{ position: "absolute" }}
      />
      {/* {loading && <Loading />} */}
      <main className=" flex items-center justify-center z-10 p-6">
        <Box
          zIndex={"10"}
          w={{ md: "lg", base: "100%" }}
          minH={"25rem"}
          borderRadius={"1.61rem"}
          background={"#1E1E1E"}
          p={{ md: "2.68rem", base: "1.34rem" }}
          mt={{ md: "6rem", base: "6rem" }}
          textAlign={"center"}
          display={"flex"}
          flexDirection={"column"}
          alignContent={"space-between"}
        >
          <Text
            color={"#CBCBCB"}
            fontSize={{ md: "1.65rem", base: "1.15rem" }}
            fontWeight={"700"}
            mb={{ md: "1.25rem", base: "1rem" }}
            as={'h1'}
          >
            {" "}
            Get your account ready for Hushh{" "}
          </Text>

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={handleGoogleLogin}
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)",
            }}
          >
            <Image src={GoogelIcon} alt="GoogelIcon" />
            Continue with Google
          </Button>

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={handleAppleLogin}
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)",
            }}
          >
            <Image src={AppleIcon} alt="AppleIcon" />
            Continue with Apple
          </Button>

          <HStack my={{ md: "1rem", base: "0.5rem" }}>
            <Divider />
            <Text
              color={"#3F434A"}
              fontWeight={"400"}
              fontSize={{ md: "0.87rem", base: "0.6rem" }}
            >
              Or
            </Text>
            <Divider />
          </HStack>

          {/* ... existing form and other components ... */}

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={() => router.push('/developer-Api/on-boarding')}
            w={"100%"}
            background="linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)"
            mb={{ md: "1.25rem", base: "0.75rem" }}
          >
            Get Started
          </Button>

          <Text
            fontWeight={"400"}
            lineHeight={"18px"}
            fontSize={{ md: "sm", base: "xs" }}
            color={"white"}
          >
            By continuing, you're agreeing to our{" "}
            <a href="/legal/termsofuse" style={{ textDecoration: "underline" }}>
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/legal/privacypolicy"
              style={{ textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </Text>
        </Box>
      </main>
    </div>
  );
}