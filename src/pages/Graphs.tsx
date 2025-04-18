
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SensorGraph } from "@/components/sensors/SensorGraph";
import { PeopleCountGraph } from "@/components/sensors/PeopleCountGraph";
import { 
  generateHistoricalData, 
  generatePeopleCount, 
  sensorConfigs 
} from "@/utils/mockData";
import { SensorData, PeopleCount, SensorType } from "@/types/sensors";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Graphs() {
  const [zoneData1, setZoneData1] = useState<SensorData[]>([]);
  const [zoneData2, setZoneData2] = useState<SensorData[]>([]);
  const [peopleCountData, setPeopleCountData] = useState<PeopleCount[]>([]);
  const [timeRange, setTimeRange] = useState<number>(12); // Default 12 hours

  // Load historical data
  useEffect(() => {
    loadHistoricalData(timeRange);
  }, [timeRange]);
  
  const loadHistoricalData = (hours: number) => {
    const zone1Data = generateHistoricalData("Zone 1", hours);
    const zone2Data = generateHistoricalData("Zone 2", hours);
    const peopleData = generatePeopleCount(hours);
    
    setZoneData1(zone1Data);
    setZoneData2(zone2Data);
    setPeopleCountData(peopleData);
  };

  // Available sensor types for graphs
  const sensorTypes: SensorType[] = [
    'temperature', 'humidity', 'gasLevel', 'coLevel', 'noiseLevel'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Historical Data | Diners</title>
      </Helmet>
      
      <main className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Historical Data</h1>
          <ThemeToggle />
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Sensor Graphs</h2>
          
          <Tabs defaultValue="12" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="6" onClick={() => setTimeRange(6)}>6h</TabsTrigger>
              <TabsTrigger value="12" onClick={() => setTimeRange(12)}>12h</TabsTrigger>
              <TabsTrigger value="24" onClick={() => setTimeRange(24)}>24h</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PeopleCountGraph data={peopleCountData} />
          
          {sensorTypes.map((type) => (
            <SensorGraph 
              key={type}
              zone1Data={zoneData1} 
              zone2Data={zoneData2}
              sensorType={type}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

