import { Exercise } from '../types/fitness';

export const EXERCISES_DATA: Exercise[] = [
  // ================= CHEST (الصدر) =================
  {
    id: 'bench-press-barbell',
    nameEn: 'Barbell Flat Bench Press',
    nameAr: 'تمرين بنش برس بالبار مستوي',
    category: 'chest',
    primaryMuscleEn: 'Middle Chest (Pectoralis Major)',
    primaryMuscleAr: 'عضلة الصدر الأوسط',
    secondaryMusclesEn: ['Triceps', 'Anterior Deltoids'],
    secondaryMusclesAr: ['الترايسبس', 'الكتف الأمامي'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 90,
    instructionsEn: [
      'Lie flat on the bench with your eyes under the bar.',
      'Grip the bar slightly wider than shoulder-width with wrists straight.',
      'Unrack the bar and lower it with control to the mid-chest level.',
      'Press the bar explosively back up until your arms are extended, keeping shoulder blades retracted.'
    ],
    instructionsAr: [
      'استلقِ على المقعد المستوي بحيث تكون عيناك أسفل البار مباشرة.',
      'أمسك البار بمسافة أوسع قليلاً من عرض الكتفين مع استقامة المعصمين.',
      'ارفع البار وانزله بتحكم وثبات حتى يلامس منتصف الصدر برفق.',
      'ادفع البار للأعلى بقوة حتى تمتد ذراعاك مع تثبيت لوحي الكتف للخلف.'
    ],
    tipsEn: ['Keep your feet planted firmly on the floor.', 'Do not bounce the bar off your ribcage.'],
    tipsAr: ['ثبّت قدميك جيداً على الأرض لتحقيق أقصى ثبات.', 'تجنب ارتداد البار عن عظام القفص الصدري.'],
    mistakesEn: ['Flaring elbows 90 degrees out (keep them tucked ~45-70 degrees).'],
    mistakesAr: ['فتح الكوعين بزاوية 90 درجة كاملة (اجعلهما بزاوية 45-70 درجة لتفادي إصابة الكتف).']
  },
  {
    id: 'incline-dumbbell-press',
    nameEn: 'Incline Dumbbell Press',
    nameAr: 'تمرين ضغط دمبلز عالي (مائل)',
    category: 'chest',
    primaryMuscleEn: 'Upper Chest (Clavicular Head)',
    primaryMuscleAr: 'الصدر العلوي',
    secondaryMusclesEn: ['Front Shoulders', 'Triceps'],
    secondaryMusclesAr: ['الكتف الأمامي', 'الترايسبس'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    instructionsEn: [
      'Set the bench to a 30-45 degree incline.',
      'Hold a dumbbell in each hand and bring them to shoulder level.',
      'Press dumbbells upwards along a slight arc until arms are extended above chest.',
      'Lower under control to feel a deep stretch in the upper pectorals.'
    ],
    instructionsAr: [
      'اضبط المقعد على زاوية مائلة بين 30 إلى 45 درجة.',
      'احمل الدامبلز عند مستوى الكتفين مع تثبيت ظهرك ومؤخرتك على المقعد.',
      'ادفع الدامبلز للأعلى في مسار قوسي خفيف حتى تمتد الذراعان فوق الصدر العلوي.',
      'انزل ببطء وتحكم للشعور بالتمدد في أعلى الصدر.'
    ],
    tipsEn: ['Avoid setting the bench angle too steep to prevent shifting tension to shoulders.'],
    tipsAr: ['لا تجعل زاوية المقعد حادة جداً لكي لا ينتقل التركيز بالكامل إلى الأكتاف.']
  },
  {
    id: 'cable-chest-flyes',
    nameEn: 'Standing Cable Chest Flyes',
    nameAr: 'تمرين تجميع الصدر بالكيبل (فراشة)',
    category: 'chest',
    primaryMuscleEn: 'Pectoralis Major (Inner & Overall)',
    primaryMuscleAr: 'عضلة الصدر (تجميع وإطالة)',
    secondaryMusclesEn: ['Anterior Deltoid'],
    secondaryMusclesAr: ['الكتف الأمامي'],
    equipment: 'cable',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    instructionsEn: [
      'Position pulleys at chest or shoulder height.',
      'Step forward into a staggered stance with elbows slightly bent.',
      'Bring handles together in front of your chest in a hugging motion.',
      'Squeeze chest hard at peak contraction for 1 second, then return slowly.'
    ],
    instructionsAr: [
      'اضبط بكرات الكيبل عند مستوى الصدر أو الكتف.',
      'تقدّم بخطوة للأمام مع انحناء طفيف في الكوعين.',
      'اسحب المقابض للأمام بحركة احتضان حتى تتقارب أمام منتصف الصدر.',
      'اعصر عضلة الصدر لمدة ثانية في ذروة الحركة ثم ارجع ببطء.'
    ],
    tipsEn: ['Maintain slight bend in elbows throughout the motion; do not turn it into a press.'],
    tipsAr: ['حافظ على ثبات الانحناء البسيط في الكوعين طوال الحركة وتجنب تحويلها لحركة دفع.']
  },
  {
    id: 'chest-dips',
    nameEn: 'Parallel Bar Chest Dips',
    nameAr: 'تمرين المتوازي لأسفل الصدر',
    category: 'chest',
    primaryMuscleEn: 'Lower Chest (Pectoralis Major)',
    primaryMuscleAr: 'الصدر السفلي',
    secondaryMusclesEn: ['Triceps', 'Shoulders'],
    secondaryMusclesAr: ['الترايسبس', 'الكتف الأمامي'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSec: 90,
    instructionsEn: [
      'Mount the parallel bars with arms extended.',
      'Lean your torso forward ~30 degrees and flare elbows slightly.',
      'Lower body until shoulders are below elbows or chest feels stretched.',
      'Push back up using chest power without locking elbows completely.'
    ],
    instructionsAr: [
      'اصعد على جهازي المتوازي مع استقامة الذراعين.',
      'أمِل جذعك للأمام بزاوية تقارب 30 درجة لتركيز الحمل على الصدر.',
      'انزل بجسمك للأسفل حتى تصل الكتف لمستوى الكوع.',
      'ادفع بجسمك للأعلى بقوة الصدر حتى تستقيم الذراعان تقريباً.'
    ],
    tipsEn: ['Leaning forward targets chest, while staying upright targets triceps.'],
    tipsAr: ['الميلان للأمام يستهدف الصدر، بينما الوقوف المستقيم يركز على الترايسبس.']
  },

  // ================= BACK (الظهر) =================
  {
    id: 'deadlift-conventional',
    nameEn: 'Conventional Barbell Deadlift',
    nameAr: 'تمرين الرفعة الميتة (ديدلفت) بالبار',
    category: 'back',
    primaryMuscleEn: 'Erector Spinae & Lats',
    primaryMuscleAr: 'عضلات أسفل الظهر واللاتس',
    secondaryMusclesEn: ['Glutes', 'Hamstrings', 'Traps', 'Forearms'],
    secondaryMusclesAr: ['المؤخرة', 'الفخذ الخلفي', 'الترابيس', 'الساعدين'],
    equipment: 'barbell',
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '5-6',
    defaultRestSec: 120,
    instructionsEn: [
      'Stand with mid-foot under the barbell, feet hip-width apart.',
      'Hinge at hips, grip bar just outside legs with chest up and back flat.',
      'Drive through your heels, pulling bar tight against shins and thighs to lock out.',
      'Hinge hips backward to lower bar smoothly to floor.'
    ],
    instructionsAr: [
      'قف بحيث يكون منتصف قدمك أسفل البار مباشرة، بعرض الوركين.',
      'انحنِ من الورك وأمسك البار خارج مستوى الساقين مع استقامة الظهر ورفع الصدر.',
      'ادفع بقوة الكعبين واسحب البار ملامساً للساقين حتى استقامة الجسم.',
      'أرجع الوركين للخلف لإنزال البار بهدوء إلى الأرض مع الحفاظ على الظهر مستقيماً.'
    ],
    tipsEn: ['Never round your lower back under heavy loads.'],
    tipsAr: ['احذر من تقوس أسفل الظهر أثناء رفع الأوزان الثقيلة.']
  },
  {
    id: 'lat-pulldown',
    nameEn: 'Wide-Grip Lat Pulldown',
    nameAr: 'سحب ظهر عريض على الجهاز (لات بول داون)',
    category: 'back',
    primaryMuscleEn: 'Latissimus Dorsi (Lats)',
    primaryMuscleAr: 'عضلات اللاتس (المجنص)',
    secondaryMusclesEn: ['Biceps', 'Rhomboids', 'Rear Delts'],
    secondaryMusclesAr: ['البايسبس', 'عضلات الظهر الأوسط', 'الكتف الخلفي'],
    equipment: 'cable',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    instructionsEn: [
      'Grip the wide bar with palms facing forward, slightly wider than shoulders.',
      'Sit with thighs anchored securely under pads with chest puffed out.',
      'Pull the bar down smoothly to upper chest while driving elbows down and back.',
      'Slowly extend arms up for a full lat stretch.'
    ],
    instructionsAr: [
      'أمسك بالبار العريض بمسافة أوسع من الكتفين والراحتان للأمام.',
      'اجلس مع تثبيت فخذيك تحت الوسائد وافرد صدرك للأعلى.',
      'اسحب البار لأسفل حتى يلامس أعلى صدرك مع توجيه الكوعين للأسفل والخلف.',
      'اصعد بالبار للأعلى ببطء وتدرج للشعور بالتمدد الكامل في اللاتس.'
    ],
    tipsEn: ['Do not swing your torso excessively back and forth.'],
    tipsAr: ['تجنب الأرجحة الشديدة للجذع للخلف أثناء السحب.']
  },
  {
    id: 'bent-over-barbell-row',
    nameEn: 'Bent-Over Barbell Row',
    nameAr: 'تمرين التجديف بالبار منحنياً (بار رو)',
    category: 'back',
    primaryMuscleEn: 'Middle Back & Lats',
    primaryMuscleAr: 'منتصف الظهر واللاتس والترابيس',
    secondaryMusclesEn: ['Biceps', 'Rear Delts', 'Lower Back'],
    secondaryMusclesAr: ['البايسبس', 'الكتف الخلفي', 'أسفل الظهر'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 90,
    instructionsEn: [
      'Bend forward at waist ~45 degrees with flat back and knees soft.',
      'Grip barbell overhand or underhand at shoulder width.',
      'Pull barbell up to your lower ribcage/navel by retracting shoulder blades.',
      'Lower barbell under control without losing spinal posture.'
    ],
    instructionsAr: [
      'انحنِ بجذعك للأمام بزاوية 45 درجة تقريباً مع ثني خفيف في الركبتين واستقامة الظهر.',
      'أمسك البار بقبضة عرض الكتفين.',
      'اسحب البار باتجاه أسفل الضلوع أو السرة بضم لوحي الكتف للخلف.',
      'انزل البار ببطء وتحكم دون تقوس الظهر.'
    ],
    tipsEn: ['Keep your neck in a neutral alignment looking slightly forward.'],
    tipsAr: ['حافظ على استقامة الرقبة مع العمود الفقري وتجنب رفعها للأعلى بشدة.']
  },
  {
    id: 'seated-cable-row',
    nameEn: 'Seated Close-Grip Cable Row',
    nameAr: 'تجديف سحب أرضي بالكيبل (كيبل رو جالس)',
    category: 'back',
    primaryMuscleEn: 'Rhomboids & Mid-Back Thickness',
    primaryMuscleAr: 'سماكة منتصف الظهر واللوحين',
    secondaryMusclesEn: ['Lats', 'Biceps', 'Erectors'],
    secondaryMusclesAr: ['المجنص', 'البايسبس', 'عضلات العمود الفقري'],
    equipment: 'cable',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    instructionsEn: [
      'Sit on the bench with feet on footrests and knees slightly bent.',
      'Grasp the V-bar handle with arms outstretched and back upright.',
      'Pull handle towards your abdomen while retracting scapulae.',
      'Pause for 1 second, then slowly return to the starting position.'
    ],
    instructionsAr: [
      'اجلس على المقعد مع وضع قدميك على المساند وثني خفيف في الركبتين.',
      'أمسك مقبض السحب الضيق واجعل ظهرك مستقيماً.',
      'اسحب المقبض باتجاه بطنك مع ضم لوحي الكتف للخلف بقوة.',
      'اثبت لمدة ثانية ثم ارجع بنعومة إلى نقطة البداية.'
    ],
    tipsEn: ['Do not use momentum to pull the weight.'],
    tipsAr: ['لا تستخدم قوة الدفع أو التأرجح بالظهر لتحريك الوزن.']
  },

  // ================= LEGS (الأرجل) =================
  {
    id: 'barbell-back-squat',
    nameEn: 'Barbell Back Squat',
    nameAr: 'تمرين السكوات الخلفي بالبار',
    category: 'legs',
    primaryMuscleEn: 'Quadriceps & Glutes',
    primaryMuscleAr: 'عضلة الفخذ الأمامي (الكوادس) والمؤخرة',
    secondaryMusclesEn: ['Hamstrings', 'Calves', 'Core'],
    secondaryMusclesAr: ['الفخذ الخلفي', 'السمانة', 'عضلات الجذع والبطن'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSec: 120,
    instructionsEn: [
      'Rest barbell securely across upper traps with feet shoulder-width apart.',
      'Brace core, push hips back, and bend knees to descend below parallel.',
      'Keep chest elevated and knees tracking in line with toes.',
      'Drive aggressively through mid-foot to stand back up.'
    ],
    instructionsAr: [
      'ضع البار بأمان على عضلات الترابيس العلوية مع وقوف القدمين بعرض الكتفين.',
      'اشدد عضلات البطن وادفع الوركين للخلف ثم اثنِ الركبتين للنزول حتى يوازي الفخذ الأرض.',
      'حافظ على رفع الصدر وتوجيه الركبتين باتجاه أصابع القدمين.',
      'ادفع بقوة من منتصف القدم للوقوف مجدداً بحزم.'
    ],
    tipsEn: ['Warm up thoroughly and focus on ankle/hip mobility before adding heavy plates.'],
    tipsAr: ['احرص على الإحماء الجيد ومرونة الكاحل والورك قبل زيادة الأوزان.']
  },
  {
    id: 'leg-press-machine',
    nameEn: '45-Degree Leg Press',
    nameAr: 'تمرين دفع الأرجل على الجهاز (ليج برس)',
    category: 'legs',
    primaryMuscleEn: 'Quadriceps',
    primaryMuscleAr: 'عضلات الفخذ الأمامي',
    secondaryMusclesEn: ['Glutes', 'Hamstrings'],
    secondaryMusclesAr: ['المؤخرة', 'الفخذ الخلفي'],
    equipment: 'machine',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 90,
    instructionsEn: [
      'Place feet shoulder-width apart on the sled platform.',
      'Release safety pins and lower the sled until knees form a 90-degree angle.',
      'Press sled up powerfully through heels without locking knees out at top.',
      'Control the descent to protect the lower back.'
    ],
    instructionsAr: [
      'ضع قدميك بعرض الكتفين على منصة الجهاز.',
      'افتح ذراع الأمان وانزل بالمنصة ببطء حتى تصنع ركبتاك زاوية 90 درجة.',
      'ادفع المنصة للأعلى من خلال الكعبين مع تجنب قفل الركبتين تماماً في الأعلى.',
      'حافظ على ثبات أسفل الظهر ملاصقاً للمسند طوال الحركة.'
    ],
    tipsEn: ['Never lock your knees out aggressively at the top of the lift.'],
    tipsAr: ['إياك وقفل مفاصل الركبة بالكامل في قمة الدفعة لتجنب الإصابة.']
  },
  {
    id: 'romanian-deadlift-dumbbell',
    nameEn: 'Romanian Deadlift (Dumbbells/Barbell)',
    nameAr: 'تمرين الديدلفت الروماني (RDL) للأرجل الخلفية',
    category: 'legs',
    primaryMuscleEn: 'Hamstrings & Gluteus Maximus',
    primaryMuscleAr: 'عضلات الفخذ الخلفية والمؤخرة',
    secondaryMusclesEn: ['Lower Back', 'Forearms'],
    secondaryMusclesAr: ['أسفل الظهر', 'الساعد'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    instructionsEn: [
      'Stand holding dumbbells against your front thighs with knees slightly unlocked.',
      'Push your hips straight back while lowering weights along your legs.',
      'Stop when you feel a deep stretch in hamstrings with flat back.',
      'Drive hips forward and squeeze glutes to return to standing.'
    ],
    instructionsAr: [
      'قف ممسكاً بالدامبلز أمام فخذيك مع ثني بسيط جداً في الركبتين.',
      'ادفع حوضك ومؤخرتك للخلف مع إنزال الأوزان بمحاذاة الساقين.',
      'توقف بمجرد الشعور بتمدد عميق في أوتار الركبة الخلفية مع بقاء الظهر مستقيماً تماماً.',
      'ادفع الوركين للأمام واعصر عضلات المؤخرة للعودة للوقوف.'
    ],
    tipsEn: ['Movement is a hip hinge, not a squat down.'],
    tipsAr: ['الحركة تعتمد على إرجاع الحوض للخلف وليس النزول بالركبتين كالسكوات.']
  },
  {
    id: 'leg-extension-machine',
    nameEn: 'Seated Leg Extension',
    nameAr: 'تمرين رفرفة الفخذ الأمامي بالجهاز',
    category: 'legs',
    primaryMuscleEn: 'Quadriceps Isolation',
    primaryMuscleAr: 'عزل الفخذ الأمامي (الكوادس)',
    secondaryMusclesEn: [],
    secondaryMusclesAr: [],
    equipment: 'machine',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    instructionsEn: [
      'Align knee joint with the machine pivot point, pad resting on lower shins.',
      'Grip side handles and extend legs upward until fully straightened.',
      'Pause and flex quads for 1 second at the top.',
      'Lower weight slowly back under control.'
    ],
    instructionsAr: [
      'اجلس مع ضبط وسادة الساق فوق الكاحلين ومحاذاة الركبة مع محور دوران الجهاز.',
      'أمسك بالمقابض الجانبية وارفع ساقيك للأعلى حتى استقامة كاملة.',
      'اعصر عضلات الفخذ الأمامي بقوة لمدة ثانية واحدة في القمة.',
      'انزل بالوزن ببطء وتحكم كامل.'
    ],
    tipsEn: ['Great for building quad definition and warming up knee joints.'],
    tipsAr: ['تمرين ممتاز لتفصيل عضلات الفخذ الأمامية وإحماء الركبة.']
  },
  {
    id: 'standing-calf-raises',
    nameEn: 'Standing Calf Raises',
    nameAr: 'تمرين عضلة السمانة (البطات) واقفاً',
    category: 'legs',
    primaryMuscleEn: 'Gastrocnemius (Calves)',
    primaryMuscleAr: 'عضلة السمانة (البطات)',
    secondaryMusclesEn: ['Soleus'],
    secondaryMusclesAr: ['عضلة السمانة العميقة'],
    equipment: 'machine',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSec: 45,
    instructionsEn: [
      'Place balls of feet on step edge with heels hanging off.',
      'Lower heels downward for a deep stretch at bottom.',
      'Explode upward on tiptoes and squeeze calves tightly for 1-2 seconds.',
      'Lower smoothly without bouncing.'
    ],
    instructionsAr: [
      'ضع مشط قدميك على حافة الدرجة أو الجهاز مع تدلي الكعبين للخارج.',
      'انزل بكعبيك للأسفل لأقصى درجة للشعور بالإطالة الكاملة.',
      'ادفع بمشط القدم للأعلى بقوة واعصر السمانة لمدة ثانيتين.',
      'انزل ببطء وتجنب الارتداد السريع.'
    ],
    tipsEn: ['Full range of motion and pause at top creates maximum hypertrophy.'],
    tipsAr: ['المدى الحركي الكامل مع التوقف في القمة هو مفتاح بناء السمانة.']
  },

  // ================= SHOULDERS (الأكتاف) =================
  {
    id: 'overhead-barbell-press',
    nameEn: 'Overhead Barbell Military Press',
    nameAr: 'تمرين ضغط الكتف العسكري بالبار (OHP)',
    category: 'shoulders',
    primaryMuscleEn: 'Anterior & Lateral Deltoids',
    primaryMuscleAr: 'عضلات الكتف الأمامية والجانبية',
    secondaryMusclesEn: ['Triceps', 'Upper Traps', 'Core'],
    secondaryMusclesAr: ['الترايسبس', 'الترابيس العلوية', 'عضلات الجذع'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSec: 90,
    instructionsEn: [
      'Hold barbell at collarbone level, hands slightly wider than shoulders.',
      'Tighten glutes, legs, and abs to create a solid foundation.',
      'Press barbell straight up overhead, moving head slightly back then through at top.',
      'Lower the bar with control back to collarbone level.'
    ],
    instructionsAr: [
      'امسك البار عند مستوى عظمة الترقوة بقبضة أوسع قليلاً من الكتفين.',
      'اشدد عضلات البطن والمؤخرة لثبات الجسم وتجنب تقوس الظهر.',
      'ادفع البار عمودياً للأعلى مع إرجاع الرأس قليلاً ثم تمريره للأمام عند استقامة الذراعين.',
      'انزل البار بتحكم لمستوى الترقوة.'
    ],
    tipsEn: ['Do not hyperextend your lower back during the press.'],
    tipsAr: ['تجنب تقوس أسفل الظهر للخلف أثناء رفع الوزن.']
  },
  {
    id: 'lateral-dumbbell-raises',
    nameEn: 'Dumbbell Lateral Raises',
    nameAr: 'تمرين الرفرفة الجانبية بالدامبلز (كتف جانبي)',
    category: 'shoulders',
    primaryMuscleEn: 'Lateral Deltoids (Side Delts)',
    primaryMuscleAr: 'عضلة الكتف الجانبية (تعريض الأكتاف)',
    secondaryMusclesEn: ['Upper Traps'],
    secondaryMusclesAr: ['الترابيس العلوية'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSec: 60,
    instructionsEn: [
      'Stand tall holding dumbbells at your sides with palms facing inwards.',
      'Raise dumbbells out to the sides with a slight elbow bend until parallel with shoulders.',
      'Lead with your elbows and maintain pinkies slightly higher than thumbs.',
      'Lower with control for 2 seconds.'
    ],
    instructionsAr: [
      'قف باستقامة ممسكاً بالدامبلز بجانب فخذيك.',
      'ارفع الذراعين جانباً مع ثني خفيف في الكوع حتى يصبح الدامبل بمستوى الكتف.',
      'اجعل الكوع يقود الحركة وليس المعصم، وتخيل أنك تسكب من إبريق.',
      'انزل بالوزن ببطء في ثانيتين.'
    ],
    tipsEn: ['Use lighter weights with strict form rather than swinging heavy dumbbells.'],
    tipsAr: ['استخدم أوزاناً معتدلة بتكنيك صارم بدلاً من مرجحة أوزان ثقيلة.']
  },
  {
    id: 'rear-delt-face-pulls',
    nameEn: 'Cable Face Pulls with Rope',
    nameAr: 'تمرين فيس بول بالحبل للكتف الخلفي',
    category: 'shoulders',
    primaryMuscleEn: 'Posterior Deltoids & Rotator Cuff',
    primaryMuscleAr: 'الكتف الخلفي وعضلات الكفة المدورة',
    secondaryMusclesEn: ['Traps', 'Rhomboids'],
    secondaryMusclesAr: ['الترابيس', 'أعلى الظهر'],
    equipment: 'cable',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    instructionsEn: [
      'Attach rope to upper cable pulley and grasp ends with thumbs pointing back.',
      'Step back, pull rope directly towards your eyes/forehead.',
      'Externally rotate shoulders at the end of the pull, separating the rope ends.',
      'Hold contraction for 1 second, then extend arms forward slowly.'
    ],
    instructionsAr: [
      'ثبت حبل السحب في بكرة الكيبل العلوية وأمسك الطرفين بحيث يشير الإبهام للخلف.',
      'تراجع خطوة واسحب الحبل مباشرة باتجاه مستوى العينين والجبهة.',
      'افصل طرفي الحبل للخارج مع تدوير الكتف للخارج في نهاية السحبة.',
      'اثبت لمدة ثانية ثم ارجع الذراعين ببطء للأمام.'
    ],
    tipsEn: ['Crucial for shoulder joint health and posture improvement.'],
    tipsAr: ['تمرين جوهري جداً لصحة مفصل الكتف وتحسين استقامة القامة.']
  },
  {
    id: 'arnold-press-dumbbell',
    nameEn: 'Arnold Dumbbell Press',
    nameAr: 'تمرين ضغط أرنولد بالدامبلز',
    category: 'shoulders',
    primaryMuscleEn: 'All Deltoid Heads (Front & Side)',
    primaryMuscleAr: 'جميع رؤوس عضلة الكتف (أمامي وجانبي)',
    secondaryMusclesEn: ['Triceps', 'Traps'],
    secondaryMusclesAr: ['الترايسبس', 'الترابيس'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    instructionsEn: [
      'Sit on bench holding dumbbells in front of chest, palms facing towards you.',
      'Press dumbbells overhead while rotating wrists 180 degrees outward.',
      'Lock out overhead with palms facing forward.',
      'Reverse the rotational motion as you lower dumbbells back to chest.'
    ],
    instructionsAr: [
      'اجلس على المقعد حاملاً الدامبلز أمام صدرك بحيث تكون الراحتان باتجاه وجهك.',
      'ادفع الدامبلز للأعلى مع تدوير المعصمين 180 درجة للخارج أثناء الصعود.',
      'تصل القمة والراحتان تشيران للأمام فوق رأسك.',
      'اعكس حركة الدوران بسلاسة أثناء الإنزال لمستوى الصدر.'
    ],
    tipsEn: ['Smooth continuous rotation throughout the entire pressing motion.'],
    tipsAr: ['حافظ على دوران ناعم ومستمر طوال مسار الدفع والإنزال.']
  },

  // ================= ARMS (الذراعين - Biceps/Triceps) =================
  {
    id: 'barbell-bicep-curl',
    nameEn: 'Standing Barbell Bicep Curl',
    nameAr: 'تمرين كيرل البايسبس بالبار واقفاً',
    category: 'arms',
    primaryMuscleEn: 'Biceps Brachii',
    primaryMuscleAr: 'عضلة البايسبس ذات الرأسين',
    secondaryMusclesEn: ['Brachialis', 'Forearms'],
    secondaryMusclesAr: ['عضلة الذراع العضدية', 'الساعدين'],
    equipment: 'barbell',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    instructionsEn: [
      'Stand tall holding barbell with shoulder-width underhand grip.',
      'Keep elbows pinned firmly by your ribs.',
      'Curl the barbell upward contracting biceps until forearms touch biceps.',
      'Lower bar slowly under control back to full extension.'
    ],
    instructionsAr: [
      'قف باستقامة ممسكاً بالبار بقبضة سفلية بعرض الكتفين.',
      'ثبت كوعيك ملاصقين لجانبي خصرك تماماً.',
      'ارفع البار للأعلى عبر ثني البايسبس حتى ينقبض بالكامل.',
      'انزل بالبار ببطء وتحكم حتى يمتد الذراعان بالكامل.'
    ],
    tipsEn: ['Do not swing body backwards to hoist the weight up.'],
    tipsAr: ['تجنب مرجحة الجسم أو الظهر للخلف لرفع الوزن.']
  },
  {
    id: 'incline-dumbbell-bicep-curl',
    nameEn: 'Incline Dumbbell Curl',
    nameAr: 'تمرين كيرل بايسبس على بنش مائل',
    category: 'arms',
    primaryMuscleEn: 'Biceps Long Head (Peak)',
    primaryMuscleAr: 'الرأس الطويل للبايسبس (قمة العضلة)',
    secondaryMusclesEn: ['Forearms'],
    secondaryMusclesAr: ['الساعدين'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    instructionsEn: [
      'Sit back on a 45-60 degree incline bench holding dumbbells with arms hanging.',
      'Curl dumbbells upward while supinating wrists (turning palms up).',
      'Squeeze biceps forcefully at the top.',
      'Lower dumbbells slowly to feel an intense stretch at the bottom.'
    ],
    instructionsAr: [
      'استند للخلف على مقعد مائل بزاوية 45-60 درجة مع تدلي الذراعين بحرية.',
      'ارفع الدامبلز للأعلى مع تدوير راحة اليد للأعلى.',
      'اعصر قمة البايسبس بقوة في أعلى نقطة.',
      'انزل ببطء للاستفادة من أقصى تمدد عضلي في الأسفل.'
    ],
    tipsEn: ['One of the best exercises for building peak biceps height.'],
    tipsAr: ['من أقوى التمارين لبناء قمة وبروز عضلة البايسبس.']
  },
  {
    id: 'tricep-rope-pushdown',
    nameEn: 'Tricep Cable Rope Pushdown',
    nameAr: 'تمرين الترايسبس بالحبل على الكيبل',
    category: 'arms',
    primaryMuscleEn: 'Triceps Lateral & Medial Heads',
    primaryMuscleAr: 'عضلة الترايسبس (الرأس الخارجي والأوسط)',
    secondaryMusclesEn: ['Forearms'],
    secondaryMusclesAr: ['الساعد'],
    equipment: 'cable',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    instructionsEn: [
      'Grasp rope handles attached to high pulley with elbows at your sides.',
      'Push rope downward until arms are fully locked out.',
      'Spread rope ends outward at the bottom for maximum tricep contraction.',
      'Slowly allow hands to rise back to 90 degrees elbow flexion.'
    ],
    instructionsAr: [
      'أمسك طرفي الحبل المتصل بالبكرة العلوية مع تثبيت الكوعين بجانب جسمك.',
      'ادفع الحبل للأسفل حتى تستقيم ذراعاك تماماً.',
      'افصل طرفي الحبل للخارج عند نهاية الحركة لزيادة انقباض التراي.',
      'ارجع ببطء حتى يصل الكوع لزاوية 90 درجة ثم كرر.'
    ],
    tipsEn: ['Keep elbows glued in place without letting them drift forward.'],
    tipsAr: ['ثبت كوعيك في مكانهما وتجنب تحريكهما للأمام والخلف.']
  },
  {
    id: 'skull-crushers-ez-bar',
    nameEn: 'Lying EZ-Bar Skull Crushers',
    nameAr: 'تمرين سحق الجمجمة للترايسبس (سكال كراشر بالبار الزجزاج)',
    category: 'arms',
    primaryMuscleEn: 'Triceps Long Head',
    primaryMuscleAr: 'الرأس الطويل للترايسبس',
    secondaryMusclesEn: ['Forearms'],
    secondaryMusclesAr: ['الساعد'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    instructionsEn: [
      'Lie on flat bench holding EZ-bar with narrow grip above your forehead.',
      'Keep upper arms stationary and bend elbows to lower bar towards forehead or crown.',
      'Extend forearms back to starting position using triceps extension.',
      'Maintain steady elbow positioning.'
    ],
    instructionsAr: [
      'استلقِ على بنش مستوٍ ممسكاً بالبار المتعرج بقبضة ضيقة فوق جبهتك.',
      'حافظ على ثبات الجزء العلوي من الذراعين واثنِ الكوعين لإنزال البار نحو قمة الرأس.',
      'افرد الساعدين بقوة الترايسبس للعودة لوضع البداية.',
      'حافظ على عدم انفراج الكوعين للخارج بشكل مفرط.'
    ],
    tipsEn: ['Lowering slightly behind the head keeps constant tension on the long head.'],
    tipsAr: ['إنزال البار خلف الرأس قليلاً يضمن بقاء الشد المستمر على الرأس الطويل.']
  },
  {
    id: 'hammer-curls-dumbbell',
    nameEn: 'Dumbbell Hammer Curls',
    nameAr: 'تمرين هامر كيرل بالدامبلز (المطرقة)',
    category: 'arms',
    primaryMuscleEn: 'Brachioradialis & Biceps Outer Head',
    primaryMuscleAr: 'عضلة الساعد والبايسبس الخارجية (براكيورادياليس)',
    secondaryMusclesEn: ['Forearms'],
    secondaryMusclesAr: ['الساعد والمعصم'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    instructionsEn: [
      'Hold dumbbells with neutral grip (palms facing each other).',
      'Keep elbows tight to your sides and curl weights up simultaneously or alternating.',
      'Squeeze forearm and upper arm muscles at the top.',
      'Lower smoothly.'
    ],
    instructionsAr: [
      'أمسك بالدامبلز بقبضة محايدة (الراحتان متقابلتان كالمطرقة).',
      'ثبت الكوعين وارفع الأوزان بالتناوب أو معاً لأعلى.',
      'اعصر عضلات الساعد والذراع بقوة في القمة.',
      'انزل بالوزن بهدوء.'
    ],
    tipsEn: ['Great for thickening arm appearance from the front and strengthening grip.'],
    tipsAr: ['تمرين أساسي لإعطاء سمك للذراع من الأمام وتقوية قبضة اليد.']
  },

  // ================= CORE & ABS (البطن والجذع) =================
  {
    id: 'hanging-leg-raises',
    nameEn: 'Hanging Leg Raises',
    nameAr: 'تمرين رفع الأرجل معلقاً (عقلة للبطن)',
    category: 'core',
    primaryMuscleEn: 'Lower Rectus Abdominis',
    primaryMuscleAr: 'عضلات أسفل البطن',
    secondaryMusclesEn: ['Hip Flexors', 'Obliques', 'Forearms'],
    secondaryMusclesAr: ['عضلات الورك', 'الخواصر', 'الساعد'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    instructionsEn: [
      'Hang from pull-up bar with overhand grip and legs straight.',
      'Tilt pelvis backward and raise legs upward to 90 degrees or higher.',
      'Squeeze abs tightly at top without using swing momentum.',
      'Lower legs slowly with control.'
    ],
    instructionsAr: [
      'تعلق على عقلة السحب بقبضة علوية مع استقامة الساقين.',
      'قم بتدوير الحوض للأعلى وارفع ساقيك حتى تصنعا زاوية 90 درجة أو أعلى.',
      'اعصر عضلات أسفل البطن بقوة في القمة وتجنب التأرجح.',
      'انزل بساقيك ببطء وتحكم كامل.'
    ],
    tipsEn: ['Roll your pelvis up toward your chest to engage abs rather than just hip flexors.'],
    tipsAr: ['احرص على لف الحوض لأعلى لتشغيل عضلات البطن وليس عضلات الورك فقط.']
  },
  {
    id: 'cable-woodchoppers',
    nameEn: 'Cable Woodchoppers / Rotations',
    nameAr: 'تمرين حطاب الشجر بالكيبل للخواصر (وود شوب)',
    category: 'core',
    primaryMuscleEn: 'Obliques & Transverse Abdominis',
    primaryMuscleAr: 'عضلات الخواصر والبطن الجانبية',
    secondaryMusclesEn: ['Shoulders', 'Lower Back'],
    secondaryMusclesAr: ['الأكتاف', 'أسفل الظهر'],
    equipment: 'cable',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '12-15 each side',
    defaultRestSec: 45,
    instructionsEn: [
      'Set cable to shoulder height, grasp handle with both hands standing sideways.',
      'Rotate torso across your body diagonally, pivoting on back foot.',
      'Contract obliques at peak rotation.',
      'Return smoothly to the start and repeat on other side.'
    ],
    instructionsAr: [
      'اضبط الكيبل عند مستوى الكتف وقف بشكل جانبي ممسكاً المقبض بكلتا اليدين.',
      'قم بتدوير جذعك بالعرض بحركة قطرية قوية مع دوران مشط القدم الخلفية.',
      'اعصر عضلات الخواصر عند أقصى دوران.',
      'ارجع ببطء وكرر على الجانب الآخر.'
    ],
    tipsEn: ['Keep arms extended and drive rotation through core and hips.'],
    tipsAr: ['حافظ على استقامة الذراعين واجعل حركة الدوران نابعة من الجذع والخصر.']
  },
  {
    id: 'plank-hold',
    nameEn: 'Core Plank Hold',
    nameAr: 'تمرين البلانك الثابت للجذع',
    category: 'core',
    primaryMuscleEn: 'Transverse Abdominis & Overall Core',
    primaryMuscleAr: 'عضلات البطن العميقة واستقرار الجذع',
    secondaryMusclesEn: ['Glutes', 'Shoulders'],
    secondaryMusclesAr: ['المؤخرة', 'الأكتاف'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '45-60 sec',
    defaultRestSec: 45,
    instructionsEn: [
      'Rest on forearms with elbows beneath shoulders and legs straight back on toes.',
      'Maintain a perfectly straight line from head to heels.',
      'Brace core as if preparing for a punch and squeeze glutes.',
      'Breathe steadily throughout the hold.'
    ],
    instructionsAr: [
      'استند على ساعديك مع وضع الكوعين تحت الكتفين مباشرة وتثبيت أطراف القدمين.',
      'حافظ على استقامة الجسم في خط واحد مستقيم من الرأس إلى الكعبين.',
      'اشدد عضلات البطن والمؤخرة بقوة.',
      'تنفس بهدوء وثبات طوال فترة الصمود.'
    ],
    tipsEn: ['Do not let your hips sag down or pike too high up.'],
    tipsAr: ['تجنب هبوط الحوض للأسفل أو رفعه للأعلى بشكل زائد.']
  },
  {
    id: 'cable-kneeling-crunch',
    nameEn: 'Kneeling Cable Ab Crunch',
    nameAr: 'تمرين كرانش البطن بالكيبل جاثياً (كيبل كرانش)',
    category: 'core',
    primaryMuscleEn: 'Upper & Middle Rectus Abdominis',
    primaryMuscleAr: 'عضلات البطن العلوية والوسطى',
    secondaryMusclesEn: ['Obliques'],
    secondaryMusclesAr: ['الخواصر'],
    equipment: 'cable',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80',
    defaultSets: 3,
    defaultReps: '15-20',
    defaultRestSec: 60,
    instructionsEn: [
      'Kneel below high pulley holding rope at temples/neck.',
      'Hinge at waist, flexing spine to curl elbows down toward knees.',
      'Squeeze abdominals intensely at bottom contraction.',
      'Extend spine smoothly back up under resistance.'
    ],
    instructionsAr: [
      'اجثُ على ركبتيك أسفل بكرة الكيبل العلوية ممسكاً الحبل بجانب الرأس.',
      'قم بثني عمودك الفقري لتقريب الكوعين باتجاه الركبتين بواسطة عضلات البطن.',
      'اعصر البطن بأقصى قوة في نهاية الحركة.',
      'ارجع للأعلى ببطء مع التحكم في الوزن.'
    ],
    tipsEn: ['Curl spine into a C-shape rather than hinging at hips.'],
    tipsAr: ['قم بلف عمودك الفقري كالقوس بدلاً من الانحناء من مفصل الحوض فقط.']
  },

  // ================= CARDIO & FULL BODY (كارديو ولياقة) =================
  {
    id: 'kettlebell-swings',
    nameEn: 'Russian Kettlebell Swings',
    nameAr: 'تمرين مرجحة الكيتل بيل (سوينغ)',
    category: 'cardio',
    primaryMuscleEn: 'Posterior Chain & Cardiovascular Conditioning',
    primaryMuscleAr: 'السلسلة الخلفية ولياقة القلب والتحمل',
    secondaryMusclesEn: ['Glutes', 'Hamstrings', 'Core', 'Shoulders'],
    secondaryMusclesAr: ['المؤخرة', 'الفخذ الخلفي', 'البطن', 'الأكتاف'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSec: 45,
    instructionsEn: [
      'Stand feet shoulder-width, kettlebell between legs.',
      'Hinge at hips, swing bell between thighs, then snap hips forward explosively.',
      'Allow kettlebell to float up to chest/eye level.',
      'Guide kettlebell back between legs on descent.'
    ],
    instructionsAr: [
      'قف بعرض الكتفين مع وضع الكيتل بيل بين قدميك.',
      'انحنِ من الوركين ومرجح الثقل للخلف بين الفخذين، ثم ادفع الحوض للأمام بقوة متفجرة.',
      'دع الكيتل بيل يرتفع بحرية إلى مستوى الصدر أو العينين.',
      'اترك الثقل ينزل بسلاسة بين الساقين ثم كرر.'
    ],
    tipsEn: ['Power comes from hip snap, not lifting with the arms.'],
    tipsAr: ['القوة تأتي من انفجار الحوض للأمام وليس برفع الوزن بالذراعين.']
  },
  {
    id: 'rowing-machine-intervals',
    nameEn: 'Rowing Machine High Intensity Intervals',
    nameAr: 'تمرين جهاز التجديف الهوائي المتقطع (روينغ)',
    category: 'cardio',
    primaryMuscleEn: 'Full Body Endurance & Lats',
    primaryMuscleAr: 'لياقة وتحمل كامل الجسم والظهر',
    secondaryMusclesEn: ['Legs', 'Core', 'Arms'],
    secondaryMusclesAr: ['الأرجل', 'الجذع', 'الذراعين'],
    equipment: 'machine',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80',
    defaultSets: 4,
    defaultReps: '500m Sprints',
    defaultRestSec: 60,
    instructionsEn: [
      'Strap feet securely and grip handle with overhand grip.',
      'Drive through legs first, lean back slightly, then pull handle to lower ribs.',
      'Extend arms, pivot forward at hips, then bend knees to return to catch position.'
    ],
    instructionsAr: [
      'ثبت قدميك جيداً وأمسك المقبض بقبضة علوية.',
      'ادفع بقوة الساقين أولاً، ثم أرجع الجذع قليلاً، ثم اسحب المقبض لأسفل الصدر.',
      'أفرد الذراعين، ثم أمِل الجذع، ثم اثنِ الركبتين للعودة لنقطة الانطلاق.'
    ],
    tipsEn: ['Drive sequence: Legs -> Core -> Arms, and reverse on return.'],
    tipsAr: ['تسلسل القوة: الأرجل أولاً ثم الجذع ثم الذراعين، واعكس الترتيب في العودة.']
  }
];
