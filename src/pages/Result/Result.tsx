import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const buttonStyles = {
  primary: {
    bg: "linear-gradient(135deg, #48DBFB 0%, #0ABDE3 100%)",
    shadow: "0 4px 12px rgba(72, 219, 251, 0.5)",
    text: "#FFF",
    border: "3px solid rgba(255,255,255,0.5)",
  },
  secondary: {
    bg: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
    shadow: "0 2px 8px rgba(0,0,0,0.1)",
    text: "#1F2937",
    border: "3px solid #E5E7EB",
  },
};

const typeColors: Record<string, string> = {
  Fire: "from-red-500 to-orange-600",
  Water: "from-blue-500 to-cyan-600",
  Flying: "from-sky-400 to-indigo-500",
  Electric: "from-yellow-400 to-amber-500",
  Grass: "from-green-500 to-emerald-600",
  Ice: "from-cyan-400 to-blue-500",
};

const typeIcons: Record<string, string> = {
  Fire: "🔥",
  Water: "💧",
  Flying: "🦅",
  Electric: "⚡",
  Grass: "🌿",
  Ice: "❄️",
};

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<{
    base: string;
    ability: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const base = searchParams.get("base");
    const ability = searchParams.get("ability");
    const image = searchParams.get("image");

    if (base && ability && image) {
      setPokemonData({ base, ability, image });
    }
  }, [searchParams]);

  if (!pokemonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border-8 border-yellow-500">
          <div className="text-8xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Carta no encontrada
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            No se pudo cargar la información del Pokémon
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl border-4 border-yellow-600 transition-all transform hover:scale-105"
          >
            🏠 Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4 py-12">
      <div className="max-w-md mx-auto">
        {/* Carta Pokémon */}
        <div className="relative animate-fadeIn">
          {/* Brillo holográfico */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent rounded-3xl animate-pulse-slow pointer-events-none"></div>
          
          {/* Carta principal */}
          <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl shadow-2xl border-8 border-yellow-400 p-6 relative overflow-hidden">
            {/* Patrón de fondo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido de la carta */}
            <div className="relative z-10">
              {/* Header de la carta */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>
                    {pokemonData.base}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">HP</span>
                    <span className="text-2xl font-bold text-red-600">100</span>
                  </div>
                </div>
                <div className={`bg-gradient-to-br ${typeColors[pokemonData.ability] || "from-gray-400 to-gray-500"} text-white px-4 py-2 rounded-xl font-bold shadow-lg border-2 border-white`}>
                  <span className="text-lg mr-1">{typeIcons[pokemonData.ability]}</span>
                  {pokemonData.ability}
                </div>
              </div>

              {/* Imagen del Pokémon */}
              <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-4 mb-4 shadow-inner border-4 border-yellow-500">
                <div className="aspect-square bg-white rounded-xl overflow-hidden relative">
                  <img
                    src={pokemonData.image}
                    alt={`Pokémon fusión de ${pokemonData.base} con poderes de tipo ${pokemonData.ability}, creado mediante IA`}
                    className="w-full h-full object-cover"
                  />
                  {/* Efecto holográfico */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent shine"></div>
                </div>
              </div>

              {/* Información del Pokémon */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 border-2 border-yellow-600">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${typeColors[pokemonData.ability]} flex items-center justify-center text-white font-bold`}>
                    {typeIcons[pokemonData.ability]}
                  </div>
                  <h3 className="font-extrabold text-xl text-gray-900">Ataque Especial</h3>
                  <div className="ml-auto flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${typeColors[pokemonData.ability]} border-2 border-white`}></div>
                    ))}
                  </div>
                </div>
                <p className="text-base font-bold text-gray-900 mb-2">
                  Fusión Genética Potenciada
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Este Pokémon único ha sido creado mediante la fusión de {pokemonData.base} con poderes de tipo {pokemonData.ability}. Su fuerza es incomparable.
                </p>
                <div className="flex justify-end mt-2">
                  <span className="text-3xl font-extrabold text-gray-900">80</span>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-yellow-600 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-900 font-extrabold text-base mb-1">Debilidad</p>
                    <div className="flex gap-1 mt-1">
                      <span className="bg-gray-200 px-3 py-1.5 rounded-lg font-semibold">×2</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-extrabold text-base mb-1">Resistencia</p>
                    <div className="flex gap-1 mt-1">
                      <span className="bg-gray-200 px-3 py-1.5 rounded-lg font-semibold">-30</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-gray-900 font-extrabold text-base mb-2">Costo de retirada</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-gray-300 border border-gray-400"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer de la carta */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-extrabold text-sm text-gray-900">Rareza: ★★★★★</p>
                  <p className="text-gray-600 text-xs">Edición Limitada - IA Gen</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-xl text-gray-900">001/∞</p>
                  <p className="text-gray-600 text-xs">© 2024</p>
                </div>
              </div>

            </div>
          </div>


          {/* Botones debajo de la carta */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate("/create")}
              aria-label="Crear mi propia carta de Pokémon"
              style={{
                background: buttonStyles.primary.bg,
                boxShadow: buttonStyles.primary.shadow,
                color: buttonStyles.primary.text,
                border: buttonStyles.primary.border,
              }}
              className="w-full font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
            >
              ✨ Crear Mi Propia Carta
            </button>
            
            <button
              onClick={() => navigate("/")}
              aria-label="Volver a la página de inicio"
              style={{
                background: buttonStyles.secondary.bg,
                boxShadow: buttonStyles.secondary.shadow,
                color: buttonStyles.secondary.text,
                border: buttonStyles.secondary.border,
              }}
              className="w-full font-bold py-3 px-6 rounded-2xl transition-all hover:scale-102 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2"
            >
              ← Volver al Inicio
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-xl p-3 border-2 border-yellow-300">
              💫 Esta carta ha sido generada con tecnología de IA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}