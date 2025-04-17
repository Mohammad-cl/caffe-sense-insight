
import { SensorData, PeopleCount, SensorConfig } from "@/types/sensors";

// Sensor configurations with thresholds
export const sensorConfigs: Record<string, SensorConfig> = {
  temperature: {
    type: 'temperature',
    label: 'Temperature',
    thresholds: { min: 19, max: 26, unit: '°C' },
    color: '#FF6B6B' // Red-ish
  },
  humidity: {
    type: 'humidity',
    label: 'Humidity',
    thresholds: { min: 40, max: 60, unit: '%' },
    color: '#4ECDC4' // Teal
  },
  gasLevel: {
    type: 'gasLevel',
    label: 'Gas Level',
    thresholds: { min: 0, max: 800, unit: 'ppm' },
    color: '#FFD166' // Yellow
  },
  coLevel: {
    type: 'coLevel',
    label: 'CO Level',
    thresholds: { min: 0, max: 50, unit: 'ppm' },
    color: '#F86624' // Orange
  },
  noiseLevel: {
    type: 'noiseLevel',
    label: 'Noise Level',
    thresholds: { min: 0, max: 60, unit: 'dB' },
    color: '#662E9B' // Purple
  }
};

// Generate random sensor data within threshold range
const generateRandomSensorData = (location: string, timestamp: number): SensorData => {
  // Generate values within thresholds with occasional anomalies
  const anomalyFactor = Math.random() > 0.95 ? 1.5 : 1;
  
  return {
    id: `${location}-${timestamp}`,
    timestamp,
    temperature: (sensorConfigs.temperature.thresholds.min + 
      Math.random() * (sensorConfigs.temperature.thresholds.max - sensorConfigs.temperature.thresholds.min)) * 
      (location === "Room 1" ? 1 : anomalyFactor),
    humidity: (sensorConfigs.humidity.thresholds.min + 
      Math.random() * (sensorConfigs.humidity.thresholds.max - sensorConfigs.humidity.thresholds.min)) * 
      (location === "Room 2" ? 1 : anomalyFactor),
    gasLevel: Math.random() * sensorConfigs.gasLevel.thresholds.max * anomalyFactor,
    coLevel: Math.random() * sensorConfigs.coLevel.thresholds.max * anomalyFactor,
    noiseLevel: (sensorConfigs.noiseLevel.thresholds.min + 
      Math.random() * (sensorConfigs.noiseLevel.thresholds.max - sensorConfigs.noiseLevel.thresholds.min)) * 
      anomalyFactor,
    location
  };
};

// Generate historical data for a given room
export const generateHistoricalData = (
  location: string, 
  hours: number = 24,
  interval: number = 60 * 60 * 1000 // 1 hour in milliseconds
): SensorData[] => {
  const now = Date.now();
  const data: SensorData[] = [];
  
  for (let i = 0; i < hours; i++) {
    const timestamp = now - (i * interval);
    data.push(generateRandomSensorData(location, timestamp));
  }
  
  return data.sort((a, b) => a.timestamp - b.timestamp);
};

// Generate current data for rooms
export const generateCurrentRoomData = (): SensorData[] => {
  const timestamp = Date.now();
  return [
    generateRandomSensorData("Room 1", timestamp),
    generateRandomSensorData("Room 2", timestamp),
  ];
};

// Generate people count data
export const generatePeopleCount = (hours: number = 24): PeopleCount[] => {
  const now = Date.now();
  const data: PeopleCount[] = [];
  let count = Math.floor(Math.random() * 10);
  
  for (let i = 0; i < hours; i++) {
    const timestamp = now - (i * 60 * 60 * 1000); // 1 hour
    // Simulate people entering/leaving
    count = Math.max(0, count + Math.floor(Math.random() * 7) - 3);
    data.push({
      id: `count-${timestamp}`,
      timestamp,
      count
    });
  }
  
  return data.sort((a, b) => a.timestamp - b.timestamp);
};

// Check if sensor value is within threshold
export const isSensorValueOk = (type: keyof typeof sensorConfigs, value: number): boolean => {
  const config = sensorConfigs[type];
  return value >= config.thresholds.min && value <= config.thresholds.max;
};

// Format sensor value with its unit
export const formatSensorValue = (type: keyof typeof sensorConfigs, value: number): string => {
  const unit = sensorConfigs[type].thresholds.unit;
  return `${value.toFixed(1)}${unit}`;
};
