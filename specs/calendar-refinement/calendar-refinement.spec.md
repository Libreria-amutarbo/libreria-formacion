# Spec: Calendar Refinement

**Status:** Done
**Date:** 2026-07-15
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-calendar` es un componente grande (vistas mes/semana/año/mini, selección simple/rango, CRUD de eventos con modales) que **actualmente rompe el build de producción** (`nx build dcx-ng-components` falla) por una API de `dcx-ng-radio` que quedó desactualizada tras la fusión radio+radio-group de esta sesión. Además, la vista mensual no sigue el diseño de `designs/dcx-ng-page-calendar.html` (usa un grid tipo "mini datepicker" en vez de la rejilla mensual espaciosa del mock), y la página demo tiene ~600 líneas de código muerto que reimplementan por duplicado lo que el propio componente ya hace internamente.

Se corrige todo lo anterior siguiendo el mismo proceso que el resto de componentes refinados esta sesión: WCAG, calidad de código, fidelidad al mock, Storybook saneado.

---

## 2. Problemas detectados

### 2.1 Bug crítico — build roto
| # | Problema | Impacto |
|---|---|---|
| 1 | `dcx-ng-page-calendar.component.html:413` usa `[checked]="true"` sobre `<dcx-ng-radio>` — ese input ya no existe (se fusionó radio+radio-group esta sesión: ahora es `options: DcxRadioOption[]` de grupo, no `value`/`checked` por instancia) | **`nx build dcx-ng-components` falla ahora mismo** (`NG8002: Can't bind to 'checked'`) |
| 2 | `dcx-ng-calendar.component.html` (modal de eliminar) usa 3 instancias de `<dcx-ng-radio>` con `value`/`label`/`[ngModel]` por instancia — mismo problema, misma API obsoleta | Angular no hace type-checking estricto de templates en el build de Storybook (por eso ahí "funciona"), pero es la misma API rota; en cuanto se corrija el error de la página, este es el siguiente en romper el build de producción |

### 2.2 Fidelidad al mock (`designs/dcx-ng-page-calendar.html`)
| # | Diferencia | Mock | Implementación actual |
|---|---|---|---|
| 1 | Vista mensual — modelo de interacción | Rejilla espaciosa tipo Google Calendar: celdas de 108px, todo el ancho de la celda es clicable, número de día como badge circular en la esquina, eventos apilados debajo dentro de la celda | Grid compacto tipo "mini selector de fecha": botón-píldora de ancho completo para el número de día, eventos en una lista comprimida debajo — mezcla el modelo de un date-picker con el de un calendario de eventos |
| 2 | Celda de "hoy" | Fondo `#eff6ff` en toda la celda | Solo el número de día en negrita/azul, sin fondo de celda |
| 3 | Columnas de fin de semana | Fondo `#fafafa` diferenciado en cabecera y celdas | Sin diferenciación visual en la vista mensual |
| 4 | Vista rápida del evento (popover) | Tarjeta flotante independiente, 272px, `box-shadow: 0 8px 32px rgba(0,0,0,.18)`, `border-radius: r-lg` | Panel lateral embebido junto al calendario (grid de 2 columnas), 280px, sin sombra, `border-radius: r-xl` |
| 5 | Header del calendario | Igual (fondo `--bg-primary`, nav con flechas, título centrado) — ya coincide | — |
| 6 | Vista semanal / anual / mini | Ya coinciden razonablemente bien con el mock | — |

### 2.3 Calidad de código — página demo
| # | Problema |
|---|---|
| 1 | `dcx-ng-page-calendar.component.ts` tiene ~600 líneas muertas: reimplementa `buildMonthGrid`, `startOfWeek`, `addDays`, `isSameDate`, tipos `CalendarDayCell`/`CalendarMonthSummary`/`EventFormModel`, toda la gestión de modal (`modalMode`, `eventForm`, `openCreateModal`, `saveEvent`, `confirmDelete`...) — nada de esto se usa en el HTML, que solo monta `<dcx-ng-calendar>` (el componente ya hace todo esto internamente) |
| 2 | `createSeedEvents()`/`createRecurringStandups()` en la página duplican exactamente `buildCalendarDemoEvents()`, que ya existe en `core/fixtures/calendar.ts` (mismos ids de evento, literalmente copy-paste) |
| 3 | Sección "05 · Estados del evento" (~300 líneas) es un HTML estático hecho a mano que replica la estructura interna (no pública) del modal del componente, solo para "enseñar" los estados — no es interactivo, y si el componente cambia su marcado interno esta copia queda desincronizada en silencio. Ningún otro componente refinado esta sesión hace esto — todos muestran el componente real e interactivo |

### 2.4 WCAG AA
| # | Criterio | Problema | Solución |
|---|---|---|---|
| 1 | Foco atrapado en modal | `role="dialog" aria-modal="true"` está puesto, pero no hay focus trap ni `aria-labelledby` apuntando al título | Añadir `aria-labelledby`, mover el foco al modal al abrirlo y devolverlo al disparador al cerrarlo |
| 2 | Botones de navegación (`‹`/`›`) | Usan `&#10094;`/`&#10095;` (glifos de texto) en vez de `dcx-ng-icon`, inconsistente con el resto de la librería | Sustituir por `dcx-ng-icon` como en el resto de componentes |
| 3 | Radios del modal de eliminar | Ver 2.1.2 — además de estar roto, con la API nueva gana "agrupación" semántica real (un único `role` de grupo en vez de 3 componentes sueltos) | Migrar a `[options]` |

---

## 3. API

Sin cambios en la API pública de `dcx-ng-calendar` (inputs/outputs se mantienen). Los cambios son internos (marcado del modal de eliminar, estructura visual de la vista mensual y del popover).

---

## 4. Visual — alineación con el mock

- Vista mensual: rejilla de tabla espaciosa (celda ~108px alto), número de día como badge circular (24px) en vez de píldora de ancho completo, celda completa clicable, fondo propio para "hoy" y para fines de semana, eventos como píldoras apiladas dentro de la celda (ya existe la lógica de `dayMaxVisibleEvents`/"+N más", se mantiene).
- Popover de vista rápida: se replica el estilo exacto del mock (272px, sombra flotante, sin borde, `r-lg`). Se mantiene la posición embebida junto al calendario (mejor UX que un floating puro, ya que necesita reposicionarse dinámicamente) pero con el estilo visual del mock.
- Resto de vistas (semana/año/mini) y modales de crear/editar/eliminar: ya siguen el mock razonablemente bien, solo se ajustan detalles menores (iconos de navegación, radios).

---

## 5. SCSS / Tokens

Se reescribe la sección de la vista mensual (`.dcx-calendar__grid`, `.dcx-calendar__day-button`, `.dcx-calendar__month-pill`) para el nuevo modelo de celda espaciosa. Se ajusta `.dcx-calendar-popover--embedded` a los valores exactos del mock. El resto de tokens ya usados (`--bg-primary`, `--text-dark`, `--border-light`, etc.) se mantienen — ya siguen la convención del resto de componentes.

---

## 6. Accesibilidad (WCAG AA)

- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` en los 3 modales (crear/editar, eliminar).
- Foco inicial al abrir el modal sobre el primer campo; `Escape` ya cierra (`handleEscape`, se mantiene); foco devuelto al elemento que abrió el modal al cerrar.
- Iconos de navegación (`‹`/`›`) migrados a `dcx-ng-icon` con `aria-hidden`, los botones ya llevan `aria-label`.
- Radios del modal de eliminar: un único `dcx-ng-radio` con `[options]`, conserva `[ngModel]`/`(ngModelChange)` para el two-way binding con `deleteScope`.
- Celda de día completa como `<button>` (ya lo es) — se mantiene, solo cambia el tamaño/estilo.

---

## 7. Test Cases

- [ ] El componente compila y el build de producción (`nx build dcx-ng-components`) pasa sin errores
- [ ] El modal de eliminar renderiza un único `dcx-ng-radio` con las 3 opciones y refleja `deleteScope` correctamente
- [ ] Cambiar la opción del radio actualiza `deleteScope()` (`setDeleteScope`)
- [ ] La celda de "hoy" en vista mensual tiene la clase/estilo de fondo distintivo
- [ ] Las columnas de fin de semana en vista mensual tienen la clase distintiva
- [ ] (Se mantienen todos los tests ya existentes de navegación, selección, rango, CRUD de eventos — no se tocan si siguen pasando)

---

## 7b. Decisión: componentes de librería vs HTML nativo

- Radios del modal de eliminar: `dcx-ng-radio` (ya se usaba, se corrige la API)
- Iconos de navegación: `dcx-ng-icon` en vez de glifos de texto — consistente con el resto del componente (ya usa `dcx-ng-icon` para editar/eliminar/cerrar)
- Resto de controles del formulario (input/select/textarea nativos): se mantienen nativos, igual que están — no hay un `dcx-ng-input`/`dcx-ng-select` que encaje sin más peso visual del que ya se decidió evitar en el spec original de este componente (fuera del alcance de este refinamiento revisar eso)

---

## 8. Out of Scope

- Rediseñar el modelo de datos de eventos o el CRUD (`DcxCalendarEvent`, outputs) — se mantiene igual
- Migrar los inputs de texto/select/textarea del formulario de evento a `dcx-ng-input`/`dcx-ng-select` (no se pidió, y son form fields simples ya funcionales)
- Añadir recurrencia real (el `recurrence` ya existe pero es solo metadato, no genera instancias repetidas) — comportamiento ya existente, no se toca

---

## 9. Open Questions

- [ ] La sección "05 · Estados del evento" de la página demo (HTML estático replicando el modal) — propongo **eliminarla** y confiar en el modal real e interactivo de la sección 01 (clic en "Nuevo evento" / en un evento existente) para mostrar esos estados, igual que hace el resto de páginas ya refinadas. ¿Confirmas que puedo quitarla, o prefieres mantener un showcase estático de los 4 estados del modal?

---

## 10. Implementation Plan

1. Arreglar el radio del modal de eliminar en `dcx-ng-calendar.component.ts/html` (un `deleteScopeOptions: DcxRadioOption[]`, un único `<dcx-ng-radio [options]="deleteScopeOptions" [ngModel]="deleteScope()" (ngModelChange)="setDeleteScope($event)">`)
2. Sustituir los glifos `&#10094;`/`&#10095;` por `dcx-ng-icon`
3. Reescribir la vista mensual (HTML + SCSS) para la rejilla espaciosa del mock: celda 108px, badge circular de día, fondo de "hoy"/fin de semana, celda completa clicable
4. Ajustar el popover de vista rápida a los valores exactos del mock
5. Añadir `aria-labelledby` + gestión de foco a los 3 modales
6. Limpiar `dcx-ng-page-calendar.component.ts`: quitar ~600 líneas muertas, usar `buildCalendarDemoEvents()` de fixtures en vez de reimplementarlo, tipar con `DcxCalendarEvent`/`DcxCalendarEventType`/`DcxCalendarRecurrence` importados
7. Corregir el radio roto (`[checked]="true"`) en la página y decidir sobre la sección 05 (ver pregunta abierta)
8. Verificación: tests, lint, `nx build dcx-ng-components`, `nx build-storybook dcx-ng-lib`
