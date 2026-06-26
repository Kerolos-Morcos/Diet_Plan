const KEY = "DietPwa.v2";
const oldKey = "DietPwa.v1";
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const todayKey = () => new Date().toISOString().slice(0, 10);
const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());

const GOOGLE_CLIENT_ID = "110233627128-jdtg0u6rgejf7h5fbek78nkd2co6n5s2.apps.googleusercontent.com";
const GOOGLE_API_KEY = "AIzaSyA-AMiF8P6QCJyx1jSwW10kdHh0KsppRV4";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";
let googleTokenClient = null;
let googleAccessToken = null;

const i18n = {
  arz: {
    appSubtitle: "دايت + أدوية + منبهات",
    appTitle: "Diet Planner",
    install: "تثبيت",
    activeProgram: "البروجرام الحالي",
    enableNotifications: "فعّل الإشعارات",
    today:'النهاردة',
    programs: "البروجرامات",
    snacks: "الاسناكس",
    settings: "الإعدادات",
    todayAlarms:'منبهات النهاردة',
    resetToday: "صفّر اليوم",
    waterTitle: "المياه - 12 كوباية",
    waterHint: "منهم ٢ كوباية قبل كل وجبة.",
    weightTitle: "الميزان",
    weightHint:
      "بس في الميعاد اللي الدكتور محدده، قبل الفطار وبعد الحمام، ومن غير أكل أو شرب.",
    weightPlaceholder: "اكتب الوزن",
    save: "حفظ",
    addProgram: "ضيف P جديد",
    programName: "اسم البروجرام",
    startDate: "تاريخ البداية",
    endDate: "تاريخ النهاية",
    instructions: "التعليمات",
    tasks: "المهام والمنبهات",
    addAlarm: "+ ضيف منبه",
    saveProgram: "حفظ البروجرام",
    cancel: "إلغاء",
    snackImages: "صور الاسناكس والجبن",
    snackHint:
      "ارفع الصور اللي الدكتور بعتها. التطبيق هيضغطها ويحفظها على الموبايل.",
    uploadSnacks: "ارفع صور الاسناكس",
    soundSetting: "صوت تنبيه لو التطبيق مفتوح",
    vibrateSetting: "اهتزاز الموبايل لو مدعوم",
    exportBackup: "صدّر نسخة احتياطية",
    importBackup: "استورد نسخة احتياطية",
    clearAll: "امسح كل البيانات المحلية",
    notificationNote:
      "ملحوظة: إشعارات الويب على الموبايل بتختلف حسب المتصفح. أفضل نتيجة لما تثبت التطبيق من Add to Home Screen وتسمح بالإشعارات.",
    from: "من",
    to: "لحد",
    activate: "فعّل",
    active: "متفعل",
    edit: "تعديل",
    delete: "حذف",
    noSnacks: "لسه مفيش صور. ارفع صور الاسناكس من الزر فوق.",
    noWeights: "لسه مفيش وزن متسجل.",
    saved: "تمام.. اتسجلت ✅",
    imported: "تم الاستيراد ✅",
    notifyOn: "الإشعارات اشتغلت ✅",
    notifyOff: "الإشعارات مش مسموح لها",
    notSupported: "المتصفح مش بيدعم الإشعارات",
    confirmClear: "متأكد إنك عايز تمسح كل البيانات؟",
    imagesSaved: "الصور اتحفظت محليًا ✅",
    newAlarm: "منبه جديد",
    alarmTime: "الوقت",
    alarmTitle: "العنوان",
    alarmDetails: "التفاصيل",
    alarmType: "النوع",
    meal: "أكل",
    med: "دواء",
    water: "مياه",
    snack: "اسناك",
    walk: "مشي",
    stop: "منع أكل",
    reminder: "ميعاد المنبه",
    calendarTitle: "منبهات تقويم الموبايل",
    calendarHint: "نزّل ملف تقويم فيه مواعيد البروجرام، وافتحه بتطبيق التقويم عشان التذكيرات تشتغل حتى من غير نت.",
    downloadCalendar: "نزّل ملف التقويم",
    ntfyTitle: "إشعارات ntfy احتياطي",
    ntfyHint: "اختياري: لو عندك تطبيق ntfy، اكتب Topic وجدول إشعارات الـ 3 أيام الجاية. يحتاج نت وقت الجدولة ووقت وصول الإشعار.",
    ntfyEnabled: "فعّل ntfy",
    ntfyServer: "رابط ntfy",
    ntfyTopic: "Topic خاص بيك",
    ntfyTopicPlaceholder: "مثال: diet-12345",
    ntfySave: "حفظ إعدادات ntfy",
    ntfyTest: "ابعت تجربة",
    ntfySchedule: "جدول إشعارات 3 أيام",
    ntfyTopicMissing: "اكتب Topic الأول",
    ntfySaved: "إعدادات ntfy اتحفظت ✅",
    ntfyTestSent: "تجربة ntfy اتبعتت ✅",
    ntfyScheduled: "تم جدولة إشعارات ntfy ✅",
    ntfyFailed: "حصل خطأ في ntfy",
    calendarDownloaded: "ملف التقويم اتنزّل ✅",
    googleCalendarTitle: "Google Calendar",
    googleCalendarHint: "الروابط دي هتفتح Google Calendar ببيانات المنبه جاهزة. أنت بس بتدوس Save جوه Google Calendar.",
    addTodayGoogle: "اعرض روابط Google Calendar للنهاردة",
    addToGoogle: "ضيف لـ Google Calendar",
    googleOAuthHint: "اربط حساب Google عشان التطبيق يضيف/يحدّث منبهاتك في Google Calendar تلقائيًا. هيتم إضافة أحداث للمنبهات فقط.",
    googleConnect: "اربط Google Calendar",
    googleSyncActive: "زامن البروجرامات المتفعلة",
    googleRemoveSynced: "امسح الأحداث المتزامنة",
    googleResync: "إعادة مزامنة",
    googleConnected: "Google Calendar متوصل ✅",
    googleNeedConnect: "اربط Google Calendar الأول",
    googleSyncing: "جاري المزامنة...",
    googleSynced: "تمت مزامنة Google Calendar ✅",
    googleRemoved: "تم حذف الأحداث من Google Calendar ✅",
    googleSyncFailed: "حصل خطأ في Google Calendar",
    googleAddNotice: "هيتم إضافة مواعيد البروجرامات المتفعلة إلى Google Calendar. هتشوفها من أي جهاز عليه نفس حساب Google.",
    googleManualLinks: "روابط الإضافة اليدوية",
    doneAction: "تمام خلصت",
    snoozeAction: "أجل 5 دقايق",
    snoozeLimit: "وصلت للحد الأقصى للتأجيل",
    snoozed: "اتأجل 5 دقايق ⏰",
    taskDone: "تمام.. اتعلمت خلصت ✅",
    repeatEvery: "يتكرر كل",
    repeatHours: "ساعة",
    repeatHint: "لو الدواء بيتاخد كل 8 ساعات مثلًا، فعل التكرار واكتب 8. وقت المنبه الأساسي هو بداية التكرار.",
    activeProgramsHint: "ممكن تفعّل أكتر من بروجرام في نفس الوقت. لو منبهين في نفس المعاد، هيظهروا الاتنين بالترتيب.",
    storageAdvice: "التخزين المحلي الحالي مناسب للبيانات الصغيرة. لو هتزيد صور وتاريخ طويل، الأفضل ننقل الصور والتاريخ لـ IndexedDB المجاني داخل نفس المتصفح.",
    kg: "كجم",
  },
  en: {
    appSubtitle: "Diet + meds + alarms",
    appTitle: "Diet Planner",
    install: "Install",
    activeProgram: "Active program",
    enableNotifications: "Enable notifications",
    today: "Today",
    programs: "Programs",
    snacks: "Snacks",
    settings: "Settings",
    todayAlarms: "Today alarms",
    resetToday: "Reset today",
    waterTitle: "Water - 12 cups",
    waterHint: "2 cups before each meal.",
    weightTitle: "Weight",
    weightHint:
      "Only on the scheduled weigh-in day: before breakfast, after bathroom, no food or drinks.",
    weightPlaceholder: "Enter weight",
    save: "Save",
    addProgram: "Add new P",
    programName: "Program name",
    startDate: "Start date",
    endDate: "End date",
    instructions: "Instructions",
    tasks: "Tasks & alarms",
    addAlarm: "+ Add alarm",
    saveProgram: "Save program",
    cancel: "Cancel",
    snackImages: "Snack & cheese photos",
    snackHint:
      "Upload the snack photos from the doctor. The app compresses and saves them locally on your phone.",
    uploadSnacks: "Upload snack photos",
    soundSetting: "Play sound when app is open",
    vibrateSetting: "Vibrate if supported",
    exportBackup: "Export backup",
    importBackup: "Import backup",
    clearAll: "Clear all local data",
    notificationNote:
      "Note: mobile web notifications depend on the browser and OS. Best result: install the app using Add to Home Screen and allow notifications.",
    from: "From",
    to: "To",
    activate: "Activate",
    active: "Active",
    edit: "Edit",
    delete: "Delete",
    noSnacks: "No photos yet. Upload snack photos above.",
    noWeights: "No weight entries yet.",
    saved: "Saved ✅",
    imported: "Imported ✅",
    notifyOn: "Notifications enabled ✅",
    notifyOff: "Notifications are not allowed",
    notSupported: "Notifications are not supported",
    confirmClear: "Are you sure you want to clear all data?",
    imagesSaved: "Images saved locally ✅",
    newAlarm: "New alarm",
    alarmTime: "Time",
    alarmTitle: "Title",
    alarmDetails: "Details",
    alarmType: "Type",
    meal: "Meal",
    med: "Medication",
    water: "Water",
    snack: "Snack",
    walk: "Walk",
    stop: "No food",
    reminder: "Reminder time",
    calendarTitle: "Phone calendar alarms",
    calendarHint: "Download a calendar file with this program reminders, then open it with your calendar app so reminders work offline.",
    downloadCalendar: "Download calendar file",
    ntfyTitle: "Backup ntfy notifications",
    ntfyHint: "Optional: if you use the ntfy app, add your topic and schedule the next 3 days. It needs internet when scheduling and when receiving.",
    ntfyEnabled: "Enable ntfy",
    ntfyServer: "ntfy server URL",
    ntfyTopic: "Your private topic",
    ntfyTopicPlaceholder: "Example: diet-12345",
    ntfySave: "Save ntfy settings",
    ntfyTest: "Send test",
    ntfySchedule: "Schedule next 3 days",
    ntfyTopicMissing: "Enter a topic first",
    ntfySaved: "ntfy settings saved ✅",
    ntfyTestSent: "ntfy test sent ✅",
    ntfyScheduled: "ntfy reminders scheduled ✅",
    ntfyFailed: "ntfy error",
    calendarDownloaded: "Calendar file downloaded ✅",
    googleCalendarTitle: "Google Calendar",
    googleCalendarHint: "These links open Google Calendar with the reminder details ready. Just tap Save inside Google Calendar.",
    addTodayGoogle: "Show today's Google Calendar links",
    addToGoogle: "Add to Google Calendar",
    googleOAuthHint: "Connect Google so the app can automatically create/update your reminders in Google Calendar. Only reminder events are added.",
    googleConnect: "Connect Google Calendar",
    googleSyncActive: "Sync active programs",
    googleRemoveSynced: "Remove synced events",
    googleResync: "Resync",
    googleConnected: "Google Calendar connected ✅",
    googleNeedConnect: "Connect Google Calendar first",
    googleSyncing: "Syncing...",
    googleSynced: "Google Calendar synced ✅",
    googleRemoved: "Synced events removed ✅",
    googleSyncFailed: "Google Calendar error",
    googleAddNotice: "Active program reminders will be added to your Google Calendar and visible on devices using the same Google account.",
    googleManualLinks: "Manual add links",
    doneAction: "Done",
    snoozeAction: "Snooze 5 min",
    snoozeLimit: "Maximum snooze count reached",
    snoozed: "Snoozed for 5 minutes ⏰",
    taskDone: "Done ✅",
    repeatEvery: "Repeat every",
    repeatHours: "hours",
    repeatHint: "For meds taken every 8 hours, enable repeat and enter 8. The alarm time is the first dose time.",
    activeProgramsHint: "You can activate more than one program at the same time. If reminders share the same time, both will appear in order.",
    storageAdvice: "LocalStorage is okay for small data. For many photos and long history, the free next step is IndexedDB in the same browser.",
    kg: "kg",
  },
};
const tr = (k) => (i18n[state?.settings?.lang || "arz"] || i18n.arz)[k] || k;

const p1Tasks = [
  {
    id: uid(),
    time: "10:00",
    titleAr: "كونترلوك",
    titleEn: "Controloc",
    detailsAr: "قبل الفطار بساعة",
    detailsEn: "One hour before breakfast",
    type: "med",
  },
  {
    id: uid(),
    time: "10:30",
    titleAr: "٢ كوباية مياه",
    titleEn: "2 cups of water",
    detailsAr: "قبل الفطار",
    detailsEn: "Before breakfast",
    type: "water",
  },
  {
    id: uid(),
    time: "11:00",
    titleAr: "يلا الفطار",
    titleEn: "Breakfast time",
    detailsAr:
      "رغيف بلدي + اختيار واحد: ٤ معالق فول بدون زيت / ٢ طعمية فرن / نص بطاطسية مسلوقة + خيار وخس مفتوح",
    detailsEn:
      "Baladi bread + one option: 4 tbsp beans no oil / 2 baked falafel / half boiled potato + unlimited cucumber and lettuce",
    type: "meal",
  },
  {
    id: uid(),
    time: "13:00",
    titleAr: "اسناك خفيف",
    titleEn: "Light snack",
    detailsAr: "ثمرة فاكهة أو اسناك واحد من الصور أو كوب عصير بدون سكر",
    detailsEn: "One fruit, one snack from photos, or sugar-free juice",
    type: "snack",
  },
  {
    id: uid(),
    time: "15:00",
    titleAr: "سيبروفار",
    titleEn: "Ciprofar",
    detailsAr: "بعد الأكل - راجع الدكتور لو التوقيت محتاج تعديل",
    detailsEn: "After food - confirm timing with your doctor if needed",
    type: "med",
  },
  {
    id: uid(),
    time: "15:10",
    titleAr: "فلاجيل",
    titleEn: "Flagyl",
    detailsAr: "بعد سيبروفار بـ 10 دقايق",
    detailsEn: "10 minutes after Ciprofar",
    type: "med",
  },
  {
    id: uid(),
    time: "18:30",
    titleAr: "٢ كوباية مياه",
    titleEn: "2 cups of water",
    detailsAr: "قبل العشاء",
    detailsEn: "Before dinner",
    type: "water",
  },
  {
    id: uid(),
    time: "19:00",
    titleAr: "الغدا / العشا",
    titleEn: "Dinner",
    detailsAr:
      "رغيف أو ٧ معالق رز/مكرونة + اختيار واحد: مشروم / بطاطس / بتنجان / فاصوليا / ٤ معالق ملوخية / سمكة مشوية + نص رغيف",
    detailsEn:
      "Bread or 7 tbsp rice/pasta + one option: mushrooms / potato / eggplant / beans / molokhia / grilled fish + half bread",
    type: "meal",
  },
  {
    id: uid(),
    time: "21:00",
    titleAr: "سيبروفار",
    titleEn: "Ciprofar",
    detailsAr:
      "جرعة مسائية - راجع الدكتور لأن 12 ساعة بالظبط ممكن تحتاج ترتيب مختلف",
    detailsEn: "Evening dose - confirm exact 12-hour timing with your doctor",
    type: "med",
  },
  {
    id: uid(),
    time: "21:10",
    titleAr: "فلاجيل",
    titleEn: "Flagyl",
    detailsAr: "بعد سيبروفار بـ 10 دقايق",
    detailsEn: "10 minutes after Ciprofar",
    type: "med",
  },
  {
    id: uid(),
    time: "22:00",
    titleAr: "مشي سريع",
    titleEn: "Brisk walk",
    detailsAr: "٤٠ دقيقة",
    detailsEn: "40 minutes",
    type: "walk",
  },
  {
    id: uid(),
    time: "23:00",
    titleAr: "ممنوع الأكل",
    titleEn: "Stop eating",
    detailsAr: "بعد 11 مفيش أكل. مياه بس لو محتاج.",
    detailsEn: "No food after 11 PM. Water only if needed.",
    type: "stop",
  },
];
const defaultState = {
  activeProgramId: "p1",
  activeProgramIds: ["p1"],
  settings: { sound: true, vibrate: true, theme: "light", lang: "arz", ntfy:{enabled:false, server:"https://ntfy.sh", topic:""}, googleCalendar:{synced:{}, connected:false} },
  programs: [
    {
      id: "p1",
      name: "P1",
      start: "2026-06-26",
      end: "2026-07-05",
      instructionsAr:
        "٣ لتر مياه يوميًا. الأكل في أطباق صغيرة. سلطة خضرا عند الجوع. ممنوع المسبك. ممنوع الأكل بعد 11. مشي سريع 40 دقيقة يوميًا. الميزان بس في معاده قبل الفطار وبعد الحمام.",
      instructionsEn:
        "3 liters of water daily. Use small plates. Green salad when hungry. Avoid heavy/oily cooked food. No food after 11 PM. Brisk walk 40 minutes daily. Weigh only on the scheduled day before breakfast after bathroom.",
      tasks: p1Tasks,
    },
  ],
  done: {},
  snoozes: {},
  water: {},
  weights: [],
  snacks: [],
};
let state = load();
let editingId = null;
let timers = [];
let deferredPrompt = null;

function load() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem(oldKey);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return mergeState(parsed);
  } catch {
    return structuredClone(defaultState);
  }
}
function mergeState(data) {
  const merged = structuredClone(defaultState);
  Object.assign(merged, data);
  merged.activeProgramIds = Array.isArray(data.activeProgramIds) && data.activeProgramIds.length ? data.activeProgramIds : [data.activeProgramId || "p1"];
  merged.snoozes = data.snoozes || {};
  merged.settings = { ...defaultState.settings, ...(data.settings || {}) };
  merged.settings.ntfy = { ...defaultState.settings.ntfy, ...(data.settings?.ntfy || {}) };
  merged.settings.googleCalendar = { ...defaultState.settings.googleCalendar, ...(data.settings?.googleCalendar || {}) };
  merged.settings.googleCalendar.synced = data.settings?.googleCalendar?.synced || {};
  merged.programs = (
    data.programs?.length ? data.programs : defaultState.programs
  ).map(normalizeProgram);
  return merged;
}
function normalizeProgram(p) {
  return {
    id: p.id || uid(),
    name: p.name || "P",
    start: p.start || "",
    end: p.end || "",
    instructionsAr: p.instructionsAr || p.instructions || "",
    instructionsEn: p.instructionsEn || p.instructions || "",
    tasks: (p.tasks || []).map((t) => ({
      id: t.id || uid(),
      time: t.time || "12:00",
      type: t.type || "meal",
      titleAr: t.titleAr || t.title || "",
      titleEn: t.titleEn || t.title || "",
      detailsAr: t.detailsAr || t.details || "",
      detailsEn: t.detailsEn || t.details || "",
      repeat: { enabled: !!t.repeat?.enabled, everyHours: Number(t.repeat?.everyHours || 8) },
    })),
  };
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}
function activeProgram() {
  return activePrograms()[0] || state.programs[0];
}
function activePrograms() {
  const ids = Array.isArray(state.activeProgramIds) && state.activeProgramIds.length
    ? state.activeProgramIds
    : [state.activeProgramId || "p1"];
  const found = state.programs.filter((p) => ids.includes(p.id));
  return found.length ? found : [state.programs[0]].filter(Boolean);
}
function isProgramActive(id) {
  return activePrograms().some((p) => p.id === id);
}
function toggleProgramActive(id) {
  state.activeProgramIds = Array.isArray(state.activeProgramIds) ? state.activeProgramIds : [state.activeProgramId || id];
  if (state.activeProgramIds.includes(id)) {
    if (state.activeProgramIds.length === 1) {
      showToast(isAr() ? "لازم تسيب بروجرام واحد متفعل على الأقل" : "Keep at least one active program");
      return;
    }
    state.activeProgramIds = state.activeProgramIds.filter((x) => x !== id);
  } else {
    state.activeProgramIds.push(id);
  }
  state.activeProgramId = state.activeProgramIds[0];
  save();
  render();
}
function expandedTaskId(programId, taskId, time) {
  return `${programId}__${taskId}__${String(time).replace(":", "")}`;
}
function expandTaskForDate(program, task, dateStr) {
  if (!task.repeat?.enabled) {
    return [{ ...task, programId: program.id, programName: program.name, baseTaskId: task.id, id: expandedTaskId(program.id, task.id, task.time) }];
  }
  const everyHours = Math.max(1, Number(task.repeat.everyHours || 8));
  const out = [];
  const current = new Date(`${dateStr}T${task.time || "00:00"}:00`);
  const end = new Date(`${dateStr}T23:59:59`);
  while (current <= end) {
    const time = `${String(current.getHours()).padStart(2, "0")}:${String(current.getMinutes()).padStart(2, "0")}`;
    out.push({
      ...task,
      id: expandedTaskId(program.id, task.id, time),
      originalId: task.id,
      baseTaskId: task.id,
      programId: program.id,
      programName: program.name,
      time,
      repeatInstance: true,
    });
    current.setHours(current.getHours() + everyHours);
  }
  return out;
}
function expandedTasksForDate(dateStr = todayKey(), programs = activePrograms()) {
  return programs
    .flatMap((program) => (program.tasks || []).flatMap((task) => expandTaskForDate(program, task, dateStr)))
    .sort((a, b) => a.time.localeCompare(b.time) || String(a.programName).localeCompare(String(b.programName)));
}
function isAr() {
  return state.settings.lang === "arz";
}
function field(obj, base) {
  return isAr()
    ? obj[base + "Ar"] || obj[base + "En"] || ""
    : obj[base + "En"] || obj[base + "Ar"] || "";
}
function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}
function icon(type) {
  return (
    { med: "💊", water: "💧", meal: "🍽️", snack: "🍎", walk: "🚶", stop: "⛔" }[
      type
    ] || "⏰"
  );
}
function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  if (!isAr())
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const ap = h >= 12 ? "م" : "ص";
  const hh = h % 12 || 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
}
function showToast(msg) {
  $("#toast").textContent = msg;
  $("#toast").classList.remove("hidden");
  setTimeout(() => $("#toast").classList.add("hidden"), 2400);
}
function applyLocale() {
  const lang = state.settings.lang;
  document.documentElement.lang = lang === "arz" ? "ar-EG" : "en";
  document.documentElement.dir = lang === "arz" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach((el) => (el.textContent = tr(el.dataset.i18n)));
  $$("[data-i18n-placeholder]").forEach(
    (el) => (el.placeholder = tr(el.dataset.i18nPlaceholder)),
  );
  $("#langToggle").textContent = lang === "arz" ? "EN" : "مصري";
}
function applyTheme() {
  document.documentElement.dataset.theme = state.settings.theme || "light";
  $("#themeToggle").textContent = state.settings.theme === "dark" ? "☀️" : "🌙";
}
function render() {
  applyLocale();
  applyTheme();
  renderHero();
  renderTimeline();
  renderWater();
  renderPrograms();
  renderSnacks();
  renderWeights();
  renderSettingsControls();
  scheduleTodayAlarms();
}
function formatDateShort(dateStr) {
  if (!dateStr) return "—";

  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;

  const [, m, d] = parts;

  return `${m}/${d}`;
}
function renderHero() {
  const programs = activePrograms();
  $("#activeProgramTitle").textContent = programs.map((p) => p.name).join(" + ");
  $("#programDates").textContent = programs
    .map((p) => `${p.name}: ${formatDateShort(p.start)} → ${formatDateShort(p.end)}`)
    .join("  •  ");
}
function renderTimeline() {
  const dateStr = todayKey();
  const tasks = expandedTasksForDate(dateStr);
  const done = state.done[dateStr] || {};
  $("#timeline").innerHTML = tasks
    .map(
      (t) => `
    <div class="task ${done[t.id] ? "done" : ""}">
      <button class="check" data-done="${t.id}" type="button" aria-label="done">${done[t.id] ? "✓" : ""}</button>
      <div class="task-copy">
        <div class="task-title">${icon(t.type)} ${esc(field(t, "title"))}</div>
        <div class="task-details">${activePrograms().length > 1 ? `<span class="program-badge">${esc(t.programName)}</span> ` : ""}${t.repeatInstance ? "🔁 " : ""}${esc(field(t, "details"))}</div>
        <div class="task-actions"><button class="ghost mini-btn" data-gcal="${t.id}" type="button">${isGoogleSynced(t) ? "✅ " + tr("googleSynced") : "📅 " + tr("addToGoogle")}</button></div>
      </div>
      <div class="time">${formatTime(t.time)}</div>
    </div>`,
    )
    .join("");
  $$("[data-done]").forEach(
    (b) =>
      (b.onclick = () => {
        state.done[todayKey()] ??= {};
        state.done[todayKey()][b.dataset.done] =
          !state.done[todayKey()][b.dataset.done];
        save();
        renderTimeline();
      }),
  );
  $$('[data-gcal]').forEach((b) => {
    b.onclick = () => openTaskInGoogleCalendar(b.dataset.gcal, todayKey());
  });
}
function renderWater() {
  const arr = state.water[todayKey()] || Array(12).fill(false);
  $("#waterCount").textContent = `${arr.filter(Boolean).length}/12`;
  $("#waterGrid").innerHTML = arr
    .map(
      (v, i) =>
        `<button class="cup ${v ? "done" : ""}" data-cup="${i}" type="button">${v ? "✓" : "💧"}</button>`,
    )
    .join("");
  $$("[data-cup]").forEach(
    (b) =>
      (b.onclick = () => {
        state.water[todayKey()] ??= Array(12).fill(false);
        state.water[todayKey()][+b.dataset.cup] =
          !state.water[todayKey()][+b.dataset.cup];
        save();
        renderWater();
      }),
  );
}
function renderPrograms() {
  $("#programList").innerHTML = state.programs
    .map(
      (p) => `
    <div class="program-card">
      <div><b>${esc(p.name)}</b><div class="task-details">${p.start || "—"} → ${p.end || "—"}</div></div>
      <div class="mini-actions">
        <button class="ghost" data-active="${p.id}" type="button">${isProgramActive(p.id) ? tr("active") : tr("activate")}</button>
        <button class="ghost" data-edit="${p.id}" type="button">${tr("edit")}</button>
      </div>
    </div>`,
    )
    .join("");
  $$("[data-active]").forEach(
    (b) =>
      (b.onclick = () => {
        toggleProgramActive(b.dataset.active);
      }),
  );
  $$("[data-edit]").forEach(
    (b) => (b.onclick = () => openEditor(b.dataset.edit)),
  );
}
function openEditor(id) {
  editingId = id;
  const p = id
    ? state.programs.find((x) => x.id === id)
    : {
        id: uid(),
        name: `P${state.programs.length + 1}`,
        start: todayKey(),
        end: "",
        instructionsAr: "",
        instructionsEn: "",
        tasks: structuredClone(p1Tasks).map((x) => ({ ...x, id: uid() })),
      };
  $("#programEditor").classList.remove("hidden");
  $("#editorTitle").textContent = id
    ? isAr()
      ? "تعديل البروجرام"
      : "Edit program"
    : isAr()
      ? "إضافة بروجرام جديد"
      : "Add new program";
  $("#programName").value = p.name;
  $("#programStart").value = p.start;
  $("#programEnd").value = p.end;
  $("#programInstructions").value = isAr()
    ? p.instructionsAr
    : p.instructionsEn;
  $("#taskEditor").innerHTML = p.tasks.map(taskForm).join("");
  bindTaskDelete();
  setTimeout(
    () =>
      $("#programEditor").scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    50,
  );
}
function typeOptions(current) {
  return ["meal", "med", "water", "snack", "walk", "stop"]
    .map(
      (t) =>
        `<option value="${t}" ${current === t ? "selected" : ""}>${tr(t)}</option>`,
    )
    .join("");
}
function taskForm(t) {
  const repeat = t.repeat || { enabled: false, everyHours: 8 };
  return `
  <div class="task-edit" data-task-row="${t.id}">
    <div class="grid-form">
      <label>${tr("alarmTime")}<input data-field="time" type="time" value="${esc(t.time)}" /></label>
      <label>${tr("alarmTitle")}<input data-field="title" value="${esc(field(t, "title"))}" /></label>
      <label>${tr("alarmType")}<select data-field="type">${typeOptions(t.type)}</select></label>
    </div>
    <label>${tr("alarmDetails")}<textarea data-field="details" rows="2">${esc(field(t, "details"))}</textarea></label>
    <div class="repeat-row">
      <label class="switch compact-switch"><input data-field="repeatEnabled" type="checkbox" ${repeat.enabled ? "checked" : ""} /> <span>🔁 ${tr("repeatEvery")}</span></label>
      <input data-field="repeatEvery" type="number" min="1" max="24" step="1" value="${esc(repeat.everyHours || 8)}" aria-label="repeat hours" />
      <span class="repeat-unit">${tr("repeatHours")}</span>
    </div>
    <p class="note">${tr("repeatHint")}</p>
    <button class="danger" data-del-task="${t.id}" type="button">${tr("delete")}</button>
  </div>`;
}
function collectEditor() {
  const lang = state.settings.lang;
  const existing = editingId
    ? state.programs.find((x) => x.id === editingId)
    : null;
  return {
    id: editingId || uid(),
    name: $("#programName").value || "Program",
    start: $("#programStart").value,
    end: $("#programEnd").value,
    instructionsAr:
      lang === "arz"
        ? $("#programInstructions").value
        : existing?.instructionsAr || "",
    instructionsEn:
      lang === "en"
        ? $("#programInstructions").value
        : existing?.instructionsEn || "",
    tasks: $$("[data-task-row]").map((row) => {
      const prev = existing?.tasks?.find((x) => x.id === row.dataset.taskRow);
      const title = row.querySelector("[data-field=title]").value;
      const details = row.querySelector("[data-field=details]").value;
      return {
        id: row.dataset.taskRow,
        time: row.querySelector("[data-field=time]").value,
        type: row.querySelector("[data-field=type]").value,
        titleAr: lang === "arz" ? title : prev?.titleAr || title,
        titleEn: lang === "en" ? title : prev?.titleEn || title,
        detailsAr: lang === "arz" ? details : prev?.detailsAr || details,
        detailsEn: lang === "en" ? details : prev?.detailsEn || details,
        repeat: {
          enabled: !!row.querySelector("[data-field=repeatEnabled]")?.checked,
          everyHours: Math.max(1, Number(row.querySelector("[data-field=repeatEvery]")?.value || 8)),
        },
      };
    }),
  };
}
function bindTaskDelete() {
  $$("[data-del-task]").forEach(
    (b) => (b.onclick = () => b.closest("[data-task-row]").remove()),
  );
}
function renderSnacks() {
  if (!state.snacks.length) {
    $("#snackGallery").innerHTML = `<p class="note">${tr("noSnacks")}</p>`;
    return;
  }
  $("#snackGallery").innerHTML = state.snacks
    .map(
      (s) =>
        `<div class="snack"><img src="${s.data}" alt="${esc(s.name || "snack")}"><button data-del-snack="${s.id}" type="button">${tr("delete")}</button></div>`,
    )
    .join("");
  $$("[data-del-snack]").forEach(
    (b) =>
      (b.onclick = () => {
        state.snacks = state.snacks.filter((s) => s.id !== b.dataset.delSnack);
        save();
        renderSnacks();
      }),
  );
}
async function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const max = 1000;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas
          .getContext("2d")
          .drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function renderWeights() {
  $("#weightList").innerHTML =
    state.weights
      .slice()
      .reverse()
      .map((w) => `<li>${esc(w.date)}: ${esc(w.value)} ${tr("kg")}</li>`)
      .join("") || `<li class="note">${tr("noWeights")}</li>`;
}

function toLocalDateInput(date){
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function parseDateOnly(str){
  const [y,m,d] = String(str || "").split("-").map(Number);
  if(!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function datesBetween(start, end){
  const out = [];
  const s = parseDateOnly(start);
  const e = parseDateOnly(end || start);
  if(!s || !e) return out;
  for(let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) out.push(new Date(d));
  return out;
}
function dateWithTaskTime(date, task){
  const [h,m] = task.time.split(":").map(Number);
  const out = new Date(date);
  out.setHours(h || 0, m || 0, 0, 0);
  return out;
}
function icsDate(dt){
  return dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
function icsEscape(v){
  return String(v || "").replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/\n/g,"\\n");
}
function programCalendarEvents(programs = activePrograms()){
  const list = Array.isArray(programs) ? programs : [programs];
  const events = [];
  list.forEach((program) => {
    const days = datesBetween(program.start, program.end);
    days.forEach(day => {
      const dateStr = toLocalDateInput(day);
      expandedTasksForDate(dateStr, [program]).forEach(task => {
        const start = dateWithTaskTime(day, task);
        const end = new Date(start.getTime() + 15 * 60 * 1000);
        events.push({program, task, start, end});
      });
    });
  });
  return events.sort((a,b)=>a.start-b.start);
}
function downloadActiveProgramCalendar(){
  const program = activeProgram();
  const events = programCalendarEvents(activePrograms());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Diet Planner//Diet Reminders//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  events.forEach(({task,start,end}) => {
    const title = `${icon(task.type)} ${field(task,"title")}`;
    const description = field(task,"details") || tr("reminder");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${task.id}-${start.getTime()}@diet-planner`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(start)}`,
      `DTEND:${icsDate(end)}`,
      `SUMMARY:${icsEscape(title)}`,
      `DESCRIPTION:${icsEscape(description)}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:-PT0M",
      `DESCRIPTION:${icsEscape(title)}`,
      "END:VALARM",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], {type:"text/calendar;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${activePrograms().map(p=>p.name).join("-") || "diet-program"}-reminders.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast(tr("calendarDownloaded"));
}
function ntfySettings(){
  state.settings.ntfy ??= {enabled:false, server:"https://ntfy.sh", topic:""};
  return state.settings.ntfy;
}
function cleanNtfyServer(v){
  return String(v || "https://ntfy.sh").trim().replace(/\/+$/, "") || "https://ntfy.sh";
}
function cleanTopic(v){
  return String(v || "").trim().replace(/[^a-zA-Z0-9_-]/g, "");
}
async function sendNtfyMessage({title, body, at, priority="5", tags="alarm_clock"}){
  const cfg = ntfySettings();
  const topic = cleanTopic(cfg.topic);
  if(!topic){ showToast(tr("ntfyTopicMissing")); return false; }
  const url = new URL(`${cleanNtfyServer(cfg.server)}/${topic}`);
  url.searchParams.set("title", title);
  url.searchParams.set("priority", priority);
  url.searchParams.set("tags", tags);
  if(at) url.searchParams.set("at", String(Math.floor(at.getTime() / 1000)));
  const res = await fetch(url.toString(), { method:"POST", body: body || title });
  if(!res.ok) throw new Error(`ntfy ${res.status}`);
  return true;
}
async function sendNtfyTest(){
  try{
    await sendNtfyMessage({
      title: isAr() ? "تجربة Diet Planner" : "Diet Planner test",
      body: isAr() ? "لو الإشعار وصل يبقى ntfy شغال ✅" : "If you got this, ntfy is working ✅",
      priority:"4",
      tags:"white_check_mark",
    });
    showToast(tr("ntfyTestSent"));
  }catch(err){
    console.error(err);
    showToast(tr("ntfyFailed"));
  }
}
function upcomingNtfyEvents(days = 3){
  const now = new Date();
  const limit = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return programCalendarEvents(activeProgram())
    .filter(e => e.start > now && e.start <= limit)
    .sort((a,b) => a.start - b.start);
}
async function scheduleNtfyReminders(){
  if(!ntfySettings().enabled){ showToast(tr("ntfySaved")); return; }
  const events = upcomingNtfyEvents(3);
  if(!events.length){ showToast(isAr() ? "مفيش منبهات قريبة للجدولة" : "No upcoming reminders to schedule"); return; }
  let count = 0;
  try{
    for(const {task,start} of events){
      await sendNtfyMessage({
        title: `${icon(task.type)} ${field(task,"title")}`,
        body: field(task,"details") || tr("reminder"),
        at: start,
        priority: task.type === "med" ? "5" : "4",
        tags: task.type === "med" ? "pill,alarm_clock" : "alarm_clock",
      });
      count++;
    }
    showToast(`${tr("ntfyScheduled")} (${count})`);
  }catch(err){
    console.error(err);
    showToast(tr("ntfyFailed"));
  }
}
function renderSettingsControls(){
  const cfg = ntfySettings();
  const sound = $("#soundToggle");
  const vibrate = $("#vibrateToggle");
  const enabled = $("#ntfyEnabled");
  const server = $("#ntfyServer");
  const topic = $("#ntfyTopic");
  if(sound) sound.checked = state.settings.sound;
  if(vibrate) vibrate.checked = state.settings.vibrate;
  if(enabled) enabled.checked = !!cfg.enabled;
  if(server) server.value = cleanNtfyServer(cfg.server);
  if(topic) topic.value = cfg.topic || "";
}

function googleDatePart(dateStr, timeStr){
  const [y,m,d] = String(dateStr).split('-');
  const [hh,mm] = String(timeStr || '00:00').split(':');
  return `${y}${m}${d}T${hh}${mm}00`;
}
function addMinutesToDateTime(dateStr, timeStr, minutes=15){
  const [y,m,d] = String(dateStr).split('-').map(Number);
  const [hh,mm] = String(timeStr || '00:00').split(':').map(Number);
  const dt = new Date(y, m - 1, d, hh || 0, mm || 0, 0, 0);
  dt.setMinutes(dt.getMinutes() + minutes);
  const yy = dt.getFullYear();
  const mo = String(dt.getMonth() + 1).padStart(2,'0');
  const da = String(dt.getDate()).padStart(2,'0');
  const h = String(dt.getHours()).padStart(2,'0');
  const mi = String(dt.getMinutes()).padStart(2,'0');
  return `${yy}${mo}${da}T${h}${mi}00`;
}
function googleCalendarUrl(task, dateStr){
  const title = `${icon(task.type)} ${field(task,'title')}`;
  const details = field(task,'details') || tr('reminder');
  const start = googleDatePart(dateStr, task.time);
  const end = addMinutesToDateTime(dateStr, task.time, 15);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details,
    ctz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function openTaskInGoogleCalendar(taskId, dateStr){
  const task = expandedTasksForDate(dateStr).find((t) => t.id === taskId);
  if(!task) return;
  window.open(googleCalendarUrl(task, dateStr), '_blank', 'noopener,noreferrer');
}
function renderGoogleCalendarLinks(){
  const box = $('#googleCalendarLinks');
  if(!box) return;
  const dateStr = todayKey();
  box.innerHTML = expandedTasksForDate(dateStr)
    .map((task)=>`<a class="gcal-link" target="_blank" rel="noopener" href="${googleCalendarUrl(task,dateStr)}">📅 ${formatTime(task.time)} - ${activePrograms().length > 1 ? esc(task.programName) + ' - ' : ''}${esc(field(task,'title'))}</a>`)
    .join('');
}

function googleCalendarSettings(){
  state.settings.googleCalendar ??= { synced:{}, connected:false };
  state.settings.googleCalendar.synced ??= {};
  return state.settings.googleCalendar;
}
function googleSyncId(task, dateStr){
  return `${dateStr}__${task.id}`;
}
function googleApiReady(){
  return !!(window.google?.accounts?.oauth2);
}
function ensureGoogleToken(){
  return new Promise((resolve, reject) => {
    if(googleAccessToken) return resolve(googleAccessToken);
    if(!googleApiReady()) return reject(new Error('Google Identity Services is not loaded'));
    googleTokenClient ||= google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: GOOGLE_CALENDAR_SCOPE,
      callback: (tokenResponse) => {
        if(tokenResponse?.error) return reject(new Error(tokenResponse.error));
        googleAccessToken = tokenResponse.access_token;
        googleCalendarSettings().connected = true;
        save();
        resolve(googleAccessToken);
      },
    });
    googleTokenClient.requestAccessToken({ prompt: googleCalendarSettings().connected ? '' : 'consent' });
  });
}
function googleEventPayload(task, dateStr){
  const [y,m,d] = String(dateStr).split('-').map(Number);
  const [hh,mm] = String(task.time || '00:00').split(':').map(Number);
  const start = new Date(y, m - 1, d, hh || 0, mm || 0, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 15);
  const programPrefix = activePrograms().length > 1 && task.programName ? `${task.programName} - ` : '';
  return {
    summary: `${icon(task.type)} ${programPrefix}${field(task,'title')}`,
    description: `${field(task,'details') || tr('reminder')}\n\nCreated by Diet Planner`,
    start: { dateTime: start.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo' },
    end: { dateTime: end.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo' },
    reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 5 }] },
    extendedProperties: { private: { dietPlannerId: googleSyncId(task, dateStr), programId: task.programId || '', taskId: task.baseTaskId || task.id } },
  };
}
async function googleCalendarRequest(path, options = {}){
  const token = await ensureGoogleToken();
  const res = await fetch(`https://www.googleapis.com/calendar/v3${path}${path.includes('?') ? '&' : '?'}key=${encodeURIComponent(GOOGLE_API_KEY)}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if(res.status === 401){
    googleAccessToken = null;
  }
  if(!res.ok){
    const text = await res.text().catch(()=> '');
    throw new Error(`Google Calendar ${res.status}: ${text}`);
  }
  if(res.status === 204) return null;
  return res.json();
}
function programDates(programs = activePrograms()){
  const dates = [];
  programs.forEach((p) => {
    if(!p.start || !p.end) return;
    const start = new Date(`${p.start}T00:00:00`);
    const end = new Date(`${p.end}T00:00:00`);
    for(const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)){
      dates.push(d.toISOString().slice(0,10));
    }
  });
  return [...new Set(dates)].sort();
}
function googleSyncTasks(){
  return programDates(activePrograms()).flatMap((dateStr) => expandedTasksForDate(dateStr, activePrograms()).map((task) => ({task, dateStr})));
}
async function connectGoogleCalendar(){
  try{
    await ensureGoogleToken();
    showToast(tr('googleConnected'));
    renderSettingsControls();
  }catch(err){
    console.error(err);
    showToast(tr('googleSyncFailed'));
  }
}
async function syncGoogleCalendar(){
  if(!confirm(tr('googleAddNotice'))) return;
  const cfg = googleCalendarSettings();
  showToast(tr('googleSyncing'));
  try{
    await ensureGoogleToken();
    const items = googleSyncTasks();
    for(const {task, dateStr} of items){
      const syncId = googleSyncId(task, dateStr);
      const payload = googleEventPayload(task, dateStr);
      const oldEventId = cfg.synced[syncId];
      if(oldEventId){
        try{
          const updated = await googleCalendarRequest(`/calendars/primary/events/${encodeURIComponent(oldEventId)}`, { method:'PATCH', body: JSON.stringify(payload) });
          cfg.synced[syncId] = updated.id;
          continue;
        }catch(err){
          console.warn('Google event update failed; recreating', syncId, err);
        }
      }
      const created = await googleCalendarRequest(`/calendars/primary/events`, { method:'POST', body: JSON.stringify(payload) });
      cfg.synced[syncId] = created.id;
    }
    cfg.connected = true;
    save();
    renderTimeline();
    renderSettingsControls();
    showToast(`${tr('googleSynced')} (${items.length})`);
  }catch(err){
    console.error(err);
    showToast(tr('googleSyncFailed'));
  }
}
async function removeSyncedGoogleEvents(){
  const cfg = googleCalendarSettings();
  const entries = Object.entries(cfg.synced || {});
  if(!entries.length){ showToast(isAr() ? 'مفيش أحداث متزامنة' : 'No synced events'); return; }
  try{
    await ensureGoogleToken();
    for(const [, eventId] of entries){
      try{ await googleCalendarRequest(`/calendars/primary/events/${encodeURIComponent(eventId)}`, { method:'DELETE' }); }catch(err){ console.warn('delete failed', eventId, err); }
    }
    cfg.synced = {};
    save();
    renderTimeline();
    renderSettingsControls();
    showToast(tr('googleRemoved'));
  }catch(err){
    console.error(err);
    showToast(tr('googleSyncFailed'));
  }
}
function isGoogleSynced(task, dateStr = todayKey()){
  return !!googleCalendarSettings().synced?.[googleSyncId(task, dateStr)];
}

function markTaskDone(taskId, dateStr = todayKey()){
  state.done[dateStr] ??= {};
  state.done[dateStr][taskId] = true;
  if(state.snoozes?.[dateStr]) delete state.snoozes[dateStr][taskId];
  save();
  renderTimeline();
  showToast(tr('taskDone'));
}
function findTaskById(taskId, dateStr = todayKey()){
  const expanded = expandedTasksForDate(dateStr, state.programs).find((t)=>t.id === taskId);
  if(expanded) return expanded;
  for(const program of state.programs){
    const task = program.tasks.find((t)=>t.id === taskId || t.id === String(taskId).split("__")[1]);
    if(task) return {...task, programId: program.id, programName: program.name, baseTaskId: task.id};
  }
  return null;
}
function snoozeTask(taskId, dateStr = todayKey()){
  const task = findTaskById(taskId, dateStr);
  if(!task) return;
  state.snoozes ??= {};
  state.snoozes[dateStr] ??= {};
  const count = state.snoozes[dateStr][taskId] || 0;
  if(count >= 3){
    showToast(tr('snoozeLimit'));
    return;
  }
  state.snoozes[dateStr][taskId] = count + 1;
  save();
  showToast(tr('snoozed'));
  timers.push(setTimeout(()=>notifyTask(task, dateStr), 5 * 60 * 1000));
}
function handleAlarmAction(action, taskId, dateStr){
  if(!taskId) return;
  if(action === 'done') markTaskDone(taskId, dateStr || todayKey());
  if(action === 'snooze') snoozeTask(taskId, dateStr || todayKey());
}
function handleAlarmActionFromUrl(){
  const params = new URLSearchParams(location.search);
  const action = params.get('alarmAction');
  const taskId = params.get('taskId');
  const dateStr = params.get('date') || todayKey();
  if(action && taskId){
    handleAlarmAction(action, taskId, dateStr);
    history.replaceState({}, document.title, location.pathname + location.hash);
  }
}

async function askNotify() {
  if (!("Notification" in window)) {
    showToast(tr("notSupported"));
    return;
  }
  const permission = await Notification.requestPermission();
  showToast(permission === "granted" ? tr("notifyOn") : tr("notifyOff"));
  scheduleTodayAlarms();
}
function scheduleTodayAlarms() {
  timers.forEach(clearTimeout);
  timers = [];
  if (!("Notification" in window) || Notification.permission !== "granted")
    return;
  const now = new Date();
  expandedTasksForDate(todayKey()).forEach((t) => {
    const [h, m] = t.time.split(":").map(Number);
    const when = new Date();
    when.setHours(h, m, 0, 0);
    const diff = when - now;
    if (diff > 0 && diff < 86400000)
      timers.push(setTimeout(() => notifyTask(t), diff));
  });
}
function notifyTask(t, dateStr = todayKey()) {
  if (state.settings.sound)
    $("#alarmAudio")
      .play()
      .catch(() => {});
  if (state.settings.vibrate && navigator.vibrate)
    navigator.vibrate([300, 120, 300]);

  state.snoozes ??= {};
  state.snoozes[dateStr] ??= {};
  const snoozeCount = state.snoozes[dateStr][t.id] || 0;
  const title = `${icon(t.type)} ${field(t, "title")}`;
  const body = field(t, "details") || tr("reminder");
  const actions = snoozeCount >= 3
    ? [{ action: "done", title: tr("doneAction") }]
    : [
        { action: "done", title: tr("doneAction") },
        { action: "snooze", title: tr("snoozeAction") },
      ];
  const payload = {
    type: "NOTIFY",
    title,
    body,
    tag: `diet-${dateStr}-${t.id}`,
    actions,
    requireInteraction: true,
    data: { taskId: t.id, date: dateStr, snoozeCount },
  };
  if (navigator.serviceWorker?.controller)
    navigator.serviceWorker.controller.postMessage(payload);
  else new Notification(title, { body, tag: payload.tag, actions, requireInteraction: true, data: payload.data });
}

$$(".tab").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".tab").forEach((x) => x.classList.remove("active"));
      $$(".page").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      $("#" + b.dataset.tab).classList.add("active");
    }),
);
$("#langToggle").onclick = () => {
  state.settings.lang = state.settings.lang === "arz" ? "en" : "arz";
  save();
  render();
};
$("#themeToggle").onclick = () => {
  state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
  save();
  render();
};
$("#notifyBtn").onclick = askNotify;
$("#resetToday").onclick = () => {
  delete state.done[todayKey()];
  delete state.water[todayKey()];
  delete state.snoozes?.[todayKey()];
  save();
  render();
};
$("#saveWeight").onclick = () => {
  const v = $("#weightInput").value;
  if (!v) return;
  state.weights.push({
    date: new Date().toLocaleString(isAr() ? "ar-EG" : "en-US"),
    value: v,
  });
  $("#weightInput").value = "";
  save();
  renderWeights();
  showToast(tr("saved"));
};
$("#addProgramBtn").onclick = () => openEditor(null);
$("#cancelProgram").onclick = () => $("#programEditor").classList.add("hidden");
$("#addTask").onclick = () => {
  $("#taskEditor").insertAdjacentHTML(
    "beforeend",
    taskForm({
      id: uid(),
      time: "12:00",
      type: "meal",
      titleAr: tr("newAlarm"),
      titleEn: tr("newAlarm"),
      detailsAr: "",
      detailsEn: "",
      repeat: { enabled: false, everyHours: 8 },
    }),
  );
  bindTaskDelete();
};
$("#saveProgram").onclick = () => {
  const p = collectEditor();
  const i = state.programs.findIndex((x) => x.id === p.id);
  if (i >= 0) state.programs[i] = p;
  else {
    state.programs.push(p);
    state.activeProgramIds = Array.isArray(state.activeProgramIds) ? state.activeProgramIds : [];
    state.activeProgramIds.push(p.id);
    state.activeProgramId = p.id;
  }
  save();
  $("#programEditor").classList.add("hidden");
  render();
  showToast(tr("saved"));
};
$("#snackUpload").onchange = async (e) => {
  for (const f of e.target.files) {
    const data = await compressImage(f);
    state.snacks.push({ id: uid(), name: f.name, data });
  }
  e.target.value = "";
  save();
  renderSnacks();
  showToast(tr("imagesSaved"));
};
$("#soundToggle").onchange = (e) => {
  state.settings.sound = e.target.checked;
  save();
};
$("#vibrateToggle").onchange = (e) => {
  state.settings.vibrate = e.target.checked;
  save();
};
$("#downloadCalendar").onclick = downloadActiveProgramCalendar;
$("#showGoogleLinks") && ($("#showGoogleLinks").onclick = renderGoogleCalendarLinks);
$("#saveNtfy").onclick = () => {
  const cfg = ntfySettings();
  cfg.enabled = $("#ntfyEnabled").checked;
  cfg.server = cleanNtfyServer($("#ntfyServer").value);
  cfg.topic = cleanTopic($("#ntfyTopic").value);
  $("#ntfyTopic").value = cfg.topic;
  save();
  showToast(tr("ntfySaved"));
};
$("#testNtfy").onclick = async () => {
  const cfg = ntfySettings();
  cfg.enabled = $("#ntfyEnabled").checked;
  cfg.server = cleanNtfyServer($("#ntfyServer").value);
  cfg.topic = cleanTopic($("#ntfyTopic").value);
  save();
  await sendNtfyTest();
};
$("#scheduleNtfy").onclick = async () => {
  const cfg = ntfySettings();
  cfg.enabled = $("#ntfyEnabled").checked;
  cfg.server = cleanNtfyServer($("#ntfyServer").value);
  cfg.topic = cleanTopic($("#ntfyTopic").value);
  save();
  await scheduleNtfyReminders();
};

$("#connectGoogle") && ($("#connectGoogle").onclick = connectGoogleCalendar);
$("#syncGoogle") && ($("#syncGoogle").onclick = syncGoogleCalendar);
$("#resyncGoogle") && ($("#resyncGoogle").onclick = syncGoogleCalendar);
$("#removeGoogleEvents") && ($("#removeGoogleEvents").onclick = removeSyncedGoogleEvents);
$("#exportData").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }),
  );
  a.download = "diet-backup.json";
  a.click();
};
$("#importData").onchange = (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    state = mergeState(JSON.parse(r.result));
    save();
    render();
    showToast(tr("imported"));
  };
  r.readAsText(f);
};
$("#clearAll").onclick = () => {
  if (confirm(tr("confirmClear"))) {
    localStorage.removeItem(KEY);
    state = structuredClone(defaultState);
    save();
    render();
  }
};
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#installBtn").classList.remove("hidden");
});
$("#installBtn").onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
    $("#installBtn").classList.add("hidden");
  }
};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then((reg) => {
    reg.addEventListener("updatefound", () => {
      const worker = reg.installing;

      worker?.addEventListener("statechange", () => {
        if (
          worker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          worker.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}
renderSettingsControls();
render();
