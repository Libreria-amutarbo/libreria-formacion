# Spec: Dialog Refinement

**Status:** Pendiente
**Date:** 2026-06-08
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-dialog` es un componente modal accesible gestionado mediante `DialogService`. Soporta 9 posiciones de pantalla, backdrop opcional con cierre al clic, header con título y botón de cierre, y proyección de contenido personalizado vía `ng-template` (`#dialogBody`, `#dialogFooter`).

Esta refinación actualiza la **página demo** para que refleje fielmente los 3 escenarios del diseño de referencia (`designs/dcx-ng-page-dialog.html`): diálogo destructivo, diálogo de formulario y diálogo informativo — incluyendo los iconos circulares y el contenido realista. Las correcciones al componente (WCAG, signals, tokens) ya están implementadas.

**Referencia de diseño:** `designs/dcx-ng-page-dialog.html`

---

## 2. Estado actual del componente

Los siguientes puntos del spec anterior **ya están implementados** y no requieren cambios:

| Elemento | Estado |
|----------|--------|
| `aria-labelledby` en `role="dialog"` | ✅ Implementado |
| `dialogTitleId` como `computed()` signal | ✅ Implementado |
| `dialogClasses` como `computed()` signal | ✅ Implementado |
| Header/footer usan `--border-default` | ✅ Implementado |
| Título `font-size: 16px` | ✅ Implementado |
| Footer `padding-top: var(--sp-3, 12px)` | ✅ Implementado |
| Storybook argTypes en español (`Atributos` / `Eventos`) | ✅ Implementado |
| MDX corregida (`DialogClassBasedStories.BasicDialog`) | ✅ Implementado |

---

## 3. Problemas detectados

### 3.1 Página demo no refleja el diseño

La página demo (`src/app/pages/dcx-ng-page-dialog/`) muestra 4 ejemplos genéricos que **no coinciden** con los escenarios del diseño de referencia:

| Problema | Impacto |
|----------|---------|
| No tiene el diálogo de **confirmación destructiva** (icono danger + botón "Eliminar") | El diseño lo muestra como caso principal |
| No tiene el diálogo de **formulario** (campos de texto, select) | El diseño lo muestra como segundo caso |
| No tiene el diálogo **informativo** con icono info circle | El diseño lo muestra como tercer caso |
| Los cuerpos usan texto genérico ("Este es un mensaje informativo") | Deberían usar el contenido realista del diseño |
| El ejemplo de scroll y el de posiciones no están en el diseño | Son demostraciones de funcionalidad, pero el orden difiere del diseño |

### 3.2 Página demo usa dividers con colores hardcoded

```html
<dcx-ng-divider color="#9A9A9A" [thickness]="0.05" size="l">
```

El `color` debería usar el token `var(--border-default)` en lugar de `#9A9A9A`, o simplemente omitir el atributo y dejar el color por defecto del componente.

---

## 4. API / Interface

Sin cambios. La API del componente permanece igual.

### Inputs (`input()` signals)

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `dialogId` | `string \| undefined` | `undefined` | Identificador para gestionar visibilidad desde `DialogService` |
| `title` | `string` | `''` | Texto del header. Si está vacío, no se renderiza el elemento de título |
| `visible` | `boolean` | `false` | Control directo de visibilidad (sin `DialogService`) |
| `showClose` | `boolean` | `true` | Muestra u oculta el botón ✕ del header |
| `position` | `DcxDialogPosition` | `'center'` | Posición en pantalla: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `closeOnBackdrop` | `boolean` | `true` | Cierra el diálogo al hacer clic en el backdrop |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `closeDialog` | `void` | Emitido al cerrar el diálogo |

### Content Children (ng-template)

| Template ref | Descripción |
|--------------|-------------|
| `#dialogBody` | Contenido del cuerpo del diálogo |
| `#dialogFooter` | Contenido del footer (botones de acción) |

---

## 5. Visual States & Variants

Según el diseño en `designs/dcx-ng-page-dialog.html`:

### Variante 1 — Confirmación destructiva

- **Header:** título "Eliminar proyecto" + botón ✕
- **Body:** icono circulo rojo (`background: var(--color-error-bg, #fef2f2)`) con SVG de papelera en rojo + texto explicativo con nombre del proyecto en negrita
- **Footer:** botón "Cancelar" (secondary) + botón "Eliminar" (danger/error)

```html
<!-- Icono danger -->
<div class="dialog-icon icon-danger">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8 4h4M3 6h14M5 6l1 10h8l1-10"
      stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
<p>¿Estás seguro de que deseas eliminar el proyecto
  <strong>Cloud Migration</strong>?
  Esta acción es irreversible y no se puede deshacer.</p>
```

### Variante 2 — Formulario

- **Header:** título "Nuevo proyecto" + botón ✕
- **Body:** 3 campos de formulario: Nombre del proyecto (input text), Cliente (input text), Práctica (select con opciones)
- **Footer:** botón "Cancelar" (secondary) + botón "Crear proyecto" (primary)

### Variante 3 — Informativo

- **Header:** título "Información importante" + botón ✕
- **Body:** icono círculo azul (`background: #dbeafe`) con SVG de info en azul + texto con fecha en negrita
- **Footer:** botón "Entendido" (primary)

```html
<!-- Icono info -->
<div class="dialog-icon icon-info">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7" stroke="#1d4ed8" stroke-width="1.5"/>
    <path d="M10 9v5M10 7v.5" stroke="#1d4ed8" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</div>
<p>El proceso de migración comenzará el
  <strong>lunes 22 de abril</strong>.
  Durante este periodo algunos servicios podrían no estar disponibles temporalmente.</p>
```

---

## 6. SCSS de la página demo

Los estilos de `dialog-icon`, `icon-danger`, `icon-info` deben añadirse al SCSS de la página demo (`dcx-ng-page-dialog.component.scss`):

```scss
.dialog-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--sp-3, 12px);
}

.icon-danger {
  background: var(--color-error-bg, #fef2f2);
}

.icon-info {
  background: #dbeafe;
}
```

---

## 7. Accesibilidad (WCAG AA)

El componente ya cumple los criterios WCAG AA implementados en la refinación anterior. Sin cambios en esta iteración.

### Estructura ARIA (ya implementada)

```html
<div
  [class]="dialogClasses()"
  role="dialog"
  aria-modal="true"
  [attr.aria-labelledby]="title() ? dialogTitleId() : null"
>
  <div class="dialog-header">
    <h3 [id]="dialogTitleId()" class="dialog-title">{{ title() }}</h3>
    <dcx-ng-button ariaLabel="Cerrar diálogo" ... />
  </div>
  ...
</div>
```

### Pendiente (fuera de scope)

| Tecla | Acción pendiente |
|-------|-----------------|
| `Escape` | Cierra el diálogo (requiere `HostListener`) |
| `Tab` | Focus trap dentro del diálogo (requiere CDK FocusTrap) |

---

## 8. Test Cases

Los tests del componente ya cubren los casos críticos. La página demo no tiene casos nuevos que requieran tests de unidad.

### Casos pendientes en el spec del componente

- [ ] should render `aria-labelledby` pointing to title id when title is set
- [ ] should NOT render `aria-labelledby` when title is empty
- [ ] should render `[id]` on `<h3>` matching the `aria-labelledby` value

---

## 9. Out of Scope

- Focus trap (foco atrapado dentro del diálogo) — requiere CDK
- Escape key listener — requiere `HostListener`
- Animaciones de entrada/salida mejoradas
- Tamaños configurables (`size` input)
- Variante sin backdrop (drawer-style)
- Soporte de múltiples diálogos apilados
- Inputs de formulario como componentes Angular en el dialog (en la demo se usan inputs HTML nativos para simplicidad)

---

## 10. Implementation Plan

1. **HTML de la página demo** — Reemplazar los 4 ejemplos actuales por los 3 escenarios del diseño: destructivo, formulario e informativo. Mantener el ejemplo de posiciones como 4.º ejemplo.
2. **TS de la página demo** — Añadir `openDestructive()`, `openForm()`, `openInfo()` (o unificar con el patrón de `open(id)` ya existente). Añadir mocks específicos por variante en lugar de `mockData` genérico.
3. **SCSS de la página demo** — Añadir estilos `.dialog-icon`, `.icon-danger`, `.icon-info`. Eliminar `color="#9A9A9A"` hardcoded de los dividers.
4. **Verificación visual** — Abrir la app y comparar lado a lado con `designs/dcx-ng-page-dialog.html`.
