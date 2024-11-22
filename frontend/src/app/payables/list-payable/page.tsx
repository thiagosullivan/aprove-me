"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { fetchPayables } from "@/app/utils/fetchPayables";
import { Link2 } from "lucide-react";

interface DataType {
  id?: string;
  value: number;
  emissionDate: string;
  assignor: string;
}

const ListPayablePage = () => {
  const { token } = useAuth();
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setError("Token não encontrado");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const result = await fetchPayables(token);
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, router]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch {
      return "Data inválida";
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="px-6 py-4">
      <h2 className="text-center text-2xl font-bold"> Lista de Recebíveis:</h2>

      {data?.length <= 0 ? (
        <div className="mx-auto mt-8 flex w-full justify-center">
          <p className="text-center">
            Você ainda não possui nenhum pagável cadastrado.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 flex-row flex-wrap gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          {data?.map((item, id) => {
            return (
              <div
                key={id}
                className="w-full rounded-lg border border-solid p-6 shadow-lg md:max-w-[300px]"
              >
                <h3 className="mb-6 text-center font-bold">{item.id}</h3>
                <div className="mb-3">
                  <span className="font-bold text-bankmeBlue">Valor:</span>
                  <p className="break-words">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.value)}
                  </p>
                </div>
                <div className="mb-3">
                  <span className="font-bold text-bankmeBlue">
                    Data de emissão:
                  </span>
                  <p className="break-words">{formatDate(item.emissionDate)}</p>
                </div>

                <Link
                  href={`/payables/${item.id}`}
                  className="mt-6 flex items-center hover:text-bankmeBlue"
                >
                  <Link2 size={18} className="mr-1 text-bankmeBlue" />
                  <span className="underline">Abrir pagável</span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListPayablePage;
