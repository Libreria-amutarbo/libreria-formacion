# Spec: Skeleton Refinement

**Status:** Done
**Date:** 2026-07-10
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-skeleton` es un placeholder decorativo de carga (rectángulo o círculo, con animación de "wave" opcional) implementado enteramente vía host bindings — no tiene `<template>` propio (el `.html` está vacío). No existe un fichero de diseño dedicado en `designs/` para este componente; el diseño ya implementado (tokens `--bg-surface`, `--bg-default`, `--r-md`, `--r-pill`, animación wave con `prefers-reduced-motion`) es coherente con el resto del sistema y se toma como referencia visual válida — este refinamiento no cambia el aspecto, se centra en accesibilidad real (no solo la del propio componente, sino la de cómo se **documenta y demuestra** su uso, que hoy es incompleta) y limpieza de código.

El componente no se usa en ningún otro sitio de `src/app/` fuera de su propia página demo.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|---|---|---|
| 1 | **4.1.3 Status Messages** | `dcx-ng-skeleton` en sí es correctamente `aria-hidden="true"` (es decorativo, no debe leerse). La `Documentation.mdx:69` dice correctamente que "el contenedor consumidor puede usar `aria-busy='true'`" — pero **ni la página demo** (`dcx-ng-page-skeleton.component.html:68,84`) **ni las stories** `CardPlaceholder`/`ListPlaceholder` (`ClassBased.stories.ts:145`) implementan el patrón completo: solo ponen `aria-busy="true"`, sin `role="status"` ni texto oculto para lectores de pantalla. `aria-busy` por sí solo **no garantiza que se anuncie nada** — sin un `role="status"`/`aria-live` y un texto (aunque sea visualmente oculto), un usuario de lector de pantalla no se entera de que hay contenido cargando. Es un hueco real, pero está en el **patrón de consumo demostrado**, no en el componente. | Corregir los dos sitios donde se demuestra el patrón (página demo y stories) para que usen `role="status"` + `aria-busy="true"` + un `<span class="visually-hidden">Cargando…</span>`, y actualizar `Documentation.mdx` para enseñar el patrón completo, no solo la mitad. |

### 2.2 WCAG AA — Recomendados

Ninguno adicional — `prefers-reduced-motion` ya está bien resuelto (`dcx-ng-skeleton.component.scss:38-42`), no hay `tabindex` ni riesgo de foco perdido, y no hay generación de `id` que revisar.

### 2.3 Bugs de lógica

| # | Descripción |
|---|---|
| 2 | Clase `dcx-skeleton--rectangle` (`dcx-ng-skeleton.component.ts:19`) se activa en el host pero **no existe ningún selector `.dcx-skeleton--rectangle`** en el SCSS (verificado, cero coincidencias) — es una clase muerta sin efecto visual alguno. |
| 3 | Duplicación de fallback en el radio de borde: `computedBorderRadius()` (`dcx-ng-skeleton.component.ts:50-54`) **ya** resuelve un valor final completo (`'var(--r-pill, 999px)'` o `borderRadius() ?? 'var(--r-md, 6px)'`), que se escribe en la custom property `--dcx-skeleton-border-radius`. El SCSS **vuelve a envolverlo** en otro fallback (`border-radius: var(--dcx-skeleton-border-radius, var(--r-md, 6px));`, `scss:11`) que nunca se activa porque la property siempre llega con valor, y además repite el caso circle por separado (`:host(.dcx-skeleton--circle) { border-radius: var(--r-pill, 999px); }`, `scss:16-18`), redundante con lo que ya hace la property. Mismo valor expresado tres veces en dos sitios — riesgo de que diverjan si se toca uno y no el otro. |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|---|
| 4 | `argTypes` de Storybook (`ClassBased.stories.ts:24-75`) no tiene **ninguna** `category` — los 6 atributos aparecen sin agrupar en la tabla de controles, a diferencia del resto de componentes refinados que usan `'Atributos'`. |
| 5 | Página demo usa el patrón legacy (`<section>` + `<h2 class="example-title">` + `<dcx-ng-divider>` manual) en vez de `.demo-page`/`.demo-section` — único componente entre los ya refinados que aún no lo usa. |
| 6 | Faltan dos variantes con story propia que sí aparecen en la página demo o son casos de uso habituales: líneas de texto/párrafo apiladas (hoy solo aparece implícitamente dentro de `NoAnimation`, mezclando dos conceptos) y avatar/círculo aislado con tamaños típicos. |

---

## 3. API / Interface

Sin cambios de ruptura. No se añaden inputs ni outputs — el componente ya cubre bien su superficie (forma, tamaño, radio, animación). El fix de accesibilidad es a nivel de **consumo demostrado** (página demo, stories, docs), no de la API del componente — ver sección 7b para la justificación de por qué no se añade una prop tipo `label`/`loading` al propio `dcx-ng-skeleton`.

### Inputs (`input()` signals) — sin cambios

| Name | Type | Default | Descripción |
|---|---|---|---|
| `shape` | `'rectangle' \| 'circle'` | `'rectangle'` | Forma visual |
| `width` | `string` | `'100%'` | Ancho CSS (ignorado si `size`) |
| `height` | `string` | `'1rem'` | Alto CSS (ignorado si `size`) |
| `size` | `string \| null` | `null` | Tamaño único para ancho y alto |
| `borderRadius` | `string \| null` | `null` | Radio CSS para rectángulos |
| `animation` | `'wave' \| 'none'` | `'wave'` | Animación del placeholder |

### Outputs / Métodos públicos

Ninguno (sin cambios).

---

## 4. Visual States & Variants

Sin cambios visuales respecto al diseño actual (no hay mock dedicado que motive un rediseño):

- **Rectangle** — placeholder de línea/bloque, radio `--r-md`
- **Circle** — placeholder de avatar, radio `--r-pill`
- **Wave** — animación de barrido con gradiente, respeta `prefers-reduced-motion`
- **None** — estático, sin animación

---

## 5. SCSS / Tokens

Sin tokens nuevos. Cambios:

- Eliminar la duplicación de fallback de `border-radius` (problema 2.3 #3): el SCSS pasa a `border-radius: var(--dcx-skeleton-border-radius);` sin fallback propio (la property siempre llega resuelta desde TS), y se elimina el bloque `:host(.dcx-skeleton--circle) { border-radius: ... }` por ser redundante con lo anterior.
- Eliminar el host-binding de la clase muerta `dcx-skeleton--rectangle` (problema 2.3 #2).
- Nuevo: utilidad `.visually-hidden` en `src/styles/page-demo.scss` (compartida, no específica de skeleton — reutilizable por cualquier página/story que necesite texto solo-lector-de-pantalla), usando el mismo patrón que el mixin `visually-hidden` ya existente en `libs/dcx-ng-lib/src/scss/utils/_mixins.scss:279`.

---

## 6. Accesibilidad (WCAG AA)

### Patrón correcto para una región compuesta por varios skeletons

```html
<div class="list-placeholder" role="status" aria-busy="true">
  <span class="visually-hidden">Cargando…</span>
  @for (item of listItems; track item) {
    <div class="list-item">
      <dcx-ng-skeleton shape="circle" size="3rem" />
      <!-- … -->
    </div>
  }
</div>
```

- `role="status"` + `aria-busy="true"` en el **contenedor**, una sola vez por región de carga (no en cada skeleton individual — anunciar N veces "cargando" sería ruido, no ayuda).
- Texto oculto visualmente (`.visually-hidden`) dentro del contenedor para que el lector de pantalla tenga algo que anunciar; `role="status"` implica `aria-live="polite"`, así que no hace falta añadirlo explícitamente.
- Cada `dcx-ng-skeleton` interno sigue con `aria-hidden="true"` (sin cambios) — son puramente visuales, el anuncio ya lo hace el contenedor.

### Notas adicionales

- No se toca el componente `dcx-ng-skeleton` en sí: su contrato (`aria-hidden="true"` siempre) es correcto y se mantiene. Ver 7b.

---

## 7. Test Cases

### Componente (`dcx-ng-skeleton.component.spec.ts`)

- [x] Actualizar `'should render rectangle and wave classes by default'` — quitar la aserción sobre `dcx-skeleton--rectangle` (clase eliminada)
- [x] Resto de tests existentes se mantienen sin cambios (valores por defecto, `computedWidth`/`computedHeight` con y sin `size`, `circle` → `var(--r-pill, 999px)`, `borderRadius` custom, `animation: 'none'`, `aria-hidden`)

### Página demo (`dcx-ng-page-skeleton.component.spec.ts`)

- [x] `should create` (sin cambios, ya existe)

No se añaden tests de accesibilidad a nivel de componente porque el fix real está en la página demo/stories (markup estático, no hay lógica que testear con Jest más allá de "el componente se crea").

---

## 7b. Decisión: el fix de accesibilidad va en el consumo, no en `dcx-ng-skeleton`

Se valoró añadir un input tipo `label`/`loadingText` a `dcx-ng-skeleton` para que pudiera auto-anunciarse (`role="status"` + texto oculto dentro de sí mismo cuando se le pase). Se descarta por:

1. **Ruido para AT en el caso más común**: la mayoría de usos reales son *varios* skeletons componiendo una región (una tarjeta, una lista). Si cada instancia individual anunciara "cargando", un lector de pantalla anunciaría el mismo mensaje N veces seguidas en vez de una — peor experiencia que la actual, no mejor.
2. **El componente ya no tiene motivo para dejar de ser puramente decorativo**: hoy es un bloque visual sin semántica, correcto para ese rol. Meterle un modo "a veces anuncia, a veces no" según si se le pasa `label` complica su contrato sin necesidad.
3. **El patrón correcto ya está documentado** (`Documentation.mdx:69`) — el problema no era la falta de guía, era que los dos sitios donde el propio proyecto demuestra el patrón (página demo, stories) no lo seguían completo. Corregir la demostración enseña el patrón correcto sin tocar la API del componente.

Si en el futuro apareciera un caso de uso real de "un único skeleton representa toda una región de carga" (p.ej. un loader de página completa), sería más apropiado resolverlo con el mismo patrón de contenedor (`role="status"` envolviendo ese único skeleton) que añadir una prop dedicada.

---

## 8. Out of Scope

- Cualquier cambio visual (colores, tamaños, curva de animación) — no hay mock de diseño que lo motive.
- Un componente `SkeletonGroup`/`SkeletonContainer` dedicado que encapsule el patrón `role="status"` + texto oculto — se resuelve con markup directo en los consumidores (demo, stories); crear un componente nuevo es una funcionalidad distinta, no un refinamiento del existente.
- Soporte SSR/hydration para las custom properties del host — el proyecto no usa Angular Universal, no aplica.

---

## 9. Open Questions

Ninguna.

---

## 10. Implementation Plan

1. **`dcx-ng-skeleton.component.ts`** — quitar el host-binding `[class.dcx-skeleton--rectangle]`.
2. **`dcx-ng-skeleton.component.scss`** — quitar el fallback duplicado y el bloque `:host(.dcx-skeleton--circle)` redundante; `border-radius` pasa a leer directo de la custom property.
3. **`dcx-ng-skeleton.component.spec.ts`** — actualizar el test de clases por defecto.
4. **`src/styles/page-demo.scss`** — añadir utilidad `.visually-hidden` compartida.
5. **Storybook (`ClassBased.stories.ts`)**:
   - Añadir `category: 'Atributos'` a los 6 argTypes.
   - Añadir stories `TextLines` (líneas de párrafo apiladas, anchos variables) y `Avatar` (círculos solos en tamaños típicos, con label descriptivo).
   - `CardPlaceholder`/`ListPlaceholder`: añadir `role="status"` + `<span class="visually-hidden">Cargando…</span>` junto al `aria-busy="true"` ya existente.
6. **`Documentation.mdx`** — sección "Accessibility": mostrar el patrón completo (`role="status"` + `aria-busy` + texto oculto), no solo `aria-busy` suelto; añadir Canvas de las 2 stories nuevas.
7. **Página demo** — migrar a `.demo-page`/`.demo-section` (7 secciones, 1:1 con las 7 stories); aplicar el mismo fix de `role="status"` + texto oculto en los ejemplos de tarjeta y lista.
