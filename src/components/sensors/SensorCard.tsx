
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SensorConfig } from "@/types/sensors";

interface SensorCardProps {
  value: number;
  config: SensorConfig;
  location: string;
  isAlert?: boolean;
}

export function SensorCard({ value, config, location, isAlert }: SensorCardProps) {
  const { type, label, thresholds } = config;
  
  const formattedValue = value.toFixed(1);
  const isHigh = value > thresholds.max;
  const isLow = value < thresholds.min;
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all",
      isAlert && "border-destructive shadow-md"
    )}>
      <CardHeader className={cn(
        "p-4 pb-2",
        isHigh && "bg-red-500/10",
        isLow && "bg-blue-500/10"
      )}>
        <CardTitle className="flex justify-between text-base font-medium">
          <span>{label}</span>
          <span className="text-muted-foreground text-sm">{location}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-end justify-between">
          <div className={cn(
            "text-3xl font-bold",
            isHigh && "text-red-500",
            isLow && "text-blue-500"
          )}>
            {formattedValue}
            <span className="text-base ml-1 font-normal text-muted-foreground">
              {thresholds.unit}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Range: {thresholds.min}-{thresholds.max}{thresholds.unit}
          </div>
        </div>
        
        {/* Progress bar indicating value in range */}
        <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full",
              isHigh ? "bg-red-500" : isLow ? "bg-blue-500" : `bg-${config.type}`
            )}
            style={{
              width: `${Math.min(100, (value / thresholds.max) * 100)}%`,
              backgroundColor: !isHigh && !isLow ? config.color : undefined
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
