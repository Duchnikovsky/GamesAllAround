interface CustomersListProps {
  users: {
    email: string;
    createdAt: Date;
  }[];
}

export default function CustomersList({ users }: CustomersListProps) {
  return (
    <div className="w-full h-[19rem] flex flex-col overflow-y-auto thin-scrollbar">
      {users.map((person, index) => {
        const date = new Date(person.createdAt);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const finalDate = `${day}.${month}.${year} ${hour}:${minute}`;

        return (
          <div
            key={index}
            className="w-full min-h-8 px-4 odd:bg-zinc-900/40 even:bg-zinc-800/40 flex items-center "
          >
            <div className="w-4/6 overflow-x-auto no-scrollbar whitespace-nowrap">
              {person.email}
            </div>
            <div className="w-2/6 overflow-x-auto no-scrollbar whitespace-nowrap">
              {finalDate}
            </div>
          </div>
        );
      })}
    </div>
  );
}
