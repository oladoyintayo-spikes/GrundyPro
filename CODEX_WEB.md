# GRUNDY WEB CODEX — React/TypeScript Prototype v1.0

**Purpose:** Build a playable web prototype to validate Grundy's core mechanics before Unity production.

---

## PROTOTYPE GOALS

```
✅ Validate core loop is fun
✅ Test economy balance
✅ Verify leveling curves feel right
✅ Playable in browser instantly
✅ Fast iteration with AI assistance
✅ Share with testers via URL

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
state: Zustand or React Context
persistence: localStorage
build: Vite
testing: Vitest + React Testing Library
```

---

## ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                     React App                           │
├─────────────────────────────────────────────────────────┤
│  Components (UI Layer)                                  │
│  ├── Pet.tsx           → Displays pet + animations      │
│  ├── FoodBag.tsx       → Food inventory grid            │
│  ├── ReactionDisplay   → Shows reaction feedback        │
│  ├── ProgressBars.tsx  → XP, hunger, bond meters        │
│  ├── CurrencyDisplay   → Coins, gems counter            │
│  └── Shop.tsx          → Buy foods                      │
├─────────────────────────────────────────────────────────┤
│  Hooks (State Access)                                   │
│  ├── useGameState()    → Main game state                │
│  ├── usePet()          → Pet-specific state             │
│  ├── useEconomy()      → Currency operations            │
│  └── usePersistence()  → Auto-save to localStorage      │
├─────────────────────────────────────────────────────────┤
│  Game Logic (Pure TypeScript)                           │
│  ├── GameState.ts      → Central state + actions        │
│  ├── PetSystem.ts      → Level, bond, mood, hunger      │
│  ├── EconomySystem.ts  → Currency management            │
│  ├── FeedingSystem.ts  → Reactions, rewards             │
│  └── ProgressionSystem → XP curves, evolution           │
├─────────────────────────────────────────────────────────┤
│  Data (From YAML Specs)                                 │
│  ├── pets.ts           → Pet definitions                │
│  ├── foods.ts          → Food items                     │
│  └── config.ts         → Game settings                  │
└─────────────────────────────────────────────────────────┘
```

---

## QUICK START

### For AI Agents

1. **Read specs first:**
   ```
   specs/game_config.yaml   → Core settings
   specs/pets.yaml          → Pet definitions
   specs/foods.yaml         → Food items
   specs/economy.yaml       → Currency balance
   ```

2. **Understand the types:**
   ```
   src/types/index.ts       → All TypeScript interfaces
   ```

3. **Implement in order:**
   ```
   1. Types + Data         → Foundation
   2. Game Logic           → Pure functions
   3. State Management     → Zustand store
   4. Components           → React UI
   5. Polish               → Animations, sounds
   ```

---

## FILE STRUCTURE

```
grundy-web-prototype/
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Main app shell
│   │
│   ├── types/
│   │   └── index.ts             # All game types
│   │
│   ├── data/
│   │   ├── pets.ts              # Pet definitions
│   │   ├── foods.ts             # Food items  
│   │   ├── config.ts            # Game config
│   │   └── reactions.ts         # Reaction mappings
│   │
│   ├── game/
│   │   ├── store.ts             # Zustand store
│   │   ├── PetSystem.ts         # Pet logic
│   │   ├── EconomySystem.ts     # Currency logic
│   │   ├── FeedingSystem.ts     # Feeding logic
│   │   └── ProgressionSystem.ts # XP/leveling
│   │
│   ├── components/
│   │   ├── Pet.tsx              # Pet display
│   │   ├── FoodBag.tsx          # Food inventory
│   │   ├── FoodItem.tsx         # Single food
│   │   ├── ReactionDisplay.tsx  # Reaction feedback
│   │   ├── ProgressBars.tsx     # Meters
│   │   ├── CurrencyDisplay.tsx  # Money
│   │   ├── LevelUpModal.tsx     # Level up celebration
│   │   └── Shop.tsx             # Purchase foods
│   │
│   ├── hooks/
│   │   ├── useGameStore.ts      # Store access
│   │   └── usePersistence.ts    # localStorage sync
│   │
│   └── utils/
│       ├── calculations.ts      # XP formulas, etc.
│       └── helpers.ts           # Utility functions
│
├── specs/                       # Same YAML specs as Unity
│   ├── game_config.yaml
│   ├── pets.yaml
│   ├── foods.yaml
│   └── economy.yaml
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## TYPE DEFINITIONS

All types must be defined in `src/types/index.ts`:

```typescript
// Currency
type CurrencyType = 'coins' | 'gems' | 'eventTokens';

// Pet
type MoodState = 'happy' | 'neutral' | 'sad' | 'ecstatic';
type EvolutionStage = 'baby' | 'youth' | 'adult';

interface PetState {
  id: string;
  name: string;
  level: number;
  xp: number;
  bond: number;
  mood: MoodState;
  hunger: number;
  evolutionStage: EvolutionStage;
}

// Food
type FoodCategory = 'basic' | 'tasty' | 'rare' | 'premium';
type ReactionType = 'neutral' | 'positive' | 'negative' | 'ecstatic';

interface FoodDefinition {
  id: string;
  name: string;
  category: FoodCategory;
  xp: number;
  bond: number;
  coinCost: number;
  favoriteFor: string[];
  hatedBy: string[];
  emoji: string;
}

// Game State
interface GameState {
  pet: PetState;
  currencies: Record<CurrencyType, number>;
  inventory: Record<string, number>;
  stats: GameStats;
}
```

---

## CORE FORMULAS

Implement these exactly as specified:

### XP to Next Level
```typescript
// Formula: XP(L) = 20 + (L² × 1.4)
function xpForLevel(level: number): number {
  return Math.round(20 + (level * level * 1.4));
}
```

### Hunger Decay
```typescript
// 1% per 10 minutes = 0.1% per minute
const HUNGER_DECAY_PER_MINUTE = 0.1;

function decayHunger(current: number, minutesElapsed: number): number {
  return Math.max(0, current - (minutesElapsed * HUNGER_DECAY_PER_MINUTE));
}
```

### Reaction Calculation
```typescript
function calculateReaction(petId: string, food: FoodDefinition): ReactionType {
  if (food.favoriteFor.includes(petId)) return 'ecstatic';
  if (food.hatedBy.includes(petId)) return 'negative';
  if (food.category === 'premium') return 'positive';
  if (food.category === 'rare') return 'positive';
  return 'neutral';
}
```

### XP Modifiers
```typescript
function getXPModifier(mood: MoodState, hunger: number, reaction: ReactionType): number {
  let modifier = 1.0;
  
  // Mood modifier
  if (mood === 'happy') modifier *= 1.1;
  if (mood === 'sad') modifier *= 0.8;
  if (mood === 'ecstatic') modifier *= 1.2;
  
  // Hunger modifier
  if (hunger < 20) modifier *= 0.5;
  
  // Reaction modifier
  if (reaction === 'ecstatic') modifier *= 1.5;
  if (reaction === 'positive') modifier *= 1.2;
  if (reaction === 'negative') modifier *= 0.5;
  
  return modifier;
}
```

---

## STATE MANAGEMENT

Use Zustand for simple, performant state:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStore {
  // State
  pet: PetState;
  currencies: Record<CurrencyType, number>;
  inventory: Record<string, number>;
  
  // Actions
  feed: (foodId: string) => FeedResult;
  addCurrency: (type: CurrencyType, amount: number) => void;
  spendCurrency: (type: CurrencyType, amount: number) => boolean;
  buyFood: (foodId: string, quantity: number) => boolean;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      pet: createInitialPet('sprout'),
      currencies: { coins: 100, gems: 0, eventTokens: 0 },
      inventory: { apple: 5, biscuit: 5 },
      
      // Actions
      feed: (foodId) => {
        // Implementation
      },
      // ... more actions
    }),
    { name: 'grundy-save' }
  )
);
```

---

## COMPONENT PATTERNS

### Stateless Display Components
```tsx
interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
  label: string;
}

function ProgressBar({ value, max, color, label }: ProgressBarProps) {
  const percent = (value / max) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

### Interactive Components
```tsx
function FoodItem({ food, count, onFeed }: FoodItemProps) {
  const canFeed = count > 0;
  
  return (
    <button
      onClick={() => canFeed && onFeed(food.id)}
      disabled={!canFeed}
      className={`
        p-3 rounded-xl border-2 transition-all
        ${canFeed 
          ? 'border-amber-500 bg-amber-500/20 hover:bg-amber-500/30 cursor-pointer' 
          : 'border-gray-600 bg-gray-800 opacity-50 cursor-not-allowed'}
      `}
    >
      <span className="text-2xl">{food.emoji}</span>
      <span className="text-xs block mt-1">{count}</span>
    </button>
  );
}
```

---

## ANIMATIONS

Use CSS transitions + Tailwind for smooth feedback:

```tsx
// Reaction animation
const reactionVariants = {
  ecstatic: 'animate-bounce text-yellow-400',
  positive: 'animate-pulse text-green-400',
  neutral: 'text-blue-400',
  negative: 'animate-shake text-red-400',
};

// Add to tailwind.config.js
animation: {
  'shake': 'shake 0.5s ease-in-out',
  'float': 'float 3s ease-in-out infinite',
}
```

---

## TESTING PRIORITIES

### Must Test (Core Loop)
- [ ] Feeding consumes food
- [ ] Correct reaction for favorites/hated
- [ ] XP gain with modifiers
- [ ] Level up triggers correctly
- [ ] Currency add/spend
- [ ] Save/load works

### Should Test (Balance)
- [ ] XP curve feels right
- [ ] Hunger decay rate
- [ ] Coin economy sustainable
- [ ] Mood affects gameplay noticeably

### Nice to Test (Polish)
- [ ] Animations feel good
- [ ] Feedback is clear
- [ ] No UI glitches

---

## PROTOTYPE SCOPE

### Include ✅
- Pet display with mood expressions
- Food bag with drag or click to feed
- Reaction animations
- XP/level progress bar
- Hunger meter
- Bond meter
- Coin counter
- Basic shop (buy foods)
- Level up celebration
- Auto-save

### Exclude ❌ (Save for Unity)
- Real mini-games (stub only)
- Season pass
- IAP integration
- Push notifications
- Cloud save
- Analytics
- Cosmetics system
- Multiple pets

---

## DEVELOPMENT WORKFLOW

```
1. Run dev server:
   npm run dev

2. Make changes → Hot reload

3. Test in browser → Validate feel

4. Adjust balance → Re-test

5. When satisfied → Document learnings for Unity
```

---

## LEARNINGS TO CAPTURE

After prototyping, document:

```markdown
## Prototype Learnings

### What Worked
- [X] Feeding loop feels satisfying
- [X] XP curve pacing is good at early levels

### What Needs Adjustment
- [ ] Hunger decays too fast — change to 0.05/min
- [ ] Coin rewards too low — increase by 20%

### Carry to Unity
- Exact XP values that felt right
- Reaction timing (0.8s felt best)
- UI layout that worked
```

---

## MAPPING TO UNITY

| Web Prototype | Unity Equivalent |
|---------------|------------------|
| `useGameStore` | `GameManager` + `SaveManager` |
| `PetSystem.ts` | `PetManager.cs` |
| `EconomySystem.ts` | `EconomyManager.cs` |
| `FeedingSystem.ts` | `FeedingManager.cs` |
| `foods.ts` | `FoodDefinition.cs` + SOs |
| React components | Unity UI + prefabs |
| localStorage | Encrypted file save |
| CSS animations | Unity Animator |

---

## COMMANDS

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for sharing
npm run build

# Preview build
npm run preview
```

---

**VERSION:** 1.0  
**PURPOSE:** Validate mechanics before Unity investment  
**STATUS:** Ready for development

---

*Build fast, learn fast, then build right in Unity.*
