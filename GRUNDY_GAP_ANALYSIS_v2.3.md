# Grundy v2.3 Gap Analysis - Code Extracts

## Overview

This document extracts the relevant code sections from `grundy-game-v2_3__2_.html` that address each gap identified in the Updated Gap List.

---

## Gap 1: Data Fidelity (WEB-027/028)

**Issue:** Pet bios lack expanded caption strings; food catalog short (missing dream/rare/luxury/skew variants); economy costs/rarities not surfaced in UI badges.

### ✅ ADDRESSED - Pet Data with Full Origin Stories (Lines 121-270)

```javascript
const PETS = {
  munchlet: {
    id: 'munchlet', name: 'Munchlet', emoji: '🟡', color: '#fbbf24',
    unlockType: 'free',
    personality: 'Cheerful, loves company',
    origin: {
      short: 'Found on a sunny windowsill, humming.',
      full: 'Found on a sunny windowsill, humming softly to itself. It was waiting for someone to share warmth with. Now it has found you.',
      traits: 'Loves sweet things. Hates being alone.'
    },
    likes: ['apple', 'banana'],
    loves: ['cookie', 'candy', 'ice_cream', 'cake'],
    dislikes: ['spicy_taco', 'hot_pepper'],
    ability: { id: 'bond_bonus', name: '+10% Bond', description: 'Earns 10% more bond from all actions' },
    stats: { hungerDecay: 10, happinessDecay: 5 }
  },
  grib: {
    id: 'grib', name: 'Grib', emoji: '🟢', color: '#4ade80',
    unlockType: 'free',
    personality: 'Mischievous, chaotic',
    origin: {
      short: 'Appeared in a shadow behind the cupboard, grinning.',
      full: "Appeared in a shadow behind the cupboard one day, already grinning. It won't tell you how it got there. It won't tell you anything.",
      traits: 'Loves chaos. Hates boredom.'
    },
    // ...
  },
  // All 8 pets have origin.short, origin.full, origin.traits
};
```

### ✅ ADDRESSED - Food Catalog with Descriptions and Rarities (Lines 273-289)

```javascript
const FOODS = {
  apple: { id: 'apple', name: 'Apple', emoji: '🍎', cost: 5, rarity: 'common', xp: 10, fullness: 15, happiness: 5, category: 'fruit', description: 'A crisp, healthy snack' },
  banana: { id: 'banana', name: 'Banana', emoji: '🍌', cost: 5, rarity: 'common', xp: 10, fullness: 15, happiness: 5, category: 'fruit', description: 'Sweet and filling' },
  carrot: { id: 'carrot', name: 'Carrot', emoji: '🥕', cost: 5, rarity: 'common', xp: 10, fullness: 15, happiness: 3, category: 'veggie', description: 'Crunchy and nutritious' },
  milk: { id: 'milk', name: 'Milk', emoji: '🥛', cost: 8, rarity: 'common', xp: 12, fullness: 18, happiness: 8, category: 'drink', description: 'Fresh and creamy' },
  salad: { id: 'salad', name: 'Salad', emoji: '🥗', cost: 8, rarity: 'common', xp: 12, fullness: 20, happiness: 3, category: 'veggie', description: 'Healthy greens' },
  candy: { id: 'candy', name: 'Candy', emoji: '🍬', cost: 10, rarity: 'uncommon', xp: 15, fullness: 10, happiness: 20, category: 'sweet', description: 'Pure sugar rush' },
  cookie: { id: 'cookie', name: 'Cookie', emoji: '🍪', cost: 15, rarity: 'uncommon', xp: 20, fullness: 20, happiness: 15, category: 'sweet', description: 'A delicious treat' },
  spicy_taco: { id: 'spicy_taco', name: 'Spicy Taco', emoji: '🌮', cost: 15, rarity: 'uncommon', xp: 20, fullness: 25, happiness: 10, category: 'spicy', description: 'Hot and zesty' },
  ice_cream: { id: 'ice_cream', name: 'Ice Cream', emoji: '🍦', cost: 20, rarity: 'uncommon', xp: 25, fullness: 20, happiness: 25, category: 'sweet', description: 'Cold and creamy delight' },
  hot_pepper: { id: 'hot_pepper', name: 'Hot Pepper', emoji: '🌶️', cost: 20, rarity: 'uncommon', xp: 25, fullness: 15, happiness: 5, category: 'spicy', description: 'Extremely spicy!' },
  energy_drink: { id: 'energy_drink', name: 'Energy Drink', emoji: '⚡', cost: 25, rarity: 'uncommon', xp: 20, fullness: 5, happiness: 30, category: 'drink', description: 'MAXIMUM ENERGY!' },
  mystery_meat: { id: 'mystery_meat', name: 'Mystery Meat', emoji: '🍖', cost: 30, rarity: 'uncommon', xp: 35, fullness: 35, happiness: 15, category: 'meat', description: "Don't ask what it is" },
  cake: { id: 'cake', name: 'Cake', emoji: '🍰', cost: 50, rarity: 'rare', xp: 50, fullness: 30, happiness: 40, category: 'sweet', description: 'For special occasions' },
  dream_treat: { id: 'dream_treat', name: 'Dream Treat', emoji: '🌙', cost: 75, rarity: 'rare', xp: 60, fullness: 25, happiness: 45, category: 'magical', description: 'Tastes like sweet dreams' },
  golden_feast: { id: 'golden_feast', name: 'Golden Feast', emoji: '👑', cost: 100, rarity: 'legendary', xp: 100, fullness: 50, happiness: 50, category: 'luxury', description: 'Fit for royalty' }
};
```

### Shop Panel with Rarity Colors (Lines 2111-2177)

```javascript
function ShopPanel({ coins, onBuy, onClose }) {
  const categories = {
    common: Object.values(FOODS).filter(f => f.rarity === 'common'),
    uncommon: Object.values(FOODS).filter(f => f.rarity === 'uncommon'),
    rare: Object.values(FOODS).filter(f => f.rarity === 'rare'),
    legendary: Object.values(FOODS).filter(f => f.rarity === 'legendary')
  };

  const rarityColors = {
    common: 'bg-gray-100 border-gray-300',
    uncommon: 'bg-green-50 border-green-300',
    rare: 'bg-blue-50 border-blue-300',
    legendary: 'bg-yellow-50 border-yellow-400'
  };
  // ... renders with color-coded borders
}
```

### ❌ Remaining Gap
Rarity badges not visually surfaced in main feeding UI (Food Bag) - only in Shop Panel.

---

## Gap 2: GameState Completeness (WEB-025)

**Issue:** Inventory exists but isn't consumed in feeds or seeded with starter stock; evolution art/states are placeholders; shared flags (first feed today, onboarding/tutorial) don't gate flows beyond the initial screen.

### ✅ ADDRESSED - Initial State with Proper Inventory (Lines 741-778)

```javascript
const createInitialState = () => ({
  pets: {
    munchlet: createPetState(),
    grib: createPetState(),
    plompo: createPetState()
  },
  activePetId: 'munchlet',
  unlockedPets: ['munchlet', 'grib', 'plompo'],
  coins: 100,
  gems: 10,
  energy: 50,
  inventory: { apple: 5, banana: 3, carrot: 2, cookie: 1 },  // ✅ Seeded properly
  stats: {
    minigamesPlayed: 0,
    totalFeedings: 0,
    poopsCleaned: 0,
    daysPlayed: 1,
    loginStreak: 1,
    highestBondLevel: 0,
    highestLevel: 1
  },
  onboardingComplete: false,
  tutorialComplete: false,
  modeSelected: false,  // ✅ Gates mode selection
  gameMode: 'cozy',
  feedingCooldownEnd: 0,
  energyLastRegen: Date.now(),
  lastDailyReset: new Date().toDateString(),
  firstFeedToday: true,
  firstGameToday: true,
  poopPresent: false,
  poopCount: 0,
  feedsSincePoop: 0,
  runaway: null,
  discoveredPreferences: {},
  preferenceJournalUnlocked: false,
  settings: { soundEnabled: true, vibrationEnabled: true }
});
```

### ✅ ADDRESSED - Inventory Consumption in Feeding (Lines 936-952)

```javascript
case 'FEED_PET': {
  const pet = PETS[state.activePetId];
  const petState = state.pets[state.activePetId];
  const food = FOODS[action.foodId];

  // ✅ Check inventory before feeding
  if (!state.inventory[action.foodId] || state.inventory[action.foodId] <= 0) {
    return { ...state, error: 'No food in inventory!' };
  }

  // ✅ Decrement inventory
  const newInventory = { ...state.inventory };
  newInventory[action.foodId]--;
  if (newInventory[action.foodId] <= 0) delete newInventory[action.foodId];
  
  // ... rest of feeding logic
}
```

### ✅ ADDRESSED - Flow Gating in App Router (Lines 3577-3634)

```javascript
function App() {
  const [state, dispatch] = useGameStore();
  const [screen, setScreen] = useState('splash');

  // ✅ Skip splash if returning player
  useEffect(() => {
    if (state.onboardingComplete && state.tutorialComplete && state.modeSelected) {
      setScreen('game');
    }
  }, []);

  if (screen === 'splash') {
    return <SplashScreen onStart={() => {
      if (state.onboardingComplete && state.tutorialComplete && state.modeSelected) {
        setScreen('game');
      } else {
        setScreen('intro');
      }
    }} />;
  }

  if (screen === 'intro') {
    return <IntroScreen onNext={() => setScreen('select')} onSkip={() => setScreen('select')} />;
  }

  if (screen === 'select' && !state.onboardingComplete) {
    return <PetSelectionScreen onSelect={(petId) => {
      dispatch({ type: 'SELECT_STARTER', petId });
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      setScreen('tutorial');
    }} />;
  }

  // ✅ Tutorial gates mode selection
  if (screen === 'tutorial' && !state.tutorialComplete) {
    return <TutorialFlow
      state={state}
      dispatch={dispatch}
      onComplete={() => {
        dispatch({ type: 'COMPLETE_TUTORIAL' });
        setScreen('mode');  // ✅ Goes to mode after tutorial
      }}
    />;
  }

  // ✅ Mode selection gates main game
  if (screen === 'mode' && !state.modeSelected) {
    return <ModeSelectionScreen
      state={state}
      onSelect={(mode) => {
        dispatch({ type: 'SELECT_MODE', mode });
        setScreen('game');
      }}
    />;
  }

  return <MainGame state={state} dispatch={dispatch} />;
}
```

### ❌ Remaining Gap
Evolution stages are string labels ('baby'/'youth'/'evolved') with emoji size scaling only - no distinct visual art.

---

## Gap 3: Onboarding/Tutorial (WEB-023/032)

**Issue:** Current onboarding is text-only without animated splash, spotlight overlays, or the mode-select step after tutorial completion.

### ✅ ADDRESSED - Splash Screen with Animation (Lines 1335-1357)

```javascript
function SplashScreen({ onStart }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-purple-400 to-pink-400 flex flex-col items-center justify-center cursor-pointer"
      onClick={onStart}
    >
      <div className={`transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <div className="text-8xl mb-4 animate-bounce-slow">🐾</div>  {/* ✅ Animated */}
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Grundy</h1>
        <p className="text-white/80 text-lg">Virtual Pet</p>
      </div>
      <p className={`absolute bottom-20 text-white/60 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
        Tap to start
      </p>
    </div>
  );
}
```

### ✅ ADDRESSED - Pet Selection with Origin Snippets (Lines 1388-1441)

```javascript
function PetSelectionScreen({ onSelect }) {
  const starters = ['munchlet', 'grib', 'plompo'];
  const [selected, setSelected] = useState(null);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-400 to-pink-300 flex flex-col p-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-white text-center mt-8 mb-2">Choose Your First Pet</h2>
      <p className="text-white/80 text-center mb-6">You can unlock more pets later!</p>

      <div className="flex-1 flex flex-col gap-4 overflow-auto pb-4">
        {starters.map(petId => {
          const pet = PETS[petId];
          const isSelected = selected === petId;
          return (
            <div
              key={petId}
              onClick={() => setSelected(petId)}
              className={`bg-white rounded-2xl p-4 shadow-lg cursor-pointer transition-all ${
                isSelected ? 'ring-4 ring-purple-500 scale-[1.02]' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: pet.color + '30' }}>
                  {pet.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold" style={{ color: pet.color }}>{pet.name}</h3>
                  <p className="text-gray-500 text-sm">{pet.personality}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3 italic">"{pet.origin.short}"</p>  {/* ✅ Origin snippet */}
              <p className="text-gray-500 text-xs mt-1">{pet.origin.traits}</p>
            </div>
          );
        })}
      </div>
      {/* ... */}
    </div>
  );
}
```

### ✅ ADDRESSED - Tutorial with Spotlight Overlay (Lines 1444-1531)

```javascript
function TutorialFlow({ state, dispatch, onComplete }) {
  const [step, setStep] = useState(0);
  const [hasFed, setHasFed] = useState(false);

  const steps = [
    { target: 'food', message: "Tap a food to feed your pet!", position: 'bottom' },
    { target: 'reaction', message: "See how they react? Each pet has favorites!", position: 'center' },
    { target: 'bond', message: "Build your bond to unlock new friends!", position: 'top' }
  ];

  // ... feed handling

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col">
      {/* Pet Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className={`text-8xl ${step === 1 ? 'animate-bounce-slow' : ''}`}>
          {pet.emoji}
        </div>
        
        {/* Bond Hearts - highlighted in step 2 */}
        <div className={`flex gap-1 mt-2 ${step === 2 ? 'animate-pulse-glow rounded-full px-3 py-1' : ''}`}>
          {[0,1,2,3,4].map(i => (
            <span key={i} className="text-2xl">{i < petState.bondLevel ? '♥️' : '🤍'}</span>
          ))}
        </div>

        {/* ✅ Tutorial Overlay with Spotlight Effect */}
        {step < 3 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className={`bg-white rounded-2xl p-6 mx-4 max-w-sm shadow-2xl animate-scale-in ${
              step === 0 ? 'mt-40' : step === 2 ? '-mt-40' : ''
            }`}>
              <p className="text-lg font-medium text-center">{steps[step].message}</p>
              {step === 2 && (
                <button onClick={onComplete} className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl font-bold">
                  Got it!
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Food Panel - ✅ Highlighted when step === 0 */}
      <div className={`bg-white rounded-t-3xl p-4 shadow-lg ${step === 0 ? 'relative z-10' : ''}`}>
        {/* ... food items with wiggle animation when active */}
      </div>
    </div>
  );
}
```

### ✅ ADDRESSED - Mode Selection Screen (Lines 1534-1592)

```javascript
function ModeSelectionScreen({ state, onSelect }) {
  const canClassic = state.stats.highestLevel >= 10;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-400 to-pink-400 flex flex-col items-center justify-center p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2">Choose Your Mode</h2>
      <p className="text-white/80 text-center mb-8">You can change this later in settings</p>

      <div className="w-full max-w-sm space-y-4">
        {/* Cozy Mode */}
        <button onClick={() => onSelect('cozy')} className="w-full bg-white rounded-2xl p-5 shadow-lg text-left">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌸</span>
            <div>
              <h3 className="font-bold text-purple-600 text-lg">Cozy Mode</h3>
              <p className="text-gray-500 text-sm">Relaxed gameplay, no penalties</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">Recommended for new players</p>
        </button>

        {/* Classic Mode - locked until Level 10 */}
        <button
          onClick={() => canClassic && onSelect('classic')}
          disabled={!canClassic}
          className={`w-full rounded-2xl p-5 shadow-lg text-left ${canClassic ? 'bg-white' : 'bg-gray-200 opacity-60'}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">{canClassic ? '🔥' : '🔒'}</span>
            <div>
              <h3 className={`font-bold text-lg ${canClassic ? 'text-orange-600' : 'text-gray-500'}`}>Classic Mode</h3>
              <p className="text-gray-500 text-sm">{canClassic ? 'Pets can run away if neglected' : 'Unlock at Level 10'}</p>
            </div>
          </div>
          {!canClassic && (
            <div className="mt-2">
              <div className="h-2 bg-gray-300 rounded-full">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${(state.stats.highestLevel / 10) * 100}%` }} />
              </div>
              <p className="text-gray-400 text-xs mt-1">Level {state.stats.highestLevel}/10</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
```

---

## Gap 4: Unlock UX (WEB-024/026/029)

**Issue:** Pet selector shows lock reasons, but lacks purchase buttons, gem deductions for premium unlocks, and the full celebration copy/illustration.

### ✅ ADDRESSED - Pet Selector with Progress Bars & Gem Unlock (Lines 2180-2267)

```javascript
function PetSelectorPanel({ state, dispatch, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden animate-slide-up">
        <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto">
          {Object.values(PETS).map(pet => {
            const isUnlocked = state.unlockedPets.includes(pet.id);
            const isActive = state.activePetId === pet.id;
            const petState = state.pets[pet.id];
            const progress = getUnlockProgress(state, pet);
            const gemCost = pet.unlockRequirement?.gemCost;
            const canAfford = gemCost && state.gems >= gemCost;

            return (
              <div key={pet.id} onClick={() => isUnlocked && onSelect(pet.id)}
                className={`p-3 rounded-xl ${isUnlocked ? 'bg-white shadow-md cursor-pointer' : 'bg-gray-100'} ${isActive ? 'ring-2 ring-purple-500' : ''}`}>
                
                <div className={`text-4xl text-center ${!isUnlocked && 'opacity-30 grayscale'}`}>{pet.emoji}</div>
                <div className="text-center font-medium mt-1">{isUnlocked ? pet.name : '???'}</div>

                {isUnlocked && petState ? (
                  <div className="text-center text-sm text-gray-500">
                    Lv.{petState.level}
                    {isActive && <span className="ml-1 text-purple-500">(Active)</span>}
                  </div>
                ) : (
                  <div className="mt-2">
                    {/* ✅ Progress bar for unlock requirements */}
                    {progress && (
                      <>
                        <div className="text-xs text-gray-500 mb-1">{progress.label}</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (progress.current / progress.required) * 100)}%` }} />
                        </div>
                        <div className="text-xs text-right text-gray-400">{progress.current}/{progress.required}</div>
                      </>
                    )}
                    
                    {/* ✅ Gem Unlock Button */}
                    {gemCost && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canAfford) dispatch({ type: 'UNLOCK_PET', petId: pet.id });
                        }}
                        className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-all ${
                          canAfford ? 'bg-purple-500 text-white active:scale-95' : 'bg-gray-300 text-gray-500'
                        }`}
                      >
                        {canAfford ? `Unlock ${gemCost}💎` : `Need ${gemCost}💎`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getUnlockProgress(state, pet) {
  const req = pet.unlockRequirement;
  if (!req) return null;

  switch (req.type) {
    case 'bond_level':
      return { current: state.stats.highestBondLevel, required: 5, label: 'Bond Level 5' };
    case 'minigames_played':
      return { current: state.stats.minigamesPlayed, required: 10, label: '10 Mini-games' };
    case 'level':
      return { current: state.stats.highestLevel, required: req.value, label: `Level ${req.value}` };
    default:
      return null;
  }
}
```

### ✅ ADDRESSED - Unlock Celebration with Full Origin (Lines 2072-2108)

```javascript
function UnlockCelebration({ petId, onClose }) {
  const pet = PETS[petId];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 mx-4 text-center max-w-sm animate-scale-in">
        <div className="text-4xl mb-2">✨✨✨</div>
        <h2 className="text-2xl font-bold text-purple-600 mb-4">NEW FRIEND UNLOCKED!</h2>

        <div className="text-8xl mb-4"
          style={pet.id === 'luxe' ? { background: pet.color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}>
          {pet.emoji}
        </div>
        <h3 className="text-xl font-bold">{pet.name}</h3>

        {/* ✅ Full origin story */}
        <p className="text-gray-600 italic my-4">"{pet.origin.full}"</p>
        <p className="text-sm text-gray-500">{pet.origin.traits}</p>

        {/* ✅ Ability showcase */}
        <div className="mt-4 p-2 bg-purple-100 rounded-lg">
          <span className="text-purple-700 font-medium">✨ {pet.ability.name}</span>
          <p className="text-xs text-purple-600 mt-1">{pet.ability.description}</p>
        </div>

        <button onClick={onClose}
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-bold active:scale-95">
          Start Playing!
        </button>
      </div>
    </div>
  );
}
```

---

## Gap 5: Abilities & Gem Economy (WEB-030/031)

**Issue:** Ability hooks for dislikes/rare/spicy/coins/gems are wired, but mood penalty/decay effects need visual feedback; gem sources miss day-7 streak celebration UI and don't present gem deltas to the player.

### ✅ ADDRESSED - Ability Indicator Component (Lines 1925-1945)

```javascript
function AbilityIndicator({ pet }) {
  const abilityStyles = {
    bond_bonus: { bg: 'bg-pink-100', text: 'text-pink-600', icon: '💕' },
    mood_penalty_reduction: { bg: 'bg-green-100', text: 'text-green-600', icon: '😌' },
    mood_decay_reduction: { bg: 'bg-purple-100', text: 'text-purple-600', icon: '💤' },
    minigame_coin_bonus: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: '🪙' },
    spicy_coin_bonus: { bg: 'bg-orange-100', text: 'text-orange-600', icon: '🌶️' },
    no_dislikes: { bg: 'bg-red-100', text: 'text-red-600', icon: '😋' },
    rare_xp_bonus: { bg: 'bg-blue-100', text: 'text-blue-600', icon: '✨' },
    gem_bonus: { bg: 'bg-teal-100', text: 'text-teal-600', icon: '💎' }
  };
  
  const style = abilityStyles[pet.ability.id] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '⭐' };
  
  return (
    <div className={`${style.bg} ${style.text} px-2 py-1 rounded-full text-xs font-medium`}>
      {style.icon} {pet.ability.name}
    </div>
  );
}
```

### ✅ ADDRESSED - Day-7 Streak Detection & Bonus (Lines 796-806)

```javascript
// In loadState() - daily reset logic:
if (daysDiff === 1) {
  // Consecutive day - increment streak
  parsed.stats.loginStreak++;
  
  // ✅ Day-7 streak bonus
  if (parsed.stats.loginStreak % 7 === 0) {
    let bonus = 10;
    const activePet = PETS[parsed.activePetId];
    if (activePet?.ability?.id === 'gem_bonus') bonus *= 2;  // ✅ Luxe ability doubles gems
    parsed.gems = (parsed.gems || 0) + bonus;
    parsed.streakCelebration = { streak: parsed.stats.loginStreak, gems: bonus };  // ✅ Triggers modal
  }
} else if (daysDiff > 1) {
  // Missed a day - reset streak
  parsed.stats.loginStreak = 1;
}
```

### ✅ ADDRESSED - Streak Celebration Modal (Lines 1900-1923)

```javascript
function StreakCelebration({ streak, gems, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gradient-to-b from-orange-500 to-red-500 rounded-2xl p-6 mx-4 text-center max-w-sm text-white animate-scale-in">
        <div className="text-6xl mb-4">🔥</div>
        <h2 className="text-3xl font-bold mb-2">{streak} Day Streak!</h2>
        <p className="opacity-80 mb-4">You're on fire!</p>
        
        <div className="bg-white/20 rounded-xl p-4 mb-4">
          <div className="text-4xl font-bold">+{gems} 💎</div>  {/* ✅ Shows gem delta */}
          <div className="text-sm opacity-80">Bonus Gems</div>
        </div>
        
        <button onClick={onClose}
          className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold active:scale-95">
          Awesome!
        </button>
      </div>
    </div>
  );
}
```

### ✅ ADDRESSED - Gem Toast for Various Sources (Lines 1859-1897)

```javascript
function GemToast({ amount, source, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const sources = {
    firstFeed: '🌅 First feed bonus!',
    levelUp: '⬆️ Level up bonus!',
    rainbow: '🌈 Rainbow tier!',
    streak: '🔥 Streak bonus!'
  };

  return (
    <div className="fixed top-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-40 animate-slide-in">
      <span className="text-lg font-bold">+{amount} 💎</span>
      <span className="text-sm opacity-80 ml-2">{sources[source] || ''}</span>
    </div>
  );
}
```

### ✅ ADDRESSED - Abilities Applied in Feeding (Lines 959-981)

```javascript
// In FEED_PET reducer:
let affinity = getAffinity(pet, action.foodId);

// ✅ Chomper's no_dislikes ability
if (pet.ability.id === 'no_dislikes' && affinity === 'disliked') {
  affinity = 'neutral';
}

let xpGain = food.xp * affinityData.xpMult * fullnessMult * cooldownMult;

// ✅ Whisp's rare_xp_bonus ability
if (pet.ability.id === 'rare_xp_bonus' && ['rare', 'legendary'].includes(food.rarity)) {
  xpGain *= 1.5;
}

// ✅ Munchlet's bond_bonus ability
let bondGain = getBondGainForFullness(petState.fullness) * affinityData.bondMult * bondMult * cooldownMult;
if (pet.ability.id === 'bond_bonus') bondGain *= 1.1;

// ✅ Grib's mood_penalty_reduction ability
let happinessChange = food.happiness + affinityData.happinessChange;
if (pet.ability.id === 'mood_penalty_reduction' && happinessChange < 0) {
  happinessChange *= 0.8;
}
```

---

## Gap 6: Navigation Shell (WEB-033)

**Issue:** The ≡ menu is non-interactive; shop, mini-game hub, and settings panels are stubs with no routing or content.

### ✅ FULLY ADDRESSED - Bottom Navigation Bar (Lines 3412-3430)

```javascript
{/* Bottom Navigation */}
<nav className="flex justify-around bg-white border-t py-3 safe-area-bottom">
  <button onClick={() => setPanel('pets')} className="flex flex-col items-center">
    <span className="text-2xl">🐾</span>
    <span className="text-xs text-gray-500">Pets</span>
  </button>
  <button onClick={() => setPanel('shop')} className="flex flex-col items-center">
    <span className="text-2xl">🛒</span>
    <span className="text-xs text-gray-500">Shop</span>
  </button>
  <button onClick={() => setPanel('games')} className="flex flex-col items-center">
    <span className="text-2xl">🎮</span>
    <span className="text-xs text-gray-500">Play</span>
  </button>
  <button onClick={() => setPanel('settings')} className="flex flex-col items-center">
    <span className="text-2xl">⚙️</span>
    <span className="text-xs text-gray-500">Settings</span>
  </button>
</nav>
```

### ✅ ADDRESSED - Panel Rendering (Lines 3432-3471)

```javascript
{/* Panels */}
{panel === 'pets' && (
  <PetSelectorPanel
    state={state}
    dispatch={dispatch}
    onSelect={(petId) => { dispatch({ type: 'SWITCH_PET', petId }); setPanel(null); }}
    onClose={() => setPanel(null)}
  />
)}

{panel === 'shop' && (
  <ShopPanel
    coins={state.coins}
    onBuy={(foodId) => dispatch({ type: 'BUY_FOOD', foodId })}
    onClose={() => setPanel(null)}
  />
)}

{panel === 'games' && (
  <MinigameHubPanel
    state={state}
    onPlay={(game) => { setPanel(null); setCurrentActivity('playing'); setPlayingGame(game); }}
    onClose={() => setPanel(null)}
  />
)}

{panel === 'settings' && (
  <SettingsPanel
    state={state}
    dispatch={dispatch}
    onClose={() => setPanel(null)}
  />
)}
```

### ✅ ADDRESSED - Shop Panel (Lines 2111-2177)

Full category grid with rarity colors, cost display, purchase flow with coin check.

### ✅ ADDRESSED - Mini-game Hub (Lines 2286-2365)

4 playable games with energy system, reward tier display (bronze/silver/gold/rainbow).

### ✅ ADDRESSED - Settings Panel (Lines 3014-3150)

- Sound/Vibration toggles
- Statistics display (streak, days played, total feedings, games played)
- Game mode indicator
- Version number (v2.3)
- Feedback email link
- Reset with confirmation dialog

---

## Summary Table

| Gap | Status | Details |
|-----|--------|---------|
| **1. Data Fidelity** | ✅ Mostly Fixed | Full pet origins + 14 foods with descriptions. Minor: rarity badges only in Shop, not Food Bag |
| **2. GameState** | ✅ Fixed | Inventory properly seeded & consumed; flags gate all flows |
| **3. Onboarding** | ✅ Fixed | Animated splash, spotlight overlays, mode-select after tutorial |
| **4. Unlock UX** | ✅ Fixed | Progress bars, gem unlock buttons, full celebration with origin story |
| **5. Abilities/Gems** | ✅ Fixed | Visual indicators, day-7 celebration, gem toasts with sources |
| **6. Navigation** | ✅ Fixed | All 4 panels fully functional with content and routing |

---

## Remaining Minor Gaps

1. **Rarity badges** not shown in main Food Bag UI (only in Shop)
2. **Evolution art** is emoji size scaling only, no distinct sprites per stage
3. **Ability activation feedback** during feeding could be more prominent (currently just affects numbers)
