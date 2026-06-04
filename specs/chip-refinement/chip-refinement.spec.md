# Spec: Chip Refinement

**Status:** Done
**Date:** 2026-06-01
**Author:** Claude Code

---

## 1. Overview

`DcxNgChipComponent` es una etiqueta compacta con soporte de colores, variantes (choice/filter), icono, imagen y botón de eliminación. Está bien estructurado pero tiene gaps de accesibilidad, un input declarado (`removable`) que no hace nada, tests rotos que pasan por la razón equivocada, y un foco visual implementado con `:focus::after` que no usa `:focus-visible`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 2.4.7 Focus Visible | `:focus { outline: none }` + `:focus::after` pseudo-elemento — no usa `:focus-visible`, mostrando foco a usuarios de ratón | Reemplazar `:focus::after` por `:focus-visible::after`; quitar `outline: none` del `:focus` general |
| 2 | 4.1.2 Name, Role, Value | `<div tabindex="0">` sin `role` — los lectores de pantalla anuncian un div genérico que acepta foco pero no es interactivo | Quitar `tabindex="0"` del contenedor (no es interactivo); el remove button ya es accesible por sí solo |
| 3 | 1.1.1 Non-text Content | El icono decorativo del chip (`<dcx-ng-icon>`) no tiene `aria-hidden="true"` | Añadir `aria-hidden="true"` al icono |

### 2.2 Bugs de lógica

| # | Descripción |
|---|-------------|
| 4 | Input `removable` declarado en TS y en la interfaz `DcxNgChipComponentInputs` pero **nunca usado** — la visibilidad del botón de eliminar la controla `variant === 'filter'` exclusivamente |
| 5 | Test "should not emit removeChip when removable is false" pasa por la razón equivocada: no establece `variant='filter'`, por lo que `handleRemove()` nunca emitiría independientemente de `removable` |
| 6 | SCSS duplicado: `&--secondary:focus::after` (líneas 153-160) es idéntico a `&:focus::after` (144-151); el selector general ya cubre secondary |

### 2.3 Coherencia / Storybook

| # | Descripción |
|---|-------------|
| 7 | Categorías en inglés: `'Attributes'` → `'Atributos'`; `'Events'` → `'Eventos'` |
| 8 | Input `removable` ausente de `argTypes` — no documentado en Storybook |
| 9 | Page demo no usa `.demo-page` / `.demo-section` |

---

## 3. Decisión: `removable` input

En lugar de eliminar `removable` (breaking change), se implementa: el botón de eliminar se muestra cuando **`variant === 'filter'` OR `removable() === true`**. Esto mantiene compatibilidad y da sentido semántico al input.

---

## 4. API — cambios

### `removable` ahora funcional

```html
<!-- Antes: solo variant='filter' mostraba el botón -->
@if (variant() === ChipVariant.FILTER) { ... }

<!-- Después: variant='filter' O removable=true -->
@if (variant() === ChipVariant.FILTER || removable()) { ... }
```

---

## 5. SCSS

| Cambio | Detalle |
|--------|---------|
| Reemplazar `:focus::after` | → `:focus-visible::after` |
| Quitar `&:focus { outline: none }` | El outline-none se aplica solo implícitamente vía `:focus-visible` |
| Eliminar `&--secondary:focus::after` | Duplicado — ya cubierto por la regla general |

---

## 6. Test Cases

- [ ] should make `removable=true` show the remove button (without needing `variant='filter'`)
- [ ] should not show remove button when `removable=false` and `variant='choice'`
- [ ] chip icon should have `aria-hidden="true"`
- [ ] chip container should not have `tabindex` attribute
- [ ] should emit `removeChip` when `removable=true` and `handleRemove()` is called

---

## 7. Out of Scope

- Size variants (s/m/l) — no están en el design actual
- Color token alignment con design pastel vs saturado — depende de los tokens del tema
- Content projection — cambio de API mayor

---

## 8. Implementation Plan

1. **HTML** — quitar `tabindex="0"`, añadir `aria-hidden="true"` al icono, actualizar condición del remove button
2. **TS** — `handleRemove` debe funcionar también cuando `removable() === true` (no solo `variant === 'filter'`)
3. **SCSS** — `:focus-visible`, eliminar duplicado, quitar `outline: none` en `:focus`
4. **Storybook** — `Atributos`/`Eventos`, añadir `removable` a argTypes
5. **Page demo** — migrar a `demo-page/demo-section`
6. **Tests** — corregir test roto + añadir WCAG cases
