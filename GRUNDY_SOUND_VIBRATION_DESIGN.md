# GRUNDY — SOUND & VIBRATION DESIGN

**Version:** 1.0  
**Date:** December 2024  
**Status:** Web Prototype Implementation  
**Platforms:** Web (now), Unity (later)

---

## OVERVIEW

Sound and vibration provide crucial feedback that makes interactions feel satisfying. This document defines all audio and haptic events for Grundy.

---

# 1. SOUND CATEGORIES

## 1.1 UI Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| Button tap | `ui_tap` | Soft, rounded click | 50ms |
| Button disabled | `ui_blocked` | Muted thud | 80ms |
| Menu open | `ui_menu_open` | Gentle whoosh up | 200ms |
| Menu close | `ui_menu_close` | Gentle whoosh down | 150ms |
| Modal appear | `ui_modal` | Soft pop | 100ms |
| Toggle on | `ui_toggle_on` | High click | 50ms |
| Toggle off | `ui_toggle_off` | Low click | 50ms |
| Screen transition | `ui_transition` | Soft swish | 250ms |

## 1.2 Feeding Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| Feed (neutral) | `feed_basic` | Simple "nom" | 300ms |
| Feed (liked) | `feed_liked` | Happy "nom nom" | 400ms |
| Feed (loved) | `feed_loved` | Excited "NOM!" + sparkle | 500ms |
| Feed (disliked) | `feed_disliked` | Sad "bleh" + sputter | 400ms |
| Stomach full | `feed_full` | Burp + satisfied sigh | 500ms |
| Snack eaten | `feed_snack` | Crunchy/sweet bite | 300ms |
| Overfeed warning | `feed_warning` | Gentle alarm tone | 400ms |

## 1.3 Reward Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| XP gain | `reward_xp` | Soft ascending chime | 300ms |
| Coin gain | `reward_coin` | Coin clink | 200ms |
| Coin gain (large) | `reward_coin_multi` | Multiple coin clinks | 500ms |
| Gem gain | `reward_gem` | Crystal shimmer | 400ms |
| Level up | `reward_levelup` | Triumphant jingle | 1500ms |
| Pet unlock | `reward_unlock` | Magical reveal fanfare | 2000ms |
| Achievement | `reward_achievement` | Badge stamp + chime | 800ms |
| Daily reward claim | `reward_daily` | Gift unwrap + sparkle | 600ms |

## 1.4 Pet Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| Pet happy idle | `pet_happy` | Content humming/purr | 800ms |
| Pet sad idle | `pet_sad` | Quiet whimper | 600ms |
| Pet hungry | `pet_hungry` | Tummy rumble | 500ms |
| Pet sick | `pet_sick` | Weak cough/sniff | 600ms |
| Pet poop | `pet_poop` | Comedic plop | 300ms |
| Pet clean | `pet_clean` | Sparkle sweep | 400ms |
| Pet sleep | `pet_sleep` | Soft snore/zzz | 1000ms |
| Pet wake | `pet_wake` | Yawn stretch | 600ms |
| Pet death | `pet_death` | Sad music sting | 3000ms |

## 1.5 Mini-Game Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| Game start | `game_start` | Ready set go jingle | 800ms |
| Catch good | `game_catch` | Satisfying pop | 150ms |
| Catch favorite | `game_catch_fav` | Pop + sparkle | 250ms |
| Miss food | `game_miss` | Soft buzz/thud | 200ms |
| Catch bad | `game_bad` | Error buzz | 200ms |
| Combo 3x | `game_combo3` | Rising chime | 300ms |
| Combo 5x | `game_combo5` | Higher rising chime | 400ms |
| Combo 10x | `game_combo10` | Triumphant chord | 500ms |
| Timer warning | `game_timer` | Tick tock (last 10s) | 500ms |
| Game over | `game_over` | End whistle | 400ms |
| Bronze tier | `game_bronze` | Modest fanfare | 800ms |
| Silver tier | `game_silver` | Nice fanfare | 1000ms |
| Gold tier | `game_gold` | Great fanfare | 1200ms |
| Rainbow tier | `game_rainbow` | Epic fanfare + sparkles | 2000ms |

## 1.6 Event Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| Event start | `event_start` | Announcement jingle | 1000ms |
| Streak continue | `event_streak` | Chain link sound | 300ms |
| Streak break | `event_streak_break` | Sad chain break | 400ms |
| Birthday | `event_birthday` | Party horn + confetti | 1500ms |
| Holiday | `event_holiday` | Themed jingle | 1200ms |

## 1.7 Warning/Error Sounds

| Trigger | Sound Name | Description | Duration |
|---------|------------|-------------|----------|
| Not enough coins | `error_coins` | Empty wallet thud | 300ms |
| Not enough gems | `error_gems` | Crystal crack | 300ms |
| Not enough energy | `error_energy` | Low battery beep | 300ms |
| Attention needed | `warn_attention` | Gentle ping | 400ms |
| Urgent attention | `warn_urgent` | Louder ping x2 | 600ms |
| Critical (Classic) | `warn_critical` | Alarm tone | 800ms |

---

# 2. BACKGROUND MUSIC

## 2.1 Track List

| Track | Screen/Context | BPM | Duration | Loop |
|-------|----------------|-----|----------|------|
| `bgm_main` | Main gameplay | 90 | 120s | Yes |
| `bgm_shop` | Shop screen | 100 | 60s | Yes |
| `bgm_minigame` | Mini-games | 130 | 90s | Yes |
| `bgm_sleep` | Sleep mode | 60 | 180s | Yes |
| `bgm_event` | Special events | 110 | 90s | Yes |
| `bgm_sad` | Low mood/sick | 70 | 60s | Yes |
| `bgm_death` | Death screen | 50 | 30s | No |

## 2.2 Music Style Guide

| Attribute | Direction |
|-----------|-----------|
| Genre | Casual/cozy, chiptune-inspired but soft |
| Instruments | Soft synths, music box, gentle piano, light percussion |
| Mood | Warm, playful, not intrusive |
| Volume | Background level, doesn't compete with SFX |

## 2.3 Adaptive Music (Future - Unity)

| State | Music Adaptation |
|-------|------------------|
| Pet happy | Full instrumentation |
| Pet neutral | Standard mix |
| Pet sad/hungry | Minor key filter, reduced instruments |
| Pet sick | Slow, muted, worried tone |
| Pet sleeping | Lullaby version, minimal |

---

# 3. VIBRATION PATTERNS

## 3.1 Web Support

| Platform | Support | API |
|----------|---------|-----|
| Android Chrome | ✅ Full | `navigator.vibrate()` |
| Android Firefox | ✅ Full | `navigator.vibrate()` |
| iOS Safari | ❌ None | Not supported |
| iOS Chrome | ❌ None | Uses Safari engine |
| Desktop | ❌ None | No vibration motor |

## 3.2 Vibration Patterns

| Trigger | Pattern (ms) | Feel |
|---------|--------------|------|
| Button tap | `[10]` | Micro tick |
| Feed success | `[50]` | Soft thump |
| Feed loved | `[30, 30, 50]` | Happy double |
| Feed disliked | `[80]` | Dull thud |
| Level up | `[100, 50, 100, 50, 200]` | Celebration |
| Pet unlock | `[200, 100, 200]` | Fanfare |
| Coin gain | `[20]` | Light tap |
| Gem gain | `[30, 30]` | Sparkle double |
| Poop appear | `[40]` | Plop |
| Poop clean | `[20, 20, 20]` | Sweep |
| Error/blocked | `[50, 50, 50]` | Triple warning |
| Mini-game catch | `[15]` | Quick tap |
| Mini-game miss | `[60]` | Thud |
| Combo increase | `[20, 30]` | Rising |
| Game win | `[100, 50, 100, 50, 150]` | Victory |

## 3.3 Vibration Code Example

```typescript
// Utility function
function vibrate(pattern: number | number[]): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// Usage examples
vibrate(10);                    // Button tap
vibrate([50]);                  // Feed
vibrate([100, 50, 100, 50, 200]); // Level up
vibrate([50, 50, 50]);          // Error
```

---

# 4. AUDIO SETTINGS

## 4.1 User Controls

| Setting | Options | Default |
|---------|---------|---------|
| Master Volume | 0-100% | 80% |
| Music Volume | 0-100% | 60% |
| SFX Volume | 0-100% | 100% |
| Vibration | On/Off | On |
| Mute All | On/Off | Off |

## 4.2 Settings UI

```
┌─────────────────────────────────────────┐
│  🔊 SOUND SETTINGS                      │
├─────────────────────────────────────────┤
│                                         │
│  Master Volume                          │
│  [━━━━━━━━━━━━━━━━●━━━] 80%            │
│                                         │
│  Music                                  │
│  [━━━━━━━━━━━━●━━━━━━━] 60%            │
│                                         │
│  Sound Effects                          │
│  [━━━━━━━━━━━━━━━━━━━●] 100%           │
│                                         │
│  Vibration              [ON] / OFF      │
│                                         │
│  Mute All               ON / [OFF]      │
│                                         │
└─────────────────────────────────────────┘
```

---

# 5. IMPLEMENTATION

## 5.1 Web Prototype (Current)

### Audio Manager

```typescript
class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private music: HTMLAudioElement | null = null;
  
  private masterVolume = 0.8;
  private musicVolume = 0.6;
  private sfxVolume = 1.0;
  private muted = false;
  
  // Preload all sounds
  preload(soundList: string[]): void {
    soundList.forEach(name => {
      const audio = new Audio(`/sounds/${name}.mp3`);
      audio.preload = 'auto';
      this.sounds.set(name, audio);
    });
  }
  
  // Play sound effect
  play(name: string): void {
    if (this.muted) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      sound.volume = this.masterVolume * this.sfxVolume;
      sound.currentTime = 0;
      sound.play().catch(() => {}); // Ignore autoplay errors
    }
  }
  
  // Play background music
  playMusic(name: string): void {
    if (this.music) {
      this.music.pause();
    }
    
    this.music = new Audio(`/music/${name}.mp3`);
    this.music.loop = true;
    this.music.volume = this.masterVolume * this.musicVolume;
    this.music.play().catch(() => {});
  }
  
  // Stop music
  stopMusic(): void {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
  }
  
  // Update volumes
  setMasterVolume(v: number): void {
    this.masterVolume = v;
    this.updateMusicVolume();
  }
  
  setMusicVolume(v: number): void {
    this.musicVolume = v;
    this.updateMusicVolume();
  }
  
  setSfxVolume(v: number): void {
    this.sfxVolume = v;
  }
  
  private updateMusicVolume(): void {
    if (this.music) {
      this.music.volume = this.masterVolume * this.musicVolume;
    }
  }
  
  // Mute toggle
  setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted && this.music) {
      this.music.volume = 0;
    } else if (this.music) {
      this.updateMusicVolume();
    }
  }
}

// Singleton
export const audio = new AudioManager();
```

### Vibration Manager

```typescript
class VibrationManager {
  private enabled = true;
  
  // Check support
  isSupported(): boolean {
    return 'vibrate' in navigator;
  }
  
  // Toggle
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  
  // Vibrate with pattern
  vibrate(pattern: number | number[]): void {
    if (this.enabled && this.isSupported()) {
      navigator.vibrate(pattern);
    }
  }
  
  // Preset patterns
  tap(): void { this.vibrate(10); }
  feed(): void { this.vibrate(50); }
  feedLoved(): void { this.vibrate([30, 30, 50]); }
  feedDisliked(): void { this.vibrate(80); }
  levelUp(): void { this.vibrate([100, 50, 100, 50, 200]); }
  unlock(): void { this.vibrate([200, 100, 200]); }
  coin(): void { this.vibrate(20); }
  gem(): void { this.vibrate([30, 30]); }
  error(): void { this.vibrate([50, 50, 50]); }
  catch(): void { this.vibrate(15); }
  miss(): void { this.vibrate(60); }
  win(): void { this.vibrate([100, 50, 100, 50, 150]); }
}

// Singleton
export const vibration = new VibrationManager();
```

### iOS Audio Unlock

iOS requires user interaction before audio can play. Add this:

```typescript
// Call once on first user tap
function unlockAudio(): void {
  const silentAudio = new Audio();
  silentAudio.play().then(() => {
    silentAudio.pause();
  }).catch(() => {});
  
  // Remove listener after first interaction
  document.removeEventListener('touchstart', unlockAudio);
  document.removeEventListener('click', unlockAudio);
}

document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('click', unlockAudio, { once: true });
```

## 5.2 Sound File Specs

| Attribute | Requirement |
|-----------|-------------|
| Format | MP3 (web), OGG backup |
| Sample rate | 44.1 kHz |
| Bit rate | 128 kbps (SFX), 192 kbps (music) |
| Channels | Stereo (music), Mono (SFX) |
| Loudness | Normalized to -14 LUFS |

## 5.3 Free Sound Sources

| Source | URL | License |
|--------|-----|---------|
| Freesound | freesound.org | CC0/CC-BY |
| Zapsplat | zapsplat.com | Free with attribution |
| Mixkit | mixkit.co | Free |
| OpenGameArt | opengameart.org | Various |
| BFXR (generator) | bfxr.net | Generate your own |

---

# 6. TICKETS

| ID | Task | Priority |
|----|------|----------|
| WEB-052 | Create AudioManager with preloading | P1 |
| WEB-053 | Create VibrationManager | P1 |
| WEB-054 | Add audio settings to Settings screen | P1 |
| WEB-055 | Implement feeding sounds | P1 |
| WEB-056 | Implement reward sounds (XP, coins, gems, level up) | P1 |
| WEB-057 | Implement UI sounds (tap, menu, modal) | P2 |
| WEB-058 | Implement pet sounds (happy, sad, hungry, sick) | P2 |
| WEB-059 | Implement mini-game sounds | P2 |
| WEB-060 | Add background music with screen-based switching | P2 |
| WEB-061 | Implement vibration patterns | P1 |
| WEB-062 | Add iOS audio unlock workaround | P1 |

---

# 7. TESTING CHECKLIST

## Sound Tests

| Test | Expected |
|------|----------|
| Tap any button | Click sound plays |
| Feed pet (neutral) | "Nom" sound |
| Feed pet (loved) | Happy "NOM!" + sparkle |
| Feed pet (disliked) | "Bleh" sound |
| Gain coins | Coin clink |
| Gain gems | Crystal chime |
| Level up | Triumphant jingle |
| Unlock pet | Magical fanfare |
| Open menu | Whoosh up |
| Close menu | Whoosh down |
| Mini-game catch | Pop sound |
| Mini-game miss | Thud sound |
| Poop appears | Plop sound |
| Clean poop | Sparkle sweep |
| Mute toggle | All sounds stop |
| Volume slider | Sounds get louder/quieter |

## Vibration Tests (Android only)

| Test | Expected |
|------|----------|
| Tap button | Micro pulse |
| Feed pet | Single pulse |
| Feed loved | Double pulse |
| Level up | Long celebration pattern |
| Error | Triple warning pulse |
| Vibration off | No vibration on any action |

---

# 8. SUMMARY

## Implement Now (Web)

✅ Sound effects for all interactions  
✅ Background music (basic)  
✅ Vibration patterns (Android)  
✅ Audio settings UI  
✅ iOS audio unlock workaround  

## Wait for Unity

⏳ iOS Haptic Engine  
⏳ Advanced audio mixing  
⏳ Adaptive music layers  
⏳ 3D spatial audio  
⏳ Audio compression/optimization  

---

*END OF SOUND & VIBRATION DESIGN*
