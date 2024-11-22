interface DataType {
  document: string;
  email: string;
  id: string;
  name: string;
  phone: string;
}

export const fetchAssignors = async (token: string): Promise<DataType[]> => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
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

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro desconhecido");
  }
};
