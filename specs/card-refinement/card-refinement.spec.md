# Spec: Card Refinement

**Status:** Done
**Date:** 2026-06-01
**Author:** Claude Code

---

## 1. Overview

`DcxNgCardComponent` es un componente de tarjeta flexible con soporte de layouts, tamaños, bordes, sombras, acento y proyección de contenido via TemplateRef. Está arquitecturalmente sólido (signals, OnPush, cobertura de tests). Esta refinería corrige un gap WCAG crítico (`focus-visible`), el `aria-label` ausente en cards no interactivas, el `imageAlt` default inválido, añade el tamaño `xl` que existe en el tipo pero no en el SCSS, corrige las categorías de Storybook al español, y migra la page demo al patrón global.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 2.4.7 Focus Visible | `.dcx-card` con `tabindex="0"` (interactive) no tiene estilos de `:focus-visible` — el anillo de foco queda invisible | Añadir `.dcx-card:focus-visible { outline: 2px solid var(--border-focus, #1db8f2); outline-offset: 3px; border-radius: var(--r-sm, 4px); }` |
| 2 | 1.3.6 Identify Purpose | Cards no interactivas tienen `role="region"` sin nombre accesible — WCAG exige `aria-label` o `aria-labelledby` para `region` | Añadir `[attr.aria-label]` derivado del `title()` cuando `role() === 'region'` y no hay `header` template |
| 3 | 1.1.1 Non-text Content | `IMAGE_ALT` default es `'-'` — los lectores de pantalla pronuncian el guión; para imágenes decorativas debe ser `''` | Cambiar a `IMAGE_ALT = ''` en defaults |

### 2.2 Bugs de lógica / inconsistencias

| # | Descripción |
|---|-------------|
| 4 | Tamaño `'xl'` definido en `DcxSize` y listado en `SIZE_LIST`, pero `.size-xl` **no existe en el SCSS** ni en `innerClassMap` → se renderiza sin estilos propios |
| 5 | `var(--background-default)` en `.card-inner` sin fallback hardcoded — si el token no está definido el fondo queda transparente |
| 6 | Storybook: todas las categorías usan `'Attributes'` en lugar de `'Atributos'` / `'Eventos'` |

### 2.3 Mejoras de coherencia

| # | Descripción |
|---|-------------|
| 7 | Page demo no usa `.demo-page` / `.demo-section` — usa clases ad-hoc |
| 8 | Faltan stories de comparativa: accent on/off, todas las `borderStyle`, todos los `shadow` (0–3), `size-xl` |

---

## 3. API / Interface

Sin cambios de API pública.

### Cambio en `innerClassMap`
- Añadir `'size-xl': this.size() === 'xl'` al computed

---

## 4. Visual States

- **`size-xl`** — padding `2.25rem`, font-size título `1.6rem`, radius `12px`
- **`focus-visible`** — anillo azul de 2px con offset de 3px, aplica solo a `.dcx-card` interactiva

---

## 5. SCSS / Tokens

| Cambio | Detalle |
|--------|---------|
| Añadir `:focus-visible` | `.dcx-card:focus-visible` — outline azul `var(--border-focus)` |
| Añadir `.size-xl` | Padding, gap, font-sizes, radius para XL |
| Corregir fallback `--background-default` | Añadir `, #ffffff` como valor de reserva |

---

## 6. Accesibilidad

### `aria-label` para cards no interactivas

```html
<!-- Antes: role="region" sin nombre -->
<div [attr.role]="role()" ...>

<!-- Después: aria-label derivado de title() cuando no hay header -->
<div [attr.role]="role()"
     [attr.aria-label]="role() === 'region' && !header() && title() ? title() : null"
     ...>
```

### focus-visible

```scss
.dcx-card:focus-visible {
  outline: 2px solid var(--border-focus, #1db8f2);
  outline-offset: 3px;
  border-radius: var(--r-sm, 4px);
}
```

---

## 7. Test Cases nuevos

- [ ] `should set aria-label from title when card is non-interactive and has no header template`
- [ ] `should not set aria-label when card is interactive`
- [ ] `should have empty string as default imageAlt`
- [ ] `should include size-xl class in innerClassMap when size is xl`

---

## 8. Out of Scope

- Añadir `size-auto`
- Cambiar el mecanismo de proyección de TemplateRef a `ng-content` (breaking change)
- Mover estilos de la page demo al componente

---

## 9. Open Questions

_(ninguna)_

---

## 10. Implementation Plan

1. **Defaults** — `IMAGE_ALT = ''`
2. **TS** — añadir `'size-xl': this.size() === 'xl'` a `innerClassMap`
3. **HTML** — añadir `[attr.aria-label]` para region
4. **SCSS** — `:focus-visible`, `.size-xl`, fallback `--background-default`
5. **Storybook** — `Atributos`/`Eventos`, stories accent/borderStyle/shadow/xl
6. **Page demo** — migrar a `demo-page/demo-section`
7. **Tests** — 4 casos nuevos
