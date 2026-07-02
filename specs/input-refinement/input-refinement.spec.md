# Spec: Input Refinement

**Status:** Done
**Date:** 2026-07-01
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-input` es el campo de formulario de la librería. Implementa `ControlValueAccessor`
(Reactive Forms, template-driven, `ngModel`), soporta múltiples tipos (`text`, `number`,
`email`, `password`, `search`, `tel`, `url`, `file`, `radio`, `range`), iconos por tipo,
botón de acción (mostrar/ocultar contraseña, buscar) y mensajes de error.

Este refinamiento corrige un **bug crítico de asociación label↔input**, mejora la
accesibilidad de los mensajes de error (anuncio a lectores de pantalla), añade **texto de
ayuda (hint)** presente en el design de referencia, limpia CSS muerto y tipos `any`, y
alinea Storybook y la página demo con los estándares del proyecto.

El componente se usa solo en la página demo (`src/app/pages/dcx-ng-page-input/`) y en
Storybook; no hay uso en producción fuera de la librería (comprobado por grep del selector
`dcx-ng-input` y de la clase `DcxNgInputComponent`, excluyendo la variante `-otp`).

Design de referencia: `designs/dcx-ng-page-input.html`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| #   | Criterio                          | Problema actual                                                                                                                                                                                                                                                                 | Solución                                                                                                                                       |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **1.3.1 / 3.3.2 / 4.1.2**         | **El `<label for>` no coincide con el `id` del input.** El label usa `[attr.for]="inputId"` (`ts:93`, un `Math.random()`), pero el `<input>` usa `[id]="id()"` (`ts:82`, **otro** `Math.random()` distinto). El label queda desasociado: click en el label no enfoca, y los lectores de pantalla no anuncian el nombre. | Una **única** fuente de id. `label for = id()`, `input id = id()`, `labelId`/`errorId`/`hintId` derivados de `id()` vía `computed`.            |
| 2   | **4.1.3 Status Messages**         | Los mensajes de error (`html:60`, `html:66`) aparecen en el DOM al validar, pero sin `role="alert"` ni `aria-live`. Un usuario de lector de pantalla no se entera de que ha aparecido el error.                                                                                  | Añadir `role="alert"` a los dos contenedores `.dcx-ng-input__error`.                                                                          |

### 2.2 WCAG AA — Recomendados

| #   | Criterio            | Descripción                                                                                                                                                                                                            |
| --- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3   | **1.4.3 Contrast**  | El `::placeholder` no está estilado; hereda el color del navegador (gris claro) que suele fallar el ratio 4.5:1. Añadir `::placeholder { color: var(--text-muted, #696e75); }` (≈4.7:1 sobre blanco).                  |
| 4   | **3.3.2 Labels/Instructions** | El design muestra un **texto de ayuda** (`.dcx-hint`, p.ej. "Tal como aparece en el documento oficial") que el componente no soporta. Añadir input `hint` enlazado por `aria-describedby`.                    |

### 2.3 Bugs de lógica

| #   | Descripción                                                                                                                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 5   | **Doble generación de id** con `Math.random()` en `ts:82` (`id`) y `ts:93` (`inputId`). Además de causar el bug #1, es no determinista y confuso. Se consolida en una sola fuente.                                                                       |
| 6   | El input **`size`** (`ts:119`, `DcxSize`, default `'m'`) está **declarado pero nunca se usa**: el padding lo controla `spacing` (`inputClasses` en `ts:206-215` genera `--${this.spacing()}`). Es un input muerto y engañoso. Ver Open Question.          |

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                                                                                                                       |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7   | CSS muerto: `.input-value` (`scss:82`), `.dcx-ng-input__buttons` (`scss:105`) y `.dcx-ng-input__clear-btn` (`scss:124`) no se usan en el template. Eliminar.                                                                      |
| 8   | Tipos `any` en el `ControlValueAccessor`: `onChange` (`ts:136`), `writeValue` (`ts:224`), `registerOnChange` (`ts:228`), `registerOnTouched` (`ts:232`). Tipar correctamente.                                                     |
| 9   | Falta `ChangeDetectionStrategy.OnPush` pese a usar signals en todo el componente.                                                                                                                                                |
| 10  | `@ViewChild('input')` (`ts:75`) → migrar a `viewChild.required` (signal) para alinearse con el patrón moderno del proyecto.                                                                                                        |
| 11  | El `effect()` de sincronización de valor vive en el `constructor` (`ts:217-222`); moverlo a inicializador de campo (patrón "sin código en constructor").                                                                          |
| 12  | Storybook: categorías en inglés (`Attributes`/`Events`/`Methods`) → español; descripciones incompletas; `StoryObj<any>` implícito; faltan stories (tamaños/spacing, hint, lista de errores, password, search, tipos con icono).    |
| 13  | Page demo: no usa `demo-page`/`demo-section`; numeración duplicada ("Ejemplo 4" repetido); sin descripción de cabecera. Reconstruir.                                                                                              |

---

## 3. API / Interface

Cambios **aditivos** salvo la decisión sobre `size` (ver Open Questions).

### Inputs (`input()` signals) — nuevos / modificados

| Name    | Type     | Default | Required | Descripción                                                                                     |
| ------- | -------- | ------- | -------- | ----------------------------------------------------------------------------------------------- |
| `hint`  | `string` | `''`    | no       | **NUEVO.** Texto de ayuda bajo el campo, enlazado por `aria-describedby`. Se oculta si hay error. |
| `id`    | `string` | `dcx-input-{uid}` | no | Sin cambios de firma; ahora es la **única** fuente de id (label/error/hint derivan de él).       |

_(El resto de inputs se mantienen: `value`, `disabled`, `readonly`, `placeholder`, `type`,
`name`, `required`, `checked`, `autocomplete`, `inputMode`, `isInvalid`, `label`, `ariaLabel`,
`ariaDescribedBy`, `errorMessage`, `requiredMessage`, `errorMessages`, `errorIcon`, `spacing`,
`orientation`, `multiple`, `min`, `max`, `step`.)_

### Outputs (`output()` signals) — sin cambios

`valueChange`, `blurEvent`, `focusEvent`, `enterPressed`.

### Public Methods / miembros nuevos

| Method / member | Signature                          | Descripción                                                    |
| --------------- | ---------------------------------- | ------------------------------------------------------------- |
| `resetNativeInput` | `() => void`                    | Se mantiene; ahora usa `viewChild` en vez de `@ViewChild`.    |
| `labelId`       | `computed<string>` `${id()}-label` | Antes campo derivado de `inputId`; ahora deriva de `id()`.    |
| `hintId`        | `computed<string>` `${id()}-hint`  | **NUEVO.** Id del texto de ayuda para `aria-describedby`.     |

---

## 4. Visual States & Variants

- **Default** — label + input.
- **Con hint** — texto de ayuda gris bajo el campo (design `.dcx-hint`).
- **Required** — asterisco en el label + `aria-required`; warning al hacer blur vacío.
- **Invalid** — borde/box-shadow rojo, icono + mensaje(s) de error con `role="alert"`.
- **Disabled** / **Readonly** — atributos nativos.
- **Tipos con icono** — `number` (pin), `email` (mail), `search` (search), `tel` (phone), `url` (link).
- **Password** — botón de acción mostrar/ocultar (`eye-fill` / `eye-slash-fill`).
- **Search** — botón de acción de búsqueda.
- **Tamaños (spacing)** — `xs`…`xl` (padding).

Referencia: `designs/dcx-ng-page-input.html` (label 12px/500, hint 11px `--text-muted`,
error 11px `--color-error`, placeholder `--text-disabled`).

---

## 5. SCSS / Tokens

- Añadir `::placeholder { color: var(--text-muted, #696e75); }` sobre `.dcx-ng-input__control`.
- Añadir `.dcx-ng-input__hint { margin-top: var(--sp-1,4px); color: var(--text-muted,#696e75); font-size: var(--fs-sm,12px); }`.
- Eliminar reglas muertas: `.input-value`, `.dcx-ng-input__buttons`, `.dcx-ng-input__clear-btn`.
- Mantener el resto (focus-visible ya está bien: `scss:42-46`).

---

## 6. Accesibilidad (WCAG AA)

Estructura tras el refinamiento:

| Elemento     | Atributos                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `<label>`    | `for="{id}"`, `id="{id}-label"`                                                                       |
| `<input>`    | `id="{id}"`, `aria-required`, `aria-invalid`, `aria-describedby="{ariaDescribedBy} {hint} {error}"`   |
| hint         | `id="{id}-hint"`                                                                                      |
| error        | `id="{id}-error"`, `role="alert"`                                                                     |

`aria-describedby` (computed `describedBy`) concatena, en orden y filtrando vacíos:
`ariaDescribedBy()` → `hintId` (si hay hint) → `errorId` (si `isInvalid`).

- Icono de acción (password/search): `aria-label` dinámico (ya existe).
- Icono de error: decorativo (`dcx-ng-icon` sin `ariaLabel` → `aria-hidden`).

---

## 7. Test Cases

- [x] should create the component
- [x] **el `for` del label es igual al `id` del input** (asociación correcta)
- [x] `labelId`, `errorId` y `hintId` derivan del mismo `id()`
- [x] los contenedores de error tienen `role="alert"`
- [x] `hint` se renderiza y su `id` aparece en `aria-describedby`
- [x] `aria-describedby` incluye el `errorId` cuando `isInvalid`
- [x] `writeValue`, `registerOnChange`, `registerOnTouched` tipados funcionan (CVA)
- [x] `resetNativeInput` limpia el valor del input nativo (vía `viewChild`)
- [x] password: el botón de acción alterna `type` y su `aria-label`
- [x] los tests existentes siguen pasando (74/74)

---

## 7b. Decisión: componentes de librería vs HTML nativo

Se mantiene el `<input>` nativo (correcto para un campo de formulario; permite `ControlValueAccessor`,
validación nativa y semántica de label). El botón de acción sigue usando `dcx-ng-button`
(`variant="icon-only"`), y los iconos `dcx-ng-icon`. No se introducen nuevos componentes.

---

## 8. Out of Scope

- No se refactoriza `dcx-ng-input-otp` (componente aparte).
- No se implementan `select`, `textarea` ni "clearable" del design (son otros componentes).
- No se cambia el comportamiento de `onFocus` (resetear `touched`), ni el rotado CSS del `range` vertical.
- No se toca la integración `ControlValueAccessor` más allá del tipado.

---

## 9. Open Questions

- [x] **Input `size` muerto (#6):** RESUELTO — se **elimina** el input `size` (no tiene efecto y no hay consumidores en producción). El padding se sigue controlando con `spacing`.

---

## 10. Implementation Plan

1. **Component TS**: consolidar id (una fuente); `labelId`/`hintId` computed; input `hint`; `describedBy` incluye `hintId`; migrar `@ViewChild`→`viewChild`; `effect` a campo; tipar CVA; añadir `ChangeDetectionStrategy.OnPush`; (según decisión) quitar `size`.
2. **Component HTML**: `label for/id` desde `id()`/`labelId()`; render del `hint`; `role="alert"` en errores; `aria-describedby` ya vía `describedBy()`.
3. **Component SCSS**: `::placeholder`, `.dcx-ng-input__hint`, eliminar CSS muerto.
4. **Spec.ts**: tests de asociación label/id, `role="alert"`, hint + describedby, CVA tipado, resetNativeInput; mantener los existentes.
5. **Storybook**: categorías español, descripciones completas, tipado `StoryObj<DcxNgInputComponent>`, nuevas stories (Default, Hint, Sizes/Spacing, Required, Invalid+lista, Disabled, Readonly, Password, Search, Types).
6. **Page demo**: reconstruir con `demo-page`/`demo-section`, numeración correcta, sección de hint, cabecera con descripción.
7. **Verificación**: `nx test` del spec del input + revisión de diagnósticos TS.
