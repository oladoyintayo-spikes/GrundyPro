# Grundy Web Prototype

A playable React/TypeScript prototype to validate Grundy's core mechanics before Unity production.

---

## 🎮 Quick Play

The prototype is also available as a single-file React component that can run in Claude artifacts or any React environment.

---

## 🚀 Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

---

## 📁 Project Structure

```
grundy-web-prototype/
├── src/
│   ├── types/           # TypeScript interfaces
│   │   └── index.ts
│   ├── data/            # Game data (from YAML specs)
│   │   ├── config.ts    # Game configuration
│   │   ├── pets.ts      # Pet definitions
│   │   └── foods.ts     # Food items
│   ├── game/            # Core game logic
│   │   ├── systems.ts   # Pure game functions
│   │   └── store.ts     # Zustand state management
│   ├── components/      # React components (TODO)
│   └── GrundyPrototype.tsx  # Complete single-file version
├── specs/               # YAML specs (shared with Unity)
├── CODEX_WEB.md         # AI development guide
├── package.json
└── README.md
```

---

## ✅ What's Implemented

| Feature | Status |
|---------|--------|
| Pet display with mood | ✅ |
| Food inventory | ✅ |
| Feeding mechanics | ✅ |
| Reaction calculation | ✅ |
| XP & leveling | ✅ |
| Bond system | ✅ |
| Hunger decay | ✅ |
| Mood changes | ✅ |
| Coin rewards | ✅ |
| Basic shop | ✅ |
| Level up celebration | ✅ |
| Evolution stages | ✅ |
| LocalStorage save | ✅ |
| Multiple pets | ✅ |

---

## 🎯 Prototype Goals

1. **Validate core loop feels fun**
   - Is feeding satisfying?
   - Are reactions clear?
   - Does progression feel rewarding?

2. **Test economy balance**
   - Are coin rewards appropriate?
   - Can players afford food?
   - Is the grind acceptable?

3. **Verify formulas**
   - XP curve feels right
   - Hunger decay rate is good
   - Mood impacts are noticeable

---

## 📊 Specs Reference

All game data comes from the shared YAML specs:

| Spec | What it defines |
|------|-----------------|
| `game_config.yaml` | XP formula, hunger decay, evolution levels |
| `pets.yaml` | Pet definitions, favorites, personality |
| `foods.yaml` | Food items, XP values, costs |
| `economy.yaml` | Currency balance, rewards |

---

## 🔄 Mapping to Unity

| Web (TypeScript) | Unity (C#) |
|------------------|------------|
| `store.ts` | `GameManager` + `SaveManager` |
| `systems.ts` | Individual manager classes |
| `PetState` type | `PetManager` |
| `Food` type | `FoodDefinition` ScriptableObject |
| React components | Unity UI + prefabs |
| localStorage | Encrypted file save |

---

## 🧪 Testing Balance

After playing, document:

```markdown
## Playtest Notes

### What Felt Good
- [ ] XP gain rate
- [ ] Coin rewards
- [ ] Hunger decay speed

### What Needs Adjustment
- [ ] Issue: ...
- [ ] Suggested fix: ...

### Carry to Unity
- Exact values that felt right
- Timing that worked
- UI patterns that clicked
```

---

## 🛠️ Development

### Add a new food

1. Edit `src/data/foods.ts`
2. Add entry following the pattern
3. Test in browser

### Adjust XP formula

1. Edit `src/data/config.ts`
2. Modify `xpFormula` values
3. Test progression

### Change reaction logic

1. Edit `src/game/systems.ts`
2. Modify `calculateReaction()`
3. Verify with different pet/food combos

---

## 📦 Build for Sharing

```bash
npm run build
# Output in dist/ folder
# Can deploy to Vercel, Netlify, etc.
```

---

*Built to validate mechanics before Unity investment.*
