# Spec: InputOtp

**Status:** Done
**Date:** 2026-06-03
**Author:** GitHub Copilot

---

## 1. Overview

Crear un componente `dcx-ng-input-otp` en la librería DCX para introducir códigos OTP divididos en múltiples casillas, con navegación por teclado, integración con Angular Forms y página demo en la app de showcase.

La referencia funcional base es `PrimeNG InputOtp`, pero adaptada al estilo y convenciones de la librería DCX.

---

## 2. Acceptance Criteria

- [x] Existe el componente standalone `dcx-ng-input-otp` en `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-input-otp/`.
- [x] El componente soporta longitud configurable mediante input `length`.
- [x] El componente soporta restricción numérica mediante input `integerOnly`.
- [x] El componente soporta modo enmascarado mediante input `mask`.
- [x] El componente expone estado inválido mediante input `invalid`.
- [x] El componente funciona con Angular Forms (`ControlValueAccessor` o `model()` compatible con forms del repo).
- [x] El componente concatena el valor completo y lo emite correctamente.
- [x] El componente implementa navegación por teclado entre casillas: avance, retroceso y flechas izquierda/derecha.
- [x] Existe página demo registrada en la app de showcase.
- [x] El componente está exportado desde `libs/dcx-ng-lib/src/index.ts`.
- [x] Existe cobertura mínima de tests para creación, escritura, navegación y validación básica.

---

## 3. API / Interface

### Inputs

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `length` | `number` | `4` | No | Número de casillas OTP |
| `integerOnly` | `boolean` | `false` | No | Restringe entrada a dígitos |
| `mask` | `boolean` | `false` | No | Oculta el carácter introducido |
| `invalid` | `boolean` | `false` | No | Marca el componente en estado inválido |
| `disabled` | `boolean` | `false` | No | Deshabilita toda la interacción |
| `placeholder` | `string` | `''` | No | Placeholder por casilla, si aplica |
| `ariaLabel` | `string` | `'One-time password input'` | No | Etiqueta accesible del grupo |

### Outputs

| Name | Emitted Type | Description |
|------|-------------|-------------|
| `valueChange` | `string` | Emite el código OTP agregado |
| `completed` | `string` | Emite cuando todas las casillas están completas |
| `focusEvent` | `number` | Emite índice de casilla al enfocar |
| `blurEvent` | `number` | Emite índice de casilla al perder foco |

### Public Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `focus` | `(): void` | Enfoca la primera casilla disponible |
| `clear` | `(): void` | Limpia todas las casillas |

---

## 4. Visual States & Variants

- **Default** — Casillas vacías, separadas uniformemente, listas para introducir el código.
- **Filled** — Casillas con valor visible o enmascarado.
- **Focused** — Casilla activa con resaltado visual.
- **Invalid** — Borde/estado visual de error para el grupo o casillas.
- **Disabled** — Casillas sin interacción y con opacidad reducida.
- **Completed** — Estado derivado cuando se completa el número de caracteres definido.

---

## 5. SCSS / Tokens

Usar tokens existentes de la librería siempre que sea posible:

- `--border-default`
- `--background-primary`
- `--background-primary-hover`
- `--content-default`
- `--content-subtle`
- `--font-family-primary`
- `--border-radius-*`
- `--shadow-*`

Fallbacks solo si el token no existe aún.

---

## 6. Accessibility (a11y)

- El grupo debe tener naming accesible mediante `aria-label` o `aria-labelledby`.
- Cada casilla debe ser navegable por teclado.
- `ArrowLeft` y `ArrowRight` deben mover foco entre casillas.
- `Backspace` debe borrar y volver a la casilla previa cuando corresponda.
- El componente debe soportar `disabled` correctamente en accesibilidad.

---

## 7. Test Cases

- [x] should create the component
- [x] should render the configured number of inputs
- [x] should aggregate the OTP value in order
- [x] should restrict input when `integerOnly` is true
- [x] should mask values when `mask` is true
- [x] should move focus to the next input after typing
- [x] should move focus to the previous input on backspace when empty
- [x] should emit `completed` when all positions are filled
- [x] should integrate with Angular forms value writing
- [x] should apply invalid styles when `invalid` is true

---

## 8. Out of Scope

- Slots o templating avanzado por casilla en la primera versión.
- Separadores visuales especiales tipo `3-3` o layouts de autenticación complejos.
- Autocomplete nativo SMS OTP específico por plataforma.

---

## 9. Open Questions

- [x] La primera versión sale con tamaño único.
- [x] Incluye soporte para pegar el código completo en una sola acción.
- [x] Usa `ControlValueAccessor` explícito para integrarse con Angular Forms.

---

## 10. Implementation Plan

1. Crear el componente `dcx-ng-input-otp` con lógica interna de casillas, foco y valor agregado.
2. Añadir estilos base y estados visuales siguiendo tokens de la librería.
3. Crear tests unitarios del componente.
4. Exportar el componente desde `libs/dcx-ng-lib/src/index.ts`.
5. Registrar `INPUT_OTP` en `src/app/core/constants/app-routes.ts`.
6. Crear la página demo `dcx-ng-page-input-otp` en `src/app/pages/`.
7. Registrar la ruta en `src/app/app.routes.ts`.
