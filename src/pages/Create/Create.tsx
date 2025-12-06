import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PokemonSelector from "../../components/PokemonSelector";
import { generatePokemonImage } from "../../services/imageService";

const pokemonByGeneration = {
  "Gen 1 (Kanto)": ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Eevee", "Mewtwo", "Gengar", "Dragonite"],
  "Gen 2 (Johto)": ["Typhlosion", "Feraligatr", "Meganium", "Umbreon", "Espeon", "Tyranitar"],
  "Gen 3 (Hoenn)": ["Blaziken", "Swampert", "Sceptile", "Rayquaza", "Gardevoir"],
  "Gen 4 (Sinnoh)": ["Infernape", "Empoleon", "Torterra", "Lucario", "Garchomp"],
  "Gen 5 (Unova)": ["Samurott", "Emboar", "Serperior", "Zoroark"],
  "Gen 6 (Kalos)": ["Greninja", "Sylveon", "Goodra"],
};

const baseOptions = Object.values(pokemonByGeneration).flat();
const abilityOptions = ["Fire", "Water", "Flying", "Electric", "Grass", "Ice"];

// ✅ Estilos de botones unificados
const buttonStyles = {
  primary: {
    bg: "linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)",
    shadow: "0 8px 20px rgba(255, 71, 87, 0.4)",
    text: "#FFF",
    border: "4px solid rgba(255,255,255,0.3)",
  },
  secondary: {
    bg: "linear-gradient(135deg, #26DE81 0%, #20BF6B 100%)",
    shadow: "0 8px 20px rgba(38, 222, 129, 0.4)",
    text: "#FFF",
    border: "4px solid rgba(255,255,255,0.3)",
  },
  tertiary: {
    bg: "linear-gradient(135deg, #48DBFB 0%, #0ABDE3 100%)",
    shadow: "0 8px 20px rgba(72, 219, 251, 0.4)",
    text: "#FFF",
    border: "4px solid rgba(255,255,255,0.3)",
  },
  warning: {
    bg: "linear-gradient(135deg, #FFA502 0%, #FF7F50 100%)",
    shadow: "0 8px 20px rgba(255, 165, 2, 0.4)",
    text: "#FFF",
    border: "4px solid rgba(255,255,255,0.3)",
  },
  danger: {
    bg: "linear-gradient(135deg, #FC5C65 0%, #EB3B5A 100%)",
    shadow: "0 8px 20px rgba(252, 92, 101, 0.4)",
    text: "#FFF",
    border: "4px solid rgba(255,255,255,0.3)",
  },
  disabled: {
    bg: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
    shadow: "0 4px 12px rgba(0,0,0,0.1)",
    text: "#9CA3AF",
    border: "4px solid #E5E7EB",
  },
};

export default function Create() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [base, setBase] = useState("");
  const [ability, setAbility] = useState("");
  const [customText, setCustomText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border-8 border-red-700">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-4 text-red-600">ACCESO DENEGADO</h1>
          <p className="text-gray-700 mb-6">
            Debes autenticarte para acceder al laboratorio
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              background: buttonStyles.danger.bg,
              boxShadow: buttonStyles.danger.shadow,
              color: buttonStyles.danger.text,
              border: buttonStyles.danger.border,
            }}
            className="w-full font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105"
          >
            ← VOLVER A INICIO
          </button>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!base || !ability) {
      const errorMsg = "⚠️ Debes seleccionar un ADN base y un poder elemental";
      setError(errorMsg);
      
      setTimeout(() => {
        const errorEl = document.getElementById('error-message');
        if (errorEl) {
          errorEl.focus();
          errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return;
    }
    setError("");
    setLoading(true);
    try {
      let prompt = `A ${base} Pokemon with ${ability} powers`;
      if (customText.trim()) {
        prompt += `, ${customText.trim()}`;
      }
      prompt += ", digital art, vibrant colors, professional quality";

      const url = await generatePokemonImage(prompt);
      setImageUrl(url);
    } catch (error) {
      console.error("Error:", error);
      setError("❌ Error al generar");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pokemon-${base}-${ability}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("❌ Error al descargar");
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/result?base=${base}&ability=${ability}&image=${encodeURIComponent(imageUrl)}`;
    navigator.clipboard.writeText(shareUrl);
    alert("✅ URL copiada");
  };

  const handleReset = () => {
    setImageUrl("");
    setBase("");
    setAbility("");
    setCustomText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-50 to-yellow-50 relative">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg focus:ring-4 focus:ring-blue-300"
      >
        Saltar al contenido principal
      </a>

      {/* Header estilo laboratorio */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 border-b-8 border-green-800 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
          <button
            onClick={() => navigate("/")}
            style={{
              background: buttonStyles.secondary.bg,
              boxShadow: buttonStyles.secondary.shadow,
              color: buttonStyles.secondary.text,
              border: buttonStyles.secondary.border,
            }}
            className="flex items-center gap-2 font-bold py-4 px-6 rounded-3xl transition-all transform hover:scale-105"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">SALIR</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>
            LABORATORIO OAK
          </h1>
          <button
            onClick={logout}
            style={{
              background: buttonStyles.danger.bg,
              boxShadow: buttonStyles.danger.shadow,
              color: buttonStyles.danger.text,
              border: buttonStyles.danger.border,
            }}
            className="flex items-center gap-2 font-bold py-4 px-6 rounded-3xl transition-all transform hover:scale-105"
          >
            <span className="hidden sm:inline">🚪</span> SALIR
          </button>
        </div>
      </div>

      <div id="main-content" className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border-8 border-green-600 p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              SISTEMA DE FUSIÓN GENÉTICA
            </h2>
            <p className="text-gray-600 font-semibold">
              Crea tu Pokémon único
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Selecciona los componentes genéticos base
            </p>
          </div>

          {error && (
            <div 
              id="error-message"
              role="alert"
              aria-live="assertive"
              className="bg-red-100 border-4 border-red-500 rounded-xl p-4 mb-6 animate-shake"
              tabIndex={-1}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-red-800 font-bold text-lg">{error}</p>
                  <p className="text-red-600 text-sm mt-1">Por favor, completa todos los campos requeridos.</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            <PokemonSelector 
              label="🧬 ADN BASE DEL POKÉMON"
              options={baseOptions} 
              onSelect={setBase} 
            />

            <PokemonSelector 
              label="⚡ PODER ELEMENTAL"
              options={abilityOptions} 
              onSelect={setAbility} 
            />

            <div className="bg-blue-50 border-4 border-blue-300 rounded-2xl p-6">
              <label 
                htmlFor="customText"
                className="font-bold text-lg text-blue-900 block mb-3"
              >
                🔬 MODIFICACIONES GENÉTICAS (Opcional)
              </label>
              <textarea
                id="customText"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Ej: con alas metálicas, ojos brillantes, aura eléctrica..."
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none bg-white"
                rows={3}
                maxLength={200}
                aria-describedby="customTextHelp"
              />
              <div id="customTextHelp" className="text-right text-sm text-blue-600 mt-2">
                {customText.length}/200 caracteres
              </div>
            </div>
          </div>

          {/* ✅ Botón principal con nuevo estilo */}
          <button
            onClick={handleGenerate}
            disabled={loading || !base || !ability}
            aria-label="Generar Pokémon mediante fusión genética"
            aria-busy={loading}
            style={{
              background: (loading || !base || !ability) ? buttonStyles.disabled.bg : buttonStyles.primary.bg,
              boxShadow: (loading || !base || !ability) ? buttonStyles.disabled.shadow : buttonStyles.primary.shadow,
              color: (loading || !base || !ability) ? buttonStyles.disabled.text : buttonStyles.primary.text,
              border: (loading || !base || !ability) ? buttonStyles.disabled.border : buttonStyles.primary.border,
            }}
            className={`mt-8 w-full py-6 px-8 rounded-3xl font-bold text-xl transition-all transform focus:outline-none focus:ring-4 focus:ring-offset-2 ${
              loading || !base || !ability
                ? "cursor-not-allowed focus:ring-gray-300"
                : "hover:scale-[1.02] active:scale-95 focus:ring-red-300"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>GENERANDO...</span>
              </div>
            ) : (
              <span>⚡ INICIAR FUSIÓN GENÉTICA</span>
            )}
          </button>

          {/* ✅ Botones de acción con nuevo estilo */}
          {imageUrl && (
            <div className="mt-8 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-4 border-green-500 shadow-2xl">
                <img 
                  src={imageUrl} 
                  alt={`Pokémon fusión de ${base} con poderes ${ability}`}
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleDownload}
                  aria-label="Descargar imagen del Pokémon"
                  style={{
                    background: buttonStyles.secondary.bg,
                    boxShadow: buttonStyles.secondary.shadow,
                    color: buttonStyles.secondary.text,
                    border: buttonStyles.secondary.border,
                  }}
                  className="font-bold py-5 px-4 rounded-3xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  <div className="text-2xl mb-1">💾</div>
                  <div className="text-sm">GUARDAR</div>
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Compartir Pokémon creado"
                  style={{
                    background: buttonStyles.tertiary.bg,
                    boxShadow: buttonStyles.tertiary.shadow,
                    color: buttonStyles.tertiary.text,
                    border: buttonStyles.tertiary.border,
                  }}
                  className="font-bold py-5 px-4 rounded-3xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <div className="text-2xl mb-1">📋</div>
                  <div className="text-sm">COMPARTIR</div>
                </button>
                <button
                  onClick={handleReset}
                  aria-label="Crear nuevo Pokémon"
                  style={{
                    background: buttonStyles.warning.bg,
                    boxShadow: buttonStyles.warning.shadow,
                    color: buttonStyles.warning.text,
                    border: buttonStyles.warning.border,
                  }}
                  className="font-bold py-5 px-4 rounded-3xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                  <div className="text-2xl mb-1">🔄</div>
                  <div className="text-sm">NUEVO</div>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-gray-600 bg-white rounded-2xl p-4 border-4 border-gray-300">
          <p className="text-sm font-semibold">
            💡 Laboratorio del Profesor Oak - Sistema de Fusión v2.0
          </p>
        </div>
      </div>
    </div>
  );
}