export type WeightUnit = 'kg' | 'lbs';
export type HeightUnit = 'cm' | 'ft';
export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';

export interface UserProfile {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  weightUnit: WeightUnit;
}

export type SpeedUnit = 'kmh' | 'mph' | 'pace_km' | 'pace_mi';

export interface TreadmillParams {
  speed: number; // in current speedUnit
  speedUnit: SpeedUnit;
  incline: number; // 0 to 15%
  durationMinutes: number;
}

export interface TreadmillCalorieResult {
  speedKmh: number;
  speedMph: number;
  speedMetersPerMin: number;
  inclinePercent: number;
  durationMinutes: number;
  totalCalories: number;
  caloriesPerMinute: number;
  caloriesPerHour: number;
  vo2: number; // ml/kg/min
  met: number;
  inclineBoostPercent: number; // % increase vs 0% incline
  distanceKm: number;
  distanceMiles: number;
  estimatedSteps: number;
}
