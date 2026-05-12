// ============================================================
// GYMLOG — APP LOGIC v2
// ============================================================

// ── Estado global ─────────────────────────────────────────
let currentMuscle = null;
let selectedExercises = [];
let activeWorkout = null;
let timerInterval = null;
let timerSeconds = 0;
let currentExerciseList = [];
let currentUser = null; // logged-in Supabase user

// ── Rest Timer state ──────────────────────────────────────
let restInterval = null;
let restRemaining = 0;
let restTotal = 90;
let restEnabled = true;

// ── Navegación ────────────────────────────────────────────
const NAV_SCREENS = ["screen-home", "screen-add", "screen-stats", "screen-history"];
const HIDE_NAV_SCREENS = ["screen-workout", "screen-summary", "screen-exercises", "screen-auth"];

function goTo(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (!target) return;
  target.classList.add("active");
  target.classList.add("slide-in");
  setTimeout(() => target.classList.remove("slide-in"), 400);

  const nav = document.getElementById("bottom-nav");
  if (HIDE_NAV_SCREENS.includes(screenId)) {
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }

  if (screenId === "screen-history") renderHistory();
  if (screenId === "screen-home") renderHome();
  if (screenId === "screen-stats") renderStats();
}

function goToNav(screenId) {
  goTo(screenId);
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });
}

// ── Pantalla Inicio ───────────────────────────────────────
function renderHome() {
  renderTodaySummary();
  renderQuickStats();
}

function renderTodaySummary() {
  const history = getHistory();
  const today = new Date().toDateString();
  const todayWorkouts = history.filter(w => new Date(w.date).toDateString() === today);

  const summary = document.getElementById("today-summary");
  const content = document.getElementById("today-content");

  if (todayWorkouts.length === 0) {
    summary.classList.add("hidden");
    return;
  }
  summary.classList.remove("hidden");
  content.innerHTML = todayWorkouts.map(w => `
    <div class="today-item">
      <span class="today-muscle">${MUSCLE_GROUPS.find(m => m.id === w.muscle)?.name || w.muscle}</span>
      <span class="today-count">${w.exercises.length} ejercicios · ${w.duration}</span>
    </div>
  `).join("");
}

function renderQuickStats() {
  const history = getHistory();
  const el = document.getElementById("home-quick-stats");
  if (history.length === 0) { el.classList.add("hidden"); return; }
  el.classList.remove("hidden");

  const streak = calculateStreak(history);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const thisWeek = history.filter(w => new Date(w.date) >= weekStart).length;

  document.getElementById("qs-streak").textContent = streak;
  document.getElementById("qs-total").textContent = history.length;
  document.getElementById("qs-week").textContent = thisWeek;
}

// ── Pantalla Añadir ───────────────────────────────────────
function initMuscleGrid() {
  const grid = document.getElementById("muscle-grid");
  grid.innerHTML = MUSCLE_GROUPS.map(m => `
    <button class="muscle-card" onclick="selectMuscle('${m.id}')" style="--accent:${m.color}">
      <span class="muscle-icon">${m.icon}</span>
      <span class="muscle-name">${m.name}</span>
    </button>
  `).join("");
}

// ── Ejercicios personalizados ─────────────────────────────
function getCustomExercises(muscleId) {
  try {
    const all = JSON.parse(localStorage.getItem("gymlog_custom_exercises") || "{}");
    return all[muscleId] || [];
  } catch { return []; }
}

function saveCustomExercise(muscleId, exercise) {
  try {
    const all = JSON.parse(localStorage.getItem("gymlog_custom_exercises") || "{}");
    if (!all[muscleId]) all[muscleId] = [];
    all[muscleId].push(exercise);
    localStorage.setItem("gymlog_custom_exercises", JSON.stringify(all));
  } catch {}
}

function openCustomExForm() {
  document.getElementById("custom-ex-form").classList.remove("hidden");
  document.getElementById("btn-add-custom-ex").classList.add("hidden");
  document.getElementById("custom-ex-name").value = "";
  document.getElementById("custom-ex-desc").value = "";
  document.getElementById("custom-ex-name").focus();
}

function closeCustomExForm() {
  document.getElementById("custom-ex-form").classList.add("hidden");
  document.getElementById("btn-add-custom-ex").classList.remove("hidden");
}

function confirmCustomExercise() {
  const nameEl = document.getElementById("custom-ex-name");
  const name = nameEl.value.trim();
  if (!name) {
    nameEl.classList.add("input-error");
    setTimeout(() => nameEl.classList.remove("input-error"), 800);
    nameEl.focus();
    return;
  }
  const desc = document.getElementById("custom-ex-desc").value.trim();
  const exercise = {
    id: `custom_${Date.now()}`,
    name,
    desc: desc || "Ejercicio personalizado",
    img: "",
    custom: true,
  };
  saveCustomExercise(currentMuscle, exercise);
  currentExerciseList.push(exercise);
  closeCustomExForm();
  renderExerciseList(currentExerciseList);
  toggleExercise(exercise.id);
}

function selectMuscle(muscleId) {
  currentMuscle = muscleId;
  selectedExercises = [];
  const muscle = MUSCLE_GROUPS.find(m => m.id === muscleId);
  document.getElementById("exercises-title").textContent = muscle.name;
  document.getElementById("exercise-search").value = "";
  closeCustomExForm();

  currentExerciseList = [...(EXERCISES[muscleId] || []), ...getCustomExercises(muscleId)];
  renderExerciseList(currentExerciseList);
  updateStartBtn();
  goTo("screen-exercises");
}

function filterExercises(query) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? currentExerciseList.filter(ex => ex.name.toLowerCase().includes(q) || ex.desc.toLowerCase().includes(q))
    : currentExerciseList;
  renderExerciseList(filtered);
}

function renderExerciseList(exercises) {
  const list = document.getElementById("exercises-list");
  if (exercises.length === 0) {
    list.innerHTML = `<p class="empty-state" style="padding:24px 0">No se encontraron ejercicios.</p>`;
    return;
  }
  list.innerHTML = exercises.map(ex => {
    const isSelected = selectedExercises.includes(ex.id);
    const imgBlock = ex.img
      ? `<img class="exercise-thumb" src="${ex.img}" alt="${ex.name}"
          onerror="this.style.display='none';this.parentElement.classList.add('img-failed')" loading="lazy" />
         <button class="exercise-img-btn" onclick="event.stopPropagation(); openModal('${ex.id}')">🔍</button>`
      : `<div class="exercise-thumb-placeholder">🏋️</div>`;
    const badge = ex.custom ? `<span class="exercise-card-badge">CUSTOM</span>` : "";
    return `
    <div class="exercise-card${isSelected ? " selected" : ""}" id="ex-card-${ex.id}" onclick="toggleExercise('${ex.id}')">
      <div class="exercise-card-img-wrap">
        ${imgBlock}
        ${badge}
      </div>
      <div class="exercise-card-info">
        <h3 class="exercise-name">${ex.name}</h3>
        <p class="exercise-desc">${(ex.desc || "").substring(0, 70)}${ex.desc && ex.desc.length > 70 ? "…" : ""}</p>
      </div>
      <div class="exercise-check${isSelected ? " visible" : ""}" id="check-${ex.id}">✓</div>
    </div>
  `}).join("");
}

function toggleExercise(exId) {
  const idx = selectedExercises.indexOf(exId);
  const card = document.getElementById(`ex-card-${exId}`);
  const check = document.getElementById(`check-${exId}`);
  if (idx === -1) {
    selectedExercises.push(exId);
    card?.classList.add("selected");
    check?.classList.add("visible");
  } else {
    selectedExercises.splice(idx, 1);
    card?.classList.remove("selected");
    check?.classList.remove("visible");
  }
  updateStartBtn();
}

function updateStartBtn() {
  const btn = document.getElementById("start-workout-btn");
  const n = selectedExercises.length;
  btn.textContent = n === 0 ? "Selecciona ejercicios" : `Iniciar con ${n} ejercicio${n > 1 ? "s" : ""}`;
  btn.disabled = n === 0;
}

// ── Entrenamiento Activo ──────────────────────────────────
function startWorkout() {
  if (selectedExercises.length === 0) return;

  const muscle = MUSCLE_GROUPS.find(m => m.id === currentMuscle);
  activeWorkout = {
    id: Date.now(),
    date: new Date().toISOString(),
    muscle: currentMuscle,
    exercises: selectedExercises.map(exId => {
      const ex = currentExerciseList.find(e => e.id === exId)
            || (EXERCISES[currentMuscle] || []).find(e => e.id === exId)
            || getCustomExercises(currentMuscle).find(e => e.id === exId);
      return { id: exId, name: ex?.name || exId, img: ex?.img || "", sets: [], notes: "" };
    }),
  };

  document.getElementById("workout-muscle-label").textContent = muscle.name;
  updateRestToggleBtn();
  startTimer();
  renderWorkoutBody();
  goTo("screen-workout");
}

function renderWorkoutBody() {
  const body = document.getElementById("workout-body");
  body.innerHTML = activeWorkout.exercises.map((ex, exIdx) => {
    const lastSets = getLastSessionForExercise(ex.id);
    const lastRef = lastSets
      ? `<div class="last-session-ref">
          <span class="last-session-label">ÚLTIMA VEZ</span>
          <span class="last-session-sets">${lastSets.slice(0, 5).map(s => `${s.kg > 0 ? s.kg + "kg×" : ""}${s.reps}`).join(" · ")}</span>
        </div>`
      : "";

    return `
    <div class="workout-exercise" id="workout-ex-${exIdx}">
      <div class="workout-ex-header">
        <img class="workout-ex-thumb" src="${ex.img}" alt="${ex.name}"
          onerror="this.style.display='none'" />
        <div class="workout-ex-info">
          <h3 class="workout-ex-name">${ex.name}</h3>
          <span class="workout-ex-sets-count" id="sets-count-${exIdx}">0 series</span>
        </div>
      </div>

      ${lastRef}

      <div class="sets-table">
        <div class="sets-header">
          <span>#</span><span>Kg</span><span>Reps</span><span>Vol</span><span></span>
        </div>
        <div class="sets-rows" id="sets-rows-${exIdx}"></div>
      </div>

      <div class="add-set-row">
        <span class="set-num" id="set-num-${exIdx}">1</span>
        <input type="number" id="kg-${exIdx}" class="set-input" placeholder="Kg" min="0" step="0.5"
          onkeydown="if(event.key==='Enter') document.getElementById('reps-${exIdx}').focus()" />
        <input type="number" id="reps-${exIdx}" class="set-input" placeholder="Reps" min="1"
          onkeydown="if(event.key==='Enter') addSet(${exIdx})" />
        <button class="btn-add-set" onclick="addSet(${exIdx})">＋</button>
      </div>

      <div class="ex-volume-row hidden" id="ex-vol-${exIdx}">
        <span class="ex-vol-label">Volumen total:</span>
        <span class="ex-vol-val" id="ex-vol-val-${exIdx}">0 kg</span>
      </div>

      <textarea class="workout-notes" id="notes-${exIdx}" placeholder="Notas del ejercicio…"
        oninput="saveNotes(${exIdx}, this.value)" rows="2">${ex.notes || ""}</textarea>
    </div>
  `}).join("");
}

function saveNotes(exIdx, value) {
  if (activeWorkout?.exercises[exIdx]) {
    activeWorkout.exercises[exIdx].notes = value;
  }
}

function addSet(exIdx) {
  const kgInput = document.getElementById(`kg-${exIdx}`);
  const repsInput = document.getElementById(`reps-${exIdx}`);
  const kg = parseFloat(kgInput.value);
  const reps = parseInt(repsInput.value);

  if (isNaN(reps) || reps < 1) {
    repsInput.focus();
    repsInput.classList.add("input-error");
    setTimeout(() => repsInput.classList.remove("input-error"), 800);
    return;
  }

  const set = { kg: isNaN(kg) ? 0 : kg, reps };
  activeWorkout.exercises[exIdx].sets.push(set);
  const setNum = activeWorkout.exercises[exIdx].sets.length;
  const vol = set.kg * set.reps;

  // Render row
  const row = document.createElement("div");
  row.className = "set-row animate-in";
  row.id = `set-row-${exIdx}-${setNum - 1}`;
  row.innerHTML = `
    <span class="set-row-num">${setNum}</span>
    <span class="set-row-kg">${set.kg > 0 ? set.kg + " kg" : "—"}</span>
    <span class="set-row-reps">${set.reps} reps</span>
    <span class="set-row-vol">${vol > 0 ? vol : "—"}</span>
    <button class="set-row-del" onclick="deleteSet(${exIdx}, ${setNum - 1})">✕</button>
  `;
  document.getElementById(`sets-rows-${exIdx}`).appendChild(row);

  // Update counter
  document.getElementById(`sets-count-${exIdx}`).textContent = `${setNum} serie${setNum > 1 ? "s" : ""}`;
  document.getElementById(`set-num-${exIdx}`).textContent = setNum + 1;

  // Update exercise volume
  updateExerciseVolume(exIdx);

  // Pre-fill kg for next set
  kgInput.value = set.kg > 0 ? set.kg : "";
  repsInput.value = "";
  repsInput.focus();

  // Check PR
  const exId = activeWorkout.exercises[exIdx].id;
  if (checkAndUpdatePR(exId, set.kg, set.reps)) showPRToast();

  // Start rest timer
  if (restEnabled) startRestTimer(restTotal);
}

function updateExerciseVolume(exIdx) {
  const sets = activeWorkout.exercises[exIdx].sets;
  const vol = sets.reduce((sum, s) => sum + (s.kg || 0) * s.reps, 0);
  const volRow = document.getElementById(`ex-vol-${exIdx}`);
  const volVal = document.getElementById(`ex-vol-val-${exIdx}`);
  if (vol > 0 && volRow && volVal) {
    volRow.classList.remove("hidden");
    volVal.textContent = vol + " kg";
  }
}

function deleteSet(exIdx, setIdx) {
  activeWorkout.exercises[exIdx].sets.splice(setIdx, 1);
  const rowsContainer = document.getElementById(`sets-rows-${exIdx}`);
  rowsContainer.innerHTML = "";
  activeWorkout.exercises[exIdx].sets.forEach((set, i) => {
    const vol = set.kg * set.reps;
    const row = document.createElement("div");
    row.className = "set-row";
    row.id = `set-row-${exIdx}-${i}`;
    row.innerHTML = `
      <span class="set-row-num">${i + 1}</span>
      <span class="set-row-kg">${set.kg > 0 ? set.kg + " kg" : "—"}</span>
      <span class="set-row-reps">${set.reps} reps</span>
      <span class="set-row-vol">${vol > 0 ? vol : "—"}</span>
      <button class="set-row-del" onclick="deleteSet(${exIdx}, ${i})">✕</button>
    `;
    rowsContainer.appendChild(row);
  });
  const total = activeWorkout.exercises[exIdx].sets.length;
  document.getElementById(`sets-count-${exIdx}`).textContent = `${total} serie${total !== 1 ? "s" : ""}`;
  document.getElementById(`set-num-${exIdx}`).textContent = total + 1;
  updateExerciseVolume(exIdx);
}

// ── Timer ─────────────────────────────────────────────────
function startTimer() {
  timerSeconds = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds++;
    document.getElementById("workout-timer").textContent = formatTime(timerSeconds);
  }, 1000);
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

// ── Finalizar ─────────────────────────────────────────────
function confirmFinishWorkout() {
  const totalSets = activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  if (totalSets === 0 && !confirm("No has registrado ninguna serie. ¿Salir de todas formas?")) return;
  finishWorkout();
}

function finishWorkout() {
  clearInterval(timerInterval);
  skipRestTimer();
  activeWorkout.duration = formatTime(timerSeconds);
  activeWorkout.totalSets = activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  activeWorkout.totalVolume = activeWorkout.exercises.reduce((acc, ex) =>
    acc + ex.sets.reduce((s, set) => s + (set.kg || 0) * set.reps, 0), 0);

  saveWorkout(activeWorkout);
  renderSummary(activeWorkout);
  goTo("screen-summary");
}

function renderSummary(workout) {
  const muscle = MUSCLE_GROUPS.find(m => m.id === workout.muscle);
  const body = document.getElementById("summary-body");
  body.innerHTML = `
    <div class="summary-hero">
      <div class="summary-icon">${muscle?.icon || "💪"}</div>
      <h2 class="summary-muscle">${muscle?.name || workout.muscle}</h2>
      <div class="summary-stats">
        <div class="stat-box"><span class="stat-val">${workout.duration}</span><span class="stat-lbl">Duración</span></div>
        <div class="stat-box"><span class="stat-val">${workout.exercises.length}</span><span class="stat-lbl">Ejercicios</span></div>
        <div class="stat-box"><span class="stat-val">${workout.totalSets}</span><span class="stat-lbl">Series</span></div>
        ${workout.totalVolume > 0 ? `<div class="stat-box"><span class="stat-val">${formatVolume(workout.totalVolume)}</span><span class="stat-lbl">Volumen</span></div>` : ""}
      </div>
    </div>
    <div class="summary-exercises">
      ${workout.exercises.map(ex => `
        <div class="summary-ex">
          <span class="summary-ex-name">${ex.name}</span>
          <div class="summary-sets">
            ${ex.sets.map((s, i) => `
              <span class="summary-set">${i + 1}: ${s.kg > 0 ? s.kg + "kg×" : ""}${s.reps}rep</span>
            `).join("")}
            ${ex.sets.length === 0 ? '<span class="summary-set empty">Sin series</span>' : ""}
          </div>
          ${ex.notes ? `<p class="summary-notes">"${ex.notes}"</p>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

// ── Historial ─────────────────────────────────────────────
function renderHistory() {
  const history = getHistory();
  const body = document.getElementById("history-body");
  if (history.length === 0) {
    body.innerHTML = `<p class="empty-state">No hay entrenamientos registrados todavía.<br>¡A por el primero! 💪</p>`;
    return;
  }

  const byDate = {};
  history.slice().reverse().forEach(w => {
    const d = new Date(w.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(w);
  });

  body.innerHTML = Object.entries(byDate).map(([date, workouts]) => `
    <div class="history-group">
      <p class="history-date">${date.charAt(0).toUpperCase() + date.slice(1)}</p>
      ${workouts.map(w => {
        const muscle = MUSCLE_GROUPS.find(m => m.id === w.muscle);
        const vol = w.totalVolume || w.exercises?.reduce((a, ex) =>
          a + ex.sets.reduce((s, set) => s + (set.kg || 0) * set.reps, 0), 0) || 0;
        return `
          <div class="history-card" onclick="toggleHistoryDetail('${w.id}')">
            <div class="history-card-top">
              <span class="history-muscle-icon">${muscle?.icon || "💪"}</span>
              <div class="history-info">
                <span class="history-muscle">${muscle?.name || w.muscle}</span>
                <span class="history-meta">${w.exercises.length} ejercicios · ${w.totalSets || 0} series · ${w.duration}${vol > 0 ? ` · ${formatVolume(vol)}` : ""}</span>
              </div>
              <button class="history-del" onclick="event.stopPropagation(); deleteWorkout('${w.id}')">🗑</button>
            </div>
            <div class="history-detail hidden" id="hd-${w.id}">
              ${w.exercises.map(ex => `
                <div class="hd-ex">
                  <strong>${ex.name}</strong>
                  <span>${ex.sets.map((s, i) => `${i + 1}: ${s.kg > 0 ? s.kg + "kg × " : ""}${s.reps}rep`).join(" | ") || "Sin series"}</span>
                  ${ex.notes ? `<em class="hd-notes">"${ex.notes}"</em>` : ""}
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");
}

function toggleHistoryDetail(id) {
  document.getElementById(`hd-${id}`)?.classList.toggle("hidden");
}

function deleteWorkout(id) {
  if (!confirm("¿Eliminar este entrenamiento?")) return;
  const history = getHistory().filter(w => w.id != id);
  localStorage.setItem("gymlog_history", JSON.stringify(history));
  renderHistory();
  deleteWorkoutFromSupabase(id); // async, non-blocking
}

// ── Estadísticas ──────────────────────────────────────────
function renderStats() {
  const history = getHistory();
  const body = document.getElementById("stats-body");

  if (history.length === 0) {
    body.innerHTML = `<p class="empty-state">Completa tu primer entrenamiento<br>para ver estadísticas. 📈</p>`;
    return;
  }

  const totalWorkouts = history.length;
  const streak = calculateStreak(history);
  const totalVolume = history.reduce((sum, w) =>
    sum + (w.totalVolume || w.exercises?.reduce((a, ex) =>
      a + ex.sets.reduce((s, set) => s + (set.kg || 0) * set.reps, 0), 0) || 0), 0);
  const totalSets = history.reduce((sum, w) => sum + (w.totalSets || 0), 0);

  const muscleCounts = {};
  history.forEach(w => { muscleCounts[w.muscle] = (muscleCounts[w.muscle] || 0) + 1; });
  const favMuscleId = Object.entries(muscleCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const favMuscle = MUSCLE_GROUPS.find(m => m.id === favMuscleId);

  const weekData = getLast7DaysActivity(history);
  const prs = getPRs();
  const prEntries = Object.entries(prs);

  body.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-card-val">${totalWorkouts}</span>
        <span class="stat-card-lbl">Entrenamientos</span>
      </div>
      <div class="stat-card">
        <span class="stat-card-val">${streak}🔥</span>
        <span class="stat-card-lbl">Racha actual</span>
      </div>
      <div class="stat-card">
        <span class="stat-card-val">${formatVolume(totalVolume)}</span>
        <span class="stat-card-lbl">Volumen total</span>
      </div>
      <div class="stat-card">
        <span class="stat-card-val">${totalSets}</span>
        <span class="stat-card-lbl">Series totales</span>
      </div>
    </div>

    ${favMuscle ? `
    <div class="stats-section">
      <p class="section-label">MÚSCULO FAVORITO</p>
      <div class="fav-muscle-card">
        <span class="fav-muscle-icon">${favMuscle.icon}</span>
        <div>
          <span class="fav-muscle-name">${favMuscle.name}</span>
          <span class="fav-muscle-count">${muscleCounts[favMuscleId]} entrenamientos</span>
        </div>
      </div>
    </div>` : ""}

    <div class="stats-section">
      <p class="section-label">ACTIVIDAD — ÚLTIMOS 7 DÍAS</p>
      <div class="week-chart">
        ${weekData.map(d => `
          <div class="week-bar-col">
            <div class="week-bar-wrap">
              <div class="week-bar${d.count > 0 ? " active" : ""}" style="height:${Math.max(d.pct, d.count > 0 ? 15 : 0)}%"></div>
            </div>
            <span class="week-day${d.isToday ? " today" : ""}">${d.label}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="stats-section">
      <p class="section-label">DISTRIBUCIÓN MUSCULAR</p>
      <div class="muscle-dist">
        ${Object.entries(muscleCounts).sort((a, b) => b[1] - a[1]).map(([id, count]) => {
          const m = MUSCLE_GROUPS.find(mg => mg.id === id);
          const pct = Math.round((count / totalWorkouts) * 100);
          return `
            <div class="dist-row">
              <span class="dist-label">${m?.icon || ""} ${m?.name || id}</span>
              <div class="dist-bar-wrap">
                <div class="dist-bar" style="width:${pct}%; background:${m?.color || "var(--orange)"}"></div>
              </div>
              <span class="dist-pct">${pct}%</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    ${prEntries.length > 0 ? `
    <div class="stats-section">
      <p class="section-label">RÉCORDS PERSONALES 🏆</p>
      <div class="pr-list">
        ${prEntries.map(([exId, pr]) => {
          const prDate = new Date(pr.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
          return `
            <div class="pr-item">
              <div class="pr-item-info">
                <span class="pr-ex-name">${findExerciseName(exId)}</span>
                <span class="pr-date">${prDate}</span>
              </div>
              <span class="pr-val">${pr.kg > 0 ? pr.kg + " kg × " : ""}${pr.reps} reps</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>` : ""}
  `;
}

function calculateStreak(history) {
  if (!history.length) return 0;
  const dates = [...new Set(history.map(w => new Date(w.date).toDateString()))]
    .sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  let d = new Date();
  d.setHours(0, 0, 0, 0);
  for (const dateStr of dates) {
    const wd = new Date(dateStr);
    wd.setHours(0, 0, 0, 0);
    if (wd.getTime() === d.getTime()) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

function getLast7DaysActivity(history) {
  const dayNames = ["D", "L", "M", "X", "J", "V", "S"];
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    const count = history.filter(w => {
      const wd = new Date(w.date);
      wd.setHours(0, 0, 0, 0);
      return wd.getTime() === d.getTime();
    }).length;
    return { label: dayNames[d.getDay()], count, isToday: i === 6 };
  });
  const max = Math.max(...days.map(x => x.count), 1);
  return days.map(d => ({ ...d, pct: Math.round((d.count / max) * 100) }));
}

function formatVolume(kg) {
  if (kg >= 1000000) return (kg / 1000000).toFixed(1) + "t";
  if (kg >= 1000) return (kg / 1000).toFixed(1) + "k kg";
  return Math.round(kg) + " kg";
}

function findExerciseName(exId) {
  for (const exs of Object.values(EXERCISES)) {
    const ex = exs.find(e => e.id === exId);
    if (ex) return ex.name;
  }
  // Check custom exercises
  try {
    const all = JSON.parse(localStorage.getItem("gymlog_custom_exercises") || "{}");
    for (const exs of Object.values(all)) {
      const ex = exs.find(e => e.id === exId);
      if (ex) return ex.name;
    }
  } catch {}
  return exId;
}

// ── Last Session Reference ────────────────────────────────
function getLastSessionForExercise(exId) {
  const history = getHistory();
  for (let i = history.length - 1; i >= 0; i--) {
    const ex = history[i].exercises?.find(e => e.id === exId);
    if (ex && ex.sets?.length > 0) return ex.sets;
  }
  return null;
}

// ── Personal Records ──────────────────────────────────────
function getPRs() {
  try { return JSON.parse(localStorage.getItem("gymlog_prs") || "{}"); }
  catch { return {}; }
}

function checkAndUpdatePR(exId, kg, reps) {
  if (!kg || kg <= 0 || !reps || reps < 1) return false;
  const prs = getPRs();
  const oneRM = kg * (1 + reps / 30); // Epley formula
  const prev = prs[exId];
  if (!prev || oneRM > (prev.oneRM || 0)) {
    prs[exId] = { kg, reps, oneRM, date: new Date().toISOString() };
    localStorage.setItem("gymlog_prs", JSON.stringify(prs));
    syncPRToSupabase(exId, prs[exId]); // async, non-blocking
    return true;
  }
  return false;
}

function showPRToast() {
  const toast = document.getElementById("pr-toast");
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 2500);
}

// ── Rest Timer ────────────────────────────────────────────
function toggleRestTimerEnabled() {
  restEnabled = !restEnabled;
  updateRestToggleBtn();
  if (!restEnabled) skipRestTimer();
}

function updateRestToggleBtn() {
  const btn = document.getElementById("rest-toggle-btn");
  if (!btn) return;
  btn.classList.toggle("active", restEnabled);
  btn.title = restEnabled ? "Descanso: activado" : "Descanso: desactivado";
}

function startRestTimer(seconds) {
  restTotal = seconds;
  restRemaining = seconds;
  clearInterval(restInterval);
  updateRestTimerUI();
  document.getElementById("rest-timer-overlay").classList.remove("hidden");

  restInterval = setInterval(() => {
    restRemaining--;
    updateRestTimerUI();
    if (restRemaining <= 0) {
      clearInterval(restInterval);
      onRestFinished();
    }
  }, 1000);
}

function updateRestTimerUI() {
  const countdown = document.getElementById("rest-countdown");
  if (countdown) countdown.textContent = restRemaining > 0 ? restRemaining : 0;

  const ring = document.getElementById("ring-progress");
  if (ring) {
    const circumference = 2 * Math.PI * 52;
    ring.style.strokeDasharray = circumference;
    const fraction = restTotal > 0 ? restRemaining / restTotal : 0;
    ring.style.strokeDashoffset = circumference * (1 - fraction);
  }
}

function onRestFinished() {
  document.getElementById("rest-timer-overlay").classList.add("hidden");
  if (navigator.vibrate) navigator.vibrate([150, 80, 150, 80, 300]);
  playBeep();
}

function skipRestTimer() {
  clearInterval(restInterval);
  document.getElementById("rest-timer-overlay")?.classList.add("hidden");
}

function addRestTime(seconds) {
  restRemaining = Math.max(0, restRemaining + seconds);
  if (restRemaining > 0) updateRestTimerUI();
  else skipRestTimer();
}

function changeRestPreset(seconds) {
  document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("preset-active"));
  event.currentTarget.classList.add("preset-active");
  startRestTimer(seconds);
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18, 0.36].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = i === 2 ? 1046 : 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.25, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.14);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.14);
    });
  } catch (e) { /* AudioContext not available */ }
}

// ── LocalStorage ──────────────────────────────────────────
function saveWorkout(workout) {
  const history = getHistory();
  history.push(workout);
  localStorage.setItem("gymlog_history", JSON.stringify(history));
  syncWorkoutToSupabase(workout); // async, non-blocking
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem("gymlog_history") || "[]"); }
  catch { return []; }
}

// ── Export ────────────────────────────────────────────────
function exportData() {
  const data = {
    exportDate: new Date().toISOString(),
    workouts: getHistory(),
    personalRecords: getPRs(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gymlog-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Modal imagen ──────────────────────────────────────────
function openModal(exId) {
  const ex = EXERCISES[currentMuscle]?.find(e => e.id === exId);
  if (!ex) return;
  document.getElementById("modal-img").src = ex.img;
  document.getElementById("modal-name").textContent = ex.name;
  document.getElementById("modal-desc").textContent = ex.desc;

  const prs = getPRs();
  const pr = prs[exId];
  const prEl = document.getElementById("modal-pr");
  if (pr && prEl) {
    prEl.classList.remove("hidden");
    prEl.textContent = `🏆 Récord: ${pr.kg > 0 ? pr.kg + "kg × " : ""}${pr.reps} reps`;
  } else if (prEl) {
    prEl.classList.add("hidden");
  }
  document.getElementById("exercise-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("exercise-modal").classList.add("hidden");
}

// ── Auth ──────────────────────────────────────────────────
let authMode = "login";

function switchAuthTab(mode) {
  authMode = mode;
  document.querySelectorAll(".auth-tab").forEach(t =>
    t.classList.toggle("active", t.dataset.mode === mode)
  );
  const btn = document.getElementById("auth-submit-btn");
  if (btn) btn.textContent = mode === "login" ? "Iniciar sesión" : "Crear cuenta";
  hideAuthError();
}

function hideAuthError() {
  const el = document.getElementById("auth-error");
  if (el) { el.classList.add("hidden"); el.textContent = ""; }
}

function showAuthError(msg) {
  const el = document.getElementById("auth-error");
  if (el) { el.classList.remove("hidden"); el.textContent = msg; }
}

async function handleAuth() {
  const email    = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  if (!email || !password) { showAuthError("Rellena email y contraseña."); return; }

  const btn = document.getElementById("auth-submit-btn");
  btn.disabled = true;
  btn.textContent = "Cargando…";
  hideAuthError();

  try {
    const result = authMode === "login"
      ? await db.auth.signInWithPassword({ email, password })
      : await db.auth.signUp({ email, password });

    if (result.error) {
      showAuthError(translateAuthError(result.error.message));
      btn.disabled = false;
      btn.textContent = authMode === "login" ? "Iniciar sesión" : "Crear cuenta";
      return;
    }

    if (authMode === "register" && !result.data.session) {
      showAuthError("✉️ Revisa tu email para confirmar la cuenta y luego inicia sesión.");
      btn.disabled = false;
      btn.textContent = "Crear cuenta";
      return;
    }

    currentUser = result.data.user;
    await onSignedIn();
  } catch (e) {
    showAuthError("Error de conexión. Inténtalo de nuevo.");
    btn.disabled = false;
    btn.textContent = authMode === "login" ? "Iniciar sesión" : "Crear cuenta";
  }
}

function translateAuthError(msg) {
  if (msg.includes("Invalid login"))         return "Email o contraseña incorrectos.";
  if (msg.includes("Email not confirmed"))   return "Confirma tu email antes de entrar.";
  if (msg.includes("User already registered")) return "Ya existe una cuenta con ese email.";
  if (msg.includes("Password should be"))    return "La contraseña debe tener al menos 6 caracteres.";
  return msg;
}

async function onSignedIn() {
  await syncFromSupabase();
  initMuscleGrid();
  renderHome();
  goToNav("screen-home");
  updateUserBar();
}

function updateUserBar() {
  const bar = document.getElementById("home-user-bar");
  if (!bar || !currentUser) return;
  bar.innerHTML = `
    <span class="user-email">👤 ${currentUser.email}</span>
    <button class="user-logout-btn" onclick="logOut()">Salir</button>
  `;
  bar.classList.remove("hidden");
}

async function logOut() {
  await db.auth.signOut();
  currentUser = null;
  localStorage.removeItem("gymlog_history");
  localStorage.removeItem("gymlog_prs");
  document.getElementById("home-user-bar")?.classList.add("hidden");
  goTo("screen-auth");
}

// ── Supabase Sync ──────────────────────────────────────────
async function syncFromSupabase() {
  if (!currentUser) return;
  try {
    const [{ data: workouts }, { data: prs }] = await Promise.all([
      db.from("workouts").select("*").eq("user_id", currentUser.id).order("date", { ascending: true }),
      db.from("personal_records").select("*").eq("user_id", currentUser.id),
    ]);

    if (workouts) {
      const mapped = workouts.map(w => ({
        id: w.local_id,
        date: w.date,
        muscle: w.muscle,
        exercises: w.exercises,
        duration: w.duration,
        totalSets: w.total_sets,
        totalVolume: w.total_volume,
      }));
      localStorage.setItem("gymlog_history", JSON.stringify(mapped));
    }

    if (prs) {
      const prMap = {};
      prs.forEach(p => {
        prMap[p.exercise_id] = { kg: p.kg, reps: p.reps, oneRM: p.one_rm, date: p.date };
      });
      localStorage.setItem("gymlog_prs", JSON.stringify(prMap));
    }
  } catch (e) {
    console.warn("Sync error:", e);
  }
}

async function syncWorkoutToSupabase(workout) {
  if (!currentUser) return;
  try {
    await db.from("workouts").upsert({
      local_id:     workout.id.toString(),
      user_id:      currentUser.id,
      date:         workout.date,
      muscle:       workout.muscle,
      exercises:    workout.exercises,
      duration:     workout.duration,
      total_sets:   workout.totalSets   || 0,
      total_volume: workout.totalVolume || 0,
    }, { onConflict: "user_id,local_id" });
  } catch (e) {
    console.warn("Workout sync error:", e);
  }
}

async function deleteWorkoutFromSupabase(id) {
  if (!currentUser) return;
  try {
    await db.from("workouts").delete()
      .eq("user_id", currentUser.id)
      .eq("local_id", id.toString());
  } catch (e) {
    console.warn("Delete sync error:", e);
  }
}

async function syncPRToSupabase(exId, pr) {
  if (!currentUser) return;
  try {
    await db.from("personal_records").upsert({
      user_id:     currentUser.id,
      exercise_id: exId,
      kg:          pr.kg,
      reps:        pr.reps,
      one_rm:      pr.oneRM,
      date:        pr.date,
    }, { onConflict: "user_id,exercise_id" });
  } catch (e) {
    console.warn("PR sync error:", e);
  }
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  // Setup UI listeners
  document.getElementById("rest-timer-overlay").addEventListener("click", function (e) {
    if (e.target === this) skipRestTimer();
  });

  let touchStartX = 0;
  document.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 80) {
      const active = document.querySelector(".screen.active");
      if (active && !["screen-home", "screen-workout", "screen-auth"].includes(active.id)) {
        active.querySelector(".back-btn")?.click();
      }
    }
  }, { passive: true });

  // Check existing session
  const { data } = await db.auth.getSession();
  if (data.session) {
    currentUser = data.session.user;
    await onSignedIn();
  }
  // else: screen-auth is already active (set in HTML)

  // React to auth state changes (e.g. email confirmation link)
  db.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session && !currentUser) {
      currentUser = session.user;
      await onSignedIn();
    }
  });
});
