import React from "react";
import { Values } from "../../../../../utils/authValidators";
import { Input } from "../../../../UI/Input";

interface InputTypes {
  name: string;
  type: string;
  label: string;
  pattern: string;
  maxlenght: number;
  className?: string;
}

const inputs: InputTypes[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    pattern: "[A-Za-z]{2,100}",
    maxlenght: 100,
  },
  {
    name: "lastname",
    type: "text",
    label: "Lastname",
    pattern: "[A-Za-z]{2,100}",
    maxlenght: 100,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    pattern: "[0-9]{9,12}",
    maxlenght: 12,
  },
];

export default function CustomerEditPersonalInputs({
  values,
  setValues,
}: {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}) {
  return (
    <div className="flex flex-col gap-4 md:pr-2">
      {inputs.map((input: InputTypes, index) => {
        return (
          <Input
            length={
              typeof values[input.name] === "string"
                ? values[input.name].toString().length
                : typeof values[input.name] === "number"
                ? Number(values[input.name])
                : 0
            }
            key={index}
            label={input.label}
            maxLength={input.maxlenght}
            type={input.type}
            className={input?.className}
            value={values[input.name]}
            onChange={(e) =>
              setValues({ ...values, [input.name]: e.target.value })
            }
          ></Input>
        );
      })}
    </div>
  );
}
