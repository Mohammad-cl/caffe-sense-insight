
import { createClient } from '@supabase/supabase-js';
import { SensorData } from '@/types/sensors';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const saveSensorData = async (data: SensorData) => {
  const { error } = await supabase
    .from('sensor_readings')
    .insert([
      {
        timestamp: data.timestamp,
        temperature: data.temperature,
        humidity: data.humidity,
        gas_level: data.gasLevel,
        co_level: data.coLevel,
        noise_level: data.noiseLevel,
        location: data.location
      }
    ]);
    
  if (error) {
    console.error('Error saving sensor data:', error);
    throw error;
  }
};

export const savePeopleCount = async (count: number) => {
  const { error } = await supabase
    .from('people_counts')
    .insert([
      {
        timestamp: new Date().getTime(),
        count: count
      }
    ]);
    
  if (error) {
    console.error('Error saving people count:', error);
    throw error;
  }
};

