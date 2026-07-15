# Spec: Full Table — Reconstrucción (`dcx-ng-table`)

**Status:** Done
**Date:** 2026-07-14
**Author:** Claude Code

**Decisiones tras revisión (aprobado):**
- Se mantiene el modo "menú de acciones" (dropdown) además del modo inline.
- **No se deja fuera nada de la sección 2.3** — filtro por columna, edición inline, columnas frozen y columna de índice se migran también al componente nuevo, para que sea funcionalmente más completo que el actual, no un subconjunto.
- Nombre confirmado: `dcx-ng-table`.

---

## 1. Overview

`dcx-ng-full-table` es, con diferencia, el componente más grande y complejo de la librería (~1.700 líneas repartidas en 10 archivos) y su arquitectura no se parece a la de ningún otro componente ya refinado esta sesión. Además, buena parte de su superficie no coincide con lo que pide `designs/dcx-ng-page-full-table-paginator-list.html`.

Se construye un componente nuevo, **`dcx-ng-table`**, desde cero, con arquitectura plana (todo el estado en signals/computed dentro de la propia clase, sin servicios inyectados ni clases auxiliares) para que cualquier perfil pueda leerlo de arriba a abajo sin saltar entre 6 archivos. `dcx-ng-full-table` **no se toca ni se borra** en esta fase: convive con el nuevo hasta que se apruebe visualmente, y se retira en un paso posterior.

---

## 2. Problemas detectados

### 2.1 Complejidad / mantenibilidad del componente actual

| # | Problema | Impacto |
|---|---|---|
| 1 | Lógica repartida en 6 archivos/conceptos: componente, directiva de templates, sub-componente paginador propio, 2 servicios (`TableComparatorService`, `TableDataPipelineService`) y una clase `TableState` instanciada a mano en el constructor | Nadie puede ver "dónde vive el ordenado" sin saltar entre 4-5 archivos |
| 2 | Patrón "servicio inyectado + clase de estado externa" — no se usa en ningún otro componente de la librería (todos usan signals/computed directos en la clase) | Rompe la convención que ya conoces del resto de componentes refinados |
| 3 | Página demo (`dcx-ng-page-full-table`) usa `<section><h2>` en vez de `.demo-page`/`.demo-section` como el resto de páginas ya refinadas | Inconsistencia visual y de código en el catálogo |
| 4 | `cellType: 'badge'` está declarado en `DcxHeaderData`/`DcxCellType` pero `getCellTemplate()` nunca lo gestiona — cae al template por defecto | Funcionalidad "fantasma": está en el tipo pero no funciona |
| 5 | Existe ya un `dcx-ng-paginator` standalone, totalmente refinado (`specs/paginator-refinement`, Status: Done) con truncado por elipsis — pero la tabla usa su propio `dcx-ng-table-paginator`, una reimplementación distinta que además **no trunca** (pinta un botón por cada página, sin límite) | Dos paginadores distintos en la misma librería; el de la tabla no escala con muchas páginas y no coincide con el mock |

### 2.2 Funcionalidades del mock no soportadas hoy

| # | Funcionalidad | Nota |
|---|---|---|
| 1 | Selección de filas: checkbox "seleccionar todo" en cabecera + checkbox por fila + fila resaltada en azul claro si está seleccionada | No existe ningún input/estado de selección |
| 2 | Toolbar de tabla: título + buscador + botones de acción (p.ej. "Exportar", "Nuevo proyecto") | No existe ningún slot/input para esto |
| 3 | Celda tipo badge con color por estado (verde/amarillo/azul/rojo/gris) | Declarado pero no implementado (ver 2.1.4) |
| 4 | Celda tipo "usuario" (avatar circular de iniciales + nombre) | Hoy solo posible vía template custom, sin soporte de primera clase |
| 5 | Paginación numerada con elipsis ("1 2 3 … 12") | Ver 2.1.5 — se resuelve reutilizando `dcx-ng-paginator` |

### 2.3 Funcionalidades actuales que no están en el mock (se mantienen igualmente)

| # | Funcionalidad | Nota |
|---|---|---|
| 1 | Filtro de texto por columna (input bajo cada cabecera) | No aparece en el mock, pero se mantiene junto al buscador global de la toolbar |
| 2 | Edición inline de celda (doble-click) | Se mantiene igual que hoy |
| 3 | Columnas frozen (izquierda/derecha) con separadores | Se mantiene igual que hoy |
| 4 | Columna de índice de fila (`showRowIndex`) | Se mantiene como columna adicional; convive con la columna de selección (son cosas distintas: índice = posición, checkbox = selección) |

**Decisión (aprobada):** no se quita nada — el componente nuevo debe ser un superset del actual, con arquitectura más simple pero sin perder funcionalidades.

---

## 3. Arquitectura propuesta

```
dcx-ng-table/                                    (nombre nuevo — convive con dcx-ng-full-table)
├── dcx-ng-table.component.ts                    — TODO el estado (signals/computed) en la propia clase
├── dcx-ng-table.component.html
├── dcx-ng-table.component.scss
├── dcx-ng-table.component.spec.ts
├── dcx-ng-table-template.directive.ts           — se mantiene (proyección de templates custom por columna); es sencilla y ya funciona bien
└── table.utils.ts                                — funciones puras de sort/paginate/filtro-global (sin @Injectable, sin DI — se testean llamándolas directamente)
```

Reutiliza:
- **`dcx-ng-paginator`** (ya existente, Done, con truncado por elipsis) en vez de reimplementar un paginador propio.
- **`dcx-ng-icon`**, **`dcx-ng-button`** como el resto de componentes.

No lleva: servicios inyectables, clases de estado externas, sub-componente de paginador propio.

Todo el pipeline de datos (búsqueda global → ordenado → paginado) se expresa como una cadena de `computed()` en el propio componente, igual que en `dcx-ng-select` o `dcx-ng-accordion`:

```
rows → filteredRows (computed, usa searchTerm) → sortedRows (computed, usa sort) → pageRows (computed, usa dcx-ng-paginator)
```

---

## 4. API

### Inputs

| Nombre | Tipo | Default | Notas |
|---|---|---|---|
| `headers` | `DcxTableHeader[]` | requerido | |
| `rows` | `DcxTableRow[]` | requerido | |
| `tableTitle` | `string` | `''` | Si tiene valor, se muestra la toolbar con el título |
| `searchable` | `boolean` | `false` | Muestra el buscador en la toolbar; busca en todas las columnas marcadas `searchable` (o todas si ninguna lo especifica) |
| `searchPlaceholder` | `string` | `'Buscar...'` | |
| `selectable` | `boolean` | `false` | Activa la columna de checkboxes |
| `selectedIds` | `(string \| number)[]` | `[]` | Filas seleccionadas, controlado desde fuera (patrón igual a otros inputs controlados de la librería) |
| `showGrid` | `boolean` | `false` | igual que hoy |
| `showStripped` | `boolean` | `false` | igual que hoy |
| `paginator` | `boolean` | `false` | igual que hoy |
| `rowsPerPage` | `number` | `10` | igual que hoy |
| `rowsPerPageOptions` | `number[]` | `[5, 10, 20]` | igual que hoy |

### Outputs

| Nombre | Payload | Notas |
|---|---|---|
| `sortChange` | `DcxSort` | igual que hoy |
| `pageChange` | `number` | igual que hoy |
| `rowsPerPageChange` | `number` | igual que hoy |
| `rowAction` | `DcxActionEvent` | igual que hoy |
| `searchChange` | `string` | nuevo |
| `selectionChange` | `(string \| number)[]` | nuevo |

### Proyección de contenido

- `<ng-content select="[table-toolbar-actions]">` — para los botones de la toolbar (p.ej. "Exportar", "Nuevo proyecto"), que son contenido específico de cada página y no deben quedar hardcodeados en el componente de librería.

### Cell types

- `text`, `number`, `date` — igual que hoy
- `badge` — **implementado de verdad** esta vez, usando `DcxBadgeConfig` (`variantMap`/`labelMap`) que ya existe en la interfaz pero nunca se usaba
- `user` — **nuevo**: avatar circular de iniciales + nombre, tal cual el mock
- `actions` — se mantienen los dos modos actuales: `inline` (iconos sueltos, como el mock) y `menu` (dropdown de 3 puntos)

---

## 5. Diseño visual

Tomado literalmente de `designs/dcx-ng-page-full-table-paginator-list.html`:
- Card contenedora: borde 1px + `border-radius: 8px`, overflow hidden
- Toolbar: padding `12px 16px`, borde inferior, título a la izquierda, buscador + botones a la derecha
- Cabecera: fondo gris claro, texto 11px mayúsculas con letter-spacing, cursor pointer + icono de ordenación con opacidad baja (activo: color primario + icono opaco)
- Filas: hover gris claro, fila seleccionada en azul muy claro (`#eff6ff`)
- Badges: 5 variantes de color (verde/amarillo/azul/rojo/gris), pill, 11px
- Avatar: círculo 28px con iniciales, fondo azul claro
- Acciones de fila: iconos ghost 28×28, hover gris claro
- Paginador: igual que `dcx-ng-paginator` ya construido (reutilizado tal cual)

---

## 6. Accesibilidad (WCAG AA)

- Checkbox "seleccionar todo": `aria-label`, estado `indeterminate` real en el DOM cuando hay selección parcial (no solo visual)
- Checkbox de fila: `aria-label` describiendo la fila (p.ej. "Seleccionar fila: Cloud Migration")
- Fila seleccionada: no solo color — se añade `aria-selected="true"` en la fila
- `role="region"` + región `aria-live` para anunciar cambios de ordenación/búsqueda (se mantiene el patrón que ya usa el componente actual)
- Cabeceras ordenables: `aria-sort`, `tabindex="0"`, activables con Enter/Espacio (se mantiene igual que hoy)
- Buscador: `<label>`/`aria-label` visible o accesible
- Menú de acciones (si se mantiene): `aria-haspopup`, `aria-expanded`, cierre con Escape y click fuera

---

## 7. Test cases

- [ ] Crea el componente con headers/rows requeridos
- [ ] Renderiza badge con el color/label correcto según `variantMap`/`labelMap`
- [ ] Renderiza celda `user` con iniciales calculadas a partir del nombre
- [ ] Ordena al pulsar cabecera sortable y cicla asc → desc → sin orden
- [ ] `aria-sort` refleja el estado de ordenación
- [ ] Buscador filtra filas y resetea a la página 1
- [ ] Selección: marcar una fila emite `selectionChange` con el id incluido; desmarcar lo quita
- [ ] "Seleccionar todo" selecciona/deselecciona todas las filas visibles; queda `indeterminate` si la selección es parcial
- [ ] Fila seleccionada tiene `aria-selected="true"` y la clase visual correspondiente
- [ ] Paginación delega correctamente en `dcx-ng-paginator` (cambia de página, cambia rowsPerPage)
- [ ] `rowAction` se emite con el id de acción, la fila y el índice correctos
- [ ] Tabla vacía muestra el estado "sin datos"

---

## 7b. Decisión: componentes de librería vs HTML nativo

- Checkboxes de selección: `<input type="checkbox">` nativo (no hay componente `dcx-ng-checkbox` reutilizable pensado para celdas de tabla; se estiliza directamente, igual que hace el mock)
- Buscador: `<input type="text">` nativo con icono, igual que el mock (no es un `dcx-ng-input` completo porque no necesita validación/label flotante)
- Paginación: se reutiliza `dcx-ng-paginator` (componente de librería ya existente)
- Botones de acción de fila y de la toolbar: `dcx-ng-button` / `dcx-ng-icon`, igual que el resto de la librería

---

## 8. Out of Scope

- Migrar `dcx-ng-page-full-table` (página demo real) para que use el componente nuevo, y borrar `dcx-ng-full-table` — se hace en un paso posterior, una vez apruebes el resultado visual
- El componente `List` (`.dcx-list`) que aparece en el mismo archivo de diseño — no se ha pedido, queda fuera de este spec

---

## 9. Open questions

Resueltas — ver "Decisiones tras revisión" al principio del documento.

---

## 10. Implementation plan

1. Extender `core/interfaces/table.ts` con lo necesario para selección/toolbar/búsqueda (reutilizando lo que ya sirve: `DcxBadgeConfig`, `DcxActionItem`, etc.)
2. Fixtures nuevas alineadas al mock (proyectos/clientes con estado, responsable, fecha) en `core/fixtures/` — o reutilizar las existentes si encajan razonablemente
3. `dcx-ng-table.component.ts/html/scss` completo, con selección, toolbar, búsqueda, badge y user cell types, reutilizando `dcx-ng-paginator`
4. `dcx-ng-table-template.directive.ts` (mismo patrón que hoy)
5. Tests unitarios (`dcx-ng-table.component.spec.ts`)
6. Storybook stories (`ClassBased.stories.ts`, argTypes en español, patrón ya establecido)
7. Página demo nueva en paralelo, `dcx-ng-page-table`, siguiendo `.demo-page`/`.demo-section`
8. Verificación: tests, lint, `nx build-storybook`
9. Cierre: reporto lo construido y quedo a la espera de que confirmes visualmente en Storybook antes de tocar `dcx-ng-full-table`
