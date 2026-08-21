import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { WorkoutProvider, useWorkout } from './context/WorkoutContext';
import { UserProfileProvider, useUserProfile } from './context/UserProfileContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { ExerciseDirectory } from './components/ExerciseDirectory';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { CustomRoutineDesigner } from './components/CustomRoutineDesigner';
import { TemplatesView } from './components/TemplatesView';
import { WorkoutHistoryView } from './components/WorkoutHistoryView';
import { LiveWorkoutModal } from './components/LiveWorkoutModal';
import { CustomExerciseModal } from './components/CustomExerciseModal';
import { UserProfileModal } from './components/UserProfileModal';
import { TreadmillSimulatorModal } from './components/TreadmillSimulatorModal';
import { LaFamiliaLogo } from './components/LaFamiliaLogo';
import { DayOfWeek } from './types/fitness';
import { Dumbbell, Sparkles } from 'lucide-react';

function AppContent() {
  const { language, t } = useLanguage();
  const { selectedDay } = useWorkout();
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    isTreadmillModalOpen, 
    setIsTreadmillModalOpen 
  } = useUserProfile();

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
            onOpenCustomDesigner={() => setActiveTab('designer')}
            onStartLiveWorkout={handleStartLiveWorkout}
          />
        )}

        {activeTab === 'designer' && (
          <CustomRoutineDesigner
            onApplyToSchedule={() => setActiveTab('planner')}
            onOpenTemplates={() => setActiveTab('templates')}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesView
            onTemplateApplied={() => setActiveTab('planner')}
            onOpenCustomDesigner={() => setActiveTab('designer')}
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

      {/* User Biometrics Profile & Calorie Engine Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Treadmill Cardio Speed & Incline Simulator Modal */}
      <TreadmillSimulatorModal
        isOpen={isTreadmillModalOpen}
        onClose={() => setIsTreadmillModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <LaFamiliaLogo size="sm" variant="horizontal" />
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400">
              {language === 'ar' ? 'تطبيق جداول التمارين، وتصميم الروتين الرياضي، وتتبع الأوزان وحساب السعرات الدقيقة' : 'Gym Workout, Routine Architect, Weight Tracker & Precision Calorie Engine'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400 font-medium">
              <span>{language === 'ar' ? 'مجتمع رياضي واحترافي • LA FAMILIA' : 'Engineered for athletes & fitness community'}</span>
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
      <UserProfileProvider>
        <WorkoutProvider>
          <AppContent />
        </WorkoutProvider>
      </UserProfileProvider>
    </LanguageProvider>
  );
}

