"use client";
import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserDetails } from "../../lib/api/socialOnboarding";
import Image from "next/image";
import Link from "next/link";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";

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
        <div className="w-full aspect-[4/5] rounded-[25px] bg-gray-100 flex items-center justify-center text-xs text-gray-500">
          No image
        </div>
      );
    }

    return (
      <div className="w-full aspect-[4/5] rounded-[25px] overflow-hidden bg-gray-200 relative">
        {!loaded && !errored && (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Profile photo ${index + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          crossOrigin="anonymous"
        />
        {errored && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 bg-gray-100">
            <div className="text-center">
              <div>Image unavailable</div>
              <div className="mt-1 opacity-70">#{index + 1}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <ContentWrapper>
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-14">
      {loading && (
        <div>
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-400">‹</div>
            <div className="flex gap-3 sm:gap-4 lg:gap-6 flex-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-1 min-w-0">
                  <div className="w-full aspect-[4/5] rounded-[25px] bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-400">›</div>
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
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <button 
            aria-label="Previous" 
            onClick={prevWindow} 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-black flex items-center justify-center flex-shrink-0 disabled:opacity-50 hover:bg-gray-50 transition-colors" 
            disabled={images.length <= pageSize}
          >
            <span className="text-lg sm:text-xl">‹</span>
          </button>
          
          <div className="flex gap-3 sm:gap-4 lg:gap-6 flex-1 overflow-hidden">
            {images.length > 0 ? (
              images.slice(windowStart, windowStart + pageSize).map((src, i) => (
                <div key={`${windowStart}-${i}`} className="flex-1 min-w-0">
                  <ImageCard src={src} index={windowStart + i} />
                </div>
              ))
            ) : (
              // Show placeholder cards when no images
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-1 min-w-0">
                  <div className="w-full aspect-[4/5] rounded-[25px] bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    No photos uploaded
                  </div>
                </div>
              ))
            )}
          </div>
          
          <button 
            aria-label="Next" 
            onClick={nextWindow} 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-black flex items-center justify-center flex-shrink-0 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            disabled={images.length <= pageSize}
          >
            <span className="text-lg sm:text-xl">›</span>
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

        <div className="text-sm md:text-base font-semibold">Hobbies</div>
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
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_973_557)">
<path d="M12.6789 49.823C10.745 49.8015 8.82918 49.4468 7.01569 48.7745C5.69139 48.285 4.49324 47.5057 3.50882 46.4936C2.494 45.5112 1.71357 44.3127 1.22549 42.9873C0.5538 41.1738 0.199599 39.2582 0.178431 37.3245C0.029902 34.1098 0 33.1456 0 25C0 16.8544 0.0328431 15.8936 0.176961 12.6765C0.200697 10.7435 0.555334 8.82891 1.22549 7.01569C1.71595 5.69118 2.49527 4.49254 3.50686 3.50686C4.49006 2.49296 5.68878 1.71325 7.01422 1.22549C8.82771 0.553243 10.7435 0.198543 12.6775 0.176961C15.8931 0.029902 16.8588 0 25 0C33.1412 0 34.1064 0.0328431 37.3235 0.176961C39.257 0.20053 41.1721 0.555169 42.9858 1.22549C44.3106 1.71389 45.509 2.49333 46.4926 3.50637C47.506 4.49031 48.2858 5.68902 48.7745 7.01422C49.4469 8.82768 49.8018 10.7435 49.8235 12.6775C49.9706 15.8946 50.0005 16.8578 50.0005 25.001C50.0005 33.1441 49.9706 34.1073 49.8235 37.3245C49.8002 39.2582 49.4454 41.1735 48.7745 42.9873C48.2671 44.3025 47.4898 45.497 46.4928 46.4937C45.4958 47.4905 44.3012 48.2674 42.9858 48.7745C41.1723 49.4469 39.2565 49.8018 37.3225 49.8235C34.1083 49.9706 33.1422 50.0005 24.999 50.0005C16.8559 50.0005 15.8926 49.9721 12.6784 49.8235" fill="url(#paint0_radial_973_557)"/>
<path d="M12.6789 49.823C10.745 49.8015 8.82918 49.4468 7.01569 48.7745C5.69139 48.285 4.49324 47.5057 3.50882 46.4936C2.494 45.5112 1.71357 44.3127 1.22549 42.9873C0.5538 41.1738 0.199599 39.2582 0.178431 37.3245C0.029902 34.1098 0 33.1456 0 25C0 16.8544 0.0328431 15.8936 0.176961 12.6765C0.200697 10.7435 0.555334 8.82891 1.22549 7.01569C1.71595 5.69118 2.49527 4.49254 3.50686 3.50686C4.49006 2.49296 5.68878 1.71325 7.01422 1.22549C8.82771 0.553243 10.7435 0.198543 12.6775 0.176961C15.8931 0.029902 16.8588 0 25 0C33.1412 0 34.1064 0.0328431 37.3235 0.176961C39.257 0.20053 41.1721 0.555169 42.9858 1.22549C44.3106 1.71389 45.509 2.49333 46.4926 3.50637C47.506 4.49031 48.2858 5.68902 48.7745 7.01422C49.4469 8.82768 49.8018 10.7435 49.8235 12.6775C49.9706 15.8946 50.0005 16.8578 50.0005 25.001C50.0005 33.1441 49.9706 34.1073 49.8235 37.3245C49.8002 39.2582 49.4454 41.1735 48.7745 42.9873C48.2671 44.3025 47.4898 45.497 46.4928 46.4937C45.4958 47.4905 44.3012 48.2674 42.9858 48.7745C41.1723 49.4469 39.2565 49.8018 37.3225 49.8235C34.1083 49.9706 33.1422 50.0005 24.999 50.0005C16.8559 50.0005 15.8926 49.9721 12.6784 49.8235" fill="url(#paint1_radial_973_557)"/>
<path d="M18.8612 25.1062C18.8613 23.8816 19.2246 22.6845 19.905 21.6664C20.5855 20.6482 21.5526 19.8547 22.684 19.3861C23.8155 18.9176 25.0604 18.7951 26.2615 19.0342C27.4626 19.2732 28.5658 19.863 29.4316 20.7291C30.2974 21.5951 30.887 22.6985 31.1258 23.8996C31.3645 25.1007 31.2417 26.3456 30.7729 27.477C30.3041 28.6083 29.5104 29.5752 28.492 30.2554C27.4737 30.9356 26.2765 31.2986 25.0519 31.2984C23.4099 31.2981 21.8352 30.6456 20.6742 29.4844C19.5132 28.3231 18.8611 26.7483 18.8612 25.1062ZM15.5137 25.1062C15.5137 26.9927 16.0731 28.8369 17.1212 30.4054C18.1692 31.974 19.6589 33.1965 21.4018 33.9184C23.1447 34.6404 25.0625 34.8292 26.9127 34.4612C28.763 34.0932 30.4625 33.1847 31.7965 31.8508C33.1304 30.5168 34.0388 28.8173 34.4069 26.9671C34.7749 25.1168 34.586 23.199 33.8641 21.4561C33.1422 19.7132 31.9196 18.2236 30.3511 17.1755C28.7825 16.1274 26.9384 15.568 25.0519 15.568C23.7993 15.5679 22.559 15.8146 21.4017 16.2939C20.2445 16.7733 19.193 17.4758 18.3072 18.3615C17.4215 19.2473 16.7189 20.2988 16.2396 21.456C15.7603 22.6133 15.5136 23.8536 15.5137 25.1062ZM32.7387 15.1901C32.7385 15.6309 32.869 16.0619 33.1138 16.4286C33.3585 16.7952 33.7065 17.081 34.1137 17.2499C34.5209 17.4188 34.9691 17.4631 35.4015 17.3773C35.8339 17.2915 36.2312 17.0794 36.543 16.7678C36.8549 16.4562 37.0673 16.0592 37.1535 15.6269C37.2397 15.1945 37.1958 14.7463 37.0272 14.339C36.8587 13.9316 36.5732 13.5834 36.2067 13.3383C35.8403 13.0932 35.4094 12.9623 34.9686 12.9621C34.3777 12.9624 33.8111 13.1972 33.3931 13.6149C32.9752 14.0326 32.7402 14.5992 32.7397 15.1901M17.5485 40.2263C16.3706 40.2134 15.2037 39.9978 14.099 39.5891C13.2978 39.2803 12.5701 38.8071 11.9629 38.2001C11.3556 37.5931 10.8821 36.8656 10.573 36.0646C10.1641 34.9599 9.9485 33.793 9.93575 32.6151C9.84556 30.6572 9.82791 30.069 9.82791 25.1087C9.82791 20.1484 9.84752 19.5616 9.93575 17.6018C9.95004 16.4241 10.1656 15.2574 10.573 14.1523C10.8818 13.3509 11.3551 12.6231 11.9624 12.0157C12.5697 11.4084 13.2975 10.9351 14.099 10.6263C15.2037 10.2174 16.3706 10.0018 17.5485 9.98909C19.5063 9.89889 20.0946 9.88125 25.0529 9.88125C30.0112 9.88125 30.6 9.90037 32.5598 9.98958C33.7375 10.0039 34.9042 10.2194 36.0093 10.6268C36.8107 10.9356 37.5385 11.409 38.1458 12.0163C38.7531 12.6236 39.2264 13.3514 39.5353 14.1528C39.9442 15.2575 40.1597 16.4244 40.1725 17.6023C40.2627 19.5631 40.2803 20.1484 40.2803 25.1092C40.2803 30.07 40.2622 30.6562 40.1725 32.616C40.1588 33.7939 39.9433 34.9606 39.5353 36.0656C39.2261 36.8666 38.7527 37.5941 38.1454 38.2011C37.5381 38.8081 36.8105 39.2813 36.0093 39.5901C34.9046 39.999 33.7377 40.2146 32.5598 40.2273C30.6019 40.3175 30.0137 40.3352 25.0529 40.3352C20.0921 40.3352 19.5058 40.317 17.5485 40.2273M17.3946 6.64448C15.8533 6.67479 14.3284 6.9665 12.8848 7.50722C11.6507 7.98436 10.53 8.71412 9.59439 9.64969C8.65882 10.5853 7.92906 11.706 7.45192 12.9401C6.91128 14.3837 6.61956 15.9086 6.58919 17.4499C6.49752 19.4303 6.47693 20.0636 6.47693 25.1082C6.47693 30.1528 6.49801 30.7857 6.58919 32.7665C6.61956 34.3078 6.91127 35.8327 7.45192 37.2763C7.92909 38.5104 8.65885 39.6311 9.59442 40.5667C10.53 41.5023 11.6507 42.232 12.8848 42.7092C14.3285 43.2497 15.8533 43.5414 17.3946 43.5719C19.3759 43.6621 20.0083 43.6842 25.0529 43.6842C30.0975 43.6842 30.7304 43.6631 32.7112 43.5719C34.2525 43.5415 35.7774 43.2498 37.221 42.7092C38.4551 42.232 39.5758 41.5023 40.5114 40.5667C41.447 39.6311 42.1767 38.5104 42.6539 37.2763C43.1952 35.8329 43.487 34.3079 43.5166 32.7665C43.6068 30.7847 43.6274 30.1528 43.6274 25.1082C43.6274 20.0636 43.6063 19.4308 43.5166 17.4499C43.4863 15.9086 43.1946 14.3837 42.6539 12.9401C42.1767 11.7062 41.4472 10.5857 40.5119 9.65012C39.5766 8.71458 38.4562 7.98469 37.2225 7.50722C35.779 6.96615 34.254 6.67443 32.7127 6.64448C30.7318 6.5538 30.099 6.53223 25.0554 6.53223C20.0117 6.53223 19.3774 6.55331 17.3955 6.64448" fill="white"/>
</g>
<defs>
<radialGradient id="paint0_radial_973_557" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.23578 48.9049) scale(63.4814)">
<stop offset="0.09" stop-color="#FA8F21"/>
<stop offset="0.78" stop-color="#D82D7E"/>
</radialGradient>
<radialGradient id="paint1_radial_973_557" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34.6333 47.299) scale(55.8642)">
<stop offset="0.64" stop-color="#8C3AAA" stop-opacity="0"/>
<stop offset="1" stop-color="#8C3AAA"/>
</radialGradient>
<clipPath id="clip0_973_557">
<rect width="50" height="50" fill="white"/>
</clipPath>
</defs>
</svg>

                  </LinkIcon>
                  <LinkIcon href={socials.linkedin} label="LinkedIn">
                    <svg className={iconClass} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27 0H5C2.23858 0 0 2.23858 0 5V27C0 29.7614 2.23858 32 5 32H27C29.7614 32 32 29.7614 32 27V5C32 2.23858 29.7614 0 27 0Z" fill="#2867B2"/>
                      <path d="M11.6 24H8.2V13.3H11.6V24ZM9.9 11.8C8.8 11.8 8 11 8 9.9C8 8.8 8.9 8 9.9 8C11 8 11.8 8.8 11.8 9.9C11.8 11 11 11.8 9.9 11.8ZM24 24H20.6V18.2C20.6 16.5 19.9 16 18.9 16C17.9 16 16.9 16.8 16.9 18.3V24H13.5V13.3H16.7V14.8C17 14.1 18.2 13 19.9 13C21.8 13 23.8 14.1 23.8 17.4V24H24Z" fill="white"/>
                    </svg>
                  </LinkIcon>
                  <LinkIcon href={socials.twitter || socials.x} label="X">
                  <svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M56 27.5C56 28.2429 55.9709 28.9714 55.8982 29.7C55.36 36.3857 52.3491 42.4286 47.7818 46.9286C42.7055 51.9143 35.7091 55 28 55C25.92 55 23.8982 54.7714 21.9636 54.3429C20.5964 54.0571 19.2873 53.6714 18.0073 53.1857C7.50546 49.2143 0 39.1714 0 27.5C0 19.9429 3.15636 13.0571 8.21818 8.07143C13.2945 3.08571 20.2909 0 28 0C35.7091 0 42.7055 3.08571 47.7818 8.07143C50.9527 11.2 53.3818 15.0714 54.7491 19.3857C55.3455 21.2857 55.7382 23.2571 55.8982 25.3C55.9127 25.4429 55.9273 25.6 55.9273 25.7429C55.9855 26.3286 56 26.9 56 27.5Z" fill="url(#paint0_linear_973_573)"/>
<path d="M55.9998 27.4995C55.9998 28.2424 55.9707 28.9709 55.898 29.6995C55.3598 36.3852 52.3489 42.4281 47.7816 46.9281C42.7052 51.9138 35.7089 54.9995 27.9998 54.9995C25.9198 54.9995 23.898 54.7709 21.9634 54.3424L11.7961 43.8852L24.2907 29.6424L11.9852 12.0566H22.6471L31.7816 21.0852L39.6798 12.0566H44.1016L55.4616 23.9995C55.6361 24.5709 55.7961 25.1566 55.9271 25.7424C55.9852 26.3281 55.9998 26.8995 55.9998 27.4995Z" fill="#161616"/>
<path d="M44.9162 43.8856H34.2544L26.2544 32.4427L16.2326 43.8856H11.8108L24.2908 29.6427L11.9999 12.0713H22.6617L30.2253 22.8856L39.6944 12.0713H44.1162L32.189 25.6856L44.9308 43.8856H44.9162ZM34.9526 42.5856H42.4144L30.5162 25.5856L41.2362 13.3427H40.2908L30.0944 24.9856L21.949 13.3427H14.4872L25.949 29.7141L14.6762 42.5856H15.6217L26.3708 30.3141L34.9526 42.5856ZM41.2508 41.9856H35.5199L15.6217 14.0427H21.3526L41.2508 41.9856ZM36.2035 40.6999H38.7199L20.669 15.3427H18.1526L36.2035 40.6999Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_973_573" x1="3.76727" y1="13.7571" x2="51.7921" y2="41.9924" gradientUnits="userSpaceOnUse">
<stop stop-color="#646464"/>
<stop offset="0.72" stop-color="#1D1D1D"/>
<stop offset="1"/>
</linearGradient>
</defs>
</svg>

                  </LinkIcon>
                  <LinkIcon href={socials.facebook || socials.meta} label="Facebook">
                    <svg className={iconClass} viewBox="0 0 68 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="68" height="70" fill="#1877F2"/>
                      <path d="M47 35H36V28C36 25.2 37.4 24 40 24H45V17H38C31.4 17 28 21.8 28 28V35H22V42H28V63H36V42H44L47 35Z" fill="white"/>
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
    </ContentWrapper>
  );
}


