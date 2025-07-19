'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useBannerHeight } from '../../context/BannerHeightContext';

/**
 * ContentWrapper - Automatically handles top spacing for page content
 * 
 * This component ensures all page content starts below the fixed header and banners
 * without requiring manual padding/margin adjustments on individual pages.
 */
const ContentWrapper = ({ 
  children, 
  includeHeaderSpacing = true,
  additionalSpacing = 0,
  minHeight = "auto",
  ...boxProps 
}) => {
  const { totalOffsetHeight } = useBannerHeight();

  return (
    <Box
      w="full"
      minH={minHeight}
      pt={includeHeaderSpacing ? `${totalOffsetHeight + additionalSpacing}px` : `${additionalSpacing}px`}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default ContentWrapper; 