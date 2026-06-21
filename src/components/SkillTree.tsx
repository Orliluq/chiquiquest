'use client';

import { useState } from "react";
import { useHero } from "@/lib/hero-store";
import { RPGCard } from "./RPGForm";
import { cn } from "@/lib/utils";
import { Lock, Unlock, ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";

const SKILL_TREE_NODES = [
  { id: 'foundations', label: 'Core Foundations', skills: ['Git Mastery', 'Terminal Wizardry', 'Algorithm Basics'], requiredLvl: 1 },
  { id: 'frontend', label: 'Client Arts', skills: ['React Conjuring', 'CSS Alchemy', 'State Sorcery'], requiredLvl: 2 },
  { id: 'backend', label: 'Deep Logic', skills: ['Node Transmutation', 'Data Persistence', 'API Rituals'], requiredLvl: 3 },
  { id: 'cloud', label: 'Etheric Scaling', skills: ['Serverless Spells', 'Container Enchanting', 'CI/CD Flow'], requiredLvl: 5 },
];

export function SkillTree() {
  const { hero } = useHero();
  const [expanded, setExpanded] = useState<string | null>('foundations');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-8 relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted opacity-20 hidden md:block" />
        
        {SKILL_TREE_NODES.map((node, idx) => {
          const isUnlocked = hero.level >= node.requiredLvl;
          const isExpanded = expanded === node.id;
          
          return (
            <div key={node.id} className="relative z-10">
              <div 
                className={cn(
                  "flex items-center gap-6 cursor-pointer group",
                  !isUnlocked && "opacity-50 grayscale"
                )}
                onClick={() => isUnlocked && setExpanded(isExpanded ? null : node.id)}
              >
                <div className={cn(
                  "h-16 w-16 rounded-xl border-2 flex items-center justify-center text-xl transition-all duration-500 shadow-lg",
                  isUnlocked ? "bg-primary/20 border-primary neon-border" : "bg-muted border-border"
                )}>
                  {isUnlocked ? <Unlock className="w-6 h-6 text-primary" /> : <Lock className="w-6 h-6 text-muted-foreground" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Rank {idx + 1} — Required Level {node.requiredLvl}</p>
                      <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight">{node.label}</h4>
                    </div>
                    <ChevronDown className={cn("w-5 h-5 transition-transform", isExpanded ? "rotate-180" : "")} />
                  </div>
                </div>
              </div>

              <motion.div 
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="ml-24 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {node.skills.map(skill => (
                    <div 
                      key={skill}
                      className="p-3 bg-muted/40 border border-border rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-foreground/80">{skill}</span>
                      <div className="h-5 w-5 rounded border border-primary/30 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
