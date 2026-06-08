# Spec: DatePicker Refinement

**Status:** Done
**Date:** 2026-06-05
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-date-picker` es un selector de fecha completo con soporte para selección simple, múltiple y de rango. Incluye un campo de entrada con icono de calendario, un panel desplegable con navegación de mes/año, selectores rápidos de mes y año, y botones de Limpiar/Hoy/Aplicar en el footer. Esta refinación corrige múltiples fallos críticos de WCAG AA (HTML semántico, roles ARIA, teclado, focus), un memory leak en el event listener del documento, tipos `any`, CSS con `!important`, y migra la página demo al estándar del proyecto.

**Referencia de diseño:** `designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | Input wrapper es `<div tabindex="0" role="button">` en lugar de `<button>` nativo | Usar `<button>` nativo con `aria-haspopup="dialog"` y `aria-expanded` |
| 2 | 4.1.2 Name, Role, Value | Selectores de mes/año usan `<span role="button" tabindex="0">` | Reemplazar con `<button>` nativo |
| 3 | 4.1.2 Name, Role, Value | Las celdas de día usan `<div role="button" tabindex="0">` | Reemplazar con `role="grid"` + `role="gridcell"` según patrón WAI-ARIA |
| 4 | 4.1.2 Name, Role, Value | Sin `aria-expanded` en el trigger del calendario | Añadir `[attr.aria-expanded]="isOpen()"` |
| 5 | 4.1.2 Name, Role, Value | Sin `aria-selected` en días seleccionados | Añadir `[attr.aria-selected]="day.isSelected"` en gridcells |
| 6 | 4.1.2 Name, Role, Value | Sin `aria-disabled` en días desactivados | Añadir `[attr.aria-disabled]="day.isDisabled || null"` |
| 7 | 2.1.1 Keyboard | Sin navegación por teclado en el grid del calendario | Implementar arrow keys, Enter, Escape, Page Up/Down |
| 8 | 2.4.7 Focus Visible | Sin `:focus-visible` en ningún elemento interactivo | Añadir outline `2px solid var(--border-focus, #1db8f2)` |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 1.4.3 Contrast | Días de otros meses (`text-placeholder` / `#9ca3af` sobre blanco) pueden no alcanzar 4.5:1 — verificar y ajustar |
| 2 | 1.3.1 Info & Relationships | Botones de navegación (anterior/siguiente mes) solo tienen icono SVG — añadir `aria-label` descriptivo |
| 3 | 1.3.1 Info & Relationships | Cabecera del calendario (`dp-header`) sin `aria-live="polite"` para anunciar cambios de mes/año |
| 4 | 2.1.1 Keyboard | Page Up / Page Down para cambiar mes; Shift+Page Up/Down para año (patrón WAI-ARIA dialog) |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | `document.addEventListener('mousedown', ...)` en el constructor sin `removeEventListener` en `ngOnDestroy` → **memory leak** |
| 2 | El tipo `any` en `onCalendarIconClick(event: any)` — debería ser `MouseEvent` |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | SCSS usa `!important` en dos reglas duplicadas para color de iconos del nav (`dp-nav .dcx-icon` y `.dp-nav`) — eliminar duplicado y `!important` |
| 2 | Page demo no usa clases `demo-page` / `demo-section` del estándar del proyecto |
| 3 | Storybook: outputs (`selectedDateChange`, `selectedDatesChange`, `startDateChange`, `endDateChange`) no tienen argTypes definidos en categoría `Eventos` |
| 4 | Falta story de `FormatMMDDYYYY` en la página demo |

---

## 3. API / Interface

Sin cambios breaking. Solo correcciones internas.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `selectedDate` | `Date \| null` | `null` | — | Fecha seleccionada (modo simple) |
| `selectedDates` | `Date[]` | `[]` | — | Fechas seleccionadas (modo multi) |
| `multiSelect` | `boolean` | `false` | — | Activar selección múltiple |
| `rangeSelect` | `boolean` | `false` | — | Activar selección de rango |
| `startDate` | `Date \| null` | `null` | — | Fecha de inicio del rango |
| `endDate` | `Date \| null` | `null` | — | Fecha de fin del rango |
| `minDate` | `Date \| null` | `null` | — | Fecha mínima seleccionable |
| `maxDate` | `Date \| null` | `null` | — | Fecha máxima seleccionable |
| `disabled` | `boolean` | `false` | — | Deshabilita el componente |
| `placeholder` | `string` | `'Select date'` | — | Texto placeholder del campo |
| `dateFormat` | `DateFormat` | `'dd/MM/yyyy'` | — | Formato de fecha mostrado |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `selectedDateChange` | `Date \| null` | Emitido al seleccionar una fecha en modo simple |
| `selectedDatesChange` | `Date[]` | Emitido al cambiar la selección múltiple |
| `startDateChange` | `Date \| null` | Emitido al cambiar la fecha de inicio del rango |
| `endDateChange` | `Date \| null` | Emitido al cambiar la fecha de fin del rango |

### Public Methods (sin cambios de firma)

| Method | Descripción |
|--------|-------------|
| `toggleCalendar()` | Abre/cierra el panel |
| `closeCalendar()` | Cierra el panel |
| `previousMonth()` / `nextMonth()` | Navegar mes |
| `previousYear()` / `nextYear()` | Navegar año |
| `selectDate(day)` | Selecciona un día |
| `applyDate()` | Aplica la selección y cierra |
| `clearDate()` | Limpia la selección |
| `goToToday()` | Navega al mes actual |

---

## 4. Visual States & Variants

Según el diseño en `designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`:

- **Default** — campo de entrada con icono de calendario, calendario cerrado
- **Open** — panel flotante con header azul (`--bg-primary`), grid de días, footer con Limpiar/Aplicar
- **Day: normal** — texto oscuro, fondo transparente, hover con fondo `--bg-hover`
- **Day: other-month** — texto gris muted (`--text-placeholder`)
- **Day: today** — texto en negrita / color `--bg-primary`
- **Day: selected** — fondo `--bg-primary`, texto blanco, border-radius pill
- **Day: in-range** — fondo `#dbeafe` (azul claro), texto `#1d4ed8`
- **Day: disabled** — opacidad 0.35, sin pointer-events, `aria-disabled="true"`
- **Disabled (global)** — campo con opacidad reducida, no abre el calendario
- **Month selector** — grid de meses reemplaza el grid de días
- **Year selector** — lista de años reemplaza el grid de días

El diseño usa botones nativos `<button>` para la navegación (prev/next), confirmado en líneas 439 y 451 del HTML de diseño.

---

## 5. SCSS / Tokens

### Tokens usados
- `--bg-primary`, `--bg-primary-hover` — fondo del header y días seleccionados
- `--bg-hover`, `--bg-default` — hover de días y fondo del panel
- `--text-dark`, `--text-placeholder` — texto de días y otros meses
- `--border-light`, `--border-focus` — borde del campo y outline de foco
- `--r-md`, `--r-lg` — border-radius
- `--fs-sm`, `--fs-base` — tamaños de fuente
- `--shadow-md` — sombra del panel desplegable

### Fixes
- Eliminar la declaración duplicada de `color: #fff !important` en `.dp-nav` y `.dp-nav .dcx-icon`
- Reemplazar hardcoded `#fff` por `var(--content-default-white, #fff)`
- Añadir `:focus-visible` en todos los elementos interactivos del picker
- Añadir estilo para `[aria-selected="true"]` como alternativa CSS a `.selected`

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA del panel

```html
<!-- Trigger -->
<button
  aria-haspopup="dialog"
  [attr.aria-expanded]="isOpen()"
  aria-label="Seleccionar fecha"
>
  <!-- input field + calendar icon -->
</button>

<!-- Panel dialog -->
<div role="dialog" aria-label="Calendario" aria-modal="true">
  <div role="group" aria-label="Mes y año">
    <button aria-label="Mes anterior">←</button>
    <button aria-label="Seleccionar mes">Marzo</button>
    <button aria-label="Seleccionar año">2026</button>
    <button aria-label="Mes siguiente">→</button>
  </div>

  <table role="grid" aria-label="Marzo 2026">
    <thead>
      <tr role="row">
        <th abbr="Lunes">Lu</th> <!-- scope="col" -->
      </tr>
    </thead>
    <tbody>
      <tr role="row">
        <td role="gridcell"
          [attr.aria-selected]="day.isSelected"
          [attr.aria-disabled]="day.isDisabled || null">
          <button [disabled]="day.isDisabled || null">16</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Teclado

| Tecla | Acción |
|-------|--------|
| `Enter` / `Space` en trigger | Abre/cierra el calendario |
| `Escape` | Cierra el calendario, devuelve foco al trigger |
| `ArrowLeft` / `ArrowRight` | Día anterior / siguiente |
| `ArrowUp` / `ArrowDown` | Semana anterior / siguiente |
| `Page Up` | Mes anterior |
| `Page Down` | Mes siguiente |
| `Home` | Primer día de la semana visible |
| `End` | Último día de la semana visible |
| `Enter` en gridcell | Selecciona el día con foco |
| `Tab` | Mueve el foco entre los controles del footer (Limpiar, Hoy, Aplicar) |

### Screen reader notes
- `aria-live="polite"` en el header del calendario para anunciar cambios de mes/año
- `aria-current="date"` en el día de hoy
- `<caption>` o `aria-label` en la tabla del grid con el mes/año actual

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render a native `<button>` as the calendar trigger
- [ ] should have `aria-expanded="false"` when closed
- [ ] should have `aria-expanded="true"` when open
- [ ] should have `aria-haspopup="dialog"` on trigger
- [ ] should render calendar with `role="dialog"` when open
- [ ] should render grid with `role="grid"`
- [ ] should render day cells with `role="gridcell"`
- [ ] should set `aria-selected="true"` on selected day
- [ ] should set `aria-disabled="true"` on disabled days
- [ ] should set `aria-current="date"` on today
- [ ] should close calendar on Escape key
- [ ] should navigate days with arrow keys
- [ ] should select date on Enter key in focused day
- [ ] should open calendar on Enter/Space on trigger
- [ ] should apply `disabled` attribute on trigger when `disabled` input is true
- [ ] should have `:focus-visible` styles on interactive elements

---

## 7b. Decisión: componentes de librería vs HTML nativo

**Calendario grid → `<table>` nativo con `role="grid"`**: El patrón WAI-ARIA "Date Picker Dialog" requiere `role="grid"`, `role="row"` y `role="gridcell"`. Usar `<table>` nativo con `<thead>`/`<tbody>`/`<tr>`/`<td>` provee la semántica correcta con menos ARIA manual.

**Trigger del campo → `<button>` nativo**: El diseño y el patrón WAI-ARIA confirman que el trigger debe ser un `<button>`. Los botones nativos reciben foco, Enter/Space por defecto, y tienen `type="button"` implícito. No usar `DcxNgButtonComponent` para el trigger para evitar añadir capas intermedias que dificultan el control de ARIA.

**Botones footer → `DcxNgButtonComponent`**: Ya se usa y es coherente con el resto de la librería. Se mantiene.

**Botones navegación → `<button>` nativos**: Los botones prev/next son icon-only específicos del datepicker con estilos propios. El diseño los muestra como `<button>` nativos con SVG inline, que es la implementación actual — se mantiene pero se añade `aria-label`.

---

## 8. Out of Scope

- Internacionalización / i18n dinámica (se mantienen los literales en español)
- Soporte de zona horaria (timezone)
- Integración con `ReactiveFormsModule` / `ControlValueAccessor`
- Animaciones de apertura/cierre del panel
- Variante inline (sin campo de texto, calendario siempre visible)
- Virtualización de años en el selector de año

---

## 9. Open Questions

- [ ] ¿El trigger debe ser un `<button>` que envuelve un `<input readonly>`, o solo un `<button>` con el valor como texto? El `<input readonly>` con foco propio complica la gestión de tab order.
- [ ] ¿La navegación con flechas en el grid debe manejar el cambio de mes automáticamente (si arriba desde semana 1, ir a mes anterior)?

---

## 10. Implementation Plan

1. **TS** — Añadir `ngOnDestroy` con `removeEventListener`; tipar `onCalendarIconClick(event: MouseEvent)`; añadir lógica de teclado (`onKeydown`) para el grid del calendario y el trigger
2. **HTML** — Reemplazar div/span con role="button" por `<button>` nativos; convertir el grid de días a `<table role="grid">` con `<thead>/<tbody>/<tr>/<td role="gridcell">`; añadir todos los atributos ARIA; añadir `aria-live="polite"` en el header
3. **SCSS** — Eliminar duplicados y `!important`; añadir `:focus-visible` en todos los interactivos; añadir estilos para `[aria-selected="true"]` y `[aria-current="date"]`
4. **Tests** — Añadir bloque `describe('WCAG AA')` con los casos listados en §7
5. **Storybook** — Añadir argTypes para los 4 outputs en categoría `Eventos`; añadir stories: `WithBothDatesSelected` (rango con fechas), `MonthYearSelector` (modo selector abierto)
6. **Page demo** — Refactorizar a clases `demo-page` / `demo-section`; añadir ejemplo 06 de FormatMMDDYYYY
