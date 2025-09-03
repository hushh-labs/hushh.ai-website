"use client";
import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserDetails } from "../../lib/api/socialOnboarding";
import Image from "next/image";
import Link from "next/link";

// Metadata for this route can be defined at layout level if needed

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
  const [socials, setSocials] = useState({});
  // Only use real images from API; no local placeholders

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
        console.log("[Dashboard] Profile pictures received:", pics);
        console.log("[Dashboard] Number of images:", pics.length);

        // Name
        const fullName = `${ud.first_name || ""} ${ud.last_name || ""}`.trim() || ud.name || "Your Social Profile";
        setName(fullName);

        // Parse social links array of JSON strings
        const socialsObj = (ud.social_media_link || [])
          .map((s) => {
            try { return JSON.parse(s); } catch { return {}; }
          })
          .reduce((acc, cur) => Object.assign(acc, cur), {});
        setSocials(socialsObj);

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

  const images = gallery;
  const pageSize = 4;
  const maxStart = Math.max(0, images.length - pageSize);
  const nextWindow = () => setWindowStart((s) => (s + pageSize > maxStart ? 0 : s + pageSize));
  const prevWindow = () => setWindowStart((s) => (s - pageSize < 0 ? maxStart : s - pageSize));

  function ImageCard({ src, index }) {
    const [loaded, setLoaded] = React.useState(false);
    const [errored, setErrored] = React.useState(false);
    
    React.useEffect(() => {
      console.log(`[ImageCard ${index}] Rendering with src:`, src);
    }, [src, index]);

    const handleLoad = () => {
      console.log(`[ImageCard ${index}] Image loaded successfully:`, src);
      setLoaded(true);
    };

    const handleError = (e) => {
      console.error(`[ImageCard ${index}] Image failed to load:`, src, e);
      setErrored(true);
    };

    if (!src) {
      console.warn(`[ImageCard ${index}] No src provided`);
      return (
        <div className="relative aspect-square rounded-[20px] overflow-hidden border border-black/10 bg-gray-100 grid place-items-center text-xs text-gray-500">
          No image
        </div>
      );
    }

    return (
      <div className="relative aspect-square rounded-[20px] overflow-hidden border border-black/10">
        {!loaded && !errored && (
          <div className="inset-0 bg-gray-200 animate-pulse" />
        )}
        {/* Use native img to avoid Next/Image domain constraints entirely */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={src}
          alt={`Profile photo ${index + 1}`}
          className={` inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
          onError={handleError}
          width={100}
          height={100}
          loading="lazy"
          decoding="async"
          crossOrigin="anonymous"
        />
        {errored && (
          <div className=" inset-0 grid place-items-center text-xs text-gray-500 bg-gray-100">
            <div className="text-center">
              <div>Image unavailable</div>
              <div className="mt-1 text-xs opacity-70">#{index + 1}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-14">
      {loading && (
        <div>
          <div className="flex items-center gap-4 overflow-hidden pb-4">
            <div className="h-10 w-10 rounded-full border border-gray-300 grid place-items-center flex-none text-gray-400">‹</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="relative aspect-square rounded-[20px] overflow-hidden bg-gray-200 animate-pulse" />
              ))}
            </div>
            <div className="h-10 w-10 rounded-full border border-gray-300 grid place-items-center flex-none text-gray-400">›</div>
          </div>
          <div className="mt-6 mb-2 h-7 w-64 mx-auto bg-gray-200 rounded animate-pulse" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[140px,1fr] gap-6 md:gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              </React.Fragment>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="h-10 w-56 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-10 w-44 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {/* Photo strip - 4 items window with arrows */}
      {!loading && (
        <div className="flex items-center gap-4 overflow-hidden pb-4">
          <button 
            aria-label="Previous" 
            onClick={prevWindow} 
            className="h-10 w-10 rounded-full border border-black grid place-items-center flex-none disabled:opacity-50" 
            disabled={images.length <= pageSize}
          >
            ‹
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {images.length > 0 ? (
              images.slice(windowStart, windowStart + pageSize).map((src, i) => (
                <ImageCard key={`${windowStart}-${i}`} src={src} index={windowStart + i} />
              ))
            ) : (
              // Show placeholder cards when no images
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="relative aspect-square rounded-[20px] overflow-hidden border border-black/10 bg-gray-100 grid place-items-center text-xs text-gray-500">
                  No photos uploaded
                </div>
              ))
            )}
          </div>
          <button 
            aria-label="Next" 
            onClick={nextWindow} 
            className="h-10 w-10 rounded-full border border-black grid place-items-center flex-none disabled:opacity-50"
            disabled={images.length <= pageSize}
          >
            ›
          </button>
        </div>
      )}

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

      {/* Social links */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          ))
        ) : (
          <>
            {(() => {
              const iconClass = "h-6 w-6";
              const ensureProtocol = (u) => (u && /^https?:\/\//i.test(u) ? u : u ? `https://${u}` : "");
              const LinkIcon = ({ href, label, children }) => (
                href ? (
                  <a href={ensureProtocol(href)} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex h-10 w-10 items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-black/50">
                    {children}
                  </a>
                ) : null
              );
              return (
                <>
                  <LinkIcon href={socials.instagram} label="Instagram">
                    <svg className={iconClass} viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="igGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#F58529"/>
                          <stop offset="50%" stopColor="#DD2A7B"/>
                          <stop offset="75%" stopColor="#8134AF"/>
                          <stop offset="100%" stopColor="#515BD4"/>
                        </linearGradient>
                      </defs>
                      <rect rx="6" ry="6" width="24" height="24" fill="url(#igGrad)"/>
                      <path fill="#fff" d="M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2zm0-3.2c2.3 0 2.6.01 3.5.05.9.04 1.4.18 1.7.3.4.16.7.35 1 .67.32.32.51.6.67 1 .12.3.26.8.3 1.7.04.9.05 1.3.05 3.5s-.01 2.6-.05 3.5c-.04.9-.18 1.4-.3 1.7-.16.4-.35.7-.67 1-.32.32-.6.51-1 .67-.3.12-.8.26-1.7.3-.9.04-1.3.05-3.5.05s-2.6-.01-3.5-.05c-.9-.04-1.4-.18-1.7-.3-.4-.16-.7-.35-1-.67-.32-.32-.51-.6-.67-1-.12-.3-.26-.8-.3-1.7C4.01 14.6 4 14.2 4 12s.01-2.6.05-3.5c.04-.9.18-1.4.3-1.7.16-.4.35-.7.67-1 .32-.32.6-.51 1-.67.3-.12.8-.26 1.7-.3C9.4 5.01 9.8 5 12 5z"/>
                    </svg>
                  </LinkIcon>
                  <LinkIcon href={socials.linkedin} label="LinkedIn">
                    <svg className={iconClass} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.211 0.476074H2.63422C1.69136 0.476074 0.925293 1.25286 0.925293 2.20643V22.7457C0.925293 23.6993 1.69136 24.4761 2.63422 24.4761H23.211C24.1539 24.4761 24.9253 23.6993 24.9253 22.7457V2.20643C24.9253 1.25286 24.1539 0.476074 23.211 0.476074ZM8.17886 21.0475H4.62172V9.59393H8.18422V21.0475H8.17886ZM6.40029 8.02965C5.25922 8.02965 4.33779 7.10286 4.33779 5.96715C4.33779 4.83143 5.25922 3.90465 6.40029 3.90465C7.53601 3.90465 8.46279 4.83143 8.46279 5.96715C8.46279 7.10822 7.54136 8.02965 6.40029 8.02965ZM21.5128 21.0475H17.9557V15.4761C17.9557 14.1475 17.9289 12.4386 16.1074 12.4386C14.2539 12.4386 13.9699 13.885 13.9699 15.3796V21.0475H10.4128V9.59393H13.8253V11.1582H13.8735C14.3503 10.2582 15.5128 9.31 17.2432 9.31C20.8432 9.31 21.5128 11.6832 21.5128 14.7689V21.0475Z" fill="white"/>
                    </svg>
                  </LinkIcon>
                  <LinkIcon href={socials.twitter || socials.x} label="X">
                    <svg className={iconClass} viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="6" fill="#000"/>
                      <path fill="#fff" d="M4 3l7.5 9.2L4.7 21h2.7l5.3-6.3L17.8 21H21l-7.7-9.3L20.3 3h-2.7l-5 5.9L7 3H4z"/>
                    </svg>
                  </LinkIcon>
                  <LinkIcon href={socials.facebook || socials.meta} label="Facebook">
                    <svg className={iconClass} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27 0H5C2.23858 0 0 2.23858 0 5V27C0 29.7614 2.23858 32 5 32H27C29.7614 32 32 29.7614 32 27V5C32 2.23858 29.7614 0 27 0Z" fill="#1877F2"/>
                      <path d="M18.7969 32V19.7031H22.9375L23.5938 14.7969H18.7969V11.4844C18.7969 10.0156 19.1875 8.98438 21.2188 8.98438H23.7812V4.60938C23.3281 4.54688 21.8125 4.42188 20.0469 4.42188C16.3594 4.42188 13.8906 6.60938 13.8906 10.9688V14.7969H9.75V19.7031H13.8906V32H18.7969Z" fill="white"/>
                    </svg>
                  </LinkIcon>
                </>
              );
            })()}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button className="rounded-full bg-black px-6 py-3 text-white">Ask your PDA to edit your Profile</button>
        <Link href="/profile/view" className="rounded-full bg-[#4788f4] px-6 py-3 text-white">View your Profile</Link>
      </div>
    </main>
  );
}


