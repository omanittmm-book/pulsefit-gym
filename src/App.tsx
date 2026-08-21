import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { WorkoutProvider, useWorkout } from './context/WorkoutContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { ExerciseDirectory } from './components/ExerciseDirectory';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { TemplatesView } from './components/TemplatesView';
import { WorkoutHistoryView } from './components/WorkoutHistoryView';
import { LiveWorkoutModal } from './components/LiveWorkoutModal';
import { CustomExerciseModal } from './components/CustomExerciseModal';
import { DayOfWeek } from './types/fitness';
import { Dumbbell, Heart, Sparkles } from 'lucide-react';

function AppContent() {
  const { language, t } = useLanguage();
  const { selectedDay } = useWorkout();

  const [activeTab, setActiveTab] = useState<ActiveTab>('exercises');
  const [isLiveWorkoutOpen, setIsLiveWorkoutOpen] = useState(false);
  const [liveWorkoutDay, setLiveWorkoutDay] = useState<DayOfWeek | null>(null);
  const [isCustomExerciseOpen, setIsCustomExerciseOpen] = useState(false);

  const handleStartLiveWorkout = (day?: DayOfWeek) => {
    setLiveWorkoutDay(day || selectedDay);
    setIsLiveWorkoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col gym-mesh-bg font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCustomExercise={() => setIsCustomExerciseOpen(true)}
        onStartLiveWorkout={() => handleStartLiveWorkout()}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'exercises' && (
          <ExerciseDirectory
            onOpenCustomExercise={() => setIsCustomExerciseOpen(true)}
          />
        )}

        {activeTab === 'planner' && (
          <WeeklyPlanner
            onOpenTemplates={() => setActiveTab('templates')}
            onStartLiveWorkout={handleStartLiveWorkout}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesView
            onTemplateApplied={() => setActiveTab('planner')}
          />
        )}

        {activeTab === 'history' && (
          <WorkoutHistoryView
            onStartLiveWorkout={() => handleStartLiveWorkout()}
          />
        )}
      </main>

      {/* Live Workout Session Modal */}
      {isLiveWorkoutOpen && (
        <LiveWorkoutModal
          day={liveWorkoutDay}
          onClose={() => {
            setIsLiveWorkoutOpen(false);
            setLiveWorkoutDay(null);
          }}
        />
      )}

      {/* Custom Exercise Modal */}
      {isCustomExerciseOpen && (
        <CustomExerciseModal
          onClose={() => setIsCustomExerciseOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-zinc-400">
              {language === 'ar' ? 'فتنس بلس | PulseFit' : 'PulseFit Pro'}
            </span>
            <span>—</span>
            <span>{language === 'ar' ? 'تطبيق جداول التمارين ودليل اللياقة الشامل' : 'Bilingual Gym Workout & Routine Architect'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400">
              <span>{language === 'ar' ? 'صُمم للرياضيين' : 'Engineered for athletes'}</span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WorkoutProvider>
        <AppContent />
      </WorkoutProvider>
    </LanguageProvider>
  );
}
