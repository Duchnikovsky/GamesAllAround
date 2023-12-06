export interface DecodedTypes {
  authenticated: boolean;
  id: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  iat: number;
  exp: number;
}

export interface AuthTypes {
  email: string;
  password: string;
}

export type AuthSession = DecodedTypes | false;