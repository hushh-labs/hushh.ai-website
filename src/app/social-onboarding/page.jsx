"use client";
import React, { useState } from "react";
import UploadCard from "../_components/socialOnboarding/UploadCard";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { uploadImages } from "../lib/api/socialOnboarding";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";

export default function SocialOnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [files, setFiles] = useState([null, null, null, null]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateFileAtIndex = (index) => (file) => {
    setFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const allValid = files.slice(0, 3).every((f) => Boolean(f));

  const handleContinue = async () => {
    setAttemptedSubmit(true);
    if (!allValid) return;
    if (authLoading) return;
    if (!user?.email) {
      router.push("/login");
      return;
    }
    try {
      setSubmitting(true);
      await uploadImages({ email: user.email, files: files.filter(Boolean) });
      try {
        localStorage.setItem("hushh_social_images_count", String(files.filter(Boolean).length));
      } catch {}
      router.push("/social-onboarding/social-links");
    } catch (err) {
      console.error(err);
      alert("Failed to upload images. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentWrapper>
    <main className="relative mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
      {/* Header */}
      <section className="text-center mb-10 md:mb-14">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-black grid place-items-center">
          <span className="text-lg" aria-hidden>
            🙂
          </span>
        </div>
        <h1 className="m-0 text-2xl md:text-3xl font-bold text-[#161616]">
          Basic Information
        </h1>
        <p className="mt-2 text-gray-600">
          Please upload a few pictures of yourself
        </p>
      </section>

      {/* Upload grid */}
      <section className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <UploadCard
          id="upload-1"
          required
          onSelect={updateFileAtIndex(0)}
          hasError={attemptedSubmit && !files[0]}
        />
        <UploadCard
          id="upload-2"
          required
          onSelect={updateFileAtIndex(1)}
          hasError={attemptedSubmit && !files[1]}
        />
        <UploadCard
          id="upload-3"
          required
          onSelect={updateFileAtIndex(2)}
          hasError={attemptedSubmit && !files[2]}
        />
        <UploadCard
          id="upload-4"
          onSelect={updateFileAtIndex(3)}
          hasError={false}
          label={
            attemptedSubmit && !allValid
              ? "Oh no! This field cannot be left empty"
              : "Upload a picture from your computer"
          }
        />
      </section>

      {/* Continue button */}
      <section className="mt-10 md:mt-14 flex justify-center">
        <button
          type="button"
          onClick={handleContinue}
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 disabled:opacity-60"
          aria-label="Continue"
        >
          {submitting ? "Uploading..." : "Continue"}
          <span aria-hidden>→</span>
        </button>
      </section>

      {/* Step indicator (placeholder) */}
      <div className="sr-only" aria-live="polite">
        Step 1 of 4
      </div>
    </main>
    </ContentWrapper>
  );
}


