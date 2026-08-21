import { WorkoutTemplate } from '../types/fitness';

export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'ppl-split',
    nameEn: 'Push / Pull / Legs (PPL) 6-Day Split',
    nameAr: 'نظام دفع / سحب / أرجل (PPL)',
    descriptionEn: 'The gold standard bodybuilding routine. Hits each muscle twice weekly with optimal recovery.',
    descriptionAr: 'النظام الذهبي الأكثر شهرة عالمياً لبناء العضلات وتوزيع الحجم التدريبي مرتين أسبوعياً لكل عضلة.',
    difficulty: 'intermediate',
    daysPerWeek: 6,
    tags: ['Hypertrophy', 'Strength', '6 Days'],
    schedule: {
      sat: {
        isRestDay: false,
        splitTitleEn: 'Push Day A (Chest, Shoulders, Triceps)',
        splitTitleAr: 'يوم الدفع أ (صدر، أكتاف، ترايسبس)',
        exerciseIds: [
          { exerciseId: 'bench-press-barbell', sets: 4, reps: '8-10', restSec: 90 },
          { exerciseId: 'overhead-barbell-press', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'lateral-dumbbell-raises', sets: 4, reps: '12-15', restSec: 60 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, reps: '12-15', restSec: 60 }
        ]
      },
      sun: {
        isRestDay: false,
        splitTitleEn: 'Pull Day A (Back, Rear Delts, Biceps)',
        splitTitleAr: 'يوم السحب أ (ظهر، كتف خلفي، بايسبس)',
        exerciseIds: [
          { exerciseId: 'deadlift-conventional', sets: 3, reps: '5-6', restSec: 120 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'bent-over-barbell-row', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'rear-delt-face-pulls', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 }
        ]
      },
      mon: {
        isRestDay: false,
        splitTitleEn: 'Legs Day A (Quads, Hamstrings, Calves, Abs)',
        splitTitleAr: 'يوم الأرجل أ (فخذ أمامي، خلفيات، سمانة، بطن)',
        exerciseIds: [
          { exerciseId: 'barbell-back-squat', sets: 4, reps: '6-8', restSec: 120 },
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'leg-press-machine', sets: 3, reps: '10-12', restSec: 90 },
          { exerciseId: 'standing-calf-raises', sets: 4, reps: '15-20', restSec: 45 },
          { exerciseId: 'hanging-leg-raises', sets: 3, reps: '12-15', restSec: 60 }
        ]
      },
      tue: {
        isRestDay: false,
        splitTitleEn: 'Push Day B (Hypertrophy & Pump)',
        splitTitleAr: 'يوم الدفع ب (ضخامة وتركيز عالي)',
        exerciseIds: [
          { exerciseId: 'incline-dumbbell-press', sets: 4, reps: '8-10', restSec: 75 },
          { exerciseId: 'arnold-press-dumbbell', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'cable-chest-flyes', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'chest-dips', sets: 3, reps: '8-12', restSec: 90 },
          { exerciseId: 'skull-crushers-ez-bar', sets: 3, reps: '10-12', restSec: 75 }
        ]
      },
      wed: {
        isRestDay: false,
        splitTitleEn: 'Pull Day B (Width & Detail)',
        splitTitleAr: 'يوم السحب ب (عراضة الظهر وتفاصيل الباي)',
        exerciseIds: [
          { exerciseId: 'seated-cable-row', sets: 4, reps: '10-12', restSec: 75 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'rear-delt-face-pulls', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'incline-dumbbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'hammer-curls-dumbbell', sets: 3, reps: '10-12', restSec: 60 }
        ]
      },
      thu: {
        isRestDay: false,
        splitTitleEn: 'Legs Day B (Focus & Core)',
        splitTitleAr: 'يوم الأرجل ب (عزل وتركيز وبطن)',
        exerciseIds: [
          { exerciseId: 'leg-press-machine', sets: 4, reps: '10-12', restSec: 90 },
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'leg-extension-machine', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'standing-calf-raises', sets: 3, reps: '15-20', restSec: 45 },
          { exerciseId: 'cable-kneeling-crunch', sets: 3, reps: '15-20', restSec: 60 }
        ]
      },
      fri: {
        isRestDay: true,
        splitTitleEn: 'Full Recovery & Rest Day',
        splitTitleAr: 'يوم راحة واستشفاء عضلي كامل',
        exerciseIds: []
      }
    }
  },
  {
    id: 'upper-lower-4day',
    nameEn: 'Upper / Lower Split (4-Day Routine)',
    nameAr: 'نظام علوي / سفلي (4 أيام أسبوعياً)',
    descriptionEn: 'Perfect balance of high frequency, recovery, and time efficiency for busy athletes.',
    descriptionAr: 'التوازن المثالي بين كفاءة الوقت والاستشفاء، مناسب للمشغولين وأصحاب الأهداف المتوازنة.',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    tags: ['Balanced', 'Strength', '4 Days'],
    schedule: {
      sat: {
        isRestDay: false,
        splitTitleEn: 'Upper Body A (Power & Heavy)',
        splitTitleAr: 'الجزء العلوي أ (قوة وأوزان أساسية)',
        exerciseIds: [
          { exerciseId: 'bench-press-barbell', sets: 4, reps: '6-8', restSec: 90 },
          { exerciseId: 'bent-over-barbell-row', sets: 4, reps: '6-8', restSec: 90 },
          { exerciseId: 'overhead-barbell-press', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, reps: '10-12', restSec: 60 }
        ]
      },
      sun: {
        isRestDay: false,
        splitTitleEn: 'Lower Body A (Squat & Hamstrings)',
        splitTitleAr: 'الجزء السفلي أ (سكوات وفخذ خلفي)',
        exerciseIds: [
          { exerciseId: 'barbell-back-squat', sets: 4, reps: '6-8', restSec: 120 },
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'leg-extension-machine', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'standing-calf-raises', sets: 4, reps: '15-20', restSec: 45 },
          { exerciseId: 'plank-hold', sets: 3, reps: '45-60s', restSec: 45 }
        ]
      },
      mon: {
        isRestDay: true,
        splitTitleEn: 'Rest & Mobility Day',
        splitTitleAr: 'راحة واستطالات',
        exerciseIds: []
      },
      tue: {
        isRestDay: false,
        splitTitleEn: 'Upper Body B (Hypertrophy & Pump)',
        splitTitleAr: 'الجزء العلوي ب (ضخامة ونحت)',
        exerciseIds: [
          { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'lat-pulldown', sets: 4, reps: '10-12', restSec: 75 },
          { exerciseId: 'lateral-dumbbell-raises', sets: 4, reps: '12-15', restSec: 60 },
          { exerciseId: 'cable-chest-flyes', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'incline-dumbbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'skull-crushers-ez-bar', sets: 3, reps: '10-12', restSec: 60 }
        ]
      },
      wed: {
        isRestDay: false,
        splitTitleEn: 'Lower Body B & Core',
        splitTitleAr: 'الجزء السفلي ب والبطن',
        exerciseIds: [
          { exerciseId: 'deadlift-conventional', sets: 3, reps: '5-6', restSec: 120 },
          { exerciseId: 'leg-press-machine', sets: 3, reps: '10-12', restSec: 90 },
          { exerciseId: 'standing-calf-raises', sets: 3, reps: '15-20', restSec: 45 },
          { exerciseId: 'hanging-leg-raises', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'cable-woodchoppers', sets: 3, reps: '12-15', restSec: 45 }
        ]
      },
      thu: {
        isRestDay: true,
        splitTitleEn: 'Rest Day / Light Cardio',
        splitTitleAr: 'راحة أو كارديو خفيف',
        exerciseIds: []
      },
      fri: {
        isRestDay: true,
        splitTitleEn: 'Rest & Recovery Day',
        splitTitleAr: 'راحة نهاية الأسبوع',
        exerciseIds: []
      }
    }
  },
  {
    id: 'full-body-3day',
    nameEn: 'Full Body 3-Day Beginner/Intermediate',
    nameAr: 'نظام الجسم كامل 3 أيام أسبوعياً',
    descriptionEn: 'Maximum results with 3 intense total-body sessions per week. Ideal for beginners and overall fitness.',
    descriptionAr: 'أفضل جدول لبداية قوية وبناء أساس عضلي متين بـ 3 أيام تمرين أسبوعياً مع راحة يوم بعد يوم.',
    difficulty: 'beginner',
    daysPerWeek: 3,
    tags: ['Full Body', 'Beginners', '3 Days'],
    schedule: {
      sat: {
        isRestDay: false,
        splitTitleEn: 'Full Body Session 1',
        splitTitleAr: 'تمرين الجسم كامل - الحصة الأولى',
        exerciseIds: [
          { exerciseId: 'barbell-back-squat', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'bench-press-barbell', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'overhead-barbell-press', sets: 3, reps: '8-10', restSec: 75 },
          { exerciseId: 'hanging-leg-raises', sets: 3, reps: '12-15', restSec: 60 }
        ]
      },
      sun: {
        isRestDay: true,
        splitTitleEn: 'Rest Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      },
      mon: {
        isRestDay: false,
        splitTitleEn: 'Full Body Session 2',
        splitTitleAr: 'تمرين الجسم كامل - الحصة الثانية',
        exerciseIds: [
          { exerciseId: 'deadlift-conventional', sets: 3, reps: '6-8', restSec: 120 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'seated-cable-row', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'lateral-dumbbell-raises', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'plank-hold', sets: 3, reps: '60s', restSec: 45 }
        ]
      },
      tue: {
        isRestDay: true,
        splitTitleEn: 'Rest Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      },
      wed: {
        isRestDay: false,
        splitTitleEn: 'Full Body Session 3',
        splitTitleAr: 'تمرين الجسم كامل - الحصة الثالثة',
        exerciseIds: [
          { exerciseId: 'leg-press-machine', sets: 3, reps: '10-12', restSec: 90 },
          { exerciseId: 'chest-dips', sets: 3, reps: '8-12', restSec: 90 },
          { exerciseId: 'bent-over-barbell-row', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, reps: '12-15', restSec: 60 }
        ]
      },
      thu: {
        isRestDay: true,
        splitTitleEn: 'Rest Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      },
      fri: {
        isRestDay: true,
        splitTitleEn: 'Rest Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      }
    }
  },
  {
    id: 'bro-split-5day',
    nameEn: 'Classic 5-Day Split (Single Muscle Daily)',
    nameAr: 'الجدول الكلاسيكي (عضلة واحدة يومياً)',
    descriptionEn: 'High volume pump focused split targeting one major muscle group per day.',
    descriptionAr: 'الجدول الكلاسيكي القديم لضخ الدم وتركيز عالي جداً على عضلة واحدة في كل يوم تدريبي.',
    difficulty: 'intermediate',
    daysPerWeek: 5,
    tags: ['Classic', 'Pump', '5 Days'],
    schedule: {
      sat: {
        isRestDay: false,
        splitTitleEn: 'Chest Blast',
        splitTitleAr: 'يوم الصدر المدمر',
        exerciseIds: [
          { exerciseId: 'bench-press-barbell', sets: 4, reps: '8-10', restSec: 90 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'cable-chest-flyes', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'chest-dips', sets: 3, reps: '8-12', restSec: 90 }
        ]
      },
      sun: {
        isRestDay: false,
        splitTitleEn: 'Back Thickness & Width',
        splitTitleAr: 'يوم الظهر واللاتس',
        exerciseIds: [
          { exerciseId: 'deadlift-conventional', sets: 4, reps: '5-6', restSec: 120 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'bent-over-barbell-row', sets: 3, reps: '8-10', restSec: 90 },
          { exerciseId: 'seated-cable-row', sets: 3, reps: '10-12', restSec: 60 }
        ]
      },
      mon: {
        isRestDay: false,
        splitTitleEn: 'Boulder Shoulders & Traps',
        splitTitleAr: 'يوم الأكتاف والترابيس',
        exerciseIds: [
          { exerciseId: 'overhead-barbell-press', sets: 4, reps: '8-10', restSec: 90 },
          { exerciseId: 'lateral-dumbbell-raises', sets: 4, reps: '12-15', restSec: 60 },
          { exerciseId: 'arnold-press-dumbbell', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'rear-delt-face-pulls', sets: 3, reps: '12-15', restSec: 60 }
        ]
      },
      tue: {
        isRestDay: false,
        splitTitleEn: 'Legs Day & Calves',
        splitTitleAr: 'يوم الأرجل والسمانة',
        exerciseIds: [
          { exerciseId: 'barbell-back-squat', sets: 4, reps: '6-8', restSec: 120 },
          { exerciseId: 'leg-press-machine', sets: 3, reps: '10-12', restSec: 90 },
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'leg-extension-machine', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'standing-calf-raises', sets: 4, reps: '15-20', restSec: 45 }
        ]
      },
      wed: {
        isRestDay: false,
        splitTitleEn: 'Arms & Abs Domination',
        splitTitleAr: 'يوم الذراعين (باي وتراي) والبطن',
        exerciseIds: [
          { exerciseId: 'barbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, reps: '12-15', restSec: 60 },
          { exerciseId: 'incline-dumbbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'skull-crushers-ez-bar', sets: 3, reps: '10-12', restSec: 60 },
          { exerciseId: 'hanging-leg-raises', sets: 3, reps: '12-15', restSec: 60 }
        ]
      },
      thu: {
        isRestDay: true,
        splitTitleEn: 'Rest & Recovery Day',
        splitTitleAr: 'يوم راحة واستشفاء',
        exerciseIds: []
      },
      fri: {
        isRestDay: true,
        splitTitleEn: 'Rest & Family Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      }
    }
  },
  {
    id: 'arnold-split-6day',
    nameEn: 'Arnold Schwarzenegger Classic Split (6-Day)',
    nameAr: 'نظام أرنولد شوارزنيجر الكلاسيكي (6 أيام)',
    descriptionEn: 'Antagonistic superset friendly split: Chest & Back, Shoulders & Arms, and Legs. The favorite of the Golden Era.',
    descriptionAr: 'النظام الأسطوري للعصر الذهبي: صدر وظهر معاً في يوم واحد، أكتاف وذراعين، ثم أرجل، بتكرار مرتين أسبوعياً لضخامة خرافية.',
    difficulty: 'advanced',
    daysPerWeek: 6,
    tags: ['Golden Era', 'Hypertrophy', '6 Days'],
    schedule: {
      sat: {
        isRestDay: false,
        splitTitleEn: 'Chest & Back (Antagonist Hypertrophy)',
        splitTitleAr: 'صدر وظهر (عضلات متقابلة)',
        targetMuscles: ['chest', 'back'],
        exerciseIds: [
          { exerciseId: 'bench-press-barbell', sets: 4, reps: '8-10', restSec: 90, targetWeightKg: 70 },
          { exerciseId: 'bent-over-barbell-row', sets: 4, reps: '8-10', restSec: 90, targetWeightKg: 60 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '10-12', restSec: 75, targetWeightKg: 24 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: '10-12', restSec: 75, targetWeightKg: 55 },
          { exerciseId: 'cable-chest-flyes', sets: 3, reps: '12-15', restSec: 60, targetWeightKg: 15 }
        ]
      },
      sun: {
        isRestDay: false,
        splitTitleEn: 'Shoulders & Arms (Biceps/Triceps Blast)',
        splitTitleAr: 'أكتاف وذراعين (باي، تراي، وترابيس)',
        targetMuscles: ['shoulders', 'arms'],
        exerciseIds: [
          { exerciseId: 'overhead-barbell-press', sets: 4, reps: '8-10', restSec: 90, targetWeightKg: 45 },
          { exerciseId: 'lateral-dumbbell-raises', sets: 4, reps: '12-15', restSec: 60, targetWeightKg: 10 },
          { exerciseId: 'barbell-bicep-curl', sets: 4, reps: '10-12', restSec: 60, targetWeightKg: 30 },
          { exerciseId: 'skull-crushers-ez-bar', sets: 4, reps: '10-12', restSec: 60, targetWeightKg: 25 },
          { exerciseId: 'hammer-curls-dumbbell', sets: 3, reps: '12-15', restSec: 60, targetWeightKg: 14 }
        ]
      },
      mon: {
        isRestDay: false,
        splitTitleEn: 'Legs & Lower Abs',
        splitTitleAr: 'أرجل وبطن سفلي',
        targetMuscles: ['legs', 'core'],
        exerciseIds: [
          { exerciseId: 'barbell-back-squat', sets: 4, reps: '6-8', restSec: 120, targetWeightKg: 85 },
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 3, reps: '10-12', restSec: 90, targetWeightKg: 28 },
          { exerciseId: 'leg-press-machine', sets: 4, reps: '10-12', restSec: 90, targetWeightKg: 160 },
          { exerciseId: 'standing-calf-raises', sets: 4, reps: '15-20', restSec: 45, targetWeightKg: 50 },
          { exerciseId: 'hanging-leg-raises', sets: 3, reps: '15', restSec: 45 }
        ]
      },
      tue: {
        isRestDay: false,
        splitTitleEn: 'Chest & Back II',
        splitTitleAr: 'صدر وظهر (الحصة الثانية)',
        targetMuscles: ['chest', 'back'],
        exerciseIds: [
          { exerciseId: 'incline-dumbbell-press', sets: 4, reps: '8-10', restSec: 75, targetWeightKg: 26 },
          { exerciseId: 'seated-cable-row', sets: 4, reps: '10-12', restSec: 75, targetWeightKg: 60 },
          { exerciseId: 'chest-dips', sets: 3, reps: '10-12', restSec: 75 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: '10-12', restSec: 60, targetWeightKg: 55 }
        ]
      },
      wed: {
        isRestDay: false,
        splitTitleEn: 'Shoulders & Arms II',
        splitTitleAr: 'أكتاف وذراعين (الحصة الثانية)',
        targetMuscles: ['shoulders', 'arms'],
        exerciseIds: [
          { exerciseId: 'arnold-press-dumbbell', sets: 4, reps: '10-12', restSec: 75, targetWeightKg: 18 },
          { exerciseId: 'rear-delt-face-pulls', sets: 4, reps: '12-15', restSec: 60, targetWeightKg: 25 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, reps: '12-15', restSec: 60, targetWeightKg: 25 },
          { exerciseId: 'incline-dumbbell-bicep-curl', sets: 3, reps: '10-12', restSec: 60, targetWeightKg: 12 }
        ]
      },
      thu: {
        isRestDay: false,
        splitTitleEn: 'Legs & Calves II',
        splitTitleAr: 'أرجل وسمانة (الحصة الثانية)',
        targetMuscles: ['legs', 'core'],
        exerciseIds: [
          { exerciseId: 'deadlift-conventional', sets: 3, reps: '5-6', restSec: 120, targetWeightKg: 100 },
          { exerciseId: 'leg-extension-machine', sets: 3, reps: '12-15', restSec: 60, targetWeightKg: 50 },
          { exerciseId: 'standing-calf-raises', sets: 4, reps: '15-20', restSec: 45, targetWeightKg: 50 },
          { exerciseId: 'cable-kneeling-crunch', sets: 3, reps: '15-20', restSec: 60, targetWeightKg: 35 }
        ]
      },
      fri: {
        isRestDay: true,
        splitTitleEn: 'Complete Recovery Day',
        splitTitleAr: 'يوم راحة كامل',
        exerciseIds: []
      }
    }
  },
  {
    id: 'sculpt-tone-4day',
    nameEn: 'Glute, Core & Upper Sculpt (4-Day Tone)',
    nameAr: 'جدول نحت وتنشيف (أرداف، بطن، وشد الجسم 4 أيام)',
    descriptionEn: 'Focused on glute development, core tightness, posture, and full-body conditioning.',
    descriptionAr: 'برنامج مصمم لتنسيق القوام، تقوية عضلات الجذع والبطن، وعزل عضلات الأرداف والفخذين مع شد الجزء العلوي.',
    difficulty: 'beginner',
    daysPerWeek: 4,
    tags: ['Toning', 'Glutes & Core', '4 Days'],
    schedule: {
      sat: {
        isRestDay: false,
        splitTitleEn: 'Lower Body & Glute Focus',
        splitTitleAr: 'الجزء السفلي والتركيز على الأرداف',
        targetMuscles: ['legs'],
        exerciseIds: [
          { exerciseId: 'barbell-back-squat', sets: 4, reps: '10-12', restSec: 90, targetWeightKg: 40 },
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 4, reps: '10-12', restSec: 75, targetWeightKg: 16 },
          { exerciseId: 'leg-press-machine', sets: 3, reps: '12-15', restSec: 75, targetWeightKg: 80 },
          { exerciseId: 'standing-calf-raises', sets: 3, reps: '20', restSec: 45, targetWeightKg: 30 }
        ]
      },
      sun: {
        isRestDay: false,
        splitTitleEn: 'Upper Body Tone & Posture',
        splitTitleAr: 'شد الجزء العلوي واستقامة الظهر',
        targetMuscles: ['back', 'shoulders', 'chest'],
        exerciseIds: [
          { exerciseId: 'lat-pulldown', sets: 4, reps: '12-15', restSec: 60, targetWeightKg: 35 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '12-15', restSec: 60, targetWeightKg: 12 },
          { exerciseId: 'lateral-dumbbell-raises', sets: 3, reps: '15', restSec: 45, targetWeightKg: 6 },
          { exerciseId: 'rear-delt-face-pulls', sets: 3, reps: '15', restSec: 45, targetWeightKg: 20 }
        ]
      },
      mon: {
        isRestDay: true,
        splitTitleEn: 'Rest & Stretch',
        splitTitleAr: 'راحة واستطالة',
        exerciseIds: []
      },
      tue: {
        isRestDay: false,
        splitTitleEn: 'Hamstrings, Glutes & Calves',
        splitTitleAr: 'فخذ خلفي، أرداف وسمانة',
        targetMuscles: ['legs'],
        exerciseIds: [
          { exerciseId: 'romanian-deadlift-dumbbell', sets: 4, reps: '10-12', restSec: 75, targetWeightKg: 18 },
          { exerciseId: 'leg-extension-machine', sets: 3, reps: '15', restSec: 60, targetWeightKg: 35 },
          { exerciseId: 'standing-calf-raises', sets: 4, reps: '20', restSec: 45, targetWeightKg: 30 }
        ]
      },
      wed: {
        isRestDay: false,
        splitTitleEn: 'Abs, Core & High-Intensity Cardio',
        splitTitleAr: 'نحت عضلات البطن والجذع وكارديو',
        targetMuscles: ['core', 'cardio'],
        exerciseIds: [
          { exerciseId: 'hanging-leg-raises', sets: 3, reps: '15', restSec: 45 },
          { exerciseId: 'plank-hold', sets: 3, reps: '60s', restSec: 45 },
          { exerciseId: 'cable-woodchoppers', sets: 3, reps: '15', restSec: 45, targetWeightKg: 15 },
          { exerciseId: 'cable-kneeling-crunch', sets: 3, reps: '20', restSec: 45, targetWeightKg: 25 }
        ]
      },
      thu: {
        isRestDay: true,
        splitTitleEn: 'Rest Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      },
      fri: {
        isRestDay: true,
        splitTitleEn: 'Rest Day',
        splitTitleAr: 'يوم راحة',
        exerciseIds: []
      }
    }
  }
];
