import React, { useState, useMemo } from 'react';
import { Exercise, MuscleCategory, EquipmentType, DifficultyLevel } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { ExerciseCard } from './ExerciseCard';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { AddToPlanModal } from './AddToPlanModal';
import { LaFamiliaLogo } from './LaFamiliaLogo';
import { 
  Search, 
  Filter, 
  X, 
  Star, 
  Sparkles, 
  PlusCircle, 
  Dumbbell,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface ExerciseDirectoryProps {
  onOpenCustomExercise: () => void;
}

export const ExerciseDirectory: React.FC<ExerciseDirectoryProps> = ({
  onOpenCustomExercise
}) => {
  const { language, t } = useLanguage();
  const { exercises, favorites } = useWorkout();

  const [selectedCategory, setSelectedCategory] = useState<MuscleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Modals state
  const [detailExercise, setDetailExercise] = useState<Exercise | null>(null);
  const [quickAddExercise, setQuickAddExercise] = useState<Exercise | null>(null);

  // Categories list with counts
  const categories: { key: MuscleCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: t('allMuscles'), icon: '⚡' },
    { key: 'chest', label: t('chest'), icon: '🛡️' },
    { key: 'back', label: t('back'), icon: '🦅' },
    { key: 'legs', label: t('legs'), icon: '🦵' },
    { key: 'shoulders', label: t('shoulders'), icon: '🏔️' },
    { key: 'arms', label: t('arms'), icon: '💪' },
    { key: 'core', label: t('core'), icon: '🔥' },
    { key: 'cardio', label: t('cardio'), icon: '🏃' }
  ];

  // Filtered exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      // Category filter
      if (selectedCategory !== 'all' && ex.category !== selectedCategory) {
        return false;
      }

      // Equipment filter
      if (selectedEquipment !== 'all' && ex.equipment !== selectedEquipment) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) {
        return false;
      }

      // Favorites filter
      if (onlyFavorites && !favorites.includes(ex.id)) {
        return false;
      }

      // Search Query filter (matches English or Arabic names, muscles, equipment)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchEn = ex.nameEn.toLowerCase().includes(q) || 
                        ex.primaryMuscleEn.toLowerCase().includes(q) ||
                        ex.equipment.toLowerCase().includes(q) ||
                        (ex.secondaryMusclesEn && ex.secondaryMusclesEn.some(m => m.toLowerCase().includes(q)));
        const matchAr = ex.nameAr.includes(q) || 
                        ex.primaryMuscleAr.includes(q) ||
                        (ex.secondaryMusclesAr && ex.secondaryMusclesAr.some(m => m.includes(q)));
        return matchEn || matchAr;
      }

      return true;
    });
  }, [exercises, selectedCategory, selectedEquipment, selectedDifficulty, onlyFavorites, searchQuery, favorites]);

  // Counts by category
  const getCategoryCount = (cat: MuscleCategory | 'all') => {
    if (cat === 'all') return exercises.length;
    return exercises.filter(e => e.category === cat).length;
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedEquipment('all');
    setSelectedDifficulty('all');
    setOnlyFavorites(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Banner with Gym Aesthetic */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'أكبر دليل تمارين تفاعلي باللغتين' : 'Interactive Bilingual Exercise Directory'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'ar' ? (
              <>
                ابنِ قوتك وجسمك مع <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">LA FAMILIA</span>
              </>
            ) : (
              <>
                Elevate Your Training with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">LA FAMILIA</span>
              </>
            )}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
            {language === 'ar' 
              ? 'تصفح كافة التمارين مع زوايا الأداء، العضلات المستهدفة، وتفاصيل المجموعات والتكرارات لتضمينها بجدولك التدريبي.'
              : 'Explore our evidence-based exercise library with target muscle activations, proper execution steps, and sets/reps guidance.'}
          </p>

          {/* Quick Search Input */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-zinc-950/90 border border-zinc-700/80 rounded-2xl ltr:pl-12 rtl:pr-12 ltr:pr-10 rtl:pl-10 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white rounded-full bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Logo Emblem Artwork */}
        <div className="relative z-10 hidden md:flex shrink-0 p-6 rounded-3xl bg-zinc-950/70 border border-zinc-800/80 shadow-2xl">
          <LaFamiliaLogo variant="full" size="lg" />
        </div>
      </div>

      {/* Muscle Category Tabs Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-zinc-200 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ar' ? 'تصنيف العضلات المستهدفة' : 'Target Muscle Classification'}</span>
          </h2>
          <span className="text-xs text-zinc-400 font-mono">
            {filteredExercises.length} {t('exercisesFound')}
          </span>
        </div>

        {/* Scrollable Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            const count = getCategoryCount(cat.key);

            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? 'bg-zinc-950 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Secondary Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Equipment Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400">{t('equipmentLabel')}:</span>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-700/70 text-zinc-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="all">{t('allEquipment')}</option>
              <option value="barbell">{t('barbell')}</option>
              <option value="dumbbell">{t('dumbbell')}</option>
              <option value="cable">{t('cable')}</option>
              <option value="machine">{t('machine')}</option>
              <option value="bodyweight">{t('bodyweight')}</option>
              <option value="kettlebell">{t('kettlebell')}</option>
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400">{t('difficultyLabel')}:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-700/70 text-zinc-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="all">{t('allDifficulties')}</option>
              <option value="beginner">{t('beginner')}</option>
              <option value="intermediate">{t('intermediate')}</option>
              <option value="advanced">{t('advanced')}</option>
            </select>
          </div>

          {/* Favorites Filter */}
          <button
            onClick={() => setOnlyFavorites(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              onlyFavorites
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-zinc-950 text-zinc-400 border-zinc-700/70 hover:text-zinc-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
            {favorites.length > 0 && (
              <span className="text-[10px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-300 font-mono">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* Reset & Add Custom Buttons */}
        <div className="flex items-center gap-2">
          {(selectedCategory !== 'all' || selectedEquipment !== 'all' || selectedDifficulty !== 'all' || onlyFavorites || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('resetFilters')}</span>
            </button>
          )}

          <button
            onClick={onOpenCustomExercise}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-emerald-400 border border-zinc-700 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t('navCustomExercise')}</span>
          </button>
        </div>
      </div>

      {/* Exercise Cards Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onOpenDetails={(ex) => setDetailExercise(ex)}
              onQuickAddToPlan={(ex) => setQuickAddExercise(ex)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-800 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
            <Dumbbell className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="font-bold text-zinc-200 text-base">{t('noExercisesFound')}</h3>
            <p className="text-xs text-zinc-500">
              {language === 'ar' 
                ? 'جرب تغيير كلمات البحث أو إعادة تعيين الفلاتر لعرض كافة التمارين.' 
                : 'Try adjusting your search terms or reset the filters to see all available exercises.'}
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
          >
            {t('resetFilters')}
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {detailExercise && (
        <ExerciseDetailModal
          exercise={detailExercise}
          onClose={() => setDetailExercise(null)}
        />
      )}

      {/* Add To Plan Modal */}
      {quickAddExercise && (
        <AddToPlanModal
          exercise={quickAddExercise}
          onClose={() => setQuickAddExercise(null)}
        />
      )}

    </div>
  );
};
