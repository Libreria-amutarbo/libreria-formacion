# Spec: List Refinement

**Status:** Done
**Date:** 2026-07-01
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-list` es una lista genérica y recursiva: renderiza `<ul>`/`<li>`, soporta iconos,
descripción, sublistas anidadas, selección (single/multi), arrastre (CDK), plantilla
personalizada y roles ARIA configurables. Es un **primitivo compartido**: lo consumen
`dcx-ng-picklist` (`listRole="listbox"`, `itemRole="option"`, `externalSelection`) y
`dcx-ng-contextMenu` (`listRole="presentation"`, `itemRole="menuitem"`).

El componente ya está en buen estado (OnPush, signals, genérico tipado, `<ul>`/`<li>`
semánticos, iconos `aria-hidden`, `focus-visible`, navegación con flechas/Enter/Espacio).
Este refinamiento corrige un **bug real en la página demo**, cierra huecos de
accesibilidad de forma **no intrusiva para los consumidores**, limpia SCSS duplicado y
amplía stories/página.

Diseño de referencia: `designs/dcx-ng-page-full-table-paginator-list.html` (sección List).

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

Ninguno de bloqueo. El marcado es semántico y el foco es visible.

### 2.2 WCAG AA — Recomendados

| #   | Criterio                    | Descripción                                                                                                                                                                                                                     |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **4.1.2 Name, Role, Value** | Los items seleccionables no exponen `aria-selected`; el estado de selección solo vive en CSS (`.selected`). Falta comunicarlo a lectores de pantalla.                                                                          |
| 2   | **1.3.1 / i18n**            | El `aria-label` del `<ul>` está hardcodeado (`'Lista de elementos'`) y no es configurable por el consumidor.                                                                                                                    |
| 3   | **4.1.2 (coherencia rol)**  | Una lista `selectable` con `role="list"`/`listitem` no admite `aria-selected` de forma válida; el patrón correcto es `listbox`/`option`. La página demo usa el rol por defecto en sus ejemplos seleccionables.                 |

### 2.3 Bugs de lógica

| #   | Descripción                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4   | **Página demo rota**: los ejemplos 5 y 6 escuchan `(selectionChanged)`, evento que **no existe** en el componente (emite `itemSelected` / `itemDeselected`). Los handlers `onSelectionChanged`/`onMultiSelectionChanged` nunca se ejecutan → la selección no se muestra. Además esperan un **array** cuando el componente emite `{ item, index }` individual. |

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | **SCSS duplicado/conflictivo**: al final del fichero hay reglas heredadas repetidas (`.dcx-list-text`, `.dcx-list-children-indicator`, `.dcx-list-divider`) que sobreescriben (por orden de fuente) a las canónicas con distintos tokens/tamaños. |
| 6   | La página demo **no** usa la estructura `demo-page` / `demo-section` (usa `<section>` + `<h2>` + `<dcx-ng-divider>`), y su TS usa `any` en los handlers.                                                        |
| 7   | Faltan stories de variantes: **dividers**, **items deshabilitados**, **variante danger**, y **selección controlada externamente**.                                                                              |

---

## 3. API / Interface

Cambios **aditivos** (sin ruptura). No se tocan outputs ni el patrón de interacción.

### Inputs (`input()` signals)

Se conservan todos los actuales. **Nuevo**:

| Name        | Type     | Default                 | Descripción                                                        |
| ----------- | -------- | ----------------------- | ----------------------------------------------------------------- |
| `ariaLabel` | `string` | `'Lista de elementos'`  | Nombre accesible del contenedor `<ul>` (antes hardcodeado).       |

### Outputs

Sin cambios (`itemSelected`, `itemDeselected`, `cdkDropListDropped`).

### Public Methods

Sin cambios (`onItemClick`, `isSelected`, `onDropped`, `getChildren`, `onKeydown`).

---

## 4. Visual States & Variants

- **Default / con iconos / con descripción** — sin cambios.
- **Sublistas anidadas** — sin cambios.
- **Selectable (single/multi)** — añade `aria-selected` en los items.
- **Disabled item** — `aria-disabled` + estilo atenuado (ya existente).
- **Danger** — variante de color de error (ya soportada por CSS, ahora con story/ejemplo).
- **Divider** — separador `role="separator"` (ya existente).

---

## 5. SCSS / Tokens

- Eliminar las reglas duplicadas/heredadas al final del fichero que **entran en conflicto** con las canónicas: el `.dcx-list-text { flex: 1 }`, `.dcx-list-children-indicator` (color/tamaño distintos) y `.dcx-list-divider` (color/margen distintos). Se conserva `.dcx-list-icon` y **ambos bloques `:host-context(.dcx-context-menu)`** (rigen el submenú; no se tocan para no romper el context-menu).
- No se renombran tokens (`--bg-primary` se mantiene; mismo #0058ab) para limitar el churn en un componente compartido.

---

## 6. Accesibilidad (WCAG AA)

| Elemento         | ARIA                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `<ul>`           | `role` configurable (`listRole`), `aria-label` = `ariaLabel()`                                                 |
| `<li>` item      | `role` configurable (`itemRole`), `tabindex=0` si seleccionable y no deshabilitado, `aria-disabled`, `aria-haspopup` si tiene hijos |
| Selección        | **NUEVO** `aria-selected` = `isSelected($index)` **solo** cuando `selectable() && !externalSelection()` (así context-menu con `menuitem` y picklist con `externalSelection` no se ven afectados) |

Teclado (sin cambios): ←/→ navegan entre nivel/padre-hijo; Enter/Espacio seleccionan.

La página demo pasará a usar `listRole="listbox"` / `itemRole="option"` en sus ejemplos
seleccionables, para que `aria-selected` sea válido.

---

## 7. Test Cases

- [x] should create the component
- [x] `ariaLabel` por defecto es `'Lista de elementos'` y se refleja en el `<ul>`; es configurable
- [x] item seleccionado expone `aria-selected="true"` cuando `selectable` (sin `externalSelection`)
- [x] con `externalSelection` **no** se añade `aria-selected` (lo gestiona el consumidor)
- [x] con lista no seleccionable **no** se añade `aria-selected`
- [x] los tests existentes (selección, multi, keyboard, children) siguen pasando — 70/70 (list + picklist + contextMenu)

---

## 7b. Decisión: componentes de librería vs HTML nativo

Se **mantiene** el patrón actual `<li>` con `tabindex`, `role` y manejadores de teclado en
lugar de convertir cada item en `<button>`. Motivos: (1) es el patrón ARIA APG para widgets
compuestos (listbox/menu) donde el contenedor gestiona el foco por roles; (2) el rol es
**configurable** y el componente se reutiliza como `listbox`, `menu` y `list`; (3) el
arrastre CDK y el anidamiento recursivo se apoyan en el `<li>`. Convertir a `<button>`
rompería estos consumidores. Se mejora la semántica añadiendo `aria-selected` en lugar de
cambiar el elemento.

---

## 8. Out of Scope

- No se convierte `<li>` en `<button>` (ver 7b).
- No se añade Home/End/typeahead ni multi-selección con Shift (mejora futura).
- No se cambian los outputs ni el patrón `externalSelection`.
- No se tocan los bloques `:host-context(.dcx-context-menu)` del SCSS (submenús).
- No se renombran tokens de color.
- No se añade autogeneración de `id` (el consumidor lo aporta cuando lo necesita).

---

## 9. Open Questions

- [ ] Ninguna.

---

## 10. Implementation Plan

1. **Component TS**: nuevo input `ariaLabel` (default `'Lista de elementos'`).
2. **Component HTML**: `aria-label` desde el input; `aria-selected` gated (`selectable() && !externalSelection()`); propagar `ariaLabel`/roles a la lista anidada.
3. **Component SCSS**: eliminar las reglas duplicadas/conflictivas finales (sin tocar context-menu).
4. **Spec.ts**: tests de `ariaLabel`, `aria-selected` (con/ sin `externalSelection`, no seleccionable).
5. **Storybook**: stories `Dividers`, `DisabledItems`, `Danger`, `ExternalControl`; argType de `ariaLabel`.
6. **Page demo**: reconstruir con `demo-page`/`demo-section`; **corregir el bug** `(selectionChanged)` → `(itemSelected)`/`(itemDeselected)`; tipar handlers (fuera `any`); `listRole="listbox"`/`itemRole="option"` en ejemplos seleccionables; añadir ejemplos Danger.
7. **Verificación**: `nx test` de list (+ picklist y contextMenu para no regresión) y builds lib/app/storybook.
