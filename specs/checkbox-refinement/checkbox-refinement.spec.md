# Spec: Checkbox Refinement

**Status:** Done
**Date:** 2026-06-01
**Author:** Claude Code

---

## 1. Overview

`DcxNgCheckboxComponent` renderiza uno o varios checkboxes usando `dcx-ng-button` internamente con el modo `isCheckbox`. Soporta tres estados (`true`/`false`/`null`), posición de label, error, required y disabled. El componente es funcional pero tiene **6 gaps de WCAG AA** — ningún atributo ARIA llega al botón interno — y varias inconsistencias de código y diseño.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | El `<button>` interno no tiene `role="checkbox"` | Añadir `[attr.role]="isCheckbox() ? 'checkbox' : null"` en `dcx-ng-button` template |
| 2 | 4.1.2 Name, Role, Value | Sin `aria-checked` — lectores de pantalla no anuncian el estado | Añadir input `ariaChecked` a `dcx-ng-button`; exponer como `[attr.aria-checked]` en inner button |
| 3 | 4.1.2 Name, Role, Value | `computedAriaLabel()` cae a `'Button'` genérico — sobreescribe el texto del `<label>` envolvente | Pasar `option.label` (o `'Checkbox'` de fallback) como `ariaLabel` a `dcx-ng-button` desde el checkbox |
| 4 | 4.1.2 Name, Role, Value | Sin `aria-disabled` cuando `option.disabled=true` | Añadir `[attr.aria-disabled]` a `dcx-ng-button` |
| 5 | 3.3.1 Error Identification | `aria-describedby` ausente — los mensajes de error no se anuncian al enfocar el control | Añadir `id` al div de error; enlazar con `[attr.aria-describedby]` en el button |
| 6 | 1.1.1 Non-text Content | El icono de error es decorativo pero no tiene `aria-hidden="true"` | Añadir `aria-hidden="true"` a `<dcx-ng-icon>` del error |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 7 | 2.4.7 Focus Visible | Sin estilos `:focus-visible` en el SCSS del checkbox (depende solo del button interno) |

### 2.3 Bugs de código

| # | Descripción |
|---|-------------|
| 8 | `iconName = signal('check')` y `buttonVariant = signal('primary')` declarados en TS pero nunca usados |
| 9 | Typos en defaults: `'Chceckbox'` (3×), `'dehabilitado'` |
| 10 | Page demo: sección "Ejemplo 3" duplicada en el HTML; numeración desordenada |
| 11 | SCSS: mezcla de unidades `8px`, `0.5rem`, `0.75rem` sin tokens; opacidad disabled `0.6` vs `0.45` del design |

### 2.4 Coherencia / Storybook

| # | Descripción |
|---|-------------|
| 12 | `category: 'Attributes'` → debe ser `'Atributos'` |
| 13 | Output `changeOptions` y input `errorIcon` no están en `argTypes` |
| 14 | Page demo no usa `.demo-page` / `.demo-section` |

---

## 3. Decisión: cómo exponer ARIA en dcx-ng-button

El botón interno de `dcx-ng-button` es el elemento focusable. Los atributos ARIA deben ir en él, no en el host. Se añade a `dcx-ng-button`:

```typescript
ariaChecked = input<boolean | 'mixed' | null>(null);
```

Y en el template del button:
```html
<button
  ...
  [attr.role]="isCheckbox() ? 'checkbox' : null"
  [attr.aria-checked]="isCheckbox() && ariaChecked() !== null ? ariaChecked() : null"
>
```

### Mapeo aria-checked ↔ value

| `DcxCheckboxValue` | Estado visual | `aria-checked` |
|--------------------|--------------|----------------|
| `null` | Vacío (no seleccionado) | `false` |
| `true` | Marcado (check icon, primary) | `true` |
| `false` | Indeterminado (dash icon, primary) | `'mixed'` |

---

## 4. API / Interface — cambios

### Nuevo input en `dcx-ng-button`

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `ariaChecked` | `boolean \| 'mixed' \| null` | `null` | Estado ARIA del checkbox; `null` = sin exponer |

### Sin cambios en `DcxNgCheckboxComponent` API pública

---

## 5. SCSS / Tokens

| Cambio | Detalle |
|--------|---------|
| `gap` en label | `8px` → `var(--sp-2, 8px)` |
| `gap` en group options | `0.75rem` → `var(--sp-3, 12px)` |
| `gap` en group | `0.5rem` → `var(--sp-2, 8px)` |
| Opacity disabled | `0.6` → `0.45` (alineación con design) |
| Error message | Añadir `display: flex; align-items: center; gap: var(--sp-1, 4px)` |
| `font-family` | Reemplazar `--font-family-primary` por `--ff-base` (token del proyecto) |

---

## 6. Test Cases nuevos

- [ ] should have `role="checkbox"` on inner button when `isCheckbox=true`
- [ ] should set `aria-checked="true"` when value is true
- [ ] should set `aria-checked="false"` when value is null (unchecked)
- [ ] should set `aria-checked="mixed"` when value is false (indeterminate)
- [ ] should set `aria-disabled="true"` when option is disabled
- [ ] should set `aria-describedby` pointing to error message when error is set
- [ ] error icon should have `aria-hidden="true"`

---

## 7. Out of Scope

- `ControlValueAccessor` — requiere análisis de breaking change con consumidores actuales
- `role="group"` para grupos de checkboxes (API de label de grupo no existe aún)

---

## 8. Implementation Plan

1. **`dcx-ng-button`** — añadir `ariaChecked` input; añadir `role="checkbox"` y `aria-checked` al inner button
2. **`dcx-ng-checkbox.html`** — `ariaLabel`, `ariaChecked`, `aria-disabled`, `aria-describedby`, error id, icon aria-hidden
3. **`dcx-ng-checkbox.ts`** — eliminar `iconName`/`buttonVariant` signals; añadir `getAriaChecked()`
4. **`dcx-ng-checkbox.scss`** — tokens gap, opacity, error layout
5. **Defaults** — corregir typos
6. **Storybook** — `Atributos`, `Eventos`, añadir `changeOptions` y `errorIcon`
7. **Page demo** — migrar a `demo-page/demo-section`, corregir numeración
8. **Tests** — 7 casos nuevos
