'use client'
import { SessionProvider } from "next-auth/react"
  
import { ChakraProvider } from "@chakra-ui/react"
import { ApiKeyProvider } from "../src/app/context/apiKeyContext"
import ContactForm from "../src/app/_components/features/contactForm"

export default function ClientSideLayout({
  children,
  session
}) {
  return (
    <>
    <ChakraProvider>
    <SessionProvider session={session}>
      <ApiKeyProvider>
      {children}
      <ContactForm/>
      </ApiKeyProvider>
    </SessionProvider>
    </ChakraProvider>
    
    </>
  )
}