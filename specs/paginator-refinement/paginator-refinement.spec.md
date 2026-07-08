# Spec: Paginator Refinement

**Status:** Done
**Date:** 2026-07-08
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-paginator` es el componente de paginación de la librería. Renderiza controles
de navegación (anterior/siguiente, primera/última opcional), una lista de números de
página con elipsis, un selector opcional de "items por página" y textos informativos
(rango de items y página actual).

El componente funciona a nivel visual pero tiene **carencias de accesibilidad graves**
(no es un landmark de navegación, los botones de icono se anuncian como "Button", no hay
`aria-current` en la página activa, no hay foco visible garantizado), un **SCSS con
bloques duplicados y muertos** (incluido un `@import` colocado en mitad del fichero),
**código muerto** en el TS y **desalineación con el estándar del proyecto** en Storybook
(categorías en inglés) y en la página demo (no usa las clases `demo-page`/`demo-section`).

Este refinamiento lo lleva al nivel del componente gold-standard (`dcx-ng-accordion`).

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos
| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| C1 | 1.3.1 / 4.1.2 Landmark de navegación | La lista de páginas está en un `<div aria-label="Paginación">`. Un `div` sin `role` no expone el `aria-label`; no hay landmark. | Usar `<nav aria-label="Paginación de resultados">` como contenedor de los botones de página. |
| C2 | 4.1.2 Nombre accesible | Los botones de icono (anterior, siguiente, primera, última) no reciben `ariaLabel`; `dcx-ng-button` los anuncia como **"Button"**. | Pasar `[ariaLabel]` descriptivo a cada botón de icono ("Página anterior", "Página siguiente", "Primera página", "Última página"). |
| C3 | 4.1.2 Estado actual | La página activa se distingue solo por color/variant (`primary`); no hay `aria-current`. Un lector de pantalla no sabe cuál es la página actual. | Añadir `ariaCurrent` (input additivo) a `dcx-ng-button` y ponerlo a `"page"` en el botón activo. |
| C4 | 2.4.7 Foco visible | El SCSS sobrescribe los estilos del botón (border:0, fondo transparente) con `::ng-deep` pero **no define `:focus-visible`**. El anillo de foco puede perderse. | Añadir regla `:focus-visible` visible (outline con `--border-focus`) sobre los botones internos. |

### 2.2 WCAG AA — Recomendados
| # | Criterio | Descripción |
|---|----------|-------------|
| R1 | 1.3.1 / 3.3.2 Etiqueta del select | El `<select>` de items por página no tiene nombre accesible propio (el `aria-label` está en el `div` contenedor y el `<span>` no está asociado). Asociar con `id`/`<label for>` o `aria-label` en el propio `<select>`. |
| R2 | 4.1.2 Elipsis | Los `…` son botones clicables (saltan un rango). Darles `ariaLabel` ("Saltar páginas hacia atrás/adelante") en lugar de anunciarse como "Button"/"...". |
| R3 | 1.4.3 Contraste (exento) | El estado `disabled` usa `--text-disabled` (#a5aab2 ≈ 2.3:1). Los elementos deshabilitados están **exentos** de 1.4.3, pero se puede oscurecer levemente para mejor UX. Baja prioridad. |

### 2.3 Bugs de lógica
| # | Descripción |
|---|-------------|
| B1 | `visiblePagesForView` es un `computed` que solo reenvía `visiblePages()` — redundante. El template debe usar `visiblePages()` directamente. |
| B2 | `getNavigationButtonClasses()` es código muerto: el template usa `prevNavClasses()`/`nextNavClasses()`. |
| B3 | El selector `<select>` no se sincroniza con `selectedItemsPerPage` si el input `paginator.itemsPerPage` cambia a un valor fuera de `{5,10,20}` (opciones hardcodeadas). Se documenta pero se deja fuera de scope salvo alineación de opciones. |

### 2.4 Mejoras de UX / coherencia
| # | Descripción |
|---|-------------|
| U1 | SCSS: líneas 1–42 son un bloque duplicado/huérfano **antes** del `@import '../../../scss/main.scss'` (línea 43). El `@import` debe ir al inicio del fichero y los duplicados eliminarse. |
| U2 | SCSS: segundo `@media (max-width:900px)` (líneas 220–229) referencia `.dcx-paginator__meta` / `--right` que no existen en el HTML → bloque muerto, eliminar. |
| U3 | SCSS: `.dcx-paginator__size` y `.items-per-page-info` declaradas 2–3 veces. Consolidar. |
| U4 | Storybook: categorías `Attributes`/`Events` en inglés → deben ser `Atributos`/`Eventos` (estándar del proyecto). Añadir `name`, `defaultValue` y firma de tipo `(value: number) => void` a los eventos. |
| U5 | Page demo: no usa `demo-page`/`demo-page-header`/`demo-section`; usa `<section>` + `h2.example-title` + `<hr>`. Migrar al formato estándar y cubrir todas las stories numeradas. |
| U6 | Page demo TS: contiene campos sin uso (`nextButtonDisabled`, `prevButtonDisabled`, `totalPages`, `disabled`, `itemsPerPage`, `currentPage`). Limpiar. |

---

## 3. API / Interface

Sin cambios de interfaz de datos (`DcxPaginator` se mantiene). Los cambios son
**additivos** y no rompen el uso actual.

### Inputs (`input()` signals) — `dcx-ng-paginator`
| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `paginator` | `DcxPaginator` | `{itemsPerPage:10,totalItems:100,currentPage:1}` | No | Configuración del paginador. (sin cambios) |
| `showPageInfo` | `boolean` | `false` | No | Muestra "Página X de Y". (sin cambios) |
| `showItemsPerPageInfo` | `boolean` | `false` | No | Muestra selector + rango de items. (sin cambios) |
| `limitedButtons` | `boolean` | `false` | No | Muestra botones primera/última página. (sin cambios) |

### Outputs (`output()` signals) — sin cambios
| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `pageChange` | `number` | Página seleccionada. |
| `totalPagesChange` | `number` | Total de páginas calculado. |

### Cambio additivo en `dcx-ng-button` (dependencia)
| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `ariaCurrent` | `'page' \| 'true' \| null` | `null` | Se refleja como `[attr.aria-current]`. No afecta a los usos existentes (default `null`). |

### Public Methods — sin cambios de firma
Se elimina el método muerto `getNavigationButtonClasses()`. El resto se mantiene.

---

## 4. Visual States & Variants
- **Default** — navegación básica (anterior/siguiente + números).
- **With selector** (`showItemsPerPageInfo`) — selector de items por página + rango "11 - 20 de 100".
- **Limited buttons** (`limitedButtons`) — añade primera/última página.
- **With page info** (`showPageInfo`) — muestra "Página X de Y".
- **First page** — botones anterior/primera deshabilitados (nativo).
- **Last page** — botones siguiente/última deshabilitados (nativo).
- **Ellipsis** — dataset grande, muestra `…` saltables.
- **Current page** — botón activo con `variant="primary"` + `aria-current="page"`.
- **Focus-visible** — anillo de foco sobre cualquier botón navegable.

Referencia de diseño: `designs/dcx-ng-page-full-table-paginator-list.html`.

---

## 5. SCSS / Tokens
- Mover `@import '../../../scss/main.scss'` a la primera línea.
- Eliminar bloque huérfano líneas 1–42 (duplicado) y el `@media` muerto de `.dcx-paginator__meta`.
- Consolidar `.dcx-paginator__size`, `.items-per-page-info`, `.page-info` a una sola declaración.
- Añadir `:focus-visible` sobre `::ng-deep .dcx-ng-button`:
  `outline: 2px solid var(--border-focus, #0058ab); outline-offset: 2px;`
- Tokens usados (con fallback): `--border-focus`, `--bg-primary`, `--bg-hover`, `--text-muted`, `--text-dark`, `--text-white`, `--text-disabled`, `--r-sm`, `--fs-sm`, `--fw-*`, `--sp-*`.

---

## 6. Accesibilidad (WCAG AA)

**Estructura ARIA:**
```
nav[aria-label="Paginación de resultados"]
  ├─ button (Primera página)   [ariaLabel, disabled nativo]   ← si limitedButtons
  ├─ button (Página anterior)  [ariaLabel, disabled nativo]
  ├─ button (número)           [aria-current="page" si activa]
  ├─ button (… elipsis)        [ariaLabel="Saltar páginas…"]
  ├─ button (Página siguiente) [ariaLabel, disabled nativo]
  └─ button (Última página)    [ariaLabel, disabled nativo]   ← si limitedButtons
select[aria-label="Items por página"]                          ← si showItemsPerPageInfo
div[aria-live="polite"] (rango / página actual)
```

**Interacción por teclado** (nativa vía `<button>`):
| Tecla | Acción |
|-------|--------|
| `Tab` / `Shift+Tab` | Mover foco entre botones (los deshabilitados se saltan). |
| `Enter` / `Space` | Activar el botón enfocado. |

**Lector de pantalla:** el landmark `nav` permite saltar a la paginación; cada botón
de icono tiene nombre; la página activa se anuncia como "actual"; los textos de rango
y página se anuncian vía `aria-live="polite"`.

---

## 7. Test Cases
- [ ] should create the component
- [ ] renderiza los números de página visibles según `visiblePages()`
- [ ] **WCAG:** el contenedor de páginas es un `<nav>` con `aria-label`
- [ ] **WCAG:** los botones de icono reciben `ariaLabel` (no "Button")
- [ ] **WCAG:** el botón de la página actual tiene `aria-current="page"`
- [ ] **WCAG:** los botones prev/next están `disabled` (nativo) en primera/última página
- [ ] **WCAG:** el `<select>` tiene nombre accesible (`aria-label`)
- [ ] `goToNext` / `goToPrevious` emiten `pageChange` y respetan límites
- [ ] `goToPage` emite la página seleccionada
- [ ] `onItemsPerPageChange` recalcula `totalPages` y reajusta la página
- [ ] la elipsis salta el rango correcto (`goToPageRelative`)
- [ ] `totalPagesChange` se emite al cambiar los datos
- [ ] **dcx-ng-button:** `ariaCurrent` se refleja como `aria-current` y es `null` por defecto

---

## 7b. Decisión: componentes de librería vs HTML nativo

**Decisión: mantener `dcx-ng-button`** para todos los botones del paginador, extendiéndolo
con un input additivo `ariaCurrent`.

Justificación:
- Todo el paginador ya está construido sobre `dcx-ng-button` con estilos `::ng-deep`.
  Reescribir a `<button>` nativos duplicaría la lógica de estilos/variantes del botón y
  sería un cambio de mucho mayor alcance y riesgo.
- La única carencia de accesibilidad que `dcx-ng-button` no cubre hoy es `aria-current`.
  Añadir un input `ariaCurrent` (default `null`) es additivo, no rompe ningún uso
  existente y beneficia a otros componentes (p. ej. breadcrumb).
- `ariaLabel` y `disabled` nativo **ya** están soportados por `dcx-ng-button`; solo hay
  que pasarlos desde el paginador.
- El **contenedor** sí pasa a HTML nativo semántico: `<nav>` en lugar de `<div>`, porque
  ningún componente de librería aporta el landmark de navegación.

---

## 8. Out of Scope
- No se cambia la interfaz `DcxPaginator`.
- No se convierten los `<select>`/opciones a `dcx-ng-select` ni se hacen dinámicas las
  opciones `{5,10,20}` (B3 solo se documenta).
- No se añade paginación por URL/routing.
- No se rediseña visualmente el componente (solo se corrige el SCSS existente).

---

## 9. Open Questions
- [ ] ¿Se acepta añadir el input `ariaCurrent` a `dcx-ng-button` (cambio additivo en el
  componente compartido)? Es la vía recomendada para cumplir C3 sin reescribir a nativo.

---

## 10. Implementation Plan
1. `dcx-ng-button`: añadir input `ariaCurrent` + `[attr.aria-current]` en el template; test additivo.
2. Paginator TS: eliminar `visiblePagesForView` y `getNavigationButtonClasses`; añadir helper de `ariaLabel`/`aria-current` si procede.
3. Paginator HTML: `<nav aria-label>`, `[ariaLabel]` en iconos y elipsis, `[ariaCurrent]` en la página activa, `aria-label` en el `<select>`, usar `visiblePages()`.
4. Paginator SCSS: reordenar `@import`, eliminar duplicados y bloque muerto, consolidar reglas, añadir `:focus-visible`.
5. Paginator spec.ts: añadir/actualizar tests (bloque WCAG incluido).
6. Storybook: categorías en español, `name`/`defaultValue`/firmas de eventos.
7. Page demo: migrar a `demo-page`/`demo-section` numeradas, limpiar el TS.
8. Verificar: `nx test dcx-ng-lib` para paginator y button.
