# Instrucciones para Desarrollo de Componentes Angular con Storybook

## Contexto del Proyecto
Esta librería (`dcx-ng-lib`) es una colección de componentes web de Angular diseñados para ser reutilizables, accesibles y bien documentados. Utiliza Angular 20 con signals, Storybook para documentación interactiva, y Nx como sistema de build.

## Arquitectura General
- **Standalone Components**: Todos los componentes son standalone para facilitar la importación y reducir dependencias.
- **Signals API**: Uso obligatorio de `input()`, `output()`, `signal()`, `computed()`, y `effect()` para reactividad.
- **Change Detection**: `ChangeDetectionStrategy.OnPush` para optimización de rendimiento.
- **TypeScript**: Tipado estricto con interfaces dedicadas para props y eventos.
- **SCSS Modular**: Estilos organizados en módulos con variables y mixins.
- **Accesibilidad**: Implementación de ARIA attributes y navegación por teclado.
- **Storybook**: Documentación interactiva con controles dinámicos.

## Estructura de un Componente

### 1. Archivos Obligatorios
```
dcx-ng-[componente]/
├── dcx-ng-[componente].component.ts    # Lógica del componente
├── dcx-ng-[componente].component.html  # Template
├── dcx-ng-[componente].component.scss  # Estilos
├── dcx-ng-[componente].component.spec.ts # Tests unitarios
└── index.ts                            # Export
```

### 2. Componente TypeScript
```typescript
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-[componente]',
  standalone: true,
  imports: [CommonModule, /* otros componentes */],
  templateUrl: './dcx-ng-[componente].component.html',
  styleUrls: ['./dcx-ng-[componente].component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Host listeners si es necesario
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class DcxNg[Componente]Component {
  // Inputs con signals
  readonly [prop] = input<Tipo>(valorDefault);
  readonly [prop2] = input.required<Tipo[]>();

  // Outputs con signals
  readonly [evento] = output<Tipo>();

  // Estado interno con signals
  private readonly _estado = signal<Estado>(inicial);

  // Computed para valores derivados
  readonly computedValor = computed(() => {
    // lógica derivada
  });

  constructor(/* inyecciones */) {
    // Effects para side effects
    effect(() => {
      // lógica reactiva
    });
  }

  // Métodos públicos
  metodoPublico(): void {
    // implementación
  }
}
```

### 3. Template HTML
- Usar control flow moderno: `@if`, `@for`, `@switch`
- Bindings reactivos con `()`
- Atributos ARIA para accesibilidad
- Roles semánticos apropiados

### 4. Estilos SCSS
- Usar variables del sistema (`$dcx-*`)
- Clases BEM-like: `.dcx-[componente]__elemento`
- Estados: `.dcx-[componente]--estado`
- Responsive con mixins
- Evitar estilos globales

### 5. Interfaces
Crear interfaces en `core/interfaces/[componente].ts`:
```typescript
export interface Dcx[Componente]Options {
  key: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
  // otros campos
}

export type [Componente]Variant = 'primary' | 'secondary' | 'tertiary';
```

## Storybook

### Estructura de Stories
- Archivo: `stories/[Componente]/ClassBased.stories.ts`
- Usar `Meta` y `StoryObj`
- Mock data realista
- Controles interactivos con `argTypes`

### Ejemplo Básico
```typescript
const meta: Meta<DcxNg[Componente]Component> = {
  title: 'DCXLibrary/[Componente]/ClassBased',
  component: DcxNg[Componente]Component,
  decorators: [moduleMetadata({ imports: [CommonModule] })],
  tags: ['autodocs'],
  argTypes: {
    [prop]: {
      control: { type: 'text' },
      description: 'Descripción del prop',
    },
  },
};

export const Basic: Story = {
  args: {
    [prop]: 'valor ejemplo',
  },
};
```

## Testing

### Tests Unitarios
- Usar Jest con `@angular/core/testing`
- Testear inputs, outputs, estado interno
- Cobertura mínima del 80%
- Tests de accesibilidad

### Ejemplo de Test
```typescript
describe('DcxNg[Componente]Component', () => {
  it('should emit event on action', () => {
    // arrange
    // act
    // assert
  });
});
```

## Mejores Prácticas

### 1. Reactividad
- Preferir signals sobre BehaviorSubject/manual change detection
- Usar `computed` para valores derivados
- `effect` solo para side effects (no para UI)

### 2. Performance
- `OnPush` change detection
- Evitar subscriptions manuales
- Lazy loading cuando aplique

### 3. Accesibilidad
- ARIA labels y roles
- Navegación por teclado
- Contraste de colores
- Screen reader support

### 4. Consistencia
- Nombres: `dcx-ng-[componente]`
- Prefijos CSS: `.dcx-[componente]`
- Eventos: `camelCase`
- Props: `camelCase`

### 5. Documentación
- JSDoc en métodos públicos
- Comentarios en lógica compleja
- Storybook como documentación viva

### 6. Dependencias
- Importar solo lo necesario
- Evitar dependencias circulares
- Usar peerDependencies para Angular

## Proceso de Desarrollo

1. **Planificación**: Definir API (inputs/outputs)
2. **Interfaces**: Crear tipos TypeScript
3. **Componente**: Implementar lógica con signals
4. **Template**: Estructura HTML accesible
5. **Estilos**: SCSS modular y responsive
6. **Stories**: Documentación interactiva
7. **Tests**: Cobertura completa
8. **Linting**: ESLint y Prettier
9. **Build**: Verificar con Nx

## Herramientas y Configuración

- **Nx**: Build system y monorepo
- **ESLint**: Linting con reglas Angular
- **Jest**: Testing framework
- **Storybook**: Documentación
- **Prettier**: Code formatting
- **Husky**: Git hooks

## Checklist Pre-Commit

- [ ] Componente standalone
- [ ] Signals API completa
- [ ] OnPush change detection
- [ ] Accesibilidad implementada
- [ ] Tests unitarios (>80% cobertura)
- [ ] Stories en Storybook
- [ ] Linting sin errores
- [ ] Build exitoso
- [ ] Documentación actualizada