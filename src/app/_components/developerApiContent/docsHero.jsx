'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const DocsHero = () => {
  return (
    <div className="relative w-full py-16 sm:py-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-3 py-1 rounded-full bg-[var(--accent-secondary)]/10 text-[var(--accent-primary)] border border-[var(--accent-secondary)]/20 text-xs font-medium uppercase tracking-wider mb-6 inline-block">
            Agent-to-Agent Architecture
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Build Consented <br /> Personalization
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Activate high-fidelity user data with Hushh Developer APIs.
          Bridge the gap between raw signals and actionable insights using our
          secure Agentic protocols.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/developer-Api/on-boarding" className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent-primary)] text-[var(--accent-contrast)] font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--accent-primary)]/20">
            Start Building
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/developer-Api/rootEndpoints" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-medium transition-all hover:bg-[var(--bg-tertiary)] active:scale-95">
            <Terminal size={18} />
            API Reference
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DocsHero;
