import React, { useEffect } from 'react';
import { FeedReaction } from '../types';

interface ReactionToastProps {
  reaction: FeedReaction | null;
  onDismiss: () => void;
}

export const ReactionToast: React.FC<ReactionToastProps> = ({ reaction, onDismiss }) => {
  useEffect(() => {
    if (!reaction) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [reaction, onDismiss]);

  if (!reaction) return null;

  return (
    <div className="fixed top-14 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-sm animate-slide-down">
      <div className="bg-slate-900/95 border border-amber-400/50 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 text-slate-100">
        <div className="flex items-center gap-3">
          <div className="text-3xl w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
            {reaction.emoji}
          </div>
          <div>
            <div className="text-xs font-bold text-white leading-snug">{reaction.message}</div>
            <div className="flex items-center gap-2 text-[11px] font-semibold mt-1">
              <span className="text-emerald-400">+{reaction.hungerGained} 🍖</span>
              <span className="text-amber-400">+{reaction.xpGained} XP</span>
              <span className="text-rose-400">+{reaction.bondGained} ♥</span>
            </div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white text-sm font-bold px-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
