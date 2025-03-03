export interface WeatherCurrent {
  interval: number;
  time: string; 
  temperature_2m: number;
  precipitation_probability: number;
  windspeed_10m: number;
}

export interface WeatherCurrentUnits {
  interval: string;
  time: string;
  temperature_2m: string;
  precipitation_probability: string;
  windspeed_10m: string;
}

export interface WeatherDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_hours: number[];
  wind_speed_10m_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherDailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  precipitation_hours: string;
  wind_speed_10m_max: string;
  sunrise: string;
  sunset: string;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  current: WeatherCurrent;
  current_units: WeatherCurrentUnits;
  daily: WeatherDaily;
  daily_units: WeatherDailyUnits;
}

