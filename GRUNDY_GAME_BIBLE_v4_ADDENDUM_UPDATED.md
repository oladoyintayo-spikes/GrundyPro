# GRUNDY — GAME BIBLE v4.1 ADDENDUM

**Version:** 4.1  
**Last Updated:** December 2024  
**Status:** Web Prototype + Production Spec  
**Aligned With:** GRUNDY_MASTER_DECISIONS.md

---

## ⚠️ CRITICAL DESIGN DECISIONS

**These override any conflicting specs in v3.0 or v4.0:**

| # | Decision | Implementation |
|---|----------|----------------|
| 2 | **Hidden Stats** | Only Bond visible. Pet behavior shows needs. |
| 3 | **Daily Moments** | Morning/Afternoon/Evening bonuses |
| 6 | **Pet Unlocks** | 3 free, 2 earnable (achievements), 3 premium |
| 12 | **Fullness** | Hidden stat. 30-min cooldown visible. |
| 13 | **Conservative Rewards** | Bronze:3c, Silver:7c, Gold:15c, Rainbow:22c+1gem |
| 14 | **NO DEATH** | Runaway (48h lockout). Corruption healable. |
| 15 | **Origin Snippets** | Short personality during pet selection |

---

## CHANGELOG FROM v4.0

| Section | Change |
|---------|--------|
| Pet Unlocks | Changed from gem purchase to achievements (Fizz/Ember) |
| Stats | Hidden all stats except Bond hearts |
| Fullness | Renamed from hunger, made hidden with behaviors |
| Death | Replaced with Runaway system (no permadeath) |
| Rewards | Reduced to conservative values (3/7/15/22) |
| Daily Moments | Added time-based bonus system |
| Onboarding | Simplified to 1-page intro with origin snippets |

---

# 1. PET UNLOCK SYSTEM ⚠️ UPDATED

## Overview

Players start with 3 free starters and unlock 5 additional pets through:
- **Achievements** (Fizz, Ember) — Earnable through gameplay
- **Premium** (Chomper, Whisp, Luxe) — Subscription OR purchase OR late achievements

**NO gem purchases for Fizz or Ember.**

## Unlock Requirements

| Slot | Pet | Unlock Method | Design Intent |
|------|-----|---------------|---------------|
| 1 | Munchlet 🟡 | Free starter | Beginner-friendly |
| 2 | Grib 🟢 | Free starter | Spicy specialist |
| 3 | Plompo 🟣 | Free starter | Low-maintenance |
| 4 | Fizz 🔵 | **Bond Level 5** | Rewards engagement |
| 5 | Ember 🟠 | **10 Mini-games** | Rewards activity |
| 6 | Chomper 🔴 | Plus / $1.99 / Level 25 | Premium with fallback |
| 7 | Whisp ⚪ | Plus / $2.49 / Level 30 | Premium with fallback |
| 8 | Luxe ✨ | Plus / $2.99 / Level 40 | Ultimate aspirational |

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
│           10 games  Premium             │
│           (3/10)                        │
├─────────────────────────────────────────┤
│  ⬜        ✨                            │
│  Whisp    Luxe                          │
│  🔒       🔒                            │
│  Premium   Premium                      │
└─────────────────────────────────────────┘
```

---

# 2. HIDDEN STATS SYSTEM ⚠️ NEW

## Design Philosophy

**Stats are HIDDEN.** Only Bond is visible. Pet SHOWS you what they need through BEHAVIOR.

## What's Visible

| Element | Display |
|---------|---------|
| Bond | Hearts (♥♥♥♡♡) — 0-5 scale |
| Cooldown | Timer after feeding (⏱️ 29:45) |
| Daily Moment | Indicator when active (🌅/☀️/🌙) |

## What's Hidden (Shown via Behavior)

| Stat | Pet Behavior |
|------|--------------|
| Fullness 0-20 | Begs, stomach growls, 🍎❓ bubble |
| Fullness 21-40 | Glances at food occasionally |
| Fullness 41-70 | Happy idle, ignores food |
| Fullness 71-90 | Shakes head if offered, 😌 bubble |
| Fullness 91-100 | Turns away, 🙅 bubble, feeding blocked |
| Mood low | Droopy posture, slow movement |
| Mood high | Bouncy, bright eyes |

## UI Layout

```
┌─────────────────────────────────────────┐
│  🌅 Morning Bonus     ♥♥♥♡♡ Bond       │
├─────────────────────────────────────────┤
│                                         │
│              🟡 Munchlet                │
│                  😊                     │
│              💭 🍎❓                    │
│           (hungry behavior)             │
│                                         │
│         ⏱️ Feed in: 12:34              │
│                                         │
│         [🍎] [🍌] [🍪] [🌮]            │
│                                         │
└─────────────────────────────────────────┘
```

---

# 3. DAILY MOMENTS SYSTEM ⚠️ NEW

## Time-Based Bonuses

| Moment | Hours | Bonus | Icon | Message |
|--------|-------|-------|------|---------|
| Morning | 7-10 AM | +50% bond | 🌅 | "Good morning! Extra cuddles!" |
| Afternoon | 12-2 PM | +25% XP | ☀️ | "Snack time! Extra XP!" |
| Evening | 6-9 PM | +50% bond | 🌙 | "Evening cuddles!" |

## Implementation

```typescript
const DAILY_MOMENTS = {
  morning: {
    hours: [7, 10],
    bonus: { bond: 1.5 },
    icon: '🌅'
  },
  afternoon: {
    hours: [12, 14],
    bonus: { xp: 1.25 },
    icon: '☀️'
  },
  evening: {
    hours: [18, 21],
    bonus: { bond: 1.5 },
    icon: '🌙'
  }
};
```

---

# 4. RUNAWAY SYSTEM (NOT DEATH) ⚠️ CRITICAL

## Overview

**There is NO death in Grundy.** In Classic mode, neglected pets run away but ALWAYS return.

## Neglect Path

```
Stage 1: Pet seems unhappy
    ↓ (continued neglect)
Stage 2: Pet gets sick
    ↓ (continued neglect)
Stage 3: Pet threatens to leave (looks at exit)
    ↓ (continued neglect)
Stage 4: Pet runs away → 48h lockout
```

## Return Options

| Method | Cost | Bond Penalty |
|--------|------|--------------|
| Wait 48 hours | Free | -50% |
| Apologize | 25 gems | -50% |

## Runaway Screen

```
┌─────────────────────────────────────────┐
│                                         │
│           😢 Your pet ran away...       │
│                                         │
│        They'll return in 47:32:15       │
│                                         │
│       [Apologize for 25 💎]             │
│                                         │
│    (Bond will be reduced by 50%)        │
│                                         │
└─────────────────────────────────────────┘
```

## Evolution Corruption

Poor care leads to "Survivor" evolution variant:
- Darker colors
- Different appearance
- **Healable** with 30 days of good care

---

# 5. CONSERVATIVE MINI-GAME REWARDS ⚠️ UPDATED

## Reward Tiers

| Tier | Score | Coins | Gems | Food |
|------|-------|-------|------|------|
| Bronze | 0-99 | **3** | 0 | None |
| Silver | 100-199 | **7** | 0 | 40% common |
| Gold | 200-299 | **15** | 0 | 75% any |
| Rainbow | 300+ | **22** | **1** | 100% rare |

## Per-Game Bonuses

- Bond: +0.3
- Happiness: +5

## Energy System

- Max: 50
- Cost: 10 per game
- Regen: 1 per 30 min
- First daily: FREE

---

# 6. ONBOARDING FLOW ⚠️ UPDATED

## Simplified Flow

```
Splash → 1-page Intro → Pet Pick (with origins) → Tutorial → Mode Select → Play
```

## 1-Page Intro (Skippable)

"These little creatures are always hungry... Feed them, play with them, watch them grow!"

[Skip] [Next →]

## Pet Selection with Origin Snippets

**NO mechanics shown.** Only personality/origin.

| Pet | Origin Snippet |
|-----|----------------|
| Munchlet | "Found on a sunny windowsill, humming. Loves sweet things. Hates being alone." |
| Grib | "Appeared in a shadow behind the cupboard, grinning. Loves chaos. Hates boredom." |
| Plompo | "Discovered sleeping in a cloud that drifted too low. Loves naps. Hates rushing." |

## Mode Selection (After Tutorial)

- Cozy Mode: Default, always available
- Classic Mode: Locked until Level 10

---

# 7. PETS TABLE (All 8)

## Starters (Free)

| Pet | Emoji | Color | Personality | Likes | Dislikes | Special |
|-----|-------|-------|-------------|-------|----------|---------|
| Munchlet | 🟡 | #fbbf24 | Cheerful | Sweet, Fruit | Spicy | +10% bond growth |
| Grib | 🟢 | #4ade80 | Mischievous | Spicy, Exotic | Sweet | -20% negative reactions |
| Plompo | 🟣 | #a78bfa | Sleepy | Sweet, Gooey | Crunchy | -20% mood decay |

## Earnable (Achievements)

| Pet | Emoji | Color | Unlock | Special |
|-----|-------|-------|--------|---------|
| Fizz | 🔵 | #3b82f6 | **Bond Level 5** | +25% mini-game coins |
| Ember | 🟠 | #f97316 | **10 Mini-games** | 2× coins from spicy |

## Premium

| Pet | Emoji | Color | Methods | Special |
|-----|-------|-------|---------|---------|
| Chomper | 🔴 | #ef4444 | Plus / $1.99 / Lv25 | No dislikes |
| Whisp | ⚪ | #e2e8f0 | Plus / $2.49 / Lv30 | +50% XP from rare |
| Luxe | ✨ | gradient | Plus / $2.99 / Lv40 | +100% gem drops |

---

# 8. FOODS TABLE (10 items)

| Food | Emoji | XP | Fullness | Cost | Rarity |
|------|-------|-----|----------|------|--------|
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

# 9. FORMULAS

## XP to Next Level

```typescript
xpForLevel(L) = Math.round(20 + (L * L * 1.4))
```

## Affinity Multipliers

| Affinity | Multiplier |
|----------|------------|
| Loved | 2.0× |
| Liked | 1.5× |
| Neutral | 1.0× |
| Disliked | 0.5× |

## Fullness Feed Value

| State | Range | Feed Value |
|-------|-------|------------|
| Hungry | 0-20 | 100% |
| Peckish | 21-40 | 75% |
| Content | 41-70 | 50% |
| Satisfied | 71-90 | 25% |
| Stuffed | 91-100 | 0% (blocked) |

## Daily Moment Bonuses

| Moment | Bond | XP |
|--------|------|-----|
| Morning | ×1.5 | ×1.0 |
| Afternoon | ×1.0 | ×1.25 |
| Evening | ×1.5 | ×1.0 |

## Progression Speed (Target)

| Level | Time to Reach |
|-------|---------------|
| 10 | 1-2 weeks |
| 20 | 1-2 months |
| 30 | 3-6 months |

---

# 10. MONETIZATION ⚠️ UPDATED

## Ethical Approach

| Principle | Implementation |
|-----------|----------------|
| No pay-to-win | Premium pets have unique abilities, not advantages |
| No loot boxes | All purchases are direct |
| No death pressure | Pets run away but always return |
| Earnable content | Fizz/Ember unlockable without money |

## Revenue Streams

| Stream | Price | Content |
|--------|-------|---------|
| Remove Ads | $2.99 | One-time, removes all ads |
| Grundy Plus | $4.99/mo | All pets, no ads, exclusives |
| À la carte pets | $1.99-2.99 | Individual premium pets |
| Cosmetics | $0.99-4.99 | Visual customization |

---

# 11. BUILD STATUS

## Web Prototype v2.1

### Alignment Required

| Fix | Description | Status |
|-----|-------------|--------|
| FIX-001 | Death → Runaway | ⬜ |
| FIX-002 | Hidden stats | ⬜ |
| FIX-003 | Fullness behaviors | ⬜ |
| FIX-004 | Daily Moments | ⬜ |
| FIX-005 | Conservative rewards | ⬜ |
| FIX-006 | Achievement unlocks | ⬜ |

### Features Status

| Feature | Status |
|---------|--------|
| 8 pets (3 free, 2 earn, 3 premium) | ⬜ Update needed |
| Hidden stats + behaviors | ⬜ Update needed |
| Daily Moments | ⬜ New feature |
| Runaway system | ⬜ Update needed |
| Conservative rewards | ⬜ Update needed |
| Origin snippets | ⬜ Update needed |

---

# 12. SUMMARY OF v4.1 CHANGES

## From v4.0

| Area | v4.0 | v4.1 |
|------|------|------|
| Fizz unlock | Level 10 OR 50 gems | **Bond Level 5** |
| Ember unlock | Level 15 OR 100 gems | **10 Mini-games** |
| Stats display | Visible bars | **Hidden (Bond hearts only)** |
| Hunger | Visible meter | **"Fullness" hidden** |
| Death | Pet can die | **Runaway (48h lockout)** |
| Bronze reward | 10 coins | **3 coins** |
| Rainbow reward | 100c + 2g | **22c + 1g** |
| Onboarding | 4-screen story | **1-page intro** |
| Pet selection | Shows mechanics | **Shows origin snippets** |
| Mode selection | During onboarding | **After tutorial** |

---

**END OF v4.1 ADDENDUM**

*This document supersedes sections in v4.0 that conflict with GRUNDY_MASTER_DECISIONS.md*
