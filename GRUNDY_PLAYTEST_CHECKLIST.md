# GRUNDY — PLAYTEST CHECKLIST

**Date:** _______________  
**Build:** grundy-game.html  
**Tester:** _______________

---

## INSTRUCTIONS

1. Clear browser localStorage before testing (fresh start)
2. Go through each section
3. Mark ✅ Pass, ❌ Fail, or ⚠️ Needs Work
4. Add notes for anything that feels off
5. Share results for balance adjustments

---

## 1. ONBOARDING FLOW

| Test | Status | Notes |
|------|--------|-------|
| Splash screen appears on first launch | ⬜ | |
| Logo animates in smoothly | ⬜ | |
| "Tap to start" is visible and pulses | ⬜ | |
| Story screen shows after tap | ⬜ | |
| Pet emojis float in background | ⬜ | |
| Skip button works | ⬜ | |
| Next button works | ⬜ | |
| Pet selection shows 3 starters | ⬜ | |
| Each pet card shows personality/likes/dislikes | ⬜ | |
| Can tap to select a pet | ⬜ | |
| "Let's Go!" disabled until selection | ⬜ | |
| "You can switch anytime" note visible | ⬜ | |
| Proceeds to game after selection | ⬜ | |

**Onboarding Feel:**
- [ ] Too long
- [ ] Just right
- [ ] Too short
- [ ] Confusing

**Notes:**
```


```

---

## 2. TUTORIAL

| Test | Status | Notes |
|------|--------|-------|
| Tutorial starts on first session | ⬜ | |
| Spotlight highlights food bag | ⬜ | |
| Arrow points to food | ⬜ | |
| "Tap a food to feed" text shown | ⬜ | |
| Waits for player to tap food | ⬜ | |
| Step 2 shows after feeding | ⬜ | |
| Step 3 highlights XP bar | ⬜ | |
| "Got it!" dismisses tutorial | ⬜ | |
| Tutorial doesn't show on reload | ⬜ | |

**Tutorial Feel:**
- [ ] Too hand-holdy
- [ ] Just right
- [ ] Too brief
- [ ] Instructions unclear

**Notes:**
```


```

---

## 3. FEEDING SYSTEM

| Test | Status | Notes |
|------|--------|-------|
| Tapping food feeds pet | ⬜ | |
| Food count decreases by 1 | ⬜ | |
| Pet shows reaction animation | ⬜ | |
| XP gained and displayed | ⬜ | |
| Hunger bar increases | ⬜ | |
| Mood bar changes appropriately | ⬜ | |

### Affinity Reactions

| Food → Pet | Expected | Actual | Status |
|------------|----------|--------|--------|
| Banana → Munchlet | Loved (hearts, +XP) | | ⬜ |
| Cookie → Munchlet | Loved | | ⬜ |
| Spicy Taco → Munchlet | Disliked (yuck) | | ⬜ |
| Spicy Taco → Grib | Loved | | ⬜ |
| Cookie → Grib | Disliked | | ⬜ |
| Cookie → Plompo | Loved | | ⬜ |
| Hot Pepper → Plompo | Disliked | | ⬜ |
| Dream Treat → Whisp | Loved | | ⬜ |
| Golden Feast → Luxe | Loved | | ⬜ |
| Any food → Chomper | Neutral+ (never negative) | | ⬜ |

**Feeding Feel:**
- [ ] Reactions too subtle
- [ ] Just right
- [ ] Too over-the-top
- [ ] XP gain unclear

**Notes:**
```


```

---

## 4. PROGRESSION & LEVELING

| Test | Status | Notes |
|------|--------|-------|
| XP bar fills as you feed | ⬜ | |
| Level up triggers at correct XP | ⬜ | |
| Level up modal appears | ⬜ | |
| Confetti/celebration FX plays | ⬜ | |
| "+50 coins" reward shown | ⬜ | |
| "+5 gems" reward shown | ⬜ | |
| New level displayed after dismiss | ⬜ | |

### XP Curve Feel

| Level Range | Feel | Notes |
|-------------|------|-------|
| 1-5 | ⬜ Too slow / ⬜ Good / ⬜ Too fast | |
| 6-10 | ⬜ Too slow / ⬜ Good / ⬜ Too fast | |
| 11-15 | ⬜ Too slow / ⬜ Good / ⬜ Too fast | |
| 16-20 | ⬜ Too slow / ⬜ Good / ⬜ Too fast | |

**Notes:**
```


```

---

## 5. PET UNLOCK SYSTEM

| Test | Status | Notes |
|------|--------|-------|
| 3 starters always available | ⬜ | |
| Can switch between starters freely | ⬜ | |
| Pets 4-8 show as locked (silhouette) | ⬜ | |
| Locked pets show "Level X or 💎Y" | ⬜ | |
| Reaching Level 10 unlocks Fizz | ⬜ | |
| Unlock celebration modal appears | ⬜ | |
| "Start Playing" switches to new pet | ⬜ | |
| "Maybe Later" dismisses modal | ⬜ | |
| Can unlock with gems if enough | ⬜ | |
| Gems deducted correctly | ⬜ | |
| "Need X more gems" if not enough | ⬜ | |

**Unlock Feel:**
- [ ] Takes too long to unlock
- [ ] Just right
- [ ] Too easy to unlock
- [ ] Gem costs feel fair
- [ ] Gem costs feel too high

**Notes:**
```


```

---

## 6. PET STATE PERSISTENCE

| Test | Status | Notes |
|------|--------|-------|
| Each pet has separate level | ⬜ | |
| Each pet has separate XP | ⬜ | |
| Each pet has separate mood | ⬜ | |
| Each pet has separate hunger | ⬜ | |
| Coins shared across all pets | ⬜ | |
| Gems shared across all pets | ⬜ | |
| Inventory shared across all pets | ⬜ | |
| Switching pets saves current state | ⬜ | |
| Switching pets loads correct state | ⬜ | |
| State persists after browser refresh | ⬜ | |

**Notes:**
```


```

---

## 7. PET SPECIAL ABILITIES

| Pet | Ability | Test | Status |
|-----|---------|------|--------|
| Munchlet | +10% bond | Bond gains slightly more | ⬜ |
| Grib | -20% mood penalty | Disliked food hurts less | ⬜ |
| Plompo | -20% mood decay | Mood drops slower over time | ⬜ |
| Fizz | +25% mini-game rewards | Get more coins from Snack Catch | ⬜ |
| Ember | 2× coins from spicy | Feed taco/pepper, double coins | ⬜ |
| Chomper | No dislikes | All foods neutral or better | ⬜ |
| Whisp | +50% XP from rare | Feed rare/epic food, bonus XP | ⬜ |
| Luxe | +100% gems | Level up gives +10 gems not +5 | ⬜ |

**Ability Feel:**
- [ ] Abilities too subtle to notice
- [ ] Just right
- [ ] Some abilities OP
- [ ] Some abilities useless

**Notes:**
```


```

---

## 8. ECONOMY & SHOP

| Test | Status | Notes |
|------|--------|-------|
| Starting coins sufficient | ⬜ | |
| Can buy food from shop | ⬜ | |
| Coins deduct correctly | ⬜ | |
| Food added to inventory | ⬜ | |
| Can't buy if not enough coins | ⬜ | |
| Gems display correctly | ⬜ | |
| Gem toast shows on gain | ⬜ | |

### Economy Balance

| Question | Answer |
|----------|--------|
| Ran out of coins? | ⬜ Yes / ⬜ No |
| How long until broke? | _______ minutes |
| Felt frustrating? | ⬜ Yes / ⬜ No |
| Prices feel fair? | ⬜ Yes / ⬜ No |

**Suggested Adjustments:**
```


```

---

## 9. MINI-GAME: SNACK CATCH

| Test | Status | Notes |
|------|--------|-------|
| Can access from menu | ⬜ | |
| 60-second timer works | ⬜ | |
| Foods fall from top | ⬜ | |
| Pet moves left/right | ⬜ | |
| Catching good food: +10 | ⬜ | |
| Catching favorite: +20 | ⬜ | |
| Catching bad food: -15 | ⬜ | |
| Combo bonus works | ⬜ | |
| Miss 3 = game over | ⬜ | |
| Score tiers correct | ⬜ | |
| Rewards given at end | ⬜ | |
| Fizz gets +25% bonus | ⬜ | |
| Energy deducted | ⬜ | |

### Mini-Game Feel

| Aspect | Rating |
|--------|--------|
| Difficulty | ⬜ Too hard / ⬜ Good / ⬜ Too easy |
| Length (60s) | ⬜ Too long / ⬜ Good / ⬜ Too short |
| Rewards | ⬜ Too stingy / ⬜ Good / ⬜ Too generous |
| Fun factor | ⬜ Boring / ⬜ Okay / ⬜ Fun / ⬜ Very fun |

**Notes:**
```


```

---

## 10. NAVIGATION & MENU

| Test | Status | Notes |
|------|--------|-------|
| Menu button visible | ⬜ | |
| Menu opens on tap | ⬜ | |
| "Switch Pet" works | ⬜ | |
| "Shop" works | ⬜ | |
| "Mini-Games" works | ⬜ | |
| "Settings" works | ⬜ | |
| "Home" shows warning | ⬜ | |
| "Stay" dismisses warning | ⬜ | |
| "Go Home" returns to splash | ⬜ | |
| Progress saved after going home | ⬜ | |
| Reset Progress shows warning | ⬜ | |
| Reset clears everything | ⬜ | |

**Notes:**
```


```

---

## 11. VISUAL FX & POLISH

| Test | Status | Notes |
|------|--------|-------|
| Loved reaction: hearts + sparkles | ⬜ | |
| Liked reaction: small hearts | ⬜ | |
| Disliked reaction: sweat + shake | ⬜ | |
| Floating "+XP" text | ⬜ | |
| Floating "+Coins" text | ⬜ | |
| Level up confetti | ⬜ | |
| Pet unlock sparkles | ⬜ | |
| Button tap feedback | ⬜ | |
| Progress bars animate smoothly | ⬜ | |
| Idle pet animation | ⬜ | |
| Screen transitions smooth | ⬜ | |
| Modal animations smooth | ⬜ | |

### Polish Feel

| Aspect | Rating |
|--------|--------|
| Overall juice | ⬜ Too little / ⬜ Good / ⬜ Too much |
| Animations | ⬜ Too slow / ⬜ Good / ⬜ Too fast |
| Feedback clarity | ⬜ Unclear / ⬜ Clear / ⬜ Very clear |

**Notes:**
```


```

---

## 12. DEV PANEL (if available)

| Test | Status | Notes |
|------|--------|-------|
| Toggle button visible | ⬜ | |
| Panel opens/closes | ⬜ | |
| Level slider works | ⬜ | |
| XP input works | ⬜ | |
| Mood slider works | ⬜ | |
| Hunger slider works | ⬜ | |
| Add/remove coins works | ⬜ | |
| Add/remove gems works | ⬜ | |
| Fill all food works | ⬜ | |
| Unlock all pets works | ⬜ | |
| Reset pet works | ⬜ | |
| Reset all works | ⬜ | |

---

## 13. BUGS FOUND

| # | Description | Severity | Steps to Reproduce |
|---|-------------|----------|-------------------|
| 1 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 2 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 3 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 4 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 5 | | ⬜ Low / ⬜ Med / ⬜ High | |

---

## 14. OVERALL IMPRESSIONS

### What Worked Well
```



```

### What Needs Improvement
```



```

### Balance Recommendations
```



```

### Priority Fixes
1. 
2. 
3. 

---

## SUMMARY

| Section | Status |
|---------|--------|
| Onboarding | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Tutorial | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Feeding | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Progression | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Pet Unlocks | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Pet State | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Pet Abilities | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Economy | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Mini-Game | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Navigation | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Visual FX | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Dev Panel | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |

**Overall Build Quality:** ⬜ Ready / ⬜ Needs Polish / ⬜ Major Issues

---

**Tested By:** _______________  
**Date:** _______________  
**Time Spent:** _______________
