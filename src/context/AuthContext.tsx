import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ✅ Verificar token al cargar la aplicación
    const stored = sessionStorage.getItem("jwt");
    if (stored) {
      setToken(stored);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    sessionStorage.setItem("jwt", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setToken(null);
    window.location.href = "/";
  };

  // ✅ Mostrar loading mientras se verifica el token
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);