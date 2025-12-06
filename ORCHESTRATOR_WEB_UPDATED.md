# GRUNDY WEB ORCHESTRATOR — React/TypeScript Agent Coordination v1.1

**Purpose:** Coordinate AI agents to build the Grundy web prototype systematically.
**Version:** 1.1 (Master Decisions Aligned)

---

> **⚠️ CRITICAL: This document has been updated to align with GRUNDY_MASTER_DECISIONS.md**
>
> | Decision | Implementation |
> |----------|----------------|
> | #2 Hidden Stats | Only Bond hearts visible (♥♥♥♡♡). Pet behavior shows needs. |
> | #3 Daily Moments | Morning/Afternoon/Evening bonuses (+50% bond / +25% XP) |
> | #6 Pet Unlocks | Achievement-based: Fizz=Bond Lv5, Ember=10 mini-games |
> | #7 Activity Backgrounds | Kitchen/Bedroom/Playroom/Living room auto-switch |
> | #10 Preference Discovery | Hidden, learn by feeding, hints after Day 7, Journal at Bond 3 |
> | #12 Fullness | Hidden stat with 30-min visible cooldown. Behavioral indicators. |
> | #13 Conservative Rewards | Bronze: 3c, Silver: 7c, Gold: 15c, Rainbow: 22c + 1 gem |
> | #14 No Death | Runaway system (48h lockout, 25 gems, -50% bond). NO permadeath. |

---

## ORCHESTRATION PROTOCOL

```
1. CLARIFY  → Restate objective in testable terms
2. PLAN     → Decompose into subtasks with dependencies  
3. EXECUTE  → Run subtasks, capture outputs
4. VALIDATE → Test against spec AND Master Decisions
5. REPORT   → Return deliverable + notes
```

---

## AGENT REGISTRY

| Agent ID | Role | Use For |
|----------|------|---------|
| `react_developer` | Component/hook implementation | UI, state, interactions |
| `game_designer` | Balance tuning, formula validation | XP curves, economy |
| `test_engineer` | Test writing, validation | Vitest, coverage |
| `data_engineer` | Spec→TypeScript conversion | Types, data files |

---

## CORE GAME DATA (From Spec + Master Decisions)

### Pet Unlock System (MASTER DECISION #6)

```yaml
Progression:
  - All 3 STARTERS are always available (Munchlet, Grib, Plompo)
  - Player picks which starter to play FIRST
  - Can switch between starters anytime
  - Each pet has separate: Level, XP, Bond, Fullness (hidden)
  - Shared across all pets: Coins, Gems, Food Inventory
  - Pets 4-8 unlock via ACHIEVEMENTS or PURCHASE (NOT gem purchase for earnable pets)
  - Unlocks are permanent (account-wide)

Unlock Methods:
  FREE (3 starters):
    - Munchlet, Grib, Plompo
  
  EARNABLE (2 pets):
    - Fizz: Bond Level 5 with any pet
    - Ember: Complete 10 mini-games (any combination)
  
  PREMIUM (3 pets):
    - Chomper: Grundy Plus OR $1.99 OR late achievement
    - Whisp: Grundy Plus OR $2.49 OR late achievement
    - Luxe: Grundy Plus OR $2.99 OR late achievement

Monetization:
  - NO gem purchase for Fizz/Ember (achievement-based only)
  - Gems come from: Level ups (+5), Mini-games (Rainbow only), Daily login, IAP
```

### Hidden Stats System (MASTER DECISION #2)

```yaml
Visible:
  - Bond: Hearts display (♥♥♥♡♡)
  - Level: Number badge
  - Cooldown Timer: 30-min after feeding

Hidden (shown via behavior):
  - Fullness: Pet animations show hungry/satisfied/stuffed
  - Mood: Pet expressions and animations
  - Energy: (mini-games only)
  - Hunger: REMOVED — replaced by Fullness

UI Philosophy:
  - NO stat bars (except Bond hearts)
  - Pet behavior IS the UI
  - Thought bubbles show needs (🍎❓ = hungry, 😌 = satisfied)
```

### Fullness System (MASTER DECISION #12)

```yaml
States (hidden from player):
  HUNGRY:     0-20   → Begs, 🍎❓ bubble, 100% feed value
  PECKISH:    21-40  → Glances at food, 75% feed value
  CONTENT:    41-70  → Happy idle, 50% feed value
  SATISFIED:  71-90  → Shakes head, 😌 bubble, 25% feed value
  STUFFED:    91-100 → Turns away, 🙅 bubble, 0% (blocked)

Cooldown:
  - 30 minutes visible timer after feeding
  - Feeding during cooldown = 25% feed value
  - Timer shows when pet can be fed again effectively
```

### Daily Moments System (MASTER DECISION #3)

```yaml
Time Windows:
  MORNING:    7:00 AM - 10:00 AM  → 🌅 indicator, +50% bond
  AFTERNOON:  12:00 PM - 2:00 PM  → ☀️ indicator, +25% XP
  EVENING:    6:00 PM - 9:00 PM   → 🌙 indicator, +50% bond

Implementation:
  - Check device local time
  - Show indicator during active window
  - Apply bonus multiplier to feeding/activities
  - Sound chime when moment starts (if app open)
```

### Runaway System (MASTER DECISION #14 — NO DEATH)

```yaml
Classic Mode Only:
  Neglect Path:
    1. SAD: Pet looks down, needs attention
    2. SICK: Pet has symptoms, needs care
    3. WARNING: Pet looks at exit, 💭 bubble shows door
    4. RUNAWAY: Pet leaves (48h lockout)
  
  Return Options:
    - Wait 48 hours: Pet returns automatically, bond -50%
    - Pay 25 gems: Pet returns immediately, bond -50%
  
  CRITICAL:
    - NO permadeath — pet ALWAYS returns
    - Corruption (survivor variant) is healable with 30 days good care
    - Cozy Mode: No runaway, no sickness, no consequences

Cozy Mode:
  - Default mode
  - Pet cannot run away
  - Pet cannot get sick
  - Overfeed warning only (no penalty)
```

### Pets (8 Total)

#### Starters (Choose 1)

| Pet | Emoji | Personality | Likes | Dislikes | Fullness Decay | Special |
|-----|-------|-------------|-------|----------|----------------|---------|
| Munchlet | 🟡 | Cheerful | Sweets, Fruits | Spicy | Medium | +10% bond growth, mood swings faster |
| Grib | 🟢 | Mischievous | Spicy, Exotic | Sweets | Fast | -20% negative reactions, spicy mood boost |
| Plompo | 🟣 | Sleepy | Sweets, Gooey | Crunchy | Slow | Faster energy regen, slower mood decay |

#### Unlockable Pets (UPDATED — Master Decision #6)

| Pet | Emoji | Unlock Method | Personality | Likes | Dislikes | Fullness Decay | Special |
|-----|-------|---------------|-------------|-------|----------|----------------|---------|
| Fizz | 🔵 | Bond Level 5 | Hyper, bubbly | Sour, Fizzy, Cold | Bland, Dry | Very Fast | +25% mini-game COINS |
| Ember | 🟠 | 10 Mini-games | Fierce, proud | Spicy, Hot, Smoky | Sweet, Cold | Fast | 2× coins from spicy foods |
| Chomper | 🔴 | Premium | Hungry, goofy | EVERYTHING | None | Fastest | No dislikes, needs 2× feeding |
| Whisp | ⚪ | Premium | Mysterious, ethereal | Dream, Magical, Rare | Common, Basic | Slowest | +50% XP from rare/epic foods |
| Luxe | ✨ | Premium | Royal, fabulous | Premium, Legendary | Common, Basic | Medium | +100% gem drops |

### Foods (10 Total)

| Food | Icon | Rarity | Fullness | Mood | XP | Cost | Munchlet | Grib | Plompo | Fizz | Ember | Chomper | Whisp | Luxe |
|------|------|--------|----------|------|-----|------|----------|------|--------|------|-------|---------|-------|------|
| Apple | 🍎 | Common | +12 | +1 | 2 | 5 | Liked | Neutral | Neutral | Neutral | Neutral | Liked | Disliked | Disliked |
| Banana | 🍌 | Common | +10 | +1 | 2 | 5 | Loved | Neutral | Liked | Liked | Neutral | Liked | Disliked | Disliked |
| Carrot | 🥕 | Common | +8 | 0 | 1 | 5 | Neutral | Liked | Neutral | Neutral | Neutral | Liked | Disliked | Disliked |
| Cookie | 🍪 | Uncommon | +15 | +2 | 4 | 15 | Loved | Disliked | Loved | Neutral | Disliked | Liked | Neutral | Neutral |
| Grapes | 🍇 | Uncommon | +14 | +1 | 3 | 15 | Liked | Liked | Liked | Liked | Neutral | Liked | Neutral | Neutral |
| Spicy Taco | 🌮 | Rare | +20 | +2 | 6 | 25 | Disliked | Loved | Disliked | Neutral | Loved | Liked | Neutral | Neutral |
| Hot Pepper | 🌶️ | Rare | +18 | -1 | 5 | 25 | Disliked | Loved | Disliked | Liked | Loved | Liked | Disliked | Disliked |
| Birthday Cake | 🎂 | Epic | +25 | +3 | 10 | 50 | Loved | Neutral | Loved | Liked | Disliked | Liked | Liked | Liked |
| Dream Treat | ⭐ | Epic | +20 | +4 | 12 | 75 | Liked | Neutral | Loved | Loved | Neutral | Liked | Loved | Loved |
| Golden Feast | 👑 | Legendary | +30 | +5 | 20 | 150 | Liked | Liked | Liked | Liked | Liked | Liked | Loved | Loved |

### Affinity Multipliers

| Affinity | XP Multiplier |
|----------|---------------|
| Loved | 2.0× |
| Liked | 1.5× |
| Neutral | 1.0× |
| Disliked | 0.5× |

### Mood System (HIDDEN — shown via behavior)

| Range | Tier | Behavior | Animation | XP Multiplier |
|-------|------|----------|-----------|---------------|
| 0-19 | 1 | Miserable | Droopy, slow | 0.5× |
| 20-39 | 2 | Unhappy | Fidgeting | 0.75× |
| 40-59 | 3 | Content | Normal idle | 1.0× |
| 60-84 | 4 | Happy | Bouncy, bright | 1.25× |
| 85-100 | 5 | Joyful | Dancing, glowing | 1.5× |

### Growth Stages

| Stage | Levels | Scale | Animation Speed |
|-------|--------|-------|-----------------|
| Baby | 1-6 | 1.0 | 0.85× |
| Youth | 7-12 | 1.12 | 1.0× |
| Evolved | 13-20 | 1.25 | 1.15× |

### XP Formula

```typescript
// XP required to reach level L
function xpForLevel(level: number): number {
  return Math.round(20 + (level * level * 1.4));
}
```

### Mini-Games

| Game | Type | Unlock | Duration | Controls |
|------|------|--------|----------|----------|
| Snack Catch | Reflex | Level 2 | 45-90s | Drag horizontal |
| Memory Match | Memory | Level 4 | Varies | Tap cards |
| Rhythm Tap | Music | Level 6 | 30-60s | 4 lane taps |
| Poop Scoop | Action | Level 8 | 60s | Tap to clean |

### Mini-Game Rewards (CONSERVATIVE — Master Decision #13)

| Tier | Score Range | Coins | Gems | Bond | Happiness |
|------|-------------|-------|------|------|-----------|
| Bronze | 0-99 | 3 | 0 | +0.3 | +5 |
| Silver | 100-199 | 7 | 0 | +0.3 | +5 |
| Gold | 200-299 | 15 | 0 | +0.3 | +5 |
| Rainbow | 300+ | 22 | 1 | +0.3 | +5 |

**Note:** Fizz gets +25% COINS only (not gems, not bond).

---

## SUBTASK FORMAT

```yaml
subtask:
  id: unique_id
  goal: what to accomplish
  agent: react_developer | game_designer | test_engineer | data_engineer
  inputs:
    - name: input_name
      source: spec | previous_task | user | master_decisions
  outputs:
    - format: tsx | ts | test | data
      path: src/path/to/file
  success_criteria:
    - Testable condition 1
    - Testable condition 2
    - Master Decision alignment verified
  on_failure: retry | escalate | skip
```

---

## MILESTONE 0: ALIGNMENT FIXES (M0-WEB) — DO FIRST

**Goal:** Align existing code with Master Decisions before proceeding.

### M0.1 - Remove Death, Add Runaway

```yaml
subtask:
  id: m0_runaway
  goal: Replace death system with runaway (Master Decision #14)
  agent: react_developer
  outputs:
    - path: src/game/RunawaySystem.ts
    - path: src/components/RunawayScreen.tsx
  success_criteria:
    - NO death mechanic anywhere
    - Runaway triggers after neglect path (Classic mode only)
    - 48h lockout timer
    - 25 gem early return option
    - Bond -50% on return
    - Pet ALWAYS returns
```

### M0.2 - Hide Stats, Add Behavior Indicators

```yaml
subtask:
  id: m0_hidden_stats
  goal: Hide stats, show via behavior (Master Decision #2)
  agent: react_developer
  outputs:
    - path: src/components/BondHearts.tsx
    - path: src/components/BehaviorIndicator.tsx
  success_criteria:
    - ONLY Bond hearts visible (♥♥♥♡♡)
    - NO hunger/mood/energy stat bars
    - Pet animations show fullness state
    - Pet expressions show mood state
    - Thought bubbles show needs
```

### M0.3 - Hunger → Fullness System

```yaml
subtask:
  id: m0_fullness
  goal: Replace Hunger with Fullness (Master Decision #12)
  agent: react_developer
  outputs:
    - path: src/game/FullnessSystem.ts
    - path: src/components/CooldownTimer.tsx
  success_criteria:
    - Fullness stat (hidden) replaces Hunger
    - 5 states: hungry/peckish/content/satisfied/stuffed
    - Feed value scales with state (100%/75%/50%/25%/0%)
    - 30-min cooldown timer visible after feeding
    - Stuffed blocks feeding entirely
```

### M0.4 - Daily Moments

```yaml
subtask:
  id: m0_daily_moments
  goal: Add Daily Moments system (Master Decision #3)
  agent: react_developer
  outputs:
    - path: src/game/DailyMoments.ts
    - path: src/components/DailyMomentIndicator.tsx
  success_criteria:
    - Morning (7-10 AM): +50% bond
    - Afternoon (12-2 PM): +25% XP
    - Evening (6-9 PM): +50% bond
    - Visual indicator during active window
    - Bonus applied to feeding/activities
```

### M0.5 - Conservative Rewards

```yaml
subtask:
  id: m0_conservative_rewards
  goal: Update mini-game rewards (Master Decision #13)
  agent: react_developer
  outputs:
    - path: src/game/MiniGameRewards.ts
  success_criteria:
    - Bronze: 3 coins, 0 gems
    - Silver: 7 coins, 0 gems
    - Gold: 15 coins, 0 gems
    - Rainbow: 22 coins, 1 gem
    - Fizz: +25% COINS only
    - Per-game: +0.3 bond, +7 happiness
```

### M0.6 - Achievement Unlocks

```yaml
subtask:
  id: m0_achievement_unlocks
  goal: Update pet unlocks (Master Decision #6)
  agent: react_developer
  outputs:
    - path: src/game/AchievementSystem.ts
    - path: src/game/PetUnlockSystem.ts
  success_criteria:
    - Fizz: Bond Level 5 (NOT gem purchase)
    - Ember: 10 mini-games completed (NOT gem purchase)
    - Premium pets: separate purchase flow
    - Track bond level for Fizz unlock
    - Track mini-game count for Ember unlock
```

---

## MILESTONE 1: CORE DATA (M1-WEB)

**Goal:** Complete TypeScript data layer matching spec exactly.

### M1.1 - Types

```yaml
subtask:
  id: m1_types
  goal: Define all TypeScript interfaces matching spec + Master Decisions
  agent: data_engineer
  outputs:
    - path: src/types/index.ts
  success_criteria:
    - All pet properties defined
    - All food properties defined  
    - FullnessState enum: hungry/peckish/content/satisfied/stuffed
    - Affinity enum: Loved, Liked, Neutral, Disliked
    - DailyMoment type: morning/afternoon/evening
    - RunawayState type for Classic mode
```

### M1.2 - Pet Data

```yaml
subtask:
  id: m1_pets
  goal: Create pet definitions from spec
  agent: data_engineer
  inputs:
    - name: pet_table
      source: spec (see CORE GAME DATA above)
  outputs:
    - path: src/data/pets.ts
  success_criteria:
    - Munchlet: yellow, cheerful, likes sweets/fruits, hates spicy
    - Grib: green, mischievous, likes spicy/exotic, hates sweets
    - Plompo: purple, sleepy, likes sweets/gooey, hates crunchy
    - Pet-specific modifiers included
    - Unlock methods: starters free, Fizz=Bond Lv5, Ember=10 games
```

### M1.3 - Food Data

```yaml
subtask:
  id: m1_foods
  goal: Create food definitions from spec
  agent: data_engineer
  inputs:
    - name: food_table
      source: spec (10 foods)
  outputs:
    - path: src/data/foods.ts
  success_criteria:
    - All 10 foods with correct fullness/mood/XP values
    - Affinity per pet matches spec exactly
    - Rarity and cost correct
```

### M1.4 - Game Config

```yaml
subtask:
  id: m1_config
  goal: Create game configuration constants
  agent: data_engineer
  outputs:
    - path: src/data/config.ts
  success_criteria:
    - XP formula: 20 + (L² × 1.4)
    - Mood tiers with correct ranges and multipliers
    - Affinity multipliers: 2.0, 1.5, 1.0, 0.5
    - Growth stages with level thresholds
    - Fullness states and feed value multipliers
    - Daily Moment time windows
    - Conservative reward values
```

---

## MILESTONE 2: GAME SYSTEMS (M2-WEB)

**Goal:** Implement core game logic as pure functions.

### M2.1 - Feeding System

```yaml
subtask:
  id: m2_feeding
  goal: Implement feeding calculation logic with Fullness
  agent: react_developer
  outputs:
    - path: src/game/FeedingSystem.ts
  success_criteria:
    - calculateReaction(petId, food) returns correct affinity
    - calculateXP applies mood × affinity × Daily Moment multipliers
    - calculateMoodChange based on food.mood and affinity
    - calculateFullnessRestore uses food.fullness × state multiplier
    - Stuffed state blocks feeding
    - 30-min cooldown tracking
```

### M2.2 - Pet System

```yaml
subtask:
  id: m2_pet
  goal: Implement pet state management
  agent: react_developer
  outputs:
    - path: src/game/PetSystem.ts
  success_criteria:
    - addXP handles level up correctly
    - Level up at XP threshold per formula
    - Evolution at level 7 (youth), 13 (evolved)
    - Fullness decay: configurable per pet (NOT hunger)
    - Mood decay over time
    - Bond level tracking (for Fizz unlock)
```

### M2.3 - Economy System

```yaml
subtask:
  id: m2_economy
  goal: Implement currency operations
  agent: react_developer
  outputs:
    - path: src/game/EconomySystem.ts
  success_criteria:
    - addCoins/spendCoins with validation
    - canAfford check before purchase
    - Level up rewards: +50 coins per level
    - Conservative mini-game rewards integrated
```

### M2.4 - State Store

```yaml
subtask:
  id: m2_store
  goal: Create Zustand store with persistence
  agent: react_developer
  outputs:
    - path: src/game/store.ts
  success_criteria:
    - Pet state, currencies, inventory tracked
    - Fullness state per pet (hidden from UI)
    - feed() action integrates all systems
    - buyFood() action works
    - Achievement tracking (bond level, mini-game count)
    - localStorage persistence via zustand/persist
```

---

## MILESTONE 3: UI COMPONENTS (M3-WEB)

**Goal:** Build React components for core gameplay.

### M3.1 - Pet Display

```yaml
subtask:
  id: m3_pet_display
  goal: Create pet display component with behavior indicators
  agent: react_developer
  outputs:
    - path: src/components/Pet.tsx
  success_criteria:
    - Shows pet with behavior-based animations
    - Fullness state affects animation (begging, satisfied, turning away)
    - Mood state affects expression
    - Displays level badge
    - Shows evolution stage indicator
    - Animates on feeding (bounce/scale)
    - Thought bubbles for needs (🍎❓, 😌, 🙅)
```

### M3.2 - Bond Hearts Display

```yaml
subtask:
  id: m3_bond_hearts
  goal: Create bond hearts as ONLY visible stat
  agent: react_developer
  outputs:
    - path: src/components/BondHearts.tsx
  success_criteria:
    - Shows 5 hearts (♥♥♥♡♡ style)
    - Filled hearts = bond level
    - NO other stat bars
    - Smooth fill animation on bond change
```

### M3.3 - Food Bag

```yaml
subtask:
  id: m3_food_bag
  goal: Create food inventory UI
  agent: react_developer
  outputs:
    - path: src/components/FoodBag.tsx
    - path: src/components/FoodItem.tsx
  success_criteria:
    - Grid of food items with counts
    - Tap to feed interaction
    - Disabled state when count = 0
    - Disabled when pet is stuffed
    - Rarity color coding
```

### M3.4 - Reaction Display

```yaml
subtask:
  id: m3_reaction
  goal: Show feeding reaction feedback
  agent: react_developer
  outputs:
    - path: src/components/ReactionDisplay.tsx
  success_criteria:
    - Loved: 🤩 yellow, "LOVES IT!"
    - Liked: 😋 green, "Yummy!"
    - Neutral: 😊 blue, "Nom!"
    - Disliked: 😖 red, "Yuck..."
    - Shows XP gained
    - Shows Daily Moment bonus if active
    - Animate in/out
```

### M3.5 - Shop Modal

```yaml
subtask:
  id: m3_shop
  goal: Create food shop interface
  agent: react_developer
  outputs:
    - path: src/components/Shop.tsx
  success_criteria:
    - Lists all purchasable foods
    - Shows cost and owned count
    - Disabled if can't afford
    - Updates inventory on purchase
```

### M3.6 - Level Up Modal

```yaml
subtask:
  id: m3_levelup
  goal: Celebrate level up events
  agent: react_developer
  outputs:
    - path: src/components/LevelUpModal.tsx
  success_criteria:
    - Shows new level prominently
    - Displays rewards (+50 coins)
    - Evolution announcement if applicable
    - Achievement unlock announcements (Fizz at Bond Lv5)
    - Dismiss button
```

### M3.7 - Cooldown Timer

```yaml
subtask:
  id: m3_cooldown
  goal: Show feeding cooldown timer
  agent: react_developer
  outputs:
    - path: src/components/CooldownTimer.tsx
  success_criteria:
    - Shows 30-min countdown after feeding
    - Indicates when pet can be fed effectively again
    - Non-intrusive placement
    - Hides when cooldown expires
```

### M3.8 - Daily Moment Indicator

```yaml
subtask:
  id: m3_daily_moment
  goal: Show active Daily Moment
  agent: react_developer
  outputs:
    - path: src/components/DailyMomentIndicator.tsx
  success_criteria:
    - Shows 🌅 (morning), ☀️ (afternoon), or 🌙 (evening)
    - Only visible during active time window
    - Shows bonus type (+50% bond or +25% XP)
    - Subtle animation
```

---

## MILESTONE 4: MINI-GAMES (M4-WEB)

**Goal:** Implement mini-games with conservative rewards.

### M4.1 - Snack Catch

```yaml
subtask:
  id: m4_snack_catch
  goal: Build catch-the-food mini-game with conservative rewards
  agent: react_developer
  outputs:
    - path: src/components/games/SnackCatch.tsx
  success_criteria:
    - Foods fall from top
    - Basket moves with touch/mouse drag
    - Good food: +10 points
    - Favorite food: +20 points
    - Bad food: -15 points
    - Combo bonus: +2 per streak (max +10)
    - 60 second timer
    - Score tiers: Bronze/Silver/Gold/Rainbow
    - CONSERVATIVE REWARDS (3/7/15/22 coins)
    - Track game completion for Ember unlock
```

### M4.2 - Mini-Game Hub

```yaml
subtask:
  id: m4_hub
  goal: Create mini-game selection screen
  agent: react_developer
  outputs:
    - path: src/components/MiniGameHub.tsx
  success_criteria:
    - Lists available games
    - Shows unlock requirements
    - Shows energy (50 max, 10 per game)
    - Shows Ember unlock progress (X/10 games)
    - Launch selected game
```

---

## MILESTONE 5: POLISH (M5-WEB)

### M5.1 - Runaway Screen (Classic Mode)

```yaml
subtask:
  id: m5_runaway
  goal: Create runaway/return screen
  agent: react_developer
  outputs:
    - path: src/components/RunawayScreen.tsx
  success_criteria:
    - Shows sad departure scene
    - 48h countdown timer
    - "Pay 25 gems to apologize" button
    - Pet returns with bond -50%
    - NO death — pet ALWAYS returns
```

### M5.2 - Dev Panel

```yaml
subtask:
  id: m5_devpanel
  goal: Create balance testing overlay
  agent: react_developer
  outputs:
    - path: src/components/DevPanel.tsx
  success_criteria:
    - Add/remove coins
    - Set pet level
    - Set mood (hidden, for testing)
    - Set fullness state
    - Add foods
    - Trigger Daily Moments
    - Trigger runaway (Classic mode)
    - Toggle via keyboard shortcut
```

---

## EXECUTION PLAN

```
PHASE 0: ALIGNMENT (M0-WEB) ← DO FIRST
├── M0.1 Runaway (no death)
├── M0.2 Hidden Stats
├── M0.3 Fullness System
├── M0.4 Daily Moments
├── M0.5 Conservative Rewards
└── M0.6 Achievement Unlocks

PHASE 1: DATA (M1-WEB)
├── M1.1 Types (with new types)
├── M1.2 Pets (with unlock methods)
├── M1.3 Foods
└── M1.4 Config (with new constants)

PHASE 2: SYSTEMS (M2-WEB)
├── M2.1 Feeding (with Fullness)
├── M2.2 Pet
├── M2.3 Economy
└── M2.4 Store

PHASE 3: UI (M3-WEB)
├── M3.1 Pet Display (behavior indicators)
├── M3.2 Bond Hearts (ONLY visible stat)
├── M3.3 Food Bag
├── M3.4 Reaction
├── M3.5 Shop
├── M3.6 Level Up
├── M3.7 Cooldown Timer
└── M3.8 Daily Moment Indicator

PHASE 4: MINI-GAMES (M4-WEB)
├── M4.1 Snack Catch (conservative rewards)
└── M4.2 Hub (energy, Ember progress)

PHASE 5: POLISH (M5-WEB)
├── M5.1 Runaway Screen
└── M5.2 Dev Panel
```

---

## VALIDATION CHECKLIST

Before marking milestone complete:

### Master Decisions Alignment
- [ ] NO death mechanic — runaway only (Classic mode)
- [ ] Hidden stats — only Bond hearts visible
- [ ] Fullness system — NOT hunger
- [ ] Daily Moments — time-based bonuses
- [ ] Conservative rewards — 3/7/15/22 coins
- [ ] Achievement unlocks — Fizz=Bond Lv5, Ember=10 games

### Data Layer
- [ ] Types match spec + Master Decisions
- [ ] All 3 starter pets defined with correct attributes
- [ ] All 10 foods with correct affinity per pet
- [ ] XP formula matches: 20 + (L² × 1.4)
- [ ] Fullness states defined (5 states)
- [ ] Daily Moment time windows defined

### Game Logic
- [ ] Feeding applies correct multipliers
- [ ] Fullness state affects feed value
- [ ] Level up triggers at right XP
- [ ] Evolution at levels 7 and 13
- [ ] Mood decay works (hidden)
- [ ] Fullness decay works (hidden)
- [ ] Daily Moment bonuses apply
- [ ] Bond level tracked for Fizz unlock
- [ ] Mini-game count tracked for Ember unlock

### UI
- [ ] Pet displays with behavior-based animations
- [ ] ONLY Bond hearts visible (no other stat bars)
- [ ] Reactions show correct feedback
- [ ] Shop prevents overspending
- [ ] Cooldown timer shows after feeding
- [ ] Daily Moment indicator works

### Mini-Games
- [ ] Snack Catch scoring matches spec
- [ ] Rewards match conservative tier table (3/7/15/22)
- [ ] Energy system works (50 max, 10 per game)
- [ ] Ember unlock progress tracked

### Classic Mode (if enabled)
- [ ] Runaway triggers after neglect path
- [ ] 48h lockout works
- [ ] 25 gem early return works
- [ ] Bond -50% on return
- [ ] NO permadeath

---

## ERROR HANDLING

| Error | Action |
|-------|--------|
| Type mismatch | Check against spec table |
| Wrong multiplier | Re-read affinity table |
| Missing pet modifier | Add per-pet special rules |
| UI not updating | Check store subscription |
| Death mechanic found | REMOVE — use runaway instead |
| Visible stat bars | REMOVE — only Bond hearts allowed |
| High rewards | CHECK — must be 3/7/15/22 coins |
| Gem unlock for Fizz/Ember | REMOVE — achievement-based only |

---

## COMMANDS

```
/plan {goal}      → Generate task breakdown
/execute {task}   → Implement specific task
/validate {file}  → Check against spec + Master Decisions
/next             → Execute next task in queue
/align            → Check Master Decisions compliance
```

---

**VERSION:** 1.1 (Master Decisions Aligned)  
**STATUS:** Ready for systematic development

---

## Changelog (v1.1)

| Change | Before | After |
|--------|--------|-------|
| Pet unlock | Level OR gems | Achievement-based (Fizz=Bond Lv5, Ember=10 games) |
| Stats display | Visible bars | Hidden — only Bond hearts |
| Hunger | Visible stat | Fullness (hidden, behavior-based) |
| Death | Pet dies | Runaway (48h lockout, always returns) |
| Mini-game rewards | Variable | Conservative (3/7/15/22 coins) |
| Daily Moments | Not present | Morning/Afternoon/Evening bonuses |
| Mood display | Visible tier | Hidden — shown via behavior |

---

*Build each piece against the spec AND Master Decisions. Validate. Proceed.*
