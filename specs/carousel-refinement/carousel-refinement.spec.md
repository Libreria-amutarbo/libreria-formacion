# Spec: Carousel Refinement

**Status:** Done
**Date:** 2026-06-01
**Author:** Claude Code

---

## 1. Overview

`DcxNgCarouselComponent` es un componente de carrusel que soporta orientación horizontal/vertical, navegación por flechas, indicadores de punto, modo circular y autoplay. La arquitectura de señales y el `OnPush` son correctos, pero el componente tiene **8 gaps de WCAG AA críticos** que lo hacen inaccessible para usuarios de teclado y lectores de pantalla. Esta refinería los corrige todos, crea el design HTML de referencia que no existía, actualiza Storybook y migra la page demo al patrón global.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 1.3.1 Info & Relationships | `role="region"` sin `aria-label` | Añadir input `ariaLabel` con default `'Carousel'`; aplicar al contenedor |
| 2 | 4.1.2 Name, Role, Value | Los indicadores (dots) no tienen `aria-pressed` | Añadir `[attr.aria-pressed]="$index === currentPage()"` en cada dot |
| 3 | 4.1.3 Status Messages | No hay región `aria-live` — los cambios de slide son silenciosos para lectores de pantalla | Añadir `<div aria-live="polite">` que anuncia "Diapositiva X de Y" |
| 4 | 2.2.2 Pause, Stop, Hide | El autoplay no se puede pausar; no hay pausa al hover/focus | Pausar autoplay en `mouseenter`/`focusin`; reanudar en `mouseleave`/`focusout` |
| 5 | 2.1.1 Keyboard | Sin navegación por teclado (flechas) | `onKeydown()` en el contenedor: flechas → `prev()`/`next()` |
| 6 | 2.3.3 Animation from Interactions | La transición CSS de 0.5s no respeta `prefers-reduced-motion` | Añadir `@media (prefers-reduced-motion: reduce) { transition: none }` |
| 7 | 4.1.2 Name, Role, Value | Slides no-actuales están en el DOM accesible sin `aria-hidden` | Añadir `[attr.aria-hidden]="$index !== currentPage() || null"` |
| 8 | 2.4.6 Headings and Labels | Etiquetas de flechas en inglés ("Previous slide", "Next slide") | Cambiar a español: "Diapositiva anterior" / "Diapositiva siguiente" |

### 2.2 Bugs de código

| # | Descripción |
|---|-------------|
| 9 | `_timer: any` — debe tipificarse como `ReturnType<typeof setInterval> \| undefined` |
| 10 | Storybook: `category: 'Attributes'` / `'Events'` en inglés → `'Atributos'` / `'Eventos'` |

### 2.3 Coherencia

| # | Descripción |
|---|-------------|
| 11 | No existe design file `designs/dcx-ng-page-carousel.html` |
| 12 | Page demo no usa `.demo-page` / `.demo-section` |

---

## 3. API / Interface

### Nuevos inputs

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `'Carousel'` | Nombre accesible de la región |

### Sin cambios de API pública en los existentes

---

## 4. Comportamiento WCAG nuevo

### Teclado (keyboard navigation)

El contenedor `role="region"` no es focusable per se — la navegación se activa cuando el foco está dentro del carousel. Los botones de flecha son nativos (`<button>`) y capturan Enter/Space automáticamente. El handler `onKeydown()` se añade al contenedor para capturar flechas:

```
← / ↑  →  prev()
→ / ↓  →  next()
```

### Auto-pause en hover/focus

```typescript
pauseAutoplay(): void   // mouseenter, focusin
resumeAutoplay(): void  // mouseleave, focusout — solo si _autoplayEnabled
```

### Región aria-live

```html
<div aria-live="polite" aria-atomic="true" class="dcx-carousel-sr-only">
  {{ liveAnnouncement() }}
</div>
```

`liveAnnouncement()` = `"Diapositiva ${currentPage()+1} de ${totalItems()}"` — se actualiza con `effect()` al cambiar `currentPage()`.

---

## 5. SCSS

| Cambio | Detalle |
|--------|---------|
| `prefers-reduced-motion` | `@media (prefers-reduced-motion: reduce) { .dcx-carousel-items-wrapper { transition: none; } }` |
| `.dcx-carousel-sr-only` | Clase visually-hidden para la región aria-live |

---

## 6. Test Cases nuevos

- [ ] should have `aria-label` on carousel region equal to `ariaLabel` input
- [ ] should set `aria-pressed="true"` on the active indicator dot
- [ ] should not set `aria-pressed` on inactive dots
- [ ] should set `aria-hidden` on non-current slides
- [ ] should not set `aria-hidden` on current slide
- [ ] should call `prev()` on ArrowLeft keydown
- [ ] should call `next()` on ArrowRight keydown
- [ ] should pause autoplay on mouseenter and resume on mouseleave

---

## 7. Out of Scope

- Touch/swipe support
- Tipado genérico `value: input<T[]>()` (breaking change)
- Animación de entrada/salida per-slide con CSS Keyframes

---

## 8. Implementation Plan

1. **TS** — `ariaLabel` input; `liveAnnouncement` signal con `effect()`; `pauseAutoplay`/`resumeAutoplay`; `onKeydown`; fix `_timer` type
2. **HTML** — `[attr.aria-label]`, `aria-live` region, `[attr.aria-hidden]` slides, `[attr.aria-pressed]` dots, labels en español, handlers de eventos
3. **SCSS** — `prefers-reduced-motion`, `.dcx-carousel-sr-only`
4. **Storybook** — `Atributos`/`Eventos`, stories nuevas
5. **Page demo** — migrar a `demo-page/demo-section`
6. **Design file** — crear `designs/dcx-ng-page-carousel.html`
7. **Tests** — 8 casos nuevos
