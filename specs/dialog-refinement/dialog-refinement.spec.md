# Spec: Dialog Refinement

**Status:** Done
**Date:** 2026-06-08
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-dialog` es un componente modal accesible gestionado mediante `DialogService`. Soporta 9 posiciones de pantalla, backdrop opcional con cierre al clic, header con título y botón de cierre, y proyección de contenido personalizado vía `ng-template` (`#dialogBody`, `#dialogFooter`). Esta refinación corrige una violación WCAG crítica (`aria-labelledby` ausente), migra `dialogClasses` de getter a `computed()` signal, alinea los tokens de borde y tipografía con el diseño, corrige la documentación MDX rota, y unifica las categorías de Storybook al español.

**Referencia de diseño:** `designs/dcx-ng-page-dialog.html`

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | `role="dialog"` sin `aria-labelledby` — el título no está vinculado al diálogo | Añadir `[attr.aria-labelledby]="title() ? dialogTitleId() : null"` al contenedor y `[id]="dialogTitleId()"` al `<h3>` |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 2.1.1 Keyboard | Sin gestión de foco al abrir: el foco debería moverse al interior del diálogo y regresar al trigger al cerrarlo |
| 2 | 2.1.1 Keyboard | Escape no cierra el diálogo (no hay listener de teclado en el componente) |

### 2.3 Bugs de lógica / inconsistencias técnicas

| # | Descripción |
|---|-------------|
| 1 | `dialogClasses` implementado como `get` getter en lugar de `computed()` signal — inconsistente con el resto del patrón signals del componente |
| 2 | MDX rota: importa `DialogClassBasedStories` pero el template usa `DialogStories` (variable inexistente) y referencia `DialogStories.ServiceBased` (story inexistente) |

### 2.4 Mejoras de UX / coherencia visual

| # | Descripción |
|---|-------------|
| 1 | SCSS usa `--border-light: #d1d5db` en header y footer pero el diseño y todos los demás componentes usan `--border-default: #e5e7eb` |
| 2 | Título del diálogo: `--fs-xl: 20px` en el componente vs `16px` en el diseño — demasiado grande |
| 3 | Footer: padding superior `--sp-4` (16px) vs `--sp-3` (12px) en el diseño |
| 4 | Storybook: categorías de argTypes en inglés (`Behavior`, `Content`, `Appearance`, `Events`) — el estándar del proyecto usa `Atributos` para inputs y `Eventos` para outputs |

---

## 3. API / Interface

Sin cambios breaking. Solo correcciones internas y de accesibilidad.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `dialogId` | `string \| undefined` | `undefined` | — | Identificador para gestionar visibilidad desde `DialogService` |
| `title` | `string` | `''` | — | Texto del header. Si está vacío, no se renderiza el elemento de título |
| `visible` | `boolean` | `false` | — | Control directo de visibilidad (sin `DialogService`) |
| `showClose` | `boolean` | `true` | — | Muestra u oculta el botón ✕ del header |
| `position` | `DcxDialogPosition` | `'center'` | — | Posición en pantalla. 9 variantes: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `closeOnBackdrop` | `boolean` | `true` | — | Cierra el diálogo al hacer clic en el backdrop |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `closeDialog` | `void` | Emitido al cerrar el diálogo (botón ✕, backdrop, o acción del footer) |

### Content Children (ng-template)

| Template ref | Descripción |
|--------------|-------------|
| `#dialogBody` | Contenido del cuerpo del diálogo |
| `#dialogFooter` | Contenido del footer (botones de acción) |

### Señales internas (readonly computed)

| Name | Tipo | Descripción |
|------|------|-------------|
| `isVisible` | `Signal<boolean>` | Combina `visible` y `DialogService` para determinar visibilidad |
| `dialogClasses` | `Signal<string>` | Clase CSS dinámica con la posición: `dcx-dialog dialog--pos-{position}` |
| `dialogTitleId` | `Signal<string>` | ID único del título para `aria-labelledby`: `dialog-title-{dialogId \| 'default'}` |

---

## 4. Visual States & Variants

Según el diseño en `designs/dcx-ng-page-dialog.html`:

- **Cerrado** — el componente no renderiza nada (`@if (isVisible())` es false)
- **Abierto: Informativo** — header con título + botón ✕, cuerpo con icono info + texto, footer con un botón "Entendido"
- **Abierto: Confirmación** — header + cuerpo con texto de confirmación, footer con "Cancelar" + "Aceptar"
- **Abierto: Destructivo** — icono rojo en el cuerpo, footer con "Cancelar" + "Eliminar" (variante danger)
- **Abierto: Formulario** — cuerpo con campos de formulario, footer con "Cancelar" + acción primaria
- **Sin título** — header solo con botón ✕ (sin `<h3>`)
- **Sin botón cierre** — header solo con título (sin botón ✕), cierre solo por backdrop o footer
- **9 posiciones** — `center` (por defecto), más los 8 puntos de anclaje en bordes y esquinas

---

## 5. SCSS / Tokens

### Tokens usados

- `--bg-default` — fondo del diálogo
- `--bg-surface` — fondo del footer
- `--border-default` — bordes header/footer (corregido desde `--border-light`)
- `--text-dark` — color del título
- `--text-muted` — color del cuerpo
- `--r-lg` — border-radius del diálogo (8px)
- `--sp-3`, `--sp-4`, `--sp-5` — paddings del header, footer y cuerpo
- `--ff-base` — fuente

### Fixes aplicados

| Elemento | Antes | Después |
|----------|-------|---------|
| Header border | `--border-light: #d1d5db` | `--border-default: #e5e7eb` |
| Footer border | `--border-light: #d1d5db` | `--border-default: #e5e7eb` |
| Título font-size | `var(--fs-xl, 20px)` | `16px` |
| Footer padding-top | `var(--sp-4, 16px)` | `var(--sp-3, 12px)` |

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA del diálogo

```html
<!-- Dialog container -->
<div
  class="dcx-dialog dialog--pos-center"
  role="dialog"
  aria-modal="true"
  [attr.aria-labelledby]="title() ? dialogTitleId() : null"
>
  <div class="dialog-header">
    <!-- Título vinculado mediante id -->
    <h3 [id]="dialogTitleId()" class="dialog-title">Título del diálogo</h3>
    <!-- Botón de cierre -->
    <dcx-ng-button ariaLabel="Cerrar diálogo" ... />
  </div>

  <div class="dialog-body">
    <ng-container *ngTemplateOutlet="bodyTemplate()" />
  </div>

  <div class="dialog-footer">
    <ng-container *ngTemplateOutlet="footerTemplate()" />
  </div>
</div>
```

### Teclado (pendiente — fuera del scope de esta refinación)

| Tecla | Acción |
|-------|--------|
| `Escape` | Cierra el diálogo y devuelve el foco al trigger |
| `Tab` | Navega entre elementos interactivos dentro del diálogo |
| `Shift+Tab` | Navegación inversa |

### Screen reader notes

- `aria-modal="true"` indica que el resto de la página no es interactiva mientras el diálogo está abierto
- `aria-labelledby` vincula el título al contenedor `role="dialog"` — los lectores de pantalla anuncian el título al abrir el diálogo
- Cuando `title` está vacío, `aria-labelledby` no se renderiza (evita referencias a IDs vacíos)

---

## 7. Test Cases

- [x] should create the component
- [x] should have default values (`title: ''`, `showClose: true`, `position: 'center'`, `closeOnBackdrop: true`)
- [x] should be visible when `visible` input is true
- [x] should not be visible when `visible` input is false
- [x] should emit `closeDialog` when `close()` is called
- [x] should call `close()` on backdrop click when `closeOnBackdrop` is true
- [x] should NOT call `close()` on backdrop click when `closeOnBackdrop` is false
- [x] should compute `dialogClasses` based on position (signal)
- [x] should accept `title` input
- [x] `isVisible` should use `DialogService` state when `dialogId` is set
- [x] `close()` should call `dialogService.close()` when `dialogId` is set
- [x] `close()` without `dialogId` should not call `dialogService`
- [ ] should render `aria-labelledby` pointing to title id when title is set
- [ ] should NOT render `aria-labelledby` when title is empty
- [ ] should render `[id]` on `<h3>` matching the `aria-labelledby` value
- [ ] should close on Escape key press
- [ ] should trap focus within the dialog while open

---

## 8. Decisión: `dialogTitleId` strategy

El ID del título se genera como `dialog-title-{dialogId ?? 'default'}`. Cuando hay múltiples diálogos en la página con `dialogId` distinto, cada uno tiene un ID único. Cuando no hay `dialogId` (visibilidad controlada por `visible` input), se usa `'default'` — esto es aceptable porque en ese modo solo puede haber un diálogo activo a la vez controlado por `visible`.

---

## 9. Out of Scope

- Focus trap (foco atrapado dentro del diálogo mientras está abierto) — requiere `FocusTrapDirective` o CDK
- Escape key listener — requiere `HostListener` o `@HostBinding`
- Animaciones de entrada/salida mejoradas (actualmente solo fade via `@starting-style`)
- Tamaños configurables (`size` input: `sm`, `md`, `lg`)
- Variante sin backdrop (drawer-style)
- Soporte de múltiples diálogos apilados (z-index dinámico)

---

## 10. Open Questions

- [ ] ¿Se debe añadir `FocusTrap` en una próxima iteración o integrarlo en la refinación actual?
- [ ] ¿El `dialogId: 'default'` en `dialogTitleId` puede colisionar si hay dos diálogos sin `dialogId` en la misma página?

---

## 11. Implementation Plan

1. **HTML** — Añadir `[attr.aria-labelledby]` al contenedor del diálogo; añadir `[id]="dialogTitleId()"` al `<h3>`; cambiar `[class]="dialogClasses"` a `[class]="dialogClasses()"`
2. **TS** — Reemplazar `get dialogClasses()` por `readonly dialogClasses = computed(...)`; añadir `readonly dialogTitleId = computed(...)`
3. **SCSS** — Reemplazar `--border-light` por `--border-default` en header y footer; cambiar title `font-size` a `16px`; cambiar footer padding superior a `--sp-3`
4. **Storybook** — Unificar categorías de argTypes al estándar del proyecto: `Atributos` para inputs, `Eventos` para outputs
5. **MDX** — Corregir variable de import (`DialogClassBasedStories`) y referencia de story (`BasicDialog`)
6. **Spec** — Actualizar test de `dialogClasses` a sintaxis de signal: `component.dialogClasses()`
