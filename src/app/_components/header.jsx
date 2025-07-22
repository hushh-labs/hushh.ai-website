"use client";
import React, { useRef, useState, useEffect } from "react";
import HushhHeaderLogo from "./svg/hushhHeaderLogo";
import Link from "next/link";
import { Box, Button, VStack, Flex, Text, Divider, HStack } from "@chakra-ui/react";
import { useResponsiveSizes } from "../context/responsive";
import SearchBar from "./features/searchBar";
import { ChevronArrowIcon } from "./svg/icons/chevronArrowIcon";
import HushhWalletIcon from "./svg/hushhWalletIcon";
import HushhButtonIcon from "./svg/hushhButton";
import VibeSearchIcon from "./svg/vibeSearch";
import ChromeExtentionLogo from "./svg/ChromeExtensionLogo";
import { usePathname, useRouter } from 'next/navigation'
import VibeSearchApi from "./svg/vibeSearchApi";
import { useToast } from '@chakra-ui/react';
import Image from "next/image";
import { ChevronRightIcon, CloseIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./auth/UserAvatar";
import HushhNewLogo from "../../../public/svgs/hushh_new_logo.svg"
import { useHushhIdFlow } from "../hooks/useHushhIdFlow";
import HushhFlow from '../_components/svg/icons/flowLogo.svg'
import HushhGrid from '../_components/svg/icons/girdLogo.svg';  
import HushhLink from '../_components/svg/icons/linkLogo.svg';
import HushhVault from '../_components/svg/icons/vaultLogo.svg';
import HushhPDA from '../_components/svg/icons/pdaLogo.svg';

export default function Header({backgroundColor, textColor, borderBottom}) {
  const { isTablet, isDesktop } = useResponsiveSizes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname()
  const router = useRouter();
  const overlayRef = useRef(null);

  const noHeaderPaths = ['/vivaConnect', '/viva-connect', '/viva-connect/qrPage', '/qrCodePage'];
  const shouldShowHeader = !noHeaderPaths.includes(pathname);
  
  // Auth context
  const { isAuthenticated, user, loading, signOut } = useAuth();
  const toast = useToast();
  
  // Use our reusable authentication flow hook for consistent user status checking
  const { 
    navigateToProfile, 
    navigateToRegistration,
    userExists
  } = useHushhIdFlow();

  // Handle sign out for mobile
  const handleSignOut = async () => {
    try {
      setIsMenuOpen(false);
      await signOut();
      router.push('/');
      
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

  const handleDownloadClick = () => {
    window.location.href = "https://apps.apple.com/in/app/hushh-app/id6498471189";
  };

  const handleMenuIconToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  let menuRef = useRef();
  let hamburgerRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      // Check if click is on a dropdown item (Link)
      const isDropdownLink = e.target.closest('a[href]');
      const isDropdownMenu = e.target.closest('.dropdown-menu');
      
      // Don't close if clicking on:
      // 1. Hamburger button or inside mobile menu
      // 2. Dropdown link (let navigation happen first)
      // 3. Inside dropdown menu
      if (!menuRef.current?.contains(e.target) && 
          !hamburgerRef.current?.contains(e.target) && 
          !isDropdownLink && 
          !isDropdownMenu) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  
  // Dropdown menu data
  const menuItems = {
    products: {
      title: "Products",
      items: [
        {
          name: "Personal Data Agent (PDA)",
          description: "Your AI-powered personal data assistant",
          href: "/products/personal-data-agent",
          icon:HushhPDA
        },
        {
          name: "Hushh Vault",
          description: "Secure personal data storage and management",
          href: "/hushh-vault",
          icon:HushhVault
        },
        {
          name: "Hushh Link",
          description: "Connect and share data seamlessly",
          href: "/hushh-link",
          icon:HushhLink
        },
        {
          name: "Hushh Flow",
          description: "Streamline your data workflows",
          href: "/products/hushh-flow",
          icon:HushhFlow
        },
        {
          name: "Hushh Grid",
          description: "Visualize and organize your data",
          href: "/products/hushh-grid",
          icon: HushhGrid
        }
      ]
    },
    developers: {
      title: "Developers",
      items: [
        {
          name: "GitHub Protocol",
          description: "Open source development framework",
          href: "https://github.com/hushh-labs/consent-protocol"
        },
        {
          name: "Agentkit CLI",
          description: "Command line tools for developers",
          href: "/developers/agentkit-cli"
        },
        {
          name: "Build an Operon",
          description: "Create custom data operations",
          href: "/developers/build-operon"
        },
        {
          name: "Submit to Marketplace",
          description: "Publish your creations",
          href: "/developers/marketplace"
        }
      ]
    },
    whyHushh: {
      title: "Why Hushh?",
      items: [
        {
          name: "Our Philosophy",
          description: "Understanding our core beliefs",
          href: "/why-hushh"
        },
        {
          name: "Privacy Manifesto",
          description: "Our commitment to your privacy",
          href: "/legal/privacypolicy"
        },
        {
          name: "Consent Protocol",
          description: "How we handle your consent",
          href: "/consent-ai-protocol"
        }
      ]
    },
    docs: {
      title: "Docs",
      items: [
        {
          name: "Getting Started",
          description: "Begin your journey with Hushh",
          href: "/getting-started"
        },
        {
          name: "API Reference",
          description: "Complete API documentation",
          href: "/developerApi"
        },
        {
          name: "FAQ",
          description: "Frequently asked questions",
          href: "/docs/faq"
        },
        // {
        //   name: "Blueprint Recipes",
        //   description: "Pre-built solutions and templates",
        //   href: "/docs/blueprints"
        // }
      ]
    },
    community: {
      title: "Community",
      items: [
        {
          name: "Agent Builders Club",
          description: "Join our developer community",
          href: "/hushh-community"
        },
        {
          name: "Solutions",
          description: "Delivering tailored IT services that meets the rigorous demands of modern business",
          href: "/solutions"
        },
        {
          name: "Hackathons",
          description: "Build the future with us",
          href: "/pda/iithackathon"
        },
        {
          name: "Blog",
          description: "Latest news and insights",
          href: "/hushhBlogs"
        }
      ]
    },
    company: {
      title: "Company",
      items: [
        {
          name: "About",
          description: "Learn about our mission",
          href: "/about"
        },
        {
          name: "Contact",
          description: "Get in touch with us",
          href: "/contact-us"
        },
        {
          name: "Hushh Labs",
          description: "Advanced AI research and development",
          href: "/labs"
        },
        {
          name: "Careers",
          description: "Join our team",
          href: "/career"
        }
      ]
    }
  };

  const renderDropdownMenu = (menuKey, menuData) => {
    return (
      <div
        className="dropdown-menu absolute top-full left-0 bg-white shadow-2xl border border-gray-100 z-50 rounded-2xl mt-2"
        style={{
          animation: "fadeInDown 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          minWidth: "280px",
          maxWidth: "380px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 25px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(20px)",
        }}
        onMouseEnter={() => setActiveDropdown(menuKey)}
        onMouseLeave={() => {
          // Add small delay to prevent accidental closes when clicking
          setTimeout(() => setActiveDropdown(null), 150);
        }}
      >
        {/* Dropdown Arrow */}
        <div 
          className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"
          style={{
            filter: "drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.02))"
          }}
        ></div>
        
        <div className="relative bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-4">
            <div className="space-y-1">
              {menuData.items.map((item, index) => (
                <div
                  key={index}
                  className="group block p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 hover:shadow-sm dropdown-item cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Close dropdown immediately
                    setActiveDropdown(null);
                    // Navigate using router
                    router.push(item.href);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon && (
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-200"
                      >
                        {typeof item.icon === 'string' ? (
                          <Image 
                            src={item.icon} 
                            alt={item.name} 
                            width={16} 
                            height={16} 
                            className="w-4 h-4"
                            style={{borderRadius:'20%'}}
                          />
                        ) : (
                            <Image 
                              src={item.icon} 
                              alt={item.name} 
                              width={16} 
                              height={16} 
                              className="w-4 h-4"
                            />
                        )}
                      </div>
                    </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed group-hover:text-gray-600 transition-colors duration-200">
                        {item.description}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronRightIcon className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {shouldShowHeader && (
        <div>
          {/* Apple-style Header */}
          <header 
            className="bg-white bg-opacity-95 backdrop-blur-xl border-b border-gray-200 sticky top-0 left-0 right-0 z-50"
            style={{
              height: "70px",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "saturate(180%) blur(20px)",
              zIndex: 1000,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between" style={{ height: "70px" }}>
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center">
                    <Image 
                      src={HushhNewLogo} 
                      alt="Hushh Logo" 
                      width={140} 
                      height={45} 
                      priority 
                      className="h-8 w-auto sm:h-10 lg:h-12"
                    />
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                  {/* Products Dropdown */}
                  <div className="relative group">
                    <button
                      className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 py-4 px-3 nav-button"
                      onMouseEnter={() => setActiveDropdown('products')}
                    >
                      <span>Products</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'products' && renderDropdownMenu('products', menuItems.products)}
                  </div>

                  {/* Developers Dropdown */}
                  <div className="relative group">
                    <button
                      className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 py-4 px-3 nav-button"
                      onMouseEnter={() => setActiveDropdown('developers')}
                    >
                      <span>Developers</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'developers' && renderDropdownMenu('developers', menuItems.developers)}
                  </div>

                  {/* Why Hushh Dropdown */}
                  <div className="relative group">
                    <button
                      className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 py-4 px-3 nav-button"
                      onMouseEnter={() => setActiveDropdown('whyHushh')}
                    >
                      <span>Why Hushh?</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'whyHushh' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'whyHushh' && renderDropdownMenu('whyHushh', menuItems.whyHushh)}
                  </div>

                  {/* Docs Dropdown */}
                  <div className="relative group">
                    <button
                      className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 py-4 px-3 nav-button"
                      onMouseEnter={() => setActiveDropdown('docs')}
                    >
                      <span>Docs</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'docs' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'docs' && renderDropdownMenu('docs', menuItems.docs)}
                  </div>

                  {/* Community Dropdown */}
                  <div className="relative group">
                    <button
                      className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 py-4 px-3 nav-button"
                      onMouseEnter={() => setActiveDropdown('community')}
                    >
                      <span>Community</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'community' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'community' && renderDropdownMenu('community', menuItems.community)}
                  </div>

                  {/* Company Dropdown */}
                  <div className="relative group">
                    <button
                      className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 py-4 px-3 nav-button"
                      onMouseEnter={() => setActiveDropdown('company')}
                    >
                      <span>Company</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'company' && renderDropdownMenu('company', menuItems.company)}
                  </div>

                </nav>

                {/* Right side - Auth & CTA */}
                <div className="flex items-center space-x-4">
                  {/* Desktop Auth */}
                  <div className="hidden lg:flex items-center space-x-4">
                    {loading ? (
                      <div className="w-6 h-6 animate-pulse bg-gray-300 rounded-full"></div>
                    ) : isAuthenticated ? (
                      <UserAvatar />
                    ) : (
                      <Button
                        onClick={() => router.push('/login')}
                        bg="transparent"
                        color="gray.800"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="8px"
                        px={5}
                        py={2}
                        fontSize="sm"
                        fontWeight={500}
                        height="44px"
                        _hover={{
                          bg: "gray.50",
                          borderColor: "gray.400",
                        }}
                        _active={{
                          transform: "scale(0.98)",
                        }}
                        transition="all 0.2s"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>

                  {/* Get Early Access Button - Desktop */}
                  <Button
                    onClick={() => router.push('https://apps.apple.com/in/app/hushh-app/id6498471189')}
                    bg="linear-gradient(135deg, #007AFF, #5E5CE6, #7C3AED)"
                    color="white"
                    borderRadius="10px"
                    px={4}
                    py={1}
                    fontSize="sm"
                    fontWeight={700}
                    // height="48px"
                    position="relative"
                    overflow="hidden"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 122, 255, 0.4), 0 4px 12px rgba(126, 58, 237, 0.3)",
                    }}
                    _active={{
                      transform: "scale(0.98)",
                    }}
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.6s ease",
                    }}
                    _groupHover={{
                      _before: {
                        left: "100%",
                      }
                    }}
                    transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    className="hidden lg:block group"
                    display={{ base: "none", lg: "flex" }}
                  >
                    🚀 Get Early Access
                  </Button>
                  


                  {/* Mobile menu button */}
                  <button
                    ref={hamburgerRef}
                    onClick={handleMenuIconToggle}
                    className="lg:hidden relative p-3 rounded-xl border  hover:border-gray-300 transition-all duration-200 hover:shadow-lg active:scale-95"
                    style={{
                      backdropFilter: "blur(10px)",
                    }}
                    type="button"
                    aria-label="Toggle mobile menu"
                  >
                    {isMenuOpen ? (
                      <CloseIcon className="w-6 h-6 text-gray-700" />
                    ) : (
                    <HamburgerIcon className="w-6 h-6 text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div 
              className="lg:hidden fixed"
              style={{
                position: "fixed",
                top: "70px",
                left: "0",
                right: "0",
                bottom: "0",
                width: "100vw",
                height: "calc(100vh - 70px)",
                zIndex: 9999,
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px) saturate(180%)",
                animation: "slideInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                overflow: "auto"
              }} 
              ref={menuRef}
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                {/* Mobile Menu Content */}
                <div className="px-6 py-6">
                    {/* Close button for mobile menu */}
                    <div className="flex justify-end mb-4 lg:hidden">
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Close menu"
                      >
                        <CloseIcon className="w-5 h-5 text-gray-600" />
                      </button>
                  </div>
                  {/* Authentication Section */}
                  {!loading && (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                      {isAuthenticated && user ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <UserAvatar 
                              user={user} 
                              size="sm"
                              className="w-10 h-10"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {user.user_metadata?.name || user.email || 'User'}
                              </p>
                              {/* <p className="text-xs text-gray-500">
                                {user.email}
                              </p> */}
                  </div>
                  </div>
                          <button
                            onClick={handleSignOut}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              setIsMenuOpen(false);
                              navigateToRegistration();
                            }}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Sign Up
                          </button>
                          <button
                            onClick={() => {
                              setIsMenuOpen(false);
                              navigateToProfile();
                            }}
                            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                          >
                            Sign In
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Menu */}
                  <div className="space-y-6">
                    {/* Products Section */}
                    <div className="mobile-menu-section">
                  <button 
                        onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                      >
                        <span>Products</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'products' && (
                        <div className="mt-3 space-y-3 pl-4">
                                                    {menuItems.products.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(false);
                                router.push(item.href);
                              }}
                              className="block mobile-menu-item cursor-pointer"
                            >
                              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                {item.icon && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      {typeof item.icon === 'string' ? (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                          style={{borderRadius:'20%'}}
                                        />
                                      ) : (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Developers Section */}
                    <div className="mobile-menu-section">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === 'developers' ? null : 'developers')}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                      >
                        <span>Developers</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'developers' && (
                        <div className="mt-3 space-y-3 pl-4">
                          {menuItems.developers.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(false);
                                router.push(item.href);
                              }}
                              className="block mobile-menu-item cursor-pointer"
                            >
                              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                {item.icon && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      {typeof item.icon === 'string' ? (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                          style={{borderRadius:'20%'}}
                                        />
                                      ) : (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Why Hushh Section */}
                    <div className="mobile-menu-section">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === 'whyHushh' ? null : 'whyHushh')}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                      >
                        <span>Why Hushh?</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'whyHushh' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'whyHushh' && (
                        <div className="mt-3 space-y-3 pl-4">
                          {menuItems.whyHushh.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(false);
                                router.push(item.href);
                              }}
                              className="block mobile-menu-item cursor-pointer"
                            >
                              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                {item.icon && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      {typeof item.icon === 'string' ? (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                          style={{borderRadius:'20%'}}
                                        />
                                      ) : (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Docs Section */}
                    <div className="mobile-menu-section">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === 'docs' ? null : 'docs')}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                      >
                        <span>Docs</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'docs' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'docs' && (
                        <div className="mt-3 space-y-3 pl-4">
                          {menuItems.docs.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(false);
                                router.push(item.href);
                              }}
                              className="block mobile-menu-item cursor-pointer"
                            >
                              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                {item.icon && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      {typeof item.icon === 'string' ? (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                          style={{borderRadius:'20%'}}
                                        />
                                      ) : (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Community Section */}
                    <div className="mobile-menu-section">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === 'community' ? null : 'community')}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                      >
                        <span>Community</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'community' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'community' && (
                        <div className="mt-3 space-y-3 pl-4">
                          {menuItems.community.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(false);
                                router.push(item.href);
                              }}
                              className="block mobile-menu-item cursor-pointer"
                            >
                              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                {item.icon && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      {typeof item.icon === 'string' ? (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                          style={{borderRadius:'20%'}}
                                        />
                                      ) : (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Company Section */}
                    <div className="mobile-menu-section">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                      >
                        <span>Company</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'company' && (
                        <div className="mt-3 space-y-3 pl-4">
                          {menuItems.company.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(false);
                                router.push(item.href);
                              }}
                              className="block mobile-menu-item cursor-pointer"
                            >
                              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                {item.icon && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      {typeof item.icon === 'string' ? (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                          style={{borderRadius:'20%'}}
                                        />
                                      ) : (
                                        <Image 
                                          src={item.icon} 
                                          alt={item.name} 
                                          width={16} 
                                          height={16} 
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hushh Labs Direct Link for Mobile */}
                    <div className="mobile-menu-section">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          router.push('/labs');
                        }}
                        className="cursor-pointer py-2"
                      >
                        <div className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          Hushh Labs
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Advanced AI research and development
                        </div>
                      </div>
                    </div>
                  </div>

                                    {/* Bottom Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push('https://apps.apple.com/in/app/hushh-app/id6498471189');
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    style={{ 
                        background: "linear-gradient(135deg, #007AFF, #5E5CE6, #7C3AED)",
                      }}
                    >
                      🚀 Get Early Access
                  </button>
                    
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleDownloadClick();
                      }}
                      className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-200 transition-colors"
                    >
                      Download App
                    </button>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        © 2024 Hushh. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No header spacer needed with sticky positioning */}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .dropdown-item:hover {
          transform: translateX(2px);
        }
        
        .animate-item {
          opacity: 0;
          animation-fill-mode: both;
        }
        
        /* Enhanced mobile menu animations */
        .mobile-menu-item {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .mobile-menu-item:hover {
          transform: translateY(-2px) scale(1.02);
        }
        
        .mobile-menu-item:active {
          transform: translateY(0) scale(0.98);
        }
        
        .mobile-menu-section {
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          padding-bottom: 1rem;
        }
        
        .mobile-menu-section:last-child {
          border-bottom: none;
        }
        
        /* Custom smooth scrollbar for mobile menu */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #007AFF, #5E5CE6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0056CC, #4A47A3);
        }
        
        /* Enhanced button hover effects */
        .nav-button {
          position: relative;
          overflow: hidden;
        }
        .nav-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }
        .nav-button:hover::before {
          left: 100%;
        }
        
        /* Mobile touch feedback */
        @media (max-width: 1024px) {
          .touch-feedback {
            transition: all 0.2s ease;
          }
          .touch-feedback:active {
            transform: scale(0.95);
            opacity: 0.8;
          }
        }
        

      `}</style>
    </>
  );
}


