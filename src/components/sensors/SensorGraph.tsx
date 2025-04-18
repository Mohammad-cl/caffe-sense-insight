
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
  zone1Data: SensorData[];
  zone2Data: SensorData[];
  sensorType: SensorType;
}

export function SensorGraph({ zone1Data, zone2Data, sensorType }: SensorGraphProps) {
  const sensorConfig = sensorConfigs[sensorType];
  
  // Format data for recharts
  const chartData = zone1Data.map((zone1Item) => {
    // Find matching timestamp in zone2
    const zone2Item = zone2Data.find(z2 => z2.timestamp === zone1Item.timestamp) || {
      [sensorType]: 0
    };
    
    return {
      timestamp: zone1Item.timestamp,
      time: new Date(zone1Item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      [`${sensorType}Zone1`]: zone1Item[sensorType],
      [`${sensorType}Zone2`]: zone2Item[sensorType]
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
              <Legend formatter={(value) => value.includes('Zone1') ? 'Zone 1' : 'Zone 2'} />
              <Line
                type="monotone"
                dataKey={`${sensorType}Zone1`}
                name="Zone 1"
                stroke="#FF6B6B"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={`${sensorType}Zone2`}
                name="Zone 2"
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

