# GRUNDY v2.2 — TEST PLAN

**Use this checklist to verify the build before pushing to GitHub.**

---

## CRITICAL ALIGNMENT TESTS

Run these first. If any fail, stop and fix before continuing.

| # | Test | Expected | Pass? |
|---|------|----------|-------|
| A1 | Check for visible stat bars | Only Bond hearts visible. NO hunger/mood/energy bars. | ⬜ |
| A2 | Feed pet, check cooldown | Timer appears: "⏱️ 29:45" | ⬜ |
| A3 | Set time to 8 AM, check indicator | 🌅 Morning indicator visible | ⬜ |
| A4 | Trigger neglect in Classic mode | Pet runs away, NOT dies | ⬜ |
| A5 | Complete Bronze mini-game | Reward = 3 coins, 0 gems | ⬜ |
| A6 | Check Fizz unlock requirement | Shows "Bond Level 5", NOT gem purchase | ⬜ |

---

## PART 1: ONBOARDING

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 1.1 | Fresh start | Clear localStorage, load game | Splash screen appears | ⬜ |
| 1.2 | Splash animation | Watch splash | Logo fades in with scale animation | ⬜ |
| 1.3 | Tap to start | Tap splash | Goes to intro screen | ⬜ |
| 1.4 | Intro content | Read intro | Shows "These creatures are always hungry..." | ⬜ |
| 1.5 | Skip intro | Tap Skip | Goes to pet selection | ⬜ |
| 1.6 | Pet selection | View 3 starters | Shows origin snippets, NO mechanics | ⬜ |
| 1.7 | Select pet | Tap Munchlet | Goes to tutorial | ⬜ |
| 1.8 | Tutorial step 1 | View tutorial | Spotlight on food bag, "Tap to feed!" | ⬜ |
| 1.9 | Tutorial step 2 | Feed pet | Shows "See how they react?" | ⬜ |
| 1.10 | Tutorial step 3 | Continue | Points to hearts, "Build your bond!" | ⬜ |
| 1.11 | Mode selection | Complete tutorial | Shows Cozy (default) and Classic (locked) | ⬜ |
| 1.12 | Select Cozy | Tap Cozy Mode | Enters main game | ⬜ |

---

## PART 2: FEEDING SYSTEM

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 2.1 | Check inventory | Open food panel | Shows 5 apple, 3 banana, 2 carrot, 1 cookie | ⬜ |
| 2.2 | Feed from inventory | Tap apple | Apple count decreases by 1 | ⬜ |
| 2.3 | Empty inventory | Feed all of one food | That food disappears from list | ⬜ |
| 2.4 | Cooldown starts | Feed any food | Timer shows "⏱️ 29:45" | ⬜ |
| 2.5 | Feed during cooldown | Feed again immediately | Shows reduced value warning | ⬜ |
| 2.6 | XP gained | Feed hungry pet | "+X XP" floating text appears | ⬜ |
| 2.7 | Loved food reaction | Feed Munchlet cookie | Hearts animation, 2x XP | ⬜ |
| 2.8 | Disliked food reaction | Feed Munchlet hot pepper | Sweat drops, 0.5x XP | ⬜ |
| 2.9 | Stuffed blocking | Set fullness to 95 | Cannot feed, pet turns away | ⬜ |

---

## PART 3: HIDDEN STATS & BEHAVIOR

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 3.1 | Hungry behavior | Set fullness to 10 | Pet begs, shows 🍎❓ bubble | ⬜ |
| 3.2 | Peckish behavior | Set fullness to 30 | Pet glances at food | ⬜ |
| 3.3 | Content behavior | Set fullness to 55 | Pet normal, ignores food | ⬜ |
| 3.4 | Satisfied behavior | Set fullness to 80 | Pet shakes head, shows 😌 | ⬜ |
| 3.5 | Stuffed behavior | Set fullness to 95 | Pet turns away, shows 🙅 | ⬜ |
| 3.6 | Happy animation | Set happiness to 80 | Pet bouncy, bright eyes | ⬜ |
| 3.7 | Sad animation | Set happiness to 20 | Pet droopy, slow | ⬜ |

---

## PART 4: BOND SYSTEM

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 4.1 | Bond hearts display | Check UI | Shows ♥♥♥♡♡ format | ⬜ |
| 4.2 | Bond Level 1 | Reach 10 bond | Hearts update to ♥♡♡♡♡ | ⬜ |
| 4.3 | Bond Level 3 | Reach 50 bond | Hearts update to ♥♥♥♡♡ | ⬜ |
| 4.4 | Bond Level 5 | Reach 120 bond | Hearts update to ♥♥♥♥♥ | ⬜ |
| 4.5 | Bond from feeding | Feed hungry pet | Bond increases 0.5-1.0 | ⬜ |
| 4.6 | Bond from mini-game | Complete any game | Bond increases 0.3 | ⬜ |
| 4.7 | Bond from poop | Clean poop | Bond increases 0.1 | ⬜ |
| 4.8 | Munchlet ability | Feed Munchlet | +10% bond vs other pets | ⬜ |

---

## PART 5: DAILY MOMENTS

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 5.1 | Morning indicator | Set time to 8:00 AM | 🌅 indicator visible | ⬜ |
| 5.2 | Morning bonus | Feed during morning | +50% bond gained | ⬜ |
| 5.3 | Afternoon indicator | Set time to 1:00 PM | ☀️ indicator visible | ⬜ |
| 5.4 | Afternoon bonus | Feed during afternoon | +25% XP gained | ⬜ |
| 5.5 | Evening indicator | Set time to 7:00 PM | 🌙 indicator visible | ⬜ |
| 5.6 | Evening bonus | Feed during evening | +50% bond gained | ⬜ |
| 5.7 | No moment | Set time to 3:00 PM | No indicator visible | ⬜ |

---

## PART 6: MINI-GAMES

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 6.1 | Energy display | Check mini-game hub | Shows "⚡ 50/50" | ⬜ |
| 6.2 | First game free | Play first game of day | No energy consumed | ⬜ |
| 6.3 | Energy cost | Play second game | Energy drops by 10 | ⬜ |
| 6.4 | Bronze reward | Score 50 | 3 coins, 0 gems | ⬜ |
| 6.5 | Silver reward | Score 150 | 7 coins, 0 gems | ⬜ |
| 6.6 | Gold reward | Score 250 | 15 coins, 0 gems | ⬜ |
| 6.7 | Rainbow reward | Score 350 | 22 coins, 1 gem | ⬜ |
| 6.8 | Bond from game | Complete any game | +0.3 bond | ⬜ |
| 6.9 | Happiness from game | Complete any game | +7 happiness | ⬜ |
| 6.10 | Fizz coin bonus | Play as Fizz, Gold tier | 19 coins (15 × 1.25) | ⬜ |
| 6.11 | Luxe gem bonus | Play as Luxe, Rainbow | 2 gems (1 × 2) | ⬜ |
| 6.12 | Low energy | Drain to < 10 energy | Cannot play, shows message | ⬜ |

---

## PART 7: PET UNLOCKS

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 7.1 | Starter pets | Check pet selector | Munchlet, Grib, Plompo unlocked | ⬜ |
| 7.2 | Fizz locked | Check Fizz card | Shows "Bond Level 5" with progress bar | ⬜ |
| 7.3 | Ember locked | Check Ember card | Shows "10 Mini-games" with progress bar | ⬜ |
| 7.4 | Fizz unlock | Reach Bond Level 5 | Fizz unlocks, celebration modal | ⬜ |
| 7.5 | Ember unlock | Play 10 mini-games | Ember unlocks, celebration modal | ⬜ |
| 7.6 | Celebration modal | Unlock any pet | Shows origin story, ability, "Start Playing" | ⬜ |
| 7.7 | Switch to new pet | Click "Start Playing" | New pet becomes active | ⬜ |
| 7.8 | Premium pets | Check Chomper/Whisp/Luxe | Shows level requirements | ⬜ |

---

## PART 8: SHOP

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 8.1 | Shop opens | Tap shop button | Shop panel slides up | ⬜ |
| 8.2 | All foods shown | Check shop | 15 foods with prices | ⬜ |
| 8.3 | Buy food | Buy apple (5 coins) | Coins decrease, inventory increases | ⬜ |
| 8.4 | Can't afford | Try to buy with insufficient coins | Button disabled, shows message | ⬜ |
| 8.5 | Rarity badges | Check food cards | Shows common/uncommon/rare/legendary | ⬜ |

---

## PART 9: POOP SYSTEM

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 9.1 | Poop appears | Feed 3-4 times | 💩 appears near pet | ⬜ |
| 9.2 | Tap to clean | Tap poop | Sparkle effect, poop removed | ⬜ |
| 9.3 | Clean reward | Clean poop | +0.1 bond, +2 happiness | ⬜ |
| 9.4 | Poop stacks | Don't clean, feed more | Up to 3 poops shown | ⬜ |

---

## PART 10: GEM ECONOMY

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 10.1 | Level up gems | Level up any pet | +5 gems, toast appears | ⬜ |
| 10.2 | Rainbow gems | Get Rainbow tier | +1 gem, toast appears | ⬜ |
| 10.3 | First feed gems | First feed of day | +1 gem, toast appears | ⬜ |
| 10.4 | Luxe level up | Level up Luxe | +10 gems (doubled) | ⬜ |
| 10.5 | Gem toast | Any gem event | Toast shows "+X 💎 [source]" | ⬜ |

---

## PART 11: EVOLUTION

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 11.1 | Baby stage | Check Level 1-6 pet | Shows "Baby", smaller scale | ⬜ |
| 11.2 | Youth stage | Set pet to Level 7 | Shows "Youth", medium scale | ⬜ |
| 11.3 | Evolved stage | Set pet to Level 13 | Shows "Evolved", full scale | ⬜ |

---

## PART 12: NAVIGATION

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 12.1 | Bottom nav | Check main screen | 4 buttons: Pets, Shop, Play, Settings | ⬜ |
| 12.2 | Pets panel | Tap Pets button | Pet selector slides up | ⬜ |
| 12.3 | Shop panel | Tap Shop button | Shop slides up | ⬜ |
| 12.4 | Games panel | Tap Play button | Mini-game hub slides up | ⬜ |
| 12.5 | Settings panel | Tap Settings | Settings slides up | ⬜ |
| 12.6 | Sound toggle | Toggle sound | Sound on/off works | ⬜ |
| 12.7 | Close panel | Tap X or overlay | Panel closes | ⬜ |

---

## PART 13: PERSISTENCE

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 13.1 | State saves | Make changes, check localStorage | grundy-save-v2 exists | ⬜ |
| 13.2 | State loads | Refresh page | All progress preserved | ⬜ |
| 13.3 | Daily reset | Change date, reload | firstFeedToday = true, firstGameToday = true | ⬜ |
| 13.4 | Reset progress | Settings → Reset | Confirmation dialog, full reset | ⬜ |

---

## PART 14: CLASSIC MODE (if Level 10+)

| # | Test | Steps | Expected | Pass? |
|---|------|-------|----------|-------|
| 14.1 | Classic unlock | Reach Level 10 | Classic mode selectable | ⬜ |
| 14.2 | Neglect stage 1 | Neglect pet | Pet becomes sad | ⬜ |
| 14.3 | Neglect stage 2 | Continue neglect | Pet becomes sick | ⬜ |
| 14.4 | Neglect stage 3 | Continue neglect | Pet warns about leaving | ⬜ |
| 14.5 | Runaway | Continue neglect | Pet runs away, NOT dies | ⬜ |
| 14.6 | Lockout timer | Pet ran away | Shows "Returns in 47:59:59" | ⬜ |
| 14.7 | Apologize option | Pet ran away | Shows "Apologize for 25 💎" | ⬜ |
| 14.8 | Pay to return | Click Apologize | 25 gems deducted, pet returns | ⬜ |
| 14.9 | Bond penalty | Pet returns | Bond reduced by 50% | ⬜ |

---

## SUMMARY

| Category | Tests | Passed |
|----------|-------|--------|
| Critical Alignment | 6 | /6 |
| Onboarding | 12 | /12 |
| Feeding System | 9 | /9 |
| Hidden Stats & Behavior | 7 | /7 |
| Bond System | 8 | /8 |
| Daily Moments | 7 | /7 |
| Mini-Games | 12 | /12 |
| Pet Unlocks | 8 | /8 |
| Shop | 5 | /5 |
| Poop System | 4 | /4 |
| Gem Economy | 5 | /5 |
| Evolution | 3 | /3 |
| Navigation | 7 | /7 |
| Persistence | 4 | /4 |
| Classic Mode | 9 | /9 |
| **TOTAL** | **106** | **/106** |

---

**All tests must pass before pushing to GitHub.**
