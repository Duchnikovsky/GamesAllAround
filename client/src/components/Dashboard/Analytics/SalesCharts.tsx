import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  sales: {
    name: string;
    endDate: Date;
    sales: number;
  }[];
}

export default function SalesCharts({ sales }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart width={400} height={200} data={sales}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <XAxis dataKey="name" reversed={true} />
        <Tooltip content={customTooltip}/>
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

const customTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 p-2 rounded-lg">
        <p className="text-zinc-200">{`${label}: ${payload[0].value} PLN`}</p>
      </div>
    );
  }
};
