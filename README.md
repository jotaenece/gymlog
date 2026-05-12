# GymLog 💪

Aplicación web para gestionar tus entrenamientos en el gimnasio. Funciona 100% en el navegador sin servidor backend. Los datos se guardan en el `localStorage` de tu dispositivo.

## Versión actual: 1.2

---

## Características

- 10 grupos musculares con +50 ejercicios
- Imagen y descripción de referencia para cada ejercicio
- Registro de series con kg, repeticiones y volumen calculado
- Cronómetro automático durante el entrenamiento
- Temporizador de descanso entre series con cuenta regresiva animada
- Detección automática de Récords Personales (PR)
- Pantalla de estadísticas completa con gráficos y distribución muscular
- Historial completo de entrenamientos agrupado por fecha
- Navegación inferior tipo app nativa
- Búsqueda de ejercicios en tiempo real
- Notas por ejercicio durante el entrenamiento
- Referencia de la última sesión de cada ejercicio
- Exportación del historial en JSON
- Diseño mobile-first con soporte de gestos (swipe back)
- Instalable como PWA (Progressive Web App) con soporte offline

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub llamado `gymlog` (o el nombre que prefieras)
2. Sube todos los archivos del proyecto
3. Ve a **Settings → Pages**
4. En **Source**, selecciona `main` branch → `/ (root)`
5. Guarda. En unos minutos la app estará en `https://TU_USUARIO.github.io/gymlog`

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Estructura HTML de todas las pantallas |
| `styles.css` | Estilos (tema oscuro industrial + naranja) |
| `data.js` | Base de datos de grupos musculares y ejercicios |
| `app.js` | Lógica de la aplicación |
| `manifest.json` | Manifiesto PWA (nombre, iconos, colores) |
| `sw.js` | Service Worker para caché offline |

## Grupos musculares incluidos

Pecho · Espalda · Hombros · Bíceps · Tríceps · Piernas · Glúteos · Abdomen · Pantorrillas · Cardio

---

## Changelog

### v1.2 — Mayo 2026

#### Nuevas funcionalidades
- **Temporizador de descanso** — Se activa automáticamente tras registrar una serie. Cuenta regresiva circular con SVG animado. Presets de 30s, 1m, 1:30, 2m y 3m. Ajuste manual de ±15s. Vibración y pitido de audio al finalizar. Se puede activar o desactivar con el botón ⏱ del header durante el entrenamiento.
- **Récords Personales (PR)** — Detección automática usando la fórmula de Epley para estimar el 1RM. Se muestra un toast animado al batir un récord. Los PRs se consultan en la pantalla de Estadísticas y en el modal de cada ejercicio.
- **Referencia de última sesión** — Durante el entrenamiento activo, cada ejercicio muestra las series registradas en la sesión anterior para facilitar la sobrecarga progresiva.
- **Pantalla de Estadísticas** — Nueva sección accesible desde la barra de navegación inferior con: total de entrenamientos, racha de días consecutivos 🔥, volumen total levantado, series totales, músculo favorito, gráfico de actividad de los últimos 7 días, distribución muscular por porcentaje y lista de todos los récords personales.
- **Búsqueda de ejercicios** — Campo de búsqueda en tiempo real en la pantalla de selección de ejercicios, filtrando por nombre y descripción.
- **Notas por ejercicio** — Campo de texto libre por ejercicio durante el entrenamiento activo, guardado en el historial.
- **Exportar datos** — Botón en la pantalla de Historial para descargar un fichero JSON con todos los entrenamientos y récords personales.
- **PWA instalable** — Añadidos `manifest.json` y `sw.js` para que la app se pueda instalar en el móvil como aplicación nativa y funcione sin conexión.

#### Mejoras de UX
- **Barra de navegación inferior** — Navegación tipo tab bar con acceso directo a Inicio, Entrenar, Stats e Historial. Se oculta automáticamente durante el entrenamiento activo.
- **Mini-stats en la pantalla de inicio** — Muestra racha, total de entrenamientos y entrenamientos de la semana actual en cuanto hay datos registrados.
- **Columna de volumen** — La tabla de series incluye una columna con el volumen (kg × reps) de cada serie y el volumen acumulado por ejercicio.
- **Pre-relleno del último peso** — Al añadir una serie, el campo de kg se pre-rellena con el valor de la serie anterior para mayor velocidad.
- **Navegación con teclado** — Pulsar Enter en el campo de kg avanza al campo de reps; Enter en reps registra la serie directamente.
- **Confirmación al salir sin series** — Si se pulsa "Finalizar" sin haber registrado ninguna serie se muestra un diálogo de confirmación.
- **Volumen total en resumen y historial** — El resumen final y cada tarjeta del historial muestran el volumen total levantado en ese entrenamiento.
- **Notas en el historial** — Las notas por ejercicio se muestran en el detalle expandible de cada entrenamiento del historial.
- **Soporte de área segura (notch)** — Uso de `env(safe-area-inset-*)` para compatibilidad con pantallas con notch o Dynamic Island en iOS.

### v1.0 — Versión inicial

- 10 grupos musculares con +50 ejercicios con imagen y descripción
- Registro de series (kg + reps) con cronómetro
- Historial de entrenamientos agrupado por fecha
- Modal de detalle de ejercicio
- Gesto swipe-back en móvil
- Tema oscuro industrial con acento naranja
