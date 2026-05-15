# PickList Component Spec

**Status:** Implemented
**Date:** 2026-05-15

## 1. Overview

Crear `DcxNgPickListComponent`, inspirado en `PrimeNG PickList` (`https://primeng.org/picklist`) y adaptado al estilo tecnico de la libreria: componente standalone, `ChangeDetectionStrategy.OnPush`, Signals API, estilos SCSS con tokens y pruebas unitarias.

El componente permite mover y reordenar elementos entre dos listas (`source` y `target`), con seleccion multiple, filtrado opcional, soporte drag/drop basado en Angular CDK y eventos para que el consumidor mantenga el estado controlado.

La implementacion mantiene toda la logica dentro del `.component.ts` porque la libreria no usa actualmente archivos `utils` por componente. Se descarto introducir `dcx-ng-picklist.utils.ts` para respetar el patron existente.

## 2. Acceptance Criteria

- [x] Existe el componente standalone `dcx-ng-picklist` en `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-picklist/`.
- [x] Usa `ChangeDetectionStrategy.OnPush` y Signals API (`input`, `output`, `signal`, `computed`, `effect`).
- [x] Registra los `effect` en `ngOnInit` con `inject(Injector)`, evitando constructor explicito.
- [x] Soporta `source` y `target` como arrays de `DcxPickListItem`.
- [x] Permite seleccionar multiples elementos por lista y deseleccionarlos.
- [x] Permite mover seleccionados a target/source y mover todos a target/source.
- [x] Permite reordenar seleccionados dentro de source/target: arriba, abajo, principio y final.
- [x] Permite filtrar por `filterBy` con placeholders independientes.
- [x] Permite personalizar el contenido de cada opcion con `<ng-template #item>`.
- [x] Emite eventos de movimiento, reordenacion, seleccion y filtrado.
- [x] Emite `sourceChange` y `targetChange` para uso controlado.
- [x] Soporta `dragdrop` con Angular CDK para reordenar dentro de una lista o transferir entre listas.
- [x] Soporta estado `disabled` global y elementos deshabilitados por item.
- [x] Expone roles ARIA de listbox/option y labels accesibles en los controles.
- [x] Incluye estilos consistentes con la libreria y prioriza tokens de `designs/capgemini-tokens.css`.
- [x] Incluye fixtures reutilizables y export en `core/fixtures`.
- [x] Incluye tests unitarios del comportamiento principal.
- [x] Incluye stories de Storybook y pagina demo de la app.
- [x] Exporta el componente desde `libs/dcx-ng-lib/src/index.ts`.

## 3. API

### Selector

- `dcx-ng-picklist`

### Inputs

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `source` | `DcxPickListItem[]` | `[]` | Elementos disponibles. |
| `target` | `DcxPickListItem[]` | `[]` | Elementos seleccionados/destino. |
| `sourceHeader` | `string` | `'Disponibles'` | Cabecera de source. |
| `targetHeader` | `string` | `'Seleccionados'` | Cabecera de target. |
| `filterBy` | `string` | `''` | Campo o campos separados por coma usados para filtrar. Si esta vacio filtra por `label` y `description`. |
| `showSourceFilter` | `boolean` | `false` | Muestra filtro en source. |
| `showTargetFilter` | `boolean` | `false` | Muestra filtro en target. |
| `sourceFilterPlaceholder` | `string` | `'Filtrar disponibles'` | Placeholder del filtro source. |
| `targetFilterPlaceholder` | `string` | `'Filtrar seleccionados'` | Placeholder del filtro target. |
| `scrollHeight` | `string` | `'14rem'` | Alto maximo de cada lista. |
| `dragdrop` | `boolean` | `false` | Activa drag/drop con CDK. |
| `responsive` | `boolean` | `true` | Apila listas y controles en pantallas estrechas. |
| `disabled` | `boolean` | `false` | Deshabilita toda la interaccion. |
| `showSourceControls` | `boolean` | `true` | Muestra controles de reordenacion de source. |
| `showTargetControls` | `boolean` | `true` | Muestra controles de reordenacion de target. |
| `keepSelection` | `boolean` | `false` | Conserva seleccion al transferir elementos. |

### Outputs

- `sourceChange: DcxPickListItem[]`
- `targetChange: DcxPickListItem[]`
- `moveToTarget: DcxPickListMoveEvent`
- `moveAllToTarget: DcxPickListMoveEvent`
- `moveToSource: DcxPickListMoveEvent`
- `moveAllToSource: DcxPickListMoveEvent`
- `sourceReorder: DcxPickListReorderEvent`
- `targetReorder: DcxPickListReorderEvent`
- `sourceSelect: DcxPickListSelectionEvent`
- `targetSelect: DcxPickListSelectionEvent`
- `sourceFilter: DcxPickListFilterEvent`
- `targetFilter: DcxPickListFilterEvent`

### Templates

- `#item`: personaliza cada opcion, con contexto `{ $implicit, item, index, selected, side }`.

### Types

```ts
export interface DcxPickListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface DcxPickListMoveEvent {
  items: DcxPickListItem[];
  source: DcxPickListItem[];
  target: DcxPickListItem[];
}
```

## 4. Accessibility

- Cada lista usa `role="listbox"` y `aria-multiselectable="true"`.
- Cada item usa `role="option"`, `aria-selected` y `aria-disabled`.
- Los botones tienen `aria-label` explicito.
- Soporte inicial de teclado: `Enter`/`Space` alternan seleccion, `ArrowUp`/`ArrowDown` mueven foco, `Home`/`End` van a extremos y `Ctrl+A` selecciona elementos visibles habilitados.

## 5. Implementation Notes

- El template usa listas HTML propias (`ul/li`) en lugar de `DcxNgListComponent`.
- Motivo: `DcxNgListComponent` gestiona seleccion interna, trabaja con `DcxListItem` y no expone hoy puntos naturales para `cdkDropList/cdkDrag`, roles `listbox/option`, seleccion controlada por dos listas ni template de item con contexto `side/selected`.
- El componente soporta explicitamente los escenarios PrimeNG de `Filter` y `Template`:
  - Demo app `/picklist`: ejemplos `Basic`, `Filter` y `Template`.
  - Storybook: stories `Default`, `Filter`, `CustomTemplate` y `Disabled`.
- No se introduce archivo `utils` por componente. Se mantiene el patron actual de la libreria.
- Los estilos del componente priorizan tokens Capgemini (`--bg-*`, `--text-*`, `--border-*`, `--sp-*`, `--r-*`, `--fs-*`, `--fw-*`, `--shadow-*`) con fallbacks locales.

## 6. Validation

- `npx.cmd jest --runTestsByPath src/lib/dcx-ng-components/dcx-ng-picklist/dcx-ng-picklist.component.spec.ts --config jest.config.ts --runInBand`: passing, 9 tests.
- `npx.cmd jest src/app/pages/dcx-ng-page-picklist/dcx-ng-page-picklist.component.spec.ts --config jest.config.app.ts --runInBand`: passing, 1 test.
- `npx.cmd nx build dcx-ng-lib`: passing.
- `npx.cmd nx build dcx-ng-components`: passing.
- `npx.cmd nx lint dcx-ng-lib`: passing con warning existente de dependencia circular Nx/app.

## 7. Out of Scope

- Virtual scroll.
- Plantillas avanzadas para cabeceras, filtros o iconos internos. El template de item si esta incluido.
- Paridad completa con todos los props `ButtonProps` de PrimeNG.
- Seleccion por rango con `Shift` en esta iteracion.
