import { useState } from "react";

type PokemonSelectorProps = {
  options: string[];
  onSelect: (selection: string) => void;
  label: string;
};

const abilityEmojis: Record<string, string> = {
  Pikachu: "⚡",
  Charmander: "🔥",
  Bulbasaur: "🌱",
  Squirtle: "💧",
  Fire: "🔥",
  Water: "💧",
  Flying: "🦅",
  Electric: "⚡",
  Grass: "🌿",
  Ice: "❄️",
};

const abilityColors: Record<string, string> = {
  Pikachu: "from-yellow-400 to-orange-400",
  Charmander: "from-red-400 to-orange-500",
  Bulbasaur: "from-green-400 to-teal-500",
  Squirtle: "from-blue-400 to-cyan-500",
  Fire: "from-red-400 to-orange-500",
  Water: "from-blue-400 to-cyan-500",
  Flying: "from-sky-400 to-indigo-400",
  Electric: "from-yellow-400 to-amber-500",
  Grass: "from-green-400 to-emerald-500",
  Ice: "from-cyan-300 to-blue-400",
};

export default function PokemonSelector({ options, onSelect, label }: PokemonSelectorProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="space-y-3">
      <label 
        id={`selector-${label.replace(/\s+/g, '-').toLowerCase()}`}
        className="font-bold text-lg text-gray-800 block"
      >
        {label}
      </label>
      <div 
        className="grid grid-cols-2 gap-3"
        role="radiogroup"
        aria-labelledby={`selector-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`relative px-4 py-6 rounded-2xl font-bold text-lg transition-all transform border-4 ${
              selected === opt 
                ? `bg-gradient-to-br ${abilityColors[opt] || "from-purple-400 to-pink-400"} text-white border-white shadow-2xl scale-105` 
                : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-lg hover:scale-102"
            }`}
            onClick={() => {
              setSelected(opt);
              onSelect(opt);
            }}
            role="radio"
            aria-checked={selected === opt}
            aria-label={`Seleccionar ${opt}`}
          >
            <span className="text-3xl block mb-2" aria-hidden="true">
              {abilityEmojis[opt] || "✨"}
            </span>
            {opt}
            {selected === opt && (
              <span className="absolute top-2 right-2 text-2xl animate-bounce" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}