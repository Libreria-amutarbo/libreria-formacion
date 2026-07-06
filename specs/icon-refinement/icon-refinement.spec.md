# Spec: Icon Refinement

**Status:** Done
**Date:** 2026-06-29
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-icon` es un wrapper sobre la fuente de iconos **Bootstrap Icons**. Renderiza un
elemento `<i class="bi bi-{name}">` con clases utilitarias para tamaño, espaciado y color.

Este refinamiento corrige el principal incumplimiento de WCAG AA (el icono no expone
ninguna semántica de accesibilidad), un bug latente con el tamaño `'auto'`, y alinea
Storybook y la página demo con los estándares del proyecto (categorías en español,
estructura `demo-page` / `demo-section`, tipado correcto).

El componente se usa solo en la página demo (`src/app/pages/dcx-ng-page-icon/`) y en
Storybook. No hay uso en producción fuera de la librería. **Nota:** otros componentes
(button, accordion, message…) consumen iconos de Bootstrap directamente con `<i class="bi">`,
no a través de `dcx-ng-icon`, por lo que el refactor no afecta a esos componentes.

El design de referencia (`designs/dcx-ng-page-breadcrumb-divider-icon-message.html`) no
contiene una sección dedicada al componente Icon como tal: usa SVGs inline decorativos.
La guía de diseño aplicable es, por tanto, el patrón de tokens y la estructura de página
demo del resto de componentes ya refinados (accordion como _gold standard_).

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| #   | Criterio                    | Problema actual                                                                                                                                                                                                                 | Solución                                                                                                                                                              |
| --- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **1.1.1 Non-text Content**  | El `<i>` se renderiza sin ningún atributo de accesibilidad. Un glifo de icon-font sin texto es contenido no-textual: si es decorativo debe ocultarse a lectores de pantalla, y si es significativo debe tener nombre accesible. | Añadir input `ariaLabel`. Si está definido → `role="img"` + `[attr.aria-label]`. Si no → `aria-hidden="true"` (decorativo por defecto, comportamiento más seguro). |
| 2   | **4.1.2 Name, Role, Value** | Sin `role`, un icono significativo no se anuncia. Con `aria-hidden` por defecto, los iconos decorativos se anuncian como ruido vacío en algunos SR.                                                                            | Mismo cambio que #1: el rol y el ocultamiento se derivan de la presencia de `ariaLabel`.                                                                            |

### 2.2 WCAG AA — Recomendados

| #   | Criterio                  | Descripción                                                                                                                                                                                              |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 3   | **1.4.3 Contrast**        | El `color` lo aporta el consumidor; el componente no puede garantizar contraste. Se documenta en Storybook/spec que el color debe cumplir ≥3:1 (icono ≈ componente gráfico no textual) frente al fondo. |

### 2.3 Bugs de lógica

| #   | Descripción                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4   | El tipo del input `size` es `DcxSize`, que incluye `'auto'`, pero **no existe el token `--size-auto`** (`$size` en `_sizes.scss` solo define `xs/s/m/l/xl`). Con `size="auto"` la regla `.dcx-icon--size-auto { font-size: var(--size-auto); }` no existe siquiera, así que el icono hereda el tamaño del padre por casualidad. Hay que dar comportamiento explícito a `auto`. |
| 5   | `Storybook` declara `args.size: 'l'` y `args.color: '#0058ab'`, que **no coinciden** con los defaults reales del componente (`size: 'm'`, `color: ''`). La doc de autodocs muestra defaults engañosos.                                            |

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6   | SCSS: las reglas de tamaño usan `var(--size-s)` sin _fallback_. El _gold standard_ usa `var(--token, #fallback)`. Añadir fallbacks en `rem`.                                                                |
| 7   | Storybook: categorías en inglés (`'Attributes'`) → deben ser `'Atributos'`. `type Story = StoryObj<any>` → `StoryObj<DcxNgIconComponent>`. Falta el argType de `name` (input requerido) y de `ariaLabel`.   |
| 8   | Storybook: solo existe la story `AllIcons` (galería). Faltan stories para variantes (Default, tamaños, espaciado, color, con `aria-label`).                                                                  |
| 9   | Page demo: no usa la estructura `demo-page` / `demo-section`; usa nombres de color CSS (`blue`, `red`) en vez de tokens/hex; tiene ejemplos duplicados (`gear` x2). Reconstruir según el _gold standard_.    |
| 10  | Las reglas `.dcx-icon--size-*` se pueden generar con un `@each` sobre el mapa de tamaños en lugar de cuatro bloques repetidos.                                                                               |

---

## 3. API / Interface

Sin cambios de ruptura. Solo una adición de input.

### Inputs (`input()` signals)

| Name         | Type             | Default | Required | Descripción                                                                                                |
| ------------ | ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `name`       | `string`         | —       | ✅ sí    | Nombre del icono de Bootstrap Icons (sin el prefijo `bi-`).                                               |
| `size`       | `DcxSize`        | `'m'`   | no       | Tamaño del icono. `auto` hereda el `font-size` del contenedor.                                            |
| `spacing`    | `DcxIconSpacing` | `'none'`| no       | Margen horizontal externo (`none` / `compact` / `spacious`).                                              |
| `color`      | `string`         | `''`    | no       | Color del icono (hex o nombre CSS). Si se deja vacío, hereda el color del contexto (`currentColor`) — imprescindible para que los iconos embebidos en otros componentes (botón, stepper, message…) tomen su color. El azul corporativo se aplica solo en el showcase (página/Storybook), no en el `:host`. Debe cumplir contraste ≥3:1 frente al fondo. |
| `extraClass` | `string`         | `''`    | no       | Clases CSS adicionales.                                                                                   |
| `ariaLabel`  | `string`         | `''`    | no       | **NUEVO.** Nombre accesible. Si se indica → icono significativo (`role="img"`). Si no → decorativo (`aria-hidden="true"`). |

### Outputs

Ninguno.

### Public Methods

| Method      | Signature  | Descripción                                                              |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| `iconClass` | `computed` | (Ya existe) String de clases para el `<i>`. Se mantiene.                |
| `decorative`| `computed` | **NUEVO.** `true` cuando `ariaLabel` está vacío; controla el ARIA.      |

---

## 4. Visual States & Variants

- **Default** — icono tamaño `m`, sin color (hereda `currentColor`), decorativo.
- **Sizes** — `s`, `m`, `l`, `xl` (+ `auto` que hereda el tamaño del contenedor).
- **Spacing** — `none`, `compact` (`0 .25rem`), `spacious` (`0 .75rem`).
- **Color** — color aplicado vía input (`[style.color]` en el host).
- **Con aria-label (significativo)** — expone `role="img"` + `aria-label`.
- **Galería (AllIcons)** — rejilla con todos los iconos de Bootstrap y copia al portapapeles (story de utilidad existente, se conserva).

---

## 5. SCSS / Tokens

Tokens consumidos: `--size-s`, `--size-m`, `--size-l`, `--size-xl` (definidos globalmente
en `scss/utils/_variables.scss` a partir del mapa `$size` de `_sizes.scss`).

Cambios:

- Generar las clases de tamaño con `@each` y añadir _fallback_:
  `font-size: var(--size-#{$name}, #{$value});`
- Añadir regla explícita `.dcx-icon--size-auto { font-size: inherit; }` (token `--size-auto`
  no existe; `auto` = heredar tamaño del contenedor).
- Conservar las reglas de spacing y la base `.dcx-icon`.

---

## 6. Accesibilidad (WCAG AA)

Estructura ARIA en función de `ariaLabel`:

| Estado                     | HTML resultante                                              |
| -------------------------- | ----------------------------------------------------------- |
| Decorativo (`ariaLabel=''`)| `<i class="…" aria-hidden="true"></i>`                      |
| Significativo (`ariaLabel`)| `<i class="…" role="img" aria-label="…"></i>`              |

- Sin interacción de teclado: el icono no es focusable (elemento `<i>` decorativo o `img`).
- El color es responsabilidad del consumidor; se documenta el requisito de contraste ≥3:1.
- No se usa `tabindex`.

---

## 7. Test Cases

- [x] should create the component (ya existe)
- [x] clases base `bi`, `bi-{name}`, `dcx-icon`, tamaño y spacing (ya existen)
- [x] aplica `aria-hidden="true"` y **no** `role`/`aria-label` cuando `ariaLabel` está vacío
- [x] aplica `role="img"` + `aria-label` y **no** `aria-hidden` cuando `ariaLabel` está definido
- [x] `decorative()` devuelve `true`/`false` según `ariaLabel`
- [x] `size="auto"` produce la clase `dcx-icon--size-auto`
- [x] color se aplica como estilo en el host

---

## 7b. Decisión: componentes de librería vs HTML nativo

Se mantiene el elemento nativo `<i>` con la fuente Bootstrap Icons. Es el patrón estándar
para icon-fonts y el que ya usa el resto de la librería. No se introduce ningún componente
DcxNg* adicional. El ARIA (`aria-hidden` / `role="img"` + `aria-label`) se aplica sobre el
propio `<i>`.

---

## 8. Out of Scope

- No se sustituye Bootstrap Icons por SVGs inline ni por otra librería de iconos.
- No se añade soporte de tamaños arbitrarios en px (se mantiene la escala de tokens).
- No se refactorizan los demás componentes que usan `<i class="bi">` directamente.
- No se añade `--size-auto` al mapa global de tokens (se resuelve localmente con `inherit`).

---

## 9. Open Questions

- [ ] Ninguna. (El comportamiento `auto = inherit` se asume razonable; confirmar en review.)

---

## 10. Implementation Plan

1. **Component TS** — añadir input `ariaLabel` y `computed decorative`.
2. **Component HTML** — bindings condicionales `[attr.aria-hidden]`, `[attr.role]`, `[attr.aria-label]`.
3. **Component SCSS** — `@each` para tamaños con fallback + `.dcx-icon--size-auto { font-size: inherit; }`.
4. **Spec.ts** — tests de ARIA (decorativo/significativo), `decorative()`, `size=auto`.
5. **Storybook** — categorías `'Atributos'`, `StoryObj<DcxNgIconComponent>`, argTypes `name` y `ariaLabel`, args alineados con defaults reales, nuevas stories (Default, Sizes, Spacing, Color, Accessible) + conservar `AllIcons`.
6. **Page demo** — reconstruir con `demo-page` / `demo-section`, una sección por story, sin duplicados, colores con hex/tokens.
7. **Verificación** — `nx test` del spec del icono y revisión de diagnósticos TS.
