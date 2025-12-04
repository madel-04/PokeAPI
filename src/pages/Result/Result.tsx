import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-8xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Pokémon No Encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            No hay datos para mostrar
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
          >
            🏠 Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-purple-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              🎉 Pokémon Compartido 🎉
            </h1>
            <p className="text-gray-600 text-lg">
              ¡Mira este increíble Pokémon creado!
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-gray-500 text-sm mb-1">Base</p>
                <p className="text-2xl font-bold text-purple-600">{pokemonData.base}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-gray-500 text-sm mb-1">Habilidad</p>
                <p className="text-2xl font-bold text-pink-600">{pokemonData.ability}</p>
              </div>
            </div>
          </div>

          <div className="relative group mb-6">
            <img
              src={pokemonData.image}
              alt={`Pokémon ${pokemonData.base} con habilidad ${pokemonData.ability}`}
              className="w-full rounded-2xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end justify-center pb-6">
              <p className="text-white font-bold text-2xl">
                {pokemonData.base} + {pokemonData.ability}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/create")}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-green-500 hover:to-blue-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            ✨ Crear Mi Propio Pokémon
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-purple-600 font-semibold transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}