import React, { useState, useMemo } from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { useWorkout } from '../context/WorkoutContext';
import { 
  X, 
  Flame, 
  TrendingUp, 
  Gauge, 
  Clock, 
  Compass, 
  Footprints, 
  Sparkles, 
  Play, 
  Plus, 
  Check, 
  Layers, 
  RotateCcw,
  Zap,
  Info,
  Calendar
} from 'lucide-react';
import { SpeedUnit, TreadmillParams } from '../types/profile';
import { calculateTreadmillCalories, convertSpeedToKmh, convertKmhToUnit } from '../utils/calorieCalculator';
import { DayOfWeek, Exercise } from '../types/fitness';

interface TreadmillSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TreadmillSimulatorModal: React.FC<TreadmillSimulatorModalProps> = ({ isOpen, onClose }) => {
  const { profile, setIsProfileModalOpen } = useUserProfile();
  const { language, t } = useLanguage();
  const { addExerciseToDay, selectedDay, exercises } = useWorkout();

  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>('kmh');
  const [speedValue, setSpeedValue] = useState<number>(6.0); // 6 km/h default
  const [incline, setIncline] = useState<number>(4); // 4% default
  const [duration, setDuration] = useState<number>(30); // 30 mins
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);
  const [targetDay, setTargetDay] = useState<DayOfWeek>(selectedDay);

  // Speed unit conversion when switching units
  const handleUnitChange = (newUnit: SpeedUnit) => {
    const kmh = convertSpeedToKmh(speedValue, speedUnit);
    const converted = convertKmhToUnit(kmh, newUnit);
    setSpeedUnit(newUnit);
    setSpeedValue(converted);
  };

  // Compute live treadmill metrics based on user's specific biometrics
  const results = useMemo(() => {
    const params: TreadmillParams = {
      speed: speedValue,
      speedUnit,
      incline,
      durationMinutes: duration
    };
    return calculateTreadmillCalories(params, profile);
  }, [speedValue, speedUnit, incline, duration, profile]);

  if (!isOpen) return null;

  const presets = [
    {
      id: '12-3-30',
      titleAr: 'تحدي 12-3-30 لحرق الدهون',
      titleEn: '12-3-30 Viral Fat Burn',
      speedKmh: 4.8, // 3.0 mph
      incline: 12,
      duration: 30,
      badge: 'الأكثر شعبية 🔥',
      badgeEn: 'Trending 🔥'
    },
    {
      id: 'hill-climb',
      titleAr: 'تسلق التلال (انحدار 8%)',
      titleEn: 'Mountain Hill Climb',
      speedKmh: 5.5,
      incline: 8,
      duration: 25,
      badge: 'تقوية الأرجل 🏔️',
      badgeEn: 'Leg Power 🏔️'
    },
    {
      id: 'endurance-run',
      titleAr: 'جري التحمل السريع (10 كم/س)',
      titleEn: '5K Endurance Run',
      speedKmh: 10.0,
      incline: 1,
      duration: 30,
      badge: 'لياقة القلب ❤️',
      badgeEn: 'Cardio Boost ❤️'
    },
    {
      id: 'hiit-sprints',
      titleAr: 'سبرنتات السرعة القصوى (HIIT)',
      titleEn: 'HIIT Max Sprint',
      speedKmh: 13.5,
      incline: 2,
      duration: 20,
      badge: 'حرق مضاعف ⚡',
      badgeEn: 'Max Calorie ⚡'
    },
    {
      id: 'recovery-walk',
      titleAr: 'مشي استشفائي خفيف',
      titleEn: 'Recovery Walk',
      speedKmh: 4.2,
      incline: 0,
      duration: 35,
      badge: 'يوم الراحة 🚶‍♂️',
      badgeEn: 'Recovery 🚶‍♂️'
    }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p.id);
    const converted = convertKmhToUnit(p.speedKmh, speedUnit);
    setSpeedValue(converted);
    setIncline(p.incline);
    setDuration(p.duration);
  };

  const handleAddToSchedule = () => {
    // Look for treadmill exercise in directory or create plan item
    const treadmillEx = exercises.find(e => e.id.includes('treadmill')) || {
      id: 'treadmill-incline-walk-run',
      nameEn: 'Treadmill Incline Run & Walk',
      nameAr: 'تمرين الركض والمشي على السير الكهربائي',
      category: 'cardio' as const,
      primaryMuscleEn: 'Cardiovascular & Legs',
      primaryMuscleAr: 'لياقة القلب وعضلات الأرجل',
      secondaryMusclesEn: ['Calves', 'Glutes', 'Core'],
      secondaryMusclesAr: ['السمانة', 'المؤخرة', 'الجذع'],
      equipment: 'machine' as const,
      difficulty: 'beginner' as const,
      imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80',
      defaultSets: 1,
      defaultReps: `${duration} mins`,
      defaultRestSec: 0,
      instructionsEn: ['Maintain upright posture', 'Set speed and incline safely'],
      instructionsAr: ['حافظ على استقامة الظهر والنظر للأمام', 'اضبط السرعة والانحدار بالتدريج'],
      tipsEn: ['Incline protects knee joints compared to flat pavement.'],
      tipsAr: ['الميلان يحمي مفاصل الركبة ويزيد حرق السعرات بشكل هائل.']
    };

    const notes = language === 'ar'
      ? `السرعة: ${results.speedKmh} كم/س | الانحدار: %${incline} | المدة: ${duration} دقيقة | الحرق المقدر: ${results.totalCalories} سعرة`
      : `Speed: ${results.speedKmh} km/h | Incline: ${incline}% | Duration: ${duration} min | Est. Burn: ${results.totalCalories} kcal`;

    addExerciseToDay(
      targetDay,
      treadmillEx as Exercise,
      1,
      `${duration} min`,
      0,
      0,
      notes
    );

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2200);
  };

  const daysList: { key: DayOfWeek; label: string }[] = [
    { key: 'sat', label: t('sat') },
    { key: 'sun', label: t('sun') },
    { key: 'mon', label: t('mon') },
    { key: 'tue', label: t('tue') },
    { key: 'wed', label: t('wed') },
    { key: 'thu', label: t('thu') },
    { key: 'fri', label: t('fri') }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white">
                  {language === 'ar' ? 'حاسبة الركض على السير الكهربائي' : 'Treadmill Speed & Incline Engine'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  ACSM Certified
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {language === 'ar' 
                  ? 'حساب السعرات الدقيقة بنسبة الانحدار والسرعة بناءً على وزنك (' + profile.weightKg + ' كجم)'
                  : 'Precision metabolic equations calibrated for weight (' + profile.weightKg + ' kg)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-zinc-200">
          
          {/* Quick Presets Carousel */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'أنظمة وتحديات السير الجاهزة:' : 'Popular Cardio Presets:'}</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                    selectedPreset === preset.id
                      ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500/40'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold truncate">
                      {language === 'ar' ? preset.titleAr : preset.titleEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-zinc-400 font-mono">
                    <span>{preset.speedKmh} km/h</span>
                    <span>•</span>
                    <span className="text-emerald-400">%{preset.incline}</span>
                    <span>•</span>
                    <span>{preset.duration}m</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Treadmill Control Deck */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. SPEED SELECTOR */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ar' ? 'السرعة' : 'Speed'}</span>
                </label>
                
                {/* Unit Switcher */}
                <select
                  value={speedUnit}
                  onChange={(e) => handleUnitChange(e.target.value as SpeedUnit)}
                  className="bg-zinc-900 border border-zinc-750 text-zinc-300 text-[11px] font-bold rounded-lg px-2 py-1 focus:outline-none"
                >
                  <option value="kmh">km/h (كم/س)</option>
                  <option value="mph">mph (ميل/س)</option>
                  <option value="pace_km">min/km (معدل كم)</option>
                  <option value="pace_mi">min/mi (معدل ميل)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step={speedUnit.startsWith('pace') ? '0.1' : '0.2'}
                  min={speedUnit.startsWith('pace') ? '2' : '1'}
                  max={speedUnit.startsWith('pace') ? '20' : '25'}
                  value={speedValue}
                  onChange={(e) => {
                    setSelectedPreset(null);
                    setSpeedValue(parseFloat(e.target.value) || 0);
                  }}
                  className="flex-1 bg-zinc-900 border border-zinc-700 text-white font-extrabold text-xl rounded-xl px-3.5 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-xs font-mono font-bold text-zinc-400">
                  {speedUnit === 'kmh' ? 'KM/H' : speedUnit === 'mph' ? 'MPH' : 'MIN'}
                </span>
              </div>

              {/* Quick speed buttons */}
              <div className="flex items-center gap-1.5 pt-1">
                {[4.0, 6.0, 8.5, 11.0].map((kmh) => {
                  const val = convertKmhToUnit(kmh, speedUnit);
                  return (
                    <button
                      key={kmh}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(null);
                        setSpeedValue(val);
                      }}
                      className={`flex-1 py-1 rounded-lg border text-[11px] font-mono font-bold transition-colors ${
                        Math.abs(speedValue - val) < 0.1
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {kmh}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. INCLINE SELECTOR */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  <span>{language === 'ar' ? 'الانحدار / الميلان' : 'Incline (Grade)'}</span>
                </label>
                <span className="text-xs font-extrabold text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded-md border border-sky-800/40 font-mono">
                  {incline}%
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={incline}
                  onChange={(e) => {
                    setSelectedPreset(null);
                    setIncline(parseFloat(e.target.value));
                  }}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />

                {/* Quick incline stepped pills */}
                <div className="flex items-center gap-1">
                  {[0, 3, 6, 10, 12, 15].map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(null);
                        setIncline(inc);
                      }}
                      className={`flex-1 py-1 rounded-lg border text-[10px] font-mono font-bold transition-colors ${
                        incline === inc
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {inc}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Slope Visualization Diagram */}
              <div className="h-4 bg-zinc-900 rounded-lg overflow-hidden relative flex items-center px-2">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-sky-500/30 transition-all origin-left duration-300"
                  style={{
                    height: `${Math.max(15, (incline / 15) * 100)}%`,
                    transform: `skewY(-${incline * 0.8}deg)`
                  }}
                />
                <span className="relative z-10 text-[9px] text-zinc-400 font-mono">
                  {incline === 0 ? (language === 'ar' ? 'مستوى مسطح' : 'Flat level') : `${incline}% Slope Elevation`}
                </span>
              </div>
            </div>

            {/* 3. DURATION SELECTOR */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'مدة الجلسة' : 'Duration'}</span>
                </label>
                <span className="text-xs font-extrabold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-800/40 font-mono">
                  {duration} {language === 'ar' ? 'دقيقة' : 'min'}
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={duration}
                  onChange={(e) => {
                    setSelectedPreset(null);
                    setDuration(parseInt(e.target.value));
                  }}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                {/* Quick duration buttons */}
                <div className="flex items-center gap-1">
                  {[15, 20, 30, 45, 60].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(null);
                        setDuration(d);
                      }}
                      className={`flex-1 py-1 rounded-lg border text-[10px] font-mono font-bold transition-colors ${
                        duration === d
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Calorie Output & Impact Cards */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/30 space-y-4 shadow-xl">
            
            {/* Top Stat Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    {language === 'ar' ? 'إجمالي السعرات المحروقة بدقة' : 'Total Net Calorie Burn'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 tracking-tight">
                    {results.totalCalories}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400">kcal (سعرة حرارية)</span>
                </div>
              </div>

              {/* Incline Boost Highlight Badge */}
              {results.inclineBoostPercent > 0 && (
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-300">
                  <Zap className="w-5 h-5 text-sky-400 shrink-0" />
                  <div className="text-left rtl:text-right">
                    <span className="text-xs font-black block text-sky-300">
                      +{results.inclineBoostPercent}% {language === 'ar' ? 'زيادة حرق بسبب الانحدار' : 'Incline Calorie Boost'}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {language === 'ar' ? 'مقارنة بالمشي على سطح مستوٍ' : 'vs flat level treadmill'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              
              <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'معدل الحرق بالدقيقة' : 'Burn Rate'}</span>
                <span className="text-lg font-black text-zinc-100">{results.caloriesPerMinute}</span>
                <span className="text-[10px] text-zinc-500 block">kcal / min</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'المسافة المقطوعة' : 'Distance'}</span>
                <span className="text-lg font-black text-sky-400">{results.distanceKm}</span>
                <span className="text-[10px] text-zinc-500 block">KM ({results.distanceMiles} mi)</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'الخطوات التقديرية' : 'Est. Steps'}</span>
                <span className="text-lg font-black text-amber-400">{results.estimatedSteps.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-500 block">steps</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'معامل الأيض (MET)' : 'MET Score'}</span>
                <span className="text-lg font-black text-purple-400">{results.met}</span>
                <span className="text-[10px] text-zinc-500 block">VO2: {results.vo2}</span>
              </div>

            </div>

            {/* Energy equivalency info */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === 'ar' 
                    ? `يعادل حرق ${Math.round(results.totalCalories / (profile.weightKg * 7.7))} جرام دهون صافية تقريباً.`
                    : `Burns approx ${Math.round(results.totalCalories / (profile.weightKg * 7.7))}g of net fat tissue equivalent.`}
                </span>
              </span>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  setIsProfileModalOpen(true);
                }}
                className="text-[11px] font-bold text-emerald-400 hover:underline"
              >
                {language === 'ar' ? 'تعديل وزنك (' + profile.weightKg + ' كجم)' : 'Adjust Body Weight'}
              </button>
            </div>

          </div>

          {/* Add to Weekly Planner Action */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ar' ? 'إضافة حصة السير هذه إلى جدولك الأسبوعي:' : 'Add this Cardio Session to Weekly Schedule:'}</span>
              </span>

              <select
                value={targetDay}
                onChange={(e) => setTargetDay(e.target.value as DayOfWeek)}
                className="bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none"
              >
                {daysList.map(d => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToSchedule}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                addedNotice
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('savedSuccess')}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>
                    {language === 'ar' 
                      ? `إضافة تمرين السير (${results.totalCalories} سعرة) ليوم ${daysList.find(d => d.key === targetDay)?.label}`
                      : `Add Treadmill (${results.totalCalories} kcal) to ${daysList.find(d => d.key === targetDay)?.label}`}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
};
