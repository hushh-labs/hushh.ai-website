'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Text, Heading, Link as ChakraLink, OrderedList, UnorderedList, ListItem, Code, Divider, useColorMode } from '@chakra-ui/react';

/**
 * Custom MDX renderer for blog content
 * Uses a refined, Apple-style typography system
 */
const MDXContent = ({ source }) => {
  const { colorMode } = useColorMode();
  
  // Colors based on color mode
  const textColor = colorMode === 'light' ? "#1d1d1f" : "#f5f5f7";
  const mutedTextColor = colorMode === 'light' ? "#6e6e73" : "#86868b";
  const linkColor = "#0066CC"; // Apple blue
  const borderColor = colorMode === 'light' ? "#e5e5e7" : "#333336";
  const codeBgColor = colorMode === 'light' ? "#f5f5f7" : "#f5f5f7";
  const inlineCodeBg = colorMode === 'light' ? "rgba(15, 23, 42, 0.06)" : "rgba(148, 163, 184, 0.16)";
  const inlineCodeColor = colorMode === 'light' ? "#0f172a" : "#e2e8f0";
  
  if (!source) {
    console.error("Warning: MDXContent received empty source");
    return <Box className="mdx-content">Content could not be loaded</Box>;
  }
  
  try {
    // For this implementation we'll assume source is already in HTML format
    // or safe to render as-is
    
    return (
      <div className="mdx-content">
        <div
          dangerouslySetInnerHTML={{ __html: source }}
          className="prose prose-lg max-w-none"
          style={{
            color: textColor
          }}
        />
        
        <style jsx global>{`
          .mdx-content {
            width: 100%;
          }
          
          .mdx-content .prose {
            max-width: none;
          }
          
          .mdx-content .prose p {
            font-size: 1.125rem;
            line-height: 1.8;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            color: ${textColor};
            letter-spacing: -0.01em;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
          
          .mdx-content .prose h1 {
            font-size: 2.5rem;
            font-weight: 600;
            line-height: 1.2;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: ${textColor};
            letter-spacing: -0.02em;
          }
          
          .mdx-content .prose h2 {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.3;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            color: ${textColor};
            letter-spacing: -0.02em;
          }
          
          .mdx-content .prose h3 {
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 1.3;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: ${textColor};
            letter-spacing: -0.01em;
          }
          
          .mdx-content .prose a {
            color: ${linkColor};
            text-decoration: none;
            border-bottom: 1px solid rgba(0, 102, 204, 0.3);
            transition: all 0.2s;
            background: none;
          }
          
          .mdx-content .prose a:hover {
            border-color: rgba(0, 102, 204, 0.8);
            color: ${colorMode === 'light' ? '#004999' : '#4d94ff'};
          }
          
          .mdx-content .prose ul, 
          .mdx-content .prose ol {
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .mdx-content .prose li {
            margin-bottom: 0.5rem;
            padding-left: 0.5rem;
          }
          
          .mdx-content .prose blockquote {
            border-left: 2px solid ${borderColor};
            padding-left: 1rem;
            font-style: italic;
            color: ${mutedTextColor};
            margin: 1.5rem 0;
          }
          
          .mdx-content .prose img {
            border-radius: 0.5rem;
            margin: 2rem 0;
            width: 100%;
            height: auto;
          }
          
          .mdx-content .prose pre {
            background: ${codeBgColor};
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            margin: 1.5rem 0;
            border: 1px solid ${borderColor};
          }
          
          .mdx-content .prose code:not(pre code) {
            background: transparent;
            padding: 0;
            border-radius: 0;
            font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
            font-size: 0.875em;
            color: ${inlineCodeColor};
            border: none;
          }

          .mdx-content .prose pre code {
            background: transparent;
            padding: 0;
            border-radius: 0;
            font-size: 0.9em;
            color: inherit;
            border: none;
          }
          
          .mdx-content .prose table {
            width: 100%;
            margin: 1.5rem 0;
            border-collapse: collapse;
          }
          
          .mdx-content .prose th,
          .mdx-content .prose td {
            padding: 0.75rem;
            border-bottom: 1px solid ${borderColor};
            text-align: left;
          }
          
          .mdx-content .prose th {
            background: black;
            font-weight: 600;
          }
          
          .mdx-content .prose hr {
            margin: 2rem 0;
            border: 0;
            border-top: 1px solid ${borderColor};
          }
          
          /* Enhanced styling for the first paragraph (lede) */
          .mdx-content .prose > p:first-of-type {
            font-size: 1.25rem;
            line-height: 1.6;
            color: ${mutedTextColor};
            letter-spacing: -0.01em;
          }
          
          /* Style adjustments for mobile */
          @media (max-width: 768px) {
            .mdx-content .prose h1 {
              font-size: 2rem;
            }
            
            .mdx-content .prose h2 {
              font-size: 1.75rem;
            }
            
            .mdx-content .prose h3 {
              font-size: 1.375rem;
            }
            
            .mdx-content .prose p,
            .mdx-content .prose li {
              font-size: 1rem;
            }
            
            .mdx-content .prose > p:first-of-type {
              font-size: 1.125rem;
            }
          }
        `}</style>
      </div>
    );
  } catch (error) {
    console.error("Error rendering MDX content:", error);
    return (
      <Box className="mdx-content" p="4">
        <Text color="red.500">Error rendering content. Please try refreshing the page.</Text>
      </Box>
    );
  }
};

export default MDXContent; 
