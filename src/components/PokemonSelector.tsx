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
  Psychic: "🔮",
  Dark: "🌑",
  Dragon: "🐉",
  Fairy: "🧚",
  Fighting: "🥊",
  Rock: "🪨",
  Ground: "⛰️",
  Steel: "⚙️",
  Ghost: "👻",
  Poison: "☠️",
  Bug: "🐛",
  Normal: "⭐",
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
  Psychic: { 
    bg: "linear-gradient(135deg, #FDA7DF 0%, #F368E0 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(253, 167, 223, 0.5)" 
  },
  Dark: { 
    bg: "linear-gradient(135deg, #2F3542 0%, #57606F 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(47, 53, 66, 0.5)" 
  },
  Dragon: { 
    bg: "linear-gradient(135deg, #5F27CD 0%, #341F97 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(95, 39, 205, 0.5)" 
  },
  Fairy: { 
    bg: "linear-gradient(135deg, #FFC8DD 0%, #FFAFCC 100%)", 
    text: "#333", 
    shadow: "0 4px 12px rgba(255, 200, 221, 0.5)" 
  },
  Fighting: { 
    bg: "linear-gradient(135deg, #FC5C65 0%, #EB3B5A 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(252, 92, 101, 0.5)" 
  },
  Rock: { 
    bg: "linear-gradient(135deg, #C4A57B 0%, #9C826B 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(196, 165, 123, 0.5)" 
  },
  Ground: { 
    bg: "linear-gradient(135deg, #D4A574 0%, #C4915D 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(212, 165, 116, 0.5)" 
  },
  Steel: { 
    bg: "linear-gradient(135deg, #95A5A6 0%, #7F8C8D 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(149, 165, 166, 0.5)" 
  },
  Ghost: { 
    bg: "linear-gradient(135deg, #5F27CD 0%, #341F97 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(95, 39, 205, 0.5)" 
  },
  Poison: { 
    bg: "linear-gradient(135deg, #A55EEA 0%, #8854D0 100%)", 
    text: "#FFF", 
    shadow: "0 4px 12px rgba(165, 94, 234, 0.5)" 
  },
  Bug: { 
    bg: "linear-gradient(135deg, #A8E063 0%, #7BED9F 100%)", 
    text: "#333", 
    shadow: "0 4px 12px rgba(168, 224, 99, 0.5)" 
  },
  Normal: { 
    bg: "linear-gradient(135deg, #DFE4EA 0%, #C4CDD5 100%)", 
    text: "#333", 
    shadow: "0 4px 12px rgba(223, 228, 234, 0.5)" 
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
    <div className="space-y-6">
      <label 
        id={`${label}-label`}
        className="pokemon-title text-base sm:text-lg text-gray-800 block text-center mb-6"
        style={{
          color: '#776E65',
          textShadow: 'none',
          letterSpacing: '1px'
        }}
      >
        {label}
      </label>
      <div 
        className="grid-container grid grid-cols-2 gap-3"
        style={{
          maxHeight: '280px',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: '#BBADA0 #E8E4D9',
          paddingRight: '4px'
        }}
        role="group"
        aria-labelledby={`${label}-label`}
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
            className={`tile ${isSelected ? 'tile-merge' : ''} relative group focus:outline-none`}
            style={{
              background: isSelected ? color.bg : "#CDC1B4",
              color: isSelected ? color.text : "#776E65",
              boxShadow: isSelected ? color.shadow : "0 2px 6px rgba(0,0,0,0.12)",
              borderRadius: "var(--tile-border-radius)",
              padding: "20px 12px",
              border: "none",
              transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isSelected ? "scale(1)" : "scale(1)",
              fontWeight: "700",
              fontSize: "12px",
              cursor: "pointer",
              outline: "none",
              minHeight: "100px",
              width: "100%"
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = "3px solid #3B4CCA";
              e.currentTarget.style.outlineOffset = "3px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = "none";
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.12)";
              }
            }}
          >
            {/* Emoji */}
            <div className="text-3xl mb-2 filter drop-shadow-lg" aria-hidden="true">
              {abilityEmojis[opt] || "✨"}
            </div>
            
            {/* Nombre */}
            <div className="text-xs font-bold tracking-wider uppercase" style={{ letterSpacing: '0.5px', lineHeight: '1.2' }}>
              {opt}
            </div>

            {/* Indicador de selección (checkmark) */}
            {isSelected && (
              <div 
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center tile-new"
                style={{
                  background: "linear-gradient(135deg, #26DE81 0%, #20BF6B 100%)",
                  boxShadow: "0 3px 8px rgba(38, 222, 129, 0.4)",
                  border: "2px solid white",
                }}
              >
                <span className="text-white text-base font-bold">✓</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  </div>
);}