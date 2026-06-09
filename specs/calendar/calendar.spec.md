# Spec: Calendar

**Status:** In Progress
**Date:** 2026-06-09
**Author:** GitHub Copilot

---

## 1. Overview

Crear un nuevo componente `dcx-ng-calendar` en la librería DCX para cubrir casos de agenda y planificación visual, separado de `dcx-ng-date-picker`.

La referencia de diseño ya está definida en `designs/dcx-ng-page-calendar.html` y cubre cuatro superficies principales: vista mensual, vista semanal, vista anual y variante mini, además de interacciones de evento como vista rápida, creación, edición y eliminación.

El objetivo funcional de esta tarea es implementar la lógica de calendario, navegación temporal, render de eventos e interacciones base de agenda, manteniendo el diseño como guía visual cerrada.

La implementación se divide en dos fases para controlar el alcance:

- **Fase 1** — page de showcase funcional con las vistas principales, datos mock, navegación temporal e interacciones locales de evento.
- **Fase 2** — extracción/refactor del comportamiento estable a un componente de librería `dcx-ng-calendar`, stories, tests y acabado final.

---

## 2. Acceptance Criteria

- [ ] Existe el nuevo componente standalone `dcx-ng-calendar` en `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-calendar/`.
- [ ] El componente usa `ChangeDetectionStrategy.OnPush` y Signals API (`input`, `output`, `signal`, `computed`, `effect`).
- [ ] El componente soporta vistas `month`, `week`, `year` y `mini`.
- [ ] El componente soporta navegación temporal (`previous`, `next`, `goToToday`) según la vista activa.
- [ ] El componente renderiza eventos en la vista mensual como pills por día con soporte de `+N más` cuando exceden el máximo visible.
- [ ] El componente renderiza eventos en la vista semanal sobre una rejilla horaria.
- [ ] El componente renderiza una vista anual con 12 mini meses navegables.
- [ ] El componente soporta selección de fecha simple y selección de rango al menos en las vistas `month` y `mini`.
- [ ] El componente permite abrir una vista rápida de evento desde un evento renderizado.
- [ ] El componente permite abrir modal de creación de evento desde acciones del calendario o selección de día.
- [ ] El componente permite editar y eliminar eventos existentes desde la vista rápida o modal de edición.
- [ ] El componente expone outputs claros para navegación, selección de fecha y operaciones CRUD de eventos.
- [ ] Existe soporte visual para tipos de evento con color (`meeting`, `delivery`, `reminder`, `urgent`, `personal`).
- [ ] Existe página demo registrada en la app de showcase con ejemplos alineados al diseño.
- [ ] Existen stories y documentación de Storybook para las variantes principales del componente.
- [ ] Existen tests unitarios que cubren navegación, render básico de eventos, selección y operaciones CRUD base.

---

## 3. API / Interface

### Inputs (Angular `input()` signals)

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `view` | `'month' \| 'week' \| 'year' \| 'mini'` | `'month'` | No | Vista activa del calendario |
| `activeDate` | `Date` | `new Date()` | No | Fecha base usada para calcular la vista visible |
| `events` | `DcxCalendarEvent[]` | `[]` | No | Eventos renderizados por el calendario |
| `selectionMode` | `'none' \| 'single' \| 'range'` | `'none'` | No | Modo de selección de fechas |
| `selectedDate` | `Date \| null` | `null` | No | Fecha seleccionada en modo simple |
| `rangeStart` | `Date \| null` | `null` | No | Inicio del rango seleccionado |
| `rangeEnd` | `Date \| null` | `null` | No | Fin del rango seleccionado |
| `firstDayOfWeek` | `'monday' \| 'sunday'` | `'monday'` | No | Primer día de la semana |
| `disabled` | `boolean` | `false` | No | Deshabilita la interacción del calendario |
| `showLegend` | `boolean` | `true` | No | Muestra la leyenda de colores si aplica |
| `allowCreate` | `boolean` | `true` | No | Permite crear eventos desde la UI |
| `allowEdit` | `boolean` | `true` | No | Permite editar eventos |
| `allowDelete` | `boolean` | `true` | No | Permite eliminar eventos |
| `dayMaxVisibleEvents` | `number` | `3` | No | Máximo de eventos visibles por celda antes de mostrar `+N más` |
| `weekStartHour` | `number` | `8` | No | Primera hora visible en vista semanal |
| `weekEndHour` | `number` | `18` | No | Última hora visible en vista semanal |

### Outputs (Angular `output()` signals)

| Name | Emitted Type | Description |
|------|-------------|-------------|
| `viewChange` | `'month' \| 'week' \| 'year' \| 'mini'` | Se emite al cambiar de vista |
| `activeDateChange` | `Date` | Se emite al navegar a otro periodo |
| `dateSelect` | `Date` | Se emite al seleccionar un día |
| `rangeChange` | `{ start: Date \| null; end: Date \| null }` | Se emite al actualizar la selección de rango |
| `eventSelect` | `DcxCalendarEvent` | Se emite al abrir o seleccionar un evento |
| `eventCreate` | `DcxCalendarEventDraft` | Se emite al guardar un nuevo evento |
| `eventUpdate` | `DcxCalendarEvent` | Se emite al actualizar un evento existente |
| `eventDelete` | `DcxCalendarDeleteRequest` | Se emite al confirmar eliminación |

### Public Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `previous` | `(): void` | Navega al periodo anterior según la vista activa |
| `next` | `(): void` | Navega al periodo siguiente según la vista activa |
| `goToToday` | `(): void` | Vuelve a la fecha de hoy y la enfoca/selecciona si aplica |
| `openCreateModal` | `(date?: Date): void` | Abre el modal de creación con una fecha preseleccionada |
| `openEventDetails` | `(event: DcxCalendarEvent): void` | Abre la vista rápida de un evento |
| `closeOverlay` | `(): void` | Cierra popovers o modales abiertos |

### Interfaces propuestas

```ts
export type DcxCalendarView = 'month' | 'week' | 'year' | 'mini';

export type DcxCalendarSelectionMode = 'none' | 'single' | 'range';

export type DcxCalendarEventType =
  | 'meeting'
  | 'delivery'
  | 'reminder'
  | 'urgent'
  | 'personal';

export type DcxCalendarRecurrence = 'none' | 'daily' | 'weekly' | 'monthly';

export interface DcxCalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  type: DcxCalendarEventType;
  description?: string;
  recurrence?: DcxCalendarRecurrence;
}

export interface DcxCalendarEventDraft {
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  type: DcxCalendarEventType;
  description?: string;
  recurrence: DcxCalendarRecurrence;
}

export interface DcxCalendarDeleteRequest {
  eventId: string;
  scope: 'single' | 'following' | 'all';
}
```

---

## 4. Visual States & Variants

Referencia visual principal: `designs/dcx-ng-page-calendar.html`.

- **Month View** — rejilla mensual con pills de eventos por día, indicador de hoy, otros meses y botón `+N más`.
- **Week View** — rejilla horaria con columnas por día y eventos colocados por franja temporal.
- **Year View** — 12 mini meses navegables con realce del mes activo y del día seleccionado/hoy.
- **Mini View** — calendario compacto para selección rápida de fecha.
- **Range Selected** — días de inicio/fin y tramo intermedio resaltados visualmente.
- **Disabled** — opacidad reducida y sin interacción.
- **Event Quick View** — popover con resumen del evento, hora, recurrencia y acciones.
- **Create Event Modal** — formulario para alta de eventos con tipo, título, all-day, horas, descripción y repetición.
- **Edit Event Modal** — mismo formulario con valores precargados y acción de actualizar/eliminar.
- **Delete Confirmation** — diálogo con alcance de borrado (`solo este`, `este y siguientes`, `todos`).

---

## 5. SCSS / Tokens

Usar los tokens ya presentes en el diseño y alineados con la librería:

- `--bg-primary`
- `--bg-primary-hover`
- `--bg-hover`
- `--bg-default`
- `--bg-surface`
- `--text-dark`
- `--text-muted`
- `--text-disabled`
- `--text-white`
- `--border-default`
- `--border-focus`
- `--color-success`
- `--color-error`
- `--color-warning`
- `--color-info-bg`
- `--color-info`
- `--sp-*`
- `--r-*`
- `--ff`

Si alguno no existe globalmente en la librería, usar fallback explícito como en los componentes actuales.

---

## 6. Accessibility (a11y)

- El calendario debe exponer roles y labels adecuados según la vista activa.
- La vista mensual y mini deben usar estructura navegable por teclado con foco visible en el día activo.
- La vista semanal debe permitir navegación por cabeceras/días y selección de eventos renderizados.
- Los botones de navegación temporal deben tener `aria-label` descriptivo.
- Los popovers y modales deben anunciarse como `dialog` y gestionar el foco al abrir/cerrar.
- La selección de rango debe ser interpretable para lector de pantalla (`start`, `end`, `in-range`).
- Los eventos deben anunciar al menos título, fecha y hora cuando reciben foco.
- `Escape` debe cerrar overlays abiertos cuando proceda.

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render month view by default
- [ ] should navigate previous and next month from month view
- [ ] should navigate previous and next week from week view
- [ ] should navigate previous and next year from year view
- [ ] should render event pills in month cells
- [ ] should collapse overflowing month events into a `+N more` indicator
- [ ] should render weekly events in the correct day/time slot
- [ ] should render the yearly grid with 12 mini months
- [ ] should highlight today correctly across supported views
- [ ] should emit `dateSelect` when a day is selected
- [ ] should emit `rangeChange` when range selection is updated
- [ ] should emit `eventSelect` when an event is clicked
- [ ] should emit `eventCreate` when a new event is saved from the modal
- [ ] should emit `eventUpdate` when editing an existing event
- [ ] should emit `eventDelete` with the selected delete scope
- [ ] should disable interaction when `disabled` is true
- [ ] should close quick view and dialogs on escape

---

## 8. Out of Scope

- Persistencia remota o integración con backend.
- Sincronización con Google Calendar, Outlook o archivos ICS.
- Drag and drop de eventos.
- Resize visual de eventos en la vista semanal.
- Motor completo de recurrencia que materialice automáticamente series infinitas.
- Gestión de zonas horarias avanzadas.
- Virtualización para calendarios de gran volumen.

---

## 9. Scope Decisions

- **Dos fases de implementación** — la tarea 121 se abordará primero desde la page de showcase y después se extraerá/compondrá la versión de librería.
- **Recurrencia como metadato** — en esta iteración solo se almacena el valor seleccionado (`none`, `daily`, `weekly`, `monthly`), sin expandir automáticamente series complejas.
- **Creación/edición en capa contenedora al inicio** — para reducir complejidad y acoplamiento, los formularios de crear/editar/borrar vivirán primero en la page de showcase. En fase 2 se evaluará qué parte conviene mover al componente de librería.
- **`+N más` con interacción simple** — en la primera iteración bastará con abrir una vista/listado del día o un detalle simple, sin diseñar todavía un gestor avanzado de overflow.

---

## 10. Implementation Plan

### Fase 1 — Showcase page funcional

1. Crear la page `dcx-ng-page-calendar` y registrar su ruta en la app de showcase.
2. Implementar en la page la navegación temporal, datos mock y render de las vistas `month`, `week`, `year` y `mini`.
3. Implementar selección simple/rango y detalle rápido de evento en la page.
4. Implementar formularios locales de crear, editar y borrar evento con recurrencia como metadato.
5. Añadir test básico de la page y validar que compila/rutea correctamente.

### Fase 2 — Extracción a componente de librería

6. Definir interfaces y fixtures reutilizables de `Calendar` en `core/interfaces/` y `core/fixtures`.
7. Extraer la lógica estable a `dcx-ng-calendar` en la librería.
8. Crear stories y documentación MDX con escenarios de `Month`, `Week`, `Year`, `Mini`, `Range`, `Create/Edit`.
9. Añadir tests unitarios del componente y validar lint/test/build del proyecto afectado.
