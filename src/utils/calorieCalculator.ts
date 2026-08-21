import { UserProfile, TreadmillParams, TreadmillCalorieResult, SpeedUnit } from '../types/profile';
import { Exercise, MuscleCategory } from '../types/fitness';

/**
 * Calculates BMR using the Mifflin-St Jeor Equation
 * Men: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) + 5
 * Women: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) - 161
 */
export function calculateBMR(profile: UserProfile): number {
  const { weightKg, heightCm, age, gender } = profile;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

/**
 * Calculates BMI (Body Mass Index) = weight (kg) / (height (m))^2
 */
export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; categoryAr: string; categoryEn: string; color: string } {
  const heightMeters = heightCm / 100;
  if (heightMeters <= 0) return { bmi: 0, categoryAr: 'غير معروف', categoryEn: 'Unknown', color: 'text-zinc-400' };
  
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  if (bmi < 18.5) {
    return { bmi, categoryAr: 'نقص في الوزن (نحافة)', categoryEn: 'Underweight', color: 'text-sky-400' };
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return { bmi, categoryAr: 'وزن مثالي وصحي', categoryEn: 'Normal weight', color: 'text-emerald-400' };
  } else if (bmi >= 25 && bmi < 29.9) {
    return { bmi, categoryAr: 'زيادة طفيفة في الوزن', categoryEn: 'Overweight', color: 'text-amber-400' };
  } else {
    return { bmi, categoryAr: 'سمنة (كتلة مرتفعة)', categoryEn: 'Obese', color: 'text-rose-400' };
  }
}

/**
 * Calculates TDEE (Total Daily Energy Expenditure)
 */
export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9
  };
  const multiplier = multipliers[profile.activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
}

/**
 * Base MET (Metabolic Equivalent of Task) mapping for muscle categories and specific lifts
 */
export const CATEGORY_BASE_MET: Record<MuscleCategory, number> = {
  legs: 6.8,      // High metabolic demand (Squats, RDL, Leg Press)
  back: 6.0,      // Deadlifts, Rows, Pullups
  chest: 5.5,     // Bench Press, Dips, Flyes
  shoulders: 5.0, // Overhead Press, Lateral Raises
  arms: 4.5,      // Bicep Curls, Tricep Extensions
  core: 4.2,      // Planks, Leg Raises
  cardio: 8.5     // Kettlebell swings, HIIT, Rowing
};

/**
 * Specific MET overrides for precise exercises
 */
const SPECIFIC_EXERCISE_MET: Record<string, number> = {
  'deadlift-conventional': 8.0,
  'barbell-back-squat': 7.8,
  'romanian-deadlift-dumbbell': 6.5,
  'bench-press-barbell': 6.0,
  'incline-dumbbell-press': 5.8,
  'chest-dips': 6.0,
  'overhead-barbell-press': 5.5,
  'bent-over-barbell-row': 6.2,
  'kettlebell-swings': 9.5,
  'rowing-machine-intervals': 9.0,
  'treadmill-incline-walk-run': 8.5,
  'treadmill-hiit-sprints': 11.5,
  'plank-hold': 3.8,
  'hanging-leg-raises': 4.5
};

/**
 * Returns the MET value for an exercise
 */
export function getExerciseMET(exercise?: Exercise | null): number {
  if (!exercise) return 5.0;
  if (exercise.id && SPECIFIC_EXERCISE_MET[exercise.id]) {
    return SPECIFIC_EXERCISE_MET[exercise.id];
  }
  return (exercise.category && CATEGORY_BASE_MET[exercise.category]) || 5.0;
}

/**
 * Calculates calories burned per minute using scientific ACSM/MET standard:
 * Calories/min = (MET * 3.5 * weightKg) / 200
 */
export function calculateCaloriesPerMinute(met: number, weightKg: number): number {
  return Number(((met * 3.5 * weightKg) / 200).toFixed(2));
}

/**
 * Estimates calories burned for a specific gym resistance exercise based on:
 * - User body profile (Weight, Age, Height, Gender)
 * - Sets count
 * - Reps count (converts to active tension time)
 * - Rest periods (burns calories at lower metabolic rate during recovery)
 * - Target weight lifted (adds progressive resistance work)
 */
export function estimateExerciseCalories(
  exercise?: Exercise | null,
  sets: number = 3,
  repsText: string = '10-12',
  restSec: number = 60,
  targetWeightKg: number = 0,
  profile?: UserProfile
): { totalCalories: number; caloriesPerSet: number; durationMinutes: number; met: number } {
  const effectiveProfile: UserProfile = profile || {
    weightKg: 75,
    heightCm: 175,
    age: 26,
    gender: 'male',
    activityLevel: 'moderate',
    weightUnit: 'kg'
  };

  const met = getExerciseMET(exercise);
  const { weightKg, gender, age } = effectiveProfile;

  // Estimate average reps number from text (e.g. "8-10" -> 9, "45-60 sec" -> 15 reps equivalent)
  let numericReps = 10;
  const safeRepsText = repsText ? String(repsText) : '10';
  if (safeRepsText.includes('-')) {
    const parts = safeRepsText.split('-').map(p => parseInt(p.trim())).filter(n => !isNaN(n));
    if (parts.length >= 2) numericReps = (parts[0] + parts[1]) / 2;
    else if (parts.length === 1) numericReps = parts[0];
  } else if (!isNaN(parseInt(safeRepsText))) {
    numericReps = parseInt(safeRepsText);
  }

  // Active work time per set in seconds (~3.5 seconds per repetition tempo + isometric squeeze)
  const workTimePerSetSec = Math.max(25, numericReps * 3.5);
  
  // Total time per set = work time + rest time
  const totalSetTimeSec = workTimePerSetSec + restSec;
  const totalDurationMin = Number(((sets * totalSetTimeSec) / 60).toFixed(1));

  // Base active burn rate per minute
  const baseActiveBurnPerMin = (met * 3.5 * weightKg) / 200;
  // Recovery rest burn rate per minute (~1.5 MET during rest between sets)
  const recoveryBurnPerMin = (1.8 * 3.5 * weightKg) / 200;

  // Active work calories per set
  const activeCaloriesPerSet = (baseActiveBurnPerMin * (workTimePerSetSec / 60));
  // Recovery calories per set
  const restCaloriesPerSet = (recoveryBurnPerMin * (restSec / 60));

  // Additional mechanical energy factor for heavy weight lifted relative to body weight
  let weightFactor = 1.0;
  if (targetWeightKg > 0) {
    const loadRatio = targetWeightKg / weightKg;
    weightFactor += Math.min(0.35, loadRatio * 0.15); // up to +35% for heavy compound lifts
  }

  // Age factor: metabolic efficiency slightly declines ~1% per 5 years past 30
  let ageMultiplier = 1.0;
  if (age > 30) {
    ageMultiplier = Math.max(0.88, 1 - (age - 30) * 0.003);
  }

  // Gender muscle mass expenditure differential
  const genderMultiplier = gender === 'male' ? 1.04 : 0.96;

  const singleSetCalories = (activeCaloriesPerSet * weightFactor + restCaloriesPerSet) * ageMultiplier * genderMultiplier;
  const totalCalories = Math.max(1, Math.round(singleSetCalories * sets));

  return {
    totalCalories,
    caloriesPerSet: Number(singleSetCalories.toFixed(1)),
    durationMinutes: Math.max(1, Math.round(totalDurationMin)),
    met
  };
}

/**
 * =========================================================================
 * ACSM TREADMILL METABOLIC FORMULAS (Walking & Running with Incline)
 * =========================================================================
 * Standard American College of Sports Medicine equations:
 * 
 * 1. Speed conversions:
 *    - S (m/min) = Speed (km/h) * 16.6667
 *    - S (m/min) = Speed (mph) * 26.8224
 * 
 * 2. Walking Formula (<= 6.0 km/h or <= 3.7 mph):
 *    VO2 (ml/kg/min) = (0.1 * S) + (1.8 * S * G) + 3.5
 *    where S is speed in m/min, G is fractional grade (e.g. 10% incline = 0.10)
 * 
 * 3. Running Formula (> 6.0 km/h or > 3.7 mph):
 *    VO2 (ml/kg/min) = (0.2 * S) + (0.9 * S * G) + 3.5
 * 
 * 4. Caloric Expenditure:
 *    Calories/min = (VO2 * weightKg / 1000) * 5.0 kcal/L O2
 *    (or Calories/min = VO2 * weightKg / 200)
 */

export function convertSpeedToKmh(speed: number, unit: SpeedUnit): number {
  if (speed <= 0) return 0;
  switch (unit) {
    case 'kmh':
      return speed;
    case 'mph':
      return speed * 1.60934;
    case 'pace_km': // minutes per km -> speed in km/h = 60 / pace
      return speed > 0 ? 60 / speed : 0;
    case 'pace_mi': // minutes per mile -> speed in km/h = (60 / pace) * 1.60934
      return speed > 0 ? (60 / speed) * 1.60934 : 0;
    default:
      return speed;
  }
}

export function convertKmhToUnit(kmh: number, unit: SpeedUnit): number {
  if (kmh <= 0) return 0;
  switch (unit) {
    case 'kmh':
      return Number(kmh.toFixed(1));
    case 'mph':
      return Number((kmh / 1.60934).toFixed(1));
    case 'pace_km':
      return Number((60 / kmh).toFixed(2));
    case 'pace_mi':
      return Number(((60 / kmh) * 1.60934).toFixed(2));
    default:
      return kmh;
  }
}

export function calculateTreadmillCalories(
  params: TreadmillParams,
  profile: UserProfile
): TreadmillCalorieResult {
  const { speed, speedUnit, incline, durationMinutes } = params;
  const { weightKg, gender, age } = profile;

  // Standardize speed to km/h and m/min
  const speedKmh = convertSpeedToKmh(speed, speedUnit);
  const speedMph = Number((speedKmh / 1.60934).toFixed(1));
  const speedMetersPerMin = speedKmh * (1000 / 60); // 1 km/h = 16.6667 m/min

  // Fractional Grade (e.g. 8% incline = 0.08)
  const grade = Math.max(0, incline) / 100;

  // Decide Walking vs Running using standard ACSM threshold (6.0 km/h / 3.7 mph)
  let vo2: number;
  let vo2Flat: number; // for calculating % boost from incline

  if (speedKmh <= 6.0) {
    // ACSM Walking Equation
    // VO2 = Horizontal Component (0.1 * S) + Vertical Component (1.8 * S * G) + Resting Component (3.5)
    vo2 = (0.1 * speedMetersPerMin) + (1.8 * speedMetersPerMin * grade) + 3.5;
    vo2Flat = (0.1 * speedMetersPerMin) + 3.5;
  } else {
    // ACSM Running Equation
    // VO2 = Horizontal Component (0.2 * S) + Vertical Component (0.9 * S * G) + Resting Component (3.5)
    vo2 = (0.2 * speedMetersPerMin) + (0.9 * speedMetersPerMin * grade) + 3.5;
    vo2Flat = (0.2 * speedMetersPerMin) + 3.5;
  }

  // Convert VO2 (ml/kg/min) to MET (1 MET = 3.5 ml/kg/min)
  const met = Number((vo2 / 3.5).toFixed(1));

  // Calorie rate: kcal/min = (VO2 in ml/kg/min * weightKg / 1000) * 5 kcal/L O2
  // Age & gender subtle physiological adjustments:
  const ageFactor = age > 25 ? Math.max(0.90, 1 - (age - 25) * 0.0025) : 1.0;
  const genderFactor = gender === 'male' ? 1.02 : 0.98;

  const rawCaloriesPerMin = (vo2 * weightKg * 5.0) / 1000;
  const adjustedCaloriesPerMin = rawCaloriesPerMin * ageFactor * genderFactor;

  // Flat baseline comparison
  const flatCaloriesPerMin = ((vo2Flat * weightKg * 5.0) / 1000) * ageFactor * genderFactor;
  const inclineBoostPercent = flatCaloriesPerMin > 0 
    ? Math.round(((adjustedCaloriesPerMin - flatCaloriesPerMin) / flatCaloriesPerMin) * 100)
    : 0;

  const totalCalories = Math.max(1, Math.round(adjustedCaloriesPerMin * durationMinutes));
  const caloriesPerHour = Math.round(adjustedCaloriesPerMin * 60);

  // Distance calculations
  const distanceKm = Number(((speedKmh * durationMinutes) / 60).toFixed(2));
  const distanceMiles = Number((distanceKm / 1.60934).toFixed(2));

  // Average stride steps estimation (approx 1300 steps per km walking, 1050 steps per km running)
  const stepRatePerKm = speedKmh > 7.0 ? 1100 : 1350;
  const estimatedSteps = Math.round(distanceKm * stepRatePerKm);

  return {
    speedKmh: Number(speedKmh.toFixed(1)),
    speedMph,
    speedMetersPerMin: Number(speedMetersPerMin.toFixed(1)),
    inclinePercent: incline,
    durationMinutes,
    totalCalories,
    caloriesPerMinute: Number(adjustedCaloriesPerMin.toFixed(1)),
    caloriesPerHour,
    vo2: Number(vo2.toFixed(1)),
    met,
    inclineBoostPercent,
    distanceKm,
    distanceMiles,
    estimatedSteps
  };
}
