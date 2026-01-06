
import ClientSideLayout from "./clientSideLayout"

export const metadata = {
  title: "Hushh | Developer APIs",
  description:
    "Discover Hushh Developer APIs designed to empower your applications with secure, consent-driven data integration. Enhance your systems with our privacy-compliant, cutting-edge APIs.",
  keywords:
    "Developer APIs, Hushh, Secure APIs, Consent-Driven Data, Data Integration, Application Development, Privacy Compliance",
  canonical: "https://hushh.ai/developerApi",
  alternates: {
    canonical: "https://hushh.ai/developerApi",
  },
  openGraph: {
    title: "Hushh | Developer APIs",
    description:
      "Discover Hushh Developer APIs designed to empower your applications with secure, consent-driven data integration. Enhance your systems with our privacy-compliant, cutting-edge APIs.",
    url: "https://hushh.ai/developerApi",
    // images: [
    //   {
    //     url: "/path/to/developer-api-og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Hushh Developer APIs Image",
    //   },
    // ],
  },
};

export default function RootLayout({
  children
}) {
  return (
    <ClientSideLayout >
      {children}
    </ClientSideLayout>
  )
}