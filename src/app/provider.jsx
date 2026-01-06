"use client";
import extendedTheme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ApiKeyProvider } from "./context/apiKeyContext";


export function Providers({ children }) {
  return (
    <ChakraProvider
      theme={extendedTheme}
      toastOptions={{
        defaultOptions: {
          containerStyle: {
            zIndex: 999999,
          },
        },
      }}
    >
      <ApiKeyProvider>
        {children}
      </ApiKeyProvider>
    </ChakraProvider>
  );
}
