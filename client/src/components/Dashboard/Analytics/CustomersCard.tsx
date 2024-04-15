import { IoMdRefresh } from "react-icons/io";
import CustomersSearchbar from "./CustomersSearchbar";
import { FormEvent, useState } from "react";
import CustomersList from "./CustomersList";
import { useQuery } from "@tanstack/react-query";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";

interface UsersTypes {
  users: {
    email: string;
    createdAt: Date;
  }[];
  newUsers: number;
}

interface fetchUsersProps {
  value: string;
}

async function fetchUsers({ value }: fetchUsersProps) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/dashboard/analytics/getUsers?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as UsersTypes;
}

export default function CustomersCard() {
  const [value, setValue] = useState<string>("");

  const { refetch, data, isLoading, isRefetching } = useQuery({
    queryKey: ["analytics-customers-query"],
    queryFn: () => fetchUsers({ value }),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center">
        <TbLoader3
          size={32}
          strokeWidth={1}
          className="animate-spin text-zinc-200"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col text-zinc-200 gap-2">
      <div className="flex flex-row justify-between text-zinc-200 text-2xl mb-6">
        Customers
        <IoMdRefresh
          className="cursor-pointer hover:text-zinc-500 transition-colors hover:animate-spin"
          onClick={() => refetch()}
        />
      </div>
      <form
        className="flex flex-col"
        onSubmit={(e: FormEvent) => {
          refetch();
          e.preventDefault();
        }}
      >
        <CustomersSearchbar value={value} setValue={setValue} />
        <div className="w-full h-8 mt-4 px-4 bg-zinc-900/90 flex flex-row items-center text-zinc-200/70">
          <div className="w-4/6">Email</div>
          <div className="w-2/6 mr-1">Created at</div>
        </div>
        {isRefetching ? (
          <div className="w-full h-[19rem] flex items-center justify-center">
            <TbLoader3
              size={32}
              strokeWidth={1}
              className="animate-spin text-zinc-200"
            />
          </div>
        ) : (
          <CustomersList users={data?.users!} />
        )}
      </form>
      <div>
        <div className="text-3xl">
          {data?.newUsers} <span className="text-base">new customers</span>
        </div>
        <div className="font-light text-zinc-200/60">Last week</div>
      </div>
    </div>
  );
}
