# Skeleton Component Spec

**Status:** Approved  
**Date:** 2026-05-12  
**Author:** GitHub Copilot

---

## 1. Overview

Crear `DcxNgSkeletonComponent`, un placeholder visual inspirado en `PrimeNG Skeleton` (`https://primeng.org/skeleton`) para representar contenido en carga sin introducir elementos interactivos.

El componente debe cubrir los casos base de PrimeNG:

- rectángulo por defecto
- formas circulares
- tamaño configurable con `width`, `height` o `size`
- radio configurable con `borderRadius`
- animación `wave` o sin animación

La implementación debe respetar las convenciones del proyecto: Angular standalone, `ChangeDetectionStrategy.OnPush`, Signals API, arrow functions, early return cuando aplique, templates con control flow moderno si fuera necesario, estilos basados en `capgemini-tokens.css` y tokens SCSS existentes.

---

## 2. Acceptance Criteria

- [ ] Existe el nuevo componente standalone `dcx-ng-skeleton` en `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-skeleton/`.
- [ ] Usa `ChangeDetectionStrategy.OnPush` y Signals API (`input()`, `computed()`).
- [ ] Renderiza un placeholder rectangular por defecto con `width: 100%` y `height: 1rem`.
- [ ] Soporta `shape="rectangle"` y `shape="circle"`.
- [ ] Soporta `width`, `height`, `size`, `borderRadius` y `animation`.
- [ ] `size` aplica ancho y alto cuando se usa en cuadrados o círculos.
- [ ] `shape="circle"` fuerza radio circular sin depender de `borderRadius`.
- [ ] `animation="wave"` activa shimmer/wave; `animation="none"` desactiva la animación.
- [ ] El componente usa `aria-hidden="true"` por defecto y no incluye elementos interactivos.
- [ ] Consumidores pueden añadir clases al selector Angular sin requerir un input específico de clase.
- [ ] Incluye estilos consistentes con la librería y basados en tokens de `designs/capgemini-tokens.css`.
- [ ] Incluye interfaces/tipos reutilizables exportados desde `core/interfaces`.
- [ ] Incluye tests unitarios del componente.
- [ ] Incluye Storybook (`ClassBased.stories.ts` + `Documentation.mdx`) con al menos 3 stories.
- [ ] Exporta el componente desde `libs/dcx-ng-lib/src/index.ts`.

---

## 3. API / Interface

### Selector

- `dcx-ng-skeleton`

### Inputs

| Name           | Type                   | Default       | Required | Description                                                               |
| -------------- | ---------------------- | ------------- | -------- | ------------------------------------------------------------------------- |
| `shape`        | `DcxSkeletonShape`     | `'rectangle'` | No       | Forma visual del placeholder.                                             |
| `width`        | `string`               | `'100%'`      | No       | Ancho CSS para rectángulos.                                               |
| `height`       | `string`               | `'1rem'`      | No       | Alto CSS para rectángulos.                                                |
| `size`         | `string \| null`       | `null`        | No       | Tamaño único para ancho y alto; tiene prioridad sobre `width` y `height`. |
| `borderRadius` | `string \| null`       | `null`        | No       | Radio CSS del rectángulo; si no se informa usa token por defecto.         |
| `animation`    | `DcxSkeletonAnimation` | `'wave'`      | No       | Tipo de animación: `wave` o `none`.                                       |

### Outputs

Sin outputs. El Skeleton es decorativo y no interactivo.

### Tipos propuestos

```ts
export type DcxSkeletonShape = 'rectangle' | 'circle';

export type DcxSkeletonAnimation = 'wave' | 'none';
```

---

## 4. Visual States & Variants

- **Rectangle**: forma por defecto, `width: 100%`, `height: 1rem`, radio por token.
- **Rounded rectangle**: rectángulo con `borderRadius` custom, por ejemplo `16px`.
- **Square**: usando `size`, por ejemplo `size="3rem"`.
- **Circle**: usando `shape="circle"` y `size`, por ejemplo `size="3rem"`.
- **No animation**: usando `animation="none"`.

---

## 5. SCSS / Tokens

Priorizar tokens de `designs/capgemini-tokens.css` y mantener fallbacks seguros:

- `--bg-surface`
- `--bg-hover`
- `--bg-pressed`
- `--bg-default`
- `--r-sm`
- `--r-md`
- `--r-pill`
- `--sp-*` cuando sea necesario en stories o ejemplos compuestos

Tokens/component vars propuestos en SCSS:

```scss
--dcx-skeleton-background: var(--bg-surface, #f4f5f7);
--dcx-skeleton-highlight: var(--bg-default, #ffffff);
--dcx-skeleton-radius: var(--r-md, 6px);
```

No se crean nuevos tokens globales en esta iteración salvo que la implementación revele una necesidad real.

---

## 6. Accessibility

- El host debe exponer `aria-hidden="true"` por defecto, igual que PrimeNG, para evitar ruido en lectores de pantalla.
- El componente no tendrá foco ni handlers de teclado.
- Si varios skeletons representan una zona en carga, la responsabilidad de añadir `aria-busy="true"` queda en el contenedor consumidor.

---

## 7. Test Cases

- [ ] Crea el componente correctamente.
- [ ] Renderiza clases base y `shape="rectangle"` por defecto.
- [ ] Aplica `width` y `height` cuando no hay `size`.
- [ ] Aplica `size` como ancho y alto prioritario.
- [ ] Aplica clase/estado circular con `shape="circle"`.
- [ ] Aplica `borderRadius` custom en la variable CSS correspondiente.
- [ ] Activa clase de animación para `animation="wave"`.
- [ ] Desactiva clase de animación para `animation="none"`.
- [ ] Define `aria-hidden="true"` en el host.

---

## 8. Storybook

Crear stories en `libs/dcx-ng-lib/src/lib/stories/Skeleton/ClassBased.stories.ts`:

- `Default`: rectángulo básico con controles.
- `Shapes`: rectángulo, rounded, square y circle.
- `CardPlaceholder`: composición tipo tarjeta usando varios `dcx-ng-skeleton`.
- `ListPlaceholder`: composición tipo lista usando avatar circular y líneas.
- `NoAnimation`: variante sin animación.

Crear documentación en `libs/dcx-ng-lib/src/lib/stories/Skeleton/Documentation.mdx` con API, accesibilidad y ejemplos.

---

## 9. Implementation Plan

1. Crear tipos `DcxSkeletonShape` y `DcxSkeletonAnimation` en `libs/dcx-ng-lib/src/lib/core/interfaces/skeleton.ts`.
2. Exportar los tipos desde `libs/dcx-ng-lib/src/lib/core/interfaces/index.ts`.
3. Crear `dcx-ng-skeleton.component.ts`, `.html`, `.scss` y `.spec.ts`.
4. Usar host bindings para clases, estilos CSS custom properties y `aria-hidden`.
5. Mantener template mínimo, porque el componente es decorativo y no interactivo.
6. Crear stories y documentación de Storybook en `stories/Skeleton/`.
7. Exportar el componente desde `libs/dcx-ng-lib/src/index.ts`.
8. Ejecutar tests focalizados del componente.
9. Validar lint/build de `dcx-ng-lib` y `dcx-ng-components` si el tiempo del ciclo lo permite.

---

## 10. Out of Scope

- No se implementa un grupo/listado dinámico de skeletons con input `count`.
- No se implementa lógica de carga ni ocultación de contenido real.
- No se añaden outputs ni eventos.
- No se incorporan dependencias de PrimeNG.

---

## 11. Open Questions

- [ ] ¿Preferimos mantener la API estrictamente igual a PrimeNG (`shape`, `width`, `height`, `size`, `borderRadius`, `animation`) o añadimos una variante DCX extra como `variant="text | avatar | card"` en otra iteración?
