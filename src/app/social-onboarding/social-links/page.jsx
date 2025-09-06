"use client";
import React, { useState } from "react";
import SocialLinkInput from '../../_components/socialOnboarding/SocialLinkInput';
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { saveUserSocials } from "../../lib/api/socialOnboarding";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";

export default function SocialLinksPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [meta, setMeta] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <ContentWrapper>   
      <main className="min-h-screen bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left visual section */}
          <section className="hidden lg:block bg-black">
            <div className="h-full w-full flex items-center justify-center p-16">
              <img 
                src="/socialMediaBanner.png" 
                alt="Social Media Connection Banner" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </section>

          {/* Right form section */}
          <section className="flex flex-col justify-center px-6 md:px-12 py-8">
            {/* Step indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-black rounded-lg"></div>
                <div className="h-2 w-16 bg-black rounded-lg"></div>
                <div className="h-2 w-16 bg-black/40 rounded-lg"></div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">⦿</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#161616] mb-2">Social Media Linkage</h1>
              <p className="text-sm md:text-base text-[#4b4b4b]">Search for your Social Accounts and Connect them</p>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto w-full space-y-6">
              {/* Instagram */}
              <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagramGradient)"/>
                      <path d="M16 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" fill="white"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                      <defs>
                        <linearGradient id="instagramGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#f09433"/>
                          <stop offset="25%" stopColor="#e6683c"/>
                          <stop offset="50%" stopColor="#dc2743"/>
                          <stop offset="75%" stopColor="#cc2366"/>
                          <stop offset="100%" stopColor="#bc1888"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <label className="text-base md:text-lg font-bold text-black">
                    Connect your Instagram Account
                  </label>
                </div>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Mention username or share profile link"
                  className="w-full h-12 md:h-14 rounded-lg border border-[#544d4d] bg-[rgba(217,217,217,0.25)] px-4 text-sm md:text-base text-[rgba(75,75,75,0.52)] outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>

              {/* X/Twitter */}
              <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#000"/>
                      <path d="M4 3l7.5 9.2L4.7 21h2.7l5.3-6.3L17.8 21H21l-7.7-9.3L20.3 3h-2.7l-5 5.9L7 3H4z" fill="white"/>
                    </svg>
                  </div>
                  <label className="text-base md:text-lg font-bold text-black">
                    Connect your X (formerly Twitter) Account
                  </label>
                </div>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="Mention username or share profile link"
                  className="w-full h-12 md:h-14 rounded-lg border border-[#544d4d] bg-[rgba(217,217,217,0.25)] px-4 text-sm md:text-base text-[rgba(75,75,75,0.52)] outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>

              {/* LinkedIn */}
              <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#0A66C2"/>
                      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v13H0V8zm7.5 0H12v2.1h.07C12.7 8.9 14.3 7.6 16.7 7.6 21.4 7.6 24 10 24 14.4V21h-5v-5.8c0-1.7-.03-3.9-2.5-3.9-2.5 0-2.9 1.9-2.9 3.8V21H7.5V8z" fill="white"/>
                    </svg>
                  </div>
                  <label className="text-base md:text-lg font-bold text-black">
                    Connect your LinkedIn Account
                  </label>
                </div>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="Mention username or share profile link"
                  className="w-full h-12 md:h-14 rounded-lg border border-[#544d4d] bg-[rgba(217,217,217,0.25)] px-4 text-sm md:text-base text-[rgba(75,75,75,0.52)] outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>

              {/* Meta */}
              <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#1877F2"/>
                      <path d="M47 35H36V28C36 25.2 37.4 24 40 24H45V17H38C31.4 17 28 21.8 28 28V35H22V42H28V63H36V42H44L47 35Z" fill="white" transform="scale(0.4) translate(4, 4)"/>
                    </svg>
                  </div>
                  <label className="text-base md:text-lg font-bold text-black">
                    Connect your Meta Account
                  </label>
                </div>
                <input
                  type="text"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                  placeholder="Mention username or share profile link"
                  className="w-full h-12 md:h-14 rounded-lg border border-[#544d4d] bg-[rgba(217,217,217,0.25)] px-4 text-sm md:text-base text-[rgba(75,75,75,0.52)] outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>
            </div>

            {/* Continue button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                disabled={saving}
                onClick={async () => {
                  if (authLoading) return;
                  if (!user?.email) { router.push("/login"); return; }
                  try {
                    setSaving(true);
                    await saveUserSocials({
                      email: user.email,
                      instagram_id: instagram,
                      linkedin_id: linkedin,
                      twitter_id: twitter,
                      facebook_id: meta,
                    });
                    try {
                      localStorage.setItem(
                        "hushh_social_socials",
                        JSON.stringify({ instagram, linkedin, twitter, facebook: meta })
                      );
                    } catch {}
                    router.push("/social-onboarding/personal-preferences");
                  } catch (e) {
                    console.error(e);
                    alert("Failed to save socials");
                  } finally {
                    setSaving(false);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3 text-base md:text-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 disabled:opacity-60 transition-opacity"
              >
                {saving ? "Saving..." : "Continue"} 
                <span aria-hidden className="text-sm">→</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </ContentWrapper>
  );
}


