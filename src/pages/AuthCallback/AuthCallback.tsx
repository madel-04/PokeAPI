import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // ✅ Usar el método login del contexto
      login(token);
      // ✅ Pequeño delay para asegurar que el estado se actualice
      setTimeout(() => {
        navigate("/create");
      }, 100);
    } else {
      // Si no hay token, redirigir al home
      navigate("/");
    }
  }, [navigate, login]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">🎨</span>
          </div>
        </div>
        <p className="text-gray-700 text-lg font-semibold mb-2">
          Procesando autenticación
        </p>
        <p className="text-gray-500 text-sm">
          Preparando tu experiencia...
        </p>
      </div>
    </div>
  );
}