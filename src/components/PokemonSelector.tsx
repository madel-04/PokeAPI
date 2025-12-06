import { useState } from "react";

type PokemonSelectorProps = {
  options: string[];
  onSelect: (selection: string) => void;
  label: string;
};

// ✅ Emojis solo para Pokémon verificados
const abilityEmojis: Record<string, string> = {
  // Gen 1
  Pikachu: "⚡",
  Charmander: "🔥",
  Bulbasaur: "🌱",
  Squirtle: "💧",
  Eevee: "🦊",
  Mewtwo: "🧬",
  Gengar: "👻",
  Dragonite: "🐲",
  
  // Gen 2
  Umbreon: "🌙",
  Espeon: "☀️",
  Tyranitar: "⛰️",
  
  // Gen 3
  Blaziken: "🔥",
  Sceptile: "🦎",
  Rayquaza: "🐉",
  Gardevoir: "✨",
  
  // Gen 4
  Lucario: "🐺",
  Garchomp: "🦈",
  
  // Gen 6
  Greninja: "🐸",
  Sylveon: "🎀",
  
  // Habilidades
  Fire: "🔥",
  Water: "💧",
  Flying: "🦅",
  Electric: "⚡",
  Grass: "🌿",
  Ice: "❄️",
};

// ✅ Colores estilo 2048 adaptados a Pokémon
const abilityColors: Record<string, { bg: string; text: string; shadow: string }> = {
  // Pokémon - Estilo degradado suave
  Pikachu: { 
    bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", 
    text: "#333", 
    shadow: "0 4px 12px rgba(255, 215, 0, 0.4)" 
  },
  Charmander: { 
    bg: "linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(255, 71, 87, 0.4)" 
  },
  Bulbasaur: { 
    bg: "linear-gradient(135deg, #26DE81 0%, #20BF6B 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(38, 222, 129, 0.4)" 
  },
  Squirtle: { 
    bg: "linear-gradient(135deg, #45AAF2 0%, #2E86DE 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(69, 170, 242, 0.4)" 
  },
  Eevee: { 
    bg: "linear-gradient(135deg, #D4A574 0%, #C4915D 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(212, 165, 116, 0.4)" 
  },
  Mewtwo: { 
    bg: "linear-gradient(135deg, #A29BFE 0%, #6C5CE7 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(162, 155, 254, 0.4)" 
  },
  Gengar: { 
    bg: "linear-gradient(135deg, #5F27CD 0%, #341F97 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(95, 39, 205, 0.4)" 
  },
  Dragonite: { 
    bg: "linear-gradient(135deg, #FFA502 0%, #FF7F50 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(255, 165, 2, 0.4)" 
  },
  Umbreon: { 
    bg: "linear-gradient(135deg, #2F3542 0%, #57606F 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(47, 53, 66, 0.4)" 
  },
  Espeon: { 
    bg: "linear-gradient(135deg, #FDA7DF 0%, #F368E0 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(253, 167, 223, 0.4)" 
  },
  Tyranitar: { 
    bg: "linear-gradient(135deg, #747D8C 0%, #2F3542 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(116, 125, 140, 0.4)" 
  },
  Blaziken: { 
    bg: "linear-gradient(135deg, #FC5C65 0%, #EB3B5A 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(252, 92, 101, 0.4)" 
  },
  Sceptile: { 
    bg: "linear-gradient(135deg, #7BED9F 0%, #2ED573 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(123, 237, 159, 0.4)" 
  },
  Rayquaza: { 
    bg: "linear-gradient(135deg, #1DD1A1 0%, #10AC84 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(29, 209, 161, 0.4)" 
  },
  Gardevoir: { 
    bg: "linear-gradient(135deg, #FF9FF3 0%, #F368E0 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(255, 159, 243, 0.4)" 
  },
  Lucario: { 
    bg: "linear-gradient(135deg, #54A0FF 0%, #2E86DE 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(84, 160, 255, 0.4)" 
  },
  Garchomp: { 
    bg: "linear-gradient(135deg, #5F27CD 0%, #2E86DE 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(95, 39, 205, 0.4)" 
  },
  Greninja: { 
    bg: "linear-gradient(135deg, #48DBFB 0%, #0ABDE3 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(72, 219, 251, 0.4)" 
  },
  Sylveon: { 
    bg: "linear-gradient(135deg, #FFC8DD 0%, #FFAFCC 100%)", 
    text: "#333", 
    shadow: "0 4px 12px rgba(255, 200, 221, 0.4)" 
  },
  
  // Habilidades - Colores vibrantes
  Fire: { 
    bg: "linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(255, 71, 87, 0.5)" 
  },
  Water: { 
    bg: "linear-gradient(135deg, #48DBFB 0%, #0ABDE3 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(72, 219, 251, 0.5)" 
  },
  Flying: { 
    bg: "linear-gradient(135deg, #A8E6CF 0%, #56CCF2 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(86, 204, 242, 0.5)" 
  },
  Electric: { 
    bg: "linear-gradient(135deg, #FEE140 0%, #FFA502 100%)", 
    text: "#333", 
    shadow: "0 4px 12px rgba(255, 165, 2, 0.5)" 
  },
  Grass: { 
    bg: "linear-gradient(135deg, #7BED9F 0%, #2ED573 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(46, 213, 115, 0.5)" 
  },
  Ice: { 
    bg: "linear-gradient(135deg, #A8E6CF 0%, #3DC1D3 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(61, 193, 211, 0.5)" 
  },
};

// Color por defecto
const defaultColor = { 
  bg: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)", 
  text: "#1F2937", 
  shadow: "0 4px 12px rgba(178, 190, 195, 0.4)" 
};

export default function PokemonSelector({ options, onSelect, label }: PokemonSelectorProps) {
  const [selected, setSelected] = useState<string>("");

return (
  <div className="space-y-4">
    <label 
      id={`${label}-label`} // ✅ ID para aria-labelledby
      className="font-bold text-xl text-gray-800 block border-l-4 border-yellow-500 pl-4 bg-gradient-to-r from-yellow-50 to-transparent py-2 rounded"
    >
      {label}
    </label>
    <div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-inner"
      role="group" // ✅ Agrupar botones relacionados
      aria-labelledby={`${label}-label`} // ✅ Asociar con label
    >
      {options.map((opt) => {
          const color = abilityColors[opt] || defaultColor;
          const isSelected = selected === opt;
        
        return (
          <button
            key={opt}
            type="button"
            onClick={() => {
              setSelected(opt);
              onSelect(opt);
            }}
            aria-label={`Seleccionar ${opt}`}
            aria-pressed={isSelected}
            aria-describedby={isSelected ? `${opt}-selected` : undefined}
              className="relative group focus:outline-none"
              style={{
                background: isSelected ? color.bg : "#FFFFFF",
                color: isSelected ? color.text : "#1F2937",
                boxShadow: isSelected ? color.shadow : "0 2px 8px rgba(0,0,0,0.1)",
                borderRadius: "16px",
                padding: "20px",
                border: isSelected ? "3px solid rgba(255,255,255,0.5)" : "3px solid #E5E7EB",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 4px rgba(59, 130, 246, 0.5), ${isSelected ? color.shadow : "0 2px 8px rgba(0,0,0,0.1)"}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = isSelected ? color.shadow : "0 2px 8px rgba(0,0,0,0.1)";
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = "scale(1.02) translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }
              }}
            >
              {/* Emoji */}
              <div className="text-3xl mb-2 filter drop-shadow-lg" aria-hidden="true">
                {abilityEmojis[opt] || "✨"}
              </div>
              
              {/* Nombre */}
              <div className="text-xs font-bold tracking-wide">
                {opt}
              </div>

              {/* Indicador de selección */}
              {isSelected && (
                <div 
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center animate-bounce"
                  style={{
                    background: "linear-gradient(135deg, #26DE81 0%, #20BF6B 100%)",
                    boxShadow: "0 4px 12px rgba(38, 222, 129, 0.5)",
                  }}
                >
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              )}
              
              {/* Efecto de brillo al hacer hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              ></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}