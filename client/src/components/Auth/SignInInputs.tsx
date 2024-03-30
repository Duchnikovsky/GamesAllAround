import { AuthInputTypes, Values } from "../../utils/authValidators";
import { Input } from "../UI/Input";

interface SignInInputsProps {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}

export default function SignInInputs({ values, setValues }: SignInInputsProps) {
  const inputs: AuthInputTypes[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      pattern: "[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+",
      fontSize: 16,
      maxlenght: 100,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      pattern: "^[A-Za-z0-9]{6,18}$",
      fontSize: 24,
      maxlenght: 18,
    },
  ];
  
  return <>{inputs.map((input) => (
    <Input
      key={input.name}
      type={input.type}
      width="100%"
      height="3rem"
      label={input.label}
      fontSize={input.fontSize}
      length={values[input.name].length}
      maxLength={input.maxlenght}
      pattern={input.pattern}
      autoComplete="off"
      value={values[input.name]}
      onChange={(e) =>
        setValues({ ...values, [input.name]: e.target.value })
      }
    />
  ))}</>;
}
