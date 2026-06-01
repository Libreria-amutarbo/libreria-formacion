# Spec: Breadcrumb Refinement

**Status:** Done
**Date:** 2026-06-01
**Author:** Claude Code

---

## 1. Overview

`DcxNgBreadcrumbComponent` es un componente de navegación que muestra la ruta jerárquica de la página actual. Soporta separadores configurables (slash, chevron, arrow), ítems con icono, estado deshabilitado y menú desplegable para rutas ocultas cuando hay más de 3 ítems.

Esta refinería corrige tres gaps de WCAG AA (aria-disabled ausente, icon-only sin alternativa textual, `:focus` en lugar de `:focus-visible` en spans de acción), reemplaza `<span>` con click handler por `<button>` nativo, actualiza la page demo al patrón `demo-page/demo-section` y elimina tests duplicados.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | Items deshabilitados usan `[class.disabled]` CSS pero no exponen `aria-disabled="true"` al árbol de accesibilidad | Añadir `[attr.aria-disabled]="item.disabled \|\| null"` en `<a>` y `<span>` de acción |
| 2 | 1.1.1 Non-text Content | Ítems cuyo campo `icon` está definido renderizan solo el icono sin texto alternativo; el `aria-label` del ítem es vacío | Pasar `item.label` como `aria-label` al contenedor cuando `item.icon` está definido |
| 3 | 1.3.1 Info and Relationships | Items sin `href` que son clicables se renderizan como `<span tabindex="0">` en lugar de `<button>` nativo | Sustituir el `<span class="dcx-bc__text--action">` por `<button class="dcx-bc__action-btn">` |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 4 | 2.4.7 Focus Visible | Los spans de acción usan `:focus` en lugar de `:focus-visible` — puede mostrar el anillo de foco a usuarios de ratón |
| 5 | 1.4.3 Contrast | El fallback hardcoded de `--text-disabled` en el SCSS es `#696e75` pero el design token del proyecto es `#9ca3af` — alinear con el design |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 6 | `DcxBreadCrumbCurrentPage` en defaults es idéntico a `DcxBreadCrumbItemDefault` — mock duplicado sin diferenciación |
| 7 | `dcx-ng-page-breadcrumb.spec.ts` contiene tests duplicados: "should accept different iconSeparator values" y "should accept items input signal" aparecen dos veces cada uno |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 8 | La page demo usa clases propias (`.breadcrumb-page`, `.breadcrumb-card`, `.breadcrumb-example`) en lugar del patrón global `demo-page/demo-section` de `src/styles/page-demo.scss` |
| 9 | La story `OverflowMenu` (5+ ítems con menú elíptico) no tiene sección correspondiente en la page demo |
| 10 | El SCSS de la page demo importa `./../../app.component.scss` — debe eliminarse y dejar solo el comentario global |
| 11 | La page demo TS tiene arrays de datos inline; conviene importar los mocks del módulo de defaults |

---

## 3. API / Interface

Sin cambios de API. Todos los cambios son internos.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `items` | `DcxBreadcrumbItem[]` | — | ✅ | Lista de ítems de la ruta de navegación |
| `iconSeparator` | `DcxBreadCrumbSeparatorIcons` | — | ✅ | Icono separador entre ítems (`'slash-lg'` \| `'chevron-right'` \| `'arrow-right-short'`) |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|-------------|-------------|
| `itemSelected` | `DcxBreadcrumbItem` | Se emite al hacer clic en un ítem no deshabilitado |

### Interface `DcxBreadcrumbItem` (sin cambios)

```typescript
export interface DcxBreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  disabled: boolean;
}
```

---

## 4. Visual States & Variants

- **Default** — Ítems con `href`, último ítem como página actual (`aria-current="page"`)
- **Icon** — Ítems con icono en lugar de texto; el `aria-label` del contenedor aporta el nombre accesible
- **Disabled** — Ítem con `disabled: true`; `aria-disabled="true"`, `tabindex="-1"`, cursor `not-allowed`
- **Overflow (>3 ítems)** — Muestra botón `...` con menú de contexto para ítems ocultos
- **Action (sin href)** — Ítem clicable sin navegación URL; renderizado como `<button>` nativo

Referencia de diseño: `designs/dcx-ng-page-breadcrumb-divider-icon-message.html`

---

## 5. SCSS / Tokens

| Token | Uso | Fallback actual | Fallback corregido |
|-------|-----|-----------------|---------------------|
| `--text-disabled` | Color de ítem deshabilitado | `#696e75` | `#9ca3af` |
| `--bg-primary` | Color de enlace | `#0058ab` | (sin cambio) |
| `--border-focus` | Outline foco | `#1db8f2` | (sin cambio) |

**Cambios SCSS:**
- Reemplazar `:focus` por `:focus-visible` en `.dcx-bc__text--action` (o el nuevo `button`)
- Añadir reset de estilos de `<button>` para `.dcx-bc__action-btn`
- Corregir fallback de `--text-disabled`
- Consolidar selector duplicado en `.dcx-bc__text.disabled`

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA

```html
<nav aria-label="Breadcrumb">
  <ol class="dcx-bc" role="list">
    <!-- ítem overflow (si hay >3 ítems) -->
    <li class="dcx-bc__item dcx-bc__item--ellipsis">
      <button aria-expanded="false" aria-haspopup="true" aria-label="Mostrar rutas anteriores">...</button>
      <!-- context menu -->
    </li>

    <!-- ítem navegable con href -->
    <li class="dcx-bc__item">
      <a href="/ruta" aria-disabled="false">Etiqueta</a>
      <span aria-hidden="true"><dcx-ng-icon .../></span>
    </li>

    <!-- ítem navegable sin href (acción) — NUEVO: button nativo -->
    <li class="dcx-bc__item">
      <button class="dcx-bc__action-btn" [disabled]="item.disabled || null">Etiqueta</button>
      <span aria-hidden="true"><dcx-ng-icon .../></span>
    </li>

    <!-- ítem actual (último) -->
    <li class="dcx-bc__item">
      <span class="dcx-bc__current" aria-current="page">Página actual</span>
    </li>
  </ol>
</nav>
```

### Teclado

| Tecla | Elemento | Comportamiento |
|-------|----------|----------------|
| `Tab` | Todos los ítems activos | Foco secuencial |
| `Enter` / `Space` | `<button>` de acción | Emite `itemSelected` |
| `Enter` | `<a>` | Navegación estándar |
| `Enter` / `Space` | Botón `...` | Abre/cierra menú overflow |
| `Escape` | Menú overflow abierto | Cierra menú |

### Screen reader

- `<nav aria-label="Breadcrumb">` identifica la región
- `aria-current="page"` en el ítem actual
- `aria-disabled="true"` en ítems deshabilitados (no solo CSS)
- `aria-label` en el contenedor cuando el ítem solo tiene icono

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render a `<nav aria-label="Breadcrumb">` element
- [ ] should mark the last visible item with `aria-current="page"`
- [ ] should set `aria-disabled="true"` on disabled items
- [ ] should set `tabindex="-1"` on disabled items
- [ ] should not emit `itemSelected` when a disabled item is clicked
- [ ] should render `<a>` for items with href and `<button>` for items without href
- [ ] should render icon when item has icon field
- [ ] should show ellipsis button when items.length > 3
- [ ] should open overflow menu when ellipsis button is clicked
- [ ] `aria-expanded` on ellipsis button should reflect menu open state
- [ ] should emit `itemSelected` when a non-disabled item is clicked
- [ ] should accept different `iconSeparator` values

---

## 7b. Decisión: `<button>` vs `<span tabindex>` para ítems sin href

**Decisión:** Usar `<button class="dcx-bc__action-btn">` con `[disabled]="item.disabled || null"`.

**Razón:** Un `<span>` con `tabindex="0"` y handlers de teclado no es un control nativo — los lectores de pantalla no lo anuncian como "button" ni gestionan el estado `disabled` de forma nativa. WCAG 4.1.2 exige que los controles interactivos usen roles y propiedades nativas donde sea posible.

**Impacto:** No rompe la API pública. Los estilos del botón se resetean con CSS para que parezca texto enlace.

---

## 8. Out of Scope

- Cambios al componente `dcx-ng-context-menu` (usado internamente)
- Cambios al componente `dcx-ng-button` (usado para el botón `...`)
- Soporte de `routerLink` directamente en el ítem (se mantiene la navegación via `href` o `itemSelected`)
- Animaciones de apertura del menú overflow

---

## 9. Open Questions

- [ ] ¿Debe `DcxBreadCrumbCurrentPage` mantenerse como alias de `DcxBreadCrumbItemDefault` para compatibilidad, o eliminarse directamente?

---

## 10. Implementation Plan

1. **Defaults** — Diferenciar `DcxBreadCrumbCurrentPage` con datos propios; no eliminar (puede haber usos)
2. **HTML** — Reemplazar `<span class="dcx-bc__text--action">` por `<button class="dcx-bc__action-btn">`; añadir `aria-disabled`; añadir `aria-label` a ítems con icono; añadir `[disabled]` nativo al button
3. **SCSS** — Reset de `<button>`, `:focus-visible`, corregir fallback `--text-disabled`, dedup selectors
4. **Tests** — Eliminar los 2 bloques duplicados; añadir los test cases de la sección 7
5. **Storybook** — Añadir `defaultValue` a `items` en argTypes
6. **Page demo HTML** — Migrar a `.demo-page` / `.demo-section`; añadir sección OverflowMenu
7. **Page demo SCSS** — Reemplazar contenido por comentario global
8. **Page demo TS** — Importar mocks desde `@dcx-ng-components/dcx-ng-lib`; añadir datos overflow
9. **Tests** — Ejecutar y verificar que pasan todos
