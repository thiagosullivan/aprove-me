export interface DecodedToken {
  id: string;
  name: string;
  login: string;
  exp?: number;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split(".")[1]; // Extrai o payload (2ª parte do token)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Ajusta formato do base64
    const decodedPayload = JSON.parse(atob(base64)); // Decodifica e converte para JSON
    return decodedPayload;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
