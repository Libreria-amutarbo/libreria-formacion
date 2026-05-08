# Instrucciones para Storybook en DCX NG Library

## Contexto del Proyecto

Storybook se utiliza como herramienta principal para documentación interactiva, testing visual y desarrollo de componentes. Cada componente debe tener stories completas que demuestren todas sus funcionalidades, estados y casos de uso.

## Estructura de Archivos

### 1. Stories TypeScript

**Ubicación**: `src/lib/stories/[Componente]/ClassBased.stories.ts`

**Estructura obligatoria**:

```typescript
import { Dcx[Componente]Options, DcxNg[Componente]Component } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

// Mock data realista
const mockData = [/* ... */];

// Actions para testing
const ActionsData = {
  [evento]: fn(),
};

const meta: Meta<DcxNg[Componente]Component> = {
  title: 'DCXLibrary/Components/[Componente]',
  component: DcxNg[Componente]Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    // Definir controles para cada input
    [inputName]: {
      control: { type: 'text' | 'boolean' | 'select' | 'object' },
      description: 'Descripción del input',
      table: {
        category: 'Attributes',
        type: { summary: 'TipoTypeScript' },
        defaultValue: { summary: 'valorDefault' },
      },
    },
    // Eventos
    [outputName]: {
      action: '[outputName]',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNg[Componente]Component>;

// Stories individuales
export const [NombreStory]: Story = {
  args: {
    // Valores por defecto
  },
};
```

### 2. Documentación MDX

**Ubicación**: `src/lib/stories/[Componente]/Documentation.mdx`

**Estructura**:

````mdx
import { Meta, Canvas } from '@storybook/blocks';
import * as [Componente]Stories from './ClassBased.stories';

<Meta title="DCXLibrary/[Componente]/Documentation" />

# [Componente]

Descripción completa del componente y sus características principales.

---

## Class-Based Demo

<Canvas of={[Componente]Stories.ClassBasedDemo} />

---

## Props

- `propName: Tipo` — Descripción
- `otroProp: OtroTipo` — Descripción

---

## Uso básico

```html
<dcx-ng-[componente]
  [prop]="valor"
  (evento)="handler($event)"
></dcx-ng-[componente]>
````

## Estados y Variantes

<Canvas of={[Componente]Stories.[Estado1]} />
<Canvas of={[Componente]Stories.[Estado2]} />
```

## Configuración Global

### .storybook/main.ts

```typescript
const config: StorybookConfig = {
  stories: ['../src/lib/stories/**/*.stories.ts'],
  addons: [
    '@storybook/addon-a11y',    // Accesibilidad
    '@storybook/addon-docs',    // Documentación MDX
    // Controles y acciones vienen incluidos con Angular
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
};
```

### .storybook/preview.ts

```typescript
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
```

## Mejores Prácticas

### 1. Nomenclatura

- **Títulos stories**: `'DCXLibrary/Components/[Componente]'` — sin "Class based" ni subpaths extra
- **Títulos documentation**: `'DCXLibrary/[Componente]/Documentation'` — sin "Components/"
- **Stories**: PascalCase descriptivo (`Default`, `WithIcon`, `Disabled`, `Interactive`)
- **Archivos**: `ClassBased.stories.ts`, `Documentation.mdx`

### 2. Controles (argTypes)

- **Categorías**: `'Attributes'` para inputs, `'Events'` para outputs
- **Tipos de control**:
  - `text`: strings
  - `boolean`: booleanos
  - `select`: enums con options
  - `object`: arrays/objetos complejos
- **Descripciones**: Claras y concisas
- **Default values**: Especificar en table

### 3. Mock Data

- **Ubicación**: En `libs/dcx-ng-lib/src/lib/core/fixtures/[componente].ts` — nunca inline en el stories file
- **Export**: Añadir `export * from './[componente]'` en `core/fixtures/index.ts` para que sean reutilizables en unit tests
- **Prefijo**: Nombrar las constantes con el nombre del componente para evitar colisiones (ej. `navbarItems`, `buttonVariants`)
- **Import en stories**: Desde `@dcx-ng-components/dcx-ng-lib` (como cualquier otro tipo o constante de la lib)
- **Realista**: Usar datos que representen casos reales
- **Variedad**: Incluir estados normales, edge cases, y datos con propiedades opcionales ausentes

### 4. Stories Interactivas

- **Render function**: Para lógica compleja o interactividad
- **Template literal**: Para HTML personalizado
- **Actions**: Usar `fn()` para capturar eventos
- **State management**: Para demos con estado mutable

### 2. Documentación MDX

**Obligatoria** para cada componente. Estructura estandarizada:

- Descripción del componente
- Demo principal
- Lista de props
- Ejemplos de uso
- Estados y variantes

### 6. Accesibilidad

- **Addon a11y**: Verificar automáticamente
- **ARIA**: Demostrar atributos en stories
- **Keyboard navigation**: Stories para navegación por teclado
- **Screen readers**: Descripciones apropiadas

### 7. Testing Visual

- **Stories como tests**: Cada story es un caso de prueba visual
- **Chromatic**: Para regression testing visual
- **Responsive**: Stories para diferentes breakpoints
- **Estados**: Normal, hover, focus, disabled, loading, error

### 8. Performance

- **Lazy compilation**: Habilitado en builder
- **FS cache**: Para builds más rápidos
- **Tree shaking**: Solo importar lo necesario

## Proceso de Creación

1. **Mock Data**: Crear datos de prueba realistas
2. **Meta Config**: Definir argTypes completos
3. **Stories Básicas**: Estados fundamentales
4. **Stories Avanzadas**: Casos complejos y edge cases
5. **Documentación**: MDX con ejemplos y descripciones
6. **Testing**: Verificar en Storybook
7. **A11y**: Revisar con addon
8. **Build**: Verificar que compile correctamente

## Checklist por Componente

- [ ] Stories TypeScript con argTypes completos
- [ ] Al menos 3 stories diferentes (básico, estados, casos edge)
- [ ] Mock data realista y variada
- [ ] Documentación MDX completa
- [ ] Actions configurados para outputs
- [ ] Controles funcionales en Storybook
- [ ] Accesibilidad verificada
- [ ] Responsive design cubierto
- [ ] Build exitoso sin errores

## Ejemplos de Patrones

### Story Básica

```typescript
export const Basic: Story = {
  args: {
    label: 'Botón básico',
    variant: 'primary',
  },
};
```

### Story Interactiva

```typescript
export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      onClick: ActionsData.onClick,
    },
    template: `
      <dcx-ng-button
        [label]="label"
        [variant]="variant"
        (buttonClick)="onClick($event)"
      ></dcx-ng-button>
    `,
  }),
};
```

### Story con Estado

```typescript
export const WithState: Story = {
  render: (args) => ({
    props: {
      ...args,
      counter: 0,
      increment: () => (args as any).counter++,
    },
    template: `
      <div>
        <p>Contador: {{counter}}</p>
        <dcx-ng-button
          label="Incrementar"
          (buttonClick)="increment()"
        ></dcx-ng-button>
      </div>
    `,
  }),
};
```

## Herramientas y Addons

- **@storybook/addon-a11y**: Testing de accesibilidad
- **@storybook/addon-docs**: Documentación MDX
- **@storybook/blocks**: Componentes para MDX
- **@storybook/test**: Utilidades para testing
- **Controles y acciones**: Incluidos automáticamente con Angular

## Chromatic - Visual Testing

**Chromatic** es una plataforma de testing visual que integra con Storybook para detectar cambios visuales automáticamente.

### ¿Qué es?

- Toma snapshots de cada story
- Compara visualmente en pull requests
- Detecta regressions de UI
- Aprobación manual de cambios intencionales

### Beneficios

- **Automated**: Corre en CI/CD
- **Precise**: Detecta cambios de 1px
- **Collaborative**: Reviews visuales en PRs
- **Fast**: Paraleliza tests

### Configuración Básica

1. **Instalar**: `npm install --save-dev chromatic`
2. **Configurar**: `npx chromatic --project-token=<token>`
3. **GitHub Action**:

```yaml
- name: Visual Testing
  run: npx chromatic --project-token=${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Uso

- **Primera vez**: `npx chromatic --project-token=<token>` (obtiene token de Chromatic)
- **En CI**: Automático en pushes/PRs
- **Local**: `npx chromatic` para snapshots manuales

### Costos

- **Free tier**: 5,000 snapshots/mes
- **Pago**: Basado en snapshots adicionales

¿Te interesa configurar Chromatic para el proyecto?

## Comandos Útiles

```bash
# Ejecutar Storybook
npm run start-storybook

# Build de Storybook
nx build-storybook dcx-ng-lib
```
