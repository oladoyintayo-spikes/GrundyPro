import React, { useState, useEffect, useRef } from 'react';
import { PetDefinition } from '../types';
import { GAME_CONFIG } from '../data/config';

interface MiniGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  petDef: PetDefinition;
  energy: number;
  onFinishGame: (score: number) => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
  points: number;
}

const SNACK_EMOJIS = [
  { emoji: '🍎', pts: 10 },
  { emoji: '🍓', pts: 15 },
  { emoji: '🍪', pts: 10 },
  { emoji: '🍦', pts: 20 },
  { emoji: '🌟', pts: 35 },
];

export const MiniGameModal: React.FC<MiniGameModalProps> = ({
  isOpen,
  onClose,
  petDef,
  energy,
  onFinishGame,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [basketX, setBasketX] = useState(50); // percentage 0 - 100
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const canPlay = energy >= GAME_CONFIG.ENERGY_MINIGAME_COST;

  // Start game loop
  const startGame = () => {
    if (!canPlay) return;
    setScore(0);
    setTimeLeft(25);
    setFallingItems([]);
    setGameState('playing');
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Falling items spawner & physics
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const randSnack = SNACK_EMOJIS[Math.floor(Math.random() * SNACK_EMOJIS.length)];
      setFallingItems((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 85 + 5, // 5% to 90%
          y: 0,
          speed: 2 + Math.random() * 2.5,
          emoji: randSnack.emoji,
          points: randSnack.pts,
        },
      ]);
    }, 700);

    const physicsLoop = setInterval(() => {
      setFallingItems((prev) => {
        const next: FallingItem[] = [];
        prev.forEach((item) => {
          const nextY = item.y + item.speed;

          // Check collision with basket at y >= 82%
          if (nextY >= 80 && nextY <= 92) {
            const distance = Math.abs(item.x - basketX);
            if (distance < 14) {
              // Caught!
              setScore((s) => s + item.points);
              return;
            }
          }

          if (nextY < 95) {
            next.push({ ...item, y: nextY });
          }
        });
        return next;
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(physicsLoop);
    };
  }, [gameState, basketX]);

  // Handle touch / mouse movement for basket
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, relativeX)));
  };

  const handleClaim = () => {
    onFinishGame(score);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧺</span>
            <h3 className="font-bold text-white text-base">Snack Catch</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Ready Screen */}
        {gameState === 'ready' && (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="text-5xl mb-3 animate-bounce">🧺</div>
            <h4 className="text-lg font-bold text-white">Catch Yummy Snacks!</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Slide your finger to catch falling treats for {petDef.name}. Boost happiness, earn coins & XP!
            </p>

            <div className="my-5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 w-full space-y-1.5">
              <div className="flex justify-between">
                <span>Energy Cost:</span>
                <span className="font-bold text-sky-400">-{GAME_CONFIG.ENERGY_MINIGAME_COST} ⚡</span>
              </div>
              <div className="flex justify-between">
                <span>Your Energy:</span>
                <span className={`font-bold ${canPlay ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {Math.round(energy)} ⚡
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pet Mood Boost:</span>
                <span className="font-bold text-pink-400">+18 Happiness 😊</span>
              </div>
            </div>

            <button
              disabled={!canPlay}
              onClick={startGame}
              className={`w-full py-3 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                canPlay
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {canPlay ? 'Start Game (25s)' : 'Not Enough Energy (Rest Pet!)'}
            </button>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && (
          <div className="w-full flex flex-col items-center">
            {/* HUD */}
            <div className="w-full flex items-center justify-between py-2 text-xs font-bold px-2">
              <div className="text-amber-400">Score: {score} pts</div>
              <div className="text-sky-300">⏱️ {timeLeft}s</div>
            </div>

            {/* Game Canvas Area */}
            <div
              ref={gameAreaRef}
              onPointerMove={handlePointerMove}
              className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden select-none cursor-pointer touch-none shadow-inner"
            >
              {/* Falling Snacks */}
              {fallingItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute text-2xl transform -translate-x-1/2 pointer-events-none transition-transform"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  {item.emoji}
                </div>
              ))}

              {/* Basket controlled by user */}
              <div
                className="absolute bottom-2 text-3xl transform -translate-x-1/2 transition-transform duration-75 pointer-events-none"
                style={{ left: `${basketX}%` }}
              >
                🧺
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Drag or tap across the screen to move the basket!</p>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="py-6 text-center flex flex-col items-center w-full">
            <div className="text-5xl mb-2">🎉</div>
            <h4 className="text-xl font-bold text-white">Time&apos;s Up!</h4>
            <p className="text-sm font-semibold text-amber-300 mt-1">Final Score: {score} points</p>

            <div className="my-5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 w-full space-y-1.5">
              <div className="flex justify-between">
                <span>Happiness Boost:</span>
                <span className="font-bold text-pink-400">+18 😊</span>
              </div>
              <div className="flex justify-between">
                <span>Bond Gained:</span>
                <span className="font-bold text-rose-400">+0.6 ♥</span>
              </div>
              <div className="flex justify-between">
                <span>Energy Used:</span>
                <span className="font-bold text-sky-400">-{GAME_CONFIG.ENERGY_MINIGAME_COST} ⚡</span>
              </div>
            </div>

            <button
              onClick={handleClaim}
              className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg hover:brightness-110 active:scale-95"
            >
              Claim Rewards & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
