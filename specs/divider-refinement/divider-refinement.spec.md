# Spec: Divider Refinement

**Status:** Done
**Date:** 2026-06-09
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-divider` es un separador visual que admite orientación horizontal/vertical, tipos (solid/dot/dash), tamaños, grosor y etiqueta de texto. Sus estilos se aplican íntegramente a través de CSS custom properties bindeadas desde el host, lo que lo hace limpio técnicamente.

Esta refinación añade `ChangeDetectionStrategy.OnPush`, corrige la accesibilidad de los divisores puramente decorativos (que actualmente anuncian "dcx-divider" a los lectores de pantalla), traduce las categorías de Storybook al español, añade 2 stories nuevas (`ThicknessVariants`, `ColorVariants`) y reestructura la página demo con las clases `demo-page / demo-section`.

**Referencia de diseño:** `designs/dcx-ng-page-breadcrumb-divider-icon-message.html`

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | Divisores puramente decorativos (sin `label` ni `ariaLabel`) anuncian `aria-label="dcx-divider"` — nombre técnico sin valor semántico | Añadir `[attr.aria-hidden]="!label() && !ariaLabel() || null"` al host; eliminar el fallback `'dcx-divider'` de `ariaLabelBinding` cuando no hay label |

### 2.2 WCAG AA — Recomendados

_Ninguno adicional — el componente no tiene elementos interactivos._

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | `ChangeDetectionStrategy` no definido — usa detección por defecto en lugar de `OnPush`, inconsistente con el resto de la librería |
| 2 | Test `aria-hidden` comentado en `spec.ts` (líneas 47–58) — nunca se ejecuta |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | Storybook: categorías de argTypes en inglés (`'Appearance'`, `'Accessibility'`, `'Content'`) — deben ser `'Atributos'` (inputs) y `'Accesibilidad'` (aria) |
| 2 | Storybook: descripciones en inglés — deben estar en español |
| 3 | Faltan stories para **grosor** (`ThicknessVariants`) y **color** (`ColorVariants`) — están en la demo pero no en el catálogo |
| 4 | Page demo no usa las clases `demo-page / demo-section` del sistema de diseño |

---

## 3. API / Interface

Sin cambios breaking. Solo correcciones internas.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `color` | `string` | `tokens.background.pressed` | — | Color de la línea en cualquier formato CSS válido |
| `size` | `DcxSize` | `'auto'` | — | Anchura (horizontal) o altura (vertical): `s` `m` `l` `xl` `auto` |
| `orientation` | `DividerOrientation` | `'horizontal'` | — | `'horizontal'` \| `'vertical'` |
| `thickness` | `number` | `0.25` | — | Grosor en `rem` |
| `ariaLabel` | `string` | `''` | — | Etiqueta accesible personalizada. Si está vacío y no hay `label`, el divisor se oculta a AT |
| `type` | `DividerType` | `'default'` | — | Estilo de línea: `'default'` (solid) \| `'dot'` (dotted) \| `'dash'` (dashed) |
| `label` | `string` | `''` | — | Texto visible en el centro del divisor |

### Outputs (`output()` signals)

_Ninguno._

### Public Methods

_Ninguno._

---

## 4. Visual States & Variants

| Variante | Descripción |
|----------|-------------|
| **Default horizontal** | Línea sólida gris, ancho 100% |
| **Vertical** | Línea sólida vertical — el contenedor padre debe tener altura definida |
| **Tipos** | `solid` (default) / `dotted` (dot) / `dashed` (dash) |
| **Tamaños** | `s` (5rem) / `m` (15rem) / `l` (30rem) / `xl` (35rem) / `auto` (100%) |
| **Grosor** | Valor numérico en `rem` — p.ej. 0.1, 0.2, 0.4, 0.8 |
| **Color** | Cualquier valor CSS — por defecto el token `--bg-pressed` |
| **Con label** | Texto centrado en la línea, orientaciones horizontal y vertical |
| **Decorativo** | Sin `label` ni `ariaLabel` → `aria-hidden="true"` (nuevo) |

---

## 5. SCSS / Tokens

Sin cambios al SCSS del componente. La arquitectura de CSS custom properties es correcta:

| Custom property | Binding TS | Descripción |
|-----------------|------------|-------------|
| `--dcx-divider-color` | `color()` | Color de la línea |
| `--dcx-divider-thickness` | `thickness()` en rem | Grosor |
| `--dcx-divider-size` | `DIVIDER_SIZE_MAP[size()]` | Ancho/alto |
| `--dcx-divider-style` | `DIVIDER_TYPE_MAP[type()]` | border-style |

---

## 6. Accesibilidad (WCAG AA)

### Lógica de accesibilidad (nueva)

| Escenario | Atributos renderizados |
|-----------|----------------------|
| `label="Texto"`, `ariaLabel=""` | `role="separator"` `aria-label="Texto"` |
| `label=""`, `ariaLabel="Mi separador"` | `role="separator"` `aria-label="Mi separador"` |
| `label=""`, `ariaLabel=""` | `role="separator"` `aria-hidden="true"` |

### `ariaLabelBinding` actualizado

```typescript
readonly ariaLabelBinding = computed(() =>
  this.ariaLabel() || this.label() || null  // null → no aria-label cuando decorativo
);
```

Y en el host o template:
```typescript
@HostBinding('attr.aria-hidden')
get ariaHiddenBinding(): true | null {
  return !this.label() && !this.ariaLabel() ? true : null;
}
```

### Screen reader notes

- `role="separator"` es un rol estático (no focalizable) — correcto para un divisor visual
- Cuando `aria-hidden="true"`, el divisor es completamente invisible para AT
- Cuando tiene label, el AT lee el label en lugar de "línea separadora"

---

## 7. Test Cases

- [x] should create the component
- [x] should render labeled divider with span
- [x] should render unlabeled divider without span
- [x] should have role="separator" on both variants
- [x] should set aria-label from label input
- [x] should set aria-orientation based on orientation input
- [x] should apply CSS variables for thickness, color, size, style
- [x] should set aria-hidden="true" when label and ariaLabel are empty
- [x] should NOT set aria-hidden when label is set
- [x] should NOT set aria-hidden when ariaLabel is set
- [x] (descomenta test existente) should set ariaLabelBinding from ariaLabel input

---

## 7b. Decisión: `@HostBinding` vs `[attr.aria-hidden]` en template

Se usa `@HostBinding('attr.aria-hidden')` porque:
1. El host element del componente es el elemento raíz — poner `aria-hidden` en el host es más correcto que en un div interno
2. Es consistente con el patrón ya usado en el componente (`@HostBinding('style.--dcx-divider-*')`)
3. Evita añadir un wrapper div innecesario

---

## 8. Out of Scope

- Validación de contraste de color (el usuario es responsable de cumplir WCAG en la elección de colores)
- Variantes adicionales de tipo (p.ej. wave, gradient)
- `ariaDescribedby` — innecesario para un separador estático
- MDX Documentation.mdx — corrección de los errores menores (label input faltante, tipo incorrecto) es mejora menor, no bloquea

---

## 9. Open Questions

_Ninguna._

---

## 10. Implementation Plan

1. **TS** — Añadir `ChangeDetectionStrategy.OnPush`; actualizar `ariaLabelBinding` para devolver `null` en lugar de `'dcx-divider'`; añadir `@HostBinding('attr.aria-hidden') ariaHiddenBinding`
2. **Tests** — Desactivar `skip` de los tests de aria-hidden comentados; añadir 3 nuevos casos WCAG
3. **Storybook** — Traducir categorías (`'Appearance'` → `'Atributos'`, `'Accessibility'` → `'Accesibilidad'`, `'Content'` → `'Atributos'`); traducir descripciones al español; añadir stories `ThicknessVariants` y `ColorVariants`
4. **Page demo HTML** — Reestructurar con `demo-page / demo-section` (7 secciones: Default, HorizontalSizes, VerticalSizes, AllTypes, ThicknessVariants, ColorVariants, LabeledDividers)
5. **Page demo SCSS** — Reemplazar estilos ad hoc por comentario estándar + solo los helpers de layout necesarios (`height` para verticales)
