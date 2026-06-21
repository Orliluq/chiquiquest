'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { useHero } from '@/lib/hero-store';

export function ArcaneKnowledge() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { hero } = useHero();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to search');

      setResult(data.result);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f111a] border border-[#1e293b] rounded-xl p-6 flex flex-col mt-6 relative overflow-hidden" id="arcane-knowledge">
      <div className="absolute -bottom-10 -right-10 text-cyan-500/5 rotate-12 pointer-events-none">
        <BookOpen size={150} />
      </div>
      
      <h3 className="font-mono text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3 relative z-10">
        <BookOpen size={16} className="text-purple-400" /> Arcane Knowledge (Search Docs)
      </h3>
      
      <form onSubmit={handleSearch} className="flex gap-2 mt-4 relative z-10">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            id="search-query"
            name="search-query"
            type="text" 
            placeholder="e.g., AWS S3 SDK best practices..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-[#050508] border border-slate-800 rounded-lg pl-9 p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-slate-600"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !query}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs px-4 rounded-lg transition-colors border border-slate-700 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : 'Search'}
        </button>
      </form>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-[#050508]/50 border border-purple-500/20 rounded-lg text-sm text-slate-300 font-sans relative z-10 max-h-[300px] overflow-y-auto custom-scrollbar"
        >
          <div className="prose prose-invert prose-sm max-w-none prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-headings:text-slate-200">
            <Markdown>{result}</Markdown>
          </div>
        </motion.div>
      )}
    </div>
  );
}
