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
const abilityOptions = ["Fire", "Water", "Flying", "Electric", "Grass", "Ice", "Psychic", "Dark", "Dragon", "Fairy", "Fighting", "Rock", "Ground", "Steel", "Ghost", "Poison", "Bug", "Normal"];

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
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom, #FAF8EF 0%, #E8E4D9 100%)' }}>
        <div className="game-container">
          <div style={{
            background: '#BBADA0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: '#FAF8EF',
              borderRadius: '8px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="pokemon-title text-lg mb-4" style={{ color: '#FC5C65', textShadow: 'none' }}>
                ACCESO DENEGADO
              </h1>
              <p style={{ color: '#776E65', marginBottom: '24px', fontSize: '14px' }}>
                Debes autenticarte para acceder al laboratorio
              </p>
              <button
                onClick={() => navigate("/")}
                className="btn-2048 btn-pokemon-red w-full"
              >
                ← VOLVER A INICIO
              </button>
            </div>
          </div>
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
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(to bottom, #FAF8EF 0%, #E8E4D9 100%)' }}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg focus:ring-4 focus:ring-blue-300"
      >
        Saltar al contenido principal
      </a>

      {/* Header estilo 2048 */}
      <div style={{ 
        background: '#BBADA0',
        borderBottom: '3px solid #8F7A66',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div className="game-container py-4 flex justify-between items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn-2048 btn-pokemon-green"
            style={{
              padding: '12px 20px',
              fontSize: '14px'
            }}
          >
            <span className="text-base">←</span>
            <span className="ml-2 hidden sm:inline">SALIR</span>
          </button>
          
          <h1 className="pokemon-title text-sm sm:text-base" style={{
            color: '#F9F6F2',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            LAB OAK
          </h1>
          
          <button
            onClick={logout}
            className="btn-2048 btn-pokemon-red"
            style={{
              padding: '12px 20px',
              fontSize: '14px'
            }}
          >
            🚪 <span className="hidden sm:inline">SALIR</span>
          </button>
        </div>
      </div>

      <div id="main-content" className="game-container py-8">
        {/* Score container estilo 2048 */}
        <div className="score-container mb-6">
          <div className="score-box">
            <div className="score-label">Sistema</div>
            <div className="score-value" style={{ fontSize: '16px' }}>FUSIÓN</div>
          </div>
          <div className="score-box" style={{ background: '#8F7A66' }}>
            <div className="score-label">Estado</div>
            <div className="score-value" style={{ fontSize: '16px' }}>ACTIVO</div>
          </div>
        </div>

        {/* Contenedor principal estilo 2048 */}
        <div style={{
          background: '#BBADA0',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          marginBottom: '24px'
        }}>
          <div style={{
            background: '#FAF8EF',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <div className="text-center mb-6">
              <h2 className="pokemon-title text-lg mb-3" style={{
                color: '#776E65',
                textShadow: 'none'
              }}>
                SISTEMA DE FUSIÓN
              </h2>
              <p className="text-sm font-semibold" style={{ color: '#776E65' }}>
                Selecciona componentes genéticos
              </p>
            </div>

            {error && (
              <div 
                id="error-message"
                role="alert"
                aria-live="assertive"
                className="tile-new mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FC5C65 0%, #EB3B5A 100%)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: 'var(--tile-border-radius)',
                  boxShadow: '0 4px 12px rgba(252, 92, 101, 0.4)'
                }}
                tabIndex={-1}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold text-base">{error}</p>
                    <p className="text-sm mt-1 opacity-90">Completa todos los campos requeridos</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              <PokemonSelector 
                label="🧬 ADN BASE"
                options={baseOptions} 
                onSelect={setBase} 
              />

              <PokemonSelector 
                label="⚡ PODER ELEMENTAL"
                options={abilityOptions} 
                onSelect={setAbility} 
              />

              <div style={{
                background: '#CDC1B4',
                borderRadius: 'var(--tile-border-radius)',
                padding: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
              }}>
                <label 
                  htmlFor="customText"
                  className="pokemon-title text-xs block mb-3 text-center"
                  style={{
                    color: '#776E65',
                    textShadow: 'none',
                    letterSpacing: '0.5px'
                  }}
                >
                  🔬 MODIFICACIONES
                </label>
                <textarea
                  id="customText"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ej: alas metálicas, ojos brillantes..."
                  style={{
                    background: '#FAF8EF',
                    border: '2px solid #8F7A66',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    color: '#776E65',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  maxLength={200}
                  aria-describedby="customTextHelp"
                />
                <div id="customTextHelp" className="text-right text-xs mt-2" style={{ color: '#776E65' }}>
                  {customText.length}/200
                </div>
              </div>
            </div>

            {/* Botón principal estilo 2048 */}
            <button
              onClick={handleGenerate}
              disabled={loading || !base || !ability}
              aria-label="Generar Pokémon mediante fusión genética"
              aria-busy={loading}
              className="btn-2048 w-full mt-6"
              style={{
                background: (loading || !base || !ability) ? buttonStyles.disabled.bg : buttonStyles.primary.bg,
                boxShadow: (loading || !base || !ability) ? buttonStyles.disabled.shadow : buttonStyles.primary.shadow,
                color: (loading || !base || !ability) ? buttonStyles.disabled.text : buttonStyles.primary.text,
                border: (loading || !base || !ability) ? buttonStyles.disabled.border : buttonStyles.primary.border,
                cursor: (loading || !base || !ability) ? 'not-allowed' : 'pointer',
                padding: '20px',
                fontSize: '16px'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>GENERANDO...</span>
                </div>
              ) : (
                <span>⚡ INICIAR FUSIÓN</span>
              )}
            </button>

            {/* Resultado */}
            {imageUrl && (
              <div className="mt-6 space-y-4 tile-new">
                <div style={{
                  borderRadius: 'var(--tile-border-radius)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  border: '3px solid #8F7A66'
                }}>
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
                    className="btn-2048 btn-pokemon-green"
                    style={{
                      padding: '16px 12px',
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span className="text-2xl">💾</span>
                    <span>GUARDAR</span>
                  </button>
                  <button
                    onClick={handleShare}
                    aria-label="Compartir Pokémon creado"
                    className="btn-2048 btn-pokemon-blue"
                    style={{
                      padding: '16px 12px',
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span className="text-2xl">📋</span>
                    <span>COMPARTIR</span>
                  </button>
                  <button
                    onClick={handleReset}
                    aria-label="Crear nuevo Pokémon"
                    className="btn-2048 btn-pokemon-yellow"
                    style={{
                      padding: '16px 12px',
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span className="text-2xl">🔄</span>
                    <span>NUEVO</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center" style={{ 
          background: '#CDC1B4',
          borderRadius: '8px',
          padding: '16px',
          color: '#776E65',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <p>💡 Laboratorio Oak - Sistema v2.0</p>
        </div>
      </div>
    </div>
  );
}
