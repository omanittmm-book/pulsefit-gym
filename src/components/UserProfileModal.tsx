import React, { useState } from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  User, 
  Flame, 
  Activity, 
  Scale, 
  Ruler, 
  Calendar, 
  Check, 
  Info, 
  Zap, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ActivityLevel, Gender } from '../types/profile';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile, bmr, tdee, bmiData } = useUserProfile();
  const { language, t } = useLanguage();

  const [weight, setWeight] = useState<number>(profile.weightKg);
  const [height, setHeight] = useState<number>(profile.heightCm);
  const [age, setAge] = useState<number>(profile.age);
  const [gender, setGender] = useState<Gender>(profile.gender);
  const [activity, setActivity] = useState<ActivityLevel>(profile.activityLevel);
  const [unit, setUnit] = useState<'kg' | 'lbs'>(profile.weightUnit);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Convert weight for display if lbs
  const displayWeight = unit === 'lbs' ? Math.round(weight * 2.20462) : weight;

  const handleWeightChange = (newVal: number) => {
    if (unit === 'lbs') {
      setWeight(Number((newVal / 2.20462).toFixed(1)));
    } else {
      setWeight(newVal);
    }
  };

  const handleSave = () => {
    updateProfile({
      weightKg: Math.max(30, Math.min(250, weight)),
      heightCm: Math.max(100, Math.min(240, height)),
      age: Math.max(12, Math.min(100, age)),
      gender,
      activityLevel: activity,
      weightUnit: unit
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const activityOptions: { id: ActivityLevel; labelAr: string; labelEn: string; descAr: string; descEn: string }[] = [
    {
      id: 'sedentary',
      labelAr: 'نشاط خفيف / مكتبي',
      labelEn: 'Sedentary',
      descAr: 'قليل الحركة أو عمل مكتبي بدون تمارين منتظمة',
      descEn: 'Little to no exercise, desk work'
    },
    {
      id: 'moderate',
      labelAr: 'نشاط متوسط (3-4 أيام)',
      labelEn: 'Moderate Activity',
      descAr: 'تمارين معتدلة في الجيم 3 إلى 5 أيام أسبوعياً',
      descEn: 'Moderate exercise 3-5 days/week'
    },
    {
      id: 'active',
      labelAr: 'نشاط عالي (5-6 أيام)',
      labelEn: 'Very Active',
      descAr: 'تمارين مكثفة ورفع أوزان متكرر أسبوعياً',
      descEn: 'Hard exercise 5-6 days/week'
    },
    {
      id: 'athlete',
      labelAr: 'رياضي محترف / تمارين مكثفة',
      labelEn: 'Athlete / High Intensity',
      descAr: 'تمارين بدنية شاقة يومياً أو رياضات احترافية',
      descEn: 'Daily intense training & athletic workouts'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="relative p-5 sm:p-6 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {language === 'ar' ? 'الملف البدني وحساب السعرات الدقيقة' : 'Body Profile & Calorie Engine'}
              </h2>
              <p className="text-xs text-zinc-400">
                {language === 'ar' 
                  ? 'يتم حساب السعرات المحروقة في كل تمرين بدقة وفقاً لقياساتك' 
                  : 'Calibrated calorie burn equations based on your specific biometrics'}
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

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-zinc-200">
          
          {/* Biometrics Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* WEIGHT INPUT */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ar' ? 'الوزن الحالي' : 'Body Weight'}</span>
                </label>
                
                {/* Unit Toggle */}
                <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-750 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setUnit('kg')}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      unit === 'kg' ? 'bg-emerald-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    KG (كجم)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('lbs')}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      unit === 'lbs' ? 'bg-emerald-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    LBS (باوند)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="30"
                  max="300"
                  step="0.5"
                  value={displayWeight}
                  onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 text-white font-extrabold text-lg rounded-xl px-3.5 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-xs font-bold text-zinc-400 px-1">{unit.toUpperCase()}</span>
              </div>

              {/* Quick Steppers */}
              <div className="flex items-center gap-1.5 pt-1">
                {[-5, -1, 1, 5].map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => {
                      const newW = unit === 'lbs' ? weight + (delta / 2.20462) : weight + delta;
                      setWeight(Math.max(30, Math.min(250, Number(newW.toFixed(1)))));
                    }}
                    className="flex-1 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono font-bold text-zinc-300 transition-colors"
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </button>
                ))}
              </div>
            </div>

            {/* HEIGHT INPUT */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-sky-400" />
                  <span>{language === 'ar' ? 'الطول' : 'Height'}</span>
                </label>
                <span className="text-[11px] font-mono text-zinc-400">
                  {Math.floor(height / 30.48)}&apos; {Math.round((height % 30.48) / 2.54)}&quot;
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="100"
                  max="230"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 170)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 text-white font-extrabold text-lg rounded-xl px-3.5 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-xs font-bold text-zinc-400 px-1">{language === 'ar' ? 'سم (cm)' : 'CM'}</span>
              </div>

              {/* Height Steppers */}
              <div className="flex items-center gap-1.5 pt-1">
                {[-5, -1, 1, 5].map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => setHeight(prev => Math.max(100, Math.min(230, prev + delta)))}
                    className="flex-1 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono font-bold text-zinc-300 transition-colors"
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </button>
                ))}
              </div>
            </div>

            {/* AGE INPUT */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'العمر (سنة)' : 'Age (Years)'}</span>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 text-white font-extrabold text-lg rounded-xl px-3.5 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-xs font-bold text-zinc-400 px-1">{language === 'ar' ? 'سنة' : 'Yrs'}</span>
              </div>

              {/* Age Steppers */}
              <div className="flex items-center gap-1.5 pt-1">
                {[-5, -1, 1, 5].map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => setAge(prev => Math.max(14, Math.min(90, prev + delta)))}
                    className="flex-1 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono font-bold text-zinc-300 transition-colors"
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </button>
                ))}
              </div>
            </div>

            {/* GENDER SELECTOR */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-purple-400" />
                <span>{language === 'ar' ? 'النوع / الجنس' : 'Biological Gender'}</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    gender === 'male'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <span>👨</span>
                  <span>{language === 'ar' ? 'ذكر' : 'Male'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    gender === 'female'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <span>👩</span>
                  <span>{language === 'ar' ? 'أنثى' : 'Female'}</span>
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">
                {language === 'ar' ? '* ضروري لمعادلة ميفلين لحساب معدل الأيض (BMR).' : '* Required for accurate Mifflin-St Jeor metabolic BMR calculation.'}
              </p>
            </div>

          </div>

          {/* Activity Level Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>{language === 'ar' ? 'مستوى النشاط اليومي والتمارين' : 'Daily Activity & Training Level'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activityOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActivity(opt.id)}
                  className={`p-3 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                    activity === opt.id
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${activity === opt.id ? 'text-emerald-400' : 'text-zinc-200'}`}>
                      {language === 'ar' ? opt.labelAr : opt.labelEn}
                    </span>
                    {activity === opt.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                    {language === 'ar' ? opt.descAr : opt.descEn}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Live Biometric Summary Cards */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'مؤشراتك الحيوية ومعدلات الحرق' : 'Calculated Metabolic Engine'}</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'مؤشر كتلة الجسم (BMI)' : 'BMI'}</span>
                <span className="text-base font-extrabold text-zinc-100">{bmiData.bmi}</span>
                <span className={`text-[9px] block font-semibold truncate mt-0.5 ${bmiData.color}`}>
                  {language === 'ar' ? bmiData.categoryAr : bmiData.categoryEn}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'الأيض الأساسي (BMR)' : 'BMR Base'}</span>
                <span className="text-base font-extrabold text-emerald-400">{bmr}</span>
                <span className="text-[9px] text-zinc-500 block mt-0.5">kcal / day</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">{language === 'ar' ? 'احتياج الحفاظ (TDEE)' : 'TDEE Maintenance'}</span>
                <span className="text-base font-extrabold text-amber-400">{tdee}</span>
                <span className="text-[9px] text-zinc-500 block mt-0.5">kcal / day</span>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 text-[11px] text-zinc-400">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {language === 'ar' 
                  ? 'بناءً على وزنك (' + weight + ' كجم)، يتم حساب السعرات المحروقة في كل تمرين بدقة MET العلمية، وتحديث السعرات في السير الكهربائي والجداول الأسبوعية تلقائياً.'
                  : 'Based on your weight (' + weight + ' kg), exact calorie expenditure is computed for all lifts and treadmill inclines.'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all cursor-pointer"
          >
            {t('close')}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              savedSuccess
                ? 'bg-emerald-500 text-zinc-950'
                : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-md shadow-emerald-500/20 active:scale-95'
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'ar' ? 'تم الحفظ وتحديث الحسابات!' : 'Updated Successfully!'}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'ar' ? 'حفظ وتطبيق على كافة التمارين' : 'Save & Recalibrate All Exercises'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
