'use client';
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// Constants extracted outside component to prevent recreation
const HEADER_HEIGHT = 70;
const MOBILE_BREAKPOINT = 768;
const BANNER_HEIGHTS = {
  funding: { mobile: 32, desktop: 36 },
  hackathon: { mobile: 40, desktop: 45 }
};

const BannerHeightContext = createContext();

export const useBannerHeight = () => {
  const context = useContext(BannerHeightContext);
  if (!context) {
    throw new Error('useBannerHeight must be used within a BannerHeightProvider');
  }
  return context;
};

export const BannerHeightProvider = ({ children }) => {
  const [activeBanners, setActiveBanners] = useState({
    funding: true,
    hackathon: true,
  });

  const [isMobile, setIsMobile] = useState(false);

  // Single useEffect for window resize handling
  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };

    // Set initial value
    updateScreenSize();

    // Add resize listener
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Memoized banner heights based on screen size
  const fundingBannerHeight = useMemo(() => 
    isMobile ? BANNER_HEIGHTS.funding.mobile : BANNER_HEIGHTS.funding.desktop,
    [isMobile]
  );

  const hackathonBannerHeight = useMemo(() => 
    isMobile ? BANNER_HEIGHTS.hackathon.mobile : BANNER_HEIGHTS.hackathon.desktop,
    [isMobile]
  );

  // Memoized total calculations
  const totalBannerHeight = useMemo(() => 
    (activeBanners.funding ? fundingBannerHeight : 0) + 
    (activeBanners.hackathon ? hackathonBannerHeight : 0),
    [activeBanners.funding, activeBanners.hackathon, fundingBannerHeight, hackathonBannerHeight]
  );

  const totalOffsetHeight = useMemo(() => 
    totalBannerHeight + HEADER_HEIGHT,
    [totalBannerHeight]
  );

  // Memoized functions to prevent unnecessary re-renders
  const registerBanner = useCallback((bannerType) => {
    setActiveBanners(prev => ({ ...prev, [bannerType]: true }));
  }, []);

  const unregisterBanner = useCallback((bannerType) => {
    setActiveBanners(prev => ({ ...prev, [bannerType]: false }));
  }, []);

  // Memoized context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    activeBanners,
    fundingBannerHeight,
    hackathonBannerHeight,
    totalBannerHeight,
    headerHeight: HEADER_HEIGHT,
    totalOffsetHeight,
    registerBanner,
    unregisterBanner,
    // CSS custom properties as computed values (no side effects)
    cssVars: {
      '--total-banner-height': `${totalBannerHeight}px`,
      '--total-offset-height': `${totalOffsetHeight}px`,
      '--header-height': `${HEADER_HEIGHT}px`,
    }
  }), [
    activeBanners,
    fundingBannerHeight,
    hackathonBannerHeight,
    totalBannerHeight,
    totalOffsetHeight,
    registerBanner,
    unregisterBanner
  ]);

  return (
    <BannerHeightContext.Provider value={value}>
      {children}
    </BannerHeightContext.Provider>
  );
}; 