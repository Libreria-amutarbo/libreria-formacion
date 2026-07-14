# Spec: Spinner Refinement

**Status:** Done
**Date:** 2026-07-10
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-spinner` es un indicador de carga circular con modo standalone (con título/descripción opcionales) y modo `wrapper` (overlay sobre contenido proyectado). A diferencia de `dcx-ng-skeleton` (puramente decorativo, `aria-hidden`), el spinner **es** responsable de anunciar el estado de carga (`role="status"` + `aria-live="polite"` + `aria-label`) — el patrón de accesibilidad ya está ahí, pero con huecos reales: fallback en inglés, sin forma de personalizar el texto anunciado sin también mostrarlo, sin respetar `prefers-reduced-motion`, y un `delay` que no hace lo que documenta.

Existe un mock de diseño dedicado: `designs/dcx-ng-page-spinner-toast.html` (sección "Spinner", líneas 131-196) — se usa como referencia visual y, sobre todo, para **acotar qué tamaños son parte real del diseño** (spoiler: solo s/m/l/xl, no `xs`).

Se usa dentro de la propia librería en `dcx-ng-file-upload.component.html:126` (`size="s" title="Subiendo archivo..." [delay]="0"`) — cualquier cambio de comportamiento debe mantener esa integración funcionando igual.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|---|---|---|
| 1 | **4.1.3 Status Messages / 3.1.2 Language of Parts** | `computedAriaLabel()` (`dcx-ng-spinner.component.ts:39-41`) cae a `'Loading'` en inglés cuando no hay `title` — inconsistente con el resto del proyecto (100% español) y con el propio mock de diseño (`"Cargando..."`, `designs/dcx-ng-page-spinner-toast.html:167`). | Fallback por defecto a `'Cargando…'`. |
| 2 | **4.1.2 Name, Role, Value** | No existe un input `ariaLabel` independiente — el único texto anunciable es `title`, que es a la vez el texto **visible**. Un consumidor no puede anunciar "Guardando cambios…" a lectores de pantalla sin también renderizar ese texto en pantalla (o viceversa, mostrar un título distinto del que se anuncia). | Añadir `ariaLabel = input<string \| null>(null)`; `computedAriaLabel()` pasa a `ariaLabel() \|\| title() \|\| 'Cargando…'`. |
| 3 | **2.3.3 Animation from Interactions** | La animación de giro (`dcx-ng-spinner.component.scss:27`, `@keyframes spin`) no tiene ninguna guarda `@media (prefers-reduced-motion: reduce)` — a diferencia de `dcx-ng-skeleton.component.scss:38-42`, que sí la tiene. | Añadir la media query; para un spinner (que comunica "ocupado", no es puramente decorativo) se opta por ralentizar la animación en vez de eliminarla del todo — ver sección 6. |

### 2.2 WCAG AA — Recomendados

Ninguno adicional — no hay `tabindex` suelto, no hay generación de `id` que revisar, y los tamaños no cambian el esquema de color (mismo riesgo de contraste en los 4, ver 2.3 sobre tokens).

### 2.3 Bugs de lógica

| # | Descripción |
|---|---|
| 4 | **`delay` no hace lo que documenta.** El input `delay` (`ts:21`, default `1300`) solo alimenta `animation-delay` (`scss:11`) — retrasa el INICIO del giro, pero el círculo (ya coloreado, ya con texto) se renderiza inmediatamente. Tanto Storybook (`ClassBased.stories.ts:45`: "Delay in milliseconds before showing the spinner") como `Documentation.mdx:35` ("Milliseconds to wait before showing the spinner") y la propia página demo ("Ejemplo 2 - Con delay personalizado") prometen que el spinner **no se muestra** hasta pasado ese tiempo — el propósito real de un `delay` en un spinner es evitar el parpadeo en operaciones muy rápidas. Hoy no cumple ninguna de las dos cosas. |
| 5 | **`size="auto"` es válido por tipo pero roto en CSS.** `size` usa el tipo compartido `DcxSize` (`core/interfaces/generic.ts:1`: `'s'\|'m'\|'l'\|'xl'\|'auto'`), pero `spinner-size-classes()` (`_spinner.scss:28-41`) no tiene ningún caso para `auto` — el círculo se queda sin `width`/`height`/`border-width`, invisible. Al revés, `'xs'` **sí** tiene caso en el SCSS (`_spinner.scss:29`, `_spinner.tokens.scss:4-9`) pero **no** existe en `DcxSize` — Storybook lo ofrece igualmente como opción (`ClassBased.stories.ts:28`) por una lista de opciones manual desincronizada del tipo real. Ninguno de los dos tamaños "extra" (`xs`, `auto`) aparece en el mock de diseño (solo Small/Medium/Large/XLarge, `designs/dcx-ng-page-spinner-toast.html:138-141`). |
| 6 | Export muerto: `$spinner-size-aliases` (`_spinner.tokens.scss:38-57`) no se usa en ningún sitio — `spinner-size-classes()` hardcodea sus propios alias (`&--s, &--small`, etc.) sin leer ese mapa. |
| 7 | `Documentation.mdx` referencia un fichero de stories inexistente (`./UnStyled.stories`, líneas 3, 18) y una story que no existe (`SpinnerShowcase`, línea 27; las reales son `Default`/`SpinnerDelayShowcase`/`SpinnerWrapperShowcase`) — rompe el build de Storybook docs. También documenta una prop `label` que nunca ha existido (líneas 36, 57, 79) — el nombre real siempre ha sido `title`/`description`. |
| 8 | En `ClassBased.stories.ts:59-61`, la descripción de `description` es literalmente idéntica a la de `title` ("Descriptive text that accompanies the spinner") — copiada sin adaptar, no explica en qué se diferencian. |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|---|
| 9 | Categorías de Storybook en inglés (`'Attributes'`, `ClassBased.stories.ts:21,31,39,47,55,62`) y casi todas las descripciones también en inglés (solo `color` está en español) — inconsistente con el resto de componentes refinados y con el propio `Documentation.mdx`/página demo, que sí están en español. |
| 10 | Página demo con patrón legacy (`<section>`/`<h2 class="example-title">`/`<hr>`) en vez de `.demo-page`/`.demo-section`; textos de ejemplo en inglés ("Loading", "description", "Wrapper Content..."). |
| 11 | Tokens CSS sin fallback y con nombres que no coinciden con ningún esquema usado por el resto de componentes refinados (ver sección 5 para el detalle y el mapeo de corrección). |
| 12 | Overlay de `wrapper` mode (`scss:60`) usa un color hardcodeado (`rgba(255, 255, 255, 0.92)`) en vez de un token — no se adapta a tema oscuro. |
| 13 | Falta cobertura de Storybook para: comparativa de los 4 tamaños lado a lado (como en el mock), personalización de `color`, y combinación título+descripción explícita (hoy solo aparece mezclada dentro de `Default`). |

---

## 3. API / Interface

### Cambio de tipo — `size` (ver 7b para la justificación)

```ts
// nuevo, en core/interfaces/spinner.ts (no existía fichero dedicado)
export type DcxSpinnerSize = 's' | 'm' | 'l' | 'xl';
```

`size = input<DcxSpinnerSize>('m')` en vez de `input<DcxSize>('m')`. Es un cambio de tipo, no de comportamiento observable: ni `'xs'` ni `'auto'` funcionaban correctamente hoy (ver 2.3 #5), así que ningún uso realmente-funcional se rompe.

### Inputs (`input()` signals)

| Name | Type | Default | Nuevo | Descripción |
|---|---|---|---|---|
| `size` | `DcxSpinnerSize` | `'m'` | (tipo cambiado) | Tamaño del spinner |
| `wrapper` | `boolean` | `false` | | Modo overlay sobre contenido proyectado |
| `title` | `string` | `''` | | Texto visible junto al spinner |
| `description` | `string` | `''` | | Texto secundario visible (solo modo standalone) |
| `delay` | `number` | `1300` | | Milisegundos antes de mostrar el spinner (ahora sí oculta/muestra, ver 2.3 #4) |
| `color` | `string \| null` | `null` | | Color del arco activo |
| `ariaLabel` | `string \| null` | `null` | ✅ | Texto anunciado a lectores de pantalla; tiene prioridad sobre `title` |

### Outputs / Métodos públicos

Ninguno (sin cambios).

---

## 4. Visual States & Variants

Alineado con `designs/dcx-ng-page-spinner-toast.html:131-196`:

| Estado | Descripción |
|---|---|
| **Tamaños** | `s` / `m` (default) / `l` / `xl` — círculo con pista gris clara y arco de color primario |
| **Color personalizado** | `color` sobrescribe el color del arco (mock muestra un morado `#7c3aed` de ejemplo) |
| **Con título** | Círculo + texto debajo, centrado |
| **Con título y descripción** | Círculo + título + descripción secundaria más pequeña/atenuada |
| **Wrapper (overlay)** | El spinner cubre el contenido proyectado con una capa semitransparente + blur, círculo y texto centrados encima |
| **Retrasado (`delay`)** | No visible hasta pasar `delay` ms — evita parpadeo en operaciones rápidas (comportamiento nuevo, ver 2.3 #4) |

No se añaden variantes de diseño nuevas.

---

## 5. SCSS / Tokens

Mapeo de corrección — todos los tokens de `dcx-ng-spinner.component.scss` pasan al esquema "solo-fallback" ya usado por `dcx-ng-accordion`/`dcx-ng-navbar`/`dcx-ng-select`/`dcx-ng-skeleton` (en vez de nombres largos sin fallback que no siguen ningún patrón reconocible):

| Actual (sin fallback) | Nuevo |
|---|---|
| `var(--font-family-primary)` (`:host`, `:5`) | `var(--ff-base, 'Inter', sans-serif)` |
| `var(--border-terciary)` (pista del círculo, `:24`) | `var(--border-light, #d1d5db)` |
| `var(--content-primary)` (arco activo por defecto, `:25`) | `var(--bg-primary, #0058ab)` — coincide exactamente con el mock (`var(--bg-primary)`, `designs/dcx-ng-page-spinner-toast.html:68`) |
| `var(--font-weight-semibold)` (`.title`, `:36`) | `var(--fw-semibold, 600)` |
| `var(--color-text-primary)` (`.title`/`.label`, `:37,47`) | `var(--text-dark, #2a2e33)` — `--color-text-primary` no coincide con ningún token real generado por `_variables.scss`, es un nombre huérfano |
| `var(--color-text-secondary)` (`.description`, `:42`) | `var(--text-muted, #696e75)` — mismo problema que el anterior |
| `var(--font-weight-medium)` (`.label`, `:46`) | `var(--fw-medium, 500)` (ya usado por `dcx-ng-select`) |
| `var(--spacing-xs)` (gap del overlay, `:59`) | `var(--sp-2, 8px)` |
| `rgba(255, 255, 255, 0.92)` (fondo del overlay, `:60`, literal sin token) | `color-mix(in srgb, var(--bg-default, #ffffff) 92%, transparent)` — mismo patrón que `dcx-ng-skeleton.component.scss:28` para overlays translúcidos |

### `libs/dcx-ng-lib/src/scss/components/spinner/_spinner.tokens.scss` / `_spinner.scss`

- Eliminar la entrada `xs` de `$spinner-sizes` y el caso `&--xs` de `spinner-size-classes()` (problema 2.3 #5 — no forma parte del tipo ni del diseño).
- Eliminar el mapa `$spinner-size-aliases` completo (problema 2.3 #6 — muerto).

---

## 6. Accesibilidad (WCAG AA)

### `prefers-reduced-motion`

```scss
.circle {
  animation: spin 0.8s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .circle {
    animation-duration: 2.4s; // gira, pero mucho más despacio — sigue comunicando "ocupado" sin el efecto de movimiento rápido que reduced-motion busca evitar
  }
}
```

A diferencia del `wave` de `dcx-ng-skeleton` (puramente decorativo, se puede apagar del todo con `animation: none`), el giro del spinner **es** la señal de "cargando" — apagarlo por completo dejaría un círculo estático sin indicar nada. Se opta por ralentizarlo drásticamente en vez de eliminarlo. Ver 7b.

### Estructura (sin cambios estructurales, solo de contenido)

```html
<div
  [class]="spinnerClasses()"
  role="status"
  aria-live="polite"
  [attr.aria-label]="computedAriaLabel()"
>
  @if (!wrapper()) {
    <div class="circle" aria-hidden="true"></div>
    <!-- … -->
  }
  @if (wrapper()) {
    <ng-content></ng-content>
    <div class="overlay">
      <div class="circle" aria-hidden="true"></div>
      <!-- … -->
    </div>
  }
</div>
```

- `aria-hidden="true"` añadido a `.circle` (decorativo — el nombre accesible ya lo da `aria-label` en el contenedor).
- `computedAriaLabel()`: `ariaLabel() || title() || 'Cargando…'`.

---

## 7. Test Cases

### Componente (`dcx-ng-spinner.component.spec.ts`)

- [x] `computedAriaLabel()` usa `ariaLabel` cuando está presente, incluso si `title` también lo está
- [x] `computedAriaLabel()` cae a `title` cuando no hay `ariaLabel`
- [x] `computedAriaLabel()` cae a `'Cargando…'` cuando no hay ni `ariaLabel` ni `title`
- [x] El spinner no está en el DOM (o no es visible) antes de que pase `delay` ms
- [x] El spinner se muestra inmediatamente cuando `delay` es `0`
- [x] El spinner se muestra tras esperar `delay` ms (usar `fakeAsync`/`tick`)
- [x] Cambiar `delay` reinicia el temporizador correctamente
- [x] El `.circle` tiene `aria-hidden="true"` (modo standalone y modo wrapper)
- [x] El host mantiene `role="status"` y `aria-live="polite"` (sin cambios, pero se añade test explícito — no existía)
- [x] Limpieza del timeout en `ngOnDestroy` (no debe lanzar error ni intentar `set()` tras destruir el componente)

### Actualizar tests existentes

- `'should fallback aria label to "Loading" when no title'` → `'should fallback aria label to "Cargando…" when no title or ariaLabel'`

---

## 7b. Decisiones de diseño

### `size` pasa a un tipo propio (`DcxSpinnerSize`) en vez de reusar `DcxSize`

`DcxSize` es un tipo compartido por varios componentes (botón, icono…) donde `'auto'` tiene sentido real (p. ej. un botón que se ajusta a su contenido). Para un spinner circular, "tamaño automático" no tiene una definición visual clara, y de hecho nunca se implementó — estaba roto desde que se añadió el tipo. En vez de inventar un comportamiento para `auto` solo para no romper un tipo que nunca funcionó del todo, se define un tipo específico (`DcxSpinnerSize = 's'|'m'|'l'|'xl'`) que refleja exactamente lo que el componente soporta y lo que muestra el mock de diseño. No es una ruptura funcional real (ver 2.3 #5).

### `prefers-reduced-motion` ralentiza en vez de eliminar la animación

A diferencia de un skeleton (decorativo, `aria-hidden`, puede quedar estático sin perder información), el giro del spinner es la única señal visual de que algo está en curso para un usuario que no usa lector de pantalla. Quitar la animación del todo bajo `reduced-motion` dejaría un círculo estático indistinguible de "terminado" o "roto". Se ralentiza en vez de eliminar — cumple el espíritu de `prefers-reduced-motion` (evitar movimiento rápido/parpadeante) sin sacrificar la comunicación del estado.

### `delay` pasa a ocultar/mostrar de verdad

Se decide implementar el comportamiento que el propio componente ya documentaba (Storybook, `Documentation.mdx`, página demo) en vez de solo corregir la documentación para que coincida con el bug — es el patrón estándar de un prop `delay` en spinners (evitar parpadeo en operaciones rápidas), y el nombre del prop no tiene otra lectura razonable. Se implementa con `effect()` + `setTimeout`, con caso especial para `delay <= 0` (mostrar síncronamente, sin pasar por el temporizador) para no introducir ni siquiera un tick de retraso en el consumidor real (`dcx-ng-file-upload`, que usa `[delay]="0"` precisamente para mostrarlo al instante).

---

## 8. Out of Scope

- El componente `Toast` que aparece en el mismo fichero de diseño (`designs/dcx-ng-page-spinner-toast.html`, sección "Toast") — es un componente distinto, no existe hoy en la librería y no es parte de este refinamiento.
- Cambiar la opacidad/valores exactos del overlay de `wrapper` mode — se tokeniza el valor actual (0.92), no se ajusta al 0.75 que muestra el mock (es un mock estático, no una especificación exacta a pixel).
- Cualquier soporte de tema oscuro más allá de tokenizar correctamente (no hay un tema oscuro real implementado en el proyecto todavía).
- Migrar `dcx-ng-file-upload` a usar `ariaLabel` en vez de `title` — sigue funcionando igual con `title`, no hace falta tocarlo.

---

## 9. Open Questions

Ninguna.

---

## 10. Implementation Plan

1. **`core/interfaces/spinner.ts`** (nuevo) — añadir `DcxSpinnerSize`; exportar desde `core/interfaces/index.ts`.
2. **`dcx-ng-spinner.component.ts`**:
   - `size` pasa a `input<DcxSpinnerSize>('m')`.
   - Añadir `ariaLabel` input; actualizar `computedAriaLabel()`.
   - Añadir `ChangeDetectionStrategy.OnPush`.
   - Añadir signal `visible` + `effect()` que gestiona el `setTimeout` de `delay` (caso especial `delay <= 0` síncrono); implementar `OnDestroy` para limpiar el timeout.
3. **`dcx-ng-spinner.component.html`** — envolver el contenido en `@if (visible())`; añadir `aria-hidden="true"` a ambos `.circle`.
4. **`dcx-ng-spinner.component.scss`** — aplicar el mapeo de tokens de la sección 5; añadir la media query de `prefers-reduced-motion`.
5. **`_spinner.tokens.scss` / `_spinner.scss`** — quitar `xs` y el mapa `$spinner-size-aliases` muerto.
6. **`dcx-ng-spinner.component.spec.ts`** — añadir los casos de la sección 7 (con `fakeAsync`/`tick` para el delay); actualizar el test de fallback de aria-label.
7. **Storybook (`ClassBased.stories.ts`)** — traducir categorías y descripciones a español; quitar `'xs'` de las opciones de `size`; añadir `ariaLabel` a los argTypes; añadir stories `Sizes` (los 4 tamaños lado a lado), `CustomColor`, `WithText` (título+descripción); revisar que `SpinnerDelayShowcase` siga siendo coherente ahora que `delay` sí oculta/muestra.
8. **`Documentation.mdx`** — quitar la referencia a `UnStyled.stories` (inexistente); corregir `SpinnerShowcase` → `Default`; corregir la prop documentada `label` → `title`/`description`/`ariaLabel`; traducir a español; quitar `xs` de "Size Variations".
9. **Página demo** — migrar a `.demo-page`/`.demo-section`; textos en español; añadir ejemplos de tamaños comparados y color personalizado para cubrir las nuevas stories.
