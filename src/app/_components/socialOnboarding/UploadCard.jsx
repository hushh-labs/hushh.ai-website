"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";

/**
 * UploadCard
 * Reusable, accessible upload card with drag-and-drop and keyboard support.
 * Purely UI for now – consumers receive selected File via onSelect.
 */
export default function UploadCard({
  id,
  label = "Upload a picture from your computer",
  required = false,
  hasError = false,
  onSelect,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  }, []);

  const handleChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onSelect?.(file);
    },
    [onSelect]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onSelect?.(file);
    },
    [onSelect]
  );

  const borderColor = hasError
    ? "border-red-600"
    : isDragging
    ? "border-black"
    : "border-[#959595]";

  const bgColor = hasError ? "bg-red-100/40" : "bg-[rgba(217,217,217,0.21)]";

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-required={required}
        onKeyDown={handleKeyDown}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl ${bgColor} border-4 border-dashed ${borderColor} transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black/60 focus:ring-offset-2 focus:ring-offset-white`}
        style={{ minHeight: 280 }}
      >
        {required && (
          <span
            aria-hidden
            className="absolute right-2 top-2 text-rose-600 text-2xl leading-none"
          >
            *
          </span>
        )}

        {/* Content */}
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
          {previewUrl ? (
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-black/10">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={previewUrl} fill sizes="112px" className="object-cover" />
            </div>
          ) : (
            <div
              className="grid place-items-center h-14 w-14 rounded-full bg-white shadow-sm border border-black/10"
              aria-hidden
            >
              <span className="text-2xl text-gray-600">+</span>
            </div>
          )}
          <p className="m-0 leading-snug text-gray-700 text-base font-semibold">
            {hasError ? "Oh no! This field cannot be left empty" : label}
          </p>
          <input
            id={id}
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            aria-invalid={hasError}
          />
        </div>
      </div>
    </div>
  );
}


