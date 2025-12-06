# CLAUDE.md — Grundy Web Prototype v2.1

> **Claude Code reads this file automatically.** It contains everything you need to build the Grundy game correctly.

---

## ⚠️ CRITICAL DESIGN DECISIONS

**These override any conflicting specs (from GRUNDY_MASTER_DECISIONS.md):**

| # | Decision | Implementation |
|---|----------|----------------|
| 2 | **Hidden Stats** | Only Bond visible. Pet BEHAVIOR shows needs. |
| 3 | **Daily Moments** | Morning/Afternoon/Evening bonuses |
| 6 | **Pet Unlocks** | 3 free, 2 earnable (achievements), 3 premium |
| 12 | **Fullness** | Hidden stat. 30-min cooldown visible. |
| 13 | **Conservative Rewards** | Bronze:3c, Silver:7c, Gold:15c, Rainbow:22c+1gem |
| 14 | **NO DEATH** | Runaway (48h lockout) + Corruption. No permadeath. |

---

## PROJECT OVERVIEW

**Grundy** is a cozy virtual pet feeding game. This is the **web prototype** built with React + TypeScript to validate mechanics before Unity production.

**Pets:** Munchlet 🟡, Grib 🟢, Plompo 🟣, Fizz 🔵, Ember 🟠, Chomper 🔴, Whisp ⚪, Luxe ✨  
**Core Loop:** Feed pet → See reaction → Earn XP → Level up → Unlock more

---

## KEY FILES

```
READ FIRST:
├── CODEX_WEB.md          → Architecture, tech stack, patterns
├── ORCHESTRATOR_WEB.md   → Task breakdown, game data tables
├── GRUNDY_MASTER_DECISIONS.md → AUTHORITATIVE design decisions
└── agents/
    ├── REACT_DEVELOPER.md    → Component implementation guide
    └── TEST_ENGINEER_WEB.md  → Testing patterns

SOURCE CODE:
├── src/types/index.ts    → All TypeScript interfaces
├── src/data/pets.ts      → Pet definitions (8 pets)
├── src/data/foods.ts     → 10 foods with affinity per pet
├── src/data/config.ts    → Game constants, formulas
├── src/game/store.ts     → Zustand state management
└── src/components/       → React UI components
```

---

## PET UNLOCK SYSTEM ⚠️ UPDATED

```yaml
FREE (Start with all 3):
  - Munchlet 🟡
  - Grib 🟢
  - Plompo 🟣

EARNABLE (Via Achievements):
  - Fizz 🔵: Reach Bond Level 5 with any pet
  - Ember 🟠: Complete 10 mini-games

PREMIUM (Subscription OR Purchase OR Late Achievements):
  - Chomper 🔴: Grundy Plus / $1.99 / Level 25
  - Whisp ⚪: Grundy Plus / $2.49 / Level 30
  - Luxe ✨: Grundy Plus / $2.99 / Level 40

Shared State: Coins, Gems, Food Inventory
Separate State: Level, XP, Bond, Mood, Fullness (per pet)
```

---

## HIDDEN STATS SYSTEM ⚠️ NEW

**Only Bond is visible (as hearts ♥♥♥♡♡).** Everything else shown through pet behavior:

| Need | Pet Behavior |
|------|--------------|
| Hungry (0-20) | Begs, stomach growls, looks at food |
| Peckish (21-40) | Glances at food occasionally |
| Content (41-70) | Ignores food, happy idle |
| Satisfied (71-90) | Shakes head if you try to feed |
| Stuffed (91-100) | Turns away, blocks feeding |

**30-minute cooldown timer IS visible after feeding.**

---

## DAILY MOMENTS SYSTEM ⚠️ NEW

| Moment | Hours | Bonus |
|--------|-------|-------|
| Morning | 7-10 AM | +50% bond from feeding |
| Afternoon | 12-2 PM | +25% XP |
| Evening | 6-9 PM | +50% bond from feeding |

Show active moment indicator when player is in a bonus window.

---

## PETS (8 Total)

**Starters (All 3 Free):**

| Pet | Emoji | Color | Likes | Dislikes | Special |
|-----|-------|-------|-------|----------|---------|
| Munchlet | 🟡 | #fbbf24 | Sweet, Fruit | Spicy | +10% bond growth |
| Grib | 🟢 | #4ade80 | Spicy, Exotic | Sweet | -20% negative reactions |
| Plompo | 🟣 | #a78bfa | Sweet, Gooey | Crunchy | Slower mood decay |

**Earnable (Achievements):**

| Pet | Emoji | Color | Unlock | Special |
|-----|-------|-------|--------|---------|
| Fizz | 🔵 | #3b82f6 | Bond Level 5 | +25% mini-game rewards |
| Ember | 🟠 | #f97316 | 10 Mini-games | 2× coins from spicy food |

**Premium (Sub/Purchase/Late Achievement):**

| Pet | Emoji | Color | Methods | Special |
|-----|-------|-------|---------|---------|
| Chomper | 🔴 | #ef4444 | Plus / $1.99 / Lv25 | No dislikes |
| Whisp | ⚪ | #e2e8f0 | Plus / $2.49 / Lv30 | +50% XP rare foods |
| Luxe | ✨ | gold gradient | Plus / $2.99 / Lv40 | +100% gem drops |

---

## FOODS (10 items)

| Food | Emoji | XP | Hunger | Cost | Rarity |
|------|-------|-----|--------|------|--------|
| Apple | 🍎 | 2 | 12 | 5 | Common |
| Banana | 🍌 | 2 | 10 | 5 | Common |
| Carrot | 🥕 | 1 | 8 | 5 | Common |
| Cookie | 🍪 | 4 | 15 | 15 | Uncommon |
| Grapes | 🍇 | 3 | 14 | 15 | Uncommon |
| Spicy Taco | 🌮 | 6 | 20 | 25 | Rare |
| Hot Pepper | 🌶️ | 5 | 18 | 25 | Rare |
| Birthday Cake | 🎂 | 10 | 25 | 50 | Epic |
| Dream Treat | ⭐ | 12 | 20 | 75 | Epic |
| Golden Feast | 👑 | 20 | 30 | 150 | Legendary |

---

## MINI-GAME REWARDS ⚠️ CONSERVATIVE VALUES

```yaml
Bronze (0-99):
  coins: 3
  gems: 0
  food: none

Silver (100-199):
  coins: 7
  gems: 0
  food: 40% chance common

Gold (200-299):
  coins: 15
  gems: 0
  food: 75% chance any

Rainbow (300+):
  coins: 22
  gems: 1
  food: guaranteed rare

Universal per game:
  bond: +0.3
  happiness: +5

Energy System:
  max: 50
  cost: 10 per game
  regen: 1 per 30 min
  first_daily: FREE
```

---

## RUNAWAY SYSTEM (NOT DEATH) ⚠️ CRITICAL

**Classic mode has NO permadeath. Pets run away instead.**

```yaml
Neglect Path:
  1. Pet seems unhappy (warning)
  2. Pet gets sick (sickness)
  3. Pet threatens to leave (final warning)
  4. Pet runs away (48h lockout)

Return Options:
  - Wait 48 hours: Pet returns free
  - Pay 25 gems: Pet returns immediately
  - Bond penalty: -50% on return

Corruption:
  - Poor care → "Survivor" evolution variant
  - Healable with 30 days of good care
```

---

## FORMULAS (MUST USE EXACTLY)

```typescript
// XP to next level
xpForLevel(L) = Math.round(20 + (L * L * 1.4))

// Affinity multipliers
loved: 2.0×, liked: 1.5×, neutral: 1.0×, disliked: 0.5×

// Mood multipliers (1-5 scale)
1 Grumpy 😤: 0.5×
2 Moody 😕: 0.75×
3 Neutral 😐: 1.0×
4 Happy 😊: 1.25×
5 Ecstatic 🤩: 1.5×

// XP calculation
xpGained = food.xp × affinityMult × moodMult

// Evolution levels
Baby: 1-6, Youth: 7-12, Evolved: 13+

// Fullness feed values (hidden stat)
HUNGRY (0-20): 100% feed value
PECKISH (21-40): 75% feed value
CONTENT (41-70): 50% feed value
SATISFIED (71-90): 25% feed value
STUFFED (91-100): 0% (blocked)

// Daily Moments bonuses
Morning (7-10 AM): bond × 1.5
Afternoon (12-2 PM): xp × 1.25
Evening (6-9 PM): bond × 1.5
```

---

## COMMANDS

```
/execute WEB-XXX    → Run specific ticket
/plan {feature}     → Break down feature into subtasks
/validate {file}    → Check file against spec
/next               → Execute next task in queue
```

---

## TICKET QUICK REFERENCE

| ID | Task | Priority | Status |
|----|------|----------|--------|
| WEB-001 to WEB-035 | Core prototype | P0-P2 | ✅ Complete |
| FIX-001 | Replace Death → Runaway | P0 | 🔧 Required |
| FIX-002 | Hide stats (only Bond visible) | P1 | 🔧 Required |
| FIX-003 | Hunger → Fullness (hidden) | P1 | 🔧 Required |
| FIX-004 | Add Daily Moments | P1 | 🔧 Required |
| FIX-005 | Conservative mini-game rewards | P0 | 🔧 Required |
| FIX-006 | Pet unlock via achievements | P1 | 🔧 Required |
| WEB-073 to WEB-079 | PWA implementation | P0-P2 | 📋 Todo |
| WEB-080 to WEB-089 | New mini-games | P1-P2 | 📋 Todo |

---

## RULES

1. **Always use correct pet names:** Munchlet, Grib, Plompo (NOT Sprout, Ember, Ripple)
2. **Check affinity table** before implementing food reactions
3. **Use Tailwind** for all styling (no CSS files)
4. **Use Zustand** with persist middleware for state
5. **Stats are HIDDEN** — only Bond hearts visible
6. **NO DEATH** — use Runaway system in Classic mode
7. **Conservative rewards** — Bronze: 3c, Rainbow: 22c+1gem
8. **Test against spec** after implementation

---

## TECH STACK

```yaml
Framework: React 18+
Language: TypeScript (strict)
Styling: Tailwind CSS
State: Zustand
Persistence: localStorage
Build: Vite or standalone HTML
Testing: Manual + Fuzzy tests
```

---

## REMOTE/HEADLESS WORKFLOW

**This project runs on a headless Linux server.** localhost won't work in a browser.

### To Test the Game

**Option 1: Standalone HTML (Recommended)**
```bash
# Ask Claude Code:
"Build a single standalone HTML file with the entire game embedded"

# This creates grundy-game.html
# Then commit and push to GitHub
# Download from GitHub and open locally
```

**Option 2: GitHub Download**
- All builds are pushed to the repo automatically
- Download `grundy-game.html` from GitHub
- Double-click to open in any browser

---

## VALIDATION CHECKLIST

Before completing any task:

- [ ] Pet names are Munchlet/Grib/Plompo
- [ ] Food values match the table above
- [ ] XP formula: 20 + (L² × 1.4)
- [ ] Affinity multipliers: 2.0, 1.5, 1.0, 0.5
- [ ] Mood tiers 1-5 with correct multipliers
- [ ] Evolution at levels 7 and 13
- [ ] **Stats are HIDDEN (only Bond hearts visible)**
- [ ] **Fullness system with behavioral indicators**
- [ ] **Daily Moments bonuses active**
- [ ] **Runaway system (NOT death) in Classic**
- [ ] **Conservative mini-game rewards**
- [ ] **Pet unlocks via achievements (Fizz/Ember)**
- [ ] Store uses persist middleware
- [ ] Components use Tailwind classes

---

**Data source:** `GRUNDY_MASTER_DECISIONS.md`, `grundy_complete_game_bible.md`

*Read ORCHESTRATOR_WEB.md for full task definitions and acceptance criteria.*
