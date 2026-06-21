'use client';

import { useState, useEffect } from "react";
import { useHero } from "@/lib/hero-store";
import { CHARACTER_CLASSES } from "@/lib/game-data";
import { Progress } from "@/components/ui/progress";
import { RPGCard } from "./RPGForm";
import { Swords, Shield, Zap, Palette, Cloud, ShieldCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

const CLASS_ICON_MAP: Record<string, any> = {
  Swords,
  Palette,
  Cloud,
  ShieldCheck
};

export function DashboardStats() {
  const { hero } = useHero();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const characterClass = CHARACTER_CLASSES.find(c => c.id === hero.classId);
  const IconComp = characterClass ? CLASS_ICON_MAP[characterClass.icon] : User;
  
  const xpInCurrentLevel = hero.xp % 1000;
  const progressPercent = (xpInCurrentLevel / 1000) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RPGCard variant="primary" className="md:col-span-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary neon-border">
              {mounted ? (
                <IconComp className="w-10 h-10 text-primary" />
              ) : (
                <User className="w-10 h-10 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-headline font-bold text-white tracking-tight">{mounted ? (hero.name || 'Incognito Hero') : 'Incognito Hero'}</h2>
              <p className="text-primary font-bold uppercase tracking-widest text-sm">{mounted ? (characterClass?.name || 'Classless') : 'Classless'}</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-headline font-bold text-white">LEVEL {mounted ? hero.level : 1}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{mounted ? `${xpInCurrentLevel} / 1000 XP TO NEXT LVL` : '0 / 1000 XP TO NEXT LVL'}</span>
            </div>
            <Progress value={mounted ? progressPercent : 0} className="h-3 bg-muted border border-border" />
          </div>
        </div>
      </RPGCard>

      <RPGCard variant="accent">
        <h3 className="text-sm font-headline uppercase tracking-widest text-secondary mb-4">Base Attributes</h3>
        <div className="space-y-4">
          <StatRow label="Logic" value={mounted ? (characterClass?.startingStats.logic || 0) : 0} icon={<Zap className="w-4 h-4 text-blue-400" />} />
          <StatRow label="Stability" value={mounted ? (characterClass?.startingStats.stability || 0) : 0} icon={<Shield className="w-4 h-4 text-green-400" />} />
          <StatRow label="Creativity" value={mounted ? (characterClass?.startingStats.creativity || 0) : 0} icon={<Palette className="w-4 h-4 text-pink-400" />} />
          <StatRow label="Speed" value={mounted ? (characterClass?.startingStats.speed || 0) : 0} icon={<Swords className="w-4 h-4 text-yellow-400" />} />
        </div>
      </RPGCard>
    </div>
  );
}

function StatRow({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-foreground/80">{label}</span>
      </div>
      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={cn(
            "h-3 w-1.5 rounded-sm",
            i < value ? "bg-secondary" : "bg-muted"
          )} />
        ))}
      </div>
    </div>
  );
}
