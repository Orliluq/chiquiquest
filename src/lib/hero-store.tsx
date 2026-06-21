'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type HeroState = {
  name: string;
  classId: string | null;
  level: number;
  xp: number;
  quests: any[];
  unlockedSkills: string[];
  achievements: string[];
  targetRole: string;
  currentSkills: string[];
};

type HeroContextType = {
  hero: HeroState;
  onboard: (name: string, classId: string) => void;
  setTarget: (role: string, currentSkills: string[]) => void;
  addQuests: (quests: any[]) => void;
  completeQuest: (xp: number) => void;
  unlockAchievement: (id: string) => void;
  reset: () => void;
};

const INITIAL_STATE: HeroState = {
  name: '',
  classId: null,
  level: 1,
  xp: 0,
  quests: [],
  unlockedSkills: [],
  achievements: [],
  targetRole: '',
  currentSkills: [],
};

const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devquest_hero');
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('devquest_hero', JSON.stringify(hero));
  }, [hero]);

  const onboard = (name: string, classId: string) => {
    setHero(prev => ({ 
      ...prev, 
      name, 
      classId, 
      achievements: [...prev.achievements, 'hello-world'] 
    }));
  };

  const setTarget = (role: string, skills: string[]) => {
    setHero(prev => ({ ...prev, targetRole: role, currentSkills: skills }));
  };

  const addQuests = (quests: any[]) => {
    setHero(prev => ({ ...prev, quests, achievements: [...new Set([...prev.achievements, 'quest-starter'])] }));
  };

  const completeQuest = (xpReward: number) => {
    setHero(prev => {
      const newXp = prev.xp + xpReward;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const unlockAchievement = (id: string) => {
    if (!hero.achievements.includes(id)) {
      setHero(prev => ({ ...prev, achievements: [...prev.achievements, id] }));
    }
  };

  const reset = () => {
    setHero(INITIAL_STATE);
    localStorage.removeItem('devquest_hero');
  };

  return (
    <HeroContext.Provider value={{ hero, onboard, setTarget, addQuests, completeQuest, unlockAchievement, reset }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (!context) throw new Error('useHero must be used within HeroProvider');
  return context;
}
