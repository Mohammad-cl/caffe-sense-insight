
export interface SensorData {
  id: string;
  timestamp: number;
  temperature: number;
  humidity: number;
  gasLevel: number;
  coLevel: number;
  noiseLevel: number;
  location: string;
}

export interface PeopleCount {
  id: string;
  timestamp: number;
  count: number;
}

export interface RoomData {
  room: string;
  currentData: SensorData;
  statusOk: boolean;
}

export type SensorType = 'temperature' | 'humidity' | 'gasLevel' | 'coLevel' | 'noiseLevel';

export interface SensorThreshold {
  min: number;
  max: number;
  unit: string;
}

export interface SensorConfig {
  type: SensorType;
  label: string;
  thresholds: SensorThreshold;
  color: string;
}
