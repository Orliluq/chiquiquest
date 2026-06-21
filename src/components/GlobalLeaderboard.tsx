'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, ShieldAlert } from 'lucide-react';
import { useHero } from '@/lib/hero-store';
import { CHARACTER_CLASSES } from '@/lib/game-data';

interface LeaderboardEntry {
  id: string;
  username: string;
  classTitle: string;
  level: number;
  xp: number;
}

export function GlobalLeaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { hero } = useHero();

  useEffect(() => {
    // Mock leaderboard data - in production this would come from a backend
    const mockLeaders: LeaderboardEntry[] = [
      { id: '1', username: 'CodeWizard', classTitle: 'Full Stack Sorcerer', level: 42, xp: 15600 },
      { id: '2', username: 'ByteKnight', classTitle: 'Cloud Architect', level: 38, xp: 12300 },
      { id: '3', username: 'PixelPaladin', classTitle: 'Frontend Guardian', level: 35, xp: 10800 },
      { id: '4', username: 'DataDruid', classTitle: 'Backend Sage', level: 32, xp: 9500 },
      { id: '5', username: 'NetNinja', classTitle: 'DevOps Ranger', level: 29, xp: 8200 },
    ];
    
    // Add current user if they have a name
    if (hero.name) {
      const characterClass = CHARACTER_CLASSES.find(c => c.id === hero.classId);
      mockLeaders.push({
        id: 'current',
        username: hero.name,
        classTitle: characterClass?.name || 'Adventurer',
        level: hero.level,
        xp: hero.xp
      });
      // Sort by XP
      mockLeaders.sort((a, b) => b.xp - a.xp);
    }
    
    setLeaders(mockLeaders);
    setLoading(false);
  }, [hero]);

  return (
    <div className="bg-[#0f111a] border border-[#1e293b] rounded-xl p-6 flex flex-col h-full relative overflow-hidden" id="leaderboard">
      <div className="absolute -top-10 -right-10 text-yellow-500/5 rotate-12 pointer-events-none">
        <Trophy size={150} />
      </div>
      
      <h3 className="font-mono text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3 relative z-10">
        <Users size={16} className="text-yellow-400" /> Global Legends
      </h3>

      <div className="mt-4 flex-1 relative z-10">
        {loading ? (
          <div className="flex flex-col gap-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-12 bg-slate-800/50 rounded-lg animate-pulse" />
             ))}
          </div>
        ) : leaders.length > 0 ? (
          <div className="space-y-2">
            {leaders.map((leader, i) => (
              <motion.div 
                key={leader.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${i === 0 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-[#050508] border-slate-800'} transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className={`font-mono font-bold text-xs w-5 text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-orange-400' : 'text-slate-600'}`}>
                    #{i + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-200 text-xs">{leader.username}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{leader.classTitle} • Lvl {leader.level}</div>
                  </div>
                </div>
                <div className="font-mono text-xs text-yellow-500 font-bold">
                  {leader.xp} XP
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-6 opacity-50">
            <ShieldAlert size={24} className="text-slate-500 mb-2" />
            <p className="font-mono text-[10px] text-slate-400">No legends found.<br/>Be the first to join the Guild!</p>
          </div>
        )}
      </div>
    </div>
  );
}
