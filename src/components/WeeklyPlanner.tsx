import React, { useState } from 'react';
import { DayOfWeek, PlannedExercise, MuscleCategory } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { useUserProfile } from '../context/UserProfileContext';
import { AddExercisePickerModal } from './AddExercisePickerModal';
import { 
  Calendar, 
  Moon, 
  Dumbbell, 
  Play, 
  Trash2, 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  Layers, 
  Download, 
  Upload, 
  Printer, 
  RefreshCw,
  Clock, 
  Weight, 
  Flame,
  CheckCircle2,
  Edit3,
  Sparkles,
  Check,
  TrendingUp,
  Scale
} from 'lucide-react';

interface WeeklyPlannerProps {
  onOpenTemplates: () => void;
  onOpenCustomDesigner?: () => void;
  onStartLiveWorkout: (day?: DayOfWeek) => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  onOpenTemplates,
  onOpenCustomDesigner,
  onStartLiveWorkout
}) => {
  const { language, t } = useLanguage();
  const { 
    weeklySchedule, 
    selectedDay, 
    setSelectedDay, 
    toggleRestDay, 
    updateDayTitle, 
    updateDayMuscles,
    clearDaySchedule,
    resetEntireWeek,
    removeExerciseFromDay,
    reorderExercises,
    updatePlannedExercise,
    exportScheduleJson,
    importScheduleJson
  } = useWorkout();
  const { profile, getScheduleDayCalories, getExerciseCalorieEstimate, setIsProfileModalOpen, setIsTreadmillModalOpen } = useUserProfile();

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const daysOrder: DayOfWeek[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

  const currentSchedule = weeklySchedule[selectedDay] || {
    day: selectedDay,
    nameEn: selectedDay,
    nameAr: selectedDay,
    isRestDay: false,
    splitTitleEn: '',
    splitTitleAr: '',
    targetMuscles: [],
    exercises: []
  };

  const muscleCategoriesList: { key: MuscleCategory; label: string }[] = [
    { key: 'chest', label: t('chest') },
    { key: 'back', label: t('back') },
    { key: 'legs', label: t('legs') },
    { key: 'shoulders', label: t('shoulders') },
    { key: 'arms', label: t('arms') },
    { key: 'core', label: t('core') },
    { key: 'cardio', label: t('cardio') }
  ];

  // Calculate day stats
  const totalSets = currentSchedule.exercises.reduce((acc, curr) => acc + (curr.sets || 0), 0);
  const estimatedTimeMin = currentSchedule.exercises.reduce((acc, curr) => {
    const setTime = 45 + (curr.restSeconds || 60);
    return acc + Math.round((curr.sets * setTime) / 60);
  }, 0);

  const totalDayVolumeKg = currentSchedule.exercises.reduce((sum, item) => {
    const repsAvg = parseInt(item.reps) || 10;
    const weight = item.targetWeightKg || 0;
    return sum + (item.sets * repsAvg * weight);
  }, 0);

  // Compute live accurate calories for this day
  const dayCalories = getScheduleDayCalories(currentSchedule);

  const toggleDayMuscle = (cat: MuscleCategory) => {
    const current = currentSchedule.targetMuscles || [];
    const updated = current.includes(cat)
      ? current.filter(m => m !== cat)
      : [...current, cat];
    updateDayMuscles(selectedDay, updated);
  };

  const handleStartTitleEdit = () => {
    setTitleInput(language === 'ar' ? (currentSchedule.splitTitleAr || '') : (currentSchedule.splitTitleEn || ''));
    setEditingTitle(true);
  };

  const handleSaveTitle = () => {
    if (language === 'ar') {
      updateDayTitle(selectedDay, currentSchedule.splitTitleEn, titleInput);
    } else {
      updateDayTitle(selectedDay, titleInput, currentSchedule.splitTitleAr);
    }
    setEditingTitle(false);
  };

  const handleExport = () => {
    const dataStr = exportScheduleJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulsefit-workout-routine-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importScheduleJson(content);
        if (success) {
          setImportStatus('success');
          setTimeout(() => setImportStatus(null), 2500);
        } else {
          setImportStatus('error');
          setTimeout(() => setImportStatus(null), 3000);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-4">
      
      {/* Planner Header & Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-900/90 p-6 rounded-3xl border border-zinc-800 shadow-xl print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white">{t('weeklyPlannerTitle')}</h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            {t('weeklyPlannerDesc')}
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenCustomDesigner && (
            <button
              onClick={onOpenCustomDesigner}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('customRoutineDesigner')}</span>
            </button>
          )}

          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all border border-zinc-700 cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{t('loadTemplate')}</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            title={t('exportJson')}
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{t('exportJson')}</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t('importJson')}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            title={t('printRoutine')}
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{t('printRoutine')}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm(language === 'ar' ? 'هل أنت متأكد من تفريغ كافة تمارين الأسبوع؟' : 'Are you sure you want to reset the entire weekly routine?')) {
                resetEntireWeek();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-rose-950/30 text-rose-400 border border-zinc-800 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            title={t('clearWeek')}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('clearWeek')}</span>
          </button>
        </div>
      </div>

      {importStatus === 'success' && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{language === 'ar' ? 'تم استيراد الجدول بنجاح!' : 'Routine imported successfully!'}</span>
        </div>
      )}

      {/* 7-Day Matrix Strip */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 print:grid-cols-7">
        {daysOrder.map((dayKey) => {
          const item = weeklySchedule[dayKey];
          const isSelected = selectedDay === dayKey;
          const isRest = item.isRestDay;
          const exCount = item.exercises.length;
          const dayName = t(dayKey as any);
          const splitLabel = language === 'ar' ? item.splitTitleAr : item.splitTitleEn;

          return (
            <button
              key={dayKey}
              onClick={() => setSelectedDay(dayKey)}
              className={`flex flex-col p-3 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 border-emerald-400 ring-2 ring-emerald-500/20 shadow-lg'
                  : isRest
                  ? 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-700 opacity-75'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase ${isSelected ? 'text-emerald-400' : 'text-zinc-300'}`}>
                  {dayName}
                </span>
                {isRest ? (
                  <span className="p-1 rounded-md bg-zinc-800 text-zinc-400" title={t('isRestDay')}>
                    <Moon className="w-3 h-3 text-amber-400" />
                  </span>
                ) : (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {exCount} {language === 'ar' ? 'تمرين' : 'ex'}
                  </span>
                )}
              </div>

              <div className="mt-2 min-h-[32px]">
                <p className="text-[11px] font-semibold text-zinc-400 line-clamp-2 leading-snug">
                  {isRest ? (
                    <span className="text-amber-400/80">{t('isRestDay')}</span>
                  ) : splitLabel ? (
                    splitLabel
                  ) : (
                    <span className="text-zinc-600 italic">{language === 'ar' ? 'بدون مسمى' : 'Unnamed Split'}</span>
                  )}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Main Workspace */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Selected Day Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          
          {/* Day Title & Split Name Editor */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t(selectedDay as any)}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {currentSchedule.isRestDay ? (
                  <span className="text-amber-400 flex items-center gap-2">
                    <Moon className="w-5 h-5" />
                    <span>{t('isRestDay')}</span>
                  </span>
                ) : editingTitle ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder={t('splitNamePlaceholder')}
                      className="bg-zinc-950 border border-emerald-500 rounded-xl px-3 py-1 text-sm text-white focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveTitle();
                        if (e.key === 'Escape') setEditingTitle(false);
                      }}
                    />
                    <button
                      onClick={handleSaveTitle}
                      className="px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 text-xs font-bold cursor-pointer"
                    >
                      {t('saveChanges')}
                    </button>
                  </div>
                ) : (
                  <span 
                    onClick={handleStartTitleEdit}
                    className="cursor-pointer hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    title="Click to rename"
                  >
                    <span>
                      {(language === 'ar' ? currentSchedule.splitTitleAr : currentSchedule.splitTitleEn) || (
                        <span className="text-zinc-500 font-normal text-base">{t('splitNamePlaceholder')}</span>
                      )}
                    </span>
                    <Edit3 className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  </span>
                )}
              </h2>
            </div>

            {/* Quick stats for this day */}
            {!currentSchedule.isRestDay && currentSchedule.exercises.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentSchedule.exercises.length} {language === 'ar' ? 'تمارين' : 'Exercises'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>{totalSets} {t('sets')}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>≈ {estimatedTimeMin} {t('minutes')}</span>
                </span>
                {totalDayVolumeKg > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Weight className="w-3.5 h-3.5" />
                      <span>{t('totalEstimatedVolume')}: {totalDayVolumeKg} {t('kg')}</span>
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action buttons for selected day */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Rest Day Toggle */}
            <button
              onClick={() => toggleRestDay(selectedDay)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                currentSchedule.isRestDay
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{currentSchedule.isRestDay ? t('setAsTrainingDay') : t('setAsRestDay')}</span>
            </button>

            {/* Clear Day */}
            {currentSchedule.exercises.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm(language === 'ar' ? 'هل أنت متأكد من مسح تمارين هذا اليوم؟' : 'Clear all exercises for this day?')) {
                    clearDaySchedule(selectedDay);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-rose-950/30 text-rose-400 border border-zinc-800 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('clearDay')}</span>
              </button>
            )}

            {/* Start Live Session CTA */}
            {!currentSchedule.isRestDay && currentSchedule.exercises.length > 0 && (
              <button
                onClick={() => onStartLiveWorkout(selectedDay)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-zinc-950" />
                <span>{t('startTodayWorkout')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Muscle Selector Chips for Selected Day */}
        {!currentSchedule.isRestDay && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-zinc-950/60 rounded-2xl border border-zinc-800/80">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 shrink-0">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('selectDayMuscles')}:</span>
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              {muscleCategoriesList.map(cat => {
                const isSelected = (currentSchedule.targetMuscles || []).includes(cat.key);

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => toggleDayMuscle(cat.key)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Day Biometric Calorie & Volume Statistics Strip */}
        {!currentSchedule.isRestDay && currentSchedule.exercises.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <Flame className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 block">{language === 'ar' ? 'حرق السعرات اليوم' : 'Total Burn (Est)'}</span>
                <span className="font-extrabold text-emerald-400 font-mono text-sm sm:text-base">{dayCalories} kcal</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 block">{language === 'ar' ? 'الوقت التقديري' : 'Est. Duration'}</span>
                <span className="font-extrabold text-zinc-200 font-mono text-sm sm:text-base">{estimatedTimeMin} min</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <Dumbbell className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 block">{language === 'ar' ? 'مجموع الجولات' : 'Total Sets'}</span>
                <span className="font-extrabold text-zinc-200 font-mono text-sm sm:text-base">{totalSets} sets</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <Weight className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 block">{language === 'ar' ? 'الحجم التراكمي' : 'Volume Load'}</span>
                <span className="font-extrabold text-purple-300 font-mono text-sm sm:text-base">
                  {totalDayVolumeKg.toLocaleString()} kg
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Exercises List / Rest Day Card */}
        {currentSchedule.isRestDay ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-950/50 rounded-3xl border border-zinc-800 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Moon className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="font-bold text-zinc-100 text-lg">{t('isRestDay')}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {language === 'ar'
                  ? 'الراحة والاستشفاء جزء أساسي من بناء العضلات والوقاية من الإصابات. استمتع بيومك وتغذَّ جيداً!'
                  : 'Rest and recovery are crucial for muscular hypertrophy and injury prevention. Sleep well and hydrate!'}
              </p>
            </div>
            <button
              onClick={() => toggleRestDay(selectedDay)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
            >
              {t('setAsTrainingDay')}
            </button>
          </div>
        ) : currentSchedule.exercises.length > 0 ? (
          <div className="space-y-3">
            {currentSchedule.exercises.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === currentSchedule.exercises.length - 1;
              const isTreadmill = item.exercise.id.includes('treadmill');
              const exBurn = getExerciseCalorieEstimate(
                item.exercise,
                item.sets,
                item.reps,
                item.restSeconds,
                item.targetWeightKg
              );

              return (
                <div
                  key={item.id}
                  className="group flex flex-col p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 transition-all gap-3 shadow-sm"
                >
                  
                  {/* Top line: Index + Thumbnail + Title + Calorie Burn + Reorder/Delete */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex flex-col items-center justify-center w-6 text-zinc-500 text-xs font-bold shrink-0">
                        #{index + 1}
                      </div>

                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 relative">
                        <img 
                          src={item.exercise.imageUrl} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-zinc-100 text-xs sm:text-sm truncate group-hover:text-emerald-400 transition-colors">
                            {language === 'ar' ? item.exercise.nameAr : item.exercise.nameEn}
                          </h4>
                          <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-mono shrink-0">
                            <Flame className="w-3 h-3 text-emerald-400" />
                            <span>~{exBurn.totalCalories} kcal</span>
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate">
                          <span className="text-emerald-400 font-semibold">{t(item.exercise.category as any)}</span>
                          <span> • </span>
                          <span>{language === 'ar' ? item.exercise.primaryMuscleAr : item.exercise.primaryMuscleEn}</span>
                        </p>
                      </div>
                    </div>

                    {/* Reorder and Delete & Treadmill Engine */}
                    <div className="flex items-center gap-1 shrink-0">
                      {isTreadmill && (
                        <button
                          type="button"
                          onClick={() => setIsTreadmillModalOpen(true)}
                          className="px-2 py-1 rounded-lg bg-orange-950/50 hover:bg-orange-900/60 border border-orange-700/50 text-orange-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer mr-1"
                          title="Open Treadmill Calculator"
                        >
                          <TrendingUp className="w-3 h-3" />
                          <span className="hidden sm:inline">%Incline</span>
                        </button>
                      )}

                      <button
                        disabled={isFirst}
                        onClick={() => reorderExercises(selectedDay, index, index - 1)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isFirst ? 'opacity-30 border-zinc-800 text-zinc-600' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                        title={t('reorderUp')}
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        disabled={isLast}
                        onClick={() => reorderExercises(selectedDay, index, index + 1)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isLast ? 'opacity-30 border-zinc-800 text-zinc-600' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                        title={t('reorderDown')}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => removeExerciseFromDay(selectedDay, item.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all ml-1"
                        title={t('deleteExercise')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Configuration Controls Bar: Sets | Reps | Target Weight (Kg) | Rest (s) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-zinc-850">
                    
                    {/* Sets modifier */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-semibold mb-1 block">{t('sets')}</label>
                      <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-800 p-1">
                        <button
                          type="button"
                          onClick={() => updatePlannedExercise(selectedDay, item.id, { sets: Math.max(1, item.sets - 1) })}
                          className="w-6 h-6 rounded-lg bg-zinc-950 text-zinc-400 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <div className="flex-1 text-center font-black text-xs text-emerald-400">
                          {item.sets}
                        </div>
                        <button
                          type="button"
                          onClick={() => updatePlannedExercise(selectedDay, item.id, { sets: Math.min(10, item.sets + 1) })}
                          className="w-6 h-6 rounded-lg bg-zinc-950 text-zinc-400 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Reps input */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-semibold mb-1 block">{t('reps')}</label>
                      <input
                        type="text"
                        value={item.reps}
                        onChange={(e) => updatePlannedExercise(selectedDay, item.id, { reps: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-100 font-bold text-center focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Target Weight (kg) */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-semibold mb-1 block flex items-center justify-between">
                        <span>{t('targetWeightKg')}</span>
                        {item.targetWeightKg ? <span className="text-emerald-400 font-mono text-[9px]">{item.targetWeightKg}kg</span> : null}
                      </label>
                      <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-800 p-0.5">
                        <button
                          type="button"
                          onClick={() => updatePlannedExercise(selectedDay, item.id, { targetWeightKg: Math.max(0, (item.targetWeightKg || 0) - 2.5) })}
                          className="w-5 h-6 rounded bg-zinc-950 text-zinc-400 hover:text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
                          title="-2.5 kg"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="2.5"
                          min="0"
                          value={item.targetWeightKg || ''}
                          placeholder="0"
                          onChange={(e) => updatePlannedExercise(selectedDay, item.id, { targetWeightKg: Number(e.target.value) })}
                          className="w-full bg-transparent text-xs text-emerald-400 font-bold text-center focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => updatePlannedExercise(selectedDay, item.id, { targetWeightKg: (item.targetWeightKg || 0) + 2.5 })}
                          className="w-5 h-6 rounded bg-zinc-950 text-zinc-400 hover:text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
                          title="+2.5 kg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Rest input */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-semibold mb-1 block">{t('rest')} (s)</label>
                      <input
                        type="number"
                        step="15"
                        min="15"
                        max="300"
                        value={item.restSeconds}
                        onChange={(e) => updatePlannedExercise(selectedDay, item.id, { restSeconds: Number(e.target.value) })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-100 font-bold text-center focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                  </div>

                  {/* Optional Note row */}
                  <div>
                    <input
                      type="text"
                      value={item.notes || ''}
                      onChange={(e) => updatePlannedExercise(selectedDay, item.id, { notes: e.target.value })}
                      placeholder={language === 'ar' ? 'ملاحظات الأداء، الوزن المستهدف، دروب سيت...' : 'Performance cues, target dumbbells, drop set...'}
                      className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl px-3 py-1 text-xs text-zinc-300 placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                </div>
              );
            })}

            {/* Add Exercise to this day button */}
            <button
              onClick={() => setIsPickerOpen(true)}
              className="w-full py-4 border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 rounded-2xl flex items-center justify-center gap-2 text-zinc-400 hover:text-emerald-400 transition-all font-bold text-xs sm:text-sm bg-zinc-950/30 hover:bg-emerald-500/5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addExerciseToDay')}</span>
            </button>
          </div>
        ) : (
          /* Empty Day State */
          <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-950/40 rounded-3xl border border-dashed border-zinc-800 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
              <Dumbbell className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="font-bold text-zinc-200 text-base">{language === 'ar' ? 'الجدول فارغ لهذا اليوم' : 'No Exercises Scheduled'}</h3>
              <p className="text-xs text-zinc-500">{t('noExercisesInDay')}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsPickerOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('addExerciseToDay')}</span>
              </button>
              
              {onOpenCustomDesigner && (
                <button
                  onClick={onOpenCustomDesigner}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-bold transition-all border border-zinc-700 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('customRoutineDesigner')}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Picker Modal */}
      {isPickerOpen && (
        <AddExercisePickerModal
          day={selectedDay}
          onClose={() => setIsPickerOpen(false)}
        />
      )}

    </div>
  );
};
