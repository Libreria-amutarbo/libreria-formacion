# Spec: Textarea Refinement

**Status:** Done
**Date:** 2026-07-13
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-textarea` es una implementación autónoma (no envuelve `dcx-ng-input`) sobre un `<textarea>` nativo, con soporte de auto-resize, tamaños, variantes de label flotante y estado inválido. Tiene una base sólida (native element, `OnPush`, sin `any`), pero le falta toda la asociación de accesibilidad — no genera `id`, por lo que el `<label>` nunca tiene `for`, no hay `aria-describedby`/`aria-invalid`/`aria-required`, y el error no tiene `role="alert"`. Además **no implementa `ControlValueAccessor`**, aunque `Documentation.mdx` documenta `formControlName` como si funcionase — con `[(ngModel)]`/`FormControl` reales, el componente simplemente no se sincroniza. El mock de diseño (`designs/dcx-ng-page-textarea-editor-file-upload.html`) muestra además un `<label>` siempre visible (no solo en modo float), resize manual (`resize: vertical`), un anillo de foco con `box-shadow`, asterisco de campo obligatorio y un hint de texto ("Max. 500 caracteres") — ninguno implementado hoy.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Nombre accesible (4.1.2) | No existe `id` en el componente (ni input ni generado) — el `<label>` (html:16) nunca tiene `for`, y solo se renderiza `@if (floatLabel())` (html:15), por lo que en el uso más común (sin `floatLabel`) **no hay ningún label ni `aria-label`** asociado al `<textarea>`. | Generar `id` por instancia (mismo patrón que `dcx-ng-input`); renderizar el label siempre que `label()` tenga texto, con `[attr.for]`; añadir `ariaLabel` de respaldo. |
| 2 | Integración con formularios rota (documentación vs. realidad) | El componente no implementa `ControlValueAccessor` (`writeValue`/`registerOnChange`/`registerOnTouched`/`NG_VALUE_ACCESSOR`) pero `Documentation.mdx:182-224` documenta uso con `formControlName`, que **no funciona** hoy. | Implementar `ControlValueAccessor` completo, tipado (no `any`), reutilizando `value` (`model<string>`) como estado interno. |
| 3 | `aria-invalid` / `aria-describedby` (4.1.2, 3.3.1) | Ninguno de los dos está cableado. El div de error (html:19-21) no tiene `id`, por lo que no hay forma de referenciarlo. | Añadir `[attr.aria-invalid]`, `[attr.aria-describedby]` (apuntando a error y/o hint), `[id]` en el div de error. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | `role="alert"` en el error | El div `.dcx-ng-textarea__error` (html:19-21) no anuncia el error a lectores de pantalla. |
| 2 | `aria-required` | No existe input `required` en absoluto, pese a que el mock muestra un asterisco de campo obligatorio junto al label en el estado de error. |
| 3 | Resize no configurable | `.dcx-ng-textarea__control { resize: none; }` (scss:62) está fijo — el mock usa `resize: vertical` para permitir ajuste manual del usuario, una funcionalidad de usabilidad estándar de un `<textarea>` que hoy se bloquea siempre. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | `.dcx-ng-textarea__wrapper { display: flex; ... }` (scss:7-14) no define `flex-direction`, por lo que por defecto es `row` — si el label llegase a renderizarse fuera del modo float (tras el fix del punto 2.1.1), quedaría **al lado** del textarea, no encima. Falta `flex-direction: column`. |
| 2 | `.dcx-ng-textarea__control--autoresize { resize: none; ... }` (scss:98-101) duplica el `resize: none` ya declarado en la clase base (scss:62) — redundante una vez que el resize pase a controlarse dinámicamente (ver §2.2.3). |
| 3 | `Documentation.mdx:32` documenta el tipo de `floatLabel` sin `'ifta'`, aunque el tipo real (`core/interfaces/textarea.ts:1`) sí lo incluye y existe una story `IftaLabel`. |
| 4 | Ejemplo 9 de la página de demo usa `errorMessage="This field is required"` en inglés, inconsistente con el resto de la página en español. |

### 2.4 Mejoras de UX / coherencia con el mock

| # | Descripción |
|---|-------------|
| 1 | El mock muestra el label **siempre visible** (con o sin variante float) — la implementación actual solo lo muestra cuando `floatLabel` está definido. |
| 2 | El mock muestra un anillo de foco con `box-shadow: 0 0 0 2px rgba(29,184,242,.18)` además del cambio de `border-color`; la implementación actual solo cambia el color de borde. |
| 3 | El mock muestra la variante `filled` cambiando a fondo blanco al enfocar (`background: var(--bg-default)`); no implementado. |
| 4 | El mock muestra un hint de texto bajo el campo ("Max. 500 caracteres") — no existe ningún input `hint` en el componente (sí existe en `dcx-ng-input`). |
| 5 | El mock muestra el label en color de error (rojo) y con asterisco cuando el campo es inválido/obligatorio. |

---

## 3. API / Interface

### Inputs nuevos (`input()` signals)

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `id` | `string` | `dcx-textarea-{random}` | Igual patrón que `dcx-ng-input`; permite asociar `label`/`aria-describedby`. |
| `ariaLabel` | `string \| null` | `null` | Nombre accesible de respaldo cuando no hay `label` visible. |
| `ariaDescribedBy` | `string \| null` | `null` | `aria-describedby` adicional proporcionado por el consumidor, se combina con el del hint/error internos. |
| `required` | `boolean` | `false` | Marca el campo como obligatorio; añade `aria-required` y el asterisco visual junto al label. |
| `hint` | `string` | `''` | Texto de ayuda bajo el campo (p.ej. "Max. 500 caracteres"); se oculta si hay error visible. |
| `maxLength` | `number \| null` | `null` | Pasa a `[attr.maxlength]` nativo. |
| `resizable` | `boolean` | `true` | Si `true` (y `autoResize` es `false`), el usuario puede redimensionar verticalmente (`resize: vertical`), igual que el mock. Se ignora si `autoResize` está activo. |

### Inputs existentes — sin cambios de tipo
`rows`, `cols`, `placeholder`, `disabled`, `readonly`, `autoResize`, `floatLabel`, `label`, `size`, `fluid`, `filled`, `invalid`, `errorMessage`.

### Cambio de comportamiento (no de tipo)
- `label()`: antes solo se renderizaba con `floatLabel()` definido; ahora se renderiza siempre que tenga texto, independientemente de `floatLabel`.

### `ControlValueAccessor` (nuevo)

| Method | Firma |
|--------|-------|
| `writeValue` | `(value: string) => void` |
| `registerOnChange` | `(fn: (value: string) => void) => void` |
| `registerOnTouched` | `(fn: () => void) => void` |

`value` (ya existente, `model<string>('')`) sigue siendo el estado interno; `writeValue` lo actualiza, `onInput`/`onBlur` invocan `onChange`/`onTouched` además de emitir `valueChange` (comportamiento existente preservado).

### Outputs — sin cambios (`valueChange`)

---

## 4. Visual States & Variants

- **Default** — label estático arriba, borde gris, `resize: vertical`.
- **Focus** — borde `--border-focus` + anillo `box-shadow` (nuevo, según mock).
- **Invalid** — borde rojo, label en rojo + asterisco si `required`, error con `role="alert"`.
- **Disabled** — label atenuado (nuevo), fondo gris, `cursor: not-allowed` (ya existente).
- **Filled** — fondo gris, blanco al enfocar (nuevo, según mock).
- **AutoResize** — `resize: none` forzado (el crecimiento lo controla JS, no el usuario).
- **Con hint** — texto de ayuda bajo el campo (nuevo).
- **FloatLabel** (`over`/`in`/`on`/`ifta`) — sin cambios visuales, ahora con `for`/`id` correctos.

Referencia: `designs/dcx-ng-page-textarea-editor-file-upload.html` (sección Textarea, líneas 189-276).

---

## 5. SCSS / Tokens

- Tokens ya usados correctamente con fallback — no se detectaron nombres huérfanos.
- Nuevo: `flex-direction: column` + `gap` en `.dcx-ng-textarea__wrapper` base.
- Nuevo: estilos de label estático (no absoluto) para el caso sin `floatLabel`.
- Nuevo: `.dcx-ng-textarea__label.is-invalid` / `.is-disabled`.
- Nuevo: `.dcx-ng-textarea__required` (asterisco).
- Nuevo: `.dcx-ng-textarea__hint`.
- `box-shadow` de foco (default e inválido), valores tomados literalmente del mock (`rgba(29,184,242,.18)` / `rgba(220,38,38,.15)`), igual que ya hace `dcx-ng-input` con su propio anillo de foco.
- `--filled:focus-visible` con fondo blanco.
- `resize` deja de fijarse en SCSS: se controla vía `[style.resize]` en la plantilla (`computed` a partir de `resizable()`/`autoResize()`); se elimina el `resize: none` duplicado en `--autoresize`.

---

## 6. Accesibilidad (WCAG AA)

- `<label [attr.for]="id()">` siempre que `label()` tenga texto; fallback a `[attr.aria-label]` cuando no hay label visible.
- `[id]="id()"` en el `<textarea>`.
- `[attr.aria-invalid]="invalid() ? 'true' : null"`.
- `[attr.aria-required]="required() ? 'true' : null"`.
- `[attr.aria-describedby]` combinando el `id` del hint y/o del error, más cualquier `ariaDescribedBy` externo.
- `role="alert"` + `[id]` en el mensaje de error.
- `maxlength` nativo cuando se indica `maxLength`.
- Teclado: sin cambios — un `<textarea>` nativo ya es completamente operable por teclado.

---

## 7. Test Cases

- [x] should create (ya existe, verificar que sigue pasando)
- [ ] genera un `id` único por instancia (patrón igual que `dcx-ng-input`)
- [ ] el label se renderiza con `label()` con texto, con o sin `floatLabel`
- [ ] el label no se renderiza cuando `label()` está vacío
- [ ] `[attr.for]` del label coincide con el `id` del textarea
- [ ] `aria-invalid` refleja `invalid()`
- [ ] `aria-required` refleja `required()`
- [ ] `aria-describedby` incluye el id del error cuando `invalid()` y `errorMessage()`
- [ ] `aria-describedby` incluye el id del hint cuando hay `hint()` y no hay error
- [ ] el error tiene `role="alert"`
- [ ] `maxLength` se refleja como `maxlength` nativo
- [ ] `resizable=true` (por defecto) aplica `resize: vertical`; `resizable=false` aplica `resize: none`
- [ ] `autoResize=true` fuerza `resize: none` independientemente de `resizable`
- [ ] `ControlValueAccessor`: `writeValue` actualiza `value()`
- [ ] `ControlValueAccessor`: `registerOnChange` se invoca en `onInput`
- [ ] `ControlValueAccessor`: `registerOnTouched` se invoca en `onBlur`
- [ ] integración con `FormControl`: valor inicial se refleja, cambios se propagan en ambas direcciones
- [ ] tests existentes de tamaños/autoResize/floatLabel/invalid siguen pasando

---

## 7b. Decisión: componentes de librería vs HTML nativo

Se mantiene el `<textarea>` nativo (sin cambios estructurales) — ya es la elección correcta y no requiere justificación adicional.

**Decisión de comportamiento por defecto**: se cambia el valor por defecto de "resize" de `none` (bloqueado) a `resizable=true` → `resize: vertical`, siguiendo el mock. Es un cambio de comportamiento visible por defecto (antes ningún textarea era redimensionable manualmente; ahora sí, salvo que se desactive explícitamente o se use `autoResize`). Se documenta aquí por transparencia, en la misma línea que otras decisiones de esta sesión donde se sigue el mock de diseño por defecto salvo que entre en conflicto con un patrón ya establecido en otro componente (no es el caso aquí).

---

## 8. Out of Scope

- Contador de caracteres en vivo (`127/500`) con `aria-live` — el mock solo muestra un hint de texto estático ("Max. 500 caracteres"), no un contador dinámico; se cubre con el nuevo input genérico `hint` + `maxLength` nativo, sin lógica de conteo adicional.
- `setDisabledState` de `ControlValueAccessor` (deshabilitar vía `FormControl.disable()`) — `dcx-ng-input`, el componente hermano más cercano, tampoco lo implementa; se mantiene el mismo alcance que ese precedente.
- Editor de texto enriquecido y componente de subida de archivos — aparecen en el mismo fichero de mock pero son componentes distintos, no en alcance de este refinamiento.

---

## 9. Open Questions

Ninguna — el mock resuelve todas las decisiones visuales sin ambigüedad frente a convenciones ya establecidas en otros componentes.

---

## 10. Implementation Plan

1. **`dcx-ng-textarea.component.ts`**:
   - Añadir inputs: `id`, `ariaLabel`, `ariaDescribedBy`, `required`, `hint`, `maxLength`, `resizable`.
   - Añadir `computed`: `errorId`, `hintId`, `describedBy`, `computedResize`.
   - Implementar `ControlValueAccessor` (`forwardRef`, `NG_VALUE_ACCESSOR`, `writeValue`, `registerOnChange`, `registerOnTouched`); invocar `onChange`/`onTouched` desde `onInput`/`onBlur`.
2. **`dcx-ng-textarea.component.html`**:
   - Reordenar: `<label>` antes del wrapper, renderizado con `label()` (no `floatLabel()`), `[attr.for]="id()"`, asterisco si `required()`.
   - `[id]="id()"`, `[attr.aria-invalid]`, `[attr.aria-required]`, `[attr.aria-describedby]`, `[attr.maxlength]`, `[style.resize]="computedResize()"` en el `<textarea>`.
   - Error: `role="alert"`, `[id]="errorId()"`.
   - Nuevo bloque de hint: `@if (hint() && !(invalid() && errorMessage()))`.
3. **`dcx-ng-textarea.component.scss`**: `flex-direction: column` + `gap` en wrapper; estilos de label estático/invalid/disabled; `.dcx-ng-textarea__required`; `.dcx-ng-textarea__hint`; `box-shadow` de foco (default/invalid); `--filled:focus-visible`; quitar `resize` de las reglas SCSS (ahora vía `[style.resize]`).
4. **Tests** (`dcx-ng-textarea.component.spec.ts`): añadir casos de §7; verificar que los existentes (tamaños, autoResize, floatLabel, invalid) siguen pasando tras el reordenamiento del label.
5. **Storybook** (`stories/Textarea/ClassBased.stories.ts`): traducir categorías a `Atributos`/`Eventos`; añadir argTypes para los inputs nuevos; nueva story `WithHint` (o `RequiredWithError` combinando label rojo + asterisco + hint).
6. **`Documentation.mdx`**: añadir `'ifta'` al tipo documentado de `floatLabel`; verificar que la sección de `formControlName` ahora es correcta (ya lo será, tras el paso 1); añadir `hint`/`required`/`maxLength`/`resizable` a la tabla de atributos.
7. **Page demo** (`src/app/pages/dcx-ng-page-textarea/`): migrar a `.demo-page`/`.demo-section`; traducir "This field is required" a español; añadir ejemplos de `required`+error, `hint`, `resizable=false`.
8. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
