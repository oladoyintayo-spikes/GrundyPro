# GRUNDY — PLAYTEST CHECKLIST v2.1

**Date:** _______________  
**Build:** grundy-game.html  
**Tester:** _______________  
**Aligned With:** GRUNDY_MASTER_DECISIONS.md

---

## INSTRUCTIONS

1. Clear browser localStorage before testing (fresh start)
2. Go through each section
3. Mark ✅ Pass, ❌ Fail, or ⚠️ Needs Work
4. Add notes for anything that feels off
5. Share results for balance adjustments

---

## ⚠️ CRITICAL ALIGNMENT CHECKS (DO FIRST)

| Test | Status | Notes |
|------|--------|-------|
| **Only Bond hearts visible (no stat bars)** | ⬜ | |
| Pet behavior shows fullness state | ⬜ | |
| Daily Moment indicator appears at correct times | ⬜ | |
| **NO death system (runaway instead)** | ⬜ | |
| Bronze reward = 3 coins (not 10+) | ⬜ | |
| Rainbow reward = 22 coins + 1 gem (not 100+) | ⬜ | |
| Fizz unlocks at Bond Level 5 (not gems) | ⬜ | |
| Ember unlocks at 10 mini-games (not gems) | ⬜ | |

**Alignment Status:** ⬜ Pass / ⬜ Fail

---

## 1. ONBOARDING FLOW

| Test | Status | Notes |
|------|--------|-------|
| Splash screen appears on first launch | ⬜ | |
| Logo animates in smoothly | ⬜ | |
| "Tap to start" is visible and pulses | ⬜ | |
| **1-page intro (not multi-page story)** | ⬜ | |
| Skip button works | ⬜ | |
| Pet selection shows 3 starters | ⬜ | |
| **Origin snippets shown (NOT mechanics)** | ⬜ | |
| Munchlet: "Found on a sunny windowsill..." | ⬜ | |
| Grib: "Appeared in a shadow..." | ⬜ | |
| Plompo: "Discovered sleeping in a cloud..." | ⬜ | |
| "Let's Go!" disabled until selection | ⬜ | |
| Proceeds to tutorial after selection | ⬜ | |
| **Mode selection AFTER tutorial** | ⬜ | |

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
| Step 1: "Tap a food to feed your pet!" | ⬜ | |
| Step 2: "See how they react?" | ⬜ | |
| **Step 3: Points to Bond hearts** | ⬜ | |
| "Got it!" dismisses tutorial | ⬜ | |
| **Mode selection appears after tutorial** | ⬜ | |
| Cozy mode default/recommended | ⬜ | |
| Classic mode locked (Level 10) | ⬜ | |
| Tutorial doesn't show on reload | ⬜ | |

**Tutorial Feel:**
- [ ] Too hand-holdy
- [ ] Just right
- [ ] Too brief

**Notes:**
```


```

---

## 3. HIDDEN STATS SYSTEM

| Test | Status | Notes |
|------|--------|-------|
| **NO hunger bar visible** | ⬜ | |
| **NO mood bar visible** | ⬜ | |
| **NO energy bar visible** | ⬜ | |
| **Bond hearts visible (♥♥♥♡♡)** | ⬜ | |
| Cooldown timer visible after feeding | ⬜ | |
| Pet behavior changes with fullness | ⬜ | |

### Fullness Behaviors

| Fullness State | Expected Behavior | Status |
|----------------|-------------------|--------|
| Hungry (0-20) | Begs, 🍎❓ bubble, stomach growl | ⬜ |
| Peckish (21-40) | Glances at food occasionally | ⬜ |
| Content (41-70) | Happy idle, ignores food | ⬜ |
| Satisfied (71-90) | Shakes head, 😌 bubble | ⬜ |
| Stuffed (91-100) | Turns away, 🙅 bubble, blocks feeding | ⬜ |

**Hidden Stats Feel:**
- [ ] Can't tell what pet needs
- [ ] Just right — pet behavior is clear
- [ ] Too obvious — might as well show bars

**Notes:**
```


```

---

## 4. DAILY MOMENTS SYSTEM

| Test | Status | Notes |
|------|--------|-------|
| Morning (7-10 AM): 🌅 indicator visible | ⬜ | |
| Morning bonus: +50% bond | ⬜ | |
| Afternoon (12-2 PM): ☀️ indicator visible | ⬜ | |
| Afternoon bonus: +25% XP | ⬜ | |
| Evening (6-9 PM): 🌙 indicator visible | ⬜ | |
| Evening bonus: +50% bond | ⬜ | |
| No indicator outside bonus windows | ⬜ | |
| Bonus text visible ("Extra cuddles!") | ⬜ | |

**Daily Moments Feel:**
- [ ] Don't notice it
- [ ] Just right — nice bonus
- [ ] Too pushy — makes me feel obligated

**Notes:**
```


```

---

## 5. FEEDING SYSTEM

| Test | Status | Notes |
|------|--------|-------|
| Tapping food feeds pet | ⬜ | |
| Food count decreases by 1 | ⬜ | |
| Pet shows reaction animation | ⬜ | |
| XP gained and displayed | ⬜ | |
| Bond hearts update | ⬜ | |
| **30-min cooldown timer appears** | ⬜ | |
| **Feeding during cooldown = 25% value** | ⬜ | |
| **Stuffed pet blocks feeding** | ⬜ | |

### Affinity Reactions

| Food → Pet | Expected | Actual | Status |
|------------|----------|--------|--------|
| Banana → Munchlet | Loved (hearts, 2× XP) | | ⬜ |
| Cookie → Munchlet | Loved | | ⬜ |
| Spicy Taco → Munchlet | Disliked (yuck, 0.5× XP) | | ⬜ |
| Spicy Taco → Grib | Loved | | ⬜ |
| Cookie → Grib | Disliked | | ⬜ |
| Any food → Chomper | Neutral+ (never negative) | | ⬜ |

**Feeding Feel:**
- [ ] Reactions too subtle
- [ ] Just right
- [ ] Too over-the-top

**Notes:**
```


```

---

## 6. PET UNLOCK SYSTEM ⚠️ CRITICAL

| Test | Status | Notes |
|------|--------|-------|
| 3 starters always available | ⬜ | |
| Can switch between starters freely | ⬜ | |

### Earnable Pets (Achievements)

| Pet | Requirement | Shows Progress? | NO Gems? | Status |
|-----|-------------|-----------------|----------|--------|
| Fizz | Bond Level 5 | ⬜ | ⬜ | ⬜ |
| Ember | 10 Mini-games | ⬜ | ⬜ | ⬜ |

### Premium Pets

| Pet | Shows "Plus"? | Shows Price? | Shows Achievement? | Status |
|-----|---------------|--------------|-------------------|--------|
| Chomper | ⬜ | $1.99 ⬜ | Level 25 ⬜ | ⬜ |
| Whisp | ⬜ | $2.49 ⬜ | Level 30 ⬜ | ⬜ |
| Luxe | ⬜ | $2.99 ⬜ | Level 40 ⬜ | ⬜ |

**Unlock Feel:**
- [ ] Takes too long to unlock
- [ ] Just right
- [ ] Too easy to unlock
- [ ] Achievement requirements feel fair
- [ ] Premium options clearly explained

**Notes:**
```


```

---

## 7. MINI-GAME REWARDS ⚠️ CRITICAL

### Snack Catch Rewards

| Tier | Score | Expected Coins | Expected Gems | Actual | Status |
|------|-------|----------------|---------------|--------|--------|
| Bronze | 0-99 | **3** | 0 | | ⬜ |
| Silver | 100-199 | **7** | 0 | | ⬜ |
| Gold | 200-299 | **15** | 0 | | ⬜ |
| Rainbow | 300+ | **22** | **1** | | ⬜ |

### Additional Checks

| Test | Status | Notes |
|------|--------|-------|
| Energy costs 10 per game | ⬜ | |
| First daily game FREE | ⬜ | |
| Energy regens 1 per 30 min | ⬜ | |
| Fizz gets +25% coins (NOT total rewards) | ⬜ | |
| Per-game: +0.3 bond, +5 happiness | ⬜ | |

**Reward Feel:**
- [ ] Too stingy
- [ ] Just right
- [ ] Too generous

**Notes:**
```


```

---

## 8. CLASSIC MODE — RUNAWAY SYSTEM ⚠️ CRITICAL

| Test | Status | Notes |
|------|--------|-------|
| Classic mode unlocks at Level 10 | ⬜ | |
| Warning modal when switching to Classic | ⬜ | |
| **NO "death" text anywhere** | ⬜ | |

### Neglect Path

| Stage | Condition | Visual | Status |
|-------|-----------|--------|--------|
| 1 | Sad | Droopy pet | ⬜ |
| 2 | Sick | Green tint, shivering | ⬜ |
| 3 | Warning | Looks at exit, 💭🚪 | ⬜ |
| 4 | Runaway | Pet leaves screen | ⬜ |

### Runaway Screen

| Test | Status | Notes |
|------|--------|-------|
| Shows "Your pet ran away..." | ⬜ | |
| Shows timer "Returns in X:XX:XX" | ⬜ | |
| Shows "Apologize for 25 💎" button | ⬜ | |
| Shows "Bond will be reduced by 50%" | ⬜ | |
| **NO "death" or "died" anywhere** | ⬜ | |

### Return Options

| Test | Status | Notes |
|------|--------|-------|
| Wait 48h → Pet returns free | ⬜ | |
| Pay 25 gems → Pet returns immediately | ⬜ | |
| Bond reduced 50% on return | ⬜ | |
| Happy reunion animation | ⬜ | |

**Classic Mode Feel:**
- [ ] Too punishing
- [ ] Just right — meaningful but fair
- [ ] Too easy — no real stakes

**Notes:**
```


```

---

## 9. NAVIGATION & MENU

| Test | Status | Notes |
|------|--------|-------|
| Menu button visible | ⬜ | |
| Menu opens on tap | ⬜ | |
| "Switch Pet" works | ⬜ | |
| "Shop" works | ⬜ | |
| "Mini-Games" works | ⬜ | |
| "Settings" works | ⬜ | |
| "Home" shows warning | ⬜ | |
| Progress saved after going home | ⬜ | |
| Reset Progress shows warning | ⬜ | |

**Notes:**
```


```

---

## 10. VISUAL FX & POLISH

| Test | Status | Notes |
|------|--------|-------|
| Loved reaction: hearts + sparkles | ⬜ | |
| Liked reaction: small hearts | ⬜ | |
| Disliked reaction: sweat + shake | ⬜ | |
| Floating "+XP" text | ⬜ | |
| Floating "+Coins" text | ⬜ | |
| Level up confetti | ⬜ | |
| Pet unlock sparkles | ⬜ | |
| **Daily Moment glow effect** | ⬜ | |
| **Fullness behavior animations** | ⬜ | |
| **Runaway warning animations** | ⬜ | |

**Notes:**
```


```

---

## 11. SOUND & VIBRATION

| Test | Status | Notes |
|------|--------|-------|
| Feeding sounds match reaction | ⬜ | |
| Level up jingle plays | ⬜ | |
| **Pet behavior sounds (hungry, satisfied)** | ⬜ | |
| **Daily Moment chime** | ⬜ | |
| **Runaway warning sound** | ⬜ | |
| **Pet return sound** | ⬜ | |
| Vibration on feed (Android) | ⬜ | |
| Vibration patterns vary by action | ⬜ | |
| Mute toggle works | ⬜ | |

**Notes:**
```


```

---

## 12. BUGS FOUND

| # | Description | Severity | Steps to Reproduce |
|---|-------------|----------|-------------------|
| 1 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 2 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 3 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 4 | | ⬜ Low / ⬜ Med / ⬜ High | |
| 5 | | ⬜ Low / ⬜ Med / ⬜ High | |

---

## 13. OVERALL IMPRESSIONS

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
| ⚠️ Alignment Checks | ⬜ Pass / ⬜ Fail |
| Onboarding | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Tutorial | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Hidden Stats | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Daily Moments | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Feeding | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Pet Unlocks | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Mini-Game Rewards | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Runaway System | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Navigation | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Visual FX | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |
| Sound/Vibration | ⬜ Pass / ⬜ Needs Work / ⬜ Fail |

**Overall Build Quality:** ⬜ Ready / ⬜ Needs Polish / ⬜ Major Issues

**Alignment Status:** ⬜ Fully Aligned / ⬜ Needs Fixes

---

**Tested By:** _______________  
**Date:** _______________  
**Time Spent:** _______________
