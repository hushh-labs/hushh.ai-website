"use client";
import React, { useEffect } from "react";
import Link from "next/link";

// export const metadata = {
//   title: "Profile Setup Complete",
//   description: "Your social profile setup is complete.",
// };

export default function OnboardingCompletedPage() {
  useEffect(() => {
    try {
      localStorage.setItem("hushh_social_profile_completed", "true");
    } catch {}
  }, []);
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 h-16 w-16 grid place-items-center rounded-full border border-black">
        <span aria-hidden className="text-2xl">🎉</span>
      </div>
      <h1 className="m-0 text-2xl md:text-3xl font-bold text-[#161616]">
        Hooray! Your Profile is all setup and Complete
      </h1>
      <p className="mt-3 text-gray-600 max-w-xl">
        Preferences are editable and can be changed in your dashboard upto your discretion
      </p>
      <div className="mt-8">
        <Link
          href="/social-onboarding/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
        >
          Visit your Dashboard <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}


