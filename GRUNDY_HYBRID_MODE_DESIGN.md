# GRUNDY — HYBRID MODE EXPANSION

**Version:** 5.0  
**Date:** December 2024  
**Status:** Design Spec  
**Adds:** Dual game modes, Snack system, Cleaning mechanic, Special events

---

## OVERVIEW

Grundy now supports two play styles:
- **Cozy Mode** (default): No death, gentle reminders, stress-free
- **Classic Mode** (unlockable): Stakes, sickness, care mistakes, evolution branches

Players choose their experience. Both modes share core mechanics but differ in consequences.

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
│  │  • Pet never dies              │   │
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
│  │  • Pet can get sick or die     │   │
│  │  • Care mistakes matter        │   │
│  │  • Evolution branches          │   │
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

# 2. HUNGER & HAPPINESS SYSTEM (REVISED)

## Two Core Meters

| Meter | Purpose | Decay Rate | Fills With |
|-------|---------|------------|------------|
| **Hunger** | Survival need | Fast | Meals |
| **Happiness** | Quality of life | Slower | Snacks, Play, Petting |

## Decay Rates by Life Stage

| Stage | Hunger Decay | Happiness Decay |
|-------|--------------|-----------------|
| Baby (Lv 1-6) | 1 point / 30 min | 1 point / 60 min |
| Youth (Lv 7-12) | 1 point / 45 min | 1 point / 90 min |
| Evolved (Lv 13+) | 1 point / 60 min | 1 point / 120 min |

## Decay Multipliers by Pet

| Pet | Hunger Decay | Notes |
|-----|--------------|-------|
| Munchlet | 1.0× | Balanced |
| Grib | 1.25× | Gets hungry fast |
| Plompo | 0.75× | Low maintenance |
| Fizz | 1.5× | Very hungry |
| Ember | 1.25× | Fast metabolism |
| Chomper | 2.0× | Always starving |
| Whisp | 0.5× | Barely eats |
| Luxe | 1.0× | Balanced |

---

# 3. MEALS VS SNACKS

## Food Categories

| Category | Effect | Trade-off |
|----------|--------|-----------|
| **Meals** | +Hunger (primary), +small XP | Slow, filling, healthy |
| **Snacks** | +Happiness (primary), +Hunger (small) | Quick fix, but risks |

## Meal Foods

| Food | Hunger | Happiness | XP | Cost | Notes |
|------|--------|-----------|-----|------|-------|
| Apple 🍎 | +12 | +1 | 2 | 5 | Basic meal |
| Banana 🍌 | +10 | +2 | 2 | 5 | Sweet meal |
| Carrot 🥕 | +8 | 0 | 1 | 5 | Healthy, boring |
| Grapes 🍇 | +14 | +1 | 3 | 15 | Quality meal |
| Spicy Taco 🌮 | +20 | +2 | 6 | 25 | Hearty meal |
| Birthday Cake 🎂 | +25 | +5 | 10 | 50 | Special meal |
| Golden Feast 👑 | +30 | +5 | 20 | 150 | Premium meal |

## Snack Foods (NEW)

| Food | Hunger | Happiness | XP | Cost | Risk |
|------|--------|-----------|-----|------|------|
| Cookie 🍪 | +5 | +15 | 4 | 15 | +5% weight |
| Candy 🍬 | +3 | +20 | 3 | 20 | +10% weight |
| Ice Cream 🍦 | +5 | +25 | 5 | 30 | +10% weight |
| Hot Pepper 🌶️ | +8 | +10 | 5 | 25 | +5% sickness (Classic) |
| Dream Treat ⭐ | +10 | +30 | 12 | 75 | No risk |
| Lollipop 🍭 | +2 | +18 | 2 | 10 | +8% weight |

## Snack Risks

### Weight System (Both Modes)

```
Weight Level: 0-100

Gain: Each snack adds to hidden weight meter
Decay: -1 weight per hour naturally

Weight Effects:
0-30:   Normal (no effect)
31-60:  Chubby (visual change, pet looks rounder)
61-80:  Overweight (happiness decay 1.5×, sluggish animations)
81-100: Obese (happiness decay 2×, can't play mini-games)

Cure: Don't feed snacks for 24 hours, or use "Diet Food" item
```

### Visual Weight Stages

| Weight | Pet Appearance |
|--------|----------------|
| Normal | Standard sprite |
| Chubby | Slightly rounder, cute |
| Overweight | Noticeably round, slower movement |
| Obese | Very round, sweat drops, wheezing animation |

---

# 4. CLEANING / WASTE SYSTEM

## Poop Mechanic

```
After every 3-4 feedings → Pet poops 💩
Visual: Poop emoji appears near pet
Must tap to clean

If not cleaned within:
- 30 min: Pet looks uncomfortable
- 1 hour: Mood decays 2× faster
- 2 hours (Classic): +20% sickness chance
```

## Cleaning UI

```
┌─────────────────────────────────────────┐
│                                         │
│              🟡 Munchlet                │
│                 😣                      │
│                                         │
│            💩         💩               │
│                                         │
│        [Tap the poop to clean!]         │
│                                         │
└─────────────────────────────────────────┘

After cleaning:
- Pet does happy animation
- +2 Happiness
- +0.1 Bond
- Satisfying "sparkle clean" effect
```

## Poop Frequency by Pet

| Pet | Poops Every | Notes |
|-----|-------------|-------|
| Munchlet | 4 feedings | Average |
| Grib | 3 feedings | Messy |
| Plompo | 5 feedings | Efficient |
| Fizz | 3 feedings | Hyper digestion |
| Ember | 4 feedings | Average |
| Chomper | 2 feedings | Constant eating = constant pooping |
| Whisp | 6 feedings | Ethereal, minimal waste |
| Luxe | 4 feedings | Average (but complains more) |

---

# 5. COZY MODE SPECIFICS

## Consequences (Gentle)

| Situation | Cozy Mode Response |
|-----------|-------------------|
| Hunger = 0 | Pet looks sad, gentle notification "Your pet misses you! 💕" |
| Happiness = 0 | Pet looks bored, no penalty |
| Uncleaned poop | Pet uncomfortable, mood decays faster |
| Weight = Obese | Visual change only, no penalties |
| Long absence | Pet extra happy to see you, bonus XP on return |

## No Death, No Sickness

- Pet cannot die
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
| 48+ hours | +100 XP, +20 coins, "You're back!" celebration |

---

# 6. CLASSIC MODE SPECIFICS

## Care Mistakes System

```
Hidden counter: care_mistakes (per evolution stage)

Triggers:
- Hunger = 0 for 30+ minutes → +1 mistake
- Happiness < 20 for 2+ hours → +1 mistake  
- Poop uncleaned for 2+ hours → +1 mistake
- Pet sick and untreated for 1+ hour → +1 mistake

Resets at each evolution (Baby → Youth → Evolved)
```

## Sickness System

```
Sickness Chance Triggers:
- Hunger = 0 for 30+ min: 20% chance
- Uncleaned poop for 2+ hours: 15% chance
- Overfeeding snacks: 5% per snack when overweight
- Hot Pepper food: 5% chance always

Sick State:
- Pet shows sick animation (green face, thermometer)
- All stat decay 2× faster
- Cannot play mini-games
- Must use Medicine item to cure

Medicine:
- Cost: 50 coins OR watch ad
- Cures sickness immediately
- Pet needs feeding after to recover fully
```

## Death System

```
Death Trigger:
IF sick == TRUE 
AND hunger == 0 
AND time_sick > 4 hours
THEN pet_dies()

Death Sequence:
1. Screen dims
2. Sad music plays
3. Pet fades with angel wings 😇
4. "Your pet has passed away..."
5. Tombstone appears with pet name
6. [Start Over] button

Tombstone stays for 24 hours, then can hatch new egg
Can skip wait with 100 gems
```

## Evolution Branches

```
Based on care_mistakes per stage:

Baby Stage (Lv 1-6):
- 0-1 mistakes → "Perfect Baby" badge
- 2-3 mistakes → Normal
- 4+ mistakes → "Troubled Start" badge

Youth Stage (Lv 7-12):
- 0-1 mistakes → "Model Youth" badge
- 2-3 mistakes → Normal
- 4+ mistakes → "Neglected Youth" badge

Evolution Results (Lv 13):
┌──────────────────────────────────────────────┐
│  Perfect Baby + Model Youth = RARE FORM ✨   │
│  - Unique appearance                         │
│  - +20% all stats                            │
│  - Special animations                        │
│  - Achievement unlocked                      │
├──────────────────────────────────────────────┤
│  Normal + Normal = STANDARD FORM             │
│  - Regular evolved appearance                │
├──────────────────────────────────────────────┤
│  Troubled/Neglected = ALTERED FORM 😔        │
│  - Different (not ugly, just different)      │
│  - -10% happiness decay                      │
│  - Unique "survivor" animations              │
│  - Achievement unlocked                      │
└──────────────────────────────────────────────┘
```

## Notifications (Classic Mode)

| Urgency | Message | When |
|---------|---------|------|
| Gentle | "Your pet is getting hungry! 🍽️" | Hunger < 30 |
| Urgent | "Your pet is VERY hungry! ⚠️" | Hunger = 0 |
| Critical | "Your pet is SICK! 🏥" | Sickness triggered |
| Emergency | "Your pet needs you NOW! 💔" | Sick + Hunger = 0 |

---

# 7. SPECIAL EVENTS SYSTEM

## Daily Events

| Event | Trigger | Reward |
|-------|---------|--------|
| First Feed | First feeding of the day | +1 gem |
| Clean Streak | Clean all poop same day | +5 coins |
| Perfect Day | No hunger/happiness below 50 | +10 coins, +2 gems |

## Weekly Events

| Day | Event | Reward |
|-----|-------|--------|
| Monday | Mini-game Monday | 2× mini-game rewards |
| Wednesday | Wisdom Wednesday | +50% XP from feeding |
| Friday | Friendship Friday | +2× bond gain |
| Sunday | Surprise Sunday | Random rare food gift |

## Login Streak

| Day | Reward |
|-----|--------|
| 1 | 10 coins |
| 2 | 20 coins |
| 3 | 30 coins |
| 4 | 40 coins |
| 5 | 50 coins |
| 6 | 1 rare food |
| 7 | 10 gems + Mystery Box |

## Monthly Events

| Month | Event | Special Content |
|-------|-------|-----------------|
| January | New Year | Firework cosmetics, Party Hat |
| February | Valentine's | Heart effects, Love Letter item |
| March | Spring | Flower cosmetics, Easter Egg hunt |
| April | April Fools | Silly food effects, Joke items |
| May | Mother's Day | Flower bouquet, Thank You card |
| June | Summer | Beach cosmetics, Sunglasses |
| July | Birthday Month | Birthday cake bonus, Party mode |
| October | Halloween | Spooky costumes, Candy overload |
| November | Thanksgiving | Feast foods, Gratitude bonus |
| December | Winter | Snow effects, Holiday cosmetics |

## Birthday Event

```
On account anniversary (or set date):

- Birthday banner appears
- Pet wears party hat
- Free Birthday Cake
- +100 coins, +20 gems
- Exclusive "Birthday" cosmetic unlocked
- All feeding gives 2× XP for 24 hours
```

## Event UI

```
┌─────────────────────────────────────────┐
│  🎉 FRIENDSHIP FRIDAY! 🎉              │
│                                         │
│  All bond gains are DOUBLED today!      │
│                                         │
│  Time remaining: 8:32:15                │
│                                         │
│  [Dismiss]                              │
└─────────────────────────────────────────┘
```

---

# 8. SLEEP CYCLE (Optional)

## Bedtime Mechanic

---

# 8. FEEDING LIMITS SYSTEM

## The Problem

Without limits, players can spam-feed until inventory is empty, which:
- Trivializes hunger mechanic
- Makes weight system instant (spam snacks → instant obese)
- Removes strategy from care routine
- Breaks the "check-in" design

## Solution: Stomach Capacity + Limits

### Stomach System

```
Each pet has a stomach with limited capacity.
Stomach empties over time (1 slot per 12 minutes).
When full, pet refuses food.

Visual:
┌─────────────────────────────────────────┐
│  🟡 Munchlet          Stomach: ●●●○○   │
│                        (3/5 full)       │
└─────────────────────────────────────────┘
```

### Stomach Capacity by Pet

| Pet | Capacity | Empties In | Notes |
|-----|----------|------------|-------|
| Munchlet | 5 slots | 60 min | Balanced |
| Grib | 4 slots | 48 min | Smaller stomach |
| Plompo | 6 slots | 72 min | Big eater |
| Fizz | 4 slots | 48 min | Fast metabolism |
| Ember | 4 slots | 48 min | Picky |
| Chomper | 8 slots | 96 min | Huge stomach |
| Whisp | 3 slots | 36 min | Barely eats |
| Luxe | 5 slots | 60 min | Balanced |

### Feeding Rules

| Rule | Trigger | Cozy Mode | Classic Mode |
|------|---------|-----------|--------------|
| Stomach Full | 5/5 slots used | "I'm full! Try later 🫃" | Same |
| Hunger Full | Hunger >= 95 | "Too full to eat!" | Same |
| Overfeed | 3+ foods in 5 min | Warning only | +10% sickness |
| Snack Limit | 2+ snacks/hour | "Too many treats! 🍬" | Forced +15 weight |

### Overfeed Warning

```
┌─────────────────────────────────────────┐
│         ⚠️ Slow Down!                  │
│                                         │
│   Your pet needs time to digest.        │
│   Wait a few minutes before feeding     │
│   again.                                │
│                                         │
│   Stomach: ●●●●● (FULL)                │
│   Next slot opens in: 4:32              │
│                                         │
│              [OK]                       │
└─────────────────────────────────────────┘
```

### Snack Limit Warning

```
┌─────────────────────────────────────────┐
│         🍬 Too Many Treats!            │
│                                         │
│   Your pet can only have 2 snacks       │
│   per hour.                             │
│                                         │
│   Snacks today: 🍪🍦 (2/2)             │
│   Next snack in: 23:15                  │
│                                         │
│              [OK]                       │
└─────────────────────────────────────────┘
```

### Visual Feedback

| State | Visual |
|-------|--------|
| Empty stomach | Pet looks hungry, thought bubble 🍽️ |
| Partially full | Normal |
| Full stomach | Pet rubs belly, satisfied face |
| Overfed | Pet looks uncomfortable, sweat drops |

### Strategy This Creates

| Situation | Player Decision |
|-----------|-----------------|
| Low hunger, 1 stomach slot | Use high-hunger meal (Birthday Cake) |
| Full stomach, low happiness | Wait, or use Mood Boost item |
| Want to level fast | Plan feeds throughout day |
| Snack limit reached | Use meals for happiness instead |

---

# 9. SLEEP CYCLE (Optional)

```
Set bedtime in Settings (e.g., 10:00 PM)
Set wake time (e.g., 7:00 AM)

During sleep hours:
- Pet shows sleeping animation 😴
- No hunger/happiness decay
- Cannot feed or play
- "Shhh... your pet is sleeping"

Benefits:
- Forces daily "put to bed" ritual
- Protects from overnight neglect (especially Classic mode)
- Realistic day/night cycle
```

## Sleep UI

```
┌─────────────────────────────────────────┐
│                                         │
│           🌙 Goodnight! 🌙              │
│                                         │
│              🟡💤                       │
│           Munchlet is                   │
│            sleeping...                  │
│                                         │
│        Wake time: 7:00 AM               │
│                                         │
│  [Disable Sleep Mode]                   │
└─────────────────────────────────────────┘
```

---

# 9. ITEM SHOP EXPANSION

## New Items

| Item | Cost | Effect |
|------|------|--------|
| Medicine 💊 | 50 coins | Cures sickness |
| Diet Food 🥗 | 30 coins | -20 weight, +5 hunger |
| Energy Drink ⚡ | 25 coins | +50 energy instantly |
| Sleep Potion 😴 | 20 coins | Skip to wake time |
| Wake Potion ☀️ | 20 coins | Wake pet early |
| Cleaning Brush 🧹 | 10 coins | Auto-clean for 1 hour |
| Air Freshener 🌸 | 15 coins | Poop decay slower |
| Mood Boost 💖 | 40 coins | +30 happiness instantly |

---

# 10. NEW TICKETS

## Milestone M7-HYBRID

| ID | Task | Priority |
|----|------|----------|
| WEB-036 | Implement dual mode system (Cozy/Classic) | P0 |
| WEB-037 | Add Happiness meter (separate from Mood) | P0 |
| WEB-038 | Create Snack food category with weight system | P0 |
| WEB-039 | Implement cleaning/poop mechanic | P1 |
| WEB-040 | Add sickness system (Classic mode) | P1 |
| WEB-041 | Add death system (Classic mode) | P1 |
| WEB-042 | Implement care mistakes tracking | P1 |
| WEB-043 | Create evolution branches (Classic mode) | P2 |
| WEB-044 | Add daily/weekly events system | P1 |
| WEB-045 | Add login streak rewards | P1 |
| WEB-046 | Add monthly special events | P2 |
| WEB-047 | Implement sleep cycle (optional) | P2 |
| WEB-048 | Add new shop items (medicine, diet food, etc.) | P1 |
| WEB-049 | Create notification system (gentle vs urgent) | P1 |
| WEB-050 | Add weight visualization (pet appearance changes) | P2 |
| WEB-051 | Implement feeding limits and stomach system | P0 |

---

# 11. IMPLEMENTATION PRIORITY

## Phase 1: Core Hybrid (P0)
1. WEB-036: Dual mode toggle
2. WEB-037: Happiness meter
3. WEB-038: Snacks + weight
4. WEB-051: Feeding limits + stomach system

## Phase 2: Maintenance Loop (P1)
5. WEB-039: Poop/cleaning
6. WEB-048: New items
7. WEB-044: Daily/weekly events
8. WEB-045: Login streaks

## Phase 3: Classic Stakes (P1)
9. WEB-040: Sickness
10. WEB-041: Death
11. WEB-042: Care mistakes
12. WEB-049: Notifications

## Phase 4: Polish (P2)
13. WEB-043: Evolution branches
14. WEB-046: Monthly events
15. WEB-047: Sleep cycle
16. WEB-050: Weight visuals

---

# 12. SUMMARY

## Cozy Mode (Default)
- No death, no sickness
- Gentle reminders
- Welcome back bonuses
- Pure relaxation
- Weight visual change only (no penalties)
- Overfeed warning only (no penalty)

## Classic Mode (Level 10 unlock)
- Death possible (if sick + starving 4+ hours)
- Sickness system
- Care mistakes affect evolution
- Urgent notifications
- Overfeed = sickness risk
- Higher stakes, more meaningful care

## New Systems (Both Modes)
- Snacks vs Meals (happiness vs hunger)
- Weight system (visual + gameplay effects)
- Poop cleaning mechanic
- **Feeding limits (stomach capacity)**
- Daily/weekly/monthly events
- Login streaks
- Sleep cycle (optional)

---

**This creates TWO games in one:**
- Casual players get cozy comfort
- Hardcore players get Tamagotchi stakes
- Everyone gets snacks, cleaning, events, and **strategic feeding**

---

*END OF HYBRID MODE EXPANSION*
