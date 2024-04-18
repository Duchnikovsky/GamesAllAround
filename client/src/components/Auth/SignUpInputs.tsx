import { AuthInputTypes, Values } from "../../utils/authValidators";
import { Input } from "../UI/Input";

interface SignUpInputsProps {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}

export default function SignUpInputs({ values, setValues }: SignUpInputsProps) {
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
      className: "text-lg",
      maxlenght: 18,
    },
    {
      name: "rep_password",
      type: "password",
      label: "Repeat password",
      pattern: "^[A-Za-z0-9]{6,18}$",
      className: "text-lg",
      maxlenght: 18,
    },
  ];

  return (
    <>
      {inputs.map((input) => (
        <Input
          key={input.name}
          type={input.type}
          label={input.label}
          length={values[input.name].length}
          maxLength={input.maxlenght}
          pattern={input.pattern}
          value={values[input.name]}
          className={input.className}
          autoComplete="off"
          onChange={(e) =>
            setValues({ ...values, [input.name]: e.target.value })
          }
        />
      ))}
    </>
  );
}
