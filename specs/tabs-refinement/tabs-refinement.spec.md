# Spec: Tabs Refinement

**Status:** Done
**Date:** 2026-07-13
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-tabs` implementa el patrón ARIA de pestañas con `role="tablist"`/`role="tab"`/`role="tabpanel"`, scroll horizontal con overflow, controles numerados opcionales y tres variantes visuales (`line`, `pill`, `brand`). El cableado ARIA está parcialmente correcto, pero tiene un fallo crítico: la navegación por teclado está completamente implementada en `onKeydown()` pero **nunca se conecta a la plantilla** — el slider de pestañas no es operable por teclado más allá de tabular botón a botón (y ni eso funciona bien, porque `tabindex` no es roving). Además hay una referencia `aria-labelledby` colgante, duplicación de clases CSS entre dos elementos anidados, y la documentación de Storybook está en inglés y describe una API que no existe (`disabled` a nivel de componente, campo `content` en `DcxTabItem`). El mock de diseño (`designs/dcx-ng-page-tabs.html`) muestra además una cuarta variante ("Subtle") y badges de recuento en las pestañas, ninguno implementado hoy.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Teclado operable (2.1.1) | `onKeydown()` implementa Arrow/Home/End correctamente (`dcx-ng-tabs.component.ts:156-170`) pero **nunca se bindea** en la plantilla — no hay ningún `(keydown)` en `dcx-ng-tabs.component.html`. En el DOM real, las flechas/Home/End no hacen nada. Solo se detecta en tests porque llaman a `component.onKeydown(event)` directamente. | Añadir `(keydown)="onKeydown($event)"` en el contenedor `role="tablist"`. |
| 2 | Nombre accesible del panel (4.1.2) | El panel usa `[attr.aria-labelledby]="tab.id"` (html:71) pero **ningún elemento tiene ese `id`** — el `<span role="tab">` nunca recibe `[id]="tab.id"`. La referencia está colgante; el lector de pantalla no puede resolver el nombre del panel. | Añadir `[id]="tab.id"` en cada pestaña. |
| 3 | Tabindex roving (2.4.3 / patrón APG Tabs) | Todas las pestañas habilitadas reciben `tabindex="0"` (html:41) — deberían ser un único punto de tabulación (`0` solo en la pestaña activa, `-1` en el resto), con las flechas moviendo el foco dentro del grupo. Hoy cada pestaña es una parada de Tab independiente, contradiciendo el patrón y la navegación por teclado prevista. | Tabindex roving: `0` solo si `isActive() && !disabled`, `-1` en el resto. |
| 4 | Navegación salta pestañas deshabilitadas | `onKeydown()` calcula el siguiente índice con `(idx + 1) % list.length` sin filtrar deshabilitadas — si la siguiente pestaña está deshabilitada, `selectTab()` la descarta silenciosamente y la navegación se queda "atascada" sin dar feedback. | Recalcular navegación solo sobre índices habilitados. |
| 5 | Elemento interactivo no nativo (4.1.2) | Las pestañas son `<span>` con `role="tab"` y un `(click)` handler, sin foco/activación nativa. Combinado con los puntos 1 y 3, hoy no son utilizables por teclado en absoluto. | Cambiar a `<button type="button" role="tab">` — foco, `disabled` nativo y activación por Enter/Espacio gratis del navegador. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | `focus-visible` | No existe ninguna regla `:focus-visible` en `dcx-ng-tabs.component.scss` para los botones de pestaña. Añadir anillo de foco visible. |
| 2 | Nombre del `tablist` | El contenedor `role="tablist"` no tiene `aria-label`/`aria-labelledby`. La página de demo llega a renderizar 8 tablists sin nombres distintivos. Añadir input `ariaLabel`. |
| 3 | Botones de control sin nombre | Los botones numerados de `hasControls` (html:5-10) solo muestran "1", "2"… **Nota de implementación**: `dcx-ng-button` suprime deliberadamente `aria-label` cuando `label` está presente (`computedAriaLabel()`), por lo que forzar un `ariaLabel` adicional no tiene efecto — el nombre accesible ya lo da el texto visible ("1", "2"…), que es un mecanismo válido y suficiente per WCAG 4.1.2. No se introduce ningún cambio aquí; se descarta como falso positivo tras verificar el comportamiento real de `dcx-ng-button`. |
| 4 | Idioma de los `aria-label` de scroll | Los botones de scroll usan `'Scroll left'`/`'Scroll right'` (html:24, 60) — en inglés, inconsistente con el resto de la librería (en español). |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | **Clases duplicadas/conflictivas**: `tabHeaderClasses()` se aplica simultáneamente al contenedor externo `.dcx-tabs__header-container` (html:14) y al `div role="tablist"` interno (html:27-28) — ambos reciben `.dcx-tabs__header`/`--brand`/`--pill`, duplicando `overflow-x`, `border-bottom` y fondo en dos nodos anidados. |
| 2 | `.dcx-tab__button` (scss:108, selector plano fuera de `.dcx-tabs`) y `.dcx-tab__button--pill` (scss:58, anidado dentro de `.dcx-tabs`) se aplican siempre juntas al mismo elemento — el look "pill" solo gana por orden de aparición en el CSS compilado, no por una estructura de override explícita. Frágil ante reordenamientos futuros. |
| 3 | Falta `event.preventDefault()` en `onKeydown` — las flechas/Home/End pueden desencadenar scroll de página en algunos navegadores. |
| 4 | `public hasControls = input(...)` (ts:29) tiene un modificador `public` redundante, inconsistente con el resto de inputs del propio componente. |
| 5 | `scrollIntoView()` (ts:144) es público pero solo se usa internamente y los tests ya lo acceden como si fuera privado (`component['scrollIntoView']`, spec.ts:191) — debería declararse `private`. |
| 6 | Colisión de selector: el componente wrapper interno de Storybook (`ClassBased.stories.ts:122`) usa `selector: 'dcx-ng-page-tabs'`, el mismo selector que el componente real de la página de demo (`src/app/pages/dcx-ng-page-tabs/dcx-ng-page-tabs.component.ts:16`). Coincidencia confusa aunque hoy no colisionan en el mismo módulo. |

### 2.4 Mejoras de UX / coherencia con el mock

| # | Descripción |
|---|-------------|
| 1 | El mock (`designs/dcx-ng-page-tabs.html`) muestra una **cuarta variante "Subtle"** (borde inferior de 1px, fuente 13px) no implementada — `DcxTabsVariant` solo soporta `'line' \| 'pill' \| 'brand'`. |
| 2 | El mock muestra **badges de recuento** junto al label ("Dashboard 3", "Proyectos 12") — no existe ningún campo `badge`/`count` en `DcxTabItem`. |
| 3 | El mock aplica `box-shadow: 0 1px 3px rgba(0,0,0,.1)` a la pestaña activa en la variante pill (no presente en la implementación actual) y un realce de fondo `rgba(255,255,255,.1)` en la pestaña activa de la variante brand (la implementación actual solo cambia color de texto/borde). |

---

## 3. API / Interface

### Inputs (`input()` signals)

| Name | Type | Default | Cambio |
|------|------|---------|--------|
| `tabs` | `DcxTabItem[]` (required) | — | sin cambios |
| `variant` | `'line' \| 'pill' \| 'brand' \| 'subtle'` | `'line'` | **ADDITIVE**: nuevo valor `'subtle'` |
| `hasControls` | `boolean` | `false` | sin cambios funcionales (se quita el `public` redundante) |
| `activeTabId` | `string` | `''` | sin cambios |
| `ariaLabel` | `string \| null` | `null` | **Nuevo.** `aria-label` del `role="tablist"`. Recomendado cuando hay más de un grupo de pestañas visible en la misma página. |

### Interface `DcxTabItem`

| Campo | Tipo | Cambio |
|-------|------|--------|
| `id` | `string` | sin cambios |
| `label` | `string` | sin cambios |
| `disabled?` | `boolean` | sin cambios |
| `icon?` | `string` | sin cambios |
| `badge?` | `string \| number` | **Nuevo, ADDITIVE.** Recuento/etiqueta corta mostrada junto al label (p.ej. "3", "12"). |

### `DcxTabsVariant`

`'line' | 'pill' | 'brand'` → `'line' | 'pill' | 'brand' | 'subtle'` (**ADDITIVE**).

### Outputs — sin cambios (`tabChange`)

### Public Methods

| Method | Cambio |
|--------|--------|
| `scrollIntoView` | pasa a `private` (**BREAKING de bajo impacto**: no hay consumidores externos, ya se testeaba como privado) |
| `onKeydown` | firma sin cambios, lógica corregida (salta deshabilitadas, `preventDefault`, mueve el foco DOM) |

---

## 4. Visual States & Variants

- **Line (default)** — borde inferior 2px en la pestaña activa, color primario.
- **Pill** — contenedor gris redondeado, pestaña activa con fondo blanco y `box-shadow` sutil (nuevo, según mock).
- **Brand** — fondo azul primario, texto activo blanco con borde inferior celeste y realce de fondo translúcido (nuevo, según mock).
- **Subtle (nuevo)** — borde inferior 1px, fuente 13px, mismo esquema de color que "line" pero más compacto.
- **Disabled** (por pestaña) — `disabled` nativo, opacidad reducida, `cursor: not-allowed`.
- **Con badge** (nuevo) — pastilla de recuento junto al label, fondo azul claro / azul primario si está activa.
- **Focus-visible** (nuevo) — anillo `outline: 2px solid var(--border-focus, #1db8f2)`.

Referencia: `designs/dcx-ng-page-tabs.html`.

---

## 5. SCSS / Tokens

- Tokens ya usados correctamente con fallback (`--bg-primary`, `--border-light`, `--border-focus`, `--text-muted`, `--sp-*`, `--r-*`, `--fw-*`) — no se detectaron nombres de token huérfanos.
- Los colores del badge (`#dbeafe`/`#1d4ed8`) se toman literalmente del mock, que tampoco los tokeniza — no se inventan tokens nuevos para ellos.
- Reestructurar `.dcx-tab__button*` en un único bloque anidado dentro de `.dcx-tabs { }` (BEM consistente), eliminando el selector plano top-level.
- El contenedor externo `.dcx-tabs__header-container` deja de recibir `tabHeaderClasses()` — pasa a ser una clase estática de layout; solo el `div role="tablist"` interno recibe las clases de variante.
- Nueva clase `.dcx-tab__button--subtle` / `.dcx-tabs__header--subtle`.
- Nueva clase `.dcx-tab__badge` (+ `.active`).

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA
- `role="tablist"` en el contenedor de pestañas, con `[attr.aria-label]="ariaLabel()"` cuando se indique.
- `role="tab"` en cada `<button>`, con `[id]="tab.id"`, `aria-selected`, `aria-controls` (→ id del panel), `aria-disabled` (redundante con `disabled` nativo, se mantiene por robustez con AT).
- `role="tabpanel"` en el panel activo, con `[id]="'panel-' + tab.id"` y `[attr.aria-labelledby]="tab.id"` — ahora resoluble.
- Tabindex roving: `0` en la pestaña activa habilitada, `-1` en el resto.

### Teclado

| Tecla | Acción |
|-------|--------|
| `Tab` | Entra/sale del grupo de pestañas (un único punto de parada, la pestaña activa) |
| `←` | Mueve la selección y el foco a la pestaña habilitada anterior (con wrap-around) |
| `→` | Mueve la selección y el foco a la pestaña habilitada siguiente (con wrap-around) |
| `Home` | Mueve la selección y el foco a la primera pestaña habilitada |
| `End` | Mueve la selección y el foco a la última pestaña habilitada |
| `Enter` / `Espacio` | Activa la pestaña con foco (gratis, vía `<button>` nativo) |

### Lectores de pantalla
- El `tablist` anuncia su propósito cuando se indica `ariaLabel`.
- El panel se anuncia correctamente etiquetado por su pestaña una vez resuelto el `id` colgante.
- Los botones de scroll y de control tienen `aria-label` descriptivo en español.

---

## 7. Test Cases

- [x] should create (ya existe)
- [ ] las pestañas se renderizan como `<button>` (no `<span>`)
- [ ] `(keydown)` está conectado: disparar `ArrowRight` en el DOM mueve la selección
- [ ] tabindex roving: pestaña activa `tabindex="0"`, resto `-1`
- [ ] navegación por teclado salta pestañas deshabilitadas (ArrowRight/ArrowLeft/Home/End)
- [ ] `onKeydown` llama a `preventDefault()` en teclas manejadas
- [ ] el foco DOM se mueve al botón de la pestaña recién seleccionada tras navegación por teclado
- [ ] cada botón de pestaña tiene `[id]="tab.id"` y el panel referencia ese id vía `aria-labelledby`
- [ ] `ariaLabel` se refleja como `aria-label` del `tablist`
- [ ] variante `subtle` aplica las clases correctas
- [ ] `badge` se renderiza cuando está presente, no se renderiza cuando es `undefined`
- [ ] botones de control tienen `aria-label` "Ir a la pestaña N"
- [ ] botones de scroll tienen `aria-label` en español
- [ ] `scrollIntoView` sigue siendo invocado tras `selectTab` (comportamiento existente preservado)
- [ ] tests existentes de scroll/overflow/activeTab siguen pasando tras el cambio de `<span>` a `<button>`

---

## 7b. Decisión: componentes de librería vs HTML nativo

Cambio de `<span role="tab">` a `<button type="button" role="tab">`. Justificación: un `<button>` nativo aporta foco, activación por teclado (Enter/Espacio) y soporte de `disabled` sin reimplementar nada — exactamente el mismo criterio ya aplicado en accordion (botón dentro de `<h3>`) y coherente con el checklist de la Fase 2 de este proceso de refinamiento ("Native `<button>` usado, no `<div>`/`<span>` con `role`"). El `role="tab"` explícito sigue siendo necesario porque el rol implícito de `<button>` es `button`, no `tab`.

El modelo de contenido (un único `<ng-content>` dentro de un panel que cambia según la pestaña activa, con el consumidor decidiendo qué proyectar) se mantiene sin cambios — es una composición válida y ya usada correctamente en la story `TabsWithContentComponents`; lo único que estaba mal era la documentación, que inventaba un campo `content` en `DcxTabItem` inexistente en el código real.

---

## 8. Out of Scope

- Sustituir el `setTimeout`-based `checkOverflow()` por `ResizeObserver` — mejora de robustez señalada mera pero no crítica para WCAG ni para el bug de teclado; se documenta como posible mejora futura.
- Un modelo de "un panel por pestaña" (todos renderizados, ocultos con `aria-hidden`) — el modelo actual de panel único + `ng-content` es una variante válida del patrón APG y ya funciona correctamente una vez resuelto el `id` colgante.
- Animaciones/transiciones adicionales al cambiar de pestaña más allá del `fadeIn` ya existente.

---

## 9. Open Questions

Ninguna — el mock resuelve la variante `subtle` y los badges sin ambigüedad de color (badges usan colores literales del propio mock, no hay conflicto con un esquema de color ya establecido en otro componente).

---

## 10. Implementation Plan

1. **`core/interfaces/tabs.ts`**: añadir `badge?: string | number` a `DcxTabItem`; añadir `'subtle'` a `DcxTabsVariant`.
2. **`core/defaults/tabs.ts`**: añadir `'subtle'` a `TABS_VARIANT_LIST`; añadir fixture `DcxTabItemWithBadges` (Dashboard 3 / Proyectos 12, según mock).
3. **`dcx-ng-tabs.component.ts`**:
   - Añadir input `ariaLabel`.
   - Quitar `public` redundante en `hasControls`.
   - Marcar `scrollIntoView` como `private`.
   - Reescribir `onKeydown`: filtrar índices deshabilitados, `event.preventDefault()`, mover foco DOM tras `selectTab()` (nuevo helper `private focusTab(tabId)`).
   - Extender `getHeaderVariantClass`/`getButtonVariantClass` para `'subtle'`.
4. **`dcx-ng-tabs.component.html`**:
   - Contenedor `role="tablist"`: añadir `(keydown)="onKeydown($event)"`, `[attr.aria-label]="ariaLabel()"`.
   - Quitar `[class]="tabHeaderClasses()"` del contenedor externo `.dcx-tabs__header-container` (deja de duplicar clases).
   - Cambiar `<span>` → `<button type="button">` para cada pestaña; `[id]="tab.id"`; `[disabled]="tab.disabled"`; `[tabIndex]="isActive(tab.id) && !tab.disabled ? 0 : -1"`.
   - Renderizar badge cuando `tab.badge` está presente.
   - Traducir `aria-label` de scroll a español. (Botones de control: sin cambio, ver nota en §2.2.3.)
5. **`dcx-ng-tabs.component.scss`**: consolidar `.dcx-tab__button*` en un bloque anidado; añadir `--subtle`; añadir `:focus-visible`; añadir `.dcx-tab__badge`; añadir box-shadow pill activo y realce de fondo brand activo.
6. **Tests** (`dcx-ng-tabs.component.spec.ts`): actualizar selector de query (`button.dcx-tab__button` en vez de `span.dcx-tab__button`); añadir casos nuevos de §7.
7. **Storybook** (`stories/Tabs/ClassBased.stories.ts`):
   - Traducir categorías a `Atributos`/`Eventos`.
   - Añadir argTypes para `ariaLabel`, `badge`, variante `subtle`.
   - Renombrar el selector colisionante del wrapper interno (`dcx-ng-page-tabs` → `dcx-ng-tabs-story-wrapper`).
   - Nueva story `SubtleTabs`, nueva story `TabsWithBadges`.
8. **`Documentation.mdx`**: traducir íntegramente a español; eliminar import muerto `./UnStyled.stories`; corregir API documentada (quitar `disabled` a nivel de componente y `content` en `DcxTabItem`, que no existen); añadir Canvas para las 4 stories no documentadas (`TabsWithIcons`, `TabsWithScroll`, `TabsWithControls`, `TabsWithContentComponents`) + las nuevas.
9. **Page demo** (`src/app/pages/dcx-ng-page-tabs/`): migrar a `.demo-page`/`.demo-section` (quitar `dcx-ng-divider` manuales y clases bespoke `.example-title`/`.dcx-ng-page-tabs-demo`); añadir `<h1>`; añadir ejemplo de variante `subtle` y de badges; dar `ariaLabel` distintivo a cada instancia dado que hay múltiples tablists en la página.
10. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.
