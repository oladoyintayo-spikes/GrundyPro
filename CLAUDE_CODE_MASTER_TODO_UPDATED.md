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
  bronze: { coins: 3, gems: 0, food: null },
  silver: { coins: 7, gems: 0, food: { chance: 0.4, rarity: 'common' } },
  gold: { coins: 15, gems: 0, food: { chance: 0.75, rarity: 'any' } },
  rainbow: { coins: 22, gems: 1, food: { chance: 1.0, rarity: 'rare' } }
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

### WEB-027: 8 Pet Definitions

Update src/data/pets.ts with all 8 pets:

**Starters (Free):**
- Munchlet 🟡 (#fbbf24) - Cheerful, +10% bond
- Grib 🟢 (#4ade80) - Mischievous, -20% negative reactions
- Plompo 🟣 (#a78bfa) - Sleepy, slower mood decay

**Earnable (Achievements):**
- Fizz 🔵 (#3b82f6) - Hyper, +25% mini-game rewards, Unlock: Bond Lv5
- Ember 🟠 (#f97316) - Fierce, 2× coins from spicy, Unlock: 10 mini-games

**Premium:**
- Chomper 🔴 (#ef4444) - Hungry, no dislikes, Unlock: Plus/$1.99/Lv25
- Whisp ⚪ (#e2e8f0) - Mysterious, +50% XP rare, Unlock: Plus/$2.49/Lv30
- Luxe ✨ (gold gradient) - Royal, +100% gems, Unlock: Plus/$2.99/Lv40

---

### WEB-028: 10 Food Definitions

Ensure all 10 foods with correct affinities per pet.

---

## SECTION 2: STATE MANAGEMENT

### WEB-025: Separate Pet State Storage

```typescript
interface GameState {
  // Per-Pet State (separate)
  pets: {
    [petId: string]: {
      level: number;
      xp: number;
      bond: number;
      bondLevel: number;  // 0-5 scale
      mood: number;
      fullness: number;   // renamed from hunger
      evolutionStage: 'baby' | 'youth' | 'evolved';
      evolutionVariant: 'good' | 'neutral' | 'bad';  // Classic mode
    }
  };
  
  // Global State (shared)
  activePetId: string;
  unlockedPets: string[];
  coins: number;
  gems: number;
  inventory: Record<string, number>;
  
  // Stats for achievements
  stats: {
    minigamesPlayed: number;
    totalFeedings: number;
    daysPlayed: number;
  };
  
  // Flags
  onboardingComplete: boolean;
  tutorialComplete: boolean;
  gameMode: 'casual' | 'classic';
  
  // Cooldowns
  lastFeedTime: number;
  lastDailyReset: string;
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

**Rewards (CONSERVATIVE):**
| Tier | Score | Coins | Gem | Food |
|------|-------|-------|-----|------|
| Bronze | 0-99 | 3 | — | — |
| Silver | 100-199 | 7 | — | 40% common |
| Gold | 200-299 | 15 | — | 75% any |
| Rainbow | 300+ | 22 | 1 | 100% rare |

**Fizz bonus:** +25% coins (not total rewards)

---

### WEB-017: Mini-game Hub

- Energy display: "⚡ 40/50"
- Energy cost: 10 per play
- First daily game: FREE
- "Not enough energy" if < 10
- Regen: 1 per 30 minutes

---

## SECTION 7: NAVIGATION

### WEB-033: Main Menu

**Menu Options:**
- 🐾 Switch Pet → Pet Selector
- 🛒 Shop → Shop modal
- 🎮 Mini-Games → Mini-game Hub
- ⚙️ Settings → Sound, Reset
- 🏠 Home → Return to welcome

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
