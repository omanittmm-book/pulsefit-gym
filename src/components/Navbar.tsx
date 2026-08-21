import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { useUserProfile } from '../context/UserProfileContext';
import { LaFamiliaLogo } from './LaFamiliaLogo';
import { 
  Dumbbell, 
  CalendarDays, 
  Layers, 
  Play, 
  History, 
  PlusCircle, 
  Globe,
  Sparkles,
  Sliders,
  Flame,
  User,
  Scale,
  TrendingUp
} from 'lucide-react';

export type ActiveTab = 'exercises' | 'planner' | 'designer' | 'templates' | 'history';

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
  const { profile, setIsProfileModalOpen, setIsTreadmillModalOpen } = useUserProfile();

  const currentDayExercises = weeklySchedule[selectedDay]?.exercises || [];
  const currentDayIsRest = weeklySchedule[selectedDay]?.isRestDay;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Zone with La Familia Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('exercises')}
              className="flex items-center text-left rtl:text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 cursor-pointer transition-transform hover:scale-[1.02]"
              title="LA FAMILIA - Fitness & Community"
            >
              <LaFamiliaLogo size="md" variant="horizontal" />
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
              onClick={() => setActiveTab('designer')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'designer'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t('navDesigner')}</span>
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
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Treadmill Cardio Quick Engine Button */}
            <button
              onClick={() => setIsTreadmillModalOpen(true)}
              title={language === 'ar' ? 'حاسبة الركض والانحدار على السير الكهربائي' : 'Treadmill Speed & Incline Engine'}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold text-orange-400 bg-orange-950/30 hover:bg-orange-950/60 border border-orange-800/50 hover:border-orange-600/60 transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">{language === 'ar' ? 'السير الكهربائي' : 'Treadmill'}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-orange-900/50 text-orange-300 font-mono hidden md:inline">
                %Incline
              </span>
            </button>

            {/* User Profile & Calorie Biometrics Button (Beside Language Switcher) */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              title={language === 'ar' ? 'تعديل الوزن والعمر والطول لحساب السعرات الدقيقة' : 'Edit Weight, Age & Height for Calorie Engine'}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-zinc-900/90 hover:bg-zinc-800 border border-emerald-500/40 hover:border-emerald-400/60 transition-all cursor-pointer whitespace-nowrap group shadow-sm shadow-emerald-950/20"
            >
              <Flame className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-zinc-100 font-extrabold">
                {profile.weightUnit === 'lbs' ? `${Math.round(profile.weightKg * 2.20462)} lbs` : `${profile.weightKg} kg`}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 hidden xs:inline">
                {language === 'ar' ? 'سعراتي' : 'Calorie'}
              </span>
            </button>

            {/* Add Custom Exercise Button */}
            <button
              onClick={onOpenCustomExercise}
              title={t('navCustomExercise')}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('navCustomExercise')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer whitespace-nowrap"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold hidden sm:inline">{language === 'ar' ? 'English' : 'العربية'}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase font-mono">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Start Live Workout Button */}
            <button
              onClick={onStartLiveWorkout}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
            >
              <Play className="w-4 h-4 fill-zinc-950" />
              <span className="hidden xs:inline">{t('navLiveWorkout')}</span>
              <span className="xs:hidden">{language === 'ar' ? 'تمرّن' : 'Start'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-800/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'exercises' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>{t('navExercises')}</span>
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'planner' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{t('navPlanner')}</span>
          </button>
          <button
            onClick={() => setActiveTab('designer')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'designer' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('navDesigner')}</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'templates' ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('navTemplates')}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
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
