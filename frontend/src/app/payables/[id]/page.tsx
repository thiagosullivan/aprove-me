"use client";
import { Separator } from "@/app/_components/ui/separator";
import { useAuth } from "@/app/context/AuthContext";
import { fetchIndividualPayable } from "@/app/utils/fetchIndividualPayable";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DataType {
  id?: string;
  value: number;
  emissionDate: string;
  assignorId: string;
}

const PayablePage = () => {
  const params = useParams();
  const { id } = params;
  const { token } = useAuth();
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: any = await fetchIndividualPayable(id, token);
        setData(fetchedData);
      } catch (err) {
        setError("Erro ao buscar os dados");
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchData();
    }
  }, [id, token]);

  const formatDate = (dateString: string | undefined) => {
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
      <h2 className="text-center text-2xl font-bold">Detalhes do Recebível:</h2>

      <div className="mx-auto mt-8 flex w-full flex-col gap-y-4 rounded-lg border border-solid p-6 shadow-lg md:max-w-[800px]">
        <div className="flex items-center">
          <p className="mr-2 text-2xl font-bold text-bankmeBlue">ID:</p>
          <p className="text-2xl">{data?.id}</p>
        </div>
        <Separator />
        <div className="flex items-center">
          <p className="mr-2 text-2xl font-bold text-bankmeBlue">Valor:</p>
          <p className="text-2xl">{data?.value}</p>
        </div>
        <Separator />
        <div className="flex items-center">
          <p className="mr-2 text-2xl font-bold text-bankmeBlue">
            Data de emissão:
          </p>
          <p className="text-2xl">{formatDate(data?.emissionDate)}</p>
        </div>
        <Separator />
        <div className="flex">
          <p className="mr-2 text-2xl font-bold text-bankmeBlue">Cedente ID:</p>
          <p className="text-2xl">{data?.assignorId}</p>
        </div>
      </div>
    </div>
  );
};

export default PayablePage;
