# Migrate Index to Home Spec

## Overview

Migrar el diseño estático de `designs/index.html` a un nuevo componente `HomeComponent` en la aplicación Angular, convirtiéndolo en la página de inicio con una cuadrícula de tarjetas que enlazan a las rutas de los componentes. Mantener la navegación existente mediante la navbar y el router-outlet.

## Acceptance Criteria

- [ ] La página raíz '/' muestra una cuadrícula de tarjetas con iconos, nombres y enlaces a rutas de componentes.
- [ ] Cada tarjeta agrupa componentes relacionados como en `index.html` (e.g., "Breadcrumb · Divider · Icon · Message").
- [ ] Hacer clic en una tarjeta navega a la primera ruta del grupo correspondiente.
- [ ] Los estilos coinciden con el diseño original, usando tokens SCSS de la librería.
- [ ] Incluye título "DCX NG Library" y subtítulo "Designs — Dev".
- [ ] Incluye enlace a Google Fonts.
- [ ] La navbar funciona correctamente, con activeRoute actualizado.
- [ ] Tests unitarios pasan (>80% cobertura).
- [ ] Lint y build sin errores.

## API

### HomeComponent

- **Selector**: `app-home`
- **Inputs**: Ninguno
- **Outputs**: Ninguno
- **Propiedades**:
  - `cards: HomeCard[]` — Array de tarjetas con icono, nombre, ruta.

### Interfaces

```typescript
interface HomeCard {
  icon: string;
  name: string;
  route: string;
}
```

## Estados y variantes visuales

- **Default**: Cuadrícula responsive de tarjetas.
- **Hover**: Tarjeta con borde azul y sombra.
- **No hay variantes adicionales**.

## Tokens SCSS a usar

- `--color-primary` (equivalente a `--blue`)
- `--background-primary`
- `--background-primary-hover`
- `--content-on-primary`
- `--content-default`
- `--content-subtle`
- `--border-default`
- `--font-family-primary`
- `--border-radius-md`

## Casos de test

- Renderiza el título y subtítulo correctamente.
- Renderiza la cuadrícula con el número correcto de tarjetas.
- Cada tarjeta tiene icono, nombre y enlace correcto.
- Hacer clic en una tarjeta navega a la ruta correcta (usar RouterTestingModule).
- Estilos aplicados correctamente.

## Plan de implementación

1. Crear `src/app/pages/home/home.component.ts` con la lógica para poblar `cards`.
2. Crear `src/app/pages/home/home.component.html` adaptando el HTML de `index.html`.
3. Crear `src/app/pages/home/home.component.scss` con los estilos adaptados.
4. Crear `src/app/pages/home/home.component.spec.ts` con tests.
5. Actualizar `src/app/app.routes.ts` para usar `HomeComponent` en ruta raíz.
6. Modificar `src/app/app.component.ts` para eliminar navegación automática.
7. Ejecutar tests y lint.