import React from 'react';
import { FoodDefinition } from '../types';
import { FOODS } from '../data/foods';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  gems: number;
  onBuy: (foodId: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  coins,
  gems,
  onBuy,
}) => {
  if (!isOpen) return null;

  const foodList = Object.values(FOODS);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏪</span>
            <h3 className="font-bold text-white text-base">Grundy Mart</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Currency balances */}
        <div className="py-2.5 px-3 bg-slate-800/80 rounded-xl my-3 flex items-center justify-around text-xs font-bold border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-amber-300">
            <span>🪙</span>
            <span>{coins} Coins</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span>💎</span>
            <span>{gems} Gems</span>
          </div>
        </div>

        {/* Items list */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {foodList.map((food: FoodDefinition) => {
            const canAfford = coins >= food.coinCost;

            return (
              <div
                key={food.id}
                className="p-3 bg-slate-800/60 border border-slate-700/70 rounded-2xl flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                    {food.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{food.name}</h4>
                    <p className="text-[10px] text-slate-400">{food.description}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px]">
                      <span className="text-emerald-400">+{food.hungerRestore} 🍖</span>
                      <span className="text-sky-400">+{food.energyRestore} ⚡</span>
                      <span className="text-amber-400">+{food.xp} XP</span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={!canAfford}
                  onClick={() => onBuy(food.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition shadow-sm ${
                    canAfford
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <span>{food.coinCost}</span>
                  <span>🪙</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
