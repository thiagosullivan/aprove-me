"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DataType {
  document: string;
  email: string;
  id: string;
  name: string;
  phone: string;
}

const ListAssignorPage = () => {
  const { token } = useAuth();
  console.log(token, "TOKEN");
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Token não encontrado");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `http://localhost:3001/integrations/assignor`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Falha na requisição");
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="px-6 py-4">
      <h2 className="text-center text-2xl font-bold"> Lista de Cedentes:</h2>

      {data?.length <= 0 ? (
        <div className="mx-auto mt-8 flex w-full justify-center">
          <p className="text-center">
            Você ainda não possui nenhum cedentes cadastrado.
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
                <h3 className="mb-2 text-center text-2xl font-bold">
                  {item.name}
                </h3>
                <div className="mb-3">
                  <span className="font-bold text-bankmeBlue">Id:</span>
                  <p className="break-words">{item.id}</p>
                </div>
                <div className="mb-3">
                  <span className="font-bold text-bankmeBlue">Documento:</span>
                  <p className="break-words">{item.document}</p>
                </div>
                <div className="mb-3">
                  <span className="font-bold text-bankmeBlue">Email:</span>
                  <p className="break-words">{item.email}</p>
                </div>
                <div className="mb-3">
                  <span className="font-bold text-bankmeBlue">Telefone:</span>
                  <p className="break-words">{item.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListAssignorPage;
