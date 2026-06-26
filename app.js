const KEY = "DietPwa.v2";
const oldKey = "DietPwa.v1";
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const todayKey = () => new Date().toISOString().slice(0, 10);
const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());

const i18n = {
  arz: {
    appSubtitle: "دايت + أدوية + منبهات",
    appTitle: "Diet Planner",
    install: "تثبيت",
    activeProgram: "البروجرام الحالي",
    enableNotifications: "فعّل الإشعارات",
    today: "النهاردة",
    programs: "البروجرامات",
    snacks: "الاسناكس",
    settings: "الإعدادات",
    todayAlarms: "منبهات النهاردة",
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
  settings: { sound: true, vibrate: true, theme: "light", lang: "arz" },
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
  merged.settings = { ...defaultState.settings, ...(data.settings || {}) };
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
    })),
  };
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}
function activeProgram() {
  return (
    state.programs.find((p) => p.id === state.activeProgramId) ||
    state.programs[0]
  );
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
  const p = activeProgram();
  $("#activeProgramTitle").textContent = p.name;
  $("#programDates").textContent =
    `${tr("from")} ${formatDateShort(p.start)} ${tr("to")} ${formatDateShort(p.end)}`;
}
function renderTimeline() {
  const p = activeProgram();
  const done = state.done[todayKey()] || {};
  $("#timeline").innerHTML = [...p.tasks]
    .sort((a, b) => a.time.localeCompare(b.time))
    .map(
      (t) => `
    <div class="task ${done[t.id] ? "done" : ""}">
      <button class="check" data-done="${t.id}" type="button" aria-label="done">${done[t.id] ? "✓" : ""}</button>
      <div class="task-copy"><div class="task-title">${icon(t.type)} ${esc(field(t, "title"))}</div><div class="task-details">${esc(field(t, "details"))}</div></div>
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
        <button class="ghost" data-active="${p.id}" type="button">${p.id === state.activeProgramId ? tr("active") : tr("activate")}</button>
        <button class="ghost" data-edit="${p.id}" type="button">${tr("edit")}</button>
      </div>
    </div>`,
    )
    .join("");
  $$("[data-active]").forEach(
    (b) =>
      (b.onclick = () => {
        state.activeProgramId = b.dataset.active;
        save();
        render();
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
  return `
  <div class="task-edit" data-task-row="${t.id}">
    <div class="grid-form">
      <label>${tr("alarmTime")}<input data-field="time" type="time" value="${esc(t.time)}" /></label>
      <label>${tr("alarmTitle")}<input data-field="title" value="${esc(field(t, "title"))}" /></label>
      <label>${tr("alarmType")}<select data-field="type">${typeOptions(t.type)}</select></label>
    </div>
    <label>${tr("alarmDetails")}<textarea data-field="details" rows="2">${esc(field(t, "details"))}</textarea></label>
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
  activeProgram().tasks.forEach((t) => {
    const [h, m] = t.time.split(":").map(Number);
    const when = new Date();
    when.setHours(h, m, 0, 0);
    const diff = when - now;
    if (diff > 0 && diff < 86400000)
      timers.push(setTimeout(() => notifyTask(t), diff));
  });
}
function notifyTask(t) {
  if (state.settings.sound)
    $("#alarmAudio")
      .play()
      .catch(() => {});
  if (state.settings.vibrate && navigator.vibrate)
    navigator.vibrate([300, 120, 300]);
  const title = `${icon(t.type)} ${field(t, "title")}`;
  const body = field(t, "details") || tr("reminder");
  if (navigator.serviceWorker?.controller)
    navigator.serviceWorker.controller.postMessage({
      type: "NOTIFY",
      title,
      body,
      tag: t.id,
    });
  else new Notification(title, { body, tag: t.id });
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
$("#soundToggle").checked = state.settings.sound;
$("#vibrateToggle").checked = state.settings.vibrate;
render();
