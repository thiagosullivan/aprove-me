"use client";

import withAuth from "./utils/withAuth";
import Link from "next/link";
import { Button } from "./_components/ui/button";

const Home = () => {
  return (
    <div className="mx-auto block h-full w-full">
      <h1 className="mt-10 text-center text-5xl font-semibold">
        Seja bem-vindo ao
        <span className="font-extrabold text-bankmeBlue"> Bankme</span>
      </h1>
      <div className="mx-auto mt-14 w-full max-w-[600px]">
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            className="w-[220px] rounded-lg bg-bankmeBlue p-4 text-center text-sm font-bold text-white"
            href="/payables/list-payable"
          >
            Acesse a lista de recebiveis
          </Link>
          <Link
            className="w-[220px] rounded-lg bg-bankmeBlue p-4 text-center text-sm font-bold text-white"
            href="/payables/add-payable"
          >
            Cadastre um novo recebível
          </Link>

          <Link
            className="w-[220px] rounded-lg bg-bankmeBlue p-4 text-center text-sm font-bold text-white"
            href="/assignors/list-assignors"
          >
            Acesse a lista de cedentes
          </Link>
          <Link
            className="w-[220px] rounded-lg bg-bankmeBlue p-4 text-center text-sm font-bold text-white"
            href="/assignors/add-assignor"
          >
            Cadastre um novo cedente
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
