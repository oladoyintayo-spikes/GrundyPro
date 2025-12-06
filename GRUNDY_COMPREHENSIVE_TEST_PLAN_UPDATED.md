# GRUNDY — COMPREHENSIVE TEST PLAN v3.1

**Version:** 3.1  
**Date:** December 2024  
**Aligned With:** GRUNDY_MASTER_DECISIONS.md  
**Total Test Cases:** 69

---

## ⚠️ CRITICAL ALIGNMENT TESTS

These tests verify Master Decisions are correctly implemented:

| TC | Decision | Test |
|----|----------|------|
| TC-A01 | Hidden Stats | Only Bond hearts visible |
| TC-A02 | Fullness Behavior | Pet behavior shows needs |
| TC-A03 | Daily Moments | Time bonuses active |
| TC-A04 | No Death | Runaway system works |
| TC-A05 | Conservative Rewards | Bronze=3c, Rainbow=22c+1g |
| TC-A06 | Achievement Unlocks | Fizz=Bond 5, Ember=10 games |

---

## TABLE OF CONTENTS

1. [Overview & Scope](#0-overview--scope)
2. [Alignment Tests (NEW)](#1-alignment-tests)
3. [First-Time Player Flow](#2-first-time-player-flow)
4. [Tutorial System](#3-tutorial-system)
5. [Hidden Stats & Behavior](#4-hidden-stats--behavior)
6. [Pet Care – Feeding, XP, Leveling](#5-pet-care--feeding-xp-leveling)
7. [Daily Moments System](#6-daily-moments-system)
8. [Shop System](#7-shop-system)
9. [Pet Management & Unlocks](#8-pet-management--unlocks)
10. [Mini-Games](#9-mini-games)
11. [Settings & UI](#10-settings--ui)
12. [Dev Panel](#11-dev-panel)
13. [Persistence & Storage](#12-persistence--storage)
14. [Hybrid Mode (Cozy/Classic)](#13-hybrid-mode-cozy-classic)
15. [Runaway System (Classic)](#14-runaway-system-classic)
16. [Snacks & Weight System](#15-snacks--weight-system)
17. [Poop & Cleaning](#16-poop--cleaning)
18. [Sound & Vibration](#17-sound--vibration)
19. [Pet Animations](#18-pet-animations)
20. [Activity-Based Backgrounds (NEW)](#19-activity-based-backgrounds)
21. [Preference Discovery (NEW)](#20-preference-discovery)
22. [Test Results Template](#21-test-results-template)

---

## 0. Overview & Scope

### Target Platforms

| Platform | Browser | Notes |
|----------|---------|-------|
| Desktop | Chrome (current) | Primary |
| Mobile (emulated) | Chrome DevTools | Viewport ≤ 430×800 |
| Android | Chrome Mobile | Vibration testing |
| iOS | Safari | Audio unlock testing |

### Test Result Codes

| Code | Meaning |
|------|---------|
| ✅ PASS | Works as expected |
| ❌ FAIL | Does not work as expected |
| ⚠️ EDGE | Works but needs polish |
| 🚫 BLOCKED | Cannot test (dependency issue) |

---

## 1. Alignment Tests (NEW)

### TC-A01: Hidden Stats — Only Bond Visible

**Precondition:** In Pet Care screen

**Steps:**
1. Observe UI elements
2. Look for any stat bars

**Expected:**
- ✅ Bond hearts visible (♥♥♥♡♡)
- ❌ NO hunger bar
- ❌ NO mood bar
- ❌ NO energy bar
- ✅ Cooldown timer visible (after feeding)

**Result:** ⬜

---

### TC-A02: Fullness Behavior — Pet Shows Needs

**Steps:**
1. Use Dev Panel to set fullness to 10 (hungry)
2. Observe pet behavior
3. Set fullness to 95 (stuffed)
4. Try to feed

**Expected:**
- Fullness 10: Pet begs, shows 🍎❓ bubble
- Fullness 95: Pet turns away, shows 🙅 bubble
- Feeding blocked when stuffed

**Result:** ⬜

---

### TC-A03: Daily Moments — Time Bonuses

**Steps:**
1. Set system time to 8:00 AM
2. Check for morning indicator (🌅)
3. Feed pet, check bond gain
4. Set time to 1:00 PM
5. Check for afternoon indicator (☀️)
6. Feed pet, check XP gain

**Expected:**
- Morning (7-10 AM): 🌅 visible, +50% bond
- Afternoon (12-2 PM): ☀️ visible, +25% XP
- Evening (6-9 PM): 🌙 visible, +50% bond

**Result:** ⬜

---

### TC-A04: No Death — Runaway System

**Precondition:** Classic mode enabled

**Steps:**
1. Neglect pet until runaway triggers
2. Observe runaway screen
3. Check for "death" text (should NOT exist)

**Expected:**
- Pet runs away (not dies)
- 48-hour lockout timer shown
- Can pay 25 gems to return early
- Bond reduced 50% on return
- NO death anywhere in UI

**Result:** ⬜

---

### TC-A05: Conservative Rewards

**Steps:**
1. Play Snack Catch, score 50 (Bronze)
2. Check coin reward
3. Play again, score 350 (Rainbow)
4. Check coin and gem reward

**Expected:**
- Bronze (0-99): 3 coins, 0 gems
- Silver (100-199): 7 coins, 0 gems
- Gold (200-299): 15 coins, 0 gems
- Rainbow (300+): 22 coins, 1 gem

**Result:** ⬜

---

### TC-A06: Achievement Unlocks

**Steps:**
1. Check Fizz unlock requirement
2. Check Ember unlock requirement
3. Verify NO gem purchase option for Fizz/Ember

**Expected:**
- Fizz: "Reach Bond Level 5" (NOT gems)
- Ember: "Complete 10 mini-games" (NOT gems)
- Premium pets (Chomper/Whisp/Luxe): Show multiple options

**Result:** ⬜

---

## 2. First-Time Player Flow

### TC-01: Fresh Boot → Splash → Intro → Pet Pick

**Precondition:** `localStorage['grundy-save-v2']` removed

**Steps:**
1. Load game
2. Observe splash screen
3. Tap to start
4. Observe intro (1 page, skippable)
5. Pet selection screen

**Expected:**
- Splash shows title "Grundy"
- Intro is 1 page (not multiple story pages)
- Pet pick shows 3 starters with origin snippets
- Origin snippets show personality, NOT mechanics
- Mode selection happens AFTER tutorial

**Result:** ⬜

---

### TC-02: Skip Intro Flow

**Steps:**
1. Load game → Splash → tap
2. On intro screen, tap "Skip"

**Expected:**
- Land directly on Pet Pick Screen
- No leftover artifacts

**Result:** ⬜

---

### TC-03: Pet Selection with Origins

**Steps:**
1. On pet selection, read each pet's description

**Expected:**
- Munchlet: "Found on a sunny windowsill, humming..."
- Grib: "Appeared in a shadow behind the cupboard, grinning..."
- Plompo: "Discovered sleeping in a cloud that drifted too low..."
- NO mechanics shown (no "+10% bond" etc)

**Result:** ⬜

---

## 3. Tutorial System

### TC-04: Tutorial Step Progression

**Steps:**
1. Select pet, proceed to tutorial
2. Step 1: Feed instruction
3. Step 2: Reaction explanation
4. Step 3: Bond hearts explanation
5. Complete tutorial

**Expected:**
- Step 1: "Tap a food to feed your pet!"
- Step 2: "See how they react? They'll show you what they like!"
- Step 3: "Build your bond to unlock new friends!" (points to hearts)
- After tutorial: Mode selection (Cozy default)

**Result:** ⬜

---

### TC-05: Mode Selection After Tutorial

**Steps:**
1. Complete tutorial
2. Observe mode selection screen

**Expected:**
- Cozy Mode shown as default/recommended
- Classic Mode locked (shows "Level 10")
- Player can only select Cozy initially

**Result:** ⬜

---

## 4. Hidden Stats & Behavior

### TC-10: Bond Hearts Display

**Steps:**
1. Record current bond level
2. Feed pet to increase bond
3. Observe heart changes

**Expected:**
- Hearts update: ♥♥♥♡♡ → ♥♥♥♥♡
- Smooth visual transition
- Bond level 0-5 maps to hearts filled

**Result:** ⬜

---

### TC-11: Fullness State — Hungry

**Steps:**
1. Set fullness to 15 (Dev Panel)
2. Observe pet behavior

**Expected:**
- Pet shows begging animation
- Thought bubble: 🍎❓
- Stomach growl sound (if audio on)

**Result:** ⬜

---

### TC-12: Fullness State — Peckish

**Steps:**
1. Set fullness to 30

**Expected:**
- Pet occasionally glances at food
- No thought bubble
- Normal-ish behavior

**Result:** ⬜

---

### TC-13: Fullness State — Content

**Steps:**
1. Set fullness to 55

**Expected:**
- Pet has happy idle animation
- Ignores food area
- No special indicators

**Result:** ⬜

---

### TC-14: Fullness State — Satisfied

**Steps:**
1. Set fullness to 80
2. Try to feed pet

**Expected:**
- Pet shakes head
- Thought bubble: 😌
- Feed value reduced to 25%

**Result:** ⬜

---

### TC-15: Fullness State — Stuffed

**Steps:**
1. Set fullness to 95
2. Try to feed pet

**Expected:**
- Pet turns away
- Thought bubble: 🙅
- Feeding BLOCKED
- Message: "Too full right now!"

**Result:** ⬜

---

### TC-16: Cooldown Timer Visibility

**Steps:**
1. Feed pet
2. Observe cooldown timer
3. Wait for countdown

**Expected:**
- "⏱️ Feed in: 29:45" visible
- Timer counts down
- Feeding during cooldown = 25% value

**Result:** ⬜

---

## 5. Pet Care – Feeding, XP, Leveling

### TC-20: Basic Feeding — XP Calculation

**Steps:**
1. Record XP, bond, fullness state
2. Feed pet with known food
3. Verify XP = food.xp × affinityMult × moodMult × fullnessMult

**Expected:**
- Correct XP applied with all multipliers
- Floating "+X XP" text
- Feeding during Daily Moment applies bonus

**Result:** ⬜

---

### TC-21: Affinity — Loved Food

**Steps:**
1. Feed Munchlet a Cookie (loved)

**Expected:**
- Affinity: 2.0× multiplier
- Hearts animation
- Extra happy reaction

**Result:** ⬜

---

### TC-22: Affinity — Disliked Food

**Steps:**
1. Feed Munchlet a Spicy Taco (disliked)

**Expected:**
- Affinity: 0.5× multiplier
- Head shake animation
- Sweat drops

**Result:** ⬜

---

### TC-23: Level Up Trigger

**Steps:**
1. Set XP to 1 below threshold
2. Feed any food

**Expected:**
- Level increases
- Level-up modal with confetti
- Rewards: +50 coins, +5 gems (Luxe: +10)

**Result:** ⬜

---

### TC-24: Evolution Stage Changes

**Steps:**
1. Set level to 6 → check stage
2. Set level to 7 → check stage
3. Set level to 13 → check stage

**Expected:**
- Level 1-6: Baby
- Level 7-12: Youth
- Level 13+: Evolved

**Result:** ⬜

---

## 6. Daily Moments System

### TC-30: Morning Moment (7-10 AM)

**Steps:**
1. Set system time to 8:30 AM
2. Check for morning indicator
3. Feed pet, measure bond gain

**Expected:**
- 🌅 indicator visible
- Bond gain × 1.5
- Message: "Good morning! Extra cuddles!"

**Result:** ⬜

---

### TC-31: Afternoon Moment (12-2 PM)

**Steps:**
1. Set system time to 1:00 PM
2. Check for afternoon indicator
3. Feed pet, measure XP gain

**Expected:**
- ☀️ indicator visible
- XP gain × 1.25
- Message: "Snack time! Extra XP!"

**Result:** ⬜

---

### TC-32: Evening Moment (6-9 PM)

**Steps:**
1. Set system time to 7:30 PM
2. Check for evening indicator
3. Feed pet, measure bond gain

**Expected:**
- 🌙 indicator visible
- Bond gain × 1.5
- Message: "Evening cuddles!"

**Result:** ⬜

---

### TC-33: No Moment Active

**Steps:**
1. Set system time to 3:00 PM (outside any moment)
2. Check for indicators

**Expected:**
- No moment indicator visible
- No bonus applied

**Result:** ⬜

---

## 7. Shop System

### TC-40: Buy Food with Coins

**Steps:**
1. Record coins and inventory
2. Buy Apple (5 coins)

**Expected:**
- Coins decrease by 5
- Apple count increases by 1

**Result:** ⬜

---

### TC-41: Insufficient Coins

**Steps:**
1. Set coins to 3
2. Try to buy Apple (5 coins)

**Expected:**
- Purchase blocked
- "Not enough coins" message
- Error sound/vibration

**Result:** ⬜

---

## 8. Pet Management & Unlocks

### TC-50: Pet Selector Shows All 8 Pets

**Steps:**
1. Open Pet Selector

**Expected:**
- 3 starters: Munchlet, Grib, Plompo (unlocked)
- 2 earnable: Fizz, Ember (with achievement progress)
- 3 premium: Chomper, Whisp, Luxe (with unlock options)

**Result:** ⬜

---

### TC-51: Fizz Unlock — Bond Level 5

**Steps:**
1. Check Fizz's unlock requirement
2. Reach Bond Level 5 with any pet

**Expected:**
- Shows "Reach Bond Level 5 with any pet"
- NO gem purchase option
- Unlocks when condition met
- Celebration modal appears

**Result:** ⬜

---

### TC-52: Ember Unlock — 10 Mini-Games

**Steps:**
1. Check Ember's unlock requirement
2. Play 10 mini-games

**Expected:**
- Shows "Complete 10 mini-games (X/10)"
- Progress bar visible
- NO gem purchase option
- Unlocks when condition met

**Result:** ⬜

---

### TC-53: Premium Pet Options

**Steps:**
1. Check Chomper/Whisp/Luxe unlock options

**Expected:**
- "Grundy Plus" subscription option
- "$X.XX" purchase option
- "Reach Level X" achievement option
- All three methods shown

**Result:** ⬜

---

### TC-54: Switch Between Starters

**Steps:**
1. Switch from Munchlet to Grib
2. Switch back to Munchlet

**Expected:**
- Each pet has separate level/XP/bond
- Coins/gems/inventory shared
- Smooth transition

**Result:** ⬜

---

## 9. Mini-Games

### TC-60: Snack Catch — Gameplay

**Steps:**
1. Start Snack Catch
2. Play full 60 seconds

**Expected:**
- Foods fall from top
- Pet moves left/right
- Scoring works correctly
- Energy deducted (10)

**Result:** ⬜

---

### TC-61: Snack Catch — Conservative Rewards

**Steps:**
1. Score 50 → check rewards
2. Score 150 → check rewards
3. Score 250 → check rewards
4. Score 350 → check rewards

**Expected:**
- 50: 3 coins, 0 gems
- 150: 7 coins, 0 gems
- 250: 15 coins, 0 gems
- 350: 22 coins, 1 gem

**Result:** ⬜

---

### TC-62: Fizz Mini-Game Bonus

**Steps:**
1. Set active pet to Fizz
2. Play Snack Catch, score 200 (Gold)

**Expected:**
- Base: 15 coins
- Fizz bonus: +25% = 18.75 → 19 coins
- Bonus indicator shown

**Result:** ⬜

---

### TC-63: Energy System

**Steps:**
1. Check energy display
2. Play game (costs 10)
3. Wait for regen

**Expected:**
- Max energy: 50
- Cost per game: 10
- Regen: 1 per 30 min
- First daily game: FREE

**Result:** ⬜

---

## 10. Settings & UI

### TC-70: Sound Toggle

**Steps:**
1. Open Settings
2. Toggle sound off
3. Perform actions

**Expected:**
- All sounds stop
- Setting persists

**Result:** ⬜

---

### TC-71: Vibration Toggle

**Steps:**
1. Open Settings (Android)
2. Toggle vibration off
3. Perform actions

**Expected:**
- No vibrations
- Setting persists

**Result:** ⬜

---

## 11. Dev Panel

### TC-75: Fullness Slider

**Steps:**
1. Open Dev Panel
2. Set fullness to various values
3. Observe pet behavior changes

**Expected:**
- 0-20: Hungry behavior
- 91-100: Stuffed behavior
- Behavior updates immediately

**Result:** ⬜

---

### TC-76: Trigger Runaway (Classic)

**Steps:**
1. Enable Classic mode
2. Open Dev Panel
3. Click "Trigger Runaway"

**Expected:**
- Runaway screen appears
- 48h timer shown
- Can apologize with 25 gems

**Result:** ⬜

---

## 12. Persistence & Storage

### TC-80: State Persists on Refresh

**Steps:**
1. Feed pet, level up
2. Refresh browser
3. Check state

**Expected:**
- All progress saved
- Correct pet loaded
- Stats unchanged

**Result:** ⬜

---

## 13. Hybrid Mode (Cozy/Classic)

### TC-85: Cozy Mode — No Consequences

**Steps:**
1. In Cozy mode
2. Neglect pet completely
3. Wait extended period

**Expected:**
- Pet gets sad but NOT sick
- Pet does NOT run away
- Gentle notifications only

**Result:** ⬜

---

### TC-86: Classic Mode — Consequences

**Steps:**
1. Enable Classic mode
2. Neglect pet
3. Observe progression

**Expected:**
- Pet gets sick
- Care mistakes tracked
- Eventually runs away (NOT dies)

**Result:** ⬜

---

## 14. Runaway System (Classic)

### TC-90: Runaway Trigger

**Steps:**
1. Classic mode enabled
2. Neglect until stage 4

**Expected:**
- Stage 1: Sad
- Stage 2: Sick
- Stage 3: Warning (looking at exit)
- Stage 4: Runs away

**Result:** ⬜

---

### TC-91: Runaway Screen

**Steps:**
1. Pet has run away
2. Observe screen

**Expected:**
- Shows timer: "Returns in 47:32:15"
- Shows gem option: "Apologize for 25 💎"
- Shows warning: "Bond will be reduced by 50%"
- NO "death" or "died" text anywhere

**Result:** ⬜

---

### TC-92: Apologize with Gems

**Steps:**
1. Pet has run away
2. Click "Apologize for 25 💎"

**Expected:**
- 25 gems deducted
- Pet returns immediately
- Bond reduced by 50%
- Happy reunion animation

**Result:** ⬜

---

### TC-93: Wait for Return

**Steps:**
1. Pet has run away
2. Wait 48 hours (simulate)

**Expected:**
- Pet returns free
- Bond reduced by 50%
- No gem cost

**Result:** ⬜

---

## 15. Snacks & Weight System

### TC-95: Weight Gain from Snacks

**Steps:**
1. Feed snack (Candy)
2. Check weight

**Expected:**
- Weight increases by snack amount
- Weight visible in Dev Panel (hidden from player)

**Result:** ⬜

---

### TC-96: Weight Tiers

**Steps:**
1. Set weight to 35 (Chubby)
2. Set weight to 70 (Overweight)
3. Set weight to 90 (Obese)

**Expected:**
- Chubby: Pet slightly rounder
- Overweight: Pet noticeably round, slow
- Obese: Pet very round, sweat drops

**Result:** ⬜

---

## 16. Poop & Cleaning

### TC-100: Poop Appears

**Steps:**
1. Feed pet 3-4 times

**Expected:**
- 💩 appears near pet
- Varies by pet type

**Result:** ⬜

---

### TC-101: Tap to Clean

**Steps:**
1. Poop visible
2. Tap poop

**Expected:**
- Poop removed
- Sparkle effect
- +2 happiness, +0.1 bond
- Satisfying sound

**Result:** ⬜

---

## 17. Sound & Vibration

### TC-105: Behavior Sounds

**Steps:**
1. Set pet to hungry state
2. Listen for sounds

**Expected:**
- Stomach rumble plays
- Matches pet behavior

**Result:** ⬜

---

### TC-106: Runaway Sounds

**Steps:**
1. Trigger runaway (Classic)
2. Listen for sounds

**Expected:**
- Sad departure jingle
- NO death sound

**Result:** ⬜

---

### TC-107: Daily Moment Sound

**Steps:**
1. Enter a Daily Moment time window
2. Listen for sound

**Expected:**
- Soft chime plays
- Matches moment indicator appearing

**Result:** ⬜

---

## 18. Pet Animations

### TC-110: Fullness Behavior Animations

**Steps:**
1. Set fullness to 10 (hungry)
2. Observe animation
3. Set fullness to 95 (stuffed)
4. Observe animation

**Expected:**
- Hungry: Begging animation + bubble
- Stuffed: Turn away animation + bubble

**Result:** ⬜

---

### TC-111: Daily Moment Indicator

**Steps:**
1. Enter morning window
2. Observe indicator

**Expected:**
- 🌅 indicator visible
- Subtle glow around pet
- Bonus text shown

**Result:** ⬜

---

### TC-112: Runaway Warning Animation

**Steps:**
1. Reach stage 3 (warning)
2. Observe pet

**Expected:**
- Pet looks toward exit
- 💭🚪 thought bubble
- Pacing animation

**Result:** ⬜

---

## 19. Activity-Based Backgrounds (NEW)

### TC-115: Kitchen Background on Feeding

**Steps:**
1. Open Food Bag
2. Observe background

**Expected:**
- Background changes to kitchen
- Warm lighting
- Kitchen elements visible (counter, cabinets)

**Result:** ⬜

---

### TC-116: Playroom Background on Mini-Game

**Steps:**
1. Start any mini-game
2. Observe background

**Expected:**
- Background changes to playroom
- Bright lighting
- Playful elements (toys, blocks)

**Result:** ⬜

---

### TC-117: Time-Based Default Lighting

**Steps:**
1. Set system time to 8:00 AM
2. Return to main screen, observe
3. Set time to 8:00 PM
4. Observe lighting change

**Expected:**
- Morning (6-10 AM): Golden, warm lighting
- Day (10 AM-5 PM): Bright, neutral
- Evening (5-8 PM): Orange, warm
- Night (8 PM-6 AM): Blue, dim

**Result:** ⬜

---

### TC-118: Background Auto-Switch

**Steps:**
1. On main screen (living room)
2. Open food bag → should switch to kitchen
3. Close food bag → should return to living room

**Expected:**
- Smooth transition between backgrounds
- No manual navigation needed
- Context-appropriate switching

**Result:** ⬜

---

## 20. Preference Discovery (NEW)

### TC-120: Preferences Hidden Initially

**Steps:**
1. Fresh account, Day 1
2. Look for any preference display
3. Check if pet gives hints

**Expected:**
- No preference journal visible
- No hints from pet
- Player must discover through feeding

**Result:** ⬜

---

### TC-121: Learn by Feeding

**Steps:**
1. Feed Munchlet a Cookie (loved)
2. Feed Munchlet a Spicy Taco (disliked)
3. Observe reactions

**Expected:**
- Cookie: Hearts, special animation, "LOVES IT!"
- Taco: Head shake, sweat drops, "Yuck..."
- Player learns from reactions

**Result:** ⬜

---

### TC-122: Pet Hints After Day 7

**Steps:**
1. Set account to Day 7+
2. Observe pet during idle
3. Look for hints

**Expected:**
- Pet occasionally glances at loved foods
- Thought bubble hints: "💭 Something sweet sounds nice..."
- 30% chance per session

**Result:** ⬜

---

### TC-123: Preference Journal Unlock

**Steps:**
1. Reach Bond Level 3
2. Check for journal unlock notification
3. Open Preference Journal

**Expected:**
- "📖 Preference Journal Unlocked!" notification
- Journal accessible from menu
- Shows discovered vs undiscovered preferences

**Result:** ⬜

---

### TC-124: Journal Tracks Discoveries

**Steps:**
1. With journal unlocked, feed a loved food
2. Check journal

**Expected:**
- Food marked as "❤️ LOVES" in journal
- Shows "discovered!" tag
- Unknown preferences show as "❓ ???"

**Result:** ⬜

---

### TC-125: Journal Progress Tracking

**Steps:**
1. Open Preference Journal
2. Check progress display

**Expected:**
- Shows "X/10 preferences discovered"
- Categories: Loves, Likes, Dislikes
- Suspected section for hinted preferences

**Result:** ⬜

---

## 21. Test Results Template

```markdown
# Test Run Results — v3.1

**Date:** YYYY-MM-DD
**Build:** grundy-game.html
**Tester:** [Name]
**Platform:** [Chrome Desktop / Android / iOS]

## Alignment Status

| Decision | Status |
|----------|--------|
| Hidden Stats | ✅/❌ |
| Fullness Behaviors | ✅/❌ |
| Daily Moments | ✅/❌ |
| No Death (Runaway) | ✅/❌ |
| Conservative Rewards | ✅/❌ |
| Achievement Unlocks | ✅/❌ |
| Activity Backgrounds | ✅/❌ |
| Preference Discovery | ✅/❌ |

## Summary

| Category | Passed | Failed | Skipped |
|----------|--------|--------|---------|
| Alignment Tests | /6 | | |
| First-Time Flow | /3 | | |
| Tutorial | /2 | | |
| Hidden Stats | /7 | | |
| Pet Care | /5 | | |
| Daily Moments | /4 | | |
| Shop | /2 | | |
| Pet Management | /5 | | |
| Mini-Games | /4 | | |
| Settings | /2 | | |
| Dev Panel | /2 | | |
| Persistence | /1 | | |
| Hybrid Mode | /2 | | |
| Runaway System | /4 | | |
| Snacks/Weight | /2 | | |
| Poop/Cleaning | /2 | | |
| Sound/Vibration | /3 | | |
| Animations | /3 | | |
| Activity Backgrounds | /4 | | |
| Preference Discovery | /6 | | |
| **TOTAL** | /69 | | |

## Failed Tests

| TC | Description | Actual Result | Notes |
|----|-------------|---------------|-------|
| | | | |

## Bugs Found

| ID | Description | Severity | Steps to Reproduce |
|----|-------------|----------|-------------------|
| | | | |
```

---

*END OF COMPREHENSIVE TEST PLAN v3.1*
