import { useContext } from "react";
import { Input } from "../../../UI/Input";
import { Textarea } from "../../../UI/Textarea";
import AddProductCategory from "./AddProductCategory";
import AddProductImage from "./AddProductImage";
import AddProductProducent from "./AddProductProducent";
import { ValuesContext } from "./AddProduct";
import { AddProductInputTypes } from "../../../../utils/productValidators";

const inputs: AddProductInputTypes[] = [
  {
    name: "name",
    type: "text",
    label: "Product name",
    maxLength: 100,
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    maxLength: 10,
  },
];

export default function AddProductInputs() {
  const {values, setValues} = useContext(ValuesContext);

  return (
    <div className="w-full flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 sm:pr-12 flex flex-col gap-4">
        {inputs.map((input: AddProductInputTypes, index) => {
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
              maxLength={input.maxLength}
              type={input.type}
              className={input?.className}
              value={values[input.name]}
              onChange={(e) =>
                setValues({ ...values, [input.name]: e.target.value })
              }
            ></Input>
          );
        })}
        <Textarea
          label="Description"
          length={values["description"].length}
          value={values["description"]}
          className="h-[10.25rem]"
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
        />
        <AddProductCategory />
        <AddProductProducent />
      </div>
      <div className="w-full sm:w-1/2 sm:pl-12 mt-4 sm:mt-0">
        <AddProductImage />
      </div>
    </div>
  );
}
