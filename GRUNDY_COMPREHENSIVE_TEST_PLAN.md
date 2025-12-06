# GRUNDY — COMPREHENSIVE TEST PLAN v2.0

**Version:** 2.0  
**Date:** December 2024  
**Covers:** M1-M6 (Complete) + M7-M9 (New Features)  
**Total Test Cases:** 95

---

## TABLE OF CONTENTS

1. [Overview & Scope](#0-overview--scope)
2. [First-Time Player Flow](#1-first-time-player-flow)
3. [Tutorial System](#2-tutorial-system)
4. [Returning Player & Daily Gems](#3-returning-player--daily-gems)
5. [Pet Care – Feeding, Mood, XP, Leveling](#4-pet-care--feeding-mood-xp-leveling)
6. [Shop System](#5-shop-system)
7. [Pet Management](#6-pet-management)
8. [Mini-Games](#7-mini-games)
9. [Settings & UI](#8-settings--ui)
10. [Dev Panel](#9-dev-panel)
11. [Persistence & Storage](#10-persistence--storage)
12. [Fuzzer / Chaos Mode](#11-fuzzer--chaos-mode)
13. [**NEW: Hybrid Mode (Cozy/Classic)**](#12-hybrid-mode-cozy-classic)
14. [**NEW: Snacks & Weight System**](#13-snacks--weight-system)
15. [**NEW: Feeding Limits & Stomach**](#14-feeding-limits--stomach)
16. [**NEW: Poop & Cleaning**](#15-poop--cleaning)
17. [**NEW: Events & Login Streaks**](#16-events--login-streaks)
18. [**NEW: Sound & Vibration**](#17-sound--vibration)
19. [**NEW: Pet Animations**](#18-pet-animations)
20. [Known Issues](#19-known-issues)
21. [Test Results Template](#20-test-results-template)

---

## 0. Overview & Scope

### Target Platforms

| Platform | Browser | Notes |
|----------|---------|-------|
| Desktop | Chrome (current) | Primary |
| Mobile (emulated) | Chrome DevTools | Viewport ≤ 430×800 |
| Android | Chrome Mobile | Vibration testing |
| iOS | Safari | Audio unlock testing |

### Global Preconditions

```javascript
// For fresh run tests, clear state before loading:
localStorage.removeItem('grundy-game-v2');

// To inspect state:
window.__GRUNDY_STATE__ = state; // Expose in app

// Check console for errors after each test
```

### Test Result Codes

| Code | Meaning |
|------|---------|
| ✅ PASS | Works as expected |
| ❌ FAIL | Does not work as expected |
| ⚠️ EDGE | Works but needs polish |
| 🚫 BLOCKED | Cannot test (dependency issue) |
| ⏭️ SKIP | Not applicable to current build |

---

## 1. First-Time Player Flow

### TC-01: Fresh Boot → Splash → Story → Pet Pick → Tutorial

**Precondition:** `localStorage['grundy-game-v2']` removed

**Steps:**
1. Load `grundy-game.html` in browser
2. Confirm Splash Screen: Title "Grundy", paw icon, "Tap to Start"
3. Tap "Tap to Start"
4. Confirm Story Screen: Title, emoji, pagination dots
5. Tap "Continue" through all story pages
6. On final page, tap "Choose Your Pet"
7. Confirm Pet Pick: Munchlet, Grib, Plompo shown
8. Select a pet → click "Choose {Name}!"

**Expected:**
- Screen flow: `splash → story → pet_pick → tutorial`
- State: `screen === 'tutorial'`, `isFirstSession === false`
- `activePetId` set to chosen pet
- `petStates[activePetId]` created with: level=1, xp=0, hunger=80, mood=60, stage='baby'
- No console errors

**Result:** ⬜

---

### TC-02: Skip Story Flow

**Precondition:** Fresh state

**Steps:**
1. Load game → Splash → tap "Tap to Start"
2. On first story screen, tap "Skip"

**Expected:**
- Land directly on Pet Pick Screen
- `screen === 'pet_pick'`
- No leftover artifacts

**Result:** ⬜

---

### TC-03: Mode Selection (NEW - Hybrid)

**Precondition:** Fresh state, pet selected

**Steps:**
1. After pet pick, confirm Mode Selection screen appears
2. Verify "Cozy Mode" is selectable (default)
3. Verify "Classic Mode" shows 🔒 with "Unlock at Level 10"
4. Select Cozy Mode
5. Proceed to tutorial

**Expected:**
- `gameMode === 'cozy'`
- Classic mode locked until Level 10
- Mode selection persists

**Result:** ⬜

---

## 2. Tutorial System

### TC-04: Tutorial Step Progression

**Precondition:** Fresh state, pet chosen, in tutorial

**Steps:**
1. Confirm Step 0: "Welcome!" with "Got it!" button
2. Tap "Got it!" to advance
3. For each step, confirm title/content matches design
4. Continue until final step

**Expected:**
- `tutorialStep` increments per button press
- Final step button reads "Start Playing!"
- After final: `tutorialCompleted === true`, `screen === 'pet_care'`

**Result:** ⬜

---

### TC-05: Tutorial Feed Step

**Precondition:** Progress to step with `action === 'feed'`

**Steps:**
1. Confirm feed tutorial step with food list
2. Click one food item

**Expected:**
- Tutorial state: `idle → feeding → reacting → ready`
- Reaction popup shows affinity and +XP
- Popup disappears after ~2 seconds
- Tutorial auto-advances
- No double-feed on spam click

**Result:** ⬜

---

### TC-06: Mid-Tutorial Skip

**Precondition:** Any tutorial step in progress

**Steps:**
1. Tap "Skip Tutorial"

**Expected:**
- `tutorialCompleted === true`
- `screen === 'pet_care'`
- Player in normal Pet Care view

**Result:** ⬜

---

## 3. Returning Player & Daily Gems

### TC-07: Returning Player Skip Intro

**Precondition:** Complete one session, reload without clearing localStorage

**Steps:**
1. Load page
2. Splash → tap "Tap to Start"

**Expected:**
- Skips story & pet pick
- Goes to Main Menu directly
- `isFirstSession === false`

**Result:** ⬜

---

### TC-08: Daily Gem Collection – First Collect

**Precondition:** At Main Menu, `lastGemCollect` is null or >24h ago

**Steps:**
1. Confirm "Collect Daily Gems!" button visible
2. Click button

**Expected:**
- Gems increase by formula: `BASE_DAILY_GEMS + unlockedPetsCount + floor(totalLevels * 0.1)`
- `lastGemCollect` set to current timestamp
- Modal/toast shows gems gained

**Result:** ⬜

---

### TC-09: Daily Gem Cooldown

**Steps:**
1. Immediately after TC-08, check Main Menu

**Expected:**
- "Collect Daily Gems!" not visible or disabled
- `canCollectGems()` returns false

**Result:** ⬜

---

## 4. Pet Care – Feeding, Mood, XP, Leveling

### TC-10: Basic Feeding – Stat Updates

**Precondition:** In Pet Care, `inventory.apple >= 1`

**Steps:**
1. Record: hunger0, mood0, xp0, coins0
2. Click Apple in Food Bag

**Expected:**
- `inventory.apple` decreased by 1
- `hunger` increases by `food.hunger`, capped at 100
- `mood` changes by: `food.mood + affinityBonus`
- `xp` increases by: `food.xp * affinityMult * moodMult`
- Reaction popup shows affinity phrase

**Result:** ⬜

---

### TC-11: Affinity – Loved Food

**Precondition:** Active pet has a loved food in inventory

**Steps:**
1. Feed loved food (e.g., Cookie to Munchlet)

**Expected:**
- Affinity: "loves"
- XP multiplier: 2.0×
- Mood bonus: +3
- Hearts animation plays

**Result:** ⬜

---

### TC-12: Affinity – Disliked Food

**Precondition:** Active pet has a disliked food

**Steps:**
1. Feed disliked food (e.g., Spicy Taco to Munchlet)

**Expected:**
- Affinity: "dislikes"
- XP multiplier: 0.5×
- Mood penalty: -2
- Negative reaction animation

**Result:** ⬜

---

### TC-13: Level Up Trigger

**Precondition:** Pet XP near level threshold

**Steps:**
1. Use Dev Panel to set XP to 1 below threshold
2. Feed any food

**Expected:**
- Level increases by 1
- `xp` resets to overflow amount
- Level-up modal appears
- Rewards: +50 coins, +5 gems (Luxe: +10)
- Confetti animation

**Result:** ⬜

---

### TC-14: Evolution Stage Changes

**Steps:**
1. Set level to 6 → confirm stage 'baby'
2. Set level to 7 → confirm stage 'youth'
3. Set level to 13 → confirm stage 'evolved'

**Expected:**
- Stage updates correctly at thresholds
- Visual changes reflect stage

**Result:** ⬜

---

### TC-15: Pet Ability – Munchlet (+10% Bond)

**Precondition:** Active pet is Munchlet

**Steps:**
1. Record bond value
2. Feed any food
3. Calculate expected bond: `baseBond * 1.1`

**Expected:**
- Bond increase matches formula
- Ability indicator shows

**Result:** ⬜

---

### TC-16: Pet Ability – Grib (-20% Mood Penalty)

**Precondition:** Active pet is Grib

**Steps:**
1. Feed disliked food (Cookie)
2. Compare mood loss to other pets

**Expected:**
- Mood penalty reduced by 20%
- `moodLoss = baseLoss * 0.8`

**Result:** ⬜

---

### TC-17: Pet Ability – Chomper (No Dislikes)

**Precondition:** Active pet is Chomper

**Steps:**
1. Feed any food that other pets dislike

**Expected:**
- Affinity is "neutral" or better, never "dislikes"
- No negative reaction ever

**Result:** ⬜

---

### TC-18: Pet Ability – Whisp (+50% XP from Rare)

**Precondition:** Active pet is Whisp, has rare/epic food

**Steps:**
1. Feed Dream Treat or Golden Feast
2. Calculate expected XP: `baseXP * 1.5`

**Expected:**
- XP gain 50% higher than other pets
- Ability indicator shows "+50% XP"

**Result:** ⬜

---

### TC-19: Pet Ability – Luxe (+100% Gems)

**Precondition:** Active pet is Luxe

**Steps:**
1. Trigger gem gain (level up)
2. Check gem amount

**Expected:**
- Gems doubled: +10 instead of +5
- Ability indicator shows "+100% 💎"

**Result:** ⬜

---

### TC-20: Pet Ability – Ember (2× Spicy Coins)

**Precondition:** Active pet is Ember

**Steps:**
1. Feed Spicy Taco or Hot Pepper
2. Check coin gain

**Expected:**
- Coins from feeding doubled
- Works only for spicy foods

**Result:** ⬜

---

### TC-21: Pet Ability – Fizz (+25% Mini-game)

**Precondition:** Active pet is Fizz

**Steps:**
1. Play Snack Catch
2. Check rewards

**Expected:**
- Coin/gem rewards 25% higher
- Shown in results screen

**Result:** ⬜

---

## 5. Shop System

### TC-22: Buy Food with Coins

**Precondition:** At Shop, sufficient coins

**Steps:**
1. Record coins and inventory
2. Buy Apple (5 coins)

**Expected:**
- Coins decrease by 5
- `inventory.apple` increases by 1
- Purchase confirmation

**Result:** ⬜

---

### TC-23: Buy Food with Gems

**Precondition:** Shop has gem-purchasable food

**Steps:**
1. Buy gem-only food

**Expected:**
- Gems decrease correctly
- Food added to inventory

**Result:** ⬜

---

### TC-24: Insufficient Funds

**Steps:**
1. Try to buy food with 0 coins

**Expected:**
- Purchase blocked
- "Not enough coins" message
- No state change

**Result:** ⬜

---

### TC-25: Buy New Items (Medicine, Diet Food)

**Precondition:** Shop has new M7 items

**Steps:**
1. Buy Medicine (50 coins)
2. Buy Diet Food (30 coins)

**Expected:**
- Items added to inventory
- Coins deducted correctly

**Result:** ⬜

---

## 6. Pet Management

### TC-26: Switch Between Starters

**Precondition:** In My Pets screen

**Steps:**
1. Current pet is Munchlet
2. Select Grib
3. Confirm switch

**Expected:**
- `activePetId` changes to Grib
- Munchlet's state preserved
- Grib's state loaded
- UI updates

**Result:** ⬜

---

### TC-27: Unlock Pet with Gems

**Precondition:** Fizz locked, have 50+ gems

**Steps:**
1. In My Pets, tap locked Fizz
2. Tap "Unlock for 50 💎"

**Expected:**
- Gems decrease by 50
- Fizz added to `unlockedPets`
- Unlock celebration modal
- Can now switch to Fizz

**Result:** ⬜

---

### TC-28: Unlock Pet via Level

**Precondition:** Any pet at Level 9

**Steps:**
1. Level up to 10

**Expected:**
- Fizz auto-unlocks
- "New Pet Unlocked!" modal
- No gem cost

**Result:** ⬜

---

### TC-29: Insufficient Gems for Unlock

**Steps:**
1. Try to unlock Luxe (300 gems) with less

**Expected:**
- "Need X more gems" message
- Cannot unlock
- No state change

**Result:** ⬜

---

### TC-30: Separate Pet State

**Steps:**
1. Level Munchlet to 5
2. Switch to Grib (still level 1)
3. Switch back to Munchlet

**Expected:**
- Munchlet still level 5
- Each pet maintains separate: level, xp, mood, hunger, bond
- Coins/gems/inventory shared

**Result:** ⬜

---

## 7. Mini-Games

### TC-31: Access Mini-Game Hub

**Steps:**
1. From Main Menu, tap "Mini-Games"

**Expected:**
- Mini-game hub opens
- Snack Catch visible and playable
- Other slots show "Coming Soon"

**Result:** ⬜

---

### TC-32: Start Snack Catch

**Precondition:** Energy >= 10

**Steps:**
1. Tap Snack Catch
2. Tap "Play"

**Expected:**
- Energy decreases by 10
- Game starts
- 60-second timer begins
- Foods fall from top

**Result:** ⬜

---

### TC-33: Snack Catch Scoring

**Steps:**
1. Play Snack Catch
2. Catch good foods, miss some, catch bad foods

**Expected:**
- Good food: +10 points
- Favorite (loved): +20 points
- Bad (disliked): -15 points
- Combo: +2 per streak (max +10)
- Score updates in real-time

**Result:** ⬜

---

### TC-34: Snack Catch Rewards

**Steps:**
1. Complete game with different scores

**Expected:**
- Bronze (0-99): 10 coins
- Silver (100-199): 25 coins
- Gold (200-299): 50 coins + 1 gem
- Rainbow (300+): 100 coins + 2 gems
- Fizz gets +25% bonus

**Result:** ⬜

---

### TC-35: Snack Catch – Not Enough Energy

**Precondition:** Energy < 10

**Steps:**
1. Try to start Snack Catch

**Expected:**
- "Not enough energy" message
- Game doesn't start
- Energy unchanged

**Result:** ⬜

---

## 8. Settings & UI

### TC-36: Open Settings

**Steps:**
1. From Main Menu, tap Settings

**Expected:**
- Settings screen opens
- Shows: Sound, Vibration, Game Stats, Danger Zone

**Result:** ⬜

---

### TC-37: Sound Toggle (NEW)

**Precondition:** Sound system implemented

**Steps:**
1. Toggle Sound off
2. Perform action that triggers sound
3. Toggle Sound on
4. Perform same action

**Expected:**
- Sound off: No audio
- Sound on: Audio plays
- Setting persists

**Result:** ⬜

---

### TC-38: Vibration Toggle (NEW)

**Precondition:** Android device or emulator

**Steps:**
1. Toggle Vibration off
2. Feed pet (should vibrate normally)
3. Toggle Vibration on
4. Feed pet

**Expected:**
- Vibration off: No haptic
- Vibration on: Haptic feedback
- Setting persists

**Result:** ⬜

---

### TC-39: Volume Sliders (NEW)

**Steps:**
1. Adjust Master Volume slider
2. Adjust Music Volume slider
3. Adjust SFX Volume slider

**Expected:**
- Audio levels change immediately
- 0% = silent
- 100% = full volume
- Settings persist

**Result:** ⬜

---

### TC-40: Game Stats Display

**Steps:**
1. View Game Stats in Settings

**Expected:**
- Shows: Total Pets Unlocked, Total Levels, Total Gems Earned
- Values accurate

**Result:** ⬜

---

### TC-41: Reset All Progress

**Precondition:** Non-zero progress

**Steps:**
1. Settings → Danger Zone → Reset All Progress
2. Confirm warning appears
3. Click Cancel → verify nothing resets
4. Click Reset

**Expected:**
- Cancel: No change
- Reset: localStorage cleared, page reloads, fresh start

**Result:** ⬜

---

## 9. Dev Panel

### TC-42: Dev Panel Toggle

**Steps:**
1. Click 🛠️ button
2. Confirm panel opens
3. Click again to close

**Expected:**
- Panel shows/hides correctly
- No state impact from toggle

**Result:** ⬜

---

### TC-43: Manual Stat Manipulation

**Steps:**
1. In Dev Panel, adjust Level/Mood/Hunger/Bond sliders

**Expected:**
- Values update immediately
- Level changes trigger stage changes
- UI reflects new values

**Result:** ⬜

---

### TC-44: Economy Helpers

**Steps:**
1. Use +10, +100, -10, -100 for coins/gems
2. Click "Fill All Food"

**Expected:**
- Currency updates, clamped at 0
- Inventory fills to 99 each
- Changes persist

**Result:** ⬜

---

### TC-45: Unlock/Reset Actions

**Steps:**
1. Click "Unlock All Pets"
2. Click "Lock Non-Starters"
3. Click "Reset Current Pet"
4. Click "RESET ALL PROGRESS"

**Expected:**
- Each action works correctly
- Global reset clears everything

**Result:** ⬜

---

## 10. Persistence & Storage

### TC-46: Persistence Across Reloads

**Precondition:** Meaningful progress (Level 3+, items bought)

**Steps:**
1. Reload browser tab

**Expected:**
- State reconstructed: activePetId, levels, stats, coins, gems, inventory
- UI loads correctly

**Result:** ⬜

---

### TC-47: Corrupted LocalStorage

**Steps:**
1. Set `localStorage['grundy-game-v2']` to invalid JSON
2. Reload page

**Expected:**
- Game detects error
- Falls back to initial state
- Shows first-time flow
- No crash

**Result:** ⬜

---

## 11. Fuzzer / Chaos Mode

### TC-48: Rapid Feed Spam (20x)

**Steps:**
1. Rapidly click feed button 20 times

**Expected:**
- No crash
- No duplicate rewards
- Inventory decreases correctly
- Stats don't exceed bounds

**Result:** ⬜

---

### TC-49: Rapid Shop Buy (10x)

**Steps:**
1. Rapidly click buy button 10 times

**Expected:**
- No overdraw
- Coins don't go negative
- Inventory updates correctly

**Result:** ⬜

---

### TC-50: Rapid Pet Switch (10x)

**Steps:**
1. Rapidly switch between pets 10 times

**Expected:**
- No state corruption
- Each pet maintains correct state

**Result:** ⬜

---

### TC-51: Boundary – Hunger 0/100

**Steps:**
1. Set hunger to 0, feed → should work
2. Set hunger to 100, feed → should cap

**Expected:**
- Hunger capped at 0-100
- No overflow/underflow

**Result:** ⬜

---

### TC-52: Boundary – Level 30 XP

**Steps:**
1. Set level to 30, gain XP

**Expected:**
- Level capped at 30 or XP continues accumulating
- No crash

**Result:** ⬜

---

### TC-53: Invalid State – Feed with 0 Food

**Steps:**
1. Empty inventory, try to feed

**Expected:**
- Blocked or disabled
- Message shown
- No crash

**Result:** ⬜

---

---

## 12. Hybrid Mode (Cozy/Classic) — NEW

### TC-54: Mode Toggle in Settings

**Precondition:** Reached Level 10, Classic unlocked

**Steps:**
1. Go to Settings
2. Switch from Cozy to Classic
3. Confirm warning modal appears
4. Accept switch

**Expected:**
- `gameMode === 'classic'`
- Warning explains stakes
- Mode persists

**Result:** ⬜

---

### TC-55: Cozy Mode – No Death

**Precondition:** Cozy mode, pet hungry

**Steps:**
1. Set hunger to 0
2. Wait 4+ hours (or simulate)

**Expected:**
- Pet looks sad but does NOT die
- No sickness
- Gentle notification only

**Result:** ⬜

---

### TC-56: Classic Mode – Sickness Trigger

**Precondition:** Classic mode

**Steps:**
1. Set hunger to 0
2. Wait 30+ minutes (simulate with `lastFeedTime`)

**Expected:**
- 20% chance of sickness
- If sick: green tint, thermometer, decay 2×
- Cannot play mini-games while sick

**Result:** ⬜

---

### TC-57: Classic Mode – Cure Sickness

**Precondition:** Pet is sick, have Medicine

**Steps:**
1. Use Medicine item

**Expected:**
- `isSick === false`
- Pet returns to normal
- Medicine consumed

**Result:** ⬜

---

### TC-58: Classic Mode – Death Trigger

**Precondition:** Classic mode, pet sick

**Steps:**
1. Keep sick + hunger=0 for 4+ hours

**Expected:**
- Pet dies
- Death screen: dim, angel wings, tombstone
- 24h wait or 100 gems to restart

**Result:** ⬜

---

### TC-59: Classic Mode – Care Mistakes

**Precondition:** Classic mode

**Steps:**
1. Let hunger=0 for 30+ min → +1 mistake
2. Let happiness<20 for 2+ hours → +1 mistake
3. Leave poop 2+ hours → +1 mistake
4. Check careMistakes counter

**Expected:**
- Counter increments correctly
- Resets at evolution
- Affects evolution outcome

**Result:** ⬜

---

### TC-60: Evolution Branches (Classic)

**Precondition:** Classic mode, reach Level 13

**Steps:**
1. With 0-1 mistakes per stage → Rare Form
2. With 4+ mistakes → Altered Form
3. Normal mistakes → Standard Form

**Expected:**
- Evolution form matches care quality
- Visual/stat differences apply
- Achievement unlocked

**Result:** ⬜

---

### TC-61: Cozy Mode – Welcome Back Bonus

**Precondition:** Cozy mode

**Steps:**
1. Simulate 24+ hour absence
2. Return to game

**Expected:**
- "You're back!" celebration
- Bonus: +50 XP, +10 coins
- No penalties

**Result:** ⬜

---

---

## 13. Snacks & Weight System — NEW

### TC-62: Snack Category Identification

**Steps:**
1. View food inventory
2. Identify snacks: Candy, Ice Cream, Lollipop

**Expected:**
- Snacks visually distinct from meals
- Show happiness value > hunger value

**Result:** ⬜

---

### TC-63: Snack Feeding – Happiness Boost

**Steps:**
1. Record happiness
2. Feed snack (e.g., Candy)

**Expected:**
- Happiness increases significantly (+15-25)
- Hunger increases slightly (+3-5)
- Weight increases

**Result:** ⬜

---

### TC-64: Weight Gain from Snacks

**Precondition:** Pet at normal weight (0-30)

**Steps:**
1. Feed multiple snacks
2. Check weight meter

**Expected:**
- Weight increases per snack (+5-10%)
- Visual indicator updates

**Result:** ⬜

---

### TC-65: Weight Tiers – Chubby

**Steps:**
1. Increase weight to 31-60

**Expected:**
- Pet 10% wider visually
- "Chubby" label
- Slight animation change

**Result:** ⬜

---

### TC-66: Weight Tiers – Overweight

**Steps:**
1. Increase weight to 61-80

**Expected:**
- Pet 20% wider
- "Overweight" label
- Happiness decay 1.5×
- Slower animations

**Result:** ⬜

---

### TC-67: Weight Tiers – Obese

**Steps:**
1. Increase weight to 81-100

**Expected:**
- Pet 30% wider
- "Obese" label
- Happiness decay 2×
- Cannot play mini-games
- Sweat drops animation

**Result:** ⬜

---

### TC-68: Weight Decay Over Time

**Steps:**
1. Set weight to 50
2. Wait 1 hour (or simulate)

**Expected:**
- Weight decreases by ~1 per hour
- Natural decay continues

**Result:** ⬜

---

### TC-69: Diet Food – Weight Reduction

**Steps:**
1. Pet is overweight
2. Use Diet Food

**Expected:**
- Weight decreases by 20
- Hunger increases by 5
- Item consumed

**Result:** ⬜

---

---

## 14. Feeding Limits & Stomach — NEW

### TC-70: Stomach Capacity Display

**Steps:**
1. View pet care screen

**Expected:**
- Stomach meter visible (e.g., 3/5 filled)
- Shows current/max slots

**Result:** ⬜

---

### TC-71: Stomach Fills on Feed

**Steps:**
1. Record stomach (e.g., 0/5)
2. Feed one food
3. Check stomach

**Expected:**
- Stomach: 1/5
- Each food fills 1 slot

**Result:** ⬜

---

### TC-72: Stomach Full – Feeding Blocked

**Steps:**
1. Fill stomach to max (e.g., 5/5)
2. Try to feed

**Expected:**
- "I'm full! 🫃" message
- Feeding blocked
- Timer shows next slot opens in X:XX

**Result:** ⬜

---

### TC-73: Stomach Decay Over Time

**Steps:**
1. Fill stomach to 5/5
2. Wait 12 minutes (or simulate)

**Expected:**
- Stomach: 4/5
- Decays 1 slot per 12 min

**Result:** ⬜

---

### TC-74: Stomach Capacity by Pet

**Steps:**
1. Check stomach capacity for each pet

**Expected:**
- Munchlet: 5
- Grib: 4
- Plompo: 6
- Fizz: 4
- Ember: 4
- Chomper: 8
- Whisp: 3
- Luxe: 5

**Result:** ⬜

---

### TC-75: Hunger Cap – Cannot Feed at 95+

**Steps:**
1. Set hunger to 95
2. Try to feed

**Expected:**
- "Too full to eat!" message
- Feeding blocked

**Result:** ⬜

---

### TC-76: Overfeed Warning (3+ in 5 min)

**Steps:**
1. Feed 3 times within 5 minutes

**Expected:**
- Cozy: Warning message only
- Classic: +10% sickness chance
- Message: "Slow down!"

**Result:** ⬜

---

### TC-77: Snack Limit (2 per hour)

**Steps:**
1. Feed 2 snacks
2. Try to feed 3rd snack within hour

**Expected:**
- "Too many treats! 🍬" message
- Cozy: Warning only
- Classic: Forced +15 weight

**Result:** ⬜

---

---

## 15. Poop & Cleaning — NEW

### TC-78: Poop Appears After Feeding

**Steps:**
1. Feed pet 3-4 times (varies by pet)

**Expected:**
- Poop emoji appears near pet
- Visual indicator clear

**Result:** ⬜

---

### TC-79: Poop Frequency by Pet

**Steps:**
1. Test each pet's poop frequency

**Expected:**
- Munchlet: 4 feedings
- Grib: 3 feedings
- Plompo: 5 feedings
- Fizz: 3 feedings
- Ember: 4 feedings
- Chomper: 2 feedings
- Whisp: 6 feedings
- Luxe: 4 feedings

**Result:** ⬜

---

### TC-80: Tap to Clean

**Steps:**
1. Poop is visible
2. Tap poop

**Expected:**
- Poop removed
- Sparkle effect
- +2 happiness, +0.1 bond
- Satisfying sound

**Result:** ⬜

---

### TC-81: Uncleaned Poop – 30 min

**Steps:**
1. Let poop sit 30 min (simulate)

**Expected:**
- Pet looks uncomfortable
- Visual indicator

**Result:** ⬜

---

### TC-82: Uncleaned Poop – 1 hour

**Steps:**
1. Let poop sit 1 hour

**Expected:**
- Happiness decay 2×

**Result:** ⬜

---

### TC-83: Uncleaned Poop – 2 hours (Classic)

**Precondition:** Classic mode

**Steps:**
1. Let poop sit 2 hours

**Expected:**
- +15-20% sickness chance
- Care mistake recorded

**Result:** ⬜

---

---

## 16. Events & Login Streaks — NEW

### TC-84: First Feed Daily Gem

**Steps:**
1. New day, first feeding

**Expected:**
- +1 gem
- Toast: "Daily gem!"
- Only triggers once per day

**Result:** ⬜

---

### TC-85: Perfect Day Bonus

**Steps:**
1. Keep hunger and happiness above 50 all day

**Expected:**
- End of day: +10 coins, +2 gems
- "Perfect Day!" notification

**Result:** ⬜

---

### TC-86: Mini-game Monday

**Precondition:** Monday (or simulate)

**Steps:**
1. Play Snack Catch

**Expected:**
- Rewards 2× normal
- Event banner shown

**Result:** ⬜

---

### TC-87: Login Streak – Day 1-6

**Steps:**
1. Login Day 1 → 10 coins
2. Login Day 2 → 20 coins
3. Continue through Day 6 → 1 rare food

**Expected:**
- Correct rewards per day
- Streak counter increments

**Result:** ⬜

---

### TC-88: Login Streak – Day 7

**Steps:**
1. Login on 7th consecutive day

**Expected:**
- 10 gems + Mystery Box
- Celebration modal
- Streak resets to Day 1

**Result:** ⬜

---

### TC-89: Login Streak Break

**Steps:**
1. Miss a day

**Expected:**
- Streak resets to 0
- Next login is Day 1

**Result:** ⬜

---

---

## 17. Sound & Vibration — NEW

### TC-90: Feeding Sound – Loved

**Steps:**
1. Sound on, feed loved food

**Expected:**
- Happy "NOM!" sound plays
- Sparkle audio

**Result:** ⬜

---

### TC-91: Feeding Sound – Disliked

**Steps:**
1. Sound on, feed disliked food

**Expected:**
- "Bleh" sound plays

**Result:** ⬜

---

### TC-92: Level Up Sound

**Steps:**
1. Level up pet

**Expected:**
- Triumphant jingle plays (1.5s)

**Result:** ⬜

---

### TC-93: Vibration – Feed

**Precondition:** Android, vibration on

**Steps:**
1. Feed pet

**Expected:**
- 50ms pulse felt

**Result:** ⬜

---

### TC-94: Vibration – Level Up

**Steps:**
1. Level up pet

**Expected:**
- Celebration pattern: [100, 50, 100, 50, 200]ms

**Result:** ⬜

---

### TC-95: iOS Audio Unlock

**Precondition:** iOS Safari

**Steps:**
1. Load game, tap once
2. Trigger audio action

**Expected:**
- First tap unlocks audio context
- Subsequent audio plays normally

**Result:** ⬜

---

---

## 18. Pet Animations — NEW

### TC-96: Unique Pet Shapes

**Steps:**
1. View each pet

**Expected:**
- Each pet has distinct SVG silhouette
- Not generic blobs

**Result:** ⬜

---

### TC-97: Idle Animation

**Steps:**
1. Leave pet idle

**Expected:**
- Gentle bounce/breathe animation
- Random blink every 3-6 seconds

**Result:** ⬜

---

### TC-98: Mood-Based Animation – Happy

**Steps:**
1. Set mood > 70

**Expected:**
- Wiggle side-to-side animation
- Happy expression

**Result:** ⬜

---

### TC-99: Mood-Based Animation – Sad

**Steps:**
1. Set mood < 30

**Expected:**
- Droop down animation
- Sad expression

**Result:** ⬜

---

### TC-100: Feeding Animation – Loved

**Steps:**
1. Feed loved food

**Expected:**
- Jump + spin animation
- Hearts burst
- Eyes become hearts briefly

**Result:** ⬜

---

### TC-101: Pet-Specific Animation – Fizz

**Steps:**
1. Set active pet to Fizz

**Expected:**
- Constant vibration in idle
- Hyperactive movement

**Result:** ⬜

---

### TC-102: Pet-Specific Animation – Whisp

**Steps:**
1. Set active pet to Whisp

**Expected:**
- Floating/phasing animation
- Semi-transparent effect

**Result:** ⬜

---

### TC-103: Weight Visual – Obese

**Steps:**
1. Set weight to 85

**Expected:**
- Pet visually 30% wider
- Sweat drops
- Slow movement

**Result:** ⬜

---

---

## 19. Known Issues

| ID | Description | Severity |
|----|-------------|----------|
| BUG-01 | Settings may reference `state.petUnlocks` instead of `state.unlockedPets` | Medium |
| BUG-02 | Audio toggles are UI-only until wired to audio engine | Low |
| BUG-03 | iOS Safari requires touch to unlock audio context | Expected |

---

## 20. Test Results Template

Copy this template for each test run:

```markdown
# Test Run Results

**Date:** YYYY-MM-DD
**Build:** grundy-game.html
**Tester:** [Name]
**Platform:** [Chrome Desktop / Android / iOS]

## Summary

| Category | Passed | Failed | Skipped |
|----------|--------|--------|---------|
| First-Time Flow | /3 | | |
| Tutorial | /3 | | |
| Returning Player | /3 | | |
| Feeding | /12 | | |
| Shop | /4 | | |
| Pet Management | /5 | | |
| Mini-Games | /5 | | |
| Settings | /6 | | |
| Dev Panel | /4 | | |
| Persistence | /2 | | |
| Fuzzer | /6 | | |
| Hybrid Mode | /8 | | |
| Snacks/Weight | /8 | | |
| Feeding Limits | /8 | | |
| Poop/Cleaning | /6 | | |
| Events | /6 | | |
| Sound/Vibration | /6 | | |
| Animations | /8 | | |
| **TOTAL** | /103 | | |

## Failed Tests

| TC | Description | Actual Result | Notes |
|----|-------------|---------------|-------|
| | | | |

## Bugs Found

| ID | Description | Severity | Steps to Reproduce |
|----|-------------|----------|-------------------|
| | | | |

## Notes

[Additional observations]
```

---

*END OF COMPREHENSIVE TEST PLAN v2.0*
