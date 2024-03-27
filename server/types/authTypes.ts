export interface DecodedTypes {
  authenticated: boolean;
  id: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  iat: number;
  exp: number;
}