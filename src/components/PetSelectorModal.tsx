import React from 'react';
import { PetDefinition, PetState } from '../types';
import { PETS } from '../data/pets';

interface PetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePetId: string;
  unlockedPetIds: string[];
  petStates: Record<string, PetState>;
  gems: number;
  onSwitchPet: (petId: string) => void;
  onUnlockPet: (petId: string) => void;
}

export const PetSelectorModal: React.FC<PetSelectorModalProps> = ({
  isOpen,
  onClose,
  activePetId,
  unlockedPetIds,
  petStates,
  gems,
  onSwitchPet,
  onUnlockPet,
}) => {
  if (!isOpen) return null;

  const allPets = Object.values(PETS);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <h3 className="font-bold text-white text-base">Select Your Grundy</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Pet List */}
        <div className="overflow-y-auto space-y-2.5 my-3 pr-1 flex-1">
          {allPets.map((petDef: PetDefinition) => {
            const isUnlocked = unlockedPetIds.includes(petDef.id);
            const isActive = activePetId === petDef.id;
            const petState = petStates[petDef.id];
            const canUnlockWithGems = gems >= petDef.gemCost;

            return (
              <div
                key={petDef.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-amber-500/10 border-amber-400/80 shadow-md'
                    : isUnlocked
                    ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl shadow-inner border"
                    style={{
                      backgroundColor: `${petDef.color}25`,
                      borderColor: petDef.color,
                    }}
                  >
                    <span>{petDef.emoji}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-xs">{petDef.name}</h4>
                      {isActive && (
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">{petDef.personality}</p>
                    <p className="text-[10px] text-amber-300/80 mt-0.5 font-medium">
                      ⭐ {petDef.abilityName}
                    </p>
                    {isUnlocked && petState && (
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-300">
                        <span>Lv. {petState.level}</span>
                        <span>•</span>
                        <span>🍖 {Math.round(petState.hunger)}%</span>
                        <span>•</span>
                        <span>⚡ {Math.round(petState.energy)}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action button */}
                {isActive ? (
                  <span className="text-xs font-bold text-amber-400 px-2">Selected</span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      onSwitchPet(petDef.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-700 hover:bg-slate-600 text-white transition active:scale-95"
                  >
                    Switch
                  </button>
                ) : (
                  <button
                    disabled={!canUnlockWithGems}
                    onClick={() => onUnlockPet(petDef.id)}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      canUnlockWithGems
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <span>{petDef.gemCost}</span>
                    <span>💎</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
