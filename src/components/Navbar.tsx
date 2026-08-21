import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { 
  Dumbbell, 
  CalendarDays, 
  Layers, 
  Play, 
  History, 
  PlusCircle, 
  Globe,
  Sparkles
} from 'lucide-react';

export type ActiveTab = 'exercises' | 'planner' | 'templates' | 'history';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCustomExercise: () => void;
  onStartLiveWorkout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCustomExercise,
  onStartLiveWorkout
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { weeklySchedule, selectedDay } = useWorkout();

  const currentDayExercises = weeklySchedule[selectedDay]?.exercises || [];
  const currentDayIsRest = weeklySchedule[selectedDay]?.isRestDay;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('exercises')}
              className="flex items-center gap-2.5 text-left rtl:text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-zinc-100 flex items-center gap-1.5 font-sans">
                  {language === 'ar' ? 'فتنس بلس' : 'PulseFit'}
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">PRO</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline">
                  {language === 'ar' ? 'PulseFit • جدول التمارين' : 'Gym Workout & Routine Planner'}
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links Zone */}
          <nav className="hidden md:flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'exercises'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>{t('navExercises')}</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'planner'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>{t('navPlanner')}</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'templates'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t('navTemplates')}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span>{t('navHistory')}</span>
            </button>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Add Custom Exercise Button */}
            <button
              onClick={onOpenCustomExercise}
              title={t('navCustomExercise')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('navCustomExercise')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer whitespace-nowrap"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">{language === 'ar' ? 'English' : 'العربية'}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase font-mono">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Start Live Workout Button */}
            <button
              onClick={onStartLiveWorkout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
            >
              <Play className="w-4 h-4 fill-zinc-950" />
              <span className="hidden xs:inline">{t('navLiveWorkout')}</span>
              <span className="xs:hidden">{language === 'ar' ? 'تمرّن' : 'Start'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-800/80">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'exercises' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>{t('navExercises')}</span>
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'planner' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{t('navPlanner')}</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'templates' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('navTemplates')}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'history' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{t('navHistory')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
