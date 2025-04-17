
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData } from "@/types/sensors";
import { isSensorValueOk, sensorConfigs, formatSensorValue } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface RoomStatusCardProps {
  data: SensorData;
  className?: string;
}

export function RoomStatusCard({ data, className }: RoomStatusCardProps) {
  // Check if all sensor values are within acceptable ranges
  const temperatureOk = isSensorValueOk('temperature', data.temperature);
  const humidityOk = isSensorValueOk('humidity', data.humidity);
  const gasLevelOk = isSensorValueOk('gasLevel', data.gasLevel);
  const coLevelOk = isSensorValueOk('coLevel', data.coLevel);
  const noiseLevelOk = isSensorValueOk('noiseLevel', data.noiseLevel);
  
  const allOk = temperatureOk && humidityOk && gasLevelOk && coLevelOk && noiseLevelOk;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between space-y-0 p-4",
        allOk ? "bg-green-500/10" : "bg-red-500/10"
      )}>
        <CardTitle className="text-lg font-semibold">
          {data.location}
        </CardTitle>
        <div className={cn(
          "flex items-center rounded-full p-1",
          allOk ? "text-green-500" : "text-red-500"
        )}>
          {allOk ? 
            <CheckCircle className="h-5 w-5" /> : 
            <AlertTriangle className="h-5 w-5" />
          }
        </div>
      </CardHeader>
      <CardContent className="p-4 grid gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div 
            className={cn(
              "flex items-center gap-2 rounded-md border p-2",
              !temperatureOk && "border-red-500/50 bg-red-500/10"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-sensor-temperature"></div>
            <div className="text-sm">
              Temp: <span className="font-medium">{formatSensorValue('temperature', data.temperature)}</span>
            </div>
          </div>
          
          <div 
            className={cn(
              "flex items-center gap-2 rounded-md border p-2",
              !humidityOk && "border-red-500/50 bg-red-500/10"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-sensor-humidity"></div>
            <div className="text-sm">
              Humidity: <span className="font-medium">{formatSensorValue('humidity', data.humidity)}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div 
            className={cn(
              "flex items-center gap-2 rounded-md border p-2",
              !gasLevelOk && "border-red-500/50 bg-red-500/10"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-sensor-gas"></div>
            <div className="text-sm">
              Gas: <span className="font-medium">{formatSensorValue('gasLevel', data.gasLevel)}</span>
            </div>
          </div>
          
          <div 
            className={cn(
              "flex items-center gap-2 rounded-md border p-2",
              !coLevelOk && "border-red-500/50 bg-red-500/10"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-sensor-co"></div>
            <div className="text-sm">
              CO: <span className="font-medium">{formatSensorValue('coLevel', data.coLevel)}</span>
            </div>
          </div>
          
          <div 
            className={cn(
              "flex items-center gap-2 rounded-md border p-2",
              !noiseLevelOk && "border-red-500/50 bg-red-500/10"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-sensor-noise"></div>
            <div className="text-sm">
              Noise: <span className="font-medium">{formatSensorValue('noiseLevel', data.noiseLevel)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date(data.timestamp).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}
