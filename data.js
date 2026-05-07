// ============================================================
// BASE DE DATOS DE EJERCICIOS
// Imágenes: Unsplash CDN (siempre disponibles, sin restricciones)
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

const EXERCISES = {
  pecho: [
    {
      id: "press-banca",
      name: "Press de Banca",
      desc: "Ejercicio fundamental para el pecho. Tumbado en el banco, baja la barra hasta rozar el pecho y empuja hacia arriba.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=640&q=80",
    },
    {
      id: "press-banca-inclinado",
      name: "Press Banca Inclinado",
      desc: "Con el banco a 30-45°, trabaja la parte superior del pecho.",
      img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=640&q=80",
    },
    {
      id: "aperturas-mancuernas",
      name: "Aperturas con Mancuernas",
      desc: "Tumbado, abre los brazos en arco con codos ligeramente doblados. Siente el estiramiento del pecho.",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=640&q=80",
    },
    {
      id: "cruces-polea",
      name: "Cruces en Polea",
      desc: "En la máquina de poleas altas, cruza los brazos hacia el centro manteniendo el arco.",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&q=80",
    },
    {
      id: "fondos-pecho",
      name: "Fondos (Dips) Pecho",
      desc: "En paralelas, inclínate hacia delante para enfatizar el pecho. Baja hasta 90° en el codo.",
      img: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=640&q=80",
    },
    {
      id: "press-maquina",
      name: "Press en Máquina",
      desc: "Máquina de press de pecho guiado. Ideal para aislar el pecho con seguridad.",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=640&q=80",
    },
    {
      id: "flexiones",
      name: "Flexiones",
      desc: "Ejercicio básico sin peso. Manos a la anchura de hombros, baja hasta rozar el suelo.",
      img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=640&q=80",
    },
    {
      id: "pull-over",
      name: "Pull-over con Mancuerna",
      desc: "Tumbado transversal en el banco, baja la mancuerna detrás de la cabeza para expandir el pecho.",
      img: "https://images.unsplash.com/photo-1549476464-37392f717541?w=640&q=80",
    },
  ],

  espalda: [
    {
      id: "dominadas",
      name: "Dominadas",
      desc: "Agarre prono, sube hasta que la barbilla supere la barra. El rey de los ejercicios de espalda.",
      img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=640&q=80",
    },
    {
      id: "remo-barra",
      name: "Remo con Barra",
      desc: "Inclinado hacia delante ~45°, tira de la barra hacia el abdomen. Trabaja el dorsal y romboides.",
      img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=640&q=80",
    },
    {
      id: "jalon-polea",
      name: "Jalón en Polea Alta",
      desc: "Sentado en la máquina de jalón, tira de la barra hasta el pecho con el tronco ligeramente echado atrás.",
      img: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=640&q=80",
    },
    {
      id: "remo-maquina",
      name: "Remo en Máquina",
      desc: "Sentado en la máquina de remo, tira de los mangos hacia el abdomen. Control en la vuelta.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=640&q=80",
    },
    {
      id: "peso-muerto",
      name: "Peso Muerto",
      desc: "Ejercicio compuesto con barra. Espalda recta, empuja el suelo con los pies mientras extiendes las caderas.",
      img: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=640&q=80",
    },
    {
      id: "remo-mancuerna",
      name: "Remo con Mancuerna",
      desc: "Apoyado en el banco con una mano y rodilla, tira la mancuerna hacia la cadera.",
      img: "https://images.unsplash.com/photo-1583454155184-870a1f63be6e?w=640&q=80",
    },
    {
      id: "hiperextensiones",
      name: "Hiperextensiones",
      desc: "En el banco romano, baja el torso y sube hasta quedar en línea recta. Trabaja lumbar y glúteo.",
      img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=640&q=80",
    },
    {
      id: "pullover-polea",
      name: "Pull-over en Polea",
      desc: "De pie frente a la polea alta, extiende los brazos en arco hacia las caderas.",
      img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=640&q=80",
    },
  ],

  hombros: [
    {
      id: "press-militar",
      name: "Press Militar",
      desc: "De pie o sentado, empuja la barra desde los hombros hasta arriba con los brazos extendidos.",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=640&q=80",
    },
    {
      id: "elevaciones-laterales",
      name: "Elevaciones Laterales",
      desc: "Con mancuernas, sube los brazos en cruz hasta la altura del hombro. Aísla el deltoides lateral.",
      img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=640&q=80",
    },
    {
      id: "elevaciones-frontales",
      name: "Elevaciones Frontales",
      desc: "Sube las mancuernas al frente hasta la altura del hombro. Trabaja el deltoides anterior.",
      img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=640&q=80",
    },
    {
      id: "pajaros",
      name: "Pájaros (Posterior)",
      desc: "Inclinado hacia delante, abre los brazos hacia atrás. Trabaja el deltoides posterior.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80",
    },
    {
      id: "press-arnold",
      name: "Press Arnold",
      desc: "Con mancuernas, empieza con palmas hacia ti y rota al subir. Trabaja los tres haces del deltoides.",
      img: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=640&q=80",
    },
    {
      id: "encogimientos",
      name: "Encogimientos (Trapecios)",
      desc: "Con barra o mancuernas, sube los hombros hacia las orejas. Trabaja el trapecio superior.",
      img: "https://images.unsplash.com/photo-1567598508481-65985588e295?w=640&q=80",
    },
  ],

  biceps: [
    {
      id: "curl-barra",
      name: "Curl con Barra",
      desc: "De pie, agarra la barra con agarre supino y lleva el peso hacia los hombros.",
      img: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=640&q=80",
    },
    {
      id: "curl-mancuernas",
      name: "Curl con Mancuernas",
      desc: "Alternando o simultáneo, flexiona el codo llevando la mancuerna hacia el hombro.",
      img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=640&q=80",
    },
    {
      id: "curl-concentrado",
      name: "Curl Concentrado",
      desc: "Sentado, apoya el codo en el muslo y sube la mancuerna. Máximo pico del bíceps.",
      img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=640&q=80",
    },
    {
      id: "curl-martillo",
      name: "Curl Martillo",
      desc: "Agarre neutro (palmas enfrentadas). Trabaja el braquial y braquiorradial.",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=640&q=80",
    },
    {
      id: "curl-polea",
      name: "Curl en Polea Baja",
      desc: "Con la polea baja, mantén tensión constante en todo el recorrido.",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&q=80",
    },
    {
      id: "curl-scott",
      name: "Curl Scott (Predicador)",
      desc: "Con el codo apoyado en el banco Scott, aísla completamente el bíceps.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=640&q=80",
    },
  ],

  triceps: [
    {
      id: "press-frances",
      name: "Press Francés",
      desc: "Tumbado, baja la barra EZ por detrás de la cabeza doblando solo los codos.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=640&q=80",
    },
    {
      id: "extensiones-polea",
      name: "Extensiones en Polea Alta",
      desc: "De pie frente a la polea, empuja el cable hacia abajo manteniendo los codos pegados al cuerpo.",
      img: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=640&q=80",
    },
    {
      id: "fondos-triceps",
      name: "Fondos en Banco",
      desc: "Con las manos en el banco y pies en el suelo, baja el cuerpo doblando los codos.",
      img: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=640&q=80",
    },
    {
      id: "patada-triceps",
      name: "Patada de Tríceps",
      desc: "Inclinado, con el codo a 90°, extiende el brazo hacia atrás hasta quedar recto.",
      img: "https://images.unsplash.com/photo-1549476464-37392f717541?w=640&q=80",
    },
    {
      id: "extension-mancuerna",
      name: "Extensión sobre la Cabeza",
      desc: "De pie o sentado, sujeta la mancuerna con ambas manos sobre la cabeza y dobla los codos.",
      img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=640&q=80",
    },
  ],

  piernas: [
    {
      id: "sentadilla",
      name: "Sentadilla con Barra",
      desc: "La reina de los ejercicios. Barra en la espalda, baja hasta que los muslos queden paralelos al suelo.",
      img: "https://images.unsplash.com/photo-1567598508481-65985588e295?w=640&q=80",
    },
    {
      id: "prensa-piernas",
      name: "Prensa de Piernas",
      desc: "Sentado en la máquina, empuja la plataforma con los pies. Cuádriceps y glúteos.",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=640&q=80",
    },
    {
      id: "extension-cuadriceps",
      name: "Extensión de Cuádriceps",
      desc: "Sentado en la máquina, extiende las piernas hasta quedar rectas. Aísla el cuádriceps.",
      img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=640&q=80",
    },
    {
      id: "femoral-tumbado",
      name: "Curl Femoral Tumbado",
      desc: "Tumbado boca abajo, dobla las rodillas llevando los talones al glúteo. Trabaja los isquios.",
      img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=640&q=80",
    },
    {
      id: "zancadas",
      name: "Zancadas (Lunges)",
      desc: "Da un paso adelante y dobla ambas rodillas hasta 90°. Trabaja cuádriceps y glúteos.",
      img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=640&q=80",
    },
    {
      id: "sentadilla-hack",
      name: "Sentadilla Hack",
      desc: "En la máquina de hack squat, pies adelantados para enfocar más el cuádriceps.",
      img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=640&q=80",
    },
    {
      id: "sentadilla-bulgara",
      name: "Sentadilla Búlgara",
      desc: "Pie trasero elevado en el banco, baja la rodilla delantera hasta casi tocar el suelo.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80",
    },
    {
      id: "peso-muerto-rumano",
      name: "Peso Muerto Rumano",
      desc: "Con piernas casi rectas, baja el peso deslizándolo por las piernas. Trabaja los isquios.",
      img: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=640&q=80",
    },
  ],

  gluteos: [
    {
      id: "hip-thrust",
      name: "Hip Thrust",
      desc: "Hombros en el banco, sube las caderas empujando con los glúteos. Peso en las caderas.",
      img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=640&q=80",
    },
    {
      id: "puente-gluteo",
      name: "Puente de Glúteo",
      desc: "Tumbado boca arriba, sube las caderas apretando los glúteos en lo alto.",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&q=80",
    },
    {
      id: "patada-gluteo",
      name: "Patada de Glúteo (Máquina)",
      desc: "En la máquina de patada de glúteo, extiende la pierna hacia atrás y arriba.",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&q=80",
    },
    {
      id: "abduccion",
      name: "Abducción de Cadera",
      desc: "En la máquina de abducción, separa las piernas contra la resistencia. Glúteo medio.",
      img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=640&q=80",
    },
    {
      id: "sentadilla-sumo",
      name: "Sentadilla Sumo",
      desc: "Pies más abiertos que los hombros con punteras hacia afuera. Enfatiza el glúteo interno.",
      img: "https://images.unsplash.com/photo-1567598508481-65985588e295?w=640&q=80",
    },
    {
      id: "step-up",
      name: "Step Up",
      desc: "Sube al step o banco con una pierna, empujando con el glúteo para incorporarte.",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=640&q=80",
    },
  ],

  abdomen: [
    {
      id: "crunch",
      name: "Crunch",
      desc: "Tumbado, sube el torso hacia las rodillas. Contrae el abdomen en lo alto.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80",
    },
    {
      id: "plancha",
      name: "Plancha",
      desc: "Apoyado en antebrazos y punteras, mantén el cuerpo en línea recta. Core completo.",
      img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=640&q=80",
    },
    {
      id: "leg-raises",
      name: "Elevaciones de Piernas",
      desc: "Tumbado, sube las piernas rectas hasta los 90°. Abdomen inferior.",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&q=80",
    },
    {
      id: "russian-twist",
      name: "Russian Twist",
      desc: "Sentado con piernas levantadas, gira el torso de lado a lado. Oblicuos.",
      img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=640&q=80",
    },
    {
      id: "mountain-climbers",
      name: "Mountain Climbers",
      desc: "En posición de plancha, lleva las rodillas alternando hacia el pecho rápidamente.",
      img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=640&q=80",
    },
    {
      id: "ab-wheel",
      name: "Rueda Abdominal",
      desc: "De rodillas, empuja la rueda hacia delante manteniendo el core tenso. Avanzado.",
      img: "https://images.unsplash.com/photo-1583454155184-870a1f63be6e?w=640&q=80",
    },
    {
      id: "crunch-polea",
      name: "Crunch en Polea",
      desc: "De rodillas frente a la polea alta, dobla el tronco hacia abajo tirando de la cuerda.",
      img: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=640&q=80",
    },
  ],

  pantorras: [
    {
      id: "gemelos-maquina",
      name: "Elevaciones en Máquina (de pie)",
      desc: "De pie en la máquina, sube sobre las punteras completamente y baja controlando.",
      img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=640&q=80",
    },
    {
      id: "gemelos-sentado",
      name: "Elevaciones Sentado",
      desc: "Sentado en la máquina con el peso en las rodillas. Trabaja el sóleo más profundo.",
      img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=640&q=80",
    },
    {
      id: "gemelos-prensa",
      name: "Gemelos en Prensa",
      desc: "En la prensa de piernas, empuja la plataforma con las punteras estando las piernas extendidas.",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=640&q=80",
    },
    {
      id: "gemelos-libre",
      name: "Elevaciones con Mancuerna",
      desc: "De pie con un pie en un escalón, sujeta una mancuerna y sube sobre la puntera.",
      img: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=640&q=80",
    },
  ],

  cardio: [
    {
      id: "cinta",
      name: "Cinta de Correr",
      desc: "Correr o caminar a ritmo constante o en intervalos. Ajusta velocidad e inclinación.",
      img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=640&q=80",
    },
    {
      id: "bicicleta",
      name: "Bicicleta Estática",
      desc: "Cardio de bajo impacto. Ajusta la resistencia para trabajar a distintas intensidades.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=640&q=80",
    },
    {
      id: "eliptica",
      name: "Elíptica",
      desc: "Combina tren inferior y superior sin impacto. Ideal para sesiones largas.",
      img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=640&q=80",
    },
    {
      id: "remo-cardio",
      name: "Máquina de Remo",
      desc: "Trabaja cardio y fuerza del tren superior. Impulsa con las piernas y tira con los brazos.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=640&q=80",
    },
    {
      id: "saltar-cuerda",
      name: "Saltar a la Comba",
      desc: "Cardio intenso y económico. Trabaja coordinación, resistencia y potencia de pantorrillas.",
      img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=640&q=80",
    },
    {
      id: "step",
      name: "Step / Escaladora",
      desc: "La máquina stairmaster imita subir escaleras. Cardio + piernas + glúteos.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80",
    },
  ],
};
