export interface DataType {
  id?: string;
  value: number;
  emissionDate: string;
  assignor: string;
  name: string;
}

export const fetchIndividualPayable = async (
  id: string | string[] | undefined,
  token: string | null,
): Promise<DataType[]> => {
  if (!id || Array.isArray(id)) {
    throw new Error("ID inválido ou ausente");
  }

  try {
    const response = await fetch(
      `http://localhost:3001/integrations/payable/${id}`,
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

    const data: DataType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};
