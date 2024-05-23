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
    name: "voivodeship",
    type: "text",
    label: "Voivodeship",
    pattern: "[A-Za-z]{2,100}",
    maxlenght: 100,
  },
  {
    name: "district",
    type: "text",
    label: "District",
    pattern: "[A-Za-z]{2,100}",
    maxlenght: 100,
  },
  {
    name: "town",
    type: "text",
    label: "Town",
    pattern: "[A-Za-z]{2,100}",
    maxlenght: 100,
  },
  {
    name: "street",
    type: "text",
    label: "Street",
    pattern: "[A-Za-z]{2,100}",
    maxlenght: 100,
  },
  {
    name: "residence",
    type: "text",
    label: "Residence",
    pattern: "[A-Za-z/]{1,100}",
    maxlenght: 100,
  },
  {
    name: "postcode",
    type: "text",
    label: "Postcode",
    pattern: "[0-9]{2}-[0-9]{3}",
    maxlenght: 6,
  }
];

export default function CustomerEditAddressInputs({
  values,
  setValues,
}: {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}) {
  return (
    <div className="flex flex-col gap-4 md:pl-2">
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
