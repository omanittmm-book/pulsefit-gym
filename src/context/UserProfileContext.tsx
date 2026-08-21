import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, WeightUnit } from '../types/profile';
import { 
  calculateBMR, 
  calculateBMI, 
  calculateTDEE, 
  estimateExerciseCalories, 
  calculateTreadmillCalories 
} from '../utils/calorieCalculator';
import { Exercise, PlannedExercise } from '../types/fitness';

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setWeightUnit: (unit: WeightUnit) => void;
  bmr: number;
  tdee: number;
  bmiData: { bmi: number; categoryAr: string; categoryEn: string; color: string };
  getExerciseCalorieEstimate: (exercise: Exercise, sets?: number, repsText?: string, restSec?: number, targetWeightKg?: number) => {
    totalCalories: number;
    caloriesPerSet: number;
    durationMinutes: number;
    met: number;
  };
  getScheduleDayCalories: (exercises: PlannedExercise[]) => {
    totalCalories: number;
    totalDurationMin: number;
  };
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isTreadmillModalOpen: boolean;
  setIsTreadmillModalOpen: (open: boolean) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  weightKg: 75,
  heightCm: 175,
  age: 26,
  gender: 'male',
  activityLevel: 'moderate',
  weightUnit: 'kg'
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lafamilia_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.weightKg === 'number') {
          return { ...DEFAULT_PROFILE, ...parsed };
        }
      } catch {
        // Fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTreadmillModalOpen, setIsTreadmillModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lafamilia_user_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const setWeightUnit = (unit: WeightUnit) => {
    setProfile(prev => ({ ...prev, weightUnit: unit }));
  };

  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(profile);
  const bmiData = calculateBMI(profile.weightKg, profile.heightCm);

  const getExerciseCalorieEstimate = (
    exercise: Exercise,
    sets: number = exercise.defaultSets || 3,
    repsText: string = exercise.defaultReps || '10-12',
    restSec: number = exercise.defaultRestSec || 60,
    targetWeightKg: number = 0
  ) => {
    return estimateExerciseCalories(exercise, sets, repsText, restSec, targetWeightKg, profile);
  };

  const getScheduleDayCalories = (exercises: PlannedExercise[]) => {
    let totalCalories = 0;
    let totalDurationMin = 0;

    exercises.forEach(item => {
      if (item.exercise) {
        const res = estimateExerciseCalories(
          item.exercise,
          item.sets,
          item.reps,
          item.restSeconds,
          item.targetWeightKg || 0,
          profile
        );
        totalCalories += res.totalCalories;
        totalDurationMin += res.durationMinutes;
      }
    });

    return { totalCalories, totalDurationMin };
  };

  return (
    <UserProfileContext.Provider value={{
      profile,
      updateProfile,
      setWeightUnit,
      bmr,
      tdee,
      bmiData,
      getExerciseCalorieEstimate,
      getScheduleDayCalories,
      isProfileModalOpen,
      setIsProfileModalOpen,
      isTreadmillModalOpen,
      setIsTreadmillModalOpen
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
