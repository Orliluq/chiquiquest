'use client';

import { useState, useEffect } from "react";
import { useHero } from "@/lib/hero-store";
import { RPGCard } from "./RPGForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Swords, CheckCircle2, ChevronRight, Scroll } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export function QuestForge() {
  const { hero, addQuests, completeQuest } = useHero();
  const [mounted, setMounted] = useState(false);
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const forgeQuests = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      // Mock quest generation - in production this would call an AI API
      const mockQuests = [
        {
          title: `Learn ${goal.split(' ').slice(-2).join(' ')}`,
          description: `Master the fundamentals of ${goal}`,
          difficulty: "Medium",
          xpReward: 100,
          completionStatus: "not started"
        },
        {
          title: "Build a Portfolio Project",
          description: "Create a showcase project demonstrating your skills",
          difficulty: "Hard",
          xpReward: 200,
          completionStatus: "not started"
        },
        {
          title: "Get Certified",
          description: "Obtain relevant industry certification",
          difficulty: "Hard",
          xpReward: 300,
          completionStatus: "not started"
        }
      ];
      addQuests(mockQuests);
      setGoal("");
      toast({ title: "Quests Forged!", description: "New career milestones have been added to your journal." });
    } catch (e: unknown) {
      console.error(e);
      toast({ title: "Forge Failed", description: "The magic flickered. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = (idx: number, xp: number) => {
    if (completedQuests.includes(idx.toString())) return;
    setCompletedQuests([...completedQuests, idx.toString()]);
    completeQuest(xp);
    toast({ title: `+${xp} XP`, description: "Quest objective achieved!" });
  };

  return (
    <div className="space-y-6">
      <RPGCard variant="primary">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-2">The Quest Forge</h3>
            <p className="text-muted-foreground text-sm">Transmute your career goals into actionable RPG quests.</p>
          </div>
          <div className="flex gap-2 items-center">
            <Input 
              id="quest-goal"
              name="quest-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Become a Senior Dev..."
              className="w-full md:w-64 bg-background border-primary/30"
            />
            <Button 
              disabled={loading || !goal} 
              onClick={forgeQuests}
              className="bg-primary hover:bg-primary/80"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Swords className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </RPGCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
        {mounted && hero.quests.length > 0 ? (
          hero.quests.map((q, idx) => {
            const isDone = completedQuests.includes(idx.toString());
            return (
              <RPGCard 
                key={idx} 
                className={`transition-all ${isDone ? 'opacity-50 border-green-500/30' : 'hover:border-primary/50'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge variant={q.difficulty === 'Hard' ? 'destructive' : q.difficulty === 'Medium' ? 'default' : 'secondary'} className="uppercase text-[10px]">
                      {q.difficulty}
                    </Badge>
                  </div>
                  <div className="text-primary font-bold text-sm tracking-widest">
                    +{q.xpReward} XP
                  </div>
                </div>
                <h4 className="text-lg font-headline font-bold text-white mb-2">{q.title}</h4>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{q.description}</p>
                <Button 
                  disabled={isDone}
                  onClick={() => handleComplete(idx, q.xpReward)}
                  className={`w-full ${isDone ? 'bg-green-600' : 'bg-muted hover:bg-primary'} text-white font-headline uppercase tracking-widest text-xs`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                  {isDone ? 'Quest Completed' : 'Complete Objective'}
                </Button>
              </RPGCard>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl">
            <Scroll className="w-12 h-12 mx-auto mb-4 opacity-20 text-muted-foreground" />
            <p className="text-muted-foreground">Your quest journal is empty. Use the forge above to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
