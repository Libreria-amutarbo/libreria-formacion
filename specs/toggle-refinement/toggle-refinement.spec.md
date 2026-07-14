# Spec: Toggle Refinement

**Status:** Done
**Date:** 2026-07-13
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-toggle` es un switch on/off implementado como `<div role="switch">` con manejo de teclado dividido entre el host y el div interno. Tiene el bug visual más grave detectado en esta serie de refinamientos: **todas sus variables CSS de color (`--background-off`, `--background-primary`, `--background-primary-hover`, `--content-default-white`, `--background-disabled`, `--background-secondary-light`, `--background-default`) no existen en ningún sitio del proyecto y no tienen fallback**, a diferencia del resto de la librería, que siempre usa `var(--token, #fallback)`. El resultado es que el track/thumb probablemente se renderizan sin color (transparente/heredado) en la app real. Además, el nombre accesible cae en el literal `"Toggle"` incluso cuando hay un `label` visible (fallo de Label-in-Name), y el mock de diseño (`designs/dcx-ng-page-checkbox-toggle-chip.html`) define dimensiones de tamaño completamente distintas a las implementadas, además de un tamaño `xl` que no existe en el componente pese a estar ya expuesto en `SIZE_LIST` y usado en la página de demo.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Nombre accesible / Label-in-Name (2.5.3, 4.1.2) | `ariaLabelBinding = computed(() => this.ariaLabel() || 'Toggle')` (ts:31) — si no se indica `ariaLabel` explícito, el nombre accesible es el literal **"Toggle"**, incluso cuando `label()` tiene texto visible ("Dark mode", "Disabled"…). 5 de los 6 ejemplos de la página de demo caen en este caso. | Fallback: `ariaLabel() \|\| label() \|\| 'Toggle'`. |
| 2 | Elemento interactivo no nativo, teclado partido entre dos nodos | El interactivo es un `<div role="switch">` (html:1-9); el manejo de teclado está en `@HostListener` sobre el **host** `<dcx-ng-toggle>` (ts:51-58) mientras el `tabindex` vive en el **div interno** (html:7) — funciona solo porque `keydown` hace bubble, pero es una arquitectura frágil con dos nodos implicados en una sola interacción. | Cambiar a `<button type="button" role="switch">` — foco, `disabled` nativo y activación por Enter/Espacio gratis del navegador; se elimina el `@HostListener`/`@HostBinding`. |
| 3 | Tokens de color inexistentes, sin fallback | `--background-off`, `--background-primary`, `--background-primary-hover`, `--content-default-white`, `--background-disabled`, `--background-secondary-light`, `--background-default` (scss:29,35,36,40,84,95,125,130) no están definidos como custom properties en ningún sitio del repo (confirmado por búsqueda global) y no tienen fallback — a diferencia de TODO el resto de componentes refinados esta sesión, que usan `var(--token, #fallback)`. El track/thumb se renderizan sin color. | Sustituir por los tokens reales usados en el resto de la librería (`--bg-primary`, `--bg-primary-hover`, `--bg-default`, `--text-disabled`, `--border-default`…) con fallback, tomando los valores exactos del mock de diseño. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | `focus-visible` | `&:focus { outline: none; }` + `&:focus .dcx-ng-toggle__track::after { ... }` (scss:135-146) muestra el anillo en **cualquier** foco, incluido clic de ratón — inconsistente con el resto de la librería, que usa `:focus-visible`. |
| 2 | `disabled` nativo | Al ser un `<div>`, el bloqueo de interacción es solo lógico (`if (this.disabled()) return`, ts:44,54) sin `aria-disabled` ni `disabled` nativo — se resuelve gratis al pasar a `<button disabled>`. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | **Tamaño `xl` no implementado**: `SIZE_LIST` incluye `'xl'` y la propia página de demo lo usa (`dcx-ng-page-toggle.component.html:96-101`), pero el SCSS solo define `&--s`, `&--m`, `&--l` (scss:45-61) — al seleccionar `xl` el toggle cae al tamaño `:host` por defecto, sin aviso. |
| 2 | **Dimensiones de tamaño no coinciden con el mock**: el mock define pistas de 28/36/44/52px (s/m/l/xl) con thumbs de 12/16/20/24px; el componente actual usa `rem` con valores muy distintos (p.ej. `m` = 64px×28px de pista frente a 36px×20px del mock). |
| 3 | **Reglas CSS duplicadas/conflictivas para disabled+checked**: `.disabled[aria-checked='true'] .dcx-ng-toggle__track` (scss:27-31) y `&[aria-checked='true'] .dcx-ng-toggle__track` (scss:123-127) compiten sobre el mismo elemento; solo gana por especificidad, no por una cascada clara. El mock resuelve el estado disabled con una única regla de `opacity: .45` sobre todo el componente, mucho más simple. |
| 4 | **`@HostBinding('attr.aria-label')` en el elemento equivocado**: se aplica al host `<dcx-ng-toggle>` (ts:30-31), que no tiene rol ni forma parte del cálculo de nombre accesible del switch (que vive en el div interno, que ya tiene su propio `[attr.aria-label]` idéntico, html:6) — código muerto/duplicado. |
| 5 | **Selector duplicado en la página de demo**: `selector: 'dcx-ng-dcx-ng-page-toggle'` (`dcx-ng-page-toggle.component.ts:7`) — artefacto de copia/pegado. |
| 6 | **`ReactiveFormsModule` importado y sin usar** en la página de demo (`dcx-ng-page-toggle.component.ts:3,9`) — ningún `formControl` se llega a bindear; sugiere una integración con formularios que nunca se completó. |
| 7 | Falta `ChangeDetectionStrategy.OnPush` (a diferencia de `dcx-ng-checkbox`, que sí lo tiene). |

### 2.4 Storybook / Documentación

| # | Descripción |
|---|-------------|
| 1 | `Documentation.mdx` está íntegramente en inglés, rompiendo la convención en español del resto de la librería. |
| 2 | `Documentation.mdx:3,19` importa y usa `ToggleUnstyledStories` desde `./UnStyled.stories`, fichero que **no existe** — rompe la build de Storybook docs. |
| 3 | `Documentation.mdx:40` documenta una propiedad `color` que **no existe** en el componente, contradicho por su propia frase siguiente ("no configurable via component properties"). |
| 4 | `Documentation.mdx:39` documenta `size: 'small' \| 'medium' \| 'large'` — los valores reales son `'s' \| 'm' \| 'l' \| 'xl' \| 'auto'`. El ejemplo de uso (mdx:66) usa `size="medium"`, valor inválido. |
| 5 | `textPosition` no aparece en absoluto en "Available Properties" pese a tener 4 stories dedicadas. |
| 6 | Categorías de `argTypes` en inglés (`'Attributes'`); no existe categoría `Eventos` para `toggled`; sin `description` en ningún campo. |

---

## 3. API / Interface

### Inputs — sin cambios de tipo, un cambio de comportamiento
- `ariaLabel`: el fallback de nombre accesible pasa a `ariaLabel() || label() || 'Toggle'` (antes `ariaLabel() || 'Toggle'`).
- `size`: se documenta explícitamente que `'auto'` no tiene una implementación visual dedicada (igual que en otros componentes de esta librería) — fuera de alcance añadir soporte real para `'auto'` aquí (ver §8).

### `ControlValueAccessor` (nuevo, aditivo)

| Method | Firma |
|--------|-------|
| `writeValue` | `(value: boolean) => void` |
| `registerOnChange` | `(fn: (value: boolean) => void) => void` |
| `registerOnTouched` | `(fn: () => void) => void` |

`checked` (ya existente, `model<boolean>`) sigue siendo el estado interno; `writeValue` lo actualiza, `toggle()` invoca `onChange`/`onTouched` además de emitir `toggled` (comportamiento existente preservado). Justificación: cierra el hueco evidenciado por el import muerto de `ReactiveFormsModule` en la página de demo (§2.3.6).

### Cambios internos (no público)
- Se elimina `@HostListener('keydown.enter'/'keydown.space')` y `@HostBinding('attr.aria-label')` — el `<button>` nativo los sustituye.
- `handleKeyboardToggle` se elimina (el `<button>` gestiona Enter/Espacio de forma nativa).

---

## 4. Visual States & Variants

- **Off / On** — pista gris (`#d1d5db`) / pista `--bg-primary`, thumb blanco, transición de posición.
- **Disabled** — `opacity: .45` uniforme sobre todo el componente (pista+thumb+label), igual que el mock; se eliminan los overrides de color por separado.
- **Focus-visible** — anillo `outline: 2px solid var(--border-focus, #1db8f2)`.
- **Tamaños** — `s` (28×16px, thumb 12px), `m` (36×20px, thumb 16px), `l` (44×24px, thumb 20px), **`xl`** (52×28px, thumb 24px, nuevo), todos con offset de 2px, exactos según el mock.
- **Posición del texto** — `top`/`bottom`/`left`/`right`, sin cambios.

Referencia: `designs/dcx-ng-page-checkbox-toggle-chip.html` (sección Toggle, líneas 113-153, 311-410).

---

## 5. SCSS / Tokens

Sustitución completa de tokens rotos por los reales, con fallback (valores tomados del mock):

| Token roto (sin fallback) | Token real |
|---|---|
| `--background-off` | `--border-default, #d1d5db` |
| `--background-primary` | `--bg-primary, #0058ab` |
| `--background-primary-hover` | `--bg-primary-hover, #004f9a` |
| `--content-default-white` | `--bg-default, #ffffff` |
| `--background-disabled`, `--background-secondary-light`, `--background-default` | eliminados — sustituidos por `opacity: .45` uniforme en `.disabled` |

Nuevo: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)` en el thumb (ya existía vía `var(--shadow-sm)`, se mantiene si el token está definido; si no, se usa el valor literal del mock como fallback explícito).

---

## 6. Accesibilidad (WCAG AA)

- `<button type="button" role="switch">` — foco, `disabled` nativo, activación Enter/Espacio nativa.
- `[attr.aria-checked]="checked()"` — sin cambios, ya correcto.
- `[attr.aria-label]` con fallback `ariaLabel() || label() || 'Toggle'`.
- `[disabled]="disabled()"` nativo (sustituye el bloqueo puramente lógico + `tabindex` manual).
- `:focus-visible` en vez de `:focus`.

---

## 7. Test Cases

- [x] should create (ya existe)
- [ ] el elemento interactivo es un `<button>`, no un `<div>`
- [ ] `aria-label` usa `label()` como fallback cuando no hay `ariaLabel` explícito
- [ ] `aria-label` cae en `'Toggle'` solo cuando ni `ariaLabel` ni `label` están presentes
- [ ] `disabled` nativo bloquea clic y teclado sin lógica adicional
- [ ] tamaño `xl` aplica la clase y dimensiones correctas
- [ ] `ControlValueAccessor`: `writeValue` actualiza `checked()`
- [ ] `ControlValueAccessor`: `registerOnChange`/`registerOnTouched` se invocan en `toggle()`
- [ ] integración con `FormControl`: valor inicial se refleja, cambios se propagan en ambas direcciones
- [ ] tests existentes de `toggle()`, `disabled`, `sizeClasses`, `textPosition` siguen pasando (adaptados al nuevo `<button>`)
- [ ] tests de `handleKeyboardToggle` se eliminan (método eliminado); se sustituyen por un test de activación de teclado a nivel de DOM sobre el `<button>` (Enter/Espacio nativos, sin lógica propia que testear más allá de que `toggle()` se dispare vía `click`, que el navegador sintetiza a partir de Enter/Espacio en un `<button>`)

---

## 7b. Decisión: componentes de librería vs HTML nativo

Cambio de `<div role="switch">` a `<button type="button" role="switch">`, siguiendo el mismo criterio ya aplicado a accordion y tabs en esta serie de refinamientos: un elemento nativo interactivo aporta foco, `disabled` y activación por teclado sin reimplementación manual, eliminando la arquitectura frágil de "tabindex en un nodo, keydown en otro".

---

## 8. Out of Scope

- Soporte visual real para `size="auto"` — no implementado en ningún componente de esta librería que usa `DcxSize`; se mantiene el mismo alcance que el resto (cae al tamaño por defecto del `:host`, comportamiento ya documentado como conocido en otros componentes).
- Añadir un slot de hint/error — el mock no muestra ninguno para toggle, a diferencia de textarea.

---

## 9. Open Questions

Ninguna — el mock resuelve tamaños y colores sin ambigüedad, y los tokens rotos tienen un mapeo 1:1 claro a los tokens reales ya usados en el resto de la librería.

---

## 10. Implementation Plan

1. **`dcx-ng-toggle.component.ts`**:
   - Eliminar `@HostListener`, `@HostBinding`, `handleKeyboardToggle`.
   - Renombrar `ariaLabelBinding` → `effectiveAriaLabel`, fallback `ariaLabel() || label() || 'Toggle'`.
   - Añadir `ChangeDetectionStrategy.OnPush`.
   - Implementar `ControlValueAccessor` (`forwardRef`, `NG_VALUE_ACCESSOR`, `writeValue`, `registerOnChange`, `registerOnTouched`); invocar `onChange`/`onTouched` desde `toggle()`.
2. **`dcx-ng-toggle.component.html`**: `<div>` → `<button type="button">`; `[disabled]="disabled()"` nativo; quitar `[attr.tabindex]` manual; `[attr.aria-label]="effectiveAriaLabel()"`.
3. **`dcx-ng-toggle.component.scss`**: sustituir todos los tokens rotos (tabla §5); eliminar los bloques de color disabled duplicados en favor de `opacity: .45` uniforme; reescribir las dimensiones de `&--s/m/l` con los valores exactos del mock y añadir `&--xl`; sustituir `:focus` por `:focus-visible` con `outline`, eliminar el pseudo-elemento `::after`.
4. **Tests** (`dcx-ng-toggle.component.spec.ts`): adaptar a `<button>`; eliminar tests de `handleKeyboardToggle`; añadir casos de §7.
5. **Storybook** (`stories/Toggle/ClassBased.stories.ts`): traducir categorías a `Atributos`/`Eventos`; añadir `description` en español; añadir story de tamaño `xl`.
6. **`Documentation.mdx`**: traducir íntegramente a español; eliminar import/Canvas de `UnStyled.stories`; quitar la propiedad `color` inventada; corregir los valores de `size`; añadir `textPosition` a la tabla de propiedades.
7. **Page demo** (`src/app/pages/dcx-ng-page-toggle/`): corregir selector duplicado; migrar a `.demo-page`/`.demo-section`; quitar `ReactiveFormsModule` sin usar (o completar la integración ahora que hay CVA, ver decisión de implementación).
8. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
