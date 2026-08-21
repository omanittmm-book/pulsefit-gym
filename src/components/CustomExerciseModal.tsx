import React, { useState } from 'react';
import { MuscleCategory, EquipmentType, DifficultyLevel, Exercise } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { X, Plus, Check, Dumbbell, Sparkles } from 'lucide-react';

interface CustomExerciseModalProps {
  onClose: () => void;
}

export const CustomExerciseModal: React.FC<CustomExerciseModalProps> = ({ onClose }) => {
  const { language, t } = useLanguage();
  const { addCustomExercise } = useWorkout();

  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [category, setCategory] = useState<MuscleCategory>('chest');
  const [primaryMuscleEn, setPrimaryMuscleEn] = useState('');
  const [primaryMuscleAr, setPrimaryMuscleAr] = useState('');
  const [equipment, setEquipment] = useState<EquipmentType>('dumbbell');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
  const [defaultSets, setDefaultSets] = useState(3);
  const [defaultReps, setDefaultReps] = useState('10-12');
  const [defaultRestSec, setDefaultRestSec] = useState(60);
  const [instructionsText, setInstructionsText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fallbackImages: Record<MuscleCategory, string> = {
    chest: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
    back: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80',
    legs: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    shoulders: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80',
    arms: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80',
    core: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80',
    cardio: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameAr.trim()) return;

    const finalNameEn = nameEn.trim() || nameAr.trim();
    const finalNameAr = nameAr.trim() || nameEn.trim();
    const finalPrimaryEn = primaryMuscleEn.trim() || t(category as any);
    const finalPrimaryAr = primaryMuscleAr.trim() || t(category as any);

    const instructionsList = instructionsText.trim()
      ? instructionsText.split('\n').filter(s => s.trim().length > 0)
      : [
          language === 'ar' 
            ? 'حافظ على استقامة العمود الفقري وتنفس بشكل منتظم أثناء التمرين.' 
            : 'Maintain proper spinal alignment and smooth breathing throughout.'
        ];

    addCustomExercise({
      nameEn: finalNameEn,
      nameAr: finalNameAr,
      category,
      primaryMuscleEn: finalPrimaryEn,
      primaryMuscleAr: finalPrimaryAr,
      secondaryMusclesEn: [],
      secondaryMusclesAr: [],
      equipment,
      difficulty,
      imageUrl: imageUrl.trim() || fallbackImages[category],
      defaultSets,
      defaultReps,
      defaultRestSec,
      instructionsEn: instructionsList,
      instructionsAr: instructionsList,
      tipsEn: ['Focus on mind-muscle connection.'],
      tipsAr: ['ركّز على الاتصال العضلي العصبي والتحكم في الوزن.']
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t('addCustomExerciseTitle')}</h3>
              <p className="text-xs text-zinc-400">{language === 'ar' ? 'أضف تمرينك المفضل إلى قاعدة بياناتك الشخصية' : 'Add custom movements to your personal database'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-zinc-300">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-300 mb-1">{t('exerciseNameAr')} *</label>
              <input
                type="text"
                required
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: دفع أرجل بوزن إضافي"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">{t('exerciseNameEn')} *</label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Heavy Leg Press Variation"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-zinc-300 mb-1">{t('selectCategory')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MuscleCategory)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
              >
                <option value="chest">{t('chest')}</option>
                <option value="back">{t('back')}</option>
                <option value="legs">{t('legs')}</option>
                <option value="shoulders">{t('shoulders')}</option>
                <option value="arms">{t('arms')}</option>
                <option value="core">{t('core')}</option>
                <option value="cardio">{t('cardio')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">{t('selectEquipment')}</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value as EquipmentType)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
              >
                <option value="dumbbell">{t('dumbbell')}</option>
                <option value="barbell">{t('barbell')}</option>
                <option value="cable">{t('cable')}</option>
                <option value="machine">{t('machine')}</option>
                <option value="bodyweight">{t('bodyweight')}</option>
                <option value="kettlebell">{t('kettlebell')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">{t('selectDifficulty')}</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
              >
                <option value="beginner">{t('beginner')}</option>
                <option value="intermediate">{t('intermediate')}</option>
                <option value="advanced">{t('advanced')}</option>
              </select>
            </div>
          </div>

          {/* Sets / Reps / Rest defaults */}
          <div className="grid grid-cols-3 gap-3 bg-zinc-950 p-3.5 rounded-2xl border border-zinc-850">
            <div>
              <label className="block font-semibold text-zinc-400 mb-1">{t('sets')}</label>
              <input
                type="number"
                min="1"
                max="10"
                value={defaultSets}
                onChange={(e) => setDefaultSets(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1.5 text-center font-bold text-zinc-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-400 mb-1">{t('reps')}</label>
              <input
                type="text"
                value={defaultReps}
                onChange={(e) => setDefaultReps(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1.5 text-center font-bold text-zinc-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-400 mb-1">{t('rest')} (s)</label>
              <input
                type="number"
                step="15"
                min="15"
                max="300"
                value={defaultRestSec}
                onChange={(e) => setDefaultRestSec(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1.5 text-center font-bold text-zinc-100"
              />
            </div>
          </div>

          {/* Optional Image URL */}
          <div>
            <label className="block font-bold text-zinc-300 mb-1">
              {language === 'ar' ? 'رابط صورة التمرين (اختياري):' : 'Image URL (optional):'}
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-bold text-zinc-300 mb-1">
              {language === 'ar' ? 'خطوات أداء التمرين (سطر لكل خطوة):' : 'Execution Instructions (one per line):'}
            </label>
            <textarea
              rows={3}
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              placeholder={language === 'ar' ? 'الخطوة 1...\nالخطوة 2...' : 'Step 1...\nStep 2...'}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-zinc-100 placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              submitted
                ? 'bg-emerald-500 text-zinc-950'
                : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t('customExerciseCreated')}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t('saveCustomExercise')}</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
