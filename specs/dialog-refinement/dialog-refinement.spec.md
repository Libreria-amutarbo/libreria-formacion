# Spec: Dialog Refinement

**Status:** Done
**Date:** 2026-06-08
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-dialog` es un componente modal accesible gestionado mediante `DialogService`. Soporta 9 posiciones de pantalla, backdrop opcional, header con título y botón de cierre, y proyección de contenido via `ng-template` (`#dialogBody`, `#dialogFooter`).

Esta refinación añade la tecla `Escape` para cerrar, `ChangeDetectionStrategy.OnPush`, tres stories de Storybook que estaban en la demo pero no en el catálogo, y reestructura la página demo al formato estándar `demo-page / demo-section`.

**Referencia de diseño:** `designs/dcx-ng-page-dialog.html`

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 2.1.1 Keyboard | `Escape` no cierra el diálogo — no hay listener de teclado en el componente | Añadir `@HostListener('document:keydown.escape')` que llame a `close()` si `isVisible()` |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 2.4.3 Focus Order | Focus trap no implementado — el foco puede salir del diálogo con `Tab` | Pendiente (fuera de scope, requiere CDK) |
| 2 | 2.4.7 Focus Visible | `:focus-visible` no declarado en SCSS del componente — delegado a `DcxNgButtonComponent` que sí lo implementa | Verificar que el botón de cierre renderiza el outline correctamente |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | `ChangeDetectionStrategy` no definido — usa la detección por defecto en lugar de `OnPush` |
| 2 | Page demo no usa las clases `demo-page` / `demo-page-header` / `demo-section` del sistema de diseño de la app — usa `<section>` y `<h2>` ad hoc |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | Storybook carece de las stories: `Destructive` (confirmación peligrosa), `WithForm` (formulario), `Informative` (con icono) — están en la demo pero no en el catálogo |
| 2 | Page demo no está numerada (`demo-section__num`) ni sigue el orden de Storybook |

---

## 3. API / Interface

Sin cambios breaking. Solo correcciones internas.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `dialogId` | `string \| undefined` | `undefined` | — | Identificador para gestionar visibilidad desde `DialogService` |
| `title` | `string` | `''` | — | Texto del header. Si está vacío no se renderiza el `<h3>` |
| `visible` | `boolean` | `false` | — | Control directo de visibilidad sin `DialogService` |
| `showClose` | `boolean` | `true` | — | Muestra u oculta el botón ✕ del header |
| `position` | `DcxDialogPosition` | `'center'` | — | Posición en pantalla (9 valores) |
| `closeOnBackdrop` | `boolean` | `true` | — | Cierra al hacer clic en el backdrop |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `closeDialog` | `void` | Emitido al cerrar el diálogo (botón ✕, backdrop, Escape o footer) |

### Public Methods

| Method | Signature | Descripción |
|--------|-----------|-------------|
| `close` | `(): void` | Cierra el diálogo y emite `closeDialog` |

---

## 4. Visual States & Variants

Según `designs/dcx-ng-page-dialog.html`:

| Estado | Descripción |
|--------|-------------|
| **Cerrado** | El componente no renderiza nada (`@if (isVisible())` es false) |
| **Informativo** | Header con título + ✕, body con icono info (azul), footer con un botón "Entendido" |
| **Confirmación** | Header + body con texto, footer "Cancelar" + "Aceptar" |
| **Destructivo** | Icono danger (rojo) en body, footer "Cancelar" + "Eliminar" (variant danger) |
| **Formulario** | Body con campos input/select, footer "Cancelar" + acción primaria |
| **Sin título** | Header solo con botón ✕ |
| **Sin botón cierre** | Header solo con título |
| **9 posiciones** | `center` (default) + 8 puntos de anclaje |

---

## 5. SCSS / Tokens

Sin cambios al SCSS del componente. Tokens ya correctos:

| Token | Uso |
|-------|-----|
| `--bg-default` | Fondo del diálogo |
| `--bg-surface` | Fondo del footer |
| `--border-default` | Bordes header/footer |
| `--text-dark` | Título |
| `--text-muted` | Cuerpo |
| `--r-lg` | Border-radius |
| `--sp-3`, `--sp-4`, `--sp-5` | Paddings |

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA (ya implementada)

```html
<div
  [class]="dialogClasses()"
  role="dialog"
  aria-modal="true"
  [attr.aria-labelledby]="title() ? dialogTitleId() : null"
>
  <h3 [id]="dialogTitleId()" class="dialog-title">{{ title() }}</h3>
  <dcx-ng-button ariaLabel="Cerrar diálogo" ... />
</div>
```

### Teclado

| Tecla | Comportamiento |
|-------|---------------|
| `Escape` | Cierra el diálogo (nuevo) |
| `Tab` | Navega entre elementos interactivos (sin trap — pendiente CDK) |

### Screen reader notes

- `aria-modal="true"` indica que el resto de la página no es interactiva
- `aria-labelledby` vincula el título al contenedor `role="dialog"`
- Cuando `title` está vacío, `aria-labelledby` no se renderiza

---

## 7. Test Cases

- [x] should create the component
- [x] should have default values
- [x] should be visible when `visible` input is true
- [x] should emit `closeDialog` when `close()` is called
- [x] should call `close()` on backdrop click when `closeOnBackdrop` is true
- [x] should NOT call `close()` on backdrop click when `closeOnBackdrop` is false
- [x] should compute `dialogClasses` based on position (signal)
- [x] should accept `title` input
- [x] `isVisible` should use `DialogService` state when `dialogId` is set
- [x] `close()` should call `dialogService.close()` when `dialogId` is set
- [x] should render `aria-labelledby` pointing to title id when title is set
- [x] should NOT render `aria-labelledby` when title is empty
- [x] should close on `Escape` key press when visible
- [x] should NOT close on `Escape` key press when not visible

---

## 7b. Decisión: `@HostListener('document:keydown.escape')` vs `(keydown)` en template

Se usa `@HostListener('document:keydown.escape')` porque:
1. El diálogo está en un overlay fixed — el foco puede estar en cualquier elemento del DOM, no solo dentro del diálogo
2. La versión template `(keydown)` requeriría que el diálogo tuviera el foco, lo que no está garantizado sin focus trap
3. Escuchar en `document` es el patrón estándar para overlays (WAI-ARIA APG Modal Dialog)
4. Se guarda con `if (this.isVisible())` para no interferir cuando el diálogo está cerrado

---

## 8. Out of Scope

- Focus trap (requiere `cdkTrapFocus` o Angular CDK — tarea separada)
- Animaciones de entrada/salida mejoradas
- Tamaños configurables (`size` input)
- Variante sin backdrop (drawer-style)
- Uso del campo `data` de `DialogService` en el componente
- Múltiples diálogos apilados

---

## 9. Open Questions

_Ninguna._

---

## 10. Implementation Plan

1. **TS** — Añadir `ChangeDetectionStrategy.OnPush` y `@HostListener('document:keydown.escape')`
2. **Tests** — Añadir casos para Escape y `aria-labelledby`
3. **Storybook** — Añadir stories `Destructive`, `WithForm`, `Informative`
4. **Page demo HTML** — Reestructurar con `demo-page / demo-section`
5. **Page demo SCSS** — Reemplazar estilos ad hoc por comentario estándar (salvo el grid de posiciones que es funcional)
