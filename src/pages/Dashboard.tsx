
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SensorCard } from "@/components/sensors/SensorCard";
import { PeopleCounter } from "@/components/sensors/PeopleCounter";
import { RoomStatusCard } from "@/components/sensors/RoomStatusCard";
import { sensorConfigs, generateCurrentRoomData, generatePeopleCount } from "@/utils/mockData";
import { SensorData } from "@/types/sensors";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Dashboard() {
  const [roomsData, setRoomsData] = useState<SensorData[]>([]);
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
    const newRoomData = generateCurrentRoomData();
    setRoomsData(newRoomData);
    
    // Update people count
    const peopleCountData = generatePeopleCount(1);
    setPeopleCount(peopleCountData[0].count);
  };
  
  // Get data for specific room
  const getRoomData = (roomName: string) => {
    return roomsData.find(data => data.location === roomName);
  };
  
  const room1Data = getRoomData("Room 1");
  const room2Data = getRoomData("Room 2");

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
          
          {room1Data && <RoomStatusCard data={room1Data} />}
          {room2Data && <RoomStatusCard data={room2Data} />}
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Room 1 Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {room1Data && Object.entries(sensorConfigs).map(([key, config]) => (
            <SensorCard 
              key={key}
              value={room1Data[key as keyof SensorData] as number}
              config={config}
              location="Room 1"
            />
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Room 2 Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {room2Data && Object.entries(sensorConfigs).map(([key, config]) => (
            <SensorCard 
              key={key}
              value={room2Data[key as keyof SensorData] as number}
              config={config}
              location="Room 2"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
