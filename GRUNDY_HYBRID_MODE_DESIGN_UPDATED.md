# GRUNDY — HYBRID MODE EXPANSION v2.1

**Version:** 5.1  
**Date:** December 2024  
**Status:** Design Spec (Aligned with GRUNDY_MASTER_DECISIONS.md)  
**Adds:** Dual game modes, Hidden stats, Runaway system, Daily Moments

---

## ⚠️ CRITICAL DESIGN DECISIONS

**These override any conflicting specs:**

| Decision | Implementation |
|----------|----------------|
| **Hidden Stats** | Only Bond visible. Pet behavior shows needs. |
| **Fullness** | Hidden stat. 30-min cooldown visible. |
| **Daily Moments** | Morning/Afternoon/Evening bonuses |
| **NO DEATH** | Runaway (48h lockout) in Classic. No permadeath. |
| **Conservative Rewards** | Bronze: 3c, Silver: 7c, Gold: 15c, Rainbow: 22c+1gem |

---

## OVERVIEW

Grundy supports two play styles:
- **Cozy Mode** (default): No consequences, gentle reminders, stress-free
- **Classic Mode** (unlockable): Runaway risk, sickness, care mistakes, evolution variants

Players choose their experience. Both modes share core mechanics but differ in consequences.

**CRITICAL:** Classic mode has NO DEATH. Pets run away (48h lockout) but always return.

---

# 1. DUAL MODE SYSTEM

## Mode Selection

```
┌─────────────────────────────────────────┐
│         CHOOSE YOUR PLAY STYLE          │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      🌸 COZY MODE 🌸            │   │
│  │                                 │   │
│  │  • Pet never runs away         │   │
│  │  • No penalties                │   │
│  │  • Gentle reminders            │   │
│  │  • Pure relaxation             │   │
│  │                                 │   │
│  │  "Your pet will always love    │   │
│  │   you, no matter what!"        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     🎮 CLASSIC MODE 🎮          │   │
│  │         🔒 Level 10             │   │
│  │                                 │   │
│  │  • Pet can get sick or run away│   │
│  │  • Care mistakes matter        │   │
│  │  • Evolution variants          │   │
│  │  • Higher stakes, more reward  │   │
│  │                                 │   │
│  │  "Like the virtual pets of     │   │
│  │   the 90s. Handle with care!"  │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Mode Unlock

| Mode | Requirement |
|------|-------------|
| Cozy | Default (always available) |
| Classic | Reach Level 10 with any pet |

## Mode Switching

- Can switch modes from Settings menu
- Switching to Classic: Warning modal explains stakes
- Switching to Cozy: No penalty, but care mistakes reset
- Active pet keeps current stats when switching

---

# 2. HIDDEN STATS SYSTEM ⚠️ NEW

## Design Philosophy

**Stats are HIDDEN.** Only Bond is visible. Pet SHOWS you what they need through BEHAVIOR.

### What's Visible
- **Bond hearts:** ♥♥♥♡♡ (0-5 scale)
- **Cooldown timer:** 30 min after feeding
- **Daily Moment indicator:** When active

### What's Hidden (Shown via Behavior)
- Fullness (pet begs when hungry)
- Mood (pet droops when sad)
- Energy (pet yawns when tired)

## Fullness States (Hidden)

| State | Range | Feed Value | Pet Behavior |
|-------|-------|------------|--------------|
| HUNGRY | 0-20 | 100% | Begs, stomach growls, 🍎❓ bubble |
| PECKISH | 21-40 | 75% | Glances at food occasionally |
| CONTENT | 41-70 | 50% | Happy idle, ignores food |
| SATISFIED | 71-90 | 25% | Shakes head if offered food |
| STUFFED | 91-100 | 0% | Turns away, blocks feeding, 🙅 bubble |

## UI Layout

```
┌─────────────────────────────────────────┐
│  🌅 Morning Bonus     ♥♥♥♡♡ Bond       │
├─────────────────────────────────────────┤
│                                         │
│              🟡 Munchlet                │
│                  😊                     │
│                                         │
│             [thought bubble             │
│              shows needs]               │
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

| Moment | Hours | Bonus | Icon |
|--------|-------|-------|------|
| Morning | 7-10 AM | +50% bond | 🌅 |
| Afternoon | 12-2 PM | +25% XP | ☀️ |
| Evening | 6-9 PM | +50% bond | 🌙 |

## Implementation

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
```

## Visual Indicator

When a moment is active, show indicator in corner with bonus info.

---

# 4. MEALS VS SNACKS

## Food Categories

| Category | Effect | Trade-off |
|----------|--------|-----------|
| **Meals** | +Fullness (primary), +small XP | Slow, filling, healthy |
| **Snacks** | +Happiness (primary), +Fullness (small) | Quick fix, weight risk |

## Meal Foods

| Food | Fullness | Happiness | XP | Cost |
|------|----------|-----------|-----|------|
| Apple 🍎 | +12 | +1 | 2 | 5 |
| Banana 🍌 | +10 | +2 | 2 | 5 |
| Carrot 🥕 | +8 | 0 | 1 | 5 |
| Grapes 🍇 | +14 | +1 | 3 | 15 |
| Spicy Taco 🌮 | +20 | +2 | 6 | 25 |
| Birthday Cake 🎂 | +25 | +5 | 10 | 50 |
| Golden Feast 👑 | +30 | +5 | 20 | 150 |

## Snack Foods

| Food | Fullness | Happiness | XP | Cost | Weight Risk |
|------|----------|-----------|-----|------|-------------|
| Cookie 🍪 | +5 | +15 | 4 | 15 | +5% |
| Candy 🍬 | +3 | +20 | 3 | 20 | +10% |
| Ice Cream 🍦 | +5 | +25 | 5 | 30 | +10% |
| Lollipop 🍭 | +2 | +18 | 2 | 10 | +8% |
| Dream Treat ⭐ | +10 | +30 | 12 | 75 | None |

---

# 5. COZY MODE SPECIFICS

## Consequences (Gentle)

| Situation | Cozy Mode Response |
|-----------|-------------------|
| Fullness = 0 | Pet looks sad, gentle notification |
| Happiness = 0 | Pet looks bored, no penalty |
| Uncleaned poop | Pet uncomfortable, mood decays faster |
| Weight = Obese | Visual change only, no penalties |
| Long absence | Pet extra happy to see you, bonus XP |

## No Runaway, No Sickness

- Pet cannot run away
- Pet cannot get sick
- No care mistakes recorded
- Evolution is always positive
- Notifications are gentle and optional

## "Welcome Back" Bonus

| Time Away | Bonus |
|-----------|-------|
| 6-12 hours | +10 XP, "I missed you!" |
| 12-24 hours | +25 XP, +5 coins |
| 24-48 hours | +50 XP, +10 coins |
| 48+ hours | +100 XP, +20 coins, celebration |

---

# 6. CLASSIC MODE SPECIFICS ⚠️ UPDATED

## RUNAWAY SYSTEM (Not Death)

**CRITICAL: There is NO death in Grundy. Pets run away but always return.**

### Neglect Path

```
Stage 1: Pet seems unhappy (warning)
    ↓ (continued neglect)
Stage 2: Pet gets sick (sickness)
    ↓ (continued neglect)
Stage 3: Pet threatens to leave (final warning)
    ↓ (continued neglect)
Stage 4: Pet runs away (48h lockout)
```

### Runaway State

```typescript
const RUNAWAY_CONFIG = {
  lockoutDuration: 48 * 60 * 60 * 1000, // 48 hours
  
  return: {
    waitTime: 48 * 60 * 60 * 1000,  // Free after 48h
    gemCost: 25,                     // Apologize early
    bondPenalty: 0.5                 // -50% bond on return
  },
  
  permanent: false  // Pet ALWAYS returns
};
```

### Runaway Screen

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

## Care Mistakes System

```
Hidden counter: care_mistakes (per evolution stage)

Triggers:
- Fullness = 0 for 30+ minutes → +1 mistake
- Happiness < 20 for 2+ hours → +1 mistake  
- Poop uncleaned for 2+ hours → +1 mistake
- Pet sick and untreated for 1+ hour → +1 mistake

Resets at each evolution (Baby → Youth → Evolved)
```

## Sickness System

```
Sickness Chance Triggers:
- Fullness = 0 for 30+ min: 20% chance
- Uncleaned poop for 2+ hours: 15% chance
- Overfeeding snacks when overweight: 5% per snack

Sick State:
- Pet shows sick animation (green face, thermometer)
- All stat decay 2× faster
- Cannot play mini-games
- Must use Medicine item to cure

Medicine:
- Cost: 50 coins OR watch ad
- Cures sickness immediately
```

## Evolution Variants (Corruption)

```typescript
const EVOLUTION_VARIANTS = {
  good: {
    condition: '0-1 care mistakes',
    appearance: 'Vibrant colors, special effects',
    bonus: '+10% all gains'
  },
  neutral: {
    condition: '2-3 care mistakes',
    appearance: 'Standard appearance',
    bonus: 'None'
  },
  bad: {
    condition: '4+ mistakes OR repeated runaway',
    appearance: '"Survivor" variant, darker colors',
    healable: true,
    healTime: '30 days of good care'
  }
};
```

---

# 7. FEEDING LIMITS SYSTEM

## 30-Minute Cooldown

After feeding, a cooldown timer is visible. Feeding during cooldown gives reduced value.

```typescript
const FEEDING_COOLDOWN = 30 * 60 * 1000; // 30 min
const COOLDOWN_FEED_MULTIPLIER = 0.25;   // 25% value
```

## Fullness-Based Feed Value

| Fullness State | Feed Value |
|----------------|------------|
| Hungry (0-20) | 100% |
| Peckish (21-40) | 75% |
| Content (41-70) | 50% |
| Satisfied (71-90) | 25% |
| Stuffed (91-100) | 0% (blocked) |

## Snack Limit

- Maximum 2 snacks per hour
- Exceeding limit in Classic mode: forced +15 weight

---

# 8. EVENTS & LOGIN STREAKS

## Daily Events

| Day | Event | Effect |
|-----|-------|--------|
| Monday | Mini-game Monday | 2× rewards |
| Wednesday | Wellness Wednesday | -50% mood decay |
| Friday | Friendship Friday | 2× bond gains |
| Weekend | Weekend Feast | Rare food 50% off |

## Login Streak Rewards

| Day | Reward |
|-----|--------|
| 1 | 10 coins |
| 2 | 20 coins |
| 3 | 30 coins |
| 4 | 1 common food |
| 5 | 50 coins |
| 6 | 1 rare food |
| 7 | 10 gems + Mystery Box |

---

# 9. ITEM SHOP EXPANSION

## New Items

| Item | Cost | Effect |
|------|------|--------|
| Medicine 💊 | 50 coins | Cures sickness |
| Diet Food 🥗 | 30 coins | -20 weight, +5 fullness |
| Energy Drink ⚡ | 25 coins | +50 energy instantly |
| Mood Boost 💖 | 40 coins | +30 happiness instantly |
| Cleaning Brush 🧹 | 10 coins | Auto-clean for 1 hour |

---

# 10. MINI-GAME REWARDS ⚠️ CONSERVATIVE

## Reward Tiers

| Tier | Score | Coins | Gems | Food |
|------|-------|-------|------|------|
| Bronze | 0-99 | 3 | 0 | None |
| Silver | 100-199 | 7 | 0 | 40% common |
| Gold | 200-299 | 15 | 0 | 75% any |
| Rainbow | 300+ | 22 | 1 | 100% rare |

## Per-Game Bonuses

- Bond: +0.3
- Happiness: +5

## Energy System

- Max: 50 energy
- Cost: 10 per game
- Regen: 1 per 30 min
- First daily game: FREE

---

# 11. SUMMARY

## Cozy Mode (Default)
- No runaway, no sickness
- Gentle reminders
- Welcome back bonuses
- Pure relaxation
- Weight visual change only

## Classic Mode (Level 10 unlock)
- **Runaway possible (NOT death)** — 48h lockout
- Sickness system
- Care mistakes affect evolution
- Corruption variants (healable)
- Higher stakes, more meaningful care

## New Systems (Both Modes)
- **Hidden stats** — only Bond visible
- **Fullness behaviors** — pet shows needs
- **Daily Moments** — time-based bonuses
- Snacks vs Meals
- Weight system
- Poop cleaning
- **Conservative mini-game rewards**
- Events and login streaks

---

**This creates TWO games in one:**
- Casual players get cozy comfort
- Engaged players get meaningful stakes
- **NO DEATH** — pets run away but always return

---

*END OF HYBRID MODE EXPANSION v2.1*
