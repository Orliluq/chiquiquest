'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, User, Sparkles } from 'lucide-react';

export function RPGForm({ onSubmit, isLoading }: { onSubmit: (profile: string, goal: string) => void, isLoading: boolean }) {
  const [profile, setProfile] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile && goal) {
      onSubmit(profile, goal);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto bg-[#0f111a] border border-[#1e293b] shadow-[0_0_20px_rgba(34,211,238,0.1)] p-8 rounded-xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-blue-800" />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="profile" className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <User size={14} className="text-cyan-400" />
            Current Status / Class
          </label>
          <input 
            id="profile"
            name="profile"
            type="text" 
            required
            placeholder="e.g., Full Stack Explorer, Data Mage..."
            value={profile}
            onChange={e => setProfile(e.target.value)}
            className="w-full bg-[#050508] border border-[#1e293b] rounded-lg p-4 font-mono text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="goal" className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Target size={14} className="text-cyan-400" />
            Primary Quest / Goal
          </label>
          <input 
            id="goal"
            name="goal"
            type="text" 
            required
            placeholder="e.g., I want to work in AWS"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            className="w-full bg-[#050508] border border-[#1e293b] rounded-lg p-4 font-mono text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !profile || !goal}
          className="w-full mt-8 p-[1px] disabled:opacity-50 disabled:cursor-not-allowed group bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg shadow-[0_10px_20px_-5px_rgba(8,145,178,0.4)]"
        >
          <div className="w-full h-full bg-[#0f111a] group-hover:bg-transparent text-white font-mono font-black uppercase tracking-widest py-4 px-6 rounded-[7px] transition-colors flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              Initializing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Quest Log
            </>
          )}
          </div>
        </button>
      </form>
    </motion.div>
  );
}
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RPGCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent';
  title?: string;
  icon?: ReactNode;
}

export function RPGCard({ children, className, variant = 'default', title, icon }: RPGCardProps) {
  return (
    <div className={cn(
      "relative rounded-xl border p-6 bg-card transition-all duration-300",
      variant === 'primary' && "border-primary/50 neon-border",
      variant === 'accent' && "border-accent/50 shadow-[0_0_15px_rgba(126,130,255,0.15)]",
      className
    )}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-lg font-headline font-bold uppercase tracking-wider text-primary neon-text">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}
