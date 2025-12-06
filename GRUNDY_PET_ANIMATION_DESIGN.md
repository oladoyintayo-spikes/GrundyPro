# GRUNDY — PET ANIMATION DESIGN

**Version:** 1.0  
**Date:** December 2024  
**Status:** Web Prototype Implementation  
**Approach:** SVG Shapes + CSS Animations

---

## OVERVIEW

Each pet has a unique silhouette and personality expressed through animations. This document defines all visual states and animations.

---

# 1. PET SILHOUETTES

## Design Philosophy

| Principle | Implementation |
|-----------|----------------|
| **Instantly Recognizable** | Each pet has unique shape |
| **Personality in Form** | Shape reflects character |
| **Simple but Expressive** | Minimal details, maximum expression |
| **Consistent Style** | All pets feel like same world |

## Pet Shapes

### Munchlet 🟡 (Round, Friendly)
```
     ╭─────╮
    ╱       ╲
   │  ◕   ◕  │
   │    ◡    │
    ╲       ╱
     ╰─────╯
     
Shape: Circle/oval, soft edges
Size: Medium (base size)
Features: Big round eyes, simple smile
Vibe: Approachable, cheerful
```

### Grib 🟢 (Angular, Mischievous)
```
       ╱╲
      ╱  ╲
     ╱ ◕◕ ╲
    │  ──  │
     ╲ ▽  ╱
      ╲  ╱
       ╲╱
       
Shape: Diamond/triangle-ish
Size: Medium-small
Features: Sharp angles, sly eyes, fanged grin
Vibe: Troublemaker, sneaky
```

### Plompo 🟣 (Wide, Sleepy)
```
   ╭───────────╮
  ╱             ╲
 │   ◡     ◡     │
 │      ◡        │
  ╲             ╱
   ╰───────────╯
   
Shape: Wide oval, blob-like
Size: Large, low to ground
Features: Half-closed eyes, droopy
Vibe: Lazy, cuddly, slow
```

### Fizz 🔵 (Spiky, Electric)
```
      ⚡ ⚡
     ╱ ◉◉ ╲
    │ ~~~~ │
     ╲    ╱
      ╲  ╱
       ⚡
       
Shape: Jagged edges, sparks
Size: Small
Features: Wide eyes, zigzag outline
Vibe: Can't sit still, electric
```

### Ember 🟠 (Flame-shaped, Proud)
```
       🔥
      ╱╲
     ╱◕◕╲
    │ ── │
     ╲△╱
      
Shape: Flame silhouette
Size: Medium
Features: Fierce eyes, confident stance
Vibe: Dramatic, proud
```

### Chomper 🔴 (Big Mouth)
```
    ╭─────╮
   ╱ ◕   ◕ ╲
  │ ═══════ │
  │ ▀▀▀▀▀▀▀ │
   ╲       ╱
    ╰─────╯
    
Shape: Round with HUGE mouth
Size: Medium-large
Features: Tiny eyes, massive jaw
Vibe: Hungry, goofy
```

### Whisp ⚪ (Ethereal, Floaty)
```
     ~ ~ ~
    ╱     ╲
   (  ◯ ◯  )
    ╲     ╱
     ~ ~ ~
     
Shape: Wispy, semi-transparent
Size: Medium
Features: Empty circle eyes, wavy edges
Vibe: Ghostly, mysterious
```

### Luxe ✨ (Royal, Fabulous)
```
       ♕
     ╭───╮
    ╱ ◕ ◕ ╲
   │   ♡   │
    ╲     ╱
     ╰───╯
     ✨ ✨
     
Shape: Elegant oval with crown
Size: Medium
Features: Long lashes, pursed lips
Vibe: Diva, glamorous
```

---

# 2. ANIMATION STATES

## Universal States (All Pets)

### Idle (Default)
```
Trigger: No interaction
Duration: 2-3s loop
Animation:
- Gentle up/down breathing motion
- Scale: 1.0 → 1.02 → 1.0
- Occasional blink (every 3-6s random)
```

### Happy
```
Trigger: Mood > 70
Duration: 1s loop
Animation:
- Side-to-side wiggle
- Eyes curved upward (happy eyes)
- Small bounce
```

### Sad
```
Trigger: Mood < 30
Duration: 3s loop
Animation:
- Droop down (translateY + scaleY)
- Slow sway
- Downturned eyes
```

### Hungry
```
Trigger: Hunger < 30
Duration: 2s loop
Animation:
- Look left and right
- Tummy area pulses (rumble)
- Thought bubble with food appears
```

### Eating
```
Trigger: On feed
Duration: 0.8s
Animation:
- Open mouth wide
- Chomp chomp (3 cycles)
- Slight grow then shrink
- Eyes close briefly
```

### Loved Reaction
```
Trigger: Feed loved food
Duration: 1.2s
Animation:
- Jump up (translateY -20px)
- Hearts burst from pet
- Spin 360°
- Land with bounce
- Eyes become hearts briefly
```

### Liked Reaction
```
Trigger: Feed liked food
Duration: 0.8s
Animation:
- Small hop
- Happy face
- Single heart floats up
```

### Neutral Reaction
```
Trigger: Feed neutral food
Duration: 0.6s
Animation:
- Simple nod
- Munch animation
- Content expression
```

### Disliked Reaction
```
Trigger: Feed disliked food
Duration: 1s
Animation:
- Shake head side to side
- Tongue sticks out (if applicable)
- Sweat drops appear
- Slight green tint
```

### Sick
```
Trigger: Sick state (Classic mode)
Duration: 2s loop
Animation:
- Shiver/shake
- Green overlay tint
- Thermometer icon appears
- Droopy posture
```

### Sleeping
```
Trigger: Sleep mode
Duration: 4s loop
Animation:
- Eyes closed (lines)
- Slow breathing (bigger movement)
- "Zzz" floats up periodically
- Slight color dim
```

### Excited
```
Trigger: Level up, unlock
Duration: 1.5s
Animation:
- Rapid bouncing
- Sparkles around pet
- Grows slightly
- Happy spinning
```

### Stuffed (Full Stomach)
```
Trigger: Stomach 5/5
Duration: 1s then idle
Animation:
- Belly expands
- Satisfied burp (mouth opens)
- Pat belly motion
- Slightly rounder idle
```

### Pooping
```
Trigger: Poop event
Duration: 1.5s
Animation:
- Squat down
- Strain face (eyes squeeze)
- Pop/relief expression
- Stand back up
```

---

# 3. PET-SPECIFIC ANIMATIONS

## Munchlet 🟡

| State | Unique Behavior |
|-------|-----------------|
| Idle | Curious head tilts, looks around |
| Happy | Claps hands/arms, big smile |
| Loved | Does a little dance |
| Eating | Savors food, licks lips |

## Grib 🟢

| State | Unique Behavior |
|-------|-----------------|
| Idle | Shifty eyes, plotting expression |
| Happy | Mischievous laugh, rubbing hands |
| Loved | Evil cackle pose |
| Eating | Sneaky bite, looks around |

## Plompo 🟣

| State | Unique Behavior |
|-------|-----------------|
| Idle | Nearly falling asleep, catches self |
| Happy | Sleepy smile, slow wave |
| Loved | Brief energy, then yawn |
| Eating | Slow savoring bites, eyes closed |

## Fizz 🔵

| State | Unique Behavior |
|-------|-----------------|
| Idle | Vibrating, sparks flying, can't stop moving |
| Happy | Bouncing off walls animation |
| Loved | Explosion of energy, zaps everywhere |
| Eating | Speed eating, zoom zoom |

## Ember 🟠

| State | Unique Behavior |
|-------|-----------------|
| Idle | Dramatic poses, flames flicker |
| Happy | Triumphant roar pose |
| Loved | Fire burst, phoenix-like spread |
| Eating | Critical evaluation, then approval |

## Chomper 🔴

| State | Unique Behavior |
|-------|-----------------|
| Idle | Drooling, eyes tracking food |
| Happy | Mouth opens impossibly wide |
| Loved | Inhales food, doesn't chew |
| Eating | CHOMP CHOMP, food gone instantly |

## Whisp ⚪

| State | Unique Behavior |
|-------|-----------------|
| Idle | Phases in and out, floats |
| Happy | Glows brighter |
| Loved | Rainbow glow, ethereal sparkles |
| Eating | Food dissolves into whisp |

## Luxe ✨

| State | Unique Behavior |
|-------|-----------------|
| Idle | Admiring reflection, posing |
| Happy | Blows kiss, winks |
| Loved | Glamorous spin, sparkle burst |
| Eating | Dainty bites, proper etiquette |

---

# 4. WEIGHT VISUAL CHANGES

## Weight States

| Level | Weight | Visual Change |
|-------|--------|---------------|
| Normal | 0-30 | Standard shape |
| Chubby | 31-60 | 10% wider, cute round |
| Overweight | 61-80 | 20% wider, waddle animation |
| Obese | 81-100 | 30% wider, sweat drops, slow movement |

## Weight Animation Modifiers

```css
.pet-normal { transform: scale(1, 1); }
.pet-chubby { transform: scale(1.1, 1.05); }
.pet-overweight { transform: scale(1.2, 1.1); animation-duration: 1.5x; }
.pet-obese { transform: scale(1.3, 1.15); animation-duration: 2x; }
```

---

# 5. EXPRESSION SYSTEM

## Eye States

| Expression | Left Eye | Right Eye | When |
|------------|----------|-----------|------|
| Normal | ◕ | ◕ | Default |
| Happy | ◠ | ◠ | Mood > 70 |
| Sad | ◡ | ◡ | Mood < 30 |
| Sleepy | ─ | ─ | Energy low |
| Closed | ● | ● | Eating, sleeping |
| Hearts | ♥ | ♥ | Loved food |
| Surprised | ◎ | ◎ | Level up, unlock |
| Dizzy | @ | @ | Sick |
| Star | ★ | ★ | Excited |

## Mouth States

| Expression | Shape | When |
|------------|-------|------|
| Neutral | ─ | Default |
| Smile | ◡ | Happy |
| Frown | ◠ | Sad |
| Open | O | Eating, surprised |
| Chomping | ▼△▼△ | Eating animation |
| Tongue out | :P | Disliked food |
| Sleeping | ～ | Asleep |

---

# 6. CSS ANIMATION EXAMPLES

## Idle Bounce
```css
@keyframes idle-bounce {
  0%, 100% { transform: translateY(0) scale(1, 1); }
  50% { transform: translateY(-5px) scale(1.02, 0.98); }
}

.pet-idle {
  animation: idle-bounce 2s ease-in-out infinite;
}
```

## Happy Wiggle
```css
@keyframes happy-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.pet-happy {
  animation: happy-wiggle 0.5s ease-in-out infinite;
}
```

## Sad Droop
```css
@keyframes sad-droop {
  0%, 100% { transform: translateY(0) scaleY(1); }
  50% { transform: translateY(5px) scaleY(0.95); }
}

.pet-sad {
  animation: sad-droop 3s ease-in-out infinite;
  filter: saturate(0.7);
}
```

## Eating Chomp
```css
@keyframes eating-chomp {
  0%, 100% { transform: scale(1, 1); }
  25% { transform: scale(1.1, 0.9); }
  50% { transform: scale(0.9, 1.1); }
  75% { transform: scale(1.05, 0.95); }
}

.pet-eating {
  animation: eating-chomp 0.2s ease-in-out 3;
}
```

## Loved Jump
```css
@keyframes loved-jump {
  0% { transform: translateY(0) rotate(0deg); }
  30% { transform: translateY(-30px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(360deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.pet-loved {
  animation: loved-jump 1s ease-out;
}
```

## Fizz Vibrate
```css
@keyframes fizz-vibrate {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px) rotate(-1deg); }
  75% { transform: translateX(2px) rotate(1deg); }
}

.pet-fizz .pet-idle {
  animation: fizz-vibrate 0.1s ease-in-out infinite;
}
```

## Sick Shiver
```css
@keyframes sick-shiver {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

.pet-sick {
  animation: sick-shiver 0.2s ease-in-out infinite;
  filter: hue-rotate(60deg) saturate(0.5);
}
```

## Whisp Float
```css
@keyframes whisp-float {
  0%, 100% { 
    transform: translateY(0); 
    opacity: 0.9;
  }
  50% { 
    transform: translateY(-10px); 
    opacity: 0.6;
  }
}

.pet-whisp .pet-idle {
  animation: whisp-float 3s ease-in-out infinite;
}
```

---

# 7. SVG STRUCTURE

## Base Pet Template
```svg
<svg viewBox="0 0 100 100" class="pet pet-munchlet">
  <!-- Body -->
  <ellipse class="body" cx="50" cy="55" rx="35" ry="30" fill="#fbbf24"/>
  
  <!-- Eyes -->
  <g class="eyes">
    <circle class="eye-left" cx="35" cy="45" r="8" fill="white"/>
    <circle class="pupil-left" cx="37" cy="45" r="4" fill="black"/>
    <circle class="eye-right" cx="65" cy="45" r="8" fill="white"/>
    <circle class="pupil-right" cx="67" cy="45" r="4" fill="black"/>
  </g>
  
  <!-- Mouth -->
  <path class="mouth" d="M 40 65 Q 50 75 60 65" stroke="black" fill="none" stroke-width="2"/>
  
  <!-- Blush (optional) -->
  <ellipse class="blush-left" cx="28" cy="55" rx="6" ry="4" fill="#fca5a5" opacity="0.5"/>
  <ellipse class="blush-right" cx="72" cy="55" rx="6" ry="4" fill="#fca5a5" opacity="0.5"/>
</svg>
```

## Animating SVG Parts
```css
/* Blink animation */
@keyframes blink {
  0%, 45%, 55%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
}

.pet .eyes {
  transform-origin: center;
  animation: blink 4s ease-in-out infinite;
}

/* Mouth expressions */
.pet-happy .mouth {
  d: path("M 35 65 Q 50 80 65 65"); /* Bigger smile */
}

.pet-sad .mouth {
  d: path("M 35 70 Q 50 60 65 70"); /* Frown */
}
```

---

# 8. TICKETS

| ID | Task | Priority |
|----|------|----------|
| WEB-063 | Create SVG pet shapes for all 8 pets | P0 |
| WEB-064 | Implement idle animations (bounce, breathe) | P1 |
| WEB-065 | Implement mood-based animations (happy, sad, hungry) | P1 |
| WEB-066 | Implement feeding reaction animations | P1 |
| WEB-067 | Implement pet-specific personality animations | P2 |
| WEB-068 | Implement expression system (eyes, mouth states) | P1 |
| WEB-069 | Implement weight visual changes | P2 |
| WEB-070 | Implement sick/sleep/special state animations | P2 |
| WEB-071 | Add blink and micro-animations | P2 |
| WEB-072 | Create animation timing and easing system | P1 |

---

# 9. IMPLEMENTATION PRIORITY

## Phase 1: Core Visuals (P0)
1. WEB-063: SVG pet shapes

## Phase 2: Essential Animations (P1)
2. WEB-064: Idle animations
3. WEB-065: Mood animations
4. WEB-066: Feeding reactions
5. WEB-068: Expression system
6. WEB-072: Timing system

## Phase 3: Polish (P2)
7. WEB-067: Personality animations
8. WEB-069: Weight visuals
9. WEB-070: Special states
10. WEB-071: Micro-animations

---

# 10. TESTING CHECKLIST

| Test | Expected |
|------|----------|
| Pet idle | Gentle breathing/bounce |
| Pet happy (mood >70) | Wiggle animation |
| Pet sad (mood <30) | Droop animation |
| Pet hungry | Looking around, tummy rumble |
| Feed neutral | Nod, munch |
| Feed liked | Small hop, heart |
| Feed loved | Jump, spin, hearts burst |
| Feed disliked | Head shake, tongue out |
| Pet sick | Shiver, green tint |
| Pet sleeping | Zzz, slow breathing |
| Level up | Excited bounce, sparkles |
| Pet chubby | Slightly rounder |
| Pet obese | Very round, slow |
| Fizz idle | Constant vibration |
| Whisp idle | Floating, phasing |
| Luxe idle | Posing, admiring |

---

# 11. WHAT TO WAIT FOR UNITY

| Feature | Why Wait |
|---------|----------|
| Skeletal animation | Spine/DragonBones better in Unity |
| Physics-based motion | Secondary motion, jiggle physics |
| Blend trees | Smooth state transitions |
| Complex particle FX | Unity particle system |
| 3D elements | If ever needed |

---

*END OF PET ANIMATION DESIGN*
