import { ApiKeyProvider } from "../context/apiKeyContext"

export default function ClientSideLayout({
  children,
  session
}) {
  return (
    <ApiKeyProvider>
      {children}
    </ApiKeyProvider>
  )
}