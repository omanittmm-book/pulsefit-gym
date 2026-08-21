import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Exercise, 
  PlannedExercise, 
  DaySchedule, 
  DayOfWeek, 
  WorkoutTemplate, 
  WorkoutLogItem 
} from '../types/fitness';
import { EXERCISES_DATA } from '../data/exercisesData';
import { WORKOUT_TEMPLATES } from '../data/templatesData';

interface WorkoutContextType {
  exercises: Exercise[];
  weeklySchedule: Record<DayOfWeek, DaySchedule>;
  selectedDay: DayOfWeek;
  setSelectedDay: (day: DayOfWeek) => void;
  favorites: string[];
  toggleFavorite: (exerciseId: string) => void;
  isFavorite: (exerciseId: string) => boolean;
  
  // Schedule manipulation
  addExerciseToDay: (day: DayOfWeek, exercise: Exercise, sets?: number, reps?: string, restSec?: number) => void;
  removeExerciseFromDay: (day: DayOfWeek, plannedId: string) => void;
  reorderExercises: (day: DayOfWeek, fromIndex: number, toIndex: number) => void;
  updatePlannedExercise: (day: DayOfWeek, plannedId: string, updates: Partial<PlannedExercise>) => void;
  toggleRestDay: (day: DayOfWeek) => void;
  updateDayTitle: (day: DayOfWeek, titleEn: string, titleAr: string) => void;
  clearDaySchedule: (day: DayOfWeek) => void;
  resetEntireWeek: () => void;
  applyTemplate: (templateId: string) => boolean;

  // Custom Exercises
  addCustomExercise: (newEx: Omit<Exercise, 'id' | 'isCustom'>) => void;
  
  // History & Logs
  workoutLogs: WorkoutLogItem[];
  addWorkoutLog: (log: Omit<WorkoutLogItem, 'id' | 'date'>) => void;
  deleteWorkoutLog: (id: string) => void;
  clearAllLogs: () => void;

  // Active workout
  activeWorkoutDay: DayOfWeek | null;
  setActiveWorkoutDay: (day: DayOfWeek | null) => void;

  // Import/Export
  exportScheduleJson: () => string;
  importScheduleJson: (jsonString: string) => boolean;
}

const DEFAULT_DAYS: DayOfWeek[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

const DAY_NAMES: Record<DayOfWeek, { en: string; ar: string }> = {
  sat: { en: 'Saturday', ar: 'السبت' },
  sun: { en: 'Sunday', ar: 'الأحد' },
  mon: { en: 'Monday', ar: 'الإثنين' },
  tue: { en: 'Tuesday', ar: 'الثلاثاء' },
  wed: { en: 'Wednesday', ar: 'الأربعاء' },
  thu: { en: 'Thursday', ar: 'الخميس' },
  fri: { en: 'Friday', ar: 'الجمعة' }
};

const getInitialSchedule = (allExercises: Exercise[]): Record<DayOfWeek, DaySchedule> => {
  const saved = localStorage.getItem('pulsefit_schedule');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Validate structure
      if (parsed && parsed.sat && parsed.sun && parsed.mon) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }

  // Populate with default PPL routine
  const ppl = WORKOUT_TEMPLATES[0];
  const schedule: Record<DayOfWeek, DaySchedule> = {} as Record<DayOfWeek, DaySchedule>;

  DEFAULT_DAYS.forEach((dayKey) => {
    const templateDay = ppl.schedule[dayKey];
    const dayExercises: PlannedExercise[] = [];

    if (templateDay && !templateDay.isRestDay) {
      templateDay.exerciseIds.forEach(item => {
        const ex = allExercises.find(e => e.id === item.exerciseId);
        if (ex) {
          dayExercises.push({
            id: `${dayKey}-${ex.id}-${Math.random().toString(36).substr(2, 9)}`,
            exerciseId: ex.id,
            exercise: ex,
            sets: item.sets,
            reps: item.reps,
            restSeconds: item.restSec || ex.defaultRestSec,
            targetWeightKg: 0
          });
        }
      });
    }

    schedule[dayKey] = {
      day: dayKey,
      nameEn: DAY_NAMES[dayKey].en,
      nameAr: DAY_NAMES[dayKey].ar,
      isRestDay: templateDay ? templateDay.isRestDay : false,
      splitTitleEn: templateDay ? templateDay.splitTitleEn : '',
      splitTitleAr: templateDay ? templateDay.splitTitleAr : '',
      exercises: dayExercises
    };
  });

  return schedule;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Custom exercises state
  const [customExercises, setCustomExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem('pulsefit_custom_exercises');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  const exercises = [...EXERCISES_DATA, ...customExercises];

  // Schedule state
  const [weeklySchedule, setWeeklySchedule] = useState<Record<DayOfWeek, DaySchedule>>(() => 
    getInitialSchedule(exercises)
  );

  // Selected Day state (defaults to today's day of week or Saturday)
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => {
    const dayNum = new Date().getDay(); // 0 is Sunday, 6 is Saturday
    const dayMap: Record<number, DayOfWeek> = {
      6: 'sat',
      0: 'sun',
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri'
    };
    return dayMap[dayNum] || 'sat';
  });

  // Active workout
  const [activeWorkoutDay, setActiveWorkoutDay] = useState<DayOfWeek | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('pulsefit_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  // History logs
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogItem[]>(() => {
    const saved = localStorage.getItem('pulsefit_history');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  // Persist schedule
  useEffect(() => {
    localStorage.setItem('pulsefit_schedule', JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  // Persist custom exercises
  useEffect(() => {
    localStorage.setItem('pulsefit_custom_exercises', JSON.stringify(customExercises));
  }, [customExercises]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('pulsefit_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist logs
  useEffect(() => {
    localStorage.setItem('pulsefit_history', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  const toggleFavorite = (exerciseId: string) => {
    setFavorites(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  const isFavorite = (exerciseId: string) => favorites.includes(exerciseId);

  const addExerciseToDay = (
    day: DayOfWeek, 
    exercise: Exercise, 
    sets?: number, 
    reps?: string, 
    restSec?: number
  ) => {
    const newPlanned: PlannedExercise = {
      id: `${day}-${exercise.id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      exerciseId: exercise.id,
      exercise: exercise,
      sets: sets || exercise.defaultSets || 3,
      reps: reps || exercise.defaultReps || '10-12',
      restSeconds: restSec || exercise.defaultRestSec || 60,
      targetWeightKg: 0
    };

    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isRestDay: false,
        exercises: [...prev[day].exercises, newPlanned]
      }
    }));
  };

  const removeExerciseFromDay = (day: DayOfWeek, plannedId: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.filter(item => item.id !== plannedId)
      }
    }));
  };

  const reorderExercises = (day: DayOfWeek, fromIndex: number, toIndex: number) => {
    setWeeklySchedule(prev => {
      const currentList = [...prev[day].exercises];
      if (toIndex < 0 || toIndex >= currentList.length) return prev;
      const [movedItem] = currentList.splice(fromIndex, 1);
      currentList.splice(toIndex, 0, movedItem);

      return {
        ...prev,
        [day]: {
          ...prev[day],
          exercises: currentList
        }
      };
    });
  };

  const updatePlannedExercise = (day: DayOfWeek, plannedId: string, updates: Partial<PlannedExercise>) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.map(item => 
          item.id === plannedId ? { ...item, ...updates } : item
        )
      }
    }));
  };

  const toggleRestDay = (day: DayOfWeek) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isRestDay: !prev[day].isRestDay
      }
    }));
  };

  const updateDayTitle = (day: DayOfWeek, titleEn: string, titleAr: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        splitTitleEn: titleEn,
        splitTitleAr: titleAr
      }
    }));
  };

  const clearDaySchedule = (day: DayOfWeek) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: []
      }
    }));
  };

  const resetEntireWeek = () => {
    const emptySchedule: Record<DayOfWeek, DaySchedule> = {} as Record<DayOfWeek, DaySchedule>;
    DEFAULT_DAYS.forEach((dayKey) => {
      emptySchedule[dayKey] = {
        day: dayKey,
        nameEn: DAY_NAMES[dayKey].en,
        nameAr: DAY_NAMES[dayKey].ar,
        isRestDay: false,
        splitTitleEn: '',
        splitTitleAr: '',
        exercises: []
      };
    });
    setWeeklySchedule(emptySchedule);
  };

  const applyTemplate = (templateId: string): boolean => {
    const template = WORKOUT_TEMPLATES.find(t => t.id === templateId);
    if (!template) return false;

    const newSchedule: Record<DayOfWeek, DaySchedule> = {} as Record<DayOfWeek, DaySchedule>;

    DEFAULT_DAYS.forEach((dayKey) => {
      const templateDay = template.schedule[dayKey];
      const dayExercises: PlannedExercise[] = [];

      if (templateDay && !templateDay.isRestDay) {
        templateDay.exerciseIds.forEach(item => {
          const ex = exercises.find(e => e.id === item.exerciseId);
          if (ex) {
            dayExercises.push({
              id: `${dayKey}-${ex.id}-${Math.random().toString(36).substr(2, 9)}`,
              exerciseId: ex.id,
              exercise: ex,
              sets: item.sets,
              reps: item.reps,
              restSeconds: item.restSec || ex.defaultRestSec,
              targetWeightKg: 0
            });
          }
        });
      }

      newSchedule[dayKey] = {
        day: dayKey,
        nameEn: DAY_NAMES[dayKey].en,
        nameAr: DAY_NAMES[dayKey].ar,
        isRestDay: templateDay ? templateDay.isRestDay : false,
        splitTitleEn: templateDay ? templateDay.splitTitleEn : '',
        splitTitleAr: templateDay ? templateDay.splitTitleAr : '',
        exercises: dayExercises
      };
    });

    setWeeklySchedule(newSchedule);
    return true;
  };

  const addCustomExercise = (newEx: Omit<Exercise, 'id' | 'isCustom'>) => {
    const customItem: Exercise = {
      ...newEx,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      isCustom: true
    };
    setCustomExercises(prev => [customItem, ...prev]);
  };

  const addWorkoutLog = (log: Omit<WorkoutLogItem, 'id' | 'date'>) => {
    const newLogItem: WorkoutLogItem = {
      ...log,
      id: `log-${Date.now()}`,
      date: new Date().toISOString()
    };
    setWorkoutLogs(prev => [newLogItem, ...prev]);
  };

  const deleteWorkoutLog = (id: string) => {
    setWorkoutLogs(prev => prev.filter(item => item.id !== id));
  };

  const clearAllLogs = () => {
    setWorkoutLogs([]);
  };

  const exportScheduleJson = (): string => {
    return JSON.stringify(weeklySchedule, null, 2);
  };

  const importScheduleJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.sat && parsed.sun) {
        setWeeklySchedule(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <WorkoutContext.Provider value={{
      exercises,
      weeklySchedule,
      selectedDay,
      setSelectedDay,
      favorites,
      toggleFavorite,
      isFavorite,
      addExerciseToDay,
      removeExerciseFromDay,
      reorderExercises,
      updatePlannedExercise,
      toggleRestDay,
      updateDayTitle,
      clearDaySchedule,
      resetEntireWeek,
      applyTemplate,
      addCustomExercise,
      workoutLogs,
      addWorkoutLog,
      deleteWorkoutLog,
      clearAllLogs,
      activeWorkoutDay,
      setActiveWorkoutDay,
      exportScheduleJson,
      importScheduleJson
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
