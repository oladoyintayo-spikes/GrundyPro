import React from 'react';
import { PetState } from '../types';

interface DevPanelProps {
  isOpen: boolean;
  onClose: () => void;
  pet: PetState;
  onSetMetric: (metric: 'hunger' | 'energy' | 'happiness' | 'bond', val: number) => void;
  onAddCoins: (amt: number) => void;
  onAddGems: (amt: number) => void;
  onFillInventory: () => void;
  onReset: () => void;
}

export const DevPanel: React.FC<DevPanelProps> = ({
  isOpen,
  onClose,
  pet,
  onSetMetric,
  onAddCoins,
  onAddGems,
  onFillInventory,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛠️</span>
            <h3 className="font-bold text-emerald-400 text-sm">Dev & Testing Controls</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto space-y-4 my-3 pr-1 text-xs">
          {/* Hunger Metric Slider */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between font-bold text-slate-200 mb-1">
              <span>🍖 Hunger (Fullness):</span>
              <span className="text-emerald-400">{Math.round(pet.hunger)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(pet.hunger)}
              onChange={(e) => onSetMetric('hunger', Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <button
                onClick={() => onSetMetric('hunger', 10)}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-red-300"
              >
                Set 10% (Starving)
              </button>
              <button
                onClick={() => onSetMetric('hunger', 100)}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-emerald-300"
              >
                Set 100% (Full)
              </button>
            </div>
          </div>

          {/* Energy Metric Slider */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between font-bold text-slate-200 mb-1">
              <span>⚡ Energy:</span>
              <span className="text-sky-400">{Math.round(pet.energy)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(pet.energy)}
              onChange={(e) => onSetMetric('energy', Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <button
                onClick={() => onSetMetric('energy', 10)}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-amber-300"
              >
                Set 10% (Tired)
              </button>
              <button
                onClick={() => onSetMetric('energy', 100)}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-sky-300"
              >
                Set 100% (Max)
              </button>
            </div>
          </div>

          {/* Happiness Metric Slider */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between font-bold text-slate-200 mb-1">
              <span>😊 Happiness:</span>
              <span className="text-pink-400">{Math.round(pet.happiness)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(pet.happiness)}
              onChange={(e) => onSetMetric('happiness', Number(e.target.value))}
              className="w-full accent-pink-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <button
                onClick={() => onSetMetric('happiness', 15)}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-red-300"
              >
                Set 15% (Grumpy)
              </button>
              <button
                onClick={() => onSetMetric('happiness', 100)}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-pink-300"
              >
                Set 100% (Ecstatic)
              </button>
            </div>
          </div>

          {/* Quick Cheats */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddCoins(100)}
              className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold hover:bg-amber-500/30"
            >
              +100 Coins 🪙
            </button>
            <button
              onClick={() => onAddGems(25)}
              className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold hover:bg-cyan-500/30"
            >
              +25 Gems 💎
            </button>
            <button
              onClick={onFillInventory}
              className="col-span-2 p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold hover:bg-emerald-500/30"
            >
              Fill Food Bag (+10 Each) 🎒
            </button>
            <button
              onClick={onReset}
              className="col-span-2 p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold hover:bg-rose-500/30"
            >
              Reset All Save Data ⚠️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
