export type MoodState = 'grumpy' | 'moody' | 'neutral' | 'happy' | 'ecstatic';
export type EvolutionStage = 'baby' | 'youth' | 'evolved';
export type FoodCategory = 'basic' | 'tasty' | 'rare' | 'premium';
export type ReactionType = 'loved' | 'liked' | 'neutral' | 'disliked';

export interface PetDefinition {
  id: string;
  name: string;
  emoji: string;
  color: string;
  personality: string;
  likes: string[];
  dislikes: string[];
  hungerDecayRate: number; // multiplier
  special: string;
  abilityName: string;
  abilityDesc: string;
  gemCost: number;
  unlockLevel: number;
  isStarter: boolean;
}

export interface PetMetrics {
  hunger: number; // 0 - 100 (100 = full, 0 = starving)
  energy: number; // 0 - 100 (100 = energized, 0 = exhausted)
  happiness: number; // 0 - 100 (100 = ecstatic, 0 = depressed)
  bond: number; // 0 - 150+ (Hearts: 0 to 5)
  cleanliness: number; // 0 - 100
}

export interface PetState extends PetMetrics {
  id: string;
  level: number;
  xp: number;
  stage: EvolutionStage;
  isSleeping: boolean;
  totalFed: number;
  lastFedTimestamp: number;
  lastTickedTimestamp: number;
}

export interface FoodDefinition {
  id: string;
  name: string;
  category: FoodCategory;
  tags: string[]; // e.g. ['Sweet', 'Fruit']
  hungerRestore: number;
  energyRestore: number;
  happinessBonus: number;
  xp: number;
  coinCost: number;
  emoji: string;
  description: string;
}

export interface FeedReaction {
  reaction: ReactionType;
  emoji: string;
  message: string;
  xpGained: number;
  bondGained: number;
  hungerGained: number;
  energyGained: number;
  happinessGained: number;
}
