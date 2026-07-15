# Spec: Tooltip Refinement

**Status:** Done
**Date:** 2026-07-14
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-tooltip` es un componente envolvente (`<ng-content>` + bocadillo posicionado con CSS/JS manual) que muestra texto o HTML al pasar el ratón sobre el contenido proyectado. Es, con diferencia, el componente con más incumplimientos del patrón WAI-ARIA APG Tooltip encontrados en esta serie de refinamientos: **solo se activa con el ratón** (no hay `focus`/`blur`, por lo que es completamente inalcanzable por teclado), no tiene `Escape` para cerrarlo, no genera ningún `id` ni cablea `aria-describedby`, y una de sus propias stories de Storybook (`WithLinkInside`) demuestra explícitamente el anti-patrón de meter un enlace interactivo dentro de `role="tooltip"`. Además, igual que se encontró en `dcx-ng-toggle`, varias variables CSS clave (`--background-secondary`, `--content-default-white`, `--shadow-4`) no tienen fallback y no están definidas como custom properties en ningún sitio del proyecto — el bocadillo probablemente se renderiza sin fondo ni color de texto. El posicionamiento es manual (no CDK Overlay), por lo que el tooltip queda recortado por cualquier ancestro con `overflow:hidden` — el mismo bug de clase ya encontrado y resuelto en `dcx-ng-select` mediante CDK Overlay.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Operable por teclado (2.1.1) | Solo `@HostListener('mouseenter'/'mouseleave')` (ts:65-73) — un usuario que navega con `Tab` nunca puede activar el tooltip. | Añadir `focusin`/`focusout` a nivel de host (delegación de eventos: el foco en cualquier descendiente hace bubble como `focusin`/`focusout` hasta el host, sin necesidad de tocar el contenido proyectado). |
| 2 | Cierre con `Escape` (WCAG 1.4.13) | No existe ningún manejador de teclado para cerrar el tooltip. | Añadir `@HostListener('keydown.escape')` → oculta el tooltip. |
| 3 | Nombre accesible del trigger / `aria-describedby` (4.1.2) | El bocadillo no tiene `id`, y ningún elemento recibe `aria-describedby` apuntando a él — no hay relación programática entre el disparador y el tooltip. | Generar `id` único por instancia; en `ngAfterViewInit()`, localizar el primer elemento hijo proyectado y asignarle `aria-describedby` vía `Renderer2` (todas las stories/demos actuales proyectan un único hijo — botón o icono). |
| 4 | Contenido no interactivo dentro de `role="tooltip"` (patrón APG) | `contentHtml` permite HTML arbitrario vía `[innerHTML]`, incluyendo `<a>` (SCSS ya estiliza enlaces con hover/active, scss:167-182); la story `WithLinkInside` lo demuestra activamente. Un enlace dentro de un tooltip que nunca se abre por teclado es inalcanzable. | Sanitizar `contentHtml` eliminando elementos interactivos (`a`, `button`, `input`, `select`, `textarea`) del HTML permitido; eliminar la story `WithLinkInside`. |
| 5 | Tokens de color inexistentes, sin fallback | `--background-secondary`, `--content-default-white`, `--shadow-4` (scss:18,19,30) no están definidos como custom properties en ningún sitio del repo y no tienen fallback — mismo bug que `dcx-ng-toggle`. El bocadillo probablemente se renderiza sin fondo ni color de texto. | Añadir fallback con los valores exactos del mock (`#1c1f23` fondo, texto blanco, sombra `0 4px 12px rgba(0,0,0,.15)`). |
| 6 | Recorte por ancestros con `overflow:hidden` | El tooltip se posiciona con `position:absolute` relativo a `.tooltip-container` (scss:7-8,28), sin CDK Overlay — igual que el bug ya corregido en `dcx-ng-select`, queda recortado dentro de diálogos, tarjetas o celdas con overflow. La lógica manual de colisión (`adjustPosition()`/`calculateOptimalPosition()`, ts:91-179) solo contempla los límites de la ventana, no los de un ancestro con scroll/overflow. | Migrar a CDK Overlay (`flexibleConnectedTo` + `withPositions`), igual que `dcx-ng-select`; elimina toda la lógica manual de `getBoundingClientRect()`/`AvailableSpace`. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | `aria-live="polite"` innecesario/conflictivo | Se aplica siempre (html:10), incluso con `aria-hidden="true"` cuando está oculto — combinar ambos en el mismo elemento es redundante; la relación `aria-describedby` ya es el mecanismo correcto para tooltips, no una región viva. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | **Aritmética con doble negativo**: `&--top.dcx-ng-tooltip--arrow-left { left: calc(50% - -64px); }` (scss:54) — equivale a `50% + 64px`, un valor completamente distinto y no simétrico con `&--bottom.dcx-ng-tooltip--arrow-left { left: calc(50% - 8px); }` (scss:96), que usa `8px`. El desplazamiter del arrow-alignment en `top` (64px) no coincide con el de `bottom` (8px) para el mismo efecto visual pretendido. |
| 2 | **Ancho fijo conflictivo en `--bottom`**: `width: 120px; min-height: 43px;` (scss:74-75) sobrescribe el `max-width: 250px; width: max-content;` de la clase base (scss:25-26) — solo para la posición `bottom`, textos largos se recortan/ajustan de forma distinta que en `top`/`left`/`right`. |
| 3 | Falta `ChangeDetectionStrategy.OnPush`. |
| 4 | Selector duplicado en la página de demo: `dcx-ng-dcx-ng-page-tooltip`. |
| 5 | `Documentation.mdx` afirma falsamente: "Mouse Enter: Shows tooltip after a brief delay" (no existe delay de aparición, solo de reajuste de posición), "Keyboard Navigation: Compatible..." y "Focus Management: Proper focus handling..." (ninguno existe hoy, antes de este refinamiento) — documentación de un comportamiento que no es real. |

### 2.4 Storybook / Documentación

| # | Descripción |
|---|-------------|
| 1 | Categorías de `argTypes` en inglés (`'Attributes'`); descripciones en inglés. |
| 2 | `arrowAlignment` y `contentHtml` son inputs reales sin ninguna entrada en `argTypes`. |
| 3 | `Documentation.mdx` está en inglés; no documenta `arrowAlignment` ni `contentHtml`; no referencia 3 de las 9 stories (`LongContentTooltip`, `WithIcon`, `WithLinkInside`). |

### 2.5 Mejoras de coherencia con el mock

| # | Descripción |
|---|-------------|
| 1 | El mock (`designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`, líneas 40-51, 362-397) muestra una **variante "primary"** (fondo `var(--bg-primary)` en vez del fondo oscuro por defecto) — no existe ningún input de variante/color en el componente actual. |

---

## 3. API / Interface

### Inputs — sin cambios de tipo
`position`, `arrowAlignment`, `hideTooltipOnClick`, `content`, `contentHtml` se mantienen. Se documenta explícitamente que `contentHtml` ya no debe incluir elementos interactivos (se eliminan si los hay).

### Nuevo input

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary'` | `'default'` | Nuevo, según el mock — `'primary'` usa `--bg-primary` como fondo del bocadillo. |

### Cambios internos (no público)
- Se elimina toda la lógica manual de posicionamiento (`adjustPosition`, `calculateOptimalPosition`, `AvailableSpace`, `TooltipPositionOption`) en favor de CDK Overlay.
- El contenido del tooltip pasa a un `<ng-template>` + `TemplatePortal`, igual que `dcx-ng-select`.
- Se añade `@HostListener('focusin')`/`@HostListener('focusout')`/`@HostListener('keydown.escape')`.
- Se genera un `id` único por instancia para el bocadillo; se asigna `aria-describedby` al primer hijo proyectado vía `Renderer2` en `ngAfterViewInit()`.

### Outputs — sin cambios (no existen; sigue sin haber ninguno)

---

## 4. Visual States & Variants

- **Posiciones**: `top`/`bottom`/`left`/`right`, con reposicionamiento automático vía CDK Overlay si no cabe (sustituye el cálculo manual).
- **Alineación de flecha**: `left`/`center`/`right`, con el bug de desplazamiento asimétrico corregido.
- **Variante `primary`** (nueva, según mock): fondo `--bg-primary`.
- **Variante `default`**: fondo oscuro `#1c1f23` (con fallback correcto).
- **Contenido enriquecido** (`contentHtml`): solo texto/formato (negrita, cursiva, párrafos) — sin elementos interactivos.

Referencia: `designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html`.

---

## 5. SCSS / Tokens

| Token roto (sin fallback) | Fix |
|---|---|
| `--background-secondary` | `var(--background-secondary, #1c1f23)` |
| `--content-default-white` | `var(--content-default-white, #fff)` |
| `--shadow-4` | `var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15))` |

Tokens que sí existen pero usan nombres inconsistentes con el resto de la librería (`--font-family-primary`, `--border-radius-sm`, `--spacing-inset-*`, `--font-size-body-small`, `--line-height-tight`) se realinean a la convención `--ff-base`/`--r-md`/`--sp-N`/`--fs-sm` usada en todos los componentes ya refinados esta sesión, con fallbacks tomados del mock (`padding: 5px 10px`, `font-size: 12px`, `border-radius: 6px`).

Se corrige el offset de `arrow-left`/`arrow-right` en `--top` para que coincida con el de `--bottom` (`8px`, no `64px`). Se elimina el `width: 120px` fijo de `--bottom`.

---

## 6. Accesibilidad (WCAG AA)

- `role="tooltip"` con `id` único — sin cambios de rol, se completa la asociación.
- `aria-describedby` en el primer hijo proyectado (trigger habitual: botón o icono).
- Se activa con `mouseenter` **y** `focusin`; se oculta con `mouseleave`, `focusout` **y** `Escape`.
- Sin contenido interactivo dentro del bocadillo (elementos interactivos eliminados de `contentHtml`).
- Portal a `document.body` vía CDK Overlay — no queda recortado por ancestros con overflow.

---

## 7. Test Cases

- [x] should create (verificar que sigue pasando tras la reescritura)
- [ ] el tooltip se muestra con `mouseenter` y se oculta con `mouseleave` (comportamiento existente preservado)
- [ ] el tooltip se muestra con `focusin` y se oculta con `focusout`
- [ ] `Escape` oculta el tooltip cuando está visible
- [ ] se genera un `id` único por instancia
- [ ] el primer hijo proyectado recibe `aria-describedby` apuntando al `id` del tooltip
- [ ] `contentHtml` con un `<a>` no renderiza el enlace (se sanitiza)
- [ ] `contentHtml` con `<strong>`/`<em>`/`<p>` se renderiza sin cambios (formato no interactivo permitido)
- [ ] el tooltip se renderiza en un overlay de CDK, no como hijo directo de `.tooltip-container`
- [ ] `hideTooltipOnClick` sigue funcionando tras la migración a Overlay
- [ ] variante `primary` aplica la clase/fondo correctos
- [ ] tests existentes de posicionamiento/reposicionamiento se adaptan a la nueva estrategia de CDK (sustituyendo aserciones sobre `actualPosition`/cálculo manual por aserciones sobre la posición resuelta por el overlay)

---

## 7b. Decisión: componentes de librería vs HTML nativo / arquitectura de overlay

Migración de posicionamiento manual (`getBoundingClientRect` + cálculo propio) a **CDK Overlay** (`flexibleConnectedTo` + `withPositions`), replicando exactamente el patrón ya establecido en `dcx-ng-select` para el mismo problema (recorte por ancestros con `overflow:hidden`). Se sustituye toda la lógica de `AvailableSpace`/`calculateOptimalPosition` por las posiciones nativas de CDK, que ya gestionan límites de scroll/viewport de forma más robusta que el cálculo manual actual (que solo contempla los límites de `window`).

**Decisión de contenido**: se restringe `contentHtml` a contenido no interactivo. Justificación: `role="tooltip"` con contenido interactivo es un anti-patrón ARIA — un tooltip nunca debe requerir que el usuario interactúe con su contenido (para eso existe el patrón "popover"/"non-modal dialog", que no es lo que este componente implementa). La story `WithLinkInside` demostraba precisamente este anti-patrón y se elimina.

---

## 8. Out of Scope

- Un patrón "popover" separado para contenido interactivo (enlaces, botones dentro de un flotante) — está fuera del alcance de `dcx-ng-tooltip`; si se necesita en el futuro, debe ser un componente distinto (`dcx-ng-popover`) con un patrón ARIA diferente (`aria-expanded`/`aria-controls`, activado por clic, no por hover).
- Delay configurable antes de mostrar/ocultar el tooltip (debounce) — no se documenta como requisito ni aparece en el mock; se mantiene el comportamiento inmediato actual en `mouseenter`/`focusin`.

---

## 9. Open Questions

Ninguna — el mock resuelve la variante `primary` sin ambigüedad, y el patrón de CDK Overlay ya tiene un precedente directo y sin ambigüedad en `dcx-ng-select` dentro del mismo repositorio.

---

## 10. Implementation Plan

1. **`core/interfaces/tooltip.ts`**: añadir `TooltipVariant = 'default' | 'primary'`; eliminar `AvailableSpace`/`TooltipPositionOption` (ya no se usan).
2. **`core/defaults/tooltip.ts`**: simplificar `TOOLTIP_DEFAULT_CONFIG` (ya no necesita `margin`/`adjustDelay`, solo lo que CDK no cubra).
3. **`dcx-ng-tooltip.component.ts`**:
   - Añadir `ChangeDetectionStrategy.OnPush`.
   - Añadir input `variant`.
   - Generar `id` único por instancia.
   - Sustituir la lógica manual de posicionamiento por CDK Overlay (`Overlay`, `ConnectedPosition[]`, `TemplatePortal`, `ViewContainerRef`), con `OnDestroy` para `overlayRef?.dispose()`.
   - Añadir `@HostListener('focusin')`/`@HostListener('focusout')`/`@HostListener('keydown.escape')`.
   - En `ngAfterViewInit()`: usar `Renderer2` para asignar `aria-describedby` al primer hijo proyectado.
   - Sanitizar `contentHtml` eliminando `a`, `button`, `input`, `select`, `textarea` antes de `bypassSecurityTrustHtml`.
4. **`dcx-ng-tooltip.component.html`**: mover el bocadillo a un `<ng-template #tooltipTemplate>`; quitar `aria-live`.
5. **`dcx-ng-tooltip.component.scss`**: fallbacks de tokens (tabla §5); realinear nombres de token a la convención `--ff-base`/`--r-md`/`--sp-N`/`--fs-sm`; corregir el offset `arrow-left`/`arrow-right` en `--top`; quitar `width: 120px` fijo de `--bottom`; añadir clase `--primary`.
6. **Tests** (`dcx-ng-tooltip.component.spec.ts`): reescritura sustancial para reflejar CDK Overlay; añadir casos de §7.
7. **Storybook** (`stories/Tooltip/ClassBased.stories.ts`): traducir categorías a `Atributos`; añadir `argTypes` para `arrowAlignment`/`contentHtml`/`variant`; eliminar `WithLinkInside`; añadir story de variante `primary`.
8. **`Documentation.mdx`**: traducir a español; corregir afirmaciones falsas sobre teclado/delay; documentar `arrowAlignment`/`contentHtml`/`variant`; referenciar las stories que faltaban.
9. **Page demo** (`src/app/pages/dcx-ng-page-tooltip/`): corregir selector duplicado; migrar a `.demo-page`/`.demo-section`; añadir ejemplos de `LongContentTooltip`, `WithIcon`, variante `primary`.
10. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
