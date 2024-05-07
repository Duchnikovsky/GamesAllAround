import { useContext } from "react";
import { EditProductsInputTypes } from "../../../../utils/productValidators";
import { Input } from "../../../UI/Input";
import { Textarea } from "../../../UI/Textarea";
import EditProductProducent from "./EditProductProducent";
import { EditValuesContext } from "./EditProduct";
import EditProductCategory from "./EditProductCategory";

const inputs: EditProductsInputTypes[] = [
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

export default function EditProductInputs() {
  const { values, setValues } = useContext(EditValuesContext);

  return (
    <div className="w-full flex flex-col gap-4 overflow-visible">
      {inputs.map((input: EditProductsInputTypes, index) => {
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
        onChange={(e) => setValues({ ...values, description: e.target.value })}
      />
      <EditProductCategory />
      <EditProductProducent />
    </div>
  );
}
