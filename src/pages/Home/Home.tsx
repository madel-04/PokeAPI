import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  const loginWithGoogle = () => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: "http://localhost:3000/auth/google/redirect",
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent"
    });

    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-white to-white relative overflow-hidden">
      {/* Decoración superior - Pokédex style */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600 to-red-500">
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-400 border-4 border-white shadow-2xl relative">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 animate-pulse-slow"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-white"></div>
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-40">
        <div className="max-w-sm w-full">
          {/* Pantalla Pokédex */}
          <div className="bg-white rounded-3xl shadow-2xl border-8 border-red-600 p-6 relative">
            {/* Borde superior decorativo */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-red-600 rounded-t-xl"></div>
            
            {/* Pantalla interior */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-5 border-4 border-gray-800 shadow-inner">
              <div className="text-center mb-5">
                <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500" style={{ fontFamily: "'Pokemon Solid', sans-serif" }}>
                  POKÉMON
                </h1>
                <h2 className="text-lg font-semibold text-gray-700">
                  CREATOR
                </h2>
                <p className="text-gray-600 text-xs mt-1">
                  Sistema de Creación con IA
                </p>
              </div>

              {isAuthenticated ? (
                <div className="space-y-3 animate-fadeIn">
                  {/* Estado activo */}
                  <div className="bg-green-100 border-2 border-green-500 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <p className="text-green-800 font-bold text-sm">SISTEMA ACTIVO</p>
                    </div>
                    <p className="text-green-700 text-xs">Entrenador verificado</p>
                  </div>
                  
                  {/* Botón principal */}
                  <button
                    onClick={() => navigate("/create")}
                    aria-label="Iniciar creación de Pokémon"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 px-5 rounded-full shadow-lg transform hover:scale-105 transition-all border-3 border-yellow-600 shine relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2"
                    style={{ fontSize: '14px' }}
                  >
                    <span className="relative z-10">▶ INICIAR CREACIÓN</span>
                  </button>

                  {/* Botón secundario */}
                  <button
                    onClick={logout}
                    aria-label="Cerrar sesión de usuario"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transform hover:scale-105 transition-all border-2 border-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
                    style={{ fontSize: '13px' }}
                  >
                    ⏏ CERRAR SESIÓN
                  </button>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  {/* Advertencia */}
                  <div className="bg-yellow-100 border-2 border-yellow-500 rounded-xl p-3 text-center">
                    <p className="text-yellow-800 font-bold text-xs">
                      ⚠️ ACCESO RESTRINGIDO
                    </p>
                    <p className="text-yellow-700 text-xs mt-1">
                      Autenticación requerida
                    </p>
                  </div>

                  {/* Botón de login */}
                  <button
                    onClick={loginWithGoogle}
                    aria-label="Conectar con cuenta de Google"
                    className="w-full bg-white hover:bg-gray-50 border-3 border-gray-800 text-gray-900 font-semibold py-2 px-4 rounded-xl shadow-md transform hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
                    style={{ fontSize: '13px' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    CONECTAR CON GOOGLE
                  </button>
                </div>
              )}
            </div>

            {/* Botones decorativos inferiores */}
            <div className="flex justify-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 border-3 border-gray-600 shadow-inner"></div>
              <div className="w-10 h-10 rounded-lg bg-green-500 border-3 border-green-700 shadow-inner"></div>
            </div>
          </div>

          {/* Información inferior */}
          <div className="text-center mt-4 text-gray-700 text-xs">
            <p>v1.0.0 | Sistema de Creación Pokémon</p>
            <p className="text-xs text-gray-500 mt-0.5">Powered by IA • OAuth2 Secured</p>
          </div>
        </div>
      </div>
    </div>
  );
}