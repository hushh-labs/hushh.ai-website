'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Database, Sparkles, Send } from 'lucide-react';

const icons = {
    Fingerprint,
    Database,
    Sparkles,
    Send,
};

const StepProcess = ({ steps }) => {
    return (
        <div className="relative my-12 pl-4">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--border-primary)] to-transparent" />

            <div className="space-y-12">
                {steps.map((step, index) => {
                    const Icon = icons[step.icon] || Sparkles;

                    return (
                        <div key={index} className="relative flex gap-6 group">
                            {/* Icon Bubble */}
                            <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center shadow-sm group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <Icon className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                                <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[var(--accent-primary)] text-[var(--accent-contrast)] text-[10px] font-bold flex items-center justify-center border-2 border-[var(--bg-primary)]">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-1">
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
                                    {step.description}
                                </p>
                                {step.snippet && (
                                    <div className="mt-3 p-2 bg-[var(--code-bg)] rounded-md border border-[var(--border-primary)] inline-block">
                                        <code className="text-[10px] sm:text-xs font-mono text-[var(--text-tertiary)]">
                                            {step.snippet}
                                        </code>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepProcess;
