import React from 'react';
import { PetState } from '../types';
import { getMoodState, MOOD_INFO, xpForLevel } from '../data/config';
import { getBondHearts } from '../game/systems';

interface MetricBarsProps {
  pet: PetState;
  onRestClick: () => void;
}

export const MetricBars: React.FC<MetricBarsProps> = ({ pet, onRestClick }) => {
  const moodState = getMoodState(pet.happiness);
  const moodInfo = MOOD_INFO[moodState];
  const bondInfo = getBondHearts(pet.bond);
  const nextLevelXp = xpForLevel(pet.level);
  const xpPercent = Math.min(100, Math.round((pet.xp / nextLevelXp) * 100));

  // Hunger color coding
  const hungerColor =
    pet.hunger > 60
      ? 'from-emerald-500 to-green-400'
      : pet.hunger > 30
      ? 'from-amber-500 to-yellow-400'
      : 'from-rose-600 to-red-500 animate-pulse';

  // Energy color coding
  const energyColor =
    pet.energy > 60
      ? 'from-sky-500 to-cyan-400'
      : pet.energy > 30
      ? 'from-blue-500 to-sky-400'
      : 'from-indigo-600 to-blue-500';

  // Happiness color coding
  const happinessColor =
    pet.happiness > 70
      ? 'from-pink-500 to-rose-400'
      : pet.happiness > 40
      ? 'from-fuchsia-500 to-purple-400'
      : 'from-slate-500 to-gray-400';

  return (
    <div className="w-full space-y-3 px-4">
      {/* Level & XP Bar Header */}
      <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-3 border border-slate-700/60 shadow-md">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/30 text-amber-200">
              Lv. {pet.level}
            </span>
            <span className="text-slate-300">XP Progress</span>
          </div>
          <span className="text-slate-400 font-medium">
            {pet.xp} / {nextLevelXp} ({xpPercent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${xpPercent}%` }}
          />
        </div>

        {/* Bond Hearts Progress */}
        <div className="mt-2.5 pt-2 border-t border-slate-700/40 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 font-medium mr-1">Bond:</span>
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className={`text-sm transition-transform duration-200 ${
                  index < bondInfo.filled ? 'text-rose-500 scale-110 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]' : 'text-slate-600'
                }`}
              >
                ♥
              </span>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {pet.bond.toFixed(1)} pts
          </span>
        </div>
      </div>

      {/* 3 Core Metric Bars (Hunger, Energy, Happiness) */}
      <div className="grid grid-cols-1 gap-2.5 bg-slate-800/80 backdrop-blur rounded-2xl p-3.5 border border-slate-700/60 shadow-md">
        {/* Metric 1: Hunger / Fullness */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <span className="text-base">🍖</span>
              <span>Hunger (Fullness)</span>
              {pet.hunger < 20 && (
                <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-1.5 py-0.2 rounded font-bold">
                  Starving!
                </span>
              )}
            </div>
            <span className="font-bold text-slate-300">{Math.round(pet.hunger)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className={`h-full bg-gradient-to-r ${hungerColor} rounded-full transition-all duration-300`}
              style={{ width: `${pet.hunger}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Energy */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <span className="text-base">⚡</span>
              <span>Energy</span>
              {pet.isSleeping && (
                <span className="text-[10px] bg-blue-500/20 text-cyan-300 border border-blue-500/40 px-1.5 py-0.2 rounded font-bold animate-pulse">
                  Recharging...
                </span>
              )}
              {pet.energy < 20 && !pet.isSleeping && (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-bold">
                  Exhausted
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">{Math.round(pet.energy)}%</span>
              <button
                onClick={onRestClick}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                  pet.isSleeping
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30'
                    : 'bg-sky-500/20 text-sky-300 border-sky-400/40 hover:bg-sky-500/30'
                }`}
              >
                {pet.isSleeping ? '☀️ Wake Up' : '💤 Rest'}
              </button>
            </div>
          </div>
          <div className="w-full h-3 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className={`h-full bg-gradient-to-r ${energyColor} rounded-full transition-all duration-300`}
              style={{ width: `${pet.energy}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Happiness / Mood */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <span className="text-base">{moodInfo.icon}</span>
              <span>Happiness & Mood</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border bg-slate-900/60 ${moodInfo.color}`}>
                {moodInfo.label} ({moodInfo.mult}x XP)
              </span>
            </div>
            <span className="font-bold text-slate-300">{Math.round(pet.happiness)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className={`h-full bg-gradient-to-r ${happinessColor} rounded-full transition-all duration-300`}
              style={{ width: `${pet.happiness}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
