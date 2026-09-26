import React, { useState } from 'react';
import { PetState, PetDefinition } from '../types';
import { getMoodState, MOOD_INFO } from '../data/config';

interface PetDisplayProps {
  pet: PetState;
  petDef: PetDefinition;
  onPet: () => void;
  isEating?: boolean;
}

export const PetDisplay: React.FC<PetDisplayProps> = ({ pet, petDef, onPet, isEating }) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  const moodState = getMoodState(pet.happiness);
  const moodInfo = MOOD_INFO[moodState];

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressed(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now(), x, y };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    onPet();
  };

  const handlePointerUp = () => setIsPressed(false);

  // Determine current pet expression / animation
  let animationClass = 'animate-idle';
  let speechBubbleText = '';

  if (pet.isSleeping) {
    animationClass = 'animate-sleeping';
    speechBubbleText = 'Zzz... 💭💤';
  } else if (isEating) {
    animationClass = 'animate-eating';
    speechBubbleText = 'Nom nom nom! 😋';
  } else if (pet.hunger < 20) {
    animationClass = 'animate-hungry';
    speechBubbleText = '*Tummy rumbles* So hungry... 🥺';
  } else if (pet.energy < 20) {
    animationClass = 'animate-sad';
    speechBubbleText = '*Yawns* So sleepy... 🥱';
  } else if (moodState === 'ecstatic') {
    animationClass = 'animate-happy';
    speechBubbleText = 'Having so much fun! ✨🥰';
  } else if (moodState === 'happy') {
    animationClass = 'animate-idle';
    speechBubbleText = 'Feeling wonderful! 🐾';
  } else if (moodState === 'grumpy') {
    animationClass = 'animate-sick';
    speechBubbleText = 'Hmph! Needs some care... 😤';
  }

  // Size scaling based on evolution stage
  const stageScale = pet.stage === 'evolved' ? 'scale-110' : pet.stage === 'youth' ? 'scale-100' : 'scale-90';

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* Speech Thought Bubble */}
      {speechBubbleText && (
        <div className="mb-3 px-3 py-1.5 bg-slate-800/90 text-slate-100 text-xs font-semibold rounded-2xl border border-slate-700/80 shadow-lg shadow-black/40 animate-bounce-subtle flex items-center gap-1.5">
          <span>{speechBubbleText}</span>
        </div>
      )}

      {/* Pet Interactive Arena */}
      <div
        className={`relative w-44 h-44 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-150 ${stageScale} ${
          isPressed ? 'scale-95' : 'active:scale-95'
        }`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Ambient Pet Glow */}
        <div
          className="absolute inset-2 rounded-full blur-2xl opacity-40 transition-colors duration-500"
          style={{ backgroundColor: petDef.color }}
        />

        {/* Circular Pet Habitat Bed */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/60 shadow-inner flex items-center justify-center">
          {/* Shadow beneath pet */}
          <div className="absolute bottom-6 w-24 h-6 rounded-full bg-black/40 blur-sm transform scale-y-50" />
        </div>

        {/* The Pet Avatar */}
        <div className={`relative flex flex-col items-center justify-center z-10 ${animationClass}`}>
          {/* Sleep Cap / Floating Zzz */}
          {pet.isSleeping && (
            <div className="absolute -top-6 -right-2 text-2xl animate-float opacity-90 select-none">
              💤
            </div>
          )}

          {/* Large Emoji / Creature Avatar */}
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-6xl shadow-2xl transition-all duration-300"
            style={{
              backgroundColor: `${petDef.color}25`,
              border: `3px solid ${petDef.color}`,
              boxShadow: `0 10px 25px ${petDef.color}35`,
            }}
          >
            <span>{petDef.emoji}</span>
          </div>

          {/* Status expression indicator underneath */}
          <div className="mt-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] font-medium text-slate-300">
            <span>{moodInfo.icon}</span>
            <span>{moodInfo.label}</span>
          </div>
        </div>

        {/* Floating Heart Particles on Petting */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute text-xl pointer-events-none animate-float-heart"
            style={{ left: h.x, top: h.y }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Pet Name & Trait */}
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-bold text-white tracking-wide">{petDef.name}</h2>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {pet.stage}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{petDef.personality}</p>
      </div>
    </div>
  );
};
