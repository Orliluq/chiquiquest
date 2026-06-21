'use client';

import { useState, useEffect } from "react";
import { useHero } from '@/lib/hero-store';
import { CHARACTER_CLASSES } from '@/lib/game-data';
import { RPGCard } from '@/components/RPGForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Palette, Cloud, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const CLASS_ICON_MAP: Record<string, any> = {
  Swords,
  Palette,
  Cloud,
  ShieldCheck
};

export default function Onboarding() {
  const { hero, onboard } = useHero();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleComplete = () => {
    if (name && selectedClass) {
      onboard(name, selectedClass);
      router.push('/dashboard');
    }
  };

  // Redirect if already onboarded
  useEffect(() => {
    if (hero.name) {
      router.push('/dashboard');
    }
  }, [hero.name, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <RPGCard variant="primary" title="Initialize Identity">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hero-name" className="text-muted-foreground uppercase tracking-widest text-xs">Hero Moniker</Label>
                  <Input 
                    id="hero-name" 
                    placeholder="Enter your name..." 
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <Button 
                  disabled={!name} 
                  onClick={() => setStep(2)} 
                  className="w-full bg-primary hover:bg-primary/80 text-white font-headline uppercase"
                >
                  Continue Journey
                </Button>
              </div>
            </RPGCard>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-headline font-bold text-white mb-2 neon-text">CHOOSE YOUR ARCHETYPE</h1>
              <p className="text-muted-foreground">Select the path that defines your technical soul.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CHARACTER_CLASSES.map((cls) => {
                const IconComp = CLASS_ICON_MAP[cls.icon] || Swords;
                return (
                  <div 
                    key={cls.id}
                    onClick={() => setSelectedClass(cls.id)}
                    className={cn(
                      "cursor-pointer group",
                      selectedClass === cls.id ? "scale-105" : "hover:scale-102"
                    )}
                  >
                    <RPGCard 
                      variant={selectedClass === cls.id ? 'primary' : 'default'}
                      className={cn(
                        "h-full transition-all duration-300",
                        selectedClass === cls.id ? "border-primary neon-border" : "border-transparent bg-muted/20 grayscale hover:grayscale-0"
                      )}
                    >
                      <div className="text-center space-y-4">
                        <div className="flex justify-center mb-2">
                          <IconComp className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="font-headline font-bold text-xl uppercase tracking-wider text-white">{cls.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-3">{cls.description}</p>
                        
                        <div className="pt-4 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-tighter text-muted-foreground">
                          <div className="flex justify-between border-b border-border pb-1">
                            <span>Logic</span>
                            <span className="text-primary font-bold">{cls.startingStats.logic}</span>
                          </div>
                          <div className="flex justify-between border-b border-border pb-1">
                            <span>Stab</span>
                            <span className="text-primary font-bold">{cls.startingStats.stability}</span>
                          </div>
                        </div>
                      </div>
                    </RPGCard>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)} className="text-muted-foreground">Back</Button>
              <Button 
                disabled={!selectedClass} 
                onClick={handleComplete}
                className="bg-primary hover:bg-primary/80 text-white font-headline uppercase px-12 h-12"
              >
                Manifest Hero
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
