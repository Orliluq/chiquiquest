'use client';

import { useState, useEffect } from "react";
import rpgImage from "@/assets/rpg.png";
import { useHero } from "@/lib/hero-store";
import { DashboardStats } from "@/components/DashboardStats";
import { RPGCard } from "@/components/RPGForm";
import { BADGES } from "@/lib/game-data";
import { Button } from "@/components/ui/button";
import { Swords, Map, BrainCircuit, Trophy, Plus, LogOut, Target, Baby, Scroll, Search, ShieldCheck, Palette, Cloud, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestForge } from "@/components/QuestForge";
import { SkillTree } from "@/components/SkillTree";
import { GapAnalyzer } from "@/components/GapAnalyzer";

const ICON_MAP: Record<string, any> = {
  Swords,
  Palette,
  Cloud,
  ShieldCheck,
  Baby,
  Scroll,
  Search,
  User,
  Trophy,
  Target
};

export default function Dashboard() {
  const { hero, reset } = useHero();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Swords className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-headline font-bold text-white tracking-tighter">CHIQUIQUEST <span className="text-primary">AI</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Reset Hero
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <DashboardStats />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="quests" className="w-full" suppressHydrationWarning>
              <TabsList className="bg-muted/30 border border-border p-1 gap-2 h-12">
                <TabsTrigger value="quests" className="data-[state=active]:bg-primary data-[state=active]:text-white font-headline uppercase px-6">
                  <Map className="w-4 h-4 mr-2" />
                  Quest Forge
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-white font-headline uppercase px-6">
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  Skill Tree
                </TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-white font-headline uppercase px-6">
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  Gap Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quests" className="mt-6">
                <QuestForge />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillTree />
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <GapAnalyzer />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <RPGCard title="Achievements" icon={<Trophy className="w-5 h-5" />} variant="accent">
              <div className="grid grid-cols-4 gap-3">
                {BADGES.map((badge) => {
                  const unlocked = mounted ? hero.achievements.includes(badge.id) : false;
                  const IconComp = ICON_MAP[badge.icon] || Trophy;
                  return (
                    <div 
                      key={badge.id}
                      className={`relative aspect-square rounded-lg flex items-center justify-center transition-all ${
                        unlocked 
                        ? "bg-secondary/20 border-secondary shadow-[0_0_8px_rgba(126,130,255,0.4)]" 
                        : "bg-muted/50 opacity-30 grayscale"
                      } border`}
                      title={badge.name + ": " + badge.description}
                    >
                      <IconComp className={`w-5 h-5 ${unlocked ? 'text-secondary' : 'text-muted-foreground'}`} />
                      {unlocked && (
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-secondary rounded-full flicker" />
                      )}
                    </div>
                  );
                })}
                <div className="aspect-square rounded-lg border border-dashed border-border flex items-center justify-center opacity-20">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">
                  {mounted ? `${hero.achievements.length} / ${BADGES.length} MILESTONES UNLOCKED` : `0 / ${BADGES.length} MILESTONES UNLOCKED`}
                </p>
              </div>
            </RPGCard>

            <RPGCard title="Current Target" icon={<Target className="w-5 h-5" />}>
              <div className="space-y-4">
                {mounted && hero.targetRole ? (
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Target Role</p>
                    <p className="text-white font-headline font-bold">{hero.targetRole}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {hero.currentSkills.slice(0, 5).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">{s}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-4">No target role established.</p>
                    <Button variant="outline" size="sm" className="text-xs font-headline uppercase">Set Goal</Button>
                  </div>
                )}
              </div>
            </RPGCard>

            <div className="rounded-xl overflow-hidden relative group">
              <img 
                src={rpgImage.src} 
                alt="RPG World" 
                className="w-full h-40 object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                data-ai-hint="fantasy world"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-white font-headline font-bold uppercase tracking-widest">Next Region</h4>
                <p className="text-primary text-xs font-bold">The Cloud Citadel (Level 5)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
