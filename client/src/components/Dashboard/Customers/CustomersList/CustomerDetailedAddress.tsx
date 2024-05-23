import { AddressTypes } from "../../../../utils/customersValidators";
import { MdReportGmailerrorred } from "react-icons/md";

interface AddressArrayTypes {
  label: string;
  value: string;
}

export default function CustomerDetailedAddress({
  data,
}: {
  data: AddressTypes;
}) {
  if (!data)
    return (
      <div className="h-full flex-col center col-span-2">
        <MdReportGmailerrorred size={48} />
        <span className="text-lg">Address is not complete</span>
      </div>
    );

  const AddressArray: AddressArrayTypes[] = Object.entries(data).map(
    ([key, value]) => ({
      label: key.substring(0, 1).toUpperCase() + key.substring(1),
      value: value,
    })
  );

  return (
    <div className="grid px-2 grid-cols-2 col-span-2 auto-rows-min">
      {AddressArray.map((item: AddressArrayTypes) => (
        <div className="flex flex-col h-12 odd:text-left even:text-right">
          <span className="text-sm text-zinc-400">{item.label}</span>
          {item.value}
        </div>
      ))}
    </div>
  );
}
