"use client";
import React, { useRef, useState, useEffect } from "react";
import HushhHeaderLogo from "./svg/hushhHeaderLogo";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Box, Button, Container,VStack, Flex, Text, Badge, Divider, HStack } from "@chakra-ui/react";
import { useResponsiveSizes } from "../context/responsive";
import { Bars3Icon } from "./svg/icons/hamburgerMenuIcon";
import { CloseMenuIcon } from "./svg/icons/closeMenuIcon";
import SearchBar from "./features/searchBar";
import { ChevronArrowIcon } from "./svg/icons/chevronArrowIcon";
import HushhWalletIcon from "./svg/hushhWalletIcon";
import HushhButtonIcon from "./svg/hushhButton";
import VibeSearchIcon from "./svg/vibeSearch";
import ChromeExtentionLogo from "./svg/ChromeExtensionLogo";
import ConciergeApp from "./svg/conciergeApp";
import { usePathname, useRouter } from 'next/navigation'
import ValetChat from "./svg/valetChat";
import VibeSearchApi from "./svg/vibeSearchApi";
import { headerAssets } from "./svg/icons/HeaderIcons/headerAssets";
import { animateScroll as scroll } from "react-scroll";
import { FiUser, FiYoutube } from 'react-icons/fi';
import { useMediaQuery } from "react-responsive";
import SmallVibeSearch from "./svg/smallVibeSearch.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@chakra-ui/react';
import Image from "next/image";
import { ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import UnicodeQR from "./svg/onelinkQrdownload.svg"
import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./auth/UserAvatar";
import HushhNewLogo from "../../../public/svgs/hushh_new_logo.svg"


export default function Header({backgroundColor, textColor, borderBottom}) {

  const { isTablet, isDesktop } = useResponsiveSizes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productsSubmenu, setProductsSubmenu] = useState(false);
  const [productsSubmenuMobile, setProductsSubmenuMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerBackground, setHeaderBackground] = useState("transparent");
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For the dropdown
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");

  const noHeaderPaths = ['/vivaConnect', '/viva-connect', '/viva-connect/qrPage', '/qrCodePage'];
  const isCareerPage = pathname === '/career';
  const shouldShowHeader = !noHeaderPaths.includes(pathname);
  const notify = () => toast("This Product is Coming Soon!");
  const isJobDetailPage = pathname ===  "/job/";
  const isMobileScreen = useMediaQuery({ maxWidth: 768 });
  
  // Auth context
  const { isAuthenticated, user, loading, signOut } = useAuth();
  const toast = useToast();
  const [userExists, setUserExists] = useState(null); // null = loading, true = exists, false = doesn't exist

  // Check if user exists in the system
  const checkUserExists = async () => {
    try {
      const response = await fetch(`https://hushh-api-53407187172.us-central1.run.app/api/check-user?email=${user.email}`);
      
      if (response.ok) {
        const data = await response.json();
        // Check if user exists based on the API response message
        return data.message === "User exists";
      }
      return false;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  // Check user existence when component mounts or user changes
  useEffect(() => {
    if (user?.email) {
      checkUserExists().then(exists => {
        setUserExists(exists);
      });
    }
  }, [user?.email]);

  // Handle sign out for mobile
  const handleSignOut = async () => {
    try {
      // Reset user existence state immediately
      setUserExists(null);
      
      // Close mobile menu immediately
      setIsMenuOpen(false);
      
      // Sign out
      await signOut();
      
      // Navigate to home page immediately
      router.push('/');
      
      // Show success toast after navigation
      setTimeout(() => {
        toast({
          title: "✅ Signed out successfully",
          description: "You have been signed out of your account.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }, 100);
      
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out error",
        description: "There was an error signing out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const { data } = await supabase.auth.getSession(); // Get the session data

  //     console.log('data:',data);
  //     console.log('user email: ',data?.session?.user?.email);

  //     if (data.session) {
  //       setIsLoggedIn(true); 
  //       const { data: userIdentities } = await supabase.auth.getUserIdentities();
  //       if (userIdentities) {
  //         const userIdentity = userIdentities.identities[0]; 
  //         const email = userIdentity.email; 
  //         setUserEmail(email); 
  //       }
  //     } else {
  //       setIsLoggedIn(false); 
  //     }
  //    console.log('Is LoggedIn: ',isLoggedIn)
  //   };
  //   checkLoginStatus(); 
  // }, [supabase]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };
  
  const handleOpenModal = (link) => {
    setCurrentQRLink(link);
    setIsModalOpen(true);
  };
  
  const scrollToContactForm = () => {
    window.scrollTo({
      top: document.getElementById("contact-form").offsetTop,
      behavior: "smooth",
    });
  };

  const handleDownloadClick = () => {
    console.log('Download clicked')
    if (isAndroid) {
      window.location.href = "https://bit.ly/hushh-wallet-play-store";
    } else if (isIOS) {
      window.location.href = "https://bit.ly/hushh-app-ios";
    } else {
      handleOpenModal();
    }
  };

  useEffect(() => {
    // Set header background based on props or default to black
    setHeaderBackground(backgroundColor || "black");
  }, [backgroundColor]);

  const scrollTo = () => {
    scroll.scrollTo(7500);
  };

  const scrollInMobile = () => {
    scroll.scrollTo(3350);
  };

  const handleMenuIconToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';  // Disable scroll
    } else {
      document.body.style.overflow = '';  // Reset scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';  // Reset scroll when the component is unmounted
    };
  }, [isMenuOpen]);

  const handleMenuClick = (url) => {
    router.push(url);
    setIsOpen(false);
    setProductsSubmenu(false);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  
  const handleSubmenuClick = () => {
    setProductsSubmenuMobile(false);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    window.open("https://hushh-button.vercel.app/user/login", "_blank");
  };

  const handleLinkClick = () => {
    // Close menu when any link is clicked
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Log mobile detection values for debugging
    console.log("Mobile detection values:", { 
      isMobile, 
      isTablet, 
      isTabletOrMobile, 
      isMobileScreen,
      innerWidth: typeof window !== 'undefined' ? window.innerWidth : null
    });
  }, [isMobile, isTablet, isTabletOrMobile, isMobileScreen]);

  return (
    <>
      {shouldShowHeader && (
        <div
          className="w-full z-1000 transition-all duration-300"
          style={{
            background: isJobDetailPage ? "black" : headerBackground,
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            borderBottom: borderBottom || "none",
            backdropFilter: backgroundColor && backgroundColor.includes("rgba") ? "blur(10px)" : "none",
          }}
        >
          <div className="flex items-center justify-between w-full px-3 py-2 z-1000 md:px-16 md:py-5">
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  {pathname === '/' || pathname === '/consent-ai-protocol' ? (
                    <Image src={HushhNewLogo} alt="Hushh Logo" width={120} height={40} priority />
                  ) : (
                    <HushhHeaderLogo />
                  )}
                </Link>
              </div>

              {/* Desktop Menu & Auth */}
              <div className="hidden md:flex items-center justify-end flex-1">
                <div 
                  className="flex gap-12 px-7 md:gap-10 text-md"
                  style={{ color: textColor || "white" }}
                >
                  <Link
                    href="/about"
                    className={`flex items-center gap-2 group link ${pathname === '/about' ? 'gradient-text' : ''}`}
                    onMouseEnter={() => setProductsSubmenu(false)}
                  >
                    ABOUT US
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 group"
                    onMouseEnter={() => setProductsSubmenu(true)}
                  >
                    PRODUCTS
                    <ChevronArrowIcon className="group-hover:rotate-0 rotate-180 transition-all duration-300" />
                  </Link>
                  <Link
                    href="/career"
                    className={`flex items-center gap-2 group link ${pathname === '/career' ? 'gradient-text' : ''}`}
                    onMouseEnter={() => setProductsSubmenu(false)}
                  >
                    CAREERS
                  </Link>
                  <Link
                    href="/hushhBlogs"
                    className={`flex items-center gap-2 group link ${pathname === '/hushhBlogs' ? 'gradient-text' : ''}`}
                    onMouseEnter={() => setProductsSubmenu(false)}
                  >
                    BLOGS
                  </Link>
                  <Link
                    href="/contact-us"
                    onMouseEnter={() => setProductsSubmenu(false)}
                    className={`flex items-center gap-2 group link ${pathname === '/contact-us' ? 'gradient-text' : ''}`}
                  >
                    CONTACT US
                  </Link>
                  <Link
                    href="/solutions"
                    onMouseEnter={() => setProductsSubmenu(false)}
                    className={`flex items-center gap-2 group link ${pathname === '/solutions' ? 'gradient-text' : ''}`}
                  >
                    SOLUTIONS
                  </Link>
                  <Link
                    href="/hushh-press"
                    onMouseEnter={() => setProductsSubmenu(false)}
                    className={`flex items-center gap-2 group link ${pathname === '/hushh-press' ? 'gradient-text' : ''}`}
                  >
                    HUSHH PR
                  </Link>
                </div>

                {/* Auth Section - Rightmost Desktop */}
                <div className="flex items-center ml-10">
                  {loading ? (
                    <div className="w-8 h-8 animate-pulse bg-gray-600 rounded-full"></div>
                  ) : isAuthenticated ? (
                    <UserAvatar />
                  ) : (
                    <Button
                      onClick={() => router.push('/login')}
                      bg={textColor ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}
                      color={textColor || "white"}
                      border={`1px solid ${textColor ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"}`}
                      borderRadius="8px"
                      px={6}
                      py={2}
                      fontSize="sm"
                      fontWeight={600}
                      _hover={{
                        bg: textColor ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
                        transform: "translateY(-1px)",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>

              {/* Mobile Menu Trigger */}
              <div className="md:hidden flex items-center mt-5">
                {!isMenuOpen && (
                  <div
                    className="text-white hamburger-icon-container cursor-pointer"
                    onClick={handleMenuIconToggle}
                    style={{
                      padding: "8px",
                      // background: "rgba(0, 0, 0, 0.6)",
                      // borderRadius: "6px",
                      // boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <svg
                      fill="none"
                      strokeWidth={2.5}
                      stroke={textColor || "#FFFFFF"}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width="32"
                      height="32"
                      style={{
                        filter: `drop-shadow(0px 0px 1px ${textColor ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)"})`
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {productsSubmenu && (
              <div
                className="bg-white z-100 flex flex-col gap-4 absolute pl-8 pr-8 mt-4 pt-5 pb-7 rounded-2xl shadow-lg shadow-[#A7AEBA1F]"
                onMouseEnter={() => setProductsSubmenu(true)}
                onMouseLeave={() => setProductsSubmenu(false)}
                // Position adjustment might be needed
                style={{top: '60px', right: '150px'}}
              >
                <p className="text-xs text-fontColor2 font-semibold">
                  HUSHH PRODUCTS
                </p>
                <div className="flex gap-2 z-1000">
                  <div className="flex-1 flex flex-col gap-2">
                    <Link
                      href={"/products/personal-data-agent"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <Image 
                          src="/svgs/pdaLogo.svg" 
                          alt="PDA Logo" 
                          width={24} 
                          height={24} 
                          className="w-6 h-6"
                          style={{borderRadius:'30%'}}
                        />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Hushh PDA</h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Your Personal Data Agent, <br/> Under Your Control</p>
                      </div>
                    </Link>
                    <Link
                      href={"/products/hushh-wallet-app"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <HushhWalletIcon className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Hushh Wallet App</h1>
                        <p className="text-sm font-medium text-fontColor3">
                          Your personal data vault. Organize, control,<br/> and monetize your information
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={"/products/hushh-button"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black  px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <HushhButtonIcon size={24} />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Hushh Button</h1>
                        <p className="text-sm font-medium text-fontColor3">
                          Seamlessly share your preferences with  <br /> brands for personalized experiences
                        </p>
                      </div>
                    </Link>    
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2">
                    <Link
                      href={"/products/hushh-vibe-search"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <VibeSearchIcon className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">VIBE Search App</h1>
                        <p className="text-sm font-medium text-fontColor3">
                          Discover products you love with image-based search and AI recommendations
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={"/developerApi"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <VibeSearchApi className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Developer API</h1>
                        <p className="text-sm font-medium text-fontColor3">
                          Tools for businesses to integrate <br/> Hushh data into their applications
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={"/products/browser-companion"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <ChromeExtentionLogo className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">
                          Hushh Browser Companion
                        </h1>
                        <p className="text-sm font-medium text-fontColor3">
                          Track and manage your online browsing data <br/>, building a complete digital profile
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div 
              style={{
                zIndex: 1000,
                position: 'fixed',
                width: '100%',
                height: '100vh',
                top: 0,
                left: 0,
                overflowY: 'auto'
              }} 
              className="bg-black flex flex-col justify-between" 
              ref={menuRef}
            >
              {/* Header */}
              <div className="px-6 pt-4 pb-2 flex items-center justify-between sticky top-0 bg-black z-10">
                    <div className="flex-1">
                      <HushhHeaderLogo />
                    </div>
                <div className="flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white"
                    style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 bg-black overflow-visible">
                <ul style={{listStyle:'none'}} className="flex flex-col px-6 space-y-4 bg-black py-4">
                  <li>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} style={{fontWeight:'700'}} className="text-lg text-white">
                      About Us
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link
                      style={{fontWeight:'700'}}
                      href="#"
                      className="flex justify-between items-center text-lg text-white"
                      onClick={() => setProductsSubmenuMobile(!productsSubmenuMobile)}
                    >
                      Products
                      <ChevronArrowIcon
                        className={`${productsSubmenuMobile ? "rotate-180" : ""} transition-all`}
                      />
                    </Link>
          
                    {productsSubmenuMobile && (
                      <ul style={{listStyle:'none'}} className="mt-2 space-y-3 bg-black pl-6 text-base text-white">
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/personal-data-agent" className="block text-white">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <Image 
                                src="/svgs/pdaLogo.svg" 
                                alt="PDA Logo" 
                                width={24} 
                                height={24} 
                                style={{borderRadius:'30%'}}
                                className="w-6 h-6"
                              />
                              Hushh PDA
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}} onClick={() => setIsMenuOpen(false)} href="/products/hushh-wallet-app" className="block">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <HushhWalletIcon className="w-6 h-6" />
                              Hushh Wallet App
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/browser-companion" className="block text-white ">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <ChromeExtentionLogo className="w-6 h-6"/>
                              Browser Companion
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/vibe-search" className="block text-white">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <VibeSearchIcon className="w-6 h-6"/>
                              Vibe Search
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/hushh-button" className="block text-white">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <HushhButtonIcon size={24} />
                              Hushh Button
                            </span> 
                          </Link>
                        </li>
                        
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/developerApi" className="block text-white">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <VibeSearchApi className="w-6 h-6" />
                              Developer API
                            </span>
                          </Link>
                        </li>
                        {/* <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/hushh-for-students" className="block text-white">
                            <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                              <headerAssets.VibeSearchMarketplace className="w-6 h-6" />
                              Hushh For Students
                            </span>
                          </Link>
                        </li> */}
                      </ul>
                    )}
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link style={{fontWeight:'700'}}  onClick={() => setIsMenuOpen(false)} href="/solutions" className="text-lg text-white">
                      Solutions
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link style={{fontWeight:'700'}}  onClick={() => setIsMenuOpen(false)} href="/contact-us" className="text-lg text-white">
                      Contact Us
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link style={{fontWeight:'700'}}  onClick={() => setIsMenuOpen(false)} href="/career" className="text-lg text-white">
                      Careers
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link style={{fontWeight:'700'}} onClick={() => setIsMenuOpen(false)} href="/hushh-press" className="text-lg text-white">
                     Hushh PR
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link style={{fontWeight:'700'}} onClick={() => setIsMenuOpen(false)} href="/hushhBlogs" className="text-lg text-white">
                      Blogs
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  
                  {/* Auth Section - Mobile */}
                  <li className="mt-4">
                    {loading ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="w-8 h-8 animate-pulse bg-gray-600 rounded-full"></div>
                        <Text className="text-gray-400 ml-3">Loading...</Text>
                      </div>
                    ) : isAuthenticated ? (
                      <div 
                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700"
                        style={{
                          backdropFilter: "blur(20px) saturate(180%)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)"
                        }}
                      >
                        <VStack spacing={5} align="start" w="full">
                          {/* User Info Header */}
                          <HStack spacing={4} w="full">
                            <div 
                              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xl relative"
                              style={{
                                background: "linear-gradient(135deg, #007AFF, #5E5CE6)",
                                boxShadow: "0 4px 12px rgba(0, 122, 255, 0.3)"
                              }}
                            >
                              {user?.user_metadata?.avatar_url ? (
                                <img 
                                  src={user.user_metadata.avatar_url} 
                                  alt="Avatar" 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                (user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'U').charAt(0).toUpperCase()
                              )}
                            </div>
                            <VStack align="start" spacing={1} flex={1}>
                              <Text 
                                className="text-white font-semibold"
                                style={{
                                  fontSize: "18px",
                                  lineHeight: "1.2",
                                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                                }}
                              >
                                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                              </Text>
                              <Text 
                                className="text-white"
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                                }}
                              >
                                {user?.email}
                              </Text>
                            </VStack>
                          </HStack>
                          
                          {/* Divider */}
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                          
                          {/* Action Buttons */}
                          <VStack spacing={3} w="full">
                            <Button
                              onClick={() => {
                                setIsMenuOpen(false);
                                if (userExists) {
                                  router.push('/user-profile');
                                } else {
                                  router.push('/user-registration');
                                }
                              }}
                              bg="rgba(255, 255, 255, 0.12)"
                              color="white"
                              border="1px solid rgba(255, 255, 255, 0.18)"
                              borderRadius="12px"
                              w="full"
                              h="48px"
                              py={3}
                              px={5}
                              fontSize="16px"
                              fontWeight={600}
                              _hover={{
                                bg: "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-1px)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                              }}
                              _active={{
                                transform: "translateY(0)",
                                bg: "rgba(255, 255, 255, 0.08)"
                              }}
                              transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                              isDisabled={userExists === null}
                              style={{
                                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                              }}
                            >
                              {userExists === null 
                                ? "Loading..." 
                                : userExists 
                                  ? "View Profile" 
                                  : "Setup Your Profile"
                              }
                            </Button>
                            
                            <Button
                              onClick={handleSignOut}
                              bg="rgba(255, 59, 48, 0.12)"
                              color="#FF453A"
                              border="1px solid rgba(255, 59, 48, 0.25)"
                              borderRadius="12px"
                              w="full"
                              h="48px"
                              fontSize="16px"
                              fontWeight={600}
                              _hover={{
                                bg: "rgba(255, 59, 48, 0.18)",
                                transform: "translateY(-1px)",
                                boxShadow: "0 4px 12px rgba(255, 59, 48, 0.2)"
                              }}
                              _active={{
                                transform: "translateY(0)",
                                bg: "rgba(255, 59, 48, 0.08)"
                              }}
                              transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                              style={{
                                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                              }}
                            >
                              Sign Out
                            </Button>
                          </VStack>
                        </VStack>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setIsMenuOpen(false);
                          router.push('/login');
                        }}
                        bg="rgba(255, 255, 255, 0.1)"
                        color="white"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        borderRadius="8px"
                        w="full"
                        py={3}
                        fontSize="lg"
                        fontWeight={600}
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.2)",
                        }}
                        _active={{
                          transform: "translateY(0)",
                        }}
                        transition="all 0.2s"
                      >
                        Sign In
                      </Button>
                    )}
                  </li>
                </ul>
              </div>
          
              {/* Download Button */}
              <div className="px-6 pb-6 border-t border-gray-800 pt-4 sticky bottom-0 bg-black">
                <button 
                  onClick={handleDownloadClick} 
                  style={{background:'linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)'}} 
                  className="w-full text-white py-2 rounded-full text-lg"
                >
                  Download Our App
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* This is the spacer that compensates for the fixed header */}
      {shouldShowHeader && (
        <div style={{ height: "70px" }} className="w-full"></div>
      )}
    </>
  );
}


