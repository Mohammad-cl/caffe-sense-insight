
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData, SensorType } from "@/types/sensors";
import { sensorConfigs } from "@/utils/mockData";

interface SensorGraphProps {
  room1Data: SensorData[];
  room2Data: SensorData[];
  sensorType: SensorType;
}

export function SensorGraph({ room1Data, room2Data, sensorType }: SensorGraphProps) {
  const sensorConfig = sensorConfigs[sensorType];
  
  // Format data for recharts
  const chartData = room1Data.map((room1Item) => {
    // Find matching timestamp in room2
    const room2Item = room2Data.find(r2 => r2.timestamp === room1Item.timestamp) || {
      [sensorType]: 0
    };
    
    return {
      timestamp: room1Item.timestamp,
      time: new Date(room1Item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      [`${sensorType}Room1`]: room1Item[sensorType],
      [`${sensorType}Room2`]: room2Item[sensorType]
    };
  });
  
  return (
    <Card className="w-full h-[350px] overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">
          {sensorConfig.label} Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-full">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                domain={[
                  (dataMin: number) => Math.max(0, dataMin * 0.8),
                  (dataMax: number) => dataMax * 1.2
                ]}
                tickCount={5}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                unit={sensorConfig.thresholds.unit}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)} ${sensorConfig.thresholds.unit}`, '']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend formatter={(value) => value.includes('Room1') ? 'Room 1' : 'Room 2'} />
              <Line
                type="monotone"
                dataKey={`${sensorType}Room1`}
                name="Room 1"
                stroke="#FF6B6B"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={`${sensorType}Room2`}
                name="Room 2"
                stroke="#4ECDC4"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
