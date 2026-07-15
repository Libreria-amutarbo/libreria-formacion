# Spec: Radio Refinement

**Status:** Done
**Date:** 2026-07-14
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-radio` es, con diferencia, el componente en mejor estado de esta serie de refinamientos: usa un `<input type="radio">` nativo real, agrupación por `name` nativa del navegador (teclado/flechas gratis), `ControlValueAccessor` completo, y **ningún** token CSS roto (todos con fallback correcto) — a diferencia de toggle/tooltip/iconField. El hueco principal es estructural: **no existe ningún componente de agrupación** (`dcx-ng-radio-group`). Cada página que usa varios radios relacionados improvisa su propio `<fieldset><legend>` a mano (visto en la página de demo), sin mensaje de error/ayuda asociado al grupo y sin ningún punto de entrada reutilizable. Además, no existe ningún mock de diseño para Radio pese a que el nombre del fichero combinado (`dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`) lo sugiere — se ha comprobado que la sección Radio nunca se llegó a incluir en ese fichero. Este refinamiento procede sin mock, apoyándose en el patrón WAI-ARIA APG y en la calidad visual ya existente del componente (sin cambios de diseño).

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

Ninguno. El uso de `<input type="radio">` nativo con `name` compartido ya resuelve correctamente la navegación por teclado (flechas), `aria-checked`/`checked` nativo, y asociación de label por envoltura implícita — la base del patrón APG Radio Group ya está bien resuelta a nivel de radio individual.

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | Nombre accesible del grupo | No existe ningún contenedor con nombre accesible de grupo reutilizable — cada página debe improvisar su propio `<fieldset><legend>` (lo hace correctamente en la página de demo actual, pero no hay ningún componente que lo garantice ni lo reutilice). |
| 2 | `aria-describedby` a nivel de grupo | `error` en `dcx-ng-radio` solo cambia el estilo visual y pone `aria-invalid` en el input — no existe ningún mensaje de error/ayuda asociado, ni a nivel de radio individual ni de grupo (a diferencia de `dcx-ng-input`/`dcx-ng-textarea`, que sí lo tienen). |
| 3 | Nombre accesible genérico | `ariaLabelBinding` cae en el literal `"Radio button"` cuando no hay `ariaLabel` ni `label` (ts:57) — mismo texto para todos los radios sin etiqueta de un grupo, indistinguibles entre sí. Caso límite (todo radio debería tener `label` en la práctica), se documenta como buena práctica en vez de forzar un cambio de comportamiento. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | `size` acepta el tipo genérico `DcxSize` (`'s'\|'m'\|'l'\|'xl'\|'auto'`), pero el SCSS solo define modificadores para `s`/`m`/`l` (scss:102-115) — `xl`/`auto` no producen ninguna clase de tamaño visible, cayendo silenciosamente en las variables CSS del `:host` base. Mismo patrón de bug ya corregido en `dcx-ng-spinner`/`dcx-ng-stepper` esta sesión. |
| 2 | Falta `ChangeDetectionStrategy.OnPush` (no se importa siquiera `ChangeDetectionStrategy`, ts:1). |
| 3 | Página de demo: `resumen`/`mostrarResumen()` (`dcx-ng-page-radio.component.ts:16,58-60`) son código muerto — ningún botón ni `@if` en la plantilla los usa. |

### 2.4 Storybook / Documentación

| # | Descripción |
|---|-------------|
| 1 | Categorías de `argTypes` en inglés (`'Attributes'`) pese a que las descripciones ya están en español — inconsistencia. |
| 2 | `Documentation.mdx` está íntegramente en inglés. |
| 3 | `Documentation.mdx:23-30` ("Available Properties") omite `checked`, `error`, `hover` y `focus` — inputs reales del componente. |
| 4 | `Documentation.mdx:61-67` ("Long label" / "No label") referencian **la misma story `Basic`** en ambos casos — ninguna demuestra realmente un label largo ni la ausencia de label. |
| 5 | `Documentation.mdx:4` usa el título `"DCXLibrary/Radio/Documentation"`, distinto del `title` de la story (`'DCXLibrary/Components/Radio'`) — fragmenta la ubicación en el árbol de navegación de Storybook, inconsistente con el resto de componentes ya refinados. |

### 2.5 Ausencia de mock de diseño

No existe ninguna sección de Radio en `designs/`, pese a que el nombre del fichero combinado (`dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`) lo sugiere — comprobado directamente que el fichero no contiene ningún markup de radio. Se documenta aquí para que quede constancia; no bloquea el refinamiento, que procede sin cambios visuales (el diseño actual ya es sólido: doble indicador de estado seleccionado — borde + punto relleno, no solo color).

---

## 3. API / Interface

> **Corrección post-implementación (feedback del usuario):** la primera versión de este refinamiento introdujo `dcx-ng-radio-group` como componente separado envolviendo varios `dcx-ng-radio` vía `<ng-content>`. El usuario pidió explícitamente fusionar ambos en un único componente. Esta sección refleja el diseño final, fusionado.

### `dcx-ng-radio` — API fusionada (BREAKING)

`dcx-ng-radio` pasa a representar el **grupo completo**, no un único radio. Recibe un array de opciones y gestiona un único valor seleccionado con `ControlValueAccessor` a nivel de grupo — ya no hay `content projection` ni un `dcx-ng-radio` por opción.

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `options` | `DcxRadioOption[]` | `[]` | Array de opciones (`{ value, label, disabled? }`). |
| `name` | `string` | generado por instancia | Nombre nativo compartido por las opciones del grupo. |
| `label` | `string` | `''` | Texto del `<legend>` — nombre accesible del grupo. |
| `ariaLabel` | `string` | `''` | Nombre accesible cuando no hay `label` visible. |
| `size` | `DcxRadioSize` (`'s'\|'m'\|'l'`) | `'l'` | Tamaño de los radio buttons del grupo (nuevo tipo, excluye `xl`/`auto`, sin implementación visual). |
| `disabled` | `boolean` | `false` | Deshabilita todas las opciones del grupo. |
| `error` | `boolean` | `false` | Estado de error del grupo. |
| `errorMessage` | `string` | `''` | Mensaje de error, con `role="alert"`, referenciado vía `aria-describedby` en el `<fieldset>`. |
| `hint` | `string` | `''` | Texto de ayuda bajo el grupo; se oculta si hay error visible. |

**Eliminados** (existían en el `dcx-ng-radio` por-ítem original): `value` (ahora vive en cada `DcxRadioOption`), `checked` (forzado por-ítem, ya no tiene sentido a nivel de grupo con un único valor seleccionado gestionado por CVA), `hover`/`focus` (props de demo puramente visuales para Storybook, sin uso real).

CVA a nivel de grupo: `writeValue`/`registerOnChange`/`registerOnTouched`/`setDisabledState` gestionan un único valor seleccionado (antes cada radio individual tenía su propio CVA comparando su `value` contra un valor externo).

---

## 4. Visual States & Variants

Los estilos visuales de cada radio individual no cambian (borde + punto relleno como doble indicador de estado, tamaños s/m/l) — no hay mock que oriente un rediseño. Se añade el contenedor `<fieldset>` con borde sutil y `<legend>`, mensaje de ayuda/error bajo el grupo — estilo visual consistente con el resto de componentes de formulario ya refinados (`dcx-ng-textarea`, `dcx-ng-input`).

---

## 5. SCSS / Tokens

Un único fichero `dcx-ng-radio.component.scss` con los estilos del `<fieldset>`/`<legend>`/hint/error y los del radio individual fusionados. Todos los tokens ya usaban `var(--token, #fallback)` correctamente en el fichero original; los nuevos estilos del fieldset reutilizan los mismos tokens ya establecidos en el resto de la librería (`--border-light`, `--bg-default`, `--fw-semibold`, `--fs-base`, `--text-label`, `--border-error`, `--text-muted`).

---

## 6. Accesibilidad (WCAG AA)

- `<fieldset>` + `<legend>` como nombre accesible del grupo — no se añade `role="radiogroup"` explícito dado que ya se usan `<input type="radio">` nativos agrupados por `name` (esa técnica APG es para implementaciones custom con `role="radio"`, no para inputs nativos ya agrupados).
- Cada opción sigue usando un `<input type="radio">` nativo envuelto implícitamente en su `<label>` — `checked`, navegación por teclado (flechas) y asociación de nombre accesible por opción vienen gratis del navegador, sin cambios respecto al comportamiento original.
- `aria-describedby` en el `<fieldset>` apuntando al mensaje de error/ayuda; mensaje de error con `role="alert"`.
- `name` se genera automáticamente por instancia si no se indica, eliminando el riesgo de que un typo en un `name` compartido rompa el agrupamiento nativo (posible en la versión anterior, donde cada `name` se repetía manualmente en cada `dcx-ng-radio`).

---

## 7. Test Cases

### `dcx-ng-radio` (24 tests, reescritos para la API fusionada)
- [x] should create
- [x] genera un `name` único por instancia cuando no se indica
- [x] renderiza `<fieldset>` con `<legend>` igual a `label()`
- [x] renderiza un `<input type="radio">` nativo por opción, todos con el mismo `name`
- [x] renderiza el `label` de cada opción
- [x] aplica la clase de tamaño a cada opción
- [x] aplica la clase de error a todas las opciones cuando `error()` es `true`
- [x] marca una opción como seleccionada vía `writeValue`
- [x] actualiza el valor seleccionado vía `onOptionChange`
- [x] no selecciona una opción con `disabled: true`
- [x] deshabilita todas las opciones cuando el input `disabled` del grupo es `true`
- [x] deshabilita solo la opción marcada como `disabled` a nivel individual
- [x] `registerOnChange`/`registerOnTouched`/`setDisabledState` funcionan a nivel de grupo
- [x] muestra el hint cuando `hint()` tiene texto y no hay error
- [x] oculta el hint cuando hay error visible
- [x] muestra el mensaje de error con `role="alert"`
- [x] el `<fieldset>` tiene `aria-describedby` apuntando al id del hint/error correspondiente
- [x] `aria-label` en el `<fieldset>` solo cuando no hay `label` visible

---

## 7b. Decisión: fusión en un único componente (corrección post-implementación)

**Diseño inicial (revertido):** un `dcx-ng-radio-group` separado, envolviendo varios `dcx-ng-radio` vía `<ng-content>`, cada uno con su propio CVA comparando su `value` contra un valor externo — arquitectura que preservaba el `dcx-ng-radio` por-ítem tal cual existía.

**Diseño final (a petición explícita del usuario):** un único `dcx-ng-radio` que recibe `options: DcxRadioOption[]` y gestiona un único valor seleccionado con CVA a nivel de grupo. Justificación de la corrección:
- Un solo punto de entrada, sin necesidad de repetir el componente por cada opción ni de mantener sincronizado un `name` compartido a mano entre varios elementos — elimina por completo el riesgo de typo en `name` que rompía el agrupamiento nativo silenciosamente.
- Es el patrón más común en librerías de componentes maduras para "grupo de radios" (un único componente, un array de opciones), frente al patrón de dos componentes (item + wrapper) que solo tiene sentido cuando cada ítem necesita variar independientemente su propio estado/CVA — algo que un radio individual dentro de un grupo no necesita.
- Cambio de alcance respecto a la decisión original (§7b de la versión anterior de este documento, que descartaba explícitamente introducir CVA a nivel de grupo): se revierte esa decisión porque el usuario prefirió la fusión sobre mantener el `dcx-ng-radio` por-ítem intacto.

---

## 8. Out of Scope

- `role="radiogroup"` explícito — redundante dado el uso de inputs nativos agrupados por `name` (ver §6).
- Cambios visuales en el radio individual — no hay mock que los oriente.
- Props de demo puramente visuales (`hover`/`focus` forzados) — eliminadas por no tener uso real más allá de capturas de Storybook.

---

## 9. Open Questions

Ninguna.

---

## 10. Implementation Plan (ejecutado, incluida la corrección de fusión)

1. **`core/interfaces/radio.ts`**: `DcxRadioSize = 's' | 'm' | 'l'` + nuevo `DcxRadioOption { value; label; disabled? }`.
2. **`dcx-ng-radio.component.ts`**: reescrito por completo — `options` array, `name` generado por instancia, CVA a nivel de grupo (`writeValue`/`registerOnChange`/`registerOnTouched`/`setDisabledState` sobre un único valor seleccionado), `ChangeDetectionStrategy.OnPush`, eliminados `value`/`checked`/`hover`/`focus`.
3. **`dcx-ng-radio.component.html`**: `<fieldset>`+`<legend>` + `@for` sobre `options()` renderizando un `<input type="radio">` nativo por opción + hint/error.
4. **`dcx-ng-radio.component.scss`**: fusión del fichero de estilos del ítem individual (sin cambios) con los del contenedor `<fieldset>`/`<legend>`/hint/error.
5. **Componente `dcx-ng-radio-group` separado**: creado en una primera pasada, **eliminado por completo** (ficheros, stories, export del barrel) tras el feedback del usuario pidiendo la fusión.
6. **Tests**: `dcx-ng-radio.components.spec.ts` reescrito íntegramente para la API fusionada (24 tests).
7. **Storybook**: categorías traducidas a `Atributos`; stories reescritas para `options` array (`Basic`, `Sizes`, `WithDisabledOption`, `Disabled`, `WithHint`, `Error`).
8. **`Documentation.mdx`** (radio): traducido a español; describe la API fusionada; corregido el bug de Canvas duplicado ("Long label"/"No label", eliminado en la reescritura); título unificado con el de la story.
9. **Page demo** (`src/app/pages/dcx-ng-page-radio/`): migrada a `.demo-page`/`.demo-section`; un único `<dcx-ng-radio [options]="...">` por ejemplo en vez de 3 elementos repetidos; eliminado `resumen`/`mostrarResumen()` (código muerto); nuevos ejemplos de opción individual deshabilitada y hint de grupo.
10. **`dcx-ng-page-carousel`**: único consumidor externo de `dcx-ng-radio` fuera de su propia página de demo — actualizado de 3 `<dcx-ng-radio>` repetidos a uno solo con `[options]`.
11. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
