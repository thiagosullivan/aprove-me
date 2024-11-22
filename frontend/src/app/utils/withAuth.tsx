import React, { ComponentType, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { decodeJWT } from "../utils/decodeJWT";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
): React.FC<P> => {
  return (props: P) => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("access_token");

      if (token) {
        const decoded = decodeJWT(token);

        if (decoded && decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("access_token");
          setUser(null);
          router.push("/login");
        }
      } else {
        setUser(null);
        router.push("/login");
      }

      setLoading(false);
    }, [router, setUser]);

    if (loading) return <div>Carregando...</div>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
