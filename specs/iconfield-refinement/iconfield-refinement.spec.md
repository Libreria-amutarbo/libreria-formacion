# Spec: IconField Refinement

**Status:** Done
**Date:** 2026-07-14
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-icon-field` es un wrapper puramente visual (sin `ControlValueAccessor` propio) que añade un icono a la izquierda o derecha de un `<dcx-ng-input>` proyectado vía `<ng-content>`, reescribiendo el estilo del input hijo con `::ng-deep` para que el borde/fondo lo aporte el contenedor. El icono se renderiza **siempre** como un `<dcx-ng-button>` real (focuseable, tab-stop), incluso cuando nadie escucha `iconClick` — en la página de demo, 2 de los 3 ejemplos no tienen ningún manejador de clic, pero el icono sigue siendo un botón anunciado como el genérico **"Button"** (sin `ariaLabel`). Además hay un bug real de CSS: el override `!important` que elimina el borde del input hijo también elimina el borde de **error** cuando el input está inválido, y una variable CSS (`--color-primary-light`) usada en el anillo de foco no existe en ningún sitio del proyecto ni tiene fallback — mismo patrón de bug ya visto en `dcx-ng-toggle` y `dcx-ng-tooltip`. La `Documentation.mdx` describe una API completamente inventada (`iconLeft`, `iconRight`, `value`, `formControlName` sobre el propio `dcx-ng-icon-field`) que no se corresponde en nada con el componente real.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Nombre accesible del icono interactivo (4.1.2) | El icono se renderiza siempre como `<dcx-ng-button icon variant="icon-only">` sin `label` ni `ariaLabel` (html:7-14, 20-27) — `dcx-ng-button` cae en el genérico `"Button"` cuando ninguno está presente (`dcx-ng-button.component.ts:78-84`). Todo icon-field de esta librería se anuncia hoy como "Button" a lectores de pantalla. | Nuevo input `iconAriaLabel`, obligatorio quando `iconClickable` es `true`; se propaga al `ariaLabel` del botón interno. |
| 2 | Elemento interactivo sin propósito (2.1.1 / mejores prácticas) | El icono es **siempre** un `<button>` focuseable, incluso en los 2 de 3 ejemplos de la demo que no escuchan `(iconClick)` — un tab-stop sin ninguna acción real, ruido para usuarios de teclado/lector de pantalla. Curiosamente ya existe un atributo `isIconClickable` puesto en la plantilla (html:12,25) que **no es un input real de `dcx-ng-button`** — código muerto que sugiere que esta distinción se pretendía implementar y nunca se completó. | Nuevo input `iconClickable` (default `false`): si es `false`, se renderiza un `<dcx-ng-icon>` puramente decorativo (ya gestiona `aria-hidden` internamente cuando no tiene `ariaLabel`, `dcx-ng-icon.component.ts:27`); si es `true`, se renderiza el `<dcx-ng-button>` interactivo con `iconAriaLabel`. |
| 3 | Estado de error visualmente perdido (1.4.1 / 3.3.1) | `::ng-deep .dcx-ng-input__control.is-invalid { border: none !important; box-shadow: none !important; }` (scss:55-58) anula el borde rojo que el propio `dcx-ng-input` aplica cuando `isInvalid` es `true` — el `aria-invalid` sigue presente en el DOM, pero desaparece la única señal visual del error. | Eliminar ese bloque; usar `.icon-field:has(.dcx-ng-input__control.is-invalid)` para aplicar el borde de error en el **contenedor** (que es quien realmente muestra el borde, ya que el borde del input hijo se suprime intencionadamente). |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | `disabled` no se propaga al icono | No existe ningún input `disabled` en `DcxNgIconFieldComponent`; si el input proyectado se deshabilita, el botón del icono sigue siendo interactivo. |
| 2 | `:focus-within` no distingue ratón de teclado | `&:focus-within` (scss:70-73) se activa igual con clic de ratón que con foco de teclado — no es un problema WCAG estricto (`:focus-within` es una señal válida para un contenedor), pero es inconsistente con el resto de componentes ya refinados que usan `:focus-visible` en sus propios controles. Se mantiene `:focus-within` (es lo correcto para un wrapper que no es él mismo focuseable) pero se corrige el token roto que lo acompaña. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | **Token roto sin fallback**: `box-shadow: 0 0 0 2px var(--color-primary-light);` (scss:72) — `--color-primary-light` no está definida en ningún sitio del proyecto (confirmado por búsqueda global) y no tiene fallback; el anillo de foco del contenedor probablemente no se ve. |
| 2 | **`has-left`/`has-right` siempre iguales**: `[class.has-left]="iconPositionChange()"` y `[class.has-right]="iconPositionChange()"` (html:3-4) están enlazados al **mismo** valor devuelto por `iconPositionChange()` — cuando `iconPosition` es `'right'`, ambas clases se aplican simultáneamente (ninguna se aplica correctamente solo cuando corresponde). Hoy es inerte porque no hay reglas SCSS para `.has-left`/`.has-right`, pero es lógica rota lista para causar un bug visual en cuanto alguien la use. |
| 3 | **`isIconClickable` no existe como input**: puesto en la plantilla dos veces (html:12,25) sin ningún efecto — `dcx-ng-button` no declara ese input. Código muerto. |
| 4 | Falta `ChangeDetectionStrategy.OnPush` (`ChangeDetectionStrategy.Default` explícito, ts:22). |
| 5 | `Documentation.mdx` importa `./UnStyled.stories`, fichero inexistente — rompe la build de Storybook docs. Además documenta `iconLeft`/`iconRight`/`value`/`valueChange`/`formControlName`/`disabled` como si fueran inputs/outputs reales de `dcx-ng-icon-field` — **ninguno existe**; los reales son `iconName`/`iconPosition`/`iconSize`/`iconClick`. Los `<Canvas>` referencian stories (`IconLeft`, `IconRight`, `BothIcons`, `SizeLarge`) que tampoco existen — los nombres reales son `ClassBased`/`IconInRightPosition`/`IconClickable`. |

### 2.4 Storybook / Documentación

| # | Descripción |
|---|-------------|
| 1 | Categorías de `argTypes` en inglés (`'Attributes'`/`'Events'`); descripción de `iconClick` en inglés; `iconSize` sin descripción. |
| 2 | Página de demo (`dcx-ng-page-iconField`) es una de solo 2 páginas de las 37 de la app que **todavía no** usan `.demo-page`/`.demo-section` (confirmado por búsqueda en toda la app) — usa `<section>`/`<h2 class="example-title">`/`<hr>` bespoke. |

### 2.5 Coherencia con el mock / decisión de composición

| # | Descripción |
|---|-------------|
| 1 | El mock (`designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`, líneas 64-72, 154-270) muestra un ejemplo de contraseña con icono de candado a la izquierda **y** un icono de ojo (mostrar/ocultar) a la derecha simultáneamente. El componente actual solo admite un icono a la vez (`iconPosition: 'left' | 'right'`). |
| 2 | Ninguno de los ejemplos actuales (stories ni página de demo) pasa `label` al `dcx-ng-input` proyectado — todos usan solo `placeholder`, que no es un sustituto válido de una etiqueta accesible. |

---

## 3. API / Interface

### Nuevos inputs

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `iconClickable` | `boolean` | `false` | Si `true`, el icono se renderiza como `<dcx-ng-button>` interactivo (requiere `iconAriaLabel`); si `false` (por defecto), se renderiza como `<dcx-ng-icon>` decorativo, sin foco. **Cambio de comportamiento por defecto** (ver §7b): hoy el icono es siempre un botón. |
| `iconAriaLabel` | `string \| null` | `null` | Nombre accesible del botón del icono. Obligatorio en la práctica cuando `iconClickable` es `true`. |
| `disabled` | `boolean` | `false` | Deshabilita el botón del icono (cuando `iconClickable` es `true`) y aplica un estado visual atenuado al contenedor. |

### Inputs existentes — sin cambios de tipo
`iconName`, `iconPosition`, `iconSize`.

### Cambios internos (no público)
- Se elimina el computed `iconPositionChange` (dead-code una vez corregidos los bindings de clase directamente contra `iconPosition()`).
- Se elimina el atributo estático `isIconClickable` (no era un input real).

### Outputs — sin cambios (`iconClick`, solo emite cuando `iconClickable` es `true`)

---

## 4. Visual States & Variants

- **Icono decorativo** (por defecto, `iconClickable=false`) — `<dcx-ng-icon>`, no focuseable, `aria-hidden` automático.
- **Icono clicable** (`iconClickable=true`) — `<dcx-ng-button>` real con `iconAriaLabel`.
- **Posición** — `left`/`right`, con clases `has-left`/`has-right` corregidas.
- **Disabled** (nuevo) — botón del icono deshabilitado, contenedor atenuado.
- **Inválido** — borde de error visible en el contenedor (corregido, antes se perdía).
- **Composición contraseña** (según mock) — `iconName="lock" iconPosition="left"` (decorativo) en IconField + `<dcx-ng-input type="password">` proyectado, que ya aporta su propio icono de mostrar/ocultar contraseña en el lado derecho de forma nativa (ver §7b — no se duplica esa función en IconField).

Referencia: `designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`.

---

## 5. SCSS / Tokens

- `--color-primary-light` (sin fallback, no definida) → `var(--border-focus, #1db8f2)` con opacidad, mismo patrón que el anillo de foco de `dcx-ng-input` (`box-shadow: 0 0 0 2px rgba(29, 184, 242, 0.2)`, valor tomado del mock).
- Nuevo: `.icon-field:has(.dcx-ng-input__control.is-invalid) { border-color: var(--border-error, #dc2626); }`.
- Nuevo: `.icon-field.disabled { opacity: 0.5; }` (o similar), consistente con el patrón de opacidad uniforme ya usado en toggle/tabs.
- Se corrigen los bindings `has-left`/`has-right` en la plantilla (no requiere cambios de SCSS ya que hoy no hay reglas para esas clases, pero quedan listas para uso futuro sin el bug).

---

## 6. Accesibilidad (WCAG AA)

- Icono decorativo por defecto: `<dcx-ng-icon>` sin `ariaLabel` → `aria-hidden="true"` automático, fuera del orden de tabulación.
- Icono clicable opcional: `<dcx-ng-button>` con `ariaLabel` explícito (`iconAriaLabel`), nunca el genérico "Button".
- `disabled` deshabilita nativamente el botón del icono cuando aplica.
- El estado de error del input proyectado vuelve a ser visualmente perceptible en el contenedor.
- El nombre accesible del propio campo sigue dependiendo de que el consumidor pase `label`/`ariaLabel` al `dcx-ng-input` proyectado (sin cambios de arquitectura aquí — IconField no duplica esa responsabilidad) — se refuerza en la documentación y en los ejemplos.

---

## 7. Test Cases

- [x] should create (verificar que sigue pasando)
- [ ] por defecto (`iconClickable=false`) el icono es un `<dcx-ng-icon>`, no un `<button>`
- [ ] con `iconClickable=true`, el icono es un `<dcx-ng-button>` con `aria-label` igual a `iconAriaLabel`
- [ ] `iconClick` solo se emite cuando `iconClickable` es `true`
- [ ] `has-left` se aplica solo cuando `iconPosition` es `'left'`; `has-right` solo cuando es `'right'` (nunca ambas a la vez)
- [ ] `disabled` deshabilita el botón del icono
- [ ] el contenedor aplica el borde de error cuando el input proyectado tiene `isInvalid=true` (test de integración con un `dcx-ng-input` real proyectado)
- [ ] tests existentes de posición/tamaño/click siguen pasando tras el cambio de `iconClickable` por defecto

---

## 7b. Decisiones

**`iconClickable` por defecto `false` (cambio de comportamiento)**: hoy el icono siempre es un botón focuseable, incluso sin ningún manejador de clic — un tab-stop sin propósito en 2 de los 3 usos reales existentes. Se invierte el valor por defecto para que la interactividad sea explícita, igual que se hizo con `resizable` en textarea y con el rediseño del toggle. El código muerto `isIconClickable` ya puesto (sin efecto) en la plantilla original sugiere que esta distinción se pretendía desde el principio.

**No se añade soporte de icono simultáneo izquierda+derecha**: el mock muestra un campo de contraseña con candado (izquierda) y ojo mostrar/ocultar (derecha) a la vez, pero `dcx-ng-input` **ya implementa** su propio icono de mostrar/ocultar contraseña de forma nativa y accesible (`togglePasswordVisibility()`, con su propio botón de acción) cuando `type="password"`. Duplicar esa función dentro de `dcx-ng-icon-field` crearía dos mecanismos de icono de acción compitiendo por el mismo lado del campo. La composición correcta para reproducir el mock es: `iconName="lock" iconPosition="left"` (decorativo) en IconField + `type="password"` en el `dcx-ng-input` proyectado, que aporta su propio icono derecho — se documenta y se añade como ejemplo en la página de demo, sin ampliar la API de IconField.

---

## 8. Out of Scope

- Soporte de doble icono (izquierda y derecha simultáneos) en `dcx-ng-icon-field` — ver decisión anterior.
- Migrar `dcx-ng-input`'s propio mecanismo de icono de acción — fuera de alcance de este refinamiento, ya funciona correctamente.

---

## 9. Open Questions

Ninguna.

---

## 10. Implementation Plan

1. **`dcx-ng-iconField.component.ts`**: añadir `ChangeDetectionStrategy.OnPush`; añadir inputs `iconClickable`, `iconAriaLabel`, `disabled`; eliminar `iconPositionChange`.
2. **`dcx-ng-iconField.component.html`**: corregir bindings `has-left`/`has-right`; renderizar `<dcx-ng-icon>` decorativo cuando `!iconClickable()`, `<dcx-ng-button [ariaLabel]="iconAriaLabel()" [disabled]="disabled()">` cuando `iconClickable()`; quitar `isIconClickable` muerto.
3. **`dcx-ng-iconField.component.scss`**: fallback de `--color-primary-light` → `--border-focus`; eliminar el bloque `.is-invalid` que anula el borde de error; añadir `.icon-field:has(...)` para el borde de error en el contenedor; añadir `.icon-field.disabled`.
4. **Tests** (`dcx-ng-iconField.component.spec.ts`): actualizar para el nuevo comportamiento por defecto; añadir casos de §7.
5. **Storybook** (`stories/iconField/ClassBased.stories.ts`): traducir categorías a `Atributos`/`Eventos`; completar descripciones; actualizar `IconClickable` para pasar `iconClickable`/`iconAriaLabel` explícitos; añadir story de composición contraseña (lock + input password).
6. **`Documentation.mdx`**: reescribir por completo con la API real (`iconName`/`iconPosition`/`iconSize`/`iconClickable`/`iconAriaLabel`/`disabled`/`iconClick`); eliminar el import muerto de `UnStyled.stories`; corregir referencias a stories inexistentes; documentar la decisión de composición para contraseñas.
7. **Page demo** (`src/app/pages/dcx-ng-page-iconField/`): migrar a `.demo-page`/`.demo-section`; añadir `label` a los inputs proyectados; añadir ejemplos de icono decorativo por defecto, icono clicable con `iconAriaLabel`, disabled, y la composición contraseña (lock + `dcx-ng-input type="password"`).
8. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
