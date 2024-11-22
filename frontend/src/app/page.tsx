"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* <p className="text-bankmeBlue text-5xl font-bold">Bankme</p> */}
      <Suspense fallback={<p>Loading...</p>}></Suspense>
      <p>Home page</p>
      {isAuthenticated && <p>AUTENTICADO</p>}
    </div>
  );
}
