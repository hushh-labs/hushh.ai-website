"use client";
import React, { useState } from "react";
import SocialLinkInput from '../../_components/socialOnboarding/SocialLinkInput';
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { saveUserSocials } from "../../lib/api/socialOnboarding";

export default function SocialLinksPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [meta, setMeta] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] gap-8 px-6 md:px-10 py-10 md:py-16">
      {/* Left visual slot (placeholder) */}
      <section className="hidden lg:block">
        <div className="h-full w-full rounded-[46px] bg-black" />
      </section>

      {/* Right form */}
      <section className="max-w-2xl w-full justify-self-center">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-black grid place-items-center">
            <span className="text-lg" aria-hidden>
              ⦿
            </span>
          </div>
          <h1 className="m-0 text-2xl md:text-3xl font-bold text-[#161616]">Social Media Linkage</h1>
          <p className="mt-2 text-gray-600">Search for your Social Accounts and Connect them</p>
        </div>

        <div className="space-y-6">
          <SocialLinkInput id="ig" label="Connect your Instagram Account" value={instagram} onChange={setInstagram} />
          <SocialLinkInput id="tw" label="Connect your X (formerly Twitter) Account" value={twitter} onChange={setTwitter} />
          <SocialLinkInput id="li" label="Connect your LinkedIn Account" value={linkedin} onChange={setLinkedin} />
          <SocialLinkInput id="me" label="Connect your Meta Account" value={meta} onChange={setMeta} />
        </div>

        <div className="mt-10 flex justify-center">
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
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Continue"} <span aria-hidden>→</span>
          </button>
        </div>
      </section>
    </main>
  );
}


