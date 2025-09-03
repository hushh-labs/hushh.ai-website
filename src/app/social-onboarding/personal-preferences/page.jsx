"use client";
import React, { useState } from "react";
import QuestionInput from "../../_components/socialOnboarding/QuestionInput";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { savePreferences, buildPreferencesPayload } from "../../lib/api/socialOnboarding";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";

// Metadata handled in parent layout if needed (client pages cannot export metadata)

function Section({ title, children }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6 md:gap-10 items-start py-8 md:py-10 border-t border-gray-200 first:border-t-0">
      <h2 className="m-0 text-[#4788f4] text-lg md:text-2xl font-bold md:text-left text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </section>
  );
}

export default function PersonalPreferencesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (k) => (v) => setState((s) => ({ ...s, [k]: v }));

  return (
    <ContentWrapper>
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-14">
      <header className="text-center mb-6 md:mb-8">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-black grid place-items-center">
          <span aria-hidden>♥</span>
        </div>
        <h1 className="m-0 text-2xl md:text-3xl font-bold text-[#161616]">Personal Preferences</h1>
        <p className="mt-2 text-gray-600">Tell us a bit about your personal Preferences</p>
      </header>

      <div className="rounded-2xl overflow-hidden">
        <Section title="Habits and Lifestyle">
          <QuestionInput id="smoke" question="Do you smoke?" value={state.smoke || ""} onChange={set("smoke")} />
          <QuestionInput id="wake" question="What time do you usually wake up?" value={state.wake || ""} onChange={set("wake")} />
          <QuestionInput id="drink" question="Do you drink alcohol?" value={state.drink || ""} onChange={set("drink")} />
          <QuestionInput id="mornight" question="Are you more of a morning or night person?" value={state.mornight || ""} onChange={set("mornight")} />
          <QuestionInput id="exercise" question="How often do you exercise?" value={state.exercise || ""} onChange={set("exercise")} />
          <QuestionInput id="diet" question="What's your diet like?" value={state.diet || ""} onChange={set("diet")} />
        </Section>

        <Section title="Beliefs and Virtues">
          <QuestionInput id="political" question="What are your political beliefs?" value={state.political || ""} onChange={set("political")} />
          <QuestionInput id="social-life" question="What kind of social life do you enjoy?" value={state.sociallife || ""} onChange={set("sociallife")} />
          <QuestionInput id="religion" question="How important is religion to you?" value={state.religion || ""} onChange={set("religion")} />
          <QuestionInput id="introextro" question="Are you an introvert or extrovert?" value={state.introextro || ""} onChange={set("introextro")} />
        </Section>

        <Section title="Fashion">
          <QuestionInput id="brands" question="What clothing brands do you usually shop from?" value={state.brands || ""} onChange={set("brands")} />
          <QuestionInput id="shop-mode" question="Do you prefer shopping online or in-store?" value={state.shopmode || ""} onChange={set("shopmode")} />
          <QuestionInput id="style" question="How would you describe your style?" value={state.style || ""} onChange={set("style")} />
          <QuestionInput id="brand-matters" question="What matters most to you when choosing a brand?" value={state.brandmatters || ""} onChange={set("brandmatters")} />
        </Section>

        <Section title="Interests and Hobbies">
          <QuestionInput id="top-hobbies" question="What are your top 3 hobbies?" value={state.tophobbies || ""} onChange={set("tophobbies")} />
          <QuestionInput id="new-hobby" question="What's a hobby you've recently picked up?" value={state.newhobby || ""} onChange={set("newhobby")} />
        </Section>

        <Section title="Travel">
          <QuestionInput id="like-travel" question="Do you like to travel?" value={state.liketravel || ""} onChange={set("liketravel")} />
          <QuestionInput id="beach-mountains" question="Are you more of a beach or mountains person?" value={state.beachmountain || ""} onChange={set("beachmountain")} />
        </Section>
      </div>

      <div className="mt-8 text-xs text-gray-500 text-center">
        By entering information, I agree to Hushh's
        <a className="text-red-500 underline ml-1" href="/legal/termsofuse">Terms of Service</a>,
        {/* <a className="text-red-500 underline ml-1" href="/non-discrimination">Non-discrimination Policy</a> */}
        {/* and <a className="text-red-500 underline" href="/payments-terms">Payments Terms of Service</a> and acknowledge the */}
        <a className="text-red-500 underline ml-1" href="/legal/privacypolicy">Privacy Policy</a>.
        See our Consent Policy <a className="text-red-500 underline" href="/consent-ai-protocol">here</a>.
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={saving}
          onClick={async () => {
            if (authLoading) return;
            if (!user?.email) { router.push("/login"); return; }
            try {
              setSaving(true);
              await savePreferences({ email: user.email, answers: buildPreferencesPayload(state) });
              try {
                localStorage.setItem("hushh_social_preferences", JSON.stringify(state));
              } catch {}
              router.push("/social-onboarding/completed");
            } catch (e) {
              console.error(e);
              alert("Failed to save preferences");
            } finally {
              setSaving(false);
            }
          }}
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Continue"} <span aria-hidden>→</span>
        </button>
      </div>
    </main>
    </ContentWrapper>
  );
}


