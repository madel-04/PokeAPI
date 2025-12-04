import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PokemonSelector from "../../components/PokemonSelector";
import { generatePokemonImage } from "../../services/imageService";

const baseOptions = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"];
const abilityOptions = ["Fire", "Water", "Flying", "Electric", "Grass", "Ice"];

export default function Create() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [base, setBase] = useState("");
  const [ability, setAbility] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform">
          <div className="text-8xl mb-6 animate-bounce">🔒</div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Acceso Restringido
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Necesitas iniciar sesión para crear tu Pokémon único
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105"
          >
            🏠 Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!base || !ability) {
      return alert("⚠️ Por favor selecciona una base y una habilidad");
    }

    setLoading(true);
    try {
      const prompt = `A ${base} Pokemon with ${ability} powers, digital art, vibrant colors, professional quality`;
      const url = await generatePokemonImage(prompt);
      setImageUrl(url);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("❌ Error al generar la imagen. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/result?base=${base}&ability=${ability}&image=${encodeURIComponent(imageUrl)}`;
    navigator.clipboard.writeText(shareUrl);
    alert("✅ URL copiada al portapapeles");
  };

  const handleReset = () => {
    setImageUrl("");
    setBase("");
    setAbility("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors group"
          >
            <span className="text-2xl group-hover:translate-x-[-4px] transition-transform">←</span>
            Inicio
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            Cerrar sesión
            <span className="text-xl">🚪</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-purple-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              ✨ Creador de Pokémon ✨
            </h1>
            <p className="text-gray-600 text-lg">
              Combina características para crear tu Pokémon único
            </p>
          </div>

          <div className="space-y-6">
            <PokemonSelector 
              label="🎯 Elige la base del Pokémon"
              options={baseOptions} 
              onSelect={setBase} 
            />

            <PokemonSelector 
              label="⚡ Elige la habilidad especial"
              options={abilityOptions} 
              onSelect={setAbility} 
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !base || !ability}
            className={`mt-8 w-full px-6 py-4 rounded-2xl font-bold text-lg transition-all transform ${
              loading || !base || !ability
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 shadow-xl hover:shadow-2xl hover:scale-105"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Generando tu Pokémon...
              </span>
            ) : (
              "🎨 ¡Generar Pokémon!"
            )}
          </button>

          {imageUrl && (
            <div className="mt-8 animate-fadeIn">
              <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 mb-4">
                <h2 className="font-bold text-2xl text-center mb-4 text-purple-800">
                  🎉 ¡Tu Pokémon ha sido creado! 🎉
                </h2>
                <div className="relative group">
                  <img 
                    src={imageUrl} 
                    alt={`Pokémon ${base} con habilidad ${ability}`}
                    className="w-full rounded-2xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end justify-center pb-4">
                    <p className="text-white font-bold text-xl">
                      {base} + {ability}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">📋</span>
                  Compartir
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🔄</span>
                  Crear Otro
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-sm">
            💡 Tip: Prueba diferentes combinaciones para descubrir Pokémon únicos
          </p>
        </div>
      </div>
    </div>
  );
}