# Context Menu Design Alignment Spec

## Overview

Alinear `DcxNgContextMenuComponent` con el diseño objetivo de `designs/dcx-ng-page-radio-slider-tooltip-contextmenu-iconfield-grid-datepicker.html` y con los tokens definidos en `designs/capgemini-tokens.css`, para que el menú contextual tenga la misma apariencia visual y comportamiento base (contenedor, items, estados hover/disabled, divisores, jerarquía y z-index).

## Acceptance Criteria

- [ ] El contenedor `.dcx-context-menu` usa estilo equivalente al diseño: fondo, borde, radio, sombra, ancho y overflow.
- [ ] Los items usan layout horizontal con icono, texto y soporte de elemento final (indicador de hijos o atajo cuando aplique).
- [ ] Los estados visuales `hover`, `disabled` y `divider` se ven como en diseño.
- [ ] Los submenús (`children`) mantienen comportamiento actual y estilo consistente con el menú principal.
- [ ] Se corrige cualquier token mal escrito que impida aplicar estilos (p. ej. `--backgrounf-default`).
- [ ] El comportamiento funcional actual se mantiene: `open()`, `close()`, `itemSelected`, `menuClosed`, click fuera para cerrar.
- [ ] Tests unitarios actualizados/pasando para reflejar renderizado y clases esperadas.

## API

### Component API (sin breaking changes)

- **Selector**: `dcx-ng-context-menu`
- **Inputs**:
  - `items: DcxContextMenuItem[]` (required)
  - `position: { x: number; y: number }` (default `{ x: 0, y: 0 }`)
- **Outputs**:
  - `itemSelected: DcxContextMenuItem`
  - `menuClosed: void`

### Data model

Se mantiene `DcxContextMenuItem` actual. No se introducen campos obligatorios nuevos.

## Estados y variantes visuales

- **Default**: menú visible con lista de opciones.
- **Hover item**: fondo de item en hover como diseño.
- **Disabled item**: opacidad reducida y sin interacción.
- **Divider**: línea separadora entre grupos.
- **Nested submenu**: panel lateral con mismo lenguaje visual del menú principal.

## Tokens SCSS a usar

Base principal (Capgemini):

- `--bg-default`
- `--bg-hover`
- `--border-default`
- `--color-error` (si aplica a items destructivos)
- `--text-muted` / `--text-disabled` (si aplica a metadata secundaria/estado disabled)
- `--r-lg` (fallback `8px`)
- `--shadow-lg`
- `--ff-base`

Fallbacks:

- Priorizar tokens Capgemini (`--bg-*`, `--r-*`, `--ff-*`, `--shadow-*`).
- Usar fallback a valor fijo (`#fff`, `8px`, etc.) cuando no exista token.
- Solo se permite compatibilidad legacy en tipografía: `--font-family-primary` como fallback de `--ff-base`.

## Casos de test

- Renderiza el menú solo cuando `isOpen()` es `true`.
- Aplica `top/left` según `position`.
- Renderiza divisores cuando `item.divider === true`.
- Item `disabled` no dispara `action` ni `itemSelected`.
- Item normal dispara `action`, `itemSelected` y cierra menú si no tiene hijos.
- Item con `children` no cierra menú.
- Click en documento cierra menú abierto.
- (Visual DOM) clases esperadas en contenedor/items/divider para estilos de diseño.

## Plan de implementación

1. Ajustar template de `dcx-ng-contextMenu.component.html` para representar estructura visual de menú objetivo.
2. Actualizar estilos en `dcx-ng-contextMenu.component.scss` para igualar el diseño y corregir tokens.
3. Mantener/ajustar lógica mínima en `dcx-ng-contextMenu.component.ts` solo si es necesario para la estructura del template.
4. Actualizar `dcx-ng-contextMenu.component.spec.ts` con verificaciones de estructura/clases relevantes.
5. Ejecutar pruebas del componente y validar que no hay regresiones funcionales.
