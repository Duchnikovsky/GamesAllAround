import { MdReportGmailerrorred } from "react-icons/md";
import { PersonalTypes } from "../../../../utils/customersValidators";

interface PersonalsArrayTypes {
  label: string;
  value: string;
}

export default function CustomerDetailedPersonals({
  data,
}: {
  data: PersonalTypes;
}) {
  if (!data)
    return (
      <div className="h-full flex-col center col-span-2">
        <MdReportGmailerrorred size={48} />
        <span className="text-lg">Personals are not complete</span>
      </div>
    );

  const PersonalsArray : PersonalsArrayTypes[] = Object.entries(data).map(([key, value]) => ({
    label: key.substring(0, 1).toUpperCase() + key.substring(1),
    value: value,
  }));

  return (
    <div className="flex flex-col col-span-2">
      {PersonalsArray.map((item: PersonalsArrayTypes) => (
        <div className="flex h-12 pl-2 md:pl-0 flex-col">
          <span className="text-sm text-zinc-400">{item.label}</span>
          {item.label === "Phone" ? (
            <span>
              {item.value.substring(0, 3) +
                "-" +
                item.value.substring(3, 6) +
                "-" +
                item.value.substring(6)}
            </span>
          ) : (
            <span>{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
