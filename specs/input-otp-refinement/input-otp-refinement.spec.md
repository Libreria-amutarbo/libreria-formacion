# Spec: InputOtp Refinement

**Status:** Done
**Date:** 2026-07-01
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-input-otp` renderiza un campo de código de un solo uso (OTP) como un grupo de
casillas de un carácter, con integración de formularios (`ControlValueAccessor`),
navegación por teclado (flechas, backspace), pegado distribuido, máscara, modo numérico
y plantilla personalizable (`ContentChild`).

El componente ya está bien construido: `OnPush`, signals/computed, CVA, `role="group"`,
`aria-label` por casilla, `autocomplete="one-time-code"`, `inputmode`, `focus-visible`,
`disabled` nativo y tests amplios. Este refinamiento se centra en **coherencia de
accesibilidad en español** y en **alinear el estado de error con el patrón ya aplicado a
`input` y `checkbox`** (mensaje de error anunciado con `role="alert"`), más pequeños
ajustes de tokens y de cobertura de stories.

No existe fichero de diseño para OTP en `designs/` (no hay referencia visual dedicada);
se sigue el patrón de los componentes ya refinados.

El componente se usa solo en la página demo (`src/app/pages/dcx-ng-page-input-otp/`) y en
Storybook. No hay uso en producción fuera de la librería.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

Ninguno. El componente ya cumple los criterios críticos (elemento nativo, grupo con rol y
nombre, teclado, foco visible, `disabled` nativo).

### 2.2 WCAG AA — Recomendados

| #   | Criterio                       | Descripción                                                                                                                                                                                                                                                             |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **3.1.1 / coherencia i18n**    | El `aria-label` por defecto es inglés (`'One-time password input'`) y `getAriaLabel` concatena `"… 1 of 4"` (conector `of` en inglés). El proyecto es en español. El nombre por casilla resultante es confuso: "One-time password input 1 of 4".                        |
| 2   | **4.1.3 Status Messages**      | `invalid` solo pinta el borde rojo y pone `aria-invalid` en el grupo, pero **no hay texto de error anunciado**. Igual que en `input`/`checkbox`, procede un mensaje opcional con `role="alert"` y enlazarlo con `aria-describedby` en el grupo.                          |

### 2.3 Bugs de lógica

Ninguno detectado. La lógica de teclado, pegado, sincronización de `length` (`effect` +
`untracked`) y CVA es correcta.

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3   | El borde de casilla rellena usa `var(--bg-primary, …)`; el token estándar de la librería es `--color-primary`. Alinear para coherencia (mismo valor #0058ab).                          |
| 4   | Faltan stories explícitas de **Disabled** e **Invalid** (con mensaje de error). El estado inválido solo se ve indirectamente vía formularios.                                          |
| 5   | La página demo no cubre los estados Disabled/Invalid como secciones propias.                                                                                                            |

---

## 3. API / Interface

Cambios **aditivos** (sin ruptura).

### Inputs (`input()` signals)

| Name           | Type              | Default                  | Descripción                                                                                          |
| -------------- | ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `length`       | `number`          | `4`                      | Número de casillas.                                                                                 |
| `size`         | `DcxInputOtpSize` | `'medium'`               | Tamaño (`small`/`medium`/`large`).                                                                  |
| `integerOnly`  | `boolean`         | `false`                  | Solo dígitos (`inputmode="numeric"`).                                                               |
| `mask`         | `boolean`         | `false`                  | Oculta los caracteres (`type="password"`).                                                          |
| `invalid`      | `boolean`         | `false`                  | Estado de error (borde rojo + `aria-invalid`).                                                      |
| `disabled`     | `boolean`         | `false`                  | Deshabilita las casillas (nativo).                                                                  |
| `placeholder`  | `string`          | `''`                     | Placeholder por casilla.                                                                            |
| `ariaLabel`    | `string`          | **`'Código de un solo uso'`** (antes inglés) | Nombre accesible del grupo.                                                     |
| `errorMessage` | `string`          | `''`  **(NUEVO)**        | Texto de error; si `invalid` y hay texto, se muestra bajo el grupo con `role="alert"`.             |

### Outputs (`output()` signals)

| Name          | Emitted Type | Descripción                                     |
| ------------- | ------------ | ----------------------------------------------- |
| `valueChange` | `string`     | Se emite al cambiar el valor.                   |
| `completed`   | `string`     | Se emite al rellenar todas las casillas.        |
| `focusEvent`  | `number`     | Índice de la casilla que recibe el foco.        |
| `blurEvent`   | `number`     | Índice de la casilla que pierde el foco.        |

### Public Methods

| Method    | Signature        | Descripción                                                 |
| --------- | ---------------- | ----------------------------------------------------------- |
| `focus()` | `() => void`     | Enfoca la primera casilla vacía (o la primera).             |
| `clear()` | `() => void`     | Limpia el código y reenfoca.                                |

Cambio interno: `getAriaLabel(i)` pasa a devolver `"Dígito {i+1} de {length}"` (español,
desacoplado del `ariaLabel` del grupo).

---

## 4. Visual States & Variants

- **Default** — casillas medianas, vacías.
- **Filled** — borde primario (`--color-primary`).
- **Sizes** — `small` / `medium` / `large`.
- **Mask** — caracteres ocultos.
- **Integer only** — solo dígitos.
- **Disabled** — opacidad + `bg-disabled`, no editable (nativo).
- **Invalid** — borde rojo, `aria-invalid`, y (nuevo) mensaje `role="alert"` si hay `errorMessage`.

---

## 5. SCSS / Tokens

- `.dcx-input-otp__input--filled`: `var(--bg-primary…)` → `var(--color-primary, #0058ab)` (coherencia con el resto de la librería).
- Nuevo `.dcx-input-otp__error`: color `--color-error`, tamaño `--fs-sm`, margen superior, coherente con `.dcx-ng-input__error`.
- Se conservan `:focus-visible`, placeholder y estados existentes.

---

## 6. Accesibilidad (WCAG AA)

| Elemento          | ARIA                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Grupo             | `role="group"`, `aria-label` = `ariaLabel()`, `aria-invalid`, `aria-describedby` = id de error cuando aplica |
| Casilla (`input`) | `aria-label` = `"Dígito N de M"`, `autocomplete="one-time-code"`, `inputmode`, `maxlength=1` |
| Error             | contenedor con `role="alert"` (solo si `invalid` y `errorMessage`)                          |

Teclado (sin cambios): flechas ←/→ mueven foco; Backspace borra y retrocede; pegado
distribuye el código entre casillas.

---

## 7. Test Cases

- [x] should create the component
- [x] `getAriaLabel` devuelve `"Dígito 1 de 4"` (español)
- [x] `ariaLabel` por defecto es español (`'Código de un solo uso'`) y se aplica al grupo
- [x] con `invalid` + `errorMessage` se renderiza un contenedor con `role="alert"` y el texto
- [x] sin `invalid` (o sin `errorMessage`) no se renderiza el error
- [x] el grupo referencia el id del error en `aria-describedby` cuando aplica
- [x] los tests existentes (teclado, pegado, CVA, completed) siguen pasando (31/31)

---

## 7b. Decisión: componentes de librería vs HTML nativo

Se mantiene el `<input>` nativo por casilla (correcto para OTP: soporta `inputmode`,
`autocomplete="one-time-code"`, foco y pegado nativos). El foco entre casillas se gestiona
con `querySelectorAll('input')` sobre el host — se conserva porque también debe funcionar
con la plantilla personalizada (`ContentChild`), donde `viewChildren` no capturaría los
inputs proyectados de forma fiable.

---

## 8. Out of Scope

- No se cambia la lógica de teclado, pegado ni la sincronización de `length`.
- No se convierte `focusInput` a `viewChildren` (ver 7b).
- No se refactoriza la plantilla de ejemplo (`SampleLayout`) más allá de reflejar los estados nuevos.
- No se añade `readonly` (no solicitado; `disabled` cubre el caso).

---

## 9. Open Questions

- [ ] Ninguna.

---

## 10. Implementation Plan

1. **Component TS**: `ariaLabel` default español; `getAriaLabel` → `"Dígito N de M"`; nuevo input `errorMessage`; `errorId` computed; exponer `describedBy` para el grupo.
2. **Component HTML**: `aria-describedby` en el grupo; bloque de error con `role="alert"` cuando `invalid() && errorMessage()`.
3. **Component SCSS**: `--filled` a `--color-primary`; `.dcx-input-otp__error`.
4. **Spec.ts**: tests de aria-label español, error `role="alert"`, describedby; ajustar el test de `getAriaLabel` existente.
5. **Storybook**: stories `Disabled` e `Invalid` (con `errorMessage`); argTypes de `errorMessage`.
6. **Page demo**: secciones Disabled e Invalid.
7. **Verificación**: `nx test` del spec + build lib/app/storybook.
