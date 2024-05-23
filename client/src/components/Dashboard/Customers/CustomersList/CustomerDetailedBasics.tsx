import { MdReportGmailerrorred } from "react-icons/md";

interface DataArrayTypes {
  label: string;
  value: string;
}

interface BasicCustomerProps {
  userID: string;
  email: string;
  createdAt: string;
}

export default function CustomerDetailedBasics({
  data,
}: {
  data: BasicCustomerProps;
}) {
  if (!data)
    return (
      <div className="h-full flex-col center col-span-2">
        <MdReportGmailerrorred size={48} />
        <span className="text-lg">Basic data is not complete</span>
      </div>
    );

  const CustomerData: DataArrayTypes[] = Object.entries(data).map(
    ([key, value]) => ({
      label: key.substring(0, 1).toUpperCase() + key.substring(1),
      value: value,
    })
  );

  return (
    <div className="flex flex-col pl-2 md:pl-0 text-left md:text-left lg:text-right md:col-start-2 lg:col-start-5 col-span-2 pr-2">
      {CustomerData.map((item: DataArrayTypes) => (
        <div className="flex h-12 flex-col items-start md:items-center lg:items-end">
          <span className="text-sm text-zinc-400">{item.label}</span>
          {item.label === "CreatedAt" ? (
            <span>{new Date(item.value).toLocaleString()}</span>
          ) : (
            <span>{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
