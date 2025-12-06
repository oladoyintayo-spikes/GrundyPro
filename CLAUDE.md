# CLAUDE.md — Grundy Web Prototype

> **Claude Code reads this file automatically.** It contains everything you need to build the Grundy game correctly.

---

## PROJECT OVERVIEW

**Grundy** is a cozy virtual pet feeding game. This is the **web prototype** built with React + TypeScript to validate mechanics before Unity production.

**Pets:** Munchlet 🟡, Grib 🟢, Plompo 🟣  
**Core Loop:** Feed pet → Get reaction → Earn XP → Level up → Buy more food

---

## KEY FILES

```
READ FIRST:
├── CODEX_WEB.md          → Architecture, tech stack, patterns
├── ORCHESTRATOR_WEB.md   → Task breakdown, game data tables
└── agents/
    ├── REACT_DEVELOPER.md    → Component implementation guide
    └── TEST_ENGINEER_WEB.md  → Testing patterns

TASK LIST:
└── tasks/TICKETS_WEB.yaml    → 22 tickets with acceptance criteria

SOURCE CODE:
├── src/types/index.ts    → All TypeScript interfaces
├── src/data/pets.ts      → Pet definitions (Munchlet, Grib, Plompo)
├── src/data/foods.ts     → 8 foods with affinity per pet
├── src/data/config.ts    → Game constants, formulas
├── src/game/store.ts     → Zustand state management
└── src/components/       → React UI components
```

---

## CRITICAL GAME DATA

### Pet Unlock System

```yaml
Rules:
  - All 3 STARTERS always available (Munchlet, Grib, Plompo)
  - Player picks which to play FIRST, can switch anytime
  - Each pet has SEPARATE: Level, XP, Bond, Mood, Hunger
  - SHARED across all pets: Coins, Gems, Food Inventory
  - Pets 4-8 unlock via level OR gem purchase
  - Unlocks are permanent (account-wide)
  
Gem Income:
  - Level up: +5 gems (Luxe: +10)
  - Mini-game Rainbow tier: +2 gems
  - Daily login Day 7: +10 gems
  - First feeding daily: +1 gem
```

### Pets (8 Total)

**Starters (Choose 1):**

| Pet | Emoji | Color | Likes | Dislikes | Special |
|-----|-------|-------|-------|----------|---------|
| Munchlet | 🟡 | #fbbf24 | Sweet, Fruit | Spicy | +10% bond growth |
| Grib | 🟢 | #4ade80 | Spicy, Exotic | Sweet | -20% negative reactions |
| Plompo | 🟣 | #a78bfa | Sweet, Gooey | Crunchy | Slower mood decay |

**Unlockable:**

| Pet | Emoji | Color | Unlock | Gem Skip | Special |
|-----|-------|-------|--------|----------|---------|
| Fizz | 🔵 | #3b82f6 | Level 10 | 50 💎 | +25% mini-game rewards |
| Ember | 🟠 | #f97316 | Level 15 | 100 💎 | 2× coins from spicy food |
| Chomper | 🔴 | #ef4444 | Level 20 | 150 💎 | No dislikes, 2× hunger |
| Whisp | ⚪ | #e2e8f0 | Level 25 | 200 💎 | +50% XP from rare foods |
| Luxe | ✨ | gold gradient | Level 30 | 300 💎 | +100% gem drops |

### Foods (10 items)

| Food | Emoji | XP | Hunger | Cost | Munchlet | Grib | Plompo | Fizz | Ember | Chomper | Whisp | Luxe |
|------|-------|-----|--------|------|----------|------|--------|------|-------|---------|-------|------|
| Apple | 🍎 | 2 | 12 | 5 | liked | neutral | neutral | neutral | neutral | liked | disliked | disliked |
| Banana | 🍌 | 2 | 10 | 5 | loved | neutral | liked | liked | neutral | liked | disliked | disliked |
| Carrot | 🥕 | 1 | 8 | 5 | neutral | liked | neutral | neutral | neutral | liked | disliked | disliked |
| Cookie | 🍪 | 4 | 15 | 15 | loved | disliked | loved | neutral | disliked | liked | neutral | neutral |
| Grapes | 🍇 | 3 | 14 | 15 | liked | liked | liked | liked | neutral | liked | neutral | neutral |
| Spicy Taco | 🌮 | 6 | 20 | 25 | disliked | loved | disliked | neutral | loved | liked | neutral | neutral |
| Hot Pepper | 🌶️ | 5 | 18 | 25 | disliked | loved | disliked | liked | loved | liked | disliked | disliked |
| Birthday Cake | 🎂 | 10 | 25 | 50 | loved | neutral | loved | liked | disliked | liked | liked | liked |
| Dream Treat | ⭐ | 12 | 20 | 75 | liked | neutral | loved | loved | neutral | liked | loved | loved |
| Golden Feast | 👑 | 20 | 30 | 150 | liked | liked | liked | liked | liked | liked | loved | loved |

### Formulas (MUST USE EXACTLY)

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
Baby: 1-6, Youth: 7-12, Evolved: 13-20
```

---

## COMMANDS

Use these to execute work:

```
/execute WEB-XXX    → Run specific ticket from TICKETS_WEB.yaml
/plan {feature}     → Break down a feature into subtasks
/validate {file}    → Check file against spec
/next               → Execute next task in queue
```

### Example Usage

```
"Execute WEB-005"
→ Builds src/game/FeedingSystem.ts

"Create the Pet display component"
→ Reads spec → writes src/components/Pet.tsx

"Add Snack Catch mini-game with scoring from spec"
→ Creates src/components/games/SnackCatch.tsx
```

---

## TICKET QUICK REFERENCE

| ID | Task | Priority |
|----|------|----------|
| WEB-001 | TypeScript types | P0 |
| WEB-002 | Pet definitions (8 pets) | P0 |
| WEB-003 | Food definitions (10 foods) | P0 |
| WEB-004 | Game config | P0 |
| WEB-005 | Feeding system | P0 |
| WEB-006 | Pet system | P0 |
| WEB-007 | Economy system | P0 |
| WEB-008 | Zustand store | P0 |
| WEB-009 | Pet component | P0 |
| WEB-010 | Progress bars | P0 |
| WEB-011 | Food bag | P0 |
| WEB-012 | Reaction display | P1 |
| WEB-013 | Shop modal | P1 |
| WEB-014 | Level up modal | P1 |
| WEB-015 | Main App | P0 |
| WEB-016 | Snack Catch game | P1 |
| WEB-017 | Mini-game hub | P2 |
| WEB-018 | Dev panel | P2 |
| **WEB-023** | **Welcome/onboarding flow (splash, story, pet pick)** | **P0** |
| **WEB-024** | **Pet selector with unlock system** | **P0** |
| **WEB-025** | **Separate pet state storage** | **P0** |
| **WEB-026** | **Gem unlock purchase flow** | **P1** |
| **WEB-027** | **5 new pet definitions** | **P0** |
| **WEB-028** | **2 new foods (Dream Treat, Golden Feast)** | **P1** |
| **WEB-029** | **Pet unlock celebration modal** | **P2** |
| **WEB-030** | **Pet special abilities** | **P1** |
| **WEB-031** | **Gem income system** | **P1** |
| **WEB-032** | **First session tutorial** | **P1** |
| **WEB-033** | **Main menu & navigation system** | **P0** | ✅ |
| **WEB-034** | **Visual FX & animations** | **P1** | ✅ |
| **WEB-035** | **Fuzzy testing suite** | **P1** | ✅ |

**Status:** ALL 35 TICKETS COMPLETE ✅

**Fuzzy Test Results:** 21/21 PASS

**Critical path:** WEB-023 ✅ → WEB-032 ✅ → WEB-024 ✅ → WEB-025 ✅ → WEB-027 ✅ → WEB-033 ✅ → WEB-034 ✅ → WEB-035 ✅

---

## RULES

1. **Always use correct pet names:** Munchlet, Grib, Plompo (NOT Sprout, Ember, Ripple)
2. **Check affinity table** before implementing food reactions
3. **Use Tailwind** for all styling (no CSS files)
4. **Use Zustand** with persist middleware for state
5. **Test against spec** after implementation

---

## TECH STACK

```yaml
Framework: React 18+
Language: TypeScript (strict)
Styling: Tailwind CSS
State: Zustand
Persistence: localStorage
Build: Vite
Testing: Vitest
```

---

## QUICK START

```bash
npm install
npm run build   # Build the project
npm test        # Run tests
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

**Option 3: Claude.ai Artifact**
- The game can be viewed as a React artifact in Claude.ai chat
- Ask: "Create a playable artifact version of the current game"

### After Making Changes

Always run:
```bash
# Rebuild standalone HTML
"Rebuild grundy-game.html with the latest changes and push to GitHub"
```

This ensures you can always download and test the latest version.

---

## VALIDATION CHECKLIST

Before completing any task:

- [ ] Pet names are Munchlet/Grib/Plompo
- [ ] Food values match the table above
- [ ] XP formula: 20 + (L² × 1.4)
- [ ] Affinity multipliers: 2.0, 1.5, 1.0, 0.5
- [ ] Mood tiers 1-5 with correct multipliers
- [ ] Evolution at levels 7 and 13
- [ ] Store uses persist middleware
- [ ] Components use Tailwind classes

---

**Data source:** `grundy_interactive_mockup.html`, `grundy_complete_game_bible.md`

*Read ORCHESTRATOR_WEB.md for full task definitions and acceptance criteria.*
