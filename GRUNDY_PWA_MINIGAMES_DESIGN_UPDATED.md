# GRUNDY — PWA + MINI-GAMES EXPANSION

**Version:** 1.1 (Master Decisions Aligned)  
**Date:** December 2024  
**Status:** Design Spec

---

> **⚠️ CRITICAL: This document has been updated to align with GRUNDY_MASTER_DECISIONS.md**
>
> | Decision | Implementation |
> |----------|----------------|
> | #13 Conservative Rewards | Bronze: 3c, Silver: 7c, Gold: 15c, Rainbow: 22c + 1 gem |
> | #6 Pet Unlocks | Achievement-based (Fizz=Bond Lv5, Ember=10 games) |
> | #14 No Death | Runaway system (48h lockout, 25 gems, -50% bond) |
> | Fizz Ability | +25% COINS only (not total rewards) |

---

# PART 1: PWA (PROGRESSIVE WEB APP)

## Overview

Turn Grundy into an installable app that works offline, has a home screen icon, and feels native on mobile.

---

## 1.1 What PWA Adds

| Feature | Benefit |
|---------|---------|
| **Install to Home Screen** | App icon like native apps |
| **Offline Support** | Play without internet |
| **Full Screen** | No browser UI, immersive |
| **Fast Loading** | Cached assets |
| **Push Notifications** | (Future) Remind players to feed pet |

---

## 1.2 Required Files

### manifest.json

```json
{
  "name": "Grundy - Virtual Pet Adventure",
  "short_name": "Grundy",
  "description": "Adopt and care for your very own virtual pet!",
  "start_url": "/grundy-game.html",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#1a1a2e",
  "theme_color": "#fbbf24",
  "icons": [
    {
      "src": "icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "categories": ["games", "entertainment"],
  "screenshots": [
    {
      "src": "screenshots/gameplay.png",
      "sizes": "540x720",
      "type": "image/png",
      "label": "Pet Care Gameplay"
    }
  ]
}
```

### service-worker.js

```javascript
const CACHE_NAME = 'grundy-v1';
const ASSETS = [
  '/',
  '/grundy-game.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install: Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => cached || fetch(event.request))
      .catch(() => caches.match('/grundy-game.html'))
  );
});
```

### HTML Head Updates

```html
<!-- Add to <head> -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#fbbf24">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Grundy">
<link rel="apple-touch-icon" href="icons/icon-152.png">

<!-- Register service worker -->
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('SW registered'))
      .catch((err) => console.log('SW failed:', err));
  }
</script>
```

---

## 1.3 Install Prompt UI

```
┌─────────────────────────────────────────┐
│  📱 Install Grundy!                     │
│                                         │
│  Add to your home screen for the        │
│  best experience - play offline!        │
│                                         │
│  [Install]  [Maybe Later]               │
└─────────────────────────────────────────┘
```

### Install Prompt Logic

```typescript
let deferredPrompt: BeforeInstallPromptEvent | null = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

function handleInstallClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User installed app');
      }
      deferredPrompt = null;
      hideInstallBanner();
    });
  }
}
```

---

## 1.4 App Icons

| Size | Usage |
|------|-------|
| 72×72 | Android (low) |
| 96×96 | Android (medium) |
| 128×128 | Chrome Web Store |
| 144×144 | Android (high) |
| 152×152 | iOS |
| 192×192 | Android (x-high) |
| 384×384 | Android (xx-high) |
| 512×512 | Splash screen |

**Icon Design:**
- Munchlet face (🟡) centered
- Dark purple background (#1a1a2e)
- Rounded corners (auto on most devices)

---

## 1.5 PWA Tickets

| ID | Task | Priority |
|----|------|----------|
| WEB-073 | Create manifest.json | P0 |
| WEB-074 | Create service-worker.js | P0 |
| WEB-075 | Add PWA meta tags to HTML | P0 |
| WEB-076 | Generate app icons (all sizes) | P1 |
| WEB-077 | Create install prompt UI | P1 |
| WEB-078 | Add offline fallback page | P2 |
| WEB-079 | Test PWA on Android/iOS | P1 |

---

# PART 2: NEW MINI-GAMES

## Overview

Add 3 new mini-games to complement Snack Catch, each testing different skills and featuring pet abilities.

---

## 2.0 Universal Mini-Game Rules (MASTER DECISIONS)

> **⚠️ CRITICAL: All mini-games MUST use conservative rewards from Master Decision #13**

### Energy System
- **Maximum Energy:** 50
- **Cost per game:** 10 energy
- **Regeneration:** 1 energy per 30 minutes
- **First daily game:** FREE (no energy cost)

### Conservative Reward Tiers (ALL GAMES)

| Tier | Score Range | Coins | Gems | Bond | Happiness |
|------|-------------|-------|------|------|-----------|
| Bronze | 0-99 | 3 | 0 | +0.3 | +5 |
| Silver | 100-199 | 7 | 0 | +0.3 | +5 |
| Gold | 200-299 | 15 | 0 | +0.3 | +5 |
| Rainbow | 300+ | 22 | 1 | +0.3 | +5 |

### Pet Ability: Fizz
- **Bonus:** +25% COINS only (not gems, not bond)
- **Example:** Rainbow tier = 22 × 1.25 = 27 coins (still 1 gem)

### Reward Formulas

```typescript
function calculateMiniGameReward(score: number, pet: Pet): Reward {
  const tier = getScoreTier(score);
  
  // Base rewards (CONSERVATIVE - Master Decision #13)
  const baseRewards = {
    bronze:  { coins: 3,  gems: 0, bond: 0.3, happiness: 7 },
    silver:  { coins: 7,  gems: 0, bond: 0.3, happiness: 7 },
    gold:    { coins: 15, gems: 0, bond: 0.3, happiness: 7 },
    rainbow: { coins: 22, gems: 1, bond: 0.3, happiness: 7 }
  };
  
  let reward = { ...baseRewards[tier] };
  
  // Fizz bonus: +25% COINS ONLY
  if (pet.id === 'fizz') {
    reward.coins = Math.floor(reward.coins * 1.25);
  }
  
  return reward;
}

function getScoreTier(score: number): string {
  if (score >= 300) return 'rainbow';
  if (score >= 200) return 'gold';
  if (score >= 100) return 'silver';
  return 'bronze';
}
```

---

## 2.1 Mini-Game Hub Update

```
┌─────────────────────────────────────────┐
│        🎮 MINI-GAMES                    │
│        ⚡ Energy: 40/50                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ 🍎      │  │ 🧠      │              │
│  │ Snack   │  │ Memory  │              │
│  │ Catch   │  │ Match   │              │
│  │ ✅      │  │ ✅      │              │
│  └─────────┘  └─────────┘              │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ 🎵      │  │ 🧹      │              │
│  │ Rhythm  │  │ Poop    │              │
│  │ Tap     │  │ Scoop   │              │
│  │ ✅      │  │ ✅      │              │
│  └─────────┘  └─────────┘              │
│                                         │
│  First game today is FREE! ⭐           │
│                                         │
└─────────────────────────────────────────┘
```

---

## 2.2 Mini-Game: Memory Match 🧠

### Concept
Flip cards to find matching food pairs. Tests memory and attention.

### Gameplay

```
┌─────────────────────────────────────────┐
│  🧠 MEMORY MATCH       Moves: 12        │
│                        Pairs: 3/8       │
├─────────────────────────────────────────┤
│                                         │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐             │
│   │ ? │ │🍎│ │ ? │ │ ? │             │
│   └───┘ └───┘ └───┘ └───┘             │
│                                         │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐             │
│   │ ? │ │ ? │ │🍎│ │ ? │             │
│   └───┘ └───┘ └───┘ └───┘             │
│                                         │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐             │
│   │🍌│ │🍌│ │ ? │ │ ? │             │
│   └───┘ └───┘ └───┘ └───┘             │
│                                         │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐             │
│   │ ? │ │ ? │ │ ? │ │ ? │             │
│   └───┘ └───┘ └───┘ └───┘             │
│                                         │
└─────────────────────────────────────────┘
```

### Rules
- 16 cards (8 pairs) of food items
- Tap to flip, find matches
- Match = cards stay revealed
- Goal: Find all pairs in fewest moves

### Scoring (Converts to Universal Tiers)

| Performance | Moves | Score | Tier |
|-------------|-------|-------|------|
| Perfect | ≤12 | 350 | Rainbow |
| Great | 13-18 | 250 | Gold |
| Good | 19-24 | 150 | Silver |
| Complete | 25+ | 50 | Bronze |

### Rewards (CONSERVATIVE - per Master Decision #13)

| Performance | Coins | Gems |
|-------------|-------|------|
| Perfect (Rainbow) | 22 | 1 |
| Great (Gold) | 15 | 0 |
| Good (Silver) | 7 | 0 |
| Complete (Bronze) | 3 | 0 |

### Pet Abilities

| Pet | Ability |
|-----|---------|
| **Whisp** | Peek: See all cards for 2 seconds at start |
| **Luxe** | Second Chance: 1 free undo per game |
| **Munchlet** | Hint: One pair glows briefly every 8 moves |

### Difficulty Levels

| Level | Cards | Unlocked |
|-------|-------|----------|
| Easy | 12 (6 pairs) | Default |
| Normal | 16 (8 pairs) | Level 5 |
| Hard | 20 (10 pairs) | Level 10 |

---

## 2.3 Mini-Game: Rhythm Tap 🎵

### Concept
Tap falling notes in time with the beat. Tests rhythm and timing.

### Gameplay

```
┌─────────────────────────────────────────┐
│  🎵 RHYTHM TAP         Score: 1250      │
│                        Combo: 8x        │
├─────────────────────────────────────────┤
│         │    │    │    │               │
│         │    │ 🔵 │    │               │
│         │ 🟢 │    │    │               │
│         │    │    │ 🟡 │               │
│         │    │    │    │               │
│         │ 🔵 │    │    │               │
│         │    │ 🟢 │    │               │
│         │    │    │    │               │
│  ───────┼────┼────┼────┼───────        │
│    🎯   │ 🎯 │ 🎯 │ 🎯 │   🎯          │
│  ───────┴────┴────┴────┴───────        │
│                                         │
│   [ 🟢 ]  [ 🔵 ]  [ 🟡 ]  [ 🔴 ]       │
│                                         │
└─────────────────────────────────────────┘
```

### Rules
- Notes fall in 4 lanes
- Tap when note reaches target line
- Perfect/Good/Miss timing
- Build combos for multiplier

### Timing Windows

| Timing | Window | Points | Combo |
|--------|--------|--------|-------|
| Perfect | ±50ms | 100 | +1 |
| Good | ±100ms | 50 | +1 |
| OK | ±150ms | 25 | Keep |
| Miss | >150ms | 0 | Reset |

### Songs (Procedural)

| Song | BPM | Duration | Notes |
|------|-----|----------|-------|
| Morning Stretch | 80 | 30s | ~60 |
| Lunch Time | 100 | 45s | ~100 |
| Play Time | 120 | 60s | ~150 |
| Dance Party | 140 | 60s | ~180 |

### Scoring (Converts to Universal Tiers)

| Performance | Accuracy | Score | Tier |
|-------------|----------|-------|------|
| S Rank | 90%+ perfect | 350 | Rainbow |
| A Rank | 75%+ perfect | 250 | Gold |
| B Rank | 50%+ perfect | 150 | Silver |
| C Rank | Complete | 50 | Bronze |

### Rewards (CONSERVATIVE - per Master Decision #13)

| Rank | Coins | Gems |
|------|-------|------|
| S (Rainbow) | 22 | 1 |
| A (Gold) | 15 | 0 |
| B (Silver) | 7 | 0 |
| C (Bronze) | 3 | 0 |

### Pet Abilities

| Pet | Ability |
|-----|---------|
| **Fizz** | Double Time: +25% COINS during fever mode |
| **Ember** | Fire Streak: 10+ combo = notes burn (auto-hit) for 3s |
| **Plompo** | Slow Mo: Notes fall 20% slower |

---

## 2.4 Mini-Game: Poop Scoop 🧹

### Concept
Clean up poop before it piles up! A fast-paced tap game with humor.

### Gameplay

```
┌─────────────────────────────────────────┐
│  🧹 POOP SCOOP         Time: 0:45       │
│                        Score: 320       │
├─────────────────────────────────────────┤
│                                         │
│      💩                                 │
│              💩                         │
│   💩              💩                   │
│          💩                             │
│                      💩    💩          │
│      💩                                 │
│              💩      💩                │
│                                         │
│   💩    💩              💩             │
│                                         │
│          [🟡 Pet watching amused]       │
│                                         │
│  Poop Level: ████████░░ 80%            │
│                                         │
└─────────────────────────────────────────┘
```

### Rules
- Poop appears randomly on screen
- Tap to clean (sparkle effect)
- Poop accumulates if not cleaned
- Game over if poop level reaches 100%
- Golden poop = bonus points!
- Stinky poop (green) = clean fast or -points

### Poop Types

| Type | Points | Spawn Rate | Notes |
|------|--------|------------|-------|
| Normal 💩 | +10 | Common | Standard |
| Golden ✨💩 | +50 | Rare (5%) | Bonus! |
| Stinky 💩💚 | +20 or -10 | Medium (15%) | Must clean in 2s |
| Rainbow 🌈💩 | +100 | Very Rare (1%) | Jackpot! |

### Difficulty Curve
- Start: 1 poop every 2 seconds
- Each 15 seconds: +0.5 poops/sec
- Max: 3 poops per second

### Scoring (Converts to Universal Tiers)

| Performance | Score | Tier |
|-------------|-------|------|
| Spotless | 500+ | Rainbow |
| Clean | 350-499 | Gold |
| Tidy | 200-349 | Silver |
| Messy | <200 | Bronze |

### Rewards (CONSERVATIVE - per Master Decision #13)

| Performance | Coins | Gems |
|-------------|-------|------|
| Spotless (Rainbow) | 22 | 1 |
| Clean (Gold) | 15 | 0 |
| Tidy (Silver) | 7 | 0 |
| Messy (Bronze) | 3 | 0 |

### Pet Abilities

| Pet | Ability |
|-----|---------|
| **Grib** | Poop Magnet: Tap once to clear 3 nearby poops |
| **Chomper** | Gross! Eats poop for double points (eww but effective) |
| **Luxe** | Diva Rage: Every 20 poops, clear all at once "This is DISGUSTING!" |

---

## 2.5 Mini-Game Summary

| Game | Type | Duration | Main Skill |
|------|------|----------|------------|
| Snack Catch | Arcade | 60s | Reflexes |
| Memory Match | Puzzle | Varies | Memory |
| Rhythm Tap | Music | 30-60s | Timing |
| Poop Scoop | Action | 60s | Speed |

### Universal Rules (MASTER DECISIONS)

- All games cost 10 energy to play
- First daily game is FREE
- **CONSERVATIVE REWARDS:** 3/7/15/22 coins (Bronze/Silver/Gold/Rainbow)
- **ONLY Rainbow tier awards gems** (1 gem)
- Per-game bonus: +0.3 bond, +7 happiness
- Fizz gets +25% COINS only (not gems)
- Daily high scores tracked
- Weekly leaderboard (future)

### Achievement: Ember Unlock
- **Requirement:** Complete 10 mini-games (any combination)
- **Tracks:** Total games completed across all mini-games
- **Reward:** Ember unlocked permanently

---

## 2.6 Mini-Game Tickets

| ID | Task | Priority |
|----|------|----------|
| WEB-080 | Update Mini-Game Hub UI (add energy display) | P1 |
| WEB-081 | Create Memory Match game | P1 |
| WEB-082 | Add Memory Match difficulty levels | P2 |
| WEB-083 | Create Rhythm Tap game | P1 |
| WEB-084 | Add procedural song generation | P2 |
| WEB-085 | Create Poop Scoop game | P1 |
| WEB-086 | Add special poop types | P2 |
| WEB-087 | Implement pet abilities for all games | P1 |
| WEB-088 | Add mini-game sound effects | P1 |
| WEB-089 | Add mini-game high scores | P2 |
| WEB-090 | Implement conservative rewards (Master Decision #13) | P0 |
| WEB-091 | Track Ember unlock progress (10 games) | P1 |

---

# PART 3: IMPLEMENTATION PRIORITY

## Phase 6A: PWA (Estimated: 2-3 hours)

```
1. WEB-073: manifest.json
2. WEB-074: service-worker.js
3. WEB-075: PWA meta tags
4. WEB-076: Generate icons
5. WEB-077: Install prompt
6. WEB-079: Test on devices
```

## Phase 6B: Mini-Games (Estimated: 6-8 hours)

```
1. WEB-090: Conservative rewards (DO FIRST)
2. WEB-080: Mini-Game Hub update (energy display)
3. WEB-081: Memory Match (2 hrs)
4. WEB-085: Poop Scoop (2 hrs)
5. WEB-083: Rhythm Tap (2 hrs)
6. WEB-087: Pet abilities
7. WEB-088: Sound effects
8. WEB-091: Ember unlock tracking
```

---

# PART 4: TEST CASES

## PWA Tests

| TC | Test | Expected |
|----|------|----------|
| TC-104 | Manifest loads | No console errors |
| TC-105 | Service worker registers | SW registered log |
| TC-106 | Offline mode works | Game loads without internet |
| TC-107 | Install prompt appears | Banner shows on mobile |
| TC-108 | App installs | Icon on home screen |
| TC-109 | Standalone mode works | No browser UI |
| TC-110 | iOS install works | Add to Home Screen |

## Conservative Rewards Tests (Master Decision #13)

| TC | Test | Expected |
|----|------|----------|
| TC-NEW-01 | Bronze tier rewards | 3 coins, 0 gems |
| TC-NEW-02 | Silver tier rewards | 7 coins, 0 gems |
| TC-NEW-03 | Gold tier rewards | 15 coins, 0 gems |
| TC-NEW-04 | Rainbow tier rewards | 22 coins, 1 gem |
| TC-NEW-05 | Fizz coin bonus | +25% coins ONLY |
| TC-NEW-06 | Per-game bond | +0.3 bond |
| TC-NEW-07 | Per-game happiness | +7 happiness |
| TC-NEW-08 | First daily free | No energy cost |

## Ember Unlock Tests

| TC | Test | Expected |
|----|------|----------|
| TC-NEW-09 | Games tracked | Count increments after each game |
| TC-NEW-10 | 10 games = unlock | Ember unlocks at 10 completed |
| TC-NEW-11 | Cross-game tracking | Any mini-game counts |

## Memory Match Tests

| TC | Test | Expected |
|----|------|----------|
| TC-111 | Cards shuffle randomly | Different each game |
| TC-112 | Card flip animation | Smooth 3D flip |
| TC-113 | Match detection | Matching pairs stay revealed |
| TC-114 | Move counter | Increments correctly |
| TC-115 | Win condition | All pairs = victory |
| TC-116 | Scoring | Correct rewards per tier |
| TC-117 | Whisp ability | 2s peek at start |

## Rhythm Tap Tests

| TC | Test | Expected |
|----|------|----------|
| TC-118 | Notes spawn | Fall in 4 lanes |
| TC-119 | Timing windows | Perfect/Good/Miss |
| TC-120 | Combo system | Builds and resets |
| TC-121 | Song completes | End screen shows |
| TC-122 | Scoring tiers | S/A/B/C ranks |
| TC-123 | Fizz ability | +25% COINS during fever |

## Poop Scoop Tests

| TC | Test | Expected |
|----|------|----------|
| TC-124 | Poop spawns | Random positions |
| TC-125 | Tap to clean | Poop removed, sparkle |
| TC-126 | Poop level rises | Bar fills over time |
| TC-127 | Game over | 100% poop = end |
| TC-128 | Golden poop | +50 points, rare |
| TC-129 | Stinky timeout | -10 if not cleaned |
| TC-130 | Grib ability | 3-poop magnet works |

---

# SUMMARY

## New Tickets

| Range | Feature | Count |
|-------|---------|-------|
| WEB-073 to WEB-079 | PWA | 7 |
| WEB-080 to WEB-091 | Mini-Games | 12 |
| **Total** | | **19** |

## Updated Project Status

| Metric | Count |
|--------|-------|
| Previous Tickets | 72 |
| New Tickets | 19 |
| **Total Tickets** | **91** |
| Completed | 72 |
| Remaining | 19 |

## Estimated Time

| Feature | Time |
|---------|------|
| PWA | 2-3 hours |
| Mini-Games | 6-8 hours |
| **Total** | **8-11 hours** |

---

## Changelog (v1.1)

| Change | Before | After |
|--------|--------|-------|
| Bronze coins | Variable | 3 coins |
| Silver coins | Variable | 7 coins |
| Gold coins | Variable | 15 coins |
| Rainbow coins | Variable | 22 coins |
| Rainbow gems | Variable | 1 gem |
| Other tier gems | Variable | 0 gems |
| Fizz bonus | +25% all rewards | +25% COINS only |
| Ember unlock | Level 15 OR 100 gems | 10 mini-games completed |
| New tickets | WEB-090, WEB-091 | Conservative rewards, Ember tracking |

---

*END OF PWA + MINI-GAMES EXPANSION (v1.1 - Master Decisions Aligned)*
