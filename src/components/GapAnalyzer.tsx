'use client';

import { useState } from "react";
import { useHero } from "@/lib/hero-store";
import { RPGCard } from "./RPGForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Zap, Target, Search, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type AnalyzeSkillGapsOutput = {
  knowledgeGaps: string[];
  learningPath: { skill: string; priority: number }[];
};

export function GapAnalyzer() {
  const { hero, setTarget, unlockAchievement } = useHero();
  const [targetRole, setTargetRole] = useState(hero.targetRole || "");
  const [skills, setSkills] = useState(hero.currentSkills.join(", ") || "");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeSkillGapsOutput | null>(null);

  const performAnalysis = async () => {
    if (!targetRole || !skills) return;
    setLoading(true);
    try {
      // Mock gap analysis - in production this would call an AI API
      const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);
      const mockAnalysis: AnalyzeSkillGapsOutput = {
        knowledgeGaps: [
          "Advanced " + targetRole + " concepts",
          "Industry best practices",
          "Performance optimization",
          "Security considerations"
        ],
        learningPath: [
          { skill: "Fundamentals", priority: 1 },
          { skill: "Intermediate Concepts", priority: 2 },
          { skill: "Advanced Techniques", priority: 3 },
          { skill: "Production Deployment", priority: 4 }
        ]
      };
      setAnalysis(mockAnalysis);
      setTarget(targetRole, skillsList);
      unlockAchievement('skill-seeker');
      toast({ title: "Analysis Complete", description: "Your knowledge gaps have been identified." });
    } catch (e: unknown) {
      console.error(e);
      toast({ title: "Analysis Failed", description: "The archives are incomplete. Try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <RPGCard variant="primary" title="Intelligence Chamber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="target-role" className="text-xs uppercase tracking-widest text-muted-foreground">Desired Archetype (Target Role)</label>
              <Input 
                id="target-role"
                name="target-role"
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Staff Security Engineer"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="current-skills" className="text-xs uppercase tracking-widest text-muted-foreground">Current Grimoire (Comma separated skills)</label>
              <Textarea 
                id="current-skills"
                name="current-skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, AWS, Python..."
                className="bg-background min-h-[100px]"
              />
            </div>
            <Button 
              disabled={loading || !targetRole || !skills}
              onClick={performAnalysis}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-headline"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              Initiate Gap Analysis
            </Button>
          </div>

          <div className="bg-muted/20 border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Our AI mentor will reason through your current skill set to map the void between you and your goal.
            </p>
          </div>
        </div>
      </RPGCard>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RPGCard title="Knowledge Gaps" icon={<Search className="w-5 h-5" />} variant="accent">
            <div className="space-y-3">
              {analysis.knowledgeGaps.map((gap, i) => (
                <div key={i} className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg text-sm text-foreground/90 flex items-center gap-3">
                  <div className="h-2 w-2 bg-destructive rounded-full" />
                  {gap}
                </div>
              ))}
            </div>
          </RPGCard>

          <RPGCard title="Learning Path" icon={<FileText className="w-5 h-5" />}>
            <div className="space-y-4">
              {analysis.learningPath.sort((a, b) => a.priority - b.priority).map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 shrink-0 bg-muted border border-border rounded-lg flex items-center justify-center font-headline font-bold text-primary group-hover:border-primary/50 transition-colors">
                    {item.priority}
                  </div>
                  <div className="flex-1 border-b border-border pb-2 group-last:border-0">
                    <h5 className="text-white font-medium">{item.skill}</h5>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Priority Skill</p>
                  </div>
                </div>
              ))}
            </div>
          </RPGCard>
        </div>
      )}
    </div>
  );
}
