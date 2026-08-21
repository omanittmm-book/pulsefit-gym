import React, { useState } from 'react';
import { WorkoutTemplate, DayOfWeek } from '../types/fitness';
import { WORKOUT_TEMPLATES } from '../data/templatesData';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { 
  Layers, 
  Check, 
  Calendar, 
  Dumbbell, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TemplatesViewProps {
  onTemplateApplied: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onTemplateApplied }) => {
  const { language, t } = useLanguage();
  const { applyTemplate, exercises } = useWorkout();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(WORKOUT_TEMPLATES[0].id);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const activeTemplate = WORKOUT_TEMPLATES.find(t => t.id === selectedTemplateId) || WORKOUT_TEMPLATES[0];

  const daysOrder: DayOfWeek[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

  const handleApply = (templateId: string) => {
    const success = applyTemplate(templateId);
    if (success) {
      setAppliedId(templateId);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
      setTimeout(() => {
        setAppliedId(null);
        onTemplateApplied();
      }, 1200);
    }
  };

  const getExerciseName = (id: string) => {
    const ex = exercises.find(e => e.id === id);
    if (!ex) return id;
    return language === 'ar' ? ex.nameAr : ex.nameEn;
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'جداول تدريبية مدروسة علمياً' : 'Scientifically Structured Training Splits'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">{t('templatesTitle')}</h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl">
          {t('templatesDesc')}
        </p>
      </div>

      {/* Main Grid: Templates List & Detailed Schedule Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Template Cards List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1">
            {language === 'ar' ? 'اختر النظام المناسب:' : 'Choose Training Protocol:'}
          </h2>

          <div className="space-y-2.5">
            {WORKOUT_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              const isApplied = tmpl.id === appliedId;

              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-400 ring-2 ring-emerald-500/20 shadow-lg'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase">
                        {tmpl.daysPerWeek} {t('daysCount')}
                      </span>
                      <h3 className="font-bold text-zinc-100 text-base mt-1.5">
                        {language === 'ar' ? tmpl.nameAr : tmpl.nameEn}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {t(tmpl.difficulty as any)}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {language === 'ar' ? tmpl.descriptionAr : tmpl.descriptionEn}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-zinc-850">
                    <div className="flex items-center gap-1.5">
                      {tmpl.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(tmpl.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('appliedSuccess')}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('applyTemplate')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Template Deep-Dive Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl">
          
          {/* Header of Active Template */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">
                  {language === 'ar' ? activeTemplate.nameAr : activeTemplate.nameEn}
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {language === 'ar' ? activeTemplate.descriptionAr : activeTemplate.descriptionEn}
              </p>
            </div>

            <button
              onClick={() => handleApply(activeTemplate.id)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
            >
              <Check className="w-4 h-4" />
              <span>{t('applyTemplate')}</span>
            </button>
          </div>

          {/* 7-Day Day-by-Day Roster */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              {t('viewSchedulePreview')}
            </h3>

            <div className="space-y-2.5">
              {daysOrder.map((dayKey) => {
                const dayPlan = activeTemplate.schedule[dayKey];
                if (!dayPlan) return null;

                const dayName = t(dayKey as any);
                const isRest = dayPlan.isRestDay;
                const splitTitle = language === 'ar' ? dayPlan.splitTitleAr : dayPlan.splitTitleEn;

                return (
                  <div
                    key={dayKey}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isRest
                        ? 'bg-zinc-950/40 border-zinc-850 opacity-70'
                        : 'bg-zinc-950/80 border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-emerald-400 uppercase">
                          {dayName.slice(0, 3)}
                        </span>
                        <div>
                          <h4 className="font-bold text-zinc-100 text-xs sm:text-sm">
                            {dayName} — {isRest ? <span className="text-amber-400">{t('isRestDay')}</span> : splitTitle}
                          </h4>
                          <span className="text-[11px] text-zinc-500">
                            {isRest 
                              ? (language === 'ar' ? 'راحة واستشفاء عضلي' : 'Active Recovery') 
                              : `${dayPlan.exerciseIds.length} ${language === 'ar' ? 'تمارين أساسية' : 'Exercises'}`}
                          </span>
                        </div>
                      </div>

                      {!isRest && (
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                          {dayPlan.exerciseIds.length} {language === 'ar' ? 'تمارين' : 'ex'}
                        </span>
                      )}
                    </div>

                    {/* Exercise Pills */}
                    {!isRest && dayPlan.exerciseIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-zinc-900">
                        {dayPlan.exerciseIds.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-300 font-medium"
                          >
                            <Dumbbell className="w-3 h-3 text-emerald-400" />
                            <span className="truncate max-w-[150px]">{getExerciseName(item.exerciseId)}</span>
                            <span className="text-zinc-500 font-mono text-[10px]">({item.sets}×{item.reps})</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
