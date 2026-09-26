import { PetDefinition, FoodDefinition, ReactionType, FeedReaction, EvolutionStage } from '../types';
import { GAME_CONFIG, getMoodState, MOOD_INFO, xpForLevel } from '../data/config';

export function calculateReaction(pet: PetDefinition, food: FoodDefinition): ReactionType {
  const hasLiked = food.tags.some(tag => pet.likes.includes(tag));
  const hasDisliked = food.tags.some(tag => pet.dislikes.includes(tag));

  if (hasLiked && !hasDisliked) {
    return food.category === 'premium' || food.category === 'rare' ? 'loved' : 'liked';
  }
  if (hasDisliked && !hasLiked) {
    return 'disliked';
  }
  if (hasLiked && hasDisliked) {
    return 'neutral';
  }
  return food.category === 'premium' ? 'liked' : 'neutral';
}

export function evaluateFeeding(
  petDef: PetDefinition,
  currentHunger: number,
  currentHappiness: number,
  food: FoodDefinition
): FeedReaction {
  const reaction = calculateReaction(petDef, food);
  const moodState = getMoodState(currentHappiness);
  const moodMult = MOOD_INFO[moodState].mult;

  let reactionMultiplier = 1.0;
  let emoji = '😋';
  let message = `${petDef.name} enjoyed the ${food.name}!`;

  if (reaction === 'loved') {
    reactionMultiplier = 1.7;
    emoji = '😍';
    message = `${petDef.name} LOVES ${food.name}! Pure ecstasy!`;
  } else if (reaction === 'liked') {
    reactionMultiplier = 1.3;
    emoji = '🥰';
    message = `${petDef.name} happily gobbled up the ${food.name}!`;
  } else if (reaction === 'disliked') {
    reactionMultiplier = petDef.id === 'grib' ? 0.7 : 0.4;
    emoji = '😖';
    message = `${petDef.name} made a sour face at the ${food.name}...`;
  }

  // Pet ability modifiers
  let abilityXpMult = 1.0;
  if (petDef.id === 'fizz') abilityXpMult = 1.15; // +15% XP

  let abilityBondMult = 1.0;
  if (petDef.id === 'munchlet') abilityBondMult = 1.1; // +10% bond

  const finalXp = Math.round(food.xp * moodMult * reactionMultiplier * abilityXpMult);

  // Hunger fullness factor: feeding when hungry gives better bond
  const fullnessFactor = currentHunger < 40 ? 1.0 : currentHunger < 75 ? 0.5 : 0.2;
  const baseBondGain = (food.category === 'premium' ? 2.5 : food.category === 'rare' ? 1.5 : 0.8) * fullnessFactor;
  const finalBond = Number((baseBondGain * reactionMultiplier * abilityBondMult).toFixed(2));

  // Metrics gain
  const hungerGain = food.hungerRestore;
  const energyGain = food.energyRestore;
  const happinessGain = Math.round(food.happinessBonus * (reaction === 'disliked' ? 0.2 : reactionMultiplier));

  return {
    reaction,
    emoji,
    message,
    xpGained: finalXp,
    bondGained: finalBond,
    hungerGained: hungerGain,
    energyGained: energyGain,
    happinessGained: happinessGain,
  };
}

export function calculateStage(level: number): EvolutionStage {
  if (level >= GAME_CONFIG.EVOLUTION_LEVELS.evolved) return 'evolved';
  if (level >= GAME_CONFIG.EVOLUTION_LEVELS.youth) return 'youth';
  return 'baby';
}

export function getBondHearts(bond: number): { filled: number; total: number; nextTarget: number; progressPct: number } {
  const thresholds = GAME_CONFIG.BOND_THRESHOLDS;
  let filled = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (bond >= thresholds[i]) {
      filled = i;
    }
  }

  const currentLevelFloor = thresholds[Math.min(filled, thresholds.length - 1)];
  const nextTarget = thresholds[Math.min(filled + 1, thresholds.length - 1)];
  const progressPct =
    filled >= 5 ? 100 : Math.min(100, Math.max(0, ((bond - currentLevelFloor) / (nextTarget - currentLevelFloor)) * 100));

  return {
    filled: Math.min(5, filled),
    total: 5,
    nextTarget,
    progressPct: Math.round(progressPct),
  };
}

export function checkLevelUp(
  currentLevel: number,
  currentXp: number
): { newLevel: number; remainingXp: number; leveledUp: boolean; rewards: { coins: number; gems: number } } {
  let level = currentLevel;
  let xp = currentXp;
  let leveledUp = false;
  let coinsWon = 0;
  let gemsWon = 0;

  let needed = xpForLevel(level);
  while (xp >= needed) {
    xp -= needed;
    level += 1;
    leveledUp = true;
    coinsWon += 30 + level * 5;
    gemsWon += level % 5 === 0 ? 10 : 3;
    needed = xpForLevel(level);
  }

  return {
    newLevel: level,
    remainingXp: xp,
    leveledUp,
    rewards: { coins: coinsWon, gems: gemsWon },
  };
}
