// ============================================================
// BASE DE DATOS DE EJERCICIOS
// Imágenes: URLs de Wikimedia Commons / dominio público
// ============================================================

const MUSCLE_GROUPS = [
  { id: "pecho",     name: "Pecho",        icon: "🫁", color: "#FF6B35" },
  { id: "espalda",   name: "Espalda",      icon: "🦴", color: "#4ECDC4" },
  { id: "hombros",   name: "Hombros",      icon: "💪", color: "#A78BFA" },
  { id: "biceps",    name: "Bíceps",       icon: "💪", color: "#F59E0B" },
  { id: "triceps",   name: "Tríceps",      icon: "💪", color: "#10B981" },
  { id: "piernas",   name: "Piernas",      icon: "🦵", color: "#EF4444" },
  { id: "gluteos",   name: "Glúteos",      icon: "🍑", color: "#EC4899" },
  { id: "abdomen",   name: "Abdomen",      icon: "⬡",  color: "#06B6D4" },
  { id: "pantorras", name: "Pantorrillas", icon: "🦵", color: "#84CC16" },
  { id: "cardio",    name: "Cardio",       icon: "❤️", color: "#F43F5E" },
];

// Imágenes de ejercicios — Unsplash + Wikimedia (dominio público / licencia libre)
const EXERCISES = {
  pecho: [
    {
      id: "press-banca",
      name: "Press de Banca",
      desc: "Ejercicio fundamental para el pecho. Tumbado en el banco, baja la barra hasta rozar el pecho y empuja hacia arriba.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Bench_press.jpg/640px-Bench_press.jpg",
    },
    {
      id: "press-banca-inclinado",
      name: "Press Banca Inclinado",
      desc: "Con el banco a 30-45°, trabaja la parte superior del pecho.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Incline-bench-press.jpg/640px-Incline-bench-press.jpg",
    },
    {
      id: "aperturas-mancuernas",
      name: "Aperturas con Mancuernas",
      desc: "Tumbado, abre los brazos en arco con codos ligeramente doblados. Siente el estiramiento del pecho.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Dumbbell_fly.jpg/640px-Dumbbell_fly.jpg",
    },
    {
      id: "cruces-polea",
      name: "Cruces en Polea",
      desc: "En la máquina de poleas altas, cruza los brazos hacia el centro manteniendo el arco.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Kabelcrossover.jpg/640px-Kabelcrossover.jpg",
    },
    {
      id: "fondos-pecho",
      name: "Fondos (Dips) Pecho",
      desc: "En paralelas, inclínate hacia delante para enfatizar el pecho. Baja hasta 90° en el codo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Dips_2.jpg/640px-Dips_2.jpg",
    },
    {
      id: "press-maquina",
      name: "Press en Máquina",
      desc: "Máquina de press de pecho guiado. Ideal para aislar el pecho con seguridad.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Chest_press_machine.jpg/640px-Chest_press_machine.jpg",
    },
    {
      id: "flexiones",
      name: "Flexiones",
      desc: "Ejercicio básico sin peso. Manos a la anchura de hombros, baja hasta rozar el suelo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Push_up.jpg/640px-Push_up.jpg",
    },
    {
      id: "pull-over",
      name: "Pull-over con Mancuerna",
      desc: "Tumbado transversal en el banco, baja la mancuerna detrás de la cabeza para expandir el pecho.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Dumbbell_pullover.jpg/640px-Dumbbell_pullover.jpg",
    },
  ],

  espalda: [
    {
      id: "dominadas",
      name: "Dominadas",
      desc: "Agarre prono, sube hasta que la barbilla supere la barra. El rey de los ejercicios de espalda.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Pull_ups.jpg/640px-Pull_ups.jpg",
    },
    {
      id: "remo-barra",
      name: "Remo con Barra",
      desc: "Inclinado hacia delante ~45°, tira de la barra hacia el abdomen. Trabaja el dorsal y romboides.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bent_over_row.jpg/640px-Bent_over_row.jpg",
    },
    {
      id: "jalon-polea",
      name: "Jalón en Polea Alta",
      desc: "Sentado en la máquina de jalón, tira de la barra hasta el pecho con el tronco ligeramente echado atrás.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Lat_pulldown.jpg/640px-Lat_pulldown.jpg",
    },
    {
      id: "remo-maquina",
      name: "Remo en Máquina",
      desc: "Sentado en la máquina de remo, tira de los mangos hacia el abdomen. Control en la vuelta.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Seated_cable_row.jpg/640px-Seated_cable_row.jpg",
    },
    {
      id: "peso-muerto",
      name: "Peso Muerto",
      desc: "Ejericicio compuesto con barra. Espalda recta, empuja el suelo con los pies mientras extends las caderas.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Conventional_deadlift.jpg/640px-Conventional_deadlift.jpg",
    },
    {
      id: "remo-mancuerna",
      name: "Remo con Mancuerna",
      desc: "Apoyado en el banco con una mano y rodilla, tira la mancuerna hacia la cadera.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dumbbell-row.jpg/640px-Dumbbell-row.jpg",
    },
    {
      id: "hiperextensiones",
      name: "Hiperextensiones",
      desc: "En el banco romano, baja el torso y sube hasta quedar en línea recta. Trabaja lumbar y glúteo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Back_extension.jpg/640px-Back_extension.jpg",
    },
    {
      id: "pullover-polea",
      name: "Pull-over en Polea",
      desc: "De pie frente a la polea alta, extiende los brazos en arco hacia las caderas.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Lat_Pulldown_machine.jpg/640px-Lat_Pulldown_machine.jpg",
    },
  ],

  hombros: [
    {
      id: "press-militar",
      name: "Press Militar",
      desc: "De pie o sentado, empuja la barra desde los hombros hasta arriba con los brazos extendidos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Overhead_press.jpg/640px-Overhead_press.jpg",
    },
    {
      id: "elevaciones-laterales",
      name: "Elevaciones Laterales",
      desc: "Con mancuernas, sube los brazos en cruz hasta la altura del hombro. Aísla el deltoides lateral.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lateral_raise.jpg/640px-Lateral_raise.jpg",
    },
    {
      id: "elevaciones-frontales",
      name: "Elevaciones Frontales",
      desc: "Sube las mancuernas al frente hasta la altura del hombro. Trabaja el deltoides anterior.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Front_raise.jpg/640px-Front_raise.jpg",
    },
    {
      id: "pajaros",
      name: "Pájaros (Posterior)",
      desc: "Inclinado hacia delante, abre los brazos hacia atrás. Trabaja el deltoides posterior.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Reverse_fly.jpg/640px-Reverse_fly.jpg",
    },
    {
      id: "press-arnold",
      name: "Press Arnold",
      desc: "Con mancuernas, empieza con palmas hacia ti y rota al subir. Trabaja los tres haces del deltoides.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Arnold_press.jpg/640px-Arnold_press.jpg",
    },
    {
      id: "encogimientos",
      name: "Encogimientos (Trapecios)",
      desc: "Con barra o mancuernas, sube los hombros hacia las orejas. Trabaja el trapecio superior.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dumbbell_shrug.jpg/640px-Dumbbell_shrug.jpg",
    },
  ],

  biceps: [
    {
      id: "curl-barra",
      name: "Curl con Barra",
      desc: "De pie, agarra la barra con agarre supino y lleva el peso hacia los hombros.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Barbell_curl.jpg/640px-Barbell_curl.jpg",
    },
    {
      id: "curl-mancuernas",
      name: "Curl con Mancuernas",
      desc: "Alternando o simultáneo, flexiona el codo llevando la mancuerna hacia el hombro.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dumbbell-bicep-curl.jpg/640px-Dumbbell-bicep-curl.jpg",
    },
    {
      id: "curl-concentrado",
      name: "Curl Concentrado",
      desc: "Sentado, apoya el codo en el muslo y sube la mancuerna. Máximo pico del bíceps.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Concentration_curl.jpg/640px-Concentration_curl.jpg",
    },
    {
      id: "curl-martillo",
      name: "Curl Martillo",
      desc: "Agarre neutro (palmas enfrentadas). Trabaja el braquial y braquiorradial.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hammer_curls.jpg/640px-Hammer_curls.jpg",
    },
    {
      id: "curl-polea",
      name: "Curl en Polea Baja",
      desc: "Con la polea baja, mantén tensión constante en todo el recorrido.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cable_curl.jpg/640px-Cable_curl.jpg",
    },
    {
      id: "curl-scott",
      name: "Curl Scott (Predicador)",
      desc: "Con el codo apoyado en el banco Scott, aísla completamente el bíceps.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Preacher_curl.jpg/640px-Preacher_curl.jpg",
    },
  ],

  triceps: [
    {
      id: "press-frances",
      name: "Press Francés",
      desc: "Tumbado, baja la barra EZ por detrás de la cabeza doblando solo los codos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Triceps_exercise.jpg/640px-Triceps_exercise.jpg",
    },
    {
      id: "extensiones-polea",
      name: "Extensiones en Polea Alta",
      desc: "De pie frente a la polea, empuja el cable hacia abajo manteniendo los codos pegados al cuerpo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pushdown.jpg/640px-Pushdown.jpg",
    },
    {
      id: "fondos-triceps",
      name: "Fondos en Banco",
      desc: "Con las manos en el banco y pies en el suelo, baja el cuerpo doblando los codos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Tricep_dips.jpg/640px-Tricep_dips.jpg",
    },
    {
      id: "patada-triceps",
      name: "Patada de Tríceps",
      desc: "Inclinado, con el codo a 90°, extiende el brazo hacia atrás hasta quedar recto.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tricep_kickback.jpg/640px-Tricep_kickback.jpg",
    },
    {
      id: "extension-mancuerna",
      name: "Extensión sobre la Cabeza",
      desc: "De pie o sentado, sujeta la mancuerna con ambas manos sobre la cabeza y dobla los codos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Overhead_tricep_extension.jpg/640px-Overhead_tricep_extension.jpg",
    },
  ],

  piernas: [
    {
      id: "sentadilla",
      name: "Sentadilla con Barra",
      desc: "La reina de los ejercicios. Barra en la espalda, baja hasta que los muslos queden paralelos al suelo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Squats.jpg/640px-Squats.jpg",
    },
    {
      id: "prensa-piernas",
      name: "Prensa de Piernas",
      desc: "Sentado en la máquina, empuja la plataforma con los pies. Cuadriceps y glúteos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Leg_press.jpg/640px-Leg_press.jpg",
    },
    {
      id: "extension-cuadriceps",
      name: "Extensión de Cuádriceps",
      desc: "Sentado en la máquina, extiende las piernas hasta quedar rectas. Aísla el cuádriceps.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Leg_extension.jpg/640px-Leg_extension.jpg",
    },
    {
      id: "femoral-tumbado",
      name: "Curl Femoral Tumbado",
      desc: "Tumbado boca abajo, dobla las rodillas llevando los talones al glúteo. Trabaja los isquios.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lying_leg_curl.jpg/640px-Lying_leg_curl.jpg",
    },
    {
      id: "zancadas",
      name: "Zancadas (Lunges)",
      desc: "Da un paso adelante y dobla ambas rodillas hasta 90°. Trabaja cuádriceps y glúteos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Lunge.jpg/640px-Lunge.jpg",
    },
    {
      id: "sentadilla-hack",
      name: "Sentadilla Hack",
      desc: "En la máquina de hack squat, pies adelantados para enfocar más el cuádriceps.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Hack_squat.jpg/640px-Hack_squat.jpg",
    },
    {
      id: "sentadilla-bulgara",
      name: "Sentadilla Búlgara",
      desc: "Pie trasero elevado en el banco, baja la rodilla delantera hasta casi tocar el suelo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Bulgarian_split_squat.jpg/640px-Bulgarian_split_squat.jpg",
    },
    {
      id: "peso-muerto-rumano",
      name: "Peso Muerto Rumano",
      desc: "Con piernas casi rectas, baja el peso deslizándolo por las piernas. Trabaja los isquios.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Romanian_deadlift.jpg/640px-Romanian_deadlift.jpg",
    },
  ],

  gluteos: [
    {
      id: "hip-thrust",
      name: "Hip Thrust",
      desc: "Hombros en el banco, sube las caderas empujando con los glúteos. Peso en las caderas.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Hip_thrust.jpg/640px-Hip_thrust.jpg",
    },
    {
      id: "puente-gluteo",
      name: "Puente de Glúteo",
      desc: "Tumbado boca arriba, sube las caderas apretando los glúteos en lo alto.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Glute_bridge.jpg/640px-Glute_bridge.jpg",
    },
    {
      id: "patada-gluteo",
      name: "Patada de Glúteo (Máquina)",
      desc: "En la máquina de patada de glúteo, extiende la pierna hacia atrás y arriba.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Glute_kickback.jpg/640px-Glute_kickback.jpg",
    },
    {
      id: "abduccion",
      name: "Abducción de Cadera",
      desc: "En la máquina de abducción, separa las piernas contra la resistencia. Glúteo medio.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hip_abduction.jpg/640px-Hip_abduction.jpg",
    },
    {
      id: "sentadilla-sumo",
      name: "Sentadilla Sumo",
      desc: "Pies más abiertos que los hombros con punteras hacia afuera. Enfatiza el glúteo interno.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sumo_squat.jpg/640px-Sumo_squat.jpg",
    },
    {
      id: "step-up",
      name: "Step Up",
      desc: "Sube al step o banco con una pierna, empujando con el glúteo para incorporarte.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Step_up.jpg/640px-Step_up.jpg",
    },
  ],

  abdomen: [
    {
      id: "crunch",
      name: "Crunch",
      desc: "Tumbado, sube el torso hacia las rodillas. Contrae el abdomen en lo alto.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Crunches.jpg/640px-Crunches.jpg",
    },
    {
      id: "plancha",
      name: "Plancha",
      desc: "Apoyado en antebrazos y punteras, mantén el cuerpo en línea recta. Core completo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Plank.jpg/640px-Plank.jpg",
    },
    {
      id: "leg-raises",
      name: "Elevaciones de Piernas",
      desc: "Tumbado, sube las piernas rectas hasta los 90°. Abdomen inferior.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Leg_raise.jpg/640px-Leg_raise.jpg",
    },
    {
      id: "russian-twist",
      name: "Russian Twist",
      desc: "Sentado con piernas levantadas, gira el torso de lado a lado. Oblicuos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Russian_twist.jpg/640px-Russian_twist.jpg",
    },
    {
      id: "mountain-climbers",
      name: "Mountain Climbers",
      desc: "En posición de plancha, lleva las rodillas alternando hacia el pecho rápidamente.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mountain_climbers.jpg/640px-Mountain_climbers.jpg",
    },
    {
      id: "ab-wheel",
      name: "Rueda Abdominal",
      desc: "De rodillas, empuja la rueda hacia delante manteniendo el core tenso. Avanzado.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Ab_roller.jpg/640px-Ab_roller.jpg",
    },
    {
      id: "crunch-polea",
      name: "Crunch en Polea",
      desc: "De rodillas frente a la polea alta, dobla el tronco hacia abajo tirando de la cuerda.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cable_crunch.jpg/640px-Cable_crunch.jpg",
    },
  ],

  pantorras: [
    {
      id: "gemelos-maquina",
      name: "Elevaciones en Máquina (de pie)",
      desc: "De pie en la máquina, sube sobre las punteras completamente y baja controlando.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Calf_raise.jpg/640px-Calf_raise.jpg",
    },
    {
      id: "gemelos-sentado",
      name: "Elevaciones Sentado",
      desc: "Sentado en la máquina con el peso en las rodillas. Trabaja el sóleo más profundo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Seated_calf_raise.jpg/640px-Seated_calf_raise.jpg",
    },
    {
      id: "gemelos-prensa",
      name: "Gemelos en Prensa",
      desc: "En la prensa de piernas, empuja la plataforma con las punteras estando las piernas extendidas.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Leg_press.jpg/640px-Leg_press.jpg",
    },
    {
      id: "gemelos-libre",
      name: "Elevaciones con Mancuerna",
      desc: "De pie con un pie en un escalón, sujeta una mancuerna y sube sobre la puntera.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Calf_raise.jpg/640px-Calf_raise.jpg",
    },
  ],

  cardio: [
    {
      id: "cinta",
      name: "Cinta de Correr",
      desc: "Correr o caminar a ritmo constante o en intervalos. Ajusta velocidad e inclinación.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Treadmill.jpg/640px-Treadmill.jpg",
    },
    {
      id: "bicicleta",
      name: "Bicicleta Estática",
      desc: "Cardio de bajo impacto. Ajusta la resistencia para trabajar a distintas intensidades.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Exercise_bike.jpg/640px-Exercise_bike.jpg",
    },
    {
      id: "eliptica",
      name: "Elíptica",
      desc: "Combina tren inferior y superior sin impacto. Ideal para sesiones largas.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Elliptical_trainer.jpg/640px-Elliptical_trainer.jpg",
    },
    {
      id: "remo-cardio",
      name: "Máquina de Remo",
      desc: "Trabaja cardio y fuerza del tren superior. Impulsa con las piernas y tira con los brazos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rowing_machine.jpg/640px-Rowing_machine.jpg",
    },
    {
      id: "saltar-cuerda",
      name: "Saltar a la Comba",
      desc: "Cardio intenso y económico. Trabaja coordinación, resistencia y potencia de pantorrillas.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Jump_rope.jpg/640px-Jump_rope.jpg",
    },
    {
      id: "step",
      name: "Step / Escaladora",
      desc: "La máquina stairmaster imita subir escaleras. Cardio + piernas + glúteos.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Stair_climber.jpg/640px-Stair_climber.jpg",
    },
  ],
};
