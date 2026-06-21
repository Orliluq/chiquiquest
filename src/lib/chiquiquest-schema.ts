import { z } from "zod";

/**
 * 🧩 Schema principal (validación estricta)
 */
export const ChiquiQuestSchema = z.object({
  hero: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
  }),

  skillTree: z.record(
  z.string(),
  z.object({
    level: z.number(),
    path: z.string(),
    requirements: z.array(z.string()),
  })
  ),

  quests: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      status: z.string(),
    })
  ),

  gapAnalysis: z.object({
    requiredSkills: z.array(z.string()),
    missingKnowledge: z.array(z.string()),
  }),

  xpSystem: z.object({
    xpPoints: z.number(),
    level: z.number(),
    xpRequired: z.number(),
  }),

  achievements: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
    })
  ),

  roadmap: z.array(
    z.object({
      milestone: z.string(),
      description: z.string(),
      deadline: z.string(),
    })
  ),
});

export type ChiquiQuestData = z.infer<typeof ChiquiQuestSchema>;