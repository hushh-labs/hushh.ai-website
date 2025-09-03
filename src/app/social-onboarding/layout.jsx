import React from "react";
import { siteMetadata } from "../sitemetadata";

export const metadata = {
  title: "Social Profile Setup",
  description:
    "Set up your Hushh social profile to personalize your experience.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/social-onboarding`,
  },
  openGraph: {
    title: "Social Profile Setup",
    description:
      "Complete a few quick steps to personalize your Hushh experience.",
    url: `${siteMetadata.siteUrl}/social-onboarding`,
  },
};

export default function SocialOnboardingLayout({ children }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}


