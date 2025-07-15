"use client";
import React from "react";
import Header from "../header";
import Headroom from "react-headroom";
import { usePathname } from "next/navigation";

const HeaderComponent = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isConsentAIPage = pathname === '/consent-ai-protocol';
  const isHushhLinkPage = pathname === '/hushh-link';
  const isHushhVaultPage = pathname === '/hushh-vault';

  // For home page and consent-ai-protocol page, use light background to match Figma design
  const headerProps = (isHomePage || isConsentAIPage || isHushhLinkPage || isHushhVaultPage) ? {
    backgroundColor: "rgba(248, 249, 250, 0.95)", // Light background with slight transparency
    textColor: "#1A1A1A", // Dark text for light background
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)" // Subtle border
  } : {};

  return (
    <div className="w-full">
      <Headroom
        style={{
          webkitTransition: "all .5s ease-in-out",
          mozTransition: "all .5s ease-in-out",
          oTransition: "all .5s ease-in-out",
          transition: "all .5s ease-in-out",
        }}
      >
        <Header {...headerProps} />
      </Headroom>
    </div>
  );
};

export default HeaderComponent;
