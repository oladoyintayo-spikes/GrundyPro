# GRUNDY — MASTER TO-DO LIST FOR CLAUDE CODE

**Copy and paste this entire prompt into Claude Code.**

---

## INSTRUCTIONS

Read the updated CLAUDE.md and TICKETS_WEB.yaml. Execute ALL of the following tickets in order. After each major section, verify it works before continuing. Rebuild grundy-game.html and push to GitHub when complete.

---

## SECTION 1: DATA LAYER (Pets & Foods)

### WEB-027: Add 5 New Pets
Add these pets to src/data/pets.ts:

**Fizz 🔵** (#3b82f6)
- Personality: Hyper, bubbly
- Likes: Sour, Fizzy, Cold
- Dislikes: Bland, Dry
- Hunger Decay: 1.5× (Very Fast)
- Special: +25% mini-game rewards
- Unlock: Level 10 OR 50 gems
- Captions:
  - Idle: "Fizz bounces off the walls!", "Fizz vibrates with energy!", "Can't. Stop. Moving!"
  - Positive: "WOOOOO!", "Fizz explodes with joy!", "MORE MORE MORE!"
  - Negative: "Fizz deflates...", "Too boring!", "Fizz fizzles out..."

**Ember 🟠** (#f97316)
- Personality: Fierce, proud, dramatic
- Likes: Spicy, Hot, Smoky
- Dislikes: Sweet, Cold
- Hunger Decay: 1.25× (Fast)
- Special: 2× coins from spicy foods
- Unlock: Level 15 OR 100 gems
- Captions:
  - Idle: "Ember smolders intensely.", "Ember strikes a pose.", "Ember waits... dramatically."
  - Positive: "Ember ROARS approval!", "NOW we're cooking!", "FIRE! 🔥"
  - Negative: "Ember scoffs.", "Pathetic.", "Ember turns away in disgust."

**Chomper 🔴** (#ef4444)
- Personality: Hungry, goofy, always eating
- Likes: EVERYTHING
- Dislikes: None
- Hunger Decay: 2× (Fastest)
- Special: No disliked foods (all neutral or better)
- Unlock: Level 20 OR 150 gems
- Captions:
  - Idle: "Chomper's tummy rumbles...", "Food? FOOD?!", "Chomper drools..."
  - Positive: "CHOMP CHOMP CHOMP!", "Chomper inhales it!", "NOM NOM NOM!"
  - Neutral: "Chomper eats it anyway.", "Food is food!", "More?"

**Whisp ⚪** (#e2e8f0)
- Personality: Mysterious, ethereal, dreamlike
- Likes: Dream foods, Magical, Rare
- Dislikes: Common, Basic
- Hunger Decay: 0.5× (Slowest)
- Special: +50% XP from rare/epic foods
- Unlock: Level 25 OR 200 gems
- Captions:
  - Idle: "Whisp floats silently...", "Whisp phases in and out...", "..."
  - Positive: "Whisp glows brighter!", "✨", "Whisp hums softly..."
  - Negative: "Whisp fades slightly.", "...", "Whisp looks through you."

**Luxe ✨** (gradient gold #fbbf24 → purple #a855f7)
- Personality: Royal, fabulous, extra
- Likes: Premium, Legendary, Crafted
- Dislikes: Common, Basic
- Hunger Decay: 1× (Medium)
- Special: +100% gem drops
- Unlock: Level 30 OR 300 gems
- Captions:
  - Idle: "Luxe admires their reflection.", "Luxe poses for no one.", "Simply fabulous."
  - Positive: "Luxe approves, darling!", "Exquisite!", "Luxe blows a kiss 💋"
  - Negative: "Luxe is NOT amused.", "How pedestrian.", "Luxe looks away."

---

### WEB-028: Add 2 New Foods
Add to src/data/foods.ts:

**Dream Treat ⭐**
- Rarity: Epic
- Hunger: +20, Mood: +4, XP: 12, Cost: 75
- Affinity: Munchlet=Liked, Grib=Neutral, Plompo=Loved, Fizz=Loved, Ember=Neutral, Chomper=Liked, Whisp=Loved, Luxe=Loved

**Golden Feast 👑**
- Rarity: Legendary
- Hunger: +30, Mood: +5, XP: 20, Cost: 150
- Affinity: Munchlet=Liked, Grib=Liked, Plompo=Liked, Fizz=Liked, Ember=Liked, Chomper=Liked, Whisp=Loved, Luxe=Loved

---

## SECTION 2: STATE MANAGEMENT

### WEB-025: Separate Pet State Storage
Update src/game/store.ts:

```typescript
interface GameState {
  // Per-Pet State (separate for each)
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
  
  // Global State (shared)
  activePetId: string;
  unlockedPets: string[];
  coins: number;
  gems: number;
  inventory: Record<string, number>;
  
  // Flags
  onboardingComplete: boolean;
  tutorialComplete: boolean;
}
```

- Starters (munchlet, grib, plompo) always in unlockedPets
- Switching pets saves current state, loads target state
- Coins, gems, inventory shared across all pets

---

## SECTION 3: ONBOARDING FLOW

### WEB-023: Welcome Flow (4 Screens)

**Screen 1: Splash**
- Logo fades in with scale animation
- "GRUNDY" title with sparkle effect
- "Tap to start" pulses gently
- Any tap proceeds

**Screen 2: Story (Skippable)**
- "These little creatures are always hungry..."
- "Feed them, play with them, watch them grow!"
- Pet emojis float across background
- [Skip] button in corner, [Next →] to proceed

**Screen 3: Pet Selection**
- "Who do you want to care for first?"
- 3 starter pets in cards showing: emoji, name, personality, likes/dislikes
- Tap to select (highlight border)
- "You can switch between starters anytime!" note
- [Let's Go!] disabled until selection

**Screen 4: First Launch Only**
- Set onboardingComplete = true
- Set selected pet as activePetId
- Initialize all 3 starter pets in state

---

### WEB-032: First Session Tutorial

**Step 1:**
- Spotlight on food bag
- Arrow pointing to food
- "Tap a food to feed your pet!"
- Wait for player to tap any food

**Step 2:**
- After first feed, spotlight on pet
- "Great! See how they react?"
- [Next] button

**Step 3:**
- Spotlight on XP bar
- "Keep feeding to level up and unlock new pets!"
- [Got it!] button
- Set tutorialComplete = true

---

## SECTION 4: PET UNLOCK SYSTEM

### WEB-024: Pet Selector
- Shows all 8 pets in grid
- Starters: Always show emoji, name, level — tap to switch
- Locked pets: Show silhouette + "Level X or 💎Y to unlock"
- Current pet highlighted with border
- Tap locked pet → show unlock modal

### WEB-026: Gem Unlock Purchase
- Modal shows: Pet preview, requirements
- "Unlock at Level X" OR "Unlock now for 💎Y"
- If enough gems: [Unlock Now] button
- Deducts gems, adds to unlockedPets
- If not enough: "Need X more gems"

### WEB-029: Pet Unlock Celebration
- Pet emoji large with sparkle animation
- "NEW PET UNLOCKED!" title
- Pet name and personality
- [Start Playing] → switch to new pet
- [Maybe Later] → close modal

---

## SECTION 5: PET ABILITIES

### WEB-030: Implement Pet Special Abilities

Apply automatically when pet is active:

| Pet | Ability | Implementation |
|-----|---------|----------------|
| Munchlet | +10% bond | bondGain × 1.1 |
| Grib | -20% mood penalty | moodLoss × 0.8 |
| Plompo | -20% mood decay | decayRate × 0.8 |
| Fizz | +25% mini-game rewards | rewards × 1.25 |
| Ember | 2× coins from spicy | if spicy: coins × 2 |
| Chomper | No dislikes | affinity = max(affinity, 'neutral') |
| Whisp | +50% XP from rare/epic | if rarity >= rare: xp × 1.5 |
| Luxe | +100% gem drops | gems × 2 |

Show subtle indicator when ability triggers ("+25% 🎮" floating text, etc.)

---

## SECTION 6: GEM ECONOMY

### WEB-031: Gem Income System

| Source | Base Gems | Notes |
|--------|-----------|-------|
| Level Up | +5 | Luxe gets +10 |
| Mini-game Rainbow | +2 | Score 300+ |
| Daily Login Day 7 | +10 | Weekly streak |
| First Feed Daily | +1 | Daily engagement |

- Gems display in header next to coins
- Gem gain shows toast notification with animation

---

## SECTION 7: NAVIGATION

### WEB-033: Main Menu

**Menu Button:**
- Hamburger (☰) icon in top-left corner
- Always visible during gameplay

**Menu Options:**
- 🐾 Switch Pet → Opens Pet Selector
- 🛒 Shop → Opens Shop modal
- 🎮 Mini-Games → Opens Mini-game Hub
- ⚙️ Settings → Sound toggle, Reset progress
- 🏠 Home → Return to welcome

**Return to Home Modal:**
- "Return to Home?"
- "Your progress is auto-saved. You can continue anytime!"
- [Stay] [Go Home]

**Reset Progress Modal (in Settings):**
- "⚠️ Reset ALL Progress?"
- "This will delete ALL pets, items, and progress! This cannot be undone!"
- [Cancel] [Reset] (red button)
- Reset clears localStorage, returns to welcome

---

## SECTION 8: MINI-GAMES

### WEB-016: Snack Catch

**Gameplay:**
- 60-second reflex game
- Foods fall from top of screen
- Player moves pet left/right to catch
- Touch/drag or arrow keys

**Scoring:**
- Good food: +10 points
- Favorite food (loved by active pet): +20 points
- Bad food (disliked by pet): -15 points
- Combo bonus: +2 per streak (max +10)
- Miss 3 good foods = game over early

**Rewards by Score:**
- Bronze (0-99): 10 coins
- Silver (100-199): 25 coins
- Gold (200-299): 50 coins + 1 gem
- Rainbow (300+): 100 coins + 2 gems
- Apply Fizz's +25% bonus if active

**UI:**
- Score counter top-center
- Timer top-right
- Combo multiplier (when active)
- Pet at bottom of screen
- End screen with score, tier, rewards

### WEB-017: Mini-game Hub

- Accessible from main menu
- Shows: Snack Catch (playable), 2-3 locked placeholders
- Each game shows: Icon, name, best score, last reward
- Energy cost: 10 energy per play
- "Not enough energy" if below 10
- Locked games show silhouette + "Coming Soon"

---

## SECTION 9: DEV PANEL

### WEB-018: Dev Panel

**Toggle:** 🛠️ button in corner (only in dev mode)

**Pet Stats Section:**
- Level slider (1-30)
- XP input (number)
- Mood slider (0-100)
- Hunger slider (0-100)
- Bond slider (0-100)

**Economy Section:**
- Coins: [+10] [+100] [-10] [-100]
- Gems: [+10] [+100] [-10] [-100]
- [Fill All Food] button

**Unlocks Section:**
- [Unlock All Pets] button
- [Lock All (Keep Starters)] button

**Reset Section:**
- [Reset Current Pet to Lv.1]
- [Reset ALL Progress] (with confirmation)

---

## SECTION 10: VISUAL FX & POLISH

### WEB-034: Visual FX

**Feeding Reactions:**
- Loved: Hearts burst 💕, pet bounces, golden sparkles
- Liked: Small hearts, happy bounce
- Neutral: Simple nod animation
- Disliked: Sweat drops 💦, shake head, grey puff

**Floating Text:**
- "+X XP" floats up (green)
- "+X Coins" floats up (gold)
- "+X Gems" floats up (teal)
- "+X Hunger" (orange)
- "+X Mood" (pink)
- All fade out after 1 second

**Level Up:**
- Screen flash (white, quick)
- Confetti burst 🎉
- Pet grows momentarily (scale 1.2 → 1.0)
- "LEVEL UP!" pulses
- Rewards animate in one by one

**Pet Unlock:**
- Silhouette shatters/dissolves
- Pet revealed with sparkle burst ✨
- Rainbow ring pulse outward
- Celebratory particles

**Button Feedback:**
- Tap: scale 0.95 → 1.0 (spring)
- Hover: subtle glow
- Disabled: greyed out, no animation

**Idle Animations:**
- Pet gentle bounce/float (continuous)
- Occasional blink (random 3-6 sec)
- Happy mood: wiggles side to side
- Sad mood: droops down
- Low hunger: thought bubble 💭🍎

**Progress Bars:**
- Smooth fill animation (300ms ease)
- Glow pulse when > 90%
- Shake when < 10%

**Mini-Game FX:**
- Catch: pop + sparkle
- Miss: puff + small screen shake
- Combo: multiplier text grows with each hit
- Rainbow tier: screen rainbow flash at end

**Transitions:**
- Screens: fade (200ms)
- Modals: slide up (300ms)
- Menu: slide from left (250ms)

---

## FINAL STEPS

1. Verify all features work together
2. Test onboarding flow (clear localStorage first)
3. Test pet switching and state persistence
4. Test unlock system with gems
5. Play Snack Catch mini-game
6. Check all FX trigger correctly
7. Rebuild grundy-game.html
8. Push to GitHub

---

**Total Tickets:** 14 (WEB-016, 017, 018, 023, 024, 025, 026, 027, 028, 029, 030, 031, 033, 034)

**Estimated Time:** 2-4 hours

**Output:** Complete playable prototype with all features

---

## SECTION 11: FUZZY TESTING

### WEB-035: Run Fuzzy Testing Suite

After all features are built, run these stress tests and log results to TEST_RESULTS.md:

**RAPID INPUT FUZZING:**
- Spam-click feed button 20x rapidly - should not crash or duplicate rewards
- Spam-click shop buy button 10x rapidly - should not overdraw coins
- Rapid pet switching 10x - should not corrupt state
- Open/close menu 20x rapidly - should not break UI

**BOUNDARY FUZZING:**
- Set hunger to 0, then feed - should work
- Set hunger to 100, then feed - should cap at 100
- Set mood to 0 - should show sad state
- Set mood to 100 - should show ecstatic state
- Set coins to 0, try to buy - should block purchase
- Set XP to 1 below level up, feed once - should trigger level up
- Set level to 30, gain XP - should cap or handle gracefully

**INVALID STATE FUZZING:**
- Try to feed with 0 food - should show message or disable button
- Try to unlock pet with 0 gems - should show error message
- Try to play mini-game with 0 energy - should block with message
- Switch to locked pet directly (if possible) - should reject
- Feed during level-up modal - should queue or block

**SEQUENCE FUZZING:**
- Feed → immediately open shop → close → feed again
- Start mini-game → go home mid-game → return
- Open pet selector → switch pet → immediately feed
- Level up → spam-click reward claim
- Tutorial step 1 → tap wrong area → tap correct area

**PERSISTENCE FUZZING:**
- Feed pet → refresh browser → verify state saved
- Mid-level-up refresh → verify no XP loss
- Mid-shop-purchase refresh → verify no coin loss
- Change pet → refresh → verify correct pet loads

**STRESS FUZZING:**
- Feed 100 times consecutively (use dev panel to refill food)
- Level up 10 times rapidly (use dev panel)
- Unlock all pets rapidly
- Fill then empty inventory repeatedly

**Log each test as:**
- PASS: Works correctly
- FAIL: Describe what broke
- EDGE: Works but feels wrong (note for polish)

Create a FUZZY_TEST_RESULTS section in TEST_RESULTS.md with all findings.

---

**Total Tickets:** 15 (WEB-016, 017, 018, 023, 024, 025, 026, 027, 028, 029, 030, 031, 033, 034, 035)

**Estimated Time:** 3-5 hours (including fuzzy testing)

**Output:** Complete playable prototype with all features + test results
