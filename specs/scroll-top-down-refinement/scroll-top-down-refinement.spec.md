# Spec: ScrollTopDown Refinement

**Status:** Done
**Date:** 2026-07-10
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-scroll-top-down` es un control flotante (FAB) que muestra uno o dos botones
circulares para desplazar la página (o un contenedor) al inicio y/o al final. Detecta la
posición de scroll y oculta el botón cuando ya se está en el extremo correspondiente.
Es `OnPush`, basado en señales, con `effect()` para los listeners (con limpieza correcta).

Motivación del refinamiento:
1. **Desalineación con el diseño** (`designs/dcx-ng-page-scroll-top-down.html`): el diseño
   define botones circulares de **28/36/44/52px** (S/M/L/**XL**), borde `1.5px #d1d5db`,
   sombra `0 2px 8px rgba(0,0,0,.1)`, hover `border #9ca3af` + `bg #f9fafb` **sin escala**,
   gap **6px** e iconos **chevron**. El componente usa tamaños en rem (40/48/56, sin XL),
   iconos `arrow-*`, hover `scale(1.1)` y gap 12px.
2. **WCAG**: no respeta `prefers-reduced-motion` (scroll siempre "smooth" y hover animado),
   y no define `:focus-visible` propio (depende del botón interno).
3. **Coherencia**: etiquetas por defecto en inglés (el estándar del proyecto es español);
   Storybook con categorías en inglés; página demo fuera del estándar `demo-page`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos
| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| C1 | 2.3.3 Animación por interacción | El scroll siempre es `smooth` si `smooth=true` y el hover aplica `scale(1.1)`, ignorando `prefers-reduced-motion`. | Si el usuario prefiere movimiento reducido: usar `behavior:'auto'` y desactivar las transiciones/escala (media query en SCSS). |
| C2 | 2.4.7 Foco visible | El componente no define `:focus-visible`; depende del botón interno. | Definir `:focus-visible` explícito en el botón circular (`outline: 2px solid var(--border-focus)`). |

### 2.2 WCAG AA — Recomendados
| # | Criterio | Descripción |
|---|----------|-------------|
| R1 | 4.1.2 Nombre | Botón icon-only ya tiene `aria-label`; se mantiene y se traduce a español. |
| R2 | 1.3.1 Decorativos | El icono ya es `aria-hidden` (dcx-ng-icon decorativo). Se mantiene explícito. |
| R3 | 1.4.11 Contraste | Icono `--text-dark` (#2a2e33) sobre `#fff` ≈ 15:1 ✓; borde del botón ≈ 1.5:1 (los bordes decorativos están exentos). Se documenta. |

### 2.3 Bugs de lógica
| # | Descripción |
|---|-------------|
| B1 | El mapa de tamaños SCSS solo define `--s/--m/--l`; `xl`/`auto` de `DcxSize` no tienen tamaño → un `size="xl"` no se renderiza como en el diseño. |

### 2.4 Mejoras de UX / coherencia (alineación con el diseño)
| # | Descripción |
|---|-------------|
| U1 | **Tamaños**: pasar a px del diseño — S 28, M 36, L 44, **XL 52** (con svg 12/14/16/18). |
| U2 | **Forma/estilo**: círculo `border-radius:50%`, `background:#fff`, `border:1.5px solid var(--border-light,#d1d5db)`, `box-shadow:0 2px 8px rgba(0,0,0,.1)`, color `--text-dark`. Hover: `border-color:#9ca3af; background:#f9fafb` **sin `scale`**. Gap **6px**. |
| U3 | **Iconos por defecto**: `chevron-up` / `chevron-down` (diseño) en vez de `arrow-up`/`arrow-down`. |
| U4 | **Etiquetas por defecto en español**: `topLabel='Ir arriba'`, `bottomLabel='Ir abajo'`, `groupLabel='Controles de desplazamiento'`. |
| U5 | SCSS: eliminar regla redundante `&--top-only,&--bottom-only { .__group{align-items:center} }` (ya en `.__group`); revisar el `::ng-deep` de dimensionado. |
| U6 | Storybook: `argTypes` con categorías en inglés → `Atributos`; falta `groupLabel`; faltan stories `BottomOnly`, tamaños y `smooth=false`. `options` de size sin `xl`. |
| U7 | Página demo: usa `.scroll-top-down-page`/`.page-hero`; migrar a `demo-page`/`demo-section` numerado; añadir XL; eliminar CSS muerto (`.demo-panel`, `.preview--xl`, `.demo-copy`). |

---

## 3. API / Interface

Cambios **additivos** salvo el ajuste de **valores por defecto** de etiquetas/iconos
(misma señal, nuevo default alineado a diseño/idioma). Sin cambios de tipos.

### Inputs (`input()` signals)
| Name | Type | Default (nuevo) | Descripción |
|------|------|-----------------|-------------|
| `container` | `HTMLElement \| null` | `null` | Contenedor a desplazar (o `window`). |
| `smooth` | `boolean` | `true` | Scroll suave (se anula si el usuario prefiere movimiento reducido). |
| `size` | `DcxSize` | `'m'` | Tamaño del botón (`s`\|`m`\|`l`\|`xl`). |
| `iconSize` | `DcxSize` | `'s'` | Tamaño del icono. |
| `showTop` | `boolean` | `true` | Muestra el botón "ir arriba". |
| `showBottom` | `boolean` | `true` | Muestra el botón "ir abajo". |
| `topLabel` | `string` | `'Ir arriba'` | **Default cambiado** (era inglés). |
| `bottomLabel` | `string` | `'Ir abajo'` | **Default cambiado**. |
| `topIcon` | `string` | `'chevron-up'` | **Default cambiado** (era `arrow-up`). |
| `bottomIcon` | `string` | `'chevron-down'` | **Default cambiado** (era `arrow-down`). |
| `groupLabel` | `string` | `'Controles de desplazamiento'` | **Default cambiado**. |

### Outputs
Ninguno (sin cambios).

### Public Methods
`scrollToTop()`, `scrollToBottom()`, `scrollBehavior()`, computeds `isTopVisible`/`isBottomVisible`
(sin cambios de firma; `scrollBehavior` pasa a considerar `prefers-reduced-motion`).

---

## 4. Visual States & Variants
- **Both** — dos botones circulares apilados (arriba/abajo).
- **Top only** / **Bottom only** — según `showTop`/`showBottom` o posición de scroll.
- **Sizes** — S 28 / M 36 / L 44 / XL 52 px.
- **Hidden** — cuando no hay scroll disponible o se está en ambos extremos (botones fuera del DOM).
- **Hover** — borde/fondo sutil (sin escala).
- **Reduced motion** — sin transición ni escala; scroll instantáneo.

Referencia de diseño: `designs/dcx-ng-page-scroll-top-down.html` (`.scroll-btn*`, líneas 170–202).

---

## 5. SCSS / Tokens
- Tamaños en px del diseño: `--s 28px`, `--m 36px`, `--l 44px`, `--xl 52px`.
- Círculo: `border-radius: 50%`; borde `1.5px solid var(--border-light, #d1d5db)`; fondo
  `var(--bg-default, #ffffff)`; sombra `0 2px 8px rgba(0, 0, 0, 0.1)`; color `var(--text-dark, #2a2e33)`.
- Hover: `border-color: #9ca3af; background: #f9fafb`.
- `gap: var(--sp-1, 6px)` (aprox. 6px; se usará 6px literal para fidelidad).
- `:focus-visible { outline: 2px solid var(--border-focus, #1db8f2); outline-offset: 2px; }`.
- `@media (prefers-reduced-motion: reduce)`: `transition: none`; sin `transform` en hover/active.
- Eliminar regla redundante `--top-only/--bottom-only`.

---

## 6. Accesibilidad (WCAG AA)

**Estructura:**
```
div.__group[role="group", aria-label]
  button.__button[type=button, aria-label="Ir arriba"]   ← si visible
    dcx-ng-icon (aria-hidden, currentColor)
  button.__button[type=button, aria-label="Ir abajo"]    ← si visible
    dcx-ng-icon (aria-hidden)
```

- Botón **nativo** `<button>` (icon-only) con `aria-label` en español.
- Icono decorativo `aria-hidden="true"`.
- `:focus-visible` visible.
- Botones **eliminados del DOM** cuando no procede (no `opacity:0`).
- `prefers-reduced-motion`: scroll instantáneo y sin animaciones.

---

## 7. Test Cases
- [ ] should create the component
- [ ] **WCAG:** cada botón visible es `<button>` con `aria-label` y el icono `aria-hidden`
- [ ] **WCAG:** `scrollBehavior()` devuelve `'auto'` cuando `prefers-reduced-motion` está activo (aunque `smooth=true`)
- [ ] **Diseño:** los botones aplican la clase de tamaño (`--s/--m/--l/--xl`)
- [ ] `isTopVisible`/`isBottomVisible` reaccionan a `showTop/showBottom` y a la posición
- [ ] `scrollToTop`/`scrollToBottom` llaman a `scrollTo` con el `behavior` correcto (window y contenedor)
- [ ] botones fuera del DOM cuando `--hidden`
- [ ] iconos por defecto = `chevron-up`/`chevron-down`; labels por defecto en español

---

## 7b. Decisión: componentes de librería vs HTML nativo

**Decisión:** sustituir `dcx-ng-button` por un `<button>` **nativo** para cada control.

Justificación:
- El diseño es un botón circular a medida (borde 1.5px, sombra y hover propios) que hoy se
  consigue **peleando** contra la variante `secondary` con `::ng-deep .dcx-ng-button.dcx-ng-button`
  (hack de especificidad). Un `<button>` nativo estilado directamente reproduce el diseño con
  exactitud y elimina el `::ng-deep`.
- Mantiene toda la accesibilidad (elemento nativo, `aria-label`, `:focus-visible`, foco/teclado).
- Es coherente con el patrón del accordion (gold standard), que usa `<button>` nativo.
- Se conserva `dcx-ng-icon` para el chevron (decorativo, `currentColor`).

---

## 8. Out of Scope
- No se añade barra/anillo de progreso (el diseño no lo tiene).
- No se añaden outputs (`scrollTop`/`scrollBottom`); no hay necesidad actual.
- No se cambia la lógica de detección de scroll ni el soporte window/contenedor.
- No se soporta `size="auto"` (el diseño define S/M/L/XL).

---

## 9. Open Questions
- [ ] Cambio de defaults de etiquetas/iconos a español/chevron: se asume correcto por
  coherencia con el diseño y el resto de la librería. ¿OK?

---

## 10. Implementation Plan
1. Scroll TS: cambiar defaults (labels español, iconos chevron); `scrollBehavior()` considera
   `prefers-reduced-motion`; añadir `xl` a la lógica de clases si procede.
2. Scroll HTML: `<button>` nativo con `type`, `aria-label`, `:focus-visible`; icono `aria-hidden`;
   mantener `@if` de visibilidad.
3. Scroll SCSS: tamaños px (S/M/L/XL), círculo diseño (borde/sombra/hover sin escala), gap 6px,
   `:focus-visible`, media `prefers-reduced-motion`; eliminar `::ng-deep` y regla redundante.
4. Scroll spec.ts: tests WCAG (button nativo, aria, reduced-motion) + diseño (clases de tamaño).
5. Storybook: categorías `Atributos`; `groupLabel`; `options` con `xl`; stories `BottomOnly`,
   `Sizes`, `NoSmooth`.
6. Página demo: migrar a `demo-page`/`demo-section` numerado; añadir XL; eliminar CSS muerto;
   `OnPush` en el componente de página.
7. Verificar: `nx test dcx-ng-lib` (scroll) + `nx build dcx-ng-components`.
