# GRUNDY — MASTER BUILD + TEST INSTRUCTIONS v2.1

**For:** Claude Code  
**Date:** December 2024  
**Aligned With:** GRUNDY_MASTER_DECISIONS.md  
**Total Tickets:** 40+ (Including Alignment Fixes)

---

## ⚠️ CRITICAL DESIGN DECISIONS

**These override all conflicting specs:**

| Decision | Implementation |
|----------|----------------|
| **Hidden Stats** | Only Bond visible. Pet behavior shows needs. |
| **Fullness** | Hidden stat. 30-min cooldown visible. |
| **Daily Moments** | Morning/Afternoon/Evening bonuses |
| **NO DEATH** | Runaway (48h lockout) in Classic, NOT death |
| **Conservative Rewards** | Bronze: 3c, Silver: 7c, Gold: 15c, Rainbow: 22c+1gem |
| **Pet Unlocks** | Fizz/Ember via achievements, NOT gem purchase |

---

## INSTRUCTIONS

1. Read ALL design documents in this order:
   - `GRUNDY_MASTER_DECISIONS.md` ← **READ FIRST**
   - `GRUNDY_HYBRID_MODE_DESIGN.md`
   - `GRUNDY_SOUND_VIBRATION_DESIGN.md`
   - `GRUNDY_PET_ANIMATION_DESIGN.md`
   - `GRUNDY_COMPREHENSIVE_TEST_PLAN.md`

2. Execute ALIGNMENT FIXES first (Phase 0)

3. Execute tickets in order by phase

4. After EACH phase:
   - Run relevant test cases
   - Log results to `TEST_RESULTS.md`
   - Fix any failures before proceeding

5. At the end:
   - Rebuild `grundy-game.html`
   - Run full test suite
   - Push everything to GitHub

---

## BUILD LOG

Create `BUILD_LOG.md` with this template:

```markdown
# Build Log

## Phase 0: Alignment Fixes (DO FIRST)
- [ ] FIX-001: Replace Death → Runaway system
- [ ] FIX-002: Hide stats (only Bond visible)
- [ ] FIX-003: Hunger → Fullness (hidden)
- [ ] FIX-004: Add Daily Moments system
- [ ] FIX-005: Conservative mini-game rewards
- [ ] FIX-006: Achievement-based pet unlocks
Start Time: 
End Time:
Status:
Notes:

## Phase 1: Core Hybrid
- [ ] WEB-036: Dual mode system (Cozy/Classic)
- [ ] WEB-037: Behavior indicators (replaces stat bars)
- [ ] WEB-038: Snacks + weight
- [ ] WEB-051: Feeding limits + cooldown
Start Time: 
End Time:
Status:
Notes:

## Phase 2: Maintenance Loop
- [ ] WEB-039: Poop/cleaning
- [ ] WEB-048: New shop items
- [ ] WEB-044: Daily/weekly events
- [ ] WEB-045: Login streaks
Start Time:
End Time:
Status:
Notes:

## Phase 3: Classic Stakes
- [ ] WEB-040: Sickness system
- [ ] WEB-041: Runaway system (NOT death)
- [ ] WEB-042: Care mistakes
- [ ] WEB-043: Evolution branches (Corruption)
- [ ] WEB-049: Notifications
Start Time:
End Time:
Status:
Notes:

## Phase 4: Audio
- [ ] WEB-052: AudioManager
- [ ] WEB-053: VibrationManager
- [ ] WEB-054: Audio settings
- [ ] WEB-055: Feeding sounds
- [ ] WEB-056: Reward sounds
- [ ] WEB-057: UI sounds
- [ ] WEB-058: Pet sounds
- [ ] WEB-059: Mini-game sounds
- [ ] WEB-060: Background music
- [ ] WEB-061: Vibration patterns
- [ ] WEB-062: iOS audio unlock
Start Time:
End Time:
Status:
Notes:

## Phase 5: Animations
- [ ] WEB-063: SVG pet shapes
- [ ] WEB-064: Fullness behavior animations
- [ ] WEB-065: Mood behavior animations
- [ ] WEB-066: Feeding reactions
- [ ] WEB-067: Personality animations
- [ ] WEB-068: Daily Moment indicators
- [ ] WEB-069: Weight visuals
- [ ] WEB-070: Runaway warning animations
- [ ] WEB-071: Micro-animations
- [ ] WEB-072: Timing system
Start Time:
End Time:
Status:
Notes:
```

---

# PHASE 0: ALIGNMENT FIXES (DO FIRST)

## FIX-001: Replace Death with Runaway System

**REMOVE any code like:**
```typescript
// DELETE THIS
const DEATH_CONFIG = {
  enabled: (mode) => mode === 'classic',
  threshold: 4, // hours sick + starving
  // ...
};
```

**ADD this instead:**
```typescript
const RUNAWAY_CONFIG = {
  enabled: (mode: string) => mode === 'classic',
  
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

**Acceptance:**
- [ ] No "death" anywhere in code
- [ ] Runaway screen shows timer
- [ ] Can pay 25 gems to apologize
- [ ] Pet returns with -50% bond
- [ ] Classic mode uses runaway, not death

**Test Cases:** TC-58 (updated to test runaway)

---

## FIX-002: Hidden Stats System

**REMOVE visible stat bars for:** hunger, mood, energy

**KEEP visible:** Bond hearts (♥♥♥♡♡) only

**ADD behavioral indicators:**
```typescript
const PET_BEHAVIORS = {
  // Fullness behaviors (replaces hunger bar)
  hungry: { 
    animation: 'hungry-beg', 
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
  
  // Mood behaviors (replaces mood bar)
  happy: { animation: 'bounce', eyes: 'bright' },
  sad: { animation: 'droop', eyes: 'droopy' },
  tired: { animation: 'yawn', bubble: '💤' }
};
```

**Acceptance:**
- [ ] No hunger bar visible
- [ ] No mood bar visible
- [ ] No energy bar visible
- [ ] Bond hearts (♥♥♥♡♡) visible
- [ ] Pet behavior shows fullness state
- [ ] Pet behavior shows mood state

**Test Cases:** TC-10 (updated), TC-NEW-01

---

## FIX-003: Fullness System (Replaces Hunger Display)

**Rename:** `hunger` → `fullness` (internal only)

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
const COOLDOWN_FEED_MULTIPLIER = 0.25;   // 25% value during cooldown
```

**Acceptance:**
- [ ] Fullness is hidden stat
- [ ] Feed value decreases when pet is full
- [ ] Stuffed state blocks feeding
- [ ] 30-min cooldown timer visible after feeding
- [ ] Pet behavior changes with fullness

**Test Cases:** TC-70-77 (updated)

---

## FIX-004: Daily Moments System

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

function getCurrentMoment(): DailyMoment | null {
  const hour = new Date().getHours();
  for (const [name, moment] of Object.entries(DAILY_MOMENTS)) {
    if (hour >= moment.hours[0] && hour < moment.hours[1]) {
      return { active: true, name, ...moment };
    }
  }
  return null;
}
```

**Acceptance:**
- [ ] Moment indicator visible during bonus windows
- [ ] Morning (7-10 AM): +50% bond
- [ ] Afternoon (12-2 PM): +25% XP
- [ ] Evening (6-9 PM): +50% bond
- [ ] Bonuses apply to feeding

**Test Cases:** TC-NEW-02

---

## FIX-005: Conservative Mini-Game Rewards ⚠️

**REPLACE all reward values:**
```typescript
const MINIGAME_REWARDS = {
  bronze:  { coins: 3,  gems: 0, food: null },
  silver:  { coins: 7,  gems: 0, food: { chance: 0.4, rarity: 'common' } },
  gold:    { coins: 15, gems: 0, food: { chance: 0.75, rarity: 'any' } },
  rainbow: { coins: 22, gems: 1, food: { chance: 1.0, rarity: 'rare' } }
};

// Universal per-game bonus
const PER_GAME_BONUS = {
  bond: 0.3,
  happiness: 5
};

// Energy system
const ENERGY_CONFIG = {
  max: 50,
  costPerGame: 10,
  regenRate: 1,  // per 30 min
  firstDailyFree: true
};
```

**Acceptance:**
- [ ] Bronze gives 3 coins (NOT 10+)
- [ ] Silver gives 7 coins
- [ ] Gold gives 15 coins
- [ ] Rainbow gives 22 coins + 1 gem (NOT 100+ coins)
- [ ] Fizz bonus applies to coins only (+25%)

**Test Cases:** TC-NEW-03

---

## FIX-006: Achievement-Based Pet Unlocks ⚠️

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

**Acceptance:**
- [ ] Fizz unlocks at Bond Level 5 (NOT gems)
- [ ] Ember unlocks at 10 mini-games (NOT gems)
- [ ] Premium pets show "Grundy Plus" or price or achievement
- [ ] No gem purchase option for Fizz/Ember

**Test Cases:** TC-NEW-04, TC-NEW-05

---

## PHASE 0 TESTS

```markdown
## Phase 0 Test Results (Alignment)

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-NEW-01 | Only Bond hearts visible | ⬜ | No stat bars |
| TC-NEW-02 | Daily Moments bonuses | ⬜ | +50% bond / +25% XP |
| TC-NEW-03 | Conservative rewards | ⬜ | Bronze=3c, Rainbow=22c+1g |
| TC-NEW-04 | Fizz unlocks at Bond 5 | ⬜ | Not gems |
| TC-NEW-05 | Ember unlocks at 10 games | ⬜ | Not gems |
| TC-58 | Runaway (not death) | ⬜ | 48h lockout |

**Phase 0 Status:** ⬜ Pass / ⬜ Fail
**Blockers:**
```

---

# PHASE 1: CORE HYBRID (P0)

## WEB-036: Dual Mode System

**Implementation:**
```typescript
gameMode: 'cozy' as 'cozy' | 'classic',
classicUnlocked: false, // Unlocks at Level 10

// Mode differences
const MODE_CONFIG = {
  cozy: {
    death: false,
    runaway: false,
    sickness: false,
    careMistakes: false,
    consequences: 'gentle'
  },
  classic: {
    death: false,  // NO DEATH
    runaway: true, // Runaway instead
    sickness: true,
    careMistakes: true,
    consequences: 'real'
  }
};
```

**Acceptance:**
- [ ] Mode selection after tutorial (NOT onboarding)
- [ ] Classic locked until Level 10
- [ ] Switch modes in Settings
- [ ] Warning modal for Classic
- [ ] Mode persists in localStorage
- [ ] NO death in either mode

**Test Cases:** TC-54, TC-55

---

## WEB-037: Behavior Indicators (Replaces Stat Bars)

**Create:**
- `src/components/BondHearts.tsx` — Only visible stat
- `src/components/BehaviorIndicator.tsx` — Shows pet needs
- `src/components/CooldownTimer.tsx` — 30-min feed cooldown

**Implementation:**
```tsx
// Bond Hearts (ONLY visible stat)
function BondHearts({ bondLevel }: { bondLevel: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= bondLevel ? 'text-red-500' : 'text-gray-400'}>
          {i <= bondLevel ? '♥' : '♡'}
        </span>
      ))}
    </div>
  );
}

// Behavior Indicator (replaces stat bars)
function BehaviorIndicator({ pet }: { pet: PetState }) {
  const fullnessState = getFullnessState(pet.fullness);
  const behavior = FULLNESS_STATES[fullnessState];
  
  if (behavior.bubble) {
    return <ThoughtBubble>{behavior.bubble}</ThoughtBubble>;
  }
  return null;
}
```

**Acceptance:**
- [ ] Bond hearts visible (♥♥♥♡♡)
- [ ] NO hunger bar
- [ ] NO mood bar  
- [ ] Pet behavior shows needs
- [ ] Thought bubbles for hungry/stuffed

---

## WEB-038: Snacks + Weight System

*(Same as before - no changes needed)*

---

## WEB-051: Feeding Limits + Cooldown

**Updated for hidden stats:**
```typescript
// Cooldown timer IS visible (30 min)
const FEED_COOLDOWN_VISIBLE = true;
const FEED_COOLDOWN_DURATION = 30 * 60 * 1000;

// Fullness is HIDDEN but affects feed value
function getFeedValue(pet: PetState): number {
  const state = getFullnessState(pet.fullness);
  return FULLNESS_STATES[state].feedValue;
}

// Block feeding if stuffed
function canFeed(pet: PetState): boolean {
  const state = getFullnessState(pet.fullness);
  return state !== 'stuffed';
}
```

**Acceptance:**
- [ ] Cooldown timer visible after feeding
- [ ] Feed value reduced when pet is full
- [ ] Stuffed state blocks feeding
- [ ] Pet shakes head when refusing food
- [ ] No visible stomach meter (hidden)

---

# PHASE 3: CLASSIC STAKES (Updated)

## WEB-041: Runaway System (NOT Death)

**CRITICAL: This replaces death system**

```typescript
interface RunawayState {
  stage: 0 | 1 | 2 | 3 | 4;  // 0=fine, 4=ran away
  lockoutUntil?: number;
  canPayToReturn: boolean;
}

function handleNeglect(pet: PetState, state: RunawayState): RunawayState {
  // Stage progression based on neglect
  if (pet.mood < 10 && state.stage < 4) {
    return { ...state, stage: state.stage + 1 };
  }
  return state;
}

function handleRunaway(state: RunawayState, gems: number): {
  canWait: boolean;
  canPay: boolean;
  timeRemaining: number;
} {
  const now = Date.now();
  const timeRemaining = state.lockoutUntil - now;
  
  return {
    canWait: timeRemaining > 0,
    canPay: gems >= 25,
    timeRemaining: Math.max(0, timeRemaining)
  };
}
```

**Runaway Screen UI:**
```
┌─────────────────────────────────────────┐
│                                         │
│           😢 Your pet ran away...       │
│                                         │
│        They'll return in 47:32:15       │
│                                         │
│       [Apologize for 25 💎]             │
│                                         │
│    Bond will be reduced by 50%          │
│                                         │
└─────────────────────────────────────────┘
```

**Acceptance:**
- [ ] NO death code anywhere
- [ ] Runaway triggers after neglect
- [ ] 48-hour lockout timer
- [ ] Can pay 25 gems to return early
- [ ] Bond reduced 50% on return
- [ ] Pet ALWAYS returns

**Test Cases:** TC-58 (updated)

---

## WEB-043: Evolution Branches (Corruption)

**Updated for no-death system:**

```typescript
const EVOLUTION_VARIANTS = {
  good: {
    condition: 'Perfect care (0-1 mistakes)',
    appearance: 'Vibrant, happy, special effects',
    bonus: '+10% all gains'
  },
  neutral: {
    condition: 'Normal care (2-3 mistakes)',
    appearance: 'Standard appearance',
    bonus: 'None'
  },
  bad: {
    condition: 'Poor care (4+ mistakes) OR Corruption',
    appearance: 'Survivor variant, darker colors',
    bonus: 'None',
    healable: true,
    healTime: '30 days good care'
  }
};
```

**Acceptance:**
- [ ] Perfect care = good variant
- [ ] Normal care = neutral variant
- [ ] Poor care = "Survivor" corruption variant
- [ ] Corruption is healable (30 days good care)
- [ ] Visual differences per variant

---

# PHASE 5: ANIMATIONS (Updated)

## WEB-064: Fullness Behavior Animations

**Animations serve as UI for hidden stats:**

```css
/* Hungry (0-20) - "I NEED food!" */
@keyframes hungry-beg {
  0%, 100% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-5px) scale(1.02); }
  50% { transform: translateY(0) scale(0.98); }
}

/* Stuffed (91-100) - "Cannot eat" */
@keyframes stuffed-turnaway {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-30deg); }
}
```

**Acceptance:**
- [ ] Hungry: begging animation + 🍎❓ bubble
- [ ] Peckish: occasional glance at food
- [ ] Content: normal idle
- [ ] Satisfied: pat belly + 😌 bubble
- [ ] Stuffed: turn away + 🙅 bubble

---

## WEB-068: Daily Moment Indicators

```tsx
function DailyMomentIndicator() {
  const moment = useDailyMoment();
  
  if (!moment.active) return null;
  
  return (
    <div className="absolute top-2 right-2 bg-amber-500/20 px-2 py-1 rounded-full">
      <span>{moment.icon}</span>
      <span className="text-xs ml-1">
        {moment.name === 'morning' || moment.name === 'evening' 
          ? '+50% Bond' 
          : '+25% XP'}
      </span>
    </div>
  );
}
```

**Acceptance:**
- [ ] 🌅 Morning indicator (7-10 AM)
- [ ] ☀️ Afternoon indicator (12-2 PM)
- [ ] 🌙 Evening indicator (6-9 PM)
- [ ] Bonus text visible
- [ ] Disappears outside time window

---

## WEB-070: Runaway Warning Animations

```css
/* Stage 3: Pet thinking about leaving */
@keyframes looking-at-exit {
  0%, 80% { transform: translateX(0); }
  90% { transform: translateX(20px); } /* Glance at exit */
  100% { transform: translateX(0); }
}

/* Stage 4: Pet running away */
@keyframes pet-runaway {
  0% { transform: translateX(0) scale(1); opacity: 1; }
  50% { transform: translateX(100px) scale(0.8); opacity: 0.5; }
  100% { transform: translateX(200px) scale(0.5); opacity: 0; }
}
```

**Acceptance:**
- [ ] Stage 1: droopy, grey tint
- [ ] Stage 2: shiver, green tint (sick)
- [ ] Stage 3: looking at exit, 💭🚪 bubble
- [ ] Stage 4: runs off screen animation

---

# FINAL STEPS

## 1. Full Test Suite

Run ALL test cases including new alignment tests.

**Critical Alignment Checks:**
- [ ] NO death system anywhere
- [ ] Only Bond hearts visible (no stat bars)
- [ ] Fullness hidden, behavior shows state
- [ ] Daily Moments bonuses active
- [ ] Conservative rewards (3/7/15/22 coins)
- [ ] Fizz unlocks at Bond 5 (not gems)
- [ ] Ember unlocks at 10 games (not gems)

---

## 2. Rebuild

```bash
npm run build:standalone
ls -la grundy-game.html
```

---

## 3. Push to GitHub

```bash
git add -A
git commit -m "v2.1: Aligned with Master Decisions

CRITICAL FIXES:
- Death → Runaway system (48h lockout)
- Hidden stats (only Bond visible)
- Fullness behavioral indicators
- Daily Moments bonuses
- Conservative mini-game rewards
- Achievement-based pet unlocks

Features:
- Dual mode (Cozy/Classic)
- Snacks, weight, feeding limits
- Poop/cleaning mechanic
- Full audio system
- Pet animations with behavior UI

Tests: X/110+ passing
"

git push origin main
```

---

## 4. Final Report

```markdown
# Grundy v2.1 Build Report

## Alignment Status

| Decision | Status |
|----------|--------|
| Hidden Stats | ✅/❌ |
| Daily Moments | ✅/❌ |
| Runaway (no death) | ✅/❌ |
| Conservative Rewards | ✅/❌ |
| Achievement Unlocks | ✅/❌ |
| Fullness Behaviors | ✅/❌ |

## Test Results

- Total Tests: 110+
- Passed: X
- Failed: X

## Known Issues

[List any unresolved issues]
```

---

**END OF MASTER BUILD + TEST INSTRUCTIONS v2.1**
