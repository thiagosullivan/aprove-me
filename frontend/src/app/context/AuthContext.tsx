"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeJWT, DecodedToken } from "../utils/decodeJWT";

interface AuthContextData {
  user: DecodedToken | null;
  setUser: React.Dispatch<React.SetStateAction<DecodedToken | null>>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado de carregamento para verificar o token

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
      } else {
        localStorage.removeItem("access_token");
        setUser(null);
        router.push("/login"); // Redireciona para login se o token estiver expirado
      }
    } else {
      router.push("/login"); // Redireciona para login se não houver token
    }
    setLoading(false); // Define o loading como false após a verificação do token
  }, [router]);

  if (loading) return <div>Loading...</div>; // Exibe "Loading..." até terminar a verificação do token

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
