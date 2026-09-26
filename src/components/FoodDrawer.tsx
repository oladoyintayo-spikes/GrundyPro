import React from 'react';
import { FoodDefinition, PetDefinition } from '../types';
import { FOODS } from '../data/foods';
import { calculateReaction } from '../game/systems';

interface FoodDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Record<string, number>;
  activePetDef: PetDefinition;
  onFeed: (foodId: string) => void;
  onOpenShop: () => void;
}

export const FoodDrawer: React.FC<FoodDrawerProps> = ({
  isOpen,
  onClose,
  inventory,
  activePetDef,
  onFeed,
  onOpenShop,
}) => {
  if (!isOpen) return null;

  const foodItems = Object.values(FOODS);
  const availableCount = Object.values(inventory).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
      {/* Tap backdrop to close */}
      <div className="flex-1" onClick={onClose} />

      <div className="bg-slate-900 border-t border-slate-700/80 rounded-t-3xl max-h-[80vh] flex flex-col shadow-2xl p-4 animate-slideUp">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎒</span>
            <h3 className="font-bold text-white text-base">Food Bag</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
              {availableCount} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenShop();
              }}
              className="text-xs bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/40 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition"
            >
              <span>🛒 Shop</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Pet Taste Hint */}
        <div className="py-2.5 px-3 bg-slate-800/60 rounded-xl my-2 flex items-center justify-between text-xs text-slate-300">
          <div>
            <span className="font-semibold text-amber-300">{activePetDef.name}&apos;s Likes: </span>
            <span>{activePetDef.likes.join(', ')}</span>
          </div>
          <div>
            <span className="font-semibold text-rose-300">Dislikes: </span>
            <span>{activePetDef.dislikes.join(', ')}</span>
          </div>
        </div>

        {/* Foods Grid */}
        <div className="grid grid-cols-2 gap-2.5 overflow-y-auto py-2 pr-1 max-h-[50vh]">
          {foodItems.map((food: FoodDefinition) => {
            const count = inventory[food.id] || 0;
            const reaction = calculateReaction(activePetDef, food);

            let reactionBadge = { text: 'Neutral', bg: 'bg-slate-700/60 text-slate-300' };
            if (reaction === 'loved') {
              reactionBadge = { text: 'Loved 😍', bg: 'bg-pink-500/20 text-pink-300 border border-pink-500/40' };
            } else if (reaction === 'liked') {
              reactionBadge = { text: 'Liked 🥰', bg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' };
            } else if (reaction === 'disliked') {
              reactionBadge = { text: 'Disliked 😖', bg: 'bg-rose-500/20 text-rose-300 border border-rose-500/40' };
            }

            return (
              <button
                key={food.id}
                disabled={count <= 0}
                onClick={() => {
                  onFeed(food.id);
                }}
                className={`relative flex flex-col p-3 rounded-2xl border text-left transition-all ${
                  count > 0
                    ? 'bg-slate-800/90 border-slate-700 hover:border-amber-400/80 active:scale-95 shadow-md'
                    : 'bg-slate-900/60 border-slate-800/60 opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Count Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      count > 0 ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    x{count}
                  </span>
                </div>

                {/* Emoji & Name */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-3xl">{food.emoji}</span>
                  <div>
                    <h4 className="font-bold text-white text-xs leading-tight">{food.name}</h4>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold inline-block mt-0.5 ${reactionBadge.bg}`}>
                      {reactionBadge.text}
                    </span>
                  </div>
                </div>

                {/* Stats Benefit */}
                <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] text-slate-300 pt-1.5 border-t border-slate-700/50">
                  <div className="text-center font-medium">
                    <span className="text-emerald-400">+{food.hungerRestore}</span> 🍖
                  </div>
                  <div className="text-center font-medium">
                    <span className="text-sky-400">+{food.energyRestore}</span> ⚡
                  </div>
                  <div className="text-center font-medium">
                    <span className="text-amber-400">+{food.xp}</span> XP
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
