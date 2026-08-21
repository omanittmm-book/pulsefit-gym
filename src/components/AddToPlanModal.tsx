import React, { useState } from 'react';
import { Exercise, DayOfWeek } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { X, Plus, Check, Calendar } from 'lucide-react';

interface AddToPlanModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const AddToPlanModal: React.FC<AddToPlanModalProps> = ({ exercise, onClose }) => {
  const { language, t } = useLanguage();
  const { addExerciseToDay, selectedDay, weeklySchedule } = useWorkout();

  const [targetDay, setTargetDay] = useState<DayOfWeek>(selectedDay);
  const [sets, setSets] = useState<number>(exercise?.defaultSets || 3);
  const [reps, setReps] = useState<string>(exercise?.defaultReps || '10-12');
  const [rest, setRest] = useState<number>(exercise?.defaultRestSec || 60);
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [done, setDone] = useState(false);

  if (!exercise) return null;

  const days: { key: DayOfWeek; label: string }[] = [
    { key: 'sat', label: t('sat') },
    { key: 'sun', label: t('sun') },
    { key: 'mon', label: t('mon') },
    { key: 'tue', label: t('tue') },
    { key: 'wed', label: t('wed') },
    { key: 'thu', label: t('thu') },
    { key: 'fri', label: t('fri') }
  ];

  const handleConfirm = () => {
    addExerciseToDay(targetDay, exercise, sets, reps, rest, targetWeight, notes);
    setDone(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
              <img 
                src={exercise.imageUrl} 
                alt={language === 'ar' ? exercise.nameAr : exercise.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-sm sm:text-base leading-tight">
                {language === 'ar' ? exercise.nameAr : exercise.nameEn}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">
                {t(exercise.category as any)} • {exercise.defaultSets} {t('sets')} × {exercise.defaultReps}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Day Picker */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">
            {language === 'ar' ? 'اختر اليوم لإضافة التمرين إليه:' : 'Select Day of the Week:'}
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {days.map(d => {
              const count = weeklySchedule[d.key]?.exercises.length || 0;
              const isSelected = targetDay === d.key;
              const isRest = weeklySchedule[d.key]?.isRestDay;

              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setTargetDay(d.key)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold'
                      : isRest
                      ? 'bg-zinc-950/40 text-zinc-500 border-zinc-800/60 hover:border-zinc-700'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="truncate">{d.label.slice(0, 3)}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                    {isRest ? (language === 'ar' ? 'راحة' : 'Rest') : `${count}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sets / Reps / Rest / Target Weight inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800/80">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">{t('sets')}</label>
            <input
              type="number"
              min="1"
              max="10"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 font-bold text-center focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">{t('reps')}</label>
            <input
              type="text"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 font-bold text-center focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">{t('targetWeightKg')}</label>
            <input
              type="number"
              step="2.5"
              min="0"
              max="500"
              value={targetWeight || ''}
              placeholder="0"
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold text-center focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">{t('rest')} (s)</label>
            <input
              type="number"
              step="15"
              min="15"
              max="300"
              value={rest}
              onChange={(e) => setRest(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 font-bold text-center focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-400 mb-1">{t('notes')}</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={language === 'ar' ? 'ملاحظات الأداء، الوزن المستهدف، دروب سيت...' : 'Performance cues, target dumbbells, drop set...'}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleConfirm}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            done
              ? 'bg-emerald-500 text-zinc-950 shadow-lg'
              : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-lg shadow-emerald-500/20'
          }`}
        >
          {done ? (
            <>
              <Check className="w-4 h-4" />
              <span>{t('savedSuccess')}</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>{t('addToPlan')} ({days.find(d => d.key === targetDay)?.label})</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
