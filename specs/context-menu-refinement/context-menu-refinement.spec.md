# Spec: ContextMenu Refinement

**Status:** Done
**Date:** 2026-06-04
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-context-menu` es un menú contextual flotante que se posiciona en coordenadas
concretas (clic derecho o trigger programático). Delega el renderizado de items al
componente interno `dcx-ng-list`. La refinación cubre accesibilidad WCAG AA, SCSS
duplicado, historias de Storybook incompletas y la migración de la página demo al
estándar `page-demo.scss`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | Items con hijos no tienen `aria-expanded` | Añadir `[attr.aria-expanded]="!!item.children?.length ? isItemExpanded(item) : null"` en `dcx-ng-list` |
| 2 | 4.1.2 Name, Role, Value | Items desactivados no tienen `aria-disabled` | Añadir `[attr.aria-disabled]="item.disabled \|\| null"` en `<li>` de `dcx-ng-list` |
| 3 | 2.1.1 Keyboard | Submenús solo se abren con hover, no con teclado | Añadir soporte de `Enter`/`ArrowRight` para abrir submenú; `Escape`/`ArrowLeft` para cerrar |
| 4 | 1.3.1 Info and Relationships | Iconos decorativos no tienen `aria-hidden="true"` | Añadir `aria-hidden="true"` en `dcx-ng-icon` dentro de `dcx-ng-list` |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 2.4.3 Focus Order | `tabindex="0"` en el contenedor `.dcx-context-menu` — debería ser `-1` o eliminado |
| 2 | 4.1.2 Name, Role, Value | Falta `aria-label` descriptivo en el menú (`aria-label="Menú contextual"`) |
| 3 | 1.4.1 Use of Color | El estado danger solo usa color rojo; añadir un icono de advertencia o texto diferenciador |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | CSS duplicado: `.dcx-list-divider` definido dos veces (líneas 52-57 y 155-160 en el SCSS) con reglas idénticas |
| 2 | CSS duplicado: `background` + `backdrop-filter` del menú principal y del submenú son idénticos (líneas 11-13 y 141-143) |
| 3 | `positionMode` input existe en el componente pero no tiene argType en Storybook |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | Submenú solo accesible con hover → añadir `:focus-within` en SCSS |
| 2 | Page demo no usa clases `demo-page` / `demo-section` del estándar del proyecto |
| 3 | Storybook no cubre: items desactivados, variante danger, dividers, `positionMode="absolute"`, trigger por botón |
| 4 | Eliminar uso de `::ng-deep` en SCSS y reemplazar por variables CSS pasadas al `dcx-ng-list` |

---

## 3. API / Interface

Sin cambios breaking. Solo adiciones.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `items` | `DcxContextMenuItem[]` | — | ✅ | Array de elementos del menú |
| `position` | `{ x: number; y: number }` | `{ x: 0, y: 0 }` | — | Coordenadas de apertura |
| `positionMode` | `'fixed' \| 'absolute'` | `'fixed'` | — | Estrategia de posicionamiento |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `itemSelected` | `DcxContextMenuItem` | Cuando el usuario selecciona un item |
| `menuClosed` | `void` | Cuando el menú se cierra |

### Public Methods

| Method | Signature | Descripción |
|--------|-----------|-------------|
| `open` | `(): void` | Abre el menú y calcula la posición |
| `close` | `(): void` | Cierra el menú y emite `menuClosed` |

### Interface `DcxContextMenuItem` (sin cambios)

Extiende `DcxListItem` con `action?: () => void` y `children?: DcxContextMenuItem[]`.

---

## 4. Visual States & Variants

- **Default** — Menú flotante con items de texto e iconos opcionales
- **With children** — Item con flecha indicadora y submenú anidado
- **Disabled** — Item con opacidad reducida, no interactivo, `aria-disabled="true"`
- **Danger** — Item en rojo (ej. Eliminar), `variant: 'danger'`
- **Divider** — Separador horizontal entre grupos de items
- **Positioned absolute** — Posicionamiento relativo al contenedor padre en lugar del viewport

No existe fichero de diseño referenciado (`designs/*context-menu*` no encontrado).

---

## 5. SCSS / Tokens

### Tokens usados
- `--bg-default`, `--bg-primary`, `--bg-hover`, `--bg-pressed`
- `--text-dark`, `--text-white`
- `--border-light`, `--border-focus`
- `--color-danger`
- `--r-lg`, `--r-sm`, `--sp-2`, `--fs-sm`

### Fixes
- Extraer backdrop glass (`background` + `backdrop-filter`) a un mixin SCSS reutilizable
- Eliminar la segunda declaración duplicada de `.dcx-list-divider`
- Añadir `:focus-within` en `.has-children` para submenú accesible con teclado
- Reemplazar `::ng-deep` por variables CSS en el host de `dcx-ng-list`

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA

```html
<div role="menu" aria-label="Menú contextual" tabindex="-1">
  <dcx-ng-list role="presentation">
    <!-- item normal -->
    <li role="menuitem" tabindex="0">...</li>
    <!-- item desactivado -->
    <li role="menuitem" tabindex="-1" aria-disabled="true">...</li>
    <!-- item con hijos -->
    <li role="menuitem" tabindex="0" aria-expanded="false" aria-haspopup="menu">...</li>
    <!-- separador -->
    <li role="separator">...</li>
  </dcx-ng-list>
</div>
```

### Teclado

| Tecla | Acción |
|-------|--------|
| `Tab` / `Shift+Tab` | Navegar entre items |
| `Enter` / `Space` | Seleccionar item / abrir submenú |
| `ArrowRight` | Abrir submenú si el item tiene hijos |
| `ArrowLeft` / `Escape` | Cerrar submenú activo (o todo el menú si no hay submenú) |
| `Escape` (raíz) | Cerrar el menú completo |

### Screen reader notes

- `role="menu"` en el contenedor + `role="menuitem"` en cada item
- `aria-disabled` en items desactivados (no solo CSS)
- `aria-hidden="true"` en todos los iconos decorativos
- `aria-expanded` en items padre que controlan un submenú

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render `role="menu"` on the container
- [ ] should have `aria-label="Menú contextual"` on the menu
- [ ] should set `aria-disabled="true"` on disabled items
- [ ] should set `aria-expanded="false"` on items with children (closed)
- [ ] should set `aria-expanded="true"` on items with children (open)
- [ ] should set `aria-hidden="true"` on decorative icons
- [ ] should open on `open()` call
- [ ] should close on `close()` call and emit `menuClosed`
- [ ] should emit `itemSelected` when a leaf item is clicked
- [ ] should NOT emit `itemSelected` when a disabled item is clicked
- [ ] should NOT close when clicking an item with children
- [ ] should close when clicking outside the menu
- [ ] should recalculate position on window resize

---

## 7b. Decisión: componentes de librería vs HTML nativo

El componente **delega en `dcx-ng-list`** el renderizado de items. Los fixes de ARIA
(`aria-expanded`, `aria-disabled`, `aria-hidden` en iconos) se aplican en
`dcx-ng-list.component.html` porque es quien genera los `<li>`. Esto afecta a otros
consumidores de `dcx-ng-list`, pero los cambios son aditivos y no breaking.

El contenedor del menú contextual usa un `<div>` con `role="menu"` — correcto según
el patrón WAI-ARIA Menu. Se mantiene el `<div>` (no se cambia a `<ul>`) porque
`dcx-ng-list` ya maneja el `<ul>` internamente.

---

## 8. Out of Scope

- Cambios en la lógica de posicionamiento (ya funciona correctamente)
- Focus trap completo (requeriría una librería de trapFocus — se deja para iteración futura)
- Internacionalización de textos
- Animaciones adicionales
- Modificar el componente `dcx-ng-list` más allá de los atributos ARIA necesarios

---

## 9. Open Questions

- [ ] ¿El submenú debe abrirse con `ArrowRight` (patrón ARIA estándar) o con `Enter`? La implementación actual usa hover — definir si keyboard support es P0 o P1 para esta iteración.
- [ ] ¿La accesibilidad en `dcx-ng-list` (aria-expanded, aria-disabled) puede introducirse en esta iteración o requiere una tarea separada para no bloquear a otros equipos?

---

## 10. Implementation Plan

1. **SCSS** — Eliminar CSS duplicado (divider, backdrop); añadir mixin glass; añadir `:focus-within` en `.has-children`
2. **HTML** — Cambiar `tabindex="0"` a `tabindex="-1"` en el contenedor; añadir `aria-label="Menú contextual"`
3. **dcx-ng-list HTML** — Añadir `[attr.aria-disabled]`, `[attr.aria-expanded]`, `aria-hidden="true"` en iconos
4. **Tests** — Añadir bloque `describe('WCAG AA')` con los nuevos casos
5. **Storybook** — Añadir argType `positionMode`; añadir stories: `WithDisabledItems`, `WithDangerItems`, `WithDividers`, `AbsolutePositioning`, `ButtonTrigger`
6. **Page demo** — Refactorizar a clases `demo-page` / `demo-section`; añadir ejemplo de items desactivados y danger
