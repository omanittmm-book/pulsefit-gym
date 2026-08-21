import React, { useState } from 'react';
import { Exercise, DayOfWeek } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { useUserProfile } from '../context/UserProfileContext';
import { 
  X, 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Check, 
  Dumbbell, 
  Calendar,
  Sparkles,
  Zap,
  TrendingUp,
  Scale
} from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose
}) => {
  const { language, t } = useLanguage();
  const { addExerciseToDay, selectedDay } = useWorkout();
  const { profile, getExerciseCalorieEstimate, setIsProfileModalOpen, setIsTreadmillModalOpen } = useUserProfile();

  const [targetDay, setTargetDay] = useState<DayOfWeek>(selectedDay);
  const [sets, setSets] = useState<number>(exercise?.defaultSets || 3);
  const [reps, setReps] = useState<string>(exercise?.defaultReps || '10-12');
  const [rest, setRest] = useState<number>(exercise?.defaultRestSec || 60);
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!exercise) return null;

  const isTreadmill = exercise.id.includes('treadmill');

  // Compute live precise calories for the selected sets/reps/rest/weight
  const calorieResult = getExerciseCalorieEstimate(exercise, sets, reps, rest, targetWeight);

  const daysList: { key: DayOfWeek; label: string }[] = [
    { key: 'sat', label: t('sat') },
    { key: 'sun', label: t('sun') },
    { key: 'mon', label: t('mon') },
    { key: 'tue', label: t('tue') },
    { key: 'wed', label: t('wed') },
    { key: 'thu', label: t('thu') },
    { key: 'fri', label: t('fri') }
  ];

  const handleAdd = () => {
    addExerciseToDay(targetDay, exercise, sets, reps, rest, targetWeight);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2200);
  };

  const instructions = language === 'ar' ? exercise.instructionsAr : exercise.instructionsEn;
  const tips = language === 'ar' ? exercise.tipsAr : exercise.tipsEn;
  const mistakes = language === 'ar' ? exercise.mistakesAr : exercise.mistakesEn;
  const secondary = language === 'ar' ? exercise.secondaryMusclesAr : exercise.secondaryMusclesEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Modal Header Banner */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-zinc-950 shrink-0">
          <img 
            src={exercise.imageUrl} 
            alt={language === 'ar' ? exercise.nameAr : exercise.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 inset-x-6 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {t(exercise.category as any)}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 leading-tight">
                {language === 'ar' ? exercise.nameAr : exercise.nameEn}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300">
                {language === 'ar' ? exercise.nameEn : exercise.nameAr}
              </p>
            </div>

            {/* Calorie Pill in Banner */}
            <div className="hidden sm:flex flex-col items-end shrink-0">
              <span className="text-[10px] text-zinc-400 font-bold">{language === 'ar' ? 'الحرق التقديري' : 'Est. Burn'}</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-emerald-500/40 text-emerald-400 font-black text-base shadow-lg">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>{calorieResult.totalCalories} kcal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-zinc-300">
          
          {/* Accurate Calorie Engine Breakdown Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-zinc-950 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-emerald-400" />
                <h4 className="font-black text-zinc-100 text-sm">
                  {language === 'ar' ? 'حساب السعرات المحروقة الدقيقة' : 'Precision Calorie Burn Engine'}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  setIsProfileModalOpen(true);
                }}
                className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 hover:underline"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? `وزنك: ${profile.weightKg} كجم (تعديل)` : `Weight: ${profile.weightKg}kg (Edit)`}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'إجمالي التمرين' : 'Total Burn'}</span>
                <span className="text-base sm:text-lg font-black text-emerald-400">{calorieResult.totalCalories} kcal</span>
                <span className="text-[9px] text-zinc-500 block">{sets} {language === 'ar' ? 'مجموعات' : 'sets'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'لكل جولة' : 'Per Single Set'}</span>
                <span className="text-base sm:text-lg font-black text-amber-400">{calorieResult.caloriesPerSet} kcal</span>
                <span className="text-[9px] text-zinc-500 block">work + rest</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'الوقت التقديري' : 'Est. Time'}</span>
                <span className="text-base sm:text-lg font-black text-sky-400">{calorieResult.durationMinutes} min</span>
                <span className="text-[9px] text-zinc-500 block">MET {calorieResult.met}</span>
              </div>
            </div>

            {/* Special Treadmill launcher if cardio */}
            {isTreadmill && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setIsTreadmillModalOpen(true);
                }}
                className="w-full py-2 px-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <span>{language === 'ar' ? 'تخصيص السرعة ونسبة الانحدار (حاسبة السير)' : 'Customize Speed & Incline % (Treadmill Engine)'}</span>
              </button>
            )}
          </div>

          {/* Muscle Anatomy Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400">{t('primaryMuscle')}</h4>
                <p className="font-bold text-zinc-100 mt-0.5">
                  {language === 'ar' ? exercise.primaryMuscleAr : exercise.primaryMuscleEn}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 mt-0.5">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400">{t('secondaryMuscles')}</h4>
                <p className="font-bold text-zinc-100 mt-0.5">
                  {secondary && secondary.length > 0 ? secondary.join(' • ') : (language === 'ar' ? 'تمرين عزل مباشر' : 'Direct Isolation')}
                </p>
              </div>
            </div>
          </div>

          {/* Execution Steps */}
          <div>
            <h3 className="text-base font-bold text-zinc-100 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('instructions')}</span>
            </h3>
            <ol className="space-y-2.5">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed text-zinc-200 text-xs sm:text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Pro Tips */}
          {tips && tips.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30">
              <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{t('proTips')}</span>
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-zinc-300">
                {tips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Mistakes */}
          {mistakes && mistakes.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30">
              <h3 className="text-sm font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{t('commonMistakes')}</span>
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-zinc-300">
                {mistakes.map((mis, idx) => (
                  <li key={idx} className="leading-relaxed">{mis}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Schedule Adder */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h4 className="font-bold text-zinc-200 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{t('addToPlan')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t('navPlanner')}</label>
                <select
                  value={targetDay}
                  onChange={(e) => setTargetDay(e.target.value as DayOfWeek)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                >
                  {daysList.map(d => (
                    <option key={d.key} value={d.key}>{d.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t('sets')}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={sets}
                  onChange={(e) => setSets(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t('reps')}</label>
                <input
                  type="text"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t('rest')} ({t('seconds')})</label>
                <input
                  type="number"
                  step="15"
                  min="0"
                  max="300"
                  value={rest}
                  onChange={(e) => setRest(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                addedNotice
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('savedSuccess')}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{t('addToPlan')} ({daysList.find(d => d.key === targetDay)?.label})</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/90 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
};
