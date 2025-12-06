# GRUNDY — GAME BIBLE v4.0 ADDENDUM

**Version:** 4.0  
**Last Updated:** December 2024  
**Status:** Web Prototype + Production Spec  
**Changes From v3:** Pet unlock system, 5 new pets, 2 new foods, onboarding flow, gem economy

---

## CHANGELOG FROM v3.0

| Section | Change |
|---------|--------|
| Pets | Added 5 unlockable pets (Fizz, Ember, Chomper, Whisp, Luxe) |
| Foods | Added 2 premium foods (Dream Treat, Golden Feast) |
| Progression | Added pet unlock system with gem skip |
| Economy | Added gem income sources |
| FTUE | Added 4-screen onboarding flow + tutorial |
| Abilities | Added unique pet special abilities |

---

# 1. PET UNLOCK SYSTEM (NEW)

## Overview

Players start with access to all 3 starter pets and unlock 5 additional pets through progression or gem purchase.

```yaml
Core Rules:
  - All 3 STARTERS always available (Munchlet, Grib, Plompo)
  - Player picks which starter to play FIRST
  - Can switch between starters anytime
  - Each pet has SEPARATE: Level, XP, Bond, Mood, Hunger
  - SHARED across all pets: Coins, Gems, Food Inventory
  - Pets 4-8 unlock via level milestone OR gem purchase
  - Unlocks are permanent (account-wide)
```

## Unlock Requirements

| Slot | Pet | Free Unlock | Gem Skip | Design Intent |
|------|-----|-------------|----------|---------------|
| 1 | Munchlet 🟡 | Starter | — | Beginner-friendly |
| 2 | Grib 🟢 | Starter | — | Spicy specialist |
| 3 | Plompo 🟣 | Starter | — | Low-maintenance |
| 4 | Fizz 🔵 | Level 10 | 50 💎 | Active player reward |
| 5 | Ember 🟠 | Level 15 | 100 💎 | Mid-game goal |
| 6 | Chomper 🔴 | Level 20 | 150 💎 | Inventory burner |
| 7 | Whisp ⚪ | Level 25 | 200 💎 | Rare food specialist |
| 8 | Luxe ✨ | Level 30 | 300 💎 | Endgame flex |

## Unlock Flow

```
Player reaches Level 10 with ANY pet
         ↓
"NEW PET UNLOCKED!" modal appears
         ↓
Shows Fizz with sparkle animation
         ↓
[Start Playing] → Switch to Fizz
[Maybe Later] → Dismiss, access via Pet Selector
```

## Pet Selector UI

```
┌─────────────────────────────────────────┐
│           CHOOSE YOUR PET               │
├─────────────────────────────────────────┤
│  🟡        🟢        🟣                 │
│  Munchlet  Grib     Plompo              │
│  Lv.12     Lv.5     Lv.3                │
│  [ACTIVE]                               │
├─────────────────────────────────────────┤
│  🔵        🟠        🔴                 │
│  Fizz     Ember    Chomper              │
│  Lv.2     🔒       🔒                   │
│           Lv.15    Lv.20                │
│           or 100💎  or 150💎            │
├─────────────────────────────────────────┤
│  ⬜        ✨                            │
│  Whisp    Luxe                          │
│  🔒       🔒                            │
│  Lv.25    Lv.30                         │
│  or 200💎  or 300💎                     │
└─────────────────────────────────────────┘
```

---

# 2. NEW PETS (5 UNLOCKABLE)

## Fizz 🔵
**Unlock:** Level 10 OR 50 💎

| Attribute | Value |
|-----------|-------|
| Color | #3b82f6 (Blue) |
| Personality | Hyper, bubbly, can't sit still |
| Likes | Sour, Fizzy, Cold |
| Dislikes | Bland, Dry |
| Hunger Decay | **Very Fast** (1.5× normal) |
| Special Ability | +25% rewards from mini-games |

### Captions
| Context | Examples |
|---------|----------|
| Idle | "Fizz bounces off the walls!", "Fizz vibrates with energy!", "Can't. Stop. Moving!" |
| Positive | "WOOOOO!", "Fizz explodes with joy!", "MORE MORE MORE!" |
| Neutral | "Fizz zips around", "Boing boing!", "Fizz does a spin" |
| Negative | "Fizz deflates...", "Too boring!", "Fizz fizzles out..." |

### Design Notes
High maintenance (fast hunger) but rewards active players with better mini-game payouts. Appeals to engaged players who play frequently.

---

## Ember 🟠
**Unlock:** Level 15 OR 100 💎

| Attribute | Value |
|-----------|-------|
| Color | #f97316 (Orange) |
| Personality | Fierce, proud, dramatic |
| Likes | Spicy, Hot, Smoky |
| Dislikes | Sweet, Cold |
| Hunger Decay | Fast (1.25× normal) |
| Special Ability | 2× coins when feeding spicy foods |

### Captions
| Context | Examples |
|---------|----------|
| Idle | "Ember smolders intensely.", "Ember strikes a pose.", "Ember waits... dramatically." |
| Positive | "Ember ROARS approval!", "NOW we're cooking!", "FIRE! 🔥" |
| Neutral | "Ember nods.", "Acceptable.", "Ember acknowledges" |
| Negative | "Ember scoffs.", "Pathetic.", "Ember turns away in disgust." |

### Design Notes
Spicy food specialist — pairs well with Grib's inventory. Coin multiplier rewards strategic feeding. Appeals to players who stockpile spicy foods.

---

## Chomper 🔴
**Unlock:** Level 20 OR 150 💎

| Attribute | Value |
|-----------|-------|
| Color | #ef4444 (Red) |
| Personality | Hungry, goofy, always eating |
| Likes | EVERYTHING |
| Dislikes | **None** |
| Hunger Decay | **Fastest** (2× normal) |
| Special Ability | No disliked foods (all neutral or better) |

### Captions
| Context | Examples |
|---------|----------|
| Idle | "Chomper's tummy rumbles...", "Food? FOOD?!", "Chomper drools..." |
| Positive | "CHOMP CHOMP CHOMP!", "Chomper inhales it!", "NOM NOM NOM!" |
| Neutral | "Chomper eats it anyway.", "Food is food!", "More?" |
| Negative | *(Never triggers — no dislikes)* |

### Design Notes
No penalties for wrong food, but burns through inventory fast. Great for players with lots of food stockpiled. Relaxing gameplay with no negative reactions.

---

## Whisp ⚪
**Unlock:** Level 25 OR 200 💎

| Attribute | Value |
|-----------|-------|
| Color | #e2e8f0 (Silver/White) |
| Personality | Mysterious, ethereal, dreamlike |
| Likes | Dream foods, Magical, Rare |
| Dislikes | Common, Basic |
| Hunger Decay | **Slowest** (0.5× normal) |
| Special Ability | +50% XP from rare/epic foods |

### Captions
| Context | Examples |
|---------|----------|
| Idle | "Whisp floats silently...", "Whisp phases in and out...", "..." |
| Positive | "Whisp glows brighter!", "✨", "Whisp hums softly..." |
| Neutral | "Whisp observes.", "...", "Whisp drifts" |
| Negative | "Whisp fades slightly.", "...", "Whisp looks through you." |

### Design Notes
Premium pet that rewards rare food usage. Low maintenance but needs quality over quantity. Mysterious aesthetic for collectors. Designed as a late-game XP accelerator.

---

## Luxe ✨
**Unlock:** Level 30 OR 300 💎

| Attribute | Value |
|-----------|-------|
| Color | Gradient gold (#fbbf24) → purple (#a855f7) |
| Personality | Fabulous, royal, extra |
| Likes | Premium, Legendary, Crafted |
| Dislikes | Common, Basic |
| Hunger Decay | Medium (1× normal) |
| Special Ability | +100% gem drops (level up, achievements, etc.) |

### Captions
| Context | Examples |
|---------|----------|
| Idle | "Luxe admires their reflection.", "Luxe poses for no one.", "Simply fabulous." |
| Positive | "Luxe approves, darling!", "Exquisite!", "Luxe blows a kiss 💋" |
| Neutral | "Luxe considers it.", "Hmm.", "Luxe shrugs elegantly" |
| Negative | "Luxe is NOT amused.", "How pedestrian.", "Luxe looks away." |

### Design Notes
Ultimate aspirational pet. Doubles gem income for endgame players. Only likes premium foods = gem sink. Flex pet for whales and dedicated players.

---

# 3. UPDATED PETS TABLE (All 8)

## Starters (Always Available)

| Pet | Emoji | Color | Personality | Likes | Dislikes | Hunger | Special |
|-----|-------|-------|-------------|-------|----------|--------|---------|
| Munchlet | 🟡 | #fbbf24 | Cheerful | Sweet, Fruit | Spicy | Medium | +10% bond growth |
| Grib | 🟢 | #4ade80 | Mischievous | Spicy, Exotic | Sweet | Fast | -20% negative reactions |
| Plompo | 🟣 | #a78bfa | Sleepy | Sweet, Gooey | Crunchy | Slow | -20% mood decay |

## Unlockable

| Pet | Emoji | Color | Unlock | Gems | Hunger | Special |
|-----|-------|-------|--------|------|--------|---------|
| Fizz | 🔵 | #3b82f6 | Lv.10 | 50 | Very Fast | +25% mini-game rewards |
| Ember | 🟠 | #f97316 | Lv.15 | 100 | Fast | 2× coins from spicy |
| Chomper | 🔴 | #ef4444 | Lv.20 | 150 | Fastest | No dislikes |
| Whisp | ⚪ | #e2e8f0 | Lv.25 | 200 | Slowest | +50% XP from rare foods |
| Luxe | ✨ | gradient | Lv.30 | 300 | Medium | +100% gem drops |

---

# 4. NEW FOODS (2 Premium)

## Dream Treat ⭐
| Attribute | Value |
|-----------|-------|
| Rarity | Epic |
| Hunger | +20 |
| Mood | +4 |
| XP | 12 |
| Cost | 75 coins |
| Description | A shimmering treat that sparkles with starlight |

### Affinity by Pet
| Pet | Affinity |
|-----|----------|
| Munchlet | Liked |
| Grib | Neutral |
| Plompo | Loved |
| Fizz | Loved |
| Ember | Neutral |
| Chomper | Liked |
| Whisp | **Loved** |
| Luxe | **Loved** |

---

## Golden Feast 👑
| Attribute | Value |
|-----------|-------|
| Rarity | **Legendary** |
| Hunger | +30 |
| Mood | +5 |
| XP | 20 |
| Cost | 150 coins |
| Description | A royal banquet fit for the most discerning pet |

### Affinity by Pet
| Pet | Affinity |
|-----|----------|
| Munchlet | Liked |
| Grib | Liked |
| Plompo | Liked |
| Fizz | Liked |
| Ember | Liked |
| Chomper | Liked |
| Whisp | **Loved** |
| Luxe | **Loved** |

---

# 5. UPDATED FOOD TABLE (All 10)

| Food | Icon | Rarity | Hunger | Mood | XP | Cost |
|------|------|--------|--------|------|-----|------|
| Apple | 🍎 | Common | +12 | +1 | 2 | 5 |
| Banana | 🍌 | Common | +10 | +1 | 2 | 5 |
| Carrot | 🥕 | Common | +8 | 0 | 1 | 5 |
| Cookie | 🍪 | Uncommon | +15 | +2 | 4 | 15 |
| Grapes | 🍇 | Uncommon | +14 | +1 | 3 | 15 |
| Spicy Taco | 🌮 | Rare | +20 | +2 | 6 | 25 |
| Hot Pepper | 🌶️ | Rare | +18 | -1 | 5 | 25 |
| Birthday Cake | 🎂 | Epic | +25 | +3 | 10 | 50 |
| Dream Treat | ⭐ | Epic | +20 | +4 | 12 | 75 |
| Golden Feast | 👑 | Legendary | +30 | +5 | 20 | 150 |

## Complete Affinity Matrix

| Food | Munchlet | Grib | Plompo | Fizz | Ember | Chomper | Whisp | Luxe |
|------|----------|------|--------|------|-------|---------|-------|------|
| Apple 🍎 | Liked | Neutral | Neutral | Neutral | Neutral | Liked | Disliked | Disliked |
| Banana 🍌 | Loved | Neutral | Liked | Liked | Neutral | Liked | Disliked | Disliked |
| Carrot 🥕 | Neutral | Liked | Neutral | Neutral | Neutral | Liked | Disliked | Disliked |
| Cookie 🍪 | Loved | Disliked | Loved | Neutral | Disliked | Liked | Neutral | Neutral |
| Grapes 🍇 | Liked | Liked | Liked | Liked | Neutral | Liked | Neutral | Neutral |
| Spicy Taco 🌮 | Disliked | Loved | Disliked | Neutral | Loved | Liked | Neutral | Neutral |
| Hot Pepper 🌶️ | Disliked | Loved | Disliked | Liked | Loved | Liked | Disliked | Disliked |
| Birthday Cake 🎂 | Loved | Neutral | Loved | Liked | Disliked | Liked | Liked | Liked |
| Dream Treat ⭐ | Liked | Neutral | Loved | Loved | Neutral | Liked | Loved | Loved |
| Golden Feast 👑 | Liked | Liked | Liked | Liked | Liked | Liked | Loved | Loved |

---

# 6. GEM ECONOMY (NEW)

## Gem Income Sources

| Source | Gems | Frequency | Notes |
|--------|------|-----------|-------|
| Level Up | +5 | Per level | Luxe: +10 |
| Mini-game Rainbow | +2 | Per achievement | Score 300+ |
| Daily Login Day 7 | +10 | Weekly | Streak reward |
| First Feed Daily | +1 | Daily | Engagement hook |
| Achievement | +5-50 | One-time | Various milestones |

## Gem Sinks

| Use | Cost | Notes |
|-----|------|-------|
| Early pet unlock | 50-300 | Skip level requirement |
| Premium cosmetics | 50-200 | Exclusive items |
| Time skip | 10-25 | Speed up timers |

## Gem Economy Balance

```
Average player earns ~15 gems/week through normal play
First unlockable pet (Fizz) costs 50 gems
Time to unlock via gems only: ~3.5 weeks
Encourages mix of grinding + spending
```

---

# 7. FTUE / ONBOARDING FLOW (UPDATED)

## 4-Screen Flow

### Screen 1: Splash
```
┌─────────────────────────────────────────┐
│                                         │
│              ✨ GRUNDY ✨               │
│                                         │
│           [Logo animates in]            │
│                                         │
│            Tap to start                 │
│                                         │
└─────────────────────────────────────────┘
```
- Logo fades in with scale animation
- Sparkle particles around title
- "Tap to start" pulses gently
- Any tap proceeds to Screen 2

### Screen 2: Story (Skippable)
```
┌─────────────────────────────────────────┐
│ [Skip]                                  │
│                                         │
│   🟡  🟢  🟣                            │
│   (floating across background)          │
│                                         │
│   "These little creatures are           │
│    always hungry..."                    │
│                                         │
│   "Feed them, play with them,           │
│    watch them grow!"                    │
│                                         │
│                         [Next →]        │
└─────────────────────────────────────────┘
```
- Pet emojis float across background
- Text fades in sequentially
- Skip button in corner
- Next button to proceed

### Screen 3: Pet Selection
```
┌─────────────────────────────────────────┐
│                                         │
│   Who do you want to care for first?    │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │   🟡    │ │   🟢    │ │   🟣    │   │
│  │Munchlet │ │  Grib   │ │ Plompo  │   │
│  │Cheerful │ │Mischiev.│ │ Sleepy  │   │
│  │♥ Sweet  │ │♥ Spicy  │ │♥ Sweet  │   │
│  │✗ Spicy  │ │✗ Sweet  │ │✗ Crunchy│   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│   You can switch between them anytime!  │
│                                         │
│            [Let's Go!]                  │
└─────────────────────────────────────────┘
```
- 3 pet cards with personality info
- Tap to select (border highlights)
- Note reassures players about switching
- Button disabled until selection made

### Screen 4: Tutorial (First Session)
```
Step 1:
┌─────────────────────────────────────────┐
│                  🟡                     │
│               Munchlet                  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🍎  🍌  🍪  🌮  →                 │  │
│  │ ↑                                 │  │
│  │ Tap a food to feed your pet!      │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Step 2 (after first feed):
┌─────────────────────────────────────────┐
│                  🟡                     │
│               "Yum! 😋"                 │
│                 +4 XP                   │
│                                         │
│   Great! See how they react?            │
│                                         │
│              [Next]                     │
└─────────────────────────────────────────┘

Step 3:
┌─────────────────────────────────────────┐
│   XP ████████░░░░░░░ 12/25              │
│   ↑                                     │
│   Keep feeding to level up              │
│   and unlock new pets!                  │
│                                         │
│              [Got it!]                  │
└─────────────────────────────────────────┘
```
- Spotlight effect on UI elements
- Arrow pointing to interactive area
- Progresses through 3 steps
- Dismissable at any point
- Marks tutorial complete in save

---

# 8. PET SPECIAL ABILITIES

## Implementation Rules

Each pet's special ability is applied automatically when that pet is active:

| Pet | Ability | Implementation |
|-----|---------|----------------|
| Munchlet | +10% bond growth | `bondGain = baseBond × 1.1` |
| Grib | -20% mood penalty from dislikes | `moodLoss = baseLoss × 0.8` |
| Plompo | -20% mood decay rate | `decayRate = baseDecay × 0.8` |
| Fizz | +25% mini-game rewards | `rewards = baseRewards × 1.25` |
| Ember | 2× coins from spicy foods | `if (food.isSpicy) coins × 2` |
| Chomper | No disliked foods | `affinity = max(affinity, 'neutral')` |
| Whisp | +50% XP from rare/epic | `if (rarity >= rare) xp × 1.5` |
| Luxe | +100% gem drops | `gems = baseGems × 2` |

## Ability Display in UI

When ability triggers, show subtle indicator:
- Icon pulse near pet
- "+25% 🎮" floating text for Fizz
- "2× 🪙" for Ember's spicy bonus
- etc.

---

# 9. SEPARATE PET STATE STORAGE

## Data Structure

```typescript
interface GameState {
  // Per-Pet State (separate for each pet)
  pets: {
    [petId: string]: {
      level: number;
      xp: number;
      bond: number;
      mood: number;
      hunger: number;
      evolutionStage: 'baby' | 'youth' | 'evolved';
    }
  };
  
  // Global State (shared across all pets)
  activePetId: string;
  unlockedPets: string[];  // ['munchlet', 'grib', 'plompo', 'fizz']
  coins: number;
  gems: number;
  inventory: Record<string, number>;
  
  // Flags
  onboardingComplete: boolean;
  tutorialComplete: boolean;
  lastLoginDate: string;
  dailyFeedingDone: boolean;
}
```

## Switching Pets

```
1. Player taps Pet Selector
2. Current pet state auto-saved
3. Player selects new pet
4. Load selected pet's state
5. UI updates to reflect new pet
6. If locked, show unlock modal instead
```

---

# 10. UPDATED FORMULAS

## XP Calculation (Updated)

```typescript
function calculateXP(food: Food, pet: Pet, mood: number): number {
  const baseXP = food.xp;
  const affinityMult = getAffinityMultiplier(food, pet);
  const moodMult = getMoodMultiplier(mood);
  
  let xp = baseXP * affinityMult * moodMult;
  
  // Whisp bonus for rare/epic foods
  if (pet.id === 'whisp' && food.rarity >= 'rare') {
    xp *= 1.5;
  }
  
  return Math.round(xp);
}
```

## Gem Calculation (New)

```typescript
function calculateGemReward(source: string, pet: Pet): number {
  const baseGems = GEM_REWARDS[source];
  
  // Luxe doubles all gem income
  if (pet.id === 'luxe') {
    return baseGems * 2;
  }
  
  return baseGems;
}

const GEM_REWARDS = {
  levelUp: 5,
  miniGameRainbow: 2,
  dailyLoginDay7: 10,
  firstFeedDaily: 1,
};
```

## Hunger Decay (Per Pet)

```typescript
const HUNGER_DECAY_MULTIPLIERS = {
  munchlet: 1.0,   // Medium
  grib: 1.25,      // Fast
  plompo: 0.75,    // Slow
  fizz: 1.5,       // Very Fast
  ember: 1.25,     // Fast
  chomper: 2.0,    // Fastest
  whisp: 0.5,      // Slowest
  luxe: 1.0,       // Medium
};
```

---

# 11. DEVELOPMENT TICKETS (Web Prototype)

## New Milestone: M6-ONBOARDING

| ID | Task | Priority | Status |
|----|------|----------|--------|
| WEB-023 | Welcome flow (splash, story, pet pick) | P0 | Todo |
| WEB-024 | Pet selector with unlock system | P0 | Todo |
| WEB-025 | Separate pet state storage | P0 | Todo |
| WEB-026 | Gem unlock purchase flow | P1 | Todo |
| WEB-027 | 5 new pet definitions | P0 | Todo |
| WEB-028 | 2 new foods (Dream Treat, Golden Feast) | P1 | Todo |
| WEB-029 | Pet unlock celebration modal | P2 | Todo |
| WEB-030 | Pet special abilities | P1 | Todo |
| WEB-031 | Gem income system | P1 | Todo |
| WEB-032 | First session tutorial | P1 | Todo |

## Updated Critical Path

```
WEB-023 (Welcome) → WEB-032 (Tutorial) → WEB-024 (Pet Selector) → 
WEB-025 (Separate State) → WEB-027 (New Pets) → WEB-030 (Abilities) → 
WEB-031 (Gems) → WEB-015 (Main App)
```

---

# 12. MONETIZATION HOOKS (Updated)

## Pet Unlock Monetization

| Strategy | Implementation |
|----------|----------------|
| Grind vs. Pay | Players can level up OR buy gems |
| Escalating prices | 50 → 100 → 150 → 200 → 300 gems |
| Gem packs | $0.99 = 50, $4.99 = 300, $9.99 = 700 |
| Starter pack | $2.99 = 100 gems + Fizz unlock |

## Designed Friction Points

1. **Fizz at Level 10** — First unlock, low barrier
2. **Ember at Level 15** — Mid-game goal, spicy synergy
3. **Chomper at Level 20** — Inventory burner, appeals to hoarders
4. **Whisp at Level 25** — XP accelerator for late game
5. **Luxe at Level 30** — Aspirational, doubles gem income

## Retention Hooks

- Daily gem (+1 for first feed)
- Weekly gem bonus (Day 7 = +10)
- Pet variety encourages replay
- Special abilities create playstyle diversity

---

# APPENDIX A: QUICK REFERENCE CARD

## Pets at a Glance

| Pet | 🎨 | Unlock | Special |
|-----|-----|--------|---------|
| Munchlet | 🟡 | Starter | +10% bond |
| Grib | 🟢 | Starter | -20% mood penalty |
| Plompo | 🟣 | Starter | -20% mood decay |
| Fizz | 🔵 | Lv.10/50💎 | +25% mini-games |
| Ember | 🟠 | Lv.15/100💎 | 2× spicy coins |
| Chomper | 🔴 | Lv.20/150💎 | No dislikes |
| Whisp | ⚪ | Lv.25/200💎 | +50% rare XP |
| Luxe | ✨ | Lv.30/300💎 | +100% gems |

## Foods at a Glance

| Food | Cost | XP | Best For |
|------|------|-----|----------|
| Apple 🍎 | 5 | 2 | Chomper |
| Banana 🍌 | 5 | 2 | Munchlet |
| Carrot 🥕 | 5 | 1 | Grib |
| Cookie 🍪 | 15 | 4 | Munchlet, Plompo |
| Grapes 🍇 | 15 | 3 | Everyone |
| Spicy Taco 🌮 | 25 | 6 | Grib, Ember |
| Hot Pepper 🌶️ | 25 | 5 | Grib, Ember |
| Birthday Cake 🎂 | 50 | 10 | Munchlet, Plompo |
| Dream Treat ⭐ | 75 | 12 | Whisp, Luxe |
| Golden Feast 👑 | 150 | 20 | Whisp, Luxe |

---

# 13. NAVIGATION & MENU SYSTEM (NEW)

## Main Menu

A persistent menu button provides access to all game features and settings.

### Menu Button
- Icon: Hamburger (☰) or Gear (⚙️)
- Position: Top-left or top-right corner
- Always visible during gameplay
- Tap to open menu overlay

### Menu Layout
```
┌─────────────────────────────────────────┐
│  ☰  MENU                          [X]  │
├─────────────────────────────────────────┤
│                                         │
│   🐾  Switch Pet                        │
│                                         │
│   🛒  Shop                              │
│                                         │
│   🎮  Mini-Games                        │
│                                         │
│   ⚙️  Settings                          │
│                                         │
│   🏠  Home                              │
│                                         │
└─────────────────────────────────────────┘
```

### Menu Options

| Option | Action |
|--------|--------|
| Switch Pet | Opens Pet Selector (all 8 pets) |
| Shop | Opens Shop modal |
| Mini-Games | Opens Mini-game Hub |
| Settings | Sound, notifications, reset |
| Home | Return to welcome screen |

## Warning Modals

### Return to Home
```
┌─────────────────────────────────────────┐
│         Return to Home?                 │
├─────────────────────────────────────────┤
│                                         │
│   Your progress is auto-saved.          │
│   You can continue anytime!             │
│                                         │
│      [Stay]         [Go Home]           │
└─────────────────────────────────────────┘
```
- Progress auto-saves to localStorage
- "Go Home" returns to splash screen
- Player can re-enter game with all progress intact

### Reset Progress (in Settings)
```
┌─────────────────────────────────────────┐
│      ⚠️ Reset ALL Progress?             │
├─────────────────────────────────────────┤
│                                         │
│   This will delete ALL pets, items,     │
│   and progress!                         │
│                                         │
│   This cannot be undone!                │
│                                         │
│      [Cancel]        [Reset]            │
└─────────────────────────────────────────┘
```
- Destructive action requires confirmation
- Red warning styling
- Clears localStorage completely
- Returns to first-time welcome flow

## Navigation Flow

```
┌──────────────┐
│    Home      │ ←────────────────────────┐
│   (Splash)   │                          │
└──────┬───────┘                          │
       ↓                                  │
┌──────────────┐                          │
│    Story     │                          │
└──────┬───────┘                          │
       ↓                                  │
┌──────────────┐                          │
│  Pet Picker  │                          │
└──────┬───────┘                          │
       ↓                                  │
┌──────────────┐     ┌──────────────┐     │
│   Tutorial   │────→│   Gameplay   │─────┤
└──────────────┘     │    (Main)    │     │
                     └──────┬───────┘     │
                            │             │
                     ┌──────┴───────┐     │
                     │  ☰ Menu      │     │
                     ├──────────────┤     │
                     │ Switch Pet   │     │
                     │ Shop         │     │
                     │ Mini-Games   │     │
                     │ Settings     │     │
                     │ Home ────────┼─────┘
                     └──────────────┘
```

---

# 14. BUILD STATUS

## Web Prototype Complete ✅

**Date:** December 6, 2024

### Tickets Completed: 35/35

| Milestone | Tickets | Status |
|-----------|---------|--------|
| M1-DATA | 4 | ✅ Complete |
| M2-SYSTEMS | 7 | ✅ Complete |
| M3-UI | 8 | ✅ Complete |
| M4-MINIGAMES | 2 | ✅ Complete |
| M5-POLISH | 4 | ✅ Complete |
| M6-ONBOARDING | 10 | ✅ Complete |

### Fuzzy Testing: 21/21 PASS

| Category | Tests | Result |
|----------|-------|--------|
| Rapid Input | 3 | ✅ PASS |
| Boundary | 6 | ✅ PASS |
| Invalid State | 3 | ✅ PASS |
| Sequence | 3 | ✅ PASS |
| Persistence | 3 | ✅ PASS |
| Stress | 3 | ✅ PASS |

### Code Quality Verified

- ✅ Inventory guards (can't feed with 0 food)
- ✅ Currency guards (can't overspend)
- ✅ Stat boundaries (0-100 capped)
- ✅ Persistence (localStorage saves)
- ✅ State isolation (per-pet stats)

### Features Implemented

- ✅ 8 pets (3 starters + 5 unlockable)
- ✅ 10 foods with affinity system
- ✅ Pet unlock system with gem skip
- ✅ Pet special abilities
- ✅ Onboarding flow (splash, story, pet pick)
- ✅ Tutorial system
- ✅ Main menu navigation
- ✅ Shop system
- ✅ Snack Catch mini-game
- ✅ Dev panel for testing
- ✅ Visual FX (particles, floating text, confetti)
- ✅ Gem economy

---

**END OF v4.0 ADDENDUM**

*This document should be merged with GRUNDY_GAME_BIBLE_v3.md for complete reference.*
