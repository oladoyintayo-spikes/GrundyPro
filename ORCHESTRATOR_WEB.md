# GRUNDY WEB ORCHESTRATOR — React/TypeScript Agent Coordination v1.0

**Purpose:** Coordinate AI agents to build the Grundy web prototype systematically.

---

## ORCHESTRATION PROTOCOL

```
1. CLARIFY  → Restate objective in testable terms
2. PLAN     → Decompose into subtasks with dependencies  
3. EXECUTE  → Run subtasks, capture outputs
4. VALIDATE → Test against spec
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

## CORE GAME DATA (From Spec)

### Pet Unlock System

```yaml
Progression:
  - All 3 STARTERS are always available (Munchlet, Grib, Plompo)
  - Player picks which starter to play FIRST
  - Can switch between starters anytime
  - Each pet has separate: Level, XP, Bond, Mood, Hunger
  - Shared across all pets: Coins, Gems, Food Inventory
  - Pets 4-8 unlock via level OR gem purchase
  - Unlocks are permanent (account-wide)

Monetization:
  - Players can grind levels OR pay gems to unlock pets 4-8 early
  - Gems come from: Level ups (+5), Mini-games, Daily login, IAP
```

### Pets (8 Total)

#### Starters (Choose 1)

| Pet | Emoji | Personality | Likes | Dislikes | Hunger Decay | Special |
|-----|-------|-------------|-------|----------|--------------|---------|
| Munchlet | 🟡 | Cheerful | Sweets, Fruits | Spicy | Medium | +10% bond growth, mood swings faster |
| Grib | 🟢 | Mischievous | Spicy, Exotic | Sweets | Fast | -20% negative reactions, spicy mood boost |
| Plompo | 🟣 | Sleepy | Sweets, Gooey | Crunchy | Slow | Faster energy regen, slower mood decay |

#### Unlockable Pets

| Pet | Emoji | Unlock | Gem Skip | Personality | Likes | Dislikes | Hunger | Special |
|-----|-------|--------|----------|-------------|-------|----------|--------|---------|
| Fizz | 🔵 | Level 10 | 50 💎 | Hyper, bubbly | Sour, Fizzy, Cold | Bland, Dry | Very Fast | +25% mini-game rewards |
| Ember | 🟠 | Level 15 | 100 💎 | Fierce, proud | Spicy, Hot, Smoky | Sweet, Cold | Fast | 2× coins from spicy foods |
| Chomper | 🔴 | Level 20 | 150 💎 | Hungry, goofy | EVERYTHING | None | Fastest | No dislikes, needs 2× feeding |
| Whisp | ⚪ | Level 25 | 200 💎 | Mysterious, ethereal | Dream, Magical, Rare | Common, Basic | Slowest | +50% XP from rare/epic foods |
| Luxe | ✨ | Level 30 | 300 💎 | Royal, fabulous | Premium, Legendary | Common, Basic | Medium | +100% gem drops |

### Foods (10 Total)

| Food | Icon | Rarity | Hunger | Mood | XP | Cost | Munchlet | Grib | Plompo | Fizz | Ember | Chomper | Whisp | Luxe |
|------|------|--------|--------|------|-----|------|----------|------|--------|------|-------|---------|-------|------|
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

### Mood System

| Range | Tier | Label | Icon | XP Multiplier |
|-------|------|-------|------|---------------|
| 0-19 | 1 | Unhappy | 😤 | 0.5× |
| 20-39 | 2 | Low | 😕 | 0.75× |
| 40-59 | 3 | Content | 😐 | 1.0× |
| 60-84 | 4 | Happy | 😊 | 1.25× |
| 85-100 | 5 | Ecstatic | 🤩 | 1.5× |

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
| Mood Match | Memory | Level 4 | 45-90s | 4 emotion buttons |
| Snack Sort | Cognitive | Level 6 | 45-90s | Swipe to bins |

### Mini-Game Rewards

| Tier | Score Range | Coins | Pet XP | Mood |
|------|-------------|-------|--------|------|
| Bronze | 0-99 | 3 | 3 | 0 |
| Silver | 100-199 | 6 | 4 | +1 |
| Gold | 200-299 | 10 | 5 | +1 |
| Rainbow | 300+ | 15 | 5 | +2 |

---

## SUBTASK FORMAT

```yaml
subtask:
  id: unique_id
  goal: what to accomplish
  agent: react_developer | game_designer | test_engineer | data_engineer
  inputs:
    - name: input_name
      source: spec | previous_task | user
  outputs:
    - format: tsx | ts | test | data
      path: src/path/to/file
  success_criteria:
    - Testable condition 1
    - Testable condition 2
  on_failure: retry | escalate | skip
```

---

## MILESTONE 1: CORE DATA (M1-WEB)

**Goal:** Complete TypeScript data layer matching spec exactly.

### M1.1 - Types

```yaml
subtask:
  id: m1_types
  goal: Define all TypeScript interfaces matching spec
  agent: data_engineer
  outputs:
    - path: src/types/index.ts
  success_criteria:
    - All pet properties defined
    - All food properties defined  
    - Mood states enum matches spec (5 tiers)
    - Affinity enum: Loved, Liked, Neutral, Disliked
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
```

### M1.3 - Food Data

```yaml
subtask:
  id: m1_foods
  goal: Create food definitions from spec
  agent: data_engineer
  inputs:
    - name: food_table
      source: spec (8 foods minimum)
  outputs:
    - path: src/data/foods.ts
  success_criteria:
    - All 8 foods with correct hunger/mood/XP values
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
```

---

## MILESTONE 2: GAME SYSTEMS (M2-WEB)

**Goal:** Implement core game logic as pure functions.

### M2.1 - Feeding System

```yaml
subtask:
  id: m2_feeding
  goal: Implement feeding calculation logic
  agent: react_developer
  outputs:
    - path: src/game/FeedingSystem.ts
  success_criteria:
    - calculateReaction(petId, food) returns correct affinity
    - calculateXP applies mood × affinity multipliers
    - calculateMoodChange based on food.mood and affinity
    - calculateHungerRestore uses food.hunger value
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
    - Hunger decay: configurable per pet
    - Mood decay over time
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
    - feed() action integrates all systems
    - buyFood() action works
    - localStorage persistence via zustand/persist
```

---

## MILESTONE 3: UI COMPONENTS (M3-WEB)

**Goal:** Build React components for core gameplay.

### M3.1 - Pet Display

```yaml
subtask:
  id: m3_pet_display
  goal: Create pet display component
  agent: react_developer
  outputs:
    - path: src/components/Pet.tsx
  success_criteria:
    - Shows pet emoji with mood expression
    - Displays level badge
    - Shows evolution stage indicator
    - Animates on feeding (bounce/scale)
    - Grayscale filter when hungry (<20%)
```

### M3.2 - Stats Display

```yaml
subtask:
  id: m3_stats
  goal: Create progress bars for pet stats
  agent: react_developer
  outputs:
    - path: src/components/ProgressBars.tsx
  success_criteria:
    - XP bar with level/next level display
    - Hunger bar (orange)
    - Mood indicator with tier label
    - Bond bar (pink)
    - Smooth animations on change
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
    - Dismiss button
```

---

## MILESTONE 4: MINI-GAMES (M4-WEB)

**Goal:** Implement Snack Catch mini-game.

### M4.1 - Snack Catch

```yaml
subtask:
  id: m4_snack_catch
  goal: Build catch-the-food mini-game
  agent: react_developer
  outputs:
    - path: src/components/games/SnackCatch.tsx
  success_criteria:
    - Foods fall from top
    - Basket moves with touch/mouse drag
    - Good food: +10 points
    - Favorite food: +20 points
    - Bad food (pepper for Munchlet): -15 points
    - Combo bonus: +2 per streak (max +10)
    - 60 second timer
    - Score tiers: Bronze/Silver/Gold/Rainbow
    - Rewards based on tier
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
    - Daily play count (max 3 rewarded)
    - Launch selected game
```

---

## MILESTONE 5: POLISH (M5-WEB)

### M5.1 - Crafting Preview

```yaml
subtask:
  id: m5_crafting
  goal: Add basic crafting system
  agent: react_developer
  outputs:
    - path: src/components/Crafting.tsx
  success_criteria:
    - Show available recipes
    - Ingredients display
    - Craft button
    - Adds crafted food to inventory
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
    - Set mood
    - Set hunger
    - Add foods
    - Toggle via keyboard shortcut
```

---

## EXECUTION PLAN

```
PHASE 1: DATA (M1-WEB)
├── M1.1 Types           ← Start here
├── M1.2 Pets
├── M1.3 Foods
└── M1.4 Config

PHASE 2: SYSTEMS (M2-WEB)
├── M2.1 Feeding
├── M2.2 Pet
├── M2.3 Economy
└── M2.4 Store

PHASE 3: UI (M3-WEB)
├── M3.1 Pet Display
├── M3.2 Stats
├── M3.3 Food Bag
├── M3.4 Reaction
├── M3.5 Shop
└── M3.6 Level Up

PHASE 4: MINI-GAMES (M4-WEB)
├── M4.1 Snack Catch
└── M4.2 Hub

PHASE 5: POLISH (M5-WEB)
├── M5.1 Crafting
└── M5.2 Dev Panel
```

---

## VALIDATION CHECKLIST

Before marking milestone complete:

### Data Layer
- [ ] Types match spec exactly
- [ ] All 3 pets defined with correct attributes
- [ ] All 8 foods with correct affinity per pet
- [ ] XP formula matches: 20 + (L² × 1.4)
- [ ] Mood tiers match spec ranges

### Game Logic
- [ ] Feeding applies correct multipliers
- [ ] Level up triggers at right XP
- [ ] Evolution at levels 7 and 13
- [ ] Mood decay works
- [ ] Hunger decay works

### UI
- [ ] Pet displays with correct emoji
- [ ] All bars update smoothly
- [ ] Reactions show correct feedback
- [ ] Shop prevents overspending

### Mini-Games
- [ ] Snack Catch scoring matches spec
- [ ] Rewards match tier table
- [ ] Daily cap enforced

---

## ERROR HANDLING

| Error | Action |
|-------|--------|
| Type mismatch | Check against spec table |
| Wrong multiplier | Re-read affinity table |
| Missing pet modifier | Add per-pet special rules |
| UI not updating | Check store subscription |

---

## COMMANDS

```
/plan {goal}      → Generate task breakdown
/execute {task}   → Implement specific task
/validate {file}  → Check against spec
/next             → Execute next task in queue
```

---

**VERSION:** 1.0  
**STATUS:** Ready for systematic development

---

*Build each piece against the spec. Validate. Proceed.*
