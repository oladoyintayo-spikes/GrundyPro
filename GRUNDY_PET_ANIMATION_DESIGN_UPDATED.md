# GRUNDY — PET ANIMATION DESIGN v2.1

**Version:** 2.1  
**Date:** December 2024  
**Status:** Web Prototype Implementation  
**Approach:** SVG Shapes + CSS Animations

---

## ⚠️ CRITICAL: BEHAVIOR-BASED INDICATORS

**From GRUNDY_MASTER_DECISIONS.md #2:**

> Stats are HIDDEN. Only Bond is visible. Pet SHOWS you what they need through BEHAVIOR.

This means animations are not just decorative — they are the primary way players understand their pet's state. Every animation must communicate something.

---

## OVERVIEW

Each pet has a unique silhouette and personality expressed through animations. Animations serve as the UI for hidden stats.

---

# 1. BEHAVIOR-BASED ANIMATION SYSTEM

## Design Philosophy

| Principle | Implementation |
|-----------|----------------|
| **Stats are Hidden** | No bars for hunger, mood, energy |
| **Behavior = Communication** | Pet shows needs through actions |
| **Bond is Visible** | Hearts (♥♥♥♡♡) only visible stat |
| **Learn by Watching** | Players discover pet state via observation |

## Fullness State Behaviors (Replaces Hunger Bar)

| Internal State | Fullness Range | Pet Behavior | Animation |
|----------------|----------------|--------------|-----------|
| HUNGRY | 0-20 | Begs for food, stomach growls | `hungry-beg` |
| PECKISH | 21-40 | Glances at food occasionally | `peckish-glance` |
| CONTENT | 41-70 | Happy idle, ignores food | `content-idle` |
| SATISFIED | 71-90 | Shakes head if offered food | `satisfied-refuse` |
| STUFFED | 91-100 | Turns away, blocks feeding | `stuffed-turnaway` |

## Mood State Behaviors (Replaces Mood Bar)

| Internal State | Mood Range | Pet Behavior | Animation |
|----------------|------------|--------------|-----------|
| Miserable | 0-20 | Crying, droopy | `mood-miserable` |
| Unhappy | 21-40 | Frowning, slow | `mood-unhappy` |
| Content | 41-60 | Neutral, calm | `mood-content` |
| Happy | 61-80 | Bouncing, bright eyes | `mood-happy` |
| Joyful | 81-100 | Dancing, sparkles | `mood-joyful` |

---

# 2. PET SILHOUETTES

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
Origin: "Found on a sunny windowsill, humming."
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
Origin: "Appeared in a shadow behind the cupboard, grinning."
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
Origin: "Discovered sleeping in a cloud that drifted too low."
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
Origin: "Sparked into existence during a thunderstorm."
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
Origin: "Emerged from the last ember of a dying fire."
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
Origin: "First spotted near the kitchen, following the smell."
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
Origin: "Drifted in through a crack in a dream."
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
Origin: "Arrived already posing. Certain they deserve better."
```

---

# 3. FULLNESS BEHAVIOR ANIMATIONS

## Hungry State (0-20) — "I NEED food!"
```css
@keyframes hungry-beg {
  0%, 100% { 
    transform: translateY(0) scale(1); 
  }
  25% { 
    transform: translateY(-5px) scale(1.02); 
  }
  50% { 
    transform: translateY(0) scale(0.98); 
  }
}

@keyframes stomach-growl {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.05); }
}
```

**Visual cues:**
- Pet looks at food area repeatedly
- Thought bubble: 🍎❓
- Stomach area pulses (growl effect)
- Big pleading eyes

## Peckish State (21-40) — "Food would be nice"
```css
@keyframes peckish-glance {
  0%, 80%, 100% { 
    transform: rotate(0deg); 
  }
  85%, 95% { 
    transform: rotate(-15deg); /* Glance at food */
  }
}
```

**Visual cues:**
- Occasional glance toward food
- Normal idle otherwise
- No thought bubble

## Content State (41-70) — "I'm fine"
```css
@keyframes content-idle {
  0%, 100% { 
    transform: translateY(0) scale(1); 
  }
  50% { 
    transform: translateY(-5px) scale(1.02); 
  }
}
```

**Visual cues:**
- Standard happy idle
- Ignores food offers
- Relaxed posture

## Satisfied State (71-90) — "No thanks"
```css
@keyframes satisfied-refuse {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}
```

**Visual cues:**
- Head shake if player tries to feed
- Pats belly contentedly
- Thought bubble: 😌

## Stuffed State (91-100) — "Cannot eat"
```css
@keyframes stuffed-turnaway {
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(-30deg) scale(1); }
}
```

**Visual cues:**
- Turns away from food
- Blocks feeding entirely
- Thought bubble: 🙅
- Slightly rounder shape

---

# 4. MOOD BEHAVIOR ANIMATIONS

## Miserable (0-20)
```css
@keyframes mood-miserable {
  0%, 100% { 
    transform: translateY(0) scaleY(0.9); 
    filter: saturate(0.3);
  }
  50% { 
    transform: translateY(3px) scaleY(0.85); 
  }
}
```
- Tears animation (occasional)
- Droopy posture
- Desaturated colors
- Very slow movement

## Unhappy (21-40)
```css
@keyframes mood-unhappy {
  0%, 100% { transform: translateY(0); filter: saturate(0.6); }
  50% { transform: translateY(2px); }
}
```
- Slight frown
- Slower than normal
- Muted colors

## Content (41-60)
```css
@keyframes mood-content {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.01); }
}
```
- Neutral expression
- Calm idle
- Normal colors

## Happy (61-80)
```css
@keyframes mood-happy {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(-3deg); }
  75% { transform: translateY(-5px) rotate(3deg); }
}
```
- Bouncing
- Bright eyes (larger)
- Vibrant colors

## Joyful (81-100)
```css
@keyframes mood-joyful {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(-5deg) scale(1.05); }
  50% { transform: translateY(0) rotate(0deg) scale(1); }
  75% { transform: translateY(-10px) rotate(5deg) scale(1.05); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
```
- Dancing/wiggling
- Sparkles around pet
- Extra bright colors
- May trigger sparkle particles

---

# 5. FEEDING REACTION ANIMATIONS

## Loved Reaction (Affinity: 2.0×)
```css
@keyframes reaction-loved {
  0% { transform: translateY(0) rotate(0deg); }
  20% { transform: translateY(-30px) rotate(0deg); }
  40% { transform: translateY(-30px) rotate(360deg); }
  100% { transform: translateY(0) rotate(360deg); }
}
```
- Jump up high
- Spin 360°
- Hearts burst out (💕)
- Eyes become hearts briefly
- Golden sparkles

## Liked Reaction (Affinity: 1.5×)
```css
@keyframes reaction-liked {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.1); }
}
```
- Small hop
- Happy expression
- Single heart floats up

## Neutral Reaction (Affinity: 1.0×)
```css
@keyframes reaction-neutral {
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}
```
- Simple nod
- Munch animation
- No particles

## Disliked Reaction (Affinity: 0.5×)
```css
@keyframes reaction-disliked {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(15deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
}
```
- Head shake
- Tongue sticks out
- Sweat drops (💦)
- Slight green tint
- Grey puff effect

---

# 6. DAILY MOMENT INDICATORS

## Morning (7-10 AM)
```css
.daily-moment-morning {
  background: linear-gradient(135deg, #fcd34d, #f59e0b);
}
```
- 🌅 icon in corner
- Warm golden glow around pet
- "+50% Bond" indicator on feed

## Afternoon (12-2 PM)
```css
.daily-moment-afternoon {
  background: linear-gradient(135deg, #fbbf24, #f97316);
}
```
- ☀️ icon in corner
- Bright highlight
- "+25% XP" indicator on feed

## Evening (6-9 PM)
```css
.daily-moment-evening {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
}
```
- 🌙 icon in corner
- Cozy purple glow
- "+50% Bond" indicator on feed

---

# 7. RUNAWAY WARNING ANIMATIONS (Classic Mode)

## Stage 1: Unhappy
- Pet droops more than normal
- Occasional worried glance at player
- Subtle grey tint

## Stage 2: Sick
- Shiver animation
- Green tint overlay
- Thermometer appears
- Slower movement

## Stage 3: Warning
- Pet looks toward "exit" (screen edge)
- Thought bubble: 💭🚪
- Pacing animation
- Warning sound

## Stage 4: Runaway
```css
@keyframes pet-runaway {
  0% { transform: translateX(0) scale(1); opacity: 1; }
  50% { transform: translateX(100px) scale(0.8); opacity: 0.5; }
  100% { transform: translateX(200px) scale(0.5); opacity: 0; }
}
```
- Pet runs off screen
- Sad dust cloud left behind
- Screen fades to empty room

---

# 8. WEIGHT VISUAL CHANGES

## Weight States (Classic Mode)

| Weight | Visual Change | Animation Speed |
|--------|---------------|-----------------|
| Normal (0-30) | Standard shape | Normal |
| Chubby (31-60) | 10% wider | Normal |
| Overweight (61-80) | 20% wider, waddle | 1.25× slower |
| Obese (81-100) | 30% wider, sweat | 1.5× slower |

```css
.pet-normal { transform: scale(1, 1); }
.pet-chubby { transform: scale(1.1, 1.05); }
.pet-overweight { 
  transform: scale(1.2, 1.1); 
  animation-duration: calc(var(--base-duration) * 1.25);
}
.pet-obese { 
  transform: scale(1.3, 1.15); 
  animation-duration: calc(var(--base-duration) * 1.5);
}
```

---

# 9. PET-SPECIFIC PERSONALITY ANIMATIONS

## Munchlet 🟡
| State | Unique Behavior |
|-------|-----------------|
| Idle | Curious head tilts, looks around |
| Happy | Claps, big smile |
| Hungry | Super cute begging, irresistible eyes |

## Grib 🟢
| State | Unique Behavior |
|-------|-----------------|
| Idle | Shifty eyes, plotting |
| Happy | Mischievous cackle |
| Hungry | Sneaky approach to food |

## Plompo 🟣
| State | Unique Behavior |
|-------|-----------------|
| Idle | Nearly falling asleep constantly |
| Happy | Sleepy smile, slow wave |
| Hungry | Lazy reach for food |

## Fizz 🔵
| State | Unique Behavior |
|-------|-----------------|
| Idle | CONSTANT vibration, sparks |
| Happy | Bouncing off walls |
| Hungry | Frantic vibrating |

## Ember 🟠
| State | Unique Behavior |
|-------|-----------------|
| Idle | Dramatic poses, flames flicker |
| Happy | Triumphant roar pose |
| Hungry | Demanding, foot tapping |

## Chomper 🔴
| State | Unique Behavior |
|-------|-----------------|
| Idle | Drooling, eyes tracking food |
| Happy | Mouth opens impossibly wide |
| Hungry | Aggressive drooling |

## Whisp ⚪
| State | Unique Behavior |
|-------|-----------------|
| Idle | Phases in/out, floats |
| Happy | Glows brighter |
| Hungry | Fades slightly (sad) |

## Luxe ✨
| State | Unique Behavior |
|-------|-----------------|
| Idle | Admiring reflection, posing |
| Happy | Blows kiss, winks |
| Hungry | Dramatic sigh, impatient |

---

# 10. IMPLEMENTATION TICKETS

| ID | Task | Priority |
|----|------|----------|
| WEB-063 | Create SVG pet shapes for all 8 pets | P0 |
| WEB-064 | Implement fullness behavior animations | P0 |
| WEB-065 | Implement mood behavior animations | P0 |
| WEB-066 | Implement feeding reaction animations | P1 |
| WEB-067 | Implement pet-specific personality animations | P2 |
| WEB-068 | Implement Daily Moment visual indicators | P1 |
| WEB-069 | Implement weight visual changes | P2 |
| WEB-070 | Implement runaway warning animations (Classic) | P1 |
| WEB-071 | Add micro-animations (blink, breathe) | P2 |
| WEB-072 | Create animation timing system | P1 |

---

# 11. TESTING CHECKLIST

| Test | Expected Result |
|------|-----------------|
| Fullness 0-20 | Pet begs, stomach growls |
| Fullness 21-40 | Pet glances at food |
| Fullness 41-70 | Normal idle |
| Fullness 71-90 | Head shake on feed attempt |
| Fullness 91-100 | Turns away, blocks feeding |
| Mood < 30 | Droopy, slow, desaturated |
| Mood > 70 | Bouncy, bright eyes |
| Feed loved food | Jump, spin, hearts |
| Feed disliked food | Head shake, tongue out |
| Morning (7-10) | 🌅 indicator visible |
| Classic Stage 3 | Pet looks at exit |
| Classic Stage 4 | Pet runs away animation |
| Fizz idle | Constant vibration |
| Plompo idle | Nearly falling asleep |

---

*END OF PET ANIMATION DESIGN v2.1*

**Key change:** Animations now serve as the UI for hidden stats. Players learn pet needs through observation, not stat bars.
