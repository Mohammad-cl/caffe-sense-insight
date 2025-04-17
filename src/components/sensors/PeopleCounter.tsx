
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface PeopleCounterProps {
  count: number;
  maxCapacity: number;
}

export function PeopleCounter({ count, maxCapacity }: PeopleCounterProps) {
  const occupancyPercentage = (count / maxCapacity) * 100;
  const isHighOccupancy = occupancyPercentage > 80;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex justify-between text-base font-medium">
          <span>Café Occupancy</span>
          <span className="text-muted-foreground text-sm">Live</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                ${isHighOccupancy ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                <Users className="w-6 h-6" />
              </div>
              <div className={`absolute inset-0 rounded-full animate-pulse-ring 
                ${isHighOccupancy ? 'bg-amber-100' : 'bg-green-100'}`} />
            </div>
            <div>
              <div className="text-3xl font-bold">{count}</div>
              <div className="text-sm text-muted-foreground">People</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Max Capacity</div>
            <div className="text-lg font-semibold">{maxCapacity}</div>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Occupancy</span>
            <span className={isHighOccupancy ? 'text-amber-600' : 'text-green-600'}>
              {occupancyPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${isHighOccupancy ? 'bg-amber-500' : 'bg-green-500'}`}
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
