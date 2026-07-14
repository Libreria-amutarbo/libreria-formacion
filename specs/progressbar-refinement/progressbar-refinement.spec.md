# Spec: Progressbar Refinement

**Status:** Done
**Date:** 2026-07-09
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-progressbar` muestra el progreso de una tarea. Soporta tres variantes:
`default` (barra simple), `segmented` (barra con segmentos + pulso de carga) y `stepper`
(pasos numerados/con checks). Es un componente de solo presentación (sin outputs),
`OnPush`, basado en señales y `computed`.

Dos problemas motivan el refinamiento:
1. **Accesibilidad crítica ausente**: la barra no expone `role="progressbar"` ni
   `aria-valuenow/min/max`, ni nombre accesible. Un lector de pantalla no la reconoce ni
   anuncia el valor.
2. **Desalineación con el diseño**: el diseño de referencia (`designs/dcx-ng-page-card.html`,
   `.progress-track/.progress-fill/.progress-header`) define una barra fina de **4px**,
   radio **2px**, track `#e5e7eb`, fill `--bg-primary`, y una **cabecera encima** con la
   etiqueta a la izquierda (muted) y el porcentaje a la derecha (color primario, peso 600).
   El componente actual usa track de 8px con radio "pill" y coloca el porcentaje en línea a
   la derecha, no como cabecera.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos
| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| C1 | 4.1.2 Rol y valor | La barra son `<div>` sin `role="progressbar"` ni `aria-valuenow/valuemin/valuemax`. | Añadir `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `[attr.aria-valuenow]` y `[attr.aria-valuetext]="{n}%"` al track (default/segmented). |
| C2 | 1.3.1 / 4.1.2 Nombre accesible | La barra no tiene `aria-label`/`aria-labelledby`. | Input `ariaLabel`; si hay cabecera visible, asociar con `aria-labelledby` a un `id` de instancia. |
| C3 | 4.1.2 Stepper | El stepper no expone progreso ni el paso actual a AT. | `role="progressbar"` con `aria-valuenow=currentStep`, `aria-valuemax=steps.length`, `aria-valuetext="Paso X de Y"`; `aria-current="step"` en el paso activo. |
| C4 | 1.3.1 Decorativos | Segmentos, tooltip, número/check del stepper se anuncian sin aportar info. | `aria-hidden="true"` en segmentos, tooltip, número de paso y checkmark (el valor ya se anuncia vía ARIA). |

### 2.2 WCAG AA — Recomendados
| # | Criterio | Descripción |
|---|----------|-------------|
| R1 | 1.4.11 Contraste no textual | Fill `--bg-primary` (#0058ab) sobre track `#e5e7eb` ≈ 6:1 ✓ (cumple ≥3:1). Se documenta. |
| R2 | 4.1.3 Estado | (Opcional, fuera de scope) para modo indeterminado real se usaría `aria-busy`; el `segmented` actual tiene valor determinado, se mantiene `aria-valuenow`. |

### 2.3 Bugs de lógica
| # | Descripción |
|---|-------------|
| B1 | `computed` sin tipo de retorno explícito (`progressPercentage`, `stepProgress`, flags) — menor, se tipa para claridad. |

### 2.4 Mejoras de UX / coherencia (alineación con el diseño)
| # | Descripción |
|---|-------------|
| U1 | **Track/fill no coinciden con el diseño**: altura 8px → **4px** (`--sp-1`); radio `--r-pill` → **2px** (`--r-xs`); track `--border-light` (#d1d5db) → **#e5e7eb**. |
| U2 | **Cabecera del diseño**: `showLabel` pasa a renderizar la cabecera **encima** de la barra (`.progress-header`): etiqueta a la izquierda (`--text-muted`) + porcentaje a la derecha (`--bg-primary`, peso 600, 12px). Nuevo input `label` para el texto izquierdo ("Progreso"). |
| U3 | Storybook: `argTypes` sin `category` (`Atributos`); faltan stories 0%/100% y "con cabecera". |
| U4 | Página demo: usa `page-container`/`demo-box`; migrar a `demo-page`/`demo-section`. Datos mock del stepper con labels vacíos → usar labels realistas. |

---

## 3. API / Interface

Cambios **additivos** salvo el matiz de presentación de `showLabel` (misma señal, ahora
renderiza la cabecera del diseño). Sin cambios rompedores de tipos.

### Inputs (`input()` signals)
| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `variant` | `DcxProgressVariant` | `'default'` | No | `default` \| `segmented` \| `stepper`. (sin cambios) |
| `value` | `number` | `0` | No | Porcentaje 0–100 (default/segmented). (sin cambios) |
| `label` | `string` | `''` | No | **Nuevo.** Texto de la cabecera (izquierda), p. ej. "Progreso". |
| `ariaLabel` | `string` | `''` | No | **Nuevo.** Nombre accesible cuando no hay cabecera visible. |
| `showLabel` | `boolean` | `false` | No | Muestra la cabecera (etiqueta + %) encima de la barra (formato diseño). |
| `showTooltip` | `boolean` | `false` | No | Tooltip flotante con el %. (sin cambios) |
| `steps` | `DcxProgressStep[]` | `[]` | No | Pasos (stepper). (sin cambios) |
| `currentStep` | `number` | `0` | No | Paso activo (1-based). (sin cambios) |
| `showCheckmarks` | `boolean` | `false` | No | Checks en pasos completados. (sin cambios) |
| `segments` | `number` | `5` | No | Nº de segmentos (segmented). (sin cambios) |

### Outputs
Ninguno (sin cambios).

### Public Methods
`isStepCompleted(i)`, `isStepActive(i)` (sin cambios de firma).

---

## 4. Visual States & Variants
- **Default** — barra fina 4px, fill primario, radio 2px (idéntico al diseño).
- **Default + cabecera** (`showLabel`) — cabecera "Progreso … 82%" encima (diseño).
- **Default + tooltip** — tooltip flotante con el %.
- **Segmented** — barra con divisores + pulso de carga.
- **Stepper** — pasos numerados o con checks; conector entre círculos.

Referencia de diseño: `designs/dcx-ng-page-card.html` (líneas 59–63, 119–120).

---

## 5. SCSS / Tokens (alineación con el diseño)
- `.dcx-progressbar__track`: `height: var(--sp-1, 4px)`; `border-radius: var(--r-xs, 2px)`;
  `background: var(--border-light, #e5e7eb)`.
- `.dcx-progressbar__fill`: `border-radius: var(--r-xs, 2px)`; `background: var(--bg-primary, #0058ab)`.
- **Nueva** `.dcx-progressbar__header`: `display:flex; justify-content:space-between;
  font-size: var(--fs-sm,12px); color: var(--text-muted); margin-bottom: var(--sp-1,4px)`;
  el valor (`span:last-child`) `color: var(--bg-primary); font-weight: 600`.
- Se conservan tooltip, segmentos y estilos del stepper.

---

## 6. Accesibilidad (WCAG AA)

**Default / segmented:**
```
[opcional] div.__header#<labelId>  →  <span>Progreso</span><span>82%</span>
div.__track[role="progressbar"
  aria-valuemin="0" aria-valuemax="100"
  [aria-valuenow]=percentage
  aria-valuetext="82%"
  aria-label | aria-labelledby=<labelId>]
  div.__fill (decorativo)
  div.__segments[aria-hidden]  (segmented)
div.__tooltip[aria-hidden]
```

**Stepper:**
```
div.__stepper[role="progressbar"
  aria-valuemin="1" aria-valuemax=steps.length
  [aria-valuenow]=currentStep
  aria-valuetext="Paso X de Y" aria-label]
  div.__step (activo → aria-current="step")
    div.__step-circle > (número | check)  aria-hidden="true"
    span.__step-label (texto real, visible para AT)
```

No es focalizable (sin `tabindex`). Sin interacción por teclado.

---

## 7. Test Cases
- [ ] should create the component
- [ ] **WCAG:** track por defecto expone `role="progressbar"` + `aria-valuemin/max/now`
- [ ] **WCAG:** `aria-valuenow` refleja el valor clampado (0–100)
- [ ] **WCAG:** `aria-valuetext` muestra "{n}%"
- [ ] **WCAG:** `ariaLabel` se refleja como `aria-label`; con cabecera usa `aria-labelledby`
- [ ] **WCAG:** segmentos y tooltip llevan `aria-hidden="true"`
- [ ] **WCAG (stepper):** `role="progressbar"` con `aria-valuenow=currentStep`, `aria-valuetext="Paso X de Y"`
- [ ] **WCAG (stepper):** el paso activo tiene `aria-current="step"`; número/check con `aria-hidden`
- [ ] **Diseño:** `showLabel` renderiza la cabecera con etiqueta + `{n}%`
- [ ] value clamp: <0 → 0, >100 → 100
- [ ] segmentArray tiene longitud = `segments`

---

## 7b. Decisión: componentes de librería vs HTML nativo

**Decisión:** usar `<div role="progressbar">` con atributos ARIA en lugar del elemento
nativo `<progress>`.

Justificación:
- El diseño requiere control total del track/fill/cabecera y de las variantes
  (segmented con divisores, stepper con círculos); `<progress>` no es estilable de forma
  consistente entre navegadores para este diseño.
- `role="progressbar"` + `aria-valuenow/min/max/valuetext` da la misma semántica a AT.
- Se mantiene la composición existente (`dcx-ng-icon` para el check del stepper).

---

## 8. Out of Scope
- No se eliminan las variantes `segmented` ni `stepper` (existen con tests, stories y
  demo). Solo se alinea la barra **default** al diseño y se añade accesibilidad a todas.
- No se añade modo indeterminado real (`aria-busy`) ni input `indeterminate`.
- No se añaden variantes de color ni de tamaño (el diseño define un único estilo).
- No se cambia la interfaz `DcxProgressStep`.

---

## 9. Open Questions
- [ ] El diseño de la card solo muestra la barra **default**. ¿Mantener `segmented` y
  `stepper` (recomendado: sí, ya están implementados y probados) o el objetivo es reducir
  el componente a la barra simple del diseño? **Recomendación: mantener** y alinear la
  default al diseño.

---

## 10. Implementation Plan
1. Progressbar TS: nuevos inputs `label`, `ariaLabel`; `labelId` (contador estático);
   tipos de retorno en `computed`; helper `stepValueText`.
2. Progressbar HTML: `role="progressbar"` + `aria-value*`/`aria-label(ledby)` en track y
   stepper; cabecera del diseño para `showLabel`; `aria-hidden` en decorativos;
   `aria-current="step"` en el paso activo.
3. Progressbar SCSS: track 4px + radio 2px + color diseño; fill radio 2px; nueva
   `.__header`.
4. Progressbar spec.ts: tests WCAG + diseño (bloque `WCAG AA`).
5. Storybook: `category: 'Atributos'`; stories `Zero`, `Complete`, `WithHeaderLabel`.
6. Página demo: migrar a `demo-page`/`demo-section`; labels realistas; añadir ejemplos
   0%/100% y "con cabecera".
7. Verificar: `nx test dcx-ng-lib` para progressbar.
