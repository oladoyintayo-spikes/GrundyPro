import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PetState, FeedReaction } from '../types';
import { PETS } from '../data/pets';
import { FOODS } from '../data/foods';
import { GAME_CONFIG } from '../data/config';
import { evaluateFeeding, checkLevelUp, calculateStage } from './systems';

interface GameNotification {
  id: string;
  title: string;
  desc: string;
  type: 'level' | 'info' | 'reward' | 'warning';
}

interface GameStoreState {
  activePetId: string;
  petStates: Record<string, PetState>;
  unlockedPetIds: string[];
  currencies: {
    coins: number;
    gems: number;
  };
  inventory: Record<string, number>;
  lastFeedReaction: FeedReaction | null;
  notification: GameNotification | null;
  lastPettingTime: number;

  // Actions
  switchPet: (petId: string) => void;
  feedPet: (foodId: string) => FeedReaction | null;
  petGrundy: () => { success: boolean; message: string };
  toggleSleep: () => void;
  cleanPet: () => void;
  playMiniGame: (score: number) => { coinsWon: number; xpWon: number; tier: string };
  buyFood: (foodId: string, quantity?: number) => boolean;
  unlockPet: (petId: string) => boolean;
  clearNotification: () => void;
  setNotification: (notif: GameNotification | null) => void;
  clearLastReaction: () => void;
  tick: (deltaSeconds: number) => void;

  // Dev actions
  setMetric: (metric: 'hunger' | 'energy' | 'happiness' | 'bond', value: number) => void;
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  fillInventory: () => void;
  resetGame: () => void;
}

function createDefaultPetState(id: string): PetState {
  return {
    id,
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
}

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      activePetId: 'munchlet',
      unlockedPetIds: ['munchlet', 'grib', 'plompo'],
      currencies: {
        coins: 120,
        gems: 10,
      },
      inventory: {
        apple: 5,
        biscuit: 4,
        berry: 3,
        spicy_pepper: 1,
        ice_cream: 1,
      },
      petStates: {
        munchlet: createDefaultPetState('munchlet'),
        grib: createDefaultPetState('grib'),
        plompo: createDefaultPetState('plompo'),
      },
      lastFeedReaction: null,
      notification: null,
      lastPettingTime: 0,

      switchPet: (petId: string) => {
        const { unlockedPetIds, petStates } = get();
        if (!unlockedPetIds.includes(petId)) return;

        let nextStates = { ...petStates };
        if (!nextStates[petId]) {
          nextStates[petId] = createDefaultPetState(petId);
        }

        set({
          activePetId: petId,
          petStates: nextStates,
          lastFeedReaction: null,
        });
      },

      feedPet: (foodId: string) => {
        const { activePetId, petStates, inventory, currencies } = get();
        const petDef = PETS[activePetId];
        const food = FOODS[foodId];
        const pet = petStates[activePetId] || createDefaultPetState(activePetId);

        if (!petDef || !food) return null;
        if (!inventory[foodId] || inventory[foodId] <= 0) return null;

        // Wake pet up if sleeping
        const wasSleeping = pet.isSleeping;

        // Evaluate reaction
        const reactionResult = evaluateFeeding(petDef, pet.hunger, pet.happiness, food);

        // Apply stat updates
        const updatedHunger = Math.min(100, Math.max(0, pet.hunger + reactionResult.hungerGained));
        const updatedEnergy = Math.min(100, Math.max(0, pet.energy + reactionResult.energyGained));
        const updatedHappiness = Math.min(100, Math.max(0, pet.happiness + reactionResult.happinessGained));
        const updatedBond = Number((pet.bond + reactionResult.bondGained).toFixed(2));
        const updatedTotalXp = pet.xp + reactionResult.xpGained;

        // Check for level up
        const levelUpCheck = checkLevelUp(pet.level, updatedTotalXp);
        const newLevel = levelUpCheck.newLevel;
        const newXp = levelUpCheck.remainingXp;
        const newStage = calculateStage(newLevel);

        let newCoins = currencies.coins;
        let newGems = currencies.gems;
        let notif: GameNotification | null = null;

        if (levelUpCheck.leveledUp) {
          newCoins += levelUpCheck.rewards.coins;
          newGems += levelUpCheck.rewards.gems;
          notif = {
            id: `lvl-${Date.now()}`,
            title: `🎉 ${petDef.name} Leveled Up to Lv.${newLevel}!`,
            desc: `Reward: +${levelUpCheck.rewards.coins} Coins, +${levelUpCheck.rewards.gems} Gems! ${
              newStage !== pet.stage ? `⭐ ${petDef.name} evolved into ${newStage.toUpperCase()} form!` : ''
            }`,
            type: 'level',
          };
        }

        const nextInventory = {
          ...inventory,
          [foodId]: inventory[foodId] - 1,
        };

        const updatedPet: PetState = {
          ...pet,
          hunger: updatedHunger,
          energy: updatedEnergy,
          happiness: updatedHappiness,
          bond: updatedBond,
          level: newLevel,
          xp: newXp,
          stage: newStage,
          isSleeping: false, // waking up to eat
          totalFed: pet.totalFed + 1,
          lastFedTimestamp: Date.now(),
        };

        set({
          petStates: {
            ...petStates,
            [activePetId]: updatedPet,
          },
          inventory: nextInventory,
          currencies: {
            coins: newCoins,
            gems: newGems,
          },
          lastFeedReaction: reactionResult,
          notification: notif || get().notification,
        });

        return reactionResult;
      },

      petGrundy: () => {
        const { activePetId, petStates, lastPettingTime } = get();
        const now = Date.now();
        if (now - lastPettingTime < 1000) {
          return { success: false, message: 'Too quick!' };
        }

        const pet = petStates[activePetId] || createDefaultPetState(activePetId);
        const petDef = PETS[activePetId];

        // Extra happiness & bond
        const nextHappiness = Math.min(100, pet.happiness + GAME_CONFIG.PET_HAPPINESS_GAIN);
        const bondGain = petDef.id === 'munchlet' ? GAME_CONFIG.PET_BOND_GAIN * 1.1 : GAME_CONFIG.PET_BOND_GAIN;
        const nextBond = Number((pet.bond + bondGain).toFixed(2));

        set({
          lastPettingTime: now,
          petStates: {
            ...petStates,
            [activePetId]: {
              ...pet,
              happiness: nextHappiness,
              bond: nextBond,
            },
          },
        });

        return {
          success: true,
          message: `${petDef.name} purrs with delight! (+${GAME_CONFIG.PET_HAPPINESS_GAIN} Happiness)`,
        };
      },

      toggleSleep: () => {
        const { activePetId, petStates } = get();
        const pet = petStates[activePetId] || createDefaultPetState(activePetId);
        const petDef = PETS[activePetId];

        const nextSleeping = !pet.isSleeping;

        set({
          petStates: {
            ...petStates,
            [activePetId]: {
              ...pet,
              isSleeping: nextSleeping,
            },
          },
          notification: {
            id: `sleep-${Date.now()}`,
            title: nextSleeping ? `💤 ${petDef.name} is resting` : `☀️ ${petDef.name} woke up!`,
            desc: nextSleeping
              ? 'Energy will recharge rapidly while sleeping!'
              : 'Ready for more adventures and treats!',
            type: 'info',
          },
        });
      },

      cleanPet: () => {
        const { activePetId, petStates } = get();
        const pet = petStates[activePetId] || createDefaultPetState(activePetId);
        const petDef = PETS[activePetId];

        const nextCleanliness = 100;
        const nextHappiness = Math.min(100, pet.happiness + GAME_CONFIG.CLEAN_HAPPINESS_GAIN);
        const nextBond = Number((pet.bond + 0.2).toFixed(2));

        set({
          petStates: {
            ...petStates,
            [activePetId]: {
              ...pet,
              cleanliness: nextCleanliness,
              happiness: nextHappiness,
              bond: nextBond,
            },
          },
          notification: {
            id: `clean-${Date.now()}`,
            title: `✨ Sparkly Clean!`,
            desc: `${petDef.name} looks fresh and sparkling! (+${GAME_CONFIG.CLEAN_HAPPINESS_GAIN} Happiness)`,
            type: 'info',
          },
        });
      },

      playMiniGame: (score: number) => {
        const { activePetId, petStates, currencies } = get();
        const pet = petStates[activePetId] || createDefaultPetState(activePetId);
        const petDef = PETS[activePetId];

        // Mini-game reward tiers
        let tier = 'Bronze';
        let baseCoins = 8;
        let baseGems = 0;
        let xpGained = 20;

        if (score >= 200) {
          tier = 'Rainbow';
          baseCoins = 35;
          baseGems = 1;
          xpGained = 80;
        } else if (score >= 120) {
          tier = 'Gold';
          baseCoins = 24;
          xpGained = 50;
        } else if (score >= 60) {
          tier = 'Silver';
          baseCoins = 14;
          xpGained = 35;
        }

        // Ember passive: +20% coins
        if (petDef.id === 'ember') {
          baseCoins = Math.round(baseCoins * 1.2);
        }

        const energyCost = GAME_CONFIG.ENERGY_MINIGAME_COST;
        const updatedEnergy = Math.max(0, pet.energy - energyCost);
        const updatedHappiness = Math.min(100, pet.happiness + 18);
        const updatedBond = Number((pet.bond + 0.6).toFixed(2));
        const updatedTotalXp = pet.xp + xpGained;

        // Level up check
        const levelUpCheck = checkLevelUp(pet.level, updatedTotalXp);
        const finalCoins = currencies.coins + baseCoins + levelUpCheck.rewards.coins;
        const finalGems = currencies.gems + baseGems + levelUpCheck.rewards.gems;

        const updatedPet: PetState = {
          ...pet,
          energy: updatedEnergy,
          happiness: updatedHappiness,
          bond: updatedBond,
          level: levelUpCheck.newLevel,
          xp: levelUpCheck.remainingXp,
          stage: calculateStage(levelUpCheck.newLevel),
        };

        set({
          petStates: {
            ...petStates,
            [activePetId]: updatedPet,
          },
          currencies: {
            coins: finalCoins,
            gems: finalGems,
          },
          notification: {
            id: `game-${Date.now()}`,
            title: `🏆 ${tier} Score! +${baseCoins} Coins`,
            desc: `Gained +${xpGained} XP, +18 Happiness! (-${energyCost} Energy)`,
            type: 'reward',
          },
        });

        return { coinsWon: baseCoins, xpWon: xpGained, tier };
      },

      buyFood: (foodId: string, quantity = 1) => {
        const { currencies, inventory } = get();
        const food = FOODS[foodId];
        if (!food) return false;

        const totalCost = food.coinCost * quantity;
        if (currencies.coins < totalCost) {
          set({
            notification: {
              id: `broke-${Date.now()}`,
              title: 'Not enough Coins!',
              desc: `Need ${totalCost} coins to buy ${food.name}. Play games or level up to earn more!`,
              type: 'warning',
            },
          });
          return false;
        }

        set({
          currencies: {
            ...currencies,
            coins: currencies.coins - totalCost,
          },
          inventory: {
            ...inventory,
            [foodId]: (inventory[foodId] || 0) + quantity,
          },
          notification: {
            id: `bought-${Date.now()}`,
            title: `Bought ${food.name} x${quantity}!`,
            desc: `Added to your Food Bag. (-${totalCost} coins)`,
            type: 'reward',
          },
        });

        return true;
      },

      unlockPet: (petId: string) => {
        const { unlockedPetIds, currencies, petStates } = get();
        const petDef = PETS[petId];
        if (!petDef || unlockedPetIds.includes(petId)) return false;

        if (currencies.gems < petDef.gemCost) {
          set({
            notification: {
              id: `gem-fail-${Date.now()}`,
              title: `Need ${petDef.gemCost} 💎 Gems!`,
              desc: `You need ${petDef.gemCost} gems to unlock ${petDef.name}.`,
              type: 'warning',
            },
          });
          return false;
        }

        const nextPetStates = { ...petStates };
        if (!nextPetStates[petId]) {
          nextPetStates[petId] = createDefaultPetState(petId);
        }

        set({
          currencies: {
            ...currencies,
            gems: currencies.gems - petDef.gemCost,
          },
          unlockedPetIds: [...unlockedPetIds, petId],
          activePetId: petId,
          petStates: nextPetStates,
          notification: {
            id: `unlock-${Date.now()}`,
            title: `🎊 Unlocked ${petDef.name}!`,
            desc: `Special: ${petDef.abilityName} - ${petDef.abilityDesc}`,
            type: 'level',
          },
        });

        return true;
      },

      clearNotification: () => set({ notification: null }),
      setNotification: (notif) => set({ notification: notif }),
      clearLastReaction: () => set({ lastFeedReaction: null }),

      // Real-time game loop tick
      tick: (deltaSeconds: number) => {
        const { activePetId, petStates } = get();
        const pet = petStates[activePetId];
        if (!pet) return;

        const petDef = PETS[activePetId] || PETS.munchlet;

        // 1. Hunger decay
        const hungerSpeed = petDef.hungerDecayRate || 1.0;
        const hungerDecayRate = pet.isSleeping
          ? GAME_CONFIG.HUNGER_DECAY_PER_SEC * GAME_CONFIG.HUNGER_SLEEP_DECAY_MULT
          : GAME_CONFIG.HUNGER_DECAY_PER_SEC;
        const hungerLoss = hungerDecayRate * hungerSpeed * deltaSeconds;
        const newHunger = Math.max(0, pet.hunger - hungerLoss);

        // 2. Energy recovery or drain
        let newEnergy = pet.energy;
        if (pet.isSleeping) {
          const sleepMult = petDef.id === 'plompo' ? 1.3 : 1.0;
          newEnergy = Math.min(100, pet.energy + GAME_CONFIG.ENERGY_SLEEP_RECOVERY_PER_SEC * sleepMult * deltaSeconds);
        } else {
          newEnergy = Math.max(0, pet.energy - GAME_CONFIG.ENERGY_ACTIVE_DRAIN_PER_SEC * deltaSeconds);
        }

        // 3. Happiness dynamics
        let happinessLoss = GAME_CONFIG.HAPPINESS_PASSIVE_DECAY_PER_SEC * deltaSeconds;

        // Hunger penalty if starving (< 20%)
        if (newHunger < 20) {
          const hungerPenalty = petDef.id === 'grib' ? 0.04 : GAME_CONFIG.HAPPINESS_STARVATION_PENALTY_PER_SEC;
          happinessLoss += hungerPenalty * deltaSeconds;
        }

        // Exhaustion penalty if energy < 15%
        if (newEnergy < 15) {
          happinessLoss += GAME_CONFIG.HAPPINESS_EXHAUSTION_PENALTY_PER_SEC * deltaSeconds;
        }

        // Comfort replenishment if healthy, well-fed (> 60%) and rested (> 60%)
        let happinessBonus = 0;
        if (newHunger > 60 && newEnergy > 60 && !pet.isSleeping) {
          happinessBonus = 0.02 * deltaSeconds;
        }

        const newHappiness = Math.max(0, Math.min(100, pet.happiness - happinessLoss + happinessBonus));

        // 4. Cleanliness decay
        const newCleanliness = Math.max(0, pet.cleanliness - GAME_CONFIG.CLEANLINESS_DECAY_PER_SEC * deltaSeconds);

        set({
          petStates: {
            ...petStates,
            [activePetId]: {
              ...pet,
              hunger: Number(newHunger.toFixed(2)),
              energy: Number(newEnergy.toFixed(2)),
              happiness: Number(newHappiness.toFixed(2)),
              cleanliness: Number(newCleanliness.toFixed(2)),
              lastTickedTimestamp: Date.now(),
            },
          },
        });
      },

      // Dev tools for rapid testing
      setMetric: (metric, value) => {
        const { activePetId, petStates } = get();
        const pet = petStates[activePetId];
        if (!pet) return;

        set({
          petStates: {
            ...petStates,
            [activePetId]: {
              ...pet,
              [metric]: Math.max(0, Math.min(100, value)),
            },
          },
        });
      },

      addCoins: (amount) => {
        const { currencies } = get();
        set({
          currencies: {
            ...currencies,
            coins: Math.max(0, currencies.coins + amount),
          },
        });
      },

      addGems: (amount) => {
        const { currencies } = get();
        set({
          currencies: {
            ...currencies,
            gems: Math.max(0, currencies.gems + amount),
          },
        });
      },

      fillInventory: () => {
        const full: Record<string, number> = {};
        Object.keys(FOODS).forEach((id) => {
          full[id] = 10;
        });
        set({ inventory: full });
      },

      resetGame: () => {
        localStorage.removeItem('grundy-game-state');
        set({
          activePetId: 'munchlet',
          unlockedPetIds: ['munchlet', 'grib', 'plompo'],
          currencies: { coins: 120, gems: 10 },
          inventory: { apple: 5, biscuit: 4, berry: 3, spicy_pepper: 1, ice_cream: 1 },
          petStates: {
            munchlet: createDefaultPetState('munchlet'),
            grib: createDefaultPetState('grib'),
            plompo: createDefaultPetState('plompo'),
          },
          lastFeedReaction: null,
          notification: null,
        });
      },
    }),
    {
      name: 'grundy-game-state',
      partialize: (state) => ({
        activePetId: state.activePetId,
        unlockedPetIds: state.unlockedPetIds,
        currencies: state.currencies,
        inventory: state.inventory,
        petStates: state.petStates,
      }),
    }
  )
);
