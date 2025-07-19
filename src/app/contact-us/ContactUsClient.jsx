'use client'
import React from 'react'
import { Container, Box, Heading } from '@chakra-ui/react'
import ContactForm from '../_components/features/contactForm'
import Head from 'next/head'
import { siteMetadata } from '../sitemetadata'
import ContentWrapper from '../_components/layout/ContentWrapper'

// ContactPage JSON-LD structured data
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Hushh AI",
  "description": "Contact page for Hushh AI, a company specializing in data privacy and monetization solutions.",
  "url": "https://www.hushh.ai/contact-us",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-HUSHH-AI",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1021 5th St W.",
    "addressLocality": "Kirkland",
    "addressRegion": "WA",
    "postalCode": "98033",
    "addressCountry": "US"
  }
};

const ContactUsClient = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContentWrapper includeHeaderSpacing={true}>
      {/* Remove the Head component as it's deprecated in App Router */}
      <Box display={'flex'}>
        <Container minW={'100%'} textAlign={'center'} display={'flex'} flexDirection={'column'} mt={{ md:'0', base:'0rem'}}>
          {/* <Heading as={'h1'} className='gradient' my={{md:'2rem',base:'1rem'}}>Reach out to us</Heading> */}
          <ContactForm/>
        </Container>
      </Box> 
      </ContentWrapper>
    </>
  )
}

export default ContactUsClient; 