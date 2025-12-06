# GRUNDY — MASTER TO-DO LIST FOR CLAUDE CODE v2.1

**Copy and paste this entire prompt into Claude Code.**

---

## ⚠️ CRITICAL: READ FIRST

**From GRUNDY_MASTER_DECISIONS.md — These override all other specs:**

| Decision | Implementation |
|----------|----------------|
| **Hidden Stats** | Only Bond visible. Pet behavior shows needs. |
| **Fullness** | Hidden stat. 30-min cooldown visible. |
| **Daily Moments** | Morning/Afternoon/Evening bonuses |
| **NO DEATH** | Runaway (48h lockout) in Classic, not death |
| **Conservative Rewards** | Bronze: 3c, Silver: 7c, Gold: 15c, Rainbow: 22c+1gem |
| **Pet Unlocks** | Fizz/Ember via achievements, NOT gem purchase |

---

## 📋 QUICK REFERENCE — ALL KEY VALUES

### WHAT'S VISIBLE vs HIDDEN

| Stat | Visible? | How Player Knows |
|------|----------|------------------|
| Bond | ✅ YES | Hearts: ♥♥♥♡♡ (0-5 scale) |
| Level | ✅ YES | "Level 7" displayed |
| XP | ✅ YES | Progress bar to next level |
| Cooldown | ✅ YES | "⏱️ 12:34" after feeding |
| Fullness | ❌ HIDDEN | Pet behavior (begs → turns away) |
| Happiness | ❌ HIDDEN | Pet animation (bouncy → droopy) |

### BOND THRESHOLDS

| Level | Points | Hearts |
|-------|--------|--------|
| 0 | 0 | ♡♡♡♡♡ |
| 1 | 10 | ♥♡♡♡♡ |
| 2 | 25 | ♥♥♡♡♡ |
| 3 | 50 | ♥♥♥♡♡ |
| 4 | 80 | ♥♥♥♥♡ |
| 5 | 120 | ♥♥♥♥♥ |

### BOND SOURCES

| Action | Bond Gain |
|--------|-----------|
| Feeding (hungry pet) | +0.5 to +1.0 |
| Feeding (during Daily Moment) | +50% bonus |
| Mini-game played | +0.3 (flat) |
| Cleaning poop | +0.1 |

### PET UNLOCKS

| Pet | Type | How to Unlock |
|-----|------|---------------|
| Munchlet, Grib, Plompo | Free | Start with all 3 |
| Fizz | Earnable | Bond Level 5 (ANY pet reaches 120 bond) |
| Ember | Earnable | 10 mini-games (cumulative, all pets) |
| Chomper | Premium | Level 25 (any pet) |
| Whisp | Premium | Level 30 (any pet) |
| Luxe | Premium | Level 40 (any pet) |

### DAILY MOMENTS

| Moment | Time | Bonus |
|--------|------|-------|
| Morning 🌅 | 7:00-10:00 AM | +50% bond |
| Afternoon ☀️ | 12:00-2:00 PM | +25% XP |
| Evening 🌙 | 6:00-9:00 PM | +50% bond |

### MINI-GAME REWARDS

| Tier | Score | Coins | Gems | Bond | Happiness |
|------|-------|-------|------|------|-----------|
| Bronze | 0-99 | 3 | 0 | +0.3 | +7 |
| Silver | 100-199 | 7 | 0 | +0.3 | +7 |
| Gold | 200-299 | 15 | 0 | +0.3 | +7 |
| Rainbow | 300+ | 22 | 1 | +0.3 | +7 |

### ENERGY SYSTEM

- Max: 50 energy
- Cost: 10 per game
- Regen: 1 per 30 minutes
- First daily game: FREE

### GEM INCOME

| Source | Gems |
|--------|------|
| Level up | +5 |
| Rainbow tier | +1 |
| Day 7 streak | +10 |
| First feed of day | +1 |

### COOLDOWN

- Duration: **30 minutes** after feeding
- Feeding during cooldown: **25% value**
- Timer always visible: "⏱️ 29:45"

### RUNAWAY (Classic Mode Only)

- Trigger: Extended neglect
- Lockout: 48 hours
- Early return: 25 gems
- Penalty: Bond -50%
- Permanent: **NEVER** — pet always returns

### POOP

- Appears: After 3-4 feedings
- Tap to clean: +0.1 bond, +2 happiness
- Max stack: 3 poops

### EVOLUTION STAGES

| Stage | Levels |
|-------|--------|
| Baby | 1-6 |
| Youth | 7-12 |
| Evolved | 13+ |

---

## INSTRUCTIONS

Read the updated CLAUDE.md and GRUNDY_MASTER_DECISIONS.md. Execute ALL of the following in order. Verify each section works before continuing. Rebuild grundy-game.html and push to GitHub when complete.

---

## SECTION 0: ALIGNMENT FIXES (DO FIRST)

### FIX-001: Replace Death with Runaway System

**REMOVE this:**
```typescript
const DEATH_CONFIG = {
  enabled: (mode) => mode === 'classic',
  mistakesBeforeRisk: 5,
  deathChancePerMistake: 0.1,
  // ...
};
```

**ADD this:**
```typescript
const RUNAWAY_CONFIG = {
  enabled: (mode) => mode === 'classic',
  
  neglectPath: [
    { stage: 1, condition: 'sad', message: 'Your pet seems unhappy...' },
    { stage: 2, condition: 'sick', message: 'Your pet is getting sick!' },
    { stage: 3, condition: 'warning', message: 'Your pet is thinking about leaving...' },
    { stage: 4, condition: 'runaway', message: 'Your pet ran away!' }
  ],
  
  lockoutDuration: 48 * 60 * 60 * 1000, // 48 hours
  
  return: {
    waitTime: 48 * 60 * 60 * 1000,
    gemCost: 25,
    bondPenalty: 0.5  // -50%
  },
  
  permanent: false  // Pet ALWAYS returns eventually
};
```

**Runaway Screen:**
- Show sad empty room
- "Your pet ran away..."
- Timer showing time until return
- [Pay 25 💎 to Apologize] button
- Pet returns with bond reduced 50%

---

### FIX-002: Hidden Stats System

**REMOVE visible stat bars for:** hunger, mood, energy

**KEEP visible:** Bond hearts (♥♥♥♡♡)

**ADD behavioral indicators:**
```typescript
const PET_BEHAVIORS = {
  hungry: { 
    animation: 'hungry-wobble', 
    bubble: '🍎❓', 
    sound: 'stomach_growl' 
  },
  peckish: { 
    animation: 'glance-food', 
    bubble: null 
  },
  content: { 
    animation: 'idle', 
    bubble: null 
  },
  satisfied: { 
    animation: 'pat-belly', 
    bubble: '😌' 
  },
  stuffed: { 
    animation: 'turn-away', 
    bubble: '🙅',
    blockFeeding: true 
  },
  
  // Mood indicators
  happy: { animation: 'bounce', eyes: 'bright' },
  sad: { animation: 'droop', eyes: 'droopy' },
  tired: { animation: 'yawn', bubble: '💤' }
};
```

---

### FIX-003: Fullness System (Replaces Hunger Display)

**Rename internally:** `hunger` → `fullness`

**Keep hidden.** Player learns pet state from behavior.

```typescript
const FULLNESS_STATES = {
  HUNGRY:    { range: [0, 20],   feedValue: 1.0,  behavior: 'begs' },
  PECKISH:   { range: [21, 40],  feedValue: 0.75, behavior: 'glances' },
  CONTENT:   { range: [41, 70],  feedValue: 0.5,  behavior: 'ignores' },
  SATISFIED: { range: [71, 90],  feedValue: 0.25, behavior: 'shakes_head' },
  STUFFED:   { range: [91, 100], feedValue: 0,    behavior: 'turns_away' }
};

// 30-min cooldown IS visible
const FEEDING_COOLDOWN = 30 * 60 * 1000; // 30 min
const FEED_DURING_COOLDOWN_VALUE = 0.25; // 25% value
```

---

### FIX-004: Daily Moments System

```typescript
const DAILY_MOMENTS = {
  morning: {
    hours: [7, 10],
    bonus: { bond: 1.5 },
    icon: '🌅',
    message: 'Good morning! Extra cuddles!'
  },
  afternoon: {
    hours: [12, 14],
    bonus: { xp: 1.25 },
    icon: '☀️',
    message: 'Snack time! Extra XP!'
  },
  evening: {
    hours: [18, 21],
    bonus: { bond: 1.5 },
    icon: '🌙',
    message: 'Evening cuddles!'
  }
};

function getCurrentMoment() {
  const hour = new Date().getHours();
  for (const [name, moment] of Object.entries(DAILY_MOMENTS)) {
    if (hour >= moment.hours[0] && hour < moment.hours[1]) {
      return { active: true, name, ...moment };
    }
  }
  return { active: false };
}
```

**UI:** Show moment indicator when bonus is active.

---

### FIX-005: Conservative Mini-Game Rewards ⚠️

**REPLACE all reward values with:**
```typescript
const MINIGAME_REWARDS = {
  bronze:  { coins: 3,  gems: 0, bond: 0.3, happiness: 7, food: null },
  silver:  { coins: 7,  gems: 0, bond: 0.3, happiness: 7, food: { chance: 0.4, rarity: 'common' } },
  gold:    { coins: 15, gems: 0, bond: 0.3, happiness: 7, food: { chance: 0.75, rarity: 'any' } },
  rainbow: { coins: 22, gems: 1, bond: 0.3, happiness: 7, food: { chance: 1.0, rarity: 'rare' } }
};

// Per game bonus (25% less than original +0.4/+10)
const PER_GAME_BONUS = {
  bond: 0.3,
  happiness: 7
};

// Energy system
const ENERGY_CONFIG = {
  max: 50,
  costPerGame: 10,
  regenRate: 1,  // per 30 min
  firstDailyFree: true
};
```

---

### FIX-006: Pet Unlock System ⚠️

**CHANGE from gem purchase to achievements:**

```typescript
const PET_UNLOCK_CONFIG = {
  // FREE - Start with all 3
  free: ['munchlet', 'grib', 'plompo'],
  
  // EARNABLE - Via achievements
  earnable: {
    fizz: {
      type: 'achievement',
      requirement: 'bond_level_5',
      description: 'Reach Bond Level 5 with any pet',
      check: (state) => Object.values(state.pets).some(p => p.bondLevel >= 5)
    },
    ember: {
      type: 'achievement',
      requirement: 'minigames_10',
      description: 'Complete 10 mini-games',
      check: (state) => state.stats.minigamesPlayed >= 10
    }
  },
  
  // PREMIUM - Multiple methods
  premium: {
    chomper: {
      methods: ['grundy_plus', 'purchase', 'achievement'],
      price: 1.99,
      achievement: { level: 25, description: 'Reach Level 25' }
    },
    whisp: {
      methods: ['grundy_plus', 'purchase', 'achievement'],
      price: 2.49,
      achievement: { level: 30, description: 'Reach Level 30' }
    },
    luxe: {
      methods: ['grundy_plus', 'purchase', 'achievement'],
      price: 2.99,
      achievement: { level: 40, description: 'Reach Level 40' }
    }
  }
};
```

---

## SECTION 1: DATA LAYER (Pets & Foods)

### WEB-027: 8 Pet Definitions — COMPLETE DATA

```typescript
const PETS = {
  munchlet: {
    id: 'munchlet',
    name: 'Munchlet',
    emoji: '🟡',
    color: '#fbbf24',
    unlockType: 'free',
    personality: 'Cheerful, loves company',
    origin: 'Found on a sunny windowsill, humming. Loves sweet things. Hates being alone.',
    likes: ['apple', 'banana'],
    loves: ['cookie', 'candy', 'ice_cream'],
    dislikes: ['spicy_taco', 'hot_pepper'],
    ability: {
      id: 'bond_bonus',
      name: '+10% Bond',
      description: 'Earns 10% more bond from all actions',
      apply: (bond) => bond * 1.1
    },
    hungerDecay: 10,  // fullness lost per hour
    moodDecay: 5      // happiness lost per hour
  },
  
  grib: {
    id: 'grib',
    name: 'Grib',
    emoji: '🟢',
    color: '#4ade80',
    unlockType: 'free',
    personality: 'Mischievous, chaotic',
    origin: 'Appeared in a shadow behind the cupboard, grinning. Loves chaos. Hates boredom.',
    likes: ['spicy_taco', 'mystery_meat'],
    loves: ['hot_pepper', 'fire_candy'],
    dislikes: ['salad', 'carrot'],
    ability: {
      id: 'mood_penalty_reduction',
      name: '-20% Mood Penalty',
      description: 'Takes 20% less mood damage from dislikes',
      apply: (moodLoss) => moodLoss * 0.8
    },
    hungerDecay: 12,
    moodDecay: 6
  },
  
  plompo: {
    id: 'plompo',
    name: 'Plompo',
    emoji: '🟣',
    color: '#a78bfa',
    unlockType: 'free',
    personality: 'Sleepy, calm',
    origin: 'Discovered sleeping in a cloud that drifted too low. Loves naps. Hates rushing.',
    likes: ['banana', 'milk'],
    loves: ['cake', 'cookie', 'dream_treat'],
    dislikes: ['hot_pepper', 'coffee', 'energy_drink'],
    ability: {
      id: 'mood_decay_reduction',
      name: '-20% Mood Decay',
      description: 'Mood decays 20% slower over time',
      apply: (decayRate) => decayRate * 0.8
    },
    hungerDecay: 8,
    moodDecay: 4
  },
  
  fizz: {
    id: 'fizz',
    name: 'Fizz',
    emoji: '🔵',
    color: '#3b82f6',
    unlockType: 'earnable',
    unlockRequirement: { type: 'bond_level', value: 5, description: 'Reach Bond Level 5 with any pet' },
    personality: 'Hyper, energetic',
    origin: 'Sparked into existence during a thunderstorm. Loves excitement. Hates waiting.',
    likes: ['candy', 'soda'],
    loves: ['energy_drink', 'rainbow_candy'],
    dislikes: ['salad', 'milk'],
    ability: {
      id: 'minigame_coin_bonus',
      name: '+25% Mini-game Coins',
      description: 'Earns 25% more coins from mini-games',
      apply: (coins) => Math.floor(coins * 1.25)
    },
    hungerDecay: 15,
    moodDecay: 8
  },
  
  ember: {
    id: 'ember',
    name: 'Ember',
    emoji: '🟠',
    color: '#f97316',
    unlockType: 'earnable',
    unlockRequirement: { type: 'minigames_played', value: 10, description: 'Complete 10 mini-games' },
    personality: 'Fierce, attention-seeking',
    origin: 'Emerged from the last ember of a dying fire. Loves attention. Hates being ordinary.',
    likes: ['spicy_taco'],
    loves: ['hot_pepper', 'fire_candy'],
    dislikes: ['ice_cream', 'milk', 'cold_treats'],
    ability: {
      id: 'spicy_coin_bonus',
      name: '2x Spicy Coins',
      description: 'Earns double coins when fed spicy foods',
      apply: (coins, food) => food.category === 'spicy' ? coins * 2 : coins
    },
    hungerDecay: 12,
    moodDecay: 7
  },
  
  chomper: {
    id: 'chomper',
    name: 'Chomper',
    emoji: '🔴',
    color: '#ef4444',
    unlockType: 'premium',
    unlockRequirement: { type: 'level', value: 25, description: 'Reach Level 25 with any pet' },
    purchasePrice: 1.99,
    personality: 'Hungry, food-obsessed',
    origin: 'First spotted near the kitchen, following the smell of dinner. Loves food. Hates... just loves food.',
    likes: ['apple', 'banana', 'cookie', 'cake'],
    loves: ['meat', 'feast', 'golden_feast'],
    dislikes: [],  // NO DISLIKES - special ability
    ability: {
      id: 'no_dislikes',
      name: 'No Dislikes',
      description: 'Never has negative reactions to any food',
      apply: (affinity) => Math.max(affinity, 1.0)  // minimum neutral
    },
    hungerDecay: 18,
    moodDecay: 5
  },
  
  whisp: {
    id: 'whisp',
    name: 'Whisp',
    emoji: '⚪',
    color: '#e2e8f0',
    unlockType: 'premium',
    unlockRequirement: { type: 'level', value: 30, description: 'Reach Level 30 with any pet' },
    purchasePrice: 2.49,
    personality: 'Mysterious, dreamy',
    origin: 'Drifted in through a crack in a dream. Loves quiet. Hates loud noises.',
    likes: ['dream_treat', 'cloud_candy'],
    loves: ['rare_essence', 'star_fruit', 'golden_feast'],
    dislikes: ['hot_pepper', 'spicy_taco', 'fire_candy'],
    ability: {
      id: 'rare_xp_bonus',
      name: '+50% Rare XP',
      description: 'Earns 50% more XP from rare and legendary foods',
      apply: (xp, food) => (food.rarity === 'rare' || food.rarity === 'legendary') ? xp * 1.5 : xp
    },
    hungerDecay: 6,
    moodDecay: 3
  },
  
  luxe: {
    id: 'luxe',
    name: 'Luxe',
    emoji: '✨',
    color: 'linear-gradient(135deg, #ffd700, #ffec8b)',
    unlockType: 'premium',
    unlockRequirement: { type: 'level', value: 40, description: 'Reach Level 40 with any pet' },
    purchasePrice: 2.99,
    personality: 'Royal, demanding',
    origin: 'Arrived already posing. Certain they deserve better. Loves luxury. Hates anything ordinary.',
    likes: ['cake', 'ice_cream'],
    loves: ['golden_feast', 'diamond_candy', 'rare_essence'],
    dislikes: ['apple', 'carrot', 'banana'],  // hates common foods
    ability: {
      id: 'gem_bonus',
      name: '+100% Gems',
      description: 'Earns double gems from all sources',
      apply: (gems) => gems * 2
    },
    hungerDecay: 10,
    moodDecay: 8
  }
};
```

---

### WEB-028: 10 Food Definitions — COMPLETE DATA

```typescript
const FOODS = {
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
```

---

### AFFINITY MULTIPLIERS

```typescript
const AFFINITY = {
  loved:    { xpMult: 2.0,  bondMult: 1.5, moodChange: +20, reaction: 'love' },
  liked:    { xpMult: 1.5,  bondMult: 1.2, moodChange: +10, reaction: 'happy' },
  neutral:  { xpMult: 1.0,  bondMult: 1.0, moodChange: +5,  reaction: 'neutral' },
  disliked: { xpMult: 0.5,  bondMult: 0.5, moodChange: -10, reaction: 'dislike' }
};

function getAffinity(pet, food) {
  if (pet.loves.includes(food.id)) return AFFINITY.loved;
  if (pet.likes.includes(food.id)) return AFFINITY.liked;
  if (pet.dislikes.includes(food.id)) return AFFINITY.disliked;
  return AFFINITY.neutral;
}
```

---

### BOND SYSTEM

```typescript
const BOND_THRESHOLDS = [
  { level: 0, points: 0,   hearts: '♡♡♡♡♡' },
  { level: 1, points: 10,  hearts: '♥♡♡♡♡' },
  { level: 2, points: 25,  hearts: '♥♥♡♡♡' },
  { level: 3, points: 50,  hearts: '♥♥♥♡♡' },
  { level: 4, points: 80,  hearts: '♥♥♥♥♡' },
  { level: 5, points: 120, hearts: '♥♥♥♥♥' }
];

const BOND_SOURCES = {
  feeding_hungry:    { min: 0.5, max: 1.0 },  // when fullness < 40
  feeding_content:   { min: 0.2, max: 0.5 },  // when fullness 40-70
  feeding_full:      { min: 0.0, max: 0.1 },  // when fullness > 70
  minigame:          { flat: 0.3 },           // per game played
  cleaning_poop:     { flat: 0.1 },           // per poop cleaned
  daily_moment:      { multiplier: 1.5 }      // +50% during moments
};

function getBondLevel(bondPoints) {
  for (let i = BOND_THRESHOLDS.length - 1; i >= 0; i--) {
    if (bondPoints >= BOND_THRESHOLDS[i].points) {
      return BOND_THRESHOLDS[i].level;
    }
  }
  return 0;
}
```

---

### FULLNESS SYSTEM (Hidden)

```typescript
const FULLNESS_STATES = {
  HUNGRY:    { min: 0,  max: 20,  feedValue: 1.0,  behavior: 'begs',        bubble: '🍎❓' },
  PECKISH:   { min: 21, max: 40,  feedValue: 0.75, behavior: 'glances',     bubble: null },
  CONTENT:   { min: 41, max: 70,  feedValue: 0.5,  behavior: 'ignores',     bubble: null },
  SATISFIED: { min: 71, max: 90,  feedValue: 0.25, behavior: 'shakes_head', bubble: '😌' },
  STUFFED:   { min: 91, max: 100, feedValue: 0,    behavior: 'turns_away',  bubble: '🙅', blocked: true }
};

function getFullnessState(fullness) {
  for (const [name, state] of Object.entries(FULLNESS_STATES)) {
    if (fullness >= state.min && fullness <= state.max) {
      return { name, ...state };
    }
  }
  return FULLNESS_STATES.CONTENT;
}
```

---

### EVOLUTION STAGES

```typescript
const EVOLUTION_STAGES = {
  baby:    { minLevel: 1,  maxLevel: 6,  scale: 0.7, prefix: 'Baby' },
  youth:   { minLevel: 7,  maxLevel: 12, scale: 0.85, prefix: '' },
  evolved: { minLevel: 13, maxLevel: 99, scale: 1.0, prefix: 'Evolved' }
};

function getEvolutionStage(level) {
  if (level <= 6) return 'baby';
  if (level <= 12) return 'youth';
  return 'evolved';
}
```

---

### GEM ECONOMY

```typescript
const GEM_SOURCES = {
  level_up:        5,   // per level gained
  rainbow_tier:    1,   // from mini-game Rainbow score
  login_streak_7:  10,  // day 7 login bonus
  first_daily_feed: 1   // first feed each day
};

const GEM_COSTS = {
  apologize_runaway: 25  // bring pet back early
};
```

---

### XP & LEVELING

```typescript
// XP required for each level (curved progression)
function getXPForLevel(level) {
  return Math.floor(100 * Math.pow(1.15, level - 1));
}

// Level 1:  100 XP
// Level 5:  175 XP
// Level 10: 404 XP
// Level 20: 1,637 XP
// Level 30: 6,621 XP

const LEVEL_UP_REWARDS = {
  coins: 50,
  gems: 5  // Luxe gets 10 due to ability
};
```

---

## SECTION 2: STATE MANAGEMENT

### WEB-025: Complete Game State Structure

```typescript
interface PetState {
  // Progression
  level: number;
  xp: number;
  xpToNextLevel: number;
  
  // Bond (VISIBLE as hearts)
  bond: number;           // 0-120+ points
  bondLevel: number;      // 0-5 (derived from bond)
  
  // Hidden Stats (shown via behavior)
  fullness: number;       // 0-100
  happiness: number;      // 0-100
  
  // Evolution
  evolutionStage: 'baby' | 'youth' | 'evolved';
  evolutionVariant: 'normal' | 'corrupted';  // Classic mode only
  
  // Timestamps
  lastFed: number;        // timestamp
  lastPlayed: number;     // timestamp
}

interface GameState {
  // ===== PER-PET STATE (separate for each pet) =====
  pets: {
    [petId: string]: PetState;
  };
  
  // ===== SHARED STATE (global) =====
  activePetId: string;
  unlockedPets: string[];  // ['munchlet', 'grib', 'plompo']
  coins: number;
  gems: number;
  
  // Inventory: foodId -> quantity owned
  inventory: Record<string, number>;
  
  // ===== STATS (for achievements & unlocks) =====
  stats: {
    minigamesPlayed: number;    // cumulative, unlocks Ember at 10
    totalFeedings: number;
    poopsCleaned: number;
    daysPlayed: number;
    loginStreak: number;
    highestBondLevel: number;   // unlocks Fizz at 5
    highestLevel: number;       // unlocks premium pets
  };
  
  // ===== FLAGS =====
  onboardingComplete: boolean;
  tutorialComplete: boolean;
  gameMode: 'cozy' | 'classic';
  
  // ===== COOLDOWNS & TIMERS =====
  feedingCooldownEnd: number;   // timestamp when cooldown ends
  lastDailyReset: string;       // 'YYYY-MM-DD' format
  firstFeedToday: boolean;      // reset daily, gives +1 gem
  
  // ===== RUNAWAY (Classic mode) =====
  runaway: {
    active: boolean;
    petId: string | null;
    timestamp: number;          // when pet ran away
    returnTime: number;         // when pet returns (48h later)
  } | null;
  
  // ===== POOP =====
  poopPresent: boolean;
  poopCount: number;            // 0-3 poops can stack
  feedsSincePoop: number;       // poop appears after 3-4 feeds
  
  // ===== PREFERENCES (Discovery system) =====
  discoveredPreferences: {
    [petId: string]: {
      loves: string[];      // food IDs discovered as loved
      likes: string[];
      dislikes: string[];
    }
  };
  preferenceJournalUnlocked: boolean;  // unlocks at Bond Level 3
  
  // ===== SETTINGS =====
  settings: {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    notificationsEnabled: boolean;
  };
}

// Initial state for new players
const INITIAL_STATE: GameState = {
  pets: {
    munchlet: createInitialPetState(),
    grib: createInitialPetState(),
    plompo: createInitialPetState()
  },
  activePetId: 'munchlet',
  unlockedPets: ['munchlet', 'grib', 'plompo'],
  coins: 100,
  gems: 10,
  inventory: {
    apple: 5,
    banana: 3,
    cookie: 1
  },
  stats: {
    minigamesPlayed: 0,
    totalFeedings: 0,
    poopsCleaned: 0,
    daysPlayed: 0,
    loginStreak: 0,
    highestBondLevel: 0,
    highestLevel: 1
  },
  onboardingComplete: false,
  tutorialComplete: false,
  gameMode: 'cozy',
  feedingCooldownEnd: 0,
  lastDailyReset: '',
  firstFeedToday: true,
  runaway: null,
  poopPresent: false,
  poopCount: 0,
  feedsSincePoop: 0,
  discoveredPreferences: {},
  preferenceJournalUnlocked: false,
  settings: {
    soundEnabled: true,
    vibrationEnabled: true,
    notificationsEnabled: true
  }
};

function createInitialPetState(): PetState {
  return {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    bond: 0,
    bondLevel: 0,
    fullness: 50,
    happiness: 50,
    evolutionStage: 'baby',
    evolutionVariant: 'normal',
    lastFed: Date.now(),
    lastPlayed: Date.now()
  };
}
```

---

### UNLOCK CHECKING

```typescript
function checkUnlocks(state: GameState): string[] {
  const newUnlocks: string[] = [];
  
  // Fizz: Bond Level 5 with any pet
  if (!state.unlockedPets.includes('fizz')) {
    const hasLevel5Bond = Object.values(state.pets).some(p => p.bondLevel >= 5);
    if (hasLevel5Bond) newUnlocks.push('fizz');
  }
  
  // Ember: 10 mini-games played (cumulative)
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

---

## SECTION 3: ONBOARDING FLOW

### WEB-023: Welcome Flow

**Screen 1: Splash**
- Logo fades in with scale animation
- "GRUNDY" title
- "Tap to start"

**Screen 2: Intro (1 page, skippable)**
- "These little creatures are always hungry..."
- "Feed them, play with them, watch them grow!"
- [Skip] [Next →]

**Screen 3: Pet Selection**
- "Who do you want to care for first?"
- Show 3 starters with origin snippets (from Master Decisions #15):
  - Munchlet: "Found on a sunny windowsill, humming. Loves sweet things. Hates being alone."
  - Grib: "Appeared in a shadow behind the cupboard, grinning. Loves chaos. Hates boredom."
  - Plompo: "Discovered sleeping in a cloud. Loves naps. Hates rushing."
- **NO mechanics shown** - just personality
- [Let's Go!]

**Screen 4: Tutorial (then Mode Select)**
- Set onboardingComplete = true
- Run tutorial
- AFTER tutorial: Show mode selection (Casual default, Classic unlock at Lv10)

---

### WEB-032: First Session Tutorial

**Step 1:** Spotlight food bag → "Tap a food to feed your pet!"
**Step 2:** After feed → "See how they react? They'll show you what they like!"
**Step 3:** Point to Bond hearts → "Build your bond to unlock new friends!"
**Step 4:** [Got it!] → tutorialComplete = true

---

## SECTION 4: PET UNLOCK SYSTEM

### WEB-024: Pet Selector

- Shows all 8 pets in grid
- **Free pets:** Always available, show level
- **Earnable pets:** Show achievement progress
  - Fizz: "🔒 Reach Bond Level 5" with progress bar
  - Ember: "🔒 Play 10 mini-games (3/10)"
- **Premium pets:** Show options
  - "Grundy Plus" badge
  - "Or $X.XX" price
  - "Or reach Level X" achievement

### WEB-029: Pet Unlock Celebration

- Pet emoji large with sparkle animation
- "NEW FRIEND UNLOCKED!"
- Show origin snippet
- [Start Playing] → switch to new pet

---

## SECTION 5: PET ABILITIES

### WEB-030: Implement Pet Special Abilities

| Pet | Ability | Implementation |
|-----|---------|----------------|
| Munchlet | +10% bond | bondGain × 1.1 |
| Grib | -20% mood penalty | moodLoss × 0.8 |
| Plompo | -20% mood decay | decayRate × 0.8 |
| Fizz | +25% mini-game coins | coins × 1.25 (NOT rewards) |
| Ember | 2× coins from spicy | if spicy: coins × 2 |
| Chomper | No dislikes | affinity = max(affinity, 'neutral') |
| Whisp | +50% XP rare/epic | if rarity >= rare: xp × 1.5 |
| Luxe | +100% gem drops | gems × 2 |

---

## SECTION 6: MINI-GAMES

### MINI-GAME REWARDS — COMPLETE DATA

```typescript
const MINIGAME_REWARDS = {
  bronze:  { 
    score: { min: 0, max: 99 },
    coins: 3, 
    gems: 0, 
    bond: 0.3, 
    happiness: 7,
    food: null
  },
  silver:  { 
    score: { min: 100, max: 199 },
    coins: 7, 
    gems: 0, 
    bond: 0.3, 
    happiness: 7,
    food: { chance: 0.4, rarity: 'common' }
  },
  gold:    { 
    score: { min: 200, max: 299 },
    coins: 15, 
    gems: 0, 
    bond: 0.3, 
    happiness: 7,
    food: { chance: 0.75, rarity: 'any' }
  },
  rainbow: { 
    score: { min: 300, max: Infinity },
    coins: 22, 
    gems: 1, 
    bond: 0.3, 
    happiness: 7,
    food: { chance: 1.0, rarity: 'rare' }
  }
};

function getTier(score: number): string {
  if (score >= 300) return 'rainbow';
  if (score >= 200) return 'gold';
  if (score >= 100) return 'silver';
  return 'bronze';
}

function applyPetAbility(pet, rewards) {
  // Fizz: +25% coins
  if (pet.id === 'fizz') {
    rewards.coins = Math.floor(rewards.coins * 1.25);
  }
  // Luxe: +100% gems
  if (pet.id === 'luxe') {
    rewards.gems = rewards.gems * 2;
  }
  return rewards;
}
```

### ENERGY SYSTEM

```typescript
const ENERGY_CONFIG = {
  max: 50,
  costPerGame: 10,
  regenRate: 1,           // energy gained
  regenInterval: 30 * 60 * 1000,  // every 30 minutes
  firstDailyFree: true    // first game each day costs 0 energy
};

function canPlayMinigame(state: GameState): { allowed: boolean; reason?: string } {
  // Check first daily free
  if (state.firstFeedToday && state.stats.minigamesPlayed > 0) {
    // Already used free game today
  }
  
  if (state.energy < ENERGY_CONFIG.costPerGame) {
    const timeToRegen = calculateTimeToEnergy(state.energy, ENERGY_CONFIG.costPerGame);
    return { 
      allowed: false, 
      reason: `Not enough energy. Regenerates in ${formatTime(timeToRegen)}` 
    };
  }
  
  return { allowed: true };
}
```

---

### WEB-016: Snack Catch

**Gameplay:**
- 60-second reflex game
- Foods fall from top
- Catch with touch/drag or arrow keys

**Scoring:**
- Good food: +10 points
- Favorite food (loved): +20 points
- Bad food (disliked): -15 points
- Combo: +2 per streak (max +10)

**Rewards:**
| Tier | Score | Coins | Gem | Bond | Happiness |
|------|-------|-------|-----|------|-----------|
| Bronze | 0-99 | 3 | 0 | +0.3 | +7 |
| Silver | 100-199 | 7 | 0 | +0.3 | +7 |
| Gold | 200-299 | 15 | 0 | +0.3 | +7 |
| Rainbow | 300+ | 22 | 1 | +0.3 | +7 |

**Pet Bonuses:**
- Fizz: +25% coins → Bronze=4, Silver=9, Gold=19, Rainbow=28
- Luxe: +100% gems → Rainbow=2 gems

---

### WEB-017: Mini-game Hub

- Energy display: "⚡ 40/50"
- Energy cost: 10 per play
- First daily game: FREE (badge shown)
- "Not enough energy" if < 10
- Regen: 1 per 30 minutes
- Show time until next energy: "Next ⚡ in 12:34"

---

## SECTION 7: NAVIGATION

### WEB-033: Main Menu

**Menu Options:**
- 🐾 Switch Pet → Pet Selector
- 🛒 Shop → Shop modal
- 🎮 Mini-Games → Mini-game Hub
- ⚙️ Settings → Sound, Vibration, Reset
- 🏠 Home → Return to welcome

---

## SECTION 7.5: SHOP SYSTEM

### WEB-031: Shop Implementation

```typescript
const SHOP_CATEGORIES = {
  food: {
    label: 'Food',
    icon: '🍎',
    items: Object.values(FOODS)
  }
};

// Shop displays:
// - Food icon + name
// - Cost in coins
// - Owned quantity (if > 0)
// - Buy button
// - "Can't afford" state if insufficient coins
```

**Shop UI:**
```
┌─────────────────────────────────────┐
│  🛒 SHOP                     💰 150 │
├─────────────────────────────────────┤
│                                     │
│  🍎 Apple         5 coins    [Buy]  │
│  🍌 Banana        5 coins    [Buy]  │
│  🥕 Carrot        5 coins    [Buy]  │
│  🍪 Cookie       15 coins    [Buy]  │
│  🍬 Candy        10 coins    [Buy]  │
│  🍦 Ice Cream    20 coins    [Buy]  │
│  🍰 Cake         50 coins    [Buy]  │
│  🌮 Spicy Taco   15 coins    [Buy]  │
│  🌶️ Hot Pepper   20 coins    [Buy]  │
│  👑 Golden Feast 100 coins   [Buy]  │
│                                     │
└─────────────────────────────────────┘
```

**Buy Flow:**
1. Tap [Buy] → Coins deducted
2. Item added to inventory
3. "+1 🍪" floating text
4. Button briefly shows "✓"

---

## SECTION 7.6: POOP SYSTEM

### WEB-032B: Poop & Cleaning

```typescript
const POOP_CONFIG = {
  feedsBeforePoop: { min: 3, max: 4 },  // random per pet
  maxPoopStack: 3,
  rewards: {
    bond: 0.1,
    happiness: 2
  },
  neglectPenalty: {
    after30min: { happiness: -5 },       // uncomfortable
    after1hr: { happinessDecay: 2.0 },   // 2x decay
    after2hr: { sicknessRisk: 0.1 }      // Classic mode only
  }
};

function checkPoopAppearance(state: GameState): GameState {
  state.feedsSincePoop++;
  
  const threshold = randomInt(
    POOP_CONFIG.feedsBeforePoop.min,
    POOP_CONFIG.feedsBeforePoop.max
  );
  
  if (state.feedsSincePoop >= threshold) {
    state.poopPresent = true;
    state.poopCount = Math.min(state.poopCount + 1, POOP_CONFIG.maxPoopStack);
    state.feedsSincePoop = 0;
  }
  
  return state;
}

function cleanPoop(state: GameState): GameState {
  if (!state.poopPresent) return state;
  
  // Apply rewards
  state.pets[state.activePetId].bond += POOP_CONFIG.rewards.bond;
  state.pets[state.activePetId].happiness += POOP_CONFIG.rewards.happiness;
  
  // Clear poop
  state.poopCount--;
  if (state.poopCount <= 0) {
    state.poopPresent = false;
    state.poopCount = 0;
  }
  
  state.stats.poopsCleaned++;
  
  return state;
}
```

**Poop UI:**
- 💩 appears near pet (tap to clean)
- Multiple poops stack: 💩💩💩
- Sparkle effect on clean
- "+0.1 ❤️" floating text

---

## SECTION 8: VISUAL FX

### WEB-034: Visual FX

**Feeding Reactions:**
- Loved: Hearts burst 💕, golden sparkles
- Liked: Small heart, happy bounce
- Neutral: Simple nod
- Disliked: Sweat drops 💦, head shake

**Floating Text:**
- "+X XP" (green)
- "+X Coins" (gold)
- "+X 💎" (teal)

**Daily Moment Active:**
- Subtle glow around pet
- Moment icon in corner (🌅/☀️/🌙)
- Bonus indicator on rewards

---

## SECTION 9: ACTIVITY-BASED BACKGROUNDS (Decision #6)

### WEB-036: Dynamic Background System

**Background switches automatically based on activity:**

```typescript
const ACTIVITY_BACKGROUNDS = {
  feeding: {
    id: 'kitchen',
    gradient: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
    elements: ['counter', 'cabinets', 'window'],
    lighting: 'warm'
  },
  sleeping: {
    id: 'bedroom',
    gradient: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
    elements: ['bed', 'lamp', 'stars'],
    lighting: 'dim'
  },
  playing: {
    id: 'playroom',
    gradient: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)',
    elements: ['toys', 'ball', 'blocks'],
    lighting: 'bright'
  },
  default: {
    id: 'living_room',
    gradient: 'time-based', // Changes with real time
    elements: ['couch', 'plant', 'window'],
    lighting: 'natural'
  }
};

// Time-based lighting for default room
function getTimeBasedLighting() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) return 'morning';   // Warm, golden
  if (hour >= 10 && hour < 17) return 'day';      // Bright, neutral
  if (hour >= 17 && hour < 20) return 'evening';  // Orange, warm
  return 'night';                                  // Blue, dim
}
```

**Context Switching Rules:**
- Open Food Bag → Kitchen background
- Pet sleeping → Bedroom background (night time)
- Mini-game active → Playroom background
- Default → Living room with time-of-day lighting

**NOT navigable** — switches automatically based on what player is doing.

---

## SECTION 10: PREFERENCE DISCOVERY (Decision #10)

### WEB-037: Hidden Preference System

**Core Philosophy:** Players DISCOVER preferences through play, not menus.

```typescript
const PREFERENCE_DISCOVERY = {
  // Preferences are hidden initially
  initialState: 'hidden',
  
  // Learn through reactions
  discoveryMethod: 'feeding',
  
  // After many neutral feeds, pet hints
  hintThreshold: {
    daysPlayed: 7,
    neutralFeeds: 10
  },
  
  // Journal unlocks at Bond Level 3
  journalUnlock: {
    bondLevel: 3,
    tracks: ['discovered_loves', 'discovered_hates', 'suspected']
  }
};
```

### WEB-038: Pet Hints System

**After Day 7+ OR 10+ neutral feeds:**

```typescript
const PET_HINTS = {
  // Pet occasionally glances at preferred food
  glanceAtFood: {
    chance: 0.3, // 30% chance each session
    animation: 'glance-at-food-bag',
    targetFood: 'loved_food'
  },
  
  // Thought bubble hints
  thoughtBubbles: [
    "💭 I wonder what {food_type} tastes like...",
    "💭 Something sweet sounds nice...",
    "💭 *glances at spicy foods*"
  ],
  
  // More direct after Bond Level 2
  directHints: {
    bondLevel: 2,
    examples: [
      "💭 Ooh, is that a cookie?!",
      "💭 Please no spicy stuff today..."
    ]
  }
};
```

### WEB-039: Preference Journal

**Unlocks at Bond Level 3:**

```
┌─────────────────────────────────────────┐
│  📖 PREFERENCE JOURNAL                  │
│  Munchlet's Tastes                      │
├─────────────────────────────────────────┤
│                                         │
│  ❤️ LOVES                               │
│  ├── 🍪 Cookie (discovered!)            │
│  ├── 🍌 Banana (discovered!)            │
│  └── ❓ ??? (keep feeding to learn)     │
│                                         │
│  💚 LIKES                               │
│  ├── 🍎 Apple (discovered!)             │
│  └── ❓ ??? (2 more to find)            │
│                                         │
│  💔 DISLIKES                            │
│  ├── 🌶️ Hot Pepper (discovered!)       │
│  └── ❓ ???                             │
│                                         │
│  💡 SUSPECTED                           │
│  └── "Seems to like sweet things..."    │
│                                         │
└─────────────────────────────────────────┘
```

**Journal Features:**
- Shows discovered preferences (from feeding reactions)
- Shows "???" for undiscovered
- Shows "suspected" based on hints
- Progress: "5/10 preferences discovered"
- Completion reward: Special cosmetic or title

---

## SECTION 11: DEV PANEL

### WEB-018: Dev Panel

- Toggle: 🛠️ button (dev mode only)
- Pet stats sliders
- Economy buttons
- [Trigger Runaway] (Classic mode test)
- [Unlock All Achievements]
- [Reset Progress]
- [Switch Background] (test activity backgrounds)
- [Unlock Preference Journal]

---

## SECTION 12: FUZZY TESTING

### WEB-035: Fuzzy Tests

**RUNAWAY SYSTEM TESTS:**
- Trigger all neglect stages → Should show runaway, not death
- Pay gems to return → Bond should be -50%
- Wait timer → Pet should return after 48h

**HIDDEN STATS TESTS:**
- Verify no hunger/mood/energy bars visible
- Verify only Bond hearts visible
- Verify pet behavior changes with fullness

**CONSERVATIVE REWARDS TESTS:**
- Bronze mini-game → 3 coins (not 10+)
- Rainbow mini-game → 22 coins + 1 gem (not 100+)
- Per-game bonus → +0.3 bond, +7 happiness

**ACHIEVEMENT UNLOCK TESTS:**
- Reach Bond 5 → Fizz unlocks
- Play 10 games → Ember unlocks
- Verify NO gem purchase option for Fizz/Ember

**ACTIVITY BACKGROUND TESTS:**
- Open food bag → Kitchen background appears
- Start mini-game → Playroom background appears
- Night time → Living room has dim lighting
- Morning → Living room has golden lighting

**PREFERENCE DISCOVERY TESTS:**
- Day 1-6: No hints appear
- Day 7+: Pet occasionally glances at loved foods
- Bond Level 3: Preference Journal unlocks
- Feed loved food → Marked as "discovered" in journal
- Feed unknown food → Learn from reaction

---

## FINAL CHECKLIST

Before completing:

- [ ] Death system REMOVED, Runaway system works
- [ ] Only Bond hearts visible (no stat bars)
- [ ] Fullness is hidden, behavior shows state
- [ ] Daily Moments bonuses active
- [ ] Mini-game rewards are conservative (3/7/15/22)
- [ ] Per-game bonus: +0.3 bond, +7 happiness
- [ ] Fizz unlocks at Bond 5 (not gems)
- [ ] Ember unlocks at 10 games (not gems)
- [ ] All 8 pets have correct abilities
- [ ] Activity backgrounds switch automatically
- [ ] Preference hints appear after Day 7
- [ ] Preference Journal unlocks at Bond Level 3
- [ ] Rebuild grundy-game.html
- [ ] Push to GitHub

---

**Total Sections:** 12
**Priority Fixes:** 6 (FIX-001 through FIX-006)
**New Features:** 4 (Activity Backgrounds, Preference Discovery, Hints, Journal)
**Estimated Time:** 6-8 hours

**Output:** Aligned prototype matching Master Decisions
