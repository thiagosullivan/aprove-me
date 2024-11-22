interface DataType {
  id?: string;
  value: string;
  emissionDate: string;
  assignor: string;
}

export const fetchPayables = async (token: string): Promise<DataType[]> => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`http://localhost:3001/integrations/payable`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha na requisição");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro desconhecido");
  }
};
