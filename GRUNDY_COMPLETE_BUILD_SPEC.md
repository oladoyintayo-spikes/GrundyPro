# GRUNDY v2.2 — COMPLETE BUILD SPECIFICATION

**Single source of truth for Claude Code. Everything you need is in this document.**

---

## OUTPUT REQUIREMENTS

- **File:** Single `grundy-game.html`
- **Stack:** React 18 + Zustand + Tailwind (CDN, no build step)
- **Platform:** Mobile-first, portrait orientation
- **Storage:** localStorage for save data
- **Delivery:** Push to GitHub for download

---

## PART 1: QUICK REFERENCE

### What's Visible vs Hidden

| Stat | Visible? | How Player Knows |
|------|----------|------------------|
| Bond | ✅ YES | Hearts: ♥♥♥♡♡ (0-5 scale) |
| Level | ✅ YES | "Level 7" displayed |
| XP | ✅ YES | Progress bar to next level |
| Cooldown | ✅ YES | "⏱️ 12:34" after feeding |
| Fullness | ❌ HIDDEN | Pet behavior (begs → turns away) |
| Happiness | ❌ HIDDEN | Pet animation (bouncy → droopy) |

### Bond Thresholds

| Level | Points Required | Hearts Display |
|-------|-----------------|----------------|
| 0 | 0 | ♡♡♡♡♡ |
| 1 | 10 | ♥♡♡♡♡ |
| 2 | 25 | ♥♥♡♡♡ |
| 3 | 50 | ♥♥♥♡♡ |
| 4 | 80 | ♥♥♥♥♡ |
| 5 | 120 | ♥♥♥♥♥ |

### Bond Sources

| Action | Bond Gain |
|--------|-----------|
| Feeding (hungry pet, fullness < 40) | +0.5 to +1.0 |
| Feeding (content pet, fullness 40-70) | +0.2 to +0.5 |
| Feeding (full pet, fullness > 70) | +0.0 to +0.1 |
| Feeding during Daily Moment | +50% bonus |
| Mini-game played (any tier) | +0.3 flat |
| Cleaning poop | +0.1 |

### Pet Unlocks

| Pet | Type | Unlock Requirement |
|-----|------|-------------------|
| Munchlet | Free | Start with |
| Grib | Free | Start with |
| Plompo | Free | Start with |
| Fizz | Earnable | Bond Level 5 (ANY pet reaches 120 bond) |
| Ember | Earnable | 10 mini-games (cumulative across all pets) |
| Chomper | Premium | Level 25 (any pet) |
| Whisp | Premium | Level 30 (any pet) |
| Luxe | Premium | Level 40 (any pet) |

### Daily Moments

| Moment | Time Window | Bonus | Icon |
|--------|-------------|-------|------|
| Morning | 7:00 AM - 10:00 AM | +50% bond | 🌅 |
| Afternoon | 12:00 PM - 2:00 PM | +25% XP | ☀️ |
| Evening | 6:00 PM - 9:00 PM | +50% bond | 🌙 |

### Mini-Game Rewards

| Tier | Score | Coins | Gems | Bond | Happiness |
|------|-------|-------|------|------|-----------|
| Bronze | 0-99 | 3 | 0 | +0.3 | +7 |
| Silver | 100-199 | 7 | 0 | +0.3 | +7 |
| Gold | 200-299 | 15 | 0 | +0.3 | +7 |
| Rainbow | 300+ | 22 | 1 | +0.3 | +7 |

### Energy System

| Property | Value |
|----------|-------|
| Max Energy | 50 |
| Cost per Game | 10 |
| Regen Rate | 1 per 30 minutes |
| First Daily Game | FREE (no energy cost) |

### Gem Income Sources

| Source | Gems Earned |
|--------|-------------|
| Level up | +5 |
| Rainbow mini-game tier | +1 |
| Day 7 login streak | +10 |
| First feed of day | +1 |

### Feeding Cooldown

| Property | Value |
|----------|-------|
| Duration | 30 minutes |
| Feeding during cooldown | 25% effectiveness |
| Timer visibility | Always visible after feeding |

### Fullness States (Hidden from player)

| State | Range | Feed Value | Pet Behavior | Bubble |
|-------|-------|------------|--------------|--------|
| HUNGRY | 0-20 | 100% | Begs, looks at food | 🍎❓ |
| PECKISH | 21-40 | 75% | Glances at food | — |
| CONTENT | 41-70 | 50% | Normal, ignores food | — |
| SATISFIED | 71-90 | 25% | Shakes head | 😌 |
| STUFFED | 91-100 | BLOCKED | Turns away | 🙅 |

### Evolution Stages

| Stage | Levels | Scale | Visual |
|-------|--------|-------|--------|
| Baby | 1-6 | 0.7x | Simple, small |
| Youth | 7-12 | 0.85x | Growing, developing |
| Evolved | 13+ | 1.0x | Full design |

### Runaway System (Classic Mode Only)

| Property | Value |
|----------|-------|
| Trigger | Extended neglect |
| Lockout Duration | 48 hours |
| Early Return Cost | 25 gems |
| Bond Penalty | -50% |
| Permanent Loss | NEVER (pet always returns) |

### Poop System

| Property | Value |
|----------|-------|
| Appears After | 3-4 feedings (random) |
| Max Stack | 3 poops |
| Clean Reward | +0.1 bond, +2 happiness |

### XP Curve

```
Level 1:  100 XP needed
Level 5:  175 XP needed
Level 10: 404 XP needed
Level 20: 1,637 XP needed
Level 30: 6,621 XP needed

Formula: XP = floor(100 × 1.15^(level-1))
```

### Level Up Rewards

| Reward | Amount |
|--------|--------|
| Coins | +50 |
| Gems | +5 (Luxe: +10) |

---

## PART 2: COMPLETE PET DATA

```typescript
const PETS = {
  munchlet: {
    id: 'munchlet',
    name: 'Munchlet',
    emoji: '🟡',
    color: '#fbbf24',
    unlockType: 'free',
    personality: 'Cheerful, loves company',
    origin: {
      short: 'Found on a sunny windowsill, humming.',
      full: 'Found on a sunny windowsill, humming softly to itself. It was waiting for someone to share warmth with. Now it has found you.',
      traits: 'Loves sweet things. Hates being alone.'
    },
    likes: ['apple', 'banana'],
    loves: ['cookie', 'candy', 'ice_cream', 'cake'],
    dislikes: ['spicy_taco', 'hot_pepper'],
    ability: {
      id: 'bond_bonus',
      name: '+10% Bond',
      description: 'Earns 10% more bond from all actions',
      apply: (value) => Math.floor(value * 1.1)
    },
    stats: {
      hungerDecay: 10,
      happinessDecay: 5
    }
  },

  grib: {
    id: 'grib',
    name: 'Grib',
    emoji: '🟢',
    color: '#4ade80',
    unlockType: 'free',
    personality: 'Mischievous, chaotic',
    origin: {
      short: 'Appeared in a shadow behind the cupboard, grinning.',
      full: 'Appeared in a shadow behind the cupboard one day, already grinning. It won\'t tell you how it got there. It won\'t tell you anything.',
      traits: 'Loves chaos. Hates boredom.'
    },
    likes: ['mystery_meat', 'spicy_taco'],
    loves: ['hot_pepper'],
    dislikes: ['salad', 'carrot'],
    ability: {
      id: 'mood_penalty_reduction',
      name: '-20% Mood Penalty',
      description: 'Takes 20% less happiness damage from disliked foods',
      apply: (value) => Math.floor(value * 0.8)
    },
    stats: {
      hungerDecay: 12,
      happinessDecay: 6
    }
  },

  plompo: {
    id: 'plompo',
    name: 'Plompo',
    emoji: '🟣',
    color: '#a78bfa',
    unlockType: 'free',
    personality: 'Sleepy, calm',
    origin: {
      short: 'Discovered sleeping in a cloud that drifted too low.',
      full: 'Discovered sleeping in a cloud that drifted too low and bumped into your window. It woke up, yawned, and went right back to sleep.',
      traits: 'Loves naps. Hates rushing.'
    },
    likes: ['banana', 'milk'],
    loves: ['cake', 'cookie', 'dream_treat'],
    dislikes: ['hot_pepper', 'energy_drink'],
    ability: {
      id: 'mood_decay_reduction',
      name: '-20% Mood Decay',
      description: 'Happiness decays 20% slower over time',
      apply: (value) => Math.floor(value * 0.8)
    },
    stats: {
      hungerDecay: 8,
      happinessDecay: 4
    }
  },

  fizz: {
    id: 'fizz',
    name: 'Fizz',
    emoji: '🔵',
    color: '#3b82f6',
    unlockType: 'earnable',
    unlockRequirement: {
      type: 'bond_level',
      value: 5,
      description: 'Reach Bond Level 5 with any pet'
    },
    personality: 'Hyper, energetic',
    origin: {
      short: 'Sparked into existence during a thunderstorm.',
      full: 'Sparked into existence during a thunderstorm and hasn\'t stopped vibrating since. Everything is exciting. Everything is NOW.',
      traits: 'Loves excitement. Hates waiting.'
    },
    likes: ['candy', 'ice_cream'],
    loves: ['energy_drink'],
    dislikes: ['salad', 'milk'],
    ability: {
      id: 'minigame_coin_bonus',
      name: '+25% Mini-game Coins',
      description: 'Earns 25% more coins from mini-games',
      apply: (coins) => Math.floor(coins * 1.25)
    },
    stats: {
      hungerDecay: 15,
      happinessDecay: 8
    }
  },

  ember: {
    id: 'ember',
    name: 'Ember',
    emoji: '🟠',
    color: '#f97316',
    unlockType: 'earnable',
    unlockRequirement: {
      type: 'minigames_played',
      value: 10,
      description: 'Complete 10 mini-games'
    },
    personality: 'Fierce, attention-seeking',
    origin: {
      short: 'Emerged from the last ember of a dying fire.',
      full: 'Emerged from the last ember of a dying fire, refusing to be ignored. It burns bright and demands you notice.',
      traits: 'Loves attention. Hates being ordinary.'
    },
    likes: ['spicy_taco'],
    loves: ['hot_pepper'],
    dislikes: ['ice_cream', 'milk'],
    ability: {
      id: 'spicy_coin_bonus',
      name: '2x Spicy Coins',
      description: 'Earns double coins when fed spicy foods',
      apply: (coins, food) => food.category === 'spicy' ? coins * 2 : coins
    },
    stats: {
      hungerDecay: 12,
      happinessDecay: 7
    }
  },

  chomper: {
    id: 'chomper',
    name: 'Chomper',
    emoji: '🔴',
    color: '#ef4444',
    unlockType: 'premium',
    unlockRequirement: {
      type: 'level',
      value: 25,
      description: 'Reach Level 25 with any pet'
    },
    purchasePrice: 1.99,
    personality: 'Hungry, food-obsessed',
    origin: {
      short: 'First spotted near the kitchen, following the smell of dinner.',
      full: 'First spotted near the kitchen, following the smell of dinner. It hasn\'t left since. It\'s always hungry. Always.',
      traits: 'Loves food. Hates... just loves food.'
    },
    likes: ['apple', 'banana', 'cookie', 'cake', 'spicy_taco'],
    loves: ['mystery_meat', 'golden_feast'],
    dislikes: [],
    ability: {
      id: 'no_dislikes',
      name: 'No Dislikes',
      description: 'Never has negative reactions to any food',
      apply: (affinity) => Math.max(affinity, 1.0)
    },
    stats: {
      hungerDecay: 18,
      happinessDecay: 5
    }
  },

  whisp: {
    id: 'whisp',
    name: 'Whisp',
    emoji: '⚪',
    color: '#e2e8f0',
    unlockType: 'premium',
    unlockRequirement: {
      type: 'level',
      value: 30,
      description: 'Reach Level 30 with any pet'
    },
    purchasePrice: 2.49,
    personality: 'Mysterious, dreamy',
    origin: {
      short: 'Drifted in through a crack in a dream.',
      full: 'Drifted in through a crack in a dream and sometimes forgets which world is which. Gentle, quiet, and slightly elsewhere.',
      traits: 'Loves quiet. Hates loud noises.'
    },
    likes: ['milk', 'banana'],
    loves: ['dream_treat', 'golden_feast'],
    dislikes: ['hot_pepper', 'spicy_taco', 'energy_drink'],
    ability: {
      id: 'rare_xp_bonus',
      name: '+50% Rare XP',
      description: 'Earns 50% more XP from rare and legendary foods',
      apply: (xp, food) => ['rare', 'legendary'].includes(food.rarity) ? Math.floor(xp * 1.5) : xp
    },
    stats: {
      hungerDecay: 6,
      happinessDecay: 3
    }
  },

  luxe: {
    id: 'luxe',
    name: 'Luxe',
    emoji: '✨',
    color: 'linear-gradient(135deg, #ffd700, #ffec8b)',
    unlockType: 'premium',
    unlockRequirement: {
      type: 'level',
      value: 40,
      description: 'Reach Level 40 with any pet'
    },
    purchasePrice: 2.99,
    personality: 'Royal, demanding',
    origin: {
      short: 'Arrived already posing.',
      full: 'Arrived already posing, absolutely certain it deserves better than wherever it came from. And better than here, too.',
      traits: 'Loves luxury. Hates anything ordinary.'
    },
    likes: ['cake', 'ice_cream'],
    loves: ['golden_feast', 'dream_treat'],
    dislikes: ['apple', 'carrot', 'banana'],
    ability: {
      id: 'gem_bonus',
      name: '+100% Gems',
      description: 'Earns double gems from all sources',
      apply: (gems) => gems * 2
    },
    stats: {
      hungerDecay: 10,
      happinessDecay: 8
    }
  }
};
```

---

## PART 3: COMPLETE FOOD DATA

```typescript
const FOODS = {
  // === COMMON (5 coins) ===
  apple: {
    id: 'apple',
    name: 'Apple',
    emoji: '🍎',
    cost: 5,
    rarity: 'common',
    xp: 10,
    fullness: 15,
    happiness: 5,
    category: 'fruit',
    description: 'A crisp, healthy snack'
  },

  banana: {
    id: 'banana',
    name: 'Banana',
    emoji: '🍌',
    cost: 5,
    rarity: 'common',
    xp: 10,
    fullness: 15,
    happiness: 5,
    category: 'fruit',
    description: 'Sweet and filling'
  },

  carrot: {
    id: 'carrot',
    name: 'Carrot',
    emoji: '🥕',
    cost: 5,
    rarity: 'common',
    xp: 10,
    fullness: 15,
    happiness: 3,
    category: 'veggie',
    description: 'Crunchy and nutritious'
  },

  milk: {
    id: 'milk',
    name: 'Milk',
    emoji: '🥛',
    cost: 8,
    rarity: 'common',
    xp: 12,
    fullness: 18,
    happiness: 8,
    category: 'drink',
    description: 'Fresh and creamy'
  },

  salad: {
    id: 'salad',
    name: 'Salad',
    emoji: '🥗',
    cost: 8,
    rarity: 'common',
    xp: 12,
    fullness: 20,
    happiness: 3,
    category: 'veggie',
    description: 'Healthy greens'
  },

  // === UNCOMMON (10-25 coins) ===
  candy: {
    id: 'candy',
    name: 'Candy',
    emoji: '🍬',
    cost: 10,
    rarity: 'uncommon',
    xp: 15,
    fullness: 10,
    happiness: 20,
    category: 'sweet',
    description: 'Pure sugar rush'
  },

  cookie: {
    id: 'cookie',
    name: 'Cookie',
    emoji: '🍪',
    cost: 15,
    rarity: 'uncommon',
    xp: 20,
    fullness: 20,
    happiness: 15,
    category: 'sweet',
    description: 'A delicious treat'
  },

  spicy_taco: {
    id: 'spicy_taco',
    name: 'Spicy Taco',
    emoji: '🌮',
    cost: 15,
    rarity: 'uncommon',
    xp: 20,
    fullness: 25,
    happiness: 10,
    category: 'spicy',
    description: 'Hot and zesty'
  },

  ice_cream: {
    id: 'ice_cream',
    name: 'Ice Cream',
    emoji: '🍦',
    cost: 20,
    rarity: 'uncommon',
    xp: 25,
    fullness: 20,
    happiness: 25,
    category: 'sweet',
    description: 'Cold and creamy delight'
  },

  hot_pepper: {
    id: 'hot_pepper',
    name: 'Hot Pepper',
    emoji: '🌶️',
    cost: 20,
    rarity: 'uncommon',
    xp: 25,
    fullness: 15,
    happiness: 5,
    category: 'spicy',
    description: 'Extremely spicy!'
  },

  energy_drink: {
    id: 'energy_drink',
    name: 'Energy Drink',
    emoji: '⚡',
    cost: 25,
    rarity: 'uncommon',
    xp: 20,
    fullness: 5,
    happiness: 30,
    category: 'drink',
    description: 'MAXIMUM ENERGY!'
  },

  mystery_meat: {
    id: 'mystery_meat',
    name: 'Mystery Meat',
    emoji: '🍖',
    cost: 30,
    rarity: 'uncommon',
    xp: 35,
    fullness: 35,
    happiness: 15,
    category: 'meat',
    description: 'Don\'t ask what it is'
  },

  // === RARE (50-75 coins) ===
  cake: {
    id: 'cake',
    name: 'Cake',
    emoji: '🍰',
    cost: 50,
    rarity: 'rare',
    xp: 50,
    fullness: 30,
    happiness: 40,
    category: 'sweet',
    description: 'For special occasions'
  },

  dream_treat: {
    id: 'dream_treat',
    name: 'Dream Treat',
    emoji: '🌙',
    cost: 75,
    rarity: 'rare',
    xp: 60,
    fullness: 25,
    happiness: 45,
    category: 'magical',
    description: 'Tastes like sweet dreams'
  },

  // === LEGENDARY (100 coins) ===
  golden_feast: {
    id: 'golden_feast',
    name: 'Golden Feast',
    emoji: '👑',
    cost: 100,
    rarity: 'legendary',
    xp: 100,
    fullness: 50,
    happiness: 50,
    category: 'luxury',
    description: 'Fit for royalty'
  }
};

// Affinity multipliers
const AFFINITY = {
  loved:    { xpMult: 2.0,  bondMult: 1.5, happinessChange: +20 },
  liked:    { xpMult: 1.5,  bondMult: 1.2, happinessChange: +10 },
  neutral:  { xpMult: 1.0,  bondMult: 1.0, happinessChange: +5 },
  disliked: { xpMult: 0.5,  bondMult: 0.5, happinessChange: -10 }
};

function getAffinity(pet, foodId) {
  if (pet.loves.includes(foodId)) return 'loved';
  if (pet.likes.includes(foodId)) return 'liked';
  if (pet.dislikes.includes(foodId)) return 'disliked';
  return 'neutral';
}
```

---

## PART 4: COMPLETE GAME STATE

```typescript
interface PetState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  bond: number;
  bondLevel: number;
  fullness: number;
  happiness: number;
  evolutionStage: 'baby' | 'youth' | 'evolved';
  lastFed: number;
  lastPlayed: number;
}

interface GameState {
  // === PER-PET STATE ===
  pets: Record<string, PetState>;

  // === SHARED STATE ===
  activePetId: string;
  unlockedPets: string[];
  coins: number;
  gems: number;
  energy: number;
  inventory: Record<string, number>;

  // === CUMULATIVE STATS (for unlocks) ===
  stats: {
    minigamesPlayed: number;
    totalFeedings: number;
    poopsCleaned: number;
    daysPlayed: number;
    loginStreak: number;
    highestBondLevel: number;
    highestLevel: number;
  };

  // === FLAGS ===
  onboardingComplete: boolean;
  tutorialComplete: boolean;
  modeSelected: boolean;
  gameMode: 'cozy' | 'classic';

  // === TIMERS ===
  feedingCooldownEnd: number;
  energyLastRegen: number;
  lastDailyReset: string;
  firstFeedToday: boolean;
  firstGameToday: boolean;

  // === POOP ===
  poopPresent: boolean;
  poopCount: number;
  feedsSincePoop: number;

  // === RUNAWAY (Classic only) ===
  runaway: {
    active: boolean;
    petId: string;
    timestamp: number;
    returnTime: number;
  } | null;

  // === DISCOVERY ===
  discoveredPreferences: Record<string, {
    loves: string[];
    likes: string[];
    dislikes: string[];
  }>;
  preferenceJournalUnlocked: boolean;

  // === SETTINGS ===
  settings: {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
}

// === INITIAL STATE ===
const INITIAL_STATE: GameState = {
  pets: {
    munchlet: createPetState(),
    grib: createPetState(),
    plompo: createPetState()
  },
  activePetId: 'munchlet',
  unlockedPets: ['munchlet', 'grib', 'plompo'],
  coins: 100,
  gems: 10,
  energy: 50,
  inventory: {
    apple: 5,
    banana: 3,
    carrot: 2,
    cookie: 1
  },
  stats: {
    minigamesPlayed: 0,
    totalFeedings: 0,
    poopsCleaned: 0,
    daysPlayed: 1,
    loginStreak: 1,
    highestBondLevel: 0,
    highestLevel: 1
  },
  onboardingComplete: false,
  tutorialComplete: false,
  modeSelected: false,
  gameMode: 'cozy',
  feedingCooldownEnd: 0,
  energyLastRegen: Date.now(),
  lastDailyReset: new Date().toDateString(),
  firstFeedToday: true,
  firstGameToday: true,
  poopPresent: false,
  poopCount: 0,
  feedsSincePoop: 0,
  runaway: null,
  discoveredPreferences: {},
  preferenceJournalUnlocked: false,
  settings: {
    soundEnabled: true,
    vibrationEnabled: true
  }
};

function createPetState(): PetState {
  return {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    bond: 0,
    bondLevel: 0,
    fullness: 50,
    happiness: 50,
    evolutionStage: 'baby',
    lastFed: Date.now(),
    lastPlayed: Date.now()
  };
}
```

---

## PART 5: CORE GAME LOGIC

### Feeding System

```typescript
function feedPet(state: GameState, foodId: string): GameState {
  const pet = PETS[state.activePetId];
  const petState = state.pets[state.activePetId];
  const food = FOODS[foodId];

  // Check inventory
  if (!state.inventory[foodId] || state.inventory[foodId] <= 0) {
    return { ...state, error: 'No food in inventory!' };
  }

  // Check if stuffed
  if (petState.fullness > 90) {
    return { ...state, error: 'Too full to eat!' };
  }

  // Consume from inventory
  const newInventory = { ...state.inventory };
  newInventory[foodId]--;
  if (newInventory[foodId] <= 0) delete newInventory[foodId];

  // Calculate cooldown modifier
  const now = Date.now();
  const inCooldown = now < state.feedingCooldownEnd;
  const cooldownMult = inCooldown ? 0.25 : 1.0;

  // Calculate fullness modifier
  const fullnessState = getFullnessState(petState.fullness);
  const fullnessMult = fullnessState.feedValue;

  // Get affinity
  const affinity = getAffinity(pet, foodId);
  const affinityData = AFFINITY[affinity];

  // Calculate XP
  let xpGain = food.xp * affinityData.xpMult * fullnessMult * cooldownMult;
  
  // Apply pet ability (Whisp: +50% rare XP)
  if (pet.ability.id === 'rare_xp_bonus') {
    xpGain = pet.ability.apply(xpGain, food);
  }

  // Check Daily Moment
  const moment = getCurrentMoment();
  let bondMult = 1.0;
  if (moment.active && moment.bonus.bond) {
    bondMult = moment.bonus.bond;
  }
  if (moment.active && moment.bonus.xp) {
    xpGain *= moment.bonus.xp;
  }

  // Calculate bond gain
  let bondGain = getBondGainForFullness(petState.fullness) * affinityData.bondMult * bondMult * cooldownMult;
  
  // Apply pet ability (Munchlet: +10% bond)
  if (pet.ability.id === 'bond_bonus') {
    bondGain = pet.ability.apply(bondGain);
  }

  // Calculate happiness change
  let happinessChange = food.happiness + affinityData.happinessChange;
  
  // Apply pet ability (Grib: -20% mood penalty)
  if (pet.ability.id === 'mood_penalty_reduction' && happinessChange < 0) {
    happinessChange = pet.ability.apply(happinessChange);
  }

  // Update pet state
  const newPetState = { ...petState };
  newPetState.xp += Math.floor(xpGain);
  newPetState.bond += bondGain;
  newPetState.bondLevel = getBondLevel(newPetState.bond);
  newPetState.fullness = Math.min(100, newPetState.fullness + food.fullness);
  newPetState.happiness = Math.max(0, Math.min(100, newPetState.happiness + happinessChange));
  newPetState.lastFed = now;

  // Check level up
  let newCoins = state.coins;
  let newGems = state.gems;
  while (newPetState.xp >= newPetState.xpToNextLevel) {
    newPetState.xp -= newPetState.xpToNextLevel;
    newPetState.level++;
    newPetState.xpToNextLevel = getXPForLevel(newPetState.level);
    newPetState.evolutionStage = getEvolutionStage(newPetState.level);
    
    // Level up rewards
    newCoins += 50;
    let gemReward = 5;
    if (pet.ability.id === 'gem_bonus') {
      gemReward = pet.ability.apply(gemReward);
    }
    newGems += gemReward;
  }

  // First feed of day gem bonus
  let firstFeedBonus = false;
  if (state.firstFeedToday) {
    newGems += 1;
    firstFeedBonus = true;
  }

  // Check poop
  let newFeedsSincePoop = state.feedsSincePoop + 1;
  let newPoopPresent = state.poopPresent;
  let newPoopCount = state.poopCount;
  const poopThreshold = 3 + Math.floor(Math.random() * 2); // 3-4
  if (newFeedsSincePoop >= poopThreshold) {
    newPoopPresent = true;
    newPoopCount = Math.min(3, newPoopCount + 1);
    newFeedsSincePoop = 0;
  }

  // Update stats
  const newStats = { ...state.stats };
  newStats.totalFeedings++;
  newStats.highestBondLevel = Math.max(newStats.highestBondLevel, newPetState.bondLevel);
  newStats.highestLevel = Math.max(newStats.highestLevel, newPetState.level);

  // Discover preference
  const newDiscovered = { ...state.discoveredPreferences };
  if (!newDiscovered[state.activePetId]) {
    newDiscovered[state.activePetId] = { loves: [], likes: [], dislikes: [] };
  }
  if (affinity === 'loved' && !newDiscovered[state.activePetId].loves.includes(foodId)) {
    newDiscovered[state.activePetId].loves.push(foodId);
  }
  if (affinity === 'liked' && !newDiscovered[state.activePetId].likes.includes(foodId)) {
    newDiscovered[state.activePetId].likes.push(foodId);
  }
  if (affinity === 'disliked' && !newDiscovered[state.activePetId].dislikes.includes(foodId)) {
    newDiscovered[state.activePetId].dislikes.push(foodId);
  }

  return {
    ...state,
    pets: { ...state.pets, [state.activePetId]: newPetState },
    inventory: newInventory,
    coins: newCoins,
    gems: newGems,
    feedingCooldownEnd: now + (30 * 60 * 1000),
    firstFeedToday: false,
    poopPresent: newPoopPresent,
    poopCount: newPoopCount,
    feedsSincePoop: newFeedsSincePoop,
    stats: newStats,
    discoveredPreferences: newDiscovered,
    preferenceJournalUnlocked: newPetState.bondLevel >= 3,
    feedResult: {
      xp: Math.floor(xpGain),
      bond: bondGain,
      affinity,
      levelUp: newPetState.level > petState.level,
      firstFeedBonus
    }
  };
}

function getBondGainForFullness(fullness: number): number {
  if (fullness < 40) return 0.5 + Math.random() * 0.5;  // 0.5-1.0
  if (fullness < 70) return 0.2 + Math.random() * 0.3;  // 0.2-0.5
  return Math.random() * 0.1;  // 0.0-0.1
}

function getBondLevel(bond: number): number {
  if (bond >= 120) return 5;
  if (bond >= 80) return 4;
  if (bond >= 50) return 3;
  if (bond >= 25) return 2;
  if (bond >= 10) return 1;
  return 0;
}

function getEvolutionStage(level: number): 'baby' | 'youth' | 'evolved' {
  if (level >= 13) return 'evolved';
  if (level >= 7) return 'youth';
  return 'baby';
}

function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.15, level - 1));
}

function getFullnessState(fullness: number) {
  if (fullness <= 20) return { name: 'hungry', feedValue: 1.0, behavior: 'begs', bubble: '🍎❓' };
  if (fullness <= 40) return { name: 'peckish', feedValue: 0.75, behavior: 'glances', bubble: null };
  if (fullness <= 70) return { name: 'content', feedValue: 0.5, behavior: 'ignores', bubble: null };
  if (fullness <= 90) return { name: 'satisfied', feedValue: 0.25, behavior: 'shakes_head', bubble: '😌' };
  return { name: 'stuffed', feedValue: 0, behavior: 'turns_away', bubble: '🙅', blocked: true };
}

function getCurrentMoment() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 10) return { active: true, name: 'morning', icon: '🌅', bonus: { bond: 1.5 } };
  if (hour >= 12 && hour < 14) return { active: true, name: 'afternoon', icon: '☀️', bonus: { xp: 1.25 } };
  if (hour >= 18 && hour < 21) return { active: true, name: 'evening', icon: '🌙', bonus: { bond: 1.5 } };
  return { active: false };
}
```

### Mini-Game System

```typescript
function playMinigame(state: GameState, score: number): GameState {
  const pet = PETS[state.activePetId];
  const petState = state.pets[state.activePetId];

  // Check energy (first daily is free)
  const energyCost = state.firstGameToday ? 0 : 10;
  if (state.energy < energyCost) {
    return { ...state, error: 'Not enough energy!' };
  }

  // Determine tier
  const tier = getTier(score);
  const rewards = { ...MINIGAME_REWARDS[tier] };

  // Apply Fizz ability
  if (pet.ability.id === 'minigame_coin_bonus') {
    rewards.coins = pet.ability.apply(rewards.coins);
  }

  // Apply Luxe ability
  if (pet.ability.id === 'gem_bonus' && rewards.gems > 0) {
    rewards.gems = pet.ability.apply(rewards.gems);
  }

  // Update pet state
  const newPetState = { ...petState };
  newPetState.bond += rewards.bond;
  newPetState.bondLevel = getBondLevel(newPetState.bond);
  newPetState.happiness = Math.min(100, newPetState.happiness + rewards.happiness);
  newPetState.lastPlayed = Date.now();

  // Update stats
  const newStats = { ...state.stats };
  newStats.minigamesPlayed++;
  newStats.highestBondLevel = Math.max(newStats.highestBondLevel, newPetState.bondLevel);

  // Check unlocks
  const newUnlocks = checkUnlocks({ ...state, stats: newStats, pets: { ...state.pets, [state.activePetId]: newPetState } });

  return {
    ...state,
    pets: { ...state.pets, [state.activePetId]: newPetState },
    coins: state.coins + rewards.coins,
    gems: state.gems + rewards.gems,
    energy: state.energy - energyCost,
    firstGameToday: false,
    stats: newStats,
    unlockedPets: [...state.unlockedPets, ...newUnlocks],
    gameResult: {
      tier,
      score,
      rewards,
      newUnlocks
    }
  };
}

function getTier(score: number): string {
  if (score >= 300) return 'rainbow';
  if (score >= 200) return 'gold';
  if (score >= 100) return 'silver';
  return 'bronze';
}

const MINIGAME_REWARDS = {
  bronze:  { coins: 3,  gems: 0, bond: 0.3, happiness: 7 },
  silver:  { coins: 7,  gems: 0, bond: 0.3, happiness: 7 },
  gold:    { coins: 15, gems: 0, bond: 0.3, happiness: 7 },
  rainbow: { coins: 22, gems: 1, bond: 0.3, happiness: 7 }
};
```

### Unlock Checking

```typescript
function checkUnlocks(state: GameState): string[] {
  const newUnlocks: string[] = [];

  // Fizz: Bond Level 5 with any pet
  if (!state.unlockedPets.includes('fizz')) {
    const hasLevel5 = Object.values(state.pets).some(p => p.bondLevel >= 5);
    if (hasLevel5) newUnlocks.push('fizz');
  }

  // Ember: 10 mini-games
  if (!state.unlockedPets.includes('ember')) {
    if (state.stats.minigamesPlayed >= 10) newUnlocks.push('ember');
  }

  // Chomper: Level 25
  if (!state.unlockedPets.includes('chomper')) {
    if (state.stats.highestLevel >= 25) newUnlocks.push('chomper');
  }

  // Whisp: Level 30
  if (!state.unlockedPets.includes('whisp')) {
    if (state.stats.highestLevel >= 30) newUnlocks.push('whisp');
  }

  // Luxe: Level 40
  if (!state.unlockedPets.includes('luxe')) {
    if (state.stats.highestLevel >= 40) newUnlocks.push('luxe');
  }

  return newUnlocks;
}
```

### Poop Cleaning

```typescript
function cleanPoop(state: GameState): GameState {
  if (!state.poopPresent) return state;

  const petState = state.pets[state.activePetId];
  const newPetState = {
    ...petState,
    bond: petState.bond + 0.1,
    happiness: Math.min(100, petState.happiness + 2)
  };
  newPetState.bondLevel = getBondLevel(newPetState.bond);

  const newPoopCount = state.poopCount - 1;

  return {
    ...state,
    pets: { ...state.pets, [state.activePetId]: newPetState },
    poopPresent: newPoopCount > 0,
    poopCount: Math.max(0, newPoopCount),
    stats: { ...state.stats, poopsCleaned: state.stats.poopsCleaned + 1 }
  };
}
```

### Shop System

```typescript
function buyFood(state: GameState, foodId: string): GameState {
  const food = FOODS[foodId];

  if (state.coins < food.cost) {
    return { ...state, error: 'Not enough coins!' };
  }

  const newInventory = { ...state.inventory };
  newInventory[foodId] = (newInventory[foodId] || 0) + 1;

  return {
    ...state,
    coins: state.coins - food.cost,
    inventory: newInventory
  };
}
```

---

## PART 6: ONBOARDING FLOW

### Flow Sequence

```
1. Splash Screen (animated logo, "Tap to start")
       ↓
2. Intro Screen (1 page, skippable)
   "These little creatures are always hungry..."
       ↓
3. Pet Selection (3 starters with origin snippets, NO mechanics)
       ↓
4. Tutorial (3 spotlight steps)
   Step 1: "Tap a food to feed your pet!"
   Step 2: "See how they react?"
   Step 3: "Build your bond to unlock new friends!"
       ↓
5. Mode Selection (Cozy default, Classic locked until Level 10)
       ↓
6. Main Game
```

### Gate Logic

```typescript
function AppRouter({ state }) {
  if (!state.onboardingComplete) {
    return <OnboardingFlow onComplete={() => dispatch({ type: 'COMPLETE_ONBOARDING' })} />;
  }

  if (!state.tutorialComplete) {
    return <TutorialFlow onComplete={() => dispatch({ type: 'COMPLETE_TUTORIAL' })} />;
  }

  if (!state.modeSelected) {
    return <ModeSelect onSelect={(mode) => dispatch({ type: 'SELECT_MODE', mode })} />;
  }

  return <MainGame state={state} />;
}
```

---

## PART 7: UI COMPONENTS

### Pet Selector with Progress Bars

```tsx
function PetSelector({ state, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {Object.values(PETS).map(pet => {
        const isUnlocked = state.unlockedPets.includes(pet.id);
        const progress = getUnlockProgress(state, pet);

        return (
          <div
            key={pet.id}
            className={`p-3 rounded-xl ${isUnlocked ? 'bg-white' : 'bg-gray-100'}`}
            onClick={() => isUnlocked && onSelect(pet.id)}
          >
            <div className={`text-4xl text-center ${!isUnlocked && 'opacity-30 grayscale'}`}>
              {pet.emoji}
            </div>
            <div className="text-center font-medium mt-1">
              {isUnlocked ? pet.name : '???'}
            </div>

            {isUnlocked ? (
              <div className="text-center text-sm text-gray-500">
                Lv.{state.pets[pet.id].level}
              </div>
            ) : (
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">{progress.label}</div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(progress.current / progress.required) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-right text-gray-400">
                  {progress.current}/{progress.required}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getUnlockProgress(state, pet) {
  const req = pet.unlockRequirement;
  if (!req) return null;

  switch (req.type) {
    case 'bond_level':
      return { current: state.stats.highestBondLevel, required: 5, label: 'Bond Level' };
    case 'minigames_played':
      return { current: state.stats.minigamesPlayed, required: 10, label: 'Mini-games' };
    case 'level':
      return { current: state.stats.highestLevel, required: req.value, label: `Level ${req.value}` };
  }
}
```

### Unlock Celebration Modal

```tsx
function UnlockCelebration({ petId, onClose }) {
  const pet = PETS[petId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-2xl p-6 mx-4 text-center max-w-sm">
        <div className="text-4xl mb-2">✨✨✨</div>
        <h2 className="text-2xl font-bold text-purple-600 mb-4">NEW FRIEND UNLOCKED!</h2>

        <div className="text-8xl mb-4">{pet.emoji}</div>
        <h3 className="text-xl font-bold">{pet.name}</h3>

        <p className="text-gray-600 italic my-4">"{pet.origin.full}"</p>
        <p className="text-sm text-gray-500">{pet.origin.traits}</p>

        <div className="mt-4 p-2 bg-purple-100 rounded-lg">
          <span className="text-purple-700 font-medium">
            ✨ {pet.ability.name}
          </span>
        </div>

        <button
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-bold"
          onClick={onClose}
        >
          Start Playing!
        </button>
      </div>
    </div>
  );
}
```

### Gem Toast

```tsx
function GemToast({ amount, source }) {
  return (
    <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in z-50">
      <span className="text-xl">+{amount} 💎</span>
      <span className="text-sm ml-2 opacity-80">{source}</span>
    </div>
  );
}

// Sources
const GEM_SOURCES = {
  level_up: 'Level Up!',
  rainbow_tier: 'Rainbow!',
  first_feed: 'First Feed!',
  streak_7: '7-Day Streak!'
};
```

### Navigation Shell

```tsx
function NavigationShell({ children }) {
  const [panel, setPanel] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto">{children}</div>

      <nav className="flex justify-around bg-white border-t py-2 safe-area-bottom">
        <NavButton icon="🐾" label="Pets" onClick={() => setPanel('pets')} />
        <NavButton icon="🛒" label="Shop" onClick={() => setPanel('shop')} />
        <NavButton icon="🎮" label="Play" onClick={() => setPanel('games')} />
        <NavButton icon="⚙️" label="Settings" onClick={() => setPanel('settings')} />
      </nav>

      {panel && (
        <SlidePanel onClose={() => setPanel(null)}>
          {panel === 'pets' && <PetSelector />}
          {panel === 'shop' && <ShopPanel />}
          {panel === 'games' && <MinigameHub />}
          {panel === 'settings' && <SettingsPanel />}
        </SlidePanel>
      )}
    </div>
  );
}
```

---

## PART 8: BUILD CHECKLIST

Before pushing to GitHub, verify:

### Core Systems
- [ ] Only Bond hearts visible (no hunger/mood bars)
- [ ] Pet behavior changes with fullness state
- [ ] 30-minute cooldown timer shows after feeding
- [ ] Daily Moment indicators appear at correct times
- [ ] Feeding during cooldown gives 25% value

### Pet Data
- [ ] All 8 pets have complete data (origins, likes, loves, dislikes)
- [ ] All 15 foods in shop with correct costs
- [ ] Affinities work correctly (loved = 2x XP, disliked = 0.5x)
- [ ] Pet abilities apply correctly

### Progression
- [ ] XP curve follows formula
- [ ] Level up gives +50 coins, +5 gems
- [ ] Evolution stages change at levels 7 and 13
- [ ] Bond thresholds work (0/10/25/50/80/120)

### Unlocks
- [ ] Fizz unlocks at Bond Level 5
- [ ] Ember unlocks at 10 mini-games
- [ ] Progress bars show for locked pets
- [ ] Celebration modal appears on unlock

### Mini-Games
- [ ] Energy system works (50 max, 10 cost, 1/30min regen)
- [ ] First daily game is free
- [ ] Rewards: Bronze=3, Silver=7, Gold=15, Rainbow=22+1gem
- [ ] Fizz gets +25% coins
- [ ] Luxe gets +100% gems

### Economy
- [ ] Inventory starts with 5 apple, 3 banana, 2 carrot, 1 cookie
- [ ] Food consumed from inventory on feed
- [ ] Shop sells all 15 foods
- [ ] Gem toasts appear for level up, first feed, etc.

### Onboarding
- [ ] Animated splash screen
- [ ] Intro screen (1 page, skippable)
- [ ] Pet selection with origin snippets
- [ ] Spotlight tutorial (3 steps)
- [ ] Mode selection after tutorial

### Navigation
- [ ] Bottom nav with 4 buttons
- [ ] Slide-up panels for Pets, Shop, Games, Settings
- [ ] Settings has sound toggle, vibration toggle, reset

### Classic Mode (if Level 10+)
- [ ] Runaway system (NOT death)
- [ ] 48-hour lockout
- [ ] 25 gems to return early
- [ ] Bond -50% on return

### Persistence
- [ ] State saves to localStorage
- [ ] State loads on refresh
- [ ] Daily reset works (first feed bonus, first game free)

---

## FINAL NOTES

- This is a **single HTML file** build
- Use React 18 via CDN: `https://unpkg.com/react@18/umd/react.production.min.js`
- Use Tailwind via CDN: `https://cdn.tailwindcss.com`
- Save state key: `grundy-save-v2`
- Push to GitHub when complete

**Start building. Everything you need is in this document.**
