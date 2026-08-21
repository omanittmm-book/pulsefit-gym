import React, { useState, useMemo } from 'react';
import { Exercise, DayOfWeek, MuscleCategory } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { Search, X, Plus, Check, Flame } from 'lucide-react';

interface AddExercisePickerModalProps {
  day: DayOfWeek;
  onClose: () => void;
}

export const AddExercisePickerModal: React.FC<AddExercisePickerModalProps> = ({ day, onClose }) => {
  const { language, t } = useLanguage();
  const { exercises, addExerciseToDay, weeklySchedule } = useWorkout();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<MuscleCategory | 'all'>('all');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const existingInDay = useMemo(() => {
    return (weeklySchedule[day]?.exercises || []).map(e => e.exerciseId);
  }, [weeklySchedule, day]);

  const categories: { key: MuscleCategory | 'all'; label: string }[] = [
    { key: 'all', label: t('allMuscles') },
    { key: 'chest', label: t('chest') },
    { key: 'back', label: t('back') },
    { key: 'legs', label: t('legs') },
    { key: 'shoulders', label: t('shoulders') },
    { key: 'arms', label: t('arms') },
    { key: 'core', label: t('core') },
    { key: 'cardio', label: t('cardio') }
  ];

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      if (selectedCat !== 'all' && ex.category !== selectedCat) return false;
      if (search.trim() !== '') {
        const q = search.toLowerCase().trim();
        const mEn = ex.nameEn.toLowerCase().includes(q) || ex.primaryMuscleEn.toLowerCase().includes(q);
        const mAr = ex.nameAr.includes(q) || ex.primaryMuscleAr.includes(q);
        return mEn || mAr;
      }
      return true;
    });
  }, [exercises, selectedCat, search]);

  const handleAdd = (exercise: Exercise) => {
    addExerciseToDay(day, exercise);
    setAddedIds(prev => [...prev, exercise.id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-bold text-zinc-100 text-lg">
              {language === 'ar' 
                ? `إضافة تمرين إلى جدول (${t(day as any)})` 
                : `Add Exercise to ${t(day as any)} Schedule`}
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'ar' ? 'اختر التمارين التي ترغب بضمها لحصة هذا اليوم' : 'Select exercises to include in this training session'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800/80 space-y-3 shrink-0">
          <div className="relative">
            <Search className="absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCat(c.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === c.key
                    ? 'bg-emerald-400 text-zinc-950 font-bold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.map((exercise) => {
            const isAlreadyIn = existingInDay.includes(exercise.id) || addedIds.includes(exercise.id);

            return (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                    <img 
                      src={exercise.imageUrl} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-zinc-100 text-xs sm:text-sm truncate">
                      {language === 'ar' ? exercise.nameAr : exercise.nameEn}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
                      <span className="text-emerald-400 font-medium">{t(exercise.category as any)}</span>
                      <span>•</span>
                      <span className="truncate">{language === 'ar' ? exercise.primaryMuscleAr : exercise.primaryMuscleEn}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(exercise)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isAlreadyIn
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 hover:bg-emerald-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700'
                  }`}
                >
                  {isAlreadyIn ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'مضاف' : 'Added'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'إضافة' : 'Add'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
          >
            {language === 'ar' ? 'تم والعودة للجدول' : 'Done & Return'}
          </button>
        </div>

      </div>
    </div>
  );
};
