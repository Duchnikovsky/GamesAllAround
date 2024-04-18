export interface AuthInputTypes{
  name: string;
  type: string;
  label: string;
  pattern: string;
  maxlenght: number;
  className?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload{
  email: string;
  password: string;
  rep_password: string;
}

export interface Values {
  [key: string]: string;
}