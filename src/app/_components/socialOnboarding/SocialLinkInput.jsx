"use client";
import React from "react";

export default function SocialLinkInput({
  id,
  label,
  icon,
  placeholder = "Mention username or share profile link",
  value,
  onChange,
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="flex items-center gap-3 text-sm md:text-base font-semibold text-black mb-2">
        {icon ? <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center">{icon}</span> : null}
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-[#544d4d] bg-[rgba(217,217,217,0.25)] px-4 py-3 outline-none focus:ring-2 focus:ring-black/60"
          inputMode="url"
          autoComplete="off"
        />
      </div>
    </div>
  );
}


