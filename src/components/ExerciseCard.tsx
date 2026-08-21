import React, { useState } from 'react';
import { Exercise } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { 
  Plus, 
  Info, 
  Star, 
  Layers, 
  Flame, 
  Check, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onOpenDetails: (exercise: Exercise) => void;
  onQuickAddToPlan: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onOpenDetails,
  onQuickAddToPlan
}) => {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useWorkout();
  const [imageLoaded, setImageLoaded] = useState(false);

  const favorited = isFavorite(exercise.id);

  // Colors based on category
  const categoryBadgeColors: Record<string, string> = {
    chest: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    back: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    legs: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    shoulders: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    arms: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    core: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    cardio: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  };

  const difficultyLabels: Record<string, { en: string; ar: string; color: string }> = {
    beginner: { en: 'Beginner', ar: 'مبتدئ', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' },
    intermediate: { en: 'Intermediate', ar: 'متوسط', color: 'text-amber-400 bg-amber-950/40 border-amber-800/40' },
    advanced: { en: 'Advanced', ar: 'متقدم', color: 'text-rose-400 bg-rose-950/40 border-rose-800/40' }
  };

  const equipmentNames: Record<string, { en: string; ar: string }> = {
    barbell: { en: 'Barbell', ar: 'بار حديد' },
    dumbbell: { en: 'Dumbbell', ar: 'دامبلز' },
    cable: { en: 'Cable', ar: 'كيبل' },
    machine: { en: 'Machine', ar: 'جهاز' },
    bodyweight: { en: 'Bodyweight', ar: 'وزن الجسم' },
    kettlebell: { en: 'Kettlebell', ar: 'كيتل بيل' },
    bands: { en: 'Resistance Bands', ar: 'أحبال مقاومة' },
    other: { en: 'Other', ar: 'أداة أخرى' }
  };

  const categoryName = t(exercise.category as any);
  const diffInfo = difficultyLabels[exercise.difficulty] || difficultyLabels.beginner;
  const eqInfo = equipmentNames[exercise.equipment] || { en: exercise.equipment, ar: exercise.equipment };

  return (
    <div className="group relative flex flex-col bg-zinc-900/90 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5">
      
      {/* Exercise Image Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        <img
          src={exercise.imageUrl}
          alt={language === 'ar' ? exercise.nameAr : exercise.nameEn}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
            <span className="text-zinc-600 text-xs font-mono">Loading...</span>
          </div>
        )}

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${categoryBadgeColors[exercise.category] || 'bg-zinc-800 text-zinc-200'}`}>
            {categoryName}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(exercise.id);
            }}
            className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              favorited 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/90 border border-zinc-700/50'
            }`}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Favorite toggle"
          >
            <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between text-xs">
          <span className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-medium backdrop-blur-sm">
            {language === 'ar' ? eqInfo.ar : eqInfo.en}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border backdrop-blur-sm ${diffInfo.color}`}>
            {language === 'ar' ? diffInfo.ar : diffInfo.en}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <div>
          <h3 className="font-bold text-zinc-100 text-base leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1">
            {language === 'ar' ? exercise.nameAr : exercise.nameEn}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {language === 'ar' ? exercise.nameEn : exercise.nameAr}
          </p>
        </div>

        {/* Target Muscle Focus */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-950/60 px-2.5 py-1.5 rounded-lg border border-zinc-800/80">
          <Flame className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">
            <span className="text-zinc-500">{t('primaryMuscle')}: </span>
            <span className="font-semibold text-zinc-200">
              {language === 'ar' ? exercise.primaryMuscleAr : exercise.primaryMuscleEn}
            </span>
          </span>
        </div>

        {/* Recommended Sets & Reps Pill */}
        <div className="flex items-center justify-between bg-zinc-950/40 px-3 py-2 rounded-xl border border-zinc-800/60 text-xs">
          <div className="flex items-center gap-1 text-zinc-300">
            <span className="text-zinc-500 font-medium">{t('sets')}:</span>
            <span className="font-bold text-emerald-400">{exercise.defaultSets}</span>
          </div>
          <div className="w-px h-3 bg-zinc-800" />
          <div className="flex items-center gap-1 text-zinc-300">
            <span className="text-zinc-500 font-medium">{t('reps')}:</span>
            <span className="font-bold text-emerald-400">{exercise.defaultReps}</span>
          </div>
          <div className="w-px h-3 bg-zinc-800" />
          <div className="flex items-center gap-1 text-zinc-300">
            <span className="text-zinc-500 font-medium">{t('rest')}:</span>
            <span className="font-bold text-zinc-200">{exercise.defaultRestSec}s</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
          <button
            onClick={() => onOpenDetails(exercise)}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white border border-zinc-700/60 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <Info className="w-3.5 h-3.5 text-zinc-400" />
            <span className="truncate">{t('viewDetails')}</span>
          </button>

          <button
            onClick={() => onQuickAddToPlan(exercise)}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="truncate">{t('addToPlan')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
