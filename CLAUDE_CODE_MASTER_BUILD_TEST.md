# GRUNDY — MASTER BUILD + TEST INSTRUCTIONS

**For:** Claude Code  
**Date:** December 2024  
**Total Tickets:** 37 (M7: 16, M8: 11, M9: 10)  
**Estimated Time:** 8-12 hours

---

## INSTRUCTIONS

1. Read ALL design documents in this order:
   - `GRUNDY_HYBRID_MODE_DESIGN.md`
   - `GRUNDY_SOUND_VIBRATION_DESIGN.md`
   - `GRUNDY_PET_ANIMATION_DESIGN.md`
   - `GRUNDY_COMPREHENSIVE_TEST_PLAN.md`

2. Execute tickets in order by phase

3. After EACH phase:
   - Run relevant test cases
   - Log results to `TEST_RESULTS.md`
   - Fix any failures before proceeding

4. At the end:
   - Rebuild `grundy-game.html`
   - Run full test suite
   - Push everything to GitHub

---

## BUILD LOG

Create `BUILD_LOG.md` with this template:

```markdown
# Build Log

## Phase 1: Core Hybrid
- [ ] WEB-036: Dual mode system
- [ ] WEB-037: Happiness meter
- [ ] WEB-038: Snacks + weight
- [ ] WEB-051: Feeding limits
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
- [ ] WEB-041: Death system
- [ ] WEB-042: Care mistakes
- [ ] WEB-043: Evolution branches
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
- [ ] WEB-064: Idle animations
- [ ] WEB-065: Mood animations
- [ ] WEB-066: Feeding reactions
- [ ] WEB-067: Personality animations
- [ ] WEB-068: Expression system
- [ ] WEB-069: Weight visuals
- [ ] WEB-070: Special states
- [ ] WEB-071: Micro-animations
- [ ] WEB-072: Timing system
Start Time:
End Time:
Status:
Notes:
```

---

# PHASE 1: CORE HYBRID (P0)

## WEB-036: Dual Mode System

**Create:**
- `src/components/ModeSelector.tsx`
- Update `src/game/store.ts` with `gameMode: 'cozy' | 'classic'`

**Implementation:**
```typescript
// Add to game state
gameMode: 'cozy' as 'cozy' | 'classic',
classicUnlocked: false, // Unlocks at Level 10

// Mode selection screen (after pet pick for new players)
// Show in settings for returning players
```

**Acceptance:**
- [ ] Mode selection in onboarding
- [ ] Classic locked until Level 10
- [ ] Switch modes in Settings
- [ ] Warning modal for Classic
- [ ] Mode persists in localStorage

**Test Cases:** TC-54, TC-55

---

## WEB-037: Happiness Meter

**Update:**
- `src/game/store.ts` - Add happiness to pet state
- `src/components/StatsDisplay.tsx` - Show happiness bar

**Implementation:**
```typescript
// Pet state now has both mood AND happiness
happiness: number; // 0-100, separate from mood

// Decay rates by life stage
const HAPPINESS_DECAY = {
  baby: 1/60,    // 1 point per 60 min
  youth: 1/90,   // 1 point per 90 min
  evolved: 1/120 // 1 point per 120 min
};
```

**Acceptance:**
- [ ] Happiness bar next to hunger bar
- [ ] Decays slower than hunger
- [ ] Filled by snacks primarily
- [ ] Affects XP multiplier
- [ ] Low happiness shows bored animation

**Test Cases:** TC-63

---

## WEB-038: Snacks + Weight System

**Create:**
- New snack foods in `src/data/foods.ts`
- Weight state and logic in `src/game/store.ts`
- `src/components/WeightIndicator.tsx`

**New Foods:**
```typescript
const SNACKS = [
  { id: 'candy', icon: '🍬', hunger: 3, happiness: 20, xp: 3, cost: 20, weight: 10 },
  { id: 'icecream', icon: '🍦', hunger: 5, happiness: 25, xp: 5, cost: 30, weight: 10 },
  { id: 'lollipop', icon: '🍭', hunger: 2, happiness: 18, xp: 2, cost: 10, weight: 8 },
];
```

**Weight System:**
```typescript
// Add to pet state
weight: number; // 0-100

// Weight tiers
const WEIGHT_TIERS = {
  normal: { min: 0, max: 30, scale: 1.0 },
  chubby: { min: 31, max: 60, scale: 1.1 },
  overweight: { min: 61, max: 80, scale: 1.2, happinessDecayMult: 1.5 },
  obese: { min: 81, max: 100, scale: 1.3, happinessDecayMult: 2, blockMinigames: true }
};

// Weight decay: -1 per hour naturally
```

**Acceptance:**
- [ ] Snack foods in shop and inventory
- [ ] Snacks give high happiness, low hunger
- [ ] Each snack adds to weight
- [ ] Weight decays -1/hour
- [ ] Visual tiers: normal, chubby, overweight, obese
- [ ] Obese blocks mini-games

**Test Cases:** TC-62 to TC-69

---

## WEB-051: Feeding Limits + Stomach

**Create:**
- `src/components/StomachMeter.tsx`
- Update feeding logic in `src/game/store.ts`

**Implementation:**
```typescript
// Add to pet state
stomach: number; // Current fullness
lastFeedTime: number; // Timestamp of last feed

// Stomach capacity by pet
const STOMACH_CAPACITY = {
  munchlet: 5, grib: 4, plompo: 6, fizz: 4,
  ember: 4, chomper: 8, whisp: 3, luxe: 5
};

// Stomach empties 1 slot per 12 minutes
// Cannot feed if stomach full OR hunger >= 95

// Overfeed detection
const recentFeeds = feedsInLast5Minutes();
if (recentFeeds >= 3) {
  if (gameMode === 'classic') sicknessChance += 0.10;
  showWarning("Slow down!");
}

// Snack limit: 2 per hour
const snacksThisHour = snacksFedInLastHour();
if (snacksThisHour >= 2 && food.isSnack) {
  if (gameMode === 'classic') pet.weight += 15;
  showWarning("Too many treats!");
  return; // Block
}
```

**Acceptance:**
- [ ] Stomach meter visible (X/Y slots)
- [ ] Each feed fills 1 slot
- [ ] Full stomach blocks feeding
- [ ] Timer shows next slot
- [ ] Decay: 1 slot per 12 min
- [ ] Hunger >= 95 blocks feeding
- [ ] Overfeed warning (3+ in 5 min)
- [ ] Snack limit (2/hour)

**Test Cases:** TC-70 to TC-77

---

## PHASE 1 TESTS

After completing Phase 1, run these test cases:

```markdown
## Phase 1 Test Results

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-54 | Mode toggle in Settings | ⬜ | |
| TC-55 | Cozy mode no death | ⬜ | |
| TC-62 | Snack category ID | ⬜ | |
| TC-63 | Snack happiness boost | ⬜ | |
| TC-64 | Weight gain | ⬜ | |
| TC-65 | Chubby tier | ⬜ | |
| TC-66 | Overweight tier | ⬜ | |
| TC-67 | Obese tier | ⬜ | |
| TC-68 | Weight decay | ⬜ | |
| TC-70 | Stomach display | ⬜ | |
| TC-71 | Stomach fills | ⬜ | |
| TC-72 | Stomach full blocks | ⬜ | |
| TC-73 | Stomach decay | ⬜ | |
| TC-75 | Hunger cap | ⬜ | |
| TC-76 | Overfeed warning | ⬜ | |
| TC-77 | Snack limit | ⬜ | |

**Phase 1 Status:** ⬜ Pass / ⬜ Fail
**Blockers:**
```

---

# PHASE 2: MAINTENANCE LOOP (P1)

## WEB-039: Poop/Cleaning

**Create:**
- `src/components/PoopDisplay.tsx`
- Add poop state to game store

**Implementation:**
```typescript
// Add to game state
poopCount: number; // Current poop on screen
feedsSinceLastPoop: number;
lastPoopTime: number | null;

// Poop frequency by pet
const POOP_FREQUENCY = {
  munchlet: 4, grib: 3, plompo: 5, fizz: 3,
  ember: 4, chomper: 2, whisp: 6, luxe: 4
};

// On feed
feedsSinceLastPoop++;
if (feedsSinceLastPoop >= POOP_FREQUENCY[pet.id]) {
  poopCount++;
  feedsSinceLastPoop = 0;
  lastPoopTime = Date.now();
}

// Clean poop
function cleanPoop() {
  poopCount--;
  happiness += 2;
  bond += 0.1;
  playSound('pet_clean');
  vibrate([20, 20, 20]);
}

// Neglect timers (Classic mode)
const timeSincePoop = Date.now() - lastPoopTime;
if (timeSincePoop > 30 * 60 * 1000) showUncomfortable();
if (timeSincePoop > 60 * 60 * 1000) happinessDecayMult = 2;
if (timeSincePoop > 120 * 60 * 1000 && gameMode === 'classic') {
  sicknessChance += 0.15;
  careMistakes++;
}
```

**Acceptance:**
- [ ] Poop appears after X feedings (varies by pet)
- [ ] Poop emoji visible near pet
- [ ] Tap poop to clean
- [ ] Clean: +2 happiness, +0.1 bond
- [ ] Sparkle effect on clean
- [ ] 30min: uncomfortable
- [ ] 1hr: happiness decay 2×
- [ ] 2hr (Classic): sickness risk

**Test Cases:** TC-78 to TC-83

---

## WEB-048: New Shop Items

**Update:**
- `src/data/items.ts`
- `src/components/Shop.tsx`

**New Items:**
```typescript
const ITEMS = [
  { id: 'medicine', icon: '💊', cost: 50, effect: 'cureSickness' },
  { id: 'dietfood', icon: '🥗', cost: 30, effect: 'reduceWeight', amount: 20 },
  { id: 'energydrink', icon: '⚡', cost: 25, effect: 'addEnergy', amount: 50 },
  { id: 'cleaningbrush', icon: '🧹', cost: 10, effect: 'autoClean', duration: 3600000 },
  { id: 'moodboost', icon: '💖', cost: 40, effect: 'addHappiness', amount: 30 },
];
```

**Acceptance:**
- [ ] Items in Shop under "Items" tab
- [ ] Medicine cures sickness
- [ ] Diet Food: -20 weight, +5 hunger
- [ ] Energy Drink: +50 energy
- [ ] Cleaning Brush: auto-clean 1 hour
- [ ] Mood Boost: +30 happiness

**Test Cases:** TC-25, TC-69

---

## WEB-044: Daily/Weekly Events

**Create:**
- `src/game/events.ts`
- `src/components/EventBanner.tsx`

**Implementation:**
```typescript
// Daily events
const DAILY_EVENTS = {
  firstFeed: { gem: 1, triggered: false },
  cleanStreak: { coins: 5, triggered: false },
  perfectDay: { coins: 10, gems: 2, triggered: false },
};

// Weekly events (check day of week)
const WEEKLY_EVENTS = {
  0: { name: 'Surprise Sunday', reward: 'randomRareFood' },
  1: { name: 'Mini-game Monday', modifier: 'minigameRewards', mult: 2 },
  3: { name: 'Wisdom Wednesday', modifier: 'xpGain', mult: 1.5 },
  5: { name: 'Friendship Friday', modifier: 'bondGain', mult: 2 },
};

// Check on app load and actions
function checkDailyEvents() {
  const today = new Date().toDateString();
  if (lastEventCheck !== today) {
    resetDailyEvents();
    lastEventCheck = today;
  }
  
  // First feed
  if (!dailyEvents.firstFeed.triggered && justFed) {
    addGems(1);
    showToast('Daily gem! +1 💎');
    dailyEvents.firstFeed.triggered = true;
  }
}
```

**Acceptance:**
- [ ] First Feed: +1 gem (once per day)
- [ ] Clean Streak: +5 coins (all poop same day)
- [ ] Perfect Day: +10 coins, +2 gems (hunger/happiness >50 all day)
- [ ] Monday: 2× mini-game rewards
- [ ] Wednesday: +50% XP
- [ ] Friday: 2× bond
- [ ] Sunday: Random rare food
- [ ] Event banner on login

**Test Cases:** TC-84 to TC-86

---

## WEB-045: Login Streaks

**Create:**
- `src/components/LoginStreak.tsx`
- Add streak state to store

**Implementation:**
```typescript
// Add to state
loginStreak: number;
lastLoginDate: string;

// On app load
const today = new Date().toDateString();
const yesterday = new Date(Date.now() - 86400000).toDateString();

if (lastLoginDate === today) {
  // Already logged in today
} else if (lastLoginDate === yesterday) {
  // Streak continues
  loginStreak++;
  grantStreakReward(loginStreak);
  lastLoginDate = today;
} else {
  // Streak broken
  loginStreak = 1;
  grantStreakReward(1);
  lastLoginDate = today;
}

// Rewards
const STREAK_REWARDS = {
  1: { coins: 10 },
  2: { coins: 20 },
  3: { coins: 30 },
  4: { coins: 40 },
  5: { coins: 50 },
  6: { food: 'birthday_cake' },
  7: { gems: 10, mysteryBox: true },
};
```

**Acceptance:**
- [ ] Track consecutive login days
- [ ] Day 1-6: increasing coins
- [ ] Day 7: 10 gems + Mystery Box
- [ ] Streak resets if miss a day
- [ ] Visual calendar showing progress
- [ ] Claim button for daily reward

**Test Cases:** TC-87 to TC-89

---

## PHASE 2 TESTS

```markdown
## Phase 2 Test Results

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-78 | Poop appears | ⬜ | |
| TC-79 | Poop frequency by pet | ⬜ | |
| TC-80 | Tap to clean | ⬜ | |
| TC-81 | Uncleaned 30min | ⬜ | |
| TC-82 | Uncleaned 1hr | ⬜ | |
| TC-83 | Uncleaned 2hr (Classic) | ⬜ | |
| TC-25 | Buy new items | ⬜ | |
| TC-69 | Diet food weight | ⬜ | |
| TC-84 | First feed gem | ⬜ | |
| TC-85 | Perfect day | ⬜ | |
| TC-86 | Mini-game Monday | ⬜ | |
| TC-87 | Login streak 1-6 | ⬜ | |
| TC-88 | Login streak day 7 | ⬜ | |
| TC-89 | Streak break | ⬜ | |

**Phase 2 Status:** ⬜ Pass / ⬜ Fail
```

---

# PHASE 3: CLASSIC STAKES (P1)

## WEB-040: Sickness System

**Implementation:**
```typescript
// Add to pet state
isSick: boolean;
lastSickTime: number | null;

// Sickness triggers (Classic mode only)
function checkSickness() {
  if (gameMode !== 'classic') return;
  
  let chance = 0;
  
  // Hunger = 0 for 30+ min
  if (hunger === 0 && timeSinceLastFeed > 30 * 60 * 1000) {
    chance += 0.20;
  }
  
  // Uncleaned poop 2+ hours
  if (poopCount > 0 && timeSincePoop > 120 * 60 * 1000) {
    chance += 0.15;
  }
  
  // Overweight + snack
  if (weight > 60 && justAteSnack) {
    chance += 0.05;
  }
  
  if (Math.random() < chance) {
    isSick = true;
    lastSickTime = Date.now();
  }
}

// Sick effects
if (isSick) {
  allDecayRates *= 2;
  canPlayMinigames = false;
  showSickOverlay();
}
```

**Acceptance:**
- [ ] Only in Classic mode
- [ ] Hunger 0 for 30min: 20% chance
- [ ] Uncleaned poop 2hr: 15% chance
- [ ] Overweight + snack: 5% chance
- [ ] Sick: green tint, thermometer
- [ ] Sick: all decay 2×
- [ ] Sick: blocks mini-games
- [ ] Medicine cures

**Test Cases:** TC-56, TC-57

---

## WEB-041: Death System

**Implementation:**
```typescript
// Death check (Classic only)
function checkDeath() {
  if (gameMode !== 'classic') return;
  if (!isSick) return;
  if (hunger > 0) return;
  
  const timeSick = Date.now() - lastSickTime;
  if (timeSick > 4 * 60 * 60 * 1000) { // 4 hours
    triggerDeath();
  }
}

function triggerDeath() {
  isDead = true;
  deathTime = Date.now();
  showDeathScreen();
  // 24h wait or 100 gems to restart
}
```

**Acceptance:**
- [ ] Only in Classic mode
- [ ] Trigger: sick + hunger=0 + 4 hours
- [ ] Death screen: dim, angel wings, tombstone
- [ ] Shows pet name
- [ ] 24h wait to hatch new egg
- [ ] 100 gems skips wait
- [ ] Cozy mode: never triggers

**Test Cases:** TC-58

---

## WEB-042: Care Mistakes

**Implementation:**
```typescript
// Per evolution stage
careMistakes: { baby: 0, youth: 0, evolved: 0 };
currentStage: 'baby' | 'youth' | 'evolved';

// Mistake triggers (Classic only)
// +1 for each:
// - Hunger = 0 for 30+ min
// - Happiness < 20 for 2+ hours
// - Poop uncleaned 2+ hours
// - Sick untreated 1+ hour

// Reset on evolution
if (oldStage !== newStage) {
  careMistakes[oldStage] = currentMistakes;
  currentMistakes = 0;
}
```

**Acceptance:**
- [ ] Hidden counter per stage
- [ ] Tracks each mistake type
- [ ] Resets at evolution
- [ ] Affects evolution outcome
- [ ] Only in Classic mode

**Test Cases:** TC-59

---

## WEB-043: Evolution Branches

**Implementation:**
```typescript
function getEvolutionForm() {
  const babyMistakes = careMistakes.baby;
  const youthMistakes = careMistakes.youth;
  
  const perfectBaby = babyMistakes <= 1;
  const perfectYouth = youthMistakes <= 1;
  const troubledBaby = babyMistakes >= 4;
  const troubledYouth = youthMistakes >= 4;
  
  if (perfectBaby && perfectYouth) {
    return 'rare'; // +20% stats, unique look
  } else if (troubledBaby || troubledYouth) {
    return 'altered'; // Different look, survivor theme
  } else {
    return 'standard';
  }
}
```

**Acceptance:**
- [ ] 0-1 mistakes = "Perfect" badge
- [ ] 4+ mistakes = "Troubled" badge
- [ ] Perfect + Perfect = Rare Form
- [ ] Troubled = Altered Form
- [ ] Normal = Standard Form
- [ ] Visual differences per form
- [ ] Achievement unlocked

**Test Cases:** TC-60

---

## WEB-049: Notification System

**Implementation:**
```typescript
const NOTIFICATIONS = {
  cozy: {
    hungry: { message: "Your pet misses you! 💕", urgency: 'gentle' },
  },
  classic: {
    hungry: { message: "Your pet is getting hungry! 🍽️", urgency: 'gentle' },
    veryHungry: { message: "Your pet is VERY hungry! ⚠️", urgency: 'urgent' },
    sick: { message: "Your pet is SICK! 🏥", urgency: 'critical' },
    emergency: { message: "Your pet needs you NOW! 💔", urgency: 'emergency' },
  }
};

// Check conditions and show appropriate notification
// Respect user's notification settings
```

**Acceptance:**
- [ ] Cozy: gentle reminders only
- [ ] Classic: escalating urgency
- [ ] Settings to disable
- [ ] Different visual styling per urgency

**Test Cases:** TC-55, TC-61

---

## PHASE 3 TESTS

```markdown
## Phase 3 Test Results

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-56 | Sickness trigger | ⬜ | |
| TC-57 | Cure sickness | ⬜ | |
| TC-58 | Death trigger | ⬜ | |
| TC-59 | Care mistakes | ⬜ | |
| TC-60 | Evolution branches | ⬜ | |
| TC-61 | Welcome back bonus | ⬜ | |

**Phase 3 Status:** ⬜ Pass / ⬜ Fail
```

---

# PHASE 4: AUDIO (P1-P2)

## WEB-052: AudioManager

**Create:**
- `src/audio/AudioManager.ts`

```typescript
class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private music: HTMLAudioElement | null = null;
  private masterVolume = 0.8;
  private musicVolume = 0.6;
  private sfxVolume = 1.0;
  private muted = false;

  preload(soundList: string[]): void { /* ... */ }
  play(name: string): void { /* ... */ }
  playMusic(name: string): void { /* ... */ }
  stopMusic(): void { /* ... */ }
  setMasterVolume(v: number): void { /* ... */ }
  setMuted(muted: boolean): void { /* ... */ }
}

export const audio = new AudioManager();
```

**Test:** Play any sound file, verify it works.

---

## WEB-053: VibrationManager

**Create:**
- `src/audio/VibrationManager.ts`

```typescript
class VibrationManager {
  private enabled = true;
  
  isSupported(): boolean { return 'vibrate' in navigator; }
  setEnabled(enabled: boolean): void { this.enabled = enabled; }
  
  vibrate(pattern: number | number[]): void {
    if (this.enabled && this.isSupported()) {
      navigator.vibrate(pattern);
    }
  }
  
  // Presets
  tap(): void { this.vibrate(10); }
  feed(): void { this.vibrate(50); }
  feedLoved(): void { this.vibrate([30, 30, 50]); }
  levelUp(): void { this.vibrate([100, 50, 100, 50, 200]); }
  error(): void { this.vibrate([50, 50, 50]); }
}

export const vibration = new VibrationManager();
```

**Test:** On Android, trigger vibration.

---

## WEB-054 to WEB-062: Audio Implementation

Implement all sounds as defined in `GRUNDY_SOUND_VIBRATION_DESIGN.md`:

- Feeding sounds (loved, liked, disliked)
- Reward sounds (XP, coins, gems, level up)
- UI sounds (tap, menu, modal)
- Pet sounds (happy, sad, hungry, sick)
- Mini-game sounds (catch, miss, combo)
- Background music
- All vibration patterns
- iOS audio unlock workaround

**For sound files:** Use placeholder sounds or generate with BFXR (bfxr.net). Log which sounds are placeholders.

---

## PHASE 4 TESTS

```markdown
## Phase 4 Test Results

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-37 | Sound toggle | ⬜ | |
| TC-38 | Vibration toggle | ⬜ | |
| TC-39 | Volume sliders | ⬜ | |
| TC-90 | Feed loved sound | ⬜ | |
| TC-91 | Feed disliked sound | ⬜ | |
| TC-92 | Level up sound | ⬜ | |
| TC-93 | Vibration feed | ⬜ | |
| TC-94 | Vibration level up | ⬜ | |
| TC-95 | iOS audio unlock | ⬜ | |

**Phase 4 Status:** ⬜ Pass / ⬜ Fail
```

---

# PHASE 5: ANIMATIONS (P1-P2)

## WEB-063: SVG Pet Shapes

**Create:**
- `src/components/pets/PetSVG.tsx`
- Individual shape files per pet

Create unique SVG silhouettes for each pet as defined in `GRUNDY_PET_ANIMATION_DESIGN.md`:

- Munchlet: Round, friendly
- Grib: Angular, mischievous
- Plompo: Wide, sleepy
- Fizz: Spiky, electric
- Ember: Flame-shaped
- Chomper: Big mouth
- Whisp: Ethereal, floaty
- Luxe: Elegant with crown

---

## WEB-064 to WEB-072: Animation Implementation

Implement all animations:

**Idle:** Gentle bounce, random blink
**Mood:** Happy wiggle, sad droop, hungry look-around
**Feeding:** Chomp, loved jump+spin, disliked shake
**Expressions:** Eye and mouth state changes
**Weight:** Scale transform per tier
**Special:** Sick shiver, sleeping Zzz, excited bounce
**Personality:** Per-pet unique animations

Use CSS animations and keyframes as defined in the design doc.

---

## PHASE 5 TESTS

```markdown
## Phase 5 Test Results

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-96 | Unique pet shapes | ⬜ | |
| TC-97 | Idle animation | ⬜ | |
| TC-98 | Happy animation | ⬜ | |
| TC-99 | Sad animation | ⬜ | |
| TC-100 | Loved feeding | ⬜ | |
| TC-101 | Fizz personality | ⬜ | |
| TC-102 | Whisp personality | ⬜ | |
| TC-103 | Obese visual | ⬜ | |

**Phase 5 Status:** ⬜ Pass / ⬜ Fail
```

---

# FINAL STEPS

## 1. Full Test Suite

Run ALL 103 test cases from `GRUNDY_COMPREHENSIVE_TEST_PLAN.md`

Log results in `TEST_RESULTS.md` using this format:

```markdown
# Full Test Results

**Date:** [DATE]
**Build:** grundy-game.html
**Tester:** Claude Code

## Summary

| Category | Passed | Failed | Skipped |
|----------|--------|--------|---------|
| First-Time Flow | /3 | | |
| Tutorial | /3 | | |
| ... | | | |
| **TOTAL** | /103 | | |

## All Test Cases

| TC | Test | Result | Notes |
|----|------|--------|-------|
| TC-01 | Fresh boot flow | ⬜ | |
| TC-02 | Skip story | ⬜ | |
| ... | | | |

## Failed Tests (Details)

### TC-XX: [Test Name]
- Expected: ...
- Actual: ...
- Steps to reproduce: ...
- Severity: High/Medium/Low

## Bugs Found

| ID | Description | Severity | Fixed |
|----|-------------|----------|-------|
| | | | |
```

---

## 2. Rebuild

```bash
# Build standalone HTML
npm run build:standalone

# Verify file exists
ls -la grundy-game.html
```

---

## 3. Push to GitHub

```bash
git add -A
git commit -m "M7-M9 complete: Hybrid mode, Audio, Animations

Features:
- Dual mode (Cozy/Classic)
- Snacks, weight, feeding limits
- Poop/cleaning mechanic
- Sickness/death (Classic)
- Care mistakes, evolution branches
- Daily/weekly events, login streaks
- Full audio system
- Pet animations and expressions

Tests: X/103 passing
"

git push origin main
```

---

## 4. Final Report

Create `FINAL_REPORT.md`:

```markdown
# Grundy M7-M9 Build Report

## Completion Status

| Phase | Tickets | Status |
|-------|---------|--------|
| Phase 1: Core Hybrid | 4 | ✅/❌ |
| Phase 2: Maintenance | 4 | ✅/❌ |
| Phase 3: Classic | 5 | ✅/❌ |
| Phase 4: Audio | 11 | ✅/❌ |
| Phase 5: Animation | 10 | ✅/❌ |
| **TOTAL** | 34 | |

## Test Results

- Total Tests: 103
- Passed: X
- Failed: X
- Skipped: X

## Known Issues

[List any unresolved issues]

## Notes

[Any implementation notes]

## Files Created/Modified

[List key files]
```

---

**END OF MASTER BUILD + TEST INSTRUCTIONS**
