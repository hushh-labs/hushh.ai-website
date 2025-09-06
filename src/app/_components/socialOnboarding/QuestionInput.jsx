"use client";
import React from "react";

export default function QuestionInput({ id, question, value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm md:text-base font-semibold text-black mb-2">
        {question}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-[15px] bg-[#d9d9d9] px-4 py-3 outline-none focus:ring-2 focus:ring-black/60"
        autoComplete="off"
      />
    </div>
  );
}


