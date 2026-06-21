export type CharacterClass = {
  id: string;
  name: string;
  description: string;
  icon: string; // Now stores the Lucide icon name
  startingStats: {
    logic: number;
    creativity: number;
    stability: number;
    speed: number;
  };
};

export const CHARACTER_CLASSES: CharacterClass[] = [
  {
    id: 'code-knight',
    name: 'Code Knight',
    description: 'Masters of architecture and clean code. Defends the realm with robust patterns.',
    icon: 'Swords',
    startingStats: { logic: 8, creativity: 5, stability: 9, speed: 4 }
  },
  {
    id: 'pixel-paladin',
    name: 'Pixel Paladin',
    description: 'Guardians of user experience and visual harmony. Brushes are their weapons.',
    icon: 'Palette',
    startingStats: { logic: 5, creativity: 9, stability: 6, speed: 6 }
  },
  {
    id: 'cloud-conjuror',
    name: 'Cloud Conjuror',
    description: 'Weavers of distributed systems and serverless magic. Scales the unreachable.',
    icon: 'Cloud',
    startingStats: { logic: 9, creativity: 6, stability: 7, speed: 5 }
  },
  {
    id: 'security-sentinel',
    name: 'Security Sentinel',
    description: 'Protectors of the digital gate. Detects threats before they manifest.',
    icon: 'ShieldCheck',
    startingStats: { logic: 7, creativity: 4, stability: 10, speed: 6 }
  }
];

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string; // Now stores the Lucide icon name
  requirement: string;
};

export const BADGES: Badge[] = [
  {
    id: 'hello-world',
    name: 'Digital Newborn',
    description: 'Completed your first class archetype discovery.',
    icon: 'Baby',
    requirement: 'Onboarding complete'
  },
  {
    id: 'quest-starter',
    name: 'Initiate Adventurer',
    description: 'Forged your first set of career quests.',
    icon: 'Scroll',
    requirement: 'First quest forge'
  },
  {
    id: 'skill-seeker',
    name: 'Knowledge Scout',
    description: 'Analyzed your first skill gap.',
    icon: 'Search',
    requirement: 'First gap analysis'
  }
];
