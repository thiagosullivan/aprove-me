export interface DecodedToken {
  id: string;
  name: string;
  login: string;
  exp?: number;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));
    return decodedPayload;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
