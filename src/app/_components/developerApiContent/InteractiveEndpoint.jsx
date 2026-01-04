'use client';
import React, { useState } from 'react';
import { Copy, Check, Play, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveEndpoint = ({ method, path, description, curlCommand, responseExample }) => {
  const [activeTab, setActiveTab] = useState('request');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowResponse(true);
      setActiveTab('response');
    }, 1200);
  };

  const methodColor = {
    GET: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    POST: 'bg-green-500/10 text-green-400 border-green-500/20',
    PUT: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  }[method] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <div className="my-8 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[var(--border-primary)] flex items-center justify-between flex-wrap gap-4 bg-[var(--bg-tertiary)]/50">
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className={`px-2 py-1 rounded-md border text-xs font-bold ${methodColor}`}>
            {method}
          </span>
          <span className="text-[var(--text-secondary)]">{path}</span>
        </div>
        <div className="flex gap-2">
            <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:opacity-90 transition-opacity text-xs font-medium disabled:opacity-50"
            >
            {isRunning ? (
                <>
                <span className="animate-spin">⟳</span> Running...
                </>
            ) : (
                <>
                <Play size={12} /> Run Request
                </>
            )}
            </button>
        </div>
      </div>

      <div className="p-4 bg-[var(--bg-secondary)]">
        <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>
        
        <div className="flex border-b border-[var(--border-primary)] mb-0">
          <button
            onClick={() => setActiveTab('request')}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'request'
                ? 'border-[var(--accent-primary)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Request
          </button>
          <button
            onClick={() => setActiveTab('response')}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'response'
                ? 'border-[var(--accent-primary)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Response
          </button>
        </div>

        <div className="relative group bg-[var(--code-block-bg)] rounded-b-lg rounded-tr-lg min-h-[150px] p-4 font-mono text-xs overflow-x-auto border border-t-0 border-[var(--border-primary)]">
            <AnimatePresence mode="wait">
                {activeTab === 'request' ? (
                    <motion.div
                    key="request"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[var(--text-secondary)]"
                    >
                    <pre className="whitespace-pre-wrap break-all text-[var(--text-tertiary)] bg-transparent border-none shadow-none p-0">
                        {curlCommand}
                    </pre>
                     <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-[var(--bg-tertiary)]/10 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/20 transition-all opacity-0 group-hover:opacity-100"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    </motion.div>
                ) : (
                    <motion.div
                    key="response"
                     initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    >
                        {showResponse ? (
                             <pre className="whitespace-pre-wrap text-green-400 bg-transparent border-none shadow-none p-0">
                                {responseExample}
                            </pre>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-[var(--text-tertiary)]">
                                <Terminal size={24} className="mb-2 opacity-50" />
                                <p>Run the request to see the response</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveEndpoint;
