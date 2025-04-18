
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SensorCard } from "@/components/sensors/SensorCard";
import { PeopleCounter } from "@/components/sensors/PeopleCounter";
import { RoomStatusCard } from "@/components/sensors/RoomStatusCard";
import { sensorConfigs, generateCurrentRoomData, generatePeopleCount } from "@/utils/mockData";
import { SensorData } from "@/types/sensors";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Dashboard() {
  const [zonesData, setZonesData] = useState<SensorData[]>([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const maxCapacity = 50;

  // Simulate real-time data updates
  useEffect(() => {
    // Initial data load
    updateData();
    
    // Set up refresh interval
    const interval = setInterval(() => {
      updateData();
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const updateData = () => {
    const newZoneData = generateCurrentRoomData();
    setZonesData(newZoneData);
    
    // Update people count
    const peopleCountData = generatePeopleCount(1);
    setPeopleCount(peopleCountData[0].count);
  };
  
  // Get data for specific zone
  const getZoneData = (zoneName: string) => {
    return zonesData.find(data => data.location === zoneName);
  };
  
  const zone1Data = getZoneData("Zone 1");
  const zone2Data = getZoneData("Zone 2");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard | Diners</title>
      </Helmet>
      
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <PeopleCounter count={peopleCount} maxCapacity={maxCapacity} />
          
          {zone1Data && <RoomStatusCard data={zone1Data} />}
          {zone2Data && <RoomStatusCard data={zone2Data} />}
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Zone 1 Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {zone1Data && Object.entries(sensorConfigs).map(([key, config]) => (
            <SensorCard 
              key={key}
              value={zone1Data[key as keyof SensorData] as number}
              config={config}
              location="Zone 1"
            />
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Zone 2 Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {zone2Data && Object.entries(sensorConfigs).map(([key, config]) => (
            <SensorCard 
              key={key}
              value={zone2Data[key as keyof SensorData] as number}
              config={config}
              location="Zone 2"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

