# Spec: Popover Refinement

**Status:** Done
**Date:** 2026-07-09
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-popover` es un contenedor-overlay autogestionado. No recibe inputs de datos:
el consumidor coloca contenido vía `<ng-content>` y cablea el disparador con una
referencia de plantilla (`exportAs: 'dcxNgPopover'`), p. ej.
`<dcx-ng-button (buttonClick)="pop.toggle($event)" /> <dcx-ng-popover #pop>…</dcx-ng-popover>`.
Gestiona su apertura/cierre (`toggle`/`show`/`hide`, outputs `opened`/`closed`),
posiciona el panel manualmente con `getBoundingClientRect()` y se cierra con `Escape` o
clic fuera.

El componente funciona, pero **carece por completo de semántica de accesibilidad**: el
panel no tiene `role` ni nombre accesible, no hay gestión de foco (ni entrada al abrir ni
retorno al cerrar), y el disparador no anuncia estado (`aria-expanded`/`aria-haspopup`).
Además hay pequeños bugs (`ignoreNextClick` no se resetea, `setTimeout` sin limpiar),
tipos `any`, CSS muerto en la página demo y Storybook sin categoría `Métodos`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos
| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| C1 | 1.3.1 / 4.1.2 Rol y nombre | El panel `.dcx-popover` no tiene `role` ni `aria-label`/`aria-labelledby`. Un lector de pantalla no lo identifica como overlay. | Añadir `[attr.role]` (input `role`, default `'dialog'`), `[attr.aria-label]`/`[attr.aria-labelledby]` (inputs) y un `id` de instancia en el panel. |
| C2 | 2.4.3 Orden de foco | Al abrir, el foco **no** entra al popover; al cerrar con `Escape` **no** vuelve al disparador. | Al abrir mover el foco al primer elemento focalizable (o al panel con `tabindex="-1"`); al cerrar por teclado/programático devolver el foco al disparador. Inputs `autoFocus`/`returnFocus` para desactivarlo. |
| C3 | 4.1.2 Estado del disparador | El disparador (externo) no expone `aria-expanded`/`aria-haspopup`/`aria-controls`. | Exponer `panelId` público + señal `isOpen` para que el consumidor cablee `[ariaExpanded]="pop.isOpen()"` `[ariaControls]="pop.panelId"` `ariaHaspopup="dialog"`. Añadir input additivo `ariaHaspopup` a `dcx-ng-button` y cablearlo en stories y página demo. |

### 2.2 WCAG AA — Recomendados
| # | Criterio | Descripción |
|---|----------|-------------|
| R1 | 2.4.7 Foco visible | El panel recibe foco programático (`tabindex="-1"`); suprimir su outline al enfocarlo por script (`:focus { outline: none }`) manteniendo el foco visible de los hijos interactivos. |
| R2 | 4.1.2 `aria-hidden` | El contenido ya se elimina del DOM con `@if (isOpen())` (correcto); no se requiere `aria-hidden` adicional. Se documenta como OK. |

### 2.3 Bugs de lógica
| # | Descripción |
|---|-------------|
| B1 | `ignoreNextClick` no se resetea en `hide()`: tras ciertos ciclos abrir/cerrar puede quedar en `true` y "tragarse" el primer clic siguiente. |
| B2 | `setTimeout()` de `calculatePosition()` no se cancela al cerrar/destruir; puede ejecutarse sobre un panel ya oculto. Guardar el id y limpiarlo en `hide()` y en `DestroyRef`. |
| B3 | Al cerrar por **clic fuera** no debe devolverse el foco al disparador (el usuario fue a otro sitio); solo al cerrar por `Escape`/programático. |

### 2.4 Mejoras de UX / coherencia
| # | Descripción |
|---|-------------|
| U1 | Tipos `any` en `toggle(event: any)` y `show(event?: any)` → tipar como `Event`. |
| U2 | Storybook: falta la categoría `Métodos` para `toggle()`/`show()`/`hide()`; el wrapper de historia no cablea `aria-*` en el disparador. |
| U3 | Página demo: usa `page-container`/`demo-section`/`demo-box` en vez del estándar `demo-page`/`demo-page-header`/`demo-section`. Migrar; añadir ejemplo "Interactive"; eliminar clases SCSS muertas (`.popover-content`, `.popover-title`, `.popover-description`). |

---

## 3. API / Interface

Todos los cambios son **additivos**. La API pública actual (`toggle`/`show`/`hide`,
`opened`/`closed`, señales `isOpen`/`top`/`left`/`isPositioned`) se mantiene. `hide()`
gana un parámetro **opcional** sin romper llamadas existentes.

### Inputs (`input()` signals) — nuevos
| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `role` | `string` | `'dialog'` | No | Valor de `role` del panel (`dialog`, `menu`, `tooltip`…). |
| `ariaLabel` | `string` | `''` | No | Nombre accesible del panel (si no hay `ariaLabelledby`). |
| `ariaLabelledby` | `string \| null` | `null` | No | ID del elemento que etiqueta el panel. |
| `autoFocus` | `boolean` | `true` | No | Mueve el foco al panel/primer focalizable al abrir. |
| `returnFocus` | `boolean` | `true` | No | Devuelve el foco al disparador al cerrar por teclado/programático. |

### Public (no inputs)
| Name | Type | Descripción |
|------|------|-------------|
| `panelId` | `string` (readonly) | ID único de instancia del panel, para `aria-controls`. |

### Public Methods
| Method | Signature | Descripción |
|--------|-----------|-------------|
| `toggle` | `(event: Event, targetElement?: HTMLElement) => void` | Alterna apertura. |
| `show` | `(event?: Event, targetElement?: HTMLElement) => void` | Abre y posiciona. |
| `hide` | `(options?: { returnFocus?: boolean }) => void` | Cierra (por defecto devuelve foco). |

### Cambio additivo en `dcx-ng-button` (dependencia)
| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `ariaHaspopup` | `string \| boolean \| null` | `null` | Se refleja como `[attr.aria-haspopup]`. |

---

## 4. Visual States & Variants
- **Closed** — no renderizado (`@if (isOpen())`).
- **Opening** — renderizado con `opacity: 0` hasta posicionar.
- **Open / positioned** — `opacity: 1`, colocado bajo el disparador (o volteado arriba si no hay espacio).
- **Edge-flip** — se ajusta a los bordes derecho/inferior del viewport.

Referencia de diseño: `designs/dcx-ng-page-drawer-popover.html`.

---

## 5. SCSS / Tokens
- Añadir `.dcx-popover:focus { outline: none; }` (foco programático del panel).
- Sin nuevos tokens; se conservan `--bg-default`, `--border-light`, `--r-md`,
  `--shadow-lg`, `--sp-*`, `--fs-*`, `--text-*`.
- Página demo: eliminar clases muertas `.popover-content`, `.popover-title`,
  `.popover-description`.

---

## 6. Accesibilidad (WCAG AA)

**Estructura ARIA:**
```
button (disparador, externo)
  aria-haspopup="dialog"
  [aria-expanded]="pop.isOpen()"
  [aria-controls]="pop.panelId"
div#<panelId>.dcx-popover
  role="dialog" (configurable)
  aria-label | aria-labelledby
  tabindex="-1"
```

**Gestión de foco:**
| Evento | Acción |
|--------|--------|
| Abrir | Foco al primer focalizable del contenido, o al panel (`tabindex="-1"`) si no hay. |
| `Escape` | Cierra y devuelve el foco al disparador. |
| Cierre programático (`hide()`) | Devuelve el foco al disparador (salvo `returnFocus:false`). |
| Clic fuera | Cierra **sin** devolver el foco (el usuario fue a otro sitio). |

**Lector de pantalla:** el panel se anuncia como diálogo con su nombre; el disparador
anuncia estado expandido/colapsado.

---

## 7. Test Cases
- [ ] should create the component
- [ ] **WCAG:** el panel expone `role` (default `dialog`) y `id` = `panelId`
- [ ] **WCAG:** `ariaLabel`/`ariaLabelledby` se reflejan en el panel
- [ ] **WCAG:** al abrir, el foco entra al panel/primer focalizable (`autoFocus`)
- [ ] **WCAG:** al cerrar con `Escape`, el foco vuelve al disparador
- [ ] al cerrar por clic fuera, el foco **no** vuelve al disparador
- [ ] `hide()` resetea `ignoreNextClick`
- [ ] `show()`/`hide()` emiten `opened`/`closed`
- [ ] `toggle()` alterna correctamente
- [ ] `dcx-ng-button`: `ariaHaspopup` se refleja como `aria-haspopup` y es `null` por defecto

---

## 7b. Decisión: componentes de librería vs HTML nativo

**Decisión:** mantener el patrón actual (popover como contenedor + disparador externo con
`dcx-ng-button`). No se adopta CDK Overlay ni se convierte en modal con focus-trap.

Justificación:
- El popover **no es modal**: `Escape` y clic-fuera lo cierran y el resto de la página
  sigue operativa. Un focus-trap completo (ciclado de Tab dentro) es innecesario y
  cambiaría la UX; basta con mover el foco al abrir, `Escape` y retorno de foco (patrón
  APG para popover no modal).
- El disparador lo aporta el consumidor; el popover no puede fijar atributos sobre un
  elemento que no posee, por eso expone `panelId`/`isOpen` y se añade `ariaHaspopup` a
  `dcx-ng-button` (additivo, reutilizable), igual que se hizo con `ariaCurrent`.
- Migrar a CDK Overlay sería un cambio de arquitectura mayor, fuera del alcance de un
  refinamiento.

---

## 8. Out of Scope
- No se adopta CDK Overlay ni focus-trap modal.
- No se cambian los outputs existentes ni las señales de estado.
- No se rediseña la lógica de posicionamiento (solo se limpia el `setTimeout`).
- No se añaden variantes de posición explícitas como input (`top`/`left`/`right`) —
  el posicionamiento sigue siendo automático.

---

## 9. Open Questions
- [ ] ¿`role` por defecto `'dialog'` es correcto para el uso mayoritario? (Alternativa:
  `'menu'` para popovers de acciones, `'tooltip'` para informativos.) Se deja
  configurable; el default recomendado es `dialog`.
- [ ] ¿Se acepta el input additivo `ariaHaspopup` en `dcx-ng-button` (compartido)?

---

## 10. Implementation Plan
1. `dcx-ng-button`: añadir input `ariaHaspopup` + `[attr.aria-haspopup]`; test additivo.
2. Popover TS: inputs `role`/`ariaLabel`/`ariaLabelledby`/`autoFocus`/`returnFocus`;
   `panelId` (contador estático de instancia); tipar `Event`; gestión de foco (entrada al
   abrir, retorno al cerrar por Escape/programático); resetear `ignoreNextClick`; limpiar
   `setTimeout` (guardar id + `DestroyRef`); `hide(options)`.
3. Popover HTML: `id`, `[attr.role]`, `[attr.aria-label]`, `[attr.aria-labelledby]`,
   `tabindex="-1"` en el panel.
4. Popover SCSS: `:focus { outline: none }` en el panel.
5. Popover spec.ts: tests WCAG (rol, id, label, foco entra/retorna) + bugs (ignoreNextClick).
6. Storybook: categoría `Métodos`; cablear `aria-*` y `ariaHaspopup` en el wrapper del
   disparador; descripción de la gestión de foco.
7. Página demo: migrar a `demo-page`/`demo-section`; cablear `aria-*` en los disparadores;
   añadir ejemplo "Interactive"; eliminar SCSS muerto.
8. Verificar: `nx test dcx-ng-lib` para popover y button.
