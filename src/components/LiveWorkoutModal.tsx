import React, { useState, useEffect, useRef } from 'react';
import { DayOfWeek, PlannedExercise, CompletedSet, Exercise } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { useUserProfile } from '../context/UserProfileContext';
import { LaFamiliaLogo } from './LaFamiliaLogo';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Flame, 
  Dumbbell, 
  Trophy, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveWorkoutModalProps {
  day?: DayOfWeek | null;
  onClose: () => void;
}

export const LiveWorkoutModal: React.FC<LiveWorkoutModalProps> = ({ day, onClose }) => {
  const { language, t } = useLanguage();
  const { weeklySchedule, selectedDay, addWorkoutLog, exercises: allExercises } = useWorkout();
  const { profile, getExerciseCalorieEstimate } = useUserProfile();

  const targetDay = day || selectedDay;
  const daySchedule = weeklySchedule[targetDay];

  // If no planned exercises, prepare fallback list from Chest or full body
  const sessionExercises: PlannedExercise[] = (daySchedule && daySchedule.exercises.length > 0)
    ? daySchedule.exercises
    : [
        {
          id: 'fallback-1',
          exerciseId: 'bench-press-barbell',
          exercise: allExercises.find(e => e.id === 'bench-press-barbell') || allExercises[0],
          sets: 4,
          reps: '8-10',
          restSeconds: 90
        },
        {
          id: 'fallback-2',
          exerciseId: 'incline-dumbbell-press',
          exercise: allExercises.find(e => e.id === 'incline-dumbbell-press') || allExercises[1],
          sets: 3,
          reps: '10-12',
          restSeconds: 75
        },
        {
          id: 'fallback-3',
          exerciseId: 'lateral-dumbbell-raises',
          exercise: allExercises.find(e => e.id === 'lateral-dumbbell-raises') || allExercises[2],
          sets: 4,
          reps: '12-15',
          restSeconds: 60
        }
      ];

  // State
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState<number | null>(null);
  const [totalRestDuration, setTotalRestDuration] = useState<number>(60);
  const [isRestActive, setIsRestActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sets state: map of exerciseId -> CompletedSet[]
  const [setsData, setSetsData] = useState<Record<string, CompletedSet[]>>(() => {
    const initial: Record<string, CompletedSet[]> = {};
    sessionExercises.forEach(item => {
      const sets: CompletedSet[] = [];
      for (let i = 1; i <= item.sets; i++) {
        sets.push({
          setNumber: i,
          reps: parseInt(item.reps) || 10,
          weightKg: item.targetWeightKg || 0,
          completed: false
        });
      }
      initial[item.id] = sets;
    });
    return initial;
  });

  // Finished state
  const [isFinished, setIsFinished] = useState(false);
  const [finalStats, setFinalStats] = useState<{
    durationMin: number;
    volumeKg: number;
    completedSets: number;
    totalCalories: number;
  } | null>(null);

  // Overall workout elapsed timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);

  // Audio Beep generator using Web Audio API
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // Audio not permitted without interaction
    }
  };

  // Rest countdown timer
  useEffect(() => {
    let restInterval: any = null;
    if (isRestActive && restSecondsLeft !== null && restSecondsLeft > 0) {
      restInterval = setInterval(() => {
        setRestSecondsLeft(prev => {
          if (prev === null || prev <= 1) {
            playBeep();
            setIsRestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restSecondsLeft, soundEnabled]);

  const currentPlanned = sessionExercises[currentExIndex];
  const currentSets = setsData[currentPlanned.id] || [];

  const handleToggleSet = (index: number) => {
    const updated = [...currentSets];
    const target = updated[index];
    const newCompleted = !target.completed;
    target.completed = newCompleted;

    setSetsData(prev => ({
      ...prev,
      [currentPlanned.id]: updated
    }));

    // If set just marked completed, trigger rest timer
    if (newCompleted) {
      const restTime = currentPlanned.restSeconds || 60;
      setTotalRestDuration(restTime);
      setRestSecondsLeft(restTime);
      setIsRestActive(true);
    }
  };

  const handleUpdateSet = (index: number, field: 'weightKg' | 'reps', value: number) => {
    const updated = [...currentSets];
    updated[index][field] = value;
    setSetsData(prev => ({
      ...prev,
      [currentPlanned.id]: updated
    }));
  };

  const handleAddExtraSet = () => {
    const last = currentSets[currentSets.length - 1];
    const newSet: CompletedSet = {
      setNumber: currentSets.length + 1,
      reps: last ? last.reps : 10,
      weightKg: last ? last.weightKg : 0,
      completed: false
    };
    setSetsData(prev => ({
      ...prev,
      [currentPlanned.id]: [...currentSets, newSet]
    }));
  };

  const handleFinishWorkout = () => {
    let totalVol = 0;
    let setsCount = 0;
    let calculatedCalorieBurn = 0;

    const summaryList = sessionExercises.map(item => {
      const sets = setsData[item.id] || [];
      sets.forEach(s => {
        if (s.completed) {
          totalVol += (s.weightKg || 0) * (s.reps || 0);
          setsCount++;

          const res = getExerciseCalorieEstimate(
            item.exercise,
            1,
            String(s.reps || 10),
            item.restSeconds || 60,
            s.weightKg || 0
          );
          calculatedCalorieBurn += res.caloriesPerSet || 12;
        }
      });
      return {
        exerciseNameEn: item.exercise?.nameEn || '',
        exerciseNameAr: item.exercise?.nameAr || '',
        sets
      };
    });

    const durationMin = Math.max(1, Math.round(elapsedSeconds / 60));

    // Baseline minimum metabolic expenditure during elapsed session time
    const timeBasedBurn = Math.round((5.8 * 3.5 * (profile?.weightKg || 75) / 200) * (elapsedSeconds / 60));
    const finalTotalCalories = Math.max(timeBasedBurn, Math.round(calculatedCalorieBurn));

    const logData = {
      workoutTitleEn: (daySchedule && daySchedule.splitTitleEn) || `${t(targetDay as any)} Workout`,
      workoutTitleAr: (daySchedule && daySchedule.splitTitleAr) || `تمرين ${t(targetDay as any)}`,
      durationMinutes: durationMin,
      totalVolumeKg: totalVol,
      completedSetsCount: setsCount,
      totalCalories: finalTotalCalories,
      exercisesSummary: summaryList
    };

    addWorkoutLog(logData);
    setFinalStats({
      durationMin,
      volumeKg: totalVol,
      completedSets: setsCount,
      totalCalories: finalTotalCalories
    });
    setIsFinished(true);

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[95vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Top Workout Session Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950/90 flex items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {t('activeWorkout')}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-white truncate max-w-xs sm:max-w-md">
                {(daySchedule && (language === 'ar' ? daySchedule.splitTitleAr : daySchedule.splitTitleEn)) || `${t(targetDay as any)} Session`}
              </h2>
            </div>
          </div>

          {/* Center Timer & Calories */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-2xl">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-sm sm:text-base font-bold text-zinc-100">
                {formatTime(elapsedSeconds)}
              </span>
              <button
                onClick={() => setIsTimerRunning(prev => !prev)}
                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                title={isTimerRunning ? 'Pause' : 'Resume'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Live estimated calorie burn */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {Math.round((6.0 * 3.5 * profile.weightKg / 200) * (elapsedSeconds / 60))} kcal
              </span>
            </div>
          </div>

          {/* Audio toggle & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute timer chime' : 'Enable timer chime'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title={t('close')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Finished Summary View */}
        {isFinished && finalStats ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto max-h-[85vh]">
            <LaFamiliaLogo variant="full" size="lg" />

            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl glow-emerald">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h3 className="text-2xl sm:text-3xl font-black text-white">{t('workoutCompleted')}</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{t('congratsMsg')}</p>
            </div>

            {/* Featured Total Calories Highlight Banner */}
            <div className="w-full max-w-lg p-5 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-emerald-950/80 border border-emerald-500/40 shadow-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-left rtl:text-right">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Flame className="w-7 h-7 animate-pulse text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'ar' ? 'إجمالي السعرات المحروقة' : 'Total Calories Burned'}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {language === 'ar' ? 'محسوبة بدقة وفق وزنك ومجهودك' : 'Calculated accurately based on your biometrics & workload'}
                  </span>
                </div>
              </div>

              <div className="text-right rtl:text-left shrink-0">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  {finalStats.totalCalories}
                </span>
                <span className="text-xs font-bold text-emerald-300 ml-1 rtl:mr-1">kcal</span>
              </div>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                <span className="text-[11px] text-zinc-500 font-semibold">{t('duration')}</span>
                <p className="text-base sm:text-lg font-black text-emerald-400">{finalStats.durationMin} {t('minutes')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                <span className="text-[11px] text-zinc-500 font-semibold">{t('completedSets')}</span>
                <p className="text-base sm:text-lg font-black text-sky-400">{finalStats.completedSets} {t('sets')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                <span className="text-[11px] text-zinc-500 font-semibold">{t('totalVolume')}</span>
                <p className="text-base sm:text-lg font-black text-amber-400">{finalStats.volumeKg.toLocaleString()} {t('kg')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                <span className="text-[11px] text-zinc-500 font-semibold">{language === 'ar' ? 'حرق السعرات' : 'Calorie Burn'}</span>
                <p className="text-base sm:text-lg font-black text-emerald-400 font-mono">{finalStats.totalCalories} kcal</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 cursor-pointer"
            >
              {t('backToHome')}
            </button>
          </div>
        ) : (
          /* Active Workout Session Interface */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Stepper progress & Navigation */}
            <div className="flex items-center justify-between bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/80">
              <button
                disabled={currentExIndex === 0}
                onClick={() => setCurrentExIndex(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 text-xs font-bold transition-all"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{language === 'ar' ? 'السابق' : 'Prev'}</span>
              </button>

              <span className="text-xs font-bold text-zinc-300">
                {t('exerciseIndex')} <span className="text-emerald-400 font-black">{currentExIndex + 1}</span> {t('of')} {sessionExercises.length}
              </span>

              <button
                disabled={currentExIndex === sessionExercises.length - 1}
                onClick={() => setCurrentExIndex(prev => Math.min(sessionExercises.length - 1, prev + 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 text-xs font-bold transition-all"
              >
                <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* Current Active Exercise Card */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                  <img 
                    src={currentPlanned.exercise.imageUrl} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {t(currentPlanned.exercise.category as any)}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {language === 'ar' ? currentPlanned.exercise.nameAr : currentPlanned.exercise.nameEn}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {language === 'ar' ? currentPlanned.exercise.primaryMuscleAr : currentPlanned.exercise.primaryMuscleEn}
                  </p>
                </div>
              </div>

              {/* Target guidelines */}
              <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-800 text-xs">
                <div className="text-center">
                  <span className="text-zinc-500 block text-[10px]">{t('sets')}</span>
                  <span className="font-black text-emerald-400 text-sm">{currentPlanned.sets}</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <div className="text-center">
                  <span className="text-zinc-500 block text-[10px]">{t('reps')}</span>
                  <span className="font-black text-emerald-400 text-sm">{currentPlanned.reps}</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <div className="text-center">
                  <span className="text-zinc-500 block text-[10px]">{t('rest')}</span>
                  <span className="font-black text-zinc-200 text-sm">{currentPlanned.restSeconds}s</span>
                </div>
              </div>
            </div>

            {/* Rest Timer Visual HUD */}
            {isRestActive && restSecondsLeft !== null && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg animate-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-black text-lg">
                    {restSecondsLeft}s
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t('restTimer')}</h4>
                    <p className="text-xs text-zinc-400">{language === 'ar' ? 'استعد للمجموعة القادمة، ركّز وتنفس بعمق' : 'Catch your breath and prepare for the next set'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRestSecondsLeft(prev => (prev || 0) + 30)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all"
                  >
                    {t('add30Sec')}
                  </button>
                  <button
                    onClick={() => setIsRestActive(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold transition-all"
                  >
                    {t('skipRest')}
                  </button>
                </div>
              </div>
            )}

            {/* Sets Logging Table */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <h4 className="font-bold text-zinc-200 text-sm">{language === 'ar' ? 'سجل المجموعات الفعلية:' : 'Track Completed Sets:'}</h4>
                <button
                  onClick={handleAddExtraSet}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-bold hover:bg-zinc-850"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إضافة مجموعة إضافية' : 'Add Extra Set'}</span>
                </button>
              </div>

              <div className="divide-y divide-zinc-850">
                {currentSets.map((s, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3.5 gap-3 transition-colors ${
                      s.completed ? 'bg-emerald-950/20' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300 font-bold text-xs flex items-center justify-center border border-zinc-800">
                        {s.setNumber}
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        {t('set')} {s.setNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Weight (kg) */}
                      <div className="flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1.5 rounded-xl border border-zinc-800">
                        <input
                          type="number"
                          step="2.5"
                          min="0"
                          value={s.weightKg || ''}
                          onChange={(e) => handleUpdateSet(idx, 'weightKg', Number(e.target.value))}
                          placeholder="0"
                          className="w-12 bg-transparent text-center font-bold text-xs text-zinc-100 focus:outline-none"
                        />
                        <span className="text-[10px] text-zinc-500 font-mono">{t('kg')}</span>
                      </div>

                      {/* Reps */}
                      <div className="flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1.5 rounded-xl border border-zinc-800">
                        <input
                          type="number"
                          min="1"
                          value={s.reps}
                          onChange={(e) => handleUpdateSet(idx, 'reps', Number(e.target.value))}
                          className="w-10 bg-transparent text-center font-bold text-xs text-zinc-100 focus:outline-none"
                        />
                        <span className="text-[10px] text-zinc-500 font-mono">{t('reps')}</span>
                      </div>

                      {/* Check Done Button */}
                      <button
                        onClick={() => handleToggleSet(idx)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all cursor-pointer ${
                          s.completed
                            ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/30'
                            : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-white'
                        }`}
                        title={s.completed ? 'Mark uncompleted' : 'Mark completed'}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Modal Footer / Finish Action */}
        {!isFinished && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/90 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold transition-all"
            >
              {t('cancelWorkout')}
            </button>

            <button
              onClick={handleFinishWorkout}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
            >
              <Check className="w-4 h-4" />
              <span>{t('finishWorkout')}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
