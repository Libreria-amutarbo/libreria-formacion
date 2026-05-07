# Stepper Component Spec

## Overview

Crear `DcxNgStepperComponent` inspirado en el comportamiento de `PrimeNG Stepper` (`https://primeng.org/stepper`) y alineado al estilo visual/técnico de la librería (`Signals API`, `OnPush`, tokens SCSS, stories + tests).

El componente debe cubrir navegación por pasos para flujos multi-step (formularios o procesos), con soporte horizontal/vertical, modo lineal y estados de paso (`active`, `completed`, `disabled`, `error`).

## Acceptance Criteria

- [ ] Existe el nuevo componente standalone `dcx-ng-stepper` en `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-stepper/`.
- [ ] Usa `ChangeDetectionStrategy.OnPush` y `Signals API` (`input`, `output`, `signal`, `computed`, `effect`).
- [ ] Soporta orientación `horizontal` y `vertical`.
- [ ] Soporta navegación `linear` (no permite avanzar a pasos no habilitados) y no lineal.
- [ ] Renderiza estados visuales: `default`, `active`, `completed`, `disabled`, `error`.
- [ ] Permite interacción por click y teclado (`Enter`, `Space`, flechas en header).
- [ ] Emite evento de cambio de paso con `prev/current`.
- [ ] Soporta contenido por paso mediante plantilla (`TemplateRef`) sin hardcodear markup.
- [ ] Incluye estilos consistentes con el resto de componentes y basados en tokens CSS de la librería.
- [ ] Incluye tests unitarios (mínimo 80% cobertura del componente).
- [ ] Incluye mock reutilizable en `core/mock` y export en `core/mock/index.ts`.
- [ ] Incluye Storybook (`ClassBased.stories.ts` + `Documentation.mdx`) con al menos 3 stories.

## API

### Selector

- `dcx-ng-stepper`

### Inputs

- `steps: DcxStepperItem[]` (required)
- `activeStepId: string | number` (default: primer step habilitado)
- `orientation: LAYOUT_LIST` (default: `'horizontal'`)
- `linear: boolean` (default: `false`)
- `showStepNumbers: boolean` (default: `true`)
- `size: SIZE_LIST` (default: `'m'`)

### Outputs

- `stepChange: DcxStepperChangeEvent`
- `stepClick: DcxStepperItem`

### Interface propuesta

```ts
export interface DcxStepperItem {
  id: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  completed?: boolean;
  error?: boolean;
  optional?: boolean;
  icon?: string;
  contentTpl?: TemplateRef<unknown>;
}

export interface DcxStepperChangeEvent {
  previousStepId: string | number | null;
  currentStepId: string | number;
  previousIndex: number;
  currentIndex: number;
}
```

## Estados y variantes visuales

- **Orientación**: `horizontal`, `vertical`.
- **Estado de step**:
  - `default`: step disponible no activo.
  - `active`: step actual con énfasis visual.
  - `completed`: step completado (indicador check o estilo de éxito).
  - `disabled`: step no navegable.
  - `error`: step con error de validación.
- **Modo de flujo**:
  - `linear`: solo se puede ir al step actual/siguiente permitido.
  - `non-linear`: navegación libre entre steps habilitados.

## Tokens SCSS a usar

Priorizar tokens existentes de la librería con fallback:

- `--background-primary`, `--background-primary-hover`
- `--content-default`, `--content-subtle`
- `--border-default`
- `--color-primary`
- `--color-surface`
- `--font-family-primary`
- `--border-radius-sm`, `--border-radius-md`, `--border-radius-lg`
- `--shadow-sm`, `--shadow-md`

Compatibilidad legacy/fallback permitida como en otros componentes (`--bg-primary`, `--text-muted`, etc.) cuando aplique.

## Casos de test

- Renderiza todos los headers de `steps`.
- Marca el paso activo inicial correctamente (por `activeStepId` o primer habilitado).
- `stepClick` se emite al hacer click en step habilitado.
- `stepChange` emite `previous/current` correctos.
- En `linear=true`, no permite saltar a un step futuro no habilitado.
- Un step `disabled` no cambia estado ni emite cambio.
- Navegación por teclado funciona (`ArrowRight/ArrowLeft` en horizontal, `ArrowDown/ArrowUp` en vertical, `Enter/Space` para activar).
- Aplica clases de estado (`active/completed/disabled/error`) correctamente.
- Muestra el contenido (`contentTpl`) del step activo.

## Plan de implementación

1. Crear interfaces en `core/interfaces/stepper.ts` y exportarlas en `core/interfaces/index.ts`.
2. Crear componente `dcx-ng-stepper` (`.ts/.html/.scss/.spec.ts`) con lógica de navegación y accesibilidad.
3. Crear mocks en `core/mock/stepper.ts` y exportar en `core/mock/index.ts`.
4. Crear stories en `stories/Stepper/ClassBased.stories.ts` con `Default`, `Linear`, `Interactive`.
5. Crear documentación en `stories/Stepper/Documentation.mdx`.
6. Exportar componente e interfaces en barriles de la librería (`src/index.ts` o equivalentes).
7. Ejecutar pruebas focalizadas del componente y validar lint/build del paquete.
8. Utilizar en la medida de lo posible las interfaces ya hechas en core

## Notas de alcance

- El scope inicial replica comportamiento base tipo PrimeNG Stepper (navegación y estados). No incluye en esta primera iteración animaciones complejas ni validación de formularios interna.
- Si durante implementación se requiere ajustar API, se actualiza este spec antes del cambio.
