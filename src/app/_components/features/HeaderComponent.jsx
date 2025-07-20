"use client";
import React, { useState, useEffect } from "react";
import Header from "../header";
import { usePathname } from "next/navigation";
import { useBannerHeight } from "../../context/BannerHeightContext";

const HeaderComponent = () => {
  const pathname = usePathname();
  const { totalBannerHeight } = useBannerHeight();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isContactUsPage = pathname === '/contact-us';
  const isHomePage = pathname === '/';
  const isConsentAIPage = pathname === '/consent-ai-protocol';
  const isHushhLinkPage = pathname === '/hushh-link';
  const isHushhVaultPage = pathname === '/hushh-vault';
  const isHushhFlowPage = pathname === '/products/hushh-flow';
  const isHushhGridPage = pathname === '/products/hushh-grid';
  const isPDA = pathname === '/products/personal-data-agent';
  const isHushhPDA = pathname.includes('/hushh-pda') || pathname.includes('/hushhpda') || pathname.includes('/clientside/HushhPDA') || pathname === '/products/hushh-pda';

  // Custom scroll behavior to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down (past 100px)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // For home page, consent-ai-protocol page, and all product pages, use light background to match Figma design
  const headerProps = (isHomePage || isConsentAIPage || isHushhLinkPage || isHushhVaultPage || isHushhFlowPage || isHushhGridPage || isPDA || isHushhPDA || isContactUsPage) ? {
    backgroundColor: "rgba(248, 249, 250, 0.95)", // Light background with slight transparency
    textColor: "#1A1A1A", // Dark text for light background
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)" // Subtle border
  } : {};

  return (
    <div 
      className="w-full fixed z-50 transition-transform duration-300 ease-in-out"
      style={{ 
        top: `${totalBannerHeight}px`,
        height: '70px', // Consistent header height
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
      }}
    >
      <Header {...headerProps} />
    </div>
  );
};

export default HeaderComponent;
