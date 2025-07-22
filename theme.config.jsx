'use client'
import React from 'react'
import { useConfig } from 'nextra-theme-docs'
import MDXComponents from './src/app/_components/developerApiContent/page'
import remarkGfm from 'remark-gfm'
import MyLogo from './src/app/developerApi/userLogo'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default {
  logo: <span>Hushh Developer API</span>,
  nextThemes: {
    defaultTheme: "light", // Set the default theme to light
    forcedTheme: "light",  // Force light mode regardless of system preference
    disableSwitch: true,   // Hide the theme switch option
  },
  navbar: {
    component: () => {
      const { search,theme } = useConfig()
      const isDarkMode = theme === 'dark';
      return (
        <Flex
        as="nav"
        position="sticky"
        top="0"
        zIndex="1000"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        px={4}
        py={2}
        bg="white"
        borderBottom="1px solid #eaeaea"
        >
          {/* Left Section: Logo */}
          <Box fontWeight="bold" fontSize="lg" >
            Hushh Developer API
          </Box>

          {/* Center Section: Search Bar (first) + MyLogo (after) */}
          <Flex alignItems="center" gap={4}>
            <Box display={{ base: "none", md: "block" }}>
              {search?.component && <search.component />}
            </Box>
            <MyLogo />
          </Flex>

          {/* Right Section: Mobile Hamburger Menu */}
          <Box display={{ base: "block", md: "none" }}>
            <IconButton 
              icon={<HamburgerIcon />} 
              variant="ghost" 
              aria-label="Menu" 
            />
          </Box>
        </Flex>
      )
    }
  },
darkMode: false,
  project: {
    link: '/developerApi/login',
    icon: <MyLogo />,
  },

  footer: {
     text: null,
     Component: null,
  },

  feedback: { 
    content: "To know more about Hushh Developer API", 
    label: 'Learn More', 
    link: '/products/developerApi'
  }, 

  editLink: { text: null },

  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Hushh Developer API" />
      <meta property="og:description" content="Secure way of relaying personal information" />
    </>
  ),

  docsRepositoryBase: 'https://hushh.gitbook.io/hushh-docs',

  content: {
    components: MDXComponents,
  },

  markdown: {
    remarkPlugins: [remarkGfm],
  },
}
