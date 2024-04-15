import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OrdersChartsProps {
  orders: {
    name: string;
    endDate: Date;
    orders: number;
    gamesCount: number;
    dlcsCount: number;
    othersCount: number;
  }[];
}

export default function OrdersCharts({ orders }: OrdersChartsProps) {
  const gamesTypes = [
    {
      name: "Games",
      orders: 0,
    },
    {
      name: "DLCs",
      orders: 0,
    },
    {
      name: "Others",
      orders: 0,
    },
  ];

  orders.forEach((order) => {
    gamesTypes[0].orders += order.gamesCount;
    gamesTypes[1].orders += order.dlcsCount;
    gamesTypes[2].orders += order.othersCount;
  });

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={400} height={200} data={orders}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis dataKey="name" reversed={true} />
          <Tooltip content={customTooltip} />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart width={400} height={200} data={gamesTypes}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis allowDecimals={false}/>
          <XAxis dataKey="name" />
          <Tooltip content={customTooltip}/>
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
const customTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 p-2 rounded-lg">
        <p className="text-zinc-200 tracking-widest">{`${label}: ${payload[0].value} Order`}</p>
      </div>
    );
  }
};
