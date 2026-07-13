# Spec: Slider Refinement

**Status:** Done
**Date:** 2026-07-13
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-slider` es un wrapper de `dcx-ng-input[type=range]` que añade una etiqueta de valor, orientación vertical y clamping de valor. Usa correctamente un `<input type="range">` nativo como base (heredando `role="slider"` y `aria-valuemin/max/now` gratis del navegador), pero el wrapper no completa el cableado de accesibilidad: no expone nombre accesible, rompe el `:focus-visible` con `!important`, hardcodea `step`, no soporta `disabled`, y tiene un bug de doble fuente de verdad entre el input `value` y `ControlValueAccessor` que rompe la integración con formularios reactivos. Además el layout de la etiqueta no sigue el mock de diseño (`designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`), que muestra label + valor con sufijo de unidad en una fila `space-between`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Nombre accesible (4.1.2) | El componente nunca pasa `label`/`ariaLabel` al `dcx-ng-input` hijo. Con `showLabel=false` (ver ejemplo "Sin label" de la page demo) el `<input type=range>` queda **sin ningún nombre accesible** — lectores de pantalla anuncian solo "slider, 0". | Nuevo input `ariaLabel`, propagado al hijo con fallback a `textLabel()` cuando `showLabel()` es `true`. |
| 2 | Foco visible (2.4.7) | `dcx-ng-slider.component.scss:71-74` fuerza `box-shadow: none !important; border: none !important;` en `:focus-visible`, **eliminando por completo** el anillo de foco del navegador. El slider es inutilizable por teclado sin indicación visual. | Sustituir por un `outline` visible propio (`var(--border-focus, #1db8f2)`), sin `!important`. |
| 3 | `disabled` no soportado (4.1.2 / 1.4.1) | No existe input `disabled`. El SCSS ya tiene estilos para `input:disabled` (líneas 97-108) pero son **inalcanzables** porque nunca se aplica el atributo nativo. El mock de diseño incluye un ejemplo explícito "Duración (deshabilitado)". | Nuevo input `disabled`, propagado al `[disabled]` nativo del hijo. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | `aria-orientation` | El slider vertical no expone `aria-orientation="vertical"` — solo hay una rotación CSS. Añadir el atributo ARIA en `dcx-ng-input` (ya tiene el dato vía `orientation()`, solo falta el binding). |
| 2 | `aria-valuetext` | Cuando se usa `valueSuffix` (nuevo, ver §4), el valor numérico crudo no comunica la unidad a lectores de pantalla (p.ej. "60" en vez de "60k€"). Añadir `aria-valuetext` opcional en `dcx-ng-input`, alimentado por el slider. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | **`step` hardcodeado**: la plantilla pasa `[step]="1"` en vez de `[step]="step()"` (`dcx-ng-slider.component.html:12`) — el input `step` del componente no tiene ningún efecto. |
| 2 | **`writeValue` no clampa**: a diferencia del `effect()` del constructor (que sí clampa contra `min`/`max`), `writeValue()` asigna el valor tal cual, permitiendo que un `FormControl` deje el slider en un valor fuera de rango. |
| 3 | **CVA vs. input `value` — doble fuente de verdad**: el `effect()` del constructor lee `this.value()` (el input signal, que por defecto es `0`) y sobrescribe `valueInput` en cada ejecución, incluida la primera. Cuando el componente se usa con `formControlName` sin bindear `[value]` explícitamente, el `effect()` pisa el valor que `writeValue()` acababa de fijar, dejando el slider en `0` en vez del valor inicial del `FormControl`. Confirmado por el propio test existente `'should reflect value input default when form control value is set without value binding'`, que hoy **espera** `valueInput() === 0` con un `FormControl` inicializado a `20` — es decir, el test documenta el bug como si fuera comportamiento esperado. |
| 4 | **Bug de tipo en el ancho del host**: `[style.width.px]="vertical() ? '100' : '100%'"` (`dcx-ng-slider.component.html:10`) genera CSS inválido en el caso horizontal (`100%px`), literalmente ignorado por el navegador (el ancho real viene de `width:100%` en el SCSS `:host`, por eso no se ha detectado visualmente — pero el binding es incorrecto y confuso). |
| 5 | **`stepInput` computed muerto**: `stepInput = computed(() => this.step())` es un proxy 1:1 de `step()` sin transformación ni uso real en la plantilla — solo se testea a sí mismo. |
| 6 | **CVA con tipos `any`**: `registerOnChange(fn: any)` / `registerOnTouched(fn: any)` — el propio `dcx-ng-input` (su dependencia directa) ya tipa estos métodos correctamente (`(val: string | number | null) => void` / `() => void`). |

### 2.4 Mejoras de UX / coherencia con el mock

| # | Descripción |
|---|-------------|
| 1 | El mock (`designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`, sección Slider) muestra la etiqueta como una fila `space-between`: texto del label a la izquierda, valor **con sufijo de unidad** en negrita y color primario a la derecha (p.ej. "Presupuesto (k€)" ⟷ "60k€"). El componente actual concatena todo en un único `<span>` (`{{textLabel()}} {{valueInput()}}`) sin sufijo de unidad. Curiosamente el SCSS de `.dcx-slider-value-label` ya tiene `justify-content: space-between` (línea 36) preparado para dos elementos — nunca se completó el HTML. |
| 2 | El mock muestra marcas de graduación (`.slider-ticks`) bajo el primer ejemplo únicamente — no es un patrón universal, es una decoración puntual de un solo ejemplo. Se documenta como fuera de alcance (§8). |

---

## 3. API / Interface

### Cambios en `dcx-ng-slider`

#### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción | Tipo de cambio |
|------|------|---------|----------|-------------|-----------------|
| `showLabel` | `boolean` | `true` | No | (sin cambios) | — |
| `textLabel` | `string` | `'Value'` | No | (sin cambios) | — |
| `value` | `number` | `0` | No | (sin cambios) | — |
| `min` / `max` | `number` | `0` / `50` | No | (sin cambios) | — |
| `step` | `number` | `1` | No | (sin cambios, ahora sí se aplica) | — |
| `vertical` | `boolean` | `false` | No | (sin cambios) | — |
| `disabled` | `boolean` | `false` | No | **Nuevo.** Deshabilita el slider (atributo nativo). | ADDITIVE |
| `ariaLabel` | `string \| null` | `null` | No | **Nuevo.** Nombre accesible explícito; si no se indica y `showLabel` es `true`, se usa `textLabel()` como fallback. | ADDITIVE |
| `valueSuffix` | `string` | `''` | No | **Nuevo.** Sufijo de unidad mostrado junto al valor (p.ej. `'k€'`, `' personas'`, `' meses'`) y expuesto vía `aria-valuetext`. | ADDITIVE |

#### Removed

| Name | Motivo | Tipo de cambio |
|------|--------|-----------------|
| `stepInput` (computed público) | Proxy 1:1 de `step()`, sin uso real en plantilla ni valor añadido. | BREAKING (bajo impacto: solo se usaba en sus propios tests) |

#### Outputs — sin cambios (`valueChange`)

#### Public Methods (CVA) — firmas corregidas

| Method | Antes | Después |
|--------|-------|---------|
| `registerOnChange` | `(fn: any) => void` | `(fn: (value: number) => void) => void` |
| `registerOnTouched` | `(fn: any) => void` | `(fn: () => void) => void` |
| `writeValue` | no clampa | clampa contra `min()`/`max()` igual que el `effect()` |

### Cambios en `dcx-ng-input` (dependencia compartida)

Todos aditivos, activados solo para `type=range` (sin efecto en el resto de usos de `dcx-ng-input` en la librería — confirmado que no hay otro consumidor del tipo `range` fuera de `dcx-ng-slider`):

| Name | Type | Descripción |
|------|------|-------------|
| `ariaValueText` (nuevo input) | `string \| null` | Bindea `[attr.aria-valuetext]` en el `<input>` nativo. |
| `aria-orientation` (nuevo binding, no input nuevo) | — | `[attr.aria-orientation]` en el `<input>` nativo, derivado del `orientation()` input ya existente, solo cuando `isRangeType()`. |
| Clase `dcx-ng-input__control--range` (nueva, en `inputClasses()`) | — | Resetea border/padding/box-shadow del "look" de campo de texto cuando `isRangeType()`, para que `dcx-ng-slider` deje de necesitar `::ng-deep` + `!important` para pelear contra los estilos base del input de texto. |

---

## 4. Visual States & Variants

- **Default (horizontal)** — track gris con progreso azul (`--bg-primary`), thumb circular blanco-bordeado.
- **Vertical** — mismo estilo, rotado 90°, host en `flex-direction: row`.
- **Con `valueSuffix`** — cabecera `space-between`: label a la izquierda, valor+sufijo en negrita/color primario a la derecha (según mock).
- **Disabled** — `opacity: .45` en track/thumb, thumb en gris (`--text-disabled`), valor mostrado en color muted, cursor `not-allowed`. (Estilos SCSS ya existen, solo faltaba el atributo nativo para activarlos.)
- **Focus-visible** — anillo `outline: 2px solid var(--border-focus, #1db8f2)` alrededor del thumb/track (nuevo — antes estaba anulado).

Referencia: `designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`, sección Slider (3 ejemplos: Presupuesto, Equipo, Duración deshabilitado).

---

## 5. SCSS / Tokens

- Tokens ya usados correctamente con fallback (`--bg-primary`, `--text-disabled`, `--text-dark`, `--sp-*`, `--ff-base`) — **no** se detectó el patrón de tokens huérfanos visto en otros componentes (navbar, stepper). No requiere corrección de nombres de token.
- Nuevo uso: `--border-focus, #1db8f2` para el anillo de foco (mismo token que accordion/stepper).
- Eliminar `!important` en `:focus-visible`, `:hover`, `border`, `padding`, `box-shadow` dentro de `::ng-deep input[type='range']` — dejan de ser necesarios una vez que `dcx-ng-input__control--range` neutraliza el estilo base de campo de texto en origen (en `dcx-ng-input.component.scss`, sin `::ng-deep`).
- Reestructurar `.dcx-slider-value-label` → contenedor con dos hijos (`.dcx-slider-label`, `.dcx-slider-value`) en vez de un único nodo de texto concatenado; el `justify-content: space-between` ya existente pasa a tener efecto real.
- Añadir estado visual `.dcx-slider-value.is-disabled` (color muted) coherente con el mock.

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA
- El `<input type="range">` nativo provee gratis: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` — no requiere reimplementación manual.
- `aria-label` (o asociación por label visible + `ariaLabel` fallback) para nombre accesible — cierra el hueco crítico §2.1.1.
- `aria-orientation="vertical"` cuando `vertical()` es `true` — cierra §2.2.1.
- `aria-valuetext` cuando hay `valueSuffix` — cierra §2.2.2.
- `disabled` nativo (no solo CSS) — cierra §2.1.3.

### Teclado
El `<input type="range">` nativo ya provee soporte de teclado completo del navegador — **no requiere JS adicional**:

| Tecla | Acción |
|-------|--------|
| `←` / `↓` | Decrementa un `step` |
| `→` / `↑` | Incrementa un `step` |
| `Home` | Va a `min` |
| `End` | Va a `max` |
| `PageUp` / `PageDown` | Salto mayor (definido por el navegador, típicamente 10× step) |

### Lectores de pantalla
- Con `ariaLabel`/`textLabel` cableado, el nombre se anuncia correctamente.
- Con `valueSuffix`, `aria-valuetext` asegura que se anuncie "60k€" en vez de solo "60".

---

## 7. Test Cases

- [x] should create the component (ya existe)
- [ ] `disabled` input propaga `[disabled]` nativo al `<input type=range>`
- [ ] `ariaLabel` input propaga `aria-label` al hijo
- [ ] fallback: sin `ariaLabel` pero con `showLabel=true`, se usa `textLabel()` como `aria-label`
- [ ] `valueSuffix` se refleja en el texto del valor mostrado
- [ ] `valueSuffix` se refleja en `aria-valuetext` del `<input>` nativo
- [ ] `step()` se propaga correctamente al `<input>` nativo (ya no hardcodeado a 1)
- [ ] `writeValue` clampa el valor contra `min`/`max`
- [ ] **Test corregido**: `FormControl` con valor inicial `20` sin `[value]` binding → `valueInput()` debe ser `20` (antes esperaba `0`, documentando el bug)
- [ ] `registerOnChange`/`registerOnTouched` con firmas tipadas (no `any`) — verificación de compilación, no requiere nuevo test runtime
- [ ] host width: binding correcto para horizontal (`100%`) y vertical (`100px`)
- [ ] eliminación de `stepInput` — quitar sus 2 tests dedicados (ya cubiertos por los tests de `step()`)
- [ ] `aria-orientation="vertical"` presente cuando `vertical()` es `true` (en `dcx-ng-input.component.spec.ts`)
- [ ] focus-visible: clase/outline aplicado, no removido (verificación visual/manual + snapshot de estilos si aplica)

---

## 7b. Decisión: componentes de librería vs HTML nativo

`dcx-ng-slider` sigue envolviendo `dcx-ng-input[type=range]`, que a su vez usa `<input type="range">` nativo — arquitectura correcta y ya validada en el Phase 1 (hereda `role="slider"` + `aria-valuemin/max/now` + teclado gratis del navegador). Se mantiene sin cambios estructurales; el refinamiento es de cableado (props no propagadas), no de reemplazo de elementos.

**Decisión adicional**: extender `dcx-ng-input` (componente compartido) con `ariaValueText` y `aria-orientation` en vez de reimplementar el `<input type=range>` dentro de `dcx-ng-slider`. Justificación: son cambios aditivos, activados solo cuando `isRangeType()`, sin consumidores adicionales de `type=range` detectados en `src/app/` fuera del propio slider — riesgo de regresión nulo en el resto de usos de `dcx-ng-input` (text, password, search, etc.).

---

## 8. Out of Scope

- **Marcas de graduación (`.slider-ticks`)**: el mock las muestra en un único ejemplo de tres: no es un patrón universal del componente, sino una decoración puntual. Añadirlas requeriría una nueva API (posiciones/etiquetas de tick) no solicitada. Se deja como posible mejora futura.
- **Tooltip de valor flotante sobre el thumb al arrastrar**: no aparece en el mock ni se ha reportado como requisito.
- **Rango doble (dos thumbs, min-max)**: fuera de alcance, no existe en la implementación actual ni en el mock.
- Reestructuración de `dcx-ng-input` más allá de los 3 cambios aditivos descritos en §3 (no se toca su lógica de `value`/CVA interna).

---

## 9. Open Questions

Ninguna — el mock de diseño es suficientemente claro para las decisiones de layout (label + valor con sufijo, space-between) y no hay ambigüedad de esquema de color (se reutiliza `--bg-primary`, ya usado consistentemente en el componente actual).

---

## 10. Implementation Plan

1. **`core/defaults/slider.ts`**: añadir `disabled: false` a `SLIDER_DEFAULT_VALUES`.
2. **`dcx-ng-input.component.ts`**: añadir `ariaValueText = input<string | null>(null)`; añadir clase `dcx-ng-input__control--range` en `inputClasses()` cuando `isRangeType()`.
3. **`dcx-ng-input.component.html`**: añadir `[attr.aria-valuetext]="ariaValueText()"` y `[attr.aria-orientation]="isRangeType() && orientation() === 'vertical' ? 'vertical' : null"` en el `<input>` nativo.
4. **`dcx-ng-input.component.scss`**: añadir regla `.dcx-ng-input__control--range` que resetea border/padding/background/box-shadow (sin `!important`, misma hoja de estilos).
5. **`dcx-ng-slider.component.ts`**:
   - Añadir inputs `disabled`, `ariaLabel`, `valueSuffix`.
   - Añadir `displayValue = computed(() => \`${this.valueInput()}${this.valueSuffix()}\`)`.
   - Añadir helper `clamp(value: number): number`, usado por el `effect()` y por `writeValue()`.
   - Añadir flag `cvaActive` para que `writeValue()` tome prioridad definitiva sobre el `effect()` de sincronización de `value()` (fix del bug §2.3.3).
   - Tipar `registerOnChange`/`registerOnTouched` (sin `any`).
   - Eliminar `stepInput`.
6. **`dcx-ng-slider.component.html`**:
   - Reestructurar la cabecera de label en `.dcx-slider-label` + `.dcx-slider-value` (usando `displayValue()`).
   - `[step]="step()"` (fix hardcode).
   - `[disabled]="disabled()"`.
   - `[ariaLabel]="ariaLabel() || (showLabel() ? textLabel() : null)"`.
   - `[ariaValueText]="valueSuffix() ? displayValue() : null"`.
   - `[style.width]="vertical() ? '100px' : '100%'"` (fix tipo).
7. **`dcx-ng-slider.component.scss`**:
   - Quitar `!important` de `::ng-deep input[type=range]` (ya no hace falta, ver paso 4).
   - Restaurar `:focus-visible` con `outline: 2px solid var(--border-focus, #1db8f2)`.
   - Añadir `.dcx-slider-value.is-disabled` con color muted.
8. **Tests** (`dcx-ng-slider.component.spec.ts` y `dcx-ng-input.component.spec.ts`): añadir casos nuevos de §7, corregir el test de CVA con expectativa `20`, eliminar los 2 tests de `stepInput`.
9. **Storybook** (`stories/slider/ClassBased.stories.ts`):
   - Traducir `category` de `'Attributes'`/`'Events'` a `'Atributos'`/`'Eventos'` (bug de convención detectado, no mencionado explícitamente en las secciones anteriores pero corregido por ser el estándar del proyecto).
   - Añadir argTypes para `disabled`, `ariaLabel`, `valueSuffix`.
   - Eliminar la story duplicada `ClassBassed` (typo, redundante con `Default`).
   - Añadir story `Disabled`.
10. **`Documentation.mdx`**: quitar el import muerto `./UnStyled.stories` (el fichero no existe).
11. **Page demo** (`dcx-ng-page-slider.component/`):
    - Migrar a `.demo-page`/`.demo-section` (actualmente no las usa).
    - Ejemplo "Sin label" pasa a incluir `ariaLabel="Volumen"` explícito, demostrando el uso correcto.
    - Añadir ejemplos que reflejen los 3 casos del mock (con `valueSuffix`: "Presupuesto" k€, "Equipo" personas, "Duración" meses deshabilitado).
12. Verificación: tests, typecheck, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
