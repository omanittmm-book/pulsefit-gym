export type Language = 'ar' | 'en';

export type MuscleCategory = 
  | 'chest' 
  | 'back' 
  | 'legs' 
  | 'shoulders' 
  | 'arms' 
  | 'core' 
  | 'cardio';

export type EquipmentType = 
  | 'barbell' 
  | 'dumbbell' 
  | 'cable' 
  | 'machine' 
  | 'bodyweight' 
  | 'kettlebell'
  | 'bands'
  | 'other';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  nameEn: string;
  nameAr: string;
  category: MuscleCategory;
  primaryMuscleEn: string;
  primaryMuscleAr: string;
  secondaryMusclesEn: string[];
  secondaryMusclesAr: string[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  imageUrl: string;
  defaultSets: number;
  defaultReps: string;
  defaultRestSec: number;
  instructionsEn: string[];
  instructionsAr: string[];
  tipsEn: string[];
  tipsAr: string[];
  mistakesEn?: string[];
  mistakesAr?: string[];
  isCustom?: boolean;
}

export interface PlannedExercise {
  id: string; // unique instance id for the scheduled item
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: string;
  targetWeightKg?: number;
  restSeconds: number;
  notes?: string;
}

export type DayOfWeek = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export interface DaySchedule {
  day: DayOfWeek;
  nameEn: string;
  nameAr: string;
  isRestDay: boolean;
  splitTitleEn: string;
  splitTitleAr: string;
  targetMuscles?: MuscleCategory[];
  exercises: PlannedExercise[];
}

export interface WorkoutTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  difficulty: DifficultyLevel;
  daysPerWeek: number;
  tags: string[];
  schedule: Record<DayOfWeek, {
    isRestDay: boolean;
    splitTitleEn: string;
    splitTitleAr: string;
    targetMuscles?: MuscleCategory[];
    exerciseIds: { exerciseId: string; sets: number; reps: string; restSec?: number; targetWeightKg?: number; notes?: string }[];
  }>;
  isCustom?: boolean;
}

export interface CompletedSet {
  setNumber: number;
  reps: number;
  weightKg: number;
  completed: boolean;
}

export interface WorkoutLogItem {
  id: string;
  date: string;
  workoutTitleEn: string;
  workoutTitleAr: string;
  durationMinutes: number;
  totalVolumeKg: number;
  completedSetsCount: number;
  exercisesSummary: {
    exerciseNameEn: string;
    exerciseNameAr: string;
    sets: CompletedSet[];
  }[];
}
