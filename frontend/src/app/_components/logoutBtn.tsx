"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const LogoutBtn = () => {
  const router = useRouter();
  const [loggedOut, setLoggedOut] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  function removeAccessToken(): void {
    localStorage.removeItem("access_token");
    setLoggedOut(true);
    setIsButtonVisible(false);
  }

  useEffect(() => {
    if (loggedOut) {
      router.push("/login");
    }
  }, [loggedOut, router]);

  const handleLogout = () => {
    removeAccessToken();
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
