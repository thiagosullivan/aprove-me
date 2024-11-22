"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const LogoutBtn = () => {
  const router = useRouter();
  const [loggedOut, setLoggedOut] = useState(false); // Estado para controlar a remoção do token
  const [isButtonVisible, setIsButtonVisible] = useState(true); // Estado para controlar a visibilidade do botão

  function removeAccessToken(): void {
    localStorage.removeItem("access_token");
    console.log("Access token removido do localStorage.");
    setLoggedOut(true); // Atualiza o estado para indicar que o logout foi feito
    setIsButtonVisible(false); // Oculta o botão após o logout
  }

  useEffect(() => {
    if (loggedOut) {
      router.push("/login"); // Redireciona para a página de login após o logout
    }
  }, [loggedOut, router]); // Esse useEffect será acionado quando loggedOut mudar

  const handleLogout = () => {
    removeAccessToken(); // Remove o token e atualiza o estado
  };

  return (
    <>
      {isButtonVisible && (
        <Button onClick={handleLogout}>
          <LogOut />
          Log out
        </Button>
      )}
    </>
  );
};

export default LogoutBtn;
