# Spec: Drawer Refinement

**Status:** Done
**Date:** 2026-06-09
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-drawer` es un panel lateral/superior/inferior con comportamiento modal opcional. Soporta cierre por máscara, tecla ESC, botón de cierre y control externo de visibilidad. Esta refinación añade `aria-labelledby` al `role="dialog"`, marca la máscara como `aria-hidden`, traduce las categorías de Storybook al español, añade 2 stories (custom header/footer), y reestructura la página demo con las clases `demo-page/demo-section`.

**Referencia de diseño:** `designs/dcx-ng-page-drawer-popover.html`

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 4.1.2 Name, Role, Value | `role="dialog"` en `<aside>` carece de `aria-labelledby` | Generar `drawerTitleId` por instancia; añadir `[attr.aria-labelledby]` cuando hay header de texto |
| 2 | 4.1.2 Name, Role, Value | El `<h3>` del título no tiene `id` | Enlazar con `[id]="drawerTitleId()"` |
| 3 | 1.3.1 Info and Relationships | La máscara (`dcx-drawer-mask`) es un div interactivo sin atributo de accesibilidad | Añadir `aria-hidden="true"` — es un elemento decorativo/de interacción que no debe anunciarse |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 2.4.7 Focus Visible | El botón de cierre usa `dcx-ng-button` con `:focus-visible` ya implementado ✓ |
| 2 | 2.1.1 Keyboard | Escape ya manejado via `_escapeEffect` ✓ |

### 2.3 Bugs de lógica

| # | Descripción |
|---|-------------|
| 1 | `DRAWER_POSITION_DEFAULT = 'right'` en `defaults/drawer.ts:5` pero el input por defecto es `'left'` en `component.ts:29`. Storybook usa los defaults (posición `right`), el componente en solitario va a `left`. Alinear a `'right'` en el input. |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | Storybook: categorías en inglés (`Behavior`, `Appearance`, `Content`, `Events`) → traducir a español (`Atributos`, `Eventos`) |
| 2 | Storybook: añadir story `WithCustomHeader` (proyección `#drawerHeader`) |
| 3 | Storybook: añadir story `WithCustomFooter` (proyección `#drawerFooter`) |
| 4 | Page demo: restructurar con `demo-page/demo-section`; añadir secciones para todas las stories |

---

## 3. API / Interface

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `visible` | `boolean` | `false` | ✓ | Abre/cierra el drawer |
| `position` | `DcxPosition` | `'right'` ← (corregido) | — | Posición del panel |
| `modal` | `boolean` | `true` | — | Muestra máscara de fondo |
| `dismissible` | `boolean` | `true` | — | Cierra al hacer click en la máscara |
| `showCloseIcon` | `boolean` | `true` | — | Muestra el botón de cierre |
| `closeOnEscape` | `boolean` | `true` | — | Cierra al pulsar Escape |
| `blockScroll` | `boolean` | `true` | — | Bloquea el scroll del body |
| `fullScreen` | `boolean` | `false` | — | Ocupa toda la pantalla |
| `size` | `string` | `'22rem'` | — | Ancho (left/right) o alto (top/bottom) |
| `baseZIndex` | `number` | `1000` | — | Z-index base |
| `autoZIndex` | `boolean` | `true` | — | Incrementa z-index automáticamente al abrir |
| `header` | `string` | `''` | — | Texto del título |
| `footer` | `string` | `''` | — | Texto del footer |

Sin cambios de breaking en la API — solo corrección del valor por defecto de `position`.

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `visibleChange` | `boolean` | Solicita cambio de visibilidad (two-way binding) |
| `show` | `void` | Emitido al abrirse |
| `hide` | `void` | Emitido al cerrarse |

### Public Methods

| Method | Signature | Descripción |
|--------|-----------|-------------|
| `close` | `() => void` | Cierra el drawer, emite `visibleChange(false)` y `hide` |

### Computed público (nuevo)

| Signal | Tipo | Descripción |
|--------|------|-------------|
| `drawerTitleId` | `Signal<string>` | ID único del título, para `aria-labelledby`. Solo necesario en la librería internamente. |

---

## 4. Visual States & Variants

- **Cerrado** — `rendered()` es `false`; nada se renderiza en el DOM
- **Abierto** — panel visible con animación de entrada desde la posición configurada
- **Cerrando** — clase `dcx-drawer-root--closing` activa durante 220 ms para la animación de salida
- **Fullscreen** — panel ocupa 100% del viewport
- **Sin modal** — no hay máscara de fondo
- **Con plantillas custom** — `#drawerHeader` y `#drawerFooter` reemplazan el texto plano

Referencia de diseño: `designs/dcx-ng-page-drawer-popover.html`

---

## 5. SCSS / Tokens

Sin cambios en SCSS del componente. Los tokens ya usados son correctos.

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA tras la refinación

```
<aside role="dialog" aria-modal="true" aria-labelledby="dcx-drawer-1-title">
  <header>
    <h3 id="dcx-drawer-1-title">Título del drawer</h3>
    <button aria-label="Cerrar drawer">...</button>
  </header>
  <div class="dcx-drawer__content">...</div>
  <footer>...</footer>
</aside>
<div class="dcx-drawer-mask" aria-hidden="true"></div>   <!-- nueva -->
```

### Interacción de teclado

| Tecla | Acción |
|-------|--------|
| `Escape` | Cierra el drawer (si `closeOnEscape=true`) |
| `Tab` | Navega entre elementos focusables del drawer |
| `Enter` / `Space` | Activa el botón de cierre cuando está enfocado |

### Notas para lectores de pantalla

- Al abrir el drawer, el foco debería moverse al interior — esto es responsabilidad del consumidor.
- `aria-labelledby` permite que el lector anuncie el título al entrar en el diálogo.
- `aria-modal="true"` indica que el contenido fuera del drawer es inerte (implementación en el navegador/AT).
- La máscara con `aria-hidden="true"` no se anuncia.

---

## 7. Test Cases

- [x] should create the component
- [x] should render drawer root when visible is true
- [x] should not render mask when modal is false
- [x] should emit visibleChange(false) when mask is clicked and dismissible is true
- [x] should use exact baseZIndex when autoZIndex is false
- [x] should increment zIndex over base when autoZIndex is true and visible
- [x] should render footer when footer input has content
- [x] should prioritize drawerFooter template over footer input text
- [x] WCAG — should render aria-labelledby pointing to drawerTitleId when header is set
- [x] WCAG — should NOT render aria-labelledby when header is empty
- [x] WCAG — should render [id] on h3 matching the aria-labelledby value
- [x] WCAG — should render aria-hidden="true" on mask
- [x] should default position to "right"

---

## 7b. Decisión: ID de instancia

Se genera el ID de título via un contador estático de instancias privado (`_instanceCount`) dentro de la clase, en un `signal()` inicializado en el constructor lógico del componente. Esto es equivalente al patrón del `dcx-ng-dialog` (que usa `dialogId` externo), pero sin requerir un servicio externo porque el drawer no gestiona múltiples instancias sincronizadas.

```typescript
private static _instanceCount = 0;
readonly drawerId = signal(`dcx-drawer-${++DcxNgDrawerComponent._instanceCount}`);
readonly drawerTitleId = computed(() => `${this.drawerId()}-title`);
```

---

## 8. Out of Scope

- Focus trap / gestión de foco al abrir: responsabilidad del consumidor
- Animaciones: ya existentes, no se modifican
- `_escapeEffect`: ya correctamente implementado con cleanup
- `_blockScrollEffect`: ya correctamente implementado
- `globalZIndex` estático: patrón aceptable, no se refactoriza
- `wasVisible` / `hideAlreadyEmitted`: lógica compleja de emit deduplication, no se refactoriza

---

## 9. Open Questions

_(ninguna)_

---

## 10. Implementation Plan

1. **Component TS** — añadir `_instanceCount`, `drawerId`, `drawerTitleId`; corregir `position` default a `'right'`
2. **Component HTML** — añadir `[attr.aria-labelledby]` en `<aside>`; añadir `[id]` en `<h3>`; añadir `aria-hidden="true"` en la máscara
3. **Defaults** — ya tiene `DRAWER_POSITION_DEFAULT = 'right'`; solo alinear el input del componente
4. **Spec.ts** — añadir bloque `describe('WCAG AA')` con 4 tests nuevos; añadir test de default position
5. **Storybook** — traducir categorías a `Atributos` / `Eventos`; añadir stories `WithCustomHeader` y `WithCustomFooter`
6. **Page demo HTML** — restructurar con `demo-page/demo-section`; 11 secciones (una por story)
7. **Page demo SCSS** — limpiar a comentario estándar + helpers mínimos
8. **Verificar tests** — `npx nx test dcx-ng-lib --testFile=...dcx-ng-drawer.component.spec.ts --no-coverage`
