import React, { ComponentType, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { decodeJWT } from "../utils/decodeJWT"; // Função para decodificar o JWT

// Função de HOC com verificação do JWT e do user
const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
): React.FC<P> => {
  return (props: P) => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
      const token = localStorage.getItem("access_token");

      if (token) {
        // Se houver token, decodificamos para obter as informações do usuário
        const decoded = decodeJWT(token);

        if (decoded && decoded.exp * 1000 > Date.now()) {
          // Se o token for válido, setamos o usuário no contexto
          setUser(decoded);
        } else {
          // Se o token estiver expirado, removemos o token e redirecionamos
          localStorage.removeItem("access_token");
          setUser(null);
          router.push("/login");
        }
      } else {
        // Se não houver token no localStorage, redirecionamos para o login
        setUser(null);
        router.push("/login");
      }

      setLoading(false); // Define o loading como false após a verificação
    }, [router, setUser]);

    // Se ainda estiver carregando (verificando o token), mostramos o "loading"
    if (loading) return <div>Loading...</div>;

    // Se o token e o usuário estiverem válidos, renderiza o componente
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
