# GRUNDY WEB CODEX — React/TypeScript Prototype v2.1

**Purpose:** Build a playable web prototype to validate Grundy's core mechanics before Unity production.

---

## ⚠️ CRITICAL DESIGN DECISIONS

**From GRUNDY_MASTER_DECISIONS.md — These override all other specs:**

| # | Decision | Implementation |
|---|----------|----------------|
| 2 | Hidden Stats | Only Bond visible. Pet behavior shows needs. |
| 3 | Daily Moments | Morning/Afternoon/Evening time bonuses |
| 6 | Pet Unlocks | 3 free, 2 earnable (achievements), 3 premium |
| 12 | Fullness | Hidden stat. Cooldown timer visible. |
| 13 | Rewards | Conservative: Bronze 3c, Rainbow 22c+1gem |
| 14 | Classic Mode | Runaway (48h lockout), NOT death |

---

## PROTOTYPE GOALS

```
✅ Validate core loop is fun
✅ Test economy balance (conservative rewards)
✅ Verify leveling curves feel right
✅ Test hidden stats + behavior system
✅ Validate Runaway system (not death)
✅ Playable in browser instantly
✅ Fast iteration with AI assistance

❌ NOT production mobile app
❌ NOT final art/animation
❌ NOT store submission
```

---

## TECH STACK

```yaml
framework: React 18+
language: TypeScript (strict mode)
styling: Tailwind CSS
state: Zustand with persist
persistence: localStorage
build: Vite or standalone HTML
testing: Manual + Fuzzy tests
```

---

## ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                     React App                           │
├─────────────────────────────────────────────────────────┤
│  Components (UI Layer)                                  │
│  ├── Pet.tsx           → Pet display + behavior anims   │
│  ├── BondHearts.tsx    → ONLY visible stat (♥♥♥♡♡)     │
│  ├── FoodBag.tsx       → Food inventory grid            │
│  ├── BehaviorIndicator → Shows pet needs via behavior   │
│  ├── DailyMoment.tsx   → Time bonus indicator           │
│  ├── CooldownTimer.tsx → 30-min feed cooldown           │
│  ├── Shop.tsx          → Buy foods                      │
│  └── RunawayScreen.tsx → 48h lockout (Classic)          │
├─────────────────────────────────────────────────────────┤
│  Hooks (State Access)                                   │
│  ├── useGameStore()    → Main game state                │
│  ├── usePet()          → Pet-specific state             │
│  ├── useDailyMoment()  → Current time bonus             │
│  └── useAchievements() → Pet unlock tracking            │
├─────────────────────────────────────────────────────────┤
│  Game Logic (Pure TypeScript)                           │
│  ├── GameState.ts      → Central state + actions        │
│  ├── PetSystem.ts      → Level, bond, fullness          │
│  ├── FullnessSystem.ts → Hidden stat + behaviors        │
│  ├── FeedingSystem.ts  → Reactions, cooldowns           │
│  ├── RunawaySystem.ts  → Classic mode consequences      │
│  ├── DailyMoments.ts   → Time-based bonuses             │
│  └── Achievements.ts   → Pet unlock conditions          │
├─────────────────────────────────────────────────────────┤
│  Data (From YAML Specs)                                 │
│  ├── pets.ts           → 8 pet definitions              │
│  ├── foods.ts          → 10 food items                  │
│  ├── config.ts         → Game settings                  │
│  └── rewards.ts        → Conservative reward tables     │
└─────────────────────────────────────────────────────────┘
```

---

## FILE STRUCTURE

```
grundy-web-prototype/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── types/
│   │   └── index.ts             # All game types
│   │
│   ├── data/
│   │   ├── pets.ts              # 8 pets with abilities
│   │   ├── foods.ts             # 10 foods
│   │   ├── config.ts            # Game config
│   │   ├── rewards.ts           # Conservative rewards
│   │   └── achievements.ts      # Unlock conditions
│   │
│   ├── game/
│   │   ├── store.ts             # Zustand store
│   │   ├── PetSystem.ts         # Pet logic
│   │   ├── FullnessSystem.ts    # Hidden fullness + behaviors
│   │   ├── FeedingSystem.ts     # Feeding + cooldowns
│   │   ├── RunawaySystem.ts     # Classic consequences
│   │   ├── DailyMoments.ts      # Time bonuses
│   │   └── Achievements.ts      # Pet unlocks
│   │
│   ├── components/
│   │   ├── Pet.tsx              # Pet display
│   │   ├── BondHearts.tsx       # Only visible stat
│   │   ├── BehaviorIndicator.tsx # Pet needs via behavior
│   │   ├── FoodBag.tsx          # Food inventory
│   │   ├── CooldownTimer.tsx    # 30-min timer
│   │   ├── DailyMoment.tsx      # Time bonus indicator
│   │   ├── Shop.tsx             # Purchase foods
│   │   ├── PetSelector.tsx      # With achievements
│   │   └── RunawayScreen.tsx    # 48h lockout
│   │
│   └── utils/
│       ├── calculations.ts      # Formulas
│       └── helpers.ts           # Utilities
│
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---

## TYPE DEFINITIONS

```typescript
// src/types/index.ts

// Game Mode
type GameMode = 'casual' | 'classic';

// Pet unlock methods
type UnlockMethod = 'free' | 'achievement' | 'premium';

// Fullness states (HIDDEN from player)
type FullnessState = 'hungry' | 'peckish' | 'content' | 'satisfied' | 'stuffed';

// Evolution variants (Classic mode)
type EvolutionVariant = 'good' | 'neutral' | 'bad';

interface PetState {
  id: string;
  name: string;
  level: number;
  xp: number;
  bond: number;
  bondLevel: number;        // 0-5, shown as hearts
  fullness: number;         // HIDDEN
  mood: number;             // HIDDEN
  evolutionStage: 'baby' | 'youth' | 'evolved';
  evolutionVariant?: EvolutionVariant;  // Classic only
}

interface PetDefinition {
  id: string;
  name: string;
  emoji: string;
  color: string;
  personality: string;
  likes: string[];
  dislikes: string[];
  ability: PetAbility;
  unlockMethod: UnlockMethod;
  unlockRequirement?: AchievementRequirement | PremiumRequirement;
  originSnippet: string;    // For pet selection
}

interface AchievementRequirement {
  type: 'bond_level' | 'minigames' | 'player_level';
  value: number;
  description: string;
}

interface DailyMoment {
  name: 'morning' | 'afternoon' | 'evening';
  hours: [number, number];
  bonus: { bond?: number; xp?: number };
  icon: string;
  message: string;
}

interface RunawayState {
  stage: 0 | 1 | 2 | 3 | 4;  // 0=fine, 4=ran away
  lockoutUntil?: number;
  canPayToReturn: boolean;
}

// Conservative rewards
interface MinigameReward {
  coins: number;
  gems: number;
  food: { chance: number; rarity: string } | null;
}

const REWARDS: Record<string, MinigameReward> = {
  bronze: { coins: 3, gems: 0, food: null },
  silver: { coins: 7, gems: 0, food: { chance: 0.4, rarity: 'common' } },
  gold: { coins: 15, gems: 0, food: { chance: 0.75, rarity: 'any' } },
  rainbow: { coins: 22, gems: 1, food: { chance: 1.0, rarity: 'rare' } }
};
```

---

## CORE FORMULAS

### XP to Next Level
```typescript
function xpForLevel(level: number): number {
  return Math.round(20 + (level * level * 1.4));
}
```

### Fullness System (HIDDEN)
```typescript
const FULLNESS_STATES = {
  hungry:    { range: [0, 20],   feedValue: 1.0,  behavior: 'begs' },
  peckish:   { range: [21, 40],  feedValue: 0.75, behavior: 'glances' },
  content:   { range: [41, 70],  feedValue: 0.5,  behavior: 'ignores' },
  satisfied: { range: [71, 90],  feedValue: 0.25, behavior: 'shakes_head' },
  stuffed:   { range: [91, 100], feedValue: 0,    behavior: 'turns_away' }
};

function getFullnessState(fullness: number): FullnessState {
  for (const [state, config] of Object.entries(FULLNESS_STATES)) {
    if (fullness >= config.range[0] && fullness <= config.range[1]) {
      return state as FullnessState;
    }
  }
  return 'content';
}

function getFeedValue(fullness: number): number {
  const state = getFullnessState(fullness);
  return FULLNESS_STATES[state].feedValue;
}
```

### Daily Moments
```typescript
const DAILY_MOMENTS = {
  morning:   { hours: [7, 10],  bonus: { bond: 1.5 } },
  afternoon: { hours: [12, 14], bonus: { xp: 1.25 } },
  evening:   { hours: [18, 21], bonus: { bond: 1.5 } }
};

function getCurrentMomentBonus(): { bond: number; xp: number } {
  const hour = new Date().getHours();
  for (const moment of Object.values(DAILY_MOMENTS)) {
    if (hour >= moment.hours[0] && hour < moment.hours[1]) {
      return { 
        bond: moment.bonus.bond || 1, 
        xp: moment.bonus.xp || 1 
      };
    }
  }
  return { bond: 1, xp: 1 };
}
```

### Feeding with All Modifiers
```typescript
function calculateFeedResult(
  pet: PetState, 
  food: FoodDefinition,
  gameMode: GameMode
): FeedResult {
  const affinity = getAffinity(pet.id, food.id);
  const affinityMult = { loved: 2.0, liked: 1.5, neutral: 1.0, disliked: 0.5 }[affinity];
  const moodMult = getMoodMultiplier(pet.mood);
  const fullnessValue = getFeedValue(pet.fullness);
  const momentBonus = getCurrentMomentBonus();
  const petAbility = getPetAbility(pet.id);
  
  // Base XP
  let xp = food.xp * affinityMult * moodMult * fullnessValue;
  
  // Daily moment XP bonus
  xp *= momentBonus.xp;
  
  // Pet ability: Whisp +50% from rare
  if (petAbility.type === 'xp_rare' && food.rarity >= 'rare') {
    xp *= 1.5;
  }
  
  // Base bond
  let bond = food.bond * fullnessValue;
  
  // Daily moment bond bonus
  bond *= momentBonus.bond;
  
  // Pet ability: Munchlet +10% bond
  if (petAbility.type === 'bond_boost') {
    bond *= 1.1;
  }
  
  return {
    xp: Math.round(xp),
    bond: bond,
    reaction: affinity,
    fullnessGain: food.hunger * fullnessValue
  };
}
```

### Runaway System (Classic Mode)
```typescript
const RUNAWAY_CONFIG = {
  stageThresholds: [
    { stage: 1, condition: 'mood < 30 for 1hr' },
    { stage: 2, condition: 'mood < 20 for 2hr' },
    { stage: 3, condition: 'mood < 10 for 4hr' },
    { stage: 4, condition: 'mood = 0 for 8hr' }
  ],
  lockoutDuration: 48 * 60 * 60 * 1000,
  gemCostToReturn: 25,
  bondPenalty: 0.5
};

function handleRunaway(state: RunawayState, gems: number): {
  canWait: boolean;
  canPay: boolean;
  timeRemaining: number;
} {
  if (state.stage < 4) return { canWait: false, canPay: false, timeRemaining: 0 };
  
  const now = Date.now();
  const timeRemaining = state.lockoutUntil - now;
  
  return {
    canWait: timeRemaining > 0,
    canPay: gems >= RUNAWAY_CONFIG.gemCostToReturn,
    timeRemaining: Math.max(0, timeRemaining)
  };
}
```

---

## STATE MANAGEMENT

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStore {
  // Per-pet state
  pets: Record<string, PetState>;
  activePetId: string;
  unlockedPets: string[];
  
  // Shared state
  coins: number;
  gems: number;
  inventory: Record<string, number>;
  
  // Game settings
  gameMode: GameMode;
  onboardingComplete: boolean;
  tutorialComplete: boolean;
  
  // Tracking for achievements
  stats: {
    minigamesPlayed: number;
    totalFeedings: number;
  };
  
  // Cooldowns
  lastFeedTime: number;
  
  // Runaway (Classic)
  runawayState: RunawayState;
  
  // Actions
  feed: (foodId: string) => FeedResult;
  switchPet: (petId: string) => void;
  checkAchievements: () => string[];  // Returns newly unlocked pet IDs
  handleRunawayReturn: (payGems: boolean) => boolean;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Implementation
    }),
    { name: 'grundy-save-v2' }
  )
);
```

---

## COMPONENT PATTERNS

### Bond Hearts (ONLY Visible Stat)
```tsx
function BondHearts({ bondLevel }: { bondLevel: number }) {
  // bondLevel is 0-5
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span 
          key={i}
          className={i <= bondLevel ? 'text-red-500' : 'text-gray-400'}
        >
          {i <= bondLevel ? '♥' : '♡'}
        </span>
      ))}
    </div>
  );
}
```

### Behavior Indicator (Replaces Stat Bars)
```tsx
function BehaviorIndicator({ pet }: { pet: PetState }) {
  const fullnessState = getFullnessState(pet.fullness);
  const behavior = FULLNESS_STATES[fullnessState].behavior;
  
  // Show thought bubble based on behavior
  if (behavior === 'begs') {
    return <div className="thought-bubble">🍎❓</div>;
  }
  if (behavior === 'satisfied') {
    return <div className="thought-bubble">😌</div>;
  }
  // etc.
  return null;
}
```

### Daily Moment Indicator
```tsx
function DailyMomentIndicator() {
  const moment = useDailyMoment();
  
  if (!moment.active) return null;
  
  return (
    <div className="absolute top-2 right-2 bg-amber-500/20 px-2 py-1 rounded-full">
      <span>{moment.icon}</span>
      <span className="text-xs ml-1">{moment.bonus}</span>
    </div>
  );
}
```

### Runaway Screen (Classic Mode)
```tsx
function RunawayScreen({ state, onReturn }: RunawayScreenProps) {
  const timeRemaining = formatTime(state.timeRemaining);
  const canPay = gems >= 25;
  
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">😢</div>
      <h2 className="text-2xl mb-2">Your pet ran away...</h2>
      <p className="text-gray-400 mb-6">They'll return in {timeRemaining}</p>
      
      <button
        onClick={() => onReturn(true)}
        disabled={!canPay}
        className={canPay ? 'bg-purple-500' : 'bg-gray-600'}
      >
        Apologize for 25 💎
      </button>
      
      <p className="text-xs text-gray-500 mt-4">
        Bond will be reduced by 50%
      </p>
    </div>
  );
}
```

---

## ACHIEVEMENT SYSTEM

```typescript
const PET_ACHIEVEMENTS = {
  fizz: {
    id: 'bond_level_5',
    check: (state: GameState) => 
      Object.values(state.pets).some(p => p.bondLevel >= 5),
    description: 'Reach Bond Level 5 with any pet'
  },
  ember: {
    id: 'minigames_10',
    check: (state: GameState) => state.stats.minigamesPlayed >= 10,
    description: 'Play 10 mini-games'
  },
  chomper: {
    id: 'player_level_25',
    check: (state: GameState) => 
      Object.values(state.pets).some(p => p.level >= 25),
    description: 'Reach Level 25'
  },
  whisp: {
    id: 'player_level_30',
    check: (state: GameState) => 
      Object.values(state.pets).some(p => p.level >= 30),
    description: 'Reach Level 30'
  },
  luxe: {
    id: 'player_level_40',
    check: (state: GameState) => 
      Object.values(state.pets).some(p => p.level >= 40),
    description: 'Reach Level 40'
  }
};

function checkPetUnlocks(state: GameState): string[] {
  const newlyUnlocked: string[] = [];
  
  for (const [petId, achievement] of Object.entries(PET_ACHIEVEMENTS)) {
    if (!state.unlockedPets.includes(petId) && achievement.check(state)) {
      newlyUnlocked.push(petId);
    }
  }
  
  return newlyUnlocked;
}
```

---

## TESTING PRIORITIES

### Must Test (Core Loop)
- [ ] Feeding works with fullness modifiers
- [ ] Bond hearts update correctly
- [ ] Pet behavior shows hidden stat states
- [ ] Daily Moments apply correct bonuses
- [ ] Conservative rewards (3/7/15/22 coins)
- [ ] Runaway triggers instead of death (Classic)

### Should Test (Systems)
- [ ] Fizz unlocks at Bond 5
- [ ] Ember unlocks at 10 games
- [ ] 30-min cooldown works
- [ ] Stuffed state blocks feeding

### Nice to Test (Polish)
- [ ] Behavior animations match state
- [ ] Moment indicator appears/disappears
- [ ] Achievement notifications

---

## PROTOTYPE SCOPE

### Include ✅
- 8 pets with abilities
- Hidden stats with behavior indicators
- Bond hearts (only visible stat)
- Daily Moments system
- Conservative rewards
- Runaway system (Classic)
- Achievement-based unlocks
- 30-min cooldown timer

### Exclude ❌ (Save for Unity)
- Real IAP integration
- Push notifications
- Cloud save
- Complex animations
- Multiple mini-games (just Snack Catch)

---

## MAPPING TO UNITY

| Web Prototype | Unity Equivalent |
|---------------|------------------|
| Hidden fullness | Same hidden stat approach |
| Behavior indicators | Animation state machine |
| Bond hearts | UI hearts display |
| Daily Moments | Server time validation |
| Runaway system | Same 48h lockout |
| Achievements | Unity achievements |

---

**VERSION:** 2.1  
**PURPOSE:** Validate mechanics aligned with Master Decisions  
**STATUS:** Ready for development

---

*Build with hidden stats, conservative rewards, and runaway (not death).*
