
import {
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PeopleCount } from "@/types/sensors";

interface PeopleCountGraphProps {
  data: PeopleCount[];
}

export function PeopleCountGraph({ data }: PeopleCountGraphProps) {
  // Format data for recharts
  const chartData = data.map((item) => ({
    timestamp: item.timestamp,
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    count: item.count
  }));
  
  return (
    <Card className="w-full h-[350px] overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">
          Café Occupancy Over Time
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-full">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                allowDecimals={false}
                domain={[0, (dataMax: number) => Math.max(10, dataMax * 1.2)]}
                tickCount={5}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} people`, '']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="People Count"
                stroke="#7D5A3B"
                fill="#C8A887"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
