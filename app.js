// ============================================================
// GYMLOG — APP LOGIC
// ============================================================

// ── Estado global ─────────────────────────────────────────
let currentMuscle = null;
let selectedExercises = [];
let activeWorkout = null;
let timerInterval = null;
let timerSeconds = 0;

// ── Navegación ────────────────────────────────────────────
function goTo(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  target.classList.add("active");
  target.classList.add("slide-in");
  setTimeout(() => target.classList.remove("slide-in"), 400);

  if (screenId === "screen-history") renderHistory();
  if (screenId === "screen-home") renderTodaySummary();
}

// ── Pantalla Inicio ───────────────────────────────────────
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

function selectMuscle(muscleId) {
  currentMuscle = muscleId;
  selectedExercises = [];
  const muscle = MUSCLE_GROUPS.find(m => m.id === muscleId);
  document.getElementById("exercises-title").textContent = muscle.name;

  const exercises = EXERCISES[muscleId] || [];
  const list = document.getElementById("exercises-list");
  list.innerHTML = exercises.map(ex => `
    <div class="exercise-card" id="ex-card-${ex.id}" onclick="toggleExercise('${ex.id}')">
      <div class="exercise-card-img-wrap">
        <img class="exercise-thumb" src="${ex.img}" alt="${ex.name}" 
          onerror="this.style.display='none';this.parentElement.classList.add('img-failed')"
          loading="lazy" />
        <button class="exercise-img-btn" onclick="event.stopPropagation(); openModal('${ex.id}')">🔍</button>
      </div>
      <div class="exercise-card-info">
        <h3 class="exercise-name">${ex.name}</h3>
        <p class="exercise-desc">${ex.desc.substring(0, 70)}…</p>
      </div>
      <div class="exercise-check" id="check-${ex.id}">✓</div>
    </div>
  `).join("");

  updateStartBtn();
  goTo("screen-exercises");
}

function toggleExercise(exId) {
  const idx = selectedExercises.indexOf(exId);
  const card = document.getElementById(`ex-card-${exId}`);
  const check = document.getElementById(`check-${exId}`);
  if (idx === -1) {
    selectedExercises.push(exId);
    card.classList.add("selected");
    check.classList.add("visible");
  } else {
    selectedExercises.splice(idx, 1);
    card.classList.remove("selected");
    check.classList.remove("visible");
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
      const ex = EXERCISES[currentMuscle].find(e => e.id === exId);
      return { id: exId, name: ex.name, img: ex.img, sets: [] };
    }),
  };

  // Header
  document.getElementById("workout-muscle-label").textContent = muscle.name;
  startTimer();
  renderWorkoutBody();
  goTo("screen-workout");
}

function renderWorkoutBody() {
  const body = document.getElementById("workout-body");
  body.innerHTML = activeWorkout.exercises.map((ex, exIdx) => `
    <div class="workout-exercise" id="workout-ex-${exIdx}">
      <div class="workout-ex-header">
        <img class="workout-ex-thumb" src="${ex.img}" alt="${ex.name}"
          onerror="this.style.display='none';this.parentElement.classList.add('img-failed')" />
        <div>
          <h3 class="workout-ex-name">${ex.name}</h3>
          <span class="workout-ex-sets-count" id="sets-count-${exIdx}">0 series</span>
        </div>
      </div>

      <div class="sets-table">
        <div class="sets-header">
          <span>Serie</span><span>Kg</span><span>Reps</span><span></span>
        </div>
        <div class="sets-rows" id="sets-rows-${exIdx}"></div>
      </div>

      <div class="add-set-row">
        <span class="set-num" id="set-num-${exIdx}">1</span>
        <input type="number" id="kg-${exIdx}" class="set-input" placeholder="Kg" min="0" step="0.5" />
        <input type="number" id="reps-${exIdx}" class="set-input" placeholder="Reps" min="1" />
        <button class="btn-add-set" onclick="addSet(${exIdx})">＋</button>
      </div>
    </div>
  `).join("");
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

  // Render row
  const row = document.createElement("div");
  row.className = "set-row animate-in";
  row.id = `set-row-${exIdx}-${setNum}`;
  row.innerHTML = `
    <span class="set-row-num">${setNum}</span>
    <span class="set-row-kg">${set.kg > 0 ? set.kg + " kg" : "—"}</span>
    <span class="set-row-reps">${set.reps} reps</span>
    <button class="set-row-del" onclick="deleteSet(${exIdx}, ${setNum - 1})">✕</button>
  `;
  document.getElementById(`sets-rows-${exIdx}`).appendChild(row);

  // Actualizar contador
  document.getElementById(`sets-count-${exIdx}`).textContent = `${setNum} serie${setNum > 1 ? "s" : ""}`;
  document.getElementById(`set-num-${exIdx}`).textContent = setNum + 1;

  // Limpiar inputs
  kgInput.value = "";
  repsInput.value = "";
  kgInput.focus();
}

function deleteSet(exIdx, setIdx) {
  activeWorkout.exercises[exIdx].sets.splice(setIdx, 1);
  // Re-render todas las filas de ese ejercicio
  const rowsContainer = document.getElementById(`sets-rows-${exIdx}`);
  rowsContainer.innerHTML = "";
  activeWorkout.exercises[exIdx].sets.forEach((set, i) => {
    const row = document.createElement("div");
    row.className = "set-row";
    row.innerHTML = `
      <span class="set-row-num">${i + 1}</span>
      <span class="set-row-kg">${set.kg > 0 ? set.kg + " kg" : "—"}</span>
      <span class="set-row-reps">${set.reps} reps</span>
      <button class="set-row-del" onclick="deleteSet(${exIdx}, ${i})">✕</button>
    `;
    rowsContainer.appendChild(row);
  });
  const total = activeWorkout.exercises[exIdx].sets.length;
  document.getElementById(`sets-count-${exIdx}`).textContent = `${total} serie${total !== 1 ? "s" : ""}`;
  document.getElementById(`set-num-${exIdx}`).textContent = total + 1;
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
function finishWorkout() {
  clearInterval(timerInterval);
  activeWorkout.duration = formatTime(timerSeconds);
  activeWorkout.totalSets = activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

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
      </div>
    </div>
    <div class="summary-exercises">
      ${workout.exercises.map(ex => `
        <div class="summary-ex">
          <span class="summary-ex-name">${ex.name}</span>
          <div class="summary-sets">
            ${ex.sets.map((s, i) => `
              <span class="summary-set">${i + 1}: ${s.kg > 0 ? s.kg + "kg" : ""} ${s.reps}rep</span>
            `).join("")}
            ${ex.sets.length === 0 ? '<span class="summary-set empty">Sin series</span>' : ""}
          </div>
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

  // Agrupar por fecha
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
        return `
          <div class="history-card" onclick="toggleHistoryDetail('${w.id}')">
            <div class="history-card-top">
              <span class="history-muscle-icon">${muscle?.icon || "💪"}</span>
              <div class="history-info">
                <span class="history-muscle">${muscle?.name || w.muscle}</span>
                <span class="history-meta">${w.exercises.length} ejercicios · ${w.totalSets || 0} series · ${w.duration}</span>
              </div>
              <button class="history-del" onclick="event.stopPropagation(); deleteWorkout('${w.id}')">🗑</button>
            </div>
            <div class="history-detail hidden" id="hd-${w.id}">
              ${w.exercises.map(ex => `
                <div class="hd-ex">
                  <strong>${ex.name}</strong>
                  <span>${ex.sets.map((s, i) => `${i + 1}: ${s.kg > 0 ? s.kg + "kg · " : ""}${s.reps}rep`).join(" | ") || "Sin series"}</span>
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
  const el = document.getElementById(`hd-${id}`);
  el.classList.toggle("hidden");
}

function deleteWorkout(id) {
  if (!confirm("¿Eliminar este entrenamiento?")) return;
  let history = getHistory();
  history = history.filter(w => w.id != id);
  localStorage.setItem("gymlog_history", JSON.stringify(history));
  renderHistory();
}

// ── LocalStorage ──────────────────────────────────────────
function saveWorkout(workout) {
  const history = getHistory();
  history.push(workout);
  localStorage.setItem("gymlog_history", JSON.stringify(history));
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("gymlog_history") || "[]");
  } catch { return []; }
}

// ── Modal imagen ──────────────────────────────────────────
function openModal(exId) {
  const ex = EXERCISES[currentMuscle]?.find(e => e.id === exId);
  if (!ex) return;
  document.getElementById("modal-img").src = ex.img;
  document.getElementById("modal-name").textContent = ex.name;
  document.getElementById("modal-desc").textContent = ex.desc;
  document.getElementById("exercise-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("exercise-modal").classList.add("hidden");
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initMuscleGrid();
  renderTodaySummary();

  // Swipe para volver (móvil)
  let touchStartX = 0;
  document.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; });
  document.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 80) {
      const active = document.querySelector(".screen.active");
      if (active && active.id !== "screen-home" && active.id !== "screen-workout") {
        const backBtn = active.querySelector(".back-btn");
        if (backBtn) backBtn.click();
      }
    }
  });
});
