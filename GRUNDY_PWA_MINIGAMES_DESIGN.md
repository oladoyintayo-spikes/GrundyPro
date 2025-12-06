# GRUNDY — PWA + MINI-GAMES EXPANSION

**Version:** 1.0  
**Date:** December 2024  
**Status:** Design Spec

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

## 2.1 Mini-Game Hub Update

```
┌─────────────────────────────────────────┐
│        🎮 MINI-GAMES                    │
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

### Scoring

| Performance | Moves | Reward |
|-------------|-------|--------|
| Perfect | ≤12 | 100 coins + 3 gems |
| Great | 13-18 | 75 coins + 2 gems |
| Good | 19-24 | 50 coins + 1 gem |
| Complete | 25+ | 25 coins |

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

### Scoring Tiers

| Performance | Score | Reward |
|-------------|-------|--------|
| S Rank | 90%+ perfect | 100 coins + 3 gems |
| A Rank | 75%+ perfect | 75 coins + 2 gems |
| B Rank | 50%+ perfect | 50 coins + 1 gem |
| C Rank | Complete | 25 coins |

### Pet Abilities

| Pet | Ability |
|-----|---------|
| **Fizz** | Double Time: +25% points during fever mode |
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

### Scoring Tiers

| Performance | Score | Reward |
|-------------|-------|--------|
| Spotless | 500+ | 100 coins + 3 gems |
| Clean | 350-499 | 75 coins + 2 gems |
| Tidy | 200-349 | 50 coins + 1 gem |
| Messy | <200 | 25 coins |

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

### Universal Rules

- All games cost 10 energy to play
- Rewards scale with active pet level (+1% per level)
- Fizz gets +25% rewards on ALL mini-games
- Daily high scores tracked
- Weekly leaderboard (future)

---

## 2.6 Mini-Game Tickets

| ID | Task | Priority |
|----|------|----------|
| WEB-080 | Update Mini-Game Hub UI | P1 |
| WEB-081 | Create Memory Match game | P1 |
| WEB-082 | Add Memory Match difficulty levels | P2 |
| WEB-083 | Create Rhythm Tap game | P1 |
| WEB-084 | Add procedural song generation | P2 |
| WEB-085 | Create Poop Scoop game | P1 |
| WEB-086 | Add special poop types | P2 |
| WEB-087 | Implement pet abilities for all games | P1 |
| WEB-088 | Add mini-game sound effects | P1 |
| WEB-089 | Add mini-game high scores | P2 |

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
1. WEB-080: Mini-Game Hub update
2. WEB-081: Memory Match (2 hrs)
3. WEB-085: Poop Scoop (2 hrs)
4. WEB-083: Rhythm Tap (2 hrs)
5. WEB-087: Pet abilities
6. WEB-088: Sound effects
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
| TC-123 | Fizz ability | +25% fever points |

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
| WEB-080 to WEB-089 | Mini-Games | 10 |
| **Total** | | **17** |

## Updated Project Status

| Metric | Count |
|--------|-------|
| Previous Tickets | 72 |
| New Tickets | 17 |
| **Total Tickets** | **89** |
| Completed | 72 |
| Remaining | 17 |

## Estimated Time

| Feature | Time |
|---------|------|
| PWA | 2-3 hours |
| Mini-Games | 6-8 hours |
| **Total** | **8-11 hours** |

---

*END OF PWA + MINI-GAMES EXPANSION*
