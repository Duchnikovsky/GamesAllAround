export interface AuthInputTypes{
  name: string;
  type: string;
  label: string;
  pattern: string;
  fontSize: number;
  maxlenght: number;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface Values {
  [key: string]: string;
}