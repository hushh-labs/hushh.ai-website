"use client";
import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserDetails } from "../../lib/api/socialOnboarding";
import Image from "next/image";
import Link from "next/link";

// Metadata for this route can be defined at layout level if needed

const samplePhotos = [
  "/public/placeholder/1.jpg",
  "/public/placeholder/2.jpg",
  "/public/placeholder/3.jpg",
  "/public/placeholder/4.jpg",
];

export default function SocialProfileDashboard() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [likesText, setLikesText] = useState("");
  const [relationshipText, setRelationshipText] = useState("");
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [windowStart, setWindowStart] = useState(0); // for 4-image window
  const photos = useMemo(() => samplePhotos, []);

  React.useEffect(() => {
    const hydrate = async () => {
      try {
        setLoading(true);
        setError("");
        // Optional: read cached values (not used in UI now)
        // const prefs = JSON.parse(localStorage.getItem("hushh_social_preferences") || "{}");

        // Resolve email from auth, query param, or localStorage
        const urlEmail = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("email") : null;
        const resolvedEmail = user?.email || urlEmail || localStorage.getItem("hushh_last_email") || "";
        if (!resolvedEmail) {
          setError("No user email found. Please login again.");
          setLoading(false);
          return;
        }
        try { localStorage.setItem("hushh_last_email", resolvedEmail); } catch {}

        console.log("[Dashboard] Fetching user details for:", resolvedEmail);
        const resp = await getUserDetails(resolvedEmail);
        console.log("[Dashboard] API response:", resp);
        const data = resp?.data || {};
        const ud = Array.isArray(data.user_data) ? data.user_data[0] || {} : {};
        const pics = Array.isArray(data.profile_pictures) ? data.profile_pictures : [];

        // Name
        const fullName = `${ud.first_name || ""} ${ud.last_name || ""}`.trim() || ud.name || "Your Social Profile";
        setName(fullName);

        // Parse social links array of JSON strings
        const socialsObj = (ud.social_media_link || [])
          .map((s) => {
            try { return JSON.parse(s); } catch { return {}; }
          })
          .reduce((acc, cur) => Object.assign(acc, cur), {});

        // Preference answers
        const sections = ud.user_preference?.sections || [];
        const answer = (id) => {
          for (const s of sections) {
            const q = (s.questions || []).find((qq) => qq.id === id);
            if (q?.answer) return q.answer;
          }
          return "";
        };

        // Build About / Likes / Relationship sentences
        const aboutParts = [];
        if (ud.gender) aboutParts.push(`${fullName.split(" ")[0]} is ${ud.gender}.`);
        if (ud.city || ud.country) aboutParts.push(`Based in ${[ud.city, ud.country].filter(Boolean).join(", ")}.`);
        const wake = answer("wake_time");
        const dayType = answer("day_type");
        if (wake) aboutParts.push(`Usually wakes up at ${wake}.`);
        if (dayType) aboutParts.push(`More of a ${dayType}.`);
        if (ud.reason_for_using_hushhTech) aboutParts.push(ud.reason_for_using_hushhTech);
        setAboutText(aboutParts.join(" ").trim());

        const likesParts = [];
        const hobbies = answer("top_hobbies");
        const brands = answer("brands");
        const style = answer("style");
        if (hobbies) likesParts.push(`Hobbies: ${hobbies}.`);
        if (brands) likesParts.push(`Favourite brands: ${brands}.`);
        if (style) likesParts.push(`Style: ${style}.`);
        setLikesText(likesParts.join(" ").trim());

        const relationParts = [];
        const personality = answer("personality");
        const travelLove = answer("travel_love");
        const travelPref = answer("travel_preference");
        if (personality) relationParts.push(`Personality: ${personality}.`);
        if (travelLove) relationParts.push(`Likes to travel: ${travelLove}.`);
        if (travelPref) relationParts.push(`Prefers ${travelPref}.`);
        setRelationshipText(relationParts.join(" ").trim());

        setGallery(pics);
        setLoading(false);
      } catch (e) {
        console.error("Failed to load user details", e);
        setError("Failed to load your profile. Please try again.");
        setLoading(false);
      }
    };
    hydrate();
  }, [user?.email]);

  const images = gallery.length ? gallery : photos;
  const pageSize = 4;
  const maxStart = Math.max(0, images.length - pageSize);
  const nextWindow = () => setWindowStart((s) => (s + pageSize > maxStart ? 0 : s + pageSize));
  const prevWindow = () => setWindowStart((s) => (s - pageSize < 0 ? maxStart : s - pageSize));

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-14">
      {loading && (
        <div className="text-center text-gray-600">Loading your social profile…</div>
      )}
      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {/* Photo strip - 4 items window with arrows */}
      <div className="flex items-center gap-4 overflow-hidden pb-4">
        <button aria-label="Previous" onClick={prevWindow} className="h-10 w-10 rounded-full border border-black grid place-items-center flex-none">‹</button>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {images.slice(windowStart, windowStart + pageSize).map((src, i) => (
            <div key={`${windowStart}-${i}`} className="relative aspect-square rounded-[20px] overflow-hidden border border-black/10">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={src} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
        <button aria-label="Next" onClick={nextWindow} className="h-10 w-10 rounded-full border border-black grid place-items-center flex-none">›</button>
      </div>

      {/* Name */}
      <h1 className="mt-6 mb-2 text-center text-2xl md:text-3xl font-bold text-[#161616]">{name}</h1>
      <div className="flex justify-center gap-2" aria-hidden>
        {[0,1,2].map((d) => (
          <span key={d} className={`inline-block h-3 w-3 rounded-full ${d === 0 ? "bg-black" : "bg-gray-300"}`} />
        ))}
      </div>

      {/* Three sections: About, Likes, Relationship */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-[140px,1fr] gap-6 md:gap-10">
        <div className="text-sm md:text-base font-semibold">About</div>
        <p className="text-gray-700">{aboutText || "—"}</p>

        <div className="text-sm md:text-base font-semibold">Likes</div>
        <p className="text-gray-700">{likesText || "—"}</p>

        <div className="text-sm md:text-base font-semibold">Relationship</div>
        <p className="text-gray-700">{relationshipText || "—"}</p>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button className="rounded-full bg-black px-6 py-3 text-white">Ask your PDA to edit your Profile</button>
        <Link href="/profile/view" className="rounded-full bg-[#4788f4] px-6 py-3 text-white">View your Profile</Link>
      </div>
    </main>
  );
}


