# Spec: Message Refinement

**Status:** Done
**Date:** 2026-07-01
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-message` muestra un mensaje/alerta en línea con cuatro severidades
(`notification` | `success` | `warning` | `error`), icono opcional, título, párrafo,
enlace y botón de cierre opcional.

Este refinamiento corrige un **fallo de accesibilidad real** (el anuncio a lectores de
pantalla no funciona: usa `[attr.aria-role]`, que no es un atributo válido, con valores que
tampoco son roles ARIA), un **bug funcional** (el botón de cerrar no hace ni emite nada),
y varias mejoras de calidad (OnPush, SCSS duplicado, semántica del título, iconos por
severidad).

El componente es **compartido**: lo consumen `dcx-ng-toast` (que ya gestiona su propio
`role`/`aria-live` en su contenedor) y `dcx-ng-file-upload` (mensaje de error de
validación). El diseño de referencia es
`designs/dcx-ng-page-breadcrumb-divider-icon-message.html`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| #   | Criterio                    | Problema actual                                                                                                                                                                | Solución                                                                                                                                    |
| --- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **4.1.3 Status Messages**   | El contenedor usa `[attr.aria-role]="messageData().role"` — `aria-role` **no existe** (es `role`) y los valores (`notification`/`error`/…) **no son roles ARIA válidos**. El mensaje **no se anuncia** a lectores de pantalla. | Usar `[attr.role]` con `alert` (error/warning) o `status` (notification/success) + `aria-live` acorde. Nuevo input `announce` para desactivarlo cuando el contenedor padre ya anuncia (toast). |
| 2   | **1.4.1 Use of Color**      | Las severidades se distinguen **solo por color** salvo que el consumidor active `icon=true` y aporte `iconName`. No hay icono por defecto por severidad.                        | Mapear un icono por defecto por severidad (info/check/exclamation/x) para que `icon=true` muestre el icono correcto sin `iconName`.          |

### 2.2 WCAG AA — Recomendados

| #   | Criterio                | Descripción                                                                                                        |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 3   | **1.3.1 Semantics**     | El título se renderiza como `<h3>` usado solo por tamaño (no es un encabezado de sección). Contamina el outline. Pasar a `<p class="…__title">`. |

### 2.3 Bugs de lógica

| #   | Descripción                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 4   | El botón de cerrar (`showClose`) **no tiene handler ni output**: al pulsarlo no ocurre nada. Debe cerrar el mensaje y/o emitir un evento.               |

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | Falta `ChangeDetectionStrategy.OnPush` (el resto de la librería y sus hijos lo usan).                                                  |
| 6   | SCSS: `display: flex` y `gap` **duplicados** en `.message__container` (el `gap: 0.5rem` final pisa al token `--sp-3`).                 |
| 7   | Interfaz `DcxNgMessageComponentInputs` redundante (no se exporta ni se usa fuera); añade ruido.                                        |
| 8   | Storybook: categorías en inglés (`'Attributes'`); falta argType de `iconName`; faltan `announce`/`closed` y una story de cierre real. |
| 9   | Página demo: no usa `demo-page`/`demo-section`; no muestra `showClose` ni el cierre.                                                   |

---

## 3. API / Interface

Cambios **aditivos** (sin ruptura de inputs existentes).

### Inputs (`input()` signals)

| Name        | Type              | Default          | Descripción                                                                                     |
| ----------- | ----------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| `body`      | `string`          | — (required)     | Texto principal.                                                                                |
| `type`      | `DcxMessageType`  | `'notification'` | Severidad.                                                                                      |
| `title`     | `string?`         | `undefined`      | Título opcional.                                                                                |
| `link`      | `string?`         | `undefined`      | Enlace opcional.                                                                                |
| `icon`      | `boolean`         | `false`          | Muestra icono (ahora con icono por defecto por severidad).                                      |
| `iconName`  | `string?`         | `undefined`      | Sobrescribe el icono por severidad.                                                             |
| `showClose` | `boolean`         | `false`          | Muestra el botón de cerrar.                                                                     |
| `announce`  | `boolean`         | `true` **(NUEVO)** | Si `true`, aplica `role`/`aria-live` para anunciar. El toast lo pone a `false`.                |

### Outputs (`output()` signals)

| Name     | Emitted Type | Descripción                                    |
| -------- | ------------ | ---------------------------------------------- |
| `closed` | `void` **(NUEVO)** | Se emite al pulsar el botón de cerrar.   |

### Public Methods / estado interno

- `messageData()` (computed) — ahora devuelve `{ icon, role, ariaLive }` por severidad (icono por defecto + rol ARIA estándar). **Nota:** cambia el valor de `role` (antes `notification`/… → ahora `status`/`alert`).
- `dismissed` (signal privado) — el mensaje se oculta al cerrarse.

---

## 4. Visual States & Variants

- **Notification / Success** — `role="status"`, `aria-live="polite"`.
- **Warning / Error** — `role="alert"`, `aria-live="assertive"`.
- **Con icono** — icono por defecto por severidad (o `iconName`).
- **Con título / enlace** — sin cambios visuales.
- **Closable** — botón de cerrar que oculta el mensaje y emite `closed`.

Referencia: `designs/dcx-ng-page-breadcrumb-divider-icon-message.html`.

---

## 5. SCSS / Tokens

- Eliminar `display: flex` y `gap: 0.5rem` duplicados (mantener `gap: var(--sp-3)`).
- La clase de severidad pasa a derivarse de `type()` (no de `role`, que ahora es `status`/`alert`). Las reglas `.error/.warning/.notification/.success` no cambian.
- Se conserva el bloque `::ng-deep .dcx-ng-button` del botón de cerrar (fuera de scope refactorizarlo).

---

## 6. Accesibilidad (WCAG AA)

| Elemento     | ARIA                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------ |
| Contenedor   | `role` = `alert`/`status` según severidad y `aria-live` acorde, **solo si `announce`**     |
| Icono        | decorativo (`aria-hidden="true"`, ya heredado de `dcx-ng-icon`)                             |
| Botón cerrar | `<button>` nativo (vía `dcx-ng-button`) con `aria-label="Cerrar"`, operable por teclado     |
| Título       | `<p>` (no encabezado) para no contaminar el outline                                        |

---

## 7. Test Cases

- [x] should create the component
- [x] `role="status"` + `aria-live="polite"` para notification/success
- [x] `role="alert"` + `aria-live="assertive"` para warning/error
- [x] con `announce=false` no se aplica `role` ni `aria-live`
- [x] `messageData().icon` devuelve el icono por defecto por severidad
- [x] la clase de severidad se aplica según `type()`
- [x] al pulsar cerrar se emite `closed` y el mensaje se oculta
- [x] el título se renderiza como `<p>` (no `<h3>`)
- [x] los tests existentes siguen pasando — 57/57 (message + toast + file-upload)

---

## 7b. Decisión: componentes de librería vs HTML nativo

Se mantiene el botón de cerrar mediante `dcx-ng-button` (variant `icon-only`) con
`aria-label="Cerrar"` — es coherente con el resto de la librería y ya es un `<button>`
nativo accesible. El anuncio se hace en el contenedor con `role`/`aria-live` estándar en
lugar de atributos inventados.

---

## 8. Out of Scope

- No se refactoriza el `::ng-deep` del botón de cerrar (funciona; refactor arriesgado).
- No se internacionaliza el `aria-label="Cerrar"` (se mantiene en español, como el proyecto).
- No se cambia el diseño visual ni los tokens de color de las severidades.
- No se toca el `dcx-ng-toast` salvo para pasarle `[announce]="false"` (evitar doble live-region).

---

## 9. Open Questions

- [ ] Ninguna.

---

## 10. Implementation Plan

1. **Component TS**: `OnPush`; quitar la interfaz redundante; nuevo input `announce` y output `closed`; `dismissed` signal + `onClose()`; `messageData()` con `{ icon, role, ariaLive }` por severidad.
2. **Component HTML**: `[attr.role]`/`[attr.aria-live]` gated por `announce`; clase por `type()`; título `<p>`; `(buttonClick)="onClose()"`; ocultar cuando `dismissed()`.
3. **Component SCSS**: quitar duplicados `display`/`gap`.
4. **Toast**: pasar `[announce]="false"` a `<dcx-ng-message>`.
5. **Spec.ts**: tests de role/aria-live/announce/close/icon/título; ajustar los de `messageData().role`.
6. **Storybook**: categorías español; argTypes `iconName`/`announce`/`closed`; consolidar stories + `Closable` funcional.
7. **Page demo**: reconstruir con `demo-page`/`demo-section`; añadir ejemplo Closable.
8. **Verificación**: `nx test` de message + toast + file-upload (no regresión) y builds lib/app/storybook.
