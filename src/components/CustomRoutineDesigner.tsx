import React, { useState } from 'react';
import { 
  DayOfWeek, 
  DaySchedule, 
  MuscleCategory, 
  Exercise, 
  PlannedExercise, 
  WorkoutTemplate 
} from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { 
  Sparkles, 
  Dumbbell, 
  Check, 
  Plus, 
  Trash2, 
  Flame, 
  Layers, 
  Clock, 
  ArrowRight, 
  Save, 
  RotateCcw, 
  Calendar,
  ChevronUp,
  ChevronDown,
  Info,
  Sliders,
  CheckCircle2,
  BookmarkPlus
} from 'lucide-react';

interface CustomRoutineDesignerProps {
  onRoutineSaved?: () => void;
  onApplyToSchedule?: () => void;
  onOpenTemplates?: () => void;
}

const ALL_DAYS: DayOfWeek[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

const PRESET_SPLITS = [
  {
    nameEn: 'Push / Pull / Legs (6-Day)',
    nameAr: 'نظام دفع / سحب / أرجل (6 أيام)',
    descriptionEn: 'Chest+Shoulders+Triceps / Back+Biceps / Legs',
    descriptionAr: 'صدر+أكتاف+تراي / ظهر+باي / أرجل',
    musclesPerDay: {
      sat: ['chest', 'shoulders', 'arms'] as MuscleCategory[],
      sun: ['back', 'arms'] as MuscleCategory[],
      mon: ['legs', 'core'] as MuscleCategory[],
      tue: ['chest', 'shoulders', 'arms'] as MuscleCategory[],
      wed: ['back', 'arms'] as MuscleCategory[],
      thu: ['legs', 'core'] as MuscleCategory[],
      fri: [] as MuscleCategory[]
    },
    titlesEn: {
      sat: 'Push Day A (Chest/Delts/Triceps)',
      sun: 'Pull Day A (Back/Biceps)',
      mon: 'Legs Day A (Quads/Calves/Abs)',
      tue: 'Push Day B (Hypertrophy)',
      wed: 'Pull Day B (Width & Detail)',
      thu: 'Legs Day B (Posterior Chain)',
      fri: 'Rest & Recovery'
    },
    titlesAr: {
      sat: 'يوم الدفع أ (صدر/أكتاف/تراي)',
      sun: 'يوم السحب أ (ظهر/بايسبس)',
      mon: 'يوم الأرجل أ (أرجل وبطن)',
      tue: 'يوم الدفع ب (ضخامة وتركيز)',
      wed: 'يوم السحب ب (تفاصيل وعزل)',
      thu: 'يوم الأرجل ب (فخذ خلفي وسمانة)',
      fri: 'يوم راحة واستشفاء'
    }
  },
  {
    nameEn: 'Arnold Split (6-Day)',
    nameAr: 'نظام أرنولد الكلاسيكي (6 أيام)',
    descriptionEn: 'Chest & Back / Shoulders & Arms / Legs',
    descriptionAr: 'صدر وظهر معاً / أكتاف وذراعين / أرجل وبطن',
    musclesPerDay: {
      sat: ['chest', 'back'] as MuscleCategory[],
      sun: ['shoulders', 'arms'] as MuscleCategory[],
      mon: ['legs', 'core'] as MuscleCategory[],
      tue: ['chest', 'back'] as MuscleCategory[],
      wed: ['shoulders', 'arms'] as MuscleCategory[],
      thu: ['legs', 'core'] as MuscleCategory[],
      fri: [] as MuscleCategory[]
    },
    titlesEn: {
      sat: 'Chest & Back (Antagonists)',
      sun: 'Shoulders & Arms Blast',
      mon: 'Legs & Core Power',
      tue: 'Chest & Back II',
      wed: 'Shoulders & Arms II',
      thu: 'Legs & Abs II',
      fri: 'Rest Day'
    },
    titlesAr: {
      sat: 'صدر وظهر (عضلات متقابلة)',
      sun: 'أكتاف وذراعين كاملة',
      mon: 'أرجل وبطن وقوة',
      tue: 'صدر وظهر (الحصة 2)',
      wed: 'أكتاف وذراعين (الحصة 2)',
      thu: 'أرجل وبطن (الحصة 2)',
      fri: 'يوم راحة'
    }
  },
  {
    nameEn: 'Upper / Lower (4-Day)',
    nameAr: 'نظام علوي / سفلي (4 أيام)',
    descriptionEn: 'Upper A / Lower A / Rest / Upper B / Lower B',
    descriptionAr: 'علوي أ / سفلي أ / راحة / علوي ب / سفلي ب',
    musclesPerDay: {
      sat: ['chest', 'back', 'shoulders', 'arms'] as MuscleCategory[],
      sun: ['legs', 'core'] as MuscleCategory[],
      mon: [] as MuscleCategory[],
      tue: ['chest', 'back', 'shoulders', 'arms'] as MuscleCategory[],
      wed: ['legs', 'core'] as MuscleCategory[],
      thu: [] as MuscleCategory[],
      fri: [] as MuscleCategory[]
    },
    titlesEn: {
      sat: 'Upper Body Power (Chest/Back/Arms)',
      sun: 'Lower Body & Core A',
      mon: 'Rest & Mobility',
      tue: 'Upper Body Hypertrophy B',
      wed: 'Lower Body & Core B',
      thu: 'Rest Day',
      fri: 'Rest Day'
    },
    titlesAr: {
      sat: 'الجزء العلوي قوة (صدر/ظهر/ذراعين)',
      sun: 'الجزء السفلي والبطن أ',
      mon: 'راحة واستطالات',
      tue: 'الجزء العلوي ضخامة ب',
      wed: 'الجزء السفلي والبطن ب',
      thu: 'يوم راحة',
      fri: 'يوم راحة'
    }
  },
  {
    nameEn: 'Bro Split 5-Day (1 Muscle/Day)',
    nameAr: 'الجدول الكلاسيكي (عضلة واحدة يومياً - 5 أيام)',
    descriptionEn: 'Chest / Back / Shoulders / Legs / Arms',
    descriptionAr: 'صدر / ظهر / أكتاف / أرجل / ذراعين',
    musclesPerDay: {
      sat: ['chest'] as MuscleCategory[],
      sun: ['back'] as MuscleCategory[],
      mon: ['shoulders'] as MuscleCategory[],
      tue: ['legs'] as MuscleCategory[],
      wed: ['arms', 'core'] as MuscleCategory[],
      thu: [] as MuscleCategory[],
      fri: [] as MuscleCategory[]
    },
    titlesEn: {
      sat: 'Chest Blast',
      sun: 'Back Thickness & Width',
      mon: 'Boulder Shoulders',
      tue: 'Legs & Calves',
      wed: 'Arms & Abs Domination',
      thu: 'Rest & Recovery',
      fri: 'Rest Day'
    },
    titlesAr: {
      sat: 'يوم الصدر',
      sun: 'يوم الظهر',
      mon: 'يوم الأكتاف',
      tue: 'يوم الأرجل والسمانة',
      wed: 'يوم الذراعين والبطن',
      thu: 'يوم راحة واستشفاء',
      fri: 'يوم راحة'
    }
  }
];

export const CustomRoutineDesigner: React.FC<CustomRoutineDesignerProps> = ({
  onRoutineSaved,
  onApplyToSchedule,
  onOpenTemplates
}) => {
  const { language, t } = useLanguage();
  const { 
    exercises, 
    applyFullSchedule, 
    saveCustomTemplate,
    weeklySchedule 
  } = useWorkout();

  // Local draft state initialized with current schedule or empty template
  const [activeDay, setActiveDay] = useState<DayOfWeek>('sat');
  const [routineName, setRoutineName] = useState(
    language === 'ar' ? 'جدولي التدريبي المخصص' : 'My Custom Workout Routine'
  );
  
  // Day configurations
  const [draftSchedule, setDraftSchedule] = useState<Record<DayOfWeek, DaySchedule>>(() => {
    // Clone current weekly schedule
    return JSON.parse(JSON.stringify(weeklySchedule));
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<MuscleCategory | 'all'>('all');

  const currentDayData = draftSchedule[activeDay] || {
    day: activeDay,
    nameEn: activeDay,
    nameAr: activeDay,
    isRestDay: false,
    splitTitleEn: '',
    splitTitleAr: '',
    targetMuscles: [],
    exercises: []
  };

  const muscleCategories: { key: MuscleCategory; label: string; icon: string }[] = [
    { key: 'chest', label: t('chest'), icon: '🛡️' },
    { key: 'back', label: t('back'), icon: '🦅' },
    { key: 'legs', label: t('legs'), icon: '🦵' },
    { key: 'shoulders', label: t('shoulders'), icon: '🏔️' },
    { key: 'arms', label: t('arms'), icon: '💪' },
    { key: 'core', label: t('core'), icon: '🔥' },
    { key: 'cardio', label: t('cardio'), icon: '🏃' }
  ];

  // Toggle muscle for active day
  const toggleMuscleForDay = (cat: MuscleCategory) => {
    const currentMuscles = currentDayData.targetMuscles || [];
    const exists = currentMuscles.includes(cat);
    const updated = exists 
      ? currentMuscles.filter(m => m !== cat)
      : [...currentMuscles, cat];

    setDraftSchedule(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        isRestDay: false,
        targetMuscles: updated
      }
    }));
  };

  // Toggle rest day
  const toggleRestDay = (day: DayOfWeek) => {
    setDraftSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isRestDay: !prev[day].isRestDay
      }
    }));
  };

  // Update day title
  const handleTitleChange = (val: string) => {
    setDraftSchedule(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        splitTitleAr: language === 'ar' ? val : prev[activeDay].splitTitleAr,
        splitTitleEn: language === 'en' ? val : prev[activeDay].splitTitleEn
      }
    }));
  };

  // Add exercise to active day
  const addExercise = (ex: Exercise) => {
    const newPlanned: PlannedExercise = {
      id: `draft-${activeDay}-${ex.id}-${Date.now()}`,
      exerciseId: ex.id,
      exercise: ex,
      sets: ex.defaultSets || 3,
      reps: ex.defaultReps || '10-12',
      restSeconds: ex.defaultRestSec || 60,
      targetWeightKg: 0,
      notes: ''
    };

    setDraftSchedule(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        isRestDay: false,
        exercises: [...prev[activeDay].exercises, newPlanned]
      }
    }));
  };

  // Remove exercise from active day
  const removeExercise = (plannedId: string) => {
    setDraftSchedule(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        exercises: prev[activeDay].exercises.filter(item => item.id !== plannedId)
      }
    }));
  };

  // Update planned exercise
  const updateExercise = (plannedId: string, updates: Partial<PlannedExercise>) => {
    setDraftSchedule(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        exercises: prev[activeDay].exercises.map(item =>
          item.id === plannedId ? { ...item, ...updates } : item
        )
      }
    }));
  };

  // Reorder exercises
  const reorder = (fromIndex: number, toIndex: number) => {
    const list = [...currentDayData.exercises];
    if (toIndex < 0 || toIndex >= list.length) return;
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);

    setDraftSchedule(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        exercises: list
      }
    }));
  };

  // Apply a quick split preset to draft
  const applyPresetSplit = (preset: typeof PRESET_SPLITS[0]) => {
    setDraftSchedule(prev => {
      const updated = { ...prev };
      ALL_DAYS.forEach(dayKey => {
        const muscles = preset.musclesPerDay[dayKey] || [];
        const isRest = muscles.length === 0;
        updated[dayKey] = {
          ...updated[dayKey],
          isRestDay: isRest,
          targetMuscles: muscles,
          splitTitleEn: preset.titlesEn[dayKey] || '',
          splitTitleAr: preset.titlesAr[dayKey] || ''
        };
      });
      return updated;
    });
  };

  const triggerFinished = () => {
    if (onRoutineSaved) onRoutineSaved();
    if (onApplyToSchedule) onApplyToSchedule();
  };

  // Save to weekly schedule
  const handleSaveToWeeklySchedule = () => {
    applyFullSchedule(draftSchedule);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      triggerFinished();
    }, 1200);
  };

  // Save as permanent template
  const handleSaveAsTemplate = () => {
    const templateSchedule: any = {};
    ALL_DAYS.forEach(day => {
      const d = draftSchedule[day];
      templateSchedule[day] = {
        isRestDay: d.isRestDay,
        splitTitleEn: d.splitTitleEn || d.nameEn,
        splitTitleAr: d.splitTitleAr || d.nameAr,
        targetMuscles: d.targetMuscles || [],
        exerciseIds: (d.exercises || []).map(e => ({
          exerciseId: e.exerciseId,
          sets: e.sets,
          reps: e.reps,
          restSec: e.restSeconds,
          targetWeightKg: e.targetWeightKg,
          notes: e.notes
        }))
      };
    });

    const activeDaysCount = ALL_DAYS.filter(d => !draftSchedule[d].isRestDay).length;

    saveCustomTemplate({
      nameEn: routineName,
      nameAr: routineName,
      descriptionEn: `Custom workout routine with ${activeDaysCount} training days.`,
      descriptionAr: `جدول تدريبي مخصص يحتوي على ${activeDaysCount} أيام تمرين أسبوعياً.`,
      difficulty: 'intermediate',
      daysPerWeek: activeDaysCount,
      tags: ['Custom', `${activeDaysCount} Days`],
      schedule: templateSchedule
    });

    applyFullSchedule(draftSchedule);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      triggerFinished();
    }, 1200);
  };

  // Filtered available exercises based on day's selected muscles or search
  const availableExercises = exercises.filter(ex => {
    // If user typed in search
    if (exerciseSearch.trim() !== '') {
      const q = exerciseSearch.toLowerCase().trim();
      const matchEn = ex.nameEn.toLowerCase().includes(q) || ex.primaryMuscleEn.toLowerCase().includes(q);
      const matchAr = ex.nameAr.includes(q) || ex.primaryMuscleAr.includes(q);
      return matchEn || matchAr;
    }

    // Filter by manual category selection if specified
    if (selectedFilterCategory !== 'all') {
      return ex.category === selectedFilterCategory;
    }

    // Default: if day has target muscles selected, prioritize showing them!
    const dayMuscles = currentDayData.targetMuscles || [];
    if (dayMuscles.length > 0) {
      return dayMuscles.includes(ex.category);
    }

    return true;
  });

  // Calculate day total weight / volume
  const dayEstimatedVolume = currentDayData.exercises.reduce((sum, item) => {
    const repsAvg = parseInt(item.reps) || 10;
    const weight = item.targetWeightKg || 0;
    return sum + (item.sets * repsAvg * weight);
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تصميم جدول مخصص بالكامل' : 'Interactive Custom Split Architect'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t('designerTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                {t('designerSub')}
              </p>
            </div>

            {/* Routine Name Input */}
            <div className="w-full md:w-80">
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">{t('routineName')}</label>
              <input
                type="text"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                placeholder={t('routineNamePlaceholder')}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Split Presets Bar */}
      <div className="bg-zinc-900/70 p-4 sm:p-5 rounded-2xl border border-zinc-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>{t('quickPresets')}</span>
          </span>
          <span className="text-[11px] text-zinc-500">
            {language === 'ar' ? 'اختر هيكل توزيع سريع وعدّله كما تحب' : 'Pick a blueprint and customize freely'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_SPLITS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPresetSplit(p)}
              className="flex flex-col text-left rtl:text-right p-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                {language === 'ar' ? p.nameAr : p.nameEn}
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                {language === 'ar' ? p.descriptionAr : p.descriptionEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Day Selector Strip */}
      <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-7 gap-2.5">
        {ALL_DAYS.map((dayKey) => {
          const item = draftSchedule[dayKey];
          const isSelected = activeDay === dayKey;
          const isRest = item?.isRestDay;
          const exCount = item?.exercises.length || 0;
          const musclesCount = item?.targetMuscles?.length || 0;

          return (
            <button
              key={dayKey}
              onClick={() => setActiveDay(dayKey)}
              className={`flex flex-col p-3 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 border-emerald-400 ring-2 ring-emerald-500/20 shadow-lg'
                  : isRest
                  ? 'bg-zinc-950/60 border-zinc-850 opacity-70 hover:opacity-100'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase ${isSelected ? 'text-emerald-400' : 'text-zinc-300'}`}>
                  {t(dayKey as any)}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isRest ? 'bg-amber-500/20 text-amber-300' : isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {isRest ? (language === 'ar' ? 'راحة' : 'Rest') : `${exCount} ${language === 'ar' ? 'تمارين' : 'ex'}`}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-zinc-400 truncate">
                {isRest ? (
                  <span className="text-amber-400/80">{t('isRestDay')}</span>
                ) : (
                  <span>
                    {(language === 'ar' ? item?.splitTitleAr : item?.splitTitleEn) || (
                      musclesCount > 0 
                        ? item?.targetMuscles?.map(m => t(m as any)).join(' + ')
                        : (language === 'ar' ? 'حدد العضلات' : 'Pick muscles')
                    )}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Designer Workspace for Active Day */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Day Header & Rest Day Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase">
              {t(activeDay as any)}
            </span>
            <input
              type="text"
              value={language === 'ar' ? currentDayData.splitTitleAr : currentDayData.splitTitleEn}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder={t('splitNamePlaceholder')}
              className="bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-1.5 text-sm sm:text-base font-bold text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleRestDay(activeDay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                currentDayData.isRestDay
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {currentDayData.isRestDay ? t('setAsTrainingDay') : t('setAsRestDay')}
            </button>
          </div>
        </div>

        {!currentDayData.isRestDay && (
          <>
            {/* Step 1: Muscle Multi-Selection for this Day */}
            <div className="space-y-3 bg-zinc-950/70 p-4 sm:p-5 rounded-2xl border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span>{t('selectDayMuscles')}</span>
                </label>
                <span className="text-[11px] text-zinc-400">
                  {language === 'ar' ? '(يمكنك اختيار أكثر من عضلة معاً)' : '(Multi-select supported)'}
                </span>
              </div>

              {/* Muscle Selector Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {muscleCategories.map((cat) => {
                  const isChosen = (currentDayData.targetMuscles || []).includes(cat.key);

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => toggleMuscleForDay(cat.key)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isChosen
                          ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20 scale-[1.03]'
                          : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                      {isChosen && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Screen: Left = Day's Scheduled Exercises with Weight inputs, Right = Exercise Catalog picker */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Scheduled Exercises for Today (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-emerald-400" />
                    <span>{t('dayExercisesCount')} ({currentDayData.exercises.length})</span>
                  </h3>

                  {currentDayData.exercises.length > 0 && (
                    <span className="text-xs text-zinc-400 font-mono">
                      {t('totalEstimatedVolume')}: <strong className="text-emerald-400 font-bold">{dayEstimatedVolume} {t('kg')}</strong>
                    </span>
                  )}
                </div>

                {currentDayData.exercises.length > 0 ? (
                  <div className="space-y-3">
                    {currentDayData.exercises.map((item, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === currentDayData.exercises.length - 1;

                      return (
                        <div
                          key={item.id}
                          className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-xs font-bold text-zinc-500 w-5">#{idx + 1}</span>
                              <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                                <img src={item.exercise.imageUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-bold text-zinc-100 text-xs sm:text-sm truncate">
                                  {language === 'ar' ? item.exercise.nameAr : item.exercise.nameEn}
                                </h4>
                                <span className="text-[11px] text-emerald-400">
                                  {t(item.exercise.category as any)}
                                </span>
                              </div>
                            </div>

                            {/* Reorder and Delete */}
                            <div className="flex items-center gap-1">
                              <button
                                disabled={isFirst}
                                onClick={() => reorder(idx, idx - 1)}
                                className={`p-1 rounded-md border text-zinc-400 ${isFirst ? 'opacity-20 border-zinc-800' : 'bg-zinc-900 border-zinc-800 hover:text-white'}`}
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={isLast}
                                onClick={() => reorder(idx, idx + 1)}
                                className={`p-1 rounded-md border text-zinc-400 ${isLast ? 'opacity-20 border-zinc-800' : 'bg-zinc-900 border-zinc-800 hover:text-white'}`}
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => removeExercise(item.id)}
                                className="p-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-rose-400 ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Exercise Configuration Row: Sets, Reps, Target Weight (kg), Rest */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-zinc-850">
                            {/* Sets */}
                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">{t('sets')}</label>
                              <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateExercise(item.id, { sets: Math.max(1, item.sets - 1) })}
                                  className="w-5 h-5 rounded bg-zinc-950 text-zinc-400 text-xs font-bold flex items-center justify-center"
                                >
                                  -
                                </button>
                                <span className="flex-1 text-center text-xs font-bold text-emerald-400">{item.sets}</span>
                                <button
                                  type="button"
                                  onClick={() => updateExercise(item.id, { sets: Math.min(10, item.sets + 1) })}
                                  className="w-5 h-5 rounded bg-zinc-950 text-zinc-400 text-xs font-bold flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Reps */}
                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">{t('reps')}</label>
                              <input
                                type="text"
                                value={item.reps}
                                onChange={(e) => updateExercise(item.id, { reps: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1 px-2 text-xs font-bold text-center text-zinc-100 focus:outline-none focus:border-emerald-500"
                              />
                            </div>

                            {/* Target Weight (kg) */}
                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">{t('targetWeightKg')}</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  step="2.5"
                                  min="0"
                                  value={item.targetWeightKg || ''}
                                  placeholder="0"
                                  onChange={(e) => updateExercise(item.id, { targetWeightKg: Number(e.target.value) })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1 px-2 text-xs font-bold text-center text-emerald-400 focus:outline-none focus:border-emerald-500"
                                />
                              </div>
                            </div>

                            {/* Rest */}
                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">{t('rest')} (s)</label>
                              <input
                                type="number"
                                step="15"
                                value={item.restSeconds}
                                onChange={(e) => updateExercise(item.id, { restSeconds: Number(e.target.value) })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1 px-2 text-xs font-bold text-center text-zinc-100 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          {/* Quick Notes Input */}
                          <div>
                            <input
                              type="text"
                              value={item.notes || ''}
                              onChange={(e) => updateExercise(item.id, { notes: e.target.value })}
                              placeholder={language === 'ar' ? 'ملاحظة أو وزن مستهدف...' : 'Performance cue or notes...'}
                              className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-2.5 py-1 text-[11px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-zinc-950/40 rounded-2xl border border-dashed border-zinc-800 space-y-2">
                    <p className="text-xs text-zinc-400">
                      {language === 'ar' 
                        ? 'لم تقم بإضافة تمارين لهذا اليوم بعد. اختر من قائمة التمارين على الجانب الأيمن.' 
                        : 'No exercises selected for this day yet. Choose from the catalog on the right.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Exercise Catalog to Pick from (5 cols) */}
              <div className="lg:col-span-5 space-y-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex flex-col max-h-[640px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-200">
                      {t('availableExercisesForMuscles')}
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {availableExercises.length} {t('exercisesFound')}
                    </span>
                  </div>

                  {/* Search and Category Filter */}
                  <input
                    type="text"
                    value={exerciseSearch}
                    onChange={(e) => setExerciseSearch(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Exercises Scroll List */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {availableExercises.map((ex) => {
                    const alreadyAdded = currentDayData.exercises.some(e => e.exerciseId === ex.id);

                    return (
                      <div
                        key={ex.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                            <img src={ex.imageUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-zinc-200 text-xs truncate">
                              {language === 'ar' ? ex.nameAr : ex.nameEn}
                            </h5>
                            <span className="text-[10px] text-zinc-400 truncate block">
                              {t(ex.category as any)} • {language === 'ar' ? ex.primaryMuscleAr : ex.primaryMuscleEn}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addExercise(ex)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                            alreadyAdded
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 hover:bg-emerald-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'إضافة' : 'Add'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </>
        )}

        {/* Global Save Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-zinc-800">
          
          <button
            onClick={onOpenTemplates}
            className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
          >
            {language === 'ar' ? '← العودة للقوالب الجاهزة' : '← Back to Templates'}
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveAsTemplate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <BookmarkPlus className="w-4 h-4 text-sky-400" />
              <span>{t('saveAsTemplate')}</span>
            </button>

            <button
              onClick={handleSaveToWeeklySchedule}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-zinc-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('savedSuccess')}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t('saveToSchedule')}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
