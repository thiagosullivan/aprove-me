"use client";

import { useRouter } from "next/navigation";
import router from "next/router";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Define a tipagem do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

// Define a tipagem das props do provedor
interface AuthProviderProps {
  children: ReactNode;
}

// Cria o contexto com um valor inicial vazio
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Função para verificar se o token JWT expirou
  const isTokenExpired = (token: string): boolean => {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload
      const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em EPOCH
      return payload.exp < currentTime; // Retorna true se o token expirou
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return true;
    }
  };

  // Verifica o token ao montar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token && isTokenExpired(token)) {
        router.push("/login");
        console.log("O token expirou.");
        setIsAuthenticated(false);
      } else {
        console.log("O token ainda é válido.");
        setIsAuthenticated(true);
      }
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
