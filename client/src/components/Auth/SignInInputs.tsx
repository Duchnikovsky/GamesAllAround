import { AuthInputTypes, Values } from "../../utils/authValidators";
import { Input } from "../UI/Input";

interface SignInInputsProps {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}

const inputs: AuthInputTypes[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    pattern: "[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+",
    maxlenght: 100,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    pattern: "^[A-Za-z0-9]{6,18}$",
    maxlenght: 18,
    className: 'text-xl'
  },
];

export default function SignInInputs({ values, setValues }: SignInInputsProps) {
  
  return <>{inputs.map((input) => (
    <Input
      key={input.name}
      type={input.type}
      label={input.label}
      length={values[input.name].length}
      maxLength={input.maxlenght}
      pattern={input.pattern}
      autoComplete="off"
      className={input?.className}
      value={values[input.name]}
      onChange={(e) =>
        setValues({ ...values, [input.name]: e.target.value })
      }
    />
  ))}</>;
}
