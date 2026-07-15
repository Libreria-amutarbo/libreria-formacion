# Spec: PickList Refinement

**Status:** Done
**Date:** 2026-07-08
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-picklist` es un componente de transferencia (transfer list / dual listbox):
dos listas (origen "Disponibles" y destino "Seleccionados") con botones para mover
elementos entre ellas, reordenar, filtrar y arrastrar/soltar (CDK). Se apoya en
`dcx-ng-list` (renderiza cada `<ul role="listbox">`), `dcx-ng-input` (filtros) y
`dcx-ng-button` (controles).

El componente ya está **muy avanzado**: `OnPush`, señales, `effect()` con `untracked()`,
navegación por teclado (flechas, Home/End, Enter/Espacio, Ctrl+A), `aria-labelledby`
en paneles, `aria-label` en todos los botones de icono, `aria-hidden` en iconos
decorativos, foco visible e IDs por instancia (sin contador global mutable en módulo).

Este refinamiento cierra huecos concretos de accesibilidad (semántica de `listbox`),
elimina CSS muerto, completa la documentación de Storybook y alinea la página demo con
el estándar `demo-page`/`demo-section`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos
| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| C1 | 4.1.2 `aria-multiselectable` | Ambas listas son `role="listbox"` con selección múltiple, pero no declaran `aria-multiselectable="true"`. Un listbox sin este atributo se anuncia como selección simple. | Añadir input additivo `multiselectable` a `dcx-ng-list` → `[attr.aria-multiselectable]` en el `<ul>`; el picklist lo pone a `true`. |
| C2 | 4.1.2 `aria-selected` en el elemento correcto | El estado de selección se pone con `[attr.aria-selected]` en un `<div>` **sin rol** (wrapper interno, `html:242`). El elemento con `role="option"` es el `<li>` de `dcx-ng-list`, que en modo `externalSelection` fija `aria-selected` a `null` (`list.html:27-29`). Resultado: la opción **nunca anuncia** su estado seleccionado. | Añadir input additivo `isItemSelected` (predicado) a `dcx-ng-list` para que el `<li role="option">` refleje `aria-selected` en modo externo; el picklist pasa un predicado por lado y **elimina** el `aria-selected`/`aria-disabled` redundantes del wrapper. |

### 2.2 WCAG AA — Recomendados
| # | Criterio | Descripción |
|---|----------|-------------|
| R1 | 1.3.1 / 3.3.x Estado vacío | La clase `.dcx-picklist__empty` está definida en SCSS pero **no se usa** en el template. Al filtrar sin resultados o con lista vacía no hay mensaje. Mostrar un texto de estado vacío por panel. |
| R2 | 4.1.2 Filtros | Los `<dcx-ng-input>` de filtro reciben `[ariaLabel]`. Se mantiene (verificado correcto), sin cambios. |

### 2.3 Bugs de lógica
| # | Descripción |
|---|-------------|
| B1 | **Doble elemento focalizable por ítem** (fuera de scope de arreglo profundo, ver §9). El `<li role="option">` de `dcx-ng-list` recibe `tabindex="0"` (`list.html:25`) y, además, el wrapper interno del picklist recibe su propio `tabindex` roving (`html:244`). Conviven dos modelos de teclado (el de "lista" del `<li>` y el de "listbox" del wrapper), generando paradas de tabulación duplicadas. Se documenta; el rediseño del modelo de foco se propone como seguimiento por su riesgo. |

### 2.4 Mejoras de UX / coherencia
| # | Descripción |
|---|-------------|
| U1 | SCSS: `.dcx-picklist__visually-hidden` (`scss:191-200`) está definido pero no se usa → eliminar. `.dcx-picklist__empty` pasa a usarse (R1). |
| U2 | Storybook: `argTypes` solo documenta 4 inputs y 4 eventos de ~16 inputs y ~12 eventos. Faltan `sourceHeader`, `targetHeader`, `showSourceFilter`, `showTargetFilter`, `sourceFilterPlaceholder`, `targetFilterPlaceholder`, `scrollHeight`, `responsive`, `disabled`, `showSourceControls`, `showTargetControls`, `keepSelection` y los eventos `moveAllTo*`, `*Reorder`, `*Select`, `*Filter`. Completar con `name`/`type`/`defaultValue` y firmas `(e: T) => void`. |
| U3 | Storybook: faltan stories para variantes relevantes: controles ocultos (`showSourceControls`/`showTargetControls`) y sin `dragdrop`. Añadir al menos una (`WithoutControls`). |
| U4 | Página demo: usa `<section>` + `h2.example-title` + `<dcx-ng-divider>`, no el estándar `demo-page`/`demo-section`. Migrar y cubrir más ejemplos (básico, filtros, template, deshabilitado, ítem deshabilitado). |

---

## 3. API / Interface

Sin cambios en las interfaces de datos ni en la API pública del picklist. Los cambios
son **additivos** en `dcx-ng-list` (componente compartido) y no rompen usos existentes.

### Cambios additivos en `dcx-ng-list`
| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `multiselectable` | `boolean \| null` | `null` | Se refleja como `[attr.aria-multiselectable]` en el `<ul>`. |
| `isItemSelected` | `((item: T, index: number) => boolean) \| null` | `null` | Predicado para exponer `aria-selected` en el `<li role="option">` cuando la selección es externa. |

### Picklist — sin cambios de API
Se añaden dos campos privados (predicados de selección por lado) para pasarlos a
`dcx-ng-list`. No se añaden inputs/outputs nuevos ni se cambian firmas.

---

## 4. Visual States & Variants
- **Default** — origen con elementos, destino vacío o con algunos.
- **With filters** (`showSourceFilter`/`showTargetFilter`) — inputs de búsqueda.
- **Drag & drop** (`dragdrop`) — reordenar y transferir arrastrando.
- **Custom template** (`#item`) — plantilla de ítem propia.
- **Disabled** — todo el componente inerte (`opacity` + botones nativos deshabilitados).
- **Item disabled** — ítems individuales no seleccionables.
- **Without controls** (`showSourceControls`/`showTargetControls` false).
- **Empty** — panel sin elementos (mensaje nuevo).

Referencia de diseño: no se ha localizado fichero en `designs/*picklist*`.

---

## 5. SCSS / Tokens
- Eliminar regla muerta `.dcx-picklist__visually-hidden`.
- Mantener `.dcx-picklist__empty` (ahora en uso).
- Sin nuevos tokens. Se conservan las variables locales `--dcx-picklist-*`.
- El `::ng-deep` para dimensionar `.dcx-picklist__control-button .dcx-ng-button`
  se mantiene (acoplamiento aceptado; su reemplazo queda fuera de scope).

---

## 6. Accesibilidad (WCAG AA)

**Estructura ARIA (por panel):**
```
section[aria-labelledby=<heading-id>]
  header > h3#<heading-id>
  ul[role="listbox", aria-multiselectable="true", aria-label]
    li[role="option", aria-selected=<bool>, aria-disabled?]
```

**Cambios clave:**
- `aria-multiselectable="true"` en cada listbox.
- `aria-selected` pasa a residir en el `<li role="option">` (elemento correcto), no en
  un `<div>` sin rol.

**Teclado (sin cambios funcionales):** flechas ↑/↓ mueven el foco, Home/End saltan a
extremos, Enter/Espacio seleccionan, Ctrl+A selecciona todo lo visible; botones de
mover/reordenar operables por Tab + Enter/Espacio.

---

## 7. Test Cases
- [ ] should create the component
- [ ] **WCAG:** cada listbox tiene `aria-multiselectable="true"`
- [ ] **WCAG:** el `<li role="option">` seleccionado expone `aria-selected="true"`
- [ ] **WCAG:** el wrapper interno ya no duplica `aria-selected`
- [ ] muestra mensaje de estado vacío cuando el panel no tiene elementos
- [ ] muestra estado vacío al filtrar sin resultados
- [ ] `dcx-ng-list`: `multiselectable` se refleja como `aria-multiselectable` y es `null` por defecto
- [ ] `dcx-ng-list`: `isItemSelected` controla `aria-selected` del `<li>` en modo externo
- [ ] (regresión) mover/seleccionar/filtrar siguen emitiendo sus eventos

---

## 7b. Decisión: componentes de librería vs HTML nativo

**Decisión: mantener la composición con `dcx-ng-list` / `dcx-ng-button` / `dcx-ng-input`.**

Justificación:
- El picklist está diseñado como orquestador de componentes de librería; reescribir las
  listas a `<ul>` nativos duplicaría el renderizado, el drag&drop y el estilo.
- Las carencias WCAG (`aria-multiselectable`, `aria-selected` en la opción) se resuelven
  con **inputs additivos** en `dcx-ng-list`, igual que se hizo con `dcx-ng-button`
  (`ariaCurrent`). Es coherente, contenido y reutilizable por otros consumidores del list.
- Los botones ya usan `dcx-ng-button` con `ariaLabel` + `disabled` nativo (correcto).

---

## 8. Out of Scope
- No se cambia el modelo de foco de doble capa (B1) — ver §9.
- No se eliminan los `::ng-deep` de dimensionado del botón.
- No se externalizan los textos en español del TS (labels de reorder/mover).
- No se cambia la interfaz `DcxPickListItem` ni los eventos.
- No se toca la lógica de drag&drop (CDK).

---

## 9. Open Questions
- [ ] **Modelo de foco (B1):** el arreglo correcto (un único elemento focalizable
  `role="option"` con roving tabindex gestionado por `dcx-ng-list`) implica un cambio de
  contrato en el list compartido y en la navegación por teclado del picklist. ¿Se aborda
  ahora (mayor riesgo/alcance) o se deja como seguimiento? **Recomendación:** seguimiento
  en spec propia; este refinamiento entrega las mejoras de bajo riesgo.
- [ ] ¿Se aceptan los inputs additivos `multiselectable` e `isItemSelected` en
  `dcx-ng-list` (componente compartido)?

---

## 10. Implementation Plan
1. `dcx-ng-list`: añadir inputs `multiselectable` e `isItemSelected`; reflejar
   `aria-multiselectable` en `<ul>` y `aria-selected` en `<li>`; reenviar a la lista
   anidada; tests additivos.
2. Picklist TS: añadir predicados de selección por lado (`sourceSelectedPredicate`,
   `targetSelectedPredicate`).
3. Picklist HTML: pasar `[multiselectable]="true"` e `[isItemSelected]` a ambas listas;
   eliminar `aria-selected`/`aria-disabled` del wrapper; añadir bloque de estado vacío.
4. Picklist SCSS: eliminar `.dcx-picklist__visually-hidden`.
5. Picklist spec.ts: tests WCAG (multiselectable, aria-selected en `<li>`) + estado vacío.
6. Storybook: completar `argTypes` (todos los inputs/eventos) + story `WithoutControls`.
7. Página demo: migrar a `demo-page`/`demo-section` con ejemplos numerados; limpiar SCSS.
8. Verificar: `nx test dcx-ng-lib` para picklist y list.
