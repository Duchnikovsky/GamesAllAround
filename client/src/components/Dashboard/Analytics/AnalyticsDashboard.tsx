import { cn } from "../../../utils/tailwindMerge";
import CustomersCard from "./CustomersCard";
import OrdersCard from "./OrdersCard";
import SalesCard from "./SalesCard";

interface CardsTypes {
  id: number;
  title: string;
  rowSpan: number;
  content: React.ReactNode;
}

const analyticsCards: CardsTypes[] = [
  {
    id: 1,
    title: "Total sales",
    rowSpan: 1,
    content: <SalesCard />,
  },
  {
    id: 2,
    title: "Customers",
    rowSpan: 2,
    content: <CustomersCard />
  },
  {
    id: 3,
    title: "Orders",
    rowSpan: 2,
    content: <OrdersCard />
  }
];

export default function AnalyticsDashboard() {
  return (
    <div className="absolute w-full top-32 sm:top-24 left-0">
      <div className="w-full h-12 flex justify-center sm:justify-start">
        <div className="text-zinc-200 text-3xl tracking-wider text-shadow">
          Dashboard analytics
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {analyticsCards.map((card: CardsTypes) => (
          <div
            key={card.id}
            className={cn(
              "w-full p-4 bg-modal border border-zinc-200/20 rounded-lg row-span-1",
              card.rowSpan == 2 && `row-span-2`
            )}
          >
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}
