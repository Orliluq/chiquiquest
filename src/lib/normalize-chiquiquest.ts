export function normalizeDashData(data: any) {
  return {
    hero: {
      name: data.hero?.name ?? "Unknown",
      description: data.hero?.description ?? "",
      level: data.hero?.level ?? 1,
      xp: data.hero?.xp ?? 0,
    },

    skillTree: data.skillTree ?? [],

    quests: data.quests ?? [],

    gapAnalysis: {
      missingSkills: data.gapAnalysis?.missingSkills ?? [],
      weakSkills: data.gapAnalysis?.weakSkills ?? [],
    },

    xpSystem: {
      xpRequiredForLevel:
        data.xpSystem?.xpRequiredForLevel ?? {},
    },

    achievements: data.achievements ?? [],

    roadmap: data.roadmap ?? [],
  };
}