# Spec: Button Refinement

**Status:** Done
**Date:** 2026-06-01
**Author:** Claude Code

---

## 1. Overview

`DcxNgButtonComponent` es el componente de botón base de la librería. Está maduro y funcional con múltiples variantes, tamaños, estados y soporte de iconos. Esta refinería no altera la API pública — solo corrige inconsistencias internas: un gap WCAG (`aria-pressed`), reglas SCSS duplicadas con tokens incorrectos, la variante muerta `'test'`, las categorías en inglés del Storybook, la documentación MDX rota, y la page demo sin el patrón global.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | El input `pressed` añade clase CSS `--pressed` pero **no expone `aria-pressed`** al árbol de accesibilidad | Añadir `[attr.aria-pressed]="pressed() || null"` al `<button>` nativo |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 2 | 4.1.2 | Page demo usa `aria-label` como atributo HTML nativo en el host `<dcx-ng-button>`, no como input `ariaLabel` — el botón interno anuncia "Button" en lugar del texto esperado |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 3 | `--pressed` definido **dos veces** en `--primary`, `--secondary` y `--danger`: el segundo bloque sobreescribe el primero con tokens sin fallback (`var(--background-primary-pressed)`, `var(--background-pressed)`) |
| 4 | `--text` variant definida **dos veces**: el segundo bloque usa tokens distintos sin fallback y no tiene estados `--pressed`/`--hover`/`--focused` |
| 5 | `args.iconPosition: 'start'` en Storybook — valor inválido (las opciones son `'left'`, `'right'`, `'top'`, `'bottom'`) |
| 6 | Page demo tiene dos secciones numeradas como "Ejemplo 13" |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 7 | Todas las categorías de `argTypes` en Storybook están en inglés (`'Attributes'`) en lugar de `'Atributos'` — viola la convención del proyecto |
| 8 | Falta story `StatesText` — todas las demás variantes tienen su story de estados menos `text` |
| 9 | `isCheckbox` y `checkboxError` no aparecen en los `argTypes` del Storybook — invisible para los consumidores de la librería |
| 10 | `Documentation.mdx` importa `'./UnStyled.stories'` que no existe → Storybook lanza error al cargar la página de docs |
| 11 | `Documentation.mdx` describe una API desfasada (variantes `link`/`icon`, posiciones `start`/`end`) |
| 12 | Page demo no usa `.demo-page` / `.demo-section` — inconsistente con el resto de páginas del proyecto |

---

## 3. API / Interface

Sin cambios de API pública. Solo eliminar la variante muerta:

### Cambios en `DcxButtonVariant`
- **Eliminar** `'test'` — no está en ningún design, no tiene SCSS ni stories, y ningún componente la usa

---

## 4. Visual States & Variants

Variantes existentes (sin cambios):
- **primary** — fondo azul, texto blanco
- **secondary** — fondo blanco, borde gris
- **terciary** — fondo transparente, texto oscuro (alias: ghost)
- **danger** — fondo rojo, texto blanco
- **text** — sin borde, sin fondo, texto oscuro
- **icon-only** — sin label visible, solo icono con `aria-label`

---

## 5. SCSS / Tokens

| Problema | Líneas | Fix |
|----------|--------|-----|
| `--pressed` duplicado en `--primary` | 84-87 + 99-101 | Eliminar el segundo bloque (token sin fallback) |
| `--pressed` duplicado en `--secondary` | 124-127 + 139-141 | Eliminar el segundo bloque |
| `--pressed` duplicado en `--danger` | 219-222 + 234-236 | Eliminar el segundo bloque |
| `--text` duplicado (bloque completo) | 178-195 + 239-256 | Eliminar el segundo bloque; añadir `--pressed`, `--hover`, `--focused` al primero |

---

## 6. Accesibilidad (WCAG AA)

### `aria-pressed`

```html
<!-- Antes -->
<button [class]="buttonClasses()" ...>

<!-- Después -->
<button [class]="buttonClasses()" [attr.aria-pressed]="pressed() || null" ...>
```

- Cuando `pressed = false` → `aria-pressed` eliminado (null)
- Cuando `pressed = true` → `aria-pressed="true"`
- No añadir `aria-pressed` por defecto para no confundir a lectores de pantalla en botones normales

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render a native `<button>` element
- [ ] `aria-pressed` should be `"true"` when `pressed` input is true
- [ ] `aria-pressed` should not be present when `pressed` input is false
- [ ] should not emit `buttonClick` when disabled
- [ ] `aria-label` on inner button should equal `ariaLabel` input when label is empty
- [ ] `aria-label` fallback should be `"Button"` when both label and ariaLabel are empty (existing)

---

## 8. Out of Scope

- Añadir `aria-checked` para modo checkbox (requiere análisis de uso con componentes padre)
- Añadir soporte `routerLink` nativo
- Añadir estado `loading`
- Renombrar `'terciary'` → `'tertiary'` (breaking change)
- Mover estilos de navbar context al componente Navbar

---

## 9. Open Questions

_(ninguna)_

---

## 10. Implementation Plan

1. **Interface** — eliminar `'test'` de `DcxButtonVariant`
2. **HTML** — añadir `[attr.aria-pressed]`
3. **SCSS** — eliminar duplicados, añadir estados a `--text`
4. **Storybook** — `Atributos`, añadir `StatesText`, documentar `isCheckbox`/`checkboxError`, corregir `iconPosition` default
5. **Documentation.mdx** — reescribir con API actual
6. **Page demo** — migrar a `demo-page/demo-section`, corregir numeración, corregir `ariaLabel` en icon-only
7. **Tests** — añadir caso `aria-pressed`
