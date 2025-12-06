# GRUNDY v2.2 — Gap Fix Document

## REMAINING GAPS TO ADDRESS

---

## GAP 1: Data Fidelity (WEB-027/028)

### Missing Foods — Add These

```typescript
// Add to FOODS object
const ADDITIONAL_FOODS = {
  milk: {
    id: 'milk',
    name: 'Milk',
    emoji: '🥛',
    cost: 8,
    rarity: 'common',
    xp: 12,
    fullness: 18,
    happiness: 8,
    category: 'drink',
    description: 'Fresh and creamy'
  },
  
  salad: {
    id: 'salad',
    name: 'Salad',
    emoji: '🥗',
    cost: 8,
    rarity: 'common',
    xp: 12,
    fullness: 20,
    happiness: 3,
    category: 'veggie',
    description: 'Healthy greens'
  },
  
  dream_treat: {
    id: 'dream_treat',
    name: 'Dream Treat',
    emoji: '🌙',
    cost: 75,
    rarity: 'rare',
    xp: 60,
    fullness: 25,
    happiness: 45,
    category: 'magical',
    description: 'Tastes like sweet dreams'
  },
  
  energy_drink: {
    id: 'energy_drink',
    name: 'Energy Drink',
    emoji: '⚡',
    cost: 25,
    rarity: 'uncommon',
    xp: 20,
    fullness: 5,
    happiness: 30,
    category: 'drink',
    description: 'MAXIMUM ENERGY!'
  },
  
  mystery_meat: {
    id: 'mystery_meat',
    name: 'Mystery Meat',
    emoji: '🍖',
    cost: 30,
    rarity: 'uncommon',
    xp: 35,
    fullness: 35,
    happiness: 15,
    category: 'meat',
    description: 'Don\'t ask what it is'
  }
};
```

### Pet Origin Strings (Full Bible Versions)

```typescript
const PET_ORIGINS = {
  munchlet: {
    short: 'Found on a sunny windowsill, humming.',
    full: 'Found on a sunny windowsill, humming softly to itself. It was waiting for someone to share warmth with. Now it\'s found you.',
    traits: 'Loves sweet things. Hates being alone.'
  },
  grib: {
    short: 'Appeared in a shadow behind the cupboard, grinning.',
    full: 'Appeared in a shadow behind the cupboard one day, already grinning. It won\'t tell you how it got there. It won\'t tell you anything.',
    traits: 'Loves chaos. Hates boredom.'
  },
  plompo: {
    short: 'Discovered sleeping in a cloud that drifted too low.',
    full: 'Discovered sleeping in a cloud that drifted too low and bumped into your window. It woke up, yawned, and went right back to sleep.',
    traits: 'Loves naps. Hates rushing.'
  },
  fizz: {
    short: 'Sparked into existence during a thunderstorm.',
    full: 'Sparked into existence during a thunderstorm and hasn\'t stopped vibrating since. Everything is exciting. Everything is NOW.',
    traits: 'Loves excitement. Hates waiting.'
  },
  ember: {
    short: 'Emerged from the last ember of a dying fire.',
    full: 'Emerged from the last ember of a dying fire, refusing to be ignored. It burns bright and demands you notice.',
    traits: 'Loves attention. Hates being ordinary.'
  },
  chomper: {
    short: 'First spotted near the kitchen, following the smell of dinner.',
    full: 'First spotted near the kitchen, following the smell of dinner. It hasn\'t left since. It\'s always hungry. Always.',
    traits: 'Loves food. Hates... just loves food.'
  },
  whisp: {
    short: 'Drifted in through a crack in a dream.',
    full: 'Drifted in through a crack in a dream and sometimes forgets which world is which. Gentle, quiet, and slightly elsewhere.',
    traits: 'Loves quiet. Hates loud noises.'
  },
  luxe: {
    short: 'Arrived already posing.',
    full: 'Arrived already posing, absolutely certain it deserves better than wherever it came from. And better than here, too.',
    traits: 'Loves luxury. Hates anything ordinary.'
  }
};
```

### UI Badges for Food

```tsx
function FoodBadge({ food }) {
  const rarityColors = {
    common: 'bg-gray-200 text-gray-700',
    uncommon: 'bg-green-200 text-green-700',
    rare: 'bg-purple-200 text-purple-700',
    legendary: 'bg-yellow-200 text-yellow-700'
  };
  
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80">
      <span className="text-2xl">{food.emoji}</span>
      <div className="flex flex-col">
        <span className="font-medium">{food.name}</span>
        <div className="flex gap-1 text-xs">
          <span className={`px-1 rounded ${rarityColors[food.rarity]}`}>
            {food.rarity}
          </span>
          <span className="text-amber-600">💰{food.cost}</span>
          <span className="text-green-600">+{food.xp}xp</span>
        </div>
      </div>
    </div>
  );
}
```

---

## GAP 2: GameState Completeness (WEB-025)

### Seed Starter Inventory

```typescript
const STARTER_INVENTORY = {
  apple: 5,
  banana: 3,
  carrot: 2,
  cookie: 1
};

function createInitialState(): GameState {
  return {
    // ... other fields ...
    inventory: { ...STARTER_INVENTORY },
    // ... other fields ...
  };
}
```

### Consume Inventory on Feed

```typescript
function feedPet(state: GameState, foodId: string): GameState {
  // Check inventory
  if (!state.inventory[foodId] || state.inventory[foodId] <= 0) {
    return { ...state, error: 'No food in inventory!' };
  }
  
  // Consume from inventory
  state.inventory[foodId]--;
  if (state.inventory[foodId] <= 0) {
    delete state.inventory[foodId];
  }
  
  // ... rest of feeding logic ...
  
  return state;
}
```

### Evolution Stage Visuals

```typescript
const EVOLUTION_VISUALS = {
  baby: {
    scale: 0.7,
    filter: 'saturate(0.9)',
    label: 'Baby',
    description: 'Just starting out!'
  },
  youth: {
    scale: 0.85,
    filter: 'saturate(1.0)',
    label: 'Youth',
    description: 'Growing up fast!'
  },
  evolved: {
    scale: 1.0,
    filter: 'saturate(1.1) brightness(1.05)',
    label: 'Evolved',
    description: 'Fully grown!'
  }
};

function PetDisplay({ pet, petState }) {
  const stage = EVOLUTION_VISUALS[petState.evolutionStage];
  
  return (
    <div 
      className="pet-container"
      style={{
        transform: `scale(${stage.scale})`,
        filter: stage.filter
      }}
    >
      <span className="text-6xl">{pet.emoji}</span>
      <span className="text-xs text-gray-500">{stage.label}</span>
    </div>
  );
}
```

### Gate Flows with Flags

```typescript
function AppRouter({ state }) {
  // Gate: Onboarding not complete
  if (!state.onboardingComplete) {
    return <OnboardingFlow onComplete={() => setOnboardingComplete(true)} />;
  }
  
  // Gate: Tutorial not complete
  if (!state.tutorialComplete) {
    return <TutorialFlow onComplete={() => setTutorialComplete(true)} />;
  }
  
  // Gate: Mode not selected (after tutorial)
  if (!state.modeSelected) {
    return <ModeSelectScreen onSelect={(mode) => setGameMode(mode)} />;
  }
  
  // Main game
  return <GameScreen state={state} />;
}
```

---

## GAP 3: Onboarding/Tutorial (WEB-023/032)

### Animated Splash Screen

```tsx
function SplashScreen({ onTap }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  
  return (
    <div 
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-purple-700"
      onClick={onTap}
    >
      <div className={`transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <h1 className="text-6xl font-bold text-white mb-4">GRUNDY</h1>
        <p className="text-purple-200 animate-pulse">Tap to start</p>
      </div>
    </div>
  );
}
```

### Spotlight Tutorial Overlay

```tsx
function TutorialSpotlight({ target, message, onNext }) {
  // Get position of target element
  const targetRect = document.querySelector(target)?.getBoundingClientRect();
  
  return (
    <div className="fixed inset-0 z-50">
      {/* Dark overlay with hole */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Spotlight circle */}
      {targetRect && (
        <div 
          className="absolute rounded-full border-4 border-yellow-400 animate-pulse"
          style={{
            left: targetRect.left - 10,
            top: targetRect.top - 10,
            width: targetRect.width + 20,
            height: targetRect.height + 20,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)'
          }}
        />
      )}
      
      {/* Message bubble */}
      <div className="absolute bottom-20 left-4 right-4 bg-white rounded-xl p-4 shadow-xl">
        <p className="text-lg">{message}</p>
        <button 
          className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg"
          onClick={onNext}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
```

### Tutorial Steps

```typescript
const TUTORIAL_STEPS = [
  {
    target: '[data-tutorial="food-bag"]',
    message: "Tap a food to feed your pet! 🍎",
    action: 'wait_for_feed'
  },
  {
    target: '[data-tutorial="pet"]',
    message: "See how they react? They'll show you what they like! 💕",
    action: 'auto_advance'
  },
  {
    target: '[data-tutorial="bond-hearts"]',
    message: "Build your bond to unlock new friends! ♥♥♥",
    action: 'complete'
  }
];
```

### Mode Select Screen (After Tutorial)

```tsx
function ModeSelectScreen({ onSelect }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-900 to-purple-700">
      <h2 className="text-2xl font-bold text-white mb-6">Choose Your Style</h2>
      
      {/* Cozy Mode */}
      <button 
        className="w-full mb-4 p-4 bg-green-500 rounded-xl text-white"
        onClick={() => onSelect('cozy')}
      >
        <div className="text-xl font-bold">🌸 Cozy Mode</div>
        <div className="text-sm opacity-80">Relaxed play, no consequences</div>
        <div className="text-xs mt-1 bg-green-600 inline-block px-2 py-1 rounded">Recommended</div>
      </button>
      
      {/* Classic Mode */}
      <button 
        className="w-full p-4 bg-gray-600 rounded-xl text-white opacity-60"
        disabled
      >
        <div className="text-xl font-bold">🔥 Classic Mode</div>
        <div className="text-sm opacity-80">Care matters, pets can run away</div>
        <div className="text-xs mt-1 bg-gray-700 inline-block px-2 py-1 rounded">🔒 Reach Level 10</div>
      </button>
    </div>
  );
}
```

---

## GAP 4: Unlock UX (WEB-024/026/029)

### Progress Bars (Visual)

```tsx
function UnlockProgressBar({ current, required, label }) {
  const percent = Math.min((current / required) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{label}</span>
        <span>{current}/{required}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

### Celebration Modal (Full)

```tsx
function UnlockCelebration({ pet, onClose }) {
  const origin = PET_ORIGINS[pet.id];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-2xl p-6 mx-4 text-center animate-bounce-in">
        {/* Sparkles */}
        <div className="text-4xl mb-2">✨✨✨</div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          NEW FRIEND UNLOCKED!
        </h2>
        
        {/* Pet */}
        <div className="text-8xl mb-4">{pet.emoji}</div>
        <h3 className="text-xl font-bold">{pet.name}</h3>
        
        {/* Origin */}
        <p className="text-gray-600 italic my-4">"{origin.full}"</p>
        <p className="text-sm text-gray-500">{origin.traits}</p>
        
        {/* Ability */}
        <div className="mt-4 p-2 bg-purple-100 rounded-lg">
          <span className="text-purple-700 font-medium">
            Special: {pet.ability.name}
          </span>
        </div>
        
        {/* Button */}
        <button 
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-bold"
          onClick={onClose}
        >
          Start Playing with {pet.name}!
        </button>
      </div>
    </div>
  );
}
```

### Pet Selector with Full UX

```tsx
function PetSelector({ state, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {Object.values(PETS).map(pet => {
        const isUnlocked = state.unlockedPets.includes(pet.id);
        const petState = state.pets[pet.id];
        const unlockProgress = getUnlockProgress(state, pet);
        
        return (
          <div 
            key={pet.id}
            className={`p-3 rounded-xl ${isUnlocked ? 'bg-white' : 'bg-gray-100'}`}
            onClick={() => isUnlocked && onSelect(pet.id)}
          >
            {/* Pet emoji */}
            <div className={`text-4xl text-center ${!isUnlocked && 'opacity-30 grayscale'}`}>
              {pet.emoji}
            </div>
            
            {/* Name */}
            <div className="text-center font-medium mt-1">
              {isUnlocked ? pet.name : '???'}
            </div>
            
            {/* Level or Lock Status */}
            {isUnlocked ? (
              <div className="text-center text-sm text-gray-500">
                Lv.{petState.level}
              </div>
            ) : (
              <div className="mt-2">
                <UnlockProgressBar 
                  current={unlockProgress.current}
                  required={unlockProgress.required}
                  label={unlockProgress.label}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getUnlockProgress(state, pet) {
  switch (pet.unlockRequirement?.type) {
    case 'bond_level':
      return {
        current: state.stats.highestBondLevel,
        required: 5,
        label: 'Bond Level'
      };
    case 'minigames_played':
      return {
        current: state.stats.minigamesPlayed,
        required: 10,
        label: 'Mini-games'
      };
    case 'level':
      return {
        current: state.stats.highestLevel,
        required: pet.unlockRequirement.value,
        label: `Reach Lv.${pet.unlockRequirement.value}`
      };
    default:
      return { current: 0, required: 1, label: '???' };
  }
}
```

---

## GAP 5: Abilities & Gem Economy (WEB-030/031)

### Toast Notifications for Gem Events

```tsx
function GemToast({ amount, source }) {
  return (
    <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
      <span className="text-xl">+{amount} 💎</span>
      <span className="text-sm ml-2 opacity-80">{source}</span>
    </div>
  );
}

// Usage
function showGemAward(amount: number, source: string) {
  // Add to toast queue
  addToast(<GemToast amount={amount} source={source} />);
}

// Gem award triggers
const GEM_AWARD_MESSAGES = {
  level_up: 'Level Up!',
  rainbow_tier: 'Rainbow Score!',
  first_feed: 'First Feed Today!',
  login_streak_7: '7-Day Streak! 🔥'
};
```

### Day-7 Streak Celebration

```tsx
function StreakCelebration({ streak, gems, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-gradient-to-b from-teal-500 to-teal-600 rounded-2xl p-6 mx-4 text-center text-white">
        <div className="text-6xl mb-4">🔥</div>
        <h2 className="text-2xl font-bold mb-2">{streak} Day Streak!</h2>
        <p className="opacity-80 mb-4">You're on fire!</p>
        
        <div className="bg-white/20 rounded-xl p-4 mb-4">
          <div className="text-3xl">+{gems} 💎</div>
          <div className="text-sm opacity-80">Bonus Gems</div>
        </div>
        
        <button 
          className="w-full bg-white text-teal-600 py-3 rounded-xl font-bold"
          onClick={onClose}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
```

### Visual Feedback for Ability Effects

```tsx
function AbilityIndicator({ pet, effect }) {
  const abilityEffects = {
    bond_bonus: { icon: '💕', label: '+10% Bond', color: 'text-pink-500' },
    mood_penalty_reduction: { icon: '😌', label: '-20% Mood Loss', color: 'text-green-500' },
    mood_decay_reduction: { icon: '💤', label: 'Slower Decay', color: 'text-purple-500' },
    minigame_coin_bonus: { icon: '🪙', label: '+25% Coins', color: 'text-yellow-500' },
    spicy_coin_bonus: { icon: '🌶️', label: '2x Spicy', color: 'text-orange-500' },
    no_dislikes: { icon: '😋', label: 'No Dislikes', color: 'text-red-500' },
    rare_xp_bonus: { icon: '✨', label: '+50% Rare XP', color: 'text-purple-500' },
    gem_bonus: { icon: '💎', label: '2x Gems', color: 'text-teal-500' }
  };
  
  const ability = abilityEffects[pet.ability.id];
  
  if (!effect.active) return null;
  
  return (
    <div className={`absolute top-2 right-2 ${ability.color} text-xs bg-white/80 px-2 py-1 rounded-full animate-pulse`}>
      {ability.icon} {ability.label}
    </div>
  );
}
```

---

## GAP 6: Navigation Shell (WEB-033)

### Full Navigation Implementation

```tsx
function NavigationShell({ state, children }) {
  const [activePanel, setActivePanel] = useState(null);
  
  return (
    <div className="h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      
      {/* Bottom nav */}
      <nav className="flex justify-around bg-white border-t py-2">
        <NavButton icon="🐾" label="Pets" onClick={() => setActivePanel('pets')} />
        <NavButton icon="🛒" label="Shop" onClick={() => setActivePanel('shop')} />
        <NavButton icon="🎮" label="Play" onClick={() => setActivePanel('minigames')} />
        <NavButton icon="⚙️" label="Settings" onClick={() => setActivePanel('settings')} />
      </nav>
      
      {/* Slide-up panels */}
      {activePanel === 'pets' && (
        <SlidePanel onClose={() => setActivePanel(null)}>
          <PetSelector state={state} onSelect={handleSelectPet} />
        </SlidePanel>
      )}
      
      {activePanel === 'shop' && (
        <SlidePanel onClose={() => setActivePanel(null)}>
          <ShopPanel state={state} onBuy={handleBuyFood} />
        </SlidePanel>
      )}
      
      {activePanel === 'minigames' && (
        <SlidePanel onClose={() => setActivePanel(null)}>
          <MinigameHub state={state} onPlay={handlePlayGame} />
        </SlidePanel>
      )}
      
      {activePanel === 'settings' && (
        <SlidePanel onClose={() => setActivePanel(null)}>
          <SettingsPanel state={state} onUpdate={handleUpdateSettings} />
        </SlidePanel>
      )}
    </div>
  );
}

function NavButton({ icon, label, onClick, badge }) {
  return (
    <button 
      className="flex flex-col items-center px-4 py-1"
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs text-gray-500">{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

function SlidePanel({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-auto animate-slide-up">
        <div className="sticky top-0 bg-white p-2 border-b">
          <button onClick={onClose} className="text-gray-500">✕ Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

### Shop Panel

```tsx
function ShopPanel({ state, onBuy }) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🛒 Shop</h2>
        <span className="text-amber-600 font-bold">💰 {state.coins}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {Object.values(FOODS).map(food => (
          <div key={food.id} className="bg-gray-50 rounded-xl p-3">
            <div className="text-3xl text-center">{food.emoji}</div>
            <div className="text-center font-medium">{food.name}</div>
            <div className="text-center text-sm text-gray-500">
              {food.cost} coins
            </div>
            <button
              className={`w-full mt-2 py-1 rounded-lg text-sm ${
                state.coins >= food.cost
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}
              onClick={() => onBuy(food.id)}
              disabled={state.coins < food.cost}
            >
              {state.coins >= food.cost ? 'Buy' : 'Need coins'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Mini-game Hub

```tsx
function MinigameHub({ state, onPlay }) {
  const canPlay = state.energy >= 10 || state.firstDailyGameFree;
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🎮 Mini-Games</h2>
        <span className="text-yellow-600">⚡ {state.energy}/50</span>
      </div>
      
      {/* Energy info */}
      <div className="bg-yellow-50 rounded-lg p-3 mb-4 text-sm">
        {state.firstDailyGameFree ? (
          <span className="text-green-600">🎁 First game today is FREE!</span>
        ) : (
          <span>Cost: 10 ⚡ per game</span>
        )}
      </div>
      
      {/* Game list */}
      <div className="space-y-3">
        <GameCard 
          name="Snack Catch"
          emoji="🍎"
          description="Catch falling foods!"
          onPlay={() => onPlay('snack_catch')}
          disabled={!canPlay}
        />
        {/* Add more games as they're built */}
      </div>
    </div>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel({ state, onUpdate }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">⚙️ Settings</h2>
      
      {/* Sound */}
      <SettingRow
        label="Sound Effects"
        icon="🔊"
        checked={state.settings.soundEnabled}
        onChange={(v) => onUpdate({ soundEnabled: v })}
      />
      
      {/* Vibration */}
      <SettingRow
        label="Vibration"
        icon="📳"
        checked={state.settings.vibrationEnabled}
        onChange={(v) => onUpdate({ vibrationEnabled: v })}
      />
      
      {/* Divider */}
      <hr className="my-4" />
      
      {/* Danger zone */}
      <h3 className="text-red-500 font-medium mb-2">Danger Zone</h3>
      
      <button 
        className="w-full bg-red-100 text-red-600 py-3 rounded-lg"
        onClick={() => {
          if (confirm('Reset ALL progress? This cannot be undone!')) {
            onUpdate({ reset: true });
          }
        }}
      >
        Reset Progress
      </button>
      
      {/* Version */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Grundy v2.2
      </p>
    </div>
  );
}

function SettingRow({ label, icon, checked, onChange }) {
  return (
    <div className="flex justify-between items-center py-3">
      <span>{icon} {label}</span>
      <button
        className={`w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-green-500' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
    </div>
  );
}
```

---

## PRIORITY ORDER

1. **Data** — Add missing foods, full origin strings, UI badges
2. **Inventory** — Seed starter items, consume on feed
3. **Onboarding** — Animated splash, spotlight tutorial, mode select gate
4. **Unlock UX** — Visual progress bars, full celebration modal
5. **Gem Events** — Toasts, streak celebration, ability indicators
6. **Navigation** — Full panels for shop, mini-games, settings

Build these in order. Each gap is self-contained.
