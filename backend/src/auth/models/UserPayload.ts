export interface UserPayload {
  sub: string;
  login: string;
  name: string;
  iat?: number;
  exp?: number;
}
