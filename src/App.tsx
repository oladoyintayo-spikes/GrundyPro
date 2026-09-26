import React, { useState, useEffect } from 'react';
import { useGameStore } from './game/store';
import { PETS } from './data/pets';
import { PetDisplay } from './components/PetDisplay';
import { MetricBars } from './components/MetricBars';
import { FoodDrawer } from './components/FoodDrawer';
import { MiniGameModal } from './components/MiniGameModal';
import { ShopModal } from './components/ShopModal';
import { PetSelectorModal } from './components/PetSelectorModal';
import { ReactionToast } from './components/ReactionToast';
import { DevPanel } from './components/DevPanel';

export const App: React.FC = () => {
  const {
    activePetId,
    petStates,
    unlockedPetIds,
    currencies,
    inventory,
    lastFeedReaction,
    notification,
    switchPet,
    feedPet,
    petGrundy,
    toggleSleep,
    cleanPet,
    playMiniGame,
    buyFood,
    unlockPet,
    clearNotification,
    clearLastReaction,
    tick,
    setMetric,
    addCoins,
    addGems,
    fillInventory,
    resetGame,
  } = useGameStore();

  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isPetSelectorOpen, setIsPetSelectorOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isEating, setIsEating] = useState(false);

  const activePetDef = PETS[activePetId] || PETS.munchlet;
  const activePet = petStates[activePetId] || {
    id: activePetId,
    level: 1,
    xp: 0,
    stage: 'baby',
    hunger: 70,
    energy: 85,
    happiness: 80,
    bond: 5,
    cleanliness: 90,
    isSleeping: false,
    totalFed: 0,
    lastFedTimestamp: Date.now(),
    lastTickedTimestamp: Date.now(),
  };

  // Main real-time game loop tick (runs every second)
  useEffect(() => {
    // Offline time catch-up check
    const lastTick = activePet.lastTickedTimestamp || Date.now();
    const elapsedSeconds = Math.min(3600 * 12, Math.max(0, (Date.now() - lastTick) / 1000));
    if (elapsedSeconds > 2) {
      tick(elapsedSeconds);
    }

    const interval = setInterval(() => {
      tick(1);
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  const handleFeed = (foodId: string) => {
    setIsEating(true);
    setTimeout(() => setIsEating(false), 1500);
    feedPet(foodId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center selection:bg-amber-500/30 overflow-x-hidden">
      {/* Mobile-first Game Screen Frame */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-x border-slate-800/80 shadow-2xl relative">
        {/* Top Header Bar */}
        <header className="px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
          {/* Pet Selector Button */}
          <button
            onClick={() => setIsPetSelectorOpen(true)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition active:scale-95"
          >
            <span className="text-xl w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
              {activePetDef.emoji}
            </span>
            <span className="text-xs font-bold text-white">{activePetDef.name}</span>
            <span className="text-[10px] text-slate-400">▼</span>
          </button>

          {/* Currencies Display & Dev Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-bold text-amber-300">
              <span>🪙</span>
              <span>{currencies.coins}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-bold text-cyan-300">
              <span>💎</span>
              <span>{currencies.gems}</span>
            </div>
            <button
              onClick={() => setIsDevOpen(true)}
              title="Dev Testing Panel"
              className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-emerald-400 flex items-center justify-center text-xs"
            >
              🛠️
            </button>
          </div>
        </header>

        {/* Reaction Toast */}
        <ReactionToast reaction={lastFeedReaction} onDismiss={clearLastReaction} />

        {/* Global Notification Banner */}
        {notification && (
          <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-b border-amber-500/30 flex items-center justify-between animate-fadeIn text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">📢</span>
              <div>
                <span className="font-bold text-amber-300">{notification.title}</span>
                <span className="text-slate-300 ml-1.5">{notification.desc}</span>
              </div>
            </div>
            <button
              onClick={clearNotification}
              className="text-slate-400 hover:text-white font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Pet Playroom & Metrics */}
        <main className="flex-1 flex flex-col justify-between pb-24">
          {/* Animated Pet Stage */}
          <PetDisplay
            pet={activePet}
            petDef={activePetDef}
            onPet={petGrundy}
            isEating={isEating}
          />

          {/* Core Metrics HUD: Hunger, Energy, Happiness */}
          <MetricBars pet={activePet} onRestClick={toggleSleep} />
        </main>

        {/* Bottom Interactive Action Dock */}
        <nav className="fixed bottom-0 max-w-md w-full px-4 py-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-between gap-2 z-30">
          {/* Feed Button */}
          <button
            onClick={() => setIsFoodOpen(true)}
            className="flex-1 py-2.5 px-2 bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition"
          >
            <span className="text-xl leading-none">🍎</span>
            <span className="text-[11px] uppercase tracking-wide">Feed</span>
          </button>

          {/* Play Mini-Game Button */}
          <button
            onClick={() => setIsMiniGameOpen(true)}
            className="flex-1 py-2.5 px-2 bg-gradient-to-b from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition"
          >
            <span className="text-xl leading-none">🎮</span>
            <span className="text-[11px] uppercase tracking-wide">Play</span>
          </button>

          {/* Sleep / Rest Button */}
          <button
            onClick={toggleSleep}
            className={`flex-1 py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition border font-bold ${
              activePet.isSleeping
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border-slate-700'
            }`}
          >
            <span className="text-xl leading-none">{activePet.isSleeping ? '☀️' : '💤'}</span>
            <span className="text-[11px] uppercase tracking-wide">
              {activePet.isSleeping ? 'Wake' : 'Rest'}
            </span>
          </button>

          {/* Clean Button */}
          <button
            onClick={cleanPet}
            className="flex-1 py-2.5 px-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition"
          >
            <span className="text-xl leading-none">🧼</span>
            <span className="text-[11px] uppercase tracking-wide">Clean</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={() => setIsShopOpen(true)}
            className="flex-1 py-2.5 px-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition"
          >
            <span className="text-xl leading-none">🏪</span>
            <span className="text-[11px] uppercase tracking-wide">Shop</span>
          </button>
        </nav>

        {/* Modals & Drawers */}
        <FoodDrawer
          isOpen={isFoodOpen}
          onClose={() => setIsFoodOpen(false)}
          inventory={inventory}
          activePetDef={activePetDef}
          onFeed={handleFeed}
          onOpenShop={() => setIsShopOpen(true)}
        />

        <MiniGameModal
          isOpen={isMiniGameOpen}
          onClose={() => setIsMiniGameOpen(false)}
          petDef={activePetDef}
          energy={activePet.energy}
          onFinishGame={(score) => playMiniGame(score)}
        />

        <ShopModal
          isOpen={isShopOpen}
          onClose={() => setIsShopOpen(false)}
          coins={currencies.coins}
          gems={currencies.gems}
          onBuy={(foodId) => buyFood(foodId, 1)}
        />

        <PetSelectorModal
          isOpen={isPetSelectorOpen}
          onClose={() => setIsPetSelectorOpen(false)}
          activePetId={activePetId}
          unlockedPetIds={unlockedPetIds}
          petStates={petStates}
          gems={currencies.gems}
          onSwitchPet={switchPet}
          onUnlockPet={unlockPet}
        />

        <DevPanel
          isOpen={isDevOpen}
          onClose={() => setIsDevOpen(false)}
          pet={activePet}
          onSetMetric={setMetric}
          onAddCoins={addCoins}
          onAddGems={addGems}
          onFillInventory={fillInventory}
          onReset={resetGame}
        />
      </div>
    </div>
  );
};

export default App;
