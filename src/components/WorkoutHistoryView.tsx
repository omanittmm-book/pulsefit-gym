import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { History, Trash2, Calendar, Clock, Weight, Trophy, Dumbbell, Play } from 'lucide-react';

interface WorkoutHistoryViewProps {
  onStartLiveWorkout: () => void;
}

export const WorkoutHistoryView: React.FC<WorkoutHistoryViewProps> = ({ onStartLiveWorkout }) => {
  const { language, t } = useLanguage();
  const { workoutLogs, deleteWorkoutLog, clearAllLogs } = useWorkout();

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const totalAllTimeVolume = workoutLogs.reduce((acc, curr) => acc + (curr.totalVolumeKg || 0), 0);
  const totalCompletedSessions = workoutLogs.length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white">{t('historyTitle')}</h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            {t('historyDesc')}
          </p>
        </div>

        {workoutLogs.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف كامل سجل التمارين؟' : 'Clear all recorded workouts history?')) {
                clearAllLogs();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-rose-950/30 text-rose-400 border border-zinc-800 text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('clearAllHistory')}</span>
          </button>
        )}
      </div>

      {/* Stats Summary Strip */}
      {workoutLogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-500 font-semibold">{language === 'ar' ? 'إجمالي الجلسات المنجزة' : 'Total Sessions'}</span>
              <p className="text-xl font-black text-white">{totalCompletedSessions}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Weight className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-500 font-semibold">{t('totalVolume')}</span>
              <p className="text-xl font-black text-sky-400">{totalAllTimeVolume.toLocaleString()} {t('kg')}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-500 font-semibold">{language === 'ar' ? 'متوسط وقت الحصة' : 'Average Session'}</span>
              <p className="text-xl font-black text-amber-400">
                {Math.round(workoutLogs.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0) / (workoutLogs.length || 1))} {t('minutes')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Logs List */}
      {workoutLogs.length > 0 ? (
        <div className="space-y-4">
          {workoutLogs.map((log) => (
            <div
              key={log.id}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all shadow-md"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="font-black text-white text-base sm:text-lg">
                    {language === 'ar' ? log.workoutTitleAr : log.workoutTitleEn}
                  </h3>
                  <span className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{formatDate(log.date)}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-950 text-emerald-400 border border-zinc-800 font-bold">
                    {log.durationMinutes} {t('minutes')}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-950 text-sky-400 border border-zinc-800 font-bold">
                    {log.totalVolumeKg} {t('kg')}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800 font-bold">
                    {log.completedSetsCount} {t('sets')}
                  </span>

                  <button
                    onClick={() => deleteWorkoutLog(log.id)}
                    className="p-1.5 rounded-lg bg-zinc-950 hover:bg-rose-950/30 text-zinc-500 hover:text-rose-400 border border-zinc-800 transition-colors ml-1"
                    title={t('deleteLog')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Exercises Performed in this session */}
              <div className="flex flex-wrap gap-2 pt-1">
                {log.exercisesSummary.map((ex, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                  >
                    <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold">{language === 'ar' ? ex.exerciseNameAr : ex.exerciseNameEn}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      ({ex.sets.filter(s => s.completed).length} {t('sets')})
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-800 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
            <History className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="font-bold text-zinc-200 text-base">{t('noHistoryYet')}</h3>
          </div>
          <button
            onClick={onStartLiveWorkout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-zinc-950" />
            <span>{t('navLiveWorkout')}</span>
          </button>
        </div>
      )}

    </div>
  );
};
