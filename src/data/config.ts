import { MoodState } from '../types';

export const GAME_CONFIG = {
  // Hunger Decay: ~10% every 5 minutes in real life, or ~0.033% per second in active play
  HUNGER_DECAY_PER_SEC: 0.04, // ~2.4% per minute in active game
  HUNGER_SLEEP_DECAY_MULT: 0.25, // 4x slower hunger decay while sleeping

  // Energy
  ENERGY_MAX: 100,
  ENERGY_ACTIVE_DRAIN_PER_SEC: 0.02, // slight passive drain while awake
  ENERGY_SLEEP_RECOVERY_PER_SEC: 1.5, // recovers from 0 to 100 in ~65 seconds of rest
  ENERGY_MINIGAME_COST: 15,

  // Happiness Decay / Dynamics
  HAPPINESS_PASSIVE_DECAY_PER_SEC: 0.015,
  HAPPINESS_STARVATION_PENALTY_PER_SEC: 0.08, // when hunger < 20
  HAPPINESS_EXHAUSTION_PENALTY_PER_SEC: 0.06, // when energy < 15

  // Petting
  PET_COOLDOWN_MS: 3000,
  PET_HAPPINESS_GAIN: 6,
  PET_BOND_GAIN: 0.4,

  // Grooming / Cleaning
  CLEAN_HAPPINESS_GAIN: 10,
  CLEANLINESS_DECAY_PER_SEC: 0.01,

  // Evolution thresholds
  EVOLUTION_LEVELS: {
    youth: 5,
    evolved: 12,
  },

  // Bond Heart thresholds
  BOND_THRESHOLDS: [0, 10, 25, 50, 80, 120],
};

// Formula: XP(L) = 20 + (L² × 1.4)
export function xpForLevel(level: number): number {
  return Math.round(20 + level * level * 1.4);
}

export function getMoodState(happiness: number): MoodState {
  if (happiness < 20) return 'grumpy';
  if (happiness < 40) return 'moody';
  if (happiness < 65) return 'neutral';
  if (happiness < 85) return 'happy';
  return 'ecstatic';
}

export const MOOD_INFO: Record<MoodState, { label: string; icon: string; mult: number; color: string }> = {
  grumpy: { label: 'Grumpy', icon: '😤', mult: 0.6, color: 'text-red-400' },
  moody: { label: 'Moody', icon: '😕', mult: 0.8, color: 'text-orange-400' },
  neutral: { label: 'Content', icon: '😐', mult: 1.0, color: 'text-yellow-400' },
  happy: { label: 'Happy', icon: '😊', mult: 1.25, color: 'text-emerald-400' },
  ecstatic: { label: 'Ecstatic', icon: '🤩', mult: 1.5, color: 'text-pink-400' },
};
